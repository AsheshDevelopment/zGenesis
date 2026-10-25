# Tantra Online final client

> Current staging authority: [native HPK runtime](NATIVE_HPK_RUNTIME.md). Older file counts/hashes below are retained historical evidence; use the phase plan/progress for current acceptance.
Latest actor-loading build: [Varaha Raja model correction](../archive/fixes/ACTOR_2008_MODEL_FIX.md), SHA256
`E9357B0201800DDD9543171A9D231F8C642C14F28E7E736B24E7B9947E3AAB68`.
4,188 owned files (257,912,807 bytes). One offline process verified the backed-up
group 0 / village 18 character at `(498,335)` and all four submitted actor-2008
detail records, with 30 settled world frames and clean exit. Normal save unchanged.
Earlier hashes below are historical checkpoints.

Latest camera stability build: [operation-error correction](../archive/fixes/CAMERA_OPERATION_FAILURE.md), SHA256
`D42320F213D3C057634185D20E884996FF4C1ACAFE10AF9309A39E57338CF16F`.
4,188 owned files (257,911,783 bytes). One offline process verified the user's
backed-up group 4 character at saved cell `(490,309)`, with 30 settled world
frames and clean exit. The normal character database is unchanged. Earlier
hashes below are historical checkpoints.

Latest performance build: [GPU/UI/skinning correction](../reference/research/PERFORMANCE.md), SHA256
`7A94F471CF826A9E57E42214858791828B568F3B23B6D7E0629F947CF862002E`.
4,188 owned files (257,906,151 bytes). One offline route-1 session selected the
RTX 4050 and averaged 59.4473 FPS over 120 settled HIGH frames. Normal saves
are unchanged; the preceding atmosphere hash below is historical.

Latest atmosphere build: [map-driven environment](MAP_ENVIRONMENT.md), SHA256
`827A4471E115A033538FA8C48421E1A093116D2C6B921A4D3A6132D03FE3F1F5`.
4,188 manifested files (257,898,471 bytes); one offline route-1 session passed
ten atmosphere captures, with normal userdata unchanged. Earlier hashes below
describe previous checkpoints.

Latest follow-up: [colocated MainUI asset loading](../archive/fixes/HUD_ASSET_PATH_FIX.md), after
the [INTRO texture correction](../archive/fixes/INTRO_TEXTURE_REGRESSION.md). Complete loose HUD
assets now take precedence when source HPKs also exist, avoiding an unnecessary
extraction into the normal in-client userdata directory. The latest staged x64
executable hash and verification are in that report. Earlier hashes and runtime
failures below describe historical checkpoints. Broad gameplay acceptance remains
incomplete; see [offline services and acceptance](../archive/checkpoints/PLAYABLE_OFFLINE_ACCEPTANCE.md).

Current scoped update: offline run/walk/collision/camera follow, authored Mandara
NPC/monster population, inventory/equipment actions, ordinary melee lifecycle,
INTRO face/equipment handling and native world-time environment rendering.
See [implementation, controls and remaining gaps](../archive/checkpoints/OFFLINE_GAMEPLAY_IMPLEMENTATION.md).
HIGH/realtime CFG defaults, map fog and INTRO rigid-texture alpha remain integrated; see
[graphics configuration](GRAPHICS_CONFIGURATION.md) and
[INTRO alpha](../reference/rendering/INTRO_TEXTURE_ALPHA.md).
Native world-camera orientation and the live upper-left FPS/resource overlay
are retained; see
[the rendering report](../reference/rendering/WORLD_ORIENTATION_AND_STATS.md).
MainUI dialog interaction and calculated offline status after CHAR_INIT remain
integrated; see
[the interaction/status report](MAINUI_INTERACTION_AND_OFFLINE_STATUS.md).
Mandara terrain/object alignment, native spawn-floor height, `_TGA` alpha
materials and original terrain detail are retained. See
[the correction report](../archive/fixes/MANDARA_OBJECTS_AND_SPAWN.md) and
[the terrain detail report](../reference/rendering/TERRAIN_DETAIL.md), plus
[the full checkbox tracker](../PROGRESS.md). The final executable SHA-256 is
`47405e614992d5000b9113344b74ad7e01953061a7f48690b8e3bed2fc8be7b7`.
The folder contains 4,173 manifested runtime files (257,367,290 bytes); normal user saves
are preserved. Older checkpoint hashes/results below are historical.

The current navigation/NPC/INTRO follow-up adds collision-checked routes, static
camera obstruction, original NPC dialogue, basic merchant buy/sell and save
services, stale-input guards and native crash diagnostics. The one runtime
attempt passes the three-slot INTRO cases and map loading, then exposes a
17-window draw-priority overflow before `CHAR_INIT`. That overflow is corrected;
303 MainUI checks, world gameplay and final inventory checks pass. No second
client process was run, so final world/NPC runtime acceptance remains pending.
See [exact evidence and remaining scope](../archive/checkpoints/MANDARA_NAVIGATION_NPC_INTRO.md).

