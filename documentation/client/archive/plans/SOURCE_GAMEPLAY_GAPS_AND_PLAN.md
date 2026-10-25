# Source gameplay gaps and implementation plan

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.
**Historical snapshot:** use the [current source comparison and implementation
plan](CURRENT_SOURCE_GAPS_AND_IMPLEMENTATION_PLAN.md). This older snapshot still
labels progression/quick slots as missing and the server as planning-only;
those classifications are superseded by the current audit.

Implementation follow-up: [current gameplay expansion status](../checkpoints/GAMEPLAY_EXPANSION_STATUS.md).
The tables below preserve the original audit snapshot; use that follow-up for
the newly added Chakra/learning/quick-slot code and its acceptance status.

Reviewed: 2026-10-23. Static comparison of the live original source and the
OGRE/SDL3 remake. No build, test executable or game client was run for this
audit. Existing runtime reports are historical evidence, not new results.

The remake has a playable offline Mandara foundation, but substantial original
gameplay remains unfinished. After closing the current stability/NPC acceptance
gate, the recommended next implementation is **Chakra allocation, skill learning
and quick slots**, followed by authoritative casting.

## Scope and reference paths

| Role | Absolute path |
| --- | --- |
| Original client handlers | `C:\_GitHub\TantraSrc\Tantra\HTlauncher` |
| Original authoritative rules | `C:\_GitHub\TantraSrc\Tantra\zone` |
| Active original UI construction/callbacks | `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTInterface.cpp` |
| Canonical client assets/system files | `C:\_GitHub\TantraSrc\TantraClient\resource`, `C:\_GitHub\TantraSrc\TantraClient\system` |
| Spreadsheet/XML reference root | `B:\__TANTRA\TantraDataScripts` |
| Selected server-zone reference | `E:\Global-server\Zone01` |
| Remake source | `C:\_GitHub\TantraSrc\_remake\src` |
| Generated parameter inputs | `C:\_GitHub\TantraSrc\_remake\derived-assets\gameplay-parameters`, `C:\_GitHub\TantraSrc\_remake\derived-assets\world-gameplay` |
| Final client | `C:\_GitHub\TantraSrc\_client` |
| Future dedicated server/manager | `C:\_GitHub\TantraSrc\_server` |

Original paths in the tables below are relative to `Tantra`; remake paths are
relative to `_remake`. Function names are search anchors. Line numbers describe
this snapshot and can move. External reference-data contents were not re-audited.

`zone/ZONESRV.vcproj` lists `CMob.cpp`, `CMob2.cpp` and `Server.cpp`. Start with
these authority references. Do not combine behavior from `CMob3.cpp`,
`Server111.cpp`, `Server1111.cpp` or `Server2222.cpp` without resolving version
differences, enabled preprocessor branches and the selected authored data.

Two source traps confirmed in this review:

- Much of `HTlauncher/HTQuest.cpp` is empty legacy UI code. Live network wrappers
  delegate to `CHTUIQuestWindow` in `HTInterface.cpp` around lines 7070–7152.
- `HTlauncher/HTRefine.cpp` contains its old implementation inside a block
  comment. Active `CHTUIRefineWindow` code is in `HTInterface.cpp` around
  lines 5713–5900, delegating transactions to `HTNPCControl.cpp`.

This is a subsystem/representative-handler audit, not a census of every native
function. A feature appearing in legacy source does not establish that it is
enabled in the selected game variant. Payment, promotional and optional event
branches need an explicit scope/enablement decision before implementation.

## Foundations already present

These checkboxes indicate bounded implementations, not complete native parity.

- [x] SQLite offline login, roster/create/select/delete and native entry sequence
  through `CHAR_INIT` into Mandara.
- [x] Ground movement, walk/run, path planning, actor obstruction and camera
  orbit/zoom/follow with fallback geometry collision.
- [x] Authored Mandara NPC/monster population and original actor presentation.
- [x] Basic melee, provoked monster pursuit, ordinary death and monster respawn.
- [x] Inventory/equipment transfers, swaps, stacking/splitting, requirements and
  ordinary instant HP/TP consumables.
