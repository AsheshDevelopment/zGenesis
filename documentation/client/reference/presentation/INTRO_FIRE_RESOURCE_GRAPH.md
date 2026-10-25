# Native intro fire resource graph

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The default intro now resolves fire 1300143 through the original Map and FX
catalogs and fully decodes its native TFX document before hiding the logo.
Its two textures are extracted and packaged with source-entry/hash provenance.
**The fire is still not rendered.** Native particle simulation, curve evaluation,
billboard geometry and blend behavior remain required work.

## Exact source route

`HTControlDef.h:494` defines `MAP_INTRO=40100`. `HT_ResTableType02` in
`HTResMgr.h` stores the map FX prefix at byte 604 in its 924-byte Win32 record;
`HTResMgr.cpp:3729-3743` returns `strFXFiles`. The deployed catalog selects
`fxMAPIntro` for map 40100.

`HTEngineHandler.cpp:6943-6962` appends `Field.tfx`, `MonsterSkill.tfx` and
`MonsterEtc.tfx` to that prefix when creating the native FX managers.
`HTIntroManager.cpp:756-765` creates both null anchors, starts looping
`HT_FX_INTROMFIRE` on each, then reads the two animation timers.
`HTEngineHandler.cpp:8498-8559,8670-8686` routes 1300143 to the MonsterEtc
manager with its catalog attachment and priority.

The complete selected route is:

```text
ClientRes Map 40100 -> fxMAPIntro
  fxMAPIntro.txl / FXMonsterEtc / 1300143
    name=intro_MFire attachment=0 priority=100 category=3000
      fxMAPIntroMonsterEtc.tfx / intro_MFire
        type-1 node 0 -> tCS_2100011.tga
        type-1 node 4 -> tSM_2100241.tga
```

Both textures exist in the common `resource/fx/fxPCTexture.hpk`, which the
native intro resource loading also opens. The map-specific texture archive
contains seven different waterfall textures. Selecting its similarly named
`INTRO_FIRE` effect or a gallery preview would not preserve this catalog route.

## Structured decoding

`resources/TfxDocument` reads the complete version-1 structure: 136-byte effect
headers, a separate DWORD node type, 64-byte common node records, fixed payloads,
and separate arrays of 8-byte scalar/color keys. It retains raw common/payload
bytes, legacy name bytes, exact floating-point values, node IDs, timeline fields,
attachment fields and curve arrays. It commits output only after consuming the
entire document successfully.

Native payload sizes for this profile are type 1: 272, type 2: 216, type 4: 188,
type 5: 76, type 6: 20 and type 7: 4 bytes. Type 3 has no allocation branch in
the inspected engine and is rejected. The reader validates count mirrors,
bounded counts, finite/ordered keys, terminated strings, body boundaries and
the absence of trailing data. Raw padding is retained without interpreting
debug-fill bytes as numeric fields.

The selected fire lasts `3.000000238418579` seconds and contains two type-1 nodes
covering that timeline. Each has five scalar keys; the color-key counts are six
and five. The typed parameter view retains the two texture references, source
position lanes `(0,23,0)` and `(0,40,0)`, count 1, interval lanes 0.06/0.1,
lifetime lane 3, mode 2 and remaining numeric fields. This access does not
establish the native mathematical interpretation of every motion field.

The earlier `TfxMetadata` printable-string scanner remains a gallery utility.
Normal fire resource preparation uses the structured document and exact effect
lookup. An existing user-owned parser at
`A:\Tantra-FX\Assets\_KDT\TFXStudio\Runtime\TfxParser.cs` helped locate the
record structures; the current native binary was inspected independently.

## Native binary evidence

`tools/inspect-native-tfx-layout.py` pins the supplied `HT3DHeaven.dll` SHA-256
and checks the expected instructions without executing that DLL. Reproducible
disassembly is in `docs/evidence/native-tfx-layout.txt`:

- RVA `0xBCF1`: read a 0x88-byte effect header.
- `0xBDA0-0xBDC4`: read a DWORD node type and 0x40 common bytes.
- `0xBDC4-0xBE5C`: copy common ID, timeline, lane and parent fields.
- `0xBE5C-0xBF60`: allocate the supported node types.
- `0xD3BF-0xD4D8`: read the 0x110 particle payload and scalar/color key arrays.
- `0xC9F2-0xCA0D`: particle curve counts reside in the final payload DWORDs.
- `0xD7A9`, `0xDB8F`, `0xE062`, `0xCDF0`, `0xDF78`: the other payload sizes.

This is serialization/dispatch evidence. It does not prove particle spawning,
RNG consumption, integration, interpolation or material behavior.

## Integration and verification

`IntroGatePresentation::prepareFireResource` runs after the logo frame and
before logo hiding, initial object placement and gate creation. It retains the
decoded document and native routing descriptor. The two later fire requests
retain their anchor order and looping flag and now queue the
[native intro fire runtime](NATIVE_INTRO_FIRE_RUNTIME.md).

The importer uses the selected graph to extract only the two required common
textures into `derived-assets/effects`. CMake builds/stages them as application
asset dependencies. Package provenance now has 82 rows; the two added rows
identify the exact original archive entries and the binding TXL hash.

2026-10-22: Debug and Release x64 builds each pass 53/53 CTest checks. The new
`native_intro_fire_resource` fixture fully reads all three intro documents
(10/2/1 effects), validates the real catalog route, exact selected node/curve
counts and common texture references, and rejects truncated/trailing data,
unsupported type 3, count-mirror mismatch, nonfinite/unsorted scalar keys,
nonfinite particle parameters and missing catalog bindings. Failed reads clear
stale output. Both refreshed packages pass hash/provenance verification and
runtime smoke, including the resource-loaded-before-logo-hidden trace and all
existing gate animation, geometry and lifetime checks.

Evidence under `build-ogre-sdl`: `intro-fire-{release,debug}-build.log`, matching
`*-tests.log`, package logs, and `intro-fire-runtime-{release,debug}.log`.
All canonical source, client assets and external data remain read-only.

The next required fire slice is the native type-1 emitter initialization/update
path, including randomization, particle lifetime across effect loops, curve
sampling, camera-facing geometry and material state. Full intro scene/material,
motion-sound, interactive UI and later network/client state requirements remain
open in the main implementation plan.

Subsequent [native particle math work](NATIVE_PARTICLE_MATH.md) implements the
selected mode-2 CPU subset, curve sampling and vertex color rules. The subsequent
[runtime integration](NATIVE_INTRO_FIRE_RUNTIME.md) adds selected lifecycle,
visibility and drawing. Those newer milestones supersede this resource
component's 53-test snapshot and its historical next-slice statement.
