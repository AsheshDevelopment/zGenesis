# Native NPC detection, routing and standing control

The C++ server now has NPC detection, native terrain routing, segment/standing
control and adapters to the initialized NPC's retained rate decks. Population
initialization binds this control state to each spawned NPC. The subsequent
[peace controller](NATIVE_NPC_PEACE_PHASE.md) and
[flee/roam branches](NATIVE_NPC_FLEE_ROAM.md) now use it in the zone tick.
The complete ProcessMonster controller, other world reactions and combat remain
unfinished; `npc_ai_ready=false` and `game_ready=false` remain.

## Implemented components

`src/zone/npc_spatial.cpp` implements GetEnemyFromView's native search and filters.
It uses the original 26-by-26 hostility table, 21 radius bounds and all 1,681
ordered offsets. Short scans check blocked properties; long scans use the
source rectangle and omit that check. Both preserve target protection, detection
affections, level gaps, clan guards and attacker-count behavior. Zone 16's level
exception remains specific to the short scan. A failed aggression roll continues
the search; invalid clans and excess attacker counts stop the whole search.
StopToAttack is called at its source position before returning no target.

Terrain routing directly compiles the original BASE_GetRoute function against a
checked, per-call map view. It retains ordered directional choices, strict
MH=1000 height comparisons, maximum 23 steps, adjacency early exit, 60000 blocked
height sentinel and unchanged requested target when no step succeeds. The map
view has no process-wide mutable globals. Cell bounds do not allocate strings on
the valid hot path. This is native cell routing, not additional mesh navigation
or missing TBO collision parity.

`src/zone/npc_motion.cpp` implements GetNextPos, SetSegment and StandingByProcessor:
speed scaling, occupied-destination retries, slot-zero empty-grid fallback,
route bytes, waits, direction/progress changes, influence-cell choices, retained
movement rolls and immediate Start callbacks. The native TRUE return is preserved
instead of replacing it with the local accumulated flags. The eight-way schedule
matches handles 1000..4999 and the original tick residue order.

`Npc::enemy` consumes the initialized aggression deck. `Npc::standing` consumes
the initialized movement deck and synchronizes target, mode, wait, progress and
operation RNG back into the owned status session. Generator initialization stores
prepared segments/influence cells and binds native targets to resolved spawn
positions. It retains original template MOB coordinates separately from
presentation/target coordinates. Shared rule tables stay pinned by each NPC.

## Callbacks and remaining runtime work

Detection and movement require real owner callbacks. Missing callbacks fail when
their source path is reached. They do not silently discard AI actions. Callbacks
may change movement state and RNG immediately; subsequent source decisions see
those changes.

Mandara uses AI profiles 1/3/11/12/13/14/15/90. Some have active Start, Move, Rest,
Detect or StopToAttack actions. The world must connect their actual speech,
group/reaction/skill/event behavior before enabling the full periodic controller.
It must also preserve ProcessMonster's activation timing, affection/condition
updates, target/attacker lifecycle, death/phase-out/respawn and combat order.
Existing initial-generation fixture success does not prove that full simulation.

## Bounds and source quirks

The port bounds source edge reads, malformed map storage, invalid radius/handle
fields, segment overflow and nonterminating segment cycles. Reverse rotation's
negative index is rejected. Forward/return phase-out paths return their native
phase-out result before the original out-of-bounds segment read. The supplied
GetCurrentScore body is empty; generation fails if it acquires active behavior.
These guards cover undefined source accesses, not additional gameplay rules.

The fixtures caught a reverse MoveNPhaseOut loop error during implementation.
The corrected code continues the source loop after resetting progress/direction;
it does not stop at segment zero. All recorded defined-domain cases now match.

## Verification

Release component checks cover:

- 2,880 native route cases, six synthetic height/sentinel cases and zone grid hashes.
- 4,573 detection cases, all hostility/offset/radius entries, ordered callbacks and RNG.
- 1,613 movement-control cases, route bytes, callback mutation and sixteen tick orders.
- Real NPC ownership across 160 aggression queries and 128 movement steps, retaining
  decks, RNG and synchronized control state without overwriting template coordinates.
- Initial-generation comparisons after binding motion state: 1,702 spawns for native
  startup and separately propagated influence, with unchanged recorded inspection/RNG.

These CPU checks start no worker, game client or channel. Runtime/graphical
acceptance, camera/collision parity and capacity measurements remain separate.

## Exact references

- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`: GetEnemyFromView,
  GetNextPos, SetSegment, StandingByProcessor and empty GetCurrentScore.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.cpp`: hostility/detection tables
  and BASE_GetRoute.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.h`: constants, affiliations,
  cell flags, standing period and route bounds.
- `C:\_GitHub\TantraSrc\Tantra\zone\GetFunc.cpp`: GetEmptyMobGrid.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: ProcessMonster caller order.
- `C:\_GitHub\TantraSrc\_server\fixtures\native-npc-{navigation,detection,movement-control}.json`:
  copied compiled-source comparisons, recorded in `fixtures/PROVENANCE.json`.
- `C:\_GitHub\TantraSrc\_server\tools\native-codec`: read-only fixture extraction/harness references.
- `E:\Global-server\Zone01`: selected atomic zone dataset, copied with provenance.

`tools/rules/generate-native-npc-spatial.py` extracts immutable tables and the
actual route function with source hashes. Owned control/detection code is compared
against compiled-source fixtures. The status adapter's explicit synchronization
extension has original and adapted hashes in `src/rules/PROVENANCE.json`.

The spatial checkpoint passed all 33 Release CPU checks. Seven focused Debug checks
cover spatial/control, NPC initialization, generation and world ownership.
Logs, source/generated/build hashes and explicit remaining boundaries are in
[native-npc-spatial.json](evidence/native-npc-spatial.json).
The later [attacker-memory checkpoint](NATIVE_NPC_THREAT.md) records the expanded
Release suite and generated NPC threat/group bindings. Full periodic AI remains open.
