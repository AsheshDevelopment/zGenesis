# Native ordinary timed consumables

Ordinary self-use items with supported positive-duration stat effects now execute
through the live offline status authority. This extends ordinary instant HP/TP
potions. The initial checkpoint covered ten ordinary records. The subsequent
[repeat-use checkpoint](NATIVE_REPEAT_CONSUMABLES.md) extends this to 37 supported
timed records in total. Entitlement, resurrection, portal and mixed phases retain
their separate services and acceptance requirements.

## Implemented

- [x] Validate the authored self-item cost, requirements, pure `OnAffect` phase,
  supported stat-effect lanes and native item-family cooldown before consumption.
- [x] Execute the original `OnTakeAffections` callback using book 0, self caster,
  self party leader, `eAfn_Add` and `eVar_Skill`, matching `CMob::UseItem`.
- [x] Retain original effect replacement/stacking, stat recalculation and expiry.
  Do not approximate timed effects with a second set of recovery formulas.
- [x] Keep native affection/UI notifications until durable result collection;
  avoid a second status apply that would erase these queued notifications.
- [x] Persist the consumed item before publishing accepted inventory changes;
  existing quick-slot key lifecycle and ordinary cooldown UI receive the result.
- [x] Keep instant potion behaviour in the extracted `OfflineConsumables.cpp`
  module. Detached calls without live status authority reject timed consumption.
- [x] Reject unsupported repeat-use/action/entitlement phases before inventory
  consumption. Slots, dead characters and callback failures retain their guards.

Native item **7021** supplies a **20-point lightning resistance** buff for
**90,000 ms**. The fixture checks it for all eight tribes. Reapplying after the
authored cooldown refreshes the source effect without doubling its contribution.
The native status timer removes it on expiry. Temporary effects stay in the live
status session; this change adds no invented effect fields to saved MOB records.

## References

Native source root: `C:\_GitHub\tantra-dev-main\_references\Tantra`.

- `zone/CMob2.cpp::UseItem`: self-item cost gate, cooldown checks, `OnAffect`
  dispatch, successful consumption, UI and status publication.
- `zone/CMob2.cpp::OnTakeAffections`: active-item effect dispatch.
- `zone/CMob2.cpp`: native `AddEffect`, `CheckAffections` and effect replacement,
  with `zone/CMob.cpp` stat recalculation, compiled by the existing stat core.
- `HTlauncher/HTQuickSlot.cpp`: distinct repeat-use toggles and 59-second cadence.
  Supported stat buffs in IDs 6801-6950 now use that repeat-use checkpoint; other phases remain gated.
- `C:\_GitHub\TantraSrc\TantraClient\system\TantraParam.tpa`: source item
  parameters, exported to `_remake/derived-assets/gameplay-parameters/Item.tsv`
  by the existing provenance-preserving data pipeline.

Owned implementation root: `C:\_GitHub\tantra-dev-main\_remake`.

- `src/client/OfflineConsumables.cpp`: validated inventory/cooldown transaction.
- `src/compatibility/HtPcStatProjection.cpp`: shared timed-buff capability check
  and source-backed status callback. Self-skill support retains the same lanes.
- `src/client/OfflineWorldStatus.h`, `OfflineCharacterChannel.cpp`: live status,
  native notification preservation and durable accepted-change delivery.
- `src/tools/native_timed_consumables_probe.cpp`: 155 assertions, native-data
  support inventory and eight-tribe replacement/cooldown/expiry checks.
- `src/tools/offline_characters_probe.cpp`: isolated SQLite consumption, repeated
  request rejection and a real SQLite abort that leaves saved items unchanged,
  disconnects the failed authority and clears queued accepted changes.

## Verification and remaining work

- [x] Pass timed-consumable, progression, native skill-authority, ordinary potion/
  Mandara closure and isolated character/SQLite checks: five unique CPU tests.
- [x] Build Release x64, overwrite both configured client folders and pass both
  static package verifiers. Preserve 148 HPKs per output and all 49 private
  userdata files in `C:\_GitHub\TantraSrc\_client`.
- [ ] Accept native stat updates, quick bars, buff presentation, expiry and any
  associated resource FX/audio in-game. No game/device process was launched.
- [x] Add supported repeat-use toggle/cancellation/59-second scheduling; see the
  subsequent [checkpoint](NATIVE_REPEAT_CONSUMABLES.md) for current evidence.
- [ ] Finish unsupported/mixed-phase items, purchased entitlements, item-cost
  skills and other item-result families.
- [ ] Complete online results, corrected Mandara FX/camera acceptance and all
  remaining full client phase gates. P06-T06 remains open.

[Evidence](../evidence/native-timed-consumables-20261026.json) |
[Quick-slot lifecycle](NATIVE_QUICK_SLOT_ITEM_LIFECYCLE.md) |
[Current progress](../PROGRESS.md).
