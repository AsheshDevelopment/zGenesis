# Map-driven sky and world time

The normal x64 client reads the selected map's configuration at world load,
including `C:\_GitHub\TantraSrc\_client\resource\map\MAP_Mandara1st.cfg`.
There is no Mandara-specific atmosphere preset in the renderer. Available map
content and travel support remain separate from the generic configuration path.

| Native configuration | Runtime behavior |
| --- | --- |
| `MAP.ClearColorR/G/B` | Background clear color |
| `SKY.TMD`, `SkyTerrain`, `SkyTerrainHeight` | Original sky/cloud geometry and camera-relative distant landscape |
| `SKY.*SkyHigh/Mid/LowHeight`, `*SkyHigh/Mid/LowColor` | Six native dawn/day/dusk/night interpolation branches |
| `SKY.Texture1/2USpeed/VSpeed`, `*SkyCloudColorA/R/G/B` | Independent original cloud masks, UV scrolling and interpolated tint/opacity |
| `SKY.NumOfStar`, `StarMin/MaxR/G/B` | Configured point count and color range; stars visible at night |
| `SUN.sunfile`, `MOON.moonfile`, `scaleX/Y/Z` | Original ENVTEX sun/moon textures and configured sprite scale; daytime sun and nighttime moon |
| `TIME.DayTime/NightTime`, `startposX/Y/Z`, `rotationaxisX/Y/Z` | Source time normalization, orbital position, directional light and shadow direction |
| `FOG.isenablefog/israngebasedfog`, `start/end`, `colorR/G/B`, `TIME.*Fog*` | Linear/range world fog with authored time transitions |
| `SKY.Fog` | Independent sky/cloud fog participation; false keeps world fog from flattening the sky |
| `TIME.Update=false` | Atmosphere rendering disabled, matching the native outdoor-render gate |

The original `c1.tga`/`c2.tga` cloud textures have black RGB with cloud shapes in
alpha. Cloud shading now applies the authored cloud color to this mask instead
of blending black texture RGB into the sky. Gradient, stars, sun/moon, cloud and
horizon passes follow the normal native render order, with world geometry drawn
after them. The camera-relative geometry updates after the final camera update
each frame. UI remains outside the fog/lighting path.

The ten original flare textures are staged from `ENVTEX.hpk`. The texture order,
default sizes and axis placement factors were inspected read-only in the supplied
`HT3DHeaven.dll`. Flares use additive screen rendering before UI and disappear
at night, behind the camera, outside the viewport or behind terrain/placed
triangles. A ray leaving the map bounds is treated as open sky.

## References and implementation

- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTEngineHandler.cpp`:
  `HT_hrLoadMap` at 7122, sky/star creation at 7320, normal render order at 1305,
  `HT_hrSetInitTime` at 5188 and `HT_hrUpdateWorldTime` at 8857.
- `C:\_GitHub\TantraSrc\TantraClient\resource\map\*.cfg`:
  original per-map authoring; all 19 supplied CFGs pass the parser/time checks.
- `C:\_GitHub\TantraSrc\TantraClient\resource\fx\ENVTEX.hpk`:
  original clouds, sun, moon and flare payloads; selected assets only are staged.
- `C:\_GitHub\TantraSrc\TantraClient\HT3DHeaven.dll`:
  supported binary profile, default flare chain RVA `1C6B9..1C878`;
  [read-only evidence](../evidence/native-sky-inspection.txt).
- `_remake/src/resources/MapConfig.{h,cpp}`, `NativeMapAssets.{h,cpp}`:
  selected-map parsing, referenced atmosphere payloads and sky-ray occlusion.
- `_remake/src/compatibility/NativeWorldTime.h`, `NativeSkyRules.h`:
  original time/color/orbit rules and supported flare defaults.
- `_remake/src/rendering/OgreBackend/NativeSkyScene.h`, `NativeSkyShaders.h`:
  atmosphere geometry, masks, stars, billboards, flare rendering and draw state.

## Verification and limits

CPU checks cover 19 authored map configurations, dawn/day/night time behavior,
sun/moon orbital correspondence, configured texture/scale/count data, flare
rejection and terrain/triangle/map-edge occlusion. Shader compilation and
reflected input/output register checks cover gradients, masks, points, billboards,
flares and existing lit/alpha/terrain shaders.

`tools/verify-world-sky.py` performs one offline client session on one channel.
Its explicit QA mode samples authored times and camera views without changing
map files, authority time or normal saved characters. It captures ten atmosphere
states and compares cloud-scroll and fog-on/off framebuffer pixels.

This implements the requested atmosphere behavior, but exact visual parity with
the original engine is not established. Star placement uses a deterministic
project-owned generator; native star RNG/flicker and exact celestial base size
remain unverified. The flare chain uses verified native defaults with a bounded
view-angle fade; exact native attenuation/depth sampling remains unported.
Occlusion uses terrain and placed triangles, not alpha-aware foliage holes or
dynamic actors. Weather, water and full map streaming are separate pending work.

## Current result

Staged `C:\_GitHub\TantraSrc\_client\HTLauncher.exe` SHA256:
`827A4471E115A033538FA8C48421E1A093116D2C6B921A4D3A6132D03FE3F1F5`.
Final-client static verification passed: 4,188 owned files, x64, original layout
and resolved imports. One offline process on channel/route 1 passed all ten
atmosphere states. Night records 1,216 stars with moon enabled and sun/flares
disabled; noon enables sun/flares with stars/moon disabled. Off-screen and
terrain-blocked cases reject flares. Independent cloud offsets are `.6` and
`.06` after 120 QA seconds, changing 508,004 image pixels.

The fog comparison changes 505 pixels outside the live FPS/HUD areas; 504 of
them independently match mixing the unfogged color toward the configured noon
fog RGB, within three RGB levels. This rejects animation-only differences.
No second client was launched for pixel analysis. Normal userdata hashes match.

Evidence: [runtime](../evidence/map-environment-runtime.json),
[pixel comparison](../evidence/map-environment-pixels.json),
`build-ogre-sdl/sky-cycle-runtime-20261023/{environment.tsv,VERIFIED.json,sky-*.png}`,
`sky-cycle-checks.log`, `sky-map-configs.log`, `sky-shader-linkage.log`,
`sky-cycle-stage-build.log`, `sky-cycle-stage.log`, and `sky-cycle-static.log`.
