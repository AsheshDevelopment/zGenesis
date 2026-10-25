# Rust server and gameplay implementation progress

Updated: 2026-10-24. **The six requested areas are not fully implemented.**
This records verified server components and retains every requested
deliverable. The OGRE/SDL3 client continues to use its existing offline authority.

## 1. Rust services, SQLite, sessions and game networking — partial

- [x] Add the `tantra-services` Rust crate and `tantra-service.exe` to the workspace and build/package script.
- [x] SQLDMN owns a separate `services/SQLDMN/state/server.sqlite3`; the client profile is never used as the server database.
- [x] Add schema identity/version checks, migrations through schema 4, WAL, foreign keys, full synchronous commits and transactional character deletion backups. Schema 3 adds native web credentials/account identity; schema 4 adds zone/session ownership. Existing progression and cargo preservation are tested.
- [x] Store native password proofs as salted Argon2id verifiers. Provisioning is insert-only and reads passwords from stdin.
- [x] Add account/world session leases, duplicate-owner rejection, idle expiry, disconnect release and fencing of released/expired owners.
- [x] Persist three fixed character slots, native 1,688-byte character snapshots, world-wide case-insensitive character-name uniqueness and revision-checked saves.
- [x] Persist 120-slot account cargo; commit character and cargo revisions atomically. Reject item/money creation, loss, changed item properties and stale revisions during warehouse transfers.
- [x] Implement token-protected, bounded, localhost-only internal SQL RPC and separate administration endpoints.
- [x] Expose a development DBSRV character endpoint using the remake's normalized native `0x1003`, `0x1011`, `0x1012`, `0x1013` logical packets. Support actual fragmented/coalesced TCP reads and complete response writes.
- [x] Match the C++ new-character and roster codec byte-for-byte, including equipment ordering, all eight tribes and the source-accepted nonstandard tribe edge case.
- [x] Add manager Start/Stop controls, SQLDMN-before-DBSRV startup, reverse shutdown, exact child ownership and live readiness. Keep SQLDMN running if DBSRV has not drained.
- [x] Reserve administrative connection capacity; bound data connections, frames and idle/incomplete requests. Hold a Windows instance-lock handle for each service state directory.
- [x] Package Windows x64 Debug executables in `_server/bin`.
- [x] Copy the supplied server manager icon into `assets/Icon-ZoneServer.ico`, embed it in the manager executable and configure the window icon. The rebuilt executable's icon payload matches the supplied ICO; no GUI was launched.
- [x] Implement the selected Philippines profile's native web-login/status phase and source-backed failure notices/name-filter tables. Verified the existing C++ login and village-selection lookups against the packaged Rust executable: credential failures/retry, native main/test world offset, 50 rows per entry, three source filter notices and corrected-name retry. Unimplemented worlds remain unavailable.
- [ ] Finish selection-to-zone session handoff, transfer authorization, retry/reconnect and destination ownership. SQL transactions, native reconnect authentication, owned Mandara FIRST and same-endpoint reconnect are verified; live cross-zone gameplay and its failure acceptance remain pending.
- [x] Implement the SQLDMN ownership transactions: zone-instance leases, same-endpoint character binding, durable/idempotent transfer reservations, destination claim, cancellation, timeout/restart recovery and stale-owner fencing. Eight focused CPU tests pass. Full native CHAR_INIT/frontend integration is still required by the open item above.
- [x] Expose native authentication/roster/create operations on a real ZONESRV socket through DBSRV coordination. Verify the packaged executables with one Zone01: nonempty-character world auth, roster-disconnect race, stale roster fencing, duplicate-world rejection, protected dependencies and clean lease release. This is authentication readiness, not CHAR_INIT/gameplay readiness.
- [x] Implement bounded IDX/TCM readers, native FIRST-entry spawn/empty-cell rules and the CHAR_INIT logical packet codec. Five focused CPU tests pass, including 25 entry cases against compiled native functions and full C++ reply-byte parity. Startup loads the selected zone's own data.
- [x] Add Rust-owned native status sessions using the engine-free C++ source-equation component, with immutable authored tables, checked FFI, per-actor packet IDs and shared-world RNG adoption. Direct C++/Rust comparison passes 24 cases across all eight tribes, equipment, dead entry, Chakra, skill learning and effect expiry. This is native C++ arithmetic hosted by Rust, not a claim of a pure Rust rule port.
- [x] Stage only the required stat/item/skill tables with importer provenance and SHA-256 checks; verify canonical Windows paths and rejection of changed tables/provenance.
- [x] Renew live character leases without changing snapshot revisions; reject renewal after transfer or zone-owner loss. Focused SQL ownership test passes.
- [x] Accept authenticated Mandara FIRST CHAR_INIT, apply entry class/quest repairs, choose an unoccupied native cell, initialize status and save before sending success. One packaged Zone01 test verifies restored level/equipment/skills, ordered native UI packets, Chakra/learning requests and SQLite revision/save-point persistence. No game client launched.
- [x] Implement the active `MSG_Action` codec, native movement-mode/property/occupancy checks and source speed-guard arithmetic. Two CPU tests pass, including 96 comparisons against compiled native CheckMoveHack, full packet bytes, blocked cells, owner cells and correction rules. Status sessions change world cells without replaying entry/UI events.
- [x] Verify packaged single-zone movement, native blocked-cell warp correction and same-endpoint disconnect/reconnect. SQLite reopens at revision 6 with moved cells, restored skills/Chakra/equipment and the original save point. One headless Zone01 process was used; the game client was not launched.
- [x] Add the native PC appearance/removal codec and original grid visibility routing. Compiled-source parity passes eight tribe appearances and fourteen initial/point/movement/nearby routes, including map-edge clamps, spiral limits and recipient order. NPC population remains pending.
- [x] Add bounded per-player FIFO output, slow-peer fencing, disconnect removals, safe handle reuse and native `MSG_REQMobByID` retry with half-grid visibility checks. Three focused CPU tests pass; socket writes occur outside the shared world lock.
- [x] Verify PC appearances, native peer movement/header tick, owner Chakra UI, actor retries and disconnect removal using two logical TCP peers in one packaged Zone01/channel-1 process. SQLite revision 4 and zero remaining leases/zone owners are verified. See [actor visibility evidence](NATIVE_ACTOR_VISIBILITY.md); no game client launched.
- [ ] Complete world entry and native actor simulation. Listeners, Mandara FIRST/status, owned cell movement and PC visibility/broadcasting are available; initial Mandara NPC publication is connected; AI/combat, remaining entry services/checks and online frontend acceptance are open. Zone `game_ready` remains false.
- [ ] Connect HTLauncher's native frontend and gameplay actions to Rust authority. No online client mode was enabled by this change.
- [ ] Implement MSGSRV, CHATSRV and ITMSRV. Their GUI controls remain disabled.
- [ ] Complete cargo access checks at the world/NPC layer, native packet dispatch and UI acceptance. SQL cargo conservation is a persistence guarantee, not proof of a working Rust warehouse NPC.
- [ ] Establish load limits, backpressure/retry guarantees, backup/restore, crash recovery, remote security and production capacity. This implementation is bounded localhost development infrastructure.

