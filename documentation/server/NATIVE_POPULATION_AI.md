# Native NPC generation and AI dispatch

The C++ zone world now owns initial NPC generation. This is an implemented
simulation component; the corrected isolated TCP route and graphical client
acceptance are still unverified. Combat AI, death/respawn and NPC services are
unfinished, and workers continue to report `game_ready=false` and
`npc_ai_ready=false`.

The [ordinary periodic peace phase](NATIVE_NPC_PEACE_PHASE.md) now runs after
generation, with source recovery/effects/conditions, live detection and standing
actions. Full battle and special-mode/death/lifecycle processing remain open.

## Generation behavior

`include/tantra/population.h` and `src/zone/population.cpp` implement native
`NPCGener.txt` parsing, handle reservations from 1016, staggered generator checks,
route preparation, influence queries, initialization, placement and group links.
The quarter-second callback coalesces delayed delivery once. It never catches up
by synthesizing a burst of missed ticks. Native generator frequency scheduling
is independent of the configured maintenance tick rate.

Placement shares the PC/NPC actor grid. It uses the original 440-entry detection
sequence and native blocked-cell flags. Route preparation and NPC initialization
consume the zone's shared native RNG before placement. A failed placement keeps
those draws and the handle's route candidate history. The owned status retains
its template MOB coordinates; published appearance uses the resolved TargetX/Y.
Initial generation sends native appearance records through the existing bounded
PC visibility queues. NPCs have no network queues of their own.

Generation also prepares the [native threat registry](NATIVE_NPC_THREAT.md):
handle/control/family/AI identity and the final leader/follower links. CPU checks
verify these against every generated NPC and remove them on population cleanup.
The native attacker-memory/group functions are implemented; live PC/mode binding
and the full periodic controller remain unfinished.

The implementation preserves observed source quirks: Segment3Wait writes segment
1; VerifyData repairs only Y; only the first two pools receive generator commands;
and an invalid influence query retains earlier candidates. The supplied startup
returns before influence propagation. Runtime uses that behavior. A separate
explicitly propagated comparison exercises the otherwise dormant algorithm.

Input guards reject exhausted handles, undefined arithmetic, unbounded commands,
group pool-five access and overflowing seven-entry follower lists. These guards
replace undefined source memory accesses; they do not claim support for arbitrary
authored content. The normal Zone01 profile remains administration-only until
explicitly enabled, as described in [native world entry](NATIVE_WORLD_ENTRY.md).

## AI dispatch boundary

`src/zone/ai.cpp` loads the owned Philippine AI tables and byte-encoded speech.
It implements Think/Speak's native selection, gap behavior, RNG order and immediate
callback order: speech, group, reaction, skill and event. Synchronous skill
callbacks retain the selected skill's timing even if the callback changes the
charged slot. Speech preserves original bytes, formatting, rate comparisons and
location rules.

NPC initialization supplies the AI ID, speech rate and native skill metadata.
Generation invokes Pop (event 29) before publication. All referenced Mandara Pop
events are empty. A profile with a nonempty Pop action requires a real world
effect resolver; startup fails without one. Group/react/skill/event callbacks are
an explicit interface, not completed world behavior. Periodic detection,
attacks, speech delivery, group reactions and event execution remain
separate implementation tasks.

[Detection, terrain routing and standing control](NATIVE_NPC_SPATIAL.md) now have
checked C++ components and retained-deck owner adapters. Generated NPCs bind their
prepared motion state, but full periodic world processing remains open.

## Verification

CPU checks launch no service, zone or game process. The recorded compiled-source
fixtures verify the following. The initial-generation checkpoint passed 24 CPU
checks in Debug and Release; see
`build/population-debug-cpu.log` and `build/population-release-cpu.log`.

- 508 parsed generators and 1,702 reserved handles.
- Full influence-map fingerprint, 440 ordered offsets and placement queries.
- 1,021 route cases and 3,404 pre-Pop cases, including exact RNG/deck bytes.
- 1,702 initial spawns over 256 callbacks for both startup and explicitly
  propagated influence: placement, group leader links, counts and global RNG.
- 18,062 Think/Speak cases, including callback mutation and byte-text behavior.
- The SQLite-backed world authority route with population publication on its
  timer and actor cleanup on shutdown.

The initial-generation fixture is a component comparison against the selected
native source/profile. It does not establish worker uptime, connected gameplay,
packet compatibility with the stock client, frame rate or server capacity.

## Exact references and owned inputs

- `C:\_GitHub\TantraSrc\Tantra\zone\CNPCGene.cpp`: parser and reservations.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: generation callback/order.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.cpp`: detection offsets.
- `C:\_GitHub\TantraSrc\Tantra\zone\TNInfluenceMap.cpp`: influence behavior.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`: initialization and Think/Speak.
- `C:\_GitHub\TantraSrc\Tantra\zone\HTServerSetting.cpp`: AI table loader.
- `E:\Global-server\Zone01`: original atomic map/settings/generator dataset;
  owned copies and hashes are in `zones/Zone01/provenance.json`.
- `B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml`: full 92-column Monster
  data, staged in `data/rules/world-gameplay` with authored provenance.
- `B:\__TANTRA\TantraDataScripts\Global\HTSSetting-global.xml`: AI data, staged
  in `data/rules/ai` with original field order, region, encoding and hashes.
- `C:\_GitHub\TantraSrc\_server\fixtures\native-{population,population-route,spawn-pre-pop,initial-generation,initial-generation-propagated,ai-dispatch}.json`:
  copied compiled-source fixtures; hashes in `fixtures/PROVENANCE.json`.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\population_runtime.rs`:
  reference composition contract; unchanged and not required at runtime.

`tools/rules/generate-native-spatial.py` reads the original Basedef.cpp, validates
array dimensions and radius bounds, and generates an owned build include with
its source hash. Table/codec/rule copies retain their provenance records; the
status adapter's explicit live-inventory extension has both original and adapted
hashes recorded separately.
The [evidence record](evidence/native-world.json) identifies passing checks and
the retained failed TCP attempt separately.
