# Gameplay expansion implementation status

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.
Date: 2026-10-23. This follows the requested five-part gameplay expansion and
[source audit](../plans/SOURCE_GAMEPLAY_GAPS_AND_PLAN.md). **The five-part request is not
fully implemented.** The scope below distinguishes new code, previous foundations
and acceptance that still needs evidence.

Latest follow-up: [Goal 1 saved-route acceptance](../../planning/MANDARA_GOAL1_ACCEPTANCE.md).
One focused group-1 offline process restored progression/quick slots and verified
the corrected title/bar, then stopped at warehouse NPC visibility near `(394,97)`.
All 46 normal-profile hashes match. CPU investigation identified and corrected
raw `.tga` grass cards entering solid camera geometry; the warehouse wall still
clips the camera. The new grass-filter build is staged but has not been launched.
Warehouse/save-point and usable obstruction acceptance remain open.

Subsequent CPU follow-up: [native NPC placement correction](../../guides/MANDARA_NPC_PLACEMENT_FIX.md).
The warehouse was being placed from a different Global parameter revision. The
current build uses the original client's enumeration/positions for actors and
offline service ranges. CPU warehouse/save routes, service checks, visibility
samples and static packaging pass. A fresh saved-roster profile is prepared;
this build has not run, and one new runtime attempt awaits a go-ahead under the
user's no-automatic-relaunch constraint.

## Requested scope

| Request | Current implementation status |
| --- | --- |
| Verify Mandara stability and existing NPC services | Earlier progression/repair/buy/sell checks passed. The focused saved-roster follow-up reached warehouse-route cell `(394,97)` but could not select the NPC with the clipped camera. Warehouse/save-point acceptance remains open; normal-profile hashes are unchanged. Full population parity also has unresolved assets. |
| Chakra spending, skill learning and quick slots | Native Chakra/learning authority and UI actions added. Native skill-tree layout, quick-bar UI, registration/persistence, item use and original bindings added. Active skill execution, command registrations, full tooltips/arrows and cooldown presentation remain incomplete. |
| Active skills, combat effects, fuller AI | Not implemented by this change. Existing basic melee and status/effect foundations remain; skill bindings explicitly reject execution until its authority lifecycle is implemented. |
| Quests, advanced NPC services and refinement | Not implemented by this change. Existing dialogue, shop, repair, warehouse and save-point services remain. |
| Travel, remaining revival and multiplayer | Not implemented by this change. Existing same-world ordinary revival remains; dedicated services/GUI, cross-zone handoff and social systems remain pending. |

## New code and original references

- `tools/generate-native-pc-stat-core.py` now extracts the enabled original
  `CMob::IncChakra` and `CMob::LearnSkill` bodies from
  `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`. Existing native passive effect,
  point, prerequisite and notification code is reused.
- `src/compatibility/HtPcStatProjection.*`, `src/client/OfflineWorldStatus.h` and
  `OfflineCharacterChannel.*` expose authenticated actions and persist the
  resulting native mob through the existing SQLite path.
- Chakra IDs are the original **1–4**. The living-character and Heart/Asura-Nerve
  limits follow `Tantra\HTlauncher\HTInterface.cpp`,
  `CHTUIStatus::HT_hrStatus_IncreaseChakra`.
- `tools/generate-native-skill-layout.py` extracts the original arrays and
  tribe/class selection from `Tantra\HTlauncher\HTSkillInventory.cpp`.
  `src/resources/NativeSkillLayout.*` converts server tribe flags using the
  existing native creation order. Tree skill IDs remain native **3001–3499**;
  they are not texture IDs or invented translated skill IDs.
- `tools/generate-native-main-hud.py` captures both original quick-bar window
  declarations from `Tantra\HTlauncher\HTQuickSlot.cpp`. The skill grid uses the
  original 4-by-6 layout/control IDs from `HTInterface.cpp`.
