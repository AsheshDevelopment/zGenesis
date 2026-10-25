# Tantra Online

Source archive and ongoing x64 OGRE/SDL3 remake of HTLauncher.

- `Tantra/`: original client/server source and authored tables, retained as reference.
- `_remake/`: modern client source, tools, branding, implementation plan and reports.
- `_server_cpp/`: current native C++/Win32 server project; implementation goal is paused.
- `_server/`: earlier Rust server reference.
- `REPORT_TantraSrc_*.md`: source analysis and legacy build reports.

Initialize the pinned SDL3 dependency after cloning:

```powershell
git submodule update --init --recursive
```

SQLite source is included under `_remake/external/sqlite`. OGRE is supplied
separately; see [_remake/README.md](../client/PROJECT_README.md) for build configuration.

Original client assets (`TantraClient/`), generated/extracted resources, build
trees, runtime packages (`_client/`, `_remake/package/`), local SQLite saves and
historical deployment/account archives are ignored. Keep those inputs locally;
the repository does not contain a standalone playable client distribution.
The original reference libraries and DLLs under `Tantra/` are retained.
Git attributes preserve the legacy source bytes and encodings used by fixtures.

The external read-only inputs currently reside at:

- Client assets: `C:\_GitHub\TantraSrc\TantraClient`
- Authored Excel/XML data: `B:\__TANTRA\TantraDataScripts`
- Server zone datasets: `E:\Global-server`

## Reference files and paths

These are reference inputs, not interchangeable copies of the remake. Source,
original assets and external authored/server data are read-only. Generated data
and the staged `_client` are derived outputs. Paths below describe this workstation.

| Reference | Absolute path | Used for |
| --- | --- | --- |
| Original client source | `C:\_GitHub\TantraSrc\Tantra\HTlauncher` | Native screen sequence, controls, camera, resources and message handling |
| Original zone source | `C:\_GitHub\TantraSrc\Tantra\zone` | Character initialization, status/effects, spawn and gameplay rules |
| Original database services | `C:\_GitHub\TantraSrc\Tantra\DBSRV` and `C:\_GitHub\TantraSrc\Tantra\SQLDAEMON` | Legacy persistence/protocol reference; not the SQLite runtime |
| Native declarations/libraries | `C:\_GitHub\TantraSrc\Tantra\inc` and `C:\_GitHub\TantraSrc\Tantra\Engine` | Available native API/type definitions and compatibility evidence; the complete original renderer implementation is not present |
| Canonical client | `C:\_GitHub\TantraSrc\TantraClient` | Original binary catalogs and loose/HPK assets |
| Authored Global data | `B:\__TANTRA\TantraDataScripts\Global` | Selected numeric tables and authoring references; separate from deployed encrypted tables |
| Native server deployment | `E:\Global-server` | Selected zone datasets and settings |
| OGRE 14.6.1 source | `C:\Users\Ashesh\Downloads\OGRE\ogre-14.6.1\ogre-14.6.1` | Renderer API/implementation reference and local OGRE rebuild input |
| Supplied OGRE x64 SDK | `C:\Users\Ashesh\Downloads\OGRE\ogre-sdk-v14.6.1-msvc142-x64` | Original supplied prebuilt SDK |
| Currently configured OGRE build | `C:\_GitHub\TantraSrc\_remake\ogre-rts-install\CMake` | Active `OGRE_DIR`; package its matching DLLs with the executable |
| Server GUI example | `A:\zEngineK2\server` | User-selected design reference for the future Tantra manager |
| Original supplied icon | `A:\zEngineK2\client\resources\ZFLauncher.ico` | Branding input; the owned copy is under `_remake\assets\branding` |

Important original source files (all paths are rooted at
`C:\_GitHub\TantraSrc\Tantra`):

| File path | Reference behavior |
| --- | --- |
| `HTlauncher\HTApplication.cpp`, `HTEngineHandler.cpp` | Render lifecycle, FPS line, camera setup and resource submissions |
| `HTlauncher\HTIntroManager.cpp`, `HTGameManager.cpp`, `HTLoading.cpp` | INTRO/character/world handoff and load order |
| `HTlauncher\HTCamera.cpp` | Native main-camera startup and interpolation |
| `HTlauncher\HTInterface.cpp`, `HTInterfaceCheck.cpp`, `HTMainBar.cpp` | MainUI declarations, shortcuts, window events and toolbar routes |
| `HTlauncher\HTEquipInventory.cpp`, `HTSystem.cpp`, `HTCommand.cpp` | Inventory, Options and Command dialog declarations |
| `HTlauncher\HTNetWorkHandle.cpp`, `HTGameSystem.cpp` | Incoming native records and full/minimal main-character status updates |
| `HTlauncher\HTObjResMgr.cpp` | Native object-resource resolution |
| `zone\server.cpp`, `CMOB.CPP`, `CMob2.cpp`, `CMob3.cpp`, `CMob.h` | Entry sequence, native MOB state, stat/effect calculations and notifications |
| `zone\HTParamMgr.cpp`, `HTServerSetting.cpp`, `LoadSetting.cpp` | Parameter transformations and native settings loading |

