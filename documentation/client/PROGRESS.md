# Tantra Online client progress

## 2026-10-26 - repeat-use stat consumables

- [x] Connect native 59-second repeat scheduling, toggle cancellation and
  remaining-count square FX to accepted item keys on both quick bars.
- [x] Follow moves/swaps/merges, pause while dead and remove transient repeat
  state on depletion, sale/drop, loss of binding/capacity or profile reload.
- [x] Preserve no-rebinding for depleted repeat stacks, independent authority
  cooldowns and the original 400-byte saved profile; deduplicate page bindings.
- [x] Pass five focused CPU tests: 63 repeat and 187 timed-item assertions,
  ordinary quick slots/feedback and SQLite accepted/failed-save checks. The
  authored supported timed-buff inventory now contains 37 records.
- [x] Rebuild/overwrite both clients; static packages and protected-file hashes
  pass. No game, renderer, server or audio device was launched.
- [ ] Accept presentation in-game and finish unsupported effects, mixed-phase,
  entitlement, action cancellation/refund and online item services.

[Implementation and original references](guides/NATIVE_REPEAT_CONSUMABLES.md).


## 2026-10-26 - ordinary timed consumable buffs

- [x] Connect supported pure OnAffect items to the native live status callback;
  ten authored records match this family, with requirements and cooldown guards.
- [x] Preserve native effect replacement/expiry and status notifications, then
  publish accepted inventory changes only after durable consumption.
- [x] Pass 155 focused assertions across eight tribes and skill/progression/
  ordinary-item regressions; verify real SQLite rejection conserves saved items
  and clears accepted events on failed-session teardown.
- [x] Rebuild/overwrite both clients and pass static packages; preserve HPKs and
  all private userdata. No game, renderer, server or audio device was launched.
- [ ] Accept presentation in-game and finish repeat-use, mixed-phase,
  entitlement, other item-cost and full client acceptance paths.

[Implementation and original references](guides/NATIVE_TIMED_CONSUMABLES.md).


## 2026-10-26 - native quick-slot item lifecycle

- [x] Activate/display the exact saved inventory key and validate it at CHAR_INIT.
- [x] Follow source linked-list replacement order across five pages; handle
  depletion, moves/swaps, split/merge, sale/drop and cargo removal.
- [x] Queue inventory snapshots after accepted persistence; reject stale/failed
  operations without publishing accepted changes.
- [x] Preserve accepted bindings after a profile write failure and retry; verify
  400-byte reload, source order and lifecycle with 53 focused CPU assertions.
- [x] Pass progression/SQLite regressions, rebuild/overwrite both clients and
  pass static packages with HPKs and private profiles unchanged.
- [ ] Accept rendered quick bars/input and finish other item-cost, charged/
  continuous, online and full client phase gates.

[Implementation and original references](guides/NATIVE_QUICK_SLOT_ITEM_LIFECYCLE.md).


## 2026-10-26 - native pickup/drop result feedback

- [x] Publish typed offline pickup/drop replies only after durable acceptance;
  clear pending results on session teardown and rejected persistence.
- [x] Format native item/Rupiah/partial and six error-message mappings with
  original item-history colour 8 and translated parameter metadata.
- [x] Use accepted-drop equip sounds from the original item resource records;
  retain the native pickup handler's separate history behaviour.
- [x] Pass three focused CPU checks: 145 feedback assertions, world gameplay
  and isolated character/SQLite persistence, without launching a client.
- [x] Rebuild/stage the corrected release in both clients; static package checks
  pass and all native packs/private profiles are unchanged.
- [ ] Accept the HUD/audio in-game and finish remaining item/online lifecycle.

[Implementation and original references](guides/NATIVE_GROUND_ITEM_FEEDBACK.md).


## 2026-10-26 - manual drops and native pickup stacking

- [x] Connect drag-to-world confirmation to offline inventory/equipment/cargo
  removal, captured-record validation and native nearby ground placement.
- [x] Merge pickups into compatible stacks in source order; keep partial
  remainders on the ground before using empty slots on a subsequent request.
- [x] Save before ground publication/removal; verify real SQLite rejection leaves
  the saved inventory unchanged and closes the failed session.
- [x] Pass three focused CPU checks, rebuild/overwrite both client folders and
  pass static packages with HPKs and private profiles unchanged.
- [ ] Accept rendered confirmation/equipment/cargo/drop/pickup behavior in-game.
- [ ] Finish full item-result audio/messages, ownership/decay, specialized items
  and online services. P06-T06 and the full client goal remain open.

[Implementation and source references](guides/NATIVE_GROUND_ITEMS.md).


## 2026-10-26 - native ordinary item cooldowns

- [x] Connect accepted ordinary item deadlines to both native quick bars using
  the authority clock, original square FX and disabled overlay.
- [x] Share timers across duplicate bindings/pages without restarting; retain
  server family enforcement, silent quick-slot blocking and source boundaries.
- [x] Check native item 7001 / family 1 / 1,500 ms, alternate stacks, failed use,
  exact expiry, independent authority time, 32-bit wrap and malformed frames.
- [x] Pass all three focused CPU checks; rebuild/overwrite both client outputs
  and pass static packages with 148 HPKs each and 49 private files unchanged.
- [ ] Accept item FX and repeated input in-game; no client launch was made.
- [ ] Complete continuous/charged-item phases, remaining item lifecycle and
  online result transport. P04-T07 and all full phase gates remain open.

[Implementation and original references](guides/NATIVE_ITEM_COOLDOWNS.md).


## 2026-10-26 - native skill tooltip requirements and effects

- [x] Read TPA prerequisites, item/weapon requirements and all five effect lanes.
- [x] Compile original effect/message formatting and calculated Chakra/HP/TP
  context; display source current/next sections, costs and requirement colors.
- [x] Correct unlearned/max-level behavior and refresh cached hover information
  when skill, calculated status, inventory or equipment requirements change.
- [x] Check 1,303 profiles, 1,703 effect rows, numerical scaling, prerequisite
  colors and malformed input in the focused CPU client-skill fixture.
- [x] Pass skill-authority/item regressions, rebuild/overwrite both clients and
  verify static packages plus protected assets/private profiles.
- [ ] Accept rendering, wrapping/localization and hover behavior in-game.
- [ ] Resolve remaining skill assets and complete the broader client plan.

[Implementation and source references](guides/NATIVE_SKILL_TOOLTIP_PARITY.md).


## 2026-10-26 - native command emotes

- [x] Connect Provoke/Greet/Rush buttons and quick slots to native one-shot
  body/hair/apron animations, sounds and existing weapon sheathing.
- [x] Use original action effects 8/9/10 and animation states 833/831/832.
- [x] Complete on renderer STOP; preserve source-enabled input interruption and
  clear transient motion state on death, revival and world initialization.
