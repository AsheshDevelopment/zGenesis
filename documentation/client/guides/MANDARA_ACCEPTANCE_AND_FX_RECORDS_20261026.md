# Mandara acceptance attempt and multipart FX correction

Date: 2026-10-26. The client implementation goal is active and incomplete.

## One authorized attempt

Exactly one new isolated offline client process used `ashesh / ashesh`, the first
channel, Zone01 and the saved `MandaraNpc` character. The source checkpoint was
copied through a read-only SQLite backup without changing roster values. No
creation/deletion matrix or previously passed merchant/repair route was repeated.

Tested launcher SHA256:
`e13665d34523e7ef9b7053cfad78555612847bdae342b12161eb27517eb3a733`.

- [x] Saved selection, native world authentication, CHAR_INIT and Mandara entry.
- [x] Restored Chakra, learned skill, potion and quick-slot data.
- [x] Native reset/orbit inputs and actual collision-checked ground movement.
- [x] Opened warehouse NPC 1105 through the production triangle picker and SDL input.
- [x] Deposited inventory slot 0 into cargo slot 119, then withdrew into slot 20.
- [x] Deposited 200 Rupiah and withdrew 50, conserving total money.
- [x] Selected save NPC 1120, confirmed saving and persisted current/saved cell.
- [x] Clean client exit, code 0; retained fresh diagnostics and captures.
- [x] Post-exit integrity and foreign-key checks, all 72 inventory and 120 cargo
  slots, cargo revisions, unselected roster, quick-slot and source checkpoint hashes.
- [x] Workspace normal profile and the user's 49 normal-profile files unchanged.
- [ ] Strict diagnostic gate: five error rows remain in this tested artifact.
- [ ] Usable camera framing and complete obstruction/visual acceptance.

| State | Before | After |
| --- | --- | --- |
| Character Rupiah | 99,797 | 99,647 |
| Cargo Rupiah / revision | 0 / 2 | 150 / 6 |
| Item formerly in inventory 0 | Original 16-byte item | Same bytes in inventory 20 |
| Cargo item slots | Original state | All 120 restored to original state |
| Current / saved cell | Current `(395,220)` | Both `(486,173)`, zone 1 |

The strict runtime verifier failed at its diagnostic assertion, despite the
client's successful exit. Its original failure and logs are retained. The new
read-only `audit-mandara-saved-services.py` checks the remaining service/SQLite
assertions without launching a client, filtering errors or creating a runtime
PASS. Its output is `SERVICE_AUDIT.json`, not the verifier's `VERIFIED.json`.

Automated camera recovery found the warehouse near the viewport's lower edge
(normalized Y approximately 0.978). Picking/transactions succeeded, but that is
insufficient evidence of usable camera framing. Finite camera matrices and
successful recovered clicks do not close the movement/camera acceptance gate.

## Confirmed FX parser defect

The five renderer error rows refer to three native models. Each uses the exact
exporter texture sentinel `(null)` and receives its texture from its TFX node.
The leading mesh parser accepted that placeholder; the additional-record parser
rejected it while searching for a valid geometry header. It therefore produced
empty additional records, which the renderer correctly refused to submit.

| Original FX model | Authored geometry records | Vertices per record |
| --- | --- | --- |
| `fxMAPMandara1stModel/mWT_2010012.tmb` | 2 | 18, 18 |
| `fxPCModel/mLT_2000071.tmb` | 3 | 42, 42, 42 |
| `fxMAPMandara1stModel/mALTER2_2010102.tmb` | 3 | 82, 82, 4 |

`RigidTmb.cpp::readMaterialGroups` now treats the exact sentinel as an absent
texture consistently with the leading record. It retains the geometry and
influence mappings; no model part is skipped, no archive is rewritten, no
renderer validation is removed and no diagnostic is downgraded.

The CPU scene renderer now checks multipart eligibility and samples every part,
instead of considering a valid root-only preview sufficient. The focused scene
fixture passes 13,451 assertions, including exact record/vertex counts for the
reported models. Strict TMB probes also validate their skeletons, mappings and
temporary malformed-mapping/tree rejection cases. Native authored skinning passes.

- [x] Correct all three reported multipart models in the shared resource reader.
- [x] Verify complete geometry, compatible skeletons and finite animated parts.
- [x] Preserve native texture overrides and malformed-input rejection.
- [ ] Runtime-accept the corrected executable. No second client was launched.

## Evidence and continuation

Retained run: `_remake/build-migration/mandara-acceptance-20261026-continue1`.
CPU/build logs: `.migration-local/mandara-acceptance-fx-20261026`.

[Structured evidence](../evidence/mandara-acceptance-fx-20261026.json) records
tested/corrected hashes, captures, diagnostic failures and package/protection
checks. [Goal 1](../planning/MANDARA_GOAL1_ACCEPTANCE.md) retains the overall gate.

The remaining priorities include corrected-build diagnostic/visual acceptance,
usable camera/collision behavior, incomplete skill/command/item phases and the
later client plan phases. The C++ server goal remains separate. A future game
launch requires a new go-ahead; implementation and CPU checks can continue.
