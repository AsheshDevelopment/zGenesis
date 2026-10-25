# Native Init clan, tolerance and movement context

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The represented PC initialization now runs the original world-context statements
between class/skill migration and point/skill/equipment calculation. It resolves
clan from the MOB and supplied stronghold/siege state, initializes movement and
detection fields, selects the class tolerance record and emits the native zone
settings notification where the source does. Normal offline status/world-service
integration remains unfinished.

## Source phase and ordering

The generator copies `CMOB.CPP:589` through the button-status initialization,
including the aggression table lookup, caster/GM movement, stronghold and siege
branches, tolerance selection and move-record initialization. Class keys are
checked before table indexing. The aggression matrix comes from
`Basedef.cpp:393`; `TNSiege.cpp:231` SearchEntry is compiled against supplied
entry records, retaining the original nested search order and invalid-guild
guard. There are now 46 original method/helper bodies plus the two Init
fragments in this adapter.

Full Init starts clan resolution from MOB.byTrimuriti, as in the source. The
lower-level calculation APIs still accept an already-resolved input clan.
Guild zones select the matching stronghold owner or owner-friend, skip unowned
slots and retain the last valid matching stronghold. Other zones emit zone
settings during an active siege and select the first siege-entry match, with
the native fallback clan for an unregistered guild. GM initialization bypasses
both reassignment branches.

The original movement record is initialized before passive/equipment updates.
Caster and GM initial speeds, blocked-cell flags, detection mask and button
status are exposed in the resulting state. The later equipment pass still
performs its source immunity reset, including after the earlier GM assignment.
No new protection policy replaces that ordering.

Recursive ResetSkill initialization repeats this world phase. In a siege, the
nested zone-settings message precedes the nested UI responses; the outer phase
later emits its own zone-settings message before its UI. These repetitions are
retained rather than deduplicated.

## Tolerance data

The read-only authored-settings import now derives EffectTolerance.tsv beside
the existing coefficient and level tables. Native field names and int types
are checked against HTServerSetting.cpp, and assignments are taken from
LoadSetting.cpp:820. Physical DOM row/cell addressing and the native atoi prefix
conversion are preserved for this table. Missing/undefined values fail without
inventing a tolerance row. No original workbook is modified.

NativeCharacterStatTables loads tolerance records by class key and binds every
member before committing the combined coefficient/level/tolerance input.
Missing tolerance data leaves the existing input unchanged. The authored Global
profile and its source/output hashes remain explicit; deployed encrypted
HTSSetting.txl equivalence is not asserted. The data is not staged in `_client`
while normal status generation does not consume it.

## Zone message

NativeCharacterRecords now encodes/decodes the **20-byte 0xB570 zone-settings
record**. The producer compiles the original packed declaration, checks client/
zone agreement and normalizes fields not assigned by the source to zero.
The byte-layout fixture covers 64 body patterns, full round trips, every
truncated size and the wrong message type. Frontend siege presentation and
normal-world routing of this message are still required.

## Verification and remaining work

The focused Init-world probe passes **157 checks** for all aggression slots,
tolerance copying, normal/caster/GM movement context, stronghold owners/friends,
siege search order/fallback, native zone-message ordering, recursion and atomic
data binding. A separate importer check compares every tolerance scalar with
the original XML and host CRT atoi, and checks source/output provenance.
Release and Debug full builds pass, with **93/93 selected CTest checks passing
in each configuration** (HTTP runtime excluded). Both pass the 157-check
Init-world probe, 176-scalar tolerance import check and expanded source packet
fixture. Evidence under `build-ogre-sdl/native-init-world-*` includes successful
build/suite logs and `native-init-world-VERIFIED.json` with source, executable,
data-provenance and log hashes.

This is calculation and logical-message verification. It does not establish a
new normal client runtime or full world authority. The supplied stronghold/siege
records are inputs to the source resolver, not a claim that persistent guild,
ownership or siege-controller services are implemented.

Still required: remaining Init inventory/kala-core cleanup, rank resolution and
world services, complete entry notifications and frontend handling, native
update scheduling, SQLite status lifecycle and offline-channel integration.
Combat/death, NPCs, movement, remaining UI/visual fidelity and the standalone
server/GUI remain open in the complete implementation plan.
