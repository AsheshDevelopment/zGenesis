# Paused C++ server goal: progress and continuation

Checkpoint: **2026-10-25. PAUSED by the user. The full goal is unfinished.**

Objective: implement all of [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) and
[IMPLEMENTATION_PROGRESS.md](IMPLEMENTATION_PROGRESS.md), milestones M0-M6,
in `C:\_GitHub\TantraSrc\_server_cpp`. This tracker preserves the full objective.

`[x]` means the specifically described implementation/check is complete.
`[ ]` means missing, partial, unverified or awaiting packaging. Component/CPU
success does not establish online gameplay, complete GUI acceptance or full parity.

## Exact pause state

- [x] Build the latest Windows x64 Release manager, service and zone executables.
- [x] Build the latest Debug targets; the build reached the subsequent CTest stage.
- [x] Pass **69/69 Release CPU checks** for the latest equipment-wear/world-damage changes.
- [x] Complete Debug `player_damage_core`, `player_damage_authority` and
  `player_damage_failure` before the user paused.
- [x] Stop execution at the pause. No test, service, zone or HTLauncher process
  was present in the post-stop process check.
- [ ] Complete Debug `player_damage_wear`, `player_damage_roll` and
  `player_damage_roll_failure`. Wear had started when interrupted; there is
  no completed six-test Debug pass summary.
- [ ] Stage the latest Release zone executable. Packaged manager/service match
  Release; **packaged TantraZone.exe does not match the latest build**.
- [ ] Generate `docs/evidence/native-equipment-durability.json`, which does not
  yet exist, and refresh dependent evidence.
- [ ] Reconcile older PC-durability-pending wording and verifier readiness fields
  with the final verified scope. Written scripts/documents are not completed checks.

The [machine-readable checkpoint](evidence/paused-goal-checkpoint.json)
records source, test, binary and log hashes, package comparisons and completed
Debug cases. Canonical client executable/offline database hashes match their
recorded baseline. The interrupted Debug run is neither a completed gate nor
evidence of a gameplay crash.

Logs under `C:\_GitHub\TantraSrc\_server_cpp\build`:

- `equipment-wear-build.log`: latest Release build.
- `equipment-wear-release-all-cpu.log`: completed 69/69 Release CPU suite.
- `equipment-wear-debug-build.log`: completed Debug build.
- `equipment-wear-debug-cpu.log`: interrupted after three completed cases.
- `equipment-wear-roll-fixture.log`: two focused Release roll/failure checks passed.
- `player-damage-debug-first-attempt.log`: earlier retained CPU timeout before
  the focused generator-one fixture; distinct from this user-requested pause.

## Done: manager and local configuration foundation

- [x] C++20/MSVC/CMake x64 implementation with no Rust runtime dependency.
- [x] Three executables: TantraServerManager, TantraService and TantraZone.
- [x] Centralized Win32 dashboard, profile/settings/log pages, filtering,
  dynamic Add Zone and owned-process controls.
- [x] Separate imported Zone01-Zone10 folders, localhost endpoints, provenance,
  conflict detection and settings/comment preservation.
- [x] Common Controls v6/Per-Monitor V2 layout, saved window/filter/columns,
  bounded background snapshots and a recorded 96-DPI GUI capture.
- [x] Build/launch scripts, copied/embedded server icon and selected isolated
  administration/process-lifecycle checks.

## Done: persistence, authentication and ownership

- [x] Schema-4 server-owned SQLite accounts, three native character slots,
  snapshots/revisions, deletion backups and account cargo.
- [x] Native credential proofs, salted Argon2id and provisioning.
- [x] Session leases, duplicate/stale rejection, zone ownership and durable
  handoff reservation/claim/cancel/recovery components.
- [x] Authoritative SQLDMN with bounded authenticated RPC and an isolated
  persistence/shutdown route.
- [x] Selected DBSRV web/login/roster/create/delete transport with an isolated
  SQLDMN/DBSRV route, fragmentation and reconnect checks.
- [x] Owner-controlled backups, stopped-service restore/integrity/schema guards,
  pre-restore copies and session invalidation.