- [x] Pass CPU gameplay transitions, 24 tribe/motion bindings and hotkey checks.
- [x] Rebuild/overwrite both clients and pass static packages; preserve all HPKs
  and private userdata.
- [ ] Accept motion/audio/carry behavior in-game; no extra launch was made.
- [ ] Finish remaining command services and the broader client plan.

[Implementation and original references](guides/NATIVE_COMMAND_EMOTES.md).


## 2026-10-26 - native command quick slots

- [x] Preserve/load the original negative command encoding in 400-byte profiles.
- [x] Drag authored command icons into either quick bar and retain original art.
- [x] Share sit, walk/run, attack, target and pickup execution with native hotkeys
  and command buttons; preserve authority/action checks and source pickup gating.
- [x] Check all 19 assigned command IDs, binary persistence, malformed input and
  existing skill/item/UI/cooldown behavior with focused CPU fixtures.
- [x] Rebuild/overwrite both clients, pass static package checks and preserve
  all 148 HPKs per output plus the user's 49 private profile files.
- [ ] Accept this change in-game; no additional client launch was made.
- [ ] Complete social/emote/shop/assist/summon/event commands and other P04-T06
  paths. Corrected FX diagnostics and camera acceptance remain open.

[Implementation and source references](guides/NATIVE_COMMAND_QUICK_SLOTS.md).


## 2026-10-26 - resumed client goal: services and multipart FX

- [x] Run exactly one newly authorized isolated offline process on channel 1:
  saved selection -> CHAR_INIT -> Mandara, warehouse items/Rupiah and save point.
- [x] Exit normally and audit SQLite slots, money/revisions, saved cells,
  unselected roster, quick slots, source checkpoint and both normal profiles.
- [x] Retain the strict diagnostic failure: five error rows in three FX models.
- [x] Fix native `(null)` texture placeholders in additional TMB geometry records;
  strengthen the CPU scene fixture to validate/sample every submitted part.
- [x] Pass scene/skinning and strict multipart/corruption checks; stage both
  corrected client outputs and verify static packages/protected files.
- [ ] Runtime-accept the corrected executable and usable camera/collision framing.
  No automatic second launch was made. The broader client goal remains active.

[Continuation details](guides/MANDARA_ACCEPTANCE_AND_FX_RECORDS_20261026.md) |
[Evidence](evidence/mandara-acceptance-fx-20261026.json).


## 2026-10-26 - Chakra semantics and immediate attack routing

- [x] Preserve the source's effective-minus-base bonus column, as requested.
- [x] Verify spent Chakra in native UI frames, SQLite MOB data and restored
  status; allocated points increase base/total, not the bonus counter.
- [x] Replace the old clicked ground route immediately on accepted attack and
  remove its click FX; selection without attack preserves movement.
- [x] Pass focused progression, authority/persistence and route/impact CPU checks.
- [x] Rebuild/overwrite both client outputs, pass static checks and preserve
  all existing HPKs and private userdata.
- [ ] Visually accept the status values and attack routing offline.

[Native player/monster navigation and fix](guides/CHAKRA_AND_ATTACK_NAVIGATION.md).


## 2026-10-26 - authoritative damage at animation impact

- [x] Defer rendered offline player/monster damage until the authored attack
  marker, rather than delaying only cosmetic feedback.
- [x] Keep HP, wear, death, rewards, loot and impact feedback on one authority
  operation; validate swing revisions and cancel stale/interrupted hits.
- [x] Pass real-TAB marker timing, duplicate/STOP cancellation, actor callback
  and existing skill CPU checks.
- [x] Rebuild/overwrite both clients, pass static package checks and preserve
  existing HPKs and private userdata.
- [ ] Visually accept hit timing in one authorized offline process.

[Fix and native references](guides/ATTACK_MARKER_AUTHORITY.md) |
[Evidence](evidence/attack-marker-authority-20261026.json).


## 2026-10-26 - Mandara portal/altar and skill presentation

- [x] Resolve 55 authored Mandara field placements, including both portals,
  altar, furnace, fountain, torches, smoke and ambient effects.
- [x] Correct always/day/night dispatch, mixed node visibility ranges and
  billboard yaw; use emissive portal/altar model presentation.
- [x] Add native skill icons, learned/max levels, upgrade visibility, tree
  arrows, hover details and common skill-window/quick-slot activation.
- [x] Resolve action/self animation tables for eight tribes, learned-level
  timings, level-band FX, socket and model-parent particle attachments.
- [x] Connect ready/cast/activation/state/follow/impact presentation, normal
  projectile travel, state-loop exceptions, shield impacts and sound cleanup.
- [x] Pass eight focused CPU checks across the final verification commands,
  rebuild/overwrite both clients and pass static package verification; preserve
  all existing HPKs and saves.
- [ ] Complete source resource gaps and specialized combat/tooltip paths in
  the guide. The complete skill/combat phase remains open.
- [ ] Accept field FX, skill UI/animations/FX and audio in one authorized
  offline process. No game/renderer/audio device has been launched.

[Implementation and remaining limits](guides/MANDARA_FIELD_AND_SKILL_FX.md).
[Evidence and 55-placement inventory](evidence/mandara-skills-fx-20261026.json).


## 2026-10-26 � terrain-conforming ground-click ring

- [x] Replace the planar ground ring with a projected mesh clipped to native THM
  triangles, following slopes/ridges and the renderer's exact grid diagonal.
- [x] Preserve original texture UVs, tint, playback and chevrons; retain depth
  testing with a small surface offset and native TCC floor support.
- [x] Cache projection by animated footprint and bound projection work.
- [x] Verify full footprint coverage, triangle interiors/vertices, UVs, map edges
  and actual Mandara FX integration in the focused CPU fixture (11054 checks).
- [x] Rebuild/overwrite both client outputs and pass static package checks;
  preserve pre-existing HPKs and userdata.
- [ ] Visually accept the ring on the user's reported slope in one offline run.

[Details](guides/TERRAIN_CONFORMING_GROUND_FX.md) �
[Evidence](evidence/terrain-ground-decal-20261026.json).
No game/renderer/audio device was launched. This supersedes the prior planar-ring
limitation; arbitrary placed-model/stair-face projection remains outside this path.


## 2026-10-25 � reference HUD, ground ring, shadows and grass

- [x] Correct TFX billboard mode 2 to the ground plane for the clicked ring.
- [x] Separate the target HUD; add target/player levels and numeric HP values
  using original frame and bar resources in the requested reference layout.
- [x] Raise overhead names eight pixels while retaining native world anchors.
- [x] Bound flat-ground shadows to 1.5 actor heights, keeping illumination driven
  by the original celestial vector.
- [x] Preserve all 4712 TML grass flags, use continuous grass alpha and the native
  configured fade, and retain the object triangle count and batch budget.
