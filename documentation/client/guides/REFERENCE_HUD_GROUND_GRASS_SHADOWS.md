# Reference presentation corrections — 2026-10-25

The ground-ring planar limitation below is superseded by the
[2026-10-26 terrain-conforming projection](TERRAIN_CONFORMING_GROUND_FX.md).

Implementation: `C:\_GitHub\tantra-dev-main\_remake`.
Deployment: `C:\_GitHub\TantraSrc\_client\HTLauncher.exe` and the workspace client.

## Supplied evidence

All captures are in `C:\Users\Ashesh\Pictures\Screenshots`:

- `231510.png`: remake ground ring faces the camera and is clipped by terrain;
  combined player/target panel lacks the requested header/level layout.
- `232145.png`: reference ring lies along the ground below the chevrons.
- `232336.png`: separate target name, right-aligned level and centered HP values.
- `232350.png`: player name/level header, red HP and blue TP rows.
- `232456.png` (supplied twice): bounded character shadow and raised name.
- `232751.png`: reference grass appearance and coverage.

These establish the desired appearance, not that the changed renderer has been
visually accepted. No game or renderer was launched for this work.

## Ground marker

The original `fxPCEtc.tfx` definitions for IDs `1010009` and `1010012` contain
one model node and two billboard nodes. Their billboard payloads specify mode 2.
The remake handled mode 1 specially but otherwise used camera-facing sprites,
which made these rings upright. Mode 2 now supplies explicit X/Z-plane axes.
The picked terrain height, original resources, timing, chevrons and colors are
retained. CPU checks verify that the resulting ring sprites have ground-plane
axes. This is not a claim of a terrain-conforming decal mesh on steep slopes.

## Player and target bars

The supplied older `HTMainBar.cpp` puts both character and target information
inside `_DIALOG_MAINCHARHP` (panel 206). The Kathana screenshots use a separate
target panel. The presentation adaptation is isolated in
`src/resources/ReferenceHudLayout.h`, leaving original declaration capture intact.

- Player panel: 216 × 66, name and level header, 210-pixel red HP and blue TP bars,
  numeric values, original border/bar art and existing saved player position.
- Target panel: 216 × 42, initially top-center, name, right-aligned level and
  centered current/maximum HP. It hides when no valid HP-bearing target exists.
- Monster levels come from the same authoritative parameter row's `byteLevel`;
  player levels come from the authoritative character state.
- Both bar lengths clamp safely for empty/dead/full HP and TP.
- Target panel uses the existing focus/drag input machinery. Its new panel ID
  lies outside the old Interface.sys position table; its dragged position is
  currently session-only. Existing player/dialog positions remain saved.

Native frame/bar textures are reused. This is an adaptation to the requested
Kathana layout, not a claim that the older source shipped the same layout or art.

## Name height

Keep the source world anchor (`model height + 3`, `HTMainCharacter.cpp:3772`)
and lift the raster by eight screen pixels. Speech moves with the name offset.
This follows the requested small increase without changing body/camera scale.

## Shadow length

The original time-of-day lighting/sky data remains the source for illumination.
The OGRE shadow light uses a separately bounded direction: horizontal travel on
level ground is at most **1.5 actor heights**. Main lighting shader direction
continues to use the unmodified celestial vector, preserving the map's lighting.

This cap is a presentation choice requested from the screenshots, not a recovered
native numeric constant. Uneven receivers and steep slopes still need visual
acceptance; a level-ground ratio is not a universal terrain-distance bound.

## Grass

The preceding bias-only changes did not close visual acceptance. This change
also addresses classification and alpha sampling:

1. Preserve the original TML `grass` bit in `HtMapScenePlacement`; it was dropped
   when converting the parsed map into scene placements. The CPU audit verifies
   **4712** original grass flags against the raw TML records.
2. Use that bit, with the existing texture-name fallback, to select the grass
   rendering pass. Keep incompatible grass/solid batches separate.
3. Render grass after solid geometry with depth testing, no depth writes and
   continuous source-alpha blending. Remove the hard 50% alpha threshold that
   made filtered thin blades switch fully on/off; discard only negligible alpha.
4. Retain deterministic grass ordering, filtering, coverage mips and the
   corrected logical depth bias. Tree/other static cutout behavior stays separate.
5. Apply the native camera-distance fade. `HTEngineHandler.cpp:3887` reads
   `CAMERA.grassalphaarea`; the supplied `HTStartup.cfg` sets **40** source units,
   while the native constructor default is **20**. The remake now reads this key
   and combines it with the selected spec's `GrassArea`.

The batch audit retains **3721** static batches and **380497** object triangles.
These are loaded resource counts, not measured runtime draw calls or FPS.
Continuous blending changes grass edge compositing; overlap/brightness and
temporal stability must still be checked in the actual client.

## Verification and continuation

- [x] Inspect all supplied reference appearances and native FX/UI/map data.
- [x] Test ground-plane billboard axes and native effect lifecycle.
- [x] Test player/target bar lengths, levels, target values and empty selection.
- [x] Test the bounded shadow direction including near-horizontal input vectors.
- [x] Verify original TML grass flags and unchanged object triangle count.
- [x] Compile and link the exact grass lighting/fog shader without a GPU device.
- [ ] Visually accept the new HUD, ring orientation, name spacing, shadow length
  and moving grass in one authorized offline session on one channel.

Build, package, executable hashes and protected-file verification are recorded in
[the evidence file](../evidence/reference-presentation-20261025.json).
Local logs: `.migration-local/reference-presentation-20261025`.
