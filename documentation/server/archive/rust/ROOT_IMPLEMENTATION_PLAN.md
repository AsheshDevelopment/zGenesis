# Rust Tantra server and Server Manager implementation plan

Cross-project audit: [current native/client/Rust gameplay gaps and completion
gates](../_remake/docs/CURRENT_SOURCE_GAPS_AND_IMPLEMENTATION_PLAN.md).
Current implementation evidence and all requested work: [progress checklist](ROOT_IMPLEMENTATION_PROGRESS.md).

Updated 2026-10-23. This supersedes the earlier proposed C++/SDL3/ImGui server GUI.
The existing game client remains C++ x64 / OGRE / SDL3. Server processes and the
Server Manager are Rust x64; the GUI uses eframe/egui and the workers are headless.

## Requirements and current boundary

- Server ownership root: `C:\_GitHub\TantraSrc\_server`.
- Preserve the original Tantra authority and externally visible native sequence,
  resource IDs, field widths, arithmetic, integer rounding and RNG consumption.
- Manage DBSRV, MSGSRV, CHATSRV, ITMSRV, SQLDMN and separate ZONESRV workers.
- Initially configure only Zone01 through Zone10 from `E:\Global-server`.
- Each zone owns a folder, original-style settings, identity, configurable
  bind/advertised IP and game/admin ports. Defaults stay on localhost.
- Discover/import additional zone profiles without a compiled ten-zone limit.
- Adapt the layout/workflow of `A:\zEngineK2\tools\zf_ServerManager` to Tantra.
- SQLite is the initial persistence backend. Do not share the client's live
  offline database or open one common writable database from every zone.

**Implemented now:** process administration, profile/import/settings management,
operational SQLite history, GUI controls and the first SQLDMN/DBSRV account,
session, character TCP and cargo-persistence slice, plus owned Mandara FIRST
CHAR_INIT/status/Chakra/learning, native action cell movement and reconnect.
The selected equation core is C++ hosted by Rust
through a checked static ABI. **Not implemented:** remaining world entry/services,
actor simulation, client integration and the other shared-service backends.
Neither successful PIDs nor green management status establish gameplay readiness.

## Process topology

```text
Tantra Server Manager
  shared services for a world
    SQLDMN       account/character/cargo SQLite owner (first slice implemented)
    DBSRV        session/character TCP endpoint (first slice; world handoff pending)
    MSGSRV       inter-zone messaging/social routing (planned)
    CHATSRV      chat delivery (planned; native split with MSGSRV to trace)
    ITMSRV       item service (planned; exact native responsibilities to trace)
  independent zones
    ZONESRV --zone zones/Zone01
    ZONESRV --zone zones/Zone02
    ...
    ZONESRV --zone zones/Zone10
```

Use separate shared services, not five copies for every zone. The same headless
zone binary receives a different folder/profile for each process. A failure in
one zone must not terminate the manager or unrelated zones. The initial design
is a local process topology; remote deployment/clustering remains future work.

Original internal transports need not be transplanted into an all-Rust cluster.
Define versioned, typed internal requests while preserving source-backed behavior
and native client-facing compatibility. Trace each selected native variant before
assigning responsibilities: only DBSRV/SQLDAEMON source is currently identified
in the selected Tantra tree; the other supplied deployment folders do not by
themselves establish their complete protocol or implementation.

## Workspace and runtime layout

```text
_server/
  Cargo.toml, Cargo.lock
  crates/server-core/       configuration, imports, admin contracts, supervision
  crates/zone/              headless worker and CLI
  crates/manager/           native GUI and background controller
  services/
    DBSRV/service.toml
    MSGSRV/service.toml
    CHATSRV/service.toml
    ITMSRV/service.toml
    SQLDMN/service.toml
  zones/Zone01 ... Zone10/  separate native datasets and settings
  bin/                     packaged manager and worker
  tools/Build-Server.ps1
  Start-ServerManager.bat
```

Each zone has `Data/Settings.ini`, `Data/WorldSettings.ini`, `LocalIP.txt`,
`zone.toml`, `GenerationArea.idx`, `MapData.tcm`, `NPCGener.txt`, import provenance,
`state/` and `logs/`. `Data` and `state` must remain distinct on Windows.

Import from exactly one source directory per zone. Hash all five selected files
before copying and verify the complete source set again afterward. Stage the
folder before publishing it. Never run/copy legacy server executables, DLLs,
accounts or old endpoint files by default. Existing runtime folders are not
silently overwritten. Preserve unknown native INI keys/comments in saved text.
Document every deliberate runtime repair; current Zone08's malformed `2[Item]`
header is corrected only in the owned copy with its original retained alongside.

## Settings, endpoints and scalability

- `zone.toml`: versioned world/zone identity, display name, enabled flag,
  bind/advertised IP, game/admin ports, tick rate and future player limit.
- Native settings: retain each zone's original rates, visibility, PK, level,
  country, timers and rule values. Copying/editing those files is implemented;
  applying all of their gameplay semantics is not.
- Runtime defaults: game 3001–3010 and admin 13001–13010 on `127.0.0.1`.
  Use original LocalIP port where available; otherwise use the declared remake
  formula. Rewrite historical IPs to localhost, never inherit public addresses.
- Shared-service profiles reserve proposed remake endpoints 21001–21005 and
  22001–22005; these are remake ports, not verified legacy ports. DBSRV/SQLDMN
  listeners are implemented; the other three profiles remain reservations.
- Discover profiles from directories and reject duplicate identities and
  overlapping zone endpoints, including wildcard bind conflicts.