- [x] Pass four focused CPU/shader checks; rebuild/overwrite both client outputs,
  verify static packages and preserve pre-existing HPKs and userdata.
- [ ] Accept the rendered ring/HUD/name/shadow appearance and moving grass in one
  authorized offline process on one channel.

[Details](guides/REFERENCE_HUD_GROUND_GRASS_SHADOWS.md) �
[Evidence](evidence/reference-presentation-20261025.json).
New target-panel drag positions are currently session-only; original player and
other dialog positions continue using Interface.sys. No game was launched.


## 2026-10-25 � ground-click FX and grass depth correction

- [x] Inspect the supplied movement recording and native terrain-pick FX lifecycle.
- [x] Connect native walkable/blocked ground effects and click sound; replace on
  new click and cancel when movement stops or another interaction takes over.
- [x] Correct the earlier grass depth-bias sign against OGRE's D3D11 implementation.
- [x] Audit 12 original Mandara grass textures; retain uncompressed coverage mips
  and extend coverage generation to compressed DDS, tested separately with BC1.
- [x] Pass focused CPU checks, rebuild/overwrite both client outputs, verify static
  packages and preserve pre-existing HPKs and closed-client userdata.
- [ ] Accept ground FX and moving grass pixels in a user-run offline session.

[Details](guides/GROUND_CLICK_FX_AND_GRASS.md) �
[Evidence](evidence/ground-click-grass-20261025.json).


## 2026-10-25 � clearer target-marker glow

- [x] Compare the faint yellow/dark red remake captures with the Kathana reference.
- [x] Inspect original target texture RGB/alpha and identify extra attenuation.
- [x] Use additive authored RGB for NPC/monster/attack/loot target models;
  preserve animated tint, depth testing and ordinary model FX behavior.
- [x] Pass focused CPU/HLSL checks, rebuild and overwrite both clients, verify
  static packages and preserve all pre-existing HPKs/userdata.
- [ ] Accept actual marker brightness and edges in a user-run offline session.

[Details](guides/TARGET_MARKER_BRIGHTNESS.md) �
[Evidence](evidence/target-marker-brightness-20261025.json).


## 2026-10-25 � target selection, names and progression FX

- [x] Inspect all nine Kathana reference screenshots and trace original selection,
  item picking, name-height, newborn, Chakra and skill-up call sites.
- [x] Hide unselected monster names and display the selected name in screenshot yellow.
- [x] Switch authored target FX from yellow selection to red attack without
  restarting unchanged effects; stop stale target nodes.
- [x] Display original loot selection FX during hover/pickup approach and clean it up.
- [x] Remove the extra screen-space name lift; keep source height + 3 and refresh
  height when changing equipment.
- [x] Emit authored newborn FX after loading and on resurrection; emit Chakra/
  level-up and skill-learning/upgrading FX from accepted authority changes.
- [x] Pass resource-backed CPU selection/progression and combat FX checks,
  rebuild/overwrite both clients, and pass static package verification.
- [x] Preserve all pre-existing HPKs and userdata (including offline profiles).
- [ ] Accept actual name/target/loot/progression pixels in one authorized offline run.

[Details](guides/TARGETS_NAMES_AND_PROGRESSION_FX.md) �
[Evidence](evidence/targets-names-progression-fx-20261025.json).
No game/renderer/audio device was launched; no commit or push was made.


Updated: 2026-10-25. Current status index; detailed task toggles live in the
[phased client plan](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md).
The full client is incomplete. Documentation organization is not new gameplay.

## FX range, grass, rendering and telemetry - 2026-10-25

- [x] Extend visual FX ranges 3x while retaining native sound/jitter ranges.
- [x] Fix sampler setup order and add coverage-preserving grass mips/depth bias.
- [x] Merge compatible spatial static batches and add actor skinning culling/pose reuse.
- [x] Apply native world character LOD with safe authored-level fallback.
- [x] Add per-line draw/vertex/frame-time/CPU/GPU/memory statistics.
- [x] Pass 428 focused CPU checks plus existing scene and shader checks;
  audit 5,742 -> 3,721 loaded batches with 380,497 object triangles preserved.
- [x] Build/link the Release x64 launcher.
- [x] Rebuild/overwrite both clients and pass static package checks; all 148
  HPKs per output and 44 offline-profile files are unchanged.
  [Evidence](evidence/render-optimization-20261025.json).
- [ ] Accept visible results and measure live frame-time/GPU counters.

[Implementation, counter definitions and limits](guides/RENDER_OPTIMIZATION_AND_TELEMETRY.md).
Full static/terrain LOD and visual acceptance remain open; the broader goal is paused.

## Item hover, name colours and vegetation depth - 2026-10-25

- [x] Add cached source-backed item-slot tooltips with hover delay, wrapping,
  native colours, requirements, core item fields and viewport clamping.
- [x] Correct player/NPC/monster name anchors and NPC yellow; apply captured
  orange heading/choice colours and white dialogue body text.
- [x] Use depth-writing cutout for static vegetation masks with fractional
  edge pixels; retain separate INTRO/water/premultiplied transparency behavior.
- [x] Pass focused tooltip/colour/alpha and existing MainUI CPU checks.
- [x] Rebuild/overwrite both client outputs and pass static package checks;
  all 148 HPKs per output and 44 current offline-profile files are unchanged.
  [Evidence](evidence/item-hover-names-vegetation-20261025.json).
- [ ] Accept actual hover/name/foliage pixels and complete remaining contextual
  refinement/advanced tooltip formats.

[Source, implementation and limits](guides/ITEM_TOOLTIPS_NAMES_AND_VEGETATION.md).
The broader goal remains paused; no visual acceptance phase is closed.

## Kathana reference environment corrections - 2026-10-25

- [x] Separate the complete sky backdrop from the low authored cloud caps so
  Mandara can display all configured sky colour bands.
- [x] Focus the existing shadow map conservatively; use a tighter tent filter.
- [x] Animate lighting normals with the weighted skeleton pose, including
  inverse-transpose handling of nonuniform bone scales.
- [x] Pass source-asset/sky/fog, HLSL and all-eight-tribe normal fixtures.
- [x] Rebuild/overwrite both client outputs and pass static package checks;
  all 148 HPKs per output and 46 existing user-profile files are unchanged.
  [Build evidence](evidence/mandara-reference-presentation-20261025.json).
- [ ] Accept the matched daytime/camera visual result and measure FPS.

[Reference, source paths and limitations](guides/MANDARA_REFERENCE_PRESENTATION.md).
The broader goal remains paused; visual parity has not been established.

## Screenshot presentation fixes - 2026-10-25

