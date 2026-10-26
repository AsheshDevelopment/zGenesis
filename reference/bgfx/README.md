# ZFLauncher - Tantra Online with bgfx

Windows x64, C++20, SDL3, miniaudio and bgfx/D3D11 implementation of the Tantra client.
**ZFLauncher.exe** runs the original offline login, saved roster and Mandara
through the project-owned bgfx backend. The window/product is **Tantra Online**.

- [Detailed implementation plan](IMPLEMENTATION_PLAN.md)
- [Progress and next continuation](PROGRESS.md)

Options has native `Resolution < 1024x768x32 >` arrows and an **Advance** button.
Advance opens the reference-style compact **Settings** panel: Presets/Options
section bars, Low/Mid/High presets and grouped gold buttons with selected states.
Select a preset or type a custom size; Apply updates SDL3/bgfx immediately.
The existing aspect/window/quality, fog/detail/VSync and brightness/distance
controls remain functional; graphics save outside the client in the profile's
`system/Graphics.cfg`. Current layout acceptance passes 103 real SDL checks.
Custom bounds are 800x600..7680x4320; fullscreen requires an exact supported mode,
and borderless uses desktop pixels. The 32 suffix is actual DX11 colour depth.
Existing UI images and HPK assets are reused.

C02 now passes its bounded original-resource/ordered-rendering gate: 22 focused
checks per Debug/Release build, 84 renderer assertions per configuration, 94 live
SDL graphics checks, an original-asset resize/minimise/restore scenario and clean
53-file package closure. See `build/evidence/C02_ACCEPTANCE.json` locally.
This checkpoint does not establish whole-game or exact native visual parity.

The current native persistence matrix passes six fresh-process legs over one
private profile, including Restart, another character and the three supported
Mandara village zones. Window/options bytes, quickbar mode, equipment attachments
and independent miniaudio settings restore correctly. All three villages use
Mandara art40001; other-map and portal handoffs remain separate work.

For explicit measurements, build/stage Release, close an existing launcher, then
run `python tools/profile-world.py --output build/evidence/NEW_DIRECTORY`.
The default two trials per town/dense-field/combat scene record raw CPU/GPU and
loading CSVs in private profiles. The accepted `world-profile-matrix1` contains
7,200 frames on named hardware; dense43-actor frame medians are9.68–9.73ms with
4.12ms CPU pose work. These are baselines before optimisation, with an
uncontrolled OS file cache. Full skill/FX, other maps and release parity remain
open; missing authored assets are recorded and skipped as requested.

Additional read-only guides are the K3 and Global folders under
`B:\__TANTRA\TantraDataScripts`, and the shipped client at
`B:\Tantra-Files\_TantraClients\TantraOnline-Global`. Their table versions differ
from this client; the plan's reference manifest and FX audit record those
differences before any reuse.

Launch with [`_client_bgfx/Start-Offline.cmd`](../_client_bgfx/Start-Offline.cmd). The client executable remains in `_client_bgfx`; shaders, offline tables, licenses, logs and the database remain outside the client.
- Repository: <https://github.com/Tantra-Development/_remake_bgfx>
- Parent: <https://github.com/Tantra-Development/tantra-dev-main>

Verified slices include Debug/Release builds, original HPK assets, CPU pose/rules,
copied-roster preview, character create/select/delete, CHAR_INIT/Mandara entry,
ground movement/retarget, inventory/services, camera orbit/reset, source-timed
ordinary melee with native hit digits/sounds, and the implemented OGRE sky/intro
particle foundations. Native sword-ready stand/walk/run and safe-cell sheathing
also passed offline runtime checks. See the progress file
for evidence and limitations. The complete implementation plan is **not finished**.

Projectile arrival now controls damage and native HP/TP/arrow costs, with27
authoritative weapon/skill encounters and five flight-lifecycle checks. Four GPU
cases render native follow/impact geometry; full FX acceptance remains failed
because skill3162 references activation1000646, absent from all five inspected
K3/Global/current-client tables. The reference audit records this content gap.

Requested working path: `C:\_GitHub\TantraSrc\_remake_bgfx`.
The requested local `_remake` supplied 379 source/tool files, pinned by original
hash in `docs/evidence/source-baseline.json`. Dependencies are pinned separately
in `dependencies.lock.json`. Git submodule registration in the migrated parent
remains separate unfinished administration. No commit or push has been made.

