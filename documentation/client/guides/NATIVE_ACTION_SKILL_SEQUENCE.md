# Native direct action-skill sequence

2026-10-26: [Current skill FX checkpoint](MANDARA_FIELD_AND_SKILL_FX.md) extends
the earlier direct-action scope below with active/self animations, normal follow
travel, stage FX, level variants, state loops and skill-window UI. Specialized
authority paths and rendered acceptance remain open.

Updated: 2026-10-25. Continuation of P04-T06, P07-T03 and P07-T04.
These full tasks remain open. Direct unit and ground-area quickslots now reach
native impact authority through client timing and authored animation events.
Follow/projectile and remaining action families remain separate work.

## Implemented path

1. Existing native F-key/number and quickslot click routes identify the learned
   skill. Offline authority checks the current learned skill/cooldown/context.
2. Read level-one client timing from the original `system/TantraParam.tpa`, as
   `HT_vMainChar_RealAttackControl` does. Server damage/cost values continue to
   use their selected authored authority tables; client timing is not substituted
   for server calculations.
3. Resolve `resource/fx/fxPC.txl` PCSkill -> PCSkillAction, sex and weapon group.
   The catalog now decodes native types 1/2/3 as well as the existing FX types.
   Weapon-back metadata selects the source fist animation group.
4. Direct unit skills retain their selected target. Ground-area skills wait for
   a non-UI left click and use the terrain pick as their native centre.
5. For direct unit and selected ground-area casts, run the source-generated
   `AttackRangeCheck` hysteresis before preparation. Approach the refreshed actor
   position or retreat to the original reflected point. Read range at the learned
   level, include the 3302 passive and 5802 totem bonuses, and add monster size/2.
   Range is an integer in the original declaration; the bonus setters use bytes.
   The existing world movement adapter checks terrain and living actors.
6. Emit the native free `snRes == -1` preparation echo, stop the existing basic
   attack/movement and face the target. No skill cost is paid here.
7. Wait strictly beyond `ready + 100 ms`, then strictly beyond optional casting
   time. Use native Ready/Cast/Attack animation bindings. Ready playback is
   requested at `ready + 200 ms`; attack playback uses authored apply time.
8. Retiming advances authored clip time by `clip_duration / requested_play_time`
   while playing. Blend time remains unscaled. Consume the first native
   `attack`/`Attack` event once per animation cycle, after its authored interval
   is reached. Missing attack animation and apply time <=200 ms retain the
   original immediate-hit fallback.
9. Submit the final native unit/area request at that point. Area target discovery
   uses the original strict planar distance, living/targetable objects and
   sixteen-recipient cap. Existing authority revalidates the final request and
   applies native costs, damage, cooldown, wear and persistence.

The production adapter applies the selected body, hair and front/back apron
animations with their playback requests. Normal state/weapon attack bindings
restore socket animations after a direct cast or cancellation. Attachments
created as rigid meshes retain that path instead of receiving skinned animation
commands. Accepted ground
movement, a new actor click, native R attack and death cancel the local sequence
before any unsubmitted hit; a canceled preparation has no skill cost.

The original attack manager remains necessary for follow types. This change
connects direct catalog types 2 and 5, with the existing authority's supported
pure damage/CastInstant1 phases. It does not turn every learned action skill into
an enabled quickslot cast. Unsupported paths reject before charging the skill.
The full native cursor/cancel matrix, weapon-back socket reattachment, sound,
TFX, area reticle and online error/ACK presentation remain incomplete.

## Approach and stopped-animation recovery

`NativeSkillApproach` compiles the original range-check body and toward/reflected
movement fragment through `tools/generate-native-skill-approach.py`. Each new
command resets the original direction, settled and accumulation counters. The
strict comparisons, integer planar distance, five-iteration accumulation cap,
range-one collision branch and target-size retreat boundary remain in that body.
Unsupported SHORT-family 3114 keeps its separate native cancellation path and is
rejected before this adapter starts. The supplied TPA has no item record 5802;
its optional totem lookup consequently contributes zero, as in the original.

The offline route planner can plan to the target actor's occupied centre while
actual movement continues to sweep against every living actor. New movement,
actor selection, basic attack, death and rejected preparations release movement
owned by the skill. Existing ordinary movement keeps its own destination.
Original authored collision/model contact parity is still open: the range-one
engine collision callback currently uses the bounded world's 12-unit actor
contact query. Narrow passages, crowded destinations and rendered approach need
acceptance. Bow/ammunition, follow, dual and other attack-manager paths remain
separate work; this adapter does not prove their native range/cost behavior.

If an installed attack clip reaches STOP before its marker was consumed, the
controller releases the cast and restores normal animation. It submits no final
impact and charges no skill resources. A new command can retry. This is an
explicit stability recovery for the remake; the original source does not show
this recovery branch. The native missing-clip / apply <=200 ms immediate-impact
fallback remains distinct. A successfully fired attack is never reissued during
STOP recovery.