- [x] Solo Prana/level progression, direct item drops and ground pickup.
- [x] NPC dialogue, buy/sell, repair, account warehouse and save points.
- [x] Ordinary death dialog and same-world save/town resurrection branches.
- [x] Calculated status, skill/passive initialization and stateful entry-effect
  processing; equipment updates retain the live status/effect session.
- [x] MainUI window toggles, dragging, focus, close controls and saved positions.
- [ ] Complete current integrated GUI acceptance for the implemented NPC services.
  Repair and warehouse are not missing implementations merely because their
  latest complete GUI acceptance remains open.

Current implementation references: `src/client/OfflineCharacterChannel.*`,
`OfflineWorldGameplay.*`, `OfflineNpcServices.*`, `OfflineStore.*`,
`NativeSoloProgression.h`, `src/compatibility/HtPcStatProjection.*`,
`src/resources/NativeMainUi.cpp`,
`src/rendering/HtRenderFacade/MainHudPresentation.cpp` and
`src/app/tantra_remake_main.cpp`.

## Missing or partial gameplay

“Missing” means no equivalent end-to-end action was found in the current
authority/input path. Parsed records, rendered windows and mathematical helpers
are useful foundations, but do not establish a functional gameplay service.

| ID | System and current limit | Original source anchors | Required implementation |
| --- | --- | --- | --- |
| G01 | **Chakra spending: missing in-world action.** Creation allocation and status calculation exist. | `zone/server.cpp:4765`, `CSP_REQ_INCREASE_CHAKRA`; `CMob.cpp:4038`, `IncChakra`; `HTlauncher/HTInterface.cpp:4864`. | Validate remaining points/native bounds, update status, persist atomically and wire original status controls. |
| G02 | **Skill learning/upgrading: missing action path.** Skill records, initialization, passive calculations and point readouts exist. | `zone/CMob.cpp:5319`, `LearnSkill`; `server.cpp:3799`; `HTlauncher/HTSkillInventory.cpp:1647,1726`, level/learn requests; `HTSkillSystem.cpp`. | Native prerequisites, point/class/level costs, result notifications, skill book contents and persistence. |
| G03 | **Quick slots: missing functional registration/use.** MainUI window handling does not implement this service. | `HTlauncher/HTQuickSlot.cpp`, `HT_vIconSave/Load`, `HT_vQuickSlot_ReqRegisterQuickSlot`, `HT_vActionItem`, `HT_vActionskill`, `HT_hrSetCoolTime`. | Slot pages, drag/register/remove, original bindings, item identity updates, item/skill/command actions and saved assignments. |
| G04 | **Active skills: missing.** Current combat is the bounded basic-melee loop. | `zone/server.cpp:3814,3858`, unit/area cast requests; `CMob2.cpp:93`, `CastSkill`; `UseSkill`, `StartAction`, `CastInstant1/2/3`, `OnTakeInstant1/2`; `TNCombo.cpp`. | Target/range/cost/cooldown/cast phases, interruption, projectile/area behavior, native motion/effect events and enabled combos. |
| G05 | **Full combat effects: partial foundations.** Status registration/expiry is not complete recipient-wide combat processing. | `zone/CMob.cpp:5745`, `OnTakeDamage`; `CMob2.cpp`, `OnTakeAffections`, `AffectEffect`, `AffectAffection`, shield absorption; `CMob.cpp:9805`, `ProcessContinuousEffect`. | Periodic damage/healing, control restrictions, dispels, shields/links/absorption, death attribution and correct actor/party recipients. |
| G06 | **Monster AI/generators: partial.** Current actors engage, chase directly and respawn at home. Population initially uses the first generator segment and bounded counts. | `zone/CMob.cpp:8392`, `Think`; `SelectTarget`, `SelectTargetFromEnemyList`, `BattleProcessor`; `CMob2.cpp`, `SelectSkill2`; `CNPCGene.cpp`, generator parsing/rebuild. | Aggression, native targets/skills, return/leash/flee/help transitions; frequency/count replenishment, formations and all route segments. |
| G07 | **Loot/rewards: partial.** Eight direct item decks; pickup needs an empty slot; drops remain until teardown. | `zone/server.cpp`, `ProcessDecayItem` at 15991, `SharePrana` at 19061, `CSP_REQ_ITEM_GET/DROP`; monster reward/group table loading. | Remaining group/random drop branches, pickup merging, party/ownership rights, manual drop, decay and enabled reward modifiers. Define restart/zone-teardown policy explicitly. |
| G08 | **General item use: partial.** `OfflineWorldGameplay::useItem` rejects costs and phases beyond ordinary instant HP/TP recovery. | `zone/CMob2.cpp:5760`, `UseItem`; `OnChargInstance`, `CancelToUseItem`; native item phase data. | Charged/continuous items, native costs and resurrection/travel/summoning item dependencies; correct consumption/cancellation/cooldown order. |
| G09 | **Quest/task authority and journal: missing.** Quest bytes in `CHAR_INIT` are not a quest engine. | `zone/Quest.cpp`, `QUEST_OnEvent` at 356, `QUEST_OnDialog` at 6720, `QUEST_OnTask` at 7408, `SendQuestHistory`; `HTlauncher/HTInterface.cpp`, `CHTUIQuestWindow`. | Accept/progress/complete/fail state, native prerequisites and triggers, dialogue decisions, rewards and journal/history persistence. |
| G10 | **Complete NPC conditions/services: partial.** Current `enter()` handles a small condition subset and guards unsupported client events. | `HTlauncher/HTNPCScriptMgr.cpp`, `CHT_ScriptTable::HT_bCheckCondition`; `HTNPCControl.cpp:1368`, `HT_vNPCControl_ClientEvent`; `HTNPCScriptDef.h` event enums. | Tribe/job/religion/quest/request-result conditions; Trimuriti selection/change, class advancement, contributions/rank and other enabled callbacks in native branch order. |
| G11 | **Refinement/dismantling: missing.** Repair is already implemented and is a separate service. | `HTlauncher/HTInterface.cpp`, `CHTUIRefineWindow`; `HTNPCControl.cpp:7350`, refining request; `zone/server.cpp:7536,17915`, request and `RefiningItem`. | Eligibility, materials, money, probability decks, result/destroy branches, slot locks, result presentation and atomic rollback. |
| G12 | **Travel/multi-map lifecycle: missing beyond entry.** Current `CHAR_INIT` rejects nonzero portal/position/target variants. | `zone/server.cpp:4821`, `CSP_REQ_MOVE_PORTAL`; `Teleport` at 19419; move-zone handlers, per-map scripts and zone data. | Portals, NPC transport and supported travel items; handoff/save/unload/load/re-entry order, access checks and failed-handoff recovery. |
| G13 | **Complete death/resurrection: partial.** Ordinary Mandara save/town recovery exists; another saved zone is rejected. | `HTlauncher/HTGameSystem.cpp:638`, death input; `zone/server.cpp:3214`, regen request; `CMob2.cpp:6114`, `Regen`. | Item/healer revival, cross-zone handoff, enabled fortress/special-zone branches, penalties and retained effects. Preserve native death UI. |
| G14 | **Map/commands: partial.** Existing shells and a few shortcuts do not implement all command callbacks. | `HTlauncher/HTMiniMap.cpp`, map control and actor/NPC rendering; `HTCommand.cpp`, sit/pickup/exchange/party; `HTInterfaceCheck.cpp`. | Minimap/large-map controls and markers, sitting/rest/recovery, supported commands, native targeting restrictions and contextual input. Some legacy command bodies are empty; do not invent their behavior. |
| G15 | **Chat/social multiplayer: missing.** There is no multiplayer authority/transport. | `HTlauncher/HTChatting.cpp`, `HTChatNetWorkHandle.cpp`, `TNChatNetworkManager.cpp`; `zone/server.cpp:8053,8077`, chat/whisper. | Native text entry/IME and local/whisper/party/guild routing, recipients and disconnect handling. Local echo is not multiplayer chat. |
| G16 | **Party/player trading: missing.** Solo rewards and personal cargo are separate systems. | `HTlauncher/HTParty.cpp`, create/join/confirm/remove/set-party handlers; `HTExchange.cpp`, trade request; `zone/server.cpp`, `ExchangeTrade`, `SharePrana`. | Membership/leadership, invitations, party rewards/loot; two-sided offer/lock/confirm/cancel with atomic exchange and disconnect rollback. |
| G17 | **Guild/Ashram/rental economy: missing.** Account warehouse is not guild cargo. | `HTlauncher/HTGuild.cpp`, member/emblem/cargo callbacks; `zone/CGuild.cpp`; `HTlauncher/HTRentalStore.cpp`; `zone/RentalStore.cpp`. | Roles, membership, permissions, shared cargo/emblems; enabled rental listing, buying, expiry, stock and proceeds. Requires multiple principals. |
| G18 | **PvP/arena/siege/events: missing.** The PK button currently changes UI state, not full authority rules. | `zone/server.cpp`, `_MSG_TOGGLE_BUTTON`; native target/damage rules; `TNArena.cpp`, `TNSiege.cpp`, `TNStronghold.cpp`, `GameEvent.cpp`. | Hostility/safe zones, karma/death/rewards, event state and scheduling; resolve optional/disabled branches before implementation. |
| G19 | **Owned summons/companions: missing.** Ordinary monster population does not provide ownership. | `zone/CMob2.cpp:7156`, `Summon`; master/distance/command handling in `CMob.cpp` and `CMob2.cpp`. | Owner, lifetime, follow/commands, allegiance, skill interactions, cleanup and native persistence requirements. |

