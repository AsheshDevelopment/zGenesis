# Native inventory, equipment and account cargo

The C++ zone authority now processes ordinary item moves, packing/splitting and
account cargo item/money transfers. These are implemented packet handlers with
SQLite-backed CPU checks. A fresh zone TCP route and graphical OGRE acceptance
remain unverified. [Ordinary merchant transactions, repair and save points](NATIVE_NPC_SERVICES.md)
now have authority handlers. NPC dialogue/warehouse UI and cash shops remain
unfinished; `npc_services_ready=false` and `game_ready=false` remain.

## Source behavior and packets

All offsets below follow the existing normalized twelve-byte native header.
Client-provided identity, money balances and item contents never replace the
authenticated owner's state.

| Operation | Request / response | Body bytes | Implemented behavior |
|---|---|---:|---|
| Ordinary move | `0x1203` / `0x9203` | 8 / 12 | Native inventory, equipment and account cargo places 1/2/3; destination must be empty. |
| Pack or split | `0x1221` / same | 8 | Pack type 1 fills the destination to its authored maximum and retains overflow; split type 2 requires the same place and an empty destination. |
| Cargo money | `0x1226` / same | 16 | Authoritative source balance, checked destination overflow and returned committed balances. |
| Equipment notification | `0x920C` | 32 | Owner handle and seven native visual records, delivered before the successful move reply. |

Ordinary move rejects occupied destinations, including compatible stacks. It
does not swap occupied items or implicitly pack them. Equipment validation is
compiled from the original server handler: tribe and slot families, two-handed
and throwing-weapon interactions, arrows, Asura/Rakshasa dual dagger mastery and
the main-hand removal guard. The source's commented level/Chakra move checks are
not turned into new server restrictions. The status core still calculates the
resulting equipment effects using its native rules.

The handlers preserve their different guards. Ordinary moves use the calculated
inventory capacity, ignore dead/GM requests, restrict quest items and Kala cores,
and allow cargo only in native zones 1/2/7/9/17/10. Packing uses the full native
inventory array, as GetItem does, and retains the original split reply's unchanged
byFromCount field. Packing does not acquire ordinary move's death or zone checks.
Money requests ignore client-supplied result balances. These original handlers
do not require an open NPC conversation; NPC dialogue acceptance is a separate
gate, not implied by cargo backend support.

## Ownership, ordering and failure

The authoritative zone thread resolves every slot against the selected player's
calculated snapshot and account cargo loaded during CHAR_INIT. Equipment changes
use the existing status session's dedicated `updateInventory` method, preserving
stance, position, active effects and retained RNG state. It follows the handler's
equipment-recalculation and UI flags instead of applying the generic offline
world update. The owned actor appearance changes only after persistence succeeds.

SQLDMN `commit_cargo` commits the character and cargo together using both revisions.
It verifies total item metadata/counts and combined character/cargo money before
the transaction commits. Normal inventory changes use the character revision.
Only then does the zone publish status/appearance and the native acknowledgement.
Equipment UI/visual notifications precede the move reply; the visual multicast
uses the source's recipient argument of 30. Packing and money return their native
echo packets without adding the generic offline status/UI pair.

A failed commit produces no success acknowledgement. The connection loses its
tentative status and actor ownership, and the persisted character/cargo remain
unchanged. Rejected occupied-slot moves produce the native failure reply without
advancing durable revisions. Cargo revisions remain server-side metadata.

## Explicit guards and remaining boundaries

The original GetItem bounds expressions use an impossible conjunction and can
index beyond arrays. The C++ port rejects out-of-range and aliased slots. It also
rejects corrupt item counts and packing between records with different
durability/refinement metadata instead of destroying metadata. Native serial
differences remain valid for packing. Money arithmetic uses checked intermediate
widths in place of signed overflow. These guards are deliberate differences for
invalid/destructive inputs, not claims that those source errors are reproduced.

Guild cargo remains unsupported. Certification/web-item ownership services are
not connected; the move component exposes blocked inventory flags for that
future authority. Client-side drag/drop, occupied-slot workflows, warehouse UI,
merchant transactions, consumables, refinement, trade and loot require their
remaining handlers and graphical acceptance.

## Data and source references

- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: CSP_REQ_ITEM_MOVE (6011),
  _MSG_Packing (6793), _MSG_Money_Move (6862) and their notification/persistence sequence.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.h`: native places, item ID families,
  equipment slots, reply codes and packet layouts.
- `C:\_GitHub\TantraSrc\Tantra\zone\HTParamMgr.cpp`: item family predicates.
- `C:\_GitHub\TantraSrc\Tantra\zone\GetFunc.cpp`: GetItem container addressing.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`: UpdateEquipmentPoints,
  EquipItem/SetViewEquip and money operations.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.cpp`: BASE_GetRefineVariable.
- `B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml`: authored item input;
  owned export is `data/rules/gameplay-parameters/Item.tsv`. Its provenance is
  checked before loading. Of 2,759 sheet rows, 2,669 are in the native player item
  family; the 90 monster-equipment rows are excluded from player packet metadata.

`tools/rules/generate-native-inventory.py` reads the original sources without
editing them, extracts nineteen ID predicates and the complete equipment and
main-hand removal validation blocks, and records source SHA-256 values in the
generated includes. `src/zone/inventory.cpp` owns codecs, metadata loading and
container operations; `World::inventory_request` owns status, commit and delivery.

CPU checks cover native move failures, equipment restrictions, sitting-state and
effect preservation, exact UI flags, packing overflow,
split echoes, cargo codec fields, money overflow, status-before-ACK, item/money
conservation and failed-commit fencing. They start no worker, zone or game
process. See [progress](IMPLEMENTATION_PROGRESS.md) for acceptance still open.

The current Release suite passes 27 CPU checks. Eight focused Debug checks cover
the new handlers and their status, actor and world dependencies. Recorded logs,
source/generated/build hashes, final SQLite balances and counts are in
[native-inventory.json](evidence/native-inventory.json). The isolated route ends
with 120 units of item 6307, one item 4001, and combined character/cargo money of
10,000 Rupiah (8,500 / 1,500), unchanged by the injected failed commit.