- [x] Correct lighting clamp order, filtered/bounded shadows and world sampling.
- [x] Restore native attached-model yaw (+PI) and authored model Euler rotation.
- [x] Apply/persist live music/effect volume and supported original options.
- [x] Add player name, 291 TPA English NPC names and missing status identity fields.
- [x] Connect original animated CUR/ANI files to active offline cursor contexts.
- [x] Pass focused CPU, UI, skill-resource and shader checks.
- [x] Rebuild/stage and verify both outputs: 1,731 staged files each; all 148
  HPKs per output and 44 existing offline-save files are unchanged.
  [Build evidence](evidence/presentation-options-cursors-20261025.json).
- [ ] Accept the visible/audio result in an authorized offline run; complete
  engine/PBR/shadow, multiplayer cursor and guild-state parity remains open.

[Source, implementation and evidence](guides/PRESENTATION_OPTIONS_NAMES_AND_CURSOR.md).
The broader goal remains paused; these fixes do not close an acceptance phase.

## Native TFX, lighting and materials - 2026-10-25

- [x] Share field/target/combat FX runtime; support particle modes 0-5 and
  native incremental Euler drawing, billboards, animated models, local lights,
  sound lifetimes and camera-jitter nodes.
- [x] Use source FX visibility settings, bounded uploads and cached local lights;
  fix owner-aware animated FX cleanup.
- [x] Connect the map character light, native TMB material terms and map overrides.
- [x] Pass focused CPU resource/particle/combat/scene and HLSL linkage checks.
- [x] Rebuild/stage both outputs and verify HPK/userdata preservation. Both
  outputs contain 1,709 staged files; all 148 HPKs per output and 44 existing
  offline-save files are unchanged. [Build evidence](evidence/native-tfx-lighting-20261025.json).
- [ ] Visual/audible acceptance and complete native FX/environment parity.

[Source paths, implementation and explicit remaining limits](guides/NATIVE_TFX_LIGHTING_AND_MATERIALS.md).
The broader goal remains paused at **45/102 (44.1%)**; no acceptance gate closed.

## Source player hotkeys - 2026-10-25

- [x] Implement the active native player key routes, held W/A/D, sit/stand,
  nearest loot approach, camera modes/zoom/orbit, and both quick-slot modes.
- [x] Add native help, address, guild, chat and minimap panels; restore Tab/Ctrl+U,
  world name/speech switches and chat edit-focus precedence.
- [x] Read the packed DXT2 minimap with original crop/coordinate rules.
- [x] Pass focused CPU policy/resource, UI interaction and gameplay fixtures.
- [x] Rebuild/overwrite both client outputs and pass static package/preservation
  checks. [Build evidence](evidence/native-hotkeys-20261025.json).
- [ ] Accept visible input behavior in an authorized offline run; multiplayer,
  native text/IME, minimap overlay and broadcast services remain separate gates.

[Mapping, exact source paths and verification](guides/SOURCE_HOTKEYS.md).
The broader goal remains paused at **45/102 (44.1%)**. The scoped TFX/light/material follow-up is recorded above.

## Mandara textures, lighting, targeting, audio and placed FX - 2026-10-25

- [x] Fix repeating UV sampling on world objects; verify all 10 Brahman tree
  textures and its 1,734 vertices with UVs outside [0,1].
- [x] Restore the map's time-dependent secondary ambient/diffuse light and
  remove the sky/cloud far-depth fog washout.
- [x] Use native selection FX models, English TantraParam monster names and
  face the player when starting a monster attack.
- [x] Recover failed audio voices and connect native map/safe-zone BGM changes.
- [x] Connect 55 authored Mandara field-FX placements with bounded model/mode-2
  particle uploads and shared PC/map resource resolution, including packed TABs.
- [x] Pass scene/resource, combat and gameplay CPU fixtures.
- [x] Pass CPU HLSL compilation/link checks and static verification after
  rebuilding/overwriting both outputs (1,709 files each). All 148 HPKs per
  output and 44 existing userdata files are unchanged. See evidence for SHA256.
- [ ] Accept these changes visually and audibly in an authorized offline run.
- [x] Later shared FX work adds mode-1 particles, type-2 billboards and the
  character light; see the TFX/light/material section above.
- [ ] Complete native marker-placement and remaining water/weather/environment
  parity and acceptance.

The broader goal remains paused at **45/102 (44.1%)**; these scoped fixes do not
close the Mandara acceptance gate. No game process was launched.
[Source, verification and limits](guides/MANDARA_LIGHTING_TARGETS_AUDIO_AND_FIELD_FX.md) |
[Build/staging evidence](evidence/mandara-world-fidelity-20261025.json).

## Safe-zone carry, impact resource lookup and monster routes - 2026-10-25

- [x] Rebind weapons/shields to native carry sockets in safe/neutral carry
  states and restore their hand sockets on exit, without restarting the body clock.
- [x] Correct both claw parts and the off-hand dagger socket. Report missing
  authored sockets and hide unavailable attachments instead of exiting the game.
- [x] Fix the logged combat-particle failure: use the mounted resource-relative
  texture name, with a regression check against actual HPK resource names.
- [x] Connect nearby peaceful monsters to authored segment routes, waits,
  bounded roam offsets and collision-checked sparse navigation; keep fixed
  actors stationary and preserve attack/hit action locks.
- [x] Pass carry, mounted-impact, navigation and existing gameplay CPU fixtures,
  then repeat the three resource-dependent fixtures against staged client files.
  Navigation moved 55 actors; carry checks cover eight tribes and explicitly
  record four absent model carry sockets.
- [x] Rebuild and overwrite both client outputs with Release x64 SHA256
  `d48b68b472ade879777e622046d23f182489068d39cc2f7330153c4b2a8cfd10`. Static checks pass for 1,699 files in each;
  all 148 HPKs per output and 44 existing original-output userdata files are unchanged.
- [ ] Accept weapon carry and visible impact particles in one offline run.
- [ ] Accept rendered navigation, remaining native collision parity and full
  server AI/network/scheduler behavior. Other FX node families remain pending.

No new game/renderer/server process was launched. Changes remain local and
uncommitted; the broader goal stays paused at **45/102 (44.1%)**.
[Source, behavior and remaining scope](guides/SAFEZONE_WEAPONS_IMPACT_AND_MONSTER_ROUTES.md) |
[Evidence](evidence/safezone-impact-navigation-20261025.json).

## Monster combat presentation and animation lock - 2026-10-25

- [x] Verify native monster animation, attack/hit sound, impact FX and action
  sequence references before implementing this scoped continuation.
- [x] Route all eight monster slots, map skill animation overrides, one-shot
  completion and native idle fallback. Fix state/revision collisions and ATK2 looping.
- [x] Hold player normal attacks and direct skill actions until actual animation
  completion; reject movement/replacement actions and preserve the active pose.
