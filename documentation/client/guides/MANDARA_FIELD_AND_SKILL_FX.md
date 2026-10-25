# Mandara field FX and skill presentation

Implementation checkpoint: 2026-10-26. CPU/build/package verification is separate
from rendered acceptance. No game or audio device is launched by these checks.

## Mandara placements

Mandara's original TML contains 55 effect-bearing placements. The client resolves
their day/night IDs through `fxMAPMandara1st.txl` and loads the named effects from
`fxMAPMandara1stField.tfx`. It reads the existing HPK families directly, retaining
the supplied relative paths. It does not add arbitrary duplicate portal emitters.

| Placement | Original object | FX ID | Effect |
| --- | --- | --- | --- |
| 820 | `r01_Stru_portal_07.tmb` | 1400017 | `Env_Port03` |
| 1097 | `pop_Stru_fight_gate_01.tmb` | 1400009 | `Env_Port02` |
| 6135 | `r01_S_refinery2_01.tmb` | 1400023 | `ALTER_FX` (altar) |
| 6358 | `r01_Stru_man_melting_01.tmb` | 1400026 | `Env_Furnace` |
| 519 | Authored fountain | 1400011 | `Env_Water01` |

The remaining placements include torch, smoke and ambient effects. The complete
placement inventory is retained in the accompanying JSON evidence.

- Both positive day/night IDs use the day binding continuously, as the native
  engine handler does. Day-only and night-only bindings retain their phase gates.
- Field candidate selection uses the largest configured node range; a model or
  billboard is no longer removed just because its particle range is shorter.
  Existing per-node distance and visibility policies still apply.
- Billboard offsets, normals and flat axes inherit placement yaw. Existing
  terrain-conforming ground-click projection is preserved.
- Portal and altar model effects use the emissive additive presentation path.
  This is a scoped rendering adjustment requiring visual acceptance.
- Existing upload budgets and culling remain active. Field loops release their
  render objects and sounds when removed from the active set.

## Skill window and activation

- The original four-tab, 24-slot skill layout remains authoritative.
- Icons resolve from native skill records; skill tree connectors use original
  arrow art and coordinates from `HTInterface.cpp`.
- Learned levels and maximum levels drive labels and upgrade-button visibility.
  Learning continues through the existing offline authority and SQLite path.
- Hover details include native name/description, learned/max level, required
  level, base HP/TP cost, casting time, cooldown, duration and range.
  These are base table values, not a complete reconstruction of every native
  requirement/effect explanation or calculated cost reduction.
- Learned active skills can be registered in quick slots. Double-clicking a
  skill icon also invokes the common casting path without changing saved slots.
  Passive/unlearned skills cannot be dragged into executable skill slots.
- Rejected direct activation shows a system message. Existing native cooldown
  overlays, authority result messages and progression feedback are retained.

## Animation and FX lifecycle

The client resolves both action and active resources, including body and apron
animations, male/female tables and the equipped-weapon animation family.

Action presentation connects ready, casting, activation, follow and impact lanes.
Self-active presentation connects ready, activation and state lanes. Animation
selection uses the learned level's TPA timings. Cast loops stop on phase changes;
movement remains locked through the applying animation's completion.

FX bindings select original level bands: levels 1-5 use the base ID, 6-8 use
base+1 and 9-10 use base+2. A zero base remains no effect. Hat, hands, Din, Dout
and SFX1 attachment names come from `HTFXIDDef.h`. Parented particle nodes in
the supplied PC effects resolve their model node IDs before creation and follow
the model's position/yaw or socket position.

Normal follow effects travel from Dout toward Din/ground; source speed is
`10 * 30 * .75`, with the native 3162 multiplier. Impact requests wait for this
travel time. Missing presentation assets cannot invent damage or disable the
authority's validation. Pending flights are cleared on CHAR_INIT.

Active state loops follow the native type and skill-ID exceptions. Energy-shield
state FX trigger on incoming combat events, rather than running continuously.
Named FX/sounds clean up on cancellation, expiry, death, map entry and exit.

## Original references and owned code

Workspace root: `C:\_GitHub\tantra-dev-main`.

