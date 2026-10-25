# World orientation and native FPS/resource overlay

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
Date: 2026-10-23. This is a scoped rendering correction and diagnostic overlay,
not a resumption of the broader paused implementation goal.
This report records its orientation checkpoint. Later
[graphics](../../guides/GRAPHICS_CONFIGURATION.md) and [INTRO alpha](INTRO_TEXTURE_ALPHA.md)
reports retain this behavior; [PROGRESS.md](../../PROGRESS.md) identifies the current build.

## Why the world appeared mirrored

The remake retained native asset positions, placement transforms and camera
eye/target/up coordinates, then used OGRE's default right-handed `lookAt` without
converting the horizontal view basis. For a camera looking along native +Z with
+Y up, native screen-right is **up cross forward = +X**. OGRE's corresponding
camera right is **forward cross up = -X**. Thus the same world was projected onto
opposite screen sides. The UI uses a direct clip-space sprite shader and bypasses
that world-camera projection, explaining why it remained readable.

`OgreBackend::setCameraView` now reflects the horizontal projection row once
after OGRE builds its projection. It regenerates that projection on camera/FOV/
clip changes and resize. Depth, the authored world axes, terrain samples, object
placements, animation matrices and server spawn coordinates are preserved.
This keeps a single camera-boundary conversion rather than editing original data.
Screen-facing particles use the matching native horizontal basis.

OGRE 14.6.1's `OgreMain/src/OgreCamera.cpp::getCameraToViewportRay` unprojects
through the inverse of `projection * view`; the same corrected matrix therefore
handles picking. World ray queries also skip overlay objects, whose infinite UI
bounds must not intercept world picks. The direct UI shader remains independent
of the world projection.

The supplied native renderer implementation is incomplete in this archive;
the correction establishes the retained native left-handed coordinate contract
and verifies it mathematically/GPU-side. It is not a claim of complete native
renderer or pixel parity. The former INTRO particle check's hard-coded -X basis
represented the old OGRE reversal; it now checks +X for its verified +Z camera.

## How the original source draws the line

All source paths below are under `C:\_GitHub\TantraSrc\Tantra\HTlauncher`:

- `HTApplication.cpp:238-254`, `CHTApplication::HT_hrAfterRender`: after rendering,
  when `g_bShowFPS.g_bShowFPS` is enabled, count frames and sample absolute time.
  After more than one second, calculate `frames / elapsedSeconds`, reset that
  interval and pass the most recent FPS to `HT_hrRenderFPS`.
- `HTEngineHandler.cpp:1382-1408`, `CHTEngineHandler::HT_hrRenderFPS`: format
  `FPS: %.02f, Polys: %d, Tex: %dKB, VBIB: %dKB, E:%d,S:%d`. Polygons are
  `m_nModelPolyCount + m_nTerrainPolyCount`; memory totals are divided by 1024;
  E/S come from the engine-object/shared-object count accessors. It requests
  `HT_FONT_ARIAL_20`, white RGBA `(1,1,1,1)`, position `(0,0,0)`.
- `HTEngineHandler.cpp:1273-1362`: clear the polygon counters, count terrain and
  represented viewing objects, then add grass polygons. These are not all
  possible overlay/effect/UI triangles in a frame.
- `HTEngineHandler.cpp:4477-4514`, `HT_hrRenderText`: the font-selection switch
  is commented out in this source revision, so the actual selected font object
  is `m_idFontGulim12`. The remake uses the corresponding existing locale font
  rasterizer instead of assuming the requested enum guarantees Arial 20.
- `HTextern.h:477` initializes the legacy flag off. `HTChatting.cpp:1608-1623`
  handles `/@HT showfps on` and `/@HT showfps off`. The remake enables the line
  directly by default as requested; it does not require that legacy chat command.

## Remake measurements

`FrameStatsPresentation` creates a white, transparent-background UI bitmap at
window pixel `(0,0)` above the normal UI, with depth testing disabled. Real
wall-clock intervals and successfully rendered frames drive FPS; deterministic
test animation time does not fabricate it. The line refreshes approximately
once per second, with an initial sample after the first regular frame. It stays
visible through INTRO, loading and the world. Numeric fields use 64-bit totals
while preserving the requested visible format and integer KB division.

The original engine memory/object counters are not exposed by OGRE. These are
explicitly **OGRE equivalents**, not invented values or exact legacy totals:

| Field | Live measurement |
| --- | --- |
| FPS | Successfully rendered application-loop frames / actual elapsed seconds |
| Polys | World triangles submitted in the last rendered frame, observed through OGRE's render-object listener; direct screen-sprite UI triangles excluded |
| Tex | Logical bytes of allocated D3D11 2D texture resources, including actual uploaded mip levels and array faces; includes manual UI textures |
| VBIB | Sum of distinct allocated vertex/index buffer capacities referenced by current ManualObject sections; shared buffers counted once |
| E | Current ManualObjects, Entities, Lights and the main camera, including hidden owned UI objects |
| S | Allocated 2D texture resources plus loaded material/mesh resources in OGRE's shared managers |

Tex/VBIB are allocation payload measurements, not total GPU process residency,
driver padding, shader memory or CPU cache usage. The current world/characters/UI
use ManualObjects; adding other renderer object families requires extending the
buffer accounting. OGRE's general resource-memory counter alone omits the manual
UI textures, so the texture total uses actual D3D11 resource descriptors.

## Verification

`native_camera_stats_probe` verifies both +Z and -Z views using world markers at
X -1/+1, native expected screen sides, actual camera picking and resizing. It
renders the stats sprite and checks its GPU position, visibility, depth state and
texture readback. Exactly 24 marker triangles are counted with overlay triangles
excluded; texture/buffer/object totals are populated. A real-time render interval
also checks that FPS advances above zero.

Evidence: `build-ogre-sdl/camera-stats-gpu.log` and the captures in
`build-ogre-sdl/camera-stats-gpu/`. Focused Release CTest passes 3/3:
`native_main_camera_source_order`, `native_main_hud_source_layout` and
`native_main_ui_interaction`. The normal offline Mandara runtime and final
executable binding are recorded in the current progress tracker.

The [root README](../../../reference/SOURCE_WORKSPACE_README.md#reference-files-and-paths) now lists reference
source files, authored XML/XLS, native UI files, runtime catalogs/assets, selected
zones, OGRE inputs and implementation guides with their workstation paths.

Normal audio-enabled offline `ashesh` / `ashesh` create-to-Mandara route 1 also
passes with the staged `_client/HTLauncher.exe`. Sixteen captures and the
executable binding are in `build-ogre-sdl/camera-stats-runtime/VERIFIED.json`.
The world capture was visually inspected; its live line reads
`FPS: 13.63, Polys: 104195, Tex: 39925KB, VBIB: 36197KB, E:6644,S:2169`.
These values describe that sampled frame/session, not a performance guarantee.
Normal dialog toggles/dragging/close and calculated status still pass; the
separate GPU MainUI probe also passes. Final inventory verification passes all
2,384 files, x64 imports, native layout and exact icon payload. Normal SQLite
and saved-ID files remain byte-identical.

Final executable SHA-256:
`fe55b3299e2d2198d2c59a6fb8c3af1f93232b8c7631641ea5150e52a54fe173`.
Build logs are `build-ogre-sdl/camera-stats-final-build.log` and
`camera-stats-app-build.log`; GPU logs are `camera-stats-gpu.log` and
`camera-stats-hud.log`; focused CTest is `camera-stats-ctest.log`.
No full-suite, Debug, relocation or additional village-route rerun is claimed
for this slice.
