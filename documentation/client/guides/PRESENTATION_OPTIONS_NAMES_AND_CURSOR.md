# Lighting, water FX, options, names, status and cursors

Updated: 2026-10-25. This addresses the four supplied 18:04-18:07 screenshots.
CPU/build evidence and visible runtime acceptance remain separate.

## Changes

- [x] Saturate accumulated diffuse/emissive lighting before multiplying the
  original texture, matching fixed-function lighting order. Previously multiplying
  texture color by an over-range light and then saturating bleached the detail.
- [x] Reject samples outside the projected shadow bounds, clamp sampling and
  filter the modulative shadow texture with a 3x3 kernel. Enable anisotropic
  sampling on world alpha/material paths without altering texture payloads.
- [x] Restore the native attached-model yaw correction (+PI) and authored
  pitch/yaw/roll. This includes Env_Water01 model layers, rather than rotating
  the whole world or substituting billboard artwork.
- [x] Wire original options scrollbars 21 (effects) and 22 (music), values /10,
  to active voices/stream and future starts. Original resource volume remains
  separate from the group gain. Zero mutes, and changing gain does not restart
  music. The source updates these sliders immediately; its OK/Cancel/Apply
  controls close the options window rather than implementing staged rollback.
- [x] Persist supported options in the original Interface.sys tail inside the
  private profile; restore them on load. Preserve unrelated settings bytes.
  OK/Apply also save the private layout/options immediately.
- [x] Add the player's world name, use the current frame's camera projection,
  and use TPA English NPC names in world labels, target text and dialogue titles.
- [x] Populate source status label IDs for character name, God, Tribe, Job,
  Caste and Ashram alongside the existing numerical status fields. Ashram uses
  the native None label when no guild-name snapshot is available; this does not
  implement missing guild networking.
- [x] Load original CUR/ANI files with the same Win32 cursor API as the source.
  Connect normal/pressed, camera, repair, inventory, loot, hostile actor and
  nearby NPC contexts; retain animated cursors and source hotspots.
- [x] Add actor-ray bounds rejection and skip loot picking when there is no loot,
  to avoid unnecessary triangle checks for cursor feedback.
- [x] Pass focused CPU fixtures and exact lighting/shadow shader compilation.
- [x] Rebuild/overwrite both client outputs; static package and preservation checks pass.
- [ ] Visual/audio acceptance in an authorized offline run.

## Source evidence

Native root: `C:\_GitHub\tantra-dev-main\_references\Tantra`.

| Reference beneath that root | Behavior |
| --- | --- |
| `HTlauncher\HTEngineHandler.cpp:7212` and `:7454` | Map material and character-light configuration |
| `HTlauncher\HTInterface.cpp:4680` | Status control IDs and label sources |
| `HTlauncher\HTInterface.cpp:4911` | Job, caste, God and tribe name mappings |
| `HTlauncher\HTSystem.cpp:378` | Sound scrollbar IDs, immediate /10 gain changes |
| `HTlauncher\HTInterface.cpp:9790` | Original Interface.sys positions and options-tail layout |
| `HTlauncher\HTInterfaceCheck.h:5` | Original CUR/ANI relative paths |
| `HTlauncher\HTInterfaceCheck.cpp:100`, `:655` | Cursor loading, priorities and target contexts |
| `HTlauncher\HTControlDef.h:794` | Native cursor IDs |
| `HTlauncher\HTClientParamMgr.h:1582` | NPC name and record fields |

Original assets: `C:\_GitHub\TantraSrc\TantraClient`.
Relevant files: `system\TantraParam.tpa`, `system\HTMessage.txl`,
`system\ClientRes.txl`, `resource\UI\Interface.sys`, `resource\etc\*.cur`,
`resource\etc\*.ani`, `resource\map\MAP_Mandara1st.cfg`,
`resource\fx\fxMAPMandara1stField.tfx` and its original model/animation HPKs.

The shipped TPA has **276-byte item records**, four bytes beyond the available
272-byte source declaration. The old reader's item stride stopped before the
actual NPC section, and also corrupted some item-range lookups. The corrected
reader chooses a bounded profile using the following NPC records and preserves
the unknown tail bytes. This client contains 291 English NPC names. Item 5802's
range-bonus field at file offset 471390 + 4 + 132 is 1, rather than the old
misaligned reader's 0.

The missing engine model code is checked with read-only inspection of the pinned
original `HT3DHeaven.dll`. RVA 108D8..108FB retrieves parent Euler and adds PI;
the constant at RVA 64984 is 3.1415927410125732. The updated
`_remake\tools\inspect-native-particles.py` checks this evidence without
executing the original DLL.

## Owned files and verification

All implementation paths are under `C:\_GitHub\tantra-dev-main\_remake`:

- `src\rendering\OgreBackend\NativeWorldLighting.h`, `NativeShadowFilter.h`,
  `NativeWorldShaders.h`, `OgreBackend.cpp`;
- `src\rendering\HtRenderFacade\WorldSceneFxPresentation.h`, `MainHudPresentation.*`,
  `MainHudHotkeys.cpp`, `WorldActorPresentation.h`;
- `src\resources\NativeStatusFields.h`, `NativeMainUi.*`, `NativeClientSkillResources.*`;
- `src\audio\HtAudioService.*`, `HtSampleAudioService.*`;
- `src\compatibility\NativeCursorPolicy.h`, `src\app\NativeCursorController.h`,
  `tantra_remake_main.cpp`, `src\tools\final_client_assets.cpp`.

Fixtures cover 5,759 presentation checks, all eight tribes/18 caste states/four
God states, 291 English NPC names, 23 cursor IDs/resource headers, audio gain API
state without opening a device, 685 UI checks with option save/restore, 95 skill
resource checks, existing combat/field FX checks and CPU HLSL linkage. These do
not establish pixel appearance, audible output, cursor animation playback or FPS.

[Build/staging and preservation evidence](../evidence/presentation-options-cursors-20261025.json).
Full PBR, cascaded/depth shadows, complete FX parent graphs and multiplayer-only
cursor/guild states remain separate work. No game, renderer, server or audio
device was launched, and no commit/push is included.