The development DBSRV endpoint carries **normalized logical CSP packets**, not
the original encrypted socket stream or native internal SSP DBSRV protocol.
In the original deployment, the zone frontend forwards character work to DBSRV.
This temporary endpoint proves the remake codec/persistence path; it does not
establish stock-client or original-service binary interoperability. Internal
JSON RPC is a remake service interface and is not presented as the game protocol.

## 2. Active skills, periodic effects, monster AI and loot — open

- [x] Add a separate full-numeric authored Monster import/staging profile with provenance/hash validation, leaving the existing client data profile untouched. Add runnable `stage-world-content` / `validate-world-content` commands and server build/import integration. Packaged validation loads 964 native-range templates; the default importer retains all six existing client table payloads byte-for-byte. These prepare data; they do not activate NPC simulation.
- [x] Port generator parsing/verification, source command counts, reserved monster handles and staggered/one-shot scheduling. Compiled native parity covers all 508 Zone01 generators and 1,702 reserved handles, plus parser edge cases and scheduling samples.
- [x] Port the source influence grid, ordered radius-10 `PickFreeMobGrid` search and all 440 source offsets. Four CPU tests pass, including the full grid fingerprint, nine candidate queries, twenty placement cases, bounds and tampered-content rejection.
- [x] Add Rust-owned native NPC status sessions: source-derived initialization parameters, NPC Init branch, skill/target/rate decks, status equations and shared-RNG adoption at creation. Three new CPU tests pass across 23 Mandara types/two seeds (46 direct C++/Rust cases), fixed expected values and cross-thread/lifetime ownership; the 24-case PC status regression also passes. This is C++ source logic hosted by Rust; general AI/combat remains open; initial Mandara publication is now connected.
- [x] Preserve the native XML loader's misspelled poison-column carry behavior and correct its unsafe NPC damage-table lookup to the internal index already initialized by LoadSkills. Original source files remain unchanged; the correction is recorded explicitly rather than claimed as byte-identical undefined behavior.
- [x] Implement source-ordered route preparation, shared-RNG NPC Init and occupied-cell placement before Pop. New CPU tests pass 1,021 compiled-source route cases and 3,404 composed initialization/placement cases (all 1,702 reserved Mandara handles, two seeds), including fixed/random-pop routes, empty/stale influence storage and failed-placement RNG conservation. Pop callbacks, generator lifecycle and live publication remain open. See [generation preparation](NATIVE_GENERATION_PREPARATION.md).
- [x] Import and hash-validate authored AI/action/speech tables using native field order, missing-cell carry, signed casts and first-ID precedence. Port Think/Speak dispatch and ordered world-action hooks; two new CPU tests pass 18,062 compiled-source cases plus provenance, gaps/bounds and quiet-Pop guards. Mandara's eight selected AI profiles have native empty Pop bindings; nonempty profiles require their real callbacks. This does not implement group actions, combat casts or events. See [AI dispatch](NATIVE_AI_DISPATCH.md).
- [x] Extend native appearance and visibility to NPC handles, keeping NPCs out of PC socket recipient limits/queues. Four actor CPU tests pass, including 23 compiled-source NPC appearances and 14 mixed PC/NPC routes; PC visibility/retry/queue regressions pass.
- [x] Connect one coalesced quarter-second zone clock to native reserved-handle initial generation, shared RNG, verified empty Mandara Pop and actor occupancy/publication. CPU comparison passes the original full GenerateMob/scheduler path for 1,702 initial spawns over 256 ticks, including counts and RNG after every tick. Native group branches have no authored Zone01 cases; death/respawn, movement AI, casts and general callbacks remain open. One packaged Zone01 attempt delivered NPCs/retries and occupied movement repair; its final revision assertion was wrong. The corrected harness has not been rerun, so overall socket acceptance stays open. See [initial population](NATIVE_INITIAL_POPULATION.md).
- [x] Match the selected TCM startup: preserve first-floor heights/events, low-word event IDs/HaveEvent, native zero defaults and the early return that skips influence propagation. Correct runtime generation to use that startup grid. New compiled-source tests compare every Mandara cell and a synthetic sparse/multifloor/event dataset; the full 1,702-spawn/256-tick generation comparison passes with the corrected startup.
- [x] Port BASE_GetRoute's native step priority, strict MH=1000 height comparisons, blocked-height sentinel and 24-byte route semantics. CPU checks pass 2,880 real-map cases and six synthetic detour/height cases. StandingBy/aggro/movement integration remains open; this primitive does not yet make NPCs walk. See [TCM startup and routing](NATIVE_TCM_STARTUP_AND_ROUTING.md).
- [x] Expose compact native NPC control state and retained movement/aggression/weakness rate rolls through the checked Rust/C++ bridge. CPU comparison passes 46 NPC/seed timelines and 17,664 rate operations, including refreshed snapshots and invalid-selector conservation; PC/NPC status regressions pass.
- [x] Port GetNextPos, SetSegment and StandingByProcessor with the native eight-tick handle order. CPU comparison passes 1,613 compiled-source controller cases and 16 update-order cases. Undefined native segment indexes/cycles are guarded explicitly. Live enemy detection, callbacks, movement publication and the full AI/combat loop remain unfinished.
- [x] Port GetEnemyFromView's native spiral/rectangle searches, hostility, protection/level/attacker limits and ordered aggression/StopToAttack hooks. CPU comparison passes 4,573 compiled-source cases plus bounds/error checks. Source radius-20 versus long-range property/zone differences are preserved. Live integration with owned rate decks, Think callbacks and combat entry remains open.
- [x] Preserve the existing offline Chakra spending, learning, basic quick slots, melee, bounded pursuit/respawn and basic loot implementations.
- [ ] Port source cast eligibility, costs, range/target checks, preparation and cooldown to authority; connect quick-slot activation.
- [ ] Implement timed and periodic combat effects with attacker context, effect expiry/cancellation and authoritative persistence boundaries.
- [ ] Extend source-backed monster skill selection, aggro/leash, generator segments, damage/reward ownership and native loot tables/lifetimes.
- [ ] Verify combat arithmetic and RNG order against the selected native source, then exercise the connected gameplay path.

