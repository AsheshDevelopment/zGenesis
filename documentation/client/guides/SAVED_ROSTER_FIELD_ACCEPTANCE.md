# Focused saved-roster field acceptance

Status: route and CPU preparation implemented; runtime acceptance pending.
The broader client goal remains paused. The separate launch question is
unanswered. No client, renderer, server or audio device was started for this
checkpoint, and no runtime PASS is claimed.

## Scope and sequence

- [x] Reuse an isolated, unmodified SQLite backup of saved MandaraNpc, group 1.
- [x] Add opt-in `saved-field` to the normal SDL3 application probe, separate
  from `saved-services`. Select the saved character without creation/deletion.
- [x] Assert the restored Chakra, learned skill, Asura title and vertical bar.
- [x] Queue two native quick-slot 1 inputs; require exactly one existing potion
  consumption and one native sound-33010 playback request after the durable result.
- [x] Exercise Insert reset/right-drag orbit, then ground-click along the existing
  warehouse approach path without opening services or repeating transactions.
- [x] Retain stage captures, actual movement segments, accepted ground clicks,
  projected foot/head framing, camera/position context and post-exit state.
- [x] Add CPU audit tests, production route preflight and a preparation-only
  default runner. Rebuild and stage the launcher in both client outputs.
- [ ] Obtain the still-unanswered launch authorization, then run exactly one
  offline process on the first channel as ashesh / ashesh.
- [ ] Pass strict current-build diagnostics and persisted-state audit.
- [ ] Review captures and audible playback; accept usable camera/obstruction.
- [ ] Complete the wider movement/collision and client phase gates. Supplied
  Mandara assets still lack native `.tbo` collision data.

The previous authorized saved-services run already exercised warehouse item and
Rupiah transactions plus save-point confirmation. Its parser error was corrected
with CPU evidence; this focused route does not repeat those transactions or claim
that their earlier build accepted the latest executable.

## Prepared paths and safe checks

Canonical checkout: `C:\_GitHub\tantra-dev-main`.
Isolated output: `_remake\build-migration\mandara-acceptance-20261026-item-use1`.
Source checkpoint: `C:\_GitHub\TantraSrc\_remake\build-ogre-sdl\gameplay-expansion-runtime-20261023\userdata\offline\tantra.sqlite3`.
Normal client profiles and source checkpoint remain protected; no roster,
position or item value is seeded/edited. Source cell is `(395,220)`, native
inventory slot 19 contains the existing one-count client item 7001, and the
native quick-slot profile is 400 bytes.

Run these from the canonical checkout; neither starts the game:

```powershell
python _remake/tools/test-verify-saved-field.py
python _remake/tools/verify-saved-field.py --check `
  --output _remake/build-migration/mandara-acceptance-20261026-item-use1 `
  --protected-userdata C:\_GitHub\TantraSrc\_client\userdata
```

The default mode is identical to `--check`. It validates the prepared source hash,
SQLite state, existing quick-slot binding and current executable; writes only
preparation metadata/copies inside the isolated output; and creates no process.
It refuses an output containing an earlier attempt or field-entry evidence.

CPU preflight (console-only map/resource inspection):

```powershell
cmake --build _remake/build-migration --config Release --target mandara_saved_route_probe --parallel 4
& _remake/build-migration/Release/mandara_saved_route_probe.exe `
  _client _remake/derived-assets `
  _remake/build-migration/mandara-acceptance-20261026-item-use1/cpu-assets `
  _remake/build-migration/mandara-acceptance-20261026-item-use1/before-mob.bin `
  _remake/build-migration/mandara-acceptance-20261026-item-use1/ROUTE_PREFLIGHT.json
```

## Future authorized attempt only

The following command is documented for continuation and has **not been run**.
Use it only after the separate authorization is answered affirmatively:

```powershell
python _remake/tools/verify-saved-field.py --launch `
  --output _remake/build-migration/mandara-acceptance-20261026-item-use1 `
  --protected-userdata C:\_GitHub\TantraSrc\_client\userdata
```

It checks for an existing HTLauncher, records the sole attempt before creation,
forces offline group 1, uses only the isolated userdata and permits no automatic
retry. A timeout leaves the process open and records its PID, captures/logs and
available SQLite/profile evidence for CPU investigation. Do not create another
output to bypass a failed attempt without investigating it first.

After a completed run, the same runner invokes `--audit`; that read-only audit can
also be invoked separately against the same output without starting a client.
It requires exit 0, one process, fresh strict diagnostics, preserved normal
profiles/source checkpoint, actual movement and captures, expected quick-slot
replacement/removal, and exact native-character/cargo conservation. Current-cell
and potion/HP changes are bounded; unrelated inventory, equipment, money, cargo
revisions, skills, quests, saved cells and unselected roster must remain unchanged.

The audit writes `FIELD_RUNTIME_VERIFIED.json` only after actual run evidence
passes. Its scope is scripted saved-field checks; `visual_audio_review` remains
`pending` and `full_client_acceptance` remains `incomplete`. Playback API success
with nonzero gain does not prove audible output.

## Framing, evidence and limitations

The driver records actual camera eye/forward-target, projected feet/head and
camera clip residual. QA framing bounds require both X values inside 0.1-0.9,
head Y above 0.05, foot Y below 0.87 and visible height between 0.025 and 0.85,
with neither point covered by the HUD. These are explicit QA usability limits,
not recovered native camera constants. Finite matrices alone cannot pass.
`getCameraView` supplies a unit forward target, not the native original look-at;
the recorded clip residual is context, not full camera-parity proof.

Movement must exceed 60 native units and retain every actual standable/clear
segment. Each ground click samples terrain height, round-trips picking, rejects
HUD/actor triangles and uses normal SDL input. Projection/framing failure stops
the attempt with context; there is no automatic camera-recovery search.

CPU tests use synthetic records solely to test the auditor's rejection rules;
they never create runtime success. The real CPU preflight verifies its sampled
height, five-point warehouse route and blocked-NPC check. Neither replaces
rendered building/narrow-passage/actor/camera acceptance or human review.

[Structured checkpoint](../evidence/saved-field-route-20261026.json) |
[Earlier authorized run and parser fix](MANDARA_ACCEPTANCE_AND_FX_RECORDS_20261026.md) |
[Full movement task](../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-05).