- [x] Connect native weapon-hit mode-2 particles and original attack, swing,
  skill, hit and monster motion/death sounds through the original HPK layout.
- [x] Pass 4,283 combat checks, 195 actor checks, offline movement, skill STOP
  and existing native particle regression checks. Decode 24 player samples and
  13 FX sample requests without opening an audio device.
- [x] Rebuild and overwrite both client folders with Release x64 SHA256
  `e67b591ace75b9fb8fdfa6cce545e8ee036d3c3e21fd000cb0e428d932ec2a4e`; static verification passes for 1,699 files in each.
  Preserve all 148 HPKs in each output and all 44 existing original-output userdata files.
- [ ] Obtain the missing monster-2718 catalog/assets. The wider population audit
  samples 39 models / 227 available animation bindings but still fails this known gate.
- [ ] Complete billboard FX layers, remaining particle modes/rotation, models,
  lights, jitter, per-FX sound parameters and broader skill/projectile/AI behavior.
- [ ] Accept rendered animation, impact placement and audible output in one
  separately authorized offline run on one channel.

No game/renderer/server was launched. Changes remain local and uncommitted;
full-plan completion remains **45/102 (44.1%)** and the broader goal is paused.
[Implementation and source paths](guides/MONSTER_COMBAT_PRESENTATION.md) |
[Evidence](evidence/monster-combat-presentation-20261025.json).

## Equipped-weapon animations for all tribes - 2026-10-25

- [x] Select native weapon standing/walking/running/hit and attack animations
  for all eight tribes; retain native body, hair and apron mapping differences.
- [x] Distinguish shields from off-hand short swords, select dual attacks,
  retain safety-cell neutral poses and bind all three normal-attack sequences.
- [x] Advance the native sequence counter per attack, replay repeated one-shot
  attacks by revision and use the source AUTOATTACK visual playback interval.
- [x] Pass 8,609 equipped checks / 4,803 body/hair/apron bindings on canonical
  and staged resources, the 2,320-check attack regression and offline gameplay.
- [x] Rebuild and overwrite both outputs with Release x64 SHA256 `e17d6c0591eab6cf2adf446d87ad03667ed143faa6a045843d4b2925ffa40d53`.
  Static checks pass for 1,689 files; 44 userdata files and all 148 HPKs are unchanged.
- [ ] Accept the rendered equipped-weapon poses and sequences in one offline run.
- [ ] Complete hand/back socket relocation, bow projectile lifecycle and broader
  emote rendering. The existing Garuda SIT apron mismatch remains tracked.

No new game/renderer/server was launched. Changes are local and uncommitted;
full-plan completion remains **45/102 (44.1%)** and the broader goal is paused.
[Source and behavior](guides/NATIVE_ACTION_SKILL_SEQUENCE.md) |
[Evidence](evidence/pc-equipped-weapons-20261025.json).

## Attack apron failure and repeated ground clicks - 2026-10-25

- [x] Correct PCAttackAni mapping: read the native front/back apron fields,
  instead of supplying another body clip. Generate columns from type-20 source.
- [x] Stage the 40 missing apron clips and 8 additional referenced hair clips.
- [x] Preserve active walk/run playback when ground clicks change only the
  destination; invalidate a skill-owned pose when leaving that skill.
- [x] Pass 2,320 assertions / 864 body/apron bindings on canonical assets and
  again on staged assets. No game or renderer was launched.
- [x] Rebuild and overwrite both client outputs with Release x64 SHA256
  `9b39b3b3ee9f59cfdc8a47a27e00c51d7a748a2f1a24a7949bce8bf079ba5c63`. Static checks pass for 1,677 files;
  the original output's 44 userdata files and all 148 HPKs are unchanged.
- [ ] Accept rendered basic attacks and repeated walk/run retargets once offline.

These requested repairs are local and uncommitted. The broader goal remains
paused; overall completion stays **45/102 (44.1%)**.
[Sequence guide](guides/NATIVE_ACTION_SKILL_SEQUENCE.md) |
[Evidence](evidence/pc-attack-movement-20261025.json).

## Loading-screen follow-up - 2026-10-25

- [x] Inspect the latest bounded-loading run in the original output folder. The
  upload journal progressed through nearby monsters at roughly 2-3 seconds per
  model. The process ended before debugger attach; no valid stack was captured.
- [x] Cache resource-name fallback/misses per registered root set and replace
  quadratic HPK name/metadata merges while preserving order and precedence.
- [x] Add millisecond upload timings to the flushed initial-population journal.
- [x] Pass lookup, actor scheduling, native camera and direct HPK CPU checks.
  One catalog sample drops from about 100 ms to 7 ms; this is not a game benchmark.
- [x] Rebuild Release x64 SHA256 `93557e0c86ec2fe57e26059c636fb98c016e44c9f813cfb562e667008785da70` and overwrite
  both `C:\_GitHub\tantra-dev-main\_client` and `C:\_GitHub\TantraSrc\_client`.
  Both outputs pass static verification for 1,629 files. The original output's
  44 current userdata files and all 148 HPKs retain their recorded hashes.
- [x] Preserve the unfinished item-feedback slice separately as eleven byte-exact
  files plus a checked restore patch under ignored `.migration-local/item-feedback-wip-20261025`.
  Its item-7001 TPA check remains failing; none of it is included in this build.
- [ ] Accept the corrected build's loading, movement and camera in one offline run.
- [ ] Complete remaining Mandara warehouse/save-point/SQLite and loading measurements.

No additional game, renderer, server or zone was launched. The broader goal
remains paused; this repair is local and uncommitted. Completion stays
**45/102 (44.1%)**. [Repair guide](guides/RESOURCE_LOOKUP_LOADING_FIX.md) |
[Evidence](evidence/resource-lookup-loading-20261025.json).

## Spawn loading responsiveness - 2026-10-25

- [x] Record the user's report that the updated build reaches Mandara. This is
  user-reported entry; no fresh instrumented run was captured here.
- [x] Spread nearby actor/loot creation across frames (maximum two creations,
  soft 4 ms update budget); keep existing actors updating while new models wait.
- [x] Prepare initial population before gameplay and hold the camera transition
  without changing native camera calculations/update counts. Add flushed upload
  BEGIN/END breadcrumbs for a future stalled-model investigation.
- [x] Pass 167 actor-loading CPU assertions and 1,440 native camera cases.
- [x] Rebuild/overwrite Release x64 launcher SHA256 `3ebc43ae3569b554f246cfe394451716edad592ab70ffb0e3d9adf5d26b5056d`;
  build/staged bytes match and static distribution checks pass for 1,629 files.
- [ ] Confirm movement/camera responsiveness and complete the remaining Mandara
  route, warehouse/save-point and SQLite acceptance with the current launcher.
- [ ] Measure real upload/frame-time costs; a single upload remains synchronous.

