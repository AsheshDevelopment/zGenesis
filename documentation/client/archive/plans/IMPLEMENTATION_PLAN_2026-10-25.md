# Tantra HTLauncher OGRE x64 remake implementation plan

> Archived 2026-10-25 snapshot. Superseded by the [current phased client plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md) and [current progress](../../PROGRESS.md). Historical hashes/counts are not current acceptance.

## 1. Objective

Create a modern 64-bit Windows client that reproduces the observable HTLauncher
client behavior while using OGRE 14.6.1 for rendering.

Source fidelity is mandatory: reproduce the original HTLauncher initialization,
resource loading order, update/render sequence, UI visibility and focus,
camera transitions, event-driven login/server/character/map progression, and
cleanup behavior. A visually similar asset gallery or an automatic offline
transition to InWorld does not satisfy this requirement. Every implemented
transition needs a native call-site reference and verification of its trigger
and order. Missing behavior stays explicitly unfinished. See
[source sequence trace](../../reference/lifecycle/SOURCE_SEQUENCE.md).

Offline operation with SQLite is also required. It must use the same native
login/server/character/map sequence, with a local authority and persistent
source-backed state. A passing mock transition fixture is not an offline game.
Runtime testing uses offline mode only, with username `ashesh` and password
`ashesh`, in isolated SQLite profiles; online/HTTP runtime checks are excluded.
For current development, all runtime server endpoints use `127.0.0.1`, retaining
the native ports and slot indices. Historical source IP addresses are never used
as runtime destinations; the canonical server-list files remain unchanged.
INTRO explicitly includes character roster, creation, selection and deletion,
their native previews/UI/cameras/messages, request/response order and SQLite
persistence. Login plus server selection is not a completed INTRO. See the
[character-flow source contract and pending acceptance gates](../../reference/lifecycle/INTRO_CHARACTER_FLOW.md).
The later dedicated server and management GUI belong in
`C:\_GitHub\TantraSrc\_server`. The GUI must follow the supplied zEngine server
management reference, adapted to Tantra. See the
[server and GUI implementation plan](../../../server/archive/rust/ROOT_IMPLEMENTATION_PLAN.md).

The remake will live in:

    C:\_GitHub\TantraSrc\_remake

The final runnable client belongs in `C:\_GitHub\TantraSrc\_client`. It must be
named **Tantra Online**, contain `HTLauncher.exe` and only its required runtime
files, and follow the original top-level `resource` and `system` layout. The
user-supplied `A:\zEngineK2\client\resources\ZFLauncher.ico` is copied into
project-owned branding assets and embedded in the executable/window. See
[build, staging inventory and branding verification](../../guides/FINAL_CLIENT.md).

The layout references are specifically `TantraClient/resource` and
`TantraClient/system`: retain loose assets' relative paths and original names,
including `resource/etc` logos, and put used unpacked archive entries in their
corresponding native resource family. Staging must derive destinations from
native provenance, not development-cache folders. Only integrated runtime
dependencies are distributed; SQLite saves live separately in `userdata`.

Canonical read-only inputs are:

    C:\_GitHub\TantraSrc\TantraClient
    C:\_GitHub\TantraSrc\Tantra
    B:\__TANTRA\TantraDataScripts

The supplied OGRE inputs are:

    C:\Users\Ashesh\Downloads\OGRE\ogre-14.6.1
    C:\Users\Ashesh\Downloads\OGRE\ogre-sdk-v14.6.1-msvc142-x64

The original VC7.1 project, client deployment, and data-script folders remain
unchanged. The remake owns only its CMake files, modern C++ source, import
tools, derived assets, runtime staging, and tests.

## 2. Current baseline

The full checkbox tracker is [PROGRESS.md](../../PROGRESS.md). It distinguishes
verified components from normal-client integration and lists every remaining
phase, delivery gate and dedicated-server/GUI obligation. The broad goal is
paused; Mandara object/spawn, alpha/detail textures and that tracker are the current scoped
requests. Earlier baseline entries below are historical checkpoints.

2026-10-22 Mandara correction: the earlier THM layout and terrain-axis assumptions
were wrong. The native loader uses a 16-byte header, 260-byte texture descriptors,
and a `(cellsX+1)*(cellsZ+1)` vertex array, with direct positive terrain Z.
The corrected Mandara grid is 513x513 vertices / 524,288 triangles. Collision
indices alone reverse Z. Spawn height now uses the highest of corrected terrain
and the TCC object floor. See [object/spawn correction](../fixes/MANDARA_OBJECTS_AND_SPAWN.md)
and the current checkbox status for verification and staging.
The [terrain detail follow-up](../../reference/rendering/TERRAIN_DETAIL.md) now samples the original
`detail.dds` on all 16 Mandara sections with native repeating UVs and multiplication,
verified by real GPU on/off captures and normal offline world entry.
The follow-up world material path now reads actual DDS alpha, including the
original `_TGA` textures. Normal offline Mandara rendering verifies 39 alpha
textures / 708 blended batches. The user's `pop_Env_Ngrass2b_TGA.dds` and 48
original alpha textures have data checks; full native material pixel parity
remains open.

2026-10-22 Init-world continuation: native clan resolution, aggression/tolerance
selection, movement/detection initialization and ordered zone-settings messages
now run before point/skill/equipment calculation. The original siege-entry
search and authored tolerance binding are included. The focused probe passes
157 checks. Persistent world/rank/guild services, remaining cleanup and normal
offline status integration remain unfinished. See
[source phase and verification](../../reference/gameplay/NATIVE_INIT_WORLD.md).
Release and Debug full builds and 93/93 selected tests in each configuration
pass (HTTP runtime excluded).
No new normal-client runtime proof or final-client restaging is claimed.

2026-10-22 world-context continuation: the native server's earlier class/quest
preparation is now applied and persisted during offline world initialization.
A native INI reader loads all 42 numeric world-setting reads and country/zone
context from the selected dataset. The focused probe passes 556 checks, with
additional SQLite roster persistence coverage. Normal calculated status/world
notification integration and remaining world services remain pending. See
[source sequence, settings scope and verification](../../reference/gameplay/NATIVE_WORLD_CONTEXT.md).
Release and Debug full builds and 91/91 selected tests in each configuration
pass (HTTP runtime excluded).
No new normal-client runtime proof or final-client restaging is claimed.

2026-10-22 effect-ticking continuation: native CheckAffections, the complete
periodic dispatcher and elapsed-time arithmetic now drive expiry, healing,
TP recovery/burn and source status ordering in the persistent status session.
The focused probe passes 108 checks. Periodic damage/death, full world context,
SQLite lifecycle and normal offline-channel integration remain pending. See
[source behavior and verification](../../reference/gameplay/NATIVE_EFFECT_TICKING.md).
Release and Debug full builds and 90/90 selected tests in each configuration
pass (HTTP runtime excluded).
This adds calculation/lifecycle checks, without final-client restaging or a
new normal client runtime proof.

2026-10-22 entry-effect continuation: a stateful native status session now keeps
effect records, skill/RNG state and ordered notifications. Original effect
registration/removal, continuous entitlement bonuses and the entry-status
sequence are compiled against project-owned state. Owner and nearby-grid
delivery are explicit. Effect ticking/periodic combat, remaining world services,
SQLite lifecycle and offline-channel integration remain pending. See
[source behavior and verification](../../reference/gameplay/NATIVE_ENTRY_EFFECTS.md).
Release and Debug full builds and 89/89 selected tests in each configuration
pass (HTTP runtime excluded); the focused entry-effect probe passes 533 checks.
This is calculation/message work, without final-client restaging or a new
normal client runtime proof.

2026-10-22 class/skill migration continuation: the active native Init prelude
repairs classes, migrates tribe skills and preserves recursive ResetSkill
notifications before the outer initialization resumes. The focused status probe
passes 2,617 checks. Remaining world initialization, timed effects, SQLite
lifecycle and offline-channel integration are unfinished. See
[source sequence and current verification](../../reference/gameplay/NATIVE_CASTE_STATUS.md).
Release and Debug full builds and 88/88 selected tests in each configuration
pass, excluding HTTP runtime checks.
This is calculation/message work; no new normal runtime or final-client
restaging is claimed. Earlier checkpoints retain their original proof scope.

2026-10-22 caste/status continuation: native initialization point bookkeeping,
CheckCaste, CalCasteSkillPoint and NotifyUpdateUIMsg now produce ordered logical
notifications from calculated state. New learn/bonus codecs retain native bytes;
authored class/level inputs bind explicitly. The focused caste/status probe
passes 203 checks. Full initialization validation/migrations, timed effects,
world services, SQLite lifecycle and offline-channel integration remain pending.
See [source behavior and verification](../../reference/gameplay/NATIVE_CASTE_STATUS.md).
Release and Debug full builds and 88/88 selected tests each pass (HTTP runtime
excluded). These are calculation/message checks, with no new normal runtime
proof or final-client restaging. Changes remain uncommitted.
Earlier checkpoints below retain their original build/runtime scope.

2026-10-22 skill/probability continuation: the native skill-book/passive segment
now runs before the equipment/stat pass. Original TNDeck100/TNRate methods use
an explicit carried Windows CRT stream; source-oracle sequences, rollover,
reinitialization and snapshots are covered. The skill probe passes 1,271 checks,
including every authored PC skill row. Full Init/caste/timed-effect and offline
notification integration remain pending. See
[source sequence and verification scope](../../reference/gameplay/NATIVE_SKILL_INITIALIZATION.md).
Release and Debug full builds and 87/87 selected checks each pass (HTTP runtime
excluded). These are calculation/probability checks; no new normal-client
runtime proof or final-client restaging is claimed. Changes remain uncommitted.
Earlier checkpoints below retain their original build/runtime scope.

2026-10-22 parameter continuation: complete active item/skill loader bodies now
populate project-owned parameter records and bind the equipment/stat inputs.
The authored Global XML export retains source provenance, native atoi conversion
and physical cell addressing, including the three sparse item rows. Native
refinements come from Basedef.cpp. Skill-book/passive/timed-effect and offline
authority integration remain required. See
[parameter behavior and verification](../../reference/gameplay/NATIVE_GAMEPLAY_PARAMETERS.md).
Release and Debug full builds pass, with 85/85 selected checks each (HTTP runtime
excluded). This continuation adds CPU/data checks; it does not claim a new normal
client runtime test or final-client restaging. Changes remain uncommitted.
Earlier build/runtime checkpoints below retain their original scope.

2026-10-22 equipment continuation: the original 16-slot equipment pass and active
hard-coded sets now run against explicit item/skill/refinement inputs. The source
effect dispatcher resolves permanent equipment variations, mastery, immunity and
skill bonuses; UpdatePoints calculates the configured resistance rates as well.
The Release full build and 83/83 selected tests pass (HTTP runtime excluded);
Release/Debug focused probes pass, including 129 fixed equipment checks. Normal
offline authority, data loading and probability decks remain pending. See
[source behavior, verification and remaining integration](../../reference/gameplay/NATIVE_EQUIPMENT_STATS.md).
The earlier checkpoints below retain their original build/runtime scope.

