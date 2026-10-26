# ZFLauncher bgfx progress and continuation

Updated: 2026-10-26. Status: **runnable offline development client; full plan incomplete**.

## Latest Mandara actions, FX and audio checkpoint

Native Mandara TML now binds 55 day/night FX instances through model, billboard,
particle and sample nodes, with global fxPC resource fallbacks, graph/socket
attachment transforms and explicit missing-resource diagnostics. Portals, altar,
water and the original target indicators have independent on/off/restored captures
in `mandara-fx-verified`; all four views restore exactly. Their visible differences
are 251568,46129,23611,51917 pixels. Terrain markers retain UVs and sample every
subdivided vertex against the terrain/TCC floor rather than intersecting slopes.

The skill window and quick slots now cast supported learned active skills instead
of always returning unavailable. Native ready/cast/activate bindings, source TAB
impact, HP/TP costs, cooldown, damage equations and represented self effects are
connected. `mandara-skill-verified` uses real SDL key1 for skill3124: two native
animation clips, six FX geometry submissions, TP110 ->104 and a rendered impact.
Eight source tribe fixtures pass pre-impact/no-double-impact authority checks.

New attack commands replace old ground destinations immediately. Monsters use
collision-checked offline A* chase routes and face the live player while attacking.
`mandara-actions-final-combat` accepts two PC/two monster impacts, six glyphs and
ten sound requests; original player/monster WAV playback succeeds. Philippine
TantraParam English names remain the default. The original client interpolates
movement received from server authority; the offline pathfinder checks both the
server TCM and client TCC. Full original AI/leash/patrol behaviour remains open.

Chakra main/bonus fields already followed the original calculation. Added tests
now spend each of the four stats through the channel, decode actual UI frames,
inspect durable records, reopen the store and log in/CHAR_INIT again. All increases
survive. The plus field means effective minus base, not accumulated spent points.
The accepted Chakra button also starts the original upgrade FX1010003.

`HTMapInfo` selects Mandara field30007 versus safe30008. Both MP3 streams start in
separate runtime profiles (`mandara-actions-final-combat`, `mandara-actions-town-sky`).
The map's 20 TMS regions select overlapping day/night ambience; source fading and
owned loop cleanup are connected. The town run also accepts ten sky/cloud/fog/
celestial states without changing saved profiles.

Debug/Release builds pass. `mandara-actions-debug-shell` accepts100 frames,
resize/minimise/restore and three renderer restarts. Release is restaged with
16 owned files; `mandara-actions-package-verified` and
`mandara-actions-source-preservation` retain379 source/nine input/six repair hashes.
Release SHA256: `7e57fc6b39d10bff56a1e1318dbbc5d4b26cddecfe6fb406b4638d66aa20c08f`.

Six focused CPU checks and14 Python checks pass. A separate closed-store/fresh-login
Chakra check passes. Runtime captures were viewed. Full skill/FX and visual parity
remain incomplete: specialised/item-cost casts, projectile/follow/state lifecycles,
NPC idle FX, mode3/trails/lights/jitter, full UV/billboard and apron matrices remain
tracked. Skill3124 references absent canonical FX1000386; all three client copies
have identical fxPC bytes. Two unused Mandara catalogue names also lack matching
graphs. These gaps remain visible, with no replacement assets or INTRO TMB search.

## Completed

- [x] Keep the phased [implementation plan](IMPLEMENTATION_PLAN.md) in place.
- [x] Capture 379 reused source/tool hashes, original commit/dirty patch and nine canonical input hashes.
- [x] Pin bgfx/bx/bimg/build wrapper/SDL3/SQLite and build C++20/x64 Debug and Release.
- [x] Implement the bgfx backend, shader pipeline, native resources/UI, CPU skinning, sockets and conservative culling.
- [x] Seed a separate profile without modifying source saves; committed WAL recovery occurs only in a private snapshot.
- [x] Switch the dedicated runtime to `_client_bgfx`; stage only bgfx-owned files and preserve the original `_client`.
- [x] Run original offline login/roster/INTRO, create/select/delete, CHAR_INIT/Mandara and minimum controls through real SDL input.
- [x] Accept the C06 minimum service/combat gate, including paid repair/reload, failure/cancellation cases and source death/revival.
- [x] Verify eight tribe previews, full-roster/duplicate rejection and corrected creation retry.
- [x] Preserve authored deformed normals and verify the directional shadow depth/pixel path independently.
- [x] Port the implemented OGRE atmosphere/material/fog adapters and selected native intro FX/audio.
- [x] Apply ordinary melee damage at the authored TAB attack key, synchronize the rendered attack pose, and present native damage/miss digits, hit flash and sounds.
- [x] Accept SDL movement retarget without restarting the walk/run phase, and repeat the native services/full-record reload checks.
- [x] Connect native weapon-ready stand/walk/run states and safe-cell sheathing; accept sword movement and combat in disposable offline profiles.
- [x] Add Mandara's source sublight/character spotlight and a separate daylight reference preset; verify held-pose light/presentation pixels and unchanged opaque UI colours.
- [x] Correct terrain section addressing, retain native 10-mip detail with 16x world filtering, and match OGRE's creature-only modulative shadow scope.
- [x] Correct textured world material overrides, replace the washed-out reference curve, add a complete sky backdrop and improve local character shadow precision.