Important data and asset files:

| Absolute file/folder path | Role and boundary |
| --- | --- |
| `B:\__TANTRA\TantraDataScripts\Global\HTSSetting-global.xml` | Active importer input for Coefficient, LevelUp and EffectTolerance tables |
| `B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml` | Active importer input for Item, PCSkill and MonsterSkill data |
| `B:\__TANTRA\TantraDataScripts\Global\ClientRes.xml`, `HTMessage.xml`, `HTMessage2.xml` | Authored resource/message references; the normal client loads the original `.txl` catalogs below |
| `B:\__TANTRA\TantraDataScripts\Global\Mandara_NPC.xls` | Available authoring reference; active dialogue uses the shipped `Mandara_NPC.txl`, and numeric NPC/item data uses `TantraParam.xml` |
| `C:\_GitHub\TantraSrc\TantraClient\system\ClientRes.txl`, `HTMessage.txl`, `IntroObj.txl`, `Kathana1Obj.txl` | Active native resource/message/object catalogs |
| `C:\_GitHub\TantraSrc\TantraClient\system\Mandara_NPC.txl` | Active original Mandara dialogue/choice/step tables; basic merchant/save services use the authenticated offline authority |
| `C:\_GitHub\TantraSrc\TantraClient\system\HTStartup.cfg`, `HTSpec.cfg` | Original client/render configuration references |
| `C:\_GitHub\TantraSrc\TantraClient\resource\UI\Interface.sys` | Active native saved window-position defaults; private overrides go under `_client\userdata` |
| `C:\_GitHub\TantraSrc\TantraClient\resource\UI\IntroUIInfo.sys`, `MainUIInfo.sys`, `MainUISave.sys`, `LoadingUI.sys` | Original UI reference files; active screen declarations are reconstructed from the matching C++ source, not assumed to match these older files |
| `C:\_GitHub\TantraSrc\TantraClient\resource\UI\INTROUI.hpk`, `MAINUI.hpk`, `MAIN_ITEM.hpk`, `MAIN_RESOURCE.hpk`, `MAIN_SKILL.hpk` | Supplied HPKs are read directly; required loose companions retain their original paths |
| `C:\_GitHub\TantraSrc\TantraClient\resource\map\MAP_Mandara1st.cfg` and `map\Mandara1st` | Mandara configuration, THM terrain, TCC/TML and terrain textures including `detail.dds` |
| `C:\_GitHub\TantraSrc\TantraClient\resource\object` | Original rigid/skinned TMB, TAB animations and regular/pop textures; folder-relative paths retained |
| `C:\_GitHub\TantraSrc\TantraClient\resource\fx` and `resource\sound` | Original effect definitions/textures and audio payloads |
| `E:\Global-server\Zone01`, `Zone18`, `Zone19` | Each selected zone's `GenerationArea.idx`, `MapData.tcm` and `NPCGener.txt` form one dataset; do not mix zone copies. Initial population is implemented; full generator AI/services remain pending |
| `E:\Global-server\Zone01\Data\WorldSettings.ini`, `Settings.ini` (also selected Zone18/19 copies) | Native per-zone inputs to offline status initialization |

Generated authority tables and their `PROVENANCE.json` files live in
`C:\_GitHub\TantraSrc\_remake\derived-assets\character-stats` and
`C:\_GitHub\TantraSrc\_remake\derived-assets\gameplay-parameters`, plus
`C:\_GitHub\TantraSrc\_remake\derived-assets\world-gameplay` for NPC/Monster/Item,
JudgeCombat, Consider and attack/armor records used by offline world play.
Used outputs are staged under `_client\system\offline`. The manifest
`C:\_GitHub\TantraSrc\_client\system\CLIENT_FILES.tsv` records the exact used
runtime files and provenance. Authored Global XML is not assumed identical to
the deployed server's encrypted `.txl` files.

## Implementation guides

- [Mandara offline follow-up and acceptance](../client/archive/checkpoints/PLAYABLE_OFFLINE_ACCEPTANCE.md) — repair, warehouse, stacking/consumables, solo progression, environment changes, original source paths and the single-attempt runtime limitation.


All links below are project-owned guides under
`C:\_GitHub\TantraSrc`; older reports describe their recorded checkpoint and
must be read with the current tracker and executable-bound evidence.