No game, renderer, server or zone process was launched for these checks. This
slice is local and uncommitted. Completion remains **45/102 (44.1%)**.
[Loading guide](guides/BOUNDED_ACTOR_LOADING.md) |
[Evidence](evidence/bounded-actor-loading-20261025.json).

## Published checkpoint and current playtest — 2026-10-25

- [x] Commit and push remake source `0a0291634fbb7389c8478d5d2ab6afd2e0e624a1` and client runtime `b496e50f66ce6e9d6056b4abc2d6875081f88487` to main.
- [x] Rebuild/overwrite the current launcher and verify its bytes against the build;
  static distribution checks pass. Current client: `C:\_GitHub\tantra-dev-main\_client`.
- [x] Prepare a fresh isolated saved-roster profile from the preserved checkpoint,
  with no roster/value edits. The desktop shortcut **Tantra Online - Updated Offline Test**
  opens this profile with MandaraNpc, first channel and ashesh / ashesh.
- [x] Retain the reported spawn-freeze logs. Fresh logs are in the older
  `C:\_GitHub\TantraSrc\_client` deployment; its executable SHA256 starts `2793be42`.
  The published checkpoint executable SHA256 starts `d863658e`. No client process remained
  available for a live stack sample at inspection time.
- [x] Record the subsequent user report that the updated build reaches Mandara.
- [ ] Instrument/accept movement and camera responsiveness with the current executable.
  The old-deployment hang does not establish its cause or this build's behavior.

Completion remains **45/102 (44.1%)**. Source/runtime are published; historical
local/uncommitted notes below describe the state at their original checkpoints.
No additional game process was started during this preparation.

## Skill cooldown/result feedback — 2026-10-25

- [x] Expose owned skill replies to the HUD and apply source unit/area HP/TP rules.
- [x] Connect authority skill deadlines, native sixteen-step square cooldown FX,
  duplicate bindings, page/orientation changes and localized cooldown rejection.
- [x] Display source unit hit/dodge messages in the five native system-history rows.
- [x] Support the used original TGA UI image, preserving its alpha; retain HPK-first loading.
- [x] Pass 84 feedback/image checks, 138 authority-route checks and 426 UI checks.
- [x] Stage launcher SHA256 `d863658ebcbf0e3a598fc0485d01bcbd74ac1e5ebda976770ef8d65255c0cbf9`;
  static checks pass for 1,629 files. All 148 HPKs and the original/private files
  retain their hashes. No additional game or renderer was launched.
- [ ] Accept rendered feedback and complete item timers, chat controls, remaining
  native errors, floating damage, effects, projectiles, audio and the full plan.

[Feedback guide](guides/NATIVE_SKILL_FEEDBACK.md) |
[Evidence](evidence/native-skill-feedback-20261025.json).
Completion remains **45/102 tasks (44.1%)**. See the published checkpoint above.

## Direct-skill approach and retry continuation — 2026-10-25

- [x] Compile the original `AttackRangeCheck` hysteresis and `AttackMove`
  direction fragment. Direct unit/ground-area casts approach or retreat before
  native preparation, using learned-level client range and monster size.
- [x] Read passive 3302 and optional Jacunaearani 5802 range inputs from the
  canonical client TPA. The supplied TPA lacks 5802, so that lookup adds zero.
  Source review confirms the attack-range field is an integer despite its name.
- [x] Connect approach movement, native walk/run presentation and release of
  movement owned by the skill on cancellation, rejection and death. Planning
  may reach a target's occupied centre; actual movement still sweeps all actors.
- [x] Recover when an attack animation reaches STOP without its marker: cancel
  the unfired impact and allow a fresh command without charging TP/cooldown.
  This recovery is explicitly a remake stability correction, not a native branch.
- [x] Pass 94 client sequence/resource checks and 128 authority/SQLite route
  checks, including retreat movement, blocked destinations, preparation, stopped
  animation, free retry, final impact and persistence. The staged-root resource
  check also passes 94 assertions. Only CPU fixtures were executed.
- [x] Rebuild/stage Release x64 launcher SHA256
  `5267f3e39aa5e77f8ef2b5f54eb58a142f7e451b17a8eb24af56a24b751baacd`;
  static verification passes for 1,629 manifest files / 676,091,738 bytes.
  All 148 HPKs, original/previous launchers and the private save retain their
  hashes. Workspace userdata remains absent. No additional game or server ran.
- [ ] Accept rendered approach/retreat, model contact, crowded/narrow routes,
  cancellation and missed-marker recovery in an authorized offline game run.
- [ ] Complete bow/ammunition, follow/projectile, SHORT/dual/multiple/piercing,
  full cursor/reticle/cancel, holstering, TFX/audio and native result/history UI.

[Sequence and limits](guides/NATIVE_ACTION_SKILL_SEQUENCE.md) |
[CPU/build/preservation evidence](evidence/native-skill-approach-20261025.json).
Main-plan completion remains **45/102 tasks (44.1%)**; P04-T06, P07-T03 and
P07-T04 remain open. These continuation changes are local and uncommitted.

## Direct quickslot action sequence continuation — 2026-10-25

- [x] Connect existing quickslot keys/clicks to direct unit and ground-area
  action skills through canonical client TPA timing, FX PC animation selection,
  strict ready/casting/apply stages and authored attack markers.
- [x] Implement native requested-play-time scaling and one-shot attack-event
  consumption in the shared model clock; bind body, hair and apron animations.
  Read-only checks confirm the supported original DLL's relevant instructions.
- [x] Pass 60 new client sequence/resource assertions and 112 impact-route
  assertions, including animation -> native free preparation -> final impact ->
  SQLite. Recorded self-skill (115), playback/blend and INTRO FX checks pass.
- [x] Add the used FX PC metadata, TPA and reachable action/socket/weapon clips to
  the manifest. The staged-root check exposed the omitted TPA; that dependency
  was added, restaged and verified. The staged client passes 60 resource checks.
- [x] Rebuild/stage launcher SHA256
  `b232635b70ed156adef2655fd0a96bb1409bdeeeea65c45c47d0aed3e98e6e70`;
  static verification passes for 1,629 files. All 148 HPKs, original/previous
  executables and the private save retain their hashes; workspace userdata is
  absent. No additional game window, renderer or server was launched.
- [ ] Accept the direct sequence, ground picking, sockets, cancellation and
  post-cast restoration in an explicitly authorized offline game run.
- [ ] Complete source approach/range hysteresis, full cursor/cancel/retry paths,
  follow/projectile, short combo, piercing and multiple/dual actions, skill item
  costs, weapon holstering, TFX/audio, cooldown and native result/history UI.