## Visual correction after the 07:22 screenshot, 2026-10-26

The earlier technical checks did not establish an acceptable visual match. The
current pass compares `_remake` directly and runs the existing OGRE client in a
disposable profile (`build/evidence/ogre-current-visual-reference`). Its executable,
normal saves and protected files remain unchanged. Terrain HPK/map CFG hashes
match both clients and canonical TantraClient.

BGFX was multiplying textured scenery by the TMB diffuse RGB as well as the map
material. Source grass examples use about0.588 for each channel. OGRE's textured
world shader uses the albedo/map material directly; BGFX now matches that override,
brightening foliage/rocks/buildings. Untextured fallback colours remain authored.
`visual-material-source-evidence.json` records source names/values/hashes.

The old terrain gamma2.2/warm tint is removed. Reference presentation now uses
linear gain2, gamma1, neutral tint and no separate grass grade. This retains more
ground contrast; native ungraded presentation is still available. A separate
camera-centred spherical backdrop reaches the source sky's high colour band,
while original clouds retain their geometry/masks and time/scroll rules.
The 2048 shadow map now uses a .45 half-span, .1–4 depth range and .00002/.00006
constant/slope bias, increasing useful local precision for creature silhouettes.

Accepted `visual-material-sky-verified` contains four day/night views and exact
restoration after detail, shadows, lights, grass and backdrop diagnostics.
Five sky elevation samples match authored RGB within0.402; 1,170 horizon samples
are covered. All16 sections bind10-mip detail; all3,087 shared borders match.
Detail changes462,883 world pixels; shadows change2,004 and only darken. The same
empty ground region's luma deviation rises from5.84 to9.77, with source/UI/profile
preservation checked independently. Captures were viewed; exact stock visual
parity remains open. The first backdrop probe failed camera restoration and is
retained separately; the accepted probe restores the exact original camera.

`visual-material-sky-environment` verifies ten authored states, 578,916 changed
cloud pixels and77,830/82,177 fog changes matching the authored RGB mix.
Six CPU checks and14 Python tests pass. Debug/Release builds and three Debug
renderer restarts pass. `visual-material-sky-final-builds`,
`visual-material-sky-final-package` and `visual-material-sky-source-preservation`
verify hashes,16 staged owned files and379 reused source/nine canonical/six repair
references. Final Release is staged in `_client_bgfx`; normal/source saves and
the original OGRE installation are preserved. Full animation/FX parity and
moving-camera shadow tuning remain unfinished.

## Terrain seams and HIGH quality, 2026-10-26

Historical technical checkpoint; the appearance and preset are superseded above.

HIGH was already active (`spec=3 rtshadow=1 far=3500`), with the same source
profile/LOD defaults and private CFG precedence as OGRE. The renderer now clamps
terrain section images while repeating native `detail.dds` separately. Original
height/normal/topology and detail scale/multiplication remain intact. All 10
detail mips are retained; world sampling uses 16x anisotropy on startup/reset.

BGFX previously included terrain/scenery in its depth pass and allowed character
self-projection. It now follows OGRE's represented creature shadow path:
creatures/attachments cast onto opaque world receivers, with a 2048 PCF depth map
and 50 percent modulation after grading. Terrain/scenery do not cast; characters,
alpha foliage, UI and FX do not receive that projection. Premultiplied world
textures also retain their correct alpha through reference grading and fog.

