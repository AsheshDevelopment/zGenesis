# Zone01-Zone10 client/server map alignment

Updated: 2026-10-25. Catalog/config export and a versioned provenance lock now
exist. The map export is read-only and does not start a client or server.
It does not establish entry, complete dependency preflight or playable zones.

The [core preflight](../guides/MAP_CORE_PREFLIGHT.md) now decodes all ten maps
and confirms matching client/server collision dimensions. Eight pass its core
dependency checks. Zone01 lacks `r01_common_cart01.dds`; Zone08 lacks
`c02_rf_05_s.dds`. All 148 archive indexes were searched for exact names; neither
was found. FX/audio/water/actor coverage, staging and gameplay remain open.

| Zone | Client map | Native CFG | Asset folder | Local endpoint | Catalog/dataset | Client accepted |
| --- | --- | --- | --- | --- | --- | --- |
| Zone01 | 40001 | `MAP_Mandara1st.cfg` | `resource/map/Mandara1st` | `127.0.0.1:3001` | [x] / [x] | [ ] |
| Zone02 | 40002 | `Map_Mandara2nd.cfg` | `resource/map/Mandara2nd` | `127.0.0.1:3002` | [x] / [x] | [ ] |
| Zone03 | 40003 | `MAP_MandaraCave.cfg` | `resource/map/MandaraCave` | `127.0.0.1:3003` | [x] / [x] | [ ] |
| Zone04 | 40004 | `MAP_MandaraCave2nd.cfg` | `resource/map/MandaraCave2nd` | `127.0.0.1:3004` | [x] / [x] | [ ] |
| Zone05 | 40005 | `MAP_MandaraCave3rd.cfg` | `resource/map/MandaraCave3rd` | `127.0.0.1:3005` | [x] / [x] | [ ] |
| Zone06 | 40006 | `MAP_MandaraCave4th.cfg` | `resource/map/MandaraCave4th` | `127.0.0.1:3006` | [x] / [x] | [ ] |
| Zone07 | 40007 | `MAP_Jina1st.cfg` | `resource/map/Jina1st` | `127.0.0.1:3007` | [x] / [x] | [ ] |
| Zone08 | 40008 | `MAP_Jina2nd.cfg` | `resource/map/Jina2nd` | `127.0.0.1:3008` | [x] / [x] | [ ] |
| Zone09 | 40009 | `MAP_Jina3rd.cfg` | `resource/map/Jina3rd` | `127.0.0.1:3009` | [x] / [x] | [ ] |
| Zone10 | 40010 | `MAP_NewKruma.cfg` | `resource/map/Jina4th` | `127.0.0.1:3010` | [x] / [x] | [ ] |

The table is decoded from the original ClientRes.txl Map sheet, using the
complete legacy-item188 layout supported by ClientResourceCatalog.cpp. Native
HTControlDef.h defines ZONEVALUE_CLIENT_SERVER=40000; HTGameManager.cpp loads
the destination from the native zone ID plus that offset. NativeWorldMap.cpp
currently uses that rule, retaining separate existing 18/19 Mandara aliases.

**Zone10 is important:** the actual 40010 record binds MAP_NewKruma.cfg.
That supplied CFG points to resource/map/Jina4th. MAP_Jina4th.cfg also exists
but has different authored settings, including BGM; do not substitute it by name.
Catalog binding alone does not prove server geometry/settings or gameplay parity.

## Shared preparation

- [x] Z00-01 — Resolve all ten native map records and imported per-zone datasets.
- [x] Z00-02 — Record original CFG/resource folders and localhost endpoints.
- [x] Z00-03 — Produce a versioned zone-to-map manifest with server/client dataset hashes.
- [ ] Z00-04 — Preflight/stage each map's THM, TCC, TML, CFG, environment, water,
  regular/pop object packs, terrain textures, FX/audio and actor references.
- [ ] Z00-05 — Match spawn, dimensions/origin/axes, height/collision, faction,
  NPC/generator/portal IDs and settings between each selected zone and its map.
- [ ] Z00-06 — Extend final_client_assets beyond its current Zone01/18/19
  offline dataset staging; keep supplied HPK names/folders unchanged.
- [ ] Z00-07 — Extend C++ world authority beyond the current explicit Zone01 gate,
  together with client selection/travel/loading/CHAR_INIT and ownership recovery.
- [ ] Z00-08 — Test missing destinations, cancelled loads and disconnects without
  stale actors, duplicate owners, lost items or changed normal offline saves.

## Per-zone tasks

The lock is `_remake/config/zone-profile-lock.json`. It records the native
catalog/parameter/message hashes, each bound CFG/THM/TCC/TML/object table,
the five required atomic server dataset files, zone settings/endpoints and
the five supplied terrain/object/pop HPKs per zone. All 50 selected pack
bindings are present. This is file provenance, not entry/texture/actor coverage.
The native reader exports the catalog bindings; Python hashes original bytes.

```powershell
python _remake/tools/freeze-zone-profiles.py --client-root C:/_GitHub/TantraSrc/TantraClient --probe _remake/build-migration/Release/zone_profile_probe.exe --check
```

Run without `--check` only when deliberately updating the selected source
profile. `--check` rejects changes. No original asset or zone dataset is edited.

Each zone keeps its own Settings.ini, WorldSettings.ini, GenerationArea.idx,
MapData.tcm and NPCGener.txt as an atomic selected dataset. Shared client
resources may be reused; server folders and zone IDs remain distinct.

### Zone01 / client map 40001

