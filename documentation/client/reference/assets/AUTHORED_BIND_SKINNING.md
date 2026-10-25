# Authored TMB bind-matrix skinning

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).

The skinned OGRE backend now uses the authored TMB skeleton matrices instead
of deriving a bind pose from an animation's first frame. The earlier preview
methods remain available for diagnostics; they are no longer the backend's
ordinary skinning path.

## Native evidence and implementation

`tools/inspect-native-skinning.py` validates the supplied engine hash and saves
[read-only disassembly evidence](../../evidence/native-skinning.txt):

- TMB resource loading calls skeleton reader RVA 2F8DC. It reads the sixteen
  stored matrix words into each bone's fields 48 through 84, derives a local
  bind matrix, then recursively reads children.
- Bone evaluation at 2EAAE transposes the stored matrix, builds the animated
  local rotation/translation, and composes it with the parent hierarchy.
- The final transform at 2ED59 inverts the transposed bind matrix and multiplies
  it by animated world pose. In the remake's equivalent column-vector notation,
  this is `animatedWorld * inverse(fileBindWorld)`.
- CPU skinning at 36C0B transforms the group's source position with that bone
  matrix, multiplies by the stored weights and adds subsequent contributions.
  It does not renormalize their sum. The inspected kernel updates positions;
  original normal/UV attributes are retained by this path.

`NativeSkinningMath.h` provides matrix construction, multiplication and inverse.
Validated inverse bind matrices are cached when a character binding loads.
Animated hierarchy matrices are composed directly, retaining affine matrix
effects instead of reconstructing everything from a world quaternion.
`applyNativeBindSkinning` applies the original weights without division by their
sum. Every detail record uses the same owner's authored bind reference during
playback, STOP and ChangeAnimation.

Singular/non-finite bind matrices are rejected by this supported importer
profile. The inversion uses double intermediates and outputs float matrices;
it does not claim bit-identical results to all original x87/SIMD dispatch paths.

The population audit also covers Shaman's 50-influence groups, preserving every
authored weight. The previous arbitrary 16-influence cap is removed within the
file's declared skeleton bounds. Varaha's supplied mesh has `joint49` where its
standing TAB has `joint100`. Native name lookup at RVA 2DE71 and the key setter
at 2EDDF confirm that a missing name skips that branch. The remake retains the
constructor-equivalent initial identity rotation/zero translation keys for that
branch instead of aliasing an unrelated ordinal or rejecting the whole actor.
Non-control bind translation still depends on the explicit legacy mode. Exact
retention of a previously animated missing branch across unrelated animation
changes remains a parity gap; this fallback establishes initial population.

## Legacy character-position mode

The source character path sets the legacy change-armor parameter at
`HTEngineHandler.cpp:2414-2422`; the GM branch differs. In the binary, the
corresponding flag reaches resource byte 360. The local-pose routine uses a
name search for `control`: when the mode is enabled, bones without that
substring use bind-local translation, while control bones retain animation
translation. The same rule applies during blending.

The skinned factory now exposes `bindNonControlPositions`. The Asura character
preview enables it explicitly; generic single-mesh monster fixtures retain
their separate mode. This parameter is not guessed from filenames inside the
renderer. The inspector camera evaluates the same flagged pose path.

## Verification and visual limits

The authored-bind probe checks scaled/rotated/translated inverse matrices,
bind-pose restoration across all fifteen decoded Asura/Tiger records, animated
finite positions, raw non-unit weight sums, invalid bone rejection, singular
bind rejection, and the non-control position override using a modified copy
of an animation. Canonical input files remain unchanged.

Use `--asset-gallery --inspect-character` for the diagnostic Asura view. It
hides gallery overlays/other character samples and frames the current decoded
character bounds. This is separate from normal startup. A captured inspection
image is at `build-ogre-sdl/authored-bind-gallery.png`.

The capture is not proof of full model or scene parity. Character surface and
appearance coverage still need comparison against the native client, including
the complete geometry/material/appearance assembly. Native GPU modes and every
flag combination are also unverified. Normal intro gate assembly, sounds and
the rest of the implementation plan remain unfinished.

Verified 2026-10-22: Debug and Release x64 builds pass 49/49 CTest checks.
Both refreshed packages pass provenance validation and runtime smoke through
finite playback, STOP, ChangeAnimation and normal intro sequencing. The native
skinning disassembly verifier passes. A 1024x768 inspector capture was reviewed;
it is diagnostic evidence, not a native-client visual comparison. Logs use
`build-ogre-sdl/authored-bind-*`. The full implementation plan remains open.
