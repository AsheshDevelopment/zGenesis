# Native effect ticking, healing and TP updates

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
`NativePcStatusSession::checkEffects` now runs the copied native effect-check
and periodic-effect dispatcher against persistent status state. Nonperiodic
effects expire through the existing native removal path. Periodic healing,
TP recovery and TP burning use their source methods. Normal offline-channel
integration and periodic damage/death authority remain unfinished.

## Copied source

The generator compiles these additional original bodies, preserving their
arithmetic and call order:

- `CMob2.cpp:4895` CheckAffections; `:5123` AffectAffection;
  `:5356` ElapseAffectionTime; `:4780` OnHeal; `:4824` OnRecoverTP.
- `CMOB.CPP:8100` IncHP; `:8131` IncTP; `:8146` DecTP.
- `server.cpp:19392` PlayDice and `SendFunc.cpp:671` SendPartyMessage.

There are now 45 original bodies plus the active Init prelude in the stat
adapter. CUser.h supplies USER_PLAY. Copied party records agree with the client
and zone declarations; packed S_PARTY and its update frame have size assertions
of 52 and 64 bytes. Generated source hashes include the new source inputs, and
CMake regeneration tracks them and both message-header references.

## Check and expiry order

CheckAffections returns immediately for an empty registry or dead/empty native
state. Otherwise it honors the source absolute unsigned check deadline. A due
check applies AffectAffection before testing expiry, then removes expired
effects and sets the next check deadline to the current time plus 500 ms.
Thus a check just before nominal expiry can defer removal until its next due
check. Expiry does not skip the final periodic application.

ElapseAffectionTime caps its sampled time at expiry, divides accumulated
milliseconds into whole seconds, and carries the fractional remainder by
advancing the effect's start time. Partial final seconds are discarded by
removal. All original unsigned comparisons, subtraction, addition and wrap are
preserved. The probe includes backward-clock and wrap cases; the component
does not silently substitute a different timer policy.

## HP and TP behavior

Healing retains the source positive-HP guard, immunity check, healer-Mind integer
scaling, variation bonuses and maximum clamp. TP recovery retains its separate
CantRecoverTP inner-affection guard, Mind scaling, bonuses and clamp. TP burning
caps the amount at current TP before invoking DecTP.

The source invokes healing/recovery even when the elapsed whole-second term is
zero. Their flat bonuses can therefore apply on half-second checks. The copied
dispatcher still emits its status notification for that check. These behaviors
are covered directly rather than replaced with a one-second-only schedule.

The original SendPartyMessage selector is compiled against represented solo
state. With no other playing party member, it returns without sending anything.
In particular, a solo TP burn does not manufacture a status or party frame.
Other party actors remain an unavailable world service. Socket sends are marked
as PartyMembers delivery if that boundary is reached; there is no owner-only
substitution for party delivery.

## Damage and failure boundary

The complete original periodic dispatcher is compiled, including damage cases
and their original PlayDice/elapsed-time order. OnTakeDamage and OnKilled still
require the combat/death authority, attacker state, consideration tables and
world services. They raise explicit unsupported-service errors in this status
component. A failed tick leaves caller output unchanged and invalidates the
session, preventing a partial elapsed-time or RNG update from being retained.
No zero-damage result, fake death handling or synthesized successful status
frame substitutes for these missing services.

## Verification scope

The focused `native_effect_ticking_probe` passes **108 checks**: due/not-due
boundaries, final application before removal, fractional seconds, delayed checks,
empty/dead state, native clock arithmetic, HP/TP bonuses and clamps, Mind
scaling, solo-party behavior and explicit failure for all seven periodic damage
cases. This is source/calculation verification. It does not establish a new
normal client runtime test or a completed offline world authority.

Release and Debug full builds pass, with **90/90 selected CTest checks passing
in each configuration** (HTTP runtime excluded). Both pass the 108-check ticking
probe, 533-check entry-effect probe, 2,617-check initialization/migration probe
and existing parameter/probability checks. Evidence under
`build-ogre-sdl/native-effect-ticking-*` includes successful build/suite logs and
`native-effect-ticking-VERIFIED.json` binding source, executable and log hashes.
The final `_client` package retains the earlier runtime-verified executable.
Next integration work remains the complete Init world/settings/rank context,
the rest of world-entry notifications, SQLite lifecycle, actor/grid routing and
the normal offline channel. Combat/death, NPCs, movement, remaining UI/visual
fidelity and the standalone server/GUI remain required by the full plan.
