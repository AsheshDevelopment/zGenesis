# Native skill and probability initialization

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The source-backed character calculation component now initializes native skill
books and passive effects before equipment and final stats. The probability
helpers execute the original deck/rate methods with an explicit Windows CRT
random stream. This is still a calculation segment: full CMob::Init, caste,
timed effects, SQLite lifecycle updates and offline world notifications remain
unfinished. No synthetic status notification was added to the normal channel.

## Native calculation sequence

`calculateSkillEquipmentInitialization` clears stat variations, mastery, skill
bonuses, skill books/decks and affections, then runs:

1. Base Chakra totals and the original UpdateChakra.
2. Original CMob::LoadSkills and its passive OnTakeAffections dispatch.
3. Original UpdateEquipmentPoints, including every native slot and active set.
4. Original UpdatePoints and its configured resistance-deck initialization.

The generated stat adapter now compiles 21 original method bodies. The full
OnTakeAffections body is compiled, but its wrapper permits only passive dispatch
in this component. Active combat/timed-effect/attacker services are explicitly
unavailable; compiling their branches does not establish their integration.
NPC input resolution remains unsupported by this PC adapter.

The source's learned-byte indexing, per-tribe ID ranges, exclusive range end,
damage/cooldown copying, unlimited-skill detection, instant-effect filtering,
passive mastery and chance-deck construction are retained. Skill-book storage
includes the native extra slot (101 entries for the 100 learned bytes). The
unvisited final learned byte remains in MOB state even though LoadSkills does
not create its book entry. Class/caste/skill-point authorization belongs to the
remaining full initialization lifecycle, rather than a new rule inserted here.

Fresh initialization discards supplied stale book/deck/modifier state. The
source IsDead function gates passive dispatch using FSM/mode; the adapter derives
the initial FSM from incoming HP and accepts the native mode explicitly. Negative
HP follows the reviewed source normalization while retaining that initial FSM.
This does not claim completed death/respawn handling. Resolved coefficients,
caps, clan and parameter records remain explicit inputs to the segment.

Order matters. Passive mastery is available when offhand equipment eligibility
is checked. The equipment pass resets immunity even after passive immunity was
applied; this source behavior is retained. Multiple chance effects reuse and
overwrite the same deck according to native cursor/shuffle order. These effects
are not replaced with independent percentage rolls.

## Probability state and source oracle

`HtNativeProbability` compiles the eight original methods from TNDeck100.cpp and
TNRate.cpp. TNDeck100 retains its 100-card storage, AddCard cursor/cap, shuffle
passes, first-card adjustment, rollover and clearing. TNRate retains its integer
division, flag layout, range/offset progression, caps and rolling behavior.
Local diagnostic file output is disabled. Unused initial bytes are normalized;
defined card/rate behavior is checked against the source functions.

`NativeRandom` uses explicit 32-bit Windows CRT state and counts draws. A separate
oracle compiles the original class declarations/methods against std::srand/rand.
The production helpers use a bound stream and never call process-global rand.
Deck/rate snapshots expose their cursors and state for an authority to retain;
the calculation returns the advanced random state and per-call draw count.

A world authority must own/share/carry that stream across operations. Default
seed 1 is a deterministic component input, not a claim that the native server
reseeds every character or that world RNG persistence is already connected.
Snapshot restoration and continuation are tested. Broader native deck variants
and their combat consumers remain separate work in the full plan.

## Verification

The probability oracle passes **664,211 comparisons**, including 50,000 direct
CRT-stream draws, original deck/rate sequences, byte-valued cards, rollover,
random consumption, snapshot continuation and rate reinitialization history.
These prove sequence/state parity for the tested Windows compiler/runtime and
source profile; they do not assert idealized statistical percentages.

The skill initialization probe passes **1,271 checks**: 80 fixed checks plus all
1,191 authored PC skill rows supplied by the parameter loader. Fixed coverage
includes all eight tribes, native book bounds, fresh reset, passive/instant
filtering, caster HP/TP rules, mastery before equipment, immunity reset, shared
random consumption, multiple-effect deck overwrite, seed repeatability, dead/
empty-mode gates, missing-data atomicity and defined learned-byte alias indexing.
The profile sweep initializes one authored skill record at a time; it does not
establish every combination, learned-skill legality, caste transition or combat
action as implemented. The authored profile boundary is documented in
[native parameter loading](NATIVE_GAMEPLAY_PARAMETERS.md).

Build/test evidence is recorded under `build-ogre-sdl/native-skill-*` and
`native-probability-release-build.log`. The rebuilt development executables are
separate from the existing staged/package runtime proofs. This continuation
adds no new normal-client runtime test and does not restage `_client` or claim
live HUD status. Canonical source/assets/data remain unchanged.

Release and Debug full builds succeed, with **87/87 selected CTest checks each**
(HTTP runtime excluded). Both configurations pass the probability oracle and
skill-initialization probe. `native-skill-VERIFIED.json` binds their outputs,
executable/source/provenance hashes and full suite logs. These changes remain
uncommitted.

## Required next integration

The subsequent [caste/status segment](NATIVE_CASTE_STATUS.md) adds point
bookkeeping, caste and initialization notification production. Connect that
component to the authority. Complete source class/settings and remaining initialization fields,
continuous/timed effects and every emitted notification. Connect the parameter,
skill, equipment and probability state to the offline character authority,
preserve active Server.cpp ordering and persist the appropriate state through
SQLite. Then verify calculated status through normal offline Mandara entry.
NPCs, movement/combat, remaining UI/visual behavior and the dedicated server/GUI
are still required by the overall implementation plan.
