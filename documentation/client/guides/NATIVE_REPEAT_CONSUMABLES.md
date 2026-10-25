# Native repeat-use stat consumables

Supported repeat-use consumables now share the live native timed-effect authority
and retain the original quick-slot toggle/cadence. The supplied data contains
37 supported pure OnAffect timed-buff records in total, including ordinary and
repeat-use items. This does not enable every item in the charge ID range.

## Behaviour

- [x] After accepted consumption, start repetition only when a matching saved
  inventory key remains bound and its stack still contains items. Inventory use
  of an already-bound item follows the same accepted-result path.
- [x] Reuse strictly after 59,000 ms. Scan the five pages in source order and
  dispatch at most one overdue key per frame. A long pause never consumes missed
  intervals in a burst. Rejected uses retain authority requirements/cooldowns.
- [x] Clicking an active binding cancels future uses across its duplicate page
  bindings; it neither consumes another item nor removes the current buff.
- [x] Show the native square FX using `59000 * (remaining count + 1)` and the
  current repeat period. Cancellation clears this timer while the independent
  server-family cooldown still guards a fresh manual request.
- [x] Follow moves, occupied swaps, split/merge and cargo changes through the
  existing accepted before/after snapshots. Remove repeat state after sale/drop,
  losing the last binding, inaccessible inventory or depletion. A depleted repeat
  stack never switches to another same-ID stack, unlike an ordinary potion.
- [x] Pause use while dead. After revival, an overdue key issues one guarded
  request. Preserve wrap-safe cadence comparisons and source strict expiry.
- [x] Keep repeat toggles transient. Loading/initialising a character clears
  them, and the original five-page 400-byte profile format remains unchanged.
- [x] Start from accepted-result timestamps; failed persistence disconnects the
  authority and publishes no accepted result that could start a repeat timer.

Item **6804** uses the source 20-point fire-resistance buff. The eight-tribe
fixture checks initial use, immediate family-cooldown rejection, reuse after
59 seconds, replacement without doubling and expiry. It executes the original
OnTakeAffections/AddEffect path, not an independent timed-stat approximation.

## Explicit corrections to source edge cases

The native code stores some repeat flags per icon and updates some timers by
template ID. The remake deduplicates the same inventory key across pages and
keeps distinct stacks' visual timers separate. This prevents duplicate bindings
or another stack's timer from consuming extra items. Occupied swaps use one
before-image. Missing/depleted keys cancel immediately, and clock comparisons
handle 32-bit wrap. These corrections do not bypass native authority cooldowns.

## References

Native root: `C:\_GitHub\tantra-dev-main\_references\Tantra`.

- `HTlauncher/HTQuickSlot.cpp::HT_vActionItem`: active-item cancellation.
- `HTlauncher/HTQuickSlot.cpp::HT_vResultActionItem`: accepted counts and the
  repeat-charge no-rebinding branch.
- `HTlauncher/HTQuickSlot.cpp::HT_hrSetCoolTime`, refresh and
  `HT_vContinueTimeCheck`: 59,000 ms cadence and remaining-count FX duration.
- `HTlauncher/HTClientParamMgr.h`: charge-continuance IDs 6801-6950.
- `zone/CMob2.cpp::UseItem`, `OnTakeAffections`, `AddEffect`, `CheckAffections`:
  family cooldown, consumption and source effect lifecycle.
- `C:\_GitHub\TantraSrc\TantraClient\system\TantraParam.tpa` supplies item
  data through the existing provenance-preserving gameplay table export.

Owned root: `C:\_GitHub\tantra-dev-main\_remake`.

- `src/client/NativeRepeatItems.cpp`: toggle, key reconciliation, cadence/timers.
- `src/client/NativeQuickSlotItems.cpp`, `src/client/NativeQuickSlots.h`: accepted key lifecycle and
  transient state, without changing the saved format.
- `src/client/NativeInventoryChanges.h`, `src/client/OfflineItemSlotChanges.cpp`: accepted timestamps.
- `src/client/NativeItemCooldown.h`, `src/client/NativeSkillFeedback.cpp/.h`: separate keyed repeat
  visuals while preserving generic ordinary-item cooldowns.
- `src/compatibility/HtPcStatProjection.cpp`: supported timed-item authority.
- `src/app/tantra_remake_main.cpp` and `src/rendering/HtRenderFacade/MainHudSkillFeedback.cpp`: guarded world
  requests, cancellation and exact-key visuals on both quick bars.

## Verification and remaining work

- [x] Pass 63 repeat-lifecycle assertions, 187 timed-item assertions across eight
  tribes, 53 ordinary quick-slot assertions and 145 feedback assertions.
- [x] Pass isolated SQLite authority checks for accepted timestamp/count changes,
  rejected reuse and an injected failed repeat-item save with no accepted change.
- [x] Build Release x64, overwrite both configured clients and pass static
  package checks. Preserve 148 HPKs each and all 49 private userdata files in
  `C:\_GitHub\TantraSrc\_client`.
- [ ] Accept repeat toggling, both bars, buffs and FX/audio in-game.
- [ ] Complete unsupported repeat effects, mixed phases, entitlement purchases,
  cancellation/refund action services, item-cost skills and online result flows.
- [ ] Finish Mandara corrected-build/camera acceptance and all client phase gates.

No game, renderer, server or audio device was launched for this checkpoint.
The five focused CPU tests passed; only the changed repeat fixture was rerun
after adding swap/split/capacity cases. Full P04/P06 acceptance remains open.

[Evidence](../evidence/native-repeat-consumables-20261026.json) |
[Timed consumables](NATIVE_TIMED_CONSUMABLES.md) |
[Current progress](../PROGRESS.md).