The earlier camera/saved-roster follow-up corrects face/hair zoom to use the
whole character's native TMB bounds. One offline process with a backup of the
existing roster/settings changes face/hair, selects the saved character, enters
Mandara and exits normally after 30 settled frames. Original saves remain
unchanged. Inventory/import/icon verification passes without another launch.
Caught errors now leave persistent failure logs and show a message before exit.
The reported historical selection exit was not reproduced; its cause remains
unknown. See [camera and exit investigation](../archive/fixes/INTRO_CAMERA_AND_SELECTION_EXIT.md).

The earlier controls/death follow-up is verified through one isolated offline
Mandara session and 17 captures. Original targeting, Z walk/run, death message,
mouse-confirmed saved-point resurrection and inventory/equipment movement pass.
See [source controls and death flow](SOURCE_CONTROLS_AND_RESURRECTION.md) and
[tracked evidence](../evidence/native-controls-verification.json). The QA harness's
post-run SQLite cleanup error was fixed and evidence recovered without rerunning
the client. The previous multi-route proof applies only to its earlier hash.
The single runtime used SHA-256 `da180c638a77f17bff11f5a6f04d390f1f5981d9c185b5baac7cbe4c11729788`.
Afterward, recovery was switched to the existing native `htPercent` helper for
source rounding on odd totals. That follow-up built and passed inventory checks
without a second controls/death runtime.

The final runtime directory is `C:\_GitHub\TantraSrc\_client`. The implementation
and build tools remain in `_remake`; canonical `TantraClient`, `Tantra` and
`B:\__TANTRA\TantraDataScripts` and native zone data `E:\Global-server` remain read-only inputs.

## Layout and launch

The final folder follows the original client's `resource` and `system` layout:

```text
_client/
  HTLauncher.exe
  Start-Offline.cmd
  *.dll
  serverlist.bin
  system/
    ClientRes.txl, HTMessage.txl, IntroObj.txl, Kathana1Obj.txl
    Mandara_NPC.txl  # original dialogue, choice and step tables
    HTStartup.cfg, HTSpec.cfg
    plugins-ogre.cfg
    ogre/spot_shadow_fade.dds  # required OGRE texture-shadow dependency
    CLIENT_FILES.tsv
    offline/Zone01/, Zone18/, Zone19/  # native zone data and used INI settings
    offline/character-stats/, gameplay-parameters/, world-gameplay/  # generated authority tables
    third-party/
  resource/
    etc/  # original logos, white/loading bitmaps
    UI/  # used INTRO/MainUI textures and original Interface.sys
    map/Map_Intro.cfg
    map/Intro/
    map/MAP_Mandara1st.cfg
    map/Mandara1st/  # THM/TCC/TML and referenced terrain textures
    object/IntroObjTmb/
    object/IntroObjTex/
    object/Mandara1stObjTmb/, Mandara1stObjTex/
    object/Kathana1PopObjTmb/, Kathana1PopObjTex/
    object/Monster/Mesh/
    object/Monster/Ani/
    object/Monster/MonsterTex/
    object/NPC/Mesh/, NPC/Ani/, NPC/NPCTex/
    object/Item/Mesh/, Item/ItemTex/
    object/PC/PCTex/
    object/PC/Mesh/
    object/PC/Ani/
    fx/
    fx/fxPCTexture/
    fx/ENVTEX/  # original cloud textures
    sound/
  userdata/                 created at runtime; never distributed or replaced
```

`HTLauncher.exe` is the built OGRE x64/SDL3 remake executable, staged under its
final name. Double-click `Start-Offline.cmd` for SQLite mode, or run:

```powershell
.\_client\HTLauncher.exe --offline
```

Testing uses offline mode with username **ashesh** and password **ashesh**.
Automated runtime checks use temporary SQLite profiles and preserve the user's
normal saves. These credentials do not enable an online connection.
The runtime loader replaces every source server address with `127.0.0.1`,
retaining native ports and indices. The copied source `serverlist.bin` is a
read-only profile/port input; its historical IPs are never runtime destinations.

The executable detects its adjacent `system/ClientRes.txl` and resolves the
remaining resource families relative to itself. Its `userdata` directory is
separate from `system` and `resource`. Writes into either resource directory or
the canonical reference roots are rejected. The offline launcher also binds
all runtime roots explicitly, including paths with spaces.