- [x] Accounts/Database controls, data loading/rendering and CLI checks;
  complete interactive GUI acceptance remains pending.

## Done: Mandara authority and native gameplay components

- [x] Engine-independent C++ status/probability rules, authored tables,
  native arithmetic, IDs and RNG behavior.
- [x] Native TCM/IDX spawn, speed/movement guards, obstruction/correction,
  PC/NPC appearance and grid visibility components.
- [x] Single-owner authentication/selection/CHAR_INIT, calculated status,
  durable spawn/Chakra/movement, reconnect and failed-save fencing.
- [x] Source-backed inventory/equipment moves, packing/splitting, cargo
  item/Rupiah operations, merchant buy/sell, repair and save-point transactions.
- [x] Atomic cargo/service revision and conservation guards with CPU checks.
- [x] Native NPC templates, generators/reservations/placement/routes,
  coalesced initial generation and actor publication.
- [x] Think/Speak, detection/navigation, attacker memory and group response,
  retaining native state/RNG and bounded unsafe-input handling.
- [x] Ordinary periodic peace processing, recovery/effects/conditions,
  acquisition/standing actions, timed flee/roam and return/warp.
- [x] Battle targeting/decisions, pursuit/hit-position and skill-pattern
  components using calculated PC facts and retained native decks.
- [x] Native correction/judge/RvR/armor tables, mitigation/shields, NPC receive
  damage and dice/percentage/armor/actual-loss composition.
- [x] PC receive damage, native effect removal/PvP scaling, compiled
  HP/time/party/dead-state tail and SQLite revision/failure handling.

These bounded components do not complete full timed Battle, casting, death
lifecycle or connected client acceptance. `game_ready` remains false.

## Latest implemented slice: equipment wear and PC DealDamage

- [x] Extract/compile original UpdateEquipDur and get_ArmorType; bind authored
  ArmorType from the actual equipped body item.
- [x] Preserve armor probabilities, hardness, weapon/offhand rules, sentinels,
  strict-negative recomputation and shared RNG order.
- [x] Compile/check the native 36-byte MSG_ITEM layout and owner notification.
- [x] Zero unused packet fields and suppress the source's undefined empty-slot
  notification while preserving its selection draw.
- [x] Reproduce native MSVC short narrowing and guard signed-int overflow.
- [x] Add World::deal_damage, combining PC reception and wear into one SQLite
  revision before publishing ordered events; retain the existing NPC route.
- [x] Release-check all 14 selection boundaries, hardness/sentinels, zero/broken
  gear, actual NPC-to-PC rolls, shared RNG, reopened gear and combined-save failure.
- [ ] Finish remaining Debug checks, package verification and evidence generation.

DealDamage's caster-weapon wear line is commented out in the original source
and remains disabled. Compiled type-1/type-2 wear does not implement remaining
CastSkill callers. HP zero/dead FSM does not implement OnKilled or death/rewards.

Changed paths for continuation:

- `src/zone/world.cpp`, `npc_damage.cpp`, `damage_roll.cpp`.
- `src/rules/compatibility/HtPcStatProjection.h/.cpp`.
- `src/rules/resources/NativeGameplayParameters.cpp`, `src/rules/PROVENANCE.json`.
- `tools/rules/generate-native-equipment-durability.py` and updated native generators.
- `tests/player_damage_tests.cpp`, `cmake/NativeRules.cmake`, `cmake/World.cmake`.
- [Equipment-wear source notes](NATIVE_EQUIPMENT_DURABILITY.md).
- `tools/verify-equipment-durability.py`: written, not yet successfully executed.

## Not done: M0-M3 contracts, GUI and connected-world acceptance

- [ ] Complete exhaustive enabled native branch/packet/service inventory and
  required regression fixtures; resolve source/build variants.
- [ ] Verify full dependency startup, drain, restart and failure recovery.
- [ ] Accept every Win32 action, account/backup/restore workflow, keyboard,
  mixed-monitor DPI and saved-state restoration.
- [ ] Verify the corrected isolated SQLDMN/DBSRV/Zone01 TCP route after approval.
- [ ] Connect OGRE online login -> roster -> selection -> CHAR_INIT -> Mandara.
- [ ] Accept connected appearance/movement/correction/reconnect and NPC
  inventory/merchant/repair/warehouse/save-point transactions with durable results.

