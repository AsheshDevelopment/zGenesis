# Owned C++ status and probability core

`src/rules` builds the existing engine-independent C++ components directly.
It uses the single owned native character codec through a forwarding header;
there is no Rust ABI or renderer dependency. The static library is available to
zone authority. The first isolated C++ TCP attempt reached CHAR_INIT; the corrected
route and graphical client acceptance remain unverified.

`src/rules/PROVENANCE.json` records source hashes for reused C++ files, Python
generators and selected authored inputs. The owned status adapter's inventory
extension has separate original and adapted hashes; other copies remain unchanged.
Owned runtime tables live in `data/rules/character-stats` and
`data/rules/gameplay-parameters`; the original `_remake` copies stay read-only.
The full NPC initialization input is under `data/rules/world-gameplay`, with its
selected source profile and integration boundary documented in [world entry](NATIVE_WORLD_ENTRY.md).
The original source reference defaults to `C:\_GitHub\TantraSrc\Tantra` through
the CMake `TANTRA_REFERENCE_ROOT` cache setting.

At configure time the owned generators extract the selected native stat,
initialization, settings, parameter and probability fragments into
`build/generated/rules`. Generated fragments retain source hashes. No x86 library
or unbounded original client folder is copied into this project.

The `native_status` CPU check compares 24 recorded cases across eight tribes:
entry and resulting 1688-byte snapshots; HP/TP/speeds/point arithmetic; RNG state
and draw count; ordered owner/nearby/party packet events; Chakra spending, skill
learning and effect expiry. Expected fixtures are the recorded direct-C++ inputs
from `_server/fixtures/native-status.json`, copied with provenance. Authored table
and Zone01 settings are loaded from this project's owned copies.

`native_probability` compiles a generated comparison against the selected
original probability methods. Debug records 664,211 comparisons, including the
Windows CRT random stream, retained deck rollover, rate initialization, snapshots
and resumption. This comparison uses deterministic CPU inputs and starts no worker.

These checks establish this component's selected arithmetic and event behavior.
They do not establish movement, actor visibility, NPC AI, authoritative active
combat, world packet routing, persistence integration or full native lifecycle.
Those remain separate milestones in [progress](IMPLEMENTATION_PROGRESS.md).

References:

- `_remake/src/compatibility/HtPcStatProjection.*`, `HtCharacterVitals.*`,
  `HtNativeProbability.*`.
- `_remake/src/resources/NativeCharacterStatTables.*`,
  `NativeGameplayParameters.*`, `NativeWorldSettings.*`.
- `_remake/tools/generate-native-pc-stat-core.py`,
  `generate-native-probability.py`.
- Original `Tantra/zone` stat/initialization/settings/probability source and
  authored provenance retained in `data/rules/*/PROVENANCE.json`.

The owned status adapter now adds `updateInventory`, `updateSavePoint` and read-only mode inspection
for the connected authority. This explicit adaptation preserves actor stance,
position and effects and follows each inventory handler's recalculation/UI flags;
the generic offline update method remains available. Saved cells also survive
subsequent native snapshots without resetting actor state. `src/rules/PROVENANCE.json`
records original source hashes, adapted owned hashes and the change description.
Original and remake references remain unchanged. [Inventory checks](NATIVE_INVENTORY.md)
cover this integration separately from the original status fixtures.

NPC motion synchronization now preserves resolved targets, waits, modes,
progress/direction and operation RNG while retaining template MOB coordinates.
[Spatial/control checks](NATIVE_NPC_SPATIAL.md) verify this owner adapter and the
unchanged initial-generation comparisons. Full periodic world AI remains open.

The [world-action bridge](NATIVE_NPC_WORLD_ACTIONS.md) adds explicit mode/FSM
synchronization and NPC AI charge/cast/action-lock/RNG state to this adapter.
Changed threat controls reach retained status sessions without recalculating or
reinitializing their decks. PC stance and durable MOB bytes remain unchanged by
combat-mode acquisition. Original/adapted hashes and these adaptations are
recorded in `src/rules/PROVENANCE.json`. Full skill execution, periodic caller
order and combat/death authority remain separate unfinished work.

Earlier build/comparison records: [login-and-rules.json](evidence/login-and-rules.json).
