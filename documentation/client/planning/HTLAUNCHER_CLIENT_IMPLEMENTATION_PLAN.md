# HTLauncher and client implementation plan and status

Reviewed: 2026-10-26. Target: Windows x64 **Tantra Online**, OGRE 14.6.1,
Direct3D11 and SDL3. Owned code: `C:\_GitHub\tantra-dev-main\_remake`.
Final runtime: `C:\_GitHub\tantra-dev-main\_client\HTLauncher.exe`.

This is a client-focused source/code audit and implementation checklist. Current
continuation results are recorded in [progress](../PROGRESS.md). One authorized
2026-10-26 saved-services attempt completed warehouse/save-point operations and
exited normally, but its strict diagnostic gate failed on multipart FX records.
The confirmed parser defect is corrected and CPU-verified; the corrected build
is staged without another game launch. Camera framing/obstruction and corrected-
build acceptance remain open. No controlled performance benchmark was made.
The full client is **not complete** and its implementation goal remains active.

Status notation:

- [x] The specifically described implementation exists; its evidence scope is stated.
- [ ] Missing, partial, or still awaiting the acceptance described by the item.

A working dialog, parser or offline operation does not establish complete gameplay,
online compatibility or visual parity. Unchecked acceptance does not mean its
underlying code is absent. This is a subsystem plan; the exhaustive native
function/packet coverage inventory remains a task below.

## Phase roadmap

Each task has a stable ID and a checkbox. A phase stays open until its acceptance gate is verified; completed foundations do not close a whole phase.