2026-10-22 local source checkpoint: `HtPcStatProjection` compiles ten original
PC stat method bodies over explicit per-character inputs. Release full build
and **82/82 selected CTest checks** pass (HTTP runtime excluded); its focused
projection check also builds and passes in Debug. Equipment/skill/effect input
resolution, resistance-effect decks, weapon/refinement regression coverage and
normal offline notification generation remain unfinished. The rebuilt development
executable has not been runtime-tested or restaged in this checkpoint. The
staged/package runtime results below retain their original executable hashes.
See [the projection scope and build evidence](../../reference/gameplay/NATIVE_CHARACTER_STATUS.md#next-required-work).

2026-10-22 native status continuation: complete UPDATE_UI/UPDATE_STATUS logical
codecs, source-ordered main-character value handling and world notification
dispatch are added. The pure PC HP/TP/recovery rules pass 1,600 original-function
comparisons; client HP/TP/prana ordering passes 256 transitions. The read-only
authored class/level table importer retains numeric fields and provenance without
asserting equality with deployed encrypted settings. Original HUD update and
integer scaling bodies are compiled, with corrected padded bitmap sizing and
zero extents. GPU component cases pass, but **normal offline authoritative status
is still unfinished**: equipment/skill/effect and remaining stat resolution must
produce the real post-CHAR_INIT notification. No fake notification is emitted.
See [implementation details and current evidence](../../reference/gameplay/NATIVE_CHARACTER_STATUS.md).
Release and Debug full builds and 81/81 selected checks pass (HTTP excluded).
Each configuration passes the four-case GPU status component. Normal final
Release passes six audio-enabled offline scenarios / 31 captures; Debug passes
create-to-Mandara / eight captures. Current proof hashes match the tested
executables. Final staging contains 2,310 manifested files / 194,093,123 bytes;
layout, imports, exact icon/title and relocated startup checks pass.
The earlier camera/HUD and world-entry results below are historical checkpoints.

2026-10-22 main-camera/main-bar continuation: the original loading sequence now
prepares MainUI before releasing INTRO geometry. The stationary main-camera
adapter retains the original update order, interpolation/terrain branches and
11-update GAMEPLAY render gate. An independent fixture compiles 18 source
functions and passes 1,440 comparisons. Five original main-bar panels / 58
controls / 37 textures are connected to the renderer, including version/resolution
gated Interface.sys positions and SDL3 compact/restore. The audio-enabled Release
development package passes create-to-Mandara with GPU HUD/camera checks and
captures. Final-client staging includes only those used MainUI payloads and the
saved layout. See [the implementation and current evidence](../fixes/MAIN_GAME_STARTUP_AND_HUD.md).
Release and Debug each pass 78/78 selected CTest checks (HTTP excluded). The
current final Release passes all six audio-enabled offline scenarios with 31
captures; Debug passes create-to-Mandara with eight captures. Current proof hashes
match their executable files. The staged final folder contains 2,310 manifested
files / 194,075,715 bytes and passes layout, x64/import/icon/title/relocation checks.
Live status updates, remaining panels/actions and moving-character camera modes
are still pending. The results below describe the earlier world-entry baseline;
they do not certify a later rebuilt executable.

2026-10-22 offline Mandara continuation: the previous tests accepted an explicit
`INTRO_CHARACTER_WORLD_ENTRY_PENDING` placeholder. They proved the frontend;
they did not prove map entry. That placeholder is removed from production code.

The normal OGRE x64/SDL3 application now executes server selection, point-01
zone authentication, roster, ten rendered preload gates, native character
screens, village selection, point-02 disconnect/reconnect/authentication,
INTRO cleanup and final render, original loading presentation, Mandara terrain
and all static placements, then native CHAR_INIT and a rendered main character.
Server zones 1/18/19 keep distinct routes while sharing client geometry 40001.
Native character creation/deletion, response-driven SQLite operations, original
UI resources, triangle picking and source selection restrictions remain integrated.

The user supplied **E:\Global-server** for native server data. Starting cells
come from each selected ZoneXX directory's GenerationArea.idx and MapData.tcm.
New-character x/z=-1 remain sentinels until authority initialization; saved valid
positions survive restarts. No invented starting coordinate is used. Account,
world, slot and exact character-name ownership are checked before initialization.
Native request/reply byte fixtures now include CHAR_INIT (56/3616 bytes), along
with the existing 140-byte MOVE_ZONE, roster and complete saved MOB codecs.
SQLite schema remains 3; the owned slot, route, current cell and initial save cell
persist transactionally. Runtime tests use only **--offline, ashesh / ashesh**.
Runtime endpoints are **127.0.0.1**, retaining native ports and indices.

Mandara uses actual Map/CFG/THM/TCC/TML/object-table bindings and 708 referenced
archive payloads. All 6,503 placements / 323 unique models are submitted, with
522,242 terrain triangles and 380,497 object triangles. Regular archives precede
Kathana pop archives. One absent original cart texture is reported explicitly;
unused zero-index material garbage is retained without requesting nonexistent
textures. Final staging follows original resource/system paths, adds only the
used offline spawn/collision files, and preserves userdata and unknown files.

Validation evidence for this continuation is recorded in
[Mandara world entry](../checkpoints/MANDARA_WORLD_ENTRY.md) and the matching
`build-ogre-sdl/intro-world-*/VERIFIED.json` files. Those JSON records bind runtime
results to the tested executable SHA-256. Current verification results are listed
below after final staging; historical component snapshots are not current proof.

Current continuation results: Release and Debug each pass 76/76 selected CTest
checks (HTTP excluded); Release's final asset-closure adjustment passes its
recheck. Final Release passes six audio-enabled offline SDL3 processes / five
restarts / 25 captures, including Mandara entry through routes 1/18/19. Current
Debug passes the create-to-Mandara runtime scenario. Both runtime proof files
match their tested executable hashes. The staged Release `_client` contains
**2,272 manifested files / 193,821,704 bytes**, with original layout, hashes,
x64 imports and nine exact icon payloads verified. Actual title/icon handles,
relocated offline startup and save-preserving restaging also pass; see
[FINAL_CLIENT.md](../../guides/FINAL_CLIENT.md).

**INTRO and the full plan remain incomplete.** Remaining HUD panels/actions and
status updates, NPC population/dynamic
occupancy, movement/combat, complete equipment/gameplay-state application,
world sky/water/material/detail/lighting/effects/BGM parity, additional map
transitions, face camera and remaining three-slot/failure UI fidelity, real
transport, dedicated server and management GUI are still open. The current
stationary startup camera interpolation and terrain branches now have a source
oracle; the model-height query adapter and moving-character camera fidelity
remain unproven. Compressed mip tails and GDI
font parity remain explicit renderer limitations.

The following entries are earlier implementation/verification snapshots.

2026-10-22 native PC preview continuation: a table-selected creation appearance
component now assembles native skin parts around each body's original bind
hierarchy and attaches independently animated hair/aprons through validated
native sockets. The OGRE/SDL3 diagnostic renderer exercises all 200 supported
creation combinations (eight tribes × five faces × five hairstyles), 595 socket
instances, four LODs, visibility, transform inheritance, recursive destruction
and peer isolation. Eight real captures are checked for visible, distinct,
unclipped models. The separate texture ledger verifies 789 unique requested
PCTex payloads without changing source assets. See
[source evidence, commands and remaining limitations](../../reference/assets/NATIVE_PC_PREVIEWS.md).
At this earlier component checkpoint, production INTRO still stopped after
server selection. The frontend continuation above supersedes that boundary;
world entry and full character-presentation fidelity remain open.

Verification: Release and Debug pass 72/72 CPU/resource/persistence checks and
the explicit 200-appearance GPU/capture verifier. The native socket shader
constants and effective transforms are checked for every attachment LOD record;
both runs observe at most `1.19209e-07` matrix element error. Creation keeps the
body animation deferred until after equipment/socket assembly, with the native
STD start order checked at runtime. Existing gallery/lifetime/default-INTRO
regression smoke and the 115-file final layout/relocation checks also pass in
both configurations. Audio-enabled offline login/server restart checks pass.
The final renderer-only order/bounds changes were followed by fresh GPU/regression/layout
checks; CPU executables were unchanged. Release's extended socket fixture and
restaged development-package inventory pass targeted rechecks. Evidence uses
`build-ogre-sdl/pc-*.log` and `pc-preview-{release,debug}/VERIFIED.json`.

2026-10-22 final-client layout and branding: `_client/HTLauncher.exe` now uses
the Tantra Online product/window name and the exact supplied nine-frame icon.
The `tantra_final_client` target stages the currently integrated normal INTRO
closure into the original-style `resource`/`system` hierarchy. The manifest
contains 115 runtime/notice files (101 source/derived assets), with x64 PE/import,
exact ICO payload, real window title/icons, relocation, offline launcher and
resource-write-guard verification. Actual audio-enabled SQLite restart and
loopback login/server GPU checks pass using only this folder's resources.
Restaging preserves private SQLite data and unknown/edited files. See
`docs/FINAL_CLIENT.md` and `build-ogre-sdl/final-client-*` logs.

| Current component gate | x64 Release | x64 Debug |
| --- | --- | --- |
| Current CTest coverage | 72/72 pass, extended fixture/package rechecks pass | 72/72 pass |
| Native creation-preview GPU/capture component | 200 appearances / 595 sockets pass | 200 appearances / 595 sockets pass |
| Final-layout inventory and PE/import checks | 115 files pass | 115 files pass |
| Exact nine-frame ICO, real title/icons, relocation and offline launcher | Pass | Pass |
| Audio-enabled SQLite login/server flow across two processes | Pass | Pass |
| Earlier audio-enabled loopback rejection/retry and server GPU baseline | Pass | Pass |
| Private-SQLite/unknown-file/obsolete-file restaging fixture | Pass | Not separately run |

The user's `_client` contains Release. Debug was staged and exercised separately
under `build-ogre-sdl/final-client-debug`; it does not replace that Release copy.
The 72 checks include the source-width zone/character fixture and local channel
ownership/session tests, plus the selected production asset closure. None of
these checks establishes rendered character creation/selection/deletion.

Source-path layout verification now retains original loose-file destinations,
including both logos in `resource/etc`, and derives extracted entry locations
from native archive provenance. Release and isolated Debug pass the full
115-file layout/relocation checks. Release SQLite/audio/server flow and the
old-logo migration/private-data restaging fixture also pass. The Release CTest
rerun corrects a test offset that changed the first material group rather than
the declared triangle total; no decoder change was needed for that correction.
See `build-ogre-sdl/layout-*.log` and `docs/FINAL_CLIENT.md` for evidence.

The native logical zone request/reply now has a source-compiled 140/16-byte
fixture. A local SQLite character channel rechecks the existing account proof,
gates roster/CRUD on authentication, queues actual native result frames and
invalidates stale responses after account/world/session changes. It remains
unconnected at this earlier checkpoint. It is now integrated with the offline
character frontend above; complete character presentation and world entry remain
required gates. The dependency scan also confirms an existing unsupported
`SkyTerrain.tmd` UV-layout path; it remains a rendering task.

2026-10-22 INTRO character backend continuation: the active Basedef records,
tribe mapping, DB starter state and native create/remove results are now traced.
Explicit x64-safe codecs cover the 168-byte roster entry, three-slot reply and
complete 1,688-byte saved mob. SQLite schema 2 adds transactional owned
create/select/delete, first-free-slot allocation, per-world name uniqueness,
deletion backups and migration from account-only schema 1. Both x64 builds pass
69/69 CTest cases; the final Release persistence probe additionally checks
selected-slot survival across reopen and clearing on deletion. The Debug full
suite includes those final assertions. See
[source evidence and component limits](../../reference/protocol/NATIVE_CHARACTER_RECORDS_AND_SQLITE.md).

At that backend-only checkpoint server selection stopped at
`INTRO_ZONE_CONNECTION_PENDING`. The production continuation above now calls
those APIs through offline zone authentication, roster/render gates and the
original character screens. It does not complete world entry or every native
character-presentation requirement. End-to-end acceptance remains
tracked in [the INTRO contract](../../reference/lifecycle/INTRO_CHARACTER_FLOW.md).

Character component build/test logs use `build-ogre-sdl/intro-characters-*`.
Both updated packages pass manifest/provenance verification (99 assets),
two-process SQLite login/server GUI persistence with original audio, and the
loopback HTTP rejection/retry flow. These runtime checks end at the existing
server-selection boundary; they do not exercise character screens.

2026-10-22 native web login and SQLite continuation: credential preparation,
native result/status parsing, successful gate attacks, inclusive 1000ms delay,
SERVER camera and original server-selection panel are integrated. Cancel
returns through the source STD animations and LOGIN camera. An explicit
`--offline` backend uses SQLite for persistent local accounts, source world/zone
status and selected native group/slot. The first nonempty offline login creates
a local account; later logins verify it. A separate explicit loopback HTTP
adapter exercises the native request order. See
[implementation, source references and limits](../../reference/protocol/NATIVE_WEB_LOGIN_AND_OFFLINE.md).
At that checkpoint character roster/create/select, zone authentication,
authoritative world simulation and gameplay persistence were unfinished. The `_server` GUI is
planned, not implemented. Final verification results follow below.

Verification completed for this component in both x64 configurations:

| Gate | Release | Debug |
| --- | --- | --- |
| Full CTest baseline | 66/66 pass | 66/66 pass |
| Final focused login/SQLite/transition/raster regressions | 5/5 pass | 5/5 pass |
| Packaged SQLite offline GUI, two separate process launches, original audio | Pass | Pass |
| Packaged loopback HTTP rejection/retry and original audio | Pass | Pass |
| Existing SDL3 input/saved-ID/Cancel and general runtime smoke | Pass | Pass |
| Package manifest and 99 source-asset provenance records | Pass | Pass |

The final focused checks include the native 25-byte world-name content limit
inside a 26-byte buffer, case-insensitive same-ID billing comparison, and a
Unicode SQLite path. Final packaged offline/HTTP GUI tests were repeated after
those corrections. A separate fresh-package test proves private SQLite files
survive repackaging and stay outside the manifest. The packaged Release
`run-remake.ps1 -Offline` launcher also starts, creates its store and exits
cleanly in an isolated fixture. Logs use `build-ogre-sdl/offline-sqlite-*`;
captures/traces use `native-{auth,offline}-{Release,Debug}-*`.
Client and server trees remain uncommitted; the full plan is still active.

2026-10-22 native login controls: normal intro now accepts SDL3 committed text,
source focus/Tab/Escape/Backspace, masked passwords, original three-state
buttons, native saved-ID format and deferred Cancel cleanup/exit. Hash-pinned
native inspection supplies the exact BMP key and one-mip UI path. Six selected
textures are resident before BGM; saved ID loads after logo hiding and before
gates. Original ETCSound 33523 plays as finite stereo 2D audio. Both x64 builds
pass 62/62 CTest checks, packaged SDL3/GPU input and Cancel verification,
real stereo click checks, general runtime smoke and 95-row provenance checks.
See [native login control evidence and limits](../../reference/presentation/NATIVE_LOGIN_CONTROLS.md).
Authentication, full IME/pixel/acoustic parity and subsequent client states
remain unfinished. The previous intro exit-confirmation assumption was wrong:
the source queues exit and cleans up on the next update. The full plan stays active.

2026-10-22 native login presentation prerequisite: the complete HTMessage
catalog and read-only locale header now supply the original five login labels,
Arial height 14 for the supplied country profile, source integer alignment and
two black shadow passes. Real OGRE text sprites are created hidden before the
logo frame and revealed only after the camera completes. Both x64 configurations
pass 60/60 CTest checks and refreshed-package runtime/provenance verification.
Five additional source UI BMPs are extracted and packaged (94 provenance rows).
See [native evidence and remaining controls](../../reference/presentation/NATIVE_LOGIN_PRESENTATION.md).
At that snapshot, BMP transparency, edit/focus/IME, buttons, saved ID and login
transport remain unfinished. This is a presentation prerequisite; it does not
complete interactive UI or the full remake plan.

2026-10-22 native intro motion sound: Map 40100 -> Monster 2077 -> FXMon 61040
now resolves seven original samples from MONSound_K1.hpk. Initial WLK/RUN
StartAnimation calls remain silent; later changes preserve immediate sample
requests, finite play counts and the ordinary ATK2/skill sound RNG rules.
The missing ordinary ATK2 random call is corrected. SDL3 decodes and caches the
original IMA WAVs, and the x64 spatial output adapter receives native source-unit
offsets, distances and volume. Release and Debug each pass 57/57 CTest checks;
dedicated backend and integrated intro audio verification accompany normal
package/runtime verification. Provenance now includes all seven samples (89 rows).
See [native motion sound evidence and limits](../../reference/presentation/NATIVE_INTRO_MOTION_SOUNDS.md).
Miles acoustic parity, general moving/infinite sample behavior, interactive UI,
networking and later gameplay remain unfinished. The full plan stays active.

2026-10-22 native intro fire runtime: the default intro now queues the original
two fire groups after null-anchor creation, creates their four authored emitters
on the first FX update and advances them from the following update. FX runs
after model animation and before rendering. Native activation, priority/front
plane rules, continuous looping, absolute clocks, particle/world unit conversion,
billboard geometry, vertex colors and distinct fire/smoke blending are connected
to real OGRE batches. Both x64 configurations pass 55/55 CTest checks and
refreshed-package runtime/provenance verification. Runtime checks read actual
GPU positions, UVs and colors and test release/recreation. The corrected capture
shows blue fire above both braziers. See
[native runtime evidence and limits](../../reference/presentation/NATIVE_INTRO_FIRE_RUNTIME.md).
This completes the selected intro-fire component. General FX, full visual parity,
motion sound, interactive login, networking and later gameplay remain unfinished;
the full implementation plan remains active. No commit or push was performed.

The dated entries retain earlier validation snapshots. Their pending-fire and
pending-intro-motion-sound statements are superseded by the integrations above.

2026-10-22 native particle mathematics: added the source mode-2 CPU emitter
subset for the two intro fire nodes, private CRT/lookup RNG, source emission
and integration order, early expiry, scalar/color sampling and premultiplied
vertex color packing. Both configurations pass 54/54 CTest checks. The component
is not yet connected to the application's FX lifecycle or OGRE drawing; fire
remains pending there. See `docs/NATIVE_PARTICLE_MATH.md` for native evidence,
supported profile and the remaining visibility/geometry/clock integration.

2026-10-22 structured intro fire resources: added full native TFX record decoding
and Map 40100 -> FXMonsterEtc 1300143 -> intro_MFire routing. Normal startup
prepares the correct MonsterEtc document before hiding the logo; both source
particle textures are extracted and included in 82-row package provenance.
Both configurations pass 53/53 CTest checks and packaged runtime smoke.
Fire simulation/rendering remains unfinished; the two requests explicitly report
simulation pending. See `docs/INTRO_FIRE_RESOURCE_GRAPH.md` for native layout
evidence, source ordering and the remaining emitter work.

2026-10-22 native intro BGM: startup now resolves original catalog ID 30015
(`Japan_Battle_Final.mp3`), consumes the source RNG call and starts its stream
before logo presentation. The audio service supports finite two-pass playback,
explicit volume, instance isolation and stop-on-disable. Both x64 configurations
pass 52/52 CTest checks, general runtime smoke and real audio backend checks
with a short MP3 completion fixture plus the original full track. Motion sounds,
master volume, mixing/fades and acoustic parity remain incomplete. See
`docs/NATIVE_INTRO_MUSIC.md`.

2026-10-22 intro rigid materials: corrected the native 17-float material stride
and complete per-material triangle-count table. The intro stone mesh now renders
all 56 groups / 18,960 triangles with 51 original archive textures. Package
provenance has 80 entries. Both x64 configurations pass 51/51 CTest checks and
packaged runtime smoke. Full material lighting/alpha, terrain/sky, missing
placements, effects, UI and later states remain unfinished. See
`docs/INTRO_MAP_MATERIALS.md` for native evidence and the rendered capture.

2026-10-22 normal intro gates: native model/texture creation, sequential transforms,
finite WLK/RUN starts, null anchors, distance LOD, STOP-to-STD and normal-start
random animation checks are integrated into the default intro. The camera now
uses the source's explicit up vector. Debug and Release each pass 50/50 CTest
checks and packaged runtime smoke. Fire requests and sounds remain pending;
complete scene/appearance, interactive login and later client states remain
unfinished. See `docs/NORMAL_INTRO_GATES.md` for source order and evidence.

The component entries below record earlier validation snapshots. Their pending
integration statements are superseded by the normal-intro baseline above;
they do not represent additional completed full-client gates.

2026-10-22 authored bind skinning: the skinned backend now applies animated
world matrices against inverse authored TMB bind matrices, with original raw
weights. The source's non-control position mode is exposed explicitly for
character creation. Read-only binary evidence and CPU checks cover the
selected Asura/Tiger data; an isolated character inspector supports visual
review. Full geometry/material/appearance parity, other engine modes and
full intro scene assembly remain unfinished. See `docs/AUTHORED_BIND_SKINNING.md`.

2026-10-22 ChangeAnimation component: the skinned renderer now supports the
inspected state-4 local-transform blend for zero play-time overrides, including
frozen old phase, interruption and native target promotion. AniInterTime is
read from the original startup configuration. A runtime fixture executes the
source STOP-to-STD request through this path. The renderer retains one preview
bind reference across clips; native bind matrices, sounds, nonzero play-time
paths and normal intro gate assembly remain unfinished. See
`docs/NATIVE_CHANGE_ANIMATION.md`.

2026-10-22 native pose correction: local rotations now use the inspected scalar
spherical interpolation formula, including hemisphere choice and FLT_EPSILON
branch. The skinned STOP draw path forces alpha one on the retained interval;
the earlier assumption that STOP froze the previous fractional geometry was
incorrect and has been removed. Native blend setup/completion evidence is
recorded, but full ChangeAnimation and native bind skinning remain unfinished.
See `docs/NATIVE_ANIMATION_POSES.md`.

2026-10-22 finite animation playback: the skinned backend now shares one native
model clock across each owner's detail records. Finite one/two-loop STOP,
retained clock-phase reporting, explicit restart, missing-binding rejection, isolation
and recreation have runtime coverage. The source gate scheduling component
preserves STOP fallback before login-delay, clock and shared RNG, including
skill 3612 requests. Native change-animation blending, sounds, skinning parity
and normal gate assembly remain unfinished. See `docs/FINITE_ANIMATION_PLAYBACK.md`.

2026-10-22 skinned detail selection: the shipped binary's named-detail path
maps levels 0..3 to `_L1`..`_L4`, with initial level zero. The renderer now
exposes explicit detail selection/state and keeps owner visibility separate.
The Tiger runtime fixture verifies one visible record per level, two-instance
isolation, invalid-level handling, and destruction. Per-record skeleton names
are retained and validated before shared pose binding. The 50-bone Tiger walk
binding is covered by a CPU fixture. Native gate assembly and skinning parity
remain pending; the native sequence is not replaced with the diagnostic
fixture. See `docs/MODEL_DETAIL_SELECTION.md`.

2026-10-22 native distance evidence: read-only inspection of the shipped
HTLauncher/HT3DHeaven binaries identifies the model-distance vtable slot and
its 3D vector-length operation. Added a source-unit distance function and
corrected TooFar to the shipped launcher's value 4 (the local compatibility
header says -1). Intro camera interpolation now retains source coordinates
until the renderer boundary. The inspection tool rejects unknown binary hashes
and saves reproducible disassembly evidence. Numerical runtime/x87 parity,
mesh-detail application, and gate rendering remain unfinished. See
`docs/NATIVE_MODEL_DISTANCE.md`.

