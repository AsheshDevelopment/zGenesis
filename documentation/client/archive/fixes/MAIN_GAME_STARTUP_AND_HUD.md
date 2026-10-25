# Native main camera startup and main bar

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.
The subsequent [native status continuation](../../reference/gameplay/NATIVE_CHARACTER_STATUS.md) adds
status codecs/rules, source HUD value updates and corrected padded bitmap
scaling. Its current evidence supersedes this report's original executable
hashes and test counts. Normal offline stat generation remains unfinished.

The production offline handoff now prepares the original main-bar resources,
loads Mandara1st and initializes the main character, then runs the native camera
startup before showing the world and HUD. This continues the
[character-to-world handoff](../checkpoints/MANDARA_WORLD_ENTRY.md).

## Sequence and camera

The loading sequence follows `HTLoading.cpp:143`: prepare main UI, render .2
progress, release INTRO geometry, render .3, load terrain (.6), decode map-system
resources (.7), submit objects (.9), and finish loading. The loading sprites
survive geometry release. Hidden INTRO UI sprites remain allocated; complete
UI resource retirement is still pending.

`HtMainGameStartup` implements the stationary first-connection branches of
`HTGameManager::HT_vMainGame_OneTimetUpdate`, `HT_vSetStartMainGamePlay` and
`HTCamera`. Receipt of CHAR_INIT starts RECEIVEINITCHAR -> DONEINITCHAR, sets the
native eye/look endpoints and .8 interpolation, and holds the loading screen.
The Eye coefficient must be strictly below .1 before GAMEPLAY. This occurs
after 11 camera updates. Eye changes the mode before Look executes in that same
update; the adapter retains that source order and subsequent .5 interpolation.
It also retains the source distance limits, angle increments, terrain-check
branches and the original zoom loop's once-sampled position/height.

The camera height adapter currently uses the decoded body mesh's vertical
extent. The independent oracle proves the camera equations for supplied model
heights; it does not prove that the unavailable legacy engine's object-height
query returns exactly that extent. Moving-character camera modes, angle input,
height smoothing, newborn FX, ping/timer services and world BGM remain separate
work.

`generate-native-main-camera-fixture.py` compiles 18 original functions with
inert engine/service doubles. Thirty model-height/terrain cases, each updated
48 times, compare eye, look, angle, render gating and the one-time transition:
**1,440 comparisons**. This is a source oracle for the stationary camera, not a
claim that the inert network/gameplay services are implemented.

## Main-bar resources and input

`generate-native-main-hud.py` preserves the original
`CHTMainBar::HT_vMainBar_CreateWindow` declaration body and main-game texture
registrations. Project-owned capture calls build five panels and 58 controls:

| Native panel | Purpose |
| --- | --- |
| 203 | Full main toolbar |
| 285 | Compact main toolbar |
| 206 | Main-character HP/TP/name frame |
| 221 | Prana bar |
| 250 | Buff slots |

Only 37 referenced MainUI textures are extracted, in original archive lookup
order. BMP color-key conversion, source coordinates, button normal/hover/pressed
variants, selected character name, panel visibility and render order are used.
Empty buff slots have no item image; the native procedural rectangle/invisible
hit-area registration is handled without requesting an invented file.

Original `resource/UI/Interface.sys` window positions are applied after creation
only when its version and screen resolution match. Version/string size come
from the source headers. The five panels read their entries from the original
95-position block beginning at byte 268. Mismatches retain creation defaults;
truncated matching data fails before modifying any panel. Other saved options
belong to their still-unimplemented UI/gameplay components.

SDL3 pointer events drive the source style button (9), including full-to-compact
offset +152 and compact-to-full offset -152. Other toolbar actions currently
emit a pending diagnostic. Dragging, tooltips and the remaining dialogs are not
implemented. HP/TP/prana images currently reflect the original creation
declarations; live stat calculations, text and bar updates are still pending.
GDI text rendering is not evidence of pixel parity with the original renderer.

## Distribution and verification

The final asset closure includes those 37 textures at original loose
`resource/UI` paths and the original `Interface.sys`. Each extracted texture has
source archive/entry, catalog and SHA-256 provenance. No complete MainUI archive
is added to the final client. Development packages retain their derived-data
layout and provenance; final-client staging uses the native directory layout.

The runtime verifier enters through real offline login using **ashesh / ashesh**,
creation/selection, original village routing and CHAR_INIT. It checks GPU HUD
visibility, texture readback and positions, the actual camera, the 11-update
render gate, and SDL3 compact/restore clicks with screenshots. Test profiles
are separate from normal saved accounts.

Camera/main-bar checkpoint verified 2026-10-22, before the status continuation:

| Gate | Result and evidence under `build-ogre-sdl/` |
| --- | --- |
| Release / Debug builds | Both succeed; `main-hud-{release,debug}-build.log` |
| Release / Debug selected CTest | **78/78 each**, HTTP test excluded; `main-hud-{release,debug}-ctest.log` |
| Final Release offline runtime | Six audio-enabled processes, five restarts, **31 captures**; Mandara routes 1/18/19, full-village rejection, deletion and empty restart; `main-hud-final-release/VERIFIED.json` |
| Debug offline runtime | Audio-enabled create-to-Mandara, **8 captures**, main camera/HUD compact/restore; `main-hud-debug/VERIFIED.json` |
| Final folder | **2,310 manifested files / 194,075,715 bytes**; `main-hud-final-staging.log` |
| Final inventory and relocation | Native layout/hashes, x64 imports, nine exact ICO payloads, actual title/icon handles and relocated offline startup; `main-hud-final-inventory.log` |
| Debug development package | Manifest/provenance verification passes; `main-hud-debug-package.log` |

The camera/layout tests are `native_main_camera_source_order` and
`native_main_hud_source_layout`. The latter covers three viewports, saved
positions, version/resolution mismatches and truncated-file atomicity. Runtime
checks include actual GPU camera, HUD texture readback/visibility/positions,
the source 11-update gate and both SDL3 style changes on each world-entry route.
Screenshots were also inspected for the full/compact HUD in the rendered world.

This checkpoint's final Release proof matched its staged and packaged executable:

```text
0964336d11582ab18619a6cf40f867130e5797447f352ef9016bec6aafa50953
```

This checkpoint's Debug proof matched its development-package executable:

```text
3c83ecea6e2cf7ab08ced8ca49ef0fd72c53988be705ab8c6481b7a389756236
```

Proof JSON files contain these executable hashes and screenshot hashes.
The earlier `main-hud-dev-release` smoke and `intro-world-*` proofs are historical
snapshots and do not certify these newer binaries. Restaging's private-save and
obsolete-file policy was verified at the earlier world-entry checkpoint; its
algorithm was not changed by this HUD asset-closure addition.

Reproduce the final Release runtime check from the repository root:

```powershell
python _remake/tools/verify-intro-characters.py --package-root _client --executable-name HTLauncher.exe --self-contained --audio 1 --output _remake/build-ogre-sdl/main-hud-final-release
```

The next authority/UI gate is the source's post-CHAR_INIT
`NotifyUpdateUIMsg` path (`zone/Server111.cpp:8746`) and client
`HT_vGameSystem_UpDateUI` (`HTGameSystem.cpp:907`), including its native stat
calculation dependencies. Current creation-declaration bars must not be treated
as authoritative character status.

The full implementation plan remains active. Remaining world/UI/gameplay,
transport and standalone server requirements are not completed by this slice.
