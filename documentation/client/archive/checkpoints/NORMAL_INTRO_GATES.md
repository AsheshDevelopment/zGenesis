# Normal intro gate assembly

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.
The original HTLauncher is the specification. This implements the gate-model
subset of normal startup (`g_byReStartCode=0`), using OGRE x64 and SDL3.
The complete remake and complete native visual parity remain unfinished.

Subsequent [rigid material decoding](../../reference/assets/INTRO_MAP_MATERIALS.md) restores the temple
geometry and its original textures around these gates. Its 51-test baseline
supersedes the 50-test component snapshot below.

## Source order

`Tantra/HTlauncher/HTIntroManager.cpp:711-772` waits for an actual logo frame,
loads intro resources, enables the world, hides the logo, queues login and
loads initial map objects before creating the gates. The implemented gate
operations preserve this order:

1. Create monster 2077 at the origin, apply its catalog texture, rotate by PI.
2. Create the second monster in the same way, then rotate it by PI.
3. Move gate 0 to `(1154,105,216)`, set yaw `PI-PI/4`, scale 3, start WLK once.
4. Move gate 1 to `(1398,105,216)`, set yaw `PI+PI/4`, scale 3, start RUN once.
5. Create null anchors at `(1192,173,160)` and `(1359,173,160)`.
6. Queue looping fire 1300143 on each anchor. The
   [native fire adapter](../../reference/presentation/NATIVE_INTRO_FIRE_RUNTIME.md) creates and updates the
   authored emitters in the later engine FX phase.
7. Read the clock separately for each gate timer and add 1000.
8. Start the look and eye moves toward LOGIN; expose login after camera completion.

`compatibility/HtIntroGateScene.h` executes callbacks immediately, rather than
sorting or deferring them. `IntroGatePresentation` resolves catalog model 12083,
texture 13086 and the original TAB clips. Skinned creation prepares binding data
without starting playback or exposing an unanimated mesh; only the later
StartAnimation activates it. Source coordinates are retained for distance/LOD
and scaled by 0.001 at the renderer boundary. Each owner has four detail records.

## Update and animation behavior

`HTIntroManager.cpp:980-1000` updates the camera before its animation check.
`HTWindowManager.cpp:154-200` runs ready-game control before engine update/render;
`HTApplication.cpp:176-183` and `HTEngineHandler.cpp:1206` then advance animation.
The implemented subset follows camera -> gate checks -> LOD -> animation -> FX -> render.
It observes STOP from the preceding engine update and requests STD with -1 loops
before scheduling random motions. It retains the source blend clock, strict
timer comparisons, shared random choice and per-gate offsets.

Skill 3612 resolves through the intro FX catalog, with the native ATK1 fallback
when no nonzero animation override exists (`HTEngineHandler.cpp:12022-12052`).
The [motion sound adapter](../../reference/presentation/NATIVE_INTRO_MOTION_SOUNDS.md) now retains ordinary
ATK2 and skill sound-selection RNG consumption and immediate finite playback.
Initial WLK/RUN starts remain silent, as required by StartAnimation's monster
branch. Login-delay, stop-all and post-login event integration are
not complete; normal startup currently supplies their inactive state.

## Explicit camera up

`HTEngineHandler.cpp:428` supplies `(0,1,0)` as camera up. OGRE SceneNode defaults
to free yaw, whose shortest rotation toward the source's positive-Z camera
direction introduced roll. `CameraView` now carries the explicit up vector;
the backend sets the fixed yaw axis before looking at the target. Invalid,
zero or direction-parallel up vectors are rejected. Runtime verification reads
the actual OGRE camera eye, direction and up after rendering. At the final
LOGIN pose it requires positive-Z direction and positive-Y up.

## Validation and limits

2026-10-22: Release and Debug x64 builds each pass 50/50 CTest checks. The new
`source_intro_gate_assembly` probe checks callback order, transforms, separate
timer reads and real/synthetic skill-animation lookup. Both refreshed packages
pass runtime smoke, including the gallery lifetime checks and normal intro
trace. The intro fixture uses an explicit deterministic 30 Hz clock for 240
frames; production uses elapsed time and `timeGetTime`.

Runtime checks validate all 18 logged assembly operations, dormant model
creation, both STOP-to-STD transitions, actual transforms and detail masks,
null anchors and the final camera orientation. These are scoped assertions,
not a comparison against a running stock client. The final camera assertion
requires the completed LOGIN camera move.

Evidence under `build-ogre-sdl`:

- `intro-gates-{release,debug}-build.log` and corresponding `*-tests.log`.
- `intro-gates-runtime-{release,debug}.log` and `intro-gates-*-package.log`.
- `intro-gates-upright.png`: real normal-start capture with both textured tigers
  upright beside the login panel. It also shows the incomplete background.

The selected fire and finite motion sounds are now integrated. Initial map placements 25/26 reference
a missing `in_Str_stone_main_01.tmb`; complete map/terrain/sky presentation,
geometry/material/appearance parity, native viewing-set/frustum behavior,
interactive login controls and subsequent network states remain unfinished.
No original source, assets or data scripts were modified.