ZFLauncher now uses **`C:\_GitHub\TantraSrc\_client_bgfx`**. It retains the original
asset layout and static SDL3/SQLite. Remake support lives in `runtime/`, with saves in `userdata/zflauncher` under this project. Native UI settings use `_client_bgfx/resource/UI/Interface.sys`.
The copied profile retains **ashesh / ashesh**. `_client` remains the OGRE client
and is protected from ZFLauncher profile writes. Confirmed OGRE runtime/plugin,
HTLauncher and stale diagnostic files were removed only from `_client_bgfx`.
Its native resource/configuration files and required Visual C++ DLLs remain.

Mandara uses the authored sublight and character-following spotlight. Textured
scenery now follows OGRE's map material override without an extra TMB grey tint.
The reference presentation uses linear terrain gain2 and preserves texture
contrast; the former terrain gamma2.2/warm tint and separate grass grade are removed.
The sky has a complete backdrop behind the original animated cloud meshes.
Offline Mandara keeps a private server epoch and uses each map's authored day/night durations. The first epoch starts at noon.
The normal profile selects HIGH and realtime shadows, matching OGRE's defaults.
Terrain sections use clamped base images plus repeating original `detail.dds`
with its full mip chain and 16x world anisotropic filtering. Animated creatures
cast 2048 PCF shadows onto opaque terrain/scenery with OGRE's 50 percent
modulation; terrain does not cast onto itself. Original CFG files stay intact,
and explicit private overrides retain precedence.
Local shadow projection/depth ranges and bias are tuned to native character size.
The reference grade is separate from native lighting and excludes UI, characters,
buildings and sky. To use the ungraded materials and timestamp-based start:

```powershell
..\_client_bgfx\Start-Offline.cmd --world-look native --offline-world-time native
```

General Mandara field/skill/aura FX remain incomplete; discovering the 32 authored
field effects is source inventory, not runtime implementation.

From this directory, build and stage without launching:

```powershell
.\tools\build-zflauncher.ps1 -Configuration Release
.\tools\stage-zflauncher.ps1 -Configuration Release
```

Launch `_client_bgfx/Start-Offline.cmd` to play offline. Build prerequisites
are Visual Studio 2026 C++ x64 tools, Windows SDK 10.0.26100.0, CMake 3.28+,
Python 3 and Git. Bootstrap verifies/fetches pinned dependencies; subsequent
rebuilds use the local snapshots offline. The runtime needs D3D11 and the x64
Visual C++ runtime. See [dependency notices](THIRD_PARTY_NOTICES.md).

The private default profile is already seeded. The seed tool refuses to overwrite
it. Automated runtime scenarios use fresh disposable copies under `build/evidence`:

```powershell
python tools/verify-zflauncher.py --scenario roster-lifecycle --prepare --seed-profile ../_client_bgfx/userdata/zflauncher --output build/evidence/my-new-run
python tools/verify-zflauncher.py --scenario roster-lifecycle --run --output build/evidence/my-new-run
```

Supported scenarios: `shell`, `asset-scene`, `intro-roster`, `roster-lifecycle`,
`mandara-entry`, `mandara-controls`, `basic-combat`, `saved-services`,
`saved-services-reload`, `merchant-services`, `preview-matrix`,
`roster-boundaries`, `shadows`, `performance`, `facing-names`, `environment`,
`intro-fx`, `mandara-lighting`. The latter captures controlled noon/night views
and, with `--fixture weapon-combat`, verifies held-pose lighting/presentation
pixels using Pillow. Environment/intro acceptance verifies selected implemented native
families; the gallery TFX sample is bounded. The `shadows` pixel check requires
Python Pillow. A run refuses existing launchers
and existing process-start records. Broader planned checks/scenarios remain open;
legacy tools in `tools/legacy` are provenance/reference, not ZFLauncher entry points.

The dedicated `_client_bgfx` passed native login/Mandara/controls after cleanup.
The OGRE migration passed both build configurations, 14 selected CPU checks,
14 Python safety tests, native offline scenarios and the staged x64
import/manifest check. `--check package` verifies current
owned files and the absence of the removed OGRE/shared SDL runtime. Full visual,
performance and clean-machine deployment acceptance remain open.

