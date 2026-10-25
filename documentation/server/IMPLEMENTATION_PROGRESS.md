# Native C++ server implementation progress

Updated: 2026-10-25. **The complete plan is not implemented.**
Rust implementation status does not count as C++ implementation evidence.

**PAUSED by the user on 2026-10-25.** See
[paused progress and exact continuation steps](PAUSED_GOAL_PROGRESS.md).
Latest Release CPU gate: 69/69 passed. Debug was deliberately interrupted after
three completed checks; three remain. Packaged TantraZone.exe is older than the
latest build, and the new equipment-wear evidence has not yet been generated.

## M0 - inventory and contracts

- [x] Create the complete C++/Win32 plan, progress checklist and source-path README.
- [x] Record original/Rust/reference roots and unresolved shared-service boundaries.
- [x] Acquire pinned JSON/TOML/Boost sources and copy only the required SQLite source and icon.
- [ ] Complete the native branch/packet/service contract inventory for the full server.
- [ ] Copy and verify the gameplay regression fixtures against the owned C++ core.

## M1 - centralized Win32 management foundation

- [x] Build all three Windows x64 executables in Debug and Release; core checks pass in both configurations.
- [x] Verify dynamic zone discovery, profile validation and identity/endpoint conflict checks. The CPU suite imports/discovers twelve profiles, rejects duplicates/wildcard conflicts and preserves source hashes.
- [x] Import and structurally validate Zone01-Zone10 with per-zone folders, provenance and localhost endpoints. The dataset-only CLI reports ten zones/five service profiles and game_ready=false; no zone listener started.
- [x] Verify preservation of native settings/comments and recorded owned-copy repairs. CPU checks preserve unknown INI text; Zone08 retains its original WorldSettings beside the recorded leading-character repair.
- [x] Verify bounded authenticated administration, instance ownership and operational SQLite history. One isolated SQLDMN administration process rejects wrong world/token requests and records one clean run.
- [x] Verify exact-process ownership and graceful shutdown for one SQLDMN administration process; reject unowned shutdown requests.
- [ ] Verify complete zone/shared-service dependency startup, restart and failure/drain recovery.
- [x] Implement and render the centralized Win32 dashboard with ten zones/five service rows, command bar, profile/native-settings tabs and log editor. One GUI process opens/closes without starting workers; capture retained.
- [x] Implement dynamic Add Zone, filtering, process actions, stopped-only zone/shared-service profile editing and bounded logs; CPU guards pass. Service edits preserve comments/unknown keys and reject identity changes, live-worker writes and endpoint conflicts.
- [ ] Exercise all GUI actions, failure paths and document editing interactively.
- [x] Implement Common Controls v6/Per-Monitor V2 layout, native fonts, keyboard navigation, saved placement/filter/columns and bounded background snapshots; native GUI capture passes at 96 DPI.
- [ ] Verify mixed-monitor DPI changes, keyboard workflows and saved-state restoration through full GUI acceptance.
- [x] Verify supplied/copied/embedded icon payload and the manager's window icon configuration.
- [x] Build/package Release executables with PowerShell and retain non-interactive BAT flags and GUI launcher. Native headless service lifecycle passes.

## M2 - persistence, authentication and ownership

- [x] Implement the C++ schema-4 persistence library: accounts, three character slots, native snapshots, revisions, deletion backups and atomic cargo/item/money conservation. Six CPU suites pass; worker/RPC integration is tracked separately below.
- [x] Implement native password/web proofs, salted Argon2id and insert-only provisioning APIs. An independent Rust Argon2 fixture and nine native character codec cases pass; no Rust runtime is required.
- [x] Connect and verify the authoritative SQLDMN worker and bounded token-protected TCP RPC, with independent administration capacity. One isolated worker provisions/authenticates, creates a character and preserves it after clean shutdown; game_ready remains false.
- [x] Verify the password-stdin provisioning CLI and activate the packaged SQLDMN storage profile. Isolated CLI checks reject duplicate accounts, preserve comments and start no listeners.
- [x] Implement and verify selected-Philippines web credential/status routes and normalized native login/roster/create/delete in DBSRV. One isolated SQLDMN/DBSRV pair passes fragmentation, name-filter notice, duplicate ownership, reconnect and ordered shutdown. Stock-client wire compatibility remains outside this gate.
- [x] Implement and CPU-check lease expiry, duplicate-owner rejection, stale revisions and zone/character ownership transactions. Native endpoint reconnect acceptance remains open.
- [x] Implement durable handoff reservation, idempotent claim/cancel and reopen/timeout recovery in the persistence library. Cross-zone gameplay acceptance remains open.
- [x] Implement consistent owner-controlled SQLite backups with staged publication and no overwrite; CPU and SQL RPC checks pass.
- [x] Implement bounded account listing and Win32 Accounts/Database pages, native-credential creation dialog and backup action. Data loading and resource checks pass; visual/input acceptance is tracked separately.
- [x] Implement and CPU-check offline restore from this SQLDMN's owned backup folder, with a pre-restore copy, schema/integrity guards, stopped-instance enforcement and invalidation of sessions/zone owners/pending handoffs.
- [x] Exercise the restore CLI in an isolated profile: source backup preserved, pre-restore copy verified and restored sessions invalidated.
- [x] Add the Database restore control, owned-backup picker, explicit confirmation and background stopped-service tool. The helper and Database page rendering pass; interactive picker/confirmation acceptance remains below.
- [x] Verify the live Database page and restore-control rendering with an isolated service pair; no game or zone process started.
- [ ] Complete account-creation dialog, backup button and restore picker/confirmation GUI acceptance.
- [ ] Verify the complete persistence/protocol/ownership route.

