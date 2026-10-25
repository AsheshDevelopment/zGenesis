# Active skill authority checkpoint

Updated 2026-10-25. This continues P04-T06 and P07-T03; both full tasks remain
open. The current implementation covers authenticated, self-targeted timed stat
skills with the native `OnAffect` phase. It does not complete active combat.
The later [unit/area impact checkpoint](NATIVE_SKILL_IMPACTS.md) implements the
authority final-hit stage. The later [direct action sequence](NATIVE_ACTION_SKILL_SEQUENCE.md)
connects selected targeted quickslots; full skill presentation remains open.

The owned code is in `C:\_GitHub\tantra-dev-main\_remake`. Quick-slot bindings
now call `OfflineCharacterChannel::castSkill`, which serializes and validates a
native unit-skill preparation frame. An unsupported target, combat phase, instant
effect or world-service effect is rejected before charging the character.

## Source sequence and data

- `C:\_GitHub\tantra-dev-main\_references\Tantra\HTlauncher\HTMainCharacter.cpp`:
  `HT_vMainChar_SetActiveSkill`, `HT_vMainChar_ControlActiveSkill_ActivateAndState`
  and movement cancellation. A self-state skill stops movement/basic attacks,
  echoes preparation, then activates after the authored ready time plus 100 ms
  using a strict greater-than time comparison. Accepted movement cancels a
  pending preparation without paying its costs.
- `C:\_GitHub\tantra-dev-main\_references\Tantra\zone\CMob2.cpp`:
  `CastSkill`, `OnTakeAffections`, `AddEffect`, `CheckAffections` and
  `BroadcastCastSkill`. The selected zone project compiles this file. The
  generator extracts TP-saving and cooldown arithmetic from its active cast
  method. The existing native effect registry applies and expires each effect.
- `C:\_GitHub\tantra-dev-main\_references\Tantra\zone\CMOB.CPP`:
  source HP/TP debit functions and the already compiled status calculations.
- `C:\_GitHub\tantra-dev-main\_references\Tantra\zone\server.cpp`:
  original `AllowedLevel` INI reads. Karma attack limits come from the existing
  native `WorldSettings.ini` reader. These values now reach the status adapter.
- `B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml` and the derived
  `gameplay-parameters/PCSkill.tsv`: authored skills loaded through the selected
  native parameter loader, including prerequisites, costs, phases and timings.

For example, the authored Asura skill 3110 requires learned 3102, whose
prerequisite is 3101. Level one costs 7 TP, has a 200 ms ready time, four
180,000 ms resistance effects, and a 60,000 ms base cooldown. The selected native
authority applies its 20 percent cooldown correction; no guessed damage formula
is substituted for other skills.

At activation, the authority checks the current session, living character,
position/posture/affections, zone restrictions, learned book, weapon, safety,
supported phases, cooldown and resources again. It rechecks costs after effect
expiration. HP costs must leave at least one HP. Rejected requests do not spend
HP/TP or commit a cooldown. Unexpected authority failures invalidate the session
instead of persisting a partial cast.

Successful results carry authoritative caster/target vitals, affections,
duration and cooldown. The offline view also receives a calculated UI refresh
after the cast result so stat-only buffs update its displayed maxima. This
refresh is an offline presentation adapter, not a claim that every native
notification branch has been ported. Collected notification batches are consumed
once to avoid duplicate FIFO delivery.

## Wire layout

Both selected `HTlauncher/Basedef.h` and `zone/Basedef.h` declare the same skill
records. `generate-native-skill-wire.py` checks their declarations and header,
then compiles a fixture with eight-byte alignment:

| Record | Bytes | Target location |
| --- | ---: | --- |
| `S_TNTARGET_DATA` | 24 | affection at byte 16 |
| `S_CSP_CAST_UNIT_SKILL`, `0x3240` | 96 | one target at byte 72 |
| `S_CSP_CAST_AREA_SKILL`, `0x3250` | 456 | sixteen targets at byte 72 |

The header is 12 bytes. The client and broadcasts use the same IDs. The codec
uses explicit little-endian offsets, fixed lengths and zeroed alignment bytes;
it does not copy a host C++ struct to the transport.

This layout also has independent original-binary evidence. Read-only x86
`C:\_GitHub\TantraSrc\TantraClient\HTLauncher.exe`, SHA256
`03d4587c4f87eeb71eb8be288b765836ccf8a1f11d49760d48239c6496c73903`,
sets body lengths `0x54` / `0x1bc` and sends `0x60` / `0x1c8` bytes at
`0x100f331e` / `0x100f3354`. Other packet families' packed layouts must not be
assumed for these records.

## Acceptance and remaining work

CPU validation is recorded separately in
[skill evidence](../evidence/native-skill-casting-20261025.json). The wire fixture
checks exact bytes against the original declarations and rejects wrong types,
sizes and body lengths. The authority fixture exercises authored learning,
preparation, native costs/cooldown/effects/expiry, invalid requests and an
isolated SQLite session. It creates no renderer, game window or network service.

- [ ] Runtime-accept the rebuilt launcher in the next authorized offline attempt.
- [ ] Finish unit/area damage, target relations/range/line of sight, hit/critical,
  item/arrow costs, direct healing and other instant/world effect phases.
- [ ] Add the remaining native cast cancellation/interruption and error messages.
- [ ] Connect native skill motions, TFX, projectiles, sounds, icons and cooldown
  overlays to the authoritative result. Preparation currently stops ordinary
  movement/attacks; full skill animation presentation is pending.
- [ ] Finish periodic damage/healing attribution and death/transition cleanup.
- [ ] Establish persistence/re-entry rules for temporary combat effects. Current
  SQLite persistence stores the changed character vitals and learned skills;
  active effect slots and cooldown clocks belong to the live status session.
- [ ] Apply the same contract through the C++ online authority when that work
  resumes. These in-process frames do not establish external server parity.
