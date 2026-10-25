# Mandara Goal 1 acceptance

## Latest continuation - 2026-10-26

Exactly one newly authorized saved-services process on channel 1 restored the
saved character and reached Mandara. Warehouse item and Rupiah operations, save
confirmation and a clean client exit (0) completed. Read-only post-exit audit
confirms all inventory/cargo slots, money/revisions, saved cells, unselected
roster, quick slots, source checkpoint and both normal profiles.

The overall gate remains incomplete: the strict wrapper rejected five renderer
error rows for additional records in three FX models. The native `(null)` texture
placeholder was accepted in the root record but rejected in later records. This
is corrected and verified with CPU geometry/skinning checks; both final clients
are rebuilt/staged. The corrected executable has not been launched again.
Automated warehouse picking near the viewport's bottom does not establish usable
camera framing or full obstruction parity.

- [x] Warehouse item deposit/withdrawal and 200/50 Rupiah deposit/withdrawal.
- [x] Save-point confirmation and persisted cell `(486,173)`, zone 1.
- [x] Clean client exit, SQLite integrity and normal-profile preservation.
- [x] Diagnose/correct the native FX multipart record rejection with CPU checks.
- [ ] Corrected-build strict diagnostics and usable camera/collision acceptance.

[Details](../guides/MANDARA_ACCEPTANCE_AND_FX_RECORDS_20261026.md) |
[Evidence](../evidence/mandara-acceptance-fx-20261026.json).
No second process was started after the failed strict diagnostic gate.


## Previous continuation - 2026-10-25

The gate remains **incomplete**. One newly authorized isolated offline process
used `ashesh`, group 1, Zone01 and the preserved `MandaraNpc` roster. It restored
selection/CHAR_INIT/progression, rendered HPK-backed Mandara and walked the
corrected warehouse route to cell `(412,121)`. It exited with QA result 8 at
phase 10, `Warehouse NPC dialogue`, before transactions or save confirmation.
No native crash is established. No additional client was launched after failure.

SQLite quick/foreign-key checks pass. All 72 inventory slots, 120 cargo slots,
money/revision and unselected roster entries are unchanged; saved cells are
unchanged. The source checkpoint was read only, and normal workspace userdata
hashes were unchanged. Captures, ground clicks and exact camera/position context
are retained under `_remake/build-migration/mandara-client-resume-20261025`.

CPU preflight verifies the corrected NPC placement/range and the collision route.
The tested QA did not record its chosen NPC pixel. A subsequent CPU replay at
the retained camera reproduces a helper defect in all six sampled stand poses:
the largest triangle's chosen pixel is around `(490,761–765)`, over the bottom UI.
Filtered search finds smaller triangle hits clear of UI at the same camera in all
six samples. It also checks the nearest actor through the production picker.
This removes the reproduced class of QA selection error; the original click and
pose remain unrecorded, so the exact event rejection is not established. The new
QA records candidate/overlap/nearest-owner values and is not runtime-accepted.

[CPU replay evidence](../evidence/warehouse-pick-cpu-20261025.json).

[Structured current evidence](../evidence/client-resume-20261025.json).
The new shared-resource build is a separate artifact from this failed attempt.
Warehouse/save-point acceptance still requires a go-ahead before another launch.

## Historical initial attempt and CPU follow-up

Date: 2026-10-23. **Incomplete.** Exactly one offline client process used group 1,
Zone01/Mandara, with `ashesh / ashesh`. It exited with QA result 8 when the
warehouse NPC could not be triangle-picked after bounded camera recovery.
This establishes a failed acceptance route, not a native crash.

Later CPU follow-up found a client/Global NPC placement mismatch and corrected it:
[native placement report](../guides/MANDARA_NPC_PLACEMENT_FIX.md). That build is staged and
a fresh saved-roster profile is prepared. No second game process has launched;
runtime acceptance still awaits a go-ahead under the user's explicit constraint.
The observations below retain the actual failed run and earlier grass checkpoint.

## Checklist

- [x] Create a fresh isolated output/profile from the previous persisted checkpoint using a read-only SQLite backup. No character, position or item values were edited.
- [x] Select saved `MandaraNpc`; reach `CHAR_INIT`, cell `(395,220)` and rendered Mandara.
- [x] Restore Chakra `(19,12,10,10)`, learned skill 3105/book slot 4 and the 400-byte potion binding file.
- [x] Verify the Asura/Rakshasa title and visible vertical quick bar, including its restored potion icon; retain captures.
- [x] Exercise native Insert reset/right-drag orbit and actual ground-click movement. Record 49 accepted clicks with sampled surface heights and clear segment checks.
- [ ] Accept usable camera reset/orbit and obstruction along the complete route. Finite matrices and changed camera positions did not establish usable framing.
- [ ] Select warehouse NPC 1105 and exercise item deposit/withdrawal.
- [ ] Exercise Rupiah deposit/withdrawal, then save-point NPC 1120 confirmation.
- [x] Inspect post-exit SQLite integrity, all inventory/cargo slots, money, cargo revision and current/saved cells.
- [x] Compare recorded before/after hashes: all 46 normal-profile files are unchanged. The source checkpoint, unselected character and quick-slot bindings also remain unchanged.
- [x] Retain failure capture, logs and camera/position context; investigate with CPU replay, without launching another client.
- [x] Correct the confirmed grass-card camera-filter bug, rebuild/stage and pass CPU regression plus static final-client verification.
- [ ] Runtime-verify that new build and finish the remaining services with a clean successful exit. No second launch was made during this task.

