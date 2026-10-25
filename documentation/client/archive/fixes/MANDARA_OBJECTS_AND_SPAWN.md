# Mandara1st objects and spawn correction

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.
The subsequent [terrain detail update](../../reference/rendering/TERRAIN_DETAIL.md) binds the original
`detail.dds` with native UVs and multiplication. Its final-client evidence
supersedes the executable hash in the alpha checkpoint below.

The former map-entry checkpoint counted submitted objects without proving that
they aligned with the terrain. The THM reader skipped valid height records,
used the wrong row stride, omitted the outer vertex row/column and reversed
terrain Z. This put terrain over source scenery and the character on an
incorrect hillside. The correction keeps original object transforms and spawn
cells; it fixes their shared surface rather than moving scenery arbitrarily.

## Native format evidence

Read-only inspection pins `TantraClient/HT3DHeaven.dll` SHA-256
`b818b89edbc9f8e49bb1b79200371740eaa157dabac23bbf1e2d52e40ff99941`:

- RVA `3AB16`: reads a 16-byte header: cell width/height and two texture counts.
- RVA `3A9CF`: increments both cell dimensions before allocating vertex rows.
- RVA `3ABA6`: reads 260-byte section descriptors (u32 ID + 256-byte filename).
- RVA `3AC5D`: reads the detail descriptor immediately before the sample loop.
- RVA `3ACA3`: reads each 16-byte sample as height and three normal components.
- RVA `3A932`: initializes the grid scale to float 20 (`0x41a00000`).
- RVAs `3EB4E`, `3EB7C`: construct world X/Z by multiplying column/row by the
  grid scale, with no terrain-row reversal.

`tools/verify-native-terrain.py` checks these instructions and independently
compares all parsed sample bytes with the original files. All 17 supplied THMs
match the corrected layout: 3,389,457 samples / 54,231,312 bytes. Four malformed
payload checks reject truncation, trailing data and non-finite heights.

Mandara's header describes 512x512 cells, hence **513x513 vertices**. Seventeen
texture descriptors end at byte **4436**, where the first height is 35.4302139.
The former reader began at byte 20836 and used a 512-sample row stride. Its
supposed section metadata was actually valid terrain height/normal data.
The corrected renderer draws all **524,288 terrain triangles**.

## Static objects

The existing original TML placement/resource pipeline remains in use: 6,503
placements, 323 models and 380,497 object triangles. All are submitted through
the original row-vector transforms and a single 0.001 renderer-unit conversion.
Regular Mandara textures retain precedence over Kathana pop duplicates. No
replacement models, arbitrary elevations or invented town placements are used.

The new scene probe verifies a native town landmark (placement 6205, resource
19025) against the corrected terrain. Its source Y is 25.988386. It also checks
nearby scenery for every possible cell in the supplied spawn rectangle.

## Alpha texture follow-up

World map materials now classify actual DDS alpha values, while retaining the
`_TGA` filename convention in metadata. Binary alpha uses a depth-writing
cutout shader. Fractional alpha uses sorted alpha blending with depth writes
disabled; fully transparent fragments are discarded. DXT2/DXT4 keep their
premultiplied blending factors. Opaque textures retain opaque rendering, even
if their names end in `_TGA`. Alpha without that suffix is supported too.

The user's `pop_Env_Ngrass2b_TGA.dds` is A4R4G4B4: its base level contains
10,521 zero-alpha, 5,862 fractional-alpha and one opaque pixel. Treating it as
an opaque texture produced a solid grass rectangle. The original bytes and
mipmaps remain unchanged. The alpha probe passes 62 checks, including 48
original `_TGA` textures and synthetic binary, fractional, BC1/BC2/BC3,
premultiplied, suffix-independent and malformed cases.

The renderer exposes alpha-texture and cutout/blended-batch counts and checks
actual OGRE pass/shader/depth/blend state before submission. Normal offline
verification requires alpha-aware world materials as well as the corrected
geometry. Exact original material/lighting pixel parity remains a broader gate.

## Spawn and floor height

The selected Zone01/18/19 datasets each specify common area X `[492,501)`,
Z `[186,195)`. The server generation-area selection, native random upper-bound
behavior, blocked-cell checks and SQLite save flow are retained. First-entry
zero or out-of-range saved cells now request generation as the source does.
Valid saved cells are preserved; no normal user database is rewritten by tests.

`HTMapSystem.h:278` converts collision cells using X `cellX*10+2.5`,
Z `(mapSizeZ-1-cellZ)*10+2.5`. This is the one required Z reversal.
Terrain uses direct world Z and the same triangle surface as the rendered mesh.
`HTEngineHandler.cpp:1982` chooses the highest of terrain and nonzero TCC
object-floor height divided by ten. The character and camera now share that
surface query, including raised object floors.

For the reported saved cell **493,194**, source position is approximately
**4932.5, 20.6061, 8292.5**. The former shipped reader returned about 0.76669
there. An intermediate comparison using the corrected bytes but the old axis
returned 141.73; both the byte layout and the axis had to be corrected.
Changing the renderer corrects the saved character's presentation without
resetting its account or cell. `WORLD_SPAWN_SURFACE` records the actual runtime
cell, position and vertex dimensions for independent verification.

## Validation and limits

The focused Release checks pass: native terrain source layout, Intro terrain
regression and Mandara spawn surface. The spawn probe passes **1,475 checks**
across routes 1/18/19 and includes triangle interpolation, outer edges, invalid
coordinates, every generation-area cell and the native town landmark.
The isolated OGRE overview renders the corrected map and all static placements;
its capture is under `build-ogre-sdl/mandara-alignment-overview/`.

The current build, normal offline runtime and final-client staging results are
tracked in [PROGRESS.md](../../PROGRESS.md). A corrected overview alone does not
certify the normal client. Tests use offline `ashesh` / `ashesh` in temporary
profiles and verify the original THM/TCC floor independently.

This request concerns static map scenery and spawn presentation. Movement,
NPC/monster population, complete materials/lighting, sky/water/effects and
full gameplay remain unchecked in the overall tracker. One original texture,
`r01_common_cart01.bmp`, is still absent from the supplied archives and retains
its explicit source-missing diagnostic.

Latest final Release proof: `build-ogre-sdl/mandara-alpha-final-release/VERIFIED.json`.
Three audio-enabled offline processes enter routes 1/18/19 with two SQLite
restarts and 22 captures. Actual GPU passes include 39 alpha textures and 708
blended object batches. The final-client inventory verifies 2,310 files and
exact icon/x64 imports. Normal SQLite/saved-ID bytes remain unchanged.

The staged `HTLauncher.exe` and development package match SHA-256
`d35014b309932984ce1877eb5d130629102b94e9b17bb3faa0734e9d5f2fec91`.

The terrain slice passes full Release/Debug builds. After the alpha follow-up,
updated client/renderer/probe targets build in both configurations and **98/98
selected CTest checks pass in each** (HTTP runtime excluded). Evidence logs use
the `mandara-alpha-*` prefix; `mandara-alpha-VERIFIED.json` binds source, logs,
executable and normal runtime proof hashes. Alpha data checks cover 48 original
textures / 62 checks; the terrain source test compares all 17 original THMs.