- [x] Z01-01 — Catalog mapping and imported server dataset recorded.
- [ ] Z01-02 — Validate and stage required client map/object/terrain/FX/audio assets.
- [ ] Z01-03 — Align spawn, collision/height, NPCs, portals and per-zone settings.
- [ ] Z01-04 — Implement entry/travel/reconnect against the matching authority.
- [ ] Z01-05 — Accept rendering, movement, services, save/re-entry and cleanup.

### Zone02 / client map 40002

- [x] Z02-01 — Catalog mapping and imported server dataset recorded.
- [ ] Z02-02 — Validate and stage required client map/object/terrain/FX/audio assets.
- [ ] Z02-03 — Align spawn, collision/height, NPCs, portals and per-zone settings.
- [ ] Z02-04 — Implement entry/travel/reconnect against the matching authority.
- [ ] Z02-05 — Accept rendering, movement, services, save/re-entry and cleanup.

### Zone03 / client map 40003

- [x] Z03-01 — Catalog mapping and imported server dataset recorded.
- [ ] Z03-02 — Validate and stage required client map/object/terrain/FX/audio assets.
- [ ] Z03-03 — Align spawn, collision/height, NPCs, portals and per-zone settings.
- [ ] Z03-04 — Implement entry/travel/reconnect against the matching authority.
- [ ] Z03-05 — Accept rendering, movement, services, save/re-entry and cleanup.

### Zone04 / client map 40004

- [x] Z04-01 — Catalog mapping and imported server dataset recorded.
- [ ] Z04-02 — Validate and stage required client map/object/terrain/FX/audio assets.
- [ ] Z04-03 — Align spawn, collision/height, NPCs, portals and per-zone settings.
- [ ] Z04-04 — Implement entry/travel/reconnect against the matching authority.
- [ ] Z04-05 — Accept rendering, movement, services, save/re-entry and cleanup.

### Zone05 / client map 40005

- [x] Z05-01 — Catalog mapping and imported server dataset recorded.
- [ ] Z05-02 — Validate and stage required client map/object/terrain/FX/audio assets.
- [ ] Z05-03 — Align spawn, collision/height, NPCs, portals and per-zone settings.
- [ ] Z05-04 — Implement entry/travel/reconnect against the matching authority.
- [ ] Z05-05 — Accept rendering, movement, services, save/re-entry and cleanup.

### Zone06 / client map 40006

- [x] Z06-01 — Catalog mapping and imported server dataset recorded.
- [ ] Z06-02 — Validate and stage required client map/object/terrain/FX/audio assets.
- [ ] Z06-03 — Align spawn, collision/height, NPCs, portals and per-zone settings.
- [ ] Z06-04 — Implement entry/travel/reconnect against the matching authority.
- [ ] Z06-05 — Accept rendering, movement, services, save/re-entry and cleanup.

### Zone07 / client map 40007

- [x] Z07-01 — Catalog mapping and imported server dataset recorded.
- [ ] Z07-02 — Validate and stage required client map/object/terrain/FX/audio assets.
- [ ] Z07-03 — Align spawn, collision/height, NPCs, portals and per-zone settings.
- [ ] Z07-04 — Implement entry/travel/reconnect against the matching authority.
- [ ] Z07-05 — Accept rendering, movement, services, save/re-entry and cleanup.

### Zone08 / client map 40008

- [x] Z08-01 — Catalog mapping and imported server dataset recorded.
- [ ] Z08-02 — Validate and stage required client map/object/terrain/FX/audio assets.
- [ ] Z08-03 — Align spawn, collision/height, NPCs, portals and per-zone settings.
- [ ] Z08-04 — Implement entry/travel/reconnect against the matching authority.
- [ ] Z08-05 — Accept rendering, movement, services, save/re-entry and cleanup.

### Zone09 / client map 40009

- [x] Z09-01 — Catalog mapping and imported server dataset recorded.
- [ ] Z09-02 — Validate and stage required client map/object/terrain/FX/audio assets.
- [ ] Z09-03 — Align spawn, collision/height, NPCs, portals and per-zone settings.
- [ ] Z09-04 — Implement entry/travel/reconnect against the matching authority.
- [ ] Z09-05 — Accept rendering, movement, services, save/re-entry and cleanup.

### Zone10 / client map 40010

- [x] Z10-01 — Catalog mapping and imported server dataset recorded.
- [ ] Z10-02 — Validate and stage required client map/object/terrain/FX/audio assets.
- [ ] Z10-03 — Align spawn, collision/height, NPCs, portals and per-zone settings.
- [ ] Z10-04 — Implement entry/travel/reconnect against the matching authority.
- [ ] Z10-05 — Accept rendering, movement, services, save/re-entry and cleanup.

Mandara already has bounded offline entry and gameplay evidence. Its unchecked
items mean complete aligned/connected acceptance remains open; the other nine
maps are not marked playable because their catalog entries or packs exist.

## References and acceptance

- Original catalog: C:\_GitHub\tantra-dev-main\_references\TantraClient\system\ClientRes.txl.
- Native rules: Tantra/HTlauncher/HTControlDef.h and HTGameManager.cpp.
- Reader: _remake/src/resources/NativeWorldMap.cpp.
- Per-zone references: E:\Global-server\Zone01 through Zone10.
- Owned server profiles: C:\_GitHub\tantra-dev-main\_server\zones\Zone01 through Zone10.
- [Catalog/profile inspection data](ZONE01_ZONE10_MAP_ALIGNMENT.json).
- [Current client plan](HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md).

The dedicated server goal remains paused. Prepare all ten zones statically/with
appropriate CPU checks first. Do not automatically launch ten clients/channels
or repeat failed runtime attempts. Use the existing one-process/channel policy,
normal-save hash protection and approval gate when runtime acceptance resumes.