## Recorded state

| Value | Before | After failed route |
| --- | --- | --- |
| Current cell | `(395,220)` | `(394,97)` |
| Saved cell / saved zone | `(497,194)` / 1 | Unchanged |
| Character Rupiah | 99,797 | 99,797 |
| Cargo Rupiah / revision | 0 / 2 | 0 / 2 |
| Inventory occupied slots / total item count | 2 / 2 | 2 / 2 |
| Inventory 0 | index 1, count 1, durability 4500 | Unchanged |
| Inventory 19 | index 3001 (client potion 7001), count 1 | Unchanged |
| Inventory 20 / cargo 119 | Empty / empty | Empty / empty |
| All 120 cargo slots | Empty | Empty |

All 72 serialized inventory slots and the full cargo payload match the source
checkpoint. `PRAGMA quick_check` returns `ok`. The schema has a cargo revision;
the characters table has no revision column. Since the service controls were not
reached, unchanged values are protection evidence, not successful transaction or
save-point acceptance.

## CPU diagnosis and correction

The original failed waypoint driver used Y=0 from an intentionally XZ-only path.
CPU preflight sampled the first real click at Y=65.576. The new focused scenario
samples the map surface, checks projection/picking round trips and authoritative
segments, and sends normal SDL clicks. It neither teleports nor bypasses collision.

The new runtime got past that projection failure and reached the warehouse route
endpoint. Captures show close/inside-character camera framing. CPU replay found:

| Location | Blocking mesh before correction | Raw clipped distance |
| --- | --- | --- |
| Saved checkpoint | `pop_Env_grass7.tmb` | 0 |
| Warehouse endpoint | `r01_Stru_man_wall1.tmb` | 1.05 at reset; 10.74 after eight tested orbits |

The existing ten-unit degenerate-camera guard keeps a valid direction but cannot
guarantee a usable view. `getCameraView()` records eye plus a unit forward vector
as its target; the diagnostic target is not the original native look-at position.

The grass material references `pop_Env_grass1.tga`. The camera triangle filter
looked for `_tga` in that raw name, missing the native conversion to
`pop_Env_grass1_TGA.dds`. `src/resources/NativeMapAssets.cpp` now checks the resolved
native texture name. CPU replay confirms that this grass model contributes no
solid camera triangles: the saved reset view retains 53.65 units after the fix,
and the tested eighth orbit retains 89.88 units. The warehouse wall still clips
the view; it was not removed or bypassed.

Next work is to resolve the wall/route endpoint camera framing with CPU checks
before another explicitly bounded runtime attempt. Both implicated placements
have their authored collision property false; that fact alone does not prove
their correct native camera behavior. Supplied Mandara assets still lack `.tbo`
collision data. Full native obstruction/collision parity remains unverified.

## Artifacts and reproduction

- [Structured outcome, hashes, SQLite state and representative CPU samples](../evidence/mandara-goal1-runtime.json).
- Full retained output: `C:\_GitHub\TantraSrc\_remake\build-ogre-sdl\mandara-goal1-20261023`.
  It includes `BEFORE.json`, `AFTER.json`, normal-profile hash maps,
  `PROCESS_STARTED.json`, `PROCESS_RESULT.json`, `FAILURE_CONTEXT.json`,
  `ground-clicks.jsonl`, camera CPU before/after reports, logs and PNG captures.
- Tested executable SHA256: `C7826A8D664C4A73F14B8D2E145052592FFF1D6EEB8D4D0232CD35E6875C40A4`.
- Earlier grass-filter checkpoint SHA256: `126E1E9D84FC51F4482BC1C7BD51C07B20D8E5F9CD9FFA13E1EF0D7A3D602A6F`.
  This grass-filter build has **not been launched**. Static package checks pass:
  x64, imports, exact icon, original layout and 4,355 owned files.
- Runner: `tools/verify-mandara-saved-services.py`. Preparation requires a new
  output directory; run mode refuses an output with `PROCESS_STARTED.json`.
  It retains after-state and normal-profile hashes before asserting success.
- CPU tool: `mandara_saved_route_probe`. Arguments are client root, derived root,
  extraction cache, checkpoint mob binary and preflight output. Optional final
  arguments supply a native XYZ points file and camera replay JSON output.

No creation/deletion matrix or merchant/repair transactions were repeated.
No second client process, commit or push was made. QA captures/readbacks are not
a performance benchmark.
