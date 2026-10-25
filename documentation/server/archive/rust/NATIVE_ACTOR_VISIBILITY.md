# Native PC actor visibility

Current integration: [TCM startup and routing](NATIVE_TCM_STARTUP_AND_ROUTING.md)
records the newer cell/startup/RNG correction. [Initial Mandara publication](NATIVE_INITIAL_POPULATION.md)
records the publication component and retained socket-attempt limitation. Earlier
propagated-grid snapshots below are historical component evidence; their stated
narrower checks do not establish corrected startup or full gameplay acceptance.

Updated: 2026-10-24. This extends the Rust-owned Mandara FIRST/status/movement
component with PC appearance, nearby delivery and disconnect cleanup. It does
not complete NPC population, combat simulation or online HTLauncher integration.
`game_ready` remains false.

## Protocol and lifecycle

- `S_SCP_INIT_OTHER_MOB` (`0x9112`) has a 264-byte body, 276-byte normalized
  frame. It carries the owned handle, native name/account, tribe/face/hair,
  position, HP, class/karma, seven compact visual equipment records, 64-bit
  affections, caste and clan. Unsupported guild/trade/event metadata remains
  zero; guild ID is retained from the native snapshot.
- Initial equipment uses the selected source's seven `SetViewEquip` calls:
  helmet, armor, pants, shield, one-hand weapon, boots, gloves. The original
  `BASE_GetRefineVariable` compares the main item ID repeatedly rather than
  individual subrefines; this selected-source behavior is preserved.
- `MSG_Action` (`0x0366`) retains its native client tick and action fields;
  the authenticated actor handle replaces the client-provided handle. Existing
  movement/property/occupancy checks and persistence run before publication.
- Initial appearance follows native `SendGridMob` ordering. Movement sends
  mutual removals/creates across the old/new rectangles, then broadcasts around
  the midpoint. Normal movement does not echo to its owner; existing occupied
  destination correction behavior remains.
- Point multicasts preserve the native spiral, clamped center and recipient
  limits, including the center-not-counted quirk. The native negative initial
  edge clamp and positive movement-edge bound are deliberately retained.
- `S_SCP_RESP_REMOVE_MOB` (`0x9022`) has a 32-byte body. Disconnect sends result
  2; visibility changes and unsuccessful actor retries use result 0. Previously
  uninitialized native fields are zeroed deterministically.
- `MSG_REQMobByID` (`0x0369`) accepts its four-byte body and returns an appearance
  only for an existing actor within `GetInHalf`'s inclusive native bounds.
  Missing or distant actors return removal; invalid IDs are ignored.
- Native status events keep Owner/Nearby routing. Nearby delivery uses the
  source's 50-recipient point multicast, including the owner if selected.
  Party delivery remains pending. Chakra spending itself emits owner UI, not
  a nearby status event; it must not manufacture a broadcast for a test.

Each player has a FIFO bounded to 512 KiB / 2,048 frames. Overflow fences that
peer until its connection loop disconnects it. Shared frame buffers avoid a
copy for every recipient. The world lock is released before any player socket
write. Disconnect removes the grid cell and queues removal before handle reuse.
These bounds are development safeguards, not production capacity measurements.

## Evidence

- Three focused Rust tests pass. Independent C++ extraction compiles the actual
  native appearance/refinement functions and `SendGridMob`/both `GridMulticast`
  overloads. All eight tribe appearance frames match byte-for-byte. Fourteen
  normal/edge routes match initial ordering, point recipients/limits, movement
  removals/creates/action order, and nearby status recipients. Other tests cover
  retry visibility, output overflow and remove-before-create on handle reuse.
- The packaged one-Zone01 acceptance passed with two logical TCP peers on
  channel 1: FIRST, mutual appearance, owner Chakra UI, movement and exact header
  tick, current-position retry, disconnect removal and stale-actor retry.
  SQLite reopens at revision 4 for ActorOne, with the moved cell saved and zero
  sessions/zone owners after clean exit. No HTLauncher process was launched.
- Passing capture: `test-output/native-actors-1792781924-43688/acceptance.json`.
  The earlier failed capture `native-actors-1792781826-14880` is retained: its
  harness incorrectly waited for a Chakra nearby-status event. Source review
  corrected that expectation before another headless run.
- Lint-only equivalent spiral comparison cleanup was followed by CPU parity,
  Clippy and a workspace rebuild, without repeating the socket route. Exact
  tested/current artifact hashes and client preservation are recorded in
  `docs/evidence/native-actor-visibility.json` and `validation.json`.

Commands from `C:\_GitHub\TantraSrc\_server`:

```powershell
cargo test -p tantra-services --lib actors::tests --locked --offline
cargo test -p tantra-zone --test native_actor_visibility --locked --offline -- --nocapture
cargo clippy -p tantra-services -p tantra-zone --all-targets --locked --offline -- -D warnings
cargo build --workspace --locked --offline
```

## Reference and implementation paths

- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.h`: native packet records/constants.
- `C:\_GitHub\TantraSrc\Tantra\zone\GetFunc.cpp`: `GetCreateMob`, `GetInHalf`.
- `C:\_GitHub\TantraSrc\Tantra\zone\SendFunc.cpp`: initial grid and multicast routing.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.cpp`: `BASE_GetRefineVariable`.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`: visual equipment, Chakra/status behavior.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: entry visual slots, actor retry handler.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\actors.rs`: codec/grid/queues.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\runtime\world_entry.rs`: authority integration.
- `C:\_GitHub\TantraSrc\_server\tools\native-codec\generate_actor_source.py` and
  `actor_main.cpp`: independent native fixture exporter. Only the old C++ loop
  variable declaration is adjusted for modern for-loop scope; originals stay read-only.
- `C:\_GitHub\TantraSrc\_server\fixtures\native-actors.json`: checked fixture.
- `C:\_GitHub\TantraSrc\_server\crates\zone\tests\native_actor_visibility.rs`: isolated network acceptance.
