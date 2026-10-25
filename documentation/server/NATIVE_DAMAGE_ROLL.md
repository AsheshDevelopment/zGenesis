# Native DealDamage and dice pipeline

The complete original DealDamage and PlayDice functions now compile into the
C++ zone. `Population::deal_damage_npc` connects them to the owned NPC receive
authority and retains the caster's resulting RNG state. This is a damage-pipeline
component; full casting and the timed Battle loop remain unfinished.

## Native sequence

The generator extracts CMob2.cpp's DealDamage and server.cpp's PlayDice, validates
the original constants and NPC durability guard, and records source hashes.

1. Invalid target handles return before any dice or receiver lookup.
2. Roll physical, piercing, fire, cold, lightning and poison, in that order.
   Equal endpoints consume no RNG. Reversed endpoints use the original swap;
   inclusive spans retain the native Windows CRT stream and modulo behavior.
3. Percentages from 0 through 99 scale each rolled channel with native Percent
   rounding. Negative percentages and values at least 100 skip scaling. A zero
   percentage still follows the preceding dice calls.
4. A valid attack/armor pair scales physical damage using the staged native chart.
   Zero/out-of-range types retain the source's chart-skipping behavior.
5. A nonpositive sum returns without receive or durability calls. Positive damage
   carries the source defense-reduction percentage into the receiver.
6. Calculate defender level minus attacker level plus 20. Negative gaps become
   zero; values at least 201 become **40**, as in eCon_LastIndex.
7. Invoke the actual receive authority, calculate before/after HP loss, then invoke
   target equipment durability with that actual loss. Overkill is not reported as
   HP lost. A missing applicable receiver or durability resolver is an error.

The NPC entrypoint uses the source UpdateEquipDur early return for NPCs: its
strongly typed retained owner is checked, and no PC durability mutation is invented.
The generic component accepts real receive/durability callbacks.
[PC receive persistence](NATIVE_PLAYER_DAMAGE.md) now has a separate authority
component. Its complete DealDamage caller still needs the native PC durability
service before that composition can be enabled.

Checked dice-span/sum/percentage operations reject undefined arithmetic without
changing valid native rounding or RNG calls. The damage ranges supplied by the
caller remain unchanged.

## Verification and remaining work

Three CPU scenarios check a fixed six-channel Windows-CRT vector, channel and
callback order, percentage/armor composition, zero/fixed ranges, gap boundaries,
missing services, undefined spans and owned NPC health/death-state/RNG delivery.
The world case uses source-generated NPCs and the actual staged combat profile
on a controlled grid. It does not prove graphical or authored-collision acceptance.

Build/test/source/package evidence is in
[native-damage-roll.json](evidence/native-damage-roll.json). No worker, channel or
client is launched; the corrected TCP retry still awaits approval.
All 63 Release CPU checks and 11 focused Debug CPU checks pass. Packaged manager,
service and zone hashes match the Release output; reference/client preservation
checks pass. The full implementation plan remains unfinished.

Full CastSkill/UseSkill execution, costs/cooldowns, hit/critical decisions and
native cast packets remain unfinished. Full PC DealDamage composition/durability,
OnKilled, rewards/loot, generator release and respawn also remain unfinished.
No attack result enables full AI/combat/game readiness.

## Exact paths

- `C:\_GitHub\TantraSrc\Tantra\zone\CMob2.cpp`: DealDamage and remaining casting.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: PlayDice.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`: UpdateEquipDur NPC guard.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.h`: gap and armor/attack constants.
- `C:\_GitHub\TantraSrc\_server_cpp\src\zone\damage_roll.cpp`, `npc_damage.cpp`:
  compiled functions and authoritative composition.
- `C:\_GitHub\TantraSrc\_server_cpp\tools\rules\generate-native-damage-roll.py`:
  extraction and explicit undefined-arithmetic adaptations.
- `C:\_GitHub\TantraSrc\_server_cpp\tests\damage_roll_tests.cpp`: CPU scenarios.
- `C:\_GitHub\TantraSrc\_server_cpp\data\rules\combat`: staged native charts.
