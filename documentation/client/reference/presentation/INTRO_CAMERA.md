# Intro camera and scene baseline

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
`HTIntroManager.cpp:96-105` declares ten camera pairs as look followed by eye.
Index 1 (login) looks at `(1276,150,100)` from `(1276,150,-150)`. The code
assigns those entries to look/eye controllers at lines 767-768.
`TantraClient/system/HTStartup.cfg` supplies camera near=5 and fov=45.91.

The default remake now applies those source-profile values through a typed
`CameraView` facade descriptor. Current resource rendering uses 0.001 units per
source unit, so the eye is `(1.276,0.150,-0.150)` and near=0.005. OGRE uses a
vertical FOV supplied by the startup profile and the selected spec's CamFar.
The native camera
implementation is absent; native handedness, FOV axis, far-distance behavior,
and animated intro camera transitions still require verification. These
profile values are now loaded dynamically from the startup/spec files; see
[render profile evidence](../assets/MONSTER_GEOMETRY_AND_LOD.md).

The terrain previously centered its grid around the renderer origin while TML
placements retained positive source translations. It now uses positive X and
inverted source Z without that centering offset. The existing ten-unit grid
spacing remains in use; collision code defines a ten-unit cell size, but the
relationship between THM samples and collision cells is not established by
the missing engine implementation. The 128x128 Intro THM alone cannot prove
its world extent. Further terrain layout evidence is required.

The default intro no longer submits unrelated item/character/effect previews
or orange unresolved-object markers. `--asset-gallery` retains those assets
with the diagnostic camera for renderer and lifetime verification. Missing
source meshes emit `MAP_MESH_UNAVAILABLE` warnings. The remaining source TML
mesh submission still lacks full transform/material parity.

Camera validation rejects nonfinite parameters, coincident/vertical-only
eye-target pairs (the fixed up direction is Y), invalid FOV, and invalid clip
ranges. Terrain probes check origin, extent, height retention, and out-of-range
coordinates. Runtime smoke launches both gallery and default intro, preserving
their diagnostics separately. Capture visibility checks remain UI-focused and
do not establish that the native 3D scene is reconstructed.

2026-10-22 verification: Debug and Release builds and 38/38 CTest checks passed
in each configuration. Both packages passed gallery lifetime and default intro
smoke launches. Release capture passed the login artwork visibility check.
Logs use `build-ogre-sdl/source-camera-*`.

Live resource inspection found only one entry in `IntroObjTmb.hpk`:
`in_Str_stone_sub1_01.tmb`. Placements 25 and 26 reference
`in_Str_stone_main_01.tmb`, which is not present as a loose file or in that
archive. Do not treat those two placements as rendered. Source loading also
hides the Kathana logo after intro resources load (`HTIntroManager.cpp:721`);
that visibility transition is now implemented for normal startup as described
in [the source sequence trace](../lifecycle/SOURCE_SEQUENCE.md). Restart and later UI
transitions remain unfinished.