## 3. Quests, advanced NPC services and refinement — open

- [x] Preserve existing offline dialogue, buying/selling, repair, warehouse and save-point code; integrated Mandara acceptance remains unfinished.
- [ ] Port quest conditions, state transitions, objectives, completion and rewards with durable native quest IDs.
- [ ] Complete religion/class, transport, quest/guild NPC callbacks and native confirmation/failure UI.
- [ ] Port refinement/combination validation, fees, material consumption, chance calculations and result handling as atomic authority operations.

## 4. Travel and remaining resurrection paths — open

- [x] Preserve the existing ordinary offline death dialog and bounded same-world return implementation.
- [ ] Implement portal/transport routing, destination readiness, ownership handoff and recovery after transfer failure.
- [ ] Port remaining resurrection types, native penalties and applicable source settings; persist the result atomically.
- [ ] Verify each route uses its selected zone's atomic GenerationArea/TCM/NPC dataset and authored map routing.

## 5. Chat, parties, trading, guilds and PvP/events — open

- [ ] Trace and implement shared message/chat/item responsibilities from available native headers and call sites; preserve unverified boundaries explicitly.
- [ ] Implement native chat scopes, parties, invitations, membership and disconnect behavior.
- [ ] Implement two-party trade offers, confirmation/revision checks, atomic exchange and cancellation/disconnect recovery.
- [ ] Implement guild persistence, ranks/permissions and native callbacks.
- [ ] Port applicable PvP, arena/siege/event eligibility, scoring, timers, rewards and persistence.

