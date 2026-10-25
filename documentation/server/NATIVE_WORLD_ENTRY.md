# C++ native world entry and ownership

The owned implementation is in `include/tantra/{world,zone_map,movement,actors,npc}.h`
and `src/zone`. It builds the selected native data, arithmetic and logical packet
contracts into C++ x64. It does not establish stock-client encrypted-wire compatibility
or a completed world server.

## Implemented components

- Packed IDX/TCM readers retain the first floor's native property/height/event
  projection. Event IDs 1..255 add the native event property bit. Truncation,
  duplicate cells, invalid counts/dimensions/floors and trailing bytes are rejected.
- FIRST entry retains Trimurity group selection, common-group fallback, connection
  counter/RNG order, zero/boundary recovery and native empty-grid search order.
  Spawn/save-point changes are committed by SQLDMN before publication.
- PC/NPC appearances use fixed-width native records. Visibility retains the native
  initial/moving rectangle differences, border quirks, point spiral, recipient
  limits and remove/create/action ordering. Queues fence slow peers.
- Movement uses the committed position, calculated status and native speed record.
  It checks map/actor obstruction and sends native corrections. Successful saves
  precede grid changes. Save failure removes tentative state and releases ownership.
- The world authority accepts authenticated native FIRST `CHAR_INIT`, initializes
  the directly reused C++ status session, sends the 3604-byte reply before its
  ordered status events, and persists Chakra/skill/status/position changes.
  Session/node renewal and disconnect/shutdown cleanup use SQLDMN fencing.
- The optional native zone worker separates asynchronous socket I/O from the
  authoritative thread. One bounded queue carries incoming commands; the same
  owner advances timers and actors. Administration runs independently.

`game_ready=false` remains intentional: NPC services, complete gameplay
and OGRE online acceptance are unfinished. `entry_ready`, `movement_ready` and
`game_listener_bound` describe individual components; they do not advertise a fully
playable channel. Full AI, combat, continuous damage/recovery, parties, quests,
travel and other unsupported packets are not silently simulated.

[Native inventory and cargo](NATIVE_INVENTORY.md) now connect item moves,
equipment, packing/splitting and atomic item/money transfers to this authority.
NPC dialogue and graphical online UI acceptance remain open.
[Ordinary merchants, repair and save-point handlers](NATIVE_NPC_SERVICES.md) now
have source-backed CPU authority checks. Individual `inventory_ready`,
`cargo_ready`, `ordinary_merchants_ready`, `repair_ready` and `save_point_ready`
flags describe backend components, not a completed NPC service or playable channel.

## Profiles and operation

Imported profiles keep `cpp-administration` behavior when the optional
`implementation` field is absent. `cpp-native-world` selects the new worker.
The current FIRST authority accepts Zone01; other zones retain their own folders
and administration while their gameplay paths remain pending.

```powershell
# Dataset/profile operation only; does not launch a listener:
.\bin\TantraZone.exe --zone .\zones\Zone01 --root . --enable-world
# An explicit start, once the profile and dependencies are ready:
.\bin\TantraZone.exe --zone .\zones\Zone01
```

The manager starts matching C++ SQLDMN/DBSRV dependencies before a native zone,
waits for its actual entry/listener readiness and drains zones before shared
services. Opening the manager starts no workers. Profile edits remain stopped-only
and preserve unknown fields/comments. The normal Zone01 profile has not been
automatically switched during the isolated route.

Native sockets accept loopback peers, at most the configured player count capped
by native handles 1..999, one pending command per connection, 4 KiB bodies and
bounded outgoing queues. The command queue is capped at 256 entries/1 MiB;
per-peer output is capped at 2048 frames/512 KiB. Partial frames have a ten-second
deadline, idle peers 120 seconds, processing fifteen seconds and writes two seconds.
Tick rate follows the profile. Reported maintenance tick timings exclude command
and persistence latency; they are not a capacity benchmark.