## Other unfinished parts of the full goal

- [ ] Collision/camera acceptance at buildings, narrow paths, roofs and actor
  obstructions. Matching Mandara `.tbo` data remains unavailable; the triangle
  fallback must not be presented as native primitive collision parity.
- [ ] INTRO rejection/retry/disconnect/full-roster/deletion and equipment/tribe
  matrix; preflight every population model/action. Actor 2008 acceptance is bounded.
- [ ] Water/weather/grass, character lighting and exact star/celestial/flare and
  material/LOD parity. Map-CFG sky/cloud/fog/sun/moon implementations already exist.
- [ ] Loading/visibility/performance work in the separate
  [resource optimization plan](../../planning/RESOURCE_LOADING_OPTIMIZATION_PLAN.md).
- [ ] Standalone x64 services, server-owned SQLite, localhost transport, recovery,
  administration and the server-manager GUI. `_server` has planning documents only.

## Ordered implementation phases

### P0 — close the existing playable baseline

- [ ] CPU-preflight referenced Mandara model/action/binding combinations.
- [ ] Extend the acceptance route to cover actual shop, repair, warehouse
  item/currency and save-point controls, plus movement and camera obstruction.
- [ ] Run **once offline on one channel**, `ashesh` / `ashesh`, in an isolated
  profile/database: INTRO → selection → `CHAR_INIT` → Mandara → services → clean exit.
