# Native caste, points and initialization notifications

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
`calculateStatusInitialization` now extends the skill/equipment calculation
segment with original initialization point bookkeeping, CheckCaste,
CalCasteSkillPoint and NotifyUpdateUIMsg. It returns ordered native logical frames
and message-key events. The normal OfflineCharacterChannel is not connected to
this component yet. Remaining world initialization, timed effects,
world services, SQLite lifecycle persistence and later server notifications
remain required.

## Source sequence and state

The generator copies the active Init point-bookkeeping statements, including
the level-minus-one prana lookup, upper clamp, CalChakra call, learned-byte sums,
advanced-class bonus and SP clamp. The segment performs prana/gold negative-value
normalization and retains the previously reviewed HP/FSM behavior. It then runs
UpdateChakra, LoadSkills, UpdateEquipmentPoints, CheckCaste and
CalCasteSkillPoint in source order. The latter emits its real UPDATE_UI.

The original caste checkpoint compiled 25 original method bodies and the active Init prelude.
Class validation and tribe-specific skill migrations run before the point,
skill and equipment passes. Full CMob::Init does more than this segment: world/
clan/rank resolution, other service state and lifecycle effects remain pending.
Inputs must provide the resolved class coefficient/profile, clan, native mode,
country/rank and level data. The country/rank fields are explicit; an authored
Global table is not proof of a deployed server's country or ranking state.
The later [Init-world continuation](NATIVE_INIT_WORLD.md) adds native clan,
siege, movement and tolerance initialization. Rank resolution and persistent
world services remain required.

CheckCaste retains the active Korean rank/point branches, including strict point
thresholds. The active non-Korean path retains Sudra3. CalCasteSkillPoint clears
unauthorized learned bytes and emits LEARN_SKILL level-zero replies before UI.
Overspent caste points clear the source byte range and emit the source reset
notice before UI. Regular SP excludes the caste range and includes the final
learned byte even though LoadSkills does not create that book entry.

The source clears caste skills after passive/equipment calculation and does not
recompute those earlier stats or book entries here. That observable ordering is
preserved, including the earlier passive values in the emitted UI. This is not
a new skill-authorization policy substituted for the source lifecycle.

## Class repair and recursive skill reset

The copied prelude repairs out-of-range class1 to zero. Invalid class2 is repaired
from the tribe only for class1 zero/one; valid class2 values are preserved even
when they differ from the tribe. Invalid advanced subclasses remain invalid and
fail atomically before indexed stat access. Authored coefficient binding uses
the same copied class statements, before selecting the profile.

The active Naga/Kinnara, Asura/Rakshasa, Yaksa/Gandharva and Deva/Garuda migrations
run before skill metadata lookup. Commented-out clamps remain disabled. In
particular, a Yaksa/Gandharva fault before the advanced class calls ResetSkill,
which clears all learned bytes and recursively initializes represented status
state. It emits nested UPDATE_UI, ResetSkill's explicit UPDATE_UI, LEARN_SKILL
with result SkillReset, the SkillInitialized notice, then the outer UPDATE_UI.
Nested Heart restriction precedes these UI frames when applicable.

ResetSkill's Init call is adapted to this calculation component's represented
status lifecycle. It does not claim the missing world/inventory cleanup. The
source DropKalaCore early-return guard is retained: Init has already cleared
affections at this point. Reaching actual kala-core world handling raises an
explicit unsupported-service error. Other Init callers still require the full
world lifecycle. Events and the RNG stream survive nested initialization.

## Native message production

NotifyUpdateUIMsg is compiled against copied native client/zone-agreed records.
It populates the original fields and movement/attack-speed byte encoding.
Packet locals are value-initialized so bytes the source never assigns are
deterministic. The capture boundary writes the normalized logical PDU length;
it does not claim native TCP sequencing/encryption/compression is implemented.

The captured frame order includes equipment SKILL_UP_EFFECT, caste LEARN_SKILL
and UPDATE_UI responses where the source emits them. Heart restriction and
caste reset notices are typed message-key events; localization and their actual
world-channel message transport still need integration. No frame or notice is
inserted just to make normal runtime status appear complete.

NativeCharacterRecords now supports the **20-byte LEARN_SKILL** and **16-byte
SKILL_UP_EFFECT** records, retaining reserved body bytes and signed skill IDs.
The existing 164-byte UPDATE_UI codec validates the source producer's output.
The generated private records use the original socket header and packed record
declarations, with size/offset assertions and client/zone agreement checks.

## Authored coefficient/level binding

NativeCharacterStatTables now binds every TNCOEFFICIENT member and the level/prana
table into the calculation input. Field names come from the source declaration;
missing class, coefficient or level entries fail without substituting zero.
The binding retains the explicit authored Global profile and its existing
provenance boundary. Parameter and stat tables remain derived development data;
they are not added to `_client` while the normal authority does not use them.

## Verification

Current class/skill migration verification: Release and Debug full builds pass,
with **88/88 selected CTest checks passing in each configuration** (HTTP runtime
excluded). Both pass the 2,617-check focused status probe. Logs and bound hashes
are recorded in `build-ogre-sdl/native-migration-VERIFIED.json`.

The caste/status probe passes **2,617 checks** covering:

- Rank/point boundaries and the active non-Korean behavior.
- Separate regular/caste point budgets, advanced-class level thresholds and
  the level-100 branch; prana/gold normalization and missing-data atomicity.
- Native UI positions, vitals, points, speed encodings and unassigned fields.
- Learn/reset response ordering, caste reset notices and retained earlier
  passive state after learned-byte removal.
- Every authored class binding and an authored-data-to-source-producer check.
- Every class1 byte across all eight tribes, valid subclass retention, defined
  advanced-class failure, tribe skill migrations, all eight recursive reset
  triggers for both initial class levels, nested message order and Heart cap.

The native protocol fixture now also compiles the original learn/bonus records.
For each, 64 byte patterns compare every encoded byte, round-trip through the
decoder and reject every truncated length and a wrong message type. Existing
character/status record fixtures remain included. These are source-layout and
calculation checks, not a new normal-client runtime proof.

Evidence for the preceding 203-check checkpoint is saved under
`build-ogre-sdl/native-caste-*`; current migration evidence uses
`build-ogre-sdl/native-migration-*`. Existing staged/package
runtime proofs retain their original executable hashes; this continuation does
not restage the final client or assert live HUD status.

At the preceding caste checkpoint, Release and Debug full builds succeeded, and
**88/88 selected CTest checks passed
in each configuration** (HTTP runtime excluded). Both configurations pass the
203-check caste/status probe and expanded native byte-layout fixture.
`native-caste-VERIFIED.json` binds their outputs, executable/source/provenance
hashes and successful suite logs. That proof is historical after these changes.

## Remaining integration

Complete the remaining Init world services, resolved settings/country/
rank context, timed/continuous effects, and every subsequent server notification.
Connect this segment and its ordered events to the offline authority, implement
the corresponding client event handling, and persist the appropriate state
through SQLite. Verify real calculated status through normal offline Mandara
entry. NPCs, movement/combat, remaining UI/visual systems and the dedicated
server/GUI remain required by the full implementation plan.
