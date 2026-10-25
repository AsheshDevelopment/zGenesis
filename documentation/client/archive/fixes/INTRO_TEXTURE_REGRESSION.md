# INTRO texture regression, 2026-10-23

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.
The flat architecture and stretched character textures in the reported screenshot
were caused by mismatched D3D11 shader signatures after adding native lighting.
The original DDS files loaded successfully; this was a renderer regression.

`nativeWorldVertex` outputs position, UV, then normal, in registers 0, 1 and 2.
`nativeLitSurface` previously prepended the normal to the pixel input structure,
so its registers were normal=0, position=1 and UV=2. The pixel shader sampled
normal components as texture coordinates. Distinct face normals produced flat
patches on rigid architecture, while character normals produced stretched detail.
Screen UI uses separate shaders and was unaffected.

The wrapper now appends normals after position and UVs. All terrain variants
retain the detail-UV declaration before the normal, including when detail is
disabled, so their registers match the terrain vertex shader. Source assets,
alpha testing, lighting and fog remain in use.

References and verification:

- `_remake/src/rendering/OgreBackend/NativeWorldLighting.h`: shared vertex and
  surface definitions, with matching register order.
- `_remake/src/rendering/OgreBackend/OgreBackend.cpp`: production terrain shader
  construction uses the same definitions as the regression check.
- `_remake/src/tools/native_lighting_compile_probe.cpp`: compiles and reflects
  shader signatures, checking registers and component masks for world textures,
  alpha cutouts and all three textured terrain variants. The old prepended-normal
  layout is deliberately reconstructed and rejected, although it compiles.
- `_remake/build-ogre-sdl/texture-signature-before.log`: reproduced register
  mismatches before the fix.
- `_remake/build-ogre-sdl/texture-linkage-check.log`: corrected pairs pass; the
  intentionally broken pair is rejected.
- `_remake/build-ogre-sdl/texture-linkage-build.log`: Release x64 build.

Staged executable: `C:\_GitHub\TantraSrc\_client\HTLauncher.exe`, SHA256
`A7E9C23EDFF75ECBD06B9AB19C09C7FD78CC45196F0B03A0FA81C0A5DBAB9535`.
Static final-client verification passed (4,176 files, original layout, x64 and
resolved imports). One offline session used a fresh temporary profile, ashesh,
one world group and Mandara route 1. It rendered corrected INTRO textures,
completed character selection and CHAR_INIT, entered Mandara, walked and
transferred/equipped/unequipped inventory. The client exited successfully and
emitted `INTRO_CHARACTER_RUNTIME_VERIFIED`, with no error diagnostics.

The Python wrapper subsequently failed an outdated schema-3 assertion: the
current store creates schema 4 for warehouse persistence. The assertion was
updated; no second client process was started. Subsequent database assertions
were not reached and are not claimed as verified by this run. This session did
not exercise merchant, repair, warehouse, save-point or exhaustive collision
acceptance. Older failures in the cumulative failures log are not fresh failures
from this session.

Captures and fresh diagnostics are in
`_remake/build-ogre-sdl/texture-linkage-runtime-20261023/`, including
`create-create.png`, `create-mandara1st-world.png` and `create-diagnostics.tsv`.
The wrapper's post-run assertion is in
`_remake/build-ogre-sdl/texture-linkage-runtime.log`.
