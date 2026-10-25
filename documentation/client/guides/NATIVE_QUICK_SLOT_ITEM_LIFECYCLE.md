# Native quick-slot item lifecycle

The offline client now follows an item's saved inventory key rather than using
the first stack with the same template ID. Both quick bars display and activate
that exact slot. Original five-page, 400-byte `QuickSlot_*.sys` profiles remain
compatible; skills and command bindings retain their separate encodings.

## Implemented behaviour

- [x] Validate saved item keys against CHAR_INIT inventory, item IDs and capacity.
- [x] Retain a binding while its ordinary consumable stack still contains items.
- [x] On depletion, use the native linked-item-list replacement order across all
  five pages. If the first replacement is already bound, delete the depleted
  binding, as the source does; do not search for another unbound stack.
- [x] Follow inventory moves and occupied swaps; remap both sides against the same
  before-image so one binding cannot move twice during a swap.
- [x] Retain partial source stacks, redirect fully merged stacks and track newly
  split stacks. Existing target bindings prevent duplicate redirection.
- [x] Remove bindings after accepted drop, sale or transfer out of inventory.
  Reusing the vacated slot never restores a removed shortcut automatically.
- [x] Publish complete before/after snapshots only after accepted offline saves
  and status collection. Rejections emit no accepted inventory event, and session
  teardown clears queued events.
- [x] Keep accepted in-memory bindings safe after a UI-profile write failure;
  preserve the old profile and retry pending writes on the next accepted event
  or graceful exit. Profile failures produce warnings rather than undoing an
  accepted authority transaction.

Native CHAR_INIT creates inventory nodes, then equipment, then cargo. Each loop
visits ascending slots and prepends nodes. Subsequent moves keep their node
position; item-setting replies recreate changed nodes at the head. This order
matters when a same-ID cargo stack is withdrawn and later selected as replacement.
The remake tracks this order explicitly instead of guessing from slot numbers.

Occupied swaps use a simultaneous remap. This preserves each record's identity
without reproducing a sequential remapping artefact. This correction is covered
separately from source-derived replacement behaviour.

## Source and implementation references

Original root: `C:\_GitHub\tantra-dev-main\_references\Tantra\HTlauncher`.

- `HTQuickSlot.cpp`: `HT_vIconLoad` (saved-key validation),
  `HT_vDeleteIconInAllSlotByIndex`, `HT_bChangeIconByKeyID`,
  `HT_bBeUsedKeyID` and `HT_vResultActionItem` (five-page lifecycle).
- `HTItemSystem.cpp`: `HT_vItemSystem_GetItemPos` (linked-list search),
  inventory/equipment/cargo creation, item-setting and position updates.
- `HTNetWorkHandle.cpp`: CHAR_INIT item-system creation order.
- `HTItemControl.cpp`: ordinary use, move/drop, packing/unpacking and item-set
  result callbacks.

Owned root: `C:\_GitHub\tantra-dev-main\_remake`.

- `src/client/NativeInventoryChanges.h`: accepted state/key DTOs.
- `src/client/NativeQuickSlotItems.cpp`: source order, validation and remapping.
- `src/client/OfflineItemSlotChanges.cpp` and `OfflineCharacterChannel.cpp`:
  accepted authority snapshots and queue lifetime.
- `src/app/tantra_remake_main.cpp`: CHAR_INIT initialisation, event consumption,
  exact-slot activation and pending profile retry.
- `src/rendering/HtRenderFacade/MainHudPresentation.cpp`: exact-slot icon/count.
- `src/tools/native_quick_slot_items_probe.cpp`: focused lifecycle fixture.

Runtime inputs remain in the original `system` / `resource` layout; no HPKs are
extracted or rewritten by this change. Personal profiles remain private userdata.

## Verification and remaining scope

- [x] Pass 53 focused CPU assertions covering five pages, source replacement
  order, bound replacements, swaps, split/merge, cargo ordering and key reuse.
- [x] Verify real 400-byte file reload and failed temporary-file write/retry.
- [x] Pass native progression and isolated SQLite character checks; accepted
  snapshots follow durable changes, while rejected operations publish no change.
- [x] Build Release x64, overwrite both configured client folders and pass both
  static package verifiers. Preserve 148 HPKs per output and all 49 private
  userdata files in `C:\_GitHub\TantraSrc\_client`.
- [ ] Accept quick-bar icons/counts, input, swaps and depletion in-game.
- [ ] Complete charged/continuous consumable phases, other skill/refinement
  item-cost result families, online wire replies, loot ownership and decay.
- [ ] Finish corrected FX/camera acceptance and the full client phase gates.

The first CPU build exposed use of C++20 erase helpers in this C++17 target.
The implementation now uses C++17 erase/remove; the final CPU and release builds
pass. No game, renderer, server or audio device was launched for this checkpoint.

[Evidence](../evidence/native-quick-slot-items-20261026.json) |
[Ground feedback](NATIVE_GROUND_ITEM_FEEDBACK.md) |
[Current progress](../PROGRESS.md).
