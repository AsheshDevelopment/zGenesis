# Native ordinary item cooldowns

Ordinary instant recovery items now expose their accepted-use deadlines from the
offline authority to both MainUI quick bars. Item use, the disabled overlay and
the original sixteen-step square FX use one authority clock. Pages and duplicate
bindings share the used item ID's deadline; observing a timer late does not
restart it. Switching stacks cannot bypass the server's item-family cooldown.

## Original references

Reference root: `C:\_GitHub\tantra-dev-main\_references\Tantra`.

- `zone/CMob2.cpp:5933-5967`: `sItemType` cooldown family, positive-delay bounds
  and rejection before its deadline.
- `zone/CMob2.cpp:6033-6040`: only successful item use sets the deadline from
  `iAttackSpeed` and consumes one item.
- `zone/Basedef.h:1559`: 128 native instant cooldown families.
- `HTlauncher/HTQuickSlot.cpp:839-900`: accepted item-use handling and stacks.
- `HTlauncher/HTQuickSlot.cpp:1151-1224`: item duration, duplicate bindings and
  horizontal/vertical square-FX controls.
- `HTlauncher/HTQuickSlot.cpp:1233`: quick-slot reuse requires strictly later
  time. The authority accepts at equality; the visual ends at equality.
- `HTlauncher/HTInterface.cpp`: existing source-derived `UISlotBoxControl` FX.
- `C:\_GitHub\TantraSrc\TantraClient\system\TantraParam.tpa` and
  `ClientRes.txl`: native item data and UI resource catalog. The unchanged
  `resource\UI\MAINUI\BMP_TIMER_0.TGA` supplies image 23661.

The original quick-slot function contains assignment in `if(byType = 0x02 ...)`,
which can incorrectly apply the Mind skill adjustment to item display timing.
This adapter displays the actual authority-enforced item interval instead.
Wraparound comparisons use a bounded 32-bit interval; unsupported or malformed
presentation entries are discarded. No native assets are rewritten.

## Implementation

- [x] Publish read-only accepted item ID/duration/deadline frames after CHAR_INIT.
- [x] Enforce native family bounds and cooldowns using the injected authority
  clock; retain a simulation-clock fallback for standalone gameplay fixtures.
- [x] Update timers only after successful ordinary item effects and consumption.
- [x] Reuse native FX/shading on both quick bars and every page; command and
  skill dispatch retain their existing paths.
- [x] Reject a repeated timed quick-slot action silently, as the native client.
- [x] Clear transient item timers on world initialization; do not persist an
  invented cooldown field in native SQLite character records.
- [x] Pass three focused CPU checks and rebuild/stage both x64 client outputs.
- [x] Verify both packages statically; preserve 148 HPKs in each output and all
  49 private profile files in the user's client.
- [ ] Accept the visible animation, page changes and repeated item input in-game.
- [x] Add supported repeat-use stat buffs, original 59-second cadence and
  depletion/cancellation semantics; see the later
  [repeat-use checkpoint](NATIVE_REPEAT_CONSUMABLES.md).
- [ ] Finish unsupported charged/mixed phases and specialised item effects.
- [ ] Complete online item-result transport and the remaining client phases.

The native-data fixture used catalog item **7001**, family **1**, with a
**1,500 ms** cooldown. It checks another stack, rejected input, deadline minus
one, exact expiry and 32-bit wrap. Its authority clock advances without a
simulation tick. Feedback checks cover late observation, duplicate page bindings,
no restart, malformed frames, strict quick-slot expiry and clearing. The existing
world-gameplay regression also passes. There were **zero game, renderer or audio
device launches**; these checks establish CPU behavior and packaging only.

[Evidence](../evidence/native-item-cooldowns-20261026.json) |
[Skill feedback](NATIVE_SKILL_FEEDBACK.md) |
[Current progress](../PROGRESS.md) |
[Phased plan](../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md).
