# Native combat rule checkpoint

Updated 2026-10-25. This continues Phase 7; it does not complete targeted active
casting, combat presentation or the full native combat lifecycle.

Owned implementation: `C:\_GitHub\tantra-dev-main\_remake`.

## Implemented

- [x] Replace the offline melee helper's copied damage equations with generated
  original `OnDefense`, `DealDamage`, `OnTakeDamage`, `set_JudgeCombat` and
  `PlayDice` methods. The source shield methods are compiled too; contexts that
  need their live effect recipients remain rejected by the public adapter.
- [x] Give each combatant its own native combat decks and dodge/damage clocks.
  The native dodge interval can turn a consecutive dodge into a normal result;
  it is not a new independent hit roll for every attack.
- [x] Preserve native armor-chart ordering, defense/resistance considerations,
  basic critical channels, non-basic critical reset and HP saturation.
- [x] Load all four combat table families from the authored JudgeCombat,
  Consider and AttackTypeVSArmorType exports. Add the original Monster
  `sMuscle` field used by the server as NPC dodge speed.
- [x] Compile native `CalDamage` and `CastInstant1` in the live stat component.
  The learned-skill calculation API includes native Chakra/staff scaling and
  next-attack modifier consumption; it does not perform a target/cost/cast cycle.
- [x] Bind original staff correction/maximum-nerves settings. The fallback
  correction is the source's 200, and maximum nerves is 350.
- [x] Use the offline authority's millisecond clock in production combat. CPU
  gameplay fixtures can retain their explicit simulation clock.
- [x] Return wear, attacker-memory and party-notification intents from the pure
  producer, so callers can connect the remaining services explicitly.

The generator retains the source calculations. It removes two unguarded
Zone10/16 logging/debug-notice blocks, with source-shape assertions. Their HP,
defense and resistance logic remains intact; native debug-notice presentation is
not provided by this math adapter. Source party records are zero-initialized before the original
assignments. Input guards reject invalid actor identity ranges, unsupported
world callbacks, arithmetic overflow and zero resistance denominators. Rejected
operations do not commit actor or RNG state.

The Mandara melee caller now uses this producer for player and ordinary monster
damage. It retains the existing bounded NPC statistics, engagement, animation,
reward and revival adapters. It is not a full port of `CMob::Init`, `CastSkill`,
`OnUnderAttack`, AI or kill services. The caller now applies ordinary equipment
wear through the live authority; see the [wear continuation](NATIVE_EQUIPMENT_WEAR.md).
The later [impact continuation](NATIVE_SKILL_IMPACTS.md) connects final native
unit/area hit requests to this producer. The later [direct sequence](NATIVE_ACTION_SKILL_SEQUENCE.md)
connects selected quickslots; full targeted input/presentation remains open.
Party recipients remain an implementation task. Its engagement handling is narrower than native
attacker-memory and reward attribution.

## Reference paths

| Reference | Used for |
| --- | --- |
| `C:\_GitHub\tantra-dev-main\_references\Tantra\zone\CMOB.CPP` | `OnDefense`, `OnTakeDamage`, `set_JudgeCombat`, armor lookup and NPC stat rules |
| `C:\_GitHub\tantra-dev-main\_references\Tantra\zone\CMob2.cpp` | `CalDamage`, `CastInstant1`, `DealDamage`, critical phase and shield calculations |
| `C:\_GitHub\tantra-dev-main\_references\Tantra\zone\server.cpp` | `PlayDice`, source Monster field mapping and default bare-hand record |
| `C:\_GitHub\tantra-dev-main\_references\Tantra\zone\HTParamMgr.cpp` | Monster `Muscle` getter maps to `sMuscle` |
| `B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml` | Authored Monster, item and skill values |
| `B:\__TANTRA\TantraDataScripts\Global\HTSSetting-global.xml` | JudgeCombat, Consider and attack/armor matrices |
| `E:\Global-server\Zone01\Data\WorldSettings.ini` | Selected settings, including staff correction and absorption cap |

Generation: `_remake/tools/generate-native-combat-core.py` and
`generate-native-pc-stat-core.py`. Runtime bridge:
`_remake/src/compatibility/NativeCombatRules.cpp` and
`src/client/OfflineWorldGameplay.cpp`.

## Verification and open gates

See [combat evidence](../evidence/native-combat-rules-20261025.json). The CPU
fixture uses exact fixed-damage vectors for armor, considerations, criticals,
immunity and HP saturation; it checks dodge clocks independently for two
defenders, fixed-success bypass, rejected-context RNG preservation, actual table
binding and learned-skill Chakra scaling. The gameplay fixture exercises the
existing Mandara movement/inventory/melee/death/reward/respawn/revival path on CPU.
Neither fixture creates a game window or establishes rendered acceptance.

- [ ] Complete targeted preparation/cancellation, approach and remaining skill
  phases. Final unit/area damage requests, native terrain/range, costs and area
  filtering are implemented in the impact continuation; the full cast is open.
- [x] Apply ordinary native wear and its break/recalculation/item-info order.
  Full dual-hit/skill coverage and rendered acceptance remain separate.
- [ ] Connect full attacker-memory, reward rights, parties and kill attribution.
- [ ] Complete live effect recipients for shields, dispels, links and periodic
  damage/healing. Unsupported contexts currently reject instead of bypassing them.
- [ ] Complete PvP relation/challenge/guild/zone rules before enabling PC combat.
- [ ] Finish native NPC stat/passive/skill lifecycle and AI acceptance.
- [ ] Verify RNG/deck lifecycle against a complete native world trace; isolated
  source-method checks do not prove the global services' random-call ordering.
- [ ] Connect skill motions, TFX, projectiles, sounds and cooldown presentation.
- [ ] Runtime-accept the staged build in the next authorized offline attempt.

The full client goal and P07-T03 through P07-T07 remain open.
