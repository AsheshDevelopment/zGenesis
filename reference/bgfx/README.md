# ZFLauncher - Tantra Online with bgfx

Windows x64, C++20, SDL3 and bgfx/D3D11 implementation of the Tantra client.
**ZFLauncher.exe** runs the original offline login, saved roster and Mandara
through the project-owned bgfx backend. The window/product is **Tantra Online**.

- [Detailed implementation plan](IMPLEMENTATION_PLAN.md)
- [Progress and next continuation](PROGRESS.md)
- Repository: <https://github.com/Tantra-Development/_remake_bgfx>
- Parent: <https://github.com/Tantra-Development/tantra-dev-main>

Verified slices include Debug/Release builds, original HPK assets, CPU pose/rules,
copied-roster preview, character create/select/delete, CHAR_INIT/Mandara entry,
ground movement, inventory toggle and camera orbit/reset. See the progress file
for evidence and limitations. The complete implementation plan is **not finished**.

Requested working path: `C:\_GitHub\TantraSrc\_remake_bgfx`.
The requested local `_remake` supplied 379 source/tool files, pinned by original
hash in `docs/evidence/source-baseline.json`. Dependencies are pinned separately
in `dependencies.lock.json`. Git submodule registration in the migrated parent
remains separate unfinished administration. No commit or push has been made.

ZFLauncher now uses **`C:\_GitHub\TantraSrc\_client_bgfx`**. It retains the original
asset layout, `userdata/zflauncher`, namespaced shaders/logs and static SDL3/SQLite.
The copied profile retains **ashesh / ashesh**. `_client` remains the OGRE client
and is protected from ZFLauncher profile writes. Confirmed OGRE runtime/plugin,
HTLauncher and stale diagnostic files were removed only from `_client_bgfx`.
Its resource/configuration files, all saves and required Visual C++ DLLs remain.

From this directory, build and stage without launching:

```powershell
.\tools\build-zflauncher.ps1 -Configuration Release
.\tools\stage-zflauncher.ps1 -Configuration Release
```

Launch `_client_bgfx/Start-ZFLauncher-Offline.cmd` to play offline. Build prerequisites
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
`roster-boundaries`, `shadows`, `performance`, `facing-names`. The `shadows` pixel check requires
Python Pillow. A run refuses existing launchers
and existing process-start records. Broader planned checks/scenarios remain open;
legacy tools in `tools/legacy` are provenance/reference, not ZFLauncher entry points.

The dedicated `_client_bgfx` passed native login/Mandara/controls after cleanup.
Both build configurations, 17 selected CPU tests, 11 Python safety tests and
the staged x64 import/manifest check passed. `--check package` verifies current
owned files and the absence of the removed OGRE/shared SDL runtime. Full visual,
performance and clean-machine deployment acceptance remain open.

Warehouse/save-point acceptance uses a disposable copy of the recorded
`_remake/build-ogre-sdl/gameplay-expansion-runtime-20261023/userdata` checkpoint.
It passed original item/Rupiah transfers, save-point confirmation and a separate
full-record reload in ZFLauncher. Normal saves and checkpoint inputs were preserved.
Vartan buy/sell and native repair rejection also passed, followed by another
full-record reload. Paid repair and its separate full-record reload, insufficient
money/capacity, quantity/confirmation cancellation and actual player death/revival
also passed. The C06 minimum gate is accepted; full skills/AI/combat feedback
remain open. The authority rejects native-forbidden item/NPC repair combinations.

Explicit controlled fixtures are created only in a new `build/evidence` profile.
They record their source-created character and test controls, refuse existing
profiles, and preserve imported/default saves:

```powershell
python tools/verify-zflauncher.py --scenario merchant-services --prepare --fixture paid-repair --output build/evidence/my-paid-repair
python tools/verify-zflauncher.py --scenario merchant-services --run --output build/evidence/my-paid-repair
```

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
table plus source-hash manifest; stage installs them under `system/zflauncher`.
Original TPA/TXL/XML files and native IDs/gameplay fields are preserved. UTF-8
text remains distinct from unmodified legacy strings. Empty English source cells
remain empty. Item names/descriptions are retained in the same display catalog.
The CMake cache variables `ZF_ENGLISH_PARAM_XML` and `ZF_ENGLISH_MESSAGE_XML`
select different authored exports when needed.

`facing-names` is an additional explicit runtime scenario. Left/right running,
intro gate facing and English Vasabhum target/overhead text passed; six rebuilt
focused CPU checks and 14 Python tests passed. Full speech/conditional name
policies, visual parity and current same-quality performance remain open.
