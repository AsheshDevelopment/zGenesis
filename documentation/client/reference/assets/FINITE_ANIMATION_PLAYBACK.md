# Finite model playback and gate animation ordering

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).

## Native evidence

The supported shipped engine's model start path (RVA B001) resets elapsed time,
the completed-loop counter and interpolation state, stores the loop request,
and enters state 1. The model update (RVA AC65) accepts positive elapsed steps
up to 30 seconds. Its loop path (ADFF) increments the counter once per update,
recognizes infinite count -1, and enters STOP after the requested finite count. Clip completion uses strictly greater-than
duration; equality remains playing with the native interval lookup. The earlier
greater-or-equal implementation is superseded by this traced branch condition.
Continuing playback subtracts one duration; a stall spanning several durations
does not count every crossed duration immediately. STOP leaves the previous
key interval and interpolant intact. The draw path then forces alpha=1 on
that interval; see [the later STOP rendering correction](NATIVE_ANIMATION_POSES.md).

`tools/inspect-native-animation.py` now verifies those instructions and guard
constants against the supported DLL hash. See the saved
[native evidence](../../evidence/native-animation-timing.txt). Valid finite counts
0/1/2 and infinite -1 are covered; the new bridge rejects counts below -1 and
non-finite inputs. This does not establish universal x87 numerical parity.

## Implemented renderer behavior

`HtModelPlaybackClock` implements that start/finite-loop path. Each skinned
owner shares one clock across all detail records; the renderer advances it
once per frame, including while the owner is hidden. On STOP it renders the retained interval
with interpolation fraction one for every detail record. The earlier pose-freeze
assumption was corrected after inspecting the draw path. The native sampling
entry point consumes the clock's authored time without a second modulo. It
also preserves the native interval-zero lookup after a large update remains
beyond duration after the single subtraction.

`startSkinnedObjectAnimation(owner, path, track, loops)` validates a fresh
animation/skeleton binding before replacing the instance's binding and clock.
It retains materials, transform, detail selection and visibility. Missing
owner, animation, required bone or unsupported loop count returns false without
replacing the running binding. `getObjectAnimationState` reports the shared
clock and confirms that all parts have the same clock. Destruction/recreation
does not retain the previous owner's stopped state.

This API implements StartAnimation. A separate
[ChangeAnimation presentation path](NATIVE_CHANGE_ANIMATION.md) now supports
the inspected zero-play-time state-4 transition; it is not an immediate start. The diagnostic factory still
starts its preview animation infinitely by default; that is not proof of the
native object-creation lifecycle.

## Gate scheduling component

`HtIntroGateAnimations` ports the gate portion of
`HTIntroManager.cpp:1796-1829`, after the character animation fallback:

1. The stop-all switch returns before queries or side effects.
2. For each existing gate, STOP emits a ChangeAnimation request for monster
   2077, STD, infinite loops.
3. Login delay returns only after those fallbacks.
4. Read the clock, then consume one `rand()%5` choice shared by both gates.
5. For each gate, strictly compare `now > last + 4000 + index*500`, update its
   timestamp, then issue RUN/2, ATK2/1, IDL/1, WLK/1, or skill 3612/1.

Initialization makes two clock reads and stores each result plus 1000, matching
native lines 762-763. Unsigned 32-bit addition and the source's plain comparison
are retained; no different wrap-aware timer policy is inserted.

Requests execute through a callback before the clock/RNG reads. This matters
because native STD ChangeAnimation sound selection can itself consume RNG.
The component does not precompute all requests and thereby reorder side effects.
Skill 3612 remains an explicit skill request, not a guessed normal attack clip.

## Validation and gaps

CPU checks cover finite counts, infinite playback, STOP interval retention, zero-duration
static timing, rejected steps, the 30-second boundary, native single-subtraction
behavior, and interval lookup after a stall. Gate checks cover all five choices,
shared RNG, fallback ordering and RNG side effects, login delay, stop-all,
strict per-gate timer boundaries, and absent gates.

The OGRE lifetime fixture resolves WLK/RUN by original monster IDs, verifies
one/two-loop playback across four detail records, STOP sample retention,
hidden/detail changes, invalid replacement, instance isolation, and recreation.
Runtime smoke requires `TMB_ANIMATION_LIFETIME_VERIFIED`. These are clock/state
and lifecycle checks; they do not establish pixel or native skinning parity.

The gate scheduling component is not yet connected to normal intro rendering.
The diagnostic STOP-to-STD path now uses native-style local blending with
`TIME/AniInterTime`. Sound handling, native bind skinning, skill attack mapping
and normal gate assembly remain required before the normal intro path is complete.
`HTEngineHandler.cpp:4395` must retain its blended change call; an immediate
StartAnimation replacement would violate the requested source sequence.

Verified 2026-10-22: both x64 builds pass 46/46 CTest checks. Refreshed Debug
and Release packages pass provenance validation and runtime smoke, including
the finite-animation lifetime marker and the unchanged default intro sequence.
Read-only native dispatch/clock inspection passes. Logs use
`build-ogre-sdl/finite-playback-*`. Full source and visual parity remain open.
