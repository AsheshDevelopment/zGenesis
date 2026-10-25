# Native character records and SQLite authority

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
## Scope and current boundary

INTRO includes creation, selection and deletion. This component implements the
fixed-width records, starter state and SQLite operations those screens need.
**The normal offline executable now calls these operations from original
character screens.** Zone authentication, render-gated preloads, default
previews, creation/deletion widgets and source camera transitions are connected.
See [the production integration and its runtime checks](../../archive/checkpoints/INTRO_CHARACTER_RUNTIME.md).
Full roster presentation, village routing and game entry remain pending under the
[INTRO contract](../lifecycle/INTRO_CHARACTER_FLOW.md).

## Confirmed native definitions

All paths below are relative to the read-only `C:\_GitHub\TantraSrc\Tantra` root.

| Evidence | Implemented contract |
| --- | --- |
| `HTlauncher/TNNetworkManager.h:25`, client/zone `Basedef.h` | The active client includes Basedef; the incompatible PMStruct roster is not the active definition |
| `HTlauncher/Basedef.h:1340`, `TNNetworkManager.cpp:182-248` | Logical message header: four 16-bit values and one 32-bit tick, 12 bytes total |
| `HTlauncher/Basedef.h` item, mob, roster and request/reply declarations | Item 16 bytes; roster entry 168; complete saved mob 1,688; three-slot roster reply 516; create request 44; remove request 40; create/remove result 13 |
| `HTlauncher/HTextern.cpp:145` | Client creation indices map to server tribes `{1,4,16,64,2,8,32,128}` |
| `HTlauncher/HTIntroManager.cpp:50-115,2652-2708` | Eight creation tribes, four base chakra values and seven allocatable points; client requires exactly seven spent |
| `zone/server.cpp:2894` | Name truncation to 18 bytes before selected Philippines validation; short names produce no reply, invalid bytes produce result 6 |
| `zone/server.cpp:1079` | Intrinsic name filtering checks exact `GM` and `gm` spellings |
| `DBSRV/CFileDB.cpp:768` | DB rejects chakra sum above seven (7), full roster (3), out-of-range tribe (8) and duplicate name (1); allocates the first empty fixed slot |
| `DBSRV/CFileDB.cpp:1794-1901` | Complete zero-initialized starter state, source base chakra, starter inventory item/durability, HP/TP 1000, zone 1, x/z -1 and first quest flag |
| `DBSRV/CFileDB.cpp:1725` | Roster equipment projection `{0,4,14,7,6,12,13}`, zone fallback 1, server-list indexing by zone and game port 18400 |
| `DBSRV/CFileDB.cpp:1026` | Exact owned name lookup, deletion of one slot without compaction, missing-character result 2 and a saved backup |
| `HTlauncher/HTIntroManager.cpp:2605-2648` | Client display adds 4000 to seven equipment indices of occupied roster records; stored authoritative equipment remains unchanged |

The codecs explicitly read/write little-endian source-width integers. They do
not serialize x64 C++ object layouts. Decoders check exact size, message ID,
payload size and terminated names, and clear output on failure. These are
**logical frames**, before the original socket encryption/checksum/transport
steps. They do not establish compatibility with a running legacy server.

The source fixture now also covers `MOVE_ZONE_SERVER`: a 140-byte request
containing account[52], digest[36], character[20], four 16-bit version fields,
event and two dummy DWORDs, and a 16-byte result frame. The caller's point 0x01
or 0x02 is not a field in this record. The source bounded-copy helper terminates
the last byte of each string buffer.

`OfflineCharacterChannel` implements a local, polled logical channel. ALIVE
precedes the authentication request; authentication rechecks the current salted
account verifier without provisioning an account or incrementing login count.
Roster/create/remove requests are allowed only after a successful reply.
Frames are queued for the caller to consume; no reply is fabricated on storage
failure. Native short-name silence and filtered-message events remain distinct
from result frames. The channel is bound to account, world and session generation;
fresh login or world selection invalidates queued responses even when the same
account/world is selected again. Version mismatch disconnects the local channel.

