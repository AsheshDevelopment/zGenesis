# Authored TAB animation timing

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).

## Source evidence

The earlier reader decoded transform keys but skipped the timing block. It
spread those keys evenly across the footer frame count at a nominal 30 FPS.
The supplied files contain authored, nonuniform timestamps after the tracks:

| File under resource/object | Key timestamps | Footer frame value | Final authored time |
| --- | ---: | ---: | ---: |
| Monster/Ani/MON_Tiger_WLK.tab | 46 | 46 | 1.515151978 s |
| Monster/Ani/MON_Tiger_RUN.tab | 27 | 26 | 0.841413975 s |
| PC/Ani/PC_ASU_IDL.tab | 37 | 137 | 4.545454979 s |

For this format profile, the block is `u32 count`, `count` float timestamps,
`count` opaque 256-byte records, and the final `u32` frame value. The real
tracks in these files each contain exactly `count` keys. The 256-byte records
are retained as bytes; their semantics are not inferred from these examples.

`tools/inspect-native-animation.py` rejects unknown engine hashes and reads
the supplied DLL without executing it. The saved
[disassembly evidence](../../evidence/native-animation-timing.txt) establishes:

- model interval helper RVA AC2E scans authored times and selects the interval
  before the first time strictly greater than elapsed time;
- playback at RVA ACCA reads the final timestamp as the duration;
- playback at RVA AD9F computes its interpolant from adjacent timestamps;
- the loop completion path at RVA ADFF increments a loop counter, recognizes
  infinite count -1, and can enter STOP. It is not a modulo-all-loops clock.

This timing evidence confirms the duration and interval basis. The later
[pose](NATIVE_ANIMATION_POSES.md) and [ChangeAnimation](NATIVE_CHANGE_ANIMATION.md)
work expands the evidence and implementation. Native skinning and complete
update ordering remain unverified.

## Implemented correction

`AnimationTimeline` now retains timestamps and opaque timing records, validates
the complete file boundary, and uses the final timestamp for duration.
`sampleTrack` selects a time interval instead of distributing keys uniformly.
Equal adjacent timestamps are supported: Tiger RUN repeats its final time.
Non-looped diagnostic sampling clamps to the last key; generic loop sampling
wraps at the authored duration. Rotation interpolation now follows the inspected scalar spherical formula;
see [native rotation and STOP rendering](NATIVE_ANIMATION_POSES.md). Optimized
numerical and native skinning parity remain separate gaps.

The footer and nominal FPS are retained for diagnostic `frameAt` reporting.
They no longer determine animation duration or key interpolation. `frameAt`
wraps time at the authored duration, so its loop boundary agrees with playback.

Malformed/truncated/trailing blocks, mismatched track/time counts, decreasing
or non-finite timestamps, and a nonzero first timestamp fail explicitly. Load
failure clears all output, preventing a previous animation from surviving a
failed replacement.

The source-vector Asura position at one second now uses timestamps
0.841413975 and 1.010100961 around keys 12/13. Its independently calculated
position is approximately `(2.91489567, -0.01137936, 1.50579403)`.

## Verification and remaining work

`authored_animation_timestamps` validates the three real files, source-key
positions, loop/end boundaries, a deliberately nonuniform fixture and five
malformed inputs. Existing character and playback checks exercise the new
timing through their normal loading and sampling paths.

The skinned backend now uses the source-derived finite model clock; see
[finite playback and gate ordering](FINITE_ANIMATION_PLAYBACK.md). Native
ChangeAnimation blending, connected STOP -> STD transitions and sounds remain
unfinished. The original generic playback helper remains for unrelated
presentation previews. Correct timing and finite counting do not complete
intro gates or native skinning.

Verified on 2026-10-22: Debug and Release x64 builds pass 44/44 CTest checks.
Both refreshed packages pass provenance checks and gallery/lifetime plus default
intro runtime smoke. The read-only native animation inspection passes. Logs
use `build-ogre-sdl/authored-timing-*`. Visual/skin parity is not established.
