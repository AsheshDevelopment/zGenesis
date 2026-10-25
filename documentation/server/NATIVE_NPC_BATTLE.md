# Native battle decisions, pursuit and skill selection

The C++ zone now owns source-backed battle components and explicit Population
APIs for battle decisions, pursuit movement and skill selection. Live player
publication supplies calculated combat factors after CHAR_INIT and subsequent
status/movement updates. NPC peers read their retained native status owner.

These components are not yet called by the second ProcessMonster timer loop.
Full timed combat requires damage, casting, conditions, death and reward services;
`npc_ai_ready`, `npc_combat_ready` and `game_ready` remain false.

## Original functions and retained state

`tools/rules/generate-native-npc-battle.py` extracts and compiles nine original
functions, with hashes of CMob.cpp, CMob.h, Basedef.cpp, Basedef.h and GetFunc.cpp:

- BattleProcessor and SelectTargetFromEnemyList retain native decision bits,
  target-lock timing, attacker ranking, party/summon candidate order, protection,
  visibility and terrain filtering, taunt/detaunt/aggression corrections, complex
  target preferences and native distance return values. Source quirks remain,
  including cumulative preference corrections and the no-op summoned-range
  expression; they are not replaced with a new ranking policy.
- GetTargetPos, GetAttackPos and MoveAside retain native attack-cell selection,
  tie RNG, pursuit distance, route fallback and Last/Next/path-index updates.
  Terrain routing uses the already compared BASE_GetRoute implementation.
- BASE_GetHitPosition, BASE_GetDistance and rounded CalDistance retain the
  original height sentinel, height-step threshold, small-distance table,
  integer arithmetic and actor-radius handling.
- SelectSkill retains pending casts, default-only behavior, pattern refresh RNG,
  pattern cursor/clamping, cast counts and synchronous preparation ordering.
  The original 50-by-10 pattern table is extracted, including implicit zeros.

Each generated NPC owns its skill-pattern sequence. Its retained native target
deck now has a checked draw API; it preserves the native cursor, 40/30/20/10
authored composition, exhaustion shuffle and shared world RNG. The existing
native initialization and probability comparisons remain applicable.

Pursuit publication uses the same actor grid/visibility and source GetAction
codec as standing/flee movement, with run effect 3. It updates motion, threat,
AI and native-session coordinates together and sets the caller's one-second
action lock. It does not itself implement trace-count/give-up logic from the
missing timed battle caller.

## Live actors and missing services

World entry/publication/movement now pass each player's calculated output into
Population. Battle reads the live control owner plus actual defense, damage,
aggression, clan and affections. A player without calculated state is rejected
when battle needs it. PC body radius retains the source constructor's zero;
NPC radius comes from its native initialized owner.

Party fields come from the threat owner. The ten-slot summon registry starts
empty, matching initialization. Party/summon ownership services and connected
acceptance remain unfinished; this work does not claim those services exist.

A synchronous skill requires an actual preparation resolver. The callback sees
the selected slot/cast count before execution; the source action-lock assignment
follows it. Missing casting is an error, not a fabricated successful attack.
No damage, healing, resource payment, cooldown, effect, death or reward is implied
by returning an attack bit or selecting a skill.

## Bounds and comparison scope

Registry/grid reads are checked. The old compiler's loop-variable scope is
explicitly hoisted. MoveAside's fixed 100-entry perimeter buffer becomes bounded
storage for the actual perimeter, avoiding the native overflow at longer steps.
Its original midpoint arithmetic is retained; an invalid negative grid read
throws instead of reading unrelated memory. Damage-sum overflow is rejected.

Five CPU scenarios cover party ranking/locks, protection/taunt, attack/trace/end
decisions, phase gating, stun, height obstruction retries, pursuit routing,
pending/default/patterned skills, preparation ordering/action locks, retained
deck composition/shuffling and world pursuit delivery with calculated PC stats.
Component cases use controlled skill rows for branch isolation; the world case
uses the actual staged skills, NPC generation and PC stat core on a controlled
grid. This does not prove authored Mandara collision or connected combat.

Final build/test, source and package hashes are in
[native-npc-battle.json](evidence/native-npc-battle.json). All 56 Release CPU
checks and 13 focused Debug CPU checks pass. The packaged manager/service/zone
match their Release output; reference and canonical client hash checks pass.
No listener, channel or
client is started. The previously corrected TCP retry still awaits approval.

## Exact reference paths

- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`: BattleProcessor,
  SelectTargetFromEnemyList, GetTargetPos, MoveAside, SelectSkill, NPC deck setup.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.h`: native field/array contracts.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.cpp` and `Basedef.h`:
  hit-position/distance functions, skill patterns, target/decision constants.
- `C:\_GitHub\TantraSrc\Tantra\zone\GetFunc.cpp`: GetAttackPos/CalDistance.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: remaining timed Battle caller.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMob2.cpp`: remaining condition,
  skill execution, damage and invalid-combat services.
- Owned code: `_server_cpp\src\zone\npc_battle.cpp`, `npc_battle_world.cpp`,
  `npc_world_actions.cpp`, `world.cpp`, `include\tantra\npc_battle.h`.
- Comparisons: `_server_cpp\tests\npc_battle_tests.cpp`.
- Native adapter provenance: `_server_cpp\src\rules\PROVENANCE.json`.