## M3 - connected Mandara

- [x] Reuse the engine-independent C++ status/probability core directly, without a Rust ABI. Debug/Release CPU checks match 24 recorded status cases across eight tribes, ordered packet events, Chakra/skill changes and effect expiry; generated native probability comparisons pass (664,211 comparisons). Live zone integration is still pending.
- [x] Implement and Debug-check native IDX/TCM loading, FIRST spawn/recovery and movement guards: 25 recorded spawn cases, 96 speed cases, packed-data failures, blocked cells and actor obstruction.
- [x] Implement and Debug-check PC/NPC appearance and bounded grid delivery against 31 appearance packets and 28 recorded visibility routes, including native border/spiral ordering and slow-peer fencing.
- [x] Implement and Debug-check the single-owner world authority: authentication/selection ownership, CHAR_INIT, calculated status, durable spawn/Chakra/movement, PC visibility, correction, reconnect and failed-save fencing. This CPU route uses isolated SQLite and launches no zone/client process.
- [ ] Verify the bounded native TCP zone worker and SQLDMN/DBSRV dependency lifecycle in one isolated Zone01 route; keep graphical OGRE acceptance separate.
  The first isolated C++ route reached login/CHAR_INIT, then its movement assertion consumed an older initialization UI update. CPU replay reproduces this probe error and verifies the corrected stream handling. The corrected TCP probe is built but has not been relaunched; approval is pending under the no-automatic-retry rule.
- [ ] Connect OGRE online selection -> CHAR_INIT -> Mandara without changing offline saves.
- [ ] Implement PC visibility/appearance, movement, obstruction, correction and reconnect.
- [ ] Implement inventory/equipment, merchants, repair, warehouse and save points.
- [x] Connect source-backed ordinary inventory/equipment moves and native packing/splitting packets to the C++ authority. CPU checks cover occupied-slot rejection, native hand/tribe rules, preserved sitting stance/effects, exact UI flags, status/visual delivery before ACK and failed-save fencing. Connected GUI acceptance remains open.
- [x] Connect account cargo item and Rupiah deposit/withdrawal with native codecs and atomic SQLDMN character/cargo revision/conservation checks. CPU authority checks cover packing, persisted balances, rejected moves and failed cargo commits. Warehouse NPC/UI and fresh TCP acceptance remain open.
- [x] Connect ordinary source-backed merchant buy/sell, repair and save-point packets with one coherent authored NPC/item/portal profile. CPU checks cover native stock/range/serial rules, sale UI-before-credit, repair ACK-before-UI, saved cells surviving refresh, and failed-commit fencing. Cash/limited shops, client dialogue and fresh TCP acceptance remain open.
- [x] Add atomic SQLDMN service commits for one declared sale or durability increase, with both revisions and guards against unrelated item changes, incorrect money deltas and cargo-money changes. CPU authority checks reject five malformed/stale transactions without changing durable state.
- [ ] Verify one isolated connected gameplay/persistence acceptance route.

## M4 - authoritative gameplay