[Action sequence guide](guides/NATIVE_ACTION_SKILL_SEQUENCE.md) |
[Engine evidence](evidence/native-action-skill-engine-20261025.txt) |
[CPU/build evidence](evidence/native-client-skill-20261025.json).
Main-plan completion remains **45/102 tasks (44.1%)**; P04-T06, P07-T03 and
P07-T04 remain open. Continuation changes remain local and uncommitted.

## Unit and area impact continuation — 2026-10-25

- [x] Accept authenticated final native unit/area damage packets, resolve their
  recipients and calculate costs, damage, splash scaling and cooldowns from the
  selected source. Forged damage/vitals/level fields are ignored.
- [x] Load original TCM first-floor heights and compile native rounded distance,
  obstruction, action-speed and range rules. Preserve unit range misses, area
  filtering, first-slot wear and the sixteen-slot area response.
- [x] Pass 97 new CPU assertions, including original 3307/3324 skills, a two-target
  area cast with one cost, source geometry, rewards/loot and SQLite state.
  Existing self-skill authority (115), combat rules (33) and CPU Mandara gameplay
  regressions also pass within their recorded scopes.
- [x] Rebuild/stage launcher SHA256
  `e9409c754d351197d774fcde8012fd8d1507f1ee75d39d22abba1681cd0bd526`;
  static verification passes for 1,515 files. All 148 HPKs, original/previous
  executables and the private save retain their recorded hashes; workspace
  userdata remains absent. No additional game process was launched.
- [ ] Submit targeted quickslot attacks through the original preparation,
  casting, animation hit-point and projectile stages. The final-hit authority
  does not make those presentation/input stages complete.
- [ ] Complete unit splash/piercing/multiple/dual attacks, item/arrow costs,
  remaining effects, native callbacks/results and rendered acceptance.

[Impact guide](guides/NATIVE_SKILL_IMPACTS.md) |
[CPU/build evidence](evidence/native-skill-impact-20261025.json).
Main-plan completion remains **45/102 tasks (44.1%)**; P07-T03 remains open.
All continuation changes remain local and uncommitted after the earlier push.

## Equipment wear continuation — 2026-10-25

- [x] Connect original combat durability loss to the live offline status session,
  with shared RNG, strict native break/recalculation behavior, item-info updates
  and persistence at the end of the gameplay tick.
- [x] Handle native `MSG_ITEM` (`0xB100`, 36 bytes) in the codec/frontend. Suppress
  the source's undefined item packet after an empty armor-slot roll while
  preserving the roll and arithmetic.
- [x] Pass 122 wear/wire assertions and 115 skill/combat/SQLite assertions,
  including exact worn-item persistence. The CPU gameplay fixture and existing
  equipment-stat/effect-timing regressions also pass.
- [x] Rebuild/stage launcher SHA256
  `efbad7c77121ded786ce29d6c5b8368d67f22fd6eb6ef94cc22e4fb4dbd0e78c`;
  static distribution verification passes for 1,515 files. All 148 HPKs and the
  recorded original executables/private save are unchanged. No new game launch.
- [ ] Verify rendered durability/broken-item feedback and repair of a newly worn
  item in the next authorized runtime attempt. Full dual-hit/skill wear coverage
  and remaining P06-T06 item families stay open.

[Wear guide](guides/NATIVE_EQUIPMENT_WEAR.md) |
[Build and CPU evidence](evidence/native-equipment-wear-20261025.json).
These continuation changes remain local and uncommitted.

## Combat rule continuation — 2026-10-25

Main-plan checklist: **45/102 tasks checked (44.1%)**. This counts tasks, not
weighted effort or release readiness. Partially implemented tasks remain open.

- [x] Replace ordinary melee's copied equations with compiled native defense,
  damage rolls, armor/resistance and HP rules. Each defender retains its own
  native decks and dodge clock. The source NPC dodge-speed field is exported.
- [x] Add native learned-skill `CalDamage`/`CastInstant1` calculations and original
  staff settings. This math API does not yet execute a targeted skill request.
- [x] Pass 33 focused combat assertions and the CPU Mandara gameplay fixture
  (movement/inventory/melee/death/rewards/respawn/revival). The earlier 99-case
  self-cast authority regression also passes within its recorded scope.
- [x] Rebuild/stage launcher SHA256
  `31673f673416abf335c2436d5999169c60702d6b5848d802c0bfc3ba2a97ba49`;
  static distribution verification passes for 1,515 files. All 148 supplied HPKs,
  the source/previous executables and private save retain their recorded hashes.
  The ten-zone input lock is unchanged. No new game process was launched.
- [ ] Complete attacker-memory, reward ownership and party recipients; finish
  the full NPC initialization/AI lifecycle. Ordinary wear is implemented above.
- [ ] Complete unit/area cast requests, live shield/link/periodic effects, PvP,
  motions/TFX/audio/cooldown presentation and rendered acceptance. Phase 7 stays open.

[Combat guide](guides/NATIVE_COMBAT_RULES.md) |
[Build and CPU evidence](evidence/native-combat-rules-20261025.json).
These changes remain local and uncommitted after the earlier requested push.

## Active skill continuation — 2026-10-25

- [x] Connect quick slots to authenticated self-targeted timed stat skills through
  native preparation/result frames. Ready timing, costs, cooldown arithmetic and
  timed effect application use the selected original source/data.
- [x] Add unit/area skill codecs and original-declaration fixtures: eight cases
  pass for the 96/456-byte records and eight-byte alignment. This does not enable
  area combat recipients.
- [x] Pass 99 CPU authority assertions, including the authored 3101 → 3102 → 3110
  prerequisite chain, no-charge preparation/cancellation/rejection, TP savings,
  expiry before costs, four timed resistance effects, cooldowns, session ownership
  and isolated SQLite vitals/skill persistence. No game window was launched.
- [x] Connect Karma and allowed-level settings to cast validation; consume
  notification batches once. Four existing progression/context/effect checks pass.
- [x] Rebuild/stage the x64 launcher, SHA256
  `1ba09f4fd25ef27255b80d4087af6b5268d132f6d612d477f2cacc49866f6afc`,
  and pass static verification of 1,515 manifest files. All 148 HPKs, the original
  executable and the previous private save retain their recorded hashes.
- [ ] Complete unit/area damage, instant and periodic effects, native interruption
  and error mapping, skill motions/TFX/audio and cooldown overlays. P04-T06 and
  P07-T03 remain open; the complete client goal remains active.
- [ ] Runtime-accept this executable in the next explicitly authorized offline
  attempt. No further game launch has followed the failed warehouse attempt.

[Skill checkpoint](guides/NATIVE_SKILL_CASTING.md) |
[Build and CPU evidence](evidence/native-skill-casting-20261025.json).
These continuation changes are local and uncommitted after the earlier push.

## Current continuation — 2026-10-25

