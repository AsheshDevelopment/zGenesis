# FX range, grass stability, culling, batching, LOD and telemetry

Updated: 2026-10-25. Release x64 / OGRE Classic 14.6.1 / D3D11 / SDL3.
Implementation/build evidence is separate from a rendered performance result.

## Changes

- [x] Extend visual FX distances by **3x**: sprite systems, sprites, models and
  their dynamic lights. The authored HTSpec distances remain the base values.
  Sound and camera-jitter distances retain their native values.
- [x] Allow up to 128 nearby persistent field effects instead of 32, while
  retaining nearest-first ordering and the existing two-upload creation budget.
  Effects beyond the former radius can take several frames to become ready;
  the larger distance is not permission for unbounded synchronous loading.
- [x] Add private `[REMAKE] FXVisualDistanceScale` override in HTStartup.cfg,
  valid 1-6, default 3. No canonical CFG files are rewritten.
- [x] Correct world sampler setup order. Previously anisotropy was applied
  before texture units were created. Apply anisotropic filtering after binding
  world textures, and to both terrain layer/detail samplers.
- [x] Build derived, alpha-coverage-preserving mip chains for uncompressed
  static grass cutouts. Preserve the original top-level RGBA samples and all
  original asset files. Alpha-weighted colour downsampling reduces dark fringes.
- [x] Use a small grass-only negative constant/slope depth bias against
  coplanar terrain. Keep the separate water/INTRO/premultiplied blend paths.
- [x] Keep finite spatial world batches for OGRE frustum/distance rejection.
  Retain 640-source-unit batch regions and apply native GrassArea/LODFar bounds.
- [x] Merge compatible static opaque/cutout geometry across resource IDs by
  texture and effective material state. Map-overridden RGB values and zero
  specular power no longer create artificial batch differences. Source material
  state still distinguishes surfaces when it can affect the actual shader.
  True blended surfaces retain placement/group identity for sorting.
- [x] Frustum-cull world actor parts before CPU skinning/upload using an
  expanded authored/bind-model envelope. Socket children follow parent culling.
  Playback/transition clocks still advance; returning actors sample current time.
  Actor caster submission follows this view set, rather than retaining stale
  offscreen shadow poses. Check camera-edge/caster behavior in visual acceptance.
- [x] Share evaluated poses among compatible body parts per frame, and evaluate
  a shared socket parent's pose once per socket-update pass.
- [x] Apply source camera-distance character LOD to world player/NPC/monster
  models, using CharLOD1/2/3/LODFar and `_L1` through `_L4` records. The native
  active computation does not use the previous level. Cache unchanged requests;
  choose a more detailed available record if a model lacks the requested level.
  Socket models with only one level remain visible through that fallback.
- [x] Expand the original FPS header with one metric per subsequent line:
  framerate, average frame time, window draw calls, all-pass submissions,
  shadow draws, world polygons, submitted vertices, loaded static batches,
  updated/culled skin parts, process CPU, process GPU and memory usage.
- [x] Sample/rasterize these statistics once per second. Keep the original
  native-format FPS/Polys/Tex/VBIB/E/S line for comparison.

## CPU evidence and what the counters mean

The source-data audit gives **5,742 previous static batches -> 3,721 new static
batches** (2,021 fewer, approximately 35.2%), retaining **380,497 object
triangles**. This is a count of loaded spatial/material batches. It does not
establish visible draw-call reduction at a particular camera or an FPS increase.

| Counter | Scope |
| --- | --- |
| Framerate/frame time | Rendered frames over the sampling interval; frame time is the average reciprocal, not a GPU timestamp |
| Window draw calls | OGRE RenderTarget's last-update batch count |
| All-pass submissions | Render-object submissions seen by the scene listener, including UI/shadow passes |
| Shadow draws | Caster/receiver submissions seen by that listener |
| Polygons | Submitted non-screen world/sky/FX triangles, excluding the separate shadow count |
| Vertices | Sum of submitted vertex spans across passes, not unique scene vertices or measured GPU invocations |
| Static batches | Loaded object batches, not an assertion that every batch is visible |
| Skin updated/culled | Active-detail parts skinned versus rejected by the conservative view envelope |
| CPU | This process's kernel+user time, normalized over logical processors |
| GPU | This process's busiest reported Windows GPU engine; not whole-machine GPU usage |
| Working set/private commit | Process resident working set and committed private memory; private commit is not all resident RAM |