- [x] Add a guarded C++ NPC rule/session component with pinned shared-table lifetime. Release CPU checks match 46 recorded initialization cases, native skills/decks/inspection bytes and RNG; invalid player handles are rejected. It consumes the full 92-column authored Monster export, not the older 48-column gameplay subset. Generation is now connected below; a fresh worker route and full world AI remain open.
- [x] Implement native generator parsing, handle reservations, spatial placement and route preparation. CPU comparisons cover 508 generators, 1,021 route cases and 3,404 pre-Pop cases, retaining native parser quirks, candidate ordering and failed-placement RNG draws.
- [x] Connect initial generation to the zone's coalesced quarter-second timer and shared actor occupancy/visibility. CPU comparisons reproduce 1,702 spawns over 256 callbacks, group links, deck bytes and global RNG for native startup and separately propagated influence; delayed callbacks create no catch-up burst or duplicates.
- [x] Implement native Think/Speak dispatch and verify 18,062 recorded cases, ordered callbacks, text bytes, cast/action locks and RNG. Mandara's empty Pop events are wired before publication. Full world reactions, combat and periodic AI remain pending; unsupported nonempty Pop actions require an actual resolver.
- [x] Implement native NPC detection, direct-source terrain routing and segment/standing control. Release component checks match 4,573 detection, 2,880 route and 1,613 movement-state cases, ordered callbacks and source tables. Undefined edge reads, loops and phase-out accesses are bounded.
- [x] Bind prepared motion state to generated NPCs and connect detection/standing APIs to their retained native aggression/movement decks. CPU ownership checks preserve control, RNG and template coordinates; initial-generation comparisons remain unchanged. Full periodic world AI remains open below.
- [x] Compile native attacker memory, reciprocal combat acquisition and guard/help/link group response with checked handles, arithmetic and callback lifetimes. Five focused CPU scenarios cover source timing, party attribution, immediate AI effects and undefined-input rejection. Generation prepares matching threat identities/group links for all 1,702 NPCs in both comparison modes without changing RNG. Periodic integration remains open below.
- [x] Connect native world speech/group callbacks, retained AI cast/lock/RNG state, live PC mode/FSM ownership and standing-step packet/occupancy publication. CPU checks cover 200 authored speech events, eight moving Mandara NPCs after native waits, a recorded three-member group variant (normal Mandara groups are all zero), preserved PC stance/MOB bytes and required event resolvers. Full periodic ProcessMonster and combat remain open below.
- [x] Connect the ordinary periodic Mandara peace phase after generation: eight-slice timing, native recovery/expiry/status/conditions, strict activation, live detection, ordered Think/reciprocal acquisition and standing actions. CPU checks cover NPC-to-NPC and NPC-to-PC changes, duplicate/delayed ticks, stun and failure fencing. Full battle, special modes and death/respawn remain unfinished; full AI/game readiness stays false.
- [ ] Integrate native generation, detection, movement and ordered AI callbacks.
- [x] Connect ordinary timed flee/roam and native return/warp behavior, source path builders/tables, shared RNG and React 30 to the retained NPC/world owners. CPU checks cover native partial paths, immunity, callbacks, walk/run packets, blockage, stun, idle return timing and destination warp delivery. Combat-driven roam transitions, summon lifecycle and connected acceptance remain open.
- [ ] Implement combat/flee/roam, monster skills, rewards, loot and death/respawn.
- [x] Compile native battle decisions, complete target ranking, pursuit/hit-position functions and skill-pattern selection; bind retained target decks, calculated PC combat state and explicit world pursuit/selection APIs. CPU checks cover target locks/filters, obstruction, native decisions, pending/patterned preparation, deck composition and pursuit delivery. The timed Battle loop, conditions, skill execution, damage/death and connected combat remain unfinished.
- [ ] Implement active skills, costs, preparation/cooldowns and periodic effects.
- [x] Stage native combat correction/judge/RvR/armor inputs and compile original loader/mitigation/shield functions. Bind rolled NPC damage to native Sleep/ManaShield removal, actual-loss credit, HP/time/dead FSM and actor ownership. CPU component/authority checks pass; full casting/PC durability, link/party routing, OnKilled/rewards/respawn and timed combat remain unfinished.
- [ ] Implement XP/leveling, consumables, native death penalties and persistence.
- [x] Compile native DealDamage/PlayDice and connect shared-stream channel rolls, percentage/armor scaling, source gap clamping and actual-loss/durability ordering to NPC damage authority. CPU checks cover exact RNG/channel order, fixed/zero ranges, overkill, retained caster RNG and dead-state delivery. Full casting/hit decisions, PC durability, rewards/respawn and timed Battle remain open.
- [x] Connect native PC receive damage to live actor facts and SQLite character revisions: source Sleep/ManaShield removal, mitigation, PvP two-fifths scaling, zero-loss timestamp semantics and compiled HP/party/dead-FSM tail. CPU checks verify authored NPC-to-PC damage, status refresh, lethal HP persistence, reopened roster data and failed-save fencing. Full casting, PC durability, shared-party/link routing, OnKilled/death penalties and connected acceptance remain open.
- [x] Compile native UpdateEquipDur/get_ArmorType and connect World::deal_damage PC reception/wear through one SQLite character revision before ordered publication. CPU checks cover 14 armor-selection boundaries, hardness/sentinels, strict-negative gear recomputation, native item frames, shared dice/wear RNG, authored NPC-to-PC rolls, reopened gear and failure of the combined commit. Empty-slot undefined notifications are suppressed explicitly. Full casting/hit decisions, shared-party/link services, death/rewards/respawn and connected acceptance remain unfinished.
- [ ] Implement quests, advanced NPC services, religion/class and refinement/combination.
- [ ] Verify native arithmetic/RNG and connected gameplay acceptance.