- [x] Resume the saved roster in one isolated offline group-1/Zone01 process.
  Selection, CHAR_INIT, HPK-backed Mandara, restored progression and the movement
  route were observed. The run failed at warehouse dialogue, QA phase 10/exit 8.
  This does not establish a native crash. No automatic second launch was made.
- [x] Retain captures/camera/cells and verify SQLite integrity, all 72 inventory
  slots, all 120 cargo slots/money/revision and unselected characters. Normal
  workspace userdata and the read-only source checkpoint remained unchanged.
- [x] Implement shared immutable character/animation/LOD resources and isolated
  native track bindings; Release build and four focused CPU regressions pass.
- [x] Add explicit resource invalidation with safe live-version ownership.
- [x] Stage the rebuilt `HTLauncher.exe` and pass static verification of 1,515
  manifest files, x64/imports, original layout and exact nine-frame icon. All
  148 HPKs retain their bytes. That resource checkpoint's executable SHA256 starts
  `d7206303`; the later skill build is recorded above.
- [x] Repair fresh-workspace packaging: tracked plugin config, the canonical
  reference write guard and PowerShell 5.1-compatible HPK relative paths.
- [x] Freeze all ten zone/map bindings, original client inputs, selected atomic
  server datasets and 50 supplied terrain/object/pop pack bindings. The unchanged
  profile check passes; this does not accept staging or gameplay for other zones.
- [x] Add CPU core-map preflight using supplied archives and original loose
  companions. All ten maps decode and their collision dimensions match their
  selected server datasets; eight pass the current core dependency checks.
- [x] Correct DDS metadata offsets/bounds, support the supplied 67/76-material
  cave meshes with bounded tables, and fix virtual HPK sizes in the TMB probe.
  Twelve boundary checks, four existing TMB regressions and original BMP/TGA
  metadata coverage pass. Two exact world textures remain missing.
- [x] CPU-replay the warehouse camera: the old helper chooses bottom-UI pixels
  in all six sampled poses. Filtered triangle search finds UI-clear hits in all
  six. Original click/pose were unrecorded; rendered transaction acceptance stays open.
- [ ] Accept warehouse/save-point services and usable camera/collision in a
  further explicitly authorized runtime attempt. The QA now records candidate
  click points/UI overlap/nearest actor; the prior click rejection is unproven.
- [ ] Runtime-accept the new shared-resource executable and measure loading/memory.

[Continuation evidence](evidence/client-resume-20261025.json) |
[Shared-resource guide](guides/SHARED_CHARACTER_RESOURCES.md).

## Implemented foundations

- [x] OGRE/D3D11 x64 + SDL3 application, title/icon, configuration, diagnostics and build/staging.
- [x] Original catalog/asset readers, direct HPK loading, represented alpha/detail rendering.
- [x] Offline SQLite login/characters and native INTRO -> loading -> CHAR_INIT -> Mandara.
- [x] MainUI toggles/drag/focus/close/saved positions and calculated status/effects.
- [x] Bounded movement/camera, inventory/equipment, ordinary consumables and basic melee/progression.
- [x] Dialogue, shops, repair, warehouse and save-point implementations; complete current acceptance remains open.
- [x] Chakra/skill learning, quick-slot storage/item use and represented environment/audio.

These are scoped foundations. Runtime records prove their recorded executable,
not every current build. [HPK guide/evidence](guides/NATIVE_HPK_RUNTIME.md)
records 148 packs and explicitly unperformed visual acceptance.

## Phase gates

- [ ] [Phase 1: Application, HTLauncher lifecycle and configuration](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-01) — remaining tasks/acceptance open.
- [ ] [Phase 2: Original assets, HPK loading and resource identity](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-02) — remaining tasks/acceptance open.
- [ ] [Phase 3: INTRO: login, characters, handoff and error recovery](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-03) — remaining tasks/acceptance open.
- [ ] [Phase 4: MainUI, controls, calculated status and quick slots](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-04) — remaining tasks/acceptance open.
- [ ] [Phase 5: Movement, world actors, collision and camera](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-05) — remaining tasks/acceptance open.
- [ ] [Phase 6: Inventory, equipment, consumables and ordinary NPC services](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-06) — remaining tasks/acceptance open.
- [ ] [Phase 7: Active skills, complete combat, effects and progression](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-07) — remaining tasks/acceptance open.
- [ ] [Phase 8: Quests, advanced NPC services and refinement](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-08) — remaining tasks/acceptance open.
- [ ] [Phase 9: Live C++ server transport and online/offline separation](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-09) — remaining tasks/acceptance open.
- [ ] [Phase 10: Travel, complete death and resurrection](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-10) — remaining tasks/acceptance open.
- [ ] [Phase 11: Chat, parties, trade, guilds and competitive systems](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-11) — remaining tasks/acceptance open.
- [ ] [Phase 12: Environment, effects, audio and rendering fidelity](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-12) — remaining tasks/acceptance open.
- [ ] [Phase 13: Loading performance and release acceptance](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-13) — remaining tasks/acceptance open.
- [ ] [Phase 14: Zone01-Zone10 map alignment](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md#phase-14) — remaining tasks/acceptance open.

## Next tasks, in priority order

- [ ] Close corrected Mandara camera/warehouse/save-point and current HPK acceptance after the required go-ahead.
- [ ] Freeze source/protocol/data versions; preflight and align Zone01-Zone10 using the [map checklist](planning/ZONE01_ZONE10_MAP_ALIGNMENT.md).
- [ ] Extend shared character caching to prepared maps/collision, budgets and
  background loading; complete one genuine C++ online Mandara path when server work resumes.
- [ ] Finish active skills/commands/combat effects/AI, then quests/refinement and advanced services.
- [ ] Complete travel/revival, multiplayer and additional playable zones.
- [ ] Close INTRO, collision, environment/audio, loading/performance and release gates.

The first map stays Mandara1st. Zone10's catalog record deliberately points to
MAP_NewKruma.cfg under the Jina4th folder; do not substitute a similar filename.

## Evidence and safe continuation

- [Current Mandara acceptance](planning/MANDARA_GOAL1_ACCEPTANCE.md).
- [Latest native NPC-placement correction](guides/MANDARA_NPC_PLACEMENT_FIX.md).
- [Previous complete progress snapshot](archive/checkpoints/PROGRESS_2026-10-25.md).
- [Archive index](archive/README.md) retains historical counts, hashes and fixes.
- [Paused C++ server checkpoint](../server/PAUSED_GOAL_PROGRESS.md) is separate.

Use one isolated offline process/channel with ashesh / ashesh when acceptance
is authorized. Preserve normal saves and retain failed captures/logs/cells.
Do not automatically relaunch after a failed game attempt. The current
continuation's build/runtime results are scoped above and in its evidence file;
historical documentation-only claims retain their original scope.
