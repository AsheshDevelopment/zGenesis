# Native action movement and reconnect

Implemented and verified on 2026-10-24. Rust Zone01 now accepts owned native cell
movement, saves current cells and supports same-endpoint roster/CHAR_INIT
reconnect. This is the movement/state component of the unfinished actor world.
`game_ready` remains false. Nearby actor creation/broadcasting, NPCs, the online
frontend and client camera/collision acceptance remain open.

## Selected native sequence

References are read-only in `C:\_GitHub\TantraSrc\Tantra`:

- `HTlauncher/HTMainCharacter.cpp:3984`: segmented movement requests and
  `HT_vNetWork_Send_MSGAction`; walk uses effect 2 and run uses effect 3.
- `HTlauncher/TNNetworkManager.cpp:515`: active MSG_Action transmission.
  The older RequestCharMoveBroadcast path above it is commented out.
- `zone/Basedef.h:4184`: MSG_Action (`102 | 0x0100 | 0x0200 = 0x0366`).
  The normalized frame is 32 bytes: 12-byte header and 20-byte body containing
  key, starting cells, animation speed, action, direction and target cells.
- `zone/server.cpp:5042`: active action handler, Don'tMove/death checks,
  view/destination bounds, CheckMoveHack, PCNotAllowed properties and occupied
  target repair through GetEmptyMobGrid.
- `zone/CMob.cpp:9673`: source CheckMoveHack arithmetic and counters.
- `zone/GetFunc.cpp:696`: rounded Euclidean CalDistance.
- `zone/SendFunc.cpp:292`: GridMulticast moves the authoritative grid occupant
  to the destination. Clients animate between action anchors; the source does
  not run a separate server-side continuous path integrator for these requests.
- `zone/server.cpp:19419`: Teleport corrections use MSG_Action effect 5.
- `zone/server.cpp:18512`: `[VisualRange] HalfGrid`, default 32, loaded from the
  selected zone's `Data/Settings.ini` using native Windows profile conversion.

Implementation files:

- `C:\_GitHub\TantraSrc\_server\crates\services\src\movement.rs`: native
  action codec, source guard arithmetic and destination resolution.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\runtime\world_entry.rs`:
  authenticated actor ownership, cell reservation, status position synchronization,
  revision-checked saves and corrections.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\runtime.rs`: preserves
  incoming header ticks alongside logical packets, including fragmented/coalesced
  requests. The client tick does not replace server time in the speed guard.
- `C:\_GitHub\TantraSrc\_remake\src\compatibility\HtPcStatProjection.cpp`:
  updates the status session's owned world cells without replaying initialization
  or emitting unsolicited UI frames. Sitting/standing updates the represented FSM;
  sitting recovery and other world lifecycle services remain pending.

Public actions currently cover sit, stand, walk, run and the native 8–10 emotes.
Forced warp/knockback/slide require their owning gameplay services and cannot be
claimed through this public movement path. Incoming keys never authorize another
actor; the authenticated key is used for owned changes/corrections. Normal moves
do not echo to their predicting owner. Occupancy repair echoes the adjusted target;
blocked/far movement sends an owned warp correction using the last accepted facing.
Cross-player delivery remains part of the next actor-visibility implementation.

Destination checks use native TCM PCNotAllowed/blocked properties (`0x0210`) and
current actor occupancy. An occupied destination uses the native empty-square
search. This does not establish a swept path through buildings or client-authored
collision parity. The supplied Mandara `.tbo` data remains absent, and client
path/camera checks remain open. The selected legacy guard is not a claim of
production anti-cheat or capacity validation.

Current cells are saved before later UI requests can observe the move. Moving
does not change saved resurrection cells. Failure to save closes the connection
and releases its actor reservation/lease. The source guard defaults are retained;
its GM command-based runtime tuning and full localized failure UI remain pending.

## Evidence

`tools/native-codec/generate_movement_source.py` extracts the selected original
CheckMoveHack, CalDistance and MSG_Action definitions with source hashes.
The independent MSVC exporter produces `fixtures/native-movement.json`.
Two Rust CPU tests compare 96 cases, including heavy violations, zone-10 threshold,
clean-counter reset, future timers, non-move reset, GM/disabled bypass and full
packet bytes/tick preservation. They also check movement blocking, occupancy,
own cells, invalid modes and native correction fields.

The existing 24-case status ABI test additionally checks position changes,
unchanged progression/save cells, no stale frame replay and fresh UI coordinates.
Formatting, warnings-denied Clippy and the Windows x64 Debug build/package pass.

```powershell
cmake --build test-output/native-codec-build --config Release --target native-movement-fixtures
./test-output/native-codec-build/Release/native-movement-fixtures.exe fixtures/native-movement.json
cargo test -p tantra-services --test movement_parity --locked --offline
cargo test -p tantra-native-rules --test status --locked --offline
```

One packaged Zone01/SQLDMN/DBSRV run passed at
`test-output/native-zone-1792779552-40352/acceptance.json`:

- Owned FIRST/status restored level-50 Chakra, skill and equipment data.
- A native action moved `(497,187)` to `(498,187)`; UI reflected the committed
  cell without altering calculated progression.
- Authored blocked cell `(438,127)` produced an owned effect-5 correction.
- Disconnect released the old lease; empty-character login followed by FIRST on
  the same endpoint restored the moved cell, skill level 2 and remaining points.
- SQLite reopened at revision 6, preserving equipment/inventory and original
  save-point cells `(497,187)` separately from the moved current cell.
- Clean shutdown left zero sessions/zone leases and one preserved character;
  original dataset hashes were unchanged. Executable hashes are in the evidence.

Only one headless zone process/channel was used. No HTLauncher process launched,
no normal client profile was used and no visual collision acceptance was claimed.
The full gameplay, live cross-zone transfer and remaining five project areas stay
open in [implementation progress](ROOT_IMPLEMENTATION_PROGRESS.md).