Accepted `build/evidence/terrain-high-first` checks the actual section meshes:
3,087 duplicate border samples have identical position/normal/detail coordinates.
All 16 sections bind 10-mip detail. Matched GPU comparisons show 460,571 world
pixels affected by detail and 4,136 by creature shadows; shadows only darken.
Detail/shadow/grass restoration is pixel-exact, including unchanged opaque UI.
The grass-hidden capture is diagnostic only; normal grass stays enabled.

`terrain-high-environment` verifies ten atmosphere phases, 505,747 changed cloud
pixels and 80,173/83,845 changed fog pixels matching authored RGB interpolation.
`terrain-high-cpu-corrected.log` passes six checks; `terrain-high-python.log`
passes 14. The initial CPU failure was a legacy test expecting a native DLL in
the new client; it now reads canonical `TantraClient/HT3DHeaven.dll` explicitly.
No native DLL was staged. The initial QA compile error was fixed before staging.

Both builds pass, with three Debug renderer restarts in `terrain-high-debug-shell`.
Release is staged in `_client_bgfx`; `terrain-high-final-builds`,
`terrain-high-final-package` and `terrain-high-source-preservation` record build,
16-owned-file package and 379-source/nine-input/six-reference preservation checks.
Default/source saves stayed unchanged. Full camera/motion shadow tuning, all
original quality controls and exact original screenshot parity remain open.

## Mandara reference lighting, 2026-10-26

Historical preset; the gamma/tint/grass settings below are superseded above.

The two user-provided Kathana screenshots now guide a separate reference
presentation preset. The native map supplies sun/moon, sublight rotation and
ambient/diffuse time colours, plus the character-following spotlight. The map's
grass-placement flag now survives the TML-to-scene adapter. A terrain/grass grade
then lifts the dark ground toward the reference look: exposure1.1, gamma2.2,
warm tint `(1,.94,.86)`, grass blend.5. Characters, buildings, sky, UI and FX do
not receive that grade; fog retains its authored RGB blend after grading.

Offline Mandara starts at noon and continues the native cycle. Native timestamp
start remains available with `--offline-world-time native`; native material
presentation remains available with `--world-look native`. These are display
settings; authority timestamps, assets and default saves were not rewritten.
The preset is an artistic reference match, not a completed linear/sRGB pipeline
or exact original-renderer parity claim.

`build/evidence/mandara-lighting-verified` contains four views at noon/night and
held-pose comparisons. Pixel checks passed: sublight146397, character-light1576,
ground-presentation202418 changed pixels; 2729 opaque HP/TP pixels and stone/sky
sample regions were unchanged by grading. Restoring lights/presentation exactly
restores every pixel. Original references are hashed in
`mandara-reference-inputs.json`. The initial baseline and subsequent tuning
captures remain separate, preserving their original process/build records.

`mandara-lighting-regression-cpu.log` passes the source light/clock conformance,
grass-flag/gameplay and Mandara route/service CTests. Python fixture/profile/text
checks remain separate from GPU evidence. Source sublight colours are checked
at seven phases; spotlight range/offset/angles/RGB and invalid phase rejection
are checked independently.

Final Debug and Release builds passed; `mandara-lighting-debug-shell` passed
resize/minimize/restore and three renderer reinitializations. The final Python
suite passed all 14 tests (`mandara-lighting-final-python.log`). Release is staged
in `_client_bgfx`; `mandara-lighting-final-package` verifies all 16 owned files,
and `mandara-lighting-source-preservation` verifies 379 reused source files,
nine canonical inputs and six repair references. Both isolated runtime results
confirm protected files and default/source profiles stayed unchanged. Build and
shader hashes are in `mandara-lighting-final-builds`.

Mandara FX remain incomplete: static inventory found 32 authored field effects
and native monster-effect/skill managers. Basic hit feedback and environmental
presentation run; the screenshot's active skill/aura effects and general native
TFX dispatch remain open. Full specular/emissive, original-camera/asset visual
parity and complete animation combinations remain open too. Missing INTRO TMBs
remain intentionally skipped without replacement searches.

## Weapon animation continuation, 2026-10-26

Authority and presentation now share typed native weapon attack selection.
Locomotion uses the weapon's PCAttackAni stand/walk/run states in hostile cells,
and generic states with the authored sheath socket in safe cells. Reattaching
the weapon preserves the body and animation clock. Secondary claw models and
native dual-dagger type916 selection are represented; complete weapon gameplay
and missing-socket parity remain open.