2026-10-22 monster geometry and source render profile: the bounded TMB record
discovery now supports White Tiger detail names without PC/Type prefixes and
validates all four complete records. Ported the active source character LOD
threshold function and added LOW/MEDIUM/HIGH configuration loading. Normal
startup now uses the selected source resolution and camera near/far/FOV, and
chooses the correct startup logo for its initial width. Both configurations
pass 41/41 tests and runtime sequence checks; an isolated 800x600 configuration
was verified without modifying canonical inputs. Gate assembly and native
distance/detail application remain pending. See `docs/MONSTER_GEOMETRY_AND_LOD.md`.

2026-10-22 native resource catalog: added complete-boundary decoding for all
46 ClientRes sheets, with explicit 200-byte source / 188-byte deployed Item
profiles and typed type-10 Monster lookup. Intro monster 2077 resolves through
native IDs to White Tiger model/texture and Tiger WLK/RUN animations. Startup
loads the catalog before intro UI and records the gate binding after map object
resolution. Gate rendering remains pending and emits a specific diagnostic;
no filename guess or simultaneous LOD rendering substitutes for native behavior.
See `docs/CLIENT_RESOURCE_CATALOG.md` for layouts, evidence, and verification.

2026-10-22 source sequence correction: application startup no longer advances
automatically to character selection and InWorld. `enterIntro` retains Intro,
with character selection requiring an explicit subsequent event. A normal
startup sequence controller gates map submission on a successfully rendered
logo UI frame, hides the logo for map presentation, updates the source INIT to
LOGIN camera weights by 0.02 per source update, and shows login only at camera
completion. Runtime smoke requires the ordered lifecycle trace and runs a
60-update default intro alongside separate gallery/lifetime tests. Full native
update handlers, gate mobs/attached FX, input/focus, restart paths, and later
network-driven transitions remain unfinished; see `docs/SOURCE_SEQUENCE.md`.