The earlier TCP attempt reached CHAR_INIT, then consumed a stale initialization
UI frame in its movement assertion. CPU replay corrected the probe. It does not
prove a native crash or a passing corrected TCP route. Retained output:
`C:\Users\Ashesh\AppData\Local\Temp\tantra-cpp-world-route-d5623bdb0c28`.

## Not done: M4 complete gameplay

- [ ] Full timed Battle, active skill costs/preparation/cooldowns, hit/critical/
  target/range/hostility rules and native cast/hit packets.
- [ ] Recipient-wide periodic combat effects, SpiritLink, real party/duel
  context, summons/special modes and lifetime/failure handling.
- [ ] OnKilled, reward attribution/groups, loot/pickup/decay, XP/leveling,
  native death penalties/UI, resurrection and generator release/respawn.
- [ ] Remaining item/consumable families and source action lifecycles.
- [ ] Quests/history/rewards, advanced NPC/religion/class services and
  refinement/dismantling/combination with exactly-once persistence.
- [ ] Native arithmetic/RNG and connected gameplay acceptance.

## Not done: M5 shared services, multiplayer and travel

- [ ] Source-backed MSGSRV, CHATSRV and ITMSRV contracts/responsibilities.
- [ ] Chat, parties, two-sided trade, guilds and disconnect recovery.
- [ ] Portals/transport/travel, remaining resurrection and cross-zone handoff.
- [ ] Playable data/routing for all ten zones; imported folders are not ten
  complete playable worlds.
- [ ] Enabled PvP/duel/arena/siege/events and multiplayer conservation checks.

## Not done: M6 operations, client acceptance and release

- [ ] Restart/backoff, degraded states, crash/recovery and recovery drills.
- [ ] Measured tick/queue/network/database/memory behavior before capacity claims.
- [ ] Larger catalogs, all GUI workflows and prolonged resource lifetime.
- [ ] Required client INTRO/collision/environment/loading acceptance.
- [ ] Complete x64 distribution, dependencies/licenses and requirement-by-
  requirement full-plan completion audit.

Client-only work is separately tracked in the
[HTLauncher/client plan](../client/planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md).
Existing offline/Rust behavior does not count as C++ dedicated-server completion.

## First steps after the user resumes

1. Read this file and the full plan/progress; compare checkpoint source/test/
   binary hashes and preserve concurrent changes.
2. If unchanged, finish the three outstanding Debug cases:

   ```powershell
   Set-Location C:\_GitHub\TantraSrc\_server_cpp
   ctest --test-dir build -C Debug -R '^player_damage_(wear|roll|roll_failure)$' --output-on-failure
   ```

   Retain a new log. Do not manufacture a complete summary in the interrupted
   log. Adapt evidence validation to accept genuine split results bound to
   unchanged source/binary hashes, or run a justified complete focused gate.
   An unchanged Release-wide rerun is not required just to resume.
3. After checks pass, stage the latest Release executables and verify all three
   `bin` hashes against `build/Release`.
4. Generate equipment-durability evidence and refresh player-damage, damage-roll,
   damage and consolidated world reports. Reconcile stale PC-wear-pending wording
   and verifier fields against actual results.
5. Continue full native casting/timed-combat integration while preserving every
   remaining M0-M6 deliverable.

Runtime restriction: corrected TCP/client attempts still await a go-ahead.
**Do not automatically launch another game/zone attempt after failure.** Use
one isolated process/channel when approved; preserve captures/logs/cells/SQLite
and investigate failures with CPU checks before another launch.

## Git and preservation

- [x] Keep original source/assets, Rust project and canonical client saves separate.
- [x] Record source/build/log/package hashes for later drift detection.
- [ ] Commit/push if requested. `_server_cpp` remains untracked as a directory;
  no commit/push was made for this checkpoint.
- [ ] Preserve unrelated dirty client/Rust/repository files when staging later work.

The goal remains **paused and unfinished**. This file authorizes no new
implementation, build, test, packaging or runtime attempt before resumption.