Asset placement follows the original source path, rather than the importer's
development-cache name. Loose files retain their full relative path and bytes;
in particular, the intro logos belong in `resource/etc`, not `resource/UI`.
Only used entries are unpacked from HPK archives, with entry names retained:

| Original source | Final destination |
| --- | --- |
| `system/*` used catalogs/configuration | `system/` with original filenames |
| `resource/UI/INTROUI.hpk` entries | `resource/UI/` |
| `resource/sound/*.hpk` entries | `resource/sound/` |
| `resource/map/Intro/TerrainTex.hpk` entries | `resource/map/Intro/` |
| `resource/object/IntroObjTmb.hpk` entries | `resource/object/IntroObjTmb/` |
| `resource/object/IntroObjTex.hpk` entries | `resource/object/IntroObjTex/` |
| `resource/object/Monster/MonsterTex.hpk` entries | `resource/object/Monster/MonsterTex/` |
| `resource/object/PC/PCTex.hpk` native preloads | `resource/object/PC/PCTex/` |
| Used original PC Mesh/Ani files | `resource/object/PC/Mesh/` and `resource/object/PC/Ani/` |
| `resource/fx/fxPCTexture.hpk` entries | `resource/fx/fxPCTexture/` |

The archive-stem directories represent unpacked original containers. Empty
unused families (`Patch`, other maps, NPCs, etc.) are not copied. Future assets
must keep the same native family/path rules. OGRE configuration, inventory and
licenses stay in `system`; the executable and required DLLs stay at client root.
SQLite saves remain in `userdata`. Staging derives these destinations from
source provenance, and the final-client verifier checks each original location.

## Branding

