# Current source gameplay gaps and implementation plan

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.

> Historical pre-implementation audit. The subsequent SQLDMN/DBSRV code, build
> and TCP/persistence verification are tracked in the [current checklist](../../../server/archive/rust/ROOT_IMPLEMENTATION_PROGRESS.md).
> Service findings below describe the audit snapshot, not the new worktree.

Reviewed: 2026-10-23. **Static audit of the live worktree.** No build, test,
server process or game client was launched for this review. Existing validation
records are cited as historical evidence; their acceptance scope is preserved.
This supersedes the recommendations in the [earlier snapshot](SOURCE_GAMEPLAY_GAPS_AND_PLAN.md).

The client has a bounded offline game implementation. The Rust server has a
working management/process foundation, but no game transport or gameplay
simulation. The next server implementation should be **SQLDMN + DBSRV/session
ownership, followed by one real localhost character-to-Mandara path**. For new
gameplay, active skill casting and complete combat effects are the next major gap.

## Scope and source selection

| Alias | Absolute reference root |
| --- | --- |
| N | `C:\_GitHub\TantraSrc\Tantra` — original client/server code |
| C | `C:\_GitHub\TantraSrc\_remake\src` — current C++ offline authority and OGRE/SDL3 client |
| R | `C:\_GitHub\TantraSrc\_server` — Rust manager/worker/services workspace |
| Assets | `C:\_GitHub\TantraSrc\TantraClient\resource` and `system` |
| Authored tables | `B:\__TANTRA\TantraDataScripts\Global` |
| Deployed zone data | `E:\Global-server\Zone01` through `Zone10` — one atomic dataset per zone |
| Manager reference | `A:\zEngineK2\server`, `A:\zEngineK2\tools\zf_ServerManager` |

Paths prefixed N/C/R below use these aliases. Function names are search anchors;
line numbers are from this snapshot. `N/zone/ZONESRV.vcproj` includes `CMob.cpp`,
`CMob2.cpp`, `Server.cpp`, `CNPCGene.cpp`, `Quest.cpp`, `CGuild.cpp`,
`RentalStore.cpp`, `TNArena.cpp`, `TNSiege.cpp` and `GameEvent.cpp`. Do not mix in
alternate `CMob3.cpp`/`Server111*.cpp` variants without resolving their enablement.
Quest/refine UI work should start from the active `CHTUIQuestWindow` and
`CHTUIRefineWindow` classes in `N/HTlauncher/HTInterface.cpp`.

This is a subsystem/representative-handler review, not an exhaustive census of
every native function. **Missing** means no corresponding end-to-end action was
found in the reviewed current paths. **Partial** means a bounded action exists
but native branches/lifecycle remain. **Acceptance open** means code exists but
its requested integrated verification is unfinished. None implies full native
parity merely because a window, parameter table or function name exists.

## What already exists — do not restart this work as missing

- [x] Offline SQLite login, fixed-slot character creation/selection/deletion and
  the native INTRO/CHAR_INIT/Mandara entry sequence.
- [x] Movement, walk/run, routing, actor obstruction, camera controls and fallback
  geometry collision; complete authored collision parity is still open.
- [x] Basic melee, provoked pursuit, monster death/respawn, solo Prana/leveling,
  ordinary drops/pickup and parts of native death penalties/resurrection.
- [x] Inventory/equipment transfers, swaps, stacking/splitting and ordinary
  instant HP/TP consumables.
- [x] Dialogue, merchant transactions, repair, personal warehouse and save-point
  authority. Warehouse/save-point integrated UI acceptance remains open.
- [x] G01: in-world Chakra spending through `OfflineCharacterChannel::spendChakra`
  and the source-extracted `CMob::IncChakra` rules (`N/zone/CMob.cpp:4038`).
- [x] G02: skill learning/progression commands through `learnSkill` and native
  `CMob::LearnSkill` (`CMob.cpp:5319`). Historical evidence includes learning
  Asura skill 3105; it does not prove every skill/upgrade/class combination.