- `src/client/NativeQuickSlots.h` reads/writes the native **400-byte** layout:
  five pages, ten slots, two little-endian 32-bit values per slot. Files live in
  the private profile at `system/QuickSlot_<group>_<character>.sys`, with atomic
  replacement. Canonical source assets are not changed.
- `MainHudPresentation.*` and `tantra_remake_main.cpp` connect source controls,
  tree icons/levels, drag registration, item use, page/orientation controls and
  Ctrl+left-click removal. Passive/unlearned skills cannot be dragged into slots.
  Active learned skills can be registered, but casting remains explicitly guarded.
- Captured-frame review found the tribe title was still using the server flag
  directly and the initial bar orientation differed from native `HT_vInit`.
  Both were corrected: server tribe 4 selects the Asura/Rakshasa title and the
  vertical HQUICKSLOT bar is shown by default. CPU regression checks cover these
  corrections; the subsequent focused Goal 1 run also verified their displayed
  title/bar and restored progression/slots.
- `src/tools/final_client_assets.cpp` stages referenced original skill icons.

## Native quick-slot controls

The original default from `HTSystem.cpp` is preserved:

- Number keys **1–0** use the ten current slots; **F1–F5** select the five pages.
- Shift+1–5 also selects pages in that mode.
- The original options buttons **13/14** switch to the alternative mode:
  F1–F10 use slots and number keys 1–5 select pages.
- Drag a supported inventory item or a learned active skill into a slot.
  Dragging between slots reassigns the binding. Ctrl+left-click removes it.
- Native arrow buttons change pages; orientation switching retains the bar's
  position. Dialog/layout persistence continues through the existing UI system.

Command registrations, active cast execution and complete cooldown/tooltip
presentation are open work; these controls do not imply those services exist.

## Verification and evidence

The final corrected launcher is staged at
`C:\_GitHub\TantraSrc\_client\HTLauncher.exe`, SHA256
`43B4A011D0930DC98497375CAEB22684839F7310A642A6F6C28DC1B194720827`.
Its 4,357-file / 258,524,854-byte owned distribution passes the static x64,
dependency, exact-icon and original-folder-layout checks.
[Current artifact/evidence ledger](../../evidence/gameplay-expansion-checkpoint.json).
**This native-placement executable has not been launched.** The focused Goal 1 run
tested `C7826A8D664C4A73F14B8D2E145052592FFF1D6EEB8D4D0232CD35E6875C40A4`;
see its report above. The progression runtime below belongs to the still earlier
explicitly identified hash.

- [x] Native progression CPU check: all eight server tribes, point spending,
  skill learning, point reduction, invalid IDs and native quick-slot roundtrip.
- [x] Cross-check displayed skill IDs against each tribe's authoritative book.
- [x] Existing stat/equipment/entry-effect/effect-tick CPU checks pass at the
  recorded progression checkpoint. The final UI check passed after updating its
  original-panel count for both added quick bars.
- [x] Final selected-Zone01 CPU preflight decoded 39 available base models and
  sampled 227 animation bindings with finite poses, excluding non-spawned
  zero-coordinate NPC rows. This does not certify every multipart/LOD variation.
- [ ] Full population asset acceptance: unresolved monster **2718** and NPC
  **1457** need matching client catalog/assets. NPC rows 1342–1346 have zero
  coordinates and are not part of the instantiated town population.
- [x] Build/stage the first x64 checkpoint and pass static dependency/icon/layout verification.
- [x] Final native MainUI CPU check, including both quick bars and orientation.
- [ ] One isolated offline process / one channel: INTRO, selection, `CHAR_INIT`,
  Chakra, learning, quick-slot item use, repair, buy/sell, warehouse items/money,
  town walking, save point and clean exit.
- [ ] Post-exit SQLite checks and unchanged normal profile hashes.

### Earlier progression runtime attempt

The tested launcher SHA256 was
`BDE257BE542E6E564A2C6C7DB08DE556644EB6F5E0D9434CBC1E99AA9BDEF50C`.
[Recorded partial acceptance](../../evidence/gameplay-expansion-runtime.json) includes
the actual diagnostics, captured screens and post-exit SQLite state.

