# Native terrain detail texture

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The Mandara terrain now samples the original `resource/map/Mandara1st/detail.dds`
in every enabled terrain section. Previously that file was uploaded but not bound
to a terrain shader. The former prototype's arbitrary 16-times UV and 22-percent
blend have also been replaced by the native detail operation.

## Source and engine evidence

- `Tantra/HTlauncher/HTEngineHandler.cpp:7164` reads `[TERRAIN] tiletexturerange`
  and `detailtexture`. At 7264 it forwards the detail flag through
  `HT_UPDATEOBJPARAM::bSwordWindUpdate`. The engine's terrain update stores this
  flag at object offset `0x50b` (HT3DHeaven RVA `0x3f11b`).
- The shipped Mandara configuration enables detail. Its four section UV grid
  and adjustment values are zero. These settings are now parsed, including
  boolean `true`/`false` and numeric `1`/`0`.
- The shipped engine is inspected read-only, with SHA-256 profile
  `b818b89edbc9f8e49bb1b79200371740eaa157dabac23bbf1e2d52e40ff99941`.
  Terrain vertex generation at RVA `0x3c261` loads constants `1.25` and `0.035`
  from RVAs `0x697e0` and `0x697dc`. At `0x3c4ce..0x3c50a`, it multiplies
  absolute grid coordinates by the 20-unit cell spacing and both constants,
  writing the second UV pair at vertex offsets `0x20` and `0x24`.
- Accordingly, `detailUV = sourceWorldXZ * 1.25 * 0.035`, or approximately
  **0.875 repeats per cell**. Absolute coordinates preserve phase at section
  boundaries and do not depend on the remake's 0.001 world scale.
- At `0x3dec3..0x3ded7` the native terrain binds its detail texture to stage 1
  when enabled and unbinds it otherwise. At `0x3df41..0x3df89`, stage 1 uses
  `COLORARG1=TEXTURE`, `COLOROP=MODULATE`, `COLORARG2=CURRENT` and selects texture
  alpha. The remake's equivalent is `float4(section.rgb * detail.rgb, detail.a)`.
  The detail sampler repeats; the section sampler retains its section mapping.
- Section UV correction follows `localGrid / (sectionCells + gridAdjustment)
  + uvAdjustment`, choosing the 256 or 512 setting from the section texture
  width, as in RVA `0x3c416..0x3c483`.

The Mandara THM header is `(512, 512, 0, 16)`: 16 section textures, no tile
descriptors, followed by the detail descriptor. `tiletexturerange=30` is retained
in the parsed configuration; it is not repurposed as a detail fade or UV scale.
The native detail binding is global to the terrain draw. General terrain tile
LOD, native material lighting, fog, water and complete visual parity remain
separate unfinished work.

## Verification

`native_world_render_probe` validates the actual two-texture OGRE passes and
detail counts, renders all Mandara objects, then renders the same terrain camera
with detail enabled and disabled. The disabled path has 16 section textures and
zero detail bindings; the enabled path has 17 textures and 16 detail bindings.

`tools/verify-terrain-detail.py` checks the pinned native instructions and
constants, verifies the Mandara header, and compares the actual on/off GPU PNGs.
It records framebuffer differences and executable/image hashes in
`build-ogre-sdl/terrain-detail-overview/DETAIL_VERIFIED.json`.

The normal offline character-entry probe additionally requires 16 detail-bound
sections after entry into Mandara. Final-client runtime proofs and staged binary
identity are recorded in `build-ogre-sdl/terrain-detail-VERIFIED.json`.

Full Release and Debug builds passed, with all 98 selected CTest cases passing
in each configuration. Release additionally passed three audio-enabled offline
processes (creation plus two restarts, routes 1/18/19, 22 captures).
The real GPU detail toggle changed all 786,432 pixels in the close terrain
comparison. The final client inventory passed for 2,310 files; the normal SQLite
and saved-ID files remained byte-identical. Final staged launcher SHA-256:
`e2d20f36452b758373cbdfd77d25a9b787988cffdc7cf5352952e92b0bf5890a`.
