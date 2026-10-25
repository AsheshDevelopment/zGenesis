# Mandara lighting, textures, targeting and audio

Updated: 2026-10-25. Scoped implementation; the broader goal remains paused.

The FX/light implementation described here is an earlier snapshot. The
[later shared TFX and material update](NATIVE_TFX_LIGHTING_AND_MATERIALS.md)
supersedes its unsupported mode-1/billboard and character-light limitations.
Historical hashes and fixture counts below retain their original scope.

## Confirmed defects and changes

- [x] Use repeating object texture addressing. The actual Brahman tree,
  `r01_Env_man_brahmatree.tmb`, has 10 material textures and 1,734 vertices
  outside the [0,1] UV range (approximately -5.192 to 6.001). Clamping these
  coordinates smears texture edges. All 10 textures resolve from the original
  HPKs; this change does not replace or edit their payloads.
- [x] Parse and evaluate the map's `SUBLIGHT` alongside the primary sun/moon
  light. Restore its rotating direction and time-interpolated diffuse/ambient
  contribution using the map's material settings. Mandara's noon secondary
  ambient is 0.2 and diffuse is 0.99 per RGB channel. No arbitrary brightness
  multiplier was added.
- [x] Stop applying world distance fog to the sky's forced far-plane depth.
  That combination pushes every sky/cloud fragment toward the fog color.
  Sky gradients, clouds, stars, sun/moon and flares retain their existing
  authored resources and time controls. World terrain/object fog remains active.
- [x] Instantiate the authored selected-monster effect `1010011 / UFX_MON01`
  and NPC marker `1010010 / UFX_NPC`. Follow the selected actor and release the
  marker on deselection, death or disappearance. Support FX model records such
  as `S1_T1` separately from character `_L1`-style LOD records.
- [x] Use the client `system/TantraParam.tpa` monster names in the existing target
  HUD and skill recipient text. Monster 2008 is **Aprah Varaha Raja** in the
  supplied English data. NPC names continue to use their native NPC records.
- [x] Face the player before starting a monster's retaliatory attack.
- [x] Recover or discard failed/lost DirectSound voices so a stale voice cannot
  prevent all subsequent player/monster attack sounds. Preserve authored sound
  selection; prioritize finite combat cues when the shared voice pool is full.
  Player, weapon, monster and impact sound bindings already exist and remain active.
- [x] Implement the map/safe-cell BGM policy from `HTMapInfo::HT_vBGMControl`.
  Mandara uses **30008 in safe areas / 30007 in the field**; Mandara caves use
  30011, Jina variants 30010/30012, and the existing Kruma/Biryu branches are
  represented. Start a stream only when its ID changes; bound failed retries.
- [x] Read Mandara's 55 authored day/night field-FX placements from its TML.
  Render supported animated models and mode-2 particle nodes, with authored
  curves/textures and positional sound requests. Resolve shared PC FX resources
  as well as map-local packs. Limit residency to 32 nearby placements within
  400 source units, and uploads to two per frame with a soft 2.5 ms budget.
- [x] Read packed TAB animations through native HPK IO rather than requiring
  extracted `fxPCAnimation`/map-animation files.

## Native references and resources

All source paths below are relative to
`C:\_GitHub\tantra-dev-main\_references\Tantra`.

| Path | Behavior used |
| --- | --- |
| `HTlauncher\HTEngineHandler.cpp:5424`, `:9074` | Secondary light creation, time colors and rotation. |
| `HTlauncher\HTEngineHandler.cpp:7320` | Sky/cloud construction and original map parameters. |
| `HTlauncher\HTEngineHandler.cpp:6530` | Shared PC FX models, animations and texture resource roots. |
| `HTlauncher\HTEngineHandler.cpp:618`, `:783` | Object-bound field FX lifecycle. |
| `HTlauncher\HTOtherObject.cpp:124`, `:1690` | Parameter-based monster names and selected-monster FX. |
| `HTlauncher\HTMapInfo.cpp:31` | Safe-zone and map BGM switching. |
| `HTlauncher\HTControlDef.h:167` | Native BGM IDs. |

Canonical asset root: `C:\_GitHub\TantraSrc\TantraClient`.
Relevant original relative files include:

- `resource\map\MAP_Mandara1st.cfg` and Mandara's TML placements;
- `resource\object\Mandara1stObjTmb.hpk` and `Mandara1stObjTex.hpk`;
- `system\TantraParam.tpa`, `system\ClientRes.txl`;
- `resource\fx\fxPCEtc.tfx`, `fxPC.txl`, and the PC Model/Animation/Texture/Sound HPKs;
- `resource\fx\fxMAPMandara1stField.tfx`, its TXL and corresponding HPKs;
- `resource\sound` BGM files selected by native catalog IDs.

The user-run output is `C:\_GitHub\TantraSrc\_client`; the repository output is
`C:\_GitHub\tantra-dev-main\_client`. Userdata is preserved separately.

## Verification and remaining acceptance

- [x] CPU resource fixture: 688 checks, all 10 Brahman textures, English TPA
  name, primary/secondary time samples, BGM files, target model/animation and
  55 field placements. CPU renderer double exercised 156 uploads and 2,814
  particle sprites. These are fixture counts, not a frame-rate benchmark.
- [x] Existing combat fixture: 4,284 checks, 13 weapon profiles, 24 player sound
  samples and all eight authored clips for monster 2008.
- [x] Existing world gameplay fixture, including a new attacking-monster yaw
  assertion. Rendering and audible playback are not established by these checks.
- [x] Compile/link-check the actual lighting and sky shader families on CPU,
  including rejection of the former normal/UV register mismatch.
- [x] Rebuild and overwrite both client launchers; static verification passes
  for 1,709 files per output. SHA256:
  `c622b870ac0581e8e53c77afc9032f386fdfcadaf16dc7a859d2b74a4d8cde91`.
  All 148 HPKs in each output and 44 existing user-data files are unchanged.
- [ ] Visual acceptance of Brahman texture tiling, lighting, sky, arrow position,
  field FX and audible player/monster sounds and BGM transitions.
- [ ] Full persistent FX parity: mode-1 particles and type-2 billboards remain
  unsupported (12 distinct effect/layer warnings in the Mandara fixture).
- [ ] Native targeting bounds-sentinel placement and model Euler/parent behavior
  need visual/native-engine comparison. The adapter places the marker above the
  decoded actor height; complete native bounds-placement parity is not claimed.
- [ ] Character-specific local spotlight, full water/TME/weather behavior,
  exact native sky/fog/raster parity and complete spatial/Miles audio parity
  remain separate acceptance work.

No game, renderer, server or audio-device process was started for this task.
Build/staging and static package results are recorded in
[the evidence file](../evidence/mandara-world-fidelity-20261025.json).
