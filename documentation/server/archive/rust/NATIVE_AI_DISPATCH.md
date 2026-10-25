# Native AI data and dispatch

Current integration: [TCM startup and routing](NATIVE_TCM_STARTUP_AND_ROUTING.md)
records the newer cell/startup/RNG correction. [Initial Mandara publication](NATIVE_INITIAL_POPULATION.md)
records the publication component and retained socket-attempt limitation. Earlier
propagated-grid snapshots below are historical component evidence; their stated
narrower checks do not establish corrected startup or full gameplay acceptance.

Updated: 2026-10-24. Rust now loads the selected authored AI settings and ports
the native `Think`/`Speak` decision and dispatch sequence. **World group actions,
React behavior, actual skill casts, event execution, live generator timing and
NPC publication remain unfinished.** This component does not complete monster
combat or make the zone game-ready.

## Data and source semantics

`tools/import-native-ai.py` reads
`B:\__TANTRA\TantraDataScripts\Global\HTSSetting-global.xml`. Numeric field
assignment order is extracted from the corresponding loaders in
`C:\_GitHub\TantraSrc\Tantra\zone\HTServerSetting.cpp`. The importer preserves
physical DOM cell addressing, native decimal-prefix conversion, shared temporary
carry on missing cells and first duplicate-ID precedence. Data remains separate
from both the client import and the existing full Monster profile.

The selected sheets contain 145 AIList records, 207 ActionList records,
211 Action records, 150 SpeechContent records and 348 SpeechComment records.
The runtime applies the source LoadSetting bounds and signed-short casts.
Counts use positive stored entries without compacting list or speech gaps.
The strict load bounds and inclusive Think bounds intentionally differ: the
maximum row is a zero-initialized runtime row, rather than a loaded record.

Speech selects `szPhilippine` for the existing Philippines development profile.
The import explicitly uses Windows-1252 bytes with replacement for unrepresentable
characters. It is not a claim of equivalence to every host ANSI code page or
another deployed server's parameter binary. All supplied selected comments fit
the native 101-byte buffer with a terminator. Longer comments are rejected;
undefined native string reads are not reproduced.

Derived input is `_server/derived-assets/native-ai`; staged content is
`_server/data/native-ai`. Both stay out of Git. A manifest and importer provenance
hash-check data before use. Staging rejects overlapping input/output, changed
payloads and malformed tables. Original XML/C++ files remain read-only.

## Implemented dispatch

`native_ai::Profile::think` preserves native guards, action-list random choice,
then the original order:

1. Speak: comment choice, valid/empty comment checks, speech rate, CantTrace and
   Dodge adjustments, inclusive probability comparison, optional name-format
   randomization and chat/head location selection.
2. CallOthers hook with the selected action, group code and original target.
3. React hook with the selected action, action code and original target.
4. Skill lookup across all nine native monster skill-book entries, charged slot
   and cast-count update, synchronous UseSkill hook and wrapping action-lock time.
   A missing requested skill returns before event dispatch, as native code does.
5. TriggerEvent hook with its original target, event ID, current target cell and
   caller handle. Loaded `sState` remains unused, matching the source function.

Hooks run immediately and may change actor/RNG state before the next phase.
The dispatcher is an executable pure-Rust rule component; the actual world
implementations of group/React/casts/events must still be supplied. A recording
hook in a CPU test is not a working combat or event system. Missing gameplay must
return an error instead of being silently counted as implemented.

## Mandara Pop gate

The 23 selected Monster types use AI profiles **1, 3, 11, 12, 13, 14, 15 and 90**.
Each has an authored `iPop` binding of zero. The actual native Think(Pop) path
therefore returns without action selection, callbacks or random draws for these
actors. `verify_quiet_pop` executes that guard path and checks zero draws.
It rejects invalid NPC handles and any nonempty dispatch requiring world hooks.
All 11 authored profiles with nonempty Pop bindings are rejected by this guard.

`validate-generation-pop` composes the previously verified route/Init/placement
walk with that gate for every successfully placed actor. Packaged validation
initializes and places all 1,702 reserved handles, verifies Pop dispatch, and
retains the seed-1 state **3702199242 after 585107 draws**. This deterministic
component walk is not the native staggered zone schedule. It publishes no
actors and reports `live_actor_publication: false`, `game_ready: false`.

## Verification and limits

Two new CPU tests pass. The main fixture covers **18,062 cases** against compiled
original Think/Speak functions, including 743 cases with nonempty hook output.
Comparisons cover hook order/arguments and speech bytes, RNG state/draw count,
skill charging/cast count, action lock, source guard boundaries and speech-disable
behavior. Additional checks cover staged provenance/tamper rejection, list gaps,
malformed bounds and the quiet-Pop gate.

The C++ harness loads the same imported settings and records world hooks; it
does not execute original CallOthers, React, UseSkill or TriggerEvent bodies.
The comparison proves dispatch behavior with these table values, not those
world side effects, the entire XML utility library or stock-server binary
interoperability. The extraction checks selected native limits and retains
source/content hashes. The original legacy for-loop variable scope is adjusted
for modern C++ compilation without changing the loop's algorithm.

Clippy and the workspace Debug x64 build pass. All three executables are staged
in `_server/bin`. No zone listener, server session or game client was launched;
normal client executable and offline SQLite hashes remain unchanged.

Evidence: [native-ai-dispatch.json](evidence/native-ai-dispatch.json).
Test/import/build/validator logs are `_server/target/native-ai-*.log`.

## Commands

From `C:\_GitHub\TantraSrc`:

```powershell
_server/tools/Import-NativeAi.ps1
cargo test --manifest-path _server/Cargo.toml -p tantra-services --test native_ai --locked --offline
_server/bin/tantra-service.exe validate-generation-pop --service _server/data/native-world --status _server/data/native-rules --zone E:/Global-server/Zone01 --ai _server/data/native-ai
```

`Build-Server.ps1` imports AI alongside native world content using `WorldSettings`.
Its existing skip flags also skip this data import for code-only builds.

## Implementation references

- `C:\_GitHub\TantraSrc\Tantra\zone\CMOB.CPP`: Think, Speak and the pending
  world CallOthers/React behavior.
- `C:\_GitHub\TantraSrc\Tantra\zone\LoadSetting.cpp`: table assignment,
  load bounds, short casts, action/comment counts and language selection.
- `C:\_GitHub\TantraSrc\Tantra\zone\HTServerSetting.cpp`: XML loader order
  and shared temporary; selected speech language column.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.h`: AI event IDs, limits,
  monster skill count and speech properties.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\native_ai.rs`: tables,
  staging, dispatcher, ordered hook contract and quiet-Pop proof.
- `C:\_GitHub\TantraSrc\_server\crates\services\tests\native_ai.rs`: parity,
  provenance and edge checks.
- `C:\_GitHub\TantraSrc\_server\tools\native-codec\generate_ai_source.py`
  and `ai_main.cpp`: compiled native decision/speech reference and recording hooks.
- `C:\_GitHub\TantraSrc\_server\fixtures\native-ai-dispatch.json`: fixture.

Next connect generator ready/alive/death state, a single zone timer and NPC
appearance/occupancy. General AI hooks, skills/effects and the remaining six-area
requirements stay open in the main progress checklist.
