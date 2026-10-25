# Native C++ Tantra server and centralized Win32 manager

Updated: 2026-10-24. This is the complete implementation scope, not a claim that
the management foundation completes the game server. See IMPLEMENTATION_PROGRESS.md.

## Product and project boundaries

- Own the implementation in `C:\_GitHub\TantraSrc\_server_cpp`.
- C++20, MSVC Windows x64, CMake Debug and Release builds; no Rust runtime.
- Use a simple Unicode Win32 manager with Common Controls v6, Per-Monitor V2
  DPI awareness, native fonts, keyboard navigation, resizable panels and system colors.
- Centralize shared services, zone administration, process controls, configuration,
  accounts/database operations and logs in one desktop application.
- Initially import Zone01 through Zone10; discover additional zone folders
  dynamically without recompilation or fixed ten-element storage.
- Default bind and advertised IPs to 127.0.0.1. Reject endpoint/identity conflicts.
- Preserve source sequence, native IDs, arithmetic, integer rounding, RNG draws,
  packet field widths, settings and atomic per-zone datasets.
- Leave the paused Rust project, original sources and client offline database intact.

## Architecture

`TantraServerManager.exe` supervises separate headless processes. One
`TantraService.exe` implements a selected SQLDMN, DBSRV, MSGSRV, CHATSRV or ITMSRV
role. One `TantraZone.exe --zone <folder>` runs each zone. Shared roles run once
per world. A zone failure must not take down unrelated zones or the manager.

The manager uses an asynchronous background controller with bounded commands,
coalesced snapshots and bounded concurrent polling. UI work stays on the Windows
message thread; workers publish results through WM_APP notifications. Lists
use owner-data rendering. The application starts no workers merely by opening.

The main window contains Start Server/Stop Server, selected-process controls,
Add Zone and Refresh; navigation for Overview, Shared Services, Zones, Accounts,
Database, Logs and Settings; a filterable service/zone report; and profile,
native-settings and log details. Persist placement, filters and column settings.
Use the supplied Icon-ZoneServer.ico as executable and window icon.

Supervise exact owned process handles and Windows Job Objects. Start dependencies
before zones, drain zones before persistence, retain dependencies if shutdown
fails and never kill unrelated PIDs to free a port. Configuration edits require
a stopped worker until individual live-reload keys have explicit implementations.
Readiness distinguishes configuration, data, dependencies, listener and gameplay.
An administration-only process always reports game_ready=false.

Headless libraries separate configuration, protocol, persistence and gameplay.
Use explicit fixed-width little-endian codecs rather than serializing C++ structs.
Use one authoritative simulation owner per zone; networking enqueues bounded
commands, persistence replies carry ownership/revision checks, and native timers
are preserved independently of GUI refresh rates. Boost.Asio provides networking;
Boost.Beast provides HTTP when native web login is implemented.

## Runtime folders and defaults

Each role owns `services/<role>/service.toml`, `state/` and `logs/`. Each zone owns
`zones/ZoneNN/zone.toml`, `LocalIP.txt`, `Data/Settings.ini`,
`Data/WorldSettings.ini`, `GenerationArea.idx`, `MapData.tcm`, `NPCGener.txt`,
`provenance.json`, `state/` and `logs/`. `Data` and `state` remain distinct.

Import the complete native five-file set from one selected source directory.
Hash before copying, verify copies and recheck the source set before publishing
the staged directory. Never overwrite existing runtime profiles or copy legacy
executables, accounts or public addresses. Preserve comments/unknown INI keys.
Record owned-copy repairs and retain the original input. Zone08's known stray
leading `2[Item]` correction is an explicit recorded repair.

Defaults: zone game ports 3001-3010, zone admin 13001-13010; DBSRV/MSGSRV/CHATSRV/
ITMSRV/SQLDMN internal ports 21001-21005 and administration 22001-22005. Reserve
native-profile web login 21006 and the existing remake roster route 18400.
Additional zones require valid native IDs and explicit available ports when
default allocation is exhausted. Never wrap IDs/ports. There is no promise of
unlimited hardware capacity; measure simulation and persistence pressure.

SQLDMN exclusively owns shared account/character/cargo/gameplay SQLite writes.
Use transactions, foreign keys, WAL, prepared statements, full commits, revisions,
idempotent requests and owner-controlled backups. Port schema-4 behavior first,
then add explicit migrations. Preserve three slots, 1688-byte mob snapshots,
120-slot cargo, deletion backups and native credential proofs with Argon2id
verifiers. Keep operational process history separate from authoritative saves.
Do not open a live Rust or client database. Any transfer requires an explicit
validated export/import workflow.

## Milestones and exit criteria

### M0 - inventory and contracts

Create the plan/progress/README, inventory entry points, dependencies, native
branches, settings and packet contracts; record unavailable service sources and
undefined behavior. Pin dependencies and record provenance for reused code/data.
Exit: reproducible inputs and explicit component verification boundaries.

