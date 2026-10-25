# Mandara offline gameplay follow-up

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.

Date: 2026-10-23. Target: x64 OGRE/SDL3 `C:\_GitHub\TantraSrc\_client\HTLauncher.exe`.
The current six requested areas are tracked separately below. The full remake,
dedicated server, and native visual/gameplay parity are not complete.

Later environment work adds CFG-driven cloud masks, stars, sun/moon and flares,
with one normal offline atmosphere session; see [the current environment report](../../guides/MAP_ENVIRONMENT.md).

## Implemented changes

- [x] Replace the camera's five offset rays with sphere sweeps against triangle
  faces, edges and vertices; retain the native TCC/TCM movement authority.
- [x] Add town route/actor-occupancy acceptance checks and preserve swept movement.
- [x] Bind native NPC event 3006 to repair mode and inventory slot clicks. Price
  uses native whole durability units, ceiling of current durability, float casts,
  `price / 10000 + pow(price, .85)`, count and integer truncation.
- [x] Bind NPC event 3008 to the original 120-slot warehouse window. Drag records
  between inventory and cargo; use the native Rupiah buttons and number inputs
  for deposit/withdrawal. Reload cargo on opening the service.
- [x] Persist account/world cargo and character changes in one SQLite transaction.
  Revision checks reject stale writes and roll back the character update too.
  Schema version 4 adds the cargo table without replacing existing character data.
- [x] Add stack merging, partial unpacking and occupied-slot swaps; validate both
  equipment directions, retain all item metadata, and display stack counts.
- [x] Right-click ordinary HP/TP consumables using authored recovery functions,
  requirements, bonuses, immunities and shared item-type cooldowns. Unsupported
  consumable phases reject before consumption. Right-click non-consumable stacks
  uses the original numeric unpacking flow.
- [x] Add solo monster Prana rewards, authored level thresholds, recursive overflow,
  status recalculation and ordinary monster death penalties above novice level 10.
- [x] Add native money-bag ranges and eight direct-item reward decks, original fallen
  models/textures, ground picking and SQLite-backed pickup. Full bags and repeated
  pickups reject. Drops are session-local and disappear on zone teardown.
- [x] Accept the exact original `(null)` texture marker used by the bare-hand glove placeholder.
- [x] Check original starter equipment/body assembly and attachments for all eight
  tribes; retain the previous 200 face/hair camera cases and INTRO input guards.
- [x] Apply time-dependent sunlight and authored diffuse/ambient material colours
  to terrain, static geometry and characters; transform placed mesh normals.
- [x] Use separate cloud-layer scroll speeds and cloud opacity; load the original
  distant `SkyTerrain.tmd` and its texture. Accept authored TMD mesh names.
- [x] Parse the original default-water creation gate. Mandara comments out `PosX`,
  so its default water plane remains disabled, matching `HTEngineHandler`.
- [x] Advance world time correctly across day/night boundaries with unequal lengths.

## Verification

Focused CPU checks passed for MainUI interaction (20 panels), eight-tribe starter
assemblies, 200 face/hair cases, native INTRO controls, town routes, sphere sweeps,
repair, stack/unpack, consumables, solo Prana/level updates, ground pickup, world-time
boundaries, SQLite upgrades and cargo revision/rollback. The HLSL compiler checks
cover composed lighting/fog, alpha and terrain programs.

**The single client runtime attempt failed before INTRO interaction.** It ran
`C2033305AB882C33C5D5B555104B882BF3D88F5D2A73716B27CB935A05455137`,
with one fresh private fixture configured for `ashesh` / `ashesh`, group 1, route 1.
The dump reports C++ exception `0xE06D7363` at OGRE's duplicate-object check.
Accepting the original `SkyTerrain` mesh name exposed a pre-existing renderer
assumption: both INTRO TMDs created `TantraRemakeTmd0`.