- [Progress checklist](../client/PROGRESS.md) â€” `_remake\PROGRESS.md`; completed and unfinished work, broad goal paused.
- [Full client plan](../client/IMPLEMENTATION_PLAN.md) â€” `_remake\IMPLEMENTATION_PLAN.md`.
- [Build/run instructions](../client/PROJECT_README.md) â€” `_remake\README.md`; root `build-htlauncher.bat` builds and overwrites the final launcher.
- [Original lifecycle sequence](../client/reference/lifecycle/SOURCE_SEQUENCE.md) â€” `_remake\docs\reference\lifecycle\SOURCE_SEQUENCE.md`.
- [INTRO/character contract](../client/reference/lifecycle/INTRO_CHARACTER_FLOW.md) â€” `_remake\docs\reference\lifecycle\INTRO_CHARACTER_FLOW.md`.
- [Mandara world entry](../client/archive/checkpoints/MANDARA_WORLD_ENTRY.md), [objects/spawn](../client/archive/fixes/MANDARA_OBJECTS_AND_SPAWN.md) and [terrain detail](../client/reference/rendering/TERRAIN_DETAIL.md) â€” `_remake\docs`.
- [MainUI and offline status](../client/guides/MAINUI_INTERACTION_AND_OFFLINE_STATUS.md) â€” `_remake\docs\guides\MAINUI_INTERACTION_AND_OFFLINE_STATUS.md`.
- [World orientation and FPS overlay](../client/reference/rendering/WORLD_ORIENTATION_AND_STATS.md) â€” `_remake\docs\reference\rendering\WORLD_ORIENTATION_AND_STATS.md`.
- [HIGH graphics, original CFGs, shadows and fog](../client/guides/GRAPHICS_CONFIGURATION.md) â€” `_remake\docs\guides\GRAPHICS_CONFIGURATION.md`; private overrides use `_client\userdata\system\HTStartup.cfg` / `HTSpec.cfg`.
- [INTRO texture alpha correction](../client/reference/rendering/INTRO_TEXTURE_ALPHA.md) â€” `_remake\docs\reference\rendering\INTRO_TEXTURE_ALPHA.md`; original `_TGA.dds` transparent holes and fractional blending.
- [Offline gameplay implementation and controls](../client/archive/checkpoints/OFFLINE_GAMEPLAY_IMPLEMENTATION.md) â€” `_remake\docs\archive\checkpoints\OFFLINE_GAMEPLAY_IMPLEMENTATION.md`; movement, NPC/monster population, items, basic combat, INTRO/environment work, exact source paths and remaining gaps.
- [Original controls and death/resurrection](../client/guides/SOURCE_CONTROLS_AND_RESURRECTION.md) â€” source bindings, original death dialog, saved-zone HP/TP recovery and one-session testing policy.
- [INTRO face/hair camera and offline selection exit](../client/archive/fixes/INTRO_CAMERA_AND_SELECTION_EXIT.md) â€” native model-height correction, saved-roster runtime evidence and persistent failure logs.
- [Mandara navigation, NPC services and INTRO hardening](../client/archive/checkpoints/MANDARA_NAVIGATION_NPC_INTRO.md) â€” collision-checked routes, camera obstruction, original dialogue, merchant buy/sell, save points, input guards and crash reporting.
- [Native gameplay parameters](../client/reference/gameplay/NATIVE_GAMEPLAY_PARAMETERS.md), [status](../client/reference/gameplay/NATIVE_CHARACTER_STATUS.md) and [effect ticking](../client/reference/gameplay/NATIVE_EFFECT_TICKING.md) â€” `_remake\docs`; source/fixture details and limits.
- [Final client layout](../client/guides/FINAL_CLIENT.md) â€” `_remake\docs\guides\FINAL_CLIENT.md`.
- [Server/manager implementation plan](../server/IMPLEMENTATION_PLAN.md) â€” `_server_cpp\IMPLEMENTATION_PLAN.md`.

## Current checkpoint

Use the [client progress index](../client/PROGRESS.md), [phased task plan](../client/planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md)
and [documentation index](../client/README.md). Existing offline Mandara,
MainUI/status, movement, inventory, basic combat and NPC services have bounded
implementations. Current HPK presentation, corrected warehouse/save-point
acceptance, full skills/quests/travel/multiplayer and final fidelity remain open.
[Zone01-Zone10 alignment](../client/planning/ZONE01_ZONE10_MAP_ALIGNMENT.md)
records the native map bindings and per-zone tasks. Historical reports are
archived; the dedicated C++ server goal remains [paused](../server/PAUSED_GOAL_PROGRESS.md).
