# Native NPC movement control and enemy detection

Updated: 2026-10-24. These are implemented source-backed simulation components.
They are not yet connected to the live ProcessMonster loop. Initial Mandara NPC
generation/publication remains the runtime integration boundary; `game_ready`
remains false. The full six-area implementation goal is unfinished.

## Implemented behavior

`npc_movement.rs` ports GetNextPos, SetSegment and StandingByProcessor from
`C:\_GitHub\TantraSrc\Tantra\zone\CMOB.CPP`. It retains native route bytes,
shrinking-distance retries, the slot-zero GetEmptyMobGrid mask, segment waits,
route progression and the eight-tick handle order from ProcessMonster. A wait
decreases by eight at the native two-second standing interval. The source's
failed movement-rate roll sets a wait which SetSegment subsequently clears;
the port preserves that order rather than replacing it with a new behavior.

The compact `NpcControl` bridge reads current native status and rolls the actual
retained movement/aggression/weakness decks. It does not recreate a deck per
decision or copy the full inspection snapshot for every roll. Explicit NPC
snapshots now refresh from live native state. Rust owns each C++ session and
keeps its immutable tables alive; the session remains Send and not Sync.

`npc_detection.rs` ports GetEnemyFromView. The original hostility table has
26 clans and is directional. Selection requires a table value greater than 11.
The native 1,681 detection offsets and all 21 radius counts are preserved,
including their original order and duplicates.

- Radius at most 20 uses the authored spiral and filters blocked cell properties.
  Larger radii scan rows, with upper bounds excluded, and do not apply that
  property filter. The latter path skips the current cell explicitly.
- Protection, undetectable affections, dead/empty actors and the level-gap rule
  apply before hostility/rate decisions. Zone 16 bypasses the level-gap rule
  only in the short-range branch; zones 9, 10, 12 and 21 bypass it in both.
- A failed aggression roll continues scanning. An invalid clan stops scanning.
  An excess attacker count calls Think(StopToAttack, target) and stops, rather
  than trying another candidate. Callback errors propagate to the owner.

The detection and movement hook interfaces preserve call order. They require
the world owner to supply the retained rate session, shared RNG adoption and
real Think callbacks when integrated. General skill/group/event callbacks are
not replaced by empty implementations.

## Verification

- Direct source-derived C++ and Rust NPC control/rate comparison passes 46
  timelines across all 23 Mandara monster types and two seeds: 384 rolls each,
  17,664 operations in total. Selector errors preserve state; refreshed full
  snapshots match. Existing PC and NPC status regression tests pass.
- Compiled original GetNextPos/SetSegment/StandingByProcessor comparison passes
  1,613 controller cases and 16 native handle-order cases. It covers wait,
  speed, obstruction, affections, routes, path bytes, RNG and hook order.
- Compiled GetEnemyFromView comparison passes 4,573 cases, covering clan pairs,
  every native offset, both scan branches, protections, level/zone exceptions,
  attacker limits and ordered rate/Think calls. Separate guard checks cover
  map edges, malformed radius/handle fields and callback error propagation.
- A separate comparison checks the complete compiled hostility, radius and
  offset tables, plus equality with the existing radius-10 placement prefix.

Controller reference hooks use recorded Think calls and controlled rate results.
Detection reference rate calls similarly use controlled results and consume a
tracked LCG draw to verify call ordering. Actual retained rate-deck behavior is
checked separately by the native control/rate timelines. These comparisons do
not establish a running original server, combat behavior or live NPC walking.

The references compile extracted original functions with small actor/grid
adapters. Enemy extraction adds observation of the candidate reaching each
rate call; it changes no selection decision. Source hashes are retained in
generated includes. All original source and authored data stay read-only.

## Explicit guards outside defined native behavior

The original segment code can read beyond its five-element array at terminal
phase-out boundaries and can loop forever through empty segment cycles. The
port returns the phase-out result before those reads, rejects undefined reverse
rotation indexes, detects repeated progress/direction states and checks integer
overflow. Those cases are not claimed as parity with an undefined native read.

The native detector uses `> MAX_GRIDX/MAX_GRIDY`, permitting an undefined read
at coordinate 1024. Rust uses actual exclusive map bounds. Long-range iteration
is clamped to the map, skipping only iterations that native bounds checks would
discard. Invalid actor handles and values outside native radius field widths
return errors rather than accessing arbitrary actor memory.

## Files and reproduction

Project root: `C:\_GitHub\TantraSrc`.

- `_server/crates/services/src/npc_movement.rs`, `npc_detection.rs` and
  `native_enemy_tables.rs`: Rust controllers, detection and source tables.
- `_remake/src/compatibility/HtPcStatProjection.{h,cpp}` and
  `_server/crates/native-rules/{native/bridge.cpp,src/lib.rs}`: native control,
  retained rates, refreshed snapshots and checked Rust ownership.
- `_server/tools/native-codec/generate_movement_control_source.py`,
  `movement_control_main.cpp`, `generate_enemy_source.py`, `enemy_main.cpp`
  and `navigation_harness.h`: compiled-source references.
- `_server/fixtures/native-npc-{control,movement-control,detection}.json`:
  checked comparison data.
- `_server/crates/native-rules/tests/npc_control.rs`,
  `_server/crates/services/tests/npc_movement.rs` and `npc_detection.rs`:
  CPU comparisons and guards.
- Original `Tantra/zone/CMOB.CPP`, `Basedef.cpp`, `Basedef.h`, `GetFunc.cpp`
  and `server.cpp`: behavior, tables, constants, empty-cell rules and caller order.

From the project root:

```powershell
cmake --build _server/target/native-codec --config Release --target native-movement-control-fixtures native-enemy-fixtures
& _server/target/native-codec/Release/native-movement-control-fixtures.exe E:/Global-server/Zone01 _server/fixtures/native-npc-movement-control.json
& _server/target/native-codec/Release/native-enemy-fixtures.exe _server/fixtures/native-npc-detection.json
cargo test --manifest-path _server/Cargo.toml -p tantra-services --test npc_movement --test npc_detection --locked --offline
cargo test --manifest-path _server/Cargo.toml -p tantra-services --lib npc_detection::tests --locked --offline
cargo test --manifest-path _server/Cargo.toml -p tantra-native-rules --test npc_control --test monster --test status --locked --offline
```

The control/rate fixture comes from the existing direct C++ monster reference
with its `--rates` argument. Rust's checked source tables can be regenerated with
`generate_enemy_source.py Tantra/zone <temporary-include-output>
_server/crates/services/src/native_enemy_tables.rs`, followed by cargo fmt.

Next integrate these components in original ProcessMonster order, including
activation delay, conditions/status refresh, detection, Detect/UnderAttack
callbacks, attacker memory/combat entry, movement/rest/removal publication and
the remaining combat/flee/roam branches. Native speech and action codecs must
be connected with their source recipient rules. Casts, effects, rewards,
death/respawn, loot and broader gameplay acceptance remain open.

Evidence: [native-npc-control-detection.json](evidence/native-npc-control-detection.json).