The follow-up fix scopes TMD scene objects and materials by full source path and
submesh. A CPU-only OGRE scene-allocation regression passes for both original TMD
files, with no render system, window, login, channel or additional HTLauncher.
Startup exceptions are now caught and logged, and startup replaces old diagnostics.
The verifier also rejects stale diagnostics and records its start before launching.

No second client process was launched. The old diagnostics TSV was byte-identical
to the pre-run copy and describes a historical build; its world-entry rows are
**not evidence of the current attempt**. The failed executable, dump and logs are
archived under `build-ogre-sdl/offline-playable-runtime-20261023`.

At that historical checkpoint, the rebuilt executable was staged separately
(4,176 owned files, x64/import/icon/inventory checks passed), with its hash and
inventory in [the verification record](../../evidence/playable-offline-verification.json).
CHAR_INIT, rendered Mandara and gameplay were not reached by that failed attempt.
Later runtime checkpoints verify entry and bounded gameplay/camera behavior;
see [the current review](../plans/NEXT_RECOMMENDED_TASKS.md). NPC transaction/save-point
acceptance and extended stability on the latest build remain open.

## Remaining work and evidence limits

- [ ] Complete authored primitive collision parity: the supplied Mandara map still
  has no `.tbo`; mesh camera sweeps are a remake fallback, not recovered primitives.
- [ ] Complete exhaustive building/narrow-passage/camera acceptance and prolonged
  gameplay stability. Sampled routes and one runtime are bounded evidence.
- [ ] Religion/class, transport, quests, guild services and repair of cargo records.
- [ ] Special/temporary consumables, revival items/healers, complete penalty and
  other-zone resurrection branches; the original ordinary death dialog remains.
- [ ] Party reward distribution, nine/tenth random/group loot tables, event reward
  modifiers, source item-grid decay scheduling and persistent ground items.
- [ ] Every equipment/refinement/subclass combination, additional INTRO retry and
  reconnect branches, and identification of any historical crash not reproduced.
- [ ] Original character sublights/specular lighting, exact atmosphere parity, weather/TFX,
  custom water objects and full static-object streaming/visibility parity. OGRE
  frustum culling and existing nearby actor loading remain in use.

The selected `Tantra\zone\server.cpp` contains an active customized solo Prana
multiplier: the party-member loop leaves `fol` at the zero sentinel, selecting
the x100 branch before the solo calculation. This port records that behavior
explicitly in `NativeSoloProgression.h`; it is not a claim about all Tantra versions.
Reward correction values come from the selected Zone01 `Data\WorldSettings.ini`.

## Original references

- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: item move/packing, NPC repair,
  money transfer, item creation/pickup, reward settings, `SharePrana`.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMOB.CPP`: `AcquirePrana`, `LevelUp`,
  `DecPrana`, monster `OnKilled`; `CMob2.cpp`: item use and recovery functions.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTNPCScriptDef.h` and
  `HTNPCControl.cpp`: repair/warehouse events and corresponding window lifecycle.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTEquipInventory.cpp`,
  `HTItemControl.cpp`, `HTInterface.cpp`: original controls, cargo, unpacking,
  merchant and numeric message boxes.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTEngineHandler.cpp`,
  `HTResMgr.h`: fallen models, environment creation, world-time colours and water gate.
- `C:\_GitHub\TantraSrc\TantraClient\system\{ClientRes,HTMessage,Mandara_NPC}.txl`;
  `resource\UI\Interface.sys`; `resource\map\MAP_Mandara1st.cfg` and
  `resource\map\Mandara1st\{sky,SkyTerrain}.tmd`.
- `B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml`,
  `HTSSetting-global.xml`; `E:\Global-server\Zone01\{MapData.tcm,GenerationArea.idx,NPCGener.txt}`
  and the selected zone's `Data` INI files.

CPU-only evidence is separate from rendered GUI acceptance. The historical HUD
queue overflow and any earlier user-reported selection crash are separate issues.
The startup failure in this attempt did not reproduce the historical selection crash.