- [x] G03 foundation: five-page native quick-slot storage, item registration/use,
  original key modes, orientation and saved assignments. Casting/commands and
  complete cooldown/tooltip/tree presentation remain partial.
- [x] MainUI dialog toggles, dragging, focus, close controls and saved positions.
- [x] Source-backed calculated status, passive/entry effects and stateful status
  ticking. This does not include complete recipient-wide skill combat effects.
- [x] Rust x64 manager and zone administration workers, imported Zone01–Zone10
  settings/data, localhost profiles, owned-process controls and Start/Stop Server.
  Per-zone SQLite stores operational runs, not account/character gameplay state.

Relevant current code: `C/client/OfflineCharacterChannel.*`,
`OfflineWorldGameplay.*`, `OfflineWorldStatus.*`, `OfflineNpcServices.*`,
`OfflineStore.*`, `NativeQuickSlots.h`, `C/compatibility/HtPcStatProjection.*`,
`C/rendering/HtRenderFacade/MainHudPresentation.cpp`; `R/crates/server-core`,
`R/crates/zone`, `R/crates/manager`.

## Gameplay gaps

The following describes the **C++ offline client**. These gameplay systems have
not been ported into the Rust zone worker, including the bounded features above.
The stable G identifiers retain their relationship to the earlier audit.

