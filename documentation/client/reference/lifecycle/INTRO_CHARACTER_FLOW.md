# INTRO includes character creation, selection and deletion

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).

## Requirement and status

The user's 2026-10-22 requirement makes all three operations mandatory parts of
INTRO, for both SQLite offline operation and later server-backed operation.
Completing login and the server panel is not completing INTRO.

**Implementation status: the normal offline application now connects server
selection to original character creation, information and deletion screens.**
The source-backed logical zone channel, render-gated resource loads, animated
previews and SQLite replies are integrated. Complete INTRO acceptance, equipped
rosters and source face zoom remain open. Native GM rejection, village
popup/dismissal, population limits and endpoint decisions are integrated.
Offline zone handoff/loading now reaches Mandara1st with source-owned spawn
and a rendered main character; [full gameplay and world parity remain pending](../../archive/checkpoints/MANDARA_WORLD_ENTRY.md).
See [production sequence, runtime checks and precise limits](../../archive/checkpoints/INTRO_CHARACTER_RUNTIME.md).
The backend persists complete native character state, three fixed slots and
owned create/select/delete operations. See
[source evidence, migration and component verification](../protocol/NATIVE_CHARACTER_RECORDS_AND_SQLITE.md).
This document records the sequence and acceptance gates for connecting those
components to INTRO. Component tests alone do not establish working screens;
the separate SDL3/OGRE runtime scenarios exercise the production integration.

The [native creation-preview component](../assets/NATIVE_PC_PREVIEWS.md) now resolves and
renders all eight tribes with five faces and five hairstyles, native body parts,
display textures and animated hair/apron sockets. The normal application now
uses this component for creation and empty-equipment offline roster previews.

Canonical source is `C:\_GitHub\TantraSrc\Tantra\HTlauncher`. Original assets
remain in `C:\_GitHub\TantraSrc\TantraClient`; authored data remains in
`B:\__TANTRA\TantraDataScripts`. The future dedicated authority and GUI belong
in [`C:\_GitHub\TantraSrc\_server`](../../../server/archive/rust/ROOT_IMPLEMENTATION_PLAN.md).

## Required native progression

| Step | Source in `HTIntroManager.cpp` | Behaviour to implement |
| --- | --- | --- |
| Server choice | 2908-2951 | Native guard/click/billing checks; normal source slot 6; request connection without pretending it already succeeded |
| Intro zone authentication | 1134-1172,2483-2520 | Only ALIVE connection state requests `MOVE_ZONE_SERVER(0x01)`; send source account/digest/version/event fields and empty character name |
| Authentication response | 2523-2580 | Only ACK success for point 0x01 requests a character list; preserve native failure messages and disconnect flags |
| List request | 2584-2602 | Clear three occupied flags/count, destroy existing preview models, request list, then show the native request message |
| List response | 2605-2648 | Hide message, decode exactly three source records, empty names mean empty slots; apply equipment-index offset to seven equipment entries only for occupied records; reset portal/connect fields and captured credentials |
| Render-gated loading | 775-881,1013-1039 | Set LOADCHARACTER and sequence 0 with render guard false; a real UI render enables the next loading step; texture loading precedes model/animation loads for source tribe IDs 1..9; do not complete every step in one update |
| Character stage setup | 837-881 | Hide logo/login/server, show top menu; move/rotate/scale both gate mobs to the native character-stage transforms, request RUN/WLK and reset their clocks; create occupied character previews |
| Choose screen | 1885-1953 | Existing roster -> character selection; empty roster -> character creation; selection destroys the temporary new-character model, moves camera and hides conflicting panels |
| Open creation | 2029-2070 | Hide info/deletion panels, queue creation UI, reset face/hair to 1 and selected creation tribe to index 0, create the native preview, move camera, initialise seven service chakra points and clear added chakra/name/IME state |
| Create request | 1490-1574,2652-2708 | Capture name; preserve native forbidden-name and locale length checks; require all seven service chakra points to be allocated; translate client tribe to server tribe; send face/hair, four allocated chakra values, trimuriti 0 and bounded legacy name |
| Create result | 2711-2788 | Mutate UI/roster only on success 0x00; play sample 33502, hide message, fill the first empty slot with source level/base-chakra/default fields, then recreate previews and follow the native selection branch; failures retain the source failure presentation |
| Select existing character | 1385-1450,1956-2025,2853-2891 | Pick the actual occupied slot, populate source info and preview equipment, preserve GM/zone/population gates and Mandara destination choice; same destination enters main-game loading, changed destination follows disconnect/reconnect and point 0x02 authentication |
| Open deletion | 1451-1487 | Capture the selected occupied slot, show the source deletion-input panel with locale-specific focus/defaults, clear IME state, and move to DELETECHAR camera |
| Delete request | 1577-1608,2791-2818 | Use the selected character name; preserve locale-specific request fields and the nonempty back-field guard; show the native request message after issuing the request |
| Delete result | 2821-2850 | Only success 0x00 hides the message, plays sample 33503, destroys and clears the selected slot, decrements count and hides deletion input; remaining characters -> selection, none -> creation; failure preserves the character |
| Leave INTRO | 2853-2891,883-938 | Complete selected-zone authentication before intro cleanup/resource release and main-game loading; render-gate the main-game load and preserve the native transition boundary |

