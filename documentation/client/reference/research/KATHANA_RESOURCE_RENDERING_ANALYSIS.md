# Steam Kathana: resources and rendering

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
Inspected 2026-10-23 at
`C:\Program Files (x86)\Steam\steamapps\common\Kathana`.
The installation was read-only: no client/launcher execution, configuration
changes, archive extraction/decryption, anti-cheat interaction or benchmark.
Only this report and its repository-owned evidence file were written.

## Confirmed installation facts

| File | Finding |
| --- | --- |
| `KathanaGame.exe` | Windows x64, file/product version **4.0.1.6**, 8,445,080 bytes |
| `KathanaLauncher.exe` | Separate x64 launcher, 3,975,920 bytes |
| `data.pak` | Main 1,059,823,388-byte archive, approximately 1.06 GB / 0.99 GiB |
| `Kathana.txt` | Historical render/application log, last modified 2026-09-09; records product version **4.0.1.2** |
| `userdata/engine.cfg` | Binary `KTCF` version-1 envelope, 1,480 bytes; not a plain INI file |
| `userdata/settings.cfg` | Binary `KTCF` version-1 envelope, 8,225 bytes; not a plain INI file |

The game binary identifies **KT**, **SDL3** and **bgfx** backend classes. It
contains Direct3D 11 and OpenGL shader paths, with additional bgfx backend code.
This identifies a custom client/rendering stack. The install script's Unreal
prerequisite reference and presence of Epic Online Services do not establish
that the game runs on Unreal Engine.

The older log records an SDL3 1600x900 window, RTX 4050, modern compatibility
profile, 4x MSAA and a bgfx OpenGL renderer. D3D11 preflight is logged separately.
It also records a shadow-map invalidation after an MSAA reset. These are facts
about that historical session; they do not establish the current version's
active backend, feature state or settings. Current CFG payloads were not decoded.

## What can be established about resource loading

The executable contains `Unable to load data.pak!`, a model decoder with explicit
LOD/mesh/material records, and centralized `KTResource` VFX model, texture,
animation and sound access/unload functions. Model-reader errors identify
positions, normals, UVs, material ambient/diffuse/specular/emissive/shininess,
triangles, indices-per-material and texture names. `/fxPC.txl` and original-style
map/LOD configuration names remain in the binary.

An LZ4 buffer-decompression routine is present, including output-buffer handling
and a negative-result failure check. A separate Zstd entry reports
`Zstd not available`; that is not evidence of working Zstd support. The inspected
`data.pak` header is not a readable ZIP/HPK-style directory. Its exact index,
resource-name mapping, per-entry codecs and any obfuscation/encryption were not
established.

The bounded loading picture is therefore:

1. The client requires its packaged data archive.
2. Resource functions obtain model/texture/animation/sound data; decompression
   and model parsing paths exist in the binary.
3. The renderer has static GPU vertex-buffer and texture resource paths, including
   instance data and bone/light palettes.
4. bgfx submits the resulting rendering work through a supported backend.

That sequence is an architectural inference from the observed components, not a
recovered source-level call graph. The installation alone does **not** prove
memory-mapped archive loading, asynchronous world streaming, a particular cache
eviction policy, or particular culling/occlusion algorithms. General file,
mapping and threading imports can belong to bundled libraries too.

## Rendering paths that matter for performance

| Evidence in the installed binary | Supported conclusion |
| --- | --- |
| `vs_kt_instanced.bin`; diagnostics requiring a static vertex buffer and checking transient instance capacity | A hardware-instanced geometry submission path exists |
| `vs_kt_skinned.bin`, `u_boneMatrices[128]`, `s_bonePalette`; embedded shaders fetching bone matrices and weighting transformed vertices | GPU skeletal-animation paths exist, using uniform matrices or palette textures |
| `s_lightData`, embedded texture-fetch lighting code, light position/range/attenuation/spot parameters | A texture-backed light-data path and local-light shader calculations exist |
| Dedicated terrain, water, sprite, skinned-shadow and character-shadow shaders | Specialized passes exist for those resource/render families |
| `fs_kt_msdf.bin` and UI/sprite shaders | A distance-field text path and separate UI rendering paths exist |
| Character/terrain LOD keys and model LOD-count parsing | LOD configuration and multiple-detail model support exist |

Compiled support does not mean every mesh uses instancing, every animation uses
a texture palette, or every listed effect is enabled in a particular session.

GPU skinning can keep base mesh vertices in GPU buffers while uploading much
smaller bone transforms. Instancing can share repeated geometry and submit many
placements together. Both address work that persists every frame. Packed data
mainly affects distribution, lookup/IO and loading hitches; packing assets into
one file by itself does not explain a high in-game frame rate.

## About 1000+ FPS and the more realistic appearance

The reported FPS was not independently verified. Sustaining 1000 frames/second
requires roughly a **1 ms** frame interval. Resolution, visible content, draw
submissions, animation cost, shadow settings, frame caps and what the displayed
counter measures all matter. No matched-scene comparison or CPU/GPU trace was
performed. The remake's earlier short 59.4473-FPS sample is not a controlled
comparison with this game.

The lighting/shadow/material paths above can help explain a richer appearance.
The remake currently uses a simpler diffuse/ambient world-lighting path and has
remaining character sublight, material, shadow and environment parity work.
Asset art, accurate animated normals, sky/fog values and lighting configuration
also affect appearance. This inspection does not establish physically based
materials, normal mapping, bloom, or ray tracing, and no visual side-by-side
comparison was performed.

## What to apply to our OGRE client

1. **GPU skinning with source-parity checks.** Retain static vertex/index buffers;
   evaluate native animation/bind rules, upload bone transforms and skin in the
   vertex shader, including normals and shadow passes. Preserve full authored
   influence groups, matrix conventions and sockets; do not truncate weights to
   fit an assumed four-bone vertex format. Retain a correct fallback where needed.
2. **Visibility and repeated-object instancing.** Profile visible submissions,
   group compatible repeated mesh/material instances and preserve transparent
   ordering and native spatial visibility. Our recorded Mandara scene creates
   5,742 object batches; this is not a count of all visible draws every frame.
3. **Resource preflight, caching and loading budgets.** Validate all referenced
   actor records/animations before play, reuse immutable mesh/texture resources
   and prepare nearby content ahead of movement. Our nearby actor path currently
   creates resources synchronously, which can cause traversal hitches.
4. **Complete source-backed shading.** Implement remaining character/local
   lights and material terms, correct animated normals and shadow behavior, then
   compare the same location/time/settings with reference captures.

These techniques can be implemented within OGRE while retaining the original
Tantra asset/layout and gameplay rules. This review makes no game-code or engine
migration changes. Exact Kathana loader behavior would need its source or an
authorized runtime profile; no 1000-FPS outcome is promised for the remake.

## Evidence

[Static evidence and file fingerprints](../../evidence/kathana-installation-analysis.json)
record relevant binary-string RVAs, x64 identity, versions, file sizes/timestamps,
small-file hashes and only the historical rendering log lines. Account/session
and anti-cheat log content was omitted from the report artifact.

Comparison references: [our performance report](PERFORMANCE.md),
`src/rendering/OgreBackend/OgreBackend.cpp`, `NativeWorldLighting.h`,
`src/rendering/HtRenderFacade/WorldActorPresentation.h`,
and [native bind-matrix rules](../assets/AUTHORED_BIND_SKINNING.md).
