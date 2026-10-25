# Native TFX, environment lighting and materials

Updated: 2026-10-25. Implementation and CPU/build evidence are distinct from
visual acceptance. The broader completion goal remains paused.

The later [screenshot/options/cursor fixes](PRESENTATION_OPTIONS_NAMES_AND_CURSOR.md)
restore attached-model Euler/yaw, correct lighting clamp order and add filtered
shadows. Earlier hashes below retain their original scope.

## Implemented

- [x] Share the field/target/PC combat interpreter, preserving original TFX/TXL
  names, catalog categories and folder-relative HPK resource lookup.
- [x] Support particle template modes 0-5, their native template RNG counts,
  burst/age/velocity variation, integration, scalar/color curves and incremental
  rotation about the native emitter basis. Euler values increment per update;
  they are not treated as radians per second.
- [x] Remove the former 64x64-only particle texture restriction. Texture metadata
  supplies sprite dimensions; valid textures up to 8192 pixels per axis work.
- [x] Draw type-2 billboards, including authored dimensions, color/scale curves
  and the represented normal-oriented mode; use the existing animated type-4
  model path for target markers and other effects.
- [x] Interpret type-5 local point lights: source color curves, attached actor
  bounds-based range and native (0, .1, 0) distance attenuation. The shader uses
  at most eight nearest active lights; cleanup removes expired/hidden lights.
- [x] Apply type-7 camera-jitter scalar curves with three native CRT words per
  visible update, modulo 200, centered at -100 and scaled by 0.000001. Apply
  the transient offset to the freshly calculated camera, avoiding drift.
- [x] Gate effect families with HTSpec.cfg visibility distances and source
  priority rules. Stop/restart field sound voices as visibility/active time changes.
- [x] Release animated FX through owner-aware skinned-object cleanup.
- [x] Apply the map's CHARACTERLIGHT position/direction/range/cone and
  diffuse/ambient/specular colors relative to the main character.
- [x] Retain native TMB diffuse, ambient, specular, emissive and power values
  on world groups, skinned records and rigid equipment/props. Apply the map's
  corresponding material color overrides. Preserve cutout/blended texture paths.
- [x] Retain CFG-driven sun/sub-light, sky/clouds/stars/celestial bodies/flares,
  fog and terrain detail from the existing environment implementation.
- [x] Skip character spotlight calculations on terrain/object shaders and cache
  local-light selection rather than allocating/sorting on every object draw.
- [ ] Accept visual/audible behavior in an authorized offline run.

## Canonical references

Native source root: `C:\_GitHub\tantra-dev-main\_references\Tantra`.

| Reference beneath that root | Used for |
| --- | --- |
| `HTlauncher\HTEngineHandler.cpp:6905` | PC/map FX managers and per-family visibility settings |
| `HTlauncher\HTEngineHandler.cpp:7123` | Map load/configuration and material/light values |
| `HTlauncher\HTEngineHandler.cpp:5671` | Character light creation and main-character-relative anchor |
| `HTlauncher\HTEngineHandler.cpp:8500` | FX lookup and attachment dispatch |
| `HTlauncher\HTFXResMgr.cpp` / `.h` | TXL categories, effect names, priority and attachment fields |
| `HTlauncher\HTFXIDDef.h` | Historical effect identifiers; shipped TXL IDs take precedence |
| `inc\HT3D.h:512` | Light fields and engine interface |

Original files are read from `C:\_GitHub\TantraSrc\TantraClient`:

- `resource\fx\fxPC.txl`, `fxPCEtc.tfx`, race/god/free TFX documents;
- `resource\fx\fxMAPMandara1st.txl` and `fxMAPMandara1stField.tfx`;
- original Model/Animation/Texture/Sound HPKs in `resource\fx`;
- `resource\map\MAP_Mandara1st.cfg` and TML field placements;
- `system\HTStartup.cfg`, `system\HTSpec.cfg` and `system\ClientRes.txl`.

The available engine headers omit full FX implementations. For missing runtime
semantics, `_remake\tools\inspect-native-particles.py` inspects the original
`HT3DHeaven.dll` **read-only**, pinned to SHA256
`b818b89edbc9f8e49bb1b79200371740eaa157dabac23bbf1e2d52e40ff99941`.
It does not execute that DLL. Evidence includes particle mode dispatch, per-update
rotation, attached-light bounds and jitter sampling. The shipped TXL uses IDs
1010015/1010016 for tested camera jitter and 1010018-1010020 for local lights;
the historical header's 1101003-series IDs are absent in this client catalog.

## Owned implementation

Paths below are relative to `C:\_GitHub\tantra-dev-main\_remake`:

- `src\compatibility\HtNativeParticles.*`, `HtNativeIntroFire.*`;
- `src\rendering\HtRenderFacade\WorldSceneFxPresentation.h` and the
  shared `WorldCombatPresentation.h` alias;
- `src\rendering\OgreBackend\NativeWorldLighting.h`, `OgreBackend.cpp`;
- `src\resources\ClientRenderProfile.*` and existing TFX/catalog/resource readers;
- `src\app\tantra_remake_main.cpp` for camera/light-anchor integration.

## Verification and remaining limits

Focused checks use original resource bytes and CPU renderer doubles. Shader
compilation/reflection checks cover the actual world, alpha, terrain and socket
shader signatures, plus existing sky/cloud/star/celestial/flare shaders. This
checks linkage; it does not establish final GPU appearance or performance.

- [x] Release x64 rebuild and overwrite of both client outputs; static package checks passed.
- [x] Preserve all 148 HPKs in each output and 44 existing offline-save files.
- [x] Pass 10,055 combat/FX checks, 1,022 scene checks across day/night field
  placements, particle math and CPU HLSL compilation/linkage checks.

[Build, staging, preservation and fixture results](../evidence/native-tfx-lighting-20261025.json).

- [ ] Full node parent/socket graph, moving-emitter coordinate modes, model
  pitch/roll and all billboard orientation/UV-scroll/blend variants.
- [ ] Full light-type and original per-object light selection parity. Supplied
  type-5 records use point type 1; other types report unsupported diagnostics.
- [ ] Whole-engine RNG state/order, exact sprite rasterization, all skill/projectile
  gameplay routes and exhaustive per-effect visual/audio comparison.
- [ ] Transient mesh-material cache reuse/eviction and long-session resource acceptance.
- [ ] Native text/IME and remaining hotkey service acceptance, documented separately.
- [ ] Full water/TME, weather, grass, dynamic loading, exact sky/stars/flares and
  shadow/light/material parity. Existing represented environment behavior remains
  implemented; this change does not close the environment acceptance phase.

No game, renderer, server or audio-device process was launched. CPU fixture draw
counts are test coverage, not FPS measurements. No commit or push is included.