### M1 - Win32 management foundation

Build manager/service/zone executables; configuration/discovery/import, ten zone
folders, administration, instance locks, operational history, process ownership,
GUI controls, icon and build/package launch scripts. Implement responsive DPI-aware
layout, filtering, profile/native-settings editing and bounded logs. Verify source
preservation and dynamic discovery beyond ten profiles. Exit: actual usable manager
with truthful administration-only readiness and isolated workers.

### M2 - SQLDMN, DBSRV and ownership

Port account/character/cargo schema, native credential proofs, Argon2id, login,
server selection, roster/create/delete, duplicate-owner rejection, session leases,
expiry/reconnect, revision fencing, transfer reservation/claim/cancel/recovery,
backup/restore and account GUI operations. Match existing versioned requests and
logical packet contracts using C++ types. Exit: persistence/protocol/ownership
regressions and isolated service integration pass.

### M3 - connected Mandara

Reuse and modernize the engine-independent C++ status/probability core directly.
Replace unsupported x86 library dependencies with owned x64 implementations.
Connect selection -> CHAR_INIT -> Mandara, appearances, visibility, movement,
obstruction/corrections/reconnect, equipment/inventory, merchants, repair,
warehouse and save points. Add explicit OGRE online mode while preserving offline.
Exit: one connected route persists progression/items/cargo/money correctly.

### M4 - full authoritative gameplay

Integrate native generation, retained decks, detection, movement, ordered AI
callbacks, combat/flee/roam, active skills, preparation/costs/cooldowns, periodic
effects, rewards, XP/leveling, loot, death/respawn, consumables and native penalties.
Implement quests, advanced NPCs, religion/class, refinement and combinations.
Exit: source-backed connected gameplay scenarios preserve arithmetic/RNG and saves.

### M5 - shared services, social systems and travel

Trace and implement MSGSRV/CHATSRV/ITMSRV from available source and call sites;
deployment folders alone do not establish their protocols. Complete chat scopes,
parties, invitations, trade, guilds, duplicate/disconnect recovery, portals,
transport, remaining resurrection, cross-zone handoff and applicable PvP/arena/
siege/events. Validate all ten zones against matching map/spawn/settings data.
Exit: cross-zone/multiplayer operations preserve ownership, rewards and money/items.

### M6 - operations, fidelity and release

Complete restart/backoff, degraded states, crash recovery/dumps, backups,
interrupted saves, graceful shutdown, database/queue/tick/memory measurements,
large-catalog GUI acceptance, remaining client INTRO/collision/environment/loading
acceptance and clean Release packaging/licenses. Exit: every delivery gate has
direct evidence; no stub or process-start test establishes gameplay readiness.

## Verification rules

Use CTest for native unit/component/integration comparisons. Preserve compiled-source
fixtures for packet bytes, stat/effect arithmetic, retained rates, RNG, TCM startup,
spawn/generation/routing/detection and caller order. Add malformed input, fragmented
TCP, stale session/revision, duplicate rewards, failed handoff, cargo/trade conservation,
slow-peer/queue bounds, conflicting endpoints, backup/crash and interrupted-save tests.

Verify manager DPI/resizing, keyboard navigation, responsiveness, resource lifetime,
icon embedding, control state and readiness separately from headless gameplay.
Use one isolated offline/client route/channel with ashesh/ashesh when runtime
acceptance is authorized; avoid repeating passed creation/transaction matrices.
Retain failure captures, camera/position context and SQLite/source/client hashes.
Do not automatically launch another game/zone attempt after failure. CPU builds
and comparisons may continue without a game process. Initial protocol target is
the remade OGRE client; stock-client crypto/internal-service binary compatibility
requires separate proof.

## Reference paths

- Original C++: `C:\_GitHub\TantraSrc\Tantra` (zone, DBSRV, SQLDAEMON, headers).
- Additional source: `B:\__TANTRA\TantraSrc\Tantra` (no separate MSG/CHAT/ITEM
  source directories identified in the prior audit; keep that boundary visible).
- Atomic zone datasets: `E:\Global-server\Zone01` through `Zone10`.
- Authored tables: `B:\__TANTRA\TantraDataScripts`.
- Rust contracts/fixtures: `C:\_GitHub\TantraSrc\_server`.
- OGRE/offline/native-core reference: `C:\_GitHub\TantraSrc\_remake`.
- Assets/final client: `C:\_GitHub\TantraSrc\TantraClient`, `C:\_GitHub\TantraSrc\_client`.
- GUI workflow: `A:\zEngineK2\tools\zf_ServerManager`.
- Icon: `E:\PC\Pictures\Group\Icon-ZoneServer.ico`.

Reference projects remain unchanged. All adaptations belong in this new project.
