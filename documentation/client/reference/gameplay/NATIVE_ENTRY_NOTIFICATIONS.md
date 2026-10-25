# Native entry notifications and inventory cleanup

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The PC status adapter now retains complete 16-byte native item records and runs
the source kala-core inventory cleanup after `CalCasteSkillPoint`, where
`CMOB.CPP:707` calls it. A separate entry notification adapter compiles the four
original producers from `zone/SendFunc.cpp`. These are prerequisites for the
normal offline authority; the channel does not emit them yet.

## Inventory boundary and ordering

`zone/Basedef.h:85` defines **MAX_INVEN=48**, while `STRUCT_MOB` at line 1241
stores **72** inventory records. The adapter keeps all 72, and the copied
`server.cpp:28834` cleanup scans only indices 0 through 47. Records 48 through
71 survive, including the source's reserved quest and memorized-location data.
The bound must not be expanded to the physical array length.

The lookup compares the supplied item-table record's `sID` against Brahma,
Vishnu and Siva kala-core IDs (8051, 8052 and 8053). It clears the entire
`STRUCT_ITEM`, including durability, serial, count, subrefinement, dummy bytes
and refinement. Neutral cores and other item IDs survive. It does not check
count or durability, alter equipment or send an item-removal notification.
Cleanup follows the earlier UI calculation; recursive initialization repeats it.

Only the unconditional debug-log block is removed from the copied cleanup
function. All guards, iteration, lookup, comparisons and zeroing remain native.
Missing supplied gameplay item records fail atomically. The reserved tail is
not looked up. Full item conversion also preserves equipment metadata that
the earlier lean calculation record did not represent.

## Entry message sequence

The `CHAR_INIT` send immediately precedes `server.cpp:12355`, which calls:

1. `SendStrongHoldData(conn)` (`SendFunc.cpp:779`).
2. `SendCastleData(conn)` (`SendFunc.cpp:791`).
3. `SendScriptQuestHistory(conn, 0)` (`SendFunc.cpp:918`).

The generator copies those call statements and all four producer bodies. It
rejects a changed sequence or a preface that no longer immediately follows
the native `CHAR_INIT` send. `SendTrimuritiCount` (`SendFunc.cpp:887`) remains
a separate API because its entry call occurs later, after status, world/Who
processing and the socket flush. It must not be appended to the preface.

| Message | ID | Full bytes | Supplied data |
| --- | --- | --- | --- |
| Stronghold init | 0x4401 | 108 | Four guild names and four marks |
| Castle init | 0x4708 | 16 | Castle owner |
| Script quest | 0x4852 | 32 | Clear time, level, quest ID and four kill counts |
| Trimuriti count | 0x1181 | 24 | Brahma, Vishnu and Siva counts |

Packed declarations and IDs are checked against both active client and zone
headers. Guild names retain fixed legacy bytes: native `strncpy` zero-pads
after a NUL but may fill all 20 bytes without a terminator. They are not
truncated to 19 or interpreted as Unicode. Quest `nDummy` and `byResult`,
which the producer leaves unassigned, are normalized to zero. Codecs retain
those fields when decoding arbitrary valid wire bodies.

Each producer uses `SendOneMessage`. In `CPSock.cpp:812`, this adds the frame
to the existing queue and then flushes it. Captured notifications therefore
carry `flushAfter=true`; future transport integration must preserve the FIFO
and flush any preceding buffered status records as well. Logical headers are
normalized as in existing status adapters; network encryption/sequence fields
belong to the transport.

The APIs require explicit world and user snapshots. They do not create guild,
castle, population or quest services or claim that default snapshots represent
persisted state. The supplied original client dispatch handles stronghold and
castle messages through `HTNetWorkHandle.cpp:838` and `:2586`; no explicit
script-quest or faction-count cases exist in that dispatcher. Integration must
retain that observed behavior instead of inventing UI side effects.

## Verification and remaining work

The cleanup probe covers every physical inventory slot for all three core IDs,
the 48/72 boundary, full-record clearing, reserved-tail preservation, ordinary,
neutral and zero-index records, recursive initialization, no extra notification,
equipment metadata retention and atomic failure for a missing gameplay record.
The notification probe exercises 64 world/user snapshots, including embedded
NULs, full 20-byte names, high legacy bytes and signed/unsigned edge values.
The independent source-layout fixture compares every body byte for 64 patterns
per message, round trips, every truncated size, wrong type/declared length and
trailing bytes.

Normal offline status initialization, persistent world/user snapshots,
notification FIFO/flush delivery, Who/quiz/grid/guild services, client state/UI
handlers and normal offline runtime verification remain required. No new
normal-client runtime verification or `_client` restaging is claimed here.
