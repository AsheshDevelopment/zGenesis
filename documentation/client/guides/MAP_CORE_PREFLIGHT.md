# Zone01–Zone10 core asset preflight

2026-10-25. This CPU preparation uses the production map, TMB, virtual HPK and
texture metadata readers. It starts no client, renderer, server or zone process.
It does not enable the additional zones or certify their gameplay/visual parity.

- [x] Read all ten bindings from native `ClientRes.txl` and each bound map CFG.
- [x] Build an isolated view from supplied `_client/resource` HPKs and copied
  original loose map companions. Archive entries are read directly, not extracted.
- [x] Decode all ten terrain/collision/placement/static-model scenes after the
  reader corrections below; compare each selected server's collision dimensions.
- [x] Inspect referenced texture metadata and retain exact missing dependencies.
- [x] Preserve all 556 input files and report 23 additional format files under
  Other; these files are copied into the view but not interpreted by this check.
- [x] Eight maps pass this core dependency check: Zones 02–07, 09 and 10.
- [ ] Resolve the two exact texture references missing from the supplied packs.
- [ ] Finish actor/animation/attachment, FX/audio/water and full per-map preflight.
- [ ] Stage all required used files and accept entry/travel/cleanup against the
  matching authority. Server expansion remains a separate implementation task.
- [ ] Obtain/verify authored collision fidelity; no `.tbo` exists in the selected inputs.

| Zone | Core scene decoded | Dimensions match server | Remaining core dependency |
| --- | --- | --- | --- |
| 01 | Yes | Yes | `r01_common_cart01.dds`, referenced by `r01_Stru_demon_tower.tmb` |
| 02 | Yes | Yes | None detected by this check |
| 03 | Yes | Yes | None detected by this check |
| 04 | Yes | Yes | None detected by this check |
| 05 | Yes | Yes | None detected by this check |
| 06 | Yes | Yes | None detected by this check |
| 07 | Yes | Yes | None detected by this check |
| 08 | Yes | Yes | `c02_rf_05_s.dds`, referenced by `c02_S_in_build1_01.tmb` |
| 09 | Yes | Yes | None detected by this check |
| 10 | Yes | Yes | None detected; native `MAP_NewKruma.cfg` → `Jina4th` retained |

Neither missing filename has an exact match in the indexes of the 148 supplied
archives. A similarly named cart texture is not substituted. Texture fallback
rendering in the current client is not evidence that a missing dependency exists.

## Confirmed reader corrections

`TextureMetadata.cpp` previously read DDS byte 84 (FourCC) as bit depth. Native
uncompressed `_TGA.dds` files commonly have a zero FourCC and were incorrectly
rejected. The reader now uses byte 88 for RGB bit depth, distinguishes DXT1–5,
and checks header sizes, dimensions, pitch and top-surface payload bounds.
Metadata alpha describes format capability; `WorldTextureAlpha` still inspects
actual pixels for cutout/blend behavior. The field layout follows Microsoft's
[DDS_HEADER](https://learn.microsoft.com/en-us/windows/win32/direct3ddds/dds-header)
and [DDS_PIXELFORMAT](https://learn.microsoft.com/en-us/windows/win32/direct3ddds/dds-pixelformat).

`RigidTmb.cpp` had an arbitrary 64-material limit. The supplied cave pieces
`MandaraCave2ndObjTmb/r03_part13.tmb` and
`MandaraCave4thObjTmb/r06_part_12.tmb` have 67 and 76 slots. The loader now validates
the actual table footprint and keeps a bounded 65,536-slot allocation ceiling.
Triangle groups/indices/material names retain their existing validation.
The TMB probe also obtains virtual entry sizes through `NativeResourceIO`,
instead of asking the OS for a nonexistent extracted filename.

`NativeMapAssets` now exposes object texture roots below the real client root.
The retained extraction-cache argument is no longer used for those roots.
The preflight deliberately passes a nonexistent cache directory and verifies
actual archive-backed texture resolution.

Twelve boundary checks pass: five DDS layouts, three malformed DDS fixtures,
the two native cave meshes and two malformed TMB material tables. Four existing
item/Asura/White Tiger reader regressions and the original BMP/TGA metadata test
also pass. These are CPU evidence, not GPU texture or cave-map acceptance.

## Reproduce from the workspace root

```powershell
cmake --build _remake/build-migration --config Release --target zone_assets_preflight zone_profile_probe texture_metadata_probe tmb_probe --parallel 4
python _remake/tools/preflight-zone-assets.py --client-root C:/_GitHub/TantraSrc/TantraClient --profile-probe _remake/build-migration/Release/zone_profile_probe.exe --preflight-probe _remake/build-migration/Release/zone_assets_preflight.exe --output _remake/build-migration/zone-core-preflight-NEW
python _remake/tools/verify-resource-reader-boundaries.py --build-root _remake/build-migration/Release --client-root _client --output _remake/build-migration/resource-reader-boundaries-NEW
```

Use a new output directory. Failed checks retain their inputs and reports.
The preflight returns nonzero while either missing texture remains. Current
corrected results are in [evidence](../evidence/zone-core-preflight-20261025.json);
the first failed report, corrected summary/dependency TSVs and all input hashes
remain under `_remake/build-migration/zone-core-preflight-20261025`.

Canonical original inputs remain `C:/_GitHub/TantraSrc/TantraClient`; supplied
packs are `C:/_GitHub/tantra-dev-main/_client/resource`; selected server datasets
are `C:/_GitHub/tantra-dev-main/_server/zones/Zone01` through `Zone10`. No source,
archive or server dataset was edited by the preflight.
