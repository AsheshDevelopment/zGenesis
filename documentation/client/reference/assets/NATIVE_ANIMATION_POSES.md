# Native rotation interpolation and STOP rendering

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).

Tracing ChangeAnimation exposed two prerequisites that the earlier presentation
implementation handled incorrectly. These are corrected before connecting
blended gate transitions.

## Rotation interpolation

The supported engine's skinned resource vtable is at RVA 696B0 (constructor
39CCA). Pose setup slot 104, function 38016, selects the old adjacent animation
keys and target key zero. Pose evaluation reaches the local-bone routine
2EAAE, which calls quaternion interpolation dispatch 4199F and vector lerp
2E683. Its scalar quaternion implementation begins at 419A5.

The scalar path chooses the shorter hemisphere from the quaternion dot
product, uses spherical weights when `1 - abs(dot) > FLT_EPSILON`, and otherwise
uses linear weights. It does not normalize the resulting quaternion afterward.
The epsilon in this binary is exactly 2^-23. `AnimationInterpolation.h` now
uses that formula for sampled local rotations. Position interpolation remains
linear. This replaces the previous normalized linear quaternion interpolation.

Optimized CPU dispatch variants exist. The port uses ordinary C++ floating
point and standard trigonometric functions; universal x87/SSE bit parity is
not established. The [authored bind-matrix path](AUTHORED_BIND_SKINNING.md) is now implemented
for the supported CPU mode; full visual parity remains unverified.

## STOP correction

The earlier finite-clock implementation correctly retained the old key interval
and interpolant, but incorrectly assumed that the renderer reused the old
fractional pose. The newly inspected skinned draw path contradicts that
assumption: at RVA 23DBE, state 0 selects the retained key interval and forces
its interpolation fraction to **one** before evaluating the pose.

`sampleStoppedTrack` now evaluates that interval at alpha one, including
its quaternion hemisphere choice. The skinned backend
uses it for stopped instances, including hidden detail records. The clock still
reports its retained sample time; that clock value must not be confused with
the draw fraction forced by state 0. STOP does not necessarily select the
clip's final key, nor the last fractional pose before completion.

The CPU fixture distinguishes the two with deliberately different positions.
It also exercises the actual Tiger hierarchy and preview-skinning path: a STOP
pose must equal the next key's pose and differ from the prior fractional pose.
This checks the STOP sampling rule through the existing skinning adapter; it
does not prove that adapter's native bind-matrix parity.

## Blend evidence and remaining implementation

State 4 freezes the old key interval and stored fractional interpolant while
its elapsed time determines blend weight. After STOP, that stored fraction
differs from the alpha-one draw fraction; capturing the last displayed STOP
pose as a blend source would therefore change native behavior. The target clip contributes key zero. Only after elapsed time becomes strictly greater than the blend duration, the inspected
code calls StartAnimation first, which resets elapsed time, then computes a
negative elapsed argument from that reset time and the blend duration. The
update guard rejects that argument: positive-duration blend overshoot is not
carried into target playback. A zero-duration change still enters state 4 until
the next positive update.

These branches are now saved in
[native-animation-timing.txt](../../evidence/native-animation-timing.txt) and verified
by `tools/inspect-native-animation.py` against the supported DLL hash. The zero-play-time [ChangeAnimation component](NATIVE_CHANGE_ANIMATION.md)
now implements interruption and source-configured duration. Complete geometry/appearance parity, nonzero play-time overrides, sounds and normal intro integration
remain unfinished. An immediate StartAnimation call is not substituted for it.

Verified on 2026-10-22: Debug and Release x64 builds pass 47/47 CTest checks.
Both refreshed packages pass provenance checks and gallery/lifetime plus default
intro runtime smoke. Native pose/clock disassembly verification passes. Logs
use `build-ogre-sdl/native-pose-*`. These results do not establish complete
ChangeAnimation, native bind-matrix skinning, or full scene parity.