SQLDMN owns account/character writes. The zone only writes its separate operational
run history/logs. Normal shutdown unregisters the zone once, letting SQLDMN remove
its playing leases atomically while retaining pending handoff recovery semantics.
Native data and state remain separate; no normal client/offline database is opened.

## Verification and retained failure

Debug and Release CPU checks cover:

- 25 recorded spawn cases and the native TCM property hash.
- 96 speed-guard cases and exact action bytes.
- 31 PC/NPC appearance records and 28 visibility routes.
- Exact CHAR_INIT bytes and an isolated SQLite-backed entry/status/Chakra/
  visibility/obstruction/reconnect route, including owner-thread rejection,
  failed-save fencing and shutdown cleanup.

One Release TCP attempt started SQLDMN, DBSRV and one isolated Zone01 with a
packet probe, ashesh/ashesh and no HTLauncher. Login and CHAR_INIT passed. The
movement assertion failed because the probe treated the first subsequent UI frame
as a movement acknowledgement. Native initialization emits multiple ordered UI
updates; a CPU replay reproduces the stale-frame assertion and confirms that
consuming to the requested position reaches the committed update. The corrected
probe records received packet metadata and movement context and has been built.
Its TCP route has not been rerun. This failure does not establish a native worker
or game-client crash, nor does the CPU correction complete TCP acceptance.

Retained attempt: `C:\Users\Ashesh\AppData\Local\Temp\tantra-cpp-world-route-d5623bdb0c28`.
See `failure.json`, `diagnosis.json`, the isolated database and each role's logs.
The corrected route requires approval under the plan's no-automatic-retry rule.
Graphical OGRE selection/entry/movement/NPC acceptance is a separate open gate.

## NPC initialization boundary

`NpcRules` verifies the full Monster table against its authored provenance. The
older `_remake/derived-assets/world-gameplay/Monster.tsv` has 48 columns and lacks
fields consumed by the native initialization loader. The owned full 92-column
input comes from `_server/derived-assets/native-world/Monster.tsv`, with provenance
to `B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml`. It is an authored Global
profile, not evidence of identical deployed server tables.

The C++ NPC wrapper validates native handles and pins shared tables until the
status session is destroyed. Forty-six recorded cases cover templates, skills,
retained-deck state, inspection bytes and RNG. [Initial generation](NATIVE_POPULATION_AI.md)
is now connected to the authoritative zone tick and actor visibility. The CPU
authority route verifies timer publication and shutdown cleanup. A fresh worker
route, remaining world AI reactions, combat, rewards and full NPC services remain open.
Ordinary [peace processing](NATIVE_NPC_PEACE_PHASE.md) and
[flee/roam/return](NATIVE_NPC_FLEE_ROAM.md) now have CPU-verified timer integration.

## Source references

- `Tantra/zone/GetFunc.cpp`: generation groups, empty-grid search and movement/spatial helpers.
- `Tantra/zone/server.cpp`: FIRST entry, native character/action handlers and ordered delivery.
- `Tantra/zone/CMob.cpp`: native status, Chakra/skill changes, effects and movement guards.
- `Tantra/zone/Basedef.*`, `CNPCGene.*`, `TNInfluenceMap.cpp`: actor/grid/generation contracts.
- `_server/fixtures/native-{entry,movement,actors,npc-actors,npc-init}.json`: recorded
  compiled-source comparisons, copied with SHA-256 provenance.
- `_server/crates/services/src/{zone_data,movement,actors}.rs` and `runtime/world_entry.rs`:
  existing logical contracts used for comparison; unchanged.
- `_remake/src/compatibility` and selected resource loaders: directly reused owned
  C++ copies recorded in `src/rules/PROVENANCE.json`, including separately hashed
  owned status-adapter extensions; no Rust ABI is required.

The full [implementation progress](IMPLEMENTATION_PROGRESS.md) remains open.
The [evidence record](evidence/native-world.json) separates passing CPU checks
from the failed TCP attempt and the unverified corrected probe.
