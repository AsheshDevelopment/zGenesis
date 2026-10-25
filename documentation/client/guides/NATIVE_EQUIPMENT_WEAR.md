# Native combat equipment wear

Updated 2026-10-25. This implements the ordinary melee durability portion of
P06-T06. Charged/timed items, drops/ownership/decay and full combat remain open.

The offline authority calls original `UpdateEquipDur` through its live status
session. Main-hand wear follows a successful damage phase, including a successful
zero-damage hit; dodges skip it. Player armor wear follows incoming damage. NPC
recipients retain the source's no-equipment-wear behavior.

Combat and armor selection share the same native RNG stream. A break recalculates
equipment points immediately, so later actors in that tick see the updated
status. Notifications retain their order. The final character blob is saved at
the end of the tick, including a hit that changes only weapon durability.

## Preserved rules

- [x] Main-hand wear subtracts one durability per successful damage phase.
- [x] Armor loss divides damage by summed hardness, with a minimum denominator
  of 50. Slot probabilities are 20/15/20/10/10/15/10 percent for armor, shield,
  helmet, gloves, belt, pants and boots.
- [x] Armor selection still rolls when damage is too small to reduce durability
  or the selected slot is empty.
- [x] Main/off-hand indestructibility uses equality with 25,500; armor uses the
  original greater-than-or-equal condition.
- [x] The off-hand wear API uses damage-based reduction. The complete native
  left-hand/dual-hit attack pipeline remains a separate combat task.
- [x] Preserve the strict break condition: equipment points recalculate when
  subtraction goes **below zero**, then durability is clamped to zero. Landing
  exactly on zero does not itself trigger that call.
- [x] Wear still executes after a fatal incoming hit, as in the source.

One undefined-memory path is corrected explicitly. When an armor roll selects an
empty slot, the original function calls `AddMessage` without assigning an item
index or payload. The generated producer initializes the record and uses an
internal unassigned-index sentinel; the adapter suppresses only that undefined
update. The roll and wear arithmetic still execute. This prevents a fabricated
empty-item update from clearing an unrelated client slot.

`MSG_ITEM`, ID `0xB100`, is 36 bytes: a 12-byte header, two short IDs, four byte
fields and the original 16-byte item at offset 20. Selected client/zone
declarations must agree. The explicit-byte codec and frontend now handle
equipment-info updates. The HUD reads the authoritative equipment snapshot;
complete durability tooltips and broken-item presentation remain UI gates.

An offline calculated UI refresh follows a native equipment recalculation. It
keeps displayed authoritative stats current; it does not claim every native
client's local-stat presentation branch has been ported.

## Reference and implementation paths

| Path | Role |
| --- | --- |
| `C:\_GitHub\tantra-dev-main\_references\Tantra\zone\CMOB.CPP` | Original `UpdateEquipDur` and equipment-point recalculation |
| `C:\_GitHub\tantra-dev-main\_references\Tantra\zone\CMob2.cpp` | Target armor wear in `DealDamage`; first-target weapon wear in `CastSkill` |
| `C:\_GitHub\tantra-dev-main\_references\Tantra\zone\Basedef.h` | Slots, hardness constant, item records and message ID |
| `C:\_GitHub\tantra-dev-main\_references\Tantra\HTlauncher\Basedef.h` | Matching client item-info declaration |
| `C:\_GitHub\tantra-dev-main\_remake\tools\generate-native-pc-stat-core.py` | Source extraction and guarded undefined-packet normalization |
| `C:\_GitHub\tantra-dev-main\_remake\src\compatibility\HtPcStatProjection.cpp` | Stateful wear, recalculation and notification producer |
| `C:\_GitHub\tantra-dev-main\_remake\src\client\NativeCharacterRecords.cpp` | Item codec |
| `C:\_GitHub\tantra-dev-main\_remake\src\client\OfflineCharacterChannel.cpp` | Authenticated binding, FIFO and end-of-tick SQLite persistence |
| `C:\_GitHub\tantra-dev-main\_remake\src\client\OfflineWorldGameplay.cpp` | Wear call order and shared RNG |

## Verification and open gates

[Wear evidence](../evidence/native-equipment-wear-20261025.json) records 122
focused source/wire assertions, the 115-assertion skill/combat/SQLite fixture,
the CPU gameplay regression and existing stat/effect checks. Fixtures use isolated
profiles and create no renderer/game window.

- [x] Compare item wire bytes with generated original declarations and reject
  invalid frame types, lengths and body sizes.
- [x] Check seven armor slots, hardness, zero-loss rolls, indestructibility,
  off-hand arithmetic, strict break behavior and empty-slot suppression.
- [x] Execute an offline-authority melee hit and read SQLite to verify the entire
  worn item record, with the carried item conserved.
- [x] Preserve equipment-stat and effect-timing regressions.
- [ ] Rendered item updates, broken-item feedback and repair of a newly worn
  item in the next authorized runtime attempt. Repair already exists; this
  checkpoint does not repeat its earlier transaction matrix.
- [ ] Complete left-hand/dual-hit, targeted/area skill and item-result coverage.
- [ ] Finish the remaining P06-T06 item families and online authority acceptance.

The full client goal remains active and incomplete.

The later [unit/area impact authority](NATIVE_SKILL_IMPACTS.md) also reaches
first-slot weapon wear for supported direct skills. This does not close the
remaining skill/dual-hit families or rendered acceptance.
