# Native entry status, effect registry and continuous bonuses

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
`NativePcStatusSession` now owns calculated PC state, the skill books/decks,
shared RNG stream, effect records and pending notifications across calls. It
compiles the original effect-registration and continuous-bonus methods against
the same stat adapter used by initialization. The normal offline channel does
not yet own a session or send these notifications. Full world initialization,
periodic damage/death, persistence and later server messages
remain required before claiming authoritative offline HUD status. The later
[effect-ticking continuation](NATIVE_EFFECT_TICKING.md) adds native expiry,
healing and TP ticks; periodic damage and world integration remain incomplete.

## Source and sequence

The implementation reads canonical `Tantra/zone/CMOB.CPP`, `CMob2.cpp`,
`CMob.h`, `Basedef.h`, `CPSock.h` and `server.cpp` without modifying them.
The generator embeds source hashes. These methods are newly compiled:

- `CMob2.cpp:4936` AddEffect; `:4975` UpdateAffection; `:5025` RemoveEffect;
  `:5084` RegisterAffection; `:5373` get_Affection; `:5420` ToAbv;
  `:5481` ToAbv2; `:5527` ClearAffection.
- `CMOB.CPP:9805` ProcessContinuousEffect and `:4287` BroadcastUpdateStatusMsg.

The adapter compiles 35 original method bodies plus the active Init prelude.
The entry-status session follows the active `server.cpp:12392` sequence:
represented Init status, dead-state check, ProtectFromPK registration,
ProcessContinuousEffect, optional revival half-HP/TP, then NotifyUpdateUIMsg.
The earlier caste pass also emits UI. With no skill-specific notifications,
there are three UI frames, including the continuous pass's UI before revival.
This entry method covers that status segment, not all work in the server's
character-entry handler. Rank/clan/world services and the subsequent world
notifications still need integration.

## Effect records and clocks

The native free stack, effect slots, occupied count and last slot are retained.
Instant/passive durations are rejected by the registry. Equal parameters extend
expiry only when the new unsigned expiry is greater; a shorter duration does
not change start time or party owner. Changed parameters remove the old effect,
reverse its modifiers and emit the old state before applying the replacement.
Registration itself does not manufacture a UI or status notification.

`CurrentTime` remains a 32-bit millisecond clock. The independent Unix-seconds
clock is injected at ProcessContinuousEffect's original `time(&now)` read.
Unsigned millisecond addition/wrap and the native timestamp comparisons are
preserved. Context explicitly supplies the ten entitlement timestamps, disable
bits, initial inventory capacity and money-collection state. The component does
not infer deployed values from the authored table profile.

The copied free-slot table at `CMob2.cpp:37` contains slot 23 twice and omits
slot 24. This source behavior is retained and tested: the second registration
to slot 23 overwrites its record, and the occupied counter can reach 63 with
only 62 physical records. No synthetic slot repair is introduced.

## Continuous bonuses

Inventory expansion and automatic money collection use their original disable
bits. Anubaba adds the physical/elemental percentage bonuses; Atman adds flat
and percentage HP; the Chakra entitlement adds four separate stat effects.
Every original rule, effect duration and call order is copied from the source.
The native stat methods recompute the resulting values after each effect.

Entitlement validity uses a strict Unix timestamp comparison. With `set=false`,
disabled bonuses are not removed. With `set=true`, the source removes the bonus
effects only inside the still-valid entitlement branch. Merely reaching an
entitlement's Unix expiry does not clear already registered effects, reset an
expanded inventory or disable retained money collection here. Actual effect
expiry belongs to CheckAffections, implemented in the later ticking continuation.

## Notifications and ownership

The real BroadcastUpdateStatusMsg produces the native 56-byte status record.
Its GridMulticast boundary records delivery as `NearbyGrid`; direct UI frames
retain `Owner` delivery. Selecting grid recipients is a world service that is
not implemented by this component. No broadcast is silently treated as an
owner-only message. Karma, HP/TP/prana and visual-affection bits are assigned by
the copied producer. Source fields never assigned are normalized to zero.

The state object owns its source inputs so parameter references and RNG bindings
remain valid across calls. A failed initialization retains the prior session
and caller output. An unsupported world dependency during mutation invalidates
the session and leaves output untouched, rather than retaining a partial update.

## Verification and limits

The focused `native_entry_effects_probe` passes 533 checks for entry UI/revival ordering,
millisecond wrap, registry reuse/replacement, owner/grid delivery, visual bits,
native capacity/duplicate-slot behavior, all 32 entitlement-disable combinations
at three expiry boundaries, refresh/removal and failure handling. This is CPU
source/calculation verification; it does not establish a normal client runtime
or a completed world authority.

Release and Debug full builds pass, with **89/89 selected CTest checks passing
in each configuration** (HTTP runtime excluded). The new 533-check effect probe,
the 2,617-check initialization/migration probe and existing parameter/probability
checks all pass in both configurations. Evidence under
`build-ogre-sdl/native-entry-effects-*` includes successful build/suite logs and
`native-entry-effects-VERIFIED.json` binding source, executable and log hashes.

The subsequent ticking continuation implements CheckAffections/AffectAffection
with healing and TP services. Pending work includes periodic combat/death,
full Init world context and cleanup, actor/grid services, SQLite
lifecycle saves and normal OfflineCharacterChannel integration. Final `_client`
assets and executable remain at the previous runtime-verified staging checkpoint.