## 6. INTRO, collision, environment and loading acceptance — open

- [x] Add direct client HPK reads for the 148 supplied map/object/FX/UI/sound packs, preserving original paths and bytes; CPU archive/UI/WAV/Mandara checks passed. See [HPK guide](../../../client/guides/NATIVE_HPK_RUNTIME.md). Visual/loading acceptance remains open.
- [x] Preserve previous INTRO/model/texture/HUD fixes, movement/camera fallbacks, map-config environment and resource-cache work.
- [ ] Finish the saved-roster Mandara gate: warehouse items/Rupiah, save point, camera obstruction and remaining movement route.
- [ ] Verify selection stability, equipment attachments and failure/retry handling on the intended build.
- [ ] Resolve authored collision parity. The supplied Mandara client assets still lack the native `.tbo` data; triangle fallback is not complete parity.
- [ ] Verify original sky/cloud/fog/star/sun/moon/flare behavior, water/weather, visibility and dynamic loading per map.
- [ ] Record loading/memory/frame-time measurements before claiming optimization or instantaneous loading.

No HTLauncher process was launched for this shared-service implementation. The
earlier instruction against automatically retrying the failed Mandara client
attempt remains in force. The old acceptance goal is not marked complete.

## Verification and retained evidence

### 2026-10-24: NPC movement controller, retained rates and enemy detection

