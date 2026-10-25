# Tantra Server Manager and Rust server workspace

Rust x64 foundation for the Tantra server and its native Windows management GUI.
The OGRE/SDL3 client remains in `C:\_GitHub\TantraSrc\_remake`.

The manager icon is copied unchanged from `E:\PC\Pictures\Group\Icon-ZoneServer.ico`
to [`assets/Icon-ZoneServer.ico`](https://github.com/Tantra-Development/_server/blob/main/legacy/rust/assets/Icon-ZoneServer.ico). The executable embeds
it as a Windows resource and uses it for its window; builds use the project copy.

[Native monster data and placement](NATIVE_POPULATION_DATA.md) now provides
verified generator/handle/schedule and spatial helpers, plus server-only import
and validation commands. [Native NPC initialization and skill state](NATIVE_NPC_INITIALIZATION.md)
now pass CPU checks and a packaged validator. [Ordered generation preparation](NATIVE_GENERATION_PREPARATION.md)
composes routes, NPC Init and occupied placement before Pop.
[AI data and Think/Speak dispatch](NATIVE_AI_DISPATCH.md) now pass compiled-source
checks, and Mandara's empty Pop bindings are verified per actor. [Initial Mandara generation and NPC publication](NATIVE_INITIAL_POPULATION.md)
are now connected; general AI/combat and full socket/frontend acceptance remain pending.
[TCM startup and native route primitives](NATIVE_TCM_STARTUP_AND_ROUTING.md)
now preserve first-floor heights/events and the source startup return. Earlier
propagated-grid generation totals are retained as historical evidence.
[NPC movement control, retained rates and enemy detection](NATIVE_NPC_CONTROL_AND_DETECTION.md)
now pass compiled-source CPU comparisons. Their live ProcessMonster integration,
combat entry and movement publication remain unfinished.

**This is a working management foundation, not a complete game server.**
Zone workers expose local administration and operational SQLite history.
SQLDMN now owns account/character/cargo persistence; DBSRV exposes authenticated
character operations over a development native logical-packet TCP endpoint.
Zone workers now bind native authentication sockets through DBSRV coordination.
Mandara FIRST CHAR_INIT/status, Chakra/learning and native action movement are implemented.
World actor simulation remains unfinished and `game_ready` stays false. The client's existing
offline authority has not been replaced or connected to these processes.
See [implementation progress and all six requested areas](ROOT_IMPLEMENTATION_PROGRESS.md).
The [native web-login guide](NATIVE_WEB_LOGIN.md) covers the implemented
HTTP phase, source filters, credential upgrades and C++ interoperability evidence.
The [zone authentication/ownership guide](SESSION_OWNERSHIP_AND_ZONE_AUTH.md)
covers schema 4, transfer transactions, reconnect fencing and current limits.
The [native entry parity guide](NATIVE_ZONE_ENTRY.md) covers implemented
IDX/TCM parsing, FIRST-entry spawn rules and the CHAR_INIT packet codec.
The [native status authority guide](NATIVE_STATUS_AUTHORITY.md) covers the
Rust-owned C++ equation component and the verified headless Mandara entry path.
The [movement authority guide](NATIVE_MOVEMENT_AUTHORITY.md) covers the active
action protocol, native checks, saved cells and verified same-endpoint reconnect.

## Start the manager

Run [Start-ServerManager.bat](https://github.com/Tantra-Development/_server/blob/main/legacy/rust/Start-ServerManager.bat).
Built Windows x64 **Debug** executables are in `bin/`:

- `tantra-server-manager.exe`: GUI; opening it starts no zone workers.
- `tantra-zone.exe`: headless managed zone process and import/validation CLI.
- `tantra-service.exe`: SQLDMN or DBSRV, selected by its service folder.

Click **Start Server** to start SQLDMN, DBSRV and enabled, stopped zone workers.
It validates their data and checks a live response from each exact spawned PID.
Already owned/external workers and disabled zones are skipped; failures are
reported per zone. **Stop Server** stops owned zones, then DBSRV and SQLDMN,
and waits for their exit. Individual zone/service controls remain available.
The top bar shows localhost hosting (`127.0.0.1` by default), actual worker
responses and pending gameplay readiness. Commands show a pending indicator and
cannot overlap in the GUI. MSGSRV/CHATSRV/ITMSRV remain unimplemented and disabled.

The GUI provides shared-service status, a world/zone tree, per-zone start and
graceful stop, IP/port profiles, native INI editors, log tails and zone import.
Configuration changes require the worker to be stopped. Closing the manager
stops the workers it owns; it never launches or stops the legacy executables.

Rebuild/package, overwriting the owned executables in `bin/`:

```powershell
.\tools\Build-Server.ps1 -Configuration Debug
# Optimized build:
.\tools\Build-Server.ps1 -Configuration Release
# On a fresh workspace, import Zone01 through Zone10 as well:
.\tools\Build-Server.ps1 -InitializeZones -SourceRoot 'E:\Global-server'
```

Existing zone folders and settings are preserved by initialization. Missing or
invalid source data stops the import with an error. Interrupted staging folders
are retained for diagnosis and excluded from discovery.

## Services and zones

| Component | Planned scope | Current state |
| --- | --- | --- |
| DBSRV | Shared account/character coordination and session ownership | Development native TCP roster/create/delete endpoint; authenticated leases; world handoff pending |
| MSGSRV | Shared cross-zone message/social routing | Configured in GUI; backend pending |
| CHATSRV | Shared chat service; native responsibility split still needs tracing | Configured in GUI; backend pending |
| ITMSRV | Shared item-service boundary; exact native operations still need tracing | Configured in GUI; backend pending |
| SQLDMN | Shared SQLite persistence service / sole writer for common state | Accounts, characters, deletion backups, revisions and atomic cargo transactions; full gameplay integration pending |
| ZONESRV | One worker process for each zone | Native authentication, ownership, Mandara FIRST/status/Chakra/learning, cell movement, PC visibility/retry and reconnect implemented; NPC simulation and connected client acceptance pending |

The five shared services have separate `services/<name>/service.toml` profiles.
Their proposed localhost service ports are 21001â€“21005 and admin ports
22001â€“22005. These are **proposed remake endpoints**, not verified legacy ports
or active listeners. Disabled controls explicitly identify their missing backend.

Ten actual zone folders have been imported:
`C:\_GitHub\TantraSrc\_server\zones\Zone01` through `Zone10`.
Each is independent:

```text
Zone01/
  zone.toml                 # identity, enable/name, IPs, ports and future limits
  LocalIP.txt               # generated localhost native-style endpoint file
  GenerationArea.idx        # same selected source folder as TCM/NPCGener
  MapData.tcm
  NPCGener.txt
  import-manifest.json      # source paths, hashes and runtime repair notes
  Data/
    Settings.ini            # zone/world, country, rates, visibility, levels, etc.
    WorldSettings.ini       # status constants/protection loaded; remaining world rules pending
  state/                    # worker-owned SQLite run history and admin token
  logs/                     # stdout/stderr for this exact worker
```

`state` is deliberately distinct from native `Data` on Windows. Its database
contains operational runs, **not accounts or authoritative character saves**.

Defaults are `127.0.0.1`, game ports 3001â€“3010 and local admin ports 13001â€“13010.
Each zone has its own bind IP, advertised IP and ports. In the deployed server
tree the game port now serves native authentication (currently localhost only).
An isolated management-only tree without shared profiles leaves it disabled. Native `LocalIP.txt`
ports are read where available; missing source files use the stated remake
formula. Historical public source IPs are never imported into runtime endpoints.

The registry discovers zone profiles rather than hard-coding ten entries. The
GUI's **Add a zone** imports another matching native dataset without rebuilding.
Additional game maps still need compatible client map/resource routing; adding a
folder alone does not implement their gameplay or remove native wire-ID limits.

### Source correction retained explicitly

Supplied `E:\Global-server\Zone08\Data\WorldSettings.ini` begins `2[Item]`.
Only the remake-owned runtime copy has that stray `2` removed. The exact original
is retained as `Data/WorldSettings.source.ini`, with hashes/repair notes in the
import manifest. All reference files remain unchanged. Other native settings
are copied intact and edited only in their independent runtime folders.

Runtime zone folders, databases, tokens, logs and binaries are ignored by Git.
`Cargo.lock`, Rust source, service profiles and build/import tools are project files.

## Verification on 2026-10-23

- [x] Build/package the Windows x64 manager and worker.
- [x] Import and validate all ten zone profiles and matching native datasets.
- [x] Pass one isolated Zone01 worker lifecycle: status/heartbeat, duplicate-start
  rejection without a second spawn, blocked live configuration edits, token
  rejection, graceful shutdown, committed SQLite run and unchanged source files.
- [x] Verify endpoint collisions are rejected and the registry can represent ID 11.
- [x] Capture and inspect the rendered shared-services overview with ten zones.
- [x] Add top-level Start Server / Stop Server and verify them through one isolated
  Zone01 lifecycle, including disabled skipping, duplicate prevention and real
  readiness. Fix TCP admin framing after the first test exposed a connection
  reset; retain that failed attempt and verify the corrected build separately.
- [ ] Fully exercise every GUI control and fault/retry path.
- [x] Implement the first SQLDMN/DBSRV persistence/session/character TCP slice and manager controls; verify with isolated service processes and C++ codec parity.
- [ ] Complete shared-service behavior, remaining three backends and native client/world integration.
- [ ] Port gameplay, complete cross-zone handoff and establish load/capacity results.

No game client was launched for this work. Earlier zone lifecycle tests started
one Zone01 worker per fixture. Shared-service tests use their own isolated
SQLDMN/DBSRV pair; their scope and retained attempts are listed in the progress file.
The earlier Mandara client acceptance gate remains a separate unfinished task.

Useful commands:

```powershell
.\bin\tantra-zone.exe list --root .\zones
.\bin\tantra-zone.exe validate --root .\zones
.\bin\tantra-zone.exe import --root .\zones --source 'E:\Global-server\Zone11' --id 11
cargo test -p tantra-zone --test managed_zone --locked -- --nocapture
```

See [implementation plan](ROOT_IMPLEMENTATION_PLAN.md) and [validation evidence](https://github.com/Tantra-Development/_server/blob/main/legacy/rust/validation.json).

## Account provisioning and service state

Start SQLDMN using the manager, then provision an account with a password from
stdin. A PowerShell example for the **isolated test credentials only** is:

```powershell
'ashesh' | .\bin\tantra-service.exe provision --service .\services\SQLDMN --account ashesh --password-stdin
.\bin\tantra-service.exe status --service .\services\SQLDMN
.\bin\tantra-service.exe status --service .\services\DBSRV
```

Accounts are not created automatically in the normal server database. Provision
is insert-only. Passwords follow the selected native ASCII, case-folded,
20-byte profile; only a salted Argon2id verifier of the zone digest is stored.
Internal service tokens, databases and logs live in ignored service `state/`
and `logs/` folders. Endpoints currently require localhost. Do not expose this
development endpoint as a production or stock-client-compatible game service.

DBSRV uses TCP 21001/admin 22001 and native HTTP login 21006;
SQLDMN uses 21005/admin 22005. Other service
profiles are still reservations. `services/DBSRV/transport.toml` selects the
native logical version and source-style roster destination. Native web world
selection remains unavailable while simulation is unfinished. A headless test
can exercise owned Zone01 FIRST entry when the authored status tables are staged.

Provision now stores both native web and zone verifiers. Existing zone-only
accounts can use `enable-web-login` with the same stdin/password arguments;
this verifies the old password and preserves their characters and cargo.
Schema 3 migration never recreates accounts. Build packaging stages the native
login tables from the selected Zone01 and paths from the canonical client
HTMessage file; `-SourceRoot`/`-ClientRoot` select the reference locations.

## References and guides

- `C:\_GitHub\TantraSrc\Tantra\zone`: original authority, zone settings,
  connections, movement/combat/skill/NPC behavior. `server.cpp` reads LocalIP.txt
  and derives DB/MSG ports from the local zone port; those internal legacy rules
  are not assumed to equal the proposed Rust shared-service endpoints.
- `C:\_GitHub\TantraSrc\Tantra\DBSRV`: account/character request and session traces.
- `B:\__TANTRA\TantraSrc\Tantra`: additional read-only source tree; five selected DB/SQL/zone files matched the C: copy. No separate MSGSRV/CHATSRV/ITMSRV source was found there.
- `C:\_GitHub\TantraSrc\Tantra\SQLDAEMON`: native persistence/ODBC job boundaries.
- `E:\Global-server\Zone01` through `Zone10`: independent native runtime datasets
  and per-zone settings; read-only references.
- `E:\Global-server\DBSRV`, `MSGSRV`, `CHATSRV`, `ITMSRV`, `SQLDMN`: deployed
  service reference folders. Directory presence alone is not proof of source
  availability or exact service responsibilities.
- `A:\zEngineK2\server` and `A:\zEngineK2\tools\zf_ServerManager`: read-only
  architecture, GUI layout and process-management reference. Its game protocol,
  schema, branding and source were not copied into this implementation.
- `C:\_GitHub\TantraSrc\_remake\src\client`: current offline authority and codecs;
  parity reference for the later Rust implementation, not a complete network server.
- [Cargo workspace guide](https://doc.rust-lang.org/book/ch14-03-cargo-workspaces.html).
  Dependency versions are pinned by this project's Cargo.lock; GUI API behavior
  was checked against the installed eframe 0.36.1 and resolved egui source.
