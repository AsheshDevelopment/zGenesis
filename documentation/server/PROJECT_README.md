# Tantra native C++ server

Independent Windows x64 C++20 server project with a centralized Unicode Win32
Server Manager. Full scope: [implementation plan](IMPLEMENTATION_PLAN.md).
Current verified work and unfinished systems: [progress](IMPLEMENTATION_PROGRESS.md).
Build, data, native GUI and lifecycle evidence: [management foundation](MANAGEMENT_FOUNDATION.md).

The Win32 manager and [authoritative SQLDMN persistence](SQLDMN_PERSISTENCE.md)
are implemented. SQLDMN stores accounts/characters/cargo and ownership through local
RPC; Accounts and Database have operator tools. [DBSRV login/character transport](NATIVE_LOGIN.md)
is implemented and checked with an isolated service pair. Zone gameplay and the
remaining shared-service backends are unfinished. [Native world entry](NATIVE_WORLD_ENTRY.md)
now has CPU-checked authority and a bounded TCP worker; its corrected network route
and graphical client acceptance remain unverified. The directly reused C++ status
and probability core passes recorded CPU comparisons. Native NPC generation is
connected to the zone timer and visibility grid; initial-generation and AI
dispatch comparisons pass without launching workers.
[NPC detection, routing and standing control](NATIVE_NPC_SPATIAL.md) now
preserve native tables, callback order and retained decks; the full periodic AI
controller and combat remain unfinished.
[Attacker memory and guard/help/link response](NATIVE_NPC_THREAT.md) now
compile the original native functions and prepare generated NPC identities.
[World action/control connections](NATIVE_NPC_WORLD_ACTIONS.md) now publish
native speech and standing-step movement and preserve PC/NPC mode ownership;
the full controller remains unfinished. The
[ordinary periodic peace phase](NATIVE_NPC_PEACE_PHASE.md) now runs after
generation with recovery, effect/condition updates, detection and standing actions;
full combat/special-mode/lifecycle services remain open.
[Ordinary flee/roam and return](NATIVE_NPC_FLEE_ROAM.md) now run in the same
timer loop, preserving native paths, RNG, run/walk actions and home warps.
[Battle targeting, pursuit and skill selection](NATIVE_NPC_BATTLE.md) now have
source-backed components and live actor inputs; timed combat, damage and death
services remain unfinished.
[Combat tables and NPC damage](NATIVE_DAMAGE.md) now preserve native mitigation,
shield behavior, effect removal and credited HP/dead-state changes. Full casting,
death rewards/respawn and timed combat remain unfinished.
[Native damage rolls](NATIVE_DAMAGE_ROLL.md) now connect the original dice,
percentage/armor and actual-HP-loss sequence to NPC damage authority.
[Player receive damage](NATIVE_PLAYER_DAMAGE.md) now connects native scaling,
HP/time/dead-state changes and SQLite revisions, with failed-save fencing.
[Native equipment wear](NATIVE_EQUIPMENT_DURABILITY.md) now joins DealDamage
and PC reception in one HP/equipment SQLite revision. Complete casting and the
death/reward lifecycle remain open.
[Inventory/equipment and account cargo](NATIVE_INVENTORY.md)
now have source-backed packet handlers and SQLite-backed CPU checks.
[Ordinary merchants, repair and save points](NATIVE_NPC_SERVICES.md) now have
connected authority handlers; cash shops, dialogue/warehouse UI and fresh TCP
acceptance remain open.
Workers report game_ready=false. The Rust reference project remains unchanged.

## Build and initialize

Install Visual Studio 2022 C++ tools, Windows SDK, CMake and Python 3.
From this directory:

```powershell
.\tools\Build-Server.ps1 -Configuration Release -InitializeZones
.\bin\TantraZone.exe --validate --root "$PWD"
.\Start-ServerManager.bat
```

`build-server.bat --debug` and `--release` provide non-interactive builds. The
default BAT provides an interactive choice. The manager launcher opens the GUI
without starting workers. Start Server is an explicit action.

Build verification defaults to CPU checks. Use `-IncludeRuntimeTests` only when
the isolated headless service routes need to run; they are not repeated by every
ordinary build. `-SkipTests` packages an already checked build. The default CPU
checks start no workers. The explicit runtime group includes one isolated Zone01
packet route; no test starts HTLauncher. Do not rerun a failed zone route without
the approval required by the implementation plan.

Builds acquire source-only dependencies at the pinned URLs/hashes in
dependencies.lock.json. Initial downloads are cached locally; no third-party
installer or executable is run. Runtime binaries require the matching Microsoft
Visual C++ x64 runtime. SQLite is compiled into the project.

Zones default to 127.0.0.1, game ports 3001-3010 and admin 13001-13010. Shared
roles use 21001-21005/22001-22005. Existing Rust workers can occupy these ports;
the manager rejects conflicts rather than terminating other processes.

Each zone owns its original-style settings and matching IDX/TCM/NPCGener dataset.
Add Zone imports another folder after validation; it does not enable unsupported
native IDs or promise unlimited machine capacity. Settings are editable only
while the affected worker is stopped. Unknown native fields/comments are retained.

## Reference paths

- `C:\_GitHub\TantraSrc\Tantra`: original zone/DBSRV/SQLDAEMON implementation.
- `B:\__TANTRA\TantraSrc\Tantra`: additional original source reference.
- `E:\Global-server\Zone01` through `Zone10`: per-zone atomic source datasets.
- `B:\__TANTRA\TantraDataScripts`: authored XML/Excel game data.
- `C:\_GitHub\TantraSrc\_server`: Rust topology, ownership contracts and parity fixtures.
- `C:\_GitHub\TantraSrc\_remake`: OGRE/offline/native C++ rule reference.
- `C:\_GitHub\TantraSrc\TantraClient`: original asset source.
- `C:\_GitHub\TantraSrc\_client`: final game client; never opened as a server DB.
- `A:\zEngineK2\tools\zf_ServerManager`: central management workflow reference.
- `E:\PC\Pictures\Group\Icon-ZoneServer.ico`: icon copied to assets, embedded
  in the executable and assigned to the Win32 window.

## Dependency licenses

JSON for Modern C++ 3.12.0 and toml++ 3.4.0 retain MIT notices in their headers.
Boost 1.88.0 retains LICENSE_1_0.txt in external/boost. SQLite 3.54.1 is copied
from the existing owned amalgamation and retains its public-domain notice.
No SDL3, ImGui, OGRE or Rust runtime is linked into this manager.
Argon2's reference implementation is linked statically; its complete license is
included with the packaged dependency notices.
