# INTRO cutout and fractional alpha correction

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
Date: 2026-10-23. INTRO rigid TMB/TMD materials previously used an opaque shader
even when the selected original DDS contained alpha. The Mandara batch material
fix did not cover this separate loading path. Original texture bytes were
present; their draw state was wrong.

The renderer now inspects the actual original texture resource once, caches its
alpha classification and applies the shared world-alpha shader to rigid mesh
sections. Binary alpha uses depth-writing cutout; fractional alpha uses blending
with depth testing and no depth writes. Zero-alpha fragments are discarded.
DXT2/4 retain premultiplied blend identity. The same handling covers textured 3D
quads; screen-space UI and its native BMP colour keys remain separate.

The existing DDS decoder now also accepts an in-memory resource stream, so the
renderer can inspect its resolved file without copying or changing the asset.
`_TGA` is retained as native naming evidence; actual alpha values determine the
draw mode. Non-DDS rigid textures use their decoded alpha plane.

The normal INTRO resource is
`_client\resource\object\IntroObjTmb\in_Str_stone_sub1_01.tmb`, derived unchanged
from the canonical client archive. Its 56 material groups now have 54 opaque and
two blended sections. The original A4R4G4B4 textures under
`_client\resource\object\IntroObjTex` contain:

| Original texture | Dimensions | Zero-alpha pixels | Fractional pixels | Opaque pixels |
| --- | --- | --- | --- | --- |
| `d01_uniq_04_TGA.dds` | 256 × 128 | 10,430 | 2,881 | 19,457 |
| `d01_uniq_06_TGA.dds` | 64 × 128 | 6,635 | 560 | 997 |

Both therefore need fractional blending as well as transparent holes; forcing
all their alpha to a binary threshold would lose the original soft edges.

## Verification

`intro_alpha_render_probe` loads the actual 56-group model and checks its real
material state, then renders both original DDS files through the same alpha
handling into controlled GPU captures. `verify-intro-alpha-captures.py` compares
actual screen pixels against original 4-bit RGBA data, bilinear wrapped sampling
and source-alpha blending:

- **7,485** zero-alpha sample pixels reveal the background.
- **2,208** fractional-alpha RGB samples match calculated blending.
- Both source DDS files remain unchanged; their hashes and capture hashes are
  recorded in `build-ogre-sdl/intro-alpha-gpu/PIXELS_VERIFIED.json`.
- The source model probe reports 56 sections, zero binary-only cutout sections
  and two blended alpha sections.
- Focused Release CTest passes **5/5**, including world DDS alpha, render-profile,
  camera, main-HUD and MainUI checks. Evidence: `intro-alpha-ctest.log`.

See [PROGRESS.md](../../PROGRESS.md) for the final executable/runtime binding and
[graphics configuration](../../guides/GRAPHICS_CONFIGURATION.md) for the retained HIGH,
realtime-shadow and map-fog defaults. No full-suite, Debug or complete native
pixel-parity claim is made by this correction.

The staged Release x64 client also passes normal audio-enabled offline
`ashesh` / `ashesh` creation through Mandara route 1, with MainUI, calculated
status, HIGH profile, map fog and realtime character shadow passes retained.
Normal startup diagnostics confirm both original `_TGA.dds` alpha modes and the
raw `c1_jina6.tga` / `c2_jina6.tga` cloud alpha. Runtime proof and 16 captures:
`build-ogre-sdl/intro-alpha-runtime/VERIFIED.json`.
Final executable SHA-256:
`650fd01b6cd7992d4e52fdcac8522dd62dd3eb4908456ee3a1d06ad67a205494`.
All 2,385 manifested runtime files pass inventory checks; original CFG bytes,
normal SQLite and saved-ID hashes remain unchanged. Build log:
`build-ogre-sdl/intro-alpha-build.log`.