## M5 - shared services, social systems and travel

- [ ] Implement source-backed MSGSRV, CHATSRV and ITMSRV responsibilities.
- [ ] Implement chat, parties/invitations, trading and guilds with disconnect recovery.
- [ ] Implement transport/portals, remaining resurrection and cross-zone ownership.
- [ ] Validate matching gameplay data/routing for all ten zones.
- [ ] Implement applicable PvP, arena/siege and events.
- [ ] Verify multiplayer ownership and item/money/reward conservation.

## M6 - operational/fidelity/release acceptance

- [ ] Implement restart/backoff, degraded states, crash dumps/recovery and backup recovery.
- [ ] Measure tick/queue/network/database/memory behavior before capacity claims.
- [ ] Verify larger catalogs, all GUI actions, resource lifetime and prolonged operation.
- [ ] Close remaining client INTRO/collision/environment/loading acceptance.
- [ ] Package/verify the complete Release x64 distribution and dependency licenses.
- [ ] Complete the full plan with requirement-by-requirement evidence.

## Current boundary

Management and [SQLDMN persistence](SQLDMN_PERSISTENCE.md) have focused checks.
The C++ store/RPC implements authoritative accounts, native character snapshots,
cargo, leases and ownership transactions. Win32 Accounts/Database load live SQL
data. [DBSRV login and character transport](NATIVE_LOGIN.md) passes an isolated
service route. Connected zone gameplay and other shared roles remain unfinished;
`game_ready=false`. Original source/client/Rust implementations
are unchanged. Opening the manager starts no workers.

[Native world components](NATIVE_WORLD_ENTRY.md) now have Debug/Release CPU
evidence and a packaged TCP worker. One isolated TCP attempt reached CHAR_INIT;
its later stale-UI probe assertion is reproduced and corrected in CPU replay.
The corrected TCP attempt awaits approval, and no worker/client remains running.
The [evidence record](evidence/native-world.json) preserves this boundary.

[Native population and AI components](NATIVE_POPULATION_AI.md) now implement
initial generation in the C++ zone world. The CPU authority route includes NPC
timer publication and shutdown cleanup. This does not complete combat AI,
NPC services, connected client acceptance or the full server plan.

[Native attacker memory and group response](NATIVE_NPC_THREAT.md) now compile
nine original functions and bind generated NPC identities/group links. Source
timing, party credit, immediate AI effects, callback lifetimes and guarded native
undefined cases have CPU checks. [World action/control connections](NATIVE_NPC_WORLD_ACTIONS.md)
now maintain live PC mode/FSM ownership and publish native speech/standing moves.
The [ordinary periodic peace phase](NATIVE_NPC_PEACE_PHASE.md) is now connected
to World::tick. [Flee/roam and return](NATIVE_NPC_FLEE_ROAM.md) now run in the
same noncombat timer loop. Full battle, special-mode/lifecycle services and connected acceptance
remain required before full AI/game readiness can be enabled.

[Battle targeting, pursuit and skill selection](NATIVE_NPC_BATTLE.md) now have
compiled source components and explicit live-world APIs. Player publication binds
calculated combat factors; the timed Battle caller and actual casting/damage/death
services remain unfinished and disabled.

[Native combat tables and NPC damage](NATIVE_DAMAGE.md) now have passing
component/authority checks, with source mitigation, effect removal, actual-loss
credit and HP/dead-state updates. The complete casting, PC durability,
death/reward/respawn and timed combat path remains open.

[Native DealDamage/dice composition](NATIVE_DAMAGE_ROLL.md) now connects
shared rolls, percentage/armor scaling and actual HP-loss reporting to that NPC
receive path. Full casting, PC durability and lifecycle gates
remain required before combat readiness can be enabled.

[Player receive damage and persistence](NATIVE_PLAYER_DAMAGE.md) now bind the
native tail to the live C++ owner and SQLite revisions. Failed saves discard the
tentative session before publication; native zero-loss PvP semantics are retained.
This completes the internal raw-receive/persistence component, while full casting,
PC durability, shared-party/link routing and death/reward/respawn remain unfinished.

[Native equipment wear and world damage composition](NATIVE_EQUIPMENT_DURABILITY.md)
now connect PC reception, original durability rules and one combined HP/equipment
commit. This closes the ordinary receive/wear component; full casting, native hit
packets, shared-party/link services, death/rewards/respawn and timed Battle remain open.
