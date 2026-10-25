# Manual ground drops and native pickup stacking

Dragging an inventory, equipment or open warehouse item onto the world now
opens the original inventory-owned confirmation. Confirm submits the captured
item record; Cancel/Escape leaves it unchanged. A changed slot invalidates the
confirmation. Quest-only items are rejected before opening it. The drop removes
the whole native record, including its count, after a successful durable save.

The offline authority uses the source's one-second drop-request throttle and
nearby positive-offset search (area four, expansion every thirty attempts,
bounded at five hundred). It checks map bounds, free ground-item cells and a
valid floor. Native `CreateItem` clears `byDummy` and assigns a new ground serial.
It retains the item's other fields. Equipment removal recalculates status;
warehouse removal uses the existing optimistic cargo revision transaction.

Pickup now fills compatible existing stacks in inventory order. Native partial
pickup leaves the remainder on the ground immediately, even when an empty slot
exists. A later request can put that remainder into an empty slot. Repeated
pickup cannot duplicate a removed record. Authority distance uses the native
five-cell square, while the client can still approach closer before retrying.
The existing money-limit behavior remains a separate unfinished path.

Both pickup and manual drop write SQLite before changing the ground record.
An aborted save leaves inventory and ground counts unchanged; the channel closes
a failed persistence session. Ground items remain transient zone state. They
are not an invented permanent inventory or a new SQLite world-loot table.

## Original references

Reference root: `C:\_GitHub\tantra-dev-main\_references\Tantra`.

- `HTlauncher/HTItemControl.cpp`: `HT_vItemControl_Limit_InMap`,
  `HT_ptItemControl_SearchMapPosForItemDrop`, drop request/result handlers.
- `HTlauncher/HTEquipInventory.cpp`: `_MESSAGEBOX_THROWITEM` confirmation and
  `HT_vEI_SetMessageBox`, including the inventory dialog owner.
- `HTlauncher/HTInterface.cpp`: reconfirm and number-input message layouts.
  They share native labels/buttons; confirmation omits the edit control.
- `HTlauncher/HTMessageDef.h`: `eMsgItemMoveDropQuestion`, resolved through the
  original `HTMessage.txl` and native item names from `ClientRes.txl`.
- `zone/server.cpp`: `CSP_REQ_ITEM_DROP`, `CSP_REQ_ITEM_GET`, `CreateItem`;
  positive money-drop requests are explicitly rejected by this source profile.
- `zone/Basedef.h`: native inventory, equipment and ground-item limits.

Defined corrections: validate source records and capacity before removal;
reserve ground-record storage before durable save; do not copy the source's
unchecked `CreateItem` failure followed by source clearing. Stack merging checks
all compatible metadata rather than erasing differences between same-ID records.
The nearby search uses a retained native CRT random stream without reseeding the
process-global generator on each click. Native authored item decay scheduling
and multiplayer ownership/release semantics remain separate required work.

## Verification and remaining scope

- [x] Compile the source drop-question ID; retain original art, labels and buttons.
- [x] Connect drag-to-world confirmation, captured-record validation and
  inventory/equipment/warehouse request paths in the offline channel.
- [x] Save before ground publication/removal; close failed persistence sessions.
- [x] Cancel pending transaction modals when authoritative death opens rebirth UI.
- [x] Check native item 7001 with maximum stack twenty: multiple destination
  stacks, partial remainder, full inventory and deferred empty-slot placement.
- [x] Check repeated drops, expiry through 32-bit wrap, repeated pickup,
  missing/invalid records and injected pre-commit failures in CPU gameplay.
- [x] Read the isolated SQLite character blob after drop and pickup; reject stale
  confirmations and inject a real SQLite update-abort trigger to prove conservation.
- [x] Pass world-gameplay, character-persistence and MainUI CPU checks; rebuild
  both x64 client outputs and pass their static package/preservation checks.
- [ ] Accept drag/confirm/cancel, equipment appearance and warehouse drops in-game.
  The current CPU persistence scenario exercises inventory; other rendered paths
  do not inherit that acceptance.
- [x] Connect native pickup/drop result text and accepted-drop sounds; see the
  [feedback checkpoint](NATIVE_GROUND_ITEM_FEEDBACK.md) for CPU evidence and limits.
- [ ] Accept the feedback in-game; finish quest/Kala-core services, ownership/
  release, decay scheduling, money overflow and online transport.
- [ ] Complete continuous/charged items and all remaining client phase gates.

No game, renderer, server or audio device was launched for these checks.

[Evidence](../evidence/native-ground-items-20261026.json) |
[Current progress](../PROGRESS.md) |
[Phased plan](../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md).
