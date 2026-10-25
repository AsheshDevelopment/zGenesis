# Actor 2008 model-reader correction

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.
The 2026-10-23 16:35 popup was caused by `TMB_DETAIL_UNSUPPORTED` while creating
actor 2008. The original `ClientRes.txl` binds it to
`MON_Aprah_Varaha_Raja.tmb`, standing animation `MON_Varaha_Raja_STD.tab`, and
the `world` root track. This is separate from the earlier camera obstruction
failure.

The original TMB contains four complete detail records. Its L2/L3 names begin
at offsets `0x121EC` and `0x21514`. Both immediately follow a duplicated-position
float whose last byte is `0x41` (ASCII `A`). The previous name scanner began
inside that preceding binary block and read `AMON_Varaha3_L2/L3`. Its shifted
header check consequently failed, leaving both detail records without geometry.
The renderer correctly rejected those incomplete records and exited.

`RigidTmb.cpp` now returns the validated end offset from vertex-group decoding
and starts subsequent record discovery there. The fix is generic and does not
special-case this monster. Existing exported influence offsets remain unchanged
for readers/tests that use them. The four records now decode as:

| Detail | Vertices | Indices |
| --- | ---: | ---: |
| L1 | 722 | 3042 |
| L2 | 578 | 2448 |
| L3 | 399 | 1602 |
| L4 | 238 | 882 |

All use the original 57-bone binding. The regression checks verify the four
vertex counts, complete influence mapping and finite native animated poses.
Six focused reader/bind/cache checks pass. No source assets were changed, no
monster was hidden and no replacement geometry was introduced.

Model-creation errors now include model/animation names, and incomplete-record
diagnostics include record/mapping counts and the source model path.

References and evidence:

- `C:\_GitHub\TantraSrc\_client\TantraRemakeOgre.log` and
  `TantraRemakeFailures.log`: the user's report; copies archived in
  `_remake/build-ogre-sdl/actor-2008-20261023/before-*`.
- `C:\_GitHub\TantraSrc\TantraClient\system\ClientRes.txl` and
  `resource\object\Monster\Mesh\MON_Aprah_Varaha_Raja.tmb`: original bindings
  and model; model SHA256
  `c00932bd4597cfdb80c9c0e389f254f18a4eafb77d8382832c174c5bcd2d5db9`.
- `_remake/src/resources/RigidTmb.cpp`,
  `src/rendering/OgreBackend/OgreBackend.cpp`,
  `src/rendering/HtRenderFacade/WorldActorPresentation.h`.
- `_remake/src/tools/skinned_detail_probe.cpp`: actor 2008 regression alongside
  the existing Tiger detail checks.
- `build-ogre-sdl/actor-2008-{before,after,detail-check,checks}.log` and
  `actor-2008-20261023/source-boundaries.txt`.

The saved-roster verifier now preserves the character's saved Mandara village
and can require a specific original model to submit all four detail records,
so a successful map entry alone cannot pass this actor regression.

## Staged and verified result

`C:\_GitHub\TantraSrc\_client\HTLauncher.exe` SHA256:
`E9357B0201800DDD9543171A9D231F8C642C14F28E7E736B24E7B9947E3AAB68`.
Static verification passed: 4,188 owned files, 257,912,807 bytes, x64 and resolved
imports. One offline process used a private backup of the user's world group 0
character, retaining village/server zone 18 and saved cell `(498,335)`. The
verifier required the original Varaha Raja model to submit all four detail
records. That assertion passed, followed by 30 settled world frames and a clean
exit with no error diagnostics. The normal character database hash is unchanged.
No second process or other channel was tested.

[Runtime record](../../evidence/actor-2008-runtime.json),
`build-ogre-sdl/actor-2008-runtime-20261023/`, `actor-2008-runtime.log`,
`actor-2008-final-build.log`, `actor-2008-stage.log` and `actor-2008-static.log`
hold the current evidence. This does not certify every remaining NPC/monster
asset, action or long-running gameplay path.