- [x] INTRO/selection/`CHAR_INIT` and rendered Mandara.
- [x] Original status plus button spent one Chakra point; private character
  Chakra persisted as `(19,12,10,10)`.
- [x] Original skill plus button learned Asura skill **3105**, book slot 4,
  persisting level 1.
- [x] Inventory potion registered in the original quick bar and used with `1`;
  stack count persisted from 2 to 1. The private native binding file is 400 bytes.
- [x] Native repair click restored starter weapon durability to 4500.
- [x] Merchant quantity/confirmation, purchase and sale; private money persisted
  as 99,797 after those operations and repair.
- [x] Ground-click movement changed the saved cell from `(391,248)` to `(395,220)`.
- [ ] Warehouse item/currency and save-point UI acceptance: **not reached**.
- [ ] Full success exit: the QA scenario returned **exit 8** at
  `Next town navigation point is not visible through the normal camera`.

The test had assumed its next waypoint would be visible. The corrected probe
interpolates waypoint height, avoids UI-covered clicks, and makes bounded attempts
using native Insert/reset and right-drag camera controls before declaring failure.
It also saves camera/waypoint context and captures on that path. This is a test
driver correction; it does not establish complete authored camera/collision parity.
The corrected probe is built for the next acceptance slice and **was not launched
again**, preserving the requested one-process limit.

This failed run used the isolated database under
`_remake/build-ogre-sdl/gameplay-expansion-runtime-20261023/userdata`.
No normal profile file has a timestamp newer than the session start. The original
harness did not serialize its before/after normal-profile hash comparison before
the failure assertion, so a new hash-based unchanged-profile acceptance is not
claimed. The harness now writes those snapshots before future acceptance assertions.

### Supplied asset gaps

The supplied `B:\__TANTRA\TantraDataScripts\Global\ClientRes.xml` contains the
missing records, but their original files are absent from the supplied client:

- Monster 2718: `resource/object/Monster/Mesh/W_Monster1.tmb` and
  `resource/object/Monster/MonsterTex/W_Monster1.dds`; its source record has no
  animation IDs and represents production-system ore.
- NPC 1457: `resource/object/NPC/Mesh/NPC_mandara_trader_R.tmb`.
- Sixteen source skill icon IDs are absent from the binary catalog; corresponding
  images are absent from the supplied loose skill folders and from both
  `MAIN_SKILL.hpk` and `MAINUI.hpk`.

[Static source/asset evidence](../../evidence/gameplay-source-asset-gaps.json) records
catalog/XML hashes, reference rows and icon IDs. No replacement models/images or
unproven catalog mutations were introduced. Available source skill images are
staged; unavailable tree controls are guarded and diagnostics identify missing
icon IDs when encountered. Additional zone-alias population warnings remain in
the staging log; the new preflight is specifically for selected **Zone01**.

New diagnostics/tools:

- `src/tools/native_progression_actions_probe.cpp`
- `src/tools/mandara_population_preflight.cpp`
- Extended `src/app/SdlCharacterProbe.h` closure route
- Extended `tools/verify-mandara-closure.py`

Population preflight intentionally fails if an instantiated source actor lacks
its catalog row. A town-only runtime pass cannot erase that asset coverage gap.

## Outstanding implementation order

- [ ] Close any blocker found by the single runtime attempt without claiming a
  corrected binary has been rerun. Preserve the one-process testing constraint.
- [ ] Implement native active casting/recipient effects, item/command slot actions,
  cooldown display and remaining skill UI details.
- [ ] Complete generator/monster AI, rewards/decay and combat-effect recipients.
- [ ] Implement quest/task authority and remaining NPC predicates/services/refinement.
- [ ] Implement validated zone handoff, travel and remaining resurrection branches.
- [ ] Extract standalone authority, implement multiplayer/social services and the
  `_server` manager GUI using its existing implementation plan.

No commit or push is part of this change.
