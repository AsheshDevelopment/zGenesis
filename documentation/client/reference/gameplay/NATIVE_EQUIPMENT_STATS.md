# Native equipment and stat resolution

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The equipment pass is implemented as a source-backed calculation component.
`HtPcStatProjection::calculateEquipped` accepts native character state and
explicit item/skill/class/refinement inputs, runs the original equipment pass,
and returns calculated values and resolved modifiers. It is not yet called by
the normal offline world authority. The full remake remains incomplete.

## Source and sequence

`generate-native-pc-stat-core.py` compiles 18 method bodies from `zone/CMOB.CPP`
and `zone/CMob2.cpp`, together with eight parameter predicates from
`zone/HTParamMgr.cpp`. Generated files record hashes of those sources, Basedef,
CMob.h and the active server. The added bodies are `ApplyItem`,
`UpdateEquipmentPoints`, `AffectEffect`, `UpdatePoints`, `UpdateResistEffects`,
`Aff2Imm`, `Add_Debug` and `Remove_Debug`.

The adapter first calculates available Chakra and updates changed Chakra. The
original equipment pass then clears equipment variations and skill-level bonuses,
resets immunity and dual wielding, visits all 16 equipment slots in native order,
applies the active hard-coded set conditions, calls the empty native CheckSetItem
hook, and runs UpdatePoints. Passive and active input variations are retained.
The earlier `calculate` API continues to accept already resolved variations.

The native bodies retain durability/index gates, offhand mastery requirements,
level penalties, shield coefficients, four refinement-table rows, both nibbles
of each submaterial byte and slot-specific submaterial rules. The full active
set pass is compiled; it is not replaced with a starter-only list. In particular,
its set conditions test indices and level/tribe/class rather than durability.

The original effect dispatcher resolves permanent equipment effects into native
variation groups, mastery, immunity and skill-level bonuses. SkillUp notifications
are captured as typed component results; transmission and client dispatch for
that message are still pending. Byte conversion is retained before native clamps,
including refinement wrapping and unsigned skill-bonus behavior. Item/skill
lookups require explicit records and fail atomically when a referenced record is
missing. The component does not invent a default item for a missing record.
Dynamic variation/refinement indices use checked access. Inputs that would index
outside the native arrays fail atomically; no result is claimed for legacy
undefined out-of-bounds behavior.

At this checkpoint, Source UpdateResistEffects calculated and clamped the four
resistance rates only. The subsequent [skill/probability continuation](NATIVE_SKILL_INITIALIZATION.md)
adds the original TNRate state/rolling and native passive initialization; combat
outcomes remain pending. A full world-character reinitialization or
another character's state is explicitly unavailable to this component, rather
than silently treated as completed. Diagnostic output stays local to the adapter.

## Verification

The `native_equipment_stats` CTest contains **129 fixed checks**, covering:

- Seven-piece sets across all eight tribes, missing-piece and level-99 boundaries.
- Every active three-piece set and all five-piece families, including Asura
  subclass recovery/movement branches.
- Broken equipment versus set membership, permanent-effect filtering, immunity,
  equipment-only modifier reset and resistance-rate clamping.
- Armor level-penalty truncation, armor refinement, shield percentage rounding
  and high/low submaterial nibble order.
- Ten weapon/coefficient branches, one-/two-hand refinement, refinement cap and
  byte wrapping, level-penalty cap, mastery ordering, staff elemental cap/Mind
  order, broken weapons and dual-hand damage rounding. Distinct Muscle/Nerves
  inputs cover all eight tribe formulas and the Asura bow weighting branch.
- Missing referenced data leaving the output unchanged; SkillUp notification
  fields, maximum-level clamping and unsigned-byte behavior; rejection of an
  otherwise undefined negative refinement-table index.

These are fixed behavioral expectations checked through the production adapter;
they are not an independent recompiled original-server executable, exhaustive
coverage of every effect/combination, or a normal-client runtime proof.

Release and Debug focused builds/checks pass. Evidence under `build-ogre-sdl/`:
`pc-equipment-{release,debug}-build.log` and
`pc-equipment-{release,debug}-ctest.log`. The Release run includes the existing
vitals and client-status ordering checks. The full Release checkpoint is recorded
separately in `pc-equipment-full-release-{build,ctest}.log`.
The full Release build and **83/83 selected CTest checks** pass; HTTP runtime
is excluded. Debug passes the two focused stat/equipment tests. The final probe
outputs, executable/source hashes and Release test-log hash are saved in
`pc-equipment-VERIFIED.json`. The broader Debug suite was not rerun for this
continuation.

No canonical source/assets/data were changed. This component adds no unused
payloads to `_client`; existing staged/package runtime proofs remain bound to
their recorded executable hashes. A newly rebuilt development executable does
not inherit those proofs.

## Remaining integration

The subsequent [parameter loader](NATIVE_GAMEPLAY_PARAMETERS.md) supplies native
item/skill/refinement tables with explicit authored-profile provenance. Connect
that component to the offline authority; resolve native skill-book/passive inputs and continuous effects;
implement probability decks and the remaining lifecycle fields. Connect those
inputs and this equipment pass to the offline character authority. Preserve the
intermediate notifications emitted during Init/caste/continuous-effect handling
and the active Server.cpp final update/dead-character ordering. Persist state at
the corresponding SQLite lifecycle points and verify live status through normal
offline Mandara entry. NPCs, movement/combat, remaining UI and the standalone
server/GUI remain required by the overall implementation plan.