[Approach and retry checkpoint](../evidence/native-skill-approach-20261025.json).
The full cancellation/cursor matrix and rendered behavior remain open.

## References and binary evidence

Original source root: `C:\_GitHub\tantra-dev-main\_references\Tantra`.

| Path under that root | Sequence/resource evidence |
| --- | --- |
| `HTlauncher\HTMainCharacter.cpp` | `AttackRangeCheck`, `SetAttackRange`, `AttackMove`, `RealAttackControl`, `SetChangeAni`, `AttackAnmAttackPoint`, ground-area selection and cancellation |
| `HTlauncher\HTMainCharacter.h` / `HTextern.cpp` | Native range field type, byte bonus setters and planar distance calculation |
| `HTlauncher\HTSkillSystem.cpp` / `HTItemSystem.cpp` / `HTControlDef.h` | Passive 3302 and Jacunaearani totem 5802 range sources |
| `HTlauncher\HTAttackManager.cpp` | Distinct no-follow/follow impact submission; follow path remains open |
| `HTlauncher\HTClientParamMgr.h` / `.cpp` | TPA load order, native 200-byte PC skill record and level-one timing accessors |
| `HTlauncher\HTFXResMgr.h` / `.cpp` | Serialized PCSkill 208-byte body, action 396-byte body, active 92-byte body and animation bindings |
| `HTlauncher\HTEngineHandler.cpp` | Skill animation selection by sex/weapon and playback override; hair/apron bindings |
| `HTlauncher\HTOtherObjectSystem.cpp` | `HT_vOtherObjectSystem_GetTerritoryArea` strict distance and target cap |
| `HTlauncher\HTResMgr.h` / `.cpp` | Item type and PCAni hair animation fields |
| `zone\CMob2.cpp` | Final impact authority and native costs/damage/cooldown |

Canonical runtime references are read-only:

- `C:\_GitHub\TantraSrc\TantraClient\system\TantraParam.tpa`
- `C:\_GitHub\TantraSrc\TantraClient\resource\fx\fxPC.txl`
- `C:\_GitHub\TantraSrc\TantraClient\resource\object\PC\Ani\PC_DEV_SKL_SND1.tab`
- `C:\_GitHub\TantraSrc\TantraClient\resource\object\PC\Ani\PC_DEV_SKL_ANR3_03.tab`
- `C:\_GitHub\TantraSrc\TantraClient\HT3DHeaven.dll`

The supported DLL has SHA256
`b818b89edbc9f8e49bb1b79200371740eaa157dabac23bbf1e2d52e40ff99941`.
Read-only disassembly confirms playback retiming at RVA `0xACDD`, attack-tag
selection at `0x2DDB1`, and the one-shot interval/state check at `0xB0D5`.
The selected 3307 animation has attack key 29; 3324 has attack key 13. The search
excludes the final timing key and matches lowercase `attack` or initial-capital
`Attack` substrings. It does not match all-uppercase `ATTACK`.
The DLL is never loaded or executed by these CPU checks.

[Captured engine evidence](../evidence/native-action-skill-engine-20261025.txt) |
[Build and CPU checkpoint](../evidence/native-client-skill-20261025.json).
The inspector checks the pinned DLL hash and instruction shapes before reporting
those observations; this is not universal native-engine binary compatibility.

## Acceptance and remaining work

- [x] Pass 94 client-resource/marker/retiming/state/approach assertions against canonical
  TPA, the complete nine-sheet FX PC catalog and original skill animations.
- [x] Pass 128 impact assertions including the animation -> native free echo ->
  final hit -> offline SQLite route, plus area enumeration and prior authority
  checks, in one isolated CPU group-1/Zone01 profile as ashesh / ashesh.
- [x] Pass the recorded existing 115-case self-skill authority and native
  playback/blend checks. These are bounded CPU regressions, not rendered tests.
- [x] Add FX PC metadata and reachable body/hair/apron/weapon attack clips to the
  runtime dependency manifest, preserving original folder paths. Asset closure
  increases by 114 entries; all supplied HPKs remain immutable.
- [ ] Verify direct skill animation, UI ground picking, sockets, rejection and
  post-cast restoration in an explicitly authorized offline game run.
- [x] Connect source approach/range hysteresis and CPU-verified stopped-marker
  recovery with a free retry; preserve final authority checks.
- [ ] Complete model-contact/collision parity, cancellation/reticle handling and
  rendered approach/animation-failure retry acceptance.
- [ ] Complete follow/projectile, piercing, multiple/dual attacks and skill
  item/arrow costs using their native attack-manager paths.
