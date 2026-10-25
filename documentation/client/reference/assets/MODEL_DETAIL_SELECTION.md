# Model detail selection

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).

Read-only inspection of the shipped `HT3DHeaven.dll` extends the existing
[binary evidence report](../../evidence/native-model-distance.txt). The inspection
tool verifies the same hash-locked profile; it does not execute native code.

## Native chain

1. Manager slot `1B8` accepts only levels 0..3 and invokes object slot `EC`.
2. Skinned object vtable RVA `67840`, slot `EC`, forwards to its model instance
   slot `160` (code RVA `261BE`).
3. Model-instance vtable RVA `63C18`, slot `160`, stores the level in byte `80`
   (code RVA `B5FA`); slot `15C` reads that byte (`B5F2`).
4. Its constructor at `B62D` initializes the byte to zero.
5. The named-detail path at `23B2E` switches on that value and constructs names
   with `_L1`, `_L2`, `_L3`, `_L4` for levels 0, 1, 2, 3 respectively.
   The exact suffix strings are at RVAs `67828`, `6782C`, `67830`, `67834`.

That named-detail path is conditional on the object's byte at offset `124`;
other base-renderer paths are not thereby proven equivalent. The report
includes that condition to keep the evidence boundary explicit. This does
not establish every internal fallback for a missing record or native bone
skinning.

## Remake behavior

Skinned objects now begin with selected level zero. `setObjectDetailLevel`
accepts levels 0..3 and makes only the matching decoded `_L<n>` records
visible. It does not submit all detail records as simultaneous visible parts.
The existing multipart ASURA fixture has eleven `_L1` parts, so all eleven
remain visible at level zero. White Tiger has one record at each level, so
exactly one of its four records is visible.

Owner visibility is independent of selection: hide/show retains the selected
level, and changing level while hidden does not show the model. Detail state
is per object instance. Invalid levels, including TooFar=4, are rejected without
altering selection. Native callers handle TooFar by removing an object from
the viewing set; it is not an accepted set-LOD value. Missing owners fail.
`getObjectDetailState` reads the actual OGRE movable visibility flags and clears
output for a missing owner. A valid selection with no matching named record
has no visible record; no arbitrary closest-record fallback is introduced.

Additional TMB records now retain their own skeleton-name tables. Creation
requires complete geometry/mappings and identical bone order to the shared
pose binding before submitting any parts. Unknown detail names or incompatible
records fail explicitly rather than silently borrowing root bone order.

## Verification and limits

The White Tiger CPU fixture resolves monster 2077 through ClientRes, binds its
50-bone walk animation, verifies one record at each level and exact vertex
counts (667/538/407/286), and checks finite/changing preview poses and frame-zero
reconstruction for every record. Those pose checks validate the existing
bounded preview, not native skinning parity.

The runtime lifetime probe creates the Tiger model in the diagnostic gallery,
selects all four levels with exactly one visible record each, renders between
selections, checks hide/change/show and invalid-level behavior, creates a
second instance of the same model at a different level, and checks isolation
and destruction. It also confirms that ASURA's eleven level-zero parts remain
unaffected. Smoke verification requires the selection diagnostics and the
completed lifetime check. Visibility counts refer to OGRE object flags, not
pixel-perfect silhouette validation.

Source-ID texture replacement is now covered by the diagnostic lifetime fixture;
see [the texture replacement evidence](MONSTER_TEXTURE_REPLACEMENT.md).

Normal intro gate assembly, automatic world
viewing-set integration, native skinning, finite-loop animation transitions,
and attached effects/sounds remain unfinished. The normal intro continues to
report pending gate presentation; this diagnostic fixture is not substituted
for the native gameplay sequence.

2026-10-22 verification: both x64 builds pass 43/43 CTest checks. Both refreshed
packages pass default intro sequence and gallery lifetime checks, including
the four-level selection and same-model instance isolation checks. Release
capture continues to pass login visibility verification. The read-only binary
inspection tool also validates the new vtable/default/suffix evidence. Logs
use `build-ogre-sdl/native-detail-*`.
