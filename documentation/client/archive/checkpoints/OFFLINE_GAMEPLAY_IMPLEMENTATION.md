# Offline Mandara gameplay implementation

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.
Date: 2026-10-23. Owned implementation: `C:\_GitHub\TantraSrc\_remake`.
Final runtime: `C:\_GitHub\TantraSrc\_client\HTLauncher.exe`.
This is a playable offline baseline across the six requested areas. It does not
complete the original client, dedicated server, or all native gameplay/visual parity.

## Controls

- Left-click ground to move in the current movement mode. Running is the default;
  **Z** toggles walking/running, including during a move.
- Right-button drag rotates the camera using the native horizontal/vertical
  sensitivity; the wheel zooms using the source elapsed-time calculation.
  Middle-button release or Insert resets the camera.
- Click a hostile actor to select it; click the selected actor again, or press
  **R**, to approach and attack. **E** selects the nearest other hostile target.
- **I** opens Inventory. Move items between inventory/equipment slots using the
  native left-button item move path. Right-click is the original item-use path;
  consumables and resurrection-item use remain a separate incomplete service.
- On an ordinary Mandara death, the original centered rebirth message appears,
  with its original Confirm button. Click Confirm to request resurrection.
  This source message-box mode does not bind Enter or Escape. While dead, the
  represented keyboard handler permits Inventory and blocks combat/dialog keys.
- Existing L/I/U/K/O/C dialog shortcuts, title dragging, focus, Escape/close,
  compact bar and saved window positions remain available.

Source bindings and resurrection details: [original controls and death flow](../../guides/SOURCE_CONTROLS_AND_RESURRECTION.md).
Runtime checks default to one offline session on channel 1. Other channels and
repeated runs require an explicit testing request.

## 1. Movement, collision and camera

`OfflineWorldGameplay` owns the current native-unit position. Ground picking
uses OGRE's actual camera projection, including the native handedness correction.
UI-consumed presses/releases do not initiate a world move.

Movement uses the L1 interpolation/speed calculation from
`Tantra\HTlauncher\HTMainCharacterMove.cpp`: integer walking speed is running
speed divided by two, and the main-character correction is 15. Travel is checked
in at most 7-unit steps against both the selected server TCM and client TCC,
with a character footprint and living actor occupancy. Heights come from the
shared terrain/object-floor query. Cells retain the original inverted Z indexing.
Crossed cells are saved through the authenticated character's SQLite MOB record.

The existing native startup camera remains the entry gate. It then follows the
authority's position, with orbit/zoom and cell/floor-based obstruction checks.
The navigation follow-up adds bounded A*, swept/pruned waypoints, actor
obstruction replanning and reachable NPC approach cells. Settled cameras use
terrain and original static triangles. Missing authored `.tbo` primitives,
sliding/navigation links and full camera/visibility parity remain open. See
[navigation, NPC services and INTRO hardening](MANDARA_NAVIGATION_NPC_INTRO.md).

## 2. Town NPCs and monsters

The two native population paths are separate:

- `HTNPCSystem::HT_vNPCSystem_CreateNPC` reads the authored `NPC` table's zone,
  X/Z and the Philippines visibility exclusions. `HTNPC::HT_vNpc_Input` supplies
  the native cell/floor placement, orientation and standing animation.
- `zone\CNPCGene.cpp` reads the selected zone's `NPCGener.txt`, including six
  monster slots, native maximum-population clamp, per-check counts and segment
  data. Monster attributes come from the authored Global `Monster` table.

Town NPCs use `NPC`/`NPCTMD`/`NPCAni` resources and their embedded display textures.
Monsters use `Monster`/`MonTMD`/`MonTex`/`MonAni`, including multipart skins.
Nearby actors are instantiated from original assets and removed at distance;
selection uses animated character triangle picking. The native main-bar target
name and HP controls reflect the selected actor. NPCs reject attack requests.

Implemented monster behavior is initial population, basic provoked pursuit,
attack/hit/death animation and respawn. Full generator command scripts, timed
population replenishment, formations, roaming, aggro/help/link/flee behavior,
NPC dialogue, basic buy/sell and save points are now connected to original UI
and the offline authority. Advanced services and quests remain pending. NPC/monster world state
is recreated on a fresh offline world session.

The supplied versions do not resolve every ID. Across routes 1/18/19, the asset
audit reports missing Monster resources 2710–2722 and NPC resource 1457; route 1
references missing Monster 2718. Thirteen optional equipment mesh catalog
references also have no supplied file. Missing visuals are reported and are not
replaced by invented assets. `SkyTerrain.tmd` still has an unsupported UV layout.

## 3. Inventory and equipment