| ID / state | Native source/functions | Current limit and required implementation |
| --- | --- | --- |
| G03 — Partial | `N/HTlauncher/HTQuickSlot.cpp`: `HT_vIconSave/Load`, `HT_vActionskill`, cooldown/actions; `HTSkillInventory.cpp` | Bindings and item actions exist. Add skill/command dispatch, native cooldowns, tooltips, tree prerequisites/arrows and rejection feedback. Preserve the 400-byte file and native IDs. |
| G04 — Missing: active skills | `N/zone/server.cpp:3814,3858`: `CSP_CAST_UNIT_SKILL`, `CSP_CAST_AREA_SKILL`; `CMob2.cpp:93`: `CastSkill`; `UseSkill`, `CastInstant1/2/3` | Implement target/range/LOS, costs, cast/ready/apply phases, cooldowns, interrupts and area/projectile outcomes. Connect native motions/TFX to authoritative results. Current `C/app/tantra_remake_main.cpp:999` explicitly rejects skill bindings. |
| G05 — Partial: full combat effects | `N/zone/CMob.cpp:5745,9805`: `OnTakeDamage`, `ProcessContinuousEffect`; `CMob2.cpp:3534`: `OnTakeAffections`, plus instant/affection handlers | Existing status/effect context is not full combat integration. Add periodic damage/heal recipients, attacker/death attribution, controls, immunity, dispels, shields/links/absorption. `C/compatibility/HtPcStatProjection.cpp:182` rejects periodic damage without combat/attacker context. |
| G06 — Partial: AI and generators | `N/zone/CMob.cpp`: `BattleProcessor` (1092), target selection (1300/2335), `Think` (8392); `CMob2.cpp`; `CNPCGene.cpp` | Current population uses bounded initial counts and generator segment 0. Combat uses a basic provoked chase/attack and the first authored monster skill's damage template. Restore aggression/target/skill selection, leash/return/help/flee states, cadence/replenishment, routes and formations. |
| G07 — Partial: rewards and ground items | `N/zone/server.cpp`: item get/drop (6334/6629), `ProcessDecayItem` (15991), `SharePrana` (19061) | Solo progression, ordinary money bags and eight direct drop decks exist. Complete reward groups/modifiers, pickup stack merging, ownership/party rights, manual drop and decay. Current `defeated()` sets lifetime zero and retains drops until pickup/teardown. |
| G08 — Partial: general item use | `N/zone/CMob2.cpp:5760`: `UseItem`, charge/cancel handlers | Current `C/client/OfflineWorldGameplay.cpp::useItem` supports ordinary instant HP/TP recovery and rejects other costs/phases/effects. Add charged/timed/continuous items and supported travel/revival/summoning items in native consumption/cancellation order. |
| G09 — Missing: quests/tasks/journal | `N/zone/Quest.cpp`: `QUEST_OnEvent` (356), `QUEST_OnDialog` (6720), `QUEST_OnTask` (7408), `SendQuestHistory` (7667); `HTInterface.cpp::CHTUIQuestWindow` | Add prerequisites, acceptance/progress/failure/completion, triggers, choices, exactly-once rewards and persistent history/journal. Quest bytes in CHAR_INIT do not implement this. |
| G10 — Partial: advanced NPC services | `N/HTlauncher/HTNPCScriptMgr.cpp:2196`: `HT_bCheckCondition`; `HTNPCControl.cpp`: client-event dispatch; native server callbacks | `OfflineNpcServices::enter` only handles a small condition subset, limited quest markers and basic supported events. Implement enabled tribe/job/Trimuriti/quest/request-result conditions, religion/class advancement, contributions/ranks and other source-backed callbacks. |
| G11 — Missing: refinement/dismantling | `N/HTlauncher/HTInterface.cpp:5713`: `CHTUIRefineWindow`; `HTNPCControl.cpp`; `N/zone/server.cpp:17915`: `RefiningItem` | Add native eligibility, materials/currency, slot locks, probability/RNG decks, success/failure/destruction, rollback and original result UI. Existing repair is a different, already implemented service. |
| G12 — Missing: travel/handoff | `N/zone/server.cpp:4821`: portal request, teleport/move-zone handlers; client world transition handlers | Entry is not travel. Current `OfflineCharacterChannel.cpp:85` rejects nonzero position/portal/target variants. Implement portals, NPC transport and supported items, ownership transfer, save/unload/load/re-entry sequence and failed destination recovery. |
| G13 — Partial: complete death/revival | `N/zone/server.cpp:3214`: regen request; `CMob2.cpp:6114`: `Regen`; `HTGameSystem.cpp` death handling | Same-zone save/town recovery, original death UI and bounded Prana loss exist. Complete revival items/healers, another saved zone, supported fortress/special-zone branches and full penalty/effect rules. Current `revive()` rejects handoff to another non-alias zone. |
| G14 — Partial: maps and commands | `N/HTlauncher/HTMiniMap.cpp`, `HTCommand.cpp`, `HTInterfaceCheck.cpp` | Complete minimap/large-map markers and controls, supported sitting/rest/recovery, contextual commands/target restrictions and command quick slots. Some original command bodies are empty; trace active behavior before implementing. |
| G15 — Missing: multiplayer chat | `N/HTlauncher/HTChatting.cpp`, `HTChatNetWorkHandle.cpp`, `TNChatNetworkManager.cpp`; `N/zone/server.cpp:8053,8077` | Add text/IME input, recipient/range/channel rules, local/whisper/party/guild routing and reconnect handling. A chat panel or local echo is not a multiplayer chat service. |
| G16 — Missing: party and player trade | `N/HTlauncher/HTParty.cpp`, `HTExchange.cpp`; `N/zone/server.cpp::ExchangeTrade` (18204), `SharePrana` | Add invitations/membership/leadership/reward rights and two-sided offer/lock/confirm/cancel. Require transactional transfer and rollback on stale sessions, disconnects and repeated messages. |
| G17 — Missing: guild/Ashram and rental economy | `N/zone/CGuild.cpp`, `RentalStore.cpp`; `N/HTlauncher/HTGuild.cpp`, `HTRentalStore.cpp` | Add roles, membership, permissions, emblems/shared cargo and enabled listings/purchases/expiry/proceeds. Personal cargo is not guild cargo. These systems need multiple principals and durable ownership. |
| G18 — Missing: PvP/arena/siege/events | `N/zone/TNArena.cpp`, `TNSiege.cpp`, `GameEvent.cpp`, server hostility/PK rules | Implement enabled hostility/safe-zone, karma, death/reward and scheduled event state. The PK UI toggle alone does not implement authority. Resolve country/configuration/disabled-event branches before porting. |
| G19 — Missing: summons/companions | `N/zone/CMob2.cpp:7156`: `Summon`, related owner/distance/command handling | Add ownership, lifetime, allegiance, follow/control, skill interactions and cleanup/persistence. Ordinary spawned monsters do not provide owned summons. |