[NPC control and detection](NATIVE_NPC_CONTROL_AND_DETECTION.md) records
the implemented components and their explicit defined-source/safety boundaries.
The native control bridge passes 46 timelines/17,664 retained rate operations;
GetNextPos/SetSegment/StandingBy pass 1,613 cases and 16 handle-order cases.
GetEnemyFromView passes 4,573 cases plus complete native table and bounds/error
checks. Existing PC/NPC status regressions pass.

These components are not yet connected to ProcessMonster. Real Think callbacks,
activation/status/condition order, attacker memory/combat entry, movement
publication, casts/effects, rewards, death/respawn and loot remain open. No new
zone listener, manager GUI or HTLauncher has been launched for these checks.
The six-area goal and previous Mandara acceptance gate remain unfinished.

### 2026-10-24: actual TCM startup and native route prerequisites

[TCM startup and routing](NATIVE_TCM_STARTUP_AND_ROUTING.md) corrects a prior
integration assumption: the selected original TCM loader returns before its
influence propagation loop. Runtime now preserves that startup grid, first-floor
heights/events, HaveEvent and native missing-cell zero defaults.

Two new CPU tests compare all Mandara cells, a sparse/multifloor/event fixture,
2,880 real-map BASE_GetRoute cases and six height/detour cases. The full original
TCM-startup/GenerateMob/scheduler comparison passes 1,702 spawns over 256 ticks;
new final seed-1 state is 1270257614 after 585143 draws. The propagated-grid fixture
is preserved separately. Entry codec/25-spawn checks and both movement tests
also pass. Clippy/workspace x64 Debug build/package pass.

The packaged file-order component validator places 1,701 of 1,702 attempts and
reports one placement failure; the source-timed CPU run places all 1,702. Neither
is presented as current socket acceptance. No new zone/game process was started.
StandingBy/aggro/movement publication and the full AI/combat loop remain open.

### 2026-10-24: initial NPC generation, visibility and manager icon

[Initial population](NATIVE_INITIAL_POPULATION.md) records the enabled runtime
and its boundaries. Four actor CPU tests pass, including 23 NPC appearances and
14 mixed PC/NPC routes. The new initial-generation comparison matches all 1,702
source spawns across 256 ticks, pool counts, occupied cells, status/decks and RNG.

One isolated Zone01/channel-1 socket attempt received NPC appearances/retries and
an occupied-cell movement reply, then failed its copied expected-revision-4
assertion. The retained database has revision 3, moved cell `(513,335)`, original
save cell `(523,349)`, zero sessions/zone owners and clean shutdown. Revision 4
belonged to a different route that also spends Chakra. The corrected harness
is compiled/linted but has not been launched again. Whole-route socket acceptance
and the six-area goal remain open.

The manager now uses the supplied Icon-ZoneServer.ico for its executable resource
and window configuration. Its embedded image bytes match the project copy and
original. Clippy/workspace x64 Debug build pass; no manager GUI or HTLauncher was
launched. The normal client/profile are unchanged.

### 2026-10-24: native AI settings and Think/Speak dispatch

