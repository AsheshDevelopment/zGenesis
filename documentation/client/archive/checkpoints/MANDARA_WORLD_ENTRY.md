# Offline character selection to Mandara1st

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.

Correction: the earlier terrain layout/axis assumptions and 522,242 terrain
triangle count below are superseded by the verified
[Mandara objects/spawn fix](../fixes/MANDARA_OBJECTS_AND_SPAWN.md). The current grid has
513x513 vertices and 524,288 triangles, uses direct terrain Z, and supports
original `_TGA` alpha materials. See [PROGRESS.md](../../PROGRESS.md) for current status.

The previous runtime tests stopped at `INTRO_CHARACTER_WORLD_ENTRY_PENDING`.
That callback only resolved the destination; it did not load a world. Passing
those tests established a character frontend, not a working map handoff.

The production offline path now performs the handoff, loads Mandara1st, obtains
an owned character's starting cell from the original server data, and renders
the character in that map. This is a bounded world-entry implementation. Full
INTRO visual parity and playable world systems remain unfinished.
The later [camera/main-bar continuation](../fixes/MAIN_GAME_STARTUP_AND_HUD.md) supersedes
this report's original camera/HUD boundary and verification snapshot.

## Native sequence now connected

1. Original Info/village selection gates resolve the endpoint and server zone.
   Population checks and the original previous-main-tribe GM exception remain.
2. A changed endpoint disconnects, observes DISCONNECTED, reconnects, waits for
   ALIVE, and sends the 140-byte point-02 MOVE_ZONE record with the chosen name.
   It uses the existing plain-MD5 compatibility proof and version check. The
   same-endpoint branch proceeds directly, as in the source.
3. The real local authority ACK permits INTRO cleanup. It does not request a
   second roster. Character previews and controls are released. An actual final
   INTRO frame completes before the scene is replaced.
4. The loading presentation and main-bar resources are prepared, then OGRE
   releases INTRO geometry, particles and lights while retaining its
   renderer/camera/resource caches and UI nodes. Hidden INTRO UI remains
   allocated; loading sprites survive this release. Lights must be released before their parent
   nodes; leaving one registered caused the first integration crash in OGRE's
   frustum-light lookup, and is now fixed.
5. The original `LOAD_TYPE1.bmp`/`LOAD_TYPE4.bmp`, `IN_Loading_01.bmp` and
   `IN_Loading_02.bmp` are used at the native loading-screen coordinates.
   Separate rendered stages cover map preparation, terrain, collision/placement
   resources, placed geometry and completion. Main-bar texture preparation now
   precedes INTRO map release, following the original .2/.3 progress order.
6. Server zones **1, 18 and 19** retain their distinct routes/data directories
   while resolving client map **40001**, `MAP_Mandara1st.cfg`.
7. After map loading, send the original 56-byte `CSP_REQ_CHAR_INIT` logical
   record: first connection, position 0, portal 0, selected name, empty target.
   The local channel checks its authenticated session and account/group/slot
   ownership. A different character name or duplicate initialization fails.
8. The offline authority reads the complete owned 1,688-byte native MOB from
   SQLite. New-character x/z=-1 invokes the original generation-area policy;
   valid saved cells are retained. Collision placement checks the native TCM
   state and the ascending Z/X radius-1..5 search. The bounded world currently
   has one player and no dynamic NPC/other-player occupancy.
9. The 3,616-byte `SCP_RESP_CHAR_INIT` layout carries the initialized cell,
   inventory, equipment, skills and quests. The byte-layout fixture compiles the
   original client/zone declarations and compares every encoded byte. Cargo,
   event services and timers have only the currently empty offline state.
10. Only receipt of this reply creates the main-character presentation, converts
    the native cell through the map's coordinate function, samples its rendered
    terrain triangle and starts the main-camera interpolation. World frames and
    HUD visibility wait for the source GAMEPLAY camera threshold.
    The character's native face/hair/body/socket resources are retained. Complete
    equipment/inventory/quest application is still a separate unfinished gate.

Source anchors: `Tantra/HTlauncher/HTIntroManager.cpp` selection and point-02
callbacks; `HTLoading.cpp:143`; `HTNetWorkHandle.cpp:50,750`;
`HTMainCharacter.cpp:217`; `HTCamera.cpp:361,505,618`;
`Tantra/DBSRV/CFileDB.cpp` MOVE_ZONE/CHAR_INIT ownership handling;
`Tantra/zone/Server111.cpp:1010,8409,8490,8684`;
`Tantra/zone/GetFunc.cpp:850,1137,1234`; `Tantra/zone/Basedef.cpp:1830`.