- [ ] Inspect test SQLite afterward and verify normal saves unchanged. If that
  run fails, retain the blocker; fix/build/CPU-check before a later scoped launch.

Gate: accepted existing services and a stable baseline, or a concrete blocker.
Do not restart implemented shops/repair/warehouse work as if it were absent.

### P1 — character progression and usable action controls

Implement **G01 → G02 → G03**.

- [ ] Add authoritative Chakra/learn/upgrade/register-slot commands through
  `OfflineCharacterChannel`, native result codes and ordered notifications.
- [ ] Extend the current status session without discarding live effects.
- [ ] Populate original status/skill/quick-slot controls and original bindings.
- [ ] Version SQLite changes and atomically persist points/skills/assignments.
- [ ] Check native thresholds, rounding, prerequisites, insufficient points,
  stale/duplicate requests and restart persistence.

Gate: spend earned points, learn/upgrade a valid native skill, register it and
retain the result after reload. Skill execution follows in P2.

### P2 — authoritative skill combat, effects and AI

Implement **G04/G05**, then extend **G06/G08/G19** by native feature family.

- [ ] Trace one authored damage skill and one timed buff end to end.
- [ ] Add authority-owned targets, timers, costs, cooldowns, phases and cancellation.
- [ ] Connect native motions/impact TFX/outcomes/icons; presentation cannot decide damage.
- [ ] Route periodic effects into HP/TP, death and the proper recipient set.
- [ ] Add area, control, shield, continuous-item and summon branches after dependencies.
- [ ] Restore generator cadence/routes and AI transitions in the existing controller.
- [ ] Check deterministic native math/timing and rejection/interrupt cases.