[AI dispatch](NATIVE_AI_DISPATCH.md) records the imported source semantics,
ordered hook contract and comparison boundary. Two CPU tests pass 18,062 direct
compiled-source cases, plus staging/tamper, gaps/bounds and quiet-Pop checks.
The C++ world-action hooks record calls; group/React/actual casts/events remain
unfinished and are not claimed as tested gameplay.

The rebuilt packaged importer stages all five AI/speech table families. Its
`validate-generation-pop` command places all 1,702 reserved Mandara actors and
verifies their eight AI profiles' empty Pop bindings. RNG remains at state
3702199242 after 585107 draws. Clippy, formatting and workspace x64 Debug build
pass. No zone listener or game process was launched; live clock/publication and
all broader gameplay gates stay open.

### 2026-10-24: ordered generation preparation before Pop

[Generation preparation](NATIVE_GENERATION_PREPARATION.md) implements
source route randomization, shared-RNG NPC Init and occupied placement in their
original order. Two new CPU tests pass 1,021 route cases and 3,404 composed
cases covering all 1,702 Zone01 reserved actors with two seeds, plus edge and
blocked-placement invariants. The three previous population tests pass.

This comparison stops before Think(Pop). Live generator scheduling/lifecycle,
Pop effects, actor publication and authority combat remain unfinished. No game
client or zone listener was started.

### 2026-10-24: native NPC initialization and skill decks

[NPC initialization](NATIVE_NPC_INITIALIZATION.md) records the source-derived
component, ownership and two explicit legacy issues. Three new tests cover
46 direct C++/Rust cases across 23 Zone01 monster types and two seeds, fixed
values, bounded damage indexing, native poison carry, and thread/lifetime
ownership. The affected 24-case PC status regression also passes.

The packaged `validate-npc-init` command initializes those 23 types with one
carried RNG stream (7327 draws, final state 2789112886). Clippy and workspace
x64 Debug build pass. No zone or game client was launched. Native Init/skills
are now implemented in this component; segment/init/Pop ordering, zone-clock
integration and live NPC actor publication are still unverified/unimplemented.

### 2026-10-24: generator data and spatial foundation

[Native population data](NATIVE_POPULATION_DATA.md) records the implemented
algorithms and their boundary. Four CPU tests compare source parser/reservation,
schedule, influence and placement behavior. All 508 Zone01 generator records,
1,702 reserved handles, 440 search offsets, nine candidate queries and twenty
placement cases match the independent compiled reference. The full influence
fingerprint is `472219098147025299`.

Packaged server-only import and validation commands pass, along with Clippy,
formatting and a workspace x64 Debug build. No zone/game process was launched.
This checkpoint preceded the NPC initialization component above. Pop callbacks,
full segment/init/Pop RNG ordering and live monster actors remain pending;
the larger AI/combat/loot item stays unchecked.

### 2026-10-24: native PC actor visibility

Guide: [native actor visibility](NATIVE_ACTOR_VISIBILITY.md). Three CPU tests
pass with eight compiled-source appearance cases and fourteen routing cases.
The passing socket capture is
`test-output/native-actors-1792781924-43688/acceptance.json`; the earlier
`native-actors-1792781826-14880` capture preserves a corrected harness expectation,
not a claimed native crash. Chakra sends an owner UI update rather than the
nearby status message that the first harness incorrectly awaited.

The final equivalent lint cleanup passed CPU parity and rebuilt all three x64
server artifacts; the socket route was not repeated for that expression-only
change. Historical tested hashes and current hashes remain separate in evidence.
NPC/monster actors, party delivery, connected frontend and full world acceptance
remain open; `game_ready` is still false.

### 2026-10-24: native action movement and reconnect

