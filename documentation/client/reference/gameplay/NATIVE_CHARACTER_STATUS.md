# Native character status and HUD values

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The native status codecs, main-character value handler, HP/TP calculation rules,
authored table importer and GPU HUD updates are implemented. As of 2026-10-23,
the normal offline authority also initializes the source-backed calculated status
session after CHAR_INIT and delivers its ordered status/effect frames to the HUD.
See [MainUI and offline status](../../guides/MAINUI_INTERACTION_AND_OFFLINE_STATUS.md) for the
current integration, runtime evidence and remaining gameplay boundaries.
The component verification below records the earlier implementation stages.

This continues [main camera startup and main-bar rendering](../../archive/fixes/MAIN_GAME_STARTUP_AND_HUD.md).
The broad [implementation plan](../../IMPLEMENTATION_PLAN.md) remains paused.

## Native sequence and implemented components

The active zone project compiles `Server.cpp`. Its initialization sequence sends
CHAR_INIT, calls `CMob::Init`, adds the protection effect, processes continuous
effects, applies the dead-character half-HP/TP branch and invokes
`NotifyUpdateUIMsg` (`zone/server.cpp:12385-12440`). Initialization and continuous
effect functions can themselves emit updates, so integration must preserve those
intermediate notifications as well as the final one. The shorter
`Server111.cpp:8746-8758` path is historical reference. `CMOB.CPP:4125` populates
the UPDATE_UI record. Client dispatch is in
`HTNetWorkHandle.cpp`, with `HTGameSystem.cpp:907,970` applying full/minimal updates.

- `NativeCharacterRecords` now encodes/decodes the complete **164-byte UPDATE_UI**
  and **56-byte UPDATE_STATUS** records. It preserves reserved body bytes, signed
  values, 64-bit affections and the original speed-byte fields. These remain
  normalized native logical records, not implemented TCP/encryption transport.
- `HtCharacterStatus` follows main-character HP ordering. Full UI updates set the
  new maximum and clamp existing HP, then accept HP only if it increases. Minimal
  status updates can reduce HP and clamp nonpositive HP to zero. A zero maximum
  TP retains the prior maximum. Foreign character keys do not change main-player
  values; their other-object handling is still pending.
- `IntroCharacterFrontend::pollWorldUpdate` and the main application connect
  actual supported world notifications to that state and the HUD. They require
  an authenticated initialized session. No synthetic notification is inserted
  into the normal channel to make this gate appear complete.
- `HtCharacterVitals` ports the full PC `CMob::UpdateHPTP` rule, with changed
  Heart/Mind, class HP/TP/recovery coefficients, recovery caps and all three
  equipment/passive/active variation groups supplied explicitly. It retains the
  Heart-530 split, caster Mind-based TP, flat/percentage application order,
  minimum locks, current-value clamps and source `Percent` rounding. The caller
  must resolve those inputs; omitted modifiers are not assumed correct.
- The read-only Excel XML importer extracts all numeric `Coefficient` and
  `LevelUp` columns. The current authored workbook supplies 16 class records and
  200 level records. Sparse cell/row indices, missing values, duplicate keys and
  non-int32 values are handled explicitly. Output and provenance stay under
  `derived-assets/character-stats`; the used generated tables and provenance are
  now staged into `_client/system/offline/character-stats` for the normal authority.

The workbook is `B:\__TANTRA\TantraDataScripts\Global\HTSSetting-global.xml`.
Generated provenance records its SHA-256 and source rows/columns. This is an
authored Global profile, not proof of equality with the encrypted deployed
`E:\Global-server\ZoneXX\HTSSetting.txl`. The old server also has an Access
`Settings.mdb` loading path. Those version/data boundaries must be reconciled
explicitly rather than silently mixing settings with a selected zone dataset.
Original files remain unchanged.

## HUD scaling and source update bodies

`generate-native-main-hud.py` now compiles the original HP, HP transparency,
TP and prana update bodies into the project-owned control adapter. Numeric labels,
visibility, overfull ratios and prana percentages follow those functions.

The original `HT_SetTextureControlScale` takes integer sizes: for example,
one-third of the 164-pixel HP control becomes **54**, not a fractional control
width. The original `UITextureControl::SetScale` body is compiled as well. Its
scale uses the registered real control size, then applies that factor to the
bitmap sprite's actual dimensions. Transparent texture padding is retained;
stretching an entire padded bitmap into the logical control rectangle shrinks
its visible content and is incorrect. An HP bitmap 256 pixels wide, registered
as 164 pixels, uses a 64-pixel sprite extent for a logical 41-pixel quarter bar.

GPU rectangles now support zero extents for depleted bars. Label textures are
updated only when their text changes, with exact GPU readback in the component
check. Toolbar hit tests retain the native inclusive right/bottom edges. GDI and
legacy D3D8 pixel parity remain unproven.

## Verification

Source fixtures compile original functions and native struct declarations:

- Vitals: **1,600 comparisons** covering both sides of Heart 530, caster TP,
  modifiers, lock minima, recovery caps and percentage rounding.
- Client status ordering: **256 transitions** against seven original functions,
  including stale/lower full-update HP, reduced maxima, minimal-update damage,
  zero-maximum TP retention and foreign keys. Unported UI/service callbacks in
  the fixture are inert and do not establish those systems as implemented.
