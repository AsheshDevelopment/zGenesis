# Native combat tables and NPC damage authority

The C++ server now loads the authored combat corrections and runs the original
OnTakeDamage mitigation phase. An explicit Population API applies already rolled
damage to an owned NPC, with native effect removal, attacker credit, HP and dead
FSM updates. These APIs are not yet connected to a complete skill/cast timer.
Full AI/combat/game readiness remains false.

## Authored combat inputs

`tools/stage-combat.py` stages numeric cells from the same authored Global
HTSSetting XML profile already used for AI. Physical DOM cell order, native atoi
prefix conversion, sorted IDs and owned hashes are explicit. Original files are
read-only. The resulting `data/rules/combat` contains:

- 201 Consider rows, covering PC/NPC defense, resistance and dodge corrections.
- 10 JudgeCombat rows with all four actor-pair probability groups.
- 18 RvRPKConsider rows and reward coefficients.
- 14 AttackTypeVSArmorType rows, plus native armor-row-zero defaults at load time.

`generate-native-combat-tables.py` compiles the original LoadSetting.cpp blocks.
It preserves post-load PC-versus-PC formula overrides and the source's duplicated
RvR caste-14 getter, followed by shifted caste-15/16 reads. JudgeCombat uses its
actual indexed rows. No undocumented correction is substituted for native data.
These are authored inputs; equality with deployed/encrypted client tables remains
unverified.

## Damage calculation and state

`generate-native-damage.py` extracts the complete mitigation span of OnTakeDamage
and both magic-shield functions. It retains actor-pair/level corrections, PvP
restriction/challenger checks, defense reduction, immunities, piercing, elemental
resistance, absorption and shared shield pools. Native Percent rounding and
integer truncation remain. Checked intermediates reject undefined overflow and
division by zero; negative physical/piercing channels still follow native clamps.

The exact-depletion shield boundary remains strict-less: exhausting a shield
exactly can leave its flag set with zero capacity, as in the source. Enhanced
shield physical and elemental absorption consume the same retained pool.

`Population::damage_npc` owns the NPC receive sequence:

1. Validate the defender/dead/immunity/attacker/gap guards and retained context.
2. Remove Sleep through the existing native effect owner; publish its events.
3. Consume one-shot ManaShield and return without HP/credit/timestamp changes.
4. Apply mitigation using the native profile and retained NPC factors/shield state.
5. Credit actual HP loss in attacker memory before the HP decrement.
6. Commit native DecHP, last damage, damaged time and dead FSM; update the actor
   appearance and threat owner.

An unsupported linked-damage context is rejected explicitly.
[PC receive commits and the PvP two-fifths tail](NATIVE_PLAYER_DAMAGE.md) now have
their own live-owner/SQLite component. Party/link routing, PC durability and the
full cast pipeline remain open. [DealDamage/dice/armor handling](NATIVE_DAMAGE_ROLL.md)
now has an implemented component and NPC composition. The pure mitigation component
does not remove Sleep/ManaShield or mutate a live character by itself.

Lethal damage marks the NPC dead but does not implement OnKilled, rewards, loot,
generator release or respawn. Dead targets reject subsequent damage mutations.
The caller must supply those lifecycle services before timed combat is enabled.
This work does not synthesize cast/damage packets in their absence.

## Verification

Four CPU scenarios compare all authored correction/judge cells, all 201 PvP
override rows, armor/RvR boundaries and malformed fields; mixed/piercing/elemental
mitigation, PvP restrictions and immunity repair; strict shield boundaries; and
live NPC Sleep/ManaShield, credit, HP/time, lethal/dead guards and threat state.
The authority scene uses native generation on a controlled grid. It proves no
connected combat, authored collision, server uptime or capacity claim.

Final checks, source/data/package hashes and limitations are recorded in
[native-damage.json](evidence/native-damage.json). No worker, channel or client
is launched. The earlier corrected TCP retry still awaits approval.
All 60 Release CPU checks and 12 focused Debug CPU checks pass. Packaged Release
manager/service/zone hashes match the build output; original/reference and normal
client hash checks pass. The complete implementation plan remains unfinished.

## Exact paths

- `B:\__TANTRA\TantraDataScripts\Global\HTSSetting-global.xml`: authored tables.
- `C:\_GitHub\TantraSrc\Tantra\zone\LoadSetting.cpp`: table loading/overrides.
- `C:\_GitHub\TantraSrc\Tantra\zone\HTServerSetting.cpp`: native table schema.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`: OnTakeDamage and DecHP.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMob2.cpp`: shield/effect functions and
  remaining CastSkill/DealDamage execution.
- `C:\_GitHub\TantraSrc\Tantra\zone\TNPointBar.cpp`: shield counter semantics.
- `C:\_GitHub\TantraSrc\_server_cpp\src\zone\combat_tables.cpp`, `damage.cpp`,
  `npc_damage.cpp`, `npc.cpp`: owned implementation.
- `C:\_GitHub\TantraSrc\_server_cpp\tests\damage_tests.cpp`: CPU checks.
- `C:\_GitHub\TantraSrc\_server_cpp\data\rules\combat\PROVENANCE.json` and
  `src\rules\PROVENANCE.json`: authored and adapted-source provenance.
