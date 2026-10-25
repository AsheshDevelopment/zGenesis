# Native NPC initialization and skill state

Current integration: [TCM startup and routing](NATIVE_TCM_STARTUP_AND_ROUTING.md)
records the newer cell/startup/RNG correction. [Initial Mandara publication](NATIVE_INITIAL_POPULATION.md)
records the publication component and retained socket-attempt limitation. Earlier
propagated-grid snapshots below are historical component evidence; their stated
narrower checks do not establish corrected startup or full gameplay acceptance.

Updated: 2026-10-24. Rust can now own initialized native NPC status sessions.
This implements the source NPC initialization branch, skill/deck setup and
status equations. **Live population, Pop AI callbacks, combat and actor
publication remain pending.** `game_ready` is still false.

## Implemented component

The shared rules crate hosts engine-free C++ logic extracted from the selected
native source, as the PC status component already does. It is not a claim that
the arithmetic has been rewritten entirely in Rust.

- `NativeMonsterParameters` executes the initialization-parameter part of
  `LoadMonsterData`, before reward/rate-deck loading. It preserves native field
  casts, class defaults, skill fallbacks, property aliases and special flags.
  Reward fields and their startup RNG effects are a separate unfinished path.
- NPC status sessions execute the source NPC `CMob::Init` branch, including
  movement/aggro/weakness rates, target-selection deck, AI options, conditions,
  segment wait, ten-second activation time, `LoadSkills` and `UpdatePoints`.
- Actor handles use the native NPC range, and the NPC source data remains
  distinct from PC entry/class repairs and owner UI messages.
- Rust supplies the clock, actor identity, coordinates, segment waits and
  incoming shared RNG state. The result returns the updated RNG state/draw
  count, mob state, status summary and private inspection of skill/rate/deck
  state. The inspection is a test interface, not a game wire packet.
- Common item/skill/refinement tables remain immutable and pinned by a Rust
  `Arc`. Each NPC copies only the skill records it accesses into its own mutable
  overlay. It does not clone the complete parameter tables per creature.
- `MonsterSession` owns stable heap C++ state and can move between threads;
  it remains `!Sync`. Its tables outlive it through the owning common-rules Arc,
  even after the template-rule wrapper is dropped. Native exceptions are caught
  at the ABI boundary. This path uses no UI, graphics device, COM or engine TLS.

The exposed API currently provides initialization and snapshots. It does not
present PC Chakra/learning actions as NPC behavior or claim an implemented NPC
combat loop.

## Explicit source behavior and correction

The XML loader requests `iPosisonResist` for the poison field. The supplied
authored sheet instead contains `iPoisonResist`. Native `HT_LOADCELL` reuses
`iTemp`; the original integer reader leaves that output unchanged on a missing
field. Consequently poison inherits the preceding lightning value. The adapter
compiles the original ordered field assignments and preserves that behavior,
without changing the XML or staged numeric table. The original library's
destination store is at offset `0x236`; failed lookup paths return without that
store. See the retained disassembly under
`_remake/build-ogre-sdl/native-xml-library-disasm.log`.

The source NPC `UpdateDamage` branch also uses
`pSkillData[m_krgSkill[0].sID + 500]`. For monster 2001 that requests index 41504
from an array whose native size is 7000. Reproducing that undefined read would
not establish valid damage parity. The generated remake adapter instead uses
`m_krgSkill[0].iIndex`, already assigned by native `LoadSkills`: 4004 for this
monster. The generator checks that exactly one legacy expression is corrected
and fails for review if the selected source changes. All original source files
remain untouched. Tests cover the valid index and this explicit departure from
the unsafe source expression.

## Verification

- Three new Rust tests pass: all 23 monster types referenced by Zone01 with
  two RNG seeds (46 cases) match the direct source-derived C++ caller across
  input/output mobs, status summaries, skill/rate/deck inspection and RNG.
- Fixed checks establish monster 2001's HP 36, movement speed 1, attack speed
  1500, blocked mask `0x2011`, activation time 20000 and initial wait 24. Seed 1
  consumes 319 draws and ends at state 3241142486.
- A separate lifetime/thread test transfers an NPC session after dropping its
  template-rule owner and verifies unchanged state.
- The affected PC status regression passes all 24 existing cases, including
  Chakra, learning and effect expiry. These are CPU checks, not another client
  or multi-channel test.
- Clippy, workspace Debug x64 build, and the packaged `validate-npc-init`
  command pass. Its deterministic validation walk initializes 23 types using
  one carried RNG stream: 7327 draws, ending state 2789112886. This walk does
  not simulate generator timing, segment-placement draws or Pop callbacks.

The C++ comparison verifies the same source-derived component outside the Rust
ABI, with the correction above. It does not claim full original-server binary
interoperability or verification of every common `CMob::Init` side effect.

Evidence: [native-npc-initialization.json](evidence/native-npc-initialization.json).
The original failed lookup capture remains at
`target/npc-reference-legacy-index-failure.log`; it is not a passing result.
No zone process, game window or HTLauncher was launched for this step. The
normal client executable and offline database remain unchanged.

## Commands

From `C:\_GitHub\TantraSrc\_server`:

```powershell
cargo test -p tantra-native-rules --test monster --test status --locked --offline
cargo clippy -p tantra-native-rules -p tantra-services --all-targets --locked --offline -- -D warnings
cargo build --workspace --locked --offline
.\bin\tantra-service.exe validate-npc-init --service .\data\native-world --status .\data\native-rules --zone 'E:\Global-server\Zone01'
```

The validator checks staged data hashes/provenance before constructing NPC
rules. It prints `live_actor_publication: false` and starts no listener.

## Reference and implementation paths

- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`: `Init`, `LoadSkills`,
  `UpdatePoints` and subordinate status equations; unsafe legacy damage lookup.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: `LoadMonsterData` and
  its initialization/reward boundary.
- `C:\_GitHub\TantraSrc\Tantra\zone\HTParamMgr.cpp`: ordered Monster XML
  assignments, getter field types and poison spelling.
- `C:\_GitHub\TantraSrc\Tantra\zone\HTUtilLib.lib`: original integer reader.
- `C:\_GitHub\TantraSrc\_remake\tools\generate-native-monster-template.py`:
  initialization-parameter loader/getter/field extraction.
- `C:\_GitHub\TantraSrc\_remake\tools\generate-native-pc-stat-core.py`:
  NPC Init extraction and checked damage-index correction.
- `C:\_GitHub\TantraSrc\_remake\src\resources\NativeMonsterParameters.cpp`:
  native typed parameter adapter.
- `C:\_GitHub\TantraSrc\_remake\src\compatibility\HtPcStatProjection.cpp`:
  isolated NPC entry, state and shared-table overlay.
- `C:\_GitHub\TantraSrc\_server\crates\native-rules\native\bridge.cpp` and
  `src\lib.rs`: C ABI ownership and Rust wrappers.
- `C:\_GitHub\TantraSrc\_server\crates\native-rules\native\monster_reference.cpp`:
  direct C++ comparison; checked fixture `_server\fixtures\native-npc-init.json`.
- `C:\_GitHub\TantraSrc\_server\crates\native-rules\tests\monster.rs`: tests.

[Generation preparation](NATIVE_GENERATION_PREPARATION.md) now composes segment
randomization, NPC initialization and occupied-cell placement with verified
shared RNG ordering. Next connect Pop callbacks, extend actor appearance and
occupancy to NPC handles, and run one zone-owned generation clock. That runtime
gate remains open alongside the other gameplay and acceptance requirements in
the main checklist.