Gate: representative skills match source costs, timing, integer results and
effect lifetime, with native presentation following authoritative outcomes.

### P3 — quests and remaining town services

Implement **G09 → G10 → G11**, plus dependent **G07/G08** branches.

- [ ] Add quest/task authority with original IDs, flags and trigger order.
- [ ] Complete an authored Mandara quest: accept, progress, reward and journal.
- [ ] Expand NPC predicates/event dispatch; retain explicit unsupported-event guards.
- [ ] Add religion/job services, then refinement/dismantling with native RNG/results.
- [ ] Complete reward groups, pickup/drop/ownership and decay rules.
- [ ] Check exactly-once rewards, full inventory, expired conversations and rollback.

Gate: quests/services survive reload and rejected operations cannot lose or
duplicate items, points or money.

### P4 — travel, full revival and navigation UI

Implement **G12/G13/G14** when matching destination datasets are available.

- [ ] Keep generation areas, TCM, NPC generators and map assets from the selected
  zone together; never combine unrelated ZoneXX data.
- [ ] Preserve save/transition/cleanup/initialization order and loading-failure recovery.
- [ ] Reuse handoff for portals, transport and cross-zone revival.
- [ ] Add item/healer/special-zone revival from the actual request/effect paths.
- [ ] Complete native map markers, supported commands and contextual targeting.

Gate: travel out/back, destination spawn, save revival and failed handoff work
without silently moving the character to an unrelated Mandara spawn.

### P5 — standalone authority and social game

Follow the existing [server/manager plan](../../../server/archive/rust/ROOT_IMPLEMENTATION_PLAN.md).

- [ ] Extract proven rules/persistence behind a service interface shared by
  embedded offline mode and the standalone x64 server.
- [ ] Add localhost sessions, actor replication, validation, reconnect and cleanup.
- [ ] Implement **G15/G16**, then **G17**, then enabled **G18** systems.
- [ ] Build the Tantra manager GUI using the agreed server-manager reference.
- [ ] Exercise multiple principals with headless fixtures before planning further
  interactive clients/channels; retain offline mode.

Gate: server-owned results and consistent state across concurrency/disconnects,
including character, trade, party, guild and world operations.

### P6 — fidelity, scale and release closure

- [ ] Continue environment/loading work while retaining HIGH defaults, original
  textures/alpha, map CFGs and native coordinate conventions.
- [ ] Complete longer-session stability and supported actor/equipment/action coverage.
- [ ] Stage only used manifest-owned files plus `HTLauncher.exe` into `_client`,
  preserving `resource`/`system` layout and `userdata`.
- [ ] Re-audit enabled native families and document deliberately excluded optional
  historical/payment/event features separately from unfinished required gameplay.

## Rules for each implementation slice

1. Trace original request → condition → authority mutation → ordered result →
   native UI/motion/effect. Record authored table IDs and source provenance.
2. Keep gameplay math independent of OGRE. Use focused parity fixtures for
   nontrivial math, RNG, time and transaction invariants; preserve integer widths
   and rounding rather than replacing rules with plausible formulas.
3. Version and migrate SQLite safely. Use transactions/revisions for value changes
   and keep presentation state separate from authoritative progression.
4. Build/stage when implementation is requested. A helper test or a window opening
   is not end-to-end acceptance. Do not claim new runtime evidence from this audit.
5. Keep one offline process/one channel per requested runtime slice, combine
   related checks, retain diagnostics and protect normal saves.
6. Update [PROGRESS.md](../../PROGRESS.md) with separate implementation and acceptance
   checkboxes; retain every outstanding full-goal deliverable.

**Next recommended slice:** P0 closure, followed by P1 Chakra + learning + quick slots.
