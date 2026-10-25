# Target selection, name placement and progression FX

## Request and reference captures

Implemented in `C:\_GitHub\tantra-dev-main\_remake`; staged clients are
`C:\_GitHub\tantra-dev-main\_client` and `C:\_GitHub\TantraSrc\_client`.
The earlier checkout's source tree was not rewritten.

All nine supplied screenshots were inspected under
`C:\Users\Ashesh\Pictures\Screenshots\`:

| Screenshot 2026-10-25 | Observed behavior |
| --- | --- |
| `212909.png` | Close crop: yellow target chevrons and a selected yellow monster name. |
| `212920.png` | Selected monster named; other monsters unnamed; player name above the head. |
| `212927.png` | Red target chevrons during combat; selected monster name stays yellow. |
| `212940.png` | Ground loot with chevrons and a red/orange ring while approaching. |
| `213026.png` | Attack impact presentation; only the selected monster has its name displayed. |
| `213124.png` | Chakra/status window and a bright golden progression effect around the player. |
| `213139.png` | Skill window and a blue pillar/ring effect around the player. |
| `213147.png` | Another phase of the same skill progression effect. |
| `213201.png` | Selected loot marker visible at a distance; most monsters unnamed. |

These are Kathana reference pixels, not runtime validation of the remake.
The blue arrow above the player is a separate self-selection effect in the
native client; it is not evidence that every player always has that arrow.

## Original source and asset evidence

Reference source root: `C:\_GitHub\tantra-dev-main\_references\Tantra\HTlauncher`.
Original asset root: `C:\_GitHub\TantraSrc\TantraClient`.

| Source | Behavior used |
| --- | --- |
| `HTFXIDDef.h:202` onward | Separate IDs for newborn, new skill, Chakra upgrade, NPC target, monster target, monster attack and item target. |
| `HTMonster.cpp:518` | `HT_vMonster_SetInfoDisplay(bAttack)` selects `1010011` or `1010031`; cancel stops the effect. |
| `HTMonsterSystem.cpp:181` | First target click selects; repeated target interaction requests attack presentation. |
| `HTMonsterSystem.cpp:611` | Monster name rendering is gated by the monster information/selection flag. |
| `HTMonsterSystem.cpp:630` | Monster name position is model height + 5 source units. |
| `HTItemSystem.cpp:853`, `:3325` | Ground-item picking starts looping `HT_FX_ITEMTARGETTING` (`1010021`). |
| `HTMainCharacter.cpp:275`, `:4284` | One-time world entry and resurrection start newborn FX (`1010001`). |
| `HTMainCharacter.cpp:3772` | Main character name anchor is model height + 3 source units. |
| `HTMainCharacter.cpp:450` | Self-selection uses the NPC target FX; it is separate from spawn. |
| `HTStatus.cpp:640`, `:717` | Accepted Chakra/status changes and level-up broadcast use `1010003`. |
| `HTSkillInventory.cpp:1701`, `:1832` | Successful skill learning/upgrading uses `1010002`. |
| `HTEngineHandler.cpp:8498` | Resolve FX ID to TXL name, category, attachment and priority. |

Runtime data comes from original `resource\fx\fxPC.txl`,
`resource\fx\fxPCEtc.tfx` and the corresponding original FX HPKs. No substitute
particle images, effects or new asset folder layout were introduced.

The supplied original source renders selected monster text white. The supplied
Kathana captures render it yellow. This implementation deliberately follows
the requested screenshot color, with the original selection and height rules.

## Implementation checklist

- [x] Hide unselected monster names by default; retain town NPC names and the
  existing global name/HUD visibility controls.
- [x] Keep the selected living monster name yellow while selected or attacked.
- [x] Use authored yellow `1010011` selection FX and red `1010031` attack FX.
- [x] Change the persistent effect when attack state changes, releasing the old
  nodes; do not restart an unchanged marker each frame.
- [x] Stop target presentation when the target dies, changes or disappears.
- [x] Use authored `1010021` for hovered ground loot and the loot being approached;
  release it when no valid selected/hovered item remains.
- [x] Keep a clicked distant item as the pickup destination and approach it,
  using the existing authoritative movement and pickup path.
- [x] Preserve the source character-name height formula, remove the extra
  13-pixel screen lift, and refresh stored model height on equipment replacement.
- [x] Start newborn FX after the world loading/camera gate opens, so loading
  does not consume its two-second lifetime before gameplay is shown.
- [x] Start newborn FX on accepted dead-to-living authority transitions.
- [x] Start Chakra/level-up FX on changed authoritative Chakra/level state.
- [x] Start skill FX when an authoritative learned skill level increases.
- [x] Establish a baseline after CHAR_INIT; restored skills/Chakra do not generate
  upgrade FX. Identical state and rejected requests produce no upgrade FX.
- [x] Attached progression models, billboards and particle groups follow player
  translation; hit FX retain their impact position. Existing light-owner lookup
  remains available for impact lights.
- [x] Exercise actual authored FX resources, state transitions and cleanup using
  CPU doubles without opening a renderer or audio device.
- [ ] Accept name spacing, yellow/red transitions, loot ring and progression FX
  pixels in one authorized offline runtime session.
- [ ] Verify Kathana-equivalent node/socket hierarchy behavior for every other
  skill/effect family; this task does not establish full TFX engine parity.

## Implementation files

Within `C:\_GitHub\tantra-dev-main\_remake`:

- `src\compatibility\NativeWorldFeedback.h`: original IDs, name/target policy,
  accepted-state progression observer.
- `src\app\tantra_remake_main.cpp`: world-entry, state-change, selection, hover,
  approach and label integration.
- `src\client\OfflineWorldGameplay.h/.cpp`: expose attack intent and clear it
  when switching to a different target.
- `src\rendering\HtRenderFacade\WorldSceneFxPresentation.h`: target replacement,
  persistent item FX, attached progression presentation and cleanup.
- `src\rendering\HtRenderFacade\NativePcPresentation.cpp`: equipment replacement
  carries the replacement's model height.
- `src\rendering\HtRenderFacade\MainHudHotkeys.cpp`: world-name screen placement.
- `src\tools\world_scene_fidelity_probe.cpp`: resource-backed CPU acceptance.

## Verification boundary

The CPU fixture checks effect loading and state/cleanup behavior. It does not
prove rendered color, occlusion, audio mixing, screenshot equivalence or gameplay
performance. Build/package evidence and installed executable hashes are recorded
in [the evidence file](../evidence/targets-names-progression-fx-20261025.json).
No game process is launched as part of this work.
