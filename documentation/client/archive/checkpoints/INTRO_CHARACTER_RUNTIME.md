# Offline INTRO character frontend

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.

The normal OGRE x64/SDL3 application now connects offline server selection to
the original character creation, information and deletion screens. This is a
working frontend integration, not completion of INTRO or of the full remake.
The offline world transition now loads Mandara1st and initializes the owned main character.
See [normal world entry, source data and remaining gameplay gates](MANDARA_WORLD_ENTRY.md).
The subsequent [main camera and main-bar report](../fixes/MAIN_GAME_STARTUP_AND_HUD.md)
records the current 78-check suites and the final runtime's camera/HUD evidence.
Older counts and proofs below describe their respective checkpoints.

## Production sequence

`IntroCharacterFrontend` uses `OfflineCharacterChannel` and the real SQLite
authority, with the native logical records. It performs these operations:

1. Select native world group/server slot 6; connect and wait for ALIVE.
2. Send point-01 MOVE_ZONE with an empty character name, plain MD5 compatibility
   proof and the executable's own four-part FileVersion. The local authority
   checks its separate remake version profile, currently 0.1.0.0.
3. On ACK, clear fixed roster slots/previews, request the roster and display the
   original request message. Reject authentication through the native messages.
4. Decode three entries and apply the client-only +4000 equipment translation
   for occupied slots. A successful real UI render enables each subsequent load.
5. Preload native PC textures, then retain decoded models/animations for tribes
   1..9 in order. All nine models, including GM, and 454 unique animations are
   decoded. Explicit caching feeds the preview loader; it does not merely count
   or read/discard files. Missing resources fail visibly in diagnostics.
6. Hide login/server, show the original top menu, move both gate monsters to
   their native character-stage transforms, request RUN/WLK and reset timers.
7. Create occupied previews; an empty roster opens creation, otherwise SELECT.
   Character panels appear after camera completion, with the source's update-
   count interpolation rather than a fabricated elapsed-time delay.

The generated UI contains six panels, 87 controls and 21 texture bindings.
`generate-native-intro-character-ui.py` reads the original declarations and
records the source hashes. It preserves original texture/message IDs, including
the nonordinal third big-button texture. Registration dimensions are logical
control dimensions; the original 7x16 caret uses a 32x32 BMP payload.
The three original action samples 33501/33502/33503 are extracted and used.

Top Menu is anchored bottom right (native arrangement 3). Windows retain the
original coordinates, textures, text and keypad arrangement policy. Showing or
clicking a panel updates both input order and OGRE overlay priority. Input uses
SDL3 committed text in the selected native code page, legacy-byte name limits,
whole-character DBCS backspace, source button hover/down/up behavior, password
masking and caret timing. Enter does not submit these character panels; Escape
clears edit focus. The international delayed deletion-show path focuses absent
control 3 in the original source; its actual password edit 4 can be clicked.

Creation supports eight tribes, faces/hair 1..5, seven allocatable chakra points,
reset, native requests/results, and the original optimistic first-free-slot
preview after ACK. A head change retains the body animation clock while
replacing OGRE display objects and releasing the previous sockets. A native
short-name NoReply leaves controls usable for correction/retry. Source error
results retain their original message IDs. Database starter state stays
separate from optimistic client preview fields.

Selection tests the visible posed body triangles of occupied roster owners;
UI sprites, gate monsters and empty slots cannot become selected characters.
It fills the original information panel and moves the selected-slot camera
with grade 0.93. Creation/wide selection/deletion use grade 0.95. Delete sends
the selected name and the supplied international nonempty back field, then
clears only that slot on success. Deleting the final character returns to NEW.
Owned selection and initialized native world position are saved in SQLite.

## Native world-selection gates and localhost policy

The current runtime loader validates the original server-list records and
retains their native indices, ports, names and locale, then replaces every
populated address with **127.0.0.1**. Canonical files and the distributed original
`serverlist.bin` are unchanged; the historical IPs are profile inputs, never
runtime destinations. Diagnostics record the policy and each connection/route.
The local character authority still performs no networking.

The original selection branches are now connected to the rendered frontend:

- Info OK rejects exactly `byGMStatus == 0x01` with message 367 for 5 seconds.
- A character in zones 1/18/19 gets the original three-village popup when the
  web status for either extra village is not -1. Status world is selected group
  plus server type. The popup follows Info's x and y+410, with original widgets.
