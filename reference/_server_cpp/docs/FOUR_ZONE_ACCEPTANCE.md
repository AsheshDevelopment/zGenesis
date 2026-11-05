# Zone01–Zone04 acceptance — 5 November 2026

The BGFX client and native C++ authority pass the selected four-zone resource,
movement, travel, environment/BGM and persistence checks. Each of the three
connected routes uses two real graphical clients and separate zone processes.
Both characters then log in through fresh client processes after all workers
restart, preserving their saved map, position, money and native character fields
beyond live combat status. This is map acceptance; broader quest, combat and
original-renderer visual parity remain separate gates.

| Zone | Client map | Original configuration | Verified route |
| --- | --- | --- | --- |
| Zone01 | 40001 | `MAP_Mandara1st.cfg` | Paid Mandara2nd/Cave departures and free returns |
| Zone02 | 40002 | `Map_Mandara2nd.cfg` | `101 → 121`, 1,000 Rupiah outward; free return |
| Zone03 | 40003 | `MAP_MandaraCave.cfg` | `131 → 124`, 600 Rupiah outward; free return |
| Zone04 | 40004 | `MAP_MandaraCave2nd.cfg` | `125 → 126`, level 85, free both ways |

The Cave2 admission and fare are the selected **Global** rules. The separate K3
portal table has different values and is not merged into this authority profile.
The existing documented portal131 landing compatibility override is unchanged.

## Implementation

- The original Cave2 scenery contains a 67-material mesh. Material allocation
  is bounded by the real table size instead of the old 64-slot assumption.
- Original compact type-4 models use interleaved vertices, WORD geometry/group
  indices, byte influence counts, WORD bone IDs in padded influence records,
  388-byte skeleton nodes and 604-byte sockets. The reader preserves all mesh
  parts and validates duplicate positions, weights, hierarchy and composed
  world/local bind matrices. Existing type-2 decoding remains covered separately.
- The four-zone actor audit supplies missing original Global loose models and
  animations. Full original secondary texture packs replace the derived one-entry
  monster pack only after checking every existing payload is byte-identical.
  Its previous pack is retained in the local evidence backup. No HPK is extracted.
- Cave2 monster2147 uses spawn action298. Its `CallOthers(0)` and default
  `React(0)` now retain the native no-op behavior before skill41468 selection.
  Unimplemented nonempty reactions still fail explicitly. Authority failures now
  retain `logs/authority-failure.json` with the actual cause.
- The latest zone executable is staged in `_server_cpp/bin` and
  `_server_final/bin`. Zone02–Zone04 profiles are enabled for native world
  execution in both roots. Existing accounts and database files are preserved.

## Evidence and reproduction

- [Acceptance and fresh-process results](evidence/four-zone-acceptance-20261105.json)
- [Original payload hashes and pack backup](evidence/four-zone-native-inputs-20261105.json)
- Local raw logs/captures: `_server_cpp/build/evidence/four-zone-acceptance-20261105`
- Six Release map/compact-mesh regressions and four server map/movement/influence
  checks pass. Full actor audits cover every parameter-backed generated creature
  and placed online NPC in each selected zone.

After building/staging the current Release client and server test executable:

```powershell
python _server_cpp/tools/verify-four-zones.py --output _server_cpp/build/evidence/NEW_FOUR_ZONE_RUN
```

The verifier checks each imported dataset against its original provenance,
retains failed attempts, refuses an existing launcher and uses disposable stores.
It never opens the deployed MariaDB accounts. Development and deployed rule files
match the tested `state/data-releases/cave-20261102` release.

## Recorded content limits

- NPC1499's `NPC_Vharah_STD.tab` / `NPC_Vharah_IDL.tab` are unavailable in the
  inspected original clients. At the user's request, its presentation is skipped
  and logged once; its authority record is retained. No animation is substituted.
- `r01_common_cart01.bmp` is absent from the selected Zone01 regular/Pop packs.
  Existing authored diffuse rendering remains; a different map's texture is not
  borrowed to conceal this gap.
- Mandara2nd's native TMS ambience file is unavailable. Region ambience is skipped
  explicitly; native BGM selection and real playback pass.
- Zone03 generator3842 has no corresponding parameter record. It cannot generate
  an actor. Zero-coordinate NPC placeholders have no authored world placement.

Zones05–Zone10, complete skill/quest encounters and exact native visual parity
are not accepted by this checkpoint. The independent C08 package/recovery gate
is recorded in the BGFX implementation plan and progress tracker.
