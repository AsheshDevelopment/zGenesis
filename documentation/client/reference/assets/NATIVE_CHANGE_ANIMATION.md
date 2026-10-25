# Native ChangeAnimation presentation path

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).

## Implemented source contract

`changeSkinnedObjectAnimation` is separate from StartAnimation. For the normal
zero-play-time-override path used by the intro gate fallback, it now implements
the inspected model state-4 sequence:

1. Validate the target clip and every part's skeleton before replacing pending
   state. Keep the current clip, key interval and fractional phase.
2. Reset transition elapsed time and loop count, set the requested target and
   blend duration, and enter changing state. The previous blend weight is not
   cleared by the native change routine.
3. On positive updates, blend the old sampled **local** position/rotation toward
   target key zero. Compose the hierarchy after local interpolation. Old clip
   time does not advance during the transition.
4. Only when elapsed time is strictly greater than the blend duration, start
   the target at zero, reset completed loops and clear the
   blend weight. Equality draws weight one but remains in changing state. The inspected start-before-update ordering discards blend
   overshoot. Zero-duration changes still wait for a positive update.

Interrupting a transition replaces its pending target while retaining the old
active clip and old fractional phase. It does not capture the currently drawn
blend as a new source. An explicit Start cancels the pending target. Native
Start leaves the otherwise inactive blend-weight field unchanged; a subsequent
change before an update can therefore observe that retained weight.

The underlying clock/render evidence is saved in
[native-animation-timing.txt](../../evidence/native-animation-timing.txt). In
particular, B071 sets state 4 without clearing E0/DC/F0, AD19 controls the
blend clock, 38016 prepares old adjacent keys and target key zero, and 2EAAE
interpolates local quaternion/translation data before hierarchy composition.
See also [rotation and STOP rendering](NATIVE_ANIMATION_POSES.md).

## Configuration and renderer lifetime

The source engine constructor defaults `m_fAniInterpolateTime` to 0.1 at
`HTEngineHandler.cpp:218`; preload reads `TIME/AniInterTime` at line 3882.
`ClientRenderProfile::animationBlendSeconds` now reads the supplied
`system/HTStartup.cfg` value, retaining the constructor default when the key is
absent. Non-finite or negative values are rejected by this supported profile.

Each owner shares one clock and target binding across all detail records.
Hidden records follow the same transition. Materials, visibility and detail
selection remain attached. Target promotion happens for every part after the
shared clock completes. State queries expose the old path, pending path,
transition flag and weight, so a transition is not reported as an immediate
clip replacement.

The renderer now retains the owner's authored TMB bind reference across clips;
see [authored bind-matrix skinning](AUTHORED_BIND_SKINNING.md). The earlier
frame-zero preview correction is no longer the backend's ordinary path. This
does not establish full geometry/appearance or pixel parity.

## Verification

The CPU blend check covers frozen old phase, interruption, invalid requests,
zero-duration transitions, strict equality boundaries, overshoot discard, target endpoint poses, and a
real Tiger preview. Profile checks cover the original 0.1 setting, a 0.25
override, and malformed values.

The OGRE lifetime fixture resolves original monster 2077 model/WLK/STD/RUN IDs.
It lets WLK stop, then executes the source gate controller's STD request through
the real ChangeAnimation API while login delay suppresses clock/RNG reads.
It verifies four-part shared timing, half-blend state, pending replacement,
interruption, hidden/detail changes, target promotion, independent peers,
zero-duration change, retained weight, and explicit-start cancellation.
Runtime smoke requires `TMB_STOP_STD_BLEND_VERIFIED`.

This is an integrated diagnostic fixture. Normal intro gate assembly remains
unfinished. Nonzero play-time overrides, sound playback, complete geometry/appearance parity,
skill attack mapping and full viewing-set/update integration remain required
before the complete original client behavior can be claimed.

Verified 2026-10-22: Debug and Release x64 builds pass 48/48 CTest checks.
Both refreshed packages pass provenance validation and runtime smoke, including
`TMB_STOP_STD_BLEND_VERIFIED` and the default intro sequence. The read-only
native comparison/pose verifier passes. Logs use `build-ogre-sdl/native-blend-*`.
Full native skinning, audio and normal gate assembly remain unverified.