- Any Info button first dismisses an open popup and returns; that click must
  not also cancel, delete or enter. The next click performs its normal action.
- Village buttons route to server zones 1, 18 and 19. Status uses zone-1;
  endpoint lookup uses zone directly. Population greater than 920 returns to
  wide SELECT with message 1022 for 5 seconds; exactly 920 remains allowed.
  The source permits -1 here and checks the **previous** main-character client
  tribe for its GM=9 bypass before copying the picked entry. Both details are
  preserved rather than replaced with a different availability/GM rule.
- Without the popup, Mandara characters route to zone 1. Other zones retain
  their saved zone. Server tribe is converted to the native client tribe.
- Route resolution compares address and port with the current slot 6 endpoint,
  identifying the same-endpoint main-game branch or disconnect/reconnect with
  point-02 authentication. It does not fabricate a CHAR_SELECT wire packet.
- The immediate Info branch records the native animation-scheduling guard;
  the village callback does not. This guard is separate from freezing model clocks.

Village label messages 1226..1228 have parameter 527. The source's
`HT_AddLabelControl` calls `HT_SetScriptMessage` with empty strings, so the
adapter removes the `%s` slot instead of displaying the raw format or inventing
a village-name substitution. The source UI's overlapping button rectangles are
retained; the SDL3 test driver clicks their centers.

`generate-native-intro-selection-fixture.py` compiles five original function
bodies with inert service doubles and compares 4,920 branch cases against
`HtIntroWorldSelection`. It covers GM flags, developing mode, status offsets,
village choices, strict population boundaries, previous-main GM state and
address/port equality. `native_intro_world_selection` runs this independent
source oracle. The existing UI resource test checks the three real label
formats against the native empty-string formatting result.

The changed-endpoint path now performs disconnect/reconnect and real local
point-02 authorization. Its ACK releases INTRO previews/controls, waits for the
actual final INTRO render, and loads the destination. Native CHAR_INIT ownership,
source spawn data, a rendered main character and the normal world camera follow.
See [the bounded world-entry implementation](MANDARA_WORLD_ENTRY.md).

## First playable map: Mandara1st

`HTControlDef.h` defines `ZONE_MANDARA1ST=1` and
`ZONEVALUE_CLIENT_SERVER=40000`. `HTIntroManager::HT_vIntro_GoMainGame`
passes zone+40000 to `HTLoading::HT_hrLoadMainResources`. That function maps
40018/40019 to 40001 before resource lookup.

| Server zone | Client resource map | Configuration / resource directory |
| --- | --- | --- |
| 1, new-character first world | 40001 | `resource/map/MAP_Mandara1st.cfg` → `resource/map/Mandara1st` |
| 18 or 19, other Mandara village instances | 40001 | Same Mandara1st geometry; preserve the actual server zone for routing |

`NativeWorldMap` implements that source mapping and validates the native Map
record filenames. The world-entry boundary resolves it from the selected
character's stored zone. The first-map test checks the actual catalog/config
and the source-backed new-character zone/save-zone 1. New-character x/z -1
remain authority-owned spawn sentinels until CHAR_INIT resolves them using
`E:\Global-server\ZoneXX\GenerationArea.idx` and that directory's native TCM.
Mandara1st's referenced assets are now part of the normal runtime closure.

## Authentication and rendering fixes

The selected Philippines web login uses MD5Plus; zone authentication uses plain
MD5. SQLite schema 3 keeps separate salted verifiers for these two proofs,
without storing the password or either digest. Versions 1/2 migrate without
losing accounts/characters. A migrated zone verifier is populated only after a
successful password-linked web login; wrong passwords and web-only requests
cannot silently replace it. Tests preserve existing salts/web verifiers and
check raw-MD5 success, MD5Plus rejection and reopen behavior.

Character preloads resolve archive names case-insensitively, matching native
`HTPackFile` identity. Three supplied Lord DDS textures use DXT2. Their BC2
blocks are uploaded under D3D11's DXT3 format without altering source assets;
GPU readback verifies every uploaded compressed mip byte. This preserves their
encoded premultiplied color/alpha, not an assertion of full Lord-material parity.

The supplied OGRE 14.6.1 plugin explicitly truncates compressed mip chains
before the final two levels (`OgreD3D11Texture.cpp:247-252`). The adapter requests
the source chain and verifies the plugin-supported prefix; it does not claim
to upload the omitted tail levels. Exact native tail-mip handling remains a
renderer fidelity item. Screen-space UI textures retain their zero-mip policy.