Cancellation is part of each screen's contract. Creation Cancel returns to
selection only when characters exist; an empty roster shows the original
no-character message. Deletion Cancel returns to selection and changes no data.
Top-menu create is blocked at three characters. Returning to server/login must
preserve the native logout, resource and camera order.

## Source constants and layout boundaries

The inspected normal path exposes **three fixed roster slots**, not a compacted
list. Keep holes after deletion, place a created character in the first empty
slot, and emit three list records on reopening. Do not sort characters by name
or shift them into different physical preview positions.

`HTIntroManager.cpp:50-115` defines eight client creation-tribe codes,
four base chakra values per tribe, seven allocatable service
points, original new/existing model positions/yaws and named camera profiles.
The loading sequence still visits source model/animation tribe IDs 1..9.
Creation, wide selection and deletion camera moves use STRAIGHTMOVE grade 0.95;
picking an occupied slot moves its information camera with grade 0.93.
Preserve these distinct creation/selection/deletion
camera and preview states.
Server-tribe translation uses the separate `g_byCharacterServerTribe` table:
`{1,4,16,64,2,8,32,128}` in `HTextern.cpp:145`.

`HTIntroManager.cpp:476-703` defines the character-info, creation, deletion-input,
top-menu and Mandara-selection widgets. Resolve original local texture indices
through IntroUI and original text through HTMessage. Extract only the needed
source-bound appearance/UI/audio assets into derived/package roots. All required
tribes, faces, hair, equipped-part bindings and native animations must be covered;
the existing single Asura diagnostic model is not a complete INTRO roster.

The active Basedef variant and packing are now confirmed by a source-compiled
fixture: 168 bytes per roster entry, 1,688 per saved mob and a 12-byte message
header. PMStruct is a different inactive roster definition. Explicit codecs
and the version-3 SQLite migrations use source-width fields; host C++ object
memory is never an x64 wire format. The starter state is checked against the
extracted original DB function. The client's optimistic post-create preview
fields remain separate from authoritative inventory and stats. Actual game
transport, optional locale word tables and full world-entry integration remain pending.

## SQLite authority requirements

The version-3 offline store supplies the following operations. The normal
offline INTRO uses them through native logical response boundaries:

- Account/world ownership and a unique fixed slot in 0..2.
- Stable character identity, source tribe IDs, legacy name bytes, face/hair,
  native base/allocated chakra, level, trimuriti, equipment and last-zone data.
- Transactional create with source validation, first-free-slot allocation,
  per-world naming rules and a strict three-slot limit.
- Transactional deletion of the authenticated account's selected character;
  preserve other slots and all data when validation/cancellation fails.
- Roster reopening across process restart, including an empty roster and holes.
- Selection validates a real occupied owned slot and uses the stored zone;
  it must not mark the character in-world before the source entry sequence.

Deletion-request compatibility fields must not turn local profile setup into
collection of real identity data. The supplied non-Korean branch uses the
source's own nonempty/default-field path; inspect the original server checks
before enabling a different locale's external deletion service.

The later `_server` authority and management GUI must expose these project-owned
operations and authoritative results, rather than directly editing client UI
state or replacing source rules with zEngine's character implementation.

## Completion evidence

INTRO can be marked complete only after both x64 configurations demonstrate:

1. Fresh SQLite account -> accepted login -> server -> authenticated empty
   roster -> source loading/render gates -> original character creation screen.
2. Create each supported tribe/appearance using source chakra/name rules;
   reject invalid names, unspent points, duplicate/full-roster requests and
   failed persistence without a partial roster/UI mutation.
3. Select each of three occupied slots, with source previews, equipment,
   animations, info, camera moves, Cancel/back navigation and zone routing.
4. Cancel deletion without a change; reject invalid deletion; successfully
   delete the selected middle/last character with the exact native response
   ordering and the correct selection-versus-creation branch afterwards.
5. Restart the process and verify identical characters, slots, appearance,
   equipment, chakra and selected-zone state from SQLite.
6. Enter the map only after the source authentication/loading/cleanup gates.
   Capture actual SDL3 input, rendered UI/preview evidence and database state.
7. Apply the same sequence against the later compatible server; keep protocol,
   UI, persistence and rule coverage separately visible.

The six-process SDL3/OGRE scenarios now cover an empty roster, creation,
rendered character picking, information/deletion panels, village choices 1/18/19,
popup dismissal, over-population rejection and persistence across five restarts.
Five original function bodies additionally verify 4,920 selection branch cases.
All runtime endpoints use 127.0.0.1 with native ports and slot indices.
The same normal production path now completes point-02 authentication, INTRO
cleanup, native loading, source-owned CHAR_INIT and rendered Mandara entry in
the three village scenarios. The broader combinations, failure/cancellation
paths, full world gameplay and compatible-server gates remain required. Neither that runtime subset nor the backend
tests establish complete INTRO behavior.

The first playable map is **Mandara1st**: new-character server zone 1 maps to
client resource 40001. Native village zones 18/19 share those map resources.
Preserve actual zone routing; see the source mapping in
[the runtime integration document](../../archive/checkpoints/INTRO_CHARACTER_RUNTIME.md#first-playable-map-mandara1st).
