# Terrain-conforming ground-click FX — 2026-10-26

The user's `C:\Users\Ashesh\Pictures\Screenshots\Screenshot 2026-10-25 235721.png`
shows the flat ring intersecting a slope. Correcting the ring's orientation in
the previous build did not make it conform to uneven ground.

The new path clips the native terrain triangles to the animated ring footprint
and maps the original sprite texture across the resulting mesh. It preserves
the THM grid's 20-unit spacing and exact b-c cell diagonal used by the renderer;
fitting one tilted plane or sampling just four corners would still intersect
ridges. Vertices follow the native terrain heights and supported TCC object
floor heights, with a 0.15 source-unit offset to prevent coincident depth fighting.
Depth testing remains enabled, so geometry can still occlude the effect.

The original FX IDs, textures, colors, chevrons, timing and click/movement
lifecycle remain in use. Only ground-click mode-2 billboard nodes use the
projected mesh. Other particle quads use their existing path.

Projection geometry is cached per billboard footprint and rebuilt when its
position or animated size changes. Work is bounded to 1024 terrain cells;
invalid or out-of-map footprints do not fall back to a clipping flat quad.

Implementation in `C:\_GitHub\tantra-dev-main\_remake`:

- `src/rendering/HtRenderFacade/NativeGroundDecal.h`: triangle clipping,
  height projection and continuous UV coordinates.
- `src/rendering/HtRenderFacade/WorldSceneFxPresentation.h`: ground-only map
  binding, footprint cache and authored billboard integration.
- `src/compatibility/HtNativeIntroFire.h`: optional source-space surface
  triangle payload alongside the existing quad fields.
- `src/rendering/OgreBackend/OgreBackend.cpp`: upload projected triangle
  positions/UVs with the existing particle material and animated color.
- `src/tools/world_scene_fidelity_probe.cpp`: ridge/slope/diagonal/map-edge,
  footprint-area, UV and actual Mandara integration checks.

- [x] Reproduce the geometric cause from the screenshot and existing flat path.
- [x] Project the ring onto terrain triangles, including ridges and grid diagonals.
- [x] Preserve source units, original UV coverage and authored FX playback.
- [x] Verify triangle vertices and interiors against terrain interpolation;
  verify the full clipped footprint area and UV limits.
- [x] Exercise original Mandara FX through the projected-surface path.
- [x] Pass the focused scene CPU fixture: **11054 checks**, no reported FX limits.
- [ ] Visually accept the complete ring on the user's reported slope.

The CPU fixture uses renderer doubles; no game, renderer or audio device was
launched. This is a THM/native floor projection, not a general decal projector
onto arbitrary placed-model triangle surfaces or discontinuous stair faces.

Build/package/protected-file evidence:
[terrain-ground-decal-20261026.json](../evidence/terrain-ground-decal-20261026.json).
Local logs: `.migration-local/terrain-ground-decal-20261026`.