## Dedicated Rust service gaps

| ID / component | Current evidence | Required implementation |
| --- | --- | --- |
| S01 — Client game protocol/session transport | `C/client/OfflineCharacterChannel.h` explicitly describes in-process authority with no TCP compatibility implied. `R/crates/zone/src/main.rs` handles only admin status/shutdown and reports `game_ready=false`, `game_listener_bound=false`. | Native framing/version/handshake/result sequencing, login/roster/CHAR_INIT and authenticated world actions/replication over localhost; disconnect/reconnect and unknown-message rejection. Existing admin JSON is a separate protocol. |
| S02 — SQLDMN | `R/services/SQLDMN/service.toml` is planned; only operational per-zone SQLite exists. Native reference: `N/SQLDAEMON/Server.cpp` account save jobs/SQL operations. | Sole shared SQLite writer, versioned schemas/migrations, atomic character/inventory/cargo transactions, revisions/idempotency and backup/recovery. Do not use the client's live offline DB as the server database. |
| S03 — DBSRV | Planned profile, no Rust account/character service. Native reference: `N/DBSRV/Server.cpp`. | Account/roster/session coordination, character ownership/leases, create/select/delete and persistence requests; compatibility with the selected native login sequence. |
| S04 — MSGSRV | Planned GUI/profile; deployment reference `E:\Global-server\MSGSRV`. | Trace the actual native routing contract, then implement cross-zone/social messages with recipients, ordering, backpressure and disconnect cleanup. |
| S05 — CHATSRV | Planned GUI/profile; deployment reference `E:\Global-server\CHATSRV`. | Establish its exact split from MSGSRV, then implement supported chat delivery/filtering and lifecycle. Folder presence does not prove complete source availability. |
| S06 — ITMSRV | Planned GUI/profile; deployment reference `E:\Global-server\ITMSRV`. | Establish its exact native operations before assigning responsibilities; implement required item identity/transaction/delivery behavior with durable duplicate prevention. Do not assume every inventory operation belongs here. |
| S07 — Game ZONESRV | Rust worker owns an admin listener, heartbeat and process-run history, not a world simulation. | Port authoritative map/entity/status/movement/combat/NPC systems and their client-facing event flow. Ten valid imported folders are not ten playable Rust zones. |
| S08 — Complete operations/scaling | Zone Start/Stop Server, process ownership, local status, import and settings controls exist. Shared Start buttons are intentionally disabled. | Add real shared backends to dependency-aware startup/stop, readiness, restart/backoff, accounts/database management, backups, recovery and measured capacity. Remote administration/clustering is not implemented. |

The selected `Tantra` tree contains DBSRV/SQLDAEMON/zone sources. A filename scan
found no MSGSRV/CHATSRV/ITMSRV source paths there. Their deployment directories
must not be treated as a complete verified source/contract. Proposed GUI roles
and localhost service ports remain design choices until traced and implemented.

Payment/cash-shop, promotional, country-specific and optional event branches
need a separate enabled-feature decision and handler trace. They are not marked
complete or silently included in the supported scope by this representative audit.

## Unfinished acceptance, data and presentation work

- [ ] Close the existing Mandara UI gate using the prepared saved roster. The
  previous scoped run stopped at warehouse NPC visibility; it did not prove a
  native crash. CPU investigation corrected raw `.tga` camera blockers and a
  Global/client NPC placement mismatch. The current client artifact is not
  runtime-verified after those corrections. Preserve the pending authorization
  constraint: **do not automatically launch another game client**.
- [ ] Verify warehouse item/Rupiah deposit/withdrawal, save confirmation, useful
  camera framing and movement/obstruction, clean exit and post-exit SQLite;
  compare normal-profile hashes. Do not repeat full creation/deletion or passed
  transactions unless a changed dependency requires it.
- [ ] Keep native references consistent. The client uses its binary parameter
  NPC enumeration/placements while stock/items still use authored Global data;
  that is not proof of deployed-server table equivalence. Match world/zone IDs,
  variants, parameters and resource catalogs before Rust live gameplay.