The application title, executable ProductName and FileDescription are **Tantra
Online**. Windows displays the supplied icon on the executable and application
window. The original file was copied, unchanged, from
`A:\zEngineK2\client\resources\ZFLauncher.ico` to
[`assets/branding/TantraOnline.ico`](https://github.com/Tantra-Development/_remake/blob/main/assets/branding/TantraOnline.ico).
Its SHA-256 and source are recorded in the adjacent `PROVENANCE.json`.

The Windows resource build embeds all nine ICO frames. The final client needs
no loose icon file or dependency on the reference drive. Resource metadata uses
product version `0.1.0.0`; that product version does not establish a compatible
legacy game protocol version.

## Build and stage

From `C:\_GitHub\TantraSrc`:

```powershell
cmake --build _remake/build-ogre-sdl --config Release --target tantra_final_client --parallel 6
python _remake/tools/verify-final-client.py
python _remake/tools/verify-final-client-staging.py
python _remake/tools/verify-intro-auth-flow.py --package-root C:/_GitHub/TantraSrc/_client --executable-name HTLauncher.exe --self-contained --offline --audio 1
python _remake/tools/verify-intro-characters.py --package-root C:/_GitHub/TantraSrc/_client --executable-name HTLauncher.exe --self-contained --audio 1 --output C:/_GitHub/TantraSrc/_remake/build-ogre-sdl/intro-characters-final-release
```

The CMake target builds the client and stages the runtime closure. For an
existing build/package, `tools/stage-final-client.ps1` can stage directly;
`-Output`, `-BuildRoot`, `-RuntimeRoot` and `-VCRedistRoot` are overridable.
The default final folder receives Release; use isolated output folders when
verifying Debug so the user's Release client is retained.

`final_client_assets` resolves the **currently integrated normal INTRO**
dependencies from the real catalogs, effect documents, map placements and
material records. The character frontend expands it to 1,534 source/derived
assets: 646 direct source files and 888 derived payloads, including original
character UI/audio, 789 unique PC texture preloads and retained native model/
animation inputs. The complete manifest contains 1,548 files, including the executable, seven
required DLLs, launcher, plugin configuration and distribution notices. It does not
distribute whole HPK archives, unused gallery resources, source code, test
executables, PDBs or static libraries. Extracted HPK entries are placed in the
corresponding resource families; direct files preserve their original relative
paths. New production character/world features must extend this dependency
closure as they are integrated.

`system/CLIENT_FILES.tsv` records each staged file's destination, byte count,
SHA-256, source and purpose. Restaging preserves private data and unknown files.
It removes obsolete manifest-owned files only when their hashes are unchanged;
edited obsolete files are retained. No recursive deletion is used.

## Evidence and remaining work

The current Release `_client` contains **2,272 manifested files / 193,821,704
bytes**. Original paths/hashes, x64 imports, all nine embedded icon images,
actual Tantra Online window title/icon handles, relocated startup in a path
with spaces, the offline launcher and resource/system write guards pass.
Restaging preserves private SQLite data and unknown files, removes only
unchanged obsolete manifest-owned files and retains edited obsolete files.
The restaging verifier's timeout was increased from 30 to 120 seconds for the
larger Mandara closure; its completed preservation checks pass.

The final Release passes all six audio-enabled offline SDL3 scenarios using
**ashesh / ashesh**, with five restarts and 25 captures. The three village-entry
scenarios now load Mandara1st and render an initialized character from native
server spawn/collision data. The other scenarios verify over-population
rejection, deletion and empty-roster persistence. Current Debug passes the
create-to-Mandara scenario; both builds pass 76/76 selected CTest checks with
HTTP excluded. Release's final dependency-closure adjustment also passes its
recheck. Current final/debug world proof hashes match their tested binaries.

Evidence: `build-ogre-sdl/intro-world-final-release/VERIFIED.json`,
`intro-world-debug/VERIFIED.json` and `mandara-*.log`. See
[world entry and exact remaining limits](../archive/checkpoints/MANDARA_WORLD_ENTRY.md). File counts
and runtime subsets below describe earlier checkpoints.

`verify-final-client.py` checks every inventory hash and PE architecture/import,
compares all embedded icon images against the original ICO payload, observes
the actual window title and both icon handles, then runs a relocated copy in a
path containing spaces with development root overrides cleared. It also runs
the offline launcher and checks resource/system write guards.

The runtime authentication verifier exercises two SQLite processes and original
audio through server selection using `--offline` and `ashesh` / `ashesh`.
The character verifier covers create/select, restart/delete and restart/empty
through production SDL3 controls. Online/HTTP runtime tests are excluded from
current testing. The restaging
verifier preserves a private SQLite marker and unknown file, removes a stale
unchanged owned file, and retains an edited stale file. Logs are in
`build-ogre-sdl/final-client-*`.

The earlier branding baseline passed 70/70 CTest cases in both configurations,
including audio-enabled SQLite restart and loopback HTTP/GPU checks. After the
source-path layout correction, both rebuilt configurations pass the 115-file
inventory, exact icon/title, relocated startup/launcher and resource-write guards.
Release also passes audio-enabled SQLite restart/server flow and restaging with
an obsolete `resource/UI` logo migrated back to `resource/etc`.

At the earlier layout checkpoint, the suite had 71 checks. Debug passed 71/71. Release initially
passed 70/71; the material-count test was editing the first material's count
instead of the declared total. Correcting that fixture makes the failed check
pass on its targeted rerun (1/1), without a production decoder change. Evidence:
`build-ogre-sdl/layout-release-ctest.log`, `layout-release-recheck.log`,
`layout-debug-ctest.log`, `layout-*-runtime.log`, `layout-offline-intro.log` and
`layout-restaging.log`. `_client` retains Release; Debug is isolated in
`build-ogre-sdl/final-client-debug`. Native PC resource component coverage does
not establish a rendered character frontend.

The subsequent [native PC preview component](../reference/assets/NATIVE_PC_PREVIEWS.md) raised the
suite to 72 checks, passing in both configurations, and added an explicit
200-appearance GPU/capture verifier. The refreshed Release `_client` and isolated
Debug final folder retain the same 115-file native layout and pass relocation
and original runtime regression checks. The development PC texture dataset is
was not staged into the normal client at that component checkpoint. The current
integrated frontend uses and distributes its required native PC resources.

**Full INTRO remains unfinished, but the offline character frontend is now
integrated.** The normal application proceeds from server selection through
native logical zone/roster responses to original creation, information and
deletion screens, with animated previews and persistent SQLite operations.
The expanded runtime closure is staged using the same original folder rules.
See [the current integration and validation](../archive/checkpoints/INTRO_CHARACTER_RUNTIME.md).
The bounded offline world entry now reaches Mandara1st (40001), with its
source-owned starting cell and rendered main character. Complete equipped
rosters, native face zoom, remaining HUD panels/actions/live stats, NPCs, movement/combat and remaining visual
parity/INTRO acceptance gates are still open.
The [main-camera/main-bar continuation](../archive/fixes/MAIN_GAME_STARTUP_AND_HUD.md) adds its
37 referenced textures and saved layout through the same source-provenance
closure. Its current evidence supersedes earlier file counts and executable proofs.
The later [native status continuation](../reference/gameplay/NATIVE_CHARACTER_STATUS.md) records the
current staged executable, corrected bitmap scaling and 81-check suites. Native
status rendering is available as a component; normal offline notification
generation remains pending.

The dependency scan also exposes an existing `SkyTerrain.tmd` decoder failure
(`missing UV section`). The current renderer declines that mesh; staging keeps
the used source file and reports the decode limitation. It is not rendered
parity evidence. See the [INTRO contract](../reference/lifecycle/INTRO_CHARACTER_FLOW.md) and
[full plan](../IMPLEMENTATION_PLAN.md).
