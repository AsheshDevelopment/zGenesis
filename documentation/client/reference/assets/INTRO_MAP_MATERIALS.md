# Intro rigid map material groups

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The intro stone mesh now renders all 56 material groups and 18,960 triangles,
using 51 distinct textures extracted from the original `IntroObjTex.hpk`.
The rendered capture shows the temple around both gates and the login panel.
This fixes a proven binary-layout error; complete native scene parity remains open.

## Native evidence and defect

The canonical `resource/object/IntroObjTmb.hpk` contains
`in_Str_stone_sub1_01.tmb`: version 1, rigid type 1, 24,190 shared vertices.
The read-only inspection tool `tools/inspect-native-rigid-materials.py` pins
the supported `HT3DHeaven.dll` SHA-256 before inspecting instructions. It never
executes the original DLL. Reproducible output is in
`docs/evidence/native-rigid-materials.txt`.

The native loader establishes this layout after positions, normals and UVs:

1. DWORD material count.
2. Seventeen floats per material: four RGBA colors and power (68 bytes).
3. DWORD total triangle count.
4. One DWORD triangle count per material, forming a complete count table.
5. Each material's triangle indices, serialized as DWORDs, in material order.
6. One 256-byte texture name per material, after all indices.

Native RVA `0x32393` allocates 0x44 bytes per material; `0x3249A-0x324B5`
reads the last float at +0x40 and advances 0x44. The loop at
`0x324BD-0x32507` reads total triangles and the complete material-count table.
`0x3254C-0x325EB` then reads grouped indices. The engine narrows counts and
indices to 16 bits in memory; the selected intro data fits that range.
`0x3264B-0x3272C` reads texture names and rewrites TGA references to
`<stem>_TGA.dds`, and other selected three-character extensions to DDS.

The old reader counted 18 floats per material and assumed the first material's
triangle count repeated the total. This accidentally located plausible index
values inside the intro mesh and submitted only 72 triangles. One-material
files masked the stride error because the count DWORD plus one 68-byte record
also occupies 72 bytes. The material values themselves were shifted by one float.

## Implementation

`RigidTmb` retains 17-float materials, all per-material ranges and texture names,
and the complete concatenated index list. It bounds the sum of group counts,
index ranges and complete texture table. Additional skinned records use the
same grouped layout validation; their material values are corrected too.

The per-material counts determine the index cursor independently of the
declared total, matching the native read loop. The supplied Deva hair-3 file
declares 441 triangles while its groups store 440. `declaredTriangleCount`
retains that field; `indexCount` records the actual group sum. Index/texture
bounds remain checked. See [the PC preview evidence](NATIVE_PC_PREVIEWS.md).

The rigid OGRE backend creates one section per nonempty source material group.
Each section compacts its referenced vertices while retaining source triangle
order, UVs and normals. Runtime assertions read the actual OGRE index buffers
and section count before emitting `TMB_RIGID_SUBMITTED`. Native texture naming
replaces the earlier filename candidate guesses for this rigid path.

`intro_map_materials <client-root> <derived-intro-root>` extracts exactly the
referenced texture set. Without the output argument it runs the source fixture
and corruption checks in a temporary directory. CMake runs the importer as an
application asset dependency; packaging retains 51 archive-entry/hash provenance
rows. The total derived provenance count is now 80. The original archives are
read-only and are never embedded wholesale in the package.

## Verification

2026-10-22: Debug and Release x64 builds each pass 51/51 CTest checks. The new
`intro_map_material_groups` fixture checks 56 groups, 56,880 indices, contiguous
group ranges, native texture rewriting and extraction of all 51 textures. It
accepts a changed declared total while preserving the actual groups, and rejects
a truncated texture table. Existing
TMB probes also require complete material ranges in additional character records.
Both refreshed packages pass package/hash verification and runtime smoke.
Runtime smoke requires `IntroPlacement_24 groups=56 triangles=18960` and rejects
texture fallbacks for that object, alongside existing intro ordering, gate
animation and gallery lifetime assertions.

Logs: `build-ogre-sdl/map-materials-{release,debug}-build.log`, corresponding
`*-tests.log`, `map-materials-runtime-{release,debug}.log`, and package logs.
Visual evidence: `build-ogre-sdl/map-materials-capture.png`.

## Remaining work

Native material lighting, alpha/culling modes, fog, sky and terrain behavior,
full placement transforms/dynamic loading, fire and sound adapters are still
incomplete. Additional skinned records now decode all material groups, but the
skinned renderer still needs per-group material presentation; this change does
not establish complete character appearance parity. Placements 25/26 reference
`in_Str_stone_main_01.tmb`, which remains unavailable in the supplied intro
archive/loose assets. Interactive login and subsequent network/client states
remain unfinished. The capture is direct rendering evidence, not a comparison
against a running original client.
