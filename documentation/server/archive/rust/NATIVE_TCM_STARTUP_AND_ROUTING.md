# Native TCM startup and route primitives

Updated: 2026-10-24. Runtime generation now follows the selected source's actual
TCM startup path. The server also has a checked Rust port of BASE_GetRoute.
**StandingBy, enemy detection, movement publication and the full NPC AI/combat
loop remain unfinished.** This change does not make NPCs walk yet.

## Startup correction

`C:\_GitHub\TantraSrc\Tantra\zone\Basedef.cpp::BASE_InitializeAttribute`
initializes the influence map, opens MapData.tcm, copies each cell's first floor,
then returns from that branch. The propagation loop later in the function is
not reached on this selected TCM path. Earlier generation comparisons manually
prepared a propagated grid; they did not exercise this startup return.

`population::Profile::load` now uses `Influence::native_startup`. The standalone
propagation algorithm remains available as `Influence::propagated` for its
existing source-function comparisons. Its old fingerprint is not presented as
the runtime TCM startup fingerprint.

`zone_data::ZoneData` now retains the first floor's:

- WORD height, used by native route height checks;
- WORD state/property;
- low WORD of the DWORD event, matching the original TNCELL assignment.

The original loader adds HaveEvent (`0x8000`) when the stored event is positive
and below 256. It retains other event words without that added flag. Missing
cells retain native zero-initialized height/property/event values. The previous
reader's invented blocked-property default was removed. Validity and bounds
checks remain in the Rust reader; reproducing unsafe malformed-file behavior
is not part of this comparison.

Mandara's deployed TCM contains all 1,048,576 cells. The sparse/multifloor fixture
checks missing cells, first-floor selection, event truncation, event 65535 and
the exclusive upper bound 256. The selected Mandara ExecuteEmergence branch
does not apply the height replacement used by Katacomb. Other zones' subsequent
overrides and event execution still require their own integration.

## BASE_GetRoute port

`npc_navigation::route` preserves the original ordered step choices, diagonal
fallbacks, adjacent-axis early stop, 24-byte route buffer and 23-step cap. It uses
strict height comparisons around MH=1000. A blocked neighbor receives the native
60000 height sentinel before comparison, including the original high-terrain
edge case where that sentinel can pass the height test.

When no step succeeds, the original function leaves the requested target
unchanged. The returned `moved` flag and route bytes retain that distinction;
future GetNextPos/StandingBy integration must consume them as the source does.
This primitive is not yet called by the living NPC movement loop.

## Verification

Two new CPU tests compare against the compiled original BASE_InitializeAttribute
and BASE_GetRoute functions:

- Every Mandara height, property and event cell matches, as does the complete
  startup influence grid.
- A sparse, multifloor, event-boundary dataset matches the same compiled loader.
- 2,880 real-map route cases cover masks, distance bounds, eight directions,
  identical targets and map edges; six synthetic cases cover detours, strict
  height thresholds and the unreachable-height sentinel behavior.

Mandara fingerprints (FNV-1a over explicitly little-endian fields):

| Field | Fingerprint |
| --- | --- |
| Height words | `6605082316536838323` |
| Runtime property words | `14977080742881948821` |
| Stored event words | `8842432114623390501` |
| Startup influence grid | `12866473410273778437` |

The initial-generation reference now invokes original TCM startup before the
original GenerateMob/scheduler functions. The existing CPU test still matches
all 1,702 spawns and 256 ticks, including pool counts, positions, status/decks and
RNG after every tick. Its new final seed-1 state is **1270257614 after 585143
draws**. The earlier propagated-grid fixture is preserved as
`fixtures/native-initial-generation-propagated.json`; its old state/draw totals
are historical component evidence, not the corrected startup result.

Entry codec and 25 spawn cases also pass, as do the corrected zero-default
reader check and both existing movement tests (including 96 native speed-guard
comparisons). The former missing-cell test explicitly expected the old blocked
default; it was corrected after the compiled-loader comparison established
the native zero default. No runtime process was launched for that correction.

Clippy, formatting, workspace Debug x64 build and packaging pass. The packaged
world validator reports the new influence fingerprint. The deterministic
`validate-generation-pop` component walk attempts 1,702 handles in file order,
places 1,701 and reports one failed placement. Its order differs from the native
staggered scheduler, whose compiled-source CPU run places all 1,702. The CLI's
result does not establish a running zone's generation or gameplay readiness.

All original source/data and the normal client/offline database are unchanged.
No zone listener, manager GUI or HTLauncher was started. The retained earlier
socket attempt predates this startup correction; current binary/socket and
visual acceptance remain open.

The reference uses the deployed 76/5/16-byte consumed header/cell layouts in a
small adapter. It is not a complete original SDK ABI or stock-server binary
comparison. Existing NPC Init damage-index correction, poison-column carry,
initially-ready wait predicate and empty Mandara Pop comparison boundaries
remain documented in the earlier component guides.

Evidence: [native-tcm-startup-routing.json](evidence/native-tcm-startup-routing.json).
Logs: `_server/target/tcm-*.log` and `navigation-reference-*.log`.

## Reference and implementation paths

- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.cpp`: actual TCM startup,
  early return, event flagging and BASE_GetRoute.
- `C:\_GitHub\TantraSrc\Tantra\zone\TNInfluenceMap.cpp`: startup Init
  and the separate propagation algorithm.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMOB.CPP`: pending GetNextPos,
  StandingByProcessor and SetSegment integration.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: ProcessMonster order
  and Mandara/other-zone ExecuteEmergence branches.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\zone_data.rs`,
  `population.rs` and `npc_navigation.rs`: corrected reader/startup and route port.
- `C:\_GitHub\TantraSrc\_server\tools\native-codec\generate_navigation_source.py`,
  `navigation_main.cpp` and `zone_cell_types.h`: source extraction, comparison and
  consumed packed-layout adapter.
- `C:\_GitHub\TantraSrc\_server\crates\services\tests\npc_navigation.rs`:
  CPU cell/startup/route comparisons.
- `C:\_GitHub\TantraSrc\_server\fixtures\native-npc-navigation.json` and
  `native-zone-synthetic.tcm`: checked comparison inputs/results.

Follow-up: [NPC control and detection](NATIVE_NPC_CONTROL_AND_DETECTION.md) now
implements GetNextPos/StandingBy/SetSegment, the eight-tick handle order,
retained native rate state and GetEnemyFromView as checked components. Live
ProcessMonster/callback/combat integration, NPC services and the full six-area
goal remain open.
