# Ground-click FX and grass stability — 2026-10-25

Implementation checkout: `C:\_GitHub\tantra-dev-main\_remake`.
Requested deployment: `C:\_GitHub\TantraSrc\_client\HTLauncher.exe`.

## Recording and findings

Inspected `C:\Users\Ashesh\Videos\Recording 2026-10-25 224806.mp4`:
3.467 seconds, 30 FPS, 1020 × 806. Extracted frames show speckled grass coverage
while the character and camera move. The recording alone does not establish
which GPU state caused every unstable pixel.

The ground-click input path submitted movement without requesting an FX group.
The grass pass used `setDepthBias(-1,-1)`. In the supplied OGRE D3D11 backend,
`_setDepthBias` negates the logical constant and slope values, so those negative
values pushed grass away from the camera, encouraging terrain/grass depth
conflicts. The earlier patch's sign was incorrect.

The texture audit found 12 Mandara grass textures with cutout alpha and no
premultiplication. They are uncompressed DDS, so the existing coverage mip path
already applied to this dataset. A skipped compressed-texture mip path is a
separate code gap, not the established cause of this recording.

## Original source references

- `_references\Tantra\HTlauncher\HTMainCharacter.cpp:2107`:
  `HT_vDrawPickMapEffect` plays sound `33525`, stops the previous marker,
  moves its null parent to the picked point, and starts looping terrain FX.
- The same function chooses `HT_FX_TERRAINTARGETING` (`1010009`) for walkable
  ground and `HT_FX_NOMOVETARGETTING` (`1010012`) for blocked ground.
- `HTMainCharacter.cpp:2128`: `HT_vInterface_Pick_Map_CheckEffect` stops
  that loop when movement stops.
- `_references\Tantra\HTlauncher\HTFXIDDef.h`: native FX IDs.
- `_references\Tantra\HTlauncher\HTMapSystem.cpp:2060` onward: native grass
  visibility and distance presentation.
- `C:\Users\Ashesh\Downloads\OGRE\ogre-14.6.1\ogre-14.6.1\RenderSystems\Direct3D11\src\OgreD3D11RenderSystem.cpp:1483`:
  logical bias conversion, including the reverse-depth adjustment.

The original FX are resolved through `fxPC.txl`, `fxPCEtc.tfx` and their existing
HPK-backed model/animation/texture families. No new effect art was substituted.

## Changes

- [x] Connect ground picking to the native walkable/blocked FX IDs and picked
  surface position, retaining authoritative movement validation.
- [x] Replace the prior ground marker when clicking another point.
- [x] Stop the marker when movement stops; cancel it on actor/item interaction
  and manual movement.
- [x] Request the original click sound from the existing sound catalog.
- [x] Correct grass logical depth bias to `(1,1)` so it separates toward the
  camera; preserve alpha cutout, depth writes and filtering.
- [x] Extend the grass coverage-mipmap path to supported compressed DDS using
  the existing CPU BC decoder. Mandara's uncompressed top mip remains unchanged.
- [x] Test ground FX loading/replacement/cleanup against actual authored data.
- [x] Audit the actual Mandara grass textures and exercise compressed coverage
  generation separately with a BC1 cutout fixture.
- [ ] Accept ground marker appearance and grass stability during movement in
  a user-run offline client.

The CPU scene fixture passed **9144 checks**. The render/asset fixture passed
**455 checks**, retaining 3721 static batches and 380497 source object triangles.
Those are resource/CPU results, not measured runtime draw calls or FPS.

## Files

- `_remake/src/compatibility/NativeWorldFeedback.h`
- `_remake/src/rendering/HtRenderFacade/WorldSceneFxPresentation.h`
- `_remake/src/app/tantra_remake_main.cpp`
- `_remake/src/rendering/OgreBackend/OgreBackend.cpp`
- `_remake/src/tools/world_scene_fidelity_probe.cpp`
- `_remake/src/tools/render_optimization_probe.cpp`

Local captures and logs:
`C:\_GitHub\tantra-dev-main\.migration-local\ground-fx-grass-20261025`.
Build/deployment status is recorded in
[the evidence file](../evidence/ground-click-grass-20261025.json).
No game/renderer/audio device was launched for these checks.
