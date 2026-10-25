# Periodic native NPC peace phase

Ordinary Mandara NPC processing now runs from `World::tick`, after generation.
It connects recovery, effects/status/conditions, detection, ordered AI callbacks
and standing movement. Full battle, special modes and death/respawn remain open.
`npc_peace_ready` reports this component; `npc_combat_ready`, `npc_ai_ready` and
`game_ready` remain false.

## Timing and source order

The phase shares generation's coalesced quarter-second counter. It visits
published handles in ascending order where `(handle - 1000) % 8 == tick % 8`.
Duplicate callbacks do nothing. Delayed callbacks advance one slice without
synthesizing a catch-up burst.

The selected ProcessMonster order is preserved:

1. Capture current mode; check empty/dead, lifetime and master paths.
2. Emit the configured Reserved3 status update, then native recovery/broadcast.
3. ForgetAttacker; handle trap/command/combat-only branches.
4. For ordinary peace actors: CheckAffections, InitStatus, InitCondition, then
   summon/master and DontMove checks. DontMove updates attacked time and stops.
5. Clear target-selection time, continue pending skills, then detect only when
   activation is strictly less than CurrentTime. Clear activation after detection.
6. For a detected target, Think(Detect) then OnUnderAttack; skip standing movement.
7. Otherwise perform native standing/segment actions and movement publication.

Mode is captured at each actor's entry. Earlier actors can acquire later NPCs
reciprocally in the same slice. CPU checks cover NPC-to-NPC and NPC-to-PC cases.
The source-order test does not assume that an empty client population makes
every NPC peaceful.

`generate-native-npc-peace.py` checks actual server.cpp order, period and retainer
distance with source hashes. Recovery/Reserved3 blocks and DecHP/InitCondition
compile from the original functions. InitStatus compiles into the threat owner
with an explicit immutable template-lookup adaptation.

## State and failure behavior

Recovery retains native clamps, PreventRegenHP, broadcast order and zero-HP
behavior. Its overflow guard respects IncHP's MAX_INT early return. DecHP clamps
at zero and does not invent FSM/death/reward behavior. Self-owned effect checks
share zone RNG and retain initialized decks; cross-actor damage remains open.

InitStatus resets attack/trace/guard/obstacle state and restores template blocking
plus DontAttackMonster. InitCondition restores authored help/link/flee counts.
Detection reads live HP, clan, effects, level, mode and attacker count from shared
ownership/appearance. Status and target changes reach the existing actor grid.
Pending skills refresh charge/cast/lock state from the retained native owner.

Typed requests for respawn/deletion, expired lifetime, retainer checks, traps
and summons require real services. [Ordinary flee/roam and return](NATIVE_NPC_FLEE_ROAM.md)
now have implemented timer branches. Other nonempty reactions/skills/events and
phase-out likewise retain required resolvers. An unresolved operation fences the
controller after any earlier source-ordered effects; later calls reject work
before consuming more RNG. Clearing cannot invalidate an active AI callback.
A fresh instance is required after failure. Full restart/recovery remains open.

Combat-mode actors receive first-phase recovery/expiry work, but the separate
Battle loop is not implemented. Acquiring combat mode does not establish attacks,
damage, rewards, loot or experience. Never-generated empty slots have no mutable
state here; retained dead/respawn records still require lifecycle services.

## Verification

Five CPU scenarios cover recovery/suppression/expiry, condition counts and strict
activation; source order and reciprocal mode changes; duplicate/delayed ticks;
actual aggressive NPC detection; stun; and fencing after missing death/skill
services. Threat lifecycle checks verify original InitStatus resets/masks.
The SQLite-backed authority check verifies the phase runs from World::tick while
full AI/combat/game readiness remains false.

The consolidated Release suite passes 48 CPU checks; nine focused Debug checks
also pass. Detailed results,
source/build hashes and boundaries are in
[native-npc-peace.json](evidence/native-npc-peace.json). No worker, game or channel
is started. The corrected TCP route still awaits approval.

## Exact references

- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: ProcessMonster order/timing.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`: InitStatus, IncHP/DecHP,
  status broadcasts, detection, under-attack and standing routines.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMob2.cpp`: conditions and effect expiry.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.h`: flags/constants/fields.
- `C:\_GitHub\TantraSrc\_server_cpp\src\zone\npc_tick.cpp`: ordinary phase,
  live detection/publication, required services and failure fence.
- `C:\_GitHub\TantraSrc\_server_cpp\src\rules\PROVENANCE.json`: original and
  adapted status-core hashes and explicit extensions.
- `C:\_GitHub\TantraSrc\_server_cpp\tests\npc_tick_tests.cpp`,
  `tests\npc_threat_tests.cpp`, `tests\world_entry_tests.cpp`: CPU evidence.

Original source, Rust server, OGRE client and normal offline saves remain separate.