GPU measurement uses Windows language-neutral PDH GPU Engine counters and a
wildcard counter-array read scoped to the process ID. Missing providers,
unsupported drivers and insufficient samples display **unavailable**, rather
than a fabricated zero or an inferred value from FPS. References:
[PdhAddEnglishCounter](https://learn.microsoft.com/en-us/windows/win32/api/pdh/nf-pdh-pdhaddenglishcounterw),
[PdhGetFormattedCounterArray](https://learn.microsoft.com/en-us/windows/win32/api/pdh/nf-pdh-pdhgetformattedcounterarrayw).

Batching retains spatial and material boundaries because merging large regions
trades culling granularity for fewer submissions. See the
[OGRE batching/instancing documentation](https://ogrecave.github.io/ogre/api/latest/_instancing.html).
This change uses static geometry merging; it does not claim hardware instancing.

## Native references

Root: `C:\_GitHub\tantra-dev-main\_references\Tantra`.

- `HTlauncher\HTMapSystem.cpp:1041`: visible-object LOD selection and TooFar removal.
- `HTlauncher\HTMapSystem.cpp:2128`: object LODLow1/2/3/LODFar active branch.
- `HTlauncher\HTMapSystem.cpp:2206`: character CharLOD1/2/3/LODFar active branch.
- `HTlauncher\HTEngineHandler.cpp`: source FX visibility/configuration and camera unit boundary.
- `C:\_GitHub\TantraSrc\TantraClient\system\HTSpec.cfg`: native HIGH distances,
  including character 100/200/400/3200, object 500/1000/2000/3200 and GrassArea 1000.

Object LOD ranges are now parsed/validated; static object far/grass limits are
used. Full authored static-object LOD import and adaptive terrain LOD are not
newly implemented by this task. No invented mesh decimation substitutes for
missing original detail data. Existing actor streaming/population scope and
missing native `.tbo` collision remain separate parity limits.

## Owned implementation files

Under `C:\_GitHub\tantra-dev-main\_remake`:

- `src\resources\ClientRenderProfile.*`, `CoverageMipmaps.h`.
- `src\compatibility\HtModelLod.h`.
- `src\rendering\HtRenderFacade\WorldSceneFxPresentation.h`, `WorldDrawPolicy.h`.
- `src\rendering\HtRenderFacade\FrameStatistics.h`, `FrameStatsPresentation.h`,
  `ProcessTelemetry.h`, `HtRenderFacade.*`.
- `src\rendering\OgreBackend\OgreBackend.*`, `src\app\tantra_remake_main.cpp`.
- `src\tools\render_optimization_probe.cpp`, `CMakeLists.txt`.

## Verification / acceptance

- [x] Pass 428 focused CPU checks covering actual Mandara batch identities,
  triangle totals, material overrides, transparency separation, FX distances,
  source LOD/fallback, grass mip generation and telemetry formatting/math.
- [x] Pass existing scene FX and exact lighting/shadow HLSL compile/link checks.
- [x] Compile/link the Release x64 launcher with PDH/PSAPI support.
- [x] Rebuild/overwrite both clients; each passes static package checks for
  1,731 staged files. All 148 HPKs per output and 44 existing offline-profile
  files are unchanged. Launcher SHA-256:
  `78a1035f53a5015ef7d83d4b803f407edf257fd892ff4bd6b40ab1fd81d5147f`.
- [ ] Accept grass edges/depth while moving, actor/attachment/caster behavior
  around frustum edges, native LOD transitions and the extended FX radius.
- [ ] Verify GPU counter availability/values and measure actual same-camera
  CPU/GPU frame time and draw submissions on the user's hardware.

No game, renderer, server or audio-device process was launched. No FPS improvement
is claimed from CPU fixtures. The broader goal remains paused; no visual
acceptance gate is closed, and no commit/push was requested.

[Build, staging and preservation evidence](../evidence/render-optimization-20261025.json).