2026-10-22 source-camera baseline: added an engine-independent `CameraView`
descriptor and validated OGRE camera application. Default intro uses the native
login eye/look from `HTIntroManager.cpp` and the supplied startup profile's
near/FOV (scaled near 0.005, FOV 45.91). The terrain no longer receives an
unrelated centering offset: its retained ten-unit grid starts at positive X
zero with inverted source Z. Exact THM spacing remains an assumption requiring
engine evidence. Unrelated item/character/effect previews and unresolved-object
markers now require `--asset-gallery`; source objects unavailable for rendering
emit `MAP_MESH_UNAVAILABLE` warnings. Runtime smoke covers both gallery/lifetime
and default intro launches. This is not a scene-parity completion gate.

2026-10-22 intro UI sizing correction: replaced viewport-stretched logo/login
quads with native pixel dimensions and original window anchors. The 1024x512
logo is centered; the 512x256 login texture begins at screenWidth/2-150,
screenHeight-400, following `HTIntroManager.cpp` and `HTInterface.cpp` texture
registrations. Pixel sprites use a dedicated clip-space shader, overlay queue, and
disabled depth writes, keeping their screen geometry independent of the camera.
Resize recomputes anchor positions while preserving pixel dimensions. Added
direct-copy provenance and packaging for the 1024 logo. The six unrelated
texture-gallery icons now require `--asset-gallery`. Full UI input, text,
buttons, and state-dependent visibility remain unfinished.

2026-10-22 multipart pose correction: all 11 ASURA parts now share one validated
character skeleton binding and use the same frame-zero bind preview. Previously
only the first part used that correction; additional parts used direct weighted
transforms. The sampler accepts each part's own vertices and expanded influence
mapping, checks matching skeleton names, and rejects incompatible parts. The
character probe checks all 11 parts for frame-zero position reconstruction and
finite changing animation, plus skeleton mismatch rejection. Runtime smoke
requires an explicit 11-part shared-pose diagnostic. Missing source hierarchy
now prevents binding instead of leaving the renderer with a broken preview.
This fixes consistency between parts; it does not establish native bind parity.

2026-10-22 vertex influence correction: decoded the explicit group-to-render-
vertex mapping following the bone/weight tuples. Basic's 45 groups cover all
66 vertices; Chest's 111 groups cover 117. All preview deformation paths and
multipart OGRE submission now use expanded per-vertex influences. The decoder
validates unique complete coverage and the trailing copy of every position;
malformed mappings are rejected. See [mapping evidence](../../reference/assets/TMB_VERTEX_INFLUENCE_MAPPING.md).
This removes the earlier sequential group assignment; native skinning parity
remains unfinished.

2026-10-22 source hierarchy correction: the TMB reader now decodes the final
324-byte skeleton-tree records (name, affine matrix, child count). Basic and
Chest fixtures validate 58 names, finite affine matrices, and one complete
depth-first parent tree. `HtCharacterInstance` now uses the decoded parents,
replacing the earlier name-based assumptions that incorrectly attached several
limb and weapon bones. Stored matrix roles and native skinning remain open;
see [TMB skeleton evidence](../../reference/assets/TMB_SKELETON_TREE.md). Probes also corrupt a
temporary tree copy to check rejection and absence of stale hierarchy data.

2026-10-22 animation timing update: `renderOneFrame(deltaSeconds)` now advances
rigid animation, weighted animation, and bounded effect presentation using
elapsed seconds rather than one source frame per rendered frame. The application
passes monotonic `steady_clock` deltas; callers can supply explicit timesteps
(the no-argument compatibility call remains a fixed 1/30-second step). Shared
playback-clock logic preserves the fractional remainder across loop boundaries
and ignores negative/non-finite deltas. A source-ASURA probe compares the pose
after two seconds at 30, 60, and 144 render updates per second and tests a
multi-loop stall remainder. This corrects playback-speed dependence on GPU
throughput; it does not establish native skinning or effect fidelity.

2026-10-22 object-lifetime update: multipart character instances now retain an
owner name so visibility, transforms, and destruction operate on all parts.
Destruction erases animation entries before freeing scene nodes/ManualObjects,
and duplicate active character names are rejected. Both rigid deletion paths
now remove matching base-position entries along with animated nodes, and rigid
transform updates also update the animation base position. The packaged smoke
check uses `--verify-object-lifetime` to exercise two 11-part create/update/
render/destroy/recreate cycles and both rigid deletion APIs, rendering after
deletion to catch stale animation references. Native skinning/material parity
and the other incomplete gates below remain open.

Fresh Debug staging exposed a previously masked dependency gap: SDL3.dll was
optional in packaging and survived only in reused output folders. Packaging now
requires the SDL3 DLL built for the selected configuration, and by default
selects OGRE's bin folder from the build's cached OGRE_DIR (with the staged
plugin configuration as fallback). Fresh Debug and refreshed Release packages
exercise the lifetime checks against the matching runtime dependencies.

Already implemented:

- Independent CMake project in _remake.
- C++17/MSVC build configuration.
- 64-bit generator guard.
- OGRE SDK discovery through OGRE_DIR.
- Optional SDL3 source integration from `external/SDL3`, using an SDL-created
  Win32 window handle with OGRE and SDL event polling in the application loop.
- Explicit facade/backend resize handling now updates the OGRE render window and
  camera aspect ratio from SDL3 pixel-size events.
- OGRE 14.6 x64 backend library with Root, RenderWindow, SceneManager, and
  camera initialization.
- Standalone x64 Win32 executable with external-window OGRE Direct3D11
  initialization and a deterministic clear-screen render loop.
- Staged OGRE runtime files under runtime\ogre.
- First five-second runtime smoke test from runtime\ogre completed without an
  early exit; the OGRE log confirms Direct3D11 subsystem creation.
- Original resource\map\Map_Intro.cfg parsing with source clear-color values
  applied to the OGRE viewport.
- Original resource\etc\Intro_logo_800.bmp registered through OGRE's
  filesystem resource group and submitted as a textured quad.
- Source-faithful rigid TMD reader for text sky meshes, with an Intro sky
  conversion to OGRE manual objects and explicit legacy-to-OGRE world scaling.
- HPK index reader/probe for Intro TerrainTex.hpk, preserving entry names and
  size/position metadata without modifying the source archive.
- Verified HPK payload extraction for c1_jina6.tga and c2_jina6.tga into the
  ignored derived-assets/intro cache, with TGA header/size checks and OGRE
  resource-root wiring.
- Added extraction and OGRE registration for the original SkyTerrain.dds and
  SkyTerrain.tmd pair.