- Stop the worker before editing/reloading configuration. Later live reload
  requires explicit supported-key validation and transactional generation changes.
- Adding a zone requires matching map/spawn data and client resource routing.
  Internal manager IDs do not remove native packet field/list limits: reject
  unsupported native IDs at the wire boundary, never truncate or wrap them.
- Future multiple worlds/instances need explicit ownership keys, folder/profile
  namespaces, routing and protocol compatibility. Do not imply that one desktop
  can run unlimited populations merely because discovery is dynamic.
- Profile per-zone tick costs, queue lengths, network loads, persistence latency
  and recovery under load before claiming capacity. No load benchmark exists yet.

## Manager behavior and lifecycle

- [x] Render shared services, world/zone hierarchy, endpoint/settings pages and logs.
- [x] Add a zone from its matching native source folder.
- [x] Supervise only exact processes launched by this manager; retain PID and exit code.
- [x] Show live admin snapshots separately from configured/stopped state.
- [x] Require version/identity/token checks on loopback admin commands.
- [x] Keep file/network work off the GUI thread where substantial; bound snapshots
  and log reads. Opening the manager does not start processes.
- [x] Support independent zone start/stop and orderly shutdown of owned workers.
- [x] Provide top-level Start Server / Stop Server, localhost defaults, live
  readiness checks, per-zone failure reporting and pending-command UI state.
- [x] Add SQLDMN/DBSRV processes to the manager ownership/readiness model.
- [ ] Add the remaining shared-service backends and complete world handoff/readiness.
- [ ] Add dependency-aware start/stop, restart/backoff, degraded-mode reporting,
  backup/restore and authenticated remote administration.
- [ ] Verify every GUI interaction, failure/retry path and process-recovery case.

Readiness must distinguish process startup, validated data, dependency readiness,
listening transport and a simulation actually accepting players. The present
worker reports `game_ready=false`. Its native authentication listener is now
implemented, with owned Mandara FIRST/status, cell movement/reconnect and durable progression. Remaining
world-entry services and actor simulation remain open.
See [ownership and zone authentication](SESSION_OWNERSHIP_AND_ZONE_AUTH.md).

## Persistence and authority boundaries

1. Implement SQLDMN as the sole owner of shared SQLite account/character/cargo
   state. Use prepared statements, transactions, revisions and idempotent request
   IDs. Reject unrelated/future schemas. Back up through the owner service.
2. Implement DBSRV account/roster coordination and session/character ownership.
   Reject simultaneous owners and stale updates. Keep credentials out of logs.
   Schema-4 ownership transactions and a real zone authentication gateway are
   implemented, with bounded Mandara FIRST/status. Full gameplay and live
   cross-zone acceptance remain pending.
3. Define zone-local operational/respawn state separately from common character
   state. Current per-zone SQLite stores only process runs and graceful shutdowns.
4. Port proven C++ offline authority into engine-independent Rust rules with
   source/golden-vector checks. The current stat/effect component reuses selected
   C++ equations through a static ABI; orchestration and SQLite remain Rust.
   Port neither Win32 sockets nor raw SQL strings by
   assumption. Preserve arithmetic/RNG parity before integration.
5. Use explicit, versioned import/export for client offline saves if desired;
   never silently take over `_client/userdata/offline/tantra.sqlite3`.
6. Prove ownership transfer on travel: persist source state, reserve destination,
   authenticate handoff, prevent duplicate entities/rewards, and recover failures.

## Implementation sequence

1. **Management foundation — implemented.** Rust workspace, manager, headless
   zone admin loop, operational SQLite, ten isolated imported profiles, build
   scripts, discovery/configuration, source hashes and owned-process lifecycle.
2. **Shared persistence/session slice.** SQLDMN + DBSRV, migrations and local
   account/roster APIs. Match the native login/server/character/CHAR_INIT sequence.
   Connect one remade client on localhost; do not silently replace native events.
3. **Headless Mandara authority.** Port movement/collision, status/effects,
   inventory/equipment/cargo, existing NPC services and deterministic persistence.
   Reconcile the canonical client's NPC placements with authored/deployed server
   data explicitly; those references are known to differ in the client project.
4. **Messaging services.** Trace and implement MSGSRV/CHATSRV responsibilities,
   party/guild/whisper/channel routing and failure/reconnect semantics.
5. **Item service.** Establish ITMSRV's exact native contract, then implement its
   required operations with durable IDs and duplicate prevention.
6. **Gameplay progression.** Source-parity combat, active skills, monster AI,
   drops/experience, quests, advanced NPC/refinement, death and resurrection.
7. **Cross-zone gameplay.** Zone01–Zone10 map/catalog validation and handoff,
   visibility/interest updates, disconnected players and destination failures.
8. **Production scaling and operations.** Bounded inter-service queues, load
   tests, persistence pressure, monitoring, backups, crash recovery and remote
   deployment. Preserve independent builds of headless services and GUI.

These stages are not completed by merely starting ten processes. Keep every
unfinished native system visible rather than marking a smaller management slice
as a complete Tantra server.

## Validation evidence and references

2026-10-23: manager/worker build and x64 artifact checks, ten imported profile/data
validations, one successful isolated native Zone01 worker lifecycle and rendered
GUI overview capture. No game client was launched; no gameplay capacity/parity
claim is made. The GUI's other pages have not received exhaustive input testing.
See [README](ROOT_README.md), [validation evidence](https://github.com/Tantra-Development/_server/blob/main/legacy/rust/validation.json) and retained
`test-output/` artifacts. Source roots and reference paths are listed in README.
