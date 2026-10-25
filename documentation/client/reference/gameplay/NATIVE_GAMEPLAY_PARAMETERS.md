# Native gameplay parameter loading

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
Native item and skill parameter loading now feeds the equipment/stat calculation
inputs. `NativeGameplayParameters` compiles the active server's complete
`LoadSkillData` and `LoadItemData` bodies against project-owned table storage.
The normal offline world authority does not call this component yet. Live
post-CHAR_INIT status, skill-book/passive resolution, timed effects, probability
decks and the rest of the implementation plan remain unfinished.

## Source-backed loading

`generate-native-pc-stat-core.py` now also generates the two loader bodies,
the full `TNSKILL_DATA` declaration and its dependencies, 149 scalar getter
bindings, a required-field schema and the native four-row refinement table.
The field names and narrowing conversions come from `HTParamMgr.cpp` getters
and `HT_LOADCELL` calls. Unknown getters, conversions or compile flags stop
generation. The local-server override block is accepted only while its active
source body contains no executable statements. Optional diagnostic logging is
disabled in this component.

The original loader bodies retain native ID/level-to-index mapping, two-hand
weapon flags and speed correction, usable-item timing boundaries, effect-based
damage aggregation, item WeaponMastery removal, PC ready/cast/range/area rules,
special skill overrides, duration changes, monster skill indexing, and the
explicit zero item/skill records. Unassigned legacy fields are normalized rather
than exposing indeterminate bytes. Missing referenced input fields and invalid
record indices fail without replacing a previously loaded result.

`bind` supplies the loaded item/skill records and refinements to the existing
stat/equipment adapter. Full parameter records remain available for the upcoming
skill-book and combat work; the stat binding copies only fields that calculation
currently consumes. This does not claim that a complete character authority or
network transport has been implemented.

## Authored profile and native XML semantics

The read-only input is
`B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml`. Derived tables and
provenance live under `_remake/derived-assets/gameplay-parameters`. The authored
Global profile is explicit; its equivalence to encrypted deployed/client tables
has not been established. No canonical workbook, client asset or legacy source
was edited, and unused generated gameplay tables are not added to `_client`.

The workbook contains 2,759 item rows, 1,191 PC-skill rows and 1,110 monster-skill
rows for the selected fields. Ninety item rows fall outside the active native
LoadItemData range and are recorded in provenance rather than aliased into item
slots. Executing the native loaders produces 2,670 item records and 2,302 skill
records, including their explicit zero records.

The original XML reader implementation is supplied in `Tantra/zone/HTUtilLib.lib`.
Inspection of its integer `CHTXMLParser::HT_hrGetTableValue` overload establishes:

- Header fields are found by physical cell position. The reader saves the cell
  index at instruction offset `0x17d` and uses the physical node-list index for
  the requested row/cell. It does not read SpreadsheetML `ss:Index` attributes.
- The cell's text passes through `UnicodeToAnsi` at `0x221`, then `atoi` at
  `0x22a`, and is stored into the integer destination at `0x236`.

Library SHA-256:

```text
b9ea532bd1a263065d9684a5fc6f97a05aef81b5c3c0ffc44fa9816e51e40259
```

Evidence is saved under `build-ogre-sdl/native-xml-library-{symbols,disasm,relocations}.log`.
The export records the library hash, physical row/column references, native field
types, source/schema hashes, output hashes, ignored sparse attributes, outside-
range rows and noncanonical integer conversions.

This matters for the supplied data. Two fractional monster values are parsed as
integer prefixes, and a scientific-notation item range is parsed as `1`. Three
item rows (physical rows 2613–2615, IDs 8805–8807) have sparse cell attributes;
the import preserves the original reader's physical addressing for those rows.
It does not silently substitute Excel's logical addressing. The original
workbook remains intact. The selected class/level sheets used by the earlier
stat importer contain no sparse row/cell indices.

An existing empty cell follows `atoi("")==0`. A missing physical node, missing
required field or overflowing integer prefix is rejected rather than assigning
meaning to undefined/reused legacy parser state. Duplicate keys keep the first
record, matching the native map insertion. Stored values are used; spreadsheet
formulas are not evaluated by the game-table importer.

## Verification

The parameter probe contains 17 fixed behavioral checks for loader conversions,
timing boundaries, effect accumulation, special skill behavior, monster indexing,
outside-range IDs and failure atomicity. It also loads the authored export,
checks native zero records/refinement endpoints, binds the stat inputs and runs
the equipment/stat calculation.

The independent import check compares **261,386 scalar values** with the host C
runtime's `atoi` and the original physical XML cells. It verifies source/output
hashes, the three integer conversion audit entries, fixed lexical edge cases,
and a sparse-row/cell fixture. The source library's numeric path was inspected
statically; the original 32-bit MSXML parser was not executed. This is not proof
of every optional parser/build variant or of deployed-profile parity.

The first import check exposed the logical-versus-physical addressing mismatch;
that result is preserved in `gameplay-parameters-pre-sparse-fix-ctest.log`.
Current full build/test results are recorded separately in
`gameplay-parameters-full-{release,debug}-{build,ctest}.log`. These are CPU/data
component checks, not a new normal-client runtime test or final-client restaging.
Existing staged/package GPU proofs retain their original executable hashes.

Both full builds succeed, and **Release and Debug each pass 85/85 selected
CTest checks**, with HTTP runtime excluded. The 17 fixed loader checks pass in
both configurations. `gameplay-parameters-VERIFIED.json` binds the probe outputs,
executable/source/provenance hashes and successful suite logs. The final import
verification also passes after both builds. Changes remain uncommitted.

## Remaining work

The subsequent [skill/probability segment](NATIVE_SKILL_INITIALIZATION.md) resolves
native skill books/passives before equipment and ports TNDeck100/TNRate state.
Connect that component to the authority. Resolve class coefficients/settings and
timed effects, and complete the remaining Init/caste/lifecycle fields.
Connect those inputs and the equipment/stat rules to the offline authority,
preserving every intermediate and final notification in active Server.cpp order.
Persist state through SQLite at the native lifecycle points, then require live
calculated status in the normal offline Mandara runtime proof. Full UI behavior,
NPCs, movement/combat, visual fidelity and the standalone server/GUI remain
required by the overall plan.