Accepted evidence under `build/evidence`:

- `weapon-sword-town`: sword4001 on `BWeapon01`, native generic stand/run/walk,
  collision-checked SDL movement and retarget without animation phase restart.
- `weapon-sword-field`: sword on `RightHand`, native weapon states806/814/810,
  ordinary SDL run/walk and retained phase on retarget.
- `weapon-sword-combat`: attack type901, two PC/two monster native hit markers,
  sword audio, native damage feedback, defeat/reward and persistence.
- `weapon-stance-native-reload`: full prior native character/cargo restoration,
  no mutation of those records, source seed or default saves.
- `weapon-bindings-final-cpu.log`: 12 weapon types/eight tribes, 288 attack
  variants, 129 distinct TAB files and 88 available sheath-socket combinations;
  separate dual type916 and invalid-item checks. The test reports source asset
  limitations rather than treating all weapon/body combinations as legal.
- `weapon-stance-regression-cpu.log`: ten rebuilt resource/socket/skin/blend/
  clock/navigation/gameplay/normal/combat checks passed. `weapon-stance-python.log`:
  14 Python tests passed, including both new controlled weapon fixtures.
- `weapon-stance-final-builds`, `weapon-stance-final-package`,
  `weapon-stance-source-preservation`, `weapon-stance-debug-shell`: Debug/Release,
  16 owned staged Release files, original reference hashes and three Debug
  renderer restarts passed. Runtime captures were visually inspected.

Initial matrix assertions incorrectly assumed every supplied body exposed every
legacy sheath socket. The observed exceptions remain explicit: four requested
sheath socket names are absent on some bodies; dagger handling also requests
`HWeapon01` and `LeftSSW`. A missing requested stance socket produces a bounded
diagnostic and retains the authored Item socket. No replacement model or socket
alias is invented. Runtime acceptance here covers sword4001; the matrix is CPU
binding/resource evidence, not full visual/legal-equipment acceptance.

## OGRE foundation migration accepted, 2026-10-26

The active migration checklist in `IMPLEMENTATION_PLAN.md` is checked. This
covers implemented OGRE foundations and the requested ordinary combat timing;
the complete plan and original OGRE feature gaps remain open.

The staged Release client uses three source PC attack variants and scales their
duration to the native ordinary attack period. Authority waits for the TAB
`attack` annotation before damage/reward mutation; the GPU pose crosses that
same key within one simulation frame. Repeated attacks restart, HP revisions do
not restart a monster's swing, and killing hits cancel pending corpse strikes.
Native ETC digit/miss/success textures, colour families, bounce/critical motion,
hit flashes and PC/monster sounds now accompany those events. Full skill TFX,
projectiles, block feedback and all weapon/skill combinations remain open.

New evidence under `build/evidence`:

- `ogre-port-final-melee`: four player/seven monster impacts, 13 native glyphs,
  23 sound requests with actual playback diagnostics, rewards and persistence.
- `ogre-native-combat-death`: native death pose/zero HP/dialog, cancellation,
  ordinary confirmation and persisted saved-cell revival.
- `ogre-native-retarget`: SDL ground clicks, collision checks, orbit/reset,
  inventory toggles and retained walk/run animation phase after retarget.
- `ogre-native-services`, `ogre-native-services-reload`: skill/quick-slot UI,
  warehouse/save controls, preserved item instances and money, separate full
  character/cargo reload with unchanged source/default profiles.
- `ogre-native-environment-entry-gate`: ten sky phases, two cloud layers,
  1,216 night stars, sun/moon, flare occlusion/offscreen rejection, horizon and
  fog transitions. Cloud scrolling changed 503,370 pixels; 75,725/77,803 changed
  fog pixels matched the authored fog RGB blend. Exact original star RNG remains
  unproven; the adapter preserves the existing OGRE seed/placement algorithm.
- `ogre-port-final-intro-fx-music`: four source fire/smoke emitters, native GPU
  corner/UV/colour/blend/depth data, loop/release/recreate checks, two spatial
  gate voices and original streamed music with native gain/loop requests.
- `ogre-port-original-assets-fx`: original HPK mesh, bounded metadata-bound TFX
  textured sample and uncached TAB loading. General TFX semantics remain open.