## Read-only sources and runtime files

Client source: `C:\_GitHub\TantraSrc\Tantra`.
Client assets: `C:\_GitHub\TantraSrc\TantraClient`.
Server data: **`E:\Global-server`**, supplied by the user. Each route uses its
own `Zone01`, `Zone18` or `Zone19` directory; files from different revisions are
not mixed. `NPCGener.txt` remains in that dataset for the later population work.
Current runtime spawn/collision logic reads only `GenerationArea.idx` and
`MapData.tcm`; these two used files are staged under `system/offline/ZoneXX`.
The staging manifest records their exact source paths and SHA-256 values.

Development can override the read-only root with `--zone-root` or
`TANTRA_ZONE_ROOT`. The self-contained client defaults to its own `system/offline`.
Runtime account tests use **`--offline`, ashesh / ashesh**; runtime endpoints
remain **127.0.0.1** with the source ports. No HTTP/TCP test is needed for this
in-process authority. User profiles remain under `userdata`.

The map loader resolves the actual Map record, CFG, THM, TCC, TML and
`Kathana1Obj.txl`. Regular Mandara archives take precedence over the Kathana pop
archives. It extracts only referenced payloads and retains native relative
paths. There are 708 payloads, including 323 distinct TMB models and 385 map
textures, used by all 6,503 placements. Terrain submits 522,242 triangles;
placed objects submit 380,497 triangles. THM spacing is 20 source units;
collision cells use the original 10-unit convention. Renderer units are scaled
once by 0.001.

One original texture, `r01_common_cart01.bmp`, referenced by
`r01_Stru_demon_tower.tmb`, is absent from both supplied texture archives.
Diagnostics retain this warning and the geometry uses its source diffuse color.
No arbitrary texture alias is substituted. Unused TMB material slots can contain
garbage texture names; zero-index groups retain their bytes without requesting
those nonexistent textures. Used invalid material names still fail decoding.

## Verification and remaining work

`tools/verify-intro-characters.py` now requires the normal client to reach a real
world frame in the create and village-18/19 scenarios. A placeholder boundary
can no longer pass. It checks the ordered reconnect/ACK/cleanup/loading/CHAR_INIT
events, full submitted map counts, main-character transform, actual camera,
loading and world captures, SQLite spawn/route persistence, and normal SDL quit.
Full-village rejection, deletion and empty-roster restarts remain covered.

Current build/runtime evidence is recorded in the implementation plan and the
`build-ogre-sdl/intro-world-*/VERIFIED.json` files. A VERIFIED file includes the
tested executable SHA-256; an old file does not certify a newly rebuilt binary.
The isolated overview probe is a geometry diagnostic, not world-entry evidence.

Prior world-entry verification snapshot (2026-10-22, before the camera/HUD slice):

| Gate | Result / evidence |
| --- | --- |
| Release / Debug selected CTest | 76/76 each, HTTP excluded; `mandara-{release,debug}-ctest.log` |
| Final Release normal application | Six audio-enabled offline processes, five restarts, 25 captures; `intro-world-final-release/VERIFIED.json` |
| Debug normal application | Audio-enabled create-to-Mandara scenario, six captures; `intro-world-debug/VERIFIED.json` |
| Current executable binding | Both final Release and Debug proof SHA-256 values match the tested executables |
| Final runtime folder | 2,272 files / 193,821,704 bytes; original layout, x64 imports and nine exact icon payloads verified |
| Branding / relocated startup | Actual title/icon handles, path-with-spaces startup and offline launcher pass; `mandara-final-inventory.log` |
| Restaging | Private SQLite/unknown files preserved, obsolete ownership rules pass; `mandara-restaging.log` |
| Server source write guards | Configured and canonical zone roots reject user-data writes with exit 2 |

Run `_client/Start-Offline.cmd`, log in with **ashesh / ashesh**, select a server,
create/select a character and choose a Mandara village. The test scripts use
separate temporary profiles and do not change normal saved characters.

Still required: remaining main HUD panels/actions/live stats and INTRO camera/UI fidelity;
world sky/water/material/detail/lighting/effect/BGM parity; NPCs and dynamic
occupancy; source-faithful movement and combat; complete equipment and gameplay
state application; additional map transitions; real transport; dedicated server
and its management GUI. Reaching Mandara does not complete the full plan.