| Reference | Purpose |
| --- | --- |
| `_references\Tantra\HTlauncher\HTEngineHandler.cpp` | `HT_hrStartSFX`, skill level variants, field phase dispatch |
| `_references\Tantra\HTlauncher\HTMainCharacter.cpp` | Ready/cast/apply stages, self-active timing, buff/shield exceptions |
| `_references\Tantra\HTlauncher\HTAttackManager.cpp` | Normal follow travel and impact callbacks |
| `_references\Tantra\HTlauncher\HTControlDef.h` | Follow speed correction |
| `_references\Tantra\HTlauncher\HTFXIDDef.h` | Skill types, socket and stage constants |
| `_references\Tantra\HTlauncher\HTFXResMgr.h/.cpp` | Skill/action/active/FX table layouts |
| `_references\Tantra\HTlauncher\HTInterface.cpp` | Skill arrows and original local art IDs |
| `_references\Tantra\HTlauncher\HTSkillInventory.cpp` | Tribe/class skill tabs |
| `C:\_GitHub\TantraSrc\TantraClient\system\TantraParam.tpa` | Original skill timing/cost/requirement data |
| `C:\_GitHub\TantraSrc\TantraClient\system\ClientRes.txl` | Animation and MainUI resources |
| `_client\resource\fx\fxPC.txl`, `fxPC*.tfx` | Native skill links, descriptions, FX stages and authored graphs |
| `_client\resource\fx\fxMAPMandara1st.txl`, `fxMAPMandara1stField.tfx` | Native Mandara field bindings |

Owned implementation: `_remake\src\resources\NativeClientSkillResources.*`,
`NativeSkillTooltip.h`, `NativeCombatBindings.h`, `NativeMainHud.cpp`,
`_remake\src\client\NativeSkillCastController.*`,
`_remake\src\rendering\HtRenderFacade\MainHudPresentation.cpp`,
`MainHudTooltips.cpp`, `WorldSceneFxPresentation.h`, and
`_remake\src\app\tantra_remake_main.cpp`.

## Verification and installed output

- [x] Release x64 application and dependency closure built successfully.
- [x] Eight focused CPU checks passed across the verification commands: client
  skills, UI interaction, authority, impacts, feedback, combat presentation,
  world presentation and scene fidelity. The scene fixture has 13,440 assertions;
  skill visuals cover 984 tribe profiles and load their unique animation files.
- [x] Both final clients pass static verification (1,731 manifest files each).
- [x] Matching launchers installed in `C:\_GitHub\TantraSrc\_client` and
  `C:\_GitHub\tantra-dev-main\_client`. Existing 148 HPKs in each and 49
  userdata files in the user's client retain their before/after hashes.

SHA256: `bceb3abb96a35ea16bdb4bff5637cdd35822542f8e996fad564c046c9abdb651`.

The base-level skill asset audit covers 615 stage lanes and 247 distinct FX IDs:
32 have no FX binding and three bindings name absent TFX definitions. These are
recorded source-data gaps. Three pre-existing optional skill icon catalog IDs
(23828-23830) also remain unavailable in the packaging audit. No assets were
invented or substituted. Higher-level ID selection is implemented and checked;
this is not an exhaustive upload/visual acceptance of every level variant.

[Evidence, gap list and placement inventory](../evidence/mandara-skills-fx-20261026.json).
No runtime visual/audio test was performed. The broader goal remains paused.
A subsequent request authorizes committing and pushing the workspace and changed
modules to main; see the [publication checkpoint](../reference/PUBLICATION_CHECKPOINT_20261026.md)
and Git history for the publication scope and exact revisions.

## Remaining acceptance and limits

- [ ] Accept portal/altar/fountain/torch/smoke placement and brightness in-game.
- [ ] Accept skill icons/tooltips, learning, quick slots, casting, attachments,
  projectile impact, interruption and sound in one authorized offline process.
- [ ] Resolve missing original skill FX bindings recorded in the evidence.
- [ ] Complete specialized homing/piercing/arrow and dual-weapon attack-manager
  paths, item-cost, party/PvP and other authority services currently rejected.
- [ ] Accept the [implemented native requirement/effect tooltip formatting](NATIVE_SKILL_TOOLTIP_PARITY.md); finish item cooldowns
  and remaining command services. Common command slots are now implemented; see
  [native command checkpoint](NATIVE_COMMAND_QUICK_SLOTS.md).
- [ ] Accept full parent pitch/roll/socket orientation, projectile trails and
  authored timing visually; CPU position/yaw support is not full visual parity.
- [ ] Reconcile state FX with early dispels and restored timed effects, beyond
  the connected cast/expiry/death lifecycle.

The work does not establish complete skill gameplay or renderer parity. Missing
native FX records remain explicit gaps; no unrelated replacement assets are used.