- `ogre-port-final-builds`, `ogre-port-debug-shell`, `ogre-port-final-package`,
  `ogre-port-source-preservation`: Debug/Release, three renderer restart cycles,
  final Release package of 16 owned files, and unchanged 379 original files,
  nine inputs and six repair source references.
- `ogre-port-final-cpu.log`, `ogre-port-normals-cpu.log`: 14 selected CTests;
  `ogre-port-fixtures-corrected-python.log`: 14 Python tests; all passed.

The first environment attempt was rejected before entering the scene by an
inherited QA guard. It now permits the saved-entry environment scenario; the
rejected output remains. The initial fixture test expected 50 HP, while the
source-created fixture has 52 before entry recalculation. Only its assertion
was corrected. Earlier attempts to run unbuilt playback probes were not test
passes; rebuilding the targets produced the successful CPU evidence above.

## Evidence

Evidence below is local under ignored `build/evidence`; source, tools and the
dependency lock remain reviewable. Runtime evidence pins its executable hash;
newer source does not retroactively change the scope of an earlier pass.

| Scope | Evidence | Result |
| --- | --- | --- |
| Baseline | `c00-baseline-inputs/RESULT.json` | 379 original files and nine native/runtime inputs unchanged; dependency pins verified |
| Shell/build | `c01-shell`, `c01-builds` | D3D11 shell, resize/minimize/restore, clean shutdown; Debug/Release artifacts |
| Original asset | `c02-assets` | HPK model and native textures; overlapping UI; capture inspected |
| CPU readers/pose | `c02-resources`, `c03-profile-pose` | Catalog/material/profile/HPK and native bind/clock/creation/record tests passed |
| Saved preview | `c03-roster-backbuffer` | ashesh login, copied roster, triangle-picked actor; actual GPU capture inspected |
| Roster lifecycle | `c03-roster-lifecycle-guarded` | Cancel preview, reject unallocated Chakra, create/select, cancel deletion, reject empty proof, delete; SQLite original character rows identical |
| World entry | `c04-entry-actor-catalog` | Source CHAR_INIT, map 40001, 524288 terrain triangles and 6503 placements; native HUD and actors visible |
| Controls | `c05-controls` | Inventory I toggle, right-drag orbit, Insert reset; native ground click moved from [5162.5,6602.5] to [5202.45,6602.52] |
| CPU navigation/gameplay | `c05-navigation-cpu`, `c06-gameplay-schema4` | Camera/source controls, offline gameplay, deterministic probability and schema4 persistence passed |
| Actual basic encounter | `c06-basic-combat` | Real E/R input, approach, attack, monster2001 defeated; HP10 to6, Prana604 to704; decoded native SQLite record matches final HP/Prana/cell |
| Profile rejection | `c03-profile-isolation` | Normal profile and unsupported renderer rejected before a window/database write |
| Dedicated client cleanup | `client-bgfx-cleanup` | 18 copied runtime/diagnostic files removed, 12484910 bytes; all dedicated assets/saves and original `_client` unchanged |
| Dedicated builds/package | `c01-dedicated-builds`, `c08-dedicated-package` | Latest Debug/Release build hashes and shaders; staged imports/owned files verified; no OGRE/SDL3 DLL imports |
| Dedicated native client | `c05-controls-dedicated-client` | Login/Mandara, inventory, orbit/reset and movement passed with `_client_bgfx`; native before/after snapshots and protected hashes retained |
| Dedicated CPU/guards | `dedicated-client-cpu.log`, `c03-profile-isolation-dedicated`, `c00-dedicated-source-preservation` | 15 selected CTests; both legacy profile destinations rejected; 379 source/nine input hashes preserved |
| Culling/profile safety | `zf_frustum` CTest; `tests/test_profiles.py` | 16 conservative-frustum cases and five seed/WAL/refusal tests passed |
| Warehouse/save | `c06-saved-services-hud-picking` | Real native NPC clicks and ground routes; item0 to cargo119 to inventory20 without changing instance fields; deposit250/withdraw100; cargo revision2 to6; save/current cell [486,173] |
| Service reload | `c06-services-reload` | Separate login/process from the saved result; complete native character and cargo payloads restored byte-for-byte; decoded native state unchanged |
| Service CPU/safety | `c06-services-cpu`; `tests/test_native_inspection.py` | Four CTests including native NPC price/repair/stale/range/dead/capacity checks; nine Python safety cases including immutable Unicode inspection and legacy no-cargo schema |
| Merchant/native repair eligibility | `c06-merchant-native-eligibility` | Actual Vartan route and quantity/buy/sell confirmations; item4002 costs225 and sells37; money99647 to99459; ineligible potion and unneeded full-durability weapon repair both rejected without charge |
| Merchant reload | `c06-merchant-reload` | Separate login restores full character/cargo bytes; inventories, cargo and other character records preserve the verified result |
| Final C06 build/package/source | `c06-complete-builds`, `c06-complete-package`, `c06-complete-source-preservation` | Latest Debug/Release builds and staged imports verified; 379 original files, nine initial inputs and six repair-source inputs unchanged |
| Paid repair and failures | `c06-paid-repair`, `c06-no-money`, `c06-full-inventory` | Paid native starter repair 0 to 4500 for 15 Rupiah; money/capacity rejection, both prompt cancellations, ineligible repair and complete native inventory/cargo checks passed |
| Paid-repair reload | `c06-paid-repair-reload` | Separate process restored complete repaired character/cargo bytes and preserved the source/default profiles |
| Native player death/revival | `c06-death` | Actual hostile damage from HP1 opened death UI; keyboard bypasses rejected; mouse revival restored saved cell and native HP10/TP6; SQLite matched |
| Eight tribe previews | `c03-eight-previews-complete` | All eight source previews, face/hair changes and cancellation; saved character rows unchanged |
| Roster boundaries/retry | `c03-roster-boundaries` | Full roster, delete cancellation, empty proof and duplicate rejection; corrected retry filled slot 2 without changing slots 0/1 |
| Authored normals | `zf_normal_transforms`, `proceed-cpu.log` | Affine inverse-transpose tests and actual Tiger/Asura submeshes at four poses; eight previews rendered the authored normals |
| Directional shadows | `c07-directional-shadows-final` | 2048 depth map; player casting removed 1356 triangles and changed 2635 pixels; restoration reproduced original pixels exactly |
| Shadow profile options | `c07-shadow-profile-options` | Player casting/pixels remained reversible; disabled render profile submitted no depth geometry; enabling restored the original caster count |
| Renderer lifetime | `c08-renderer-reinitialization` | Resize/minimize/restore and three shutdown/reinitialize/submission cycles; empty scene/resource counters after each restart; repeated shutdown harmless |
| Settled death presentation | `c06-death-presentation` | Source-selected death animation completed once and held its final pose, native HP label reached zero, and revival HP/TP and saved cell persisted |
| Frame measurements | `c08-idle-frame-sample` | 240 frames at 1024x768: median 9.4455ms, p95 10.6836ms, p99 11.4916 ms; valid GPU median 2.22758ms; unchanged frame-stat quad had no geometry uploads |
| Current build/package/source | `proceed-accepted-builds`, `proceed-accepted-package`, `proceed-accepted-source-preservation` | Debug/Release, four shaders and 14 owned staged files verified; all pinned original inputs unchanged |
| Current CPU/safety | `proceed-cpu.log`, `proceed-python-verified.log` | 17 selected CTests and 11 Python tests passed |
| Native actor facing | `c05-facing-english-native-pick`; `zf_native_facing` | Real left/right ground movement and heading alignment; independent cardinal/diagonal matrix checks; corrected running captures inspected |
| Intro facing | `c03-intro-native-facing` | Copied-roster login; intro gate tigers face inward after the native-to-bx yaw conversion; capture inspected |
| English display/names | `c06-english-monster-target`; `zf_philippine_english` | Philippine columns supply 7651 name/description/message fields; readable Vasabhum target and overhead labels; native death/revival retained |
| Facing/text checks | `facing-english-verified-cpu.log`, `facing-english-python.log` | Six rebuilt focused CTests and 14 Python tests passed |
| Facing/text package | `facing-english-builds`, `facing-english-package`, `facing-english-source-preservation`, `facing-english-source-inputs.json` | Debug/Release and 16 owned staged files verified; original binary assets/saves and both source XML inputs unchanged |