The original Inventory controls map to source server inventory/equipment
indices, including the 6-column/4-row UI's column-major inventory ordering.
Original MainUI inventory bitmaps follow item locations and dialog focus/dragging;
ItemTex supplies the separate 3D equipment textures.
Transfers reject occupied/out-of-range targets, incompatible equipment slots,
tribe/level/chakra restrictions, incompatible two-handed/off-hand combinations,
and bag removal while expanded slots contain items. Whole native item records
move intact; SQLite persists them before success is exposed.

The equipment change recalculates the existing source equipment/stat pass
inside the live status session, preserving effect slots and timers. World and
roster appearances resolve the seven roster slots and native UpWear/DownWear/
HandWear/Shoes tables, plus static item sockets. Socket updates retain the full
authored matrix during animation. Empty optimistic roster IDs and serialized
`+4000` IDs are handled separately.

Stack splitting/merging, consumables, swapping occupied slots, trading, drops,
advanced shops, full expanded bags, all dual-wield rules, secondary sockets, hide-mesh
rules and refinement visuals are not complete. The movement/item APIs are
in-process authority operations; they are not claims of compatible live packets.

## 4. Basic combat lifecycle

Basic melee checks target existence, friendship, living state, range and
cooldown. It uses calculated player weapon damage and authored monster skill
damage. The plain damage path follows `CMOB.CPP` / `CMob2.cpp`: attack-minus-dodge
thresholds, authored JudgeCombat decks, critical scaling, inclusive PlayDice,
attack-type/armor multipliers, Consider level adjustments, defense and elemental
resistance denominators and immunity bits. The existing native Windows CRT and
deck adapter provides deterministic local random streams.

Damage changes live HP. Player changes are persisted through the owned MOB and
emitted through native UI/status producers. Death stops movement/attacks;
monsters can respawn. Ordinary resurrection follows `CMob::Regen(0,
REGEN_TYPE_REGEN)`: the same saved zone restores the saved cell with **20%**
calculated HP/TP; no saved zone, or another Mandara alias, uses the generation
area with **50%**. Free-cell resolution follows the original server dataset.
The original rebirth confirmation dispatches this operation; living characters
are rejected. Other saved-zone handoffs, item/healer resurrection and complete
death penalties remain incomplete.

This is the ordinary PC-versus-monster path. Full native RNG ordering across
all services, dodge timing, passive critical bonuses, absorption/shields/links,
periodic damaging effects, ranged attacks, skill casting/effects, loot/rewards,
level advancement, death penalties and PvP remain incomplete. Component lifecycle
tests do not certify full native combat parity or prolonged play.

## 5. INTRO work

The face/hair controls now enter the source face-camera view using the loaded
body's native bounds. The native first-zoom guard, transition grade and retained
body clock remain in place. Roster previews accept real equipment rather than
rejecting every nonempty equipment record. The existing create/select/delete,
village, cancel and server-to-world sequence is retained.

Full three-slot GPU acceptance, every failure/retry branch, all equipment
appearances and complete pixel/animation parity remain separate acceptance gaps.

## 6. Environment

`NativeWorldTime` follows `HT_hrSetInitTime` and the six branches of
`HT_hrUpdateWorldTime`, using `HTStartup.cfg`'s `TIME.InitTime` and the server
time in CHAR_INIT. Native unequal day/night lengths and morning/evening
boundaries drive fog and sky/cloud colors. The renderer uses the original sky
TMD and raw TGA cloud textures from `resource\fx\ENVTEX.hpk`, preserves cloud
alpha, scrolls cloud UVs and rotates the shadow sun/moon direction with native time.
Existing HIGH defaults, terrain detail, cutout materials and realtime shadows
remain enabled.

Full surface/material lighting, second cloud-layer behavior, stars, sun/moon
sprites, sky-terrain layout, water/reflection/ripples, grass and weather remain
pending. Updating a directional light is not evidence that every unlit shader
already implements original lighting.

## Reference paths

- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTMainCharacterMove.cpp`
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTCamera.cpp`
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTNPCSystem.cpp`, `HTNPC.cpp`
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTEquipInventory.cpp`, `HTItemControl.cpp`, `HTUIIDDef.h`
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTEngineHandler.cpp`, `HTIntroManager.cpp`, `HTMainBar.cpp`, `HTResMgr.h`
- `C:\_GitHub\TantraSrc\Tantra\zone\CNPCGene.cpp`, `server.cpp`, `CMOB.CPP`, `CMob2.cpp`, `LoadSetting.cpp`, `Basedef.h`, `HTParamMgr.cpp`
- `B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml` — NPC, Monster, Item and skill authoring profile.
- `B:\__TANTRA\TantraDataScripts\Global\HTSSetting-global.xml` — JudgeCombat, Consider and attack/armor chart, alongside prior stat imports.
- `E:\Global-server\Zone01`, `Zone18`, `Zone19` — each selected zone's atomic generator/collision/settings dataset.
- `C:\_GitHub\TantraSrc\TantraClient\system\ClientRes.txl`, `HTStartup.cfg`, `HTSpec.cfg`.
- `C:\_GitHub\TantraSrc\TantraClient\resource\map\MAP_Mandara1st.cfg`, `Mandara1st\sky.tmd`.
- `C:\_GitHub\TantraSrc\TantraClient\resource\object\NPC`, `Monster`, `PC`, `Item`; `resource\fx\ENVTEX.hpk`.

Authored Global tables are an explicit offline profile, not proof of equality
with the later encrypted deployed zone parameter tables. The importer records
source hashes and physical DOM row/cell addressing in
`_remake\derived-assets\world-gameplay\PROVENANCE.json`.

## Current navigation/NPC/INTRO validation

The staged executable SHA-256 is
`47405e614992d5000b9113344b74ad7e01953061a7f48690b8e3bed2fc8be7b7`.
Routing, camera geometry and NPC authority component checks pass, alongside
eight tribes/200 face-hair cases, native controls and SQLite persistence.
The single runtime passes INTRO and map loading, then finds a HUD priority
overflow before character initialization. That overflow is fixed and the final
build passes 303 MainUI checks, world gameplay and all 4,173 inventory hashes.
The corrected client was not launched again; rendered world/NPC acceptance is
pending. See [report](MANDARA_NAVIGATION_NPC_INTRO.md) and
[tracked proof](../../evidence/mandara-closure-verification.json).

## Earlier camera/saved-roster validation

The staged executable SHA-256 is
`056717541de6833edc785137dabfbed0442bdc16dfb18d75340a51fcc2c913b0`.
The native whole-model TMB bounds now drive INTRO face/hair and main-game camera
height. One isolated offline session using the existing saved roster reaches
Mandara and exits normally; face/hair captures, the height probe and all 4,171
manifested files pass. Normal saves remain unchanged. The historical exit was
not reproduced. Caught failures now retain their reason across launches.
See [camera/exit report](../fixes/INTRO_CAMERA_AND_SELECTION_EXIT.md) and
[tracked proof](../../evidence/saved-roster-camera-verification.json).

## Earlier controls/death validation

Release build and one isolated offline Mandara SDL process completed. Seventeen
captures cover original targeting, real combat death, the native death message,
forbidden keyboard revival, mouse OK, saved-point recovery (10/50 HP, 6/30 TP),
Z walking, MainUI and inventory/equipment movement. The world gameplay probe
and 130-check MainUI probe pass. All 4,171 final files/imports/icon payload verify.
The harness had a post-run SQLite cleanup error; the connection-close bug was
fixed and evidence recovered without another client process. Normal saves were
not written during the isolated QA session. No other channels were run.

That checkpoint executable SHA-256:
`b39f4b0256bf11f8ed51f7ecd9f14611aed46b1fafe3c0363f8bc4e5cc2cf739`.
The completed runtime used `da180c638a77f17bff11f5a6f04d390f1f5981d9c185b5baac7cbe4c11729788`.
The only later gameplay change reuses native `htPercent` for original rounding
on odd recovery totals; it was rebuilt/staged without another runtime attempt.
[Tracked proof](../../evidence/native-controls-verification.json) and
`build-ogre-sdl/native-controls-runtime/VERIFIED.json`.

## Earlier six-area validation (previous executable)

- [x] Release client, authority, renderer and dependency-closure targets build.
- [x] Six focused checks pass: configuration, MainUI, native camera startup,
  SQLite persistence/ownership, authored-bind skinning, and
  movement/population/items/combat/time lifecycle (including actor asset binding).
- [x] Bind successful normal SDL world walking, camera follow and item/equipment
  captures to the final executable hash on routes 1/18/19.
- [x] Six audio-enabled runtime scenarios pass, including full-village rejection,
  deletion and empty-roster restart; 64 captures and five process restarts.
- [x] Verify 4,171 final runtime files, x64 imports, original layout and icon payload;
  normal SQLite and saved-ID hashes remain unchanged.
- [ ] Complete the broader native parity and gameplay acceptance work listed above.

Final executable SHA-256:
`b5bf9490d2e427f6e27048ebb9012b17a98841c92a17998561eb039111b68899`.
Runtime proof: `_remake/build-ogre-sdl/gameplay-acceptance-final/VERIFIED.json`.
Tracked [verification summary and capture hashes](../../evidence/offline-gameplay-verification.json).
Focused tests include CPU combat death/respawn/revival; the normal SDL scenarios
exercise walking and equipment, not complete rendered combat acceptance.
No full regression suite, Debug, relocation or prolonged play was rerun here.