- Added HtRenderFacade as the application-facing renderer interface; OGRE
  backend types are now private behind that facade.
- Added facade/backend ambient-light and point-light operations with typed
  creation failure diagnostics, covering the basic-light portion of the
  renderer interface.
- The Intro shell now exercises those operations with a deterministic ambient
  level and `IntroKeyLight` point light; packaged forced and graceful runtime
  checks pass with the light active.
- Added and tested the offline client-state flow through InWorld, disconnect,
  and shutdown; live networking remains intentionally disabled.
- The standalone executable now drives its renderer through that offline state
  flow before entering the map loop and shuts the session down cleanly.
- Added a Map_Intro resource-closure probe covering the map config, terrain
  metadata, sky meshes, and TerrainTex.hpk inputs.
- Added the first original Intro UI HPK extraction and UI sprite submission;
  UI_Picture01_32X32.bmp is generated into derived-assets/ui and rendered
  through the facade with depth testing disabled.
- The standalone shell now includes the extracted UI asset in its build-time
  derived-resource preparation and runtime resource roots.
- Added deterministic command-line overrides for client, derived, UI,
  character, effect, and capture roots, plus `--audio`, `--no-terrain`,
  `--diagnostic-only`, `--render-device`, and `--auto-exit-frames`. Environment variables remain
  supported as the fallback configuration source.
- Added a bounded rigid TMB reader/probe for ITEM_Fallen_Gem_01.tmb and
  rendered its 10-vertex/24-index item mesh with fallback material handling
  when the referenced item texture is not directly exposed.
- Added a bounded original `PC_Asura_Basic.tmb` character-mesh submission to
  the OGRE scene with a distinct node/material and fallback material handling;
  the source mesh probe is now covered by CTest. This is a first character
  geometry slice, not full multi-part equipment or skeletal animation.
- Extended the character scene slice with original Asura Type-A chest, face,
  boot, and hand TMB parts at shared source coordinates, giving the renderer a
  bounded multi-part character assembly path with per-part diagnostics.
- Added a derived character-resource target that extracts the matching original
  `PC_NAG_TypeA_Boots_01.dds` payload from `PCTex.hpk`, plus extension-aware
  TMB texture resolution so legacy `.bmp` references can use verified DDS
  payloads when available.
- Added screen-space object picking to HtRenderFacade/OgreBackend using OGRE
  camera rays and scene-query results, with bounds-safe normalized coordinates
  and source-owned object-name diagnostics.
- Added source-derived rigid-TMB AABB calculation and probe output for static
  object/character bounds. These bounds feed OGRE's existing scene-query path;
  map placement and legacy collision volumes remain separate unresolved data.
- Preserved the source-provided and vertex-derived bounds for each rigid-TMD
  submesh, exposing them in the probe for deterministic map/terrain diagnostics.
- Added a packed native TCC map reader based on the legacy `HT_HEADER` and
  `HT_CELL_INFO` definitions, and wired Intro map-closure validation to parse
  its version, map name, dimensions, and cell records. A generalized TCC probe
  now reports source cell-state counts, object-height range, and coordinate-safe
  cell lookup for the 1024x1024 Jina1st map fixture.
- Added source-faithful `MapTcc` world/cell conversion and movement-blocked
  queries matching the legacy `HT_MAP_CELLSIZE` and inverted-Z rules. The TCC
  probe now verifies a cell-to-world-to-cell round trip on the Jina1st fixture.
- Added a source-confirmed THM height/normal reader for Intro terrain and a
  bounded OGRE heightfield submission using the native 10-unit cell spacing and
  source-coordinate scale. The terrain probe validates dimensions, section
  descriptors, sample counts, height range, and normals.
- Added a bounded TFX Intro-field presenter: it validates the source TFX
  container and referenced texture before creating an OGRE billboard and
  advances deterministic pulse timing at the compatibility frame rate. Full
  emitter graphs and source-authored particle timing remain separate work.
- Added source-grounded TMB skeleton-name extraction using the native fixed-size
  bone records, exposing verified bone IDs for future socket attachment and
  animation binding.
- Extended the TMB reader with source header/material/index/bone metadata and
  a bounded post-skeleton record diagnostic for type-2 character meshes. The
  probe distinguishes rigid meshes from type-2 meshes; the leading influence
  groups are decoded while the remaining legacy submesh layout stays explicit.
- TMB material records are now preserved as validated fixed 72-byte/18-float
  parameter blocks. This keeps multi-material source data available while the
  remaining hierarchy and attachment semantics stay explicit.
- Extended type-2 TMB decoding with the source-confirmed leading influence-count
  table. ASURA Basic validates 45 count entries and the Type-A chest validates
  111 against its 58-bone skeleton; each variable influence group is decoded
  with the exact source count and weight-sum validation (up to four influences
  in the supplied fixtures). The reader also discovers the concatenated
  additional skeleton records: ASURA Basic exposes 10 additional records and
  the Type-A chest exposes 3, with source geometry, texture names, bone/group
  counts, influence spans, and unresolved payload offsets preserved.
- Added an Asura mesh-to-idle-table skeleton binding probe; it compares the
  original TMB bone names against the original TAB payload and fails closed on
  unmatched names before transform decoding is attempted.
- Added typed `HtDiagnostic` records to the render facade for OGRE resource
  failures, TMB load failures, and verified texture fallbacks. The facade
  exposes diagnostics without leaking OGRE classes into client code.
- The normal application shutdown now persists those diagnostics as
  `TantraRemakeDiagnostics.tsv` beside the executable, preserving severity,
  code, message, and source path for post-run review.
- Added explicit `destroyRigidTmb` lifecycle control to the render facade and
  backend, releasing a named TMB scene node and its ManualObject without
  waiting for renderer shutdown.
- Added `verify-runtime-auto-exit.ps1` and `--auto-exit-frames` coverage; a
  packaged diagnostic-only run now exits with code 0 and writes the diagnostics
  artifact without manual window interaction.
- Integrated a graceful auto-exit cycle into `verify-runtime-smoke.ps1` and
  fixed OGRE teardown ordering by releasing material handles before `Root`
  destruction. Forced two-cycle and graceful packaged shutdown now pass.
- `verify-runtime-smoke.ps1` now accepts `-RenderDevice` and verifies the
  requested Direct3D11 adapter appears in the OGRE log; the NVIDIA RTX 4050
  profile has passed forced and graceful cycles.
- Extended the original Intro UI slice to extract and submit all six verified
  `UI_Picture01` through `UI_Picture06` sprites with deterministic positions.
- Added the original `UI_IN_Login_01.tga` login-screen background to the
  derived UI resources and render shell behind the logo and icon sprites.
- Added extraction and OGRE registration of the original `tFI_2100041.tga`
  effect texture referenced by the Intro TFX data. This is an effect-texture
  slice; binary particle timing and emitter playback remain unresolved.
- Replaced the one-off TFX header scan with a reusable metadata reader that
  preserves effect counts, printable effect identifiers, and texture
  references for future emitter/material playback.
- Added a source-validated AnimationTimeline reader that decodes the original
  named position/quaternion tracks, source key counts, and trailing frame count
  and provides deterministic loop/clamp interpolation at an explicit 30 FPS
  compatibility rate. The OGRE slice now applies the original ASURA
  `Pelvis_control`
  track to the rendered multipart character nodes and updates a dynamic
  weighted TMB preview; full parent-bone hierarchy, inverse-bind transforms,
  and remaining per-vertex skin records remain unresolved.
- Added an original sound catalog probe for the Intro MP3 and sound HPK roots;
  audio is explicitly represented as CATALOG_ONLY until a separate playback
  backend is integrated, so missing audio cannot block renderer startup.
- Added an optional `HtAudioService` Windows multimedia backend for the
  original Intro MP3. It is disabled by default, has explicit open/play error
  handling, and is covered by disabled-path and enabled-missing-file failure
  tests.
- Added a repeatable packaged-runtime smoke script that performs two x64
  Direct3D11 startup cycles, checks the process remains alive after a wait,
  rejects OGRE/resource error lines, and preserves per-cycle logs.
- Added an opt-in Win32 first-frame BMP capture controlled by
  `TANTRA_CAPTURE_PATH`, providing a concrete visual-parity artifact without
  changing default runtime behavior.
- Added `verify-runtime-capture.ps1`, which validates the packaged capture
  header, dimensions, byte output, process lifetime, sampled color diversity,
  and a minimum source-artwork pixel signal. This is a visible-frame gate, not
  a full screenshot-parity comparison.
- Also exercised the packaged runtime with `TANTRA_ENABLE_AUDIO=1`; the client
  remained alive with Direct3D11 active and no renderer errors, while actual
  device-level audio output remains environment-dependent.
- Added a character asset catalog probe covering the original PCTex archive and
  representative ASURA idle/run/walk animation tables without guessing their
  binary frame layout.
- Extended animation-table probing for the ASURA idle table to report decoded
  track count, frame count, Pelvis key count, and a deterministic sampled pose.
- Added x64 release packaging with required OGRE runtime files, derived Intro/UI
  resources, and a SHA-256 package manifest.
- Added deterministic `DERIVED_PROVENANCE.tsv` generation for every extracted
  first-slice asset. Each row records the canonical client root, source-relative
  path, source container hash/entry, derived hash, importer version, and status;
  the provenance manifest is copied into the release package.
- Added stable C++ `SourceProvenance` and `AssetManifestEntry` types covering
  source profiles, container entries, hashes, derived paths, conversion status,
  and warnings; both Debug and Release compile probes pass.
- Added typed `ClientSourceConfig` and `DataSourceConfig` interfaces for the
  canonical client, derived-resource, UI, character, effect, terrain/audio,
  and authored-data profile roots; Debug and Release compile probes pass.
- Added `HtMapScene`, a compatibility-owned source scene composition that
  loads TCC collision data, TML placements, and the selected object-resource
  table together. It preserves source transforms and reports resolved versus
  unresolved resource IDs without exposing OGRE types.
- Wired the executable’s Intro placement path through `HtMapScene`, so the
  runtime now consumes the same tested source composition used by the probes.
- Added `HtCharacterInstance`, a compatibility-owned mesh/animation binding
  model. It validates the type-2 TMB skeleton against the original TAB track
  set, exposes deterministic track sampling, and provides a bounded direct-bone
  weighted preview using the decoded influence groups. Parent hierarchy,
  inverse-bind transforms, and production skin deformation remain separate
  follow-up work.
- Added a hierarchical weighted preview path. Its initial name-derived
  parent table has been replaced with the validated TMB child-count tree;
  the earlier parent relationships were not source-verified. Native bind
  semantics and production deformation remain incomplete.
- Added sampled hierarchical world transforms for named character bones. The
  probe now verifies the canonical `WeaponSpine` socket transform, providing a
  source-backed attachment point for future equipment submission while keeping
  inverse-bind and socket-offset semantics explicit.