This channel is integrated with the offline INTRO frontend. It is not the legacy
encrypted socket transport. Native online version-rejection messages, a legacy
protocol-version profile and point-0x02 game entry still need their own evidence.
The local authority's remake profile is 0.1.0.0, independently compared with the
client request's actual executable FileVersion.

The selected authority currently supports the supplied client country 3
(Philippines server enum 4). Optional native NameFilter/ChatFilter word tables
have not been integrated; the intrinsic format and GM checks are implemented.
Other locale-specific creation/deletion policies remain pending. Client exact
seven-point validation is separate from the DB's less-than-or-equal-to-seven
rule. Offline deletion does not collect real identity information.

## Schema version 3

The existing application ID remains `0x4854524d`. Opening a recognized version-1
or version-2 database migrates it transactionally; existing accounts, verifier data, worlds,
population settings and unrelated private tables are retained. New databases
are initialized directly to version 3. Unknown future versions are rejected.

Schema 3 adds `accounts.zone_verifier`, a separate PBKDF2 verifier for the native
zone request's plain MD5 proof. The selected web-login branch uses MD5Plus.
Existing salts, web verifiers and iterations are preserved. A migrated NULL zone
verifier is populated only by successful web authentication linked to the
committed password input; wrong-password/web-only requests cannot backfill it.
Only salted verifiers are saved, never the password or either compatibility
digest. Reopened sessions validate raw MD5 and reject MD5Plus at the zone boundary.

- `characters`: account/world ownership, fixed slot 0..2, legacy name bytes,
  ASCII case-folded per-world unique name key and the full 1,688-byte native mob.
- `character_deletion_backups`: the deleted slot/name and complete native mob
  snapshot in the same transaction as deletion.
- `accounts.last_character_slot`: the selected occupied slot, cleared when
  that selected character is deleted in the corresponding world.

Each store session requires a successful login and explicit world selection
before any character operation. A reopened database does not implicitly grant
an authenticated session. Independent connections use `BEGIN IMMEDIATE` to
serialize slot allocation and enforce name uniqueness. A storage error returns
failure; callers must not emit a successful native result or mutate UI state.
Selection persists the owned slot and returns its stored zone metadata; it
does not advance into the world or initiate external networking.

## Verification

The CTest targets are:

1. `native_character_source_records`: a generated fixture compiles the original
   client/zone declarations with their packing boundaries and fixed Windows
   widths. It checks byte layout against the explicit codecs. The extracted
   original `CFileDB::SetNewCharacter` body independently verifies the complete
   starter blob for all eight creation tribes and the native in-range default
   tribe branch.
2. `native_character_record_bounds`: malformed lengths/IDs/payloads/names,
   signed fields, source visual projection, fixed-slot holes and distinct
   client/authority validation.
3. `offline_character_persistence`: create/select/delete, slot reuse, full and
   duplicate rejection, account/world isolation, reopen persistence, starter
   state read from SQLite, injected deletion failure with complete rollback,
   concurrent slot/name allocation and versions 1/2 migration preserving private
   data, salts and web verifiers. The version-2 fixture checks password-linked
   zone-verifier backfill, raw-MD5 acceptance, MD5Plus rejection and restart.
   It also exercises ALIVE/auth/roster order, wrong-proof rejection,
   pending-response guards and invalidation across fresh sessions through the
   actual local channel and SQLite authority.

The fixture is regenerated from the canonical files during CMake configuration;
client/zone declaration disagreement fails configuration. Original files are
never modified. These are component and source-parity checks, not rendered
character-screen tests. Final configuration/package results are recorded in
[`IMPLEMENTATION_PLAN.md`](../../IMPLEMENTATION_PLAN.md).