Details: [native movement authority](NATIVE_MOVEMENT_AUTHORITY.md).
Packaged evidence: `test-output/native-zone-1792779552-40352/acceptance.json`.
The one-zone fixture verified movement from `(497,187)` to `(498,187)`, native
warp correction for authored blocked cell `(438,127)`, delayed-owner release,
same-endpoint roster/CHAR_INIT reconnect and restored progression. SQLite revision
6 retains the moved current cell and unchanged original save point. Source files
are unchanged and shutdown leaves zero account/zone leases. The two movement CPU
tests include 96 source-compiled speed-guard cases with heavy/clean-reset coverage;
the 24-case status test also verifies position updates without stale frame replay.
This does not prove actor visibility, NPC simulation or client camera/collision parity.

### 2026-10-24: owned Mandara FIRST/status and progression

Implementation and boundaries: [Rust-hosted native status](NATIVE_STATUS_AUTHORITY.md).
Packaged evidence: `test-output/native-zone-1792778612-25596/acceptance.json`.
One isolated Zone01/SQLDMN/DBSRV fixture passed, including source-preserved data,
restored level-50 progression/equipment, CHAR_INIT, three initial UI frames,
Chakra/skill requests, explicit UI refresh, saved spawn and revision 4 after exit.
The source-equation ABI test passes 24 C++ comparison cases; staged-content and
lease-renewal tests pass. All nine SQL ownership tests pass. No HTLauncher ran.
The native web status still reports unavailable worlds; actor simulation and the
client's online authority connection are unfinished.

### 2026-10-24: native entry data and codec

Details and reproduction: [native zone entry parity](NATIVE_ZONE_ENTRY.md).
`fixtures/native-entry.json` records the independent C++ codec and selected
`GetFunc.cpp` functions. Two unit tests and three integration/CPU tests pass:
all Zone01 property cells, 16 MSVC RNG draws, 25 saved/new-character entry cases,
reply bytes, malformed packed data, dynamic occupancy and save-point semantics.
This verifies entry prerequisites; it does not establish gameplay readiness.
The rebuilt packaged executables also passed one isolated Zone01 authentication
run: `test-output/native-zone-1792777707-41784/acceptance.json`. The selected
IDX/TCM data loaded at startup, source hashes stayed unchanged and shutdown left
zero sessions/zone leases. `game_ready` and successful CHAR_INIT remain false.

### 2026-10-24: ownership and native zone authentication

Implementation and boundaries: [session ownership and native zone auth](SESSION_OWNERSHIP_AND_ZONE_AUTH.md).
Packaged-binary evidence: `test-output/native-zone-1792776756-18916/acceptance.json`.
Eight ownership tests, real schema-3 migration, database reopen and the isolated
Zone01 native authentication path pass. The management-only lifecycle and base
inventory/cargo persistence regressions also pass. No game client was launched.
This historical checkpoint predates the FIRST/status component above. Full world
simulation and live two-zone travel remain open.

### 2026-10-24: native web login and source filters

Implementation, commands and source paths: [native login guide](NATIVE_WEB_LOGIN.md).
Twelve focused tests have passed across the initial eleven-test suite and the
additional native world-index check. The packaged executable was then verified
with the corrected C++ login/village lookup in
`test-output/native-login-1792774148-2036/acceptance.json`.

- [x] Stage and hash-check the selected Zone01 `NameFilter.txt`, `ChatFilter.txt`, `Language.txt` and route paths derived from client HTMessage records 301–303. Never contact or stage historical public IP endpoints.
- [x] Add SQLite schema 3 with a distinct salted web verifier, insert-only native credential provisioning and authenticated opt-in upgrade for existing zone-only accounts. Existing accounts/characters survive migration.
- [x] Serve bounded localhost HTTP credential/status requests on configured DBSRV web port (default 21006); preserve native numeric error replies and 50 rows per world. Zone admin heartbeats alone never advertise gameplay readiness.
- [x] Decode the native server-list locale header and preserve the main-server test-world prefix. Verify both `group + serverType` and `zone - 1` lookups with the existing C++ INTRO selection rules and a CPU-only ready-village fixture.
- [x] Verify native source filter semantics and the native MessagePanel notice while preserving the authenticated connection for corrected-name retry.
- [x] Run the compiled C++ login code against one isolated SQLDMN/DBSRV pair. Keep the failed path-format probe capture and the successful fixture under `test-output/native-login-*`. No HTLauncher process launched.

