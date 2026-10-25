# Native Mandara NPC placement correction

2026-10-23. CPU follow-up to the [single failed Goal 1 attempt](../planning/MANDARA_GOAL1_ACCEPTANCE.md).
**No additional game process was launched.** The integrated acceptance gate is
still open; the new executable requires one explicitly authorized offline check.

## Confirmed cause

The static NPC enumeration/positions in the imported authored Global XML differ
from the supplied original client. The original `HTNPCSystem` enumerates the
client's parameter table, gets its zone/cells and creates the NPC using terrain
height. The remake had used the different Global positions for both actors and
service ranges. Increasing camera retries at that misplaced warehouse endpoint
could not fix the underlying content mismatch.

| NPC | Authored Global cells | Original client cells |
| --- | --- | --- |
| 1104, Priest Vananta | `(512,76)` | `(668,174)` |
| 1105, Tradesman Buvan / warehouse | `(390,94)` | `(412,116)` |
| 1120, Memory Maiden / save point | `(506,233)` | `(491,176)` |

The binary client table has 291 NPC records, including 26 in zone 1. There are
65 position/zone differences among IDs shared with the authored Global table.
Names above identify the inspected records; existing native script callbacks
still determine their supported services.

## Implementation

- [x] Add a bounded, read-only client parameter inspector/exporter,
  `tools/inspect-client-npc-parameters.py`, following the native load order and
  Win32 structure widths from `HTClientParamMgr`.
- [x] Generate `derived-assets/world-gameplay/NPCPlacement.tsv` and its provenance
  from the canonical client's `system/TantraParam.tpa` during the build.
- [x] Use that native enumeration/placement profile in `NativeWorldPopulation`.
  Actor positions and offline NPC range checks share the same rows.
- [x] Retain the existing Global stock/item/service data separately; do not edit
  canonical client files, authored XML or selected Zone01 files.
- [x] Stage the two new used profile files under
  `_client/system/offline/world-gameplay`, with the normal manifest checks.
- [x] Make the acceptance runner derive save-point expectations from this profile,
  rather than the stale hard-coded `(506,233)`.
- [x] Keep bounded QA camera recovery at reset pitch while rotating through a full
  circle. Repeated positive pitch previously drove the camera toward its limit.
- [x] Prepare a fresh saved-roster profile/output for the pending verification.
- [ ] Verify the new build's rendered NPC placement, warehouse item/Rupiah
  operations and save-point persistence in the client, then inspect SQLite.

The exported file is an offline profile alignment with the user's canonical
client. It does not establish that Global stock/prices, the complete client
parameter tables and the deployed server parameters all belong to one revision.

## Verification

- [x] Decode all 291 NPC records; verify ordered/unique IDs per native table/level,
  input bounds and exported profile hash. Reject a wrong item stride and a
  truncated NPC section before writing output.
- [x] From unchanged saved character cell `(395,220)`, plan five warehouse
  waypoints and then a three-waypoint route toward the native save-point NPC.
- [x] Reject the stale warehouse cell `(390,94)` as outside the current service
  range; accept the planned native approach and open its warehouse service in CPU
  fixtures. Native NPC obstruction remains enabled.
- [x] Pass the existing Mandara closure CPU checks with the corrected profile:
  dialogue, shop, repair/warehouse entry, save confirmation and failure guards.
- [x] Compare camera geometry: the failed placement had zero clear sampled views
  across nine walkable positions and 1,152 tested yaw/pitch combinations. At the
  corrected route endpoint, 59 of 128 samples see an NPC height point; 77 distinct
  approach cells are reachable (the retained scan contains 78 entries because it
  also included the endpoint twice). Visible samples retain up to 99.63 units of camera
  distance. Walls remain in the collision/occlusion geometry.
- [ ] Rendered triangle picking and transaction acceptance. Height-point CPU
  visibility is preparation evidence, not a replacement for this gate.

The earlier `.tga` grass filter correction remains included. Original authored
`.tbo` collision data is still absent; this correction does not establish full
native collision/camera parity.

The refreshed selected-Zone01 asset preflight decodes 39 base models / 227 finite
animation bindings and reports missing monster 2718. Global-only NPC 1457 is not
enumerated by this canonical client profile; its separate Global asset mismatch
has not been repaired or substituted.

Current staged launcher SHA256:
`43B4A011D0930DC98497375CAEB22684839F7310A642A6F6C28DC1B194720827`.
Static checks pass for 4,357 files / 258,524,854 bytes, x64 imports, original layout
and exact icon. The normal profile's 46 recorded file hashes remain unchanged.

The supplied client uses a 276-byte item payload while the supplied header
declares 272 bytes. The exporter uses the explicit 276-byte file profile, validates
every record boundary/ID and preserves the unknown four-byte tail by skipping it.
It does not interpret that tail or the remaining 84,756 bytes after the NPC
section. A different client profile must be audited before changing this setting.

## References and retained evidence

- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTGameManager.cpp`:
  original client parameter loading.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTClientParamMgr.cpp`:
  `CHTClientParamMgr::HT_bLoad`, combined Monster/MonsterSkill loading, NPC loading.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTClientParamMgr.h`:
  serialized structures, counts and field widths.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTNPCSystem.cpp` and `HTNPC.cpp`:
  native NPC enumeration, coordinate conversion and terrain placement.
- `C:\_GitHub\TantraSrc\TantraClient\system\TantraParam.tpa`:
  canonical placement source, SHA256
  `89BB70532F888044F4E66B25AA75E3E55D1329E392E874B13DD45AE3408D16EA`.
- `B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml`:
  preserved authored Global data, not assumed identical to the client binary.
- [Structured CPU/build checkpoint](../evidence/mandara-native-npc-placement.json).
- Full CPU output:
  `C:\_GitHub\TantraSrc\_remake\build-ogre-sdl\mandara-goal1-native-placement-cpu-20261023`.
- Prepared runtime output, with **no `PROCESS_STARTED.json`**:
  `C:\_GitHub\TantraSrc\_remake\build-ogre-sdl\mandara-goal1-native-placement-runtime-20261023`.

The tested failure artifacts remain under their original output directory and
are not overwritten by the new CPU evidence. No commit or push was performed.
