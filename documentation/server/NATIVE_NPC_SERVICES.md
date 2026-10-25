# Native NPC transactions and save points

The C++ authority now implements ordinary Rupiah merchant purchases/sales, item
repair and save-point requests. The handlers are connected to the zone worker's
existing command path and SQLDMN persistence. CPU authority checks launch no
worker or game process. Fresh TCP and graphical acceptance remain open;
`game_ready=false` and `npc_services_ready=false` still describe the full server.

## Selected data and source rules

`tools/stage-npc-services.py` stages three numeric tables from one authored
`B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml` profile. The owned output
is `data/rules/npc-services`: 372 NPC rows, 2,759 item rows and 164 portal rows,
with table/source hashes and original physical-cell/atoi semantics. Existing
owned files must match before the staging tool writes them again. Runtime needs
the staged files, not the original B: drive.

The service item loader checks its buy prices, stack limits and durability
against the existing inventory profile. It reads authored sell prices rather
than inventing a fixed resale fraction. NPC shops contain the positive prefix
of `idItem0` through `idItem48`; native `HT_NPC_SELLING_ITEM_MAX` is 49.
`idItem49` separately supplies NPC religion, cast to the native byte. Portal map
restrictions use the first matching record in ID-sorted order.

These are authored Global tables. They are not evidence that every NPC position,
stock or price matches the deployed server or canonical client's encrypted TPA.
Matching client placements/dialogue and a connected service route remain an
acceptance gate. The implementation does not silently replace this profile with
placements from another content revision.

## Packet behavior

| Operation | Request / reply | Body bytes | Source behavior retained |
|---|---|---:|---|
| Purchase | `0x2102` / `0xA102` | 8 / 8 | NPC ID, native item index, signed count, authored stock/prices and available empty slots. |
| Item creation | `0x920B` | 20 | One native item record per occupied empty slot, followed by the purchase reply. |
| Sale | `0x2104` / `0xA104` | 4 / 8 | Native place/index and sell price; UI precedes IncGold and the final-money reply. |
| Repair | `0x2105` / `0xA105` | 4 / 8 | Source float/pow/truncation cost, rounded durability units and Rupiah-only flag. |
| Save point | `0x1016` / `0x9016` | 0 / 4 | NPC ID comes from header wDummy at offset 2; the request has no body. |

Ordinary merchants check the NPC's authored zone and the square half-grid range.
New records fill empty slots in ascending order; existing stacks are not merged.
Each created stack consumes the shared native RNG through GetRandom(0,65535),
including the source's exclusive upper bound and Windows CRT range. Packed items
expand by the authored maximum; payment remains per requested pack. Native count
restrictions for items 7064/7066 and charge-continuance slot checks are retained.

Sales preserve the original IsBlockedItem/index-capacity check and equipment
range that excludes the bag. Repair uses its own full inventory/cargo bounds,
excludes equipment slot 15, and retains the source's ability to repair while
dead. Already-full durability replies with code 3. A zero-cost rounded repair is
valid. Repairing from zero durability sends its acknowledgement before equipment
recalculation/UI; other successful repairs produce the acknowledgement alone.

Save points check the current map's level restriction, NPC religion and native
rounded Euclidean distance. The source's forbidden-zone list is retained. Save
point selection does not inherit merchant square-range, NPC-zone or death checks
that the original save handler does not perform. A dedicated status-adapter
method preserves the saved cells through later UI/status snapshots.

## Atomic state and delivery

The zone applies source rules to candidate state and commits before publishing
success. Purchases use character revision fencing. Sales and repairs use the new
SQLDMN `commit_service` operation, which commits character/cargo together with
both revisions, including inventory-only targets. It requires a playing session
that owns the selected character.

`commit_service` permits exactly one declared sale or durability increase. It
rejects unrelated item/metadata changes, incorrect money deltas, cargo-money
changes and stale character/cargo revisions. Prices, stock, NPC range and repair
equations remain the authoritative zone's responsibility; the SQLDMN validator
checks the transaction shape and atomic ownership, not a second price simulation.
Failures roll back and fence the connection; no success reply or tentative actor
state is published. A lost reply does not authorize replay with stale revisions.

The native sale UI deliberately carries the balance before IncGold; its reply
carries the final balance. Repair's reply/UI order is also preserved after the
durable commit. This ordering is distinct from delaying persistence until after
the source handler's original send calls.

## Guards and unfinished work

Bounds, invalid item metadata, nonfinite/overflowing costs and aliased/corrupt
records are guarded. Packed purchases require enough space for complete
fulfillment before consuming RNG or creating items. This deliberately rejects
the original partial-packed-purchase/free-goods arithmetic path. Normal valid
purchases retain the source's item, count, serial and payment sequence.

Cash-shop NPCs return unavailable without charging Rupiah: ITMSRV cash/certification
is unfinished. Active limited-stock events, castle taxation outside this Zone01
authority, NPC script/quest callbacks, religion/class services, travel and native
client dialogue/confirmation UI remain open. Component readiness flags describe
ordinary transactions, repair and save-point backends; they do not advertise a
fully playable channel.

## Exact reference paths

- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: save (3505), buy (6944),
  sell (7349) and repair (7454) handlers and notification order.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.h`: message layouts, reply codes,
  item/NPC ID families and the 49-item shop bound.
- `C:\_GitHub\TantraSrc\Tantra\zone\HTParamMgr.cpp`: NPC goods/religion binding,
  item sell prices, portal map restriction lookup and charge/packed predicates.
- `C:\_GitHub\TantraSrc\Tantra\zone\GetFunc.cpp`: native serial RNG helper.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`: CalDistance2 and status/money calls.
- `B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml`: selected authored data.

`tools/rules/generate-native-npc-services.py` extracts the original predicates,
serial helper, repair float expression and distance function, recording input
hashes in `NativeNpcServices.inc`. It moves only the repair expression's final
int cast to the guarded caller. Owned implementation is in `src/zone/npc_services.cpp`,
`World::npc_request`, the explicitly adapted status methods and the store's
`service_delta` validator. Original, remake, Rust and normal client files remain
unchanged. Full acceptance remains tracked in [progress](IMPLEMENTATION_PROGRESS.md).

## Verification record

The Release suite passes all 29 CPU checks; eight focused Debug checks cover the
new services and their persistence/status/world dependencies. The isolated route
uses ashesh/ashesh, starts no worker/game process, and ends with character revision
8, cargo revision 4, 9,576 Rupiah, one item 4002 and saved cell (391,252). Five
malformed/stale service transactions and an injected failed commit leave durable
state unchanged. SQLite integrity passes; no session or zone owner remains.
Logs, input/generated/source/build hashes and the isolated database location are
recorded in [native-npc-services.json](evidence/native-npc-services.json).