Runtime before/after hashes passed for the accepted runs. The first
`c03-roster-lifecycle` attempt passed UI assertions but failed preservation: normal
OGRE database/UI files and its diagnostic log changed concurrently. It is retained
as a failed acceptance attempt; no normal profile was restored or overwritten.
The runner now checks launchers before/during each attempt and terminates only its
own process on interference. The guarded run passed both preservation and exact
character-row restoration. The original module source hashes remain unchanged.

Historical runtime rows above used `_client` before the user's explicit change
to `_client_bgfx`. Their immutable evidence is retained with its original paths.
Current build/preset/staging/runtime defaults use `_client_bgfx`; its copied
`userdata/zflauncher` is preserved. Cleanup removed OGRE/HTLauncher/plugins,
the dynamic SDL3 DLL (ZFLauncher embeds SDL3), obsolete OGRE manifests and copied
logs/dumps. Required Visual C++ DLLs remain. Source-decoded native profile
inspection uses `bgfx_profile_probe` with read-only closed SQLite data, rejects
pending WAL and emits no credential verifiers.

The first `c06-saved-services` runtime stopped at the warehouse click: the original
probe chose an NPC triangle below the native bottom HUD. It performed no warehouse
transaction. The accepted run requires the closest intended actor, a HUD-free
point and bounded ordinary camera adjustments. Picking now excludes hidden,
unbound, inactive-LOD and depth-clipped geometry. Both attempts are retained.