- Added an explicitly bounded frame-zero-bind preview that derives current-to-
  frame-zero skin transforms from the verified TAB hierarchy. The character
  probe validates finite output for all source vertices; this is an animation
  fallback for investigation and does not replace native inverse-bind records.
- Wired that validated frame-zero-bind preview into the primary OGRE dynamic
  character mesh. Additional multipart records continue to use their direct
  weighted fallback until their native bind payloads are established; runtime
  smoke confirms the mixed path starts and shuts down cleanly.
- Added an OGRE dynamic skinned-TMB submission path that uses the same decoded
  weighted preview to update rendered character vertices every frame from the
  original ASURA idle timeline. It now submits the decoded additional multipart
  geometry records alongside the first mesh block. The existing rigid-node path
  remains available for comparison; this runtime path is deliberately bounded
  by the decoded influence records and does not claim full hierarchy/inverse-bind
  parity.
- Added `HtAnimationState`, a compatibility-owned deterministic playback state
  with track selection, play/pause, seek, loop/clamp behavior, frame queries,
  and sampled poses. It is covered against the original ASURA idle table.
- Added `HtDiagnosticSink` and `HtDiagnosticCollector` so tooling can consume
  typed renderer/resource diagnostics without depending on OGRE classes.
- `HtRenderFacade` now publishes its accumulated diagnostics through that sink
  interface for post-run tooling and host applications.
- Extended `HtRenderFacade` with generic named-object visibility, transform,
  and destruction operations backed by the private OGRE scene-node lifecycle.
- Added reproducible Global/K3 map-resource catalog generation from the source
  `ClientRes.xml` Map worksheets. The catalog records map IDs, terrain/cell/
  config files, object archives, profile provenance, and validates 57 source
  rows including both 40100 Intro profile entries.
- Added the planned `HtClientSession` compatibility interface over the tested
  engine-independent session state machine, including offline reconnect and
  shutdown transitions.
- Added a source-faithful TXL effect-resource catalog. Intro type-4 through
  type-8 sheets are decoded using their confirmed fixed record layouts,
  including numeric MonsterSkill/MonsterEffect records; unknown future sheet
  types still stop with an explicit boundary.
- Closed the release-package configuration gap by copying the generated
  `client-source.toml` alongside the executable and adding package-content
  verification for runtime DLLs, manifests, provenance, derived roots, and
  exclusion of the canonical client tree.
- Made release packaging deterministic by removing runtime-generated captures,
  diagnostics, exception logs, and smoke-cycle logs before rebuilding the
  package manifest; runtime smoke is run separately against the clean package.
- Added a consolidated source-parity vector probe covering Jina1st map
  coordinate round-trip, Intro TML transform/resource ID, IntroObj mapping,
  ASURA type-2 skeleton metadata, and deterministic animation sampling.
- Decoded and weight-validated the variable type-2 TMB influence groups after
  the leading influence-count table: 45 groups for ASURA Basic and 111 for the
  Type-A chest fixture. `HtCharacterInstance` now applies those groups in a
  bounded direct-bone preview, verified by the character probe. The same probe
  validates the 58-entry canonical hierarchy and a hierarchical weighted
  preview. Additional
  concatenated records now include validated vertex/index/material geometry and
  influence spans; parent hierarchy, inverse-bind transforms, and full
  production deformation remain unresolved.
- Added `HtResourceLoader`, a read-only canonical-root loader with normalized
  relative paths, traversal rejection, explicit missing-resource errors, and
  Debug/Release probe coverage for a real client file.
- Added a source-faithful `.tml` dynamic-map reader for the legacy 64x64
  load-node grid, saved object placement records, transforms, properties, and
  trailing model/animation ID lists. The Intro placement probe validates all
  three original object records and their first source transform.
- Wired the first three Intro `.tml` transforms into the SDL3/OGRE runtime as
  bounded, source-positioned placement markers. The resource-ID-to-archive
  resolver remains explicit and markers are used until that mapping is decoded.
- Added the source-faithful `IntroObj.txl` object-resource table reader using
  the legacy version/count/ID/fixed-filename/camera-collision layout. Runtime
  placement resolution now submits the extracted original `18902` TMB mesh at
  its `.tml` transform and keeps explicit markers for IDs whose filenames are
  listed by `IntroObj.txl` but absent from the shipped `IntroObjTmb.hpk`.
- Added a source-built OGRE 14.6.1 x64 runtime profile for the remake. It keeps
  the supplied SDK untouched and stages the matching Direct3D11/core/codec
  binaries separately.
- Added explicit HLSL shader programs for D3D11 manual-object materials so the
  original logo, map, TMD/TMB, UI, and TFX submissions use a known shader path.
- Made textured UI submissions use deterministic material-derived OGRE object
  and scene-node names, preventing duplicate-node collisions as more original
  sprites are added and preserving independent UI object lifetime.
- Added normalized `createUiSpriteAt` submission and resize tracking. The
  original login background, logo, and six picture sprites now use viewport-
  relative anchors and recompute their OGRE transforms from SDL3 pixel-size
  changes; packaged capture and smoke checks pass with the anchored path.
- Resize tracking now uses each sprite's actual depth when recomputing its
  perspective footprint, keeping background and foreground UI anchors stable
  together across aspect-ratio changes.
- Added Intro object-package closure for `resource/object/IntroObjTmb.hpk`,
  extracted the source `in_Str_stone_sub1_01.tmb`, and submitted that verified
  rigid object through the OGRE scene path with its original source scale.
- Extended the same closure to `resource/object/IntroObjTex.hpk`; the source
  index reports 98 texture entries, while texture alias resolution remains
  bounded and explicit.
- Added a source-wide object archive catalog probe. It verifies all 21 paired
  `ObjTmb`/`ObjTex` or `PopObjTmb`/`PopObjTex` archive families and reports
  2,765 indexed mesh entries without importing placement semantics.
- Added a second derived static-object fixture from the paired Jina1st object
  archives (`c01_S_deva_castlewall1_01.tmb`) and submitted it through the
  existing OGRE rigid-object path with an explicit fallback when its
  multi-material texture aliases are not yet decoded.
- Expanded the character derived-resource closure to extract all ten verified
  ASURA Basic multipart textures from `resource/object/PC/PCTex.hpk`, so the
  dynamic multipart renderer can resolve source DDS materials instead of using
  fallback color for those records.
- Added case-insensitive OGRE resource-name resolution for legacy mixed-case
  texture references; the packaged diagnostics now show no character texture
  fallback entries after the expanded closure.
- 2026-10-22 runtime audit correction: the multipart submission loop previously
  changed its input list through `skinnedMeshes.back()` while adding children,
  causing it to stop after one additional part. It now owns a stable record
  list, and the packaged smoke check requires `AsuraSkinPreview` to submit all
  11 decoded parts. Earlier startup/capture checks did not prove that count.
- Removed an unverified cross-submesh texture fallback. Texture warnings now
  identify object name and source file: the unresolved cases are the Jina1st
  castle wall, separate Type-A chest/face meshes, and Intro stone placement.
  The decoded ASURA Basic multipart references resolve, but this does not prove
  complete material assignment for every separately submitted character mesh.
- Extended derived provenance from 17 to 27 entries to include the nine added
  character DDS files and the item gem DDS. Package verification now checks each
  recorded payload hash and requires unique provenance for all eleven selected
  character/item texture payloads.
- Added the Intro item texture closure for `TEM_Fallen_Gem_01.dds` from
  `resource/object/Item/ItemTex.hpk` and packaged it under the derived item
  cache used by the rigid item render path; the item fallback diagnostic is now
  cleared in the packaged runtime.
- Added an exact `Map_Intro.tme` water-state parser and probe; the source
  values currently resolve to `WATER 0` and `ZORO_WATER 0`.
- Extended the Intro THM reader to retain source terrain-section weight maps,
  extracted the original `section0.dds` and `detail.dds` layer textures, and
  added an explicit D3D11 terrain blend material with a deterministic
  single-texture fallback.
- Added a read-only texture metadata reader for original BMP and TGA payloads.
  It preserves dimensions, bit depth, alpha presence, byte size, and format;
  the original Intro logo and client TGA fixture are covered by the Debug and
  Release texture probe.
- Added runtime environment overrides (`TANTRA_CLIENT_ROOT`,
  `TANTRA_DERIVED_ROOT`, `TANTRA_UI_ROOT`, and `TANTRA_CHARACTER_ROOT`) so the packaged executable can
  use an external canonical client tree while keeping generated resources in a
  relocatable package directory.
- Rebuilt the package after the root-override change and completed a five-second
  packaged-executable smoke test using the external `TantraClient` source and
  package-local derived/UI resources; the log confirms Direct3D11 startup with
  no observed resource/material errors.
- Extended the client manifest generator with explicit Global/K3/Canonical
  profile tagging and deterministic asset categories, including an explicit
  Other bucket for unknown extensions.
- Added a bounded TFX metadata probe for the original Intro field effect, with
  validated version/effect-count/signature output and CTest coverage; binary
  particle/material playback remains a separate rendering milestone.
- Extended the offline client session with a deterministic disconnected-to-world
  reconnect transition and added it to the session probe, without contacting a
  live endpoint.
- Added the planned offline `CharacterSelection` state and deterministic
  `selectCharacter` transition between Intro and MapScene. The executable and
  session probe now exercise the complete offline state sequence.
- Added a deterministic `MockTransport` fixture using the source-referenced
  Intro message IDs for login, login success, world list, zone connecting, and
  map transition. The client probe consumes the login-success packet before
  entering the offline world flow; no sockets or live endpoint are used.
- Added a deterministic mock wire-packet codec with explicit little-endian
  message ID/length framing, round-trip checks, and malformed/truncated packet
  rejection. This remains a fixture protocol and does not enable live sockets.
- The offline session probe now consumes the complete mock transition sequence
  (`LoginOk`, `WorldList`, `ZoneConnecting`, `MoveToZone`) before the
  character-selection and map-state transitions.
- Resource probes now build and pass independently with OGRE disabled, keeping
  format inventory usable before renderer deployment is available.
- Added `missing_resource_failures`, a cross-reader failure-path probe covering
  absent MapConfig, TMD, TMB, TFX, and HPK inputs with non-empty diagnostics.
- Added `manifest_hash_stability`, which regenerates client and authored-data
  manifests twice in temporary locations and verifies identical SHA-256 output
  without changing either canonical source root.
- Read-only client asset verification.
- Read-only Excel/XML data verification.
- SHA-256 manifests for client assets and authored data files.
- C++ asset-root probe and two passing CTest checks.

Still outside the verified slice:

- Complete HT3DMgr behavioral coverage and full legacy call compatibility.
- General Tantra map/object/texture/animation/effect importers beyond the
  bounded Intro TMD, item TMB, HPK, decoded animation-track reader, and `.tml`
  placement-marker path.