- [ ] Complete authored collision fidelity. Supplied Mandara `.tbo` data is
  absent in the recorded inputs; geometry fallback and CPU visibility do not
  establish exact native collision/camera behavior.
- [ ] Resolve production ore monster 2718 and recorded missing skill icons.
  This audit reconfirmed missing `W_Monster1.tmb` and `W_Monster1.dds` in the
  canonical loose paths. Prior evidence records 16 missing skill images; their
  full archive/catalog search was not repeated. Global-only NPC 1457's model is
  also absent, but it is not enumerated by the current canonical Mandara profile.
- [ ] Finish INTRO error/retry/disconnect/full-roster/equipment/action coverage
  with targeted checks, preserving native creation/selection/deletion order.
- [ ] Finish water/weather, lighting/material/grass/LOD fidelity and exact
  star/celestial/flare behavior. Map-CFG sky/cloud/fog/sun/moon and terrain
  detail/alpha handling already have implementations; do not restart them as absent.
- [ ] Complete measured loading/cache/visibility/skinning work in the
  [resource optimization plan](../../planning/RESOURCE_LOADING_OPTIMIZATION_PLAN.md). No fresh
  performance measurements or instantaneous-loading guarantee is made here.

## Implementation sequence and completion gates

### P0 — freeze contracts and retain the current playable baseline

- [ ] Record the chosen source build, enabled branches, parameter/catalog hashes,
  zone datasets and native/client ID conversions. Keep asset/version gaps explicit.
- [ ] Close the saved-roster Mandara acceptance route when a new client attempt is
  explicitly authorized: one offline process/channel, `ashesh / ashesh`, private
  profile, retained captures/position context and post-exit SQLite/hash checks.

**Gate:** verified baseline or a precisely retained blocker. The pending client
run does not prevent independent Rust headless/service work. Do not call existing
repair/warehouse/progression code missing because acceptance remains open.

### P1 — implement SQLDMN and DBSRV, then native session/roster transport

- [ ] Trace selected native login/server/roster/CHAR_INIT schemas against current
  `NativeWebLogin`, `NativeCharacterRecords` and offline-store behavior.
- [ ] Implement Rust service contracts and separate server-owned SQLite through
  SQLDMN, with transactions/revisions, migrations and stale/duplicate rejection.
- [ ] Add DBSRV ownership/session/roster APIs. Preserve three native roster slots,
  create/delete results and authentication/disconnect sequencing.
- [ ] Add manager supervision and genuine readiness for these shared services.

**Gate:** headless fixtures provision/authenticate a local account, create/load
and select a character, survive restart and reject stale ownership without
changing normal client saves. A service profile or socket alone is insufficient.

### P2 — port the bounded Mandara authority into engine-independent Rust rules

- [ ] Port calculated status/Chakra/learning, movement/collision, inventory/cargo,
  existing NPC services and persistence contracts from proven offline behavior.
- [ ] Preserve native IDs, widths, little-endian encodings, integer rounding,
  RNG draw order and elapsed-time units using source-derived golden vectors.
- [ ] Keep simulation independent of OGRE, SDL3, GUI, sockets and storage.
  Plan a narrow C ABI/contract if the embedded offline client will reuse the
  same Rust core; retain the C++ authority as a parity reference until migration.
- [ ] Apply original per-zone settings and data to world behavior, rather than
  merely copying them. Validate all referenced native fields and unsupported modes.

**Gate:** deterministic native/C++/Rust fixtures agree on state/results and
failed operations cannot lose/duplicate money/items. Operational run-history
SQLite is not this authority implementation.

### P3 — connect one real localhost gameplay path

- [ ] Connect the OGRE client to Rust on `127.0.0.1`, preserving native state gates:
  login → server/character selection → CHAR_INIT → Mandara → updates → save/exit.
- [ ] Add actor creation/visibility/state replication, authenticated actions,
  disconnect cleanup and reconnect restoration. The server owns outcomes.
- [ ] Match the original NPC placements, collision/spawn data and service range
  checks; verify warehouse/save-point results with isolated persisted state.

**Gate:** one authorized client session enters and plays against Rust authority,
then reloads committed state. Keep admin readiness distinct from game readiness.

