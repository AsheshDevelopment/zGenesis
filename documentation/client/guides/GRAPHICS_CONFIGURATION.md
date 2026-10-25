# Original CFG files and HIGH defaults

Implemented: 2026-10-23. The client reads the original file formats and defaults
to HIGH with realtime character shadows. This scoped work does not complete
every original renderer feature.

## Files and precedence

Original, read-only references:

- `C:\_GitHub\TantraSrc\TantraClient\system\HTSpec.cfg`
- `C:\_GitHub\TantraSrc\TantraClient\system\HTStartup.cfg`

Their exact bytes remain staged at `_client\system\HTSpec.cfg` and
`_client\system\HTStartup.cfg`. The supplied startup selects MEDIUM (`spec=2`)
and `rtshadow=false`. The remake's product-default layer selects `spec=3` and
`rtshadow=true`; it does not modify those canonical reference files.

Private overrides use the **same filenames and INI syntax**:

- `C:\_GitHub\TantraSrc\_client\userdata\system\HTStartup.cfg`
- `C:\_GitHub\TantraSrc\_client\userdata\system\HTSpec.cfg`

Only supplied private keys override the source/default values. Invalid values
fail startup rather than silently selecting another preset. An explicit private
selection is preserved, including LOW/MEDIUM or disabled shadows. Staging never
overwrites these private files. No private override is needed for HIGH defaults.

For example, the private `HTStartup.cfg` can contain:

```ini
[OPTION]
spec=3
rtshadow=true
```

`spec=1` selects LOW, `2` MEDIUM, and `3` HIGH. `rtshadow=false` explicitly
disables realtime shadows. Restart the client after editing. A private
`HTSpec.cfg` can override selected values inside `[LOW]`, `[MEDIUM]` or `[HIGH]`
without duplicating the complete original file.

## Source-backed settings now applied

`Tantra\HTlauncher\HTEngineHandler.cpp::HT_hrLoadSpecValues` selects LOW/MEDIUM/
HIGH from `HTSpec.cfg`. Its `HT_hrSetUserSetting` separately selects shadow type;
HIGH alone is not a native realtime-shadow switch. The corresponding creature
creation paths set `bUseRealtimeShadow` when that option is enabled.

The normal remake uses `ClientRenderProfile` with the private-system layer:

| Effective HIGH setting | Original value | Applied behavior |
| --- | --- | --- |
| Screen size | 1024 × 768 | Initial window dimensions |
| Camera near/FOV | 5 / 45.91 degrees | From `[CAMERA]` in `HTStartup.cfg` |
| Camera far | 3500 | HIGH camera far plane |
| Character LOD 1/2/3/far | 100 / 200 / 400 / 3200 | Native represented character detail policy |
| Sprite system visible distance | 400 | Represented native particle/effect visibility |
| Animation blend | 0.1 seconds | `[TIME] AniInterTime` |
| Realtime shadow option | true by product default | Actual render-to-texture shadow caster/receiver passes |

Lengths above use native units; the rendering boundary applies `0.001` scale.
D3D11 uses its existing 32-bit colour path. HIGH does not switch the development
window into legacy exclusive fullscreen. Other keys in these large files are
not assumed implemented merely because the parser accepts a configuration file.

## Realtime shadows

OGRE renders a 2048 × 2048 modulative shadow texture from the current animated
character geometry each frame. CPU skinning and socket transforms feed the same
caster geometry as the visible character. Alpha-tested caster materials retain
their original texture alpha. Opaque terrain/static geometry receives the
projected shadow. UI and particles do not cast or receive world shadows; alpha
foliage receivers are excluded so transparent pixels are not filled by an
untextured receiver pass. Characters do not receive this projection themselves.

This represents native realtime **creature** shadows, rather than claiming all
scenery casts new dynamic shadows. The OGRE shadow resolution, local projection
distance and modulation strength are explicit remake choices, not values read
from `HTSpec.cfg`. The shadow light uses the map's `[TIME]` start position and
rotation axis at a noon anchor. Complete authoritative day/night clock, sun/
moon lighting, self-shadowing and full visual parity remain unfinished.

OGRE also requires its original `spot_shadow_fade.dds` during texture-shadow
initialization, even for the directional light. The supplied SDK file is copied
into owned `assets/ogre`, recorded by `PROVENANCE.json`, and staged under
`_client\system\ogre`. Only that required internal media file is included.

## Native map fog

Fog is a map setting, not a key in the HIGH block. Mandara uses
`TantraClient\resource\map\MAP_Mandara1st.cfg`:

```ini
[FOG]
isenablefog=1
israngebasedfog=0
colorR=0.88
colorG=0.8
colorB=1.0
start=1000.0
end=1600.0
```

The separate `[SKY] Fog=false` does not disable this terrain/object fog.
World shaders now apply the native base linear fog range and colour, including
textured objects, terrain/detail and characters. Range-based fog uses radial
camera distance when selected; the current non-vertex path evaluates per pixel.
Depth is reconstructed from the actual D3D11 projection. Cutout/alpha values are
preserved, and premultiplied textures use premultiplied fog colour. UI remains
unfogged. The existing `[TIME]` morning/noon/evening/night fog interpolation and
blindness changes are not yet connected; this uses the map's base `[FOG]` values.

## Verification

- `native_render_profile`: original LOW/MEDIUM/HIGH values, HIGH/realtime product
  defaults, private CFG precedence and invalid-option rejection.
- GPU environment probe: actual caster/receiver draws, 2048 shadow texture,
  moving caster, fog captures and independent UI.
- `tools/verify-environment-captures.py`: projected shadow darkens floor pixels
  outside the caster silhouette and moves with it; 18 RGB comparisons against
  independent ray/plane linear/range fog; white UI pixels remain identical.
  Evidence: `build-ogre-sdl/high-environment-gpu/PIXELS_VERIFIED.json`.
- Focused Release CTest: 4/4 passes for render profile, camera source order,
  HUD source layout and MainUI interaction.

Current build, normal offline Mandara validation and executable binding are
recorded in [PROGRESS.md](../PROGRESS.md). No full-suite or Debug rerun is
claimed for this slice. Remaining renderer work includes complete terrain LOD,
grass, water, exact environment/light parity, dynamic scenery shadows and the
remaining original quality controls. CFG-driven sky/clouds/stars, sun/moon and
flares now have a normal-client implementation and one-session verification;
see [map environment](MAP_ENVIRONMENT.md) for source references and parity limits.

The HIGH checkpoint passed an audio-enabled offline `ashesh` / `ashesh`
create-to-Mandara route-1 run with real character caster/receiver passes.
Diagnostics confirm `spec=3 rtshadow=1 far=3500` and native fog 1000–1600.
Original/staged CFG bytes and normal saves are unchanged. Evidence:
`build-ogre-sdl/high-settings-runtime/VERIFIED.json`,
`high-settings-final-build.log`, `high-settings-ctest.log`,
`high-environment-gpu.log`, `high-camera-gpu.log` and `high-hud-gpu.log`.
Its executable hash is `fbb7acb4e601efe1951ebfb94ad66400c14a45d85a37237bf284095141d3f1dc`.
The subsequent [INTRO alpha fix](../reference/rendering/INTRO_TEXTURE_ALPHA.md) retains these features;
the progress tracker records the final combined build and evidence.