- Full PC character hierarchy/attachment decoding and production per-vertex
  skeletal deformation beyond the bounded weighted preview.
- Live login/networking, audio, gameplay integration, and production UI/effects.
- Screenshot-based visual parity tests and a fully self-contained package that
  embeds the complete multi-gigabyte canonical client tree.

## 3. Architecture

Use an adapter-first design rather than compiling the legacy HTLauncher project
against OGRE directly.

    Remake application
        |
        +-- Client state and gameplay facade
        |
        +-- Tantra compatibility/resource layer
        |
        +-- HtRenderFacade
        |
        +-- OgreBackend
        |
        +-- OGRE 14.6 x64

The old IHT3DMgr interface in Tantra\inc\HT3D.h is the behavioral reference.
It combines rendering with resource loading, animation, terrain, picking,
collision, UI sprites, sound, and object lifetime. It must not become the
internal design of the new renderer.

Define a smaller HtRenderFacade with explicit modern types for:

- renderer/window initialization and shutdown;
- frame begin, world render, UI render, and present;
- cameras, viewports, and screen resizing;
- object creation, transforms, visibility, and destruction;
- static and animated mesh instances;
- textures, materials, and resource groups;
- terrain/map instances;
- lights and basic effects;
- screen/world conversion and picking;
- renderer diagnostics and unsupported-operation reporting.

Create a compatibility adapter that maps legacy resource IDs, object IDs,
animation IDs, and coordinate conventions into HtRenderFacade calls. Every
unsupported operation must return a typed failure and a diagnostic record.

## 4. Repository layout

Expand the current project into:

    _remake/
      CMakeLists.txt
      README.md
      IMPLEMENTATION_PLAN.md
      cmake/
      config/
      include/
      src/
        app/
        client/
        compatibility/
        platform/win32/
        rendering/
          HtRenderFacade/
          OgreBackend/
        resources/
        data/
        audio/
      tools/
        scan-client-assets.ps1
        scan-data-sources.ps1
        verify-client-source.ps1
        verify-data-source.ps1
        stage-ogre-runtime.ps1
        import/
      tests/
        fixtures/
        resources/
        rendering/
        client/
      derived-assets/
      runtime/

build, derived-assets, runtime, compiler output, and generated manifests remain
ignored unless a manifest is intentionally promoted as a reviewed artifact.

## 5. Build and dependency strategy

Use CMake with the Visual Studio x64 generator.

Required configuration:

    cmake -S _remake -B _remake\build-ogre-x64 -A x64 ^
      -DOGRE_DIR=C:/Users/Ashesh/Downloads/OGRE/ogre-sdk-v14.6.1-msvc142-x64/CMake ^
      -DOGRE_SOURCE_ROOT=C:/Users/Ashesh/Downloads/OGRE/ogre-14.6.1/ogre-14.6.1 ^
      -DTANTRA_CLIENT_ROOT=C:/_GitHub/TantraSrc/TantraClient ^
      -DTANTRA_DATA_ROOT=B:/__TANTRA/TantraDataScripts

Build configurations:

    cmake --build _remake\build-ogre-x64 --config Debug
    cmake --build _remake\build-ogre-x64 --config Release

The OGRE SDK is the initial binary dependency. The full OGRE source tree is
recorded for future custom builds but is not copied into the remake.

Stage only the runtime files required by the remake:

    .\_remake\tools\stage-ogre-runtime.ps1

The initial runtime set is OgreMain.dll, RenderSystem_Direct3D11.dll,
Codec_STBI.dll, Codec_RsImage.dll, z.dll, plugins.cfg, and resources.cfg.
Additional DLLs are added only when a runtime dependency is demonstrated.

The build must fail for 32-bit generators when TANTRA_REQUIRE_X64 is enabled.
No 32-bit compatibility target is part of the remake.

The executable accepts these process-level overrides for relocatable package
testing:

    TANTRA_CLIENT_ROOT  canonical read-only TantraClient source
    TANTRA_DERIVED_ROOT package or cache root for extracted resources
    TANTRA_UI_ROOT      package or cache root for UI resources
    TANTRA_CHARACTER_ROOT package or cache root for character resources
    TANTRA_ENABLE_TERRAIN set to 0 only for terrain-isolation diagnostics

The package launcher sets these values before starting the executable. The
package intentionally does not embed the complete canonical client tree.

## 6. Asset and data provenance

TantraClient is the canonical shipped-client source. It must be mounted or
referenced through TANTRA_CLIENT_ROOT and never edited by importers.

TantraDataScripts is the canonical authored-table source. It contains Global
and K3 data, including NPC tables, ClientRes, TantraParam, FX data, messages,
and Excel/XML variants. The selected revision must be recorded in each import
manifest.

Every imported or converted resource records:

- canonical source root;
- source-relative path;
- source extension;
- file size;
- SHA-256;
- importer version;
- source revision/profile;
- derived output path;
- conversion status;
- unresolved fields or warnings.

Original relative paths and numeric IDs must be preserved. Generated OGRE
resources belong below derived-assets and are disposable cache/output data.

When Global and K3 contain the same basename, the selected profile must be
explicit. The importer must not silently merge revisions.

## 7. Implementation phases

### Phase A: Application and renderer shell

Implement:

- Win32 x64 application entry point;
- deterministic command-line/config loading;
- OGRE Root creation;
- Direct3D11 RenderSystem selection;
- render window and viewport;
- camera creation;
- frame timing;
- clean shutdown;
- structured file and console logging;
- runtime search paths for staged OGRE files.

Acceptance:

- A standalone remake executable launches in x64 Release.
- It creates an OGRE window and renders the current source-backed Intro/UI/item
  shell over the configured clear color.
- It exits cleanly after a close request.
- It does not load HT3DHeaven.dll or modify either canonical source root.

### Phase B: Asset and table inventory

Extend the current probes to classify:

- textures and images;
- object/model files;
- animation files;
- map/config files;
- HPK/UI packages;
- TFX/effect files;
- XML/XLS/XLSX authored tables;
- unknown extensions.

Add a profile manifest for Global and K3. Add commands to list source files
referenced by a selected map or data table.

Acceptance:

- The full client manifest is reproducible.
- The data manifest is reproducible.
- Every unknown file family is reported under an explicit Other category.
- The selected first-slice resource set is identified by hash and path.

### Phase C: Texture and material pipeline

Implement read-only texture probing and conversion for the first required
texture formats. Preserve source color channels, alpha, dimensions, and
relative names. Generate OGRE materials with deterministic names derived from
source-relative paths and hashes.

Implement:

- source texture metadata;
- OGRE texture creation;
- material templates;
- transparency and alpha-test modes;
- filtering and addressing defaults;
- missing-texture diagnostics;
- cache invalidation by source hash.

Acceptance:

- One original client texture renders in OGRE.
- Material output is deterministic.
- A changed source hash invalidates only the affected derived resource.

### Phase D: Static object and map pipeline

Implement format readers only after capturing binary fixtures from the selected
TantraClient profile. Do not infer fields from filenames alone.

Implement:

- object header/mesh probing;
- vertex/index conversion;
- submesh/material mapping;
- object transforms;
- map placement records;
- map coordinate conversion;
- static collision bounds;
- visibility and object lifetime.

Acceptance:

- A selected original map configuration loads.
- At least one map object renders at the source-defined position.
- Object IDs and source paths are visible in diagnostics.
- Unsupported object records fail explicitly without corrupting the scene.

### Phase E: Character and animation pipeline

Implement:

- character mesh import;
- skeleton or frame-animation import;
- animation ID mapping;
- animation timing;
- attachment/socket transforms;
- equipment and weapon attachment;
- bounding boxes and spheres;
- LOD and visibility state.

Acceptance:

- One original character/NPC renders.
- One original animation plays at deterministic timing.
- Character/object bounds match source metadata within defined tolerance.
- Socket attachment diagnostics identify source IDs and transforms.

### Phase F: HT compatibility facade

Port only the legacy client behaviors required by the vertical slice:

- configuration/resource ID lookup;
- camera behavior;
- map/object lifecycle;
- object transforms;
- animation changes;
- mouse picking;
- basic collision queries;
- UI sprite submission.

Do not expose OGRE types to client/gameplay code. Keep source IDs and original
coordinate conventions in compatibility types.

Acceptance:

- The remake can boot, load resources, enter a map scene, update objects, play
  animation, and pick an object.
- All unsupported legacy operations are logged and return explicit status.

### Phase G: UI, effects, and audio

Implement after the world-rendering slice is stable:

- HPK/UI resource access;
- UI sprite batching;
- text rendering;
- loading/intro screens;
- TFX effect parsing;
- particle/material effects;
- guild marks;
- ambient and sample sound through a separate audio service.

Acceptance:

- Intro/loading UI can be shown from original assets.
- At least one original effect renders.
- UI anchoring and resolution scaling are deterministic.
- Audio failure does not prevent renderer startup.

### Phase H: Client state and networking

Create the state machine:

    Boot
      -> LoadConfig
      -> LoadResources
      -> Intro
      -> CharacterSelection
      -> MapScene
      -> InWorld
      -> Shutdown

Initially use a local mock session and fixture packets. Preserve original
network message IDs and layouts only after they are verified from source and
matching server evidence.

Live networking is a separate gate. It must not be enabled by default during
renderer development.

Acceptance:

- Offline boot and map flow works without a server.
- Mock character/map transition works.
- Network failures return to a controlled disconnected state.
- No live endpoint is contacted by default.

### Phase I: Fidelity and release validation

Build a parity suite covering:

- camera coordinates;
- object transforms;
- animation state/timing;
- map placement;
- texture/material assignment;
- UI anchors;
- source resource IDs;
- collision/picking results;
- lifecycle and shutdown.

Run Debug and Release x64 builds with the staged OGRE runtime. Capture logs,
resource manifests, screenshots, and crash diagnostics for every supported
vertical slice.

## 8. Public interfaces

Add stable modern interfaces for:

- ClientSourceConfig;
- DataSourceConfig;
- AssetManifestEntry;
- ResourceId and SourceProvenance;
- HtRenderFacade;
- HtResourceLoader;
- HtMapScene;
- HtCharacterInstance;
- HtAnimationState;
- HtClientSession;
- HtDiagnosticSink.

Interfaces must use fixed-width integer types, explicit ownership, UTF-8 or
wide Windows paths at boundaries, and typed error/status results. OGRE classes
must remain private to OgreBackend.

## 9. Testing plan

Automated tests:

- x64 CMake configure;
- OGRE package discovery;
- required source-root verification;
- client/data manifest generation;
- source hash stability;
- texture decode fixtures;
- material generation;
- object/mesh conversion;
- map coordinate conversion;
- animation timing;
- picking and bounds;
- renderer startup/shutdown;
- missing-resource failures.

Runtime tests:

1. Empty OGRE window.
2. One original texture.
3. One static object.
4. One selected map.
5. One animated character.
6. One UI sprite.
7. Map plus character plus picking.
8. Repeated startup/shutdown.
9. Offline client state transitions.
10. Mock network disconnect/reconnect.

Current automated evidence for the implemented slice is thirty-six passing CTest
cases in both Debug and Release, successful x64 Debug and Release builds, a
full 3,618-file categorized client manifest scan, repeated packaged
two-cycle Direct3D11 smoke runs with external source-root overrides, graceful
auto-exit shutdown and NVIDIA adapter selection checks, and a
captured frame containing the original Intro logo through the explicit HLSL
material path. The supplied OGRE SDK has no debug import library, so the SDK
profile's Debug target uses the release OGRE/CRT ABI through the explicit
`TANTRA_OGRE_DEBUG_USE_RELEASE_ABI` configuration option. These checks do not
replace full visual parity comparison, live networking, or the remaining
importer/parity gates.

The animation CTest fixture additionally requires the source `Pelvis_control`
track to contain multiple keys, verifies that its midpoint differs from the
bind pose, and checks repeated sampling for deterministic output.

No milestone is complete from compilation alone. Each milestone requires the
corresponding runtime evidence and an explicit list of unsupported formats or
features.

## 10. Delivery gates

Gate 1: x64 build foundation — completed.

Gate 2: OGRE runtime staging and backend library — completed.

Gate 3: client/data provenance manifests — completed.

Gate 4: standalone OGRE window executable — completed for the x64 clear-screen
  and source-backed Intro/UI/item render shell. The executable has a Win32
  lifecycle, clean shutdown path, and Direct3D11 runtime smoke evidence.

The map-config ingestion is partially complete: Map_Intro.cfg is parsed and its
clear color is applied. The Intro sky TMD now renders through the rigid reader,
and its two referenced HPK TGA textures are extracted and registered; terrain
and placed map objects remain part of Gate 6.

Gate 5: original texture/material rendering — partially completed. The Intro
bitmap, two HPK-extracted TGA sky textures, and SkyTerrain DDS are registered
and rendered through explicit D3D11 HLSL passes; the captured frame contains
the original logo, while image-content comparison and broader format coverage
remain pending.

The first original bitmap texture now loads through OGRE and the executable
passes a five-second smoke run without a resource/material error. The current
capture validator confirms a 1024x768 BMP with visible original client pixels;
full screenshot-based parity comparison is still required.

Gate 6: original map/static-object rendering — partially completed. Intro sky,
SkyTerrain, and the source-confirmed Intro THM heightfield now submit through
OGRE; their source bounds and the Intro TCC container are parsed, and the
generalized TCC reader verifies the 1024x1024 Jina1st cell-state/object-height
fixture. The selected item TMB and the verified Intro stone object package are
submitted; the Intro terrain layer/detail textures now use an explicit blend
material, while general terrain placement and broader map object packages
remain pending. A Jina1st castle-wall fixture is now also extracted and
submitted with bounded multi-material fallback behavior. The source `.tml`
reader now preserves Intro saved-object transforms and resource IDs, and the
runtime resolves `IntroObj.txl` ID 18902 to the extracted original TMB and
submits it at its source position; IDs 18901/18903 remain explicit markers
because their filenames are absent from the shipped IntroObjTmb archive.
General resource-ID coverage and broader map-object submission remain pending.
The compatibility layer now exposes the source coordinate
conversion and movement-blocked cell query for future placement/collision use.
The same API now exposes the source object-height value for a cell, and the
Jina1st probe verifies a real nonzero-height, movement-blocked fixture cell.
`MapTcc::queryWorld` now combines the legacy coordinate conversion and all
three collision values in one bounded result, with negative and out-of-range
world coordinates failing closed in the fixture probe. A bounded four-way A*
path query now uses the same movement-blocked cells and is verified on the
Jina1st fixture, including rejection of a movement-disabled goal.
The probe also verifies that a one-node search budget fails closed.

Gate 7: character/animation rendering — partially completed. The selected native
scalar position-skinning path now evaluates authored parent hierarchy/inverse
bind matrices, raw weights, source control-position mode and authored TAB timing.
Finite playback, retained STOP intervals, blending, multipart clocks and LODs
have component/runtime evidence. The new PC appearance component renders all
200 creation combinations with table-selected visible meshes/textures and
animated native hair/apron sockets, preserving complete affine transforms in
the shader. Dynamic geometry and attachment bounds support close-up culling.
Full equipped roster/weapon/NPC coverage, other attachment/animation behaviors,
normals/materials/lighting/shadows and native visual parity remain required.
Creation previews are integrated into the production offline INTRO. See
`docs/NATIVE_PC_PREVIEWS.md` and `docs/INTRO_CHARACTER_RUNTIME.md`.

Gate 8: HT compatibility facade and offline client flow — partially completed.
HtRenderFacade, screen-space picking, the source-backed `HtMapScene` composition,
the tested offline state fixture, actual SQLite account/server-selection flow,
and native character records/SQLite CRUD/channel components are present. The
normal offline client now handles zone authentication, fixed-slot rosters,
creation, actual triangle selection, information and deletion through native
UI/cameras and SQLite responses. Full equipped-roster/height-camera behavior,
remaining negative/three-slot UI acceptance, actual village/world handoff,
gameplay persistence, live protocol integration and full legacy call coverage
remain pending.

Gate 9: UI/effects/audio — partially completed. Normal intro submits original
background and five catalog-bound labels using source font/layout rules and
camera-gated visibility. Selected intro fire emitters, BGM and finite monster
samples are integrated and have runtime verification. Gallery picture sprites
remain diagnostic only. Normal login controls, committed input, focus, saved ID,
BMP conversion and Cancel are now integrated and verified. Native login through
explicit loopback/SQLite backends, successful gate animations, SERVER camera,
original server panel and Cancel return are integrated. Character creation,
information, selection and deletion controls, camera completion gates, previews
and action sounds are also integrated. Native height-adjusted face camera,
loading/back FX, complete IME/locales, broader UI/FX coverage and full
acoustic/pixel parity remain pending.

Gate 10: networking and full client-state integration — partially completed.
Offline disconnect/reconnect state fixtures and source-ID mock login/world
fixtures remain separate from the real native web-response/SQLite account flow.
Native logical zone/roster/create/remove payloads have source-layout fixtures,
and the offline character channel has authenticated/session-bound component
coverage and production INTRO integration through roster/create/select/delete.
Point-02 zone authentication, village/world-entry progression, original transport
integration and live server compatibility remain pending. The later dedicated
server and GUI have their own `_server` plan. Current runtime testing stays offline.

Gate 11: parity, stability, and release packaging — partially completed. The
x64 Release package, required OGRE runtime files, derived resources, SHA-256
manifest, external-root smoke test, repeated two-cycle startup check, and
validated 1024x768 BMP capture are verified. Debug and Release builds and all
76 selected resource/state/timing/persistence CTest cases pass; the HTTP runtime
case is excluded from current offline-only testing. The current final client
uses the original resource/system layout, HTLauncher.exe name and Tantra Online
branding/icon, with 1,548 manifested files. Separate PC GPU probes verify eight
full-preview and seven isolated face-zoom hair PNG captures per configuration.
Formal native visual parity comparison
and complete release coverage remain pending. The packaged Release profile
uses the source-built OGRE D3D11 runtime and SDL3 window/event DLL.

## 11. Completion definition

The OGRE HTLauncher remake is complete only when:

- Release and Debug x64 builds are reproducible;
- the executable starts with the staged OGRE runtime;
- original client assets and external authored tables remain read-only;
- the selected map, character, animation, UI, and effects render from original
  source files or explicitly documented derived conversions;
- resource IDs, coordinates, timing, and lifecycle behavior have parity tests;
- offline INTRO roster/create/select/delete and world entry follow the native
  sequence, with SQLite data surviving process restart and transactional failures;
- live networking is verified against the selected compatible server;
- repeated startup/shutdown and missing-resource tests pass;
- runtime DLLs, manifests, configuration, and provenance are packaged;
- all unsupported formats and known fidelity gaps are documented.

Until those gates pass, the project must be described as an x64 OGRE
foundation and compatibility prototype rather than a completed HTLauncher
replacement.

## Source fidelity continuation: monster texture binding

The one-mesh `HT_iCreateMonster` create -> resource-ID lookup -> ChangeTexture
contract now has an OGRE instance bridge, catalog-validated HPK extraction,
and package provenance. Runtime checks cover all four Tiger detail records,
repeat/missing-resource behavior, hidden selection, owner isolation, and
destruction/recreation. See [evidence and remaining work](../../reference/assets/MONSTER_TEXTURE_REPLACEMENT.md).
This completes a component gate only; normal intro gate assembly and the full
native sequence remain unfinished.

## Source fidelity continuation: authored animation timing

The TAB reader now decodes authored timestamps and exact timing-block boundaries.
Duration and pose sampling no longer assume evenly distributed keys at 30 FPS.
Read-only shipped-engine disassembly confirms final-timestamp duration and
adjacent-time interval selection. See [evidence and remaining transition work](../../reference/assets/AUTHORED_ANIMATION_TIMING.md).
Native finite-loop STOP handling, STOP -> STD order, blending, sounds and gate
assembly remain unfinished; the full plan stays active.

Finite-playback verification on 2026-10-22: Debug and Release each pass 46/46
CTest checks, package provenance validation, and the runtime lifetime/default
intro smoke checks. Native ChangeAnimation blending and normal gate integration
remain the next animation gates; this does not complete the full plan.

Native pose correction verification, 2026-10-22: both configurations pass
47/47 CTest checks and package/runtime smoke. Quaternion sampling and STOP
rendering now follow the inspected scalar/render branches. The earlier STOP
pose-freeze assumption is superseded by alpha-one interval evaluation. Full
blended ChangeAnimation and intro integration remain open.

ChangeAnimation boundary correction: traced x87 comparison parity shows that
clip looping and blend promotion use strictly greater-than duration. Equality
remains in the current state; dedicated CPU checks now cover both boundaries.
The previous greater-or-equal finite-clock behavior is superseded.

ChangeAnimation component verification, 2026-10-22: both x64 builds pass
48/48 CTest checks and refreshed-package runtime/provenance verification.
The diagnostic source STOP-to-STD request now executes through a real local
blend, with interruption and strict duration boundaries checked. The full
plan remains active: normal gate assembly, native bind matrices, sound and
nonzero play-time paths remain unfinished.

Authored-bind verification, 2026-10-22: both configurations pass 49/49 CTest
checks and refreshed-package runtime/provenance validation. The selected CPU
position skinning path now uses TMB bind matrices, raw weights and the source
character-position flag. The inspector capture is not proof of complete
appearance or scene parity; normal gate assembly and broader client work
remain unfinished.