- [ ] Finish weapon holstering/reattachment, ready/cast/impact TFX, sounds,
  cooldown UI and native error/ACK/history feedback.
- [ ] Complete remaining effects, AI/PvP/party services and the full client plan.

No new game window, renderer or server service was launched. Continuation changes
remain local and uncommitted after the earlier push. No complete phase gate is
claimed from these checks.

## Ordinary attack socket mapping and movement retargeting - 2026-10-25

The reported `Cannot apply native PC socket animation: FApron` was caused by
reading adjacent body columns as apron IDs. In `HT_ResTableType20` (original
`_references/Tantra/HTlauncher/HTResMgr.h`), male sequence 1 uses body/front/back
columns **1/37/38**, female sequence 1 uses **4/39/40**. Sequences 2 and 3 have
their own named apron fields. `HTEngineHandler.cpp`'s attack branch selects these
through the sequence-specific male/female getters.

`generate-native-pc-attack-layout.py` now derives those columns from the native
structure. `NativePcResources.cpp` uses them, and `final_client_assets.cpp`
retains the actual front/back clips for all three referenced sequences. At that
checkpoint the gameplay attack choice remained unchanged; the equipped-weapon
continuation below connects the original normal-attack cycle. CPU checks bind and sample the authored body/apron
clips for all eight supported avatars and twelve weapon attack rows.

Accepted ground retargets no longer clear `worldAnimationState` unless a skill
owned the pose. The existing state-change guard therefore retains an active
walk/run clock while its destination changes. Actual stop/start, walk/run
changes and leaving a skill pose still select the appropriate animation. This
input-path change has source/build verification; rendered phase continuity
remains a manual acceptance check.

[Repair evidence](../evidence/pc-attack-movement-20261025.json).

## Equipped weapon routing for every tribe - 2026-10-25

`resources::nativePcEquippedAnimation` now follows the original
`HTEngineHandler::HT_hrChangeAnimation` and `HT_hrChangeAttackAnimation` rules.
The generated layout reads Item.dwItemType and the type-20 standing, walking,
running and hit state fields from the native declarations. Body clips use the
weapon-selected PCStateAni row and the native tribe column. Hair follows that
body clip; ordinary front/back apron clips continue using the requested state,
as in the source. Attack aprons follow the selected attack sequence.

An off-hand short sword selects dual attacks; a shield does not. No main-hand
weapon uses the native unarmed attack. Safety cells retain neutral locomotion
poses. Idle/sit/emote routing keeps the original unarmed-body selection; moving
weapon meshes to their back/hand sockets remains a separate presentation gap.
Bow arrow/projectile and complete combat behavior are also separate gates.

Normal-attack events now carry a presentation revision, so consecutive hits
restart their one-shot clips even if the weapon type is unchanged. The native
counter starts at 1, advances before each attack and wraps after 3. The normal
AUTOATTACK playback interval uses max(500, attackSpeedMs)+100 milliseconds from
HTMainCharacter.cpp. This changes visual timing, not offline damage or reward
formulas. Destination updates retain an existing locomotion clock.

CPU verification covers every one of the eight player tribes and all twelve
weapon types present in Item, with actual body/hair/apron bindings, hit and
movement poses, shields, dual weapons, neutral safety-cell poses and all three
attack sequences. Holstered/emote cases have selection checks only: a default
Garuda SIT back-apron has an existing skeleton mismatch, so full emote rendering
is explicitly unverified. The new weapon-action tests do not certify that gap.

[Equipped weapon evidence](../evidence/pc-equipped-weapons-20261025.json).


## Full-animation movement lock - 2026-10-25

Normal attacks now hold their rendered pose through STOP. Direct action skills
retain the movement lock during Ready/Casting/Applying, and an authored apply
clip must stop as well as satisfy the impact/apply deadline. Ground clicks and
replacement attacks/skills do not cancel those poses. Equipment presentation
changes wait until the current pose ends. Quickslot consumables remain usable.

This intentionally follows the user's stricter movement request; the original
source also permits some early-cast cancellation paths. Basic damage timing in
the offline authority has not been moved into the renderer. See
[monster combat presentation](MONSTER_COMBAT_PRESENTATION.md) for source paths,
particle/audio coverage, CPU evidence and the remaining native FX gaps.


## Native weapon carry and impact resource follow-up - 2026-10-25

Safe-zone/idle/emote and weapon-back skill carry policies now relocate the
actual equipment sockets without recreating the body or restarting its clock.
The impact renderer now passes HPK-mounted resource names rather than absolute
texture paths. See [the source-backed follow-up](SAFEZONE_WEAPONS_IMPACT_AND_MONSTER_ROUTES.md)
for per-tribe socket checks, native model limitations and monster route coverage.
Full emote, projectile and FX-layer acceptance remains open.