### P4 — active skills, combat effects, AI and action controls

- [ ] Implement one authored direct-damage skill and one timed buff end to end
  (G04/G05), then quick-slot execution/cooldowns and native result feedback (G03).
- [ ] Integrate periodic effects with attacker/death context; replace the explicit
  rejection only when the authoritative recipient/damage lifecycle exists.
- [ ] Extend target/skill selection, generator cadence/routes and AI states (G06).
- [ ] Add dependent continuous/charged items and summons in supported families
  (G08/G19), then full reward/pickup/ownership/decay branches (G07).

**Gate:** native costs, timing, rounded results, interruption/expiry/death and
presentation agree; rejection cannot consume resources or fabricate success.

### P5 — quests, advanced town services and refinement

- [ ] Complete one authored Mandara quest from prerequisites through reward and
  persisted journal/history (G09), then expand native conditions/callbacks (G10).
- [ ] Implement religion/job and other enabled services, then refinement/
  dismantling with native RNG/material/price/result branches (G11).
- [ ] Check repeated rewards, full inventory, expired conversations and rollback.

**Gate:** complete quest/service workflows survive reload and cannot duplicate
or lose rewards/items/currency. A rendered dialog is insufficient.

### P6 — shared messaging/item contracts and multiple-principal gameplay

- [ ] Resolve the actual MSGSRV/CHATSRV/ITMSRV contracts before porting those
  services; implement their required operations and manager readiness.
- [ ] Add chat, party/reward rights and atomic two-sided trading (G15/G16), then
  guild/shared cargo/rental and enabled PvP/event systems (G17/G18).
- [ ] Verify concurrency, disconnect/retry, ownership and transaction isolation
  with headless multiple-principal fixtures before GUI multiplayer acceptance.

**Gate:** real recipients receive source-correct results across services, with
no duplicate authority or transfers. Local echo/single-user substitutes do not pass.

### P7 — travel, remaining revival and Zone01–Zone10 gameplay

- [ ] Map each zone to matching client assets/catalogs, parameters and data.
- [ ] Implement portal/NPC/item travel and cross-zone revival (G12/G13), ownership
  transfer and failed-handoff recovery. Finish native maps/commands (G14).
- [ ] Extend supported-zone coverage deliberately; keep all original resources
  and native packet limits explicit when adding zones beyond the initial ten.

**Gate:** source/destination transitions, saves, effects, revival and reconnect
work without duplicated/lost characters. Importing ten folders does not pass it.

### P8 — full fidelity, operations and release acceptance

- [ ] Close targeted INTRO/asset/material/environment/collision acceptance gaps.
- [ ] Implement measured resource and simulation/network/persistence optimizations.
- [ ] Complete dependency-aware startup, recovery/backups, GUI workflows and
  sustained load/stability tests before capacity or production-readiness claims.

**Gate:** documented functional, visual, persistence, concurrency, performance
and package evidence for the declared scope. No project-wide percentage is
assigned without a complete supported-feature denominator.

## Evidence and verification boundaries

- [Current client implementation](../checkpoints/GAMEPLAY_EXPANSION_STATUS.md),
  [failed acceptance](../../planning/MANDARA_GOAL1_ACCEPTANCE.md),
  [native NPC correction](../../guides/MANDARA_NPC_PLACEMENT_FIX.md).
- [Rust server status](../../../server/archive/rust/ROOT_README.md),
  [server implementation plan](../../../server/archive/rust/ROOT_IMPLEMENTATION_PLAN.md),
  [recorded server validation](https://github.com/Tantra-Development/_server/blob/main/legacy/rust/validation.json).
- [This audit's file hashes and classification ledger](../../evidence/current-source-gap-audit.json).

The inspected client artifact remains SHA256
`43B4A011D0930DC98497375CAEB22684839F7310A642A6F6C28DC1B194720827`.
Its last native-placement checkpoint records that it has not been runtime-launched.
Rust validation records cover management startup/stop and a bounded zone-worker
lifecycle; they do not verify accounts, native game packets or gameplay.