The legacy loader excludes its last filter entry after EOF. The Rust reader
preserves this selected-source behavior while avoiding the original fixed-buffer
overflows. Other country credential encodings/billing providers are not claimed.
The next open item remains selection-to-zone ownership transfer and recovery.

### Initial shared-service slice (2026-10-23)

Six targeted tests passed: two persistence unit tests (expiry fencing and schema
migration), two integration/CPU persistence tests (ownership/revisions/cargo and
unrelated-database refusal), one C++/Rust byte-parity test and one real service-pair
TCP lifecycle test. The final TCP test used one isolated SQLDMN/DBSRV pair, not
game clients or multiple game channels. Earlier failed socket/shutdown fixtures
remain under ignored `test-output`; their results are not represented as passes.

- `cargo test -p tantra-services --lib --test persistence --test codec_parity --locked --offline`
- `cargo test -p tantra-services --test native_tcp --locked --offline`
- `cargo clippy --workspace --all-targets --locked --offline -- -D warnings`
- `cargo fmt --all`
- `tools/Build-Server.ps1 -Configuration Debug`
- MSVC x64 fixture exporter: `tools/native-codec`; checked fixture: `fixtures/native-character-codec.json`.
- Manager layout capture: `test-output/shared-services-ui/manager-final.png`. This checks the controls/layout, not exhaustive mouse interaction or failure paths.
- Current artifact hashes and the successful service fixture path are recorded in `validation.json`.

## Source references

- `B:\__TANTRA\TantraSrc\Tantra`: newly supplied reference root. It contains `DBSRV`, `SQLDAEMON`, `zone`, `HTlauncher`, `Database`, `Xml`, `Temp`, `Web`.
- Compared `zone/CMob.cpp`, `zone/CMob2.cpp`, `zone/server.cpp`, `DBSRV/Server.cpp` and `SQLDAEMON/Server.cpp` against `C:\_GitHub\TantraSrc\Tantra`; all five pairs were byte-identical.
- No separate MSGSRV, CHATSRV or ITMSRV source folder/file was found in that B: tree. Deployment executables in `E:\Global-server` remain read-only references.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: character frontend sequencing/validation; `C:\_GitHub\TantraSrc\Tantra\DBSRV\CFileDB.cpp`: new-character state.
- `C:\_GitHub\TantraSrc\_remake\src\client\NativeCharacterRecords.cpp`, `NativeCharacterCreation.cpp`, `NativeWebLogin.cpp`, `OfflineInventoryRules.h`, `OfflineStore.cpp`: selected remake codec, credential profile and existing cargo semantics used for this port.

## Next implementation gate

Implement remaining source world-entry services, native nearby actor visibility,
NPC/monster simulation and the native frontend connection. Owned FIRST/status,
PC visibility/retry/removal, cell movement, saved progression and same-endpoint reconnect now pass headless
network checks. Live cross-zone gameplay and its failures remain open.
Keep the other five areas open until their implementation and acceptance evidence
exist. The earlier failed OGRE Mandara acceptance has not been retried.

Source trace for this next gate: `IntroCharacterFrontend.cpp::selectWorld` and
`requestWorldInit` support both changed-endpoint disconnect/reconnect (point 02,
nonempty MoveZone character name) and same-endpoint CHAR_INIT. The current client
does not send an added public transfer-ticket request before either path.
`Tantra/DBSRV/CFileDB.cpp:679` authenticates/uppercases account credentials,
rejects an existing owner and requests its save/quit. Preserve the native client
sequence while implementing internal reservation, fencing and recovery.