- Native message layouts: both client/zone declarations must agree. Sixty-four
  byte patterns per message compare every encoded byte, decode/re-encode and
  reject every truncated length and a wrong message type.
- HUD updates: original updater bodies are compiled; known quarter, zero,
  overfull and one-third values check text and integer scale semantics.
- GPU component: four rendered cases verify actual label pixels, visibility,
  padded sprite extents and zero extents. Style-button edge checks use the
  production pointer handler. Captures and executable hashes are recorded in
  `build-ogre-sdl/native-status-gpu-*/VERIFIED.json`. This fixture has no network
  authority or SQLite login and is explicitly labeled as a component test.

Verified 2026-10-22:

| Gate | Result and evidence under `build-ogre-sdl/` |
| --- | --- |
| Release / Debug full build | Both succeed; `native-status-full-release-build.log`, `native-status-debug-build.log` |
| Release / Debug selected CTest | **81/81 each**, HTTP test excluded; `native-status-{release,debug}-ctest.log` |
| Release / Debug status GPU component | Four cases each, plus inclusive style-button edges; `native-status-gpu-{release,debug}/VERIFIED.json` |
| Normal final Release offline regression | Six audio-enabled processes, five restarts, **31 captures**; Mandara routes 1/18/19, full-village rejection, deletion and empty restart; `native-status-final-release/VERIFIED.json` |
| Normal Debug offline smoke | Audio-enabled create-to-Mandara and toolbar interaction, **8 captures**; `native-status-debug/VERIFIED.json` |
| Final staging | **2,310 manifested files / 194,093,123 bytes**, original resource/system layout; `native-status-final-staging.log` |
| Final inventory / branding / relocation | x64 imports, exact nine ICO payloads, actual title/icon handles and relocated offline startup pass; `native-status-final-inventory.log` |
| Debug development package | Manifest/provenance check passes; `native-status-debug-package.log` |

Normal runtime proofs explicitly record that authoritative status notification
generation remains pending. Their Mandara regressions prove that the newly
connected dispatcher and scaling correction preserve the existing offline flow;
they do not prove that the channel generates live status. GPU component proofs
are separately named and labeled. Full/depleted component screenshots were
also inspected. No unused character-stat tables were added to the final client.

The final Release proof matches `_client/HTLauncher.exe` and the Release
development-package executable:

```text
6efdc5fe5dd28e792a6e48f716fbf6dc035e6f75dd777f356c54a67f3e1c6f39
```

The Debug proof matches its development-package executable:

```text
d376341a688a0e0d4bb8ce3e6f761bf3eb73023d79b2e2721a7dffb63f23a085
```

Each GPU proof also matches its tested probe executable. Earlier camera/HUD
proofs certify their original executable hashes and do not certify these newer
binaries. The workbook hash still matches the source bytes captured by its
importer; selected numeric source cells use exact integer literals.

Reproduce the GPU component check, which does not log in or contact a server:

```powershell
python _remake/tools/verify-main-hud-status.py --probe _remake/build-ogre-sdl/Release/native_main_hud_render_probe.exe --client-root TantraClient --runtime-root _remake/package/x64/Release --output _remake/build-ogre-sdl/native-status-gpu-release
```

## Next required work

The subsequent [equipment resolution component](NATIVE_EQUIPMENT_STATS.md)
extends this projection to the full native equipment pass, permanent effect
dispatch and configured resistance rates, with 129 fixed regression checks.
The normal offline authority integration below is still required. The following
paragraphs describe the preceding calculation checkpoint.

`HtPcStatProjection` now compiles ten original method bodies for Chakra totals,
restriction and updates, HP/TP, combat factors, resistance, both damage overloads,
defense and speed against per-character resolved inputs. It retains weapon,
mastery, refinement and submaterial branches. The native modifier indices are
equipment 0, active skill 1 and passive skill 2. The bare-hand record comes from
active `server.cpp` initialization. Generated declarations include source hashes;
unknown compile flags or missing constants stop configuration.

This is a calculation component, not completed offline authority. Its focused
probe verifies starter values, caster/clan movement, affection masks and Heart
restriction boundaries. Weapon/refinement branches still require regression
vectors; compilation alone does not verify their behavior. NPC inputs are
explicitly unsupported, and resistance-effect probability decks are not included.
No stat-table or notification injection was added to the normal offline path.

At the subsequent local commit checkpoint, the projection probe builds and
passes in both Release and Debug (`pc-stat-projection-build.log`,
`pc-stat-projection-debug-build.log`, `pc-stat-projection-debug-ctest.log`).
The full Release rebuild and **82/82 selected checks**, with HTTP runtime
excluded, pass and are recorded separately in
`pc-stat-checkpoint-release-{build,ctest}.log`. The rebuilt development executable
is separate from the previously verified staged/package executables above;
those runtime proofs remain bound to their listed hashes. This checkpoint
does not claim a new normal-client runtime test or final-client restaging.

Connect skill loading, the implemented equipment pass and continuous-effect
resolution to the offline authority, extend remaining effect/combination coverage, and
implement resistance-effect decks and all other notification fields.
Use the selected source-backed settings profile and native item/skill data.
Then queue the complete real UPDATE_UI record after CHAR_INIT, verify its order,
save derived state through SQLite at the appropriate lifecycle points, and
require live values in the normal offline Mandara runtime test.

NPCs, movement/combat, remaining dialogs and dedicated server/GUI work also
remain required by the overall plan.