Warehouse/save-point acceptance uses a disposable copy of the recorded
`_remake/build-ogre-sdl/gameplay-expansion-runtime-20261023/userdata` checkpoint.
It passed original item/Rupiah transfers, save-point confirmation and a separate
full-record reload in ZFLauncher. Normal saves and checkpoint inputs were preserved.
Vartan buy/sell and native repair rejection also passed, followed by another
full-record reload. Paid repair and its separate full-record reload, insufficient
money/capacity, quantity/confirmation cancellation and actual player death/revival
also passed. Ordinary melee now applies damage at the native TAB `attack` marker
with the matching rendered pose, native hit/miss digits, hit flash and sounds.
The C06 minimum gate is accepted; full skills/AI/FX and all combat combinations
remain open. The authority rejects native-forbidden item/NPC repair combinations.

Explicit controlled fixtures are created only in a new `build/evidence` profile.
They record their source-created character and test controls, refuse existing
profiles, and preserve imported/default saves:

```powershell
python tools/verify-zflauncher.py --scenario merchant-services --prepare --fixture paid-repair --output build/evidence/my-paid-repair
python tools/verify-zflauncher.py --scenario merchant-services --run --output build/evidence/my-paid-repair
```

The controlled `weapon-town` and `weapon-combat` fixtures exercise sword4001
through `mandara-controls` and `basic-combat`. The latter fixture can also drive
`mandara-controls` to verify hostile weapon-ready movement. Source/default saves
remain unchanged. Some legacy dagger/claw/sheath sockets are absent on supplied
bodies; those combinations are diagnosed and remain outside full parity.

Equipped elemental refinement now selects the native fire, ice, lightning or
poison ribbon texture and level-dependent brightness from TPA material records.
Escape cancels movement, attacks or casting. A cancelled pre-commit skill spends
no cost. Active skill State
FX have separate once/loop bindings and expire with their duration/native effect
slots; death, actor removal and scene cleanup release them. Native skill3110 has
an actual persistent-state regression. Projectile/follow FX and complete
weapon/skill damage-timing coverage remain open.

Other fixture cases are `no-money`, `full-inventory`, `death` (basic-combat) and
`roster` (roster-boundaries). Default profile hashes are independently checked
before/after every isolated runtime attempt.

All eight tribe previews and full-roster/duplicate/retry checks passed. Rendering
now preserves authored deformed normals, handles nonuniform world normal
transforms, and submits alpha-aware directional depth shadows. The same-time
shadow on/off/restored test verifies reversible receiver pixels. The shadow
profile switch and three renderer restart cycles also passed. GPU skinning,
complete environment/TFX, broad visual parity and asynchronous loading remain open.
`c08-idle-frame-sample` records a short 1024x768 stationary sample with frame
median/p95/p99 and valid GPU timing; it is not sustained-FPS or release acceptance.
The current package contains four shaders and 16 manifest-owned files.

Native yaw is converted at the bx object-matrix boundary, so intro monsters and
moving characters face the source direction. Player, NPC and monster names are
drawn at native height anchors, with yellow NPC names behind MainUI.

English display text defaults to `philippine_szName`,
`philippine_szDescription`, `philippine_szText` and other Philippine columns in
`../GenesisK3-XMLs/TantraParam.xml` and
`../GenesisK3-XMLs/XMLS-XLS/HTMessage.xml`. Build generates a namespaced English
table plus source-hash manifest; stage installs them under `_remake_bgfx/runtime/data`.
Original TPA/TXL/XML files and native IDs/gameplay fields are preserved. UTF-8
text remains distinct from unmodified legacy strings. Empty English source cells
remain empty. Item names/descriptions are retained in the same display catalog.
The CMake cache variables `ZF_ENGLISH_PARAM_XML` and `ZF_ENGLISH_MESSAGE_XML`
select different authored exports when needed.

The client also reads `system/TantraParam.tpa` directly in memory. Its complete
native table stream is validated using source-generated layouts; the current
client's additional four item bytes are retained without interpreting them.
Philippine English text takes precedence over native TPA text. Offline/server
imports remain outside the client and retain gameplay authority. Their recorded
data differences are in `build/evidence/native-tpa-imports2/TPA_IMPORT_COMPARISON.json`;
direct reading does not imply the two datasets have identical versions.

`facing-names` is an additional explicit runtime scenario. Left/right running,
intro gate facing and English Vasabhum target/overhead text passed; six rebuilt
focused CPU checks and 14 Python tests passed. Full speech/conditional name
policies, visual parity and current same-quality performance remain open.
