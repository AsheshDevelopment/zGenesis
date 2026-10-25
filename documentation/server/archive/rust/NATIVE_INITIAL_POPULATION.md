# Initial Mandara population and NPC publication

Current startup: [TCM startup and routing](NATIVE_TCM_STARTUP_AND_ROUTING.md)
corrects the earlier propagated-grid assumption. Its current cell/RNG results
supersede the historical propagated-grid totals below. The socket attempt here
predates that correction and does not validate the current binaries.

Updated: 2026-10-24. Zone01 now runs initial monster generation on its zone-owned
clock, publishes native NPC appearances and includes NPC cells in entry/movement
occupancy checks. **This does not complete movement AI, aggro/combat, casts,
death/respawn, static merchant services or the full world acceptance gate.**
`game_ready` stays false and the OGRE frontend remains on offline authority.

## Runtime connection

`ZoneGateway` loads the selected zone's own atomic IDX/TCM/NPC dataset. For the
existing Mandara world endpoint it also loads staged `data/native-world` and
`data/native-ai` when present. An incomplete pair fails startup. Older isolated
authentication fixtures without either profile retain their PC-only entry path.
Other zone endpoints do not acquire Mandara gameplay by sharing this component.

The gateway's existing owner loop drives a single coalesced quarter-second
generation counter. Player input and status sessions do not create their own
population timers. A delayed callback advances the counter once rather than
replaying a burst of invented ticks. Native scheduling still uses the counter's
low six bits and Div64/frequency rules. CurrentTime is the actual zone clock
passed to each delivered callback. Load/real-time timing parity remains distinct
from the deterministic CPU scheduler comparison below.

`population_runtime::Population` owns reserved handles, persistent route
candidate storage, source pool counts and each living NPC's native status
session. It preserves command/ready-list order and source failure behavior:

- A ready handle remains ready after failed placement. Its route and Init draws
  are consumed, and the next ready handle is tried in the same command.
- Successful generation performs route preparation, native Init, free-cell
  placement, verified empty Mandara Pop, appearance and occupied-cell insertion.
  Subsequent generator checks skip already living handles and retain counts.
- PC status, NPC generation and entry placement adopt one shared world RNG under
  the same world lock. Network writes occur outside that lock through PC queues.
- Native NPC status retains template MOB coordinates. Presentation uses its
  separate Target cell; the presentation copy does not rewrite the owned status
  session's internal template position.
- Source group metadata is represented, but all supplied Zone01 generators have
  group zero. Group branches therefore have no authored acceptance coverage.
  The component rejects command counts above the supported ten-entry profile
  and undefined active group pool-five/follower overflow instead of reproducing
  out-of-bounds native array accesses.

There is no implemented NPC death/release/respawn path yet. The native sessions
are retained for subsequent AI/combat work, rather than pretending that initial
spawn is a complete lifecycle.

## Appearance and visibility

NPCs use the original `0x9112` appearance body and `0x9022` removal body. Account
fields and visual equipment remain zero for generated NPC handles; internal
Monster parameter equipment fields are not player equipment. The native internal
Monster TP index and zone-zero initialization data are accepted independently
from PC character validation.

NPCs enter the same occupied-cell and visibility registry as PCs. Initial scans,
movement visibility and `0x0369` retry can return NPCs. Only PC handles can be
network recipients or count toward native broadcast recipient limits. NPCs have
no queued network output. PC FIRST placement and movement now consult this full
registry instead of a separate PC-only position map.

## Verification

- Four actor CPU tests pass: existing PC appearance, routing/retry/output checks,
  plus 23 compiled-source NPC appearances and 14 mixed PC/NPC visibility routes.
- One new CPU test compares the original full `GenerateMob` function and native
  staggered scheduler, direct source-derived NPC Init and original placement
  against Rust across **1,702 initial spawns and 256 ticks**. Pool counts, cells,
  status/deck inspection and RNG after every tick match. The final seed-1 state
  is **939570764 after 585101 draws**. A delayed-callback check verifies that one
  delivered timer event advances one counter tick without duplicate generation.
- The native reference supplies an initially-ready/no-death wait predicate and
  empty Pop callbacks, matching the selected eight authored Mandara bindings.
  Boss audit/file logging is removed from the reference. These comparisons do
  not prove death delays, group behavior, complete common CMob Init, deployed
  server binaries or unimplemented AI world actions. The documented native
  damage-index correction and poison-field carry still apply.
- Clippy and workspace Debug x64 build pass; all three executables are staged
  in `_server/bin`.

## One retained socket attempt

Capture: `_server/test-output/native-population-1792786542-43524`.
One Zone01/channel-1 process and one logical TCP peer used ashesh/ashesh and an
isolated saved-roster fixture. HTLauncher was not launched.

The attempt passed its assertions for native entry, an NPC appearance, exact
NPC retry, occupied-destination correction and unchanged NPC appearance after
that correction. The zone logged 199 living NPCs across five timer deliveries.
Its final SQLite assertion failed because the test copied revision **4** from a
different route that additionally spends Chakra. This fixture ends at revision
**3**: seed save, CHAR_INIT save and movement save. The retained database has
current cell `(513,335)`, original save cell `(523,349)` and zero sessions/zone
owners; shutdown was clean. The original reply's destination was not written to
a packet capture, so its equality to the saved cell is not claimed as independently
verified after the failed assertion.

The harness now derives its expected revision from the fixture save and writes
the movement reply context before the final assertion. The corrected harness
passes static compilation/lint but **has not been launched again**. Overall
socket acceptance remains open. No automatic retry or second client process was
started. The normal client executable and offline SQLite remain unchanged.

Evidence: [native-initial-population.json](evidence/native-initial-population.json).
Logs: `_server/target/live-population-*.log`.

## Source and implementation references

- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: GenerateMob,
  quarter-second scheduler, ready/count/group and creation sequence.
- `C:\_GitHub\TantraSrc\Tantra\zone\GetFunc.cpp`: GetCreateMob and
  PickFreeMobGrid.
- `C:\_GitHub\TantraSrc\Tantra\zone\SendFunc.cpp`: SendGridMob and both
  GridMulticast forms, including PC-only recipients.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\population_runtime.rs`:
  owned initial generation.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\actors.rs`: appearance,
  occupancy and routing.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\runtime\world_entry.rs`
  and `zone_gateway.rs`: shared-world clock and PC integration.
- `C:\_GitHub\TantraSrc\_server\crates\native-rules\native\population_reference.cpp`:
  original-function reference with initial-generation adapters.
- `C:\_GitHub\TantraSrc\_server\fixtures\native-initial-generation.json`
  and `native-npc-actors.json`: checked comparison fixtures.
- `C:\_GitHub\TantraSrc\_server\crates\services\tests\population_runtime.rs`
  and `C:\_GitHub\TantraSrc\_server\crates\zone\tests\native_population.rs`:
  CPU comparison and the retained single-zone attempt.

Next implement native movement/aggro/skill world actions and the NPC death/reward
lifecycle, then complete the connected frontend and remaining acceptance gates.
