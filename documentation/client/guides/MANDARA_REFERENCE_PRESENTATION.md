# Mandara presentation against the Kathana reference

Updated: 2026-10-25. Implementation/build evidence is separate from visual acceptance.

## Target and evidence boundary

The reference is `C:\Program Files (x86)\Steam\steamapps\common\Kathana\KathanaGame.exe`,
file/product version **4.0.1.7**. The installation contains `data.pak`; neither
that package nor the executable was modified or executed by this task. The
package's contents and renderer are not established by its filename/version.

Reference captures:

- `C:\Users\Ashesh\Pictures\Screenshots\Screenshot 2026-10-25 183450.png`
- `C:\Users\Ashesh\Pictures\Screenshots\Screenshot 2026-10-25 183704.png`

Remake capture:
`C:\Users\Ashesh\Pictures\Screenshots\Screenshot 2026-10-25 185255.png`.
The captures differ in camera, aspect ratio and potentially world time/assets.
They are appearance targets, not an FPS benchmark or proof of a specific
shadow, fog, tone-mapping or material algorithm in Kathana.

## Implemented corrections

- [x] Separate the camera-centred sky backdrop from the original cloud TMD.
  Previously the sky gradient was painted on each cloud cap. Mandara's two
  caps top out near 175/192 source units, below its middle/high colour bands
  at 240/800, so the backdrop could never show the full authored gradient.
  The complete 1,000-unit sphere reaches all bands and covers the view below
  the horizon as well. It is generated geometry, not a replacement sky texture.
- [x] Retain the original cloud geometry, archive-backed masks, scrolling,
  time-of-day cloud colours, stars, sun/moon, flare chain and horizon assets.
  No Kathana package payloads or substitute artwork were imported.
- [x] Focus the existing 2,048-pixel realtime actor shadow map on visible
  receiver space with OGRE's conservative FocusedShadowCameraSetup. Keep the
  existing shadow distance, resolution and caster rules. This is intended to
  improve texel use without raising texture resolution or enabling thousands
  of static-object shadow casters. Camera-motion stability requires acceptance.
- [x] Replace the uniform nine-tap shadow blur with a normalized 3x3 tent
  (weights 1/2/1, total 16), retaining bounds rejection and clamped sampling.
  This concentrates the filter around the centre for a more defined edge.
- [x] Deform lighting normals with the same weighted skeleton pose as the
  vertex positions, using each skin matrix's inverse transpose, ignoring
  translation and normalizing the result. Previously the renderer uploaded
  unchanged bind-pose normals for every animated frame. The optional normal
  output shares the existing position skinning pass; position weighting and
  gameplay mathematics remain unchanged. Covers playable bodies/model parts,
  monsters and other models using the authored-bind rendering path.
- [x] Preserve authored terrain detail multiplication and map light/fog
  values. No global brightness, gamma, density or noon override was added.
  `[SKY] Fog=false` and `[FOG] isenablefog=1` address different rendering paths.
  Day/night continues from the authority clock, so a dusk session will not
  have the reference's blue noon sky.

## Source and implementation paths

Native source root: `C:\_GitHub\tantra-dev-main\_references\Tantra`.

- `HTlauncher\HTEngineHandler.cpp:1312`: separate sky, sun/moon, cloud and
  distant-terrain draws before world geometry.
- `HTlauncher\HTEngineHandler.cpp:7318`: separate SKY/SKYCLOUD creation.
- `HTlauncher\HTEngineHandler.cpp:9071`: fog-coloured horizon and separate
  low/mid/high sky-height/colour updates, followed by cloud colour.
- `inc\HT3D.h:347`: separate native SKY/SKYCLOUD object types.

Original client root: `C:\_GitHub\TantraSrc\TantraClient`.

- `resource\map\MAP_Mandara1st.cfg`: SKY, FOG, TIME, SUBLIGHT, CHARACTERLIGHT
  and material settings.
- `resource\map\Mandara1st\sky.tmd`, `SkyTerrain.tmd` and `TerrainTex.hpk`.
- `resource\fx\ENVTEX.hpk`: original environment textures.
- `resource\object\PC\Mesh`, `PC\Ani`, and corresponding monster resources.

Implementation beneath `C:\_GitHub\tantra-dev-main\_remake`:

- `src\rendering\OgreBackend\NativeSkyGeometry.h`, `NativeSkyScene.h`.
- `src\rendering\OgreBackend\NativeShadowFilter.h`, `OgreBackend.cpp`.
- `src\compatibility\HtCharacterInstance.h`, `HtCharacterInstance.cpp`.
- `src\tools\native_skinning_probe.cpp`, `world_scene_fidelity_probe.cpp`.

## Verification and remaining acceptance

- [x] CPU position-skinning regressions pass for the existing 15 parts.
- [x] Normal rotation/nonuniform-scale/translation and invalid-input checks
  pass across all eight playable tribes: 94 parts, 5,935 nonzero normals.
- [x] Scene fixture verifies full backdrop radius/band coverage, valid indices,
  retained cloud assets and Mandara noon fog (1,200 to 2,000 source units,
  blue component 0.553), alongside existing field FX fixtures.
- [x] Lighting, sky and shadow HLSL compilation/linkage checks pass.
- [x] Rebuild/overwrite both client outputs; static package checks pass for
  1,731 staged files each. All 148 HPKs per output and 46 existing user-profile
  files are unchanged. The launcher SHA-256 is
  `fa3251494312ca21179d58c50f117300e0f8cd157b4a0a25f35d462f905d301f`.
- [ ] Matched-camera/daytime visual acceptance for sky/clouds, fog, character
  lighting and contact shadows, including orbiting/glancing camera views.
- [ ] Inspect foliage texture/mesh identities against Kathana before claiming
  the same leaf silhouettes or replacing alpha/UV settings.
- [ ] Measure CPU/GPU frame time and visible draw submissions. No FPS improvement
  or match with the reference's 547-778 FPS is established by CPU/build checks.
- [ ] Full depth/cascaded shadows, world self-shadowing and PBR remain separate
  work; this task retains the current modulative actor-shadow pipeline.

No game, renderer, server or audio-device test was launched. No commit/push was
requested. The broader goal remains paused; no visual acceptance gate is closed.

[Build/staging evidence](../evidence/mandara-reference-presentation-20261025.json).