Native inspection now uses SQLite `immutable=1` and URI-escaped Unicode paths:
ordinary `READONLY` can still change WAL shared memory. Database and companion
hashes/mtimes are verified in regression fixtures. Legacy profiles without cargo
are inspected without schema mutation; migration remains authority-owned.

`c06-merchant-services` exposed missing native repair eligibility: the old path
accepted the first occupied slot, a consumable. Its old assertions passed but
the run is superseded in `REVIEW.json` and is not current repair acceptance.
The offline authority now enforces the native NPC item-family restrictions and
documented zone exceptions from `HTNPCControl.cpp:5531-5563`, with source hashes in
`docs/evidence/repair-source.json`. The corrected run explicitly rejects the
consumable, preserves its durability/count and charges nothing for the already-full
weapon. Paid repair subsequently passed both runtime and separate full-record
reload as recorded above. No normal/default profile was used for transactions.

The same source audit added `HTItemSystem.cpp:3726-3748` displayed-durability
rounding. A recorded weapon at4410/4500 still displays45/45 and must be rejected
as unneeded repair. That case now has an authority regression check; the profile
was inspected from existing evidence, not edited to create a damaged-item test.
`c06-merchant-final` verifies the staged rounding build with the same successful
buy/sell and repair-rejection assertions. `c06-final-cpu.log` records16 passing
selected CTests; `c06-repair-rounding-cpu` retests the four affected gameplay cases
after the rounding fix, and `c06-python-safety.log` records nine passing safety tests.

The C06 minimum gate is now accepted. Controlled QA fixtures are explicitly
generated as new profiles under `build/evidence`, with source-created characters
and recorded money/durability/HP/position controls. They never edit an imported
checkpoint or default profile. Merchant scenarios compare complete native item
fields, account cargo and other characters, and verify native table prices.
Stale/range/dead/invalid requests remain covered by the authority CPU cases.
The broader skill/AI/combat feedback requirements remain open.

The first eight-preview attempt rendered all tribes but hit the original
single-character frame budget during the final camera transition. The corrected
budget passed; both attempts are retained. The first shadow assertion compared
total caster counts across moving-actor frames and failed. The accepted probe
redraws on/off/restored at dt=0 in one callback, with both geometry and reversible
pixel checks. Alpha-aware shadow shaders, 3x3 depth comparisons, slope bias,
edge fade and texel snapping are implemented; broad quality parity remains open.
The existing render-profile shadow switch now controls the pass. Shutdown
invalidates every uniform/shader/depth/framebuffer handle and clears scene,
lighting and resource caches before reuse. The three shell restart cycles do
not close full world/device-loss/focus/DPI recovery acceptance.

`c06-death` originally captured the dialog immediately after damage, before the
native pose and queued HUD notification settled. `c06-death-presentation` waits
for the source-selected finite death animation to finish, verifies the held pose
and zero HP label, then confirms revival through ordinary native UI. Its captures
were visually inspected. This does not accept the broader impact/audio/FX matrix.