## Verification

Runtime testing uses `--offline`, username **ashesh** and password **ashesh**.
The SDL3 event drivers enter those values through the normal login controls;
they do not bypass authentication. Their temporary SQLite profiles are separate
from the normal client saves. Online and loopback HTTP runtime tests are excluded.

Current Mandara continuation verification:

- Release and Debug: 76/76 selected CTest checks each, with HTTP excluded.
  Release's final expanded dependency closure also passes its affected recheck.
- Release final `_client/HTLauncher.exe`: six audio-enabled SDL3 processes,
  five restarts and 25 captures. Create and villages 18/19 require real native
  loading, source-owned CHAR_INIT and rendered Mandara/player frames. The other
  scenarios verify full-village rejection, deletion and the empty restart.
- Debug: an audio-enabled create-to-Mandara scenario, including its actual
  loading screen, initialized player, source camera and persisted spawn.
- SQLite ownership/name checks, duplicate initialization rejection, schema 3,
  saved routes/cells, separate zone verifier and deletion backups are verified.
- Final runtime inventory: 2,272 files, original layout, hashes, x64 imports and
  all nine exact icon payloads verified. `_client` contains Release. Current
  title/relocation and restaging results are recorded in [final-client evidence](../../guides/FINAL_CLIENT.md).

Matching runtime executable hashes and captures are in
`build-ogre-sdl/intro-world-final-release/VERIFIED.json` and
`build-ogre-sdl/intro-world-debug/VERIFIED.json`. Build/test/staging logs use
`build-ogre-sdl/mandara-*.log`. Older `intro-characters-*` and `intro-selection-*`
files certify earlier frontend/selection checkpoints, not this map-entry binary.

Before this selection/endpoint continuation, both configurations passed the 200-appearance/595-socket/four-LOD
OGRE probe and all eight retained-clock/transform head-change, released-resource,
posed-triangle-pick and shared-bitmap-identity checks. Maximum socket matrix
error is `1.19209e-07` against `2e-06`; capture reports and matching probe hashes
are in `build-ogre-sdl/pc-preview-{release,debug}/VERIFIED.json`. Those GPU
component tests were not repeated for the subsequent selection/endpoint changes;
the expanded production runtime scenarios validate the current executables.

Reproduction commands:

```powershell
cmake --build _remake/build-ogre-sdl --config Release --parallel 6
ctest --test-dir _remake/build-ogre-sdl -C Release -E http --output-on-failure
python _remake/tools/verify-intro-characters.py --package-root _client --executable-name HTLauncher.exe --self-contained --audio 1 --output _remake/build-ogre-sdl/intro-world-final-release
python _remake/tools/verify-intro-characters.py --package-root _remake/package/x64/Debug --audio 1 --scenarios create --output _remake/build-ogre-sdl/intro-world-debug
```

The full-village scenario alone changes population to 921 in the verifier-owned
SQLite profile, then restores it. Normal saves and source assets remain untouched.
All connection/route diagnostics must use 127.0.0.1. Source map counts, initialized
player transform, actual camera, ordered world events and persisted MOB cells
are mandatory; a placeholder cannot satisfy the runtime verifier.

## Remaining INTRO acceptance gates

- Native object-height/terrain-height binding and height-adjusted face camera.
- Complete equipped-roster previews, selected attack/magic animation cycling,
  production PC LOD/visibility/scheduling and character name overlays.
- Remaining loading/back FX, optional forbidden-name tables and other locales'
  complete IME behavior; native font pixel parity is unproven for the GDI adapter.
- Rendered three-occupied-slot, all appearance, cancellation and negative-result
  UI acceptance scenarios; backend slot/error/rollback tests do not prove them.
- Rendered GM rejection and broader failure/cancellation acceptance; native
  GM/population/village routing now has source-oracle coverage and village UI
  runtime scenarios. The bounded offline world handoff now passes; full native
  main HUD, gameplay systems and world visual parity remain unfinished.
- Compatible online transport/server behavior and the later `_server` GUI.

The full [INTRO acceptance contract](../../reference/lifecycle/INTRO_CHARACTER_FLOW.md) and
[implementation plan](../../IMPLEMENTATION_PLAN.md) remain authoritative.
