# Native generation preparation

Current integration: [TCM startup and routing](NATIVE_TCM_STARTUP_AND_ROUTING.md)
records the newer cell/startup/RNG correction. [Initial Mandara publication](NATIVE_INITIAL_POPULATION.md)
records the publication component and retained socket-attempt limitation. Earlier
propagated-grid snapshots below are historical component evidence; their stated
narrower checks do not establish corrected startup or full gameplay acceptance.

Updated: 2026-10-24. The server now composes route preparation, native NPC
initialization and occupied-cell placement in their original order. This is the
generation path **before Think(Pop)**. Live NPC generation, AI callbacks,
appearance publication and gameplay acceptance remain unfinished.

## Implemented sequence

`population_spawn::Preparation::prepare` accepts a generator-reserved actor
handle, the actor's persistent route storage, the zone RNG and occupancy lookup:

1. Verify that the handle belongs to the selected generator and load its native
   initialization template.
2. Prepare all five segments. Fixed route 10 copies without random draws. Route
   8 draws a single source segment, changes the actor route to MoveNRoam, then
   prepares five destinations from that segment. Other routes prepare each
   authored segment in order.
3. Each non-fixed destination draws X/Y offsets, rebuilds its influence list,
   then draws a candidate and two within-cell offsets if candidates exist.
   Source candidate ordering, modulo arithmetic and the MSVC RNG are preserved.
4. Copy the template into the isolated NPC session and execute its Init branch
   with the five waits and the carried RNG state. Template MOB coordinates are
   retained during Init; segment/Last/Target coordinates are separate source
   state. Adopt the returned RNG state and draw count.
5. Execute the source-backed PickFreeMobGrid search using current occupancy and
   native blocked-cell mask. Return an initialized session and optional cell.
   Failed placement still consumes route and initialization draws.

No step publishes an actor or calls a fake Pop callback. The returned cell is
the planned Last/Target/Segment position, rather than proof of a live MOB's
position. The caller must retain route storage across attempts, execute native
Pop behavior, then commit population counts, occupancy and appearance in the
proper lifecycle order. That caller and the single zone generation clock remain
pending.

The original code ignores BuildInfluenceGrids' failure return. Out-of-map
queries retain previous candidate storage/count; an empty valid query clears
the count. An empty candidate set marks the source actor EMPTY and continues
the segment loop; subsequent Init still occurs. The adapter preserves these
distinctions and exposes per-segment empty flags for inspection. It rejects
undefined non-fixed signed arithmetic without consuming RNG rather than
clamping or inventing replacement destinations.

## Verification

Two new CPU tests pass:

- **1,021 route cases**: all 508 Zone01 generators with two carried RNG seeds,
  plus fixed, random-pop, empty and invalid/stale candidate cases. Segment
  coordinates, ranges, waits, route, candidate storage and RNG state/draws match
  the separately compiled original GenerateMob segment branch.
- **3,404 composed cases**: all 1,702 reserved handles with two seeds. Original
  compiled route preparation is followed by direct source-derived C++ NPC Init
  and original PickFreeMobGrid. Rust matches initialized MOB and full private
  skill/deck/rate inspection fingerprints, placement and carried RNG after every
  actor. Successful cells enter the comparison's occupancy map before the next
  actor. A separate invariant verifies that blocked placement does not undo Init
  or its RNG consumption.

The three existing population integration tests also pass. The comparison
uses the explicit damage-index correction and poison-column carry behavior
documented in [NPC initialization](NATIVE_NPC_INITIALIZATION.md). It proves the
selected source-derived composition, not original server binary interoperability
or full common Init, timed generation, respawn, Pop or combat parity.

The reference intentionally walks reserved handles in generator/pool order.
That deterministic CPU validation order is **not** the source's staggered live
generation schedule, and it omits Pop's RNG and side effects. Therefore its
final seed is not advertised as a native running zone's seed.

## Runnable validation

From `C:\_GitHub\TantraSrc`:

```powershell
cargo test --manifest-path _server/Cargo.toml -p tantra-services --test population_route --test population --locked --offline
_server/bin/tantra-service.exe validate-generation --service _server/data/native-world --status _server/data/native-rules --zone E:/Global-server/Zone01
```

The command validates staged content provenance before preparing all 1,702
reserved actors. It starts no listener or game process and reports
`pop_callbacks: false`, `live_actor_publication: false`, `game_ready: false`.
No normal offline profile is opened or written.

Evidence: [native-generation-preparation.json](evidence/native-generation-preparation.json).
Retained test/build/validator logs are `_server/target/population-route-*.log`.

## Source and implementation paths

- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: GenerateMob segment
  preparation, Init, placement, group bookkeeping, Think(Pop), create/occupancy
  publication sequence.
- `C:\_GitHub\TantraSrc\Tantra\zone\TNInfluenceMap.cpp`:
  BuildInfluenceGrids and its unchanged-output failure behavior.
- `C:\_GitHub\TantraSrc\Tantra\zone\GetFunc.cpp`: PickFreeMobGrid.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMOB.CPP`: NPC Init and Think/Speak/
  CallOthers/React. Original sources remain read-only.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\population_route.rs`:
  route preparation and reusable candidate storage.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\population_spawn.rs`:
  ordered preparation through placement; no live activation.
- `C:\_GitHub\TantraSrc\_server\crates\services\tests\population_route.rs`:
  compiled-source comparisons and failed-placement invariant.
- `C:\_GitHub\TantraSrc\_server\tools\native-codec\generate_population_source.py`
  and `population_harness.h`: source extraction and isolated C++ harness.
- `C:\_GitHub\TantraSrc\_server\crates\native-rules\native\spawn_reference.cpp`:
  direct C++ composed comparison.
- `C:\_GitHub\TantraSrc\_server\fixtures\native-population-route.json` and
  `native-spawn-pre-pop.json`: checked comparison fixtures.

[AI settings and dispatch](NATIVE_AI_DISPATCH.md) now load the authored tables
and verify Mandara's empty Pop bindings. Next connect generator ready/alive/death
state and one zone-owned timer, then NPC appearance/occupancy and authority combat.
World actions for nonempty AI bindings remain unfinished. These remain part of the open full implementation goal.