Frame-stat textures now reuse their quad and resource counters are sampled once
per second or invalidated on ownership-count changes. Authored deformation and
world normals use inverse-transpose matrices. CPU skinning remains. The idle
sample used the NVIDIA GPU (PCI 4318/10401; RTX4050 Laptop), i7-12650H, about 32GB
RAM, native scene and 2048 shadow depth. The earlier instrumented sample overlapped
a Debug build and is excluded from the idle baseline. Short stationary samples
do not accept sustained 60 FPS, startup/stall budgets or matched OGRE quality.
The runner now separately hashes the default bgfx profile before/after isolated
runtime checks, including controlled fixtures.

## Still open

The facing fix changes the renderer boundary rather than gameplay directions:
native positive yaw sends authored +Z toward `(sin(yaw),0,cos(yaw))`, while bx's
SRT helper requires the opposite Y angle. Picking, sockets, normals and shadows
consume the corrected object matrix. World names use source height anchors and
yellow NPC/white basic player/monster text. Text bitmaps are cached/reused and
ordered behind MainUI; speech, conditional name colours and full occlusion remain
outside this accepted name slice. The old stationary timing evidence predates it.

English text is derived from `GenesisK3-XMLs/TantraParam.xml` and
`GenesisK3-XMLs/XMLS-XLS/HTMessage.xml`, defaulting to Philippine column headers.
The generated table preserves worksheet/ID/field identities, UTF-8, blank English
cells and authored placeholders. Native binary IDs/parameters and source files
remain untouched. The first facing probe captured both corrected run directions
but failed on its town seed's hostile-only E target selection; the accepted probe
uses normal triangle picking of a visible actor. The failed attempt is retained.

- [ ] Complete remaining appearance/equipment/LOD and repeated transition matrices; eight tribe previews and roster boundary/retry checks passed.
- [ ] Broaden inventory/service combinations beyond the accepted C06 minimum; paid repair/reload, money/capacity failures and prompt cancellations passed.
- [ ] Broaden encounter coverage to all weapon/skill/FX combinations; source-timed ordinary melee, native hit feedback and actual death/revival now have separate CPU/runtime evidence.
- [ ] Broaden blocked/narrow navigation, camera zoom/obstruction, quick-slot/layout reload and UI/tooltip acceptance.
- [ ] Tune shadows through foliage/camera/movement matrices; retain exact sky parity, other zones, water/weather and full TFX semantics beyond the accepted OGRE atmosphere/intro subset.
- [ ] Implement GPU skinning; authored deformed normals and nonuniform world transforms now have CPU/runtime evidence.
- [ ] Add generation-aware asynchronous loading/cancellation, immutable GPU world buffers, pooling and performance/recovery gates.
- [ ] Validate clean-machine/relocation/dependency closure, full DPI/focus/device-loss behavior and release packaging.
- [ ] Complete the plan's C09 systems; online/server work remains paused and unchanged.
- [ ] Finish authenticated remote checkout/submodule/worktree administration, and commit/push only when requested.

## Next continuation

1. Broaden zoom/obstruction, layout reload, tooltips and route/weapon combinations. SDL retarget phase continuity and blocked/detour CPU routes now pass; missing authored collision remains a parity limit.
2. Extend combat skill/weapon hit events and native FX families with source-backed lifetimes/attachments; ordinary melee, selected intro emitters/audio and OGRE atmosphere now have independent bgfx acceptance. Continue matched shadow/foliage views.
3. Use the recorded baseline to prioritize spatial batching, immutable buffers, GPU skinning and responsive loading; then perform repeated lifecycle/recovery and relocation checks. Full performance/release gates remain open.

Known source gap: Mandara's `r01_common_cart01.bmp` is absent from the canonical
client. The renderer reports it and uses the same authored untextured material as
the OGRE baseline. Other unexpected missing materials fail. Missing authored `.tbo`
collision remains a parity limit; geometric navigation is a bounded fallback.
Current diagnostics also retain the two unstaged INTRO placements referencing
`in_Str_stone_main_01.tmb`, generator 447's occupied-cell placement rejection and
monster 2718's missing ClientRes entry. Those warnings are not completed content.
Per the user's instruction, missing INTRO TMBs are intentionally skipped. Leave
them absent; do not search for replacements or treat them as a repair task.

These are development slices, not visual/performance parity or production
completion. No 60 FPS or whole-repository test pass is claimed. No server process,
commit or push was performed.
