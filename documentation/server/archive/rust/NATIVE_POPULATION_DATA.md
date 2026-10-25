# Native monster generation data and placement

Current integration: [TCM startup and routing](NATIVE_TCM_STARTUP_AND_ROUTING.md)
records the newer cell/startup/RNG correction. [Initial Mandara publication](NATIVE_INITIAL_POPULATION.md)
records the publication component and retained socket-attempt limitation. Earlier
propagated-grid snapshots below are historical component evidence; their stated
narrower checks do not establish corrected startup or full gameplay acceptance.

Updated: 2026-10-24. These are implemented, source-checked inputs and algorithms
for the pending Rust monster authority. **They do not yet spawn live actors.**
NPC initialization, skill decks, Pop AI callbacks and their shared RNG order
must be integrated before population is activated. `game_ready` remains false.

Static merchant/service NPCs are a separate native path: the client creates
their models from its NPC parameter table; server callbacks validate their
authored zone/position/services. They must not be duplicated as generator actors.

## Implemented behavior

- Separate authored Global Monster import with every numeric source column,
  physical spreadsheet DOM column order and native leading-integer conversion.
  The default client importer still produces byte-identical existing tables.
- Hash/provenance-checked server-only staging. The runtime consumes only
  `Monster.tsv` and `PROVENANCE.json` plus the staging manifest. It does not
  depend on the original XML or the client offline database at runtime.
- Bounded `NPCGener.txt` parsing: sequential `#` blocks, six monster slots,
  five segments, native maximum-population clamp, route normalization and
  negative/disabled/one-shot generation frequencies.
- Native quirks retained: `Segment3Wait` writes wait slot 1; missing segment X
  causes only Y to inherit; command counts are populated only for slots 0/1;
  failed replacement monster IDs retain the prior loaded template/command.
- Native reserved handles start at 1016, with the source's extra gap before
  `g_iFreeSlotForNPC`. Reservations are not spawned creatures.
- Generator due selection uses `tick & 63` and `(tick >> 6) % frequency`.
  The source increments its quarter-second counter before running this loop.
  Frequency `-1` fires once then becomes 0. No eager spawn-all shortcut is used.
- Native 266-square influence grid over the 1024-square map, including blocked
  coarse cells and safety-zone propagation. Candidate order and failure/stale
  output behavior match `BuildInfluenceGrids`.
- `PickFreeMobGrid` checks the current owner, then the actual source's ordered
  radius-10 detection table. All 440 offsets, including source duplicates and
  omissions, are preserved rather than replaced with a geometric spiral.

Validation uses `GenerationArea.idx`, `MapData.tcm` and `NPCGener.txt` from the
same selected Zone01 directory. The authored Global monster profile is explicit;
it is not represented as a recovered deployed-server parameter table.

## Build, import and validation

From `C:\_GitHub\TantraSrc\_server`:

```powershell
.\tools\Import-NativeWorld.ps1 -ValidateZone 'E:\Global-server\Zone01'
```

Defaults:

- XML: `B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml`.
- Settings: `B:\__TANTRA\TantraDataScripts\Global\HTSSetting-global.xml`.
- Generated server tables: `C:\_GitHub\TantraSrc\_server\derived-assets\native-world`.
- Staged inputs: `C:\_GitHub\TantraSrc\_server\data\native-world`.

`Build-Server.ps1` now invokes this import/staging step with native content
staging. Override `-WorldSource` / `-WorldSettings` as needed, or use
`-SkipNativeWorldContent`. Existing `-SkipNativeLoginContent` still provides
the code-only build path and skips native data staging.

The built service also provides standalone commands without a listener:

```powershell
.\bin\tantra-service.exe stage-world-content --service .\data\native-world --source .\derived-assets\native-world
.\bin\tantra-service.exe validate-world-content --service .\data\native-world --zone 'E:\Global-server\Zone01'
```

The checked Zone01 profile has 508 generators, 1,702 reservations, next free
handle 2719, and 964 native-range templates from 1,087 authored rows. The
selected source loads monster IDs 2001–2999; out-of-range authored rows are not
silently advertised as supported gameplay. Influence fingerprint:
`472219098147025299`.

## Verification and limits

Four CPU tests pass: all 508 generator records/reservations against compiled
native functions, scheduling and parser edge cases, the full influence grid,
nine candidate queries, twenty placement scenarios, all 440 offsets, bounds,
and tampered-content rejection. The native reference uses a valid-ID `ReadMob`
shim to isolate parsing/reservations; it does not execute native monster
initialization or skill/AI RNG. That acceptance remains open.

The default importer was independently checked against all six existing client
world-table payloads: unchanged bytes. Clippy, formatting, workspace Debug x64
build and packaged import/validation commands pass. No zone process, game
client, graphics device or socket acceptance run was launched in this step.
The client launcher and normal SQLite profile remain unchanged.

Evidence: [native-population-data.json](evidence/native-population-data.json).
Source extraction and fixture generation are under
`C:\_GitHub\TantraSrc\_server\tools\native-codec`; checked fixture:
`C:\_GitHub\TantraSrc\_server\fixtures\native-population.json`.

## Reference and implementation paths

- `C:\_GitHub\TantraSrc\Tantra\zone\CNPCGene.cpp` / `CNPCGene.h`: parse,
  verification, commands and generator structures.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: `RegisterMonstersToArea`,
  generator timer, `ReadMob`, `LoadMonsterData`, `GenerateMob`.
- `C:\_GitHub\TantraSrc\Tantra\zone\TNInfluenceMap.cpp` / `.h`: influence
  initialization, propagation and candidate construction.
- `C:\_GitHub\TantraSrc\Tantra\zone\GetFunc.cpp`: `PickFreeMobGrid`.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.cpp`: native detection offsets.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`: NPC Init/LoadSkills and subsequent Think(Pop) dispatch.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTNPCSystem.cpp`: static client NPC lifecycle.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\population.rs`: implemented Rust component.
- `C:\_GitHub\TantraSrc\_server\crates\services\tests\population.rs`: CPU data/placement checks.
- `C:\_GitHub\TantraSrc\_remake\tools\import-world-gameplay.py`: opt-in full Monster import.

NPC initialization and skill-deck setup are now implemented and checked in the
[NPC rules component](NATIVE_NPC_INITIALIZATION.md). [Generation preparation](NATIVE_GENERATION_PREPARATION.md)
now composes routes, Init and occupied placement. Next connect Pop callbacks and
their RNG/side effects, drive one zone-owned clock and publish native actor
appearance/occupancy updates. Do not equate these verified helpers with working
monster combat, AI, death/respawn, drops or completed NPC services.
