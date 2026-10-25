# TMB influence groups and render vertices

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The ASURA Basic and TypeA Chest fixtures contain an explicit mapping after
their variable bone-index/weight tuples. Groups are not render vertex indices.

The block contains a little-endian u32 group count, one u32 vertex count per
group, and those groups' concatenated u32 render vertex indices. The indices
form a complete permutation of the render vertices. A second copy of the
original positions follows (three floats per render vertex, in render order).

Basic's first block begins at `0x4B84`: 45 groups cover 66 vertices, with the
position copy at `0x4D44`. Group zero references vertices 2 and 48, both using
bone 50 with weight 1. Chest's first block begins at `0x6104`: 111 groups cover
117 vertices, with the position copy at `0x6498`.

The reader validates the group count, nonzero counts, complete index coverage,
uniqueness, bounds, and every repeated position before exposing expanded
per-vertex influences. The same decoder processes additional mesh records.
Invalid mappings remain empty; the character renderer rejects them rather
than assigning groups to vertices sequentially. Probes corrupt a temporary
copy with a duplicate index and check that reused output retains no mapping.

All three character preview deformation paths and the OGRE multipart path now
consume the expanded mapping. Native bind matrix conventions and complete
skinning parity remain separate, unfinished work.

Validation on 2026-10-22: Debug and Release builds passed, with 38/38 CTest
checks passing in each configuration. Both refreshed x64 packages passed
Direct3D11 startup and graceful 11-part destruction/recreation probes. Release
produced a 1024x768 capture with 183 sampled colors; this is evidence of a
nonblank frame, not a visual-parity assessment. Build, test, package, smoke,
and capture logs use the `build-ogre-sdl/vertex-map-*` prefix.

The subsequent multipart correction routes every part through the same
`HtCharacterInstance` binding. Each part supplies its own geometry/influences;
skeleton names must match the binding. Previously the ten additional parts
used direct weighted transforms while only the first used frame-zero bind
correction. The probe now checks reconstruction at time zero and finite,
changing positions at one second for all eleven parts, and rejects a part
with mismatched bone names. Failed hierarchy binding rejects object creation.

Both configurations again passed 38/38 tests and packaged runtime/lifetime
checks (`build-ogre-sdl/multipart-bind-*` logs). Release capture inspection
confirms a nonblank frame, but oversized prototype UI panels obscure the scene.
This capture cannot validate character silhouette, alignment, or native
animation parity. UI reconstruction and visible scene validation remain open.