| Phase | Task group | Phase gate |
| --- | --- | --- |
| 01 | [Application, HTLauncher lifecycle and configuration](#phase-01) | [ ] |
| 02 | [Original assets, HPK loading and resource identity](#phase-02) | [ ] |
| 03 | [INTRO: login, characters, handoff and error recovery](#phase-03) | [ ] |
| 04 | [MainUI, controls, calculated status and quick slots](#phase-04) | [ ] |
| 05 | [Movement, world actors, collision and camera](#phase-05) | [ ] |
| 06 | [Inventory, equipment, consumables and ordinary NPC services](#phase-06) | [ ] |
| 07 | [Active skills, complete combat, effects and progression](#phase-07) | [ ] |
| 08 | [Quests, advanced NPC services and refinement](#phase-08) | [ ] |
| 09 | [Live C++ server transport and online/offline separation](#phase-09) | [ ] |
| 10 | [Travel, complete death and resurrection](#phase-10) | [ ] |
| 11 | [Chat, parties, trade, guilds and competitive systems](#phase-11) | [ ] |
| 12 | [Environment, effects, audio and rendering fidelity](#phase-12) | [ ] |
| 13 | [Loading performance and release acceptance](#phase-13) | [ ] |
| 14 | [Zone01-Zone10 map alignment](#phase-14) | [ ] |

## Implementation status at a glance

The checked items below describe existing foundations, with full details and
source references in phases 1-14. Their unchecked follow-ups remain required.

- [x] **HTLauncher foundation:** OGRE/D3D11 x64, SDL3 window/input, branding,
  configuration, diagnostics and build/staging into the final client folder.
- [x] **Original resources:** direct HPK loading, represented native model/map/UI
  readers, DDS/TGA alpha and terrain detail textures.
- [x] **Offline INTRO and entry:** SQLite accounts, server selection, three-slot
  creation/selection/deletion, world authentication, loading and Mandara CHAR_INIT.
- [x] **MainUI foundation:** toggles, dragging, focus, close controls, saved
  positions, calculated status, Chakra, skill learning and item quick slots.
- [x] **Bounded offline gameplay:** movement/routing, camera sweeps, basic melee,
  inventory/equipment, ordinary consumables, shops, repair, warehouse and save points.
- [x] **Environment foundation:** configured sky/clouds/fog/day-night, stars,
  sun/moon/flares, represented shadows and selected effects/audio.
- [ ] **Current-build acceptance:** HPK-backed presentation, corrected Mandara
  warehouse/save-point route and usable camera/collision around town geometry.
- [ ] **Complete INTRO:** remaining failure/retry/disconnect, equipment/tribe,
  full-roster, animation and camera acceptance.
- [ ] **Complete skill/combat play:** active casting, command quick slots,
  cooldown/result presentation, full effects, AI, rewards, loot and summons.
- [ ] **Quests and advanced services:** journal/history, progression/rewards,
  religion/class services and refinement/combination/dismantling.
- [ ] **Online C++ gameplay:** real client transport, authoritative replication,
  ownership/reconnect and matching native protocol/data profiles.
- [ ] **Travel and full revival:** portals, transport, map handoffs, remaining
  death penalties, item/healer recovery and cross-zone saved locations.
- [ ] **Multiplayer:** chat, parties, trade, guilds and enabled PvP/events.
- [ ] **Final fidelity/performance:** water/weather, complete animation/TFX/audio,
  shared caching, background loading, GPU skinning and measured release acceptance.

These are implementation and acceptance lists, not a percentage calculation.
The dedicated C++ server goal is currently paused. This client plan does not
resume it, and server-only changes do not mark client features complete.

## Reference roots and implementation boundaries

| Reference | Absolute path and use |
| --- | --- |
| Native client source | `C:\_GitHub\tantra-dev-main\_references\Tantra\HTlauncher` â€” lifecycle, controls, UI, network, actors and game presentation |
| Native authoritative rules | `C:\_GitHub\tantra-dev-main\_references\Tantra\zone` â€” skill, combat, items, quests, NPC, travel and death outcomes |
| Native declarations | `C:\_GitHub\tantra-dev-main\_references\Tantra\inc` and selected client/zone headers â€” IDs, packets, resource declarations |
| Original client assets | `C:\_GitHub\TantraSrc\TantraClient\resource` and `system` — read-only external resources and catalogs; not copied under `_references` |
| Final client packs | `C:\_GitHub\tantra-dev-main\_client\resource` â€” preserve supplied HPK names, bytes and folder structure |
| Authored tables | `B:\__TANTRA\TantraDataScripts` â€” Excel/XML; selected Global/K3 versions require recorded provenance |
| Native zone datasets | `E:\Global-server\Zone01` through `Zone10` â€” use each zone's settings/spawn/collision/generation files as one coherent dataset |
| Current dedicated server target | `C:\_GitHub\tantra-dev-main\_server` â€” native C++ services, authority and Win32 manager |
| Earlier Rust work | `C:\_GitHub\tantra-dev-main\_server\legacy\rust` â€” historical/reference implementation; new client integration targets C++ |
| OGRE SDK/source | `C:\Users\Ashesh\Downloads\OGRE\ogre-sdk-v14.6.1-msvc142-x64` and `C:\Users\Ashesh\Downloads\OGRE\ogre-14.6.1` |
| Branding source | `A:\zEngineK2\client\resources\ZFLauncher.ico` â€” already copied/embedded in the owned client |

Keep native resource/skill/item/map/actor IDs, original relative paths, numeric
widths, integer rounding, RNG order and state/message ordering. Preserve original
source/assets and private saves. Online outcomes belong to the dedicated server;
offline mode retains an authenticated SQLite authority. Client rendering and UI
consume authoritative results in both modes.

## Current baseline and immediate acceptance gap

- [x] Offline INTRO/CHAR_INIT/Mandara and native UI/gameplay foundations exist.
- [x] The 2026-10-26 authorized run restored the saved roster/progression/slot data
  and completed warehouse item/Rupiah operations and save-point confirmation.
- [x] Read-only post-exit checks verify 72 inventory slots, 120 cargo slots,
  money/revisions, saved cells, quick slots, source checkpoint and normal profiles.
- [x] Investigate the strict verifier's five FX error rows: the additional TMB
  reader rejected native `(null)` texture placeholders. Correct complete records
  for the reported water/light/altar meshes and sample all parts in CPU checks.
- [x] Rebuild/stage the corrected x64 launcher in both final client folders and
  verify the 1,731-file static packages without another game launch.
- [ ] Runtime-accept the corrected build and its full diagnostics.
- [ ] Accept usable camera framing, buildings/narrow passages and obstruction.
  Automated warehouse selection near viewport Y=0.978 is not camera acceptance.

Tested artifact SHA256:
`e13665d34523e7ef9b7053cfad78555612847bdae342b12161eb27517eb3a733`.
The corrected/unlaunched artifact hash and preservation results are recorded in
[2026-10-26 evidence](../evidence/mandara-acceptance-fx-20261026.json).

The run used one process, first channel, Zone01 and ashesh/ashesh. It exited 0;
its strict wrapper failed on five retained TMB_DETAIL_UNSUPPORTED rows. A separate
read-only audit confirms service/persistence assertions without creating a runtime
PASS. No second process was launched. Historical failed warehouse-picking evidence
remains in [Goal 1](MANDARA_GOAL1_ACCEPTANCE.md).

[Current continuation](../guides/MANDARA_ACCEPTANCE_AND_FX_RECORDS_20261026.md)
explains the service result, parser fix and remaining acceptance. Native warehouse
and save NPC cells remain `(412,116)` and `(491,176)`.

## Rechecked source evidence for outstanding work

Paths in this table are relative to `C:\_GitHub\tantra-dev-main\_references`. Function names and
messages are search anchors; line numbers may change as implementation proceeds.

| Native reference | Current remake evidence | Required work |
| --- | --- | --- |
| `Tantra\HTlauncher\TNNetworkManager.cpp`: `RequestSkillCastUnitSkill`, `RequestSkillCastAreaSkill`; `HTQuickSlot.cpp`: `HT_vActionskill` | Quick slots reach timed self buffs and direct unit/ground-area action sequences; impact authority is implemented | Finish specialized projectiles, remaining authority/effect/command/result paths and visual acceptance |
| `Tantra\zone\CMob.cpp`: damage and continuous-effect rules | `_remake\src\compatibility\HtPcStatProjection.cpp` throws for periodic damage without combat authority/attacker context | Add recipients, attribution, damage/death lifecycle and periodic-effect integration |
| `Tantra\HTlauncher\HTPortal.cpp`, world transition handlers and native portal/regen requests | `_remake\src\client\OfflineCharacterChannel.cpp` rejects nonzero position/portal/target CHAR_INIT variants | Implement valid handoff/re-entry and destination-failure paths before enabling those requests |
| Native consumable/charge/cancel rules in `Tantra\zone\CMob2.cpp` | `_remake\src\client\OfflineConsumables.cpp::useItem` supports instant HP/TP recovery and ten authored pure OnAffect stat-buff records; other phases/costs remain gated | Implement remaining supported item families with native consumption/cancellation order |
| Original resource identities and lifetime behavior | `CharacterResourceCache` now retains shared immutable resources; actors and LOD records reuse handles, with isolated native track bindings | Explicit character invalidation exists; map/collision sharing, budgets and background loading remain open |

Historical HPK evidence retains its original scope. The current continuation
observed HPK-backed Mandara in one failed services route; the newly staged
shared-resource build remains unlaunched. No FPS or all-map acceptance is claimed.

<a id="phase-01"></a>
## Phase 1 — Application, HTLauncher lifecycle and configuration

Native reference: `HTApplication.cpp`, `HTEngineHandler.cpp`, `HTConfigSystem.cpp`,
`HTSystem.cpp`, `HTGameSystem.cpp` under the native client source root.
Owned implementation: `src/app/tantra_remake_main.cpp`, `src/rendering/OgreBackend`,
`src/rendering/HtRenderFacade`, `CMakeLists.txt`, and the build/staging tools.

- [x] **P01-T01** — x64 CMake builds, OGRE/D3D11 setup, SDL3 window/events/input, resize and shutdown.
- [x] **P01-T02** — Tantra Online title/icon and `HTLauncher.exe` staging into `_client`.
- [x] **P01-T03** — Original `HTSpec.cfg`/`HTStartup.cfg` inputs, supported private overrides,
  HIGH defaults, represented realtime shadows and fog.
- [x] **P01-T04** — Upper-left native-format FPS/polygon/texture/VBIB/entity statistics.
- [x] **P01-T05** — Caught-failure logs, operation-specific diagnostics and best-effort dumps.
- [ ] **P01-T06** — Inventory enabled native branches and every required lifecycle/engine call;
  record implemented, intentionally unsupported and unverified operations.
- [ ] **P01-T07** — Complete remaining graphics-option behavior, device loss/recovery,
  fullscreen/DPI/focus transitions and fault-path acceptance.
- [ ] **P01-T08** — Verify resource ownership through repeated entry/exit and map changes;
  retain native cleanup/render gates and avoid stale OGRE nodes/materials/listeners.

Acceptance: supported startup/configuration modes reach a clean shutdown with
consistent resource lifetime and useful diagnostics on failure.


- [ ] **P01-GATE** — Complete the remaining tasks and the acceptance above for this phase.

<a id="phase-02"></a>
## Phase 2 — Original assets, HPK loading and resource identity

Native reference: client resource managers/catalog use and `Tantra\inc\HTPackFile.h`.
The supplied HPK layout is validated from actual pack bytes; old header variants
must not override that format evidence. Owned implementation:
`src/resources/HpkArchive.*`, `HtResourceLoader.*`, `ClientResourceCatalog.*`,
`NativeMapAssets.*`, and `src/rendering/OgreBackend/NativeHpkArchive.h`.

- [x] **P02-T01** — Direct map/object/FX/UI/sound archive lookup with original family/path precedence.
- [x] **P02-T02** — Bounded index/payload reads, cached indexes and read-only OGRE/SDL3 streams.
- [x] **P02-T03** — Preserve existing packs during manifest-owned staging; retain needed loose companions.
- [x] **P02-T04** — Required TMB/TMD/TAB, terrain/placement, BMP/TGA/DDS and source catalog readers.
- [x] **P02-T05** — `_TGA.dds` cutouts/alpha, represented INTRO transparency and terrain `detail.dds`.
- [ ] **P02-T06** — Complete the resource-family/unknown-record inventory for every intended map.
- [ ] **P02-T07** — Resolve missing monster 2718 resources and remaining skill images; distinguish
  the current client catalog from Global-only NPC 1457 before adding/replacing assets.
- [ ] **P02-T08** — Preflight every referenced actor detail level, animation, attachment and texture
  with exact path/record diagnostics and consistent source-profile provenance.
- [ ] **P02-T09** — Verify all required HPK families through actual production rendering/audio.

Acceptance: the selected client subset runs from the original folder/pack layout
without runtime extraction, arbitrary replacement assets or missing mandatory dependencies.


- [ ] **P02-GATE** — Complete the remaining tasks and the acceptance above for this phase.

<a id="phase-03"></a>
## Phase 3 — INTRO: login, characters, handoff and error recovery

Native reference: `HTIntroManager.cpp`, `HTIntroDef.h`, `HTCamera.cpp`,
`HTNetWorkHandle.cpp`, `TNNetworkManager.cpp`; UI source:
`TantraClient\resource\UI\IntroUIInfo.sys` and original INTRO images/packs.
Owned implementation: INTRO compatibility/presentation classes,
`src/client/NativeCharacterCreation.*`, `OfflineCharacters.*`,
`OfflineCharacterChannel.*`, `OfflineStore.*`, and loading presentation.

- [x] **P03-T01** — Native login/server panels, input/focus, gate animations and camera-gated progression.
- [x] **P03-T02** — Point-01 authentication, exactly three roster slots and empty-roster creation.
- [x] **P03-T03** — Creation/name/Chakra/tribe/face/hair flow, info/selection, result-gated deletion
  and cancellation with offline SQLite persistence.
- [x] **P03-T04** — Authored model-height face/hair zoom correction and eight-tribe/200-combination CPU coverage.
- [x] **P03-T05** — Selected equipped previews/attachments and native village/route selection.
- [x] **P03-T06** — Point-02 world authentication, final INTRO cleanup frame, staged loading,
  post-map CHAR_INIT and camera-gated world/HUD startup.
- [x] **P03-T07** — First-world Mandara1st resolves client map 40001; represented offline routes
  1/18/19 retain distinct zone datasets. Runtime config is
  `C:\_GitHub\tantra-dev-main\_client\resource\map\MAP_Mandara1st.cfg`.
- [ ] **P03-T08** — Finish occupied/full-roster, equipment/tribe variants and all retry, rejection,
  cancellation, timeout, disconnect and reconnect paths with targeted acceptance.
- [ ] **P03-T09** — Establish complete preview bounds, attachment, animation and camera visual parity.
- [ ] **P03-T10** — Investigate the historical selection-exit report if reproduced; later clean
  sessions and separate HUD/camera fixes do not prove its original cause.

Acceptance: creation, selection and deletion remain part of INTRO in offline and
online modes, with source-ordered responses and no world entry before readiness.
See [INTRO contract](../reference/lifecycle/INTRO_CHARACTER_FLOW.md) and [world entry](../archive/checkpoints/MANDARA_WORLD_ENTRY.md).


- [ ] **P03-GATE** — Complete the remaining tasks and the acceptance above for this phase.

<a id="phase-04"></a>
## Phase 4 — MainUI, controls, calculated status and quick slots

Native reference: `HTInterface.cpp`, `HTInterfaceCheck.cpp`, `HTQuickSlot.cpp`,
`HTSkillInventory.cpp`, `HTSystem.cpp`. Layout references:
`resource\UI\Interface.sys`, `MainUIInfo.sys`, `MainUISave.sys`, `LoadingUI.sys`.
Owned implementation: `NativeMainHud.*`, `NativeMainUi.*`,
`MainHudPresentation.*`, `NativeQuickSlots.h`, `OfflineWorldStatus.*`,
`compatibility/HtPcStatProjection.*`.

- [x] **P04-T01** — Main bar/button/shortcut toggles, dragging, focus, close/Escape and saved positions.
- [x] **P04-T02** — Native Interface.sys position loading and private layout persistence.
- [x] **P04-T03** — Calculated status/entry effects after CHAR_INIT, ordered notifications,
  supported expiry/heal/TP ticks and persisted changed native MOB data.
- [x] **P04-T04** — Chakra spending and source skill learning through authenticated offline actions.
  - [x] Verify native base/bonus semantics and persisted Chakra allocation with
    SQLite status reload; keep the original bonus column.
- [x] **P04-T05** — Five-page 400-byte quick-slot files, item/learned-skill registration,
  native key modes, orientation and ordinary potion execution.
  - [x] Track exact saved item keys and native replacement order; update five
    pages on accepted depletion/move/swap/stack/sale/drop/cargo changes and retry
    failed profile saves. See the
    [item lifecycle checkpoint](../guides/NATIVE_QUICK_SLOT_ITEM_LIFECYCLE.md).
  - [ ] Accept quick-bar visuals/input and finish specialized item-result paths.
- [ ] **P04-T06** — Complete active-skill and command execution. Quick slots reach timed
  self buffs and direct unit/ground-area skills using native preparation, client
  timing/attack markers and authority costs/cooldown/damage. Source-generated
  approach/range hysteresis and free stopped-marker retry are connected. Full
  collision/cancellation, follow, other action/effect/command paths and rendered
  acceptance remain open. See the
  [direct sequence](../guides/NATIVE_ACTION_SKILL_SEQUENCE.md).
  - [x] Connect action/self animation stages, normal follow travel, stage/state FX,
    sockets, model-parent particle attachments and native level variants.
  - [x] Preserve native command bindings/art and connect sit, walk/run, attack,
    target and pickup through buttons, quick slots and native hotkeys. See
    [command implementation](../guides/NATIVE_COMMAND_QUICK_SLOTS.md); runtime acceptance remains open.
  - [x] Connect Provoke/Greet/Rush commands to native one-shot motions, weapon
    carry/sound and STOP/input interruption. [Emote checkpoint](../guides/NATIVE_COMMAND_EMOTES.md);
    visual/audio acceptance remains open.
  - [ ] Finish specialized homing/piercing/arrow, remaining command and authority paths;
    accept casting, interruption and FX/audio in one authorized offline run.
- [ ] **P04-T07** — Complete cooldown presentation, skill prerequisites/arrows/tooltips,
  rejection/result messages, minimap/large-map markers and contextual commands.
  Authority skill timers, source square FX, localized cooldown rejection and unit
  hit/dodge system-history feedback are connected. Ordinary item timers now use
  authority deadlines; continuous/charged phases, remaining paths and rendered
  acceptance remain open; see [feedback](../guides/NATIVE_SKILL_FEEDBACK.md).
  - [x] Add native skill icons/tree connectors, learned/max levels, upgrade
    visibility and base-data hover details. See the
    [2026-10-26 checkpoint](../guides/MANDARA_FIELD_AND_SKILL_FX.md).
  - [x] Connect native localized current/next skill requirements, all five effect
    lanes, durations/costs and calculated hover context. See the
    [tooltip checkpoint](../guides/NATIVE_SKILL_TOOLTIP_PARITY.md).
  - [x] Connect ordinary item cooldowns, native square FX and silent quick-slot
    blocking on both bars/pages using accepted authority deadlines. See the
    [item cooldown checkpoint](../guides/NATIVE_ITEM_COOLDOWNS.md).
  - [ ] Complete continuous/charged-item timers and full item-result lifecycle;
    accept ordinary item visuals and input in-game.
  - [ ] Resolve missing source FX records and accept tooltip wrapping/localization
    and hover updates in an authorized offline run.
- [ ] **P04-T08** — Finish unconnected quest, guild, party, trade and advanced-service dialog content.
- [ ] **P04-T09** — Finish IME/text/localization, input capture and complete HUD service values;
  preserve source key bindings and native dialog/control IDs.

Acceptance: each supported button/shortcut performs its native action, reflects
the authority result, persists supported state, and behaves correctly during drag/focus/death.


- [ ] **P04-GATE** — Complete the remaining tasks and the acceptance above for this phase.

<a id="phase-05"></a>
## Phase 5 — Movement, world actors, collision and camera

Native reference: `HTCamera.cpp`, `HTMapSystem.cpp`, `HTOtherCharacterSystem.cpp`,
`HTNPCMonsterSystem.cpp`, `HTNPCMove.cpp`, native movement messages and zone rules.
Owned implementation: `WorldNavigation.h`, `OfflineWorldGameplay.*`,
`NativeMapAssets.*`, `NativeWorldPopulation.*`, `WorldActorPresentation.h`.

- [x] **P05-T01** — Corrected world handedness/picking; Mandara terrain, objects and native spawn/floor placement.
- [x] **P05-T02** — Native walk/run speeds, blocked-cell routing, swept movement, actor obstruction
  and persisted cells; follow/orbit/zoom/reset and terrain/static-triangle camera sweeps.
- [x] **P05-T03** — Original nearby town NPC/monster resources and bounded animation/pursuit behavior.
- [x] **P05-T04** — Actor 2008 multi-detail reader correction and targeted settled-world runtime evidence.
- [ ] **P05-T05** — Close building, narrow-passage, blocked-destination, actor-obstruction and
  camera-clipping acceptance along the remaining Mandara route.
- [ ] **P05-T06** — Obtain/verify absent authored Mandara `.tbo` collision inputs, or retain an
  explicit collision-fidelity limit; triangle/grid fallback is not native parity.
- [ ] **P05-T07** — Complete actor animation/control transitions, bounds, all attachments and
  other-player occupancy/appearance/movement from authoritative replication.
- [ ] **P05-T08** — Complete generator cadence/routes/formations, aggression/help/return/flee,
  monster skills and lifecycle with the authoritative simulation.

Acceptance: movement/camera remain usable and source-consistent around real town
geometry and actors; no acceptance is inferred from finite matrices alone.


- [ ] **P05-GATE** — Complete the remaining tasks and the acceptance above for this phase.

<a id="phase-06"></a>
## Phase 6 — Inventory, equipment, consumables and ordinary NPC services

Native reference: `HTEquipInventory.cpp`, `HTEquipSystem.cpp`, `HTItemSystem.cpp`,
`HTNPCControl.cpp`, `HTNPCScriptMgr.cpp`, `HTInterface.cpp`, plus zone handlers.
Owned implementation: `OfflineInventoryRules.h`, `OfflineNpcServices.*`,
`OfflineCharacterChannel.*`, `OfflineWorldGameplay.*`, `OfflineStore.*`.

- [x] **P06-T01** — Inventory/equipment transfers, occupied-slot swaps, stack merge/split,
  native slot/tribe rules, stat recalculation and represented equipment appearance.
- [x] **P06-T02** — Ordinary instant HP/TP consumables and item-type cooldowns.
  - [x] Connect supported ordinary timed stat-buff items to native replacement,
    expiry and accepted SQLite consumption; ten authored records match. See
    [timed consumables](../guides/NATIVE_TIMED_CONSUMABLES.md).
  - [ ] Accept timed-item presentation and finish repeat-use/mixed-phase items.
- [x] **P06-T03** — Native dialogue, merchant buy/sell, repair, personal item/Rupiah warehouse
  and save-point code with authenticated transactional persistence.
- [x] **P06-T04** — Earlier offline runtime evidence for repair, buying/selling and potion use.
- [x] **P06-T05** — Runtime-accept warehouse item/Rupiah deposit/withdrawal and save confirmation
  with the corrected native NPC positions; inspect post-exit SQLite and hashes.
  The 2026-10-26 tested artifact completed these services and post-exit checks.
  Its FX diagnostic failure and camera/corrected-build acceptance remain separate
  open gates; see the [scoped evidence](../evidence/mandara-acceptance-fx-20261026.json).
- [ ] **P06-T06** — Complete charged/timed/continuous item phases, cancellation/consumption
  rules, manual drops, pickup merging, ownership and decay. Ordinary combat wear,
  native break recalculation, item-info messages and SQLite persistence are
  implemented; full dual-hit/skill wear and rendered acceptance remain open.
  - [x] Connect manual item confirmation and offline drop requests, durable-save
    ordering and native partial pickup stacking. See the
    [ground-item checkpoint](../guides/NATIVE_GROUND_ITEMS.md).
  - [x] Connect typed accepted/partial/rejected ground-item feedback, native
    item/Rupiah history and accepted-drop sounds. See the
    [result checkpoint](../guides/NATIVE_GROUND_ITEM_FEEDBACK.md).
  - [x] Update ordinary item quick-slot keys from accepted authority snapshots;
    retain source replacement order and saved 400-byte profiles. See the
    [quick-slot lifecycle checkpoint](../guides/NATIVE_QUICK_SLOT_ITEM_LIFECYCLE.md).
  - [x] Connect ordinary timed stat buffs through source OnTakeAffections and
    durable accepted inventory events; verify native replacement/expiry and
    failed-save conservation. [Timed-item checkpoint](../guides/NATIVE_TIMED_CONSUMABLES.md).
  - [ ] Accept rendered drop/pickup paths and finish ownership/release, decay,
    remaining item-result families and continuous/charged-item phases.
- [ ] **P06-T07** — Connect the same UI/request/result flow to C++ server authority and verify
  rejection/rollback on stale revisions, insufficient funds/capacity and disconnect.

Acceptance: every accepted transaction conserves items/money and survives reload;
failed operations preserve prior state and produce native feedback.


- [ ] **P06-GATE** — Complete the remaining tasks and the acceptance above for this phase.

<a id="phase-07"></a>
## Phase 7 — Active skills, complete combat, effects and progression

Native reference: `HTSkillSystem.cpp`, `HTSkill.cpp`, `HTAttackManager.cpp`,
`HTFXResMgr.*`, network skill handlers; `zone\CMob.cpp`, `CMob2.cpp`, `server.cpp`.

- [x] **P07-T01** — Basic offline melee target/range/cooldown, provoked chase, ordinary HP/death,
  respawn, solo Prana/level thresholds and selected direct rewards/pickup.
  Ordinary damage now uses compiled native equations and per-defender dodge state;
  ordinary wear is connected. Full skill/dual-hit wear, attribution, NPC and
  rendered acceptance remain separate open gates.
- [x] **P07-T02** — Source status/passive/entry-effect foundations; these are narrower than full combat.
- [ ] **P07-T03** — Implement target/unit/area skill request, preparation/cost/cooldown,
  interruption, hit/critical/application phases and native ACK/result handling.
  Unit/area codecs, timed self buffs and final impact authority are implemented.
  Quickslots use canonical TPA/FX PC bindings, learned-level timing, native
  approach/range hysteresis, ground selection and once-per-swing markers. Ready,
  cast, activation/state, normal follow and impact FX are connected. Specialized
  projectile/authority families, full cancellation/ACK behavior and rendered
  acceptance remain open; see the [skill checkpoint](../guides/MANDARA_FIELD_AND_SKILL_FX.md).
- [ ] **P07-T04** — Connect cast/attack motions, TFX/projectiles/sounds, target HP, damage and
  cooldown presentation to actual authority outcomes.
  Body/apron clips, native timing/markers, stage/state FX, normal follow travel,
  weapon carry, sound cleanup, cooldown FX and unit-result history are connected.
  Specialized projectile/combat paths, floating hit counts, remaining result/error
  UI and rendered acceptance remain open. See the
  [field/skill FX checkpoint](../guides/MANDARA_FIELD_AND_SKILL_FX.md).
  - [x] Defer rendered offline player/monster damage and dependent rewards/wear
    to the authored marker; reject stale/duplicate/STOP callbacks. See the
    [authority timing fix](../guides/ATTACK_MARKER_AUTHORITY.md).
  - [ ] Accept player/monster hit timing in one authorized offline run.
  - [x] Cancel the old ground route/click FX on accepted attack; verify immediate
    monster approach while selection alone preserves the current route.
- [ ] **P07-T05** — Complete periodic damage/healing, caster/kill attribution, immunity,
  dispels/control, shields/absorption/links and effect cleanup on death/transition.
- [ ] **P07-T06** — Complete native AI/skill selection, reward groups/modifiers, party reward rights,
  loot ownership/decay, full XP/leveling and durable progression.
- [ ] **P07-T07** — Implement summons/companions with owner, allegiance, lifetime, follow/commands
  and source cleanup rules; normal NPC population does not provide these systems.

Acceptance: one authored direct skill and one timed effect work end to end first;
expand by native skill family with arithmetic/RNG and interruption/death coverage.
Current periodic damage explicitly requires missing combat/attacker context.


- [ ] **P07-GATE** — Complete the remaining tasks and the acceptance above for this phase.

<a id="phase-08"></a>
## Phase 8 — Quests, advanced NPC services and refinement

Native reference: active `CHTUIQuestWindow`/`CHTUIRefineWindow` in `HTInterface.cpp`,
`HTNPCScriptMgr.cpp`, `HTNPCControl.cpp`, `HTRefine.cpp`; authority:
`zone\Quest.cpp`, `server.cpp::RefiningItem` and selected job/religion handlers.

- [x] **P08-T01** — Ordinary dialogue and a bounded condition/event subset exist.
- [ ] **P08-T02** — Implement quest accept/progress/failure/completion, prerequisites, choices,
  journal/history, event triggers and exactly-once durable rewards.
- [ ] **P08-T03** — Implement enabled religion/Trimuriti, class/job, contribution/rank and
  advanced NPC conditions/callbacks with native rejection/result messages.
- [ ] **P08-T04** — Implement refinement/dismantling/combination eligibility, materials/costs,
  slot locking, native probability/RNG, failure/destruction and result presentation.
- [ ] **P08-T05** — Audit selected tutorial/event/country branches and their required assets/data.

Acceptance: UI, authority and persistence agree through success, failure, repeated
requests and reconnect. Quest bytes, a window or repair pricing do not complete these services.


- [ ] **P08-GATE** — Complete the remaining tasks and the acceptance above for this phase.

<a id="phase-09"></a>
## Phase 9 — Live C++ server transport and online/offline separation

Native reference: `TNNetworkManager.cpp`, `TNNetworkQueue.cpp`,
`HTNetWorkHandle.cpp`, `HTNetworkMsg.cpp`, `CPSock.cpp` and selected packet headers.
Current integration boundary: offline character channel and mock transport;
server progress is tracked in `C:\_GitHub\tantra-dev-main\_server\IMPLEMENTATION_PROGRESS.md`.

- [x] **P09-T01** — Offline logical authentication/character/status codecs and session ownership.
- [x] **P09-T02** — C++ SQLDMN/DBSRV and substantial world components exist separately; their
  checks do not establish an online OGRE client. Server `game_ready` remains false.
- [ ] **P09-T03** — Inventory client/server framing, version/profile, packet sizes/fields and
  authentication/roster/CHAR_INIT sequences against the same native declarations.
- [ ] **P09-T04** — Implement a bounded production network adapter and game-thread event dispatch,
  including fragmentation, ordering, backpressure, timeout and disconnect behavior.
- [ ] **P09-T05** — Connect login -> roster -> selection -> world authentication -> loading ->
  CHAR_INIT -> Mandara to the C++ authority on `127.0.0.1`.
- [ ] **P09-T06** — Apply authoritative actors/status/movement/corrections/items/NPC/combat results;
  reconnect restores committed state and removes stale session/actor state.
- [ ] **P09-T07** — Keep server SQLite and normal offline saves separate; expose real readiness
  and native failures through the existing UI rather than successful placeholders.
- [ ] **P09-T08** — Prove any required protection/crypto/stock-client compatibility separately
  for the selected protocol; admin JSON is not gameplay transport.

Acceptance: one authorized online client route saves, disconnects and restores
server-owned progression without changing the normal offline profile.


- [ ] **P09-GATE** — Complete the remaining tasks and the acceptance above for this phase.

<a id="phase-10"></a>
## Phase 10 — Travel, complete death and resurrection

Native reference: `HTPortal.cpp`, `HTGameSystem.cpp`, INTRO/world transition handlers;
`zone\server.cpp` portal/regen handlers and `CMob2.cpp::Regen`/item handlers.

- [x] **P10-T01** — Original ordinary-death message/confirmation and dead-input restrictions.
- [x] **P10-T02** — Bounded same-zone save/town recovery and ordinary monster-death penalties.
- [ ] **P10-T03** — Add native portals, NPC transport and supported travel items; retain
  save/disconnect/unload/connect/load/re-entry sequencing and destination failure recovery.
- [ ] **P10-T04** — Add item/healer revival, cross-zone saved locations, enabled fortress/castle
  choices and complete penalty/effect/consumption rules.
- [ ] **P10-T05** — Replace current rejection of nonzero portal/position/target CHAR_INIT
  variants only after their corresponding authority/handoff path exists.
- [ ] **P10-T06** — Preflight and accept each additional playable map with its matching zone data.

Acceptance: failed transfers preserve ownership/state, successful transfers have
one active owner, and death/revival uses the original UI and supported native choices.


- [ ] **P10-GATE** — Complete the remaining tasks and the acceptance above for this phase.

<a id="phase-11"></a>
## Phase 11 — Chat, parties, trade, guilds and competitive systems

Native reference: `HTChatting.cpp`, `HTChatNetWorkHandle.cpp`, `HTImeMgr.cpp`,
`TNChatNetworkManager.cpp`, `HTParty.cpp`, `HTExchange.cpp`, `HTGuild.cpp`,
`HTRentalStore.cpp`, `HTDuelSystem.cpp`; corresponding authoritative services/rules.

- [ ] **P11-T01** — Implement local/whisper/party/guild chat, IME input, channels, filtering,
  recipient/range rules and disconnect/reconnect behavior.
- [ ] **P11-T02** — Implement party invitation/membership/leadership, displays, shared status
  and authoritative reward/pickup rights.
- [ ] **P11-T03** — Implement two-sided trade offer/lock/confirmation/cancel and durable transfer;
  handle stale offers, disconnect and duplicate requests without loss/duplication.
- [ ] **P11-T04** — Implement guild/Ashram membership/roles/emblems/shared storage and enabled
  rental-store economy with permissions and durable ownership.
- [ ] **P11-T05** — Implement enabled hostility/PK/duel, safe zones, arena/siege/events and their
  UI/state transitions. Decide enabled native branches before porting optional services.

Acceptance: two or more principals exercise each supported workflow with server
authority, clean disconnect recovery and conservation checks.


- [ ] **P11-GATE** — Complete the remaining tasks and the acceptance above for this phase.

<a id="phase-12"></a>
## Phase 12 — Environment, effects, audio and rendering fidelity

Native reference: `HTMapSystem.cpp`, `HTEngineHandler.cpp`, `HTSound.cpp`,
FX resource use, map CFG/catalog data and available engine declarations.
Owned implementation: `MapConfig.*`, `MapWater.*`, `NativeSkyScene.h`,
`NativeWorldLighting.h`, `NativeWorldFog.h`, `HtNativeParticles.*`, audio services.

- [x] **P12-T01** — Map-CFG-driven sky/horizon, cloud masks/scrolling, fog/time colors,
  night stars, rotating sun/moon and represented flare chain/occlusion.
- [x] **P12-T02** — Authored terrain detail multiplication, material alpha fixes, represented
  lighting/shadows, INTRO fire, selected BGM and sample sounds.
  Follow-up implementation adds particle modes 0-5/incremental rotation,
  billboards, type-1 local lights, camera jitter, quality visibility, character
  spotlight and material specular/emissive terms. Full parity remains unchecked:
  [implementation and limits](../guides/NATIVE_TFX_LIGHTING_AND_MATERIALS.md).
- [x] **P12-T03** — Existing environment evidence includes parsing 19 supplied CFGs and one
  historical offline capture route; parsing does not make all maps playable.
- [ ] **P12-T04** — Complete exact star RNG/flicker, celestial sizing, flare attenuation/depth,
  alpha-aware/dynamic occlusion and native lighting/material parity.
- [ ] **P12-T05** — Complete rendered water/weather, vegetation/grass behavior, terrain/actor LOD,
  shadows and full map visibility/dynamic-loading fidelity.
- [ ] **P12-T06** — Complete TFX families, ambient/map/NPC/monster/skill/UI audio, looping,
  spatial/volume/cleanup behavior and locale-dependent resources.
  - [x] Correct additional FX mesh `(null)` texture placeholders and validate all
    reported parts/skin mappings with the strengthened CPU scene renderer.
  - [ ] Accept the corrected FX model submission visually and clear runtime diagnostics.
  - [x] Resolve all 55 Mandara field placements, including portals and altar,
    correct phase/range/yaw dispatch and scoped emissive model presentation.
  - [ ] Accept their rendered placement/brightness/audio and resolve documented
    original skill-FX binding/definition gaps.

Acceptance: controlled source comparisons cover time boundaries, alpha/materials,
weather/water, effects and audio, with world/UI draw order preserved.


- [ ] **P12-GATE** — Complete the remaining tasks and the acceptance above for this phase.

<a id="phase-13"></a>
## Phase 13 — Loading performance and release acceptance

Owned reference: [resource optimization plan](RESOURCE_LOADING_OPTIMIZATION_PLAN.md),
`CharacterResourceCache.*`, `WorldActorPresentation.h`, `NativeMapAssets.cpp`,
`OgreBackend.cpp`, `tools/stage-final-client.ps1` and `build-htlauncher.bat`.

- [x] **P13-T01** — GPU selection, unchanged-HUD caching, hidden-LOD CPU-skinning suppression,
  initial caches, direct HPK index/payload handling, cached name fallback/misses
  and indexed archive-list merging. Current-build loading/FPS acceptance stays open.
- [x] **P13-T02** — Build script overwrites the built final launcher and preserves private userdata;
  manifest-owned staging retains the original resource/system structure.
- [x] **P13-T03** — Ordinary misses retain shared immutable meshes/animations; actor loads,
  native LOD records and skeleton-specific track bindings reuse handles. Release build
  and four CPU regressions pass; current-build runtime acceptance remains separate.
- [ ] **P13-T04** — Reuse prepared map/model/collision data, coalesce in-flight loads and add
  versioned invalidation, memory budgets and source provenance. Character-resource
  invalidation/live-version safety is implemented; the complete task stays open.
- [ ] **P13-T05** — Add cancellable background IO/decode and bounded render-thread GPU uploads,
  spatial prefetch/hysteresis and appropriate batching/instancing. Nearby actor/loot
  creation now yields after at most two uploads or a soft 4 ms update budget;
  one upload remains synchronous and this full task stays open.
- [ ] **P13-T06** — Implement/profile GPU skinning and remaining visibility/LOD/upload costs.
- [ ] **P13-T07** — Measure cold/warm entry, frame-time percentiles, stalls, IO/decode/uploads,
  draw calls and memory on fixed routes/settings; historical FPS is not a current guarantee.
- [ ] **P13-T08** — Complete current-build startup/shutdown, longer play, map transitions,
  save migrations/rollback, packaging/relocation, dependencies and license review.

Acceptance: recorded measurements meet an agreed budget without changing native
sequence/results or dropping required visuals. Fast cached entry is a measurable
target; instantaneous loading and arbitrary FPS are not established.


- [ ] **P13-GATE** — Complete the remaining tasks and the acceptance above for this phase.

<a id="phase-14"></a>
## Phase 14 — Zone01-Zone10 map alignment

Native references: HTControlDef.h, HTGameManager.cpp, ClientRes.txl Map records,
NativeWorldMap.cpp and each imported server zone dataset.

- [x] **P14-T01** — Resolve native map records 40001-40010 and inspect all ten imported profiles.
- [x] **P14-T02** — Retain original map CFG names/resource folders and localhost endpoints.
- [ ] **P14-T03** — Preflight and stage all ten maps and their regular/pop HPKs, loose companions,
  collision/environment/FX/audio and actors without flattening original paths.
- [ ] **P14-T04** — Match native spawn, coordinates, heights/collision, NPCs/generators,
  portals, per-zone settings and versioned data hashes.
- [ ] **P14-T05** — Extend client staging/routing and the C++ authority's current Zone01-only
  gate, then implement source-faithful transitions/re-entry and failure recovery.
- [ ] **P14-T06** — Complete the per-zone implementation and acceptance checklists for all ten zones.

Detailed map bindings and per-zone toggles:
[Zone01-Zone10 map alignment](ZONE01_ZONE10_MAP_ALIGNMENT.md).

Acceptance: every supported zone loads its own matching client map and settings,
has usable movement/services, persists the correct current/saved zone, and
transitions without duplicate owners or stale resources. Catalog/imported status
does not imply playability. Schedule data alignment alongside resource/contracts
work, before enabling each zone online; phase numbers group tasks, not automatic
runtime launch order.


- [ ] **P14-GATE** — Complete the remaining tasks and the acceptance above for this phase.

## Recommended execution order

1. **Close the current Mandara gate:** accept corrected camera/NPC placement,
   warehouse/save-point persistence and HPK-backed presentation once authorized.
2. **Freeze client/server contracts and source profiles:** identify enabled
   branches, packet fixtures, data/resource versions and lifecycle ownership.
3. **Align Zone01-Zone10 map data and dependencies** using Phase 14 before enabling additional zones; keep current Mandara aliases separate.
4. **Improve shared caching and preflight:** remove repeated resource work and
   known missing-dependency surprises before extending crowds/maps.
5. **Connect one C++ online Mandara path:** reuse the source UI flow, implement
   actual transport and apply authoritative status/movement/NPC transactions.
6. **Finish skill/command UI and active combat:** direct skill + timed effect,
   then complete skill families, AI, loot and progression.
7. **Add quests/refinement/advanced services, then travel and complete revival.**
8. **Add multiplayer/social/competitive workflows and additional playable zones.**
9. **Close environment/INTRO fidelity and performance/release gates** with checks
   appropriate to each change; independent asset/fidelity work can proceed earlier.

For runtime acceptance use one isolated offline process/channel with
`ashesh / ashesh`, preserving normal-profile before/after hashes. Reuse the saved
roster; do not repeat passed creation/deletion or transaction matrices without
changed dependencies. After a failed game attempt, retain captures, logs,
camera/cell context and SQLite state, investigate with CPU checks, and obtain
the required go-ahead before another launch. No new client launch was made for this plan.

## Completion definition

- [ ] All required enabled native handlers and client lifecycle operations have
  an implemented path or a documented, explicitly accepted scope decision.
- [ ] Offline and C++-online INTRO -> Mandara -> play -> save/reconnect are verified.
- [ ] Required UI/gameplay/travel/multiplayer systems work with authoritative outcomes.
- [ ] Supported maps/assets, collision, animation, environment and audio pass their gates.
- [ ] Failures preserve saves/ownership; performance, packaging and resource lifetime
  have current artifact-bound evidence.

Earlier detailed audits remain supporting references:
[source gameplay gaps](../archive/plans/CURRENT_SOURCE_GAPS_AND_IMPLEMENTATION_PLAN.md),
[gameplay expansion](../archive/checkpoints/GAMEPLAY_EXPANSION_STATUS.md),
[full historical plan](../archive/plans/IMPLEMENTATION_PLAN_2026-10-25.md), and
[C++ server progress](../../server/IMPLEMENTATION_PROGRESS.md).
Their historical Rust/server and runtime statements are not current client acceptance.
