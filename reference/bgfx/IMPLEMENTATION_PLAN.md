# ZFLauncher bgfx offline implementation plan and progress

Updated: 2026-10-27. Target: C++20, Windows x64, SDL3, bgfx/D3D11 and SQLite.
Owned workspace: `C:\_GitHub\TantraSrc\_remake_bgfx`.
Primary reuse baseline: `C:\_GitHub\TantraSrc\_remake`.
Dedicated final client: `C:\_GitHub\TantraSrc\_client_bgfx`.

The first major target is **testable offline coverage comparable to the current
OGRE remake's implemented foundations**. Build a separate `ZFLauncher.exe` with
the `Tantra Online` window/product title, using the same client assets and
**ashesh / ashesh** login. Keep `_client/HTLauncher.exe` available for comparison.

**Implementation is in progress.** ZFLauncher now builds and runs the original
offline login, saved character preview, character lifecycle, CHAR_INIT/Mandara and
minimum controls through bgfx/D3D11. The user's dedicated runtime is now
`_client_bgfx`; `_client` remains the original OGRE client. The complete plan remains
open; the broader gates below deliberately retain their unverified requirements.
The server goal remains paused. No commit/push or submodule registration was made.

## Current continuation: native data, skills, navigation and runtime verification

The next work is ordered below. A passing slice does not close the full plan.

1. **Native client parameters.**
   - [x] Read `system/TantraParam.tpa` directly in memory. Generate pointer-free field offsets from `Tantra/HTlauncher/HTClientParamMgr.h`; validate complete stream closure and retain padding/unknown record bytes.
   - [x] Support the source item272 layout and this client's item276 layout with an opaque four-byte tail. Accept native Portal ID0, preserve first duplicate records and reject truncated/oversized/malformed inputs without replacing a valid catalog.
   - [x] Bind TPA to the runtime resource catalog. Prefer Philippine English names/descriptions, then native TPA text, then existing resource names. Require the TPA for normal INTRO startup; do not extract HPKs or create temporary TFX files.
   - [x] Compare every identically named numeric field in shared item, monster, PC-skill and monster-skill records against the existing offline imports. Keep server-only imports outside the client and preserve their authority.
   - [x] Debug/Release builds, focused reader/catalog tests, actual INTRO roster/flat-circle and skill3124 runtime regression, staged Release and package validation.
   - [ ] Resolve client/import version differences before treating them as one gameplay dataset. The comparison reports 470 Item,655 PCSkill,17 Monster and1 MonsterSkill differing values; imports also contain IDs/levels absent from the client. Do not silently overwrite either source. The item tail remains uninterpreted.
2. **Complete skill and weapon FX.**
   - [x] Decode active-skill State separately from Impact, preserve native once/loop/energy rules, attach state FX to the caster and bound their lifetime to the committed skill duration and live native effect slots. Skill3110 has an actual transaction/render/expiry regression.
   - [x] Keep committed buff FX attached when the same player's equipment rebuilds its display object. Transfer exact parent references without resetting graph age, expiry, geometry or audio, and without recasting or charging TP. Reject an absent replacement atomically; ordinary death, missing-owner and scene cleanup remain active. Release/Debug renderer checks and88 actual-SDL checks cover real3110 cast, equip, unequip and Escape (`buff-owner-render1`, `buff-owner-render-debug1`, `buff-owner-sdl2`).
   - [x] Compile native instant MagicShield/EnhancedMagicShield/break cases and both absorption functions from CMob2. Preserve nearest rounding, physical/elemental lane order, pierce bypass, TP-derived enhanced energy and strict exhaustion flags. Verify real3102 levels1..10, real3145 authority, effect ticking, equipment retention and fresh-entry reset. Skill3145's canonical fxPC link is missing; record and skip that presentation without inventing a binding.
   - [x] Keep type24 shields out of continuous State FX. Trigger level1 State once on incoming melee hits/misses and on ranged visual arrival, matching HTMainCharacter; retain equipment ownership, finite lifetime and death/scene cleanup. Actual SDL3102 cast/equip/unequip/Escape passes88 checks; original3110 buff regression also passes88. Final Release/Debug shield suites each pass2,555 checks, including two GPU cases and captures isolating only shield geometry. Source CastSkill's DealDamage guard now preserves3059's one-shot bonus through defensive3022 and consumes it on damaging3007.
   - [x] Commit ordinary attacks through the live native status session using the equipped item's skill type, combat phases, effects and costs. Run source CalDamage/CastInstant1 at the melee marker or ordinary projectile arrival; consume real3059's next-attack bonus once, including a native miss. Validation, rejected costs/death and Escape before commit retain the bonus; released arrows still commit after Escape. Twelve supplied weapon payloads and twelve bare-hand/sword/bow timing/cancellation encounters pass, plus an authored elite miss; normal costs and RNG are unchanged.
   - [x] Match the pinned native engine's first attack annotation policy. Cache the first attack/Attack substring before the final timestamp, rather than rejecting duplicate tags or applying damage for each tag. MON_Srbinda_ATK1 now resolves key18 at .805051 seconds and ignores adjacent key19, matching the engine loader and one-shot state query. The Tiger marker,36 PC attack clips and no-marker rejection remain verified. Native special multiple-strike services are separate and still open.
   - [x] Cancel the pending action through the authenticated channel with Escape. Clear transient cast FX without charging a pre-commit cast; retain committed buff state. Remove skill FX on death, missing parent and scene clear; reset selection/monster FX ownership when distance-culling removes an actor.
   - [x] Resolve refinement-material nibbles from native TPA, apply levels1..10 brightness .50..95 and native fire/ice/lightning/poison textures to attached weapon ribbons. Verify88 refinement cases,288 animation bindings and five actual GPU ribbon cases, including cancel/sheathe/hide/destroy cleanup.
   - [x] Launch supported ordinary bow/dart and action3/5/6 projectile paths at the native TAB attack marker. Use source straight/piercing speeds, extensions and pursuit equations; commit damage and native HP/TP/item costs on arrival. Equipped arrows and active inventory costs follow the native one-arrow/five-stack rules atomically.
   - [x] Render native arrow7091 and bound follow/impact graphs with full native U/V/N orientation, world depth testing and flight-owned cleanup. Keep released shots after ordinary Escape; discard shots after caster death, target generation replacement or scene/population reset. Preserve level1..5/6..8/9..10 FX variants.
   - [x] Verify authoritative hit timing for all12 supplied weapon types at .001/.05-second ticks, plus native3301 straight,3306 pursuit and3162 bow pursuit:27 positive-damage encounters and five lifecycle cases. Melee commits at the source marker; projectile cases keep HP/TP/arrows unchanged until arrival. This matrix does not cover every skill or synthesized dual-wield combination.
   - [x] Select native body/hair/front-apron/back-apron clips together for movement, attacks, INTRO selection/idle and action/active skill phases. Use source head-type hair mappings, attack-variant apron fields and skill triplets; normalise each live clip to the action duration and retain source looping during cast. Preserve selected clips/clocks during model replacement; retain valid zero-duration socket clips.
   - [x] Audit7,024 native animation sets /889 decoded clips, including312 attack sets and6,376 skill-phase sets. Verify424 GPU playback sets,1,651 body/socket clock checks,56 hair changes,8 head replacements and8 equipment replacements. Native name-bound loading accepts8 exercised skill cases with differing mesh/track counts while retaining hierarchy, bind/influence and root validation. The one missing PCAni31159 reference is recorded and skipped.
   - [x] Implement the native default monster melee/ranged branch: rounded native-cell distance, body radius, already-loaded skill ranges and idSkill0/idSkill1 selection. Lock the chosen skill/TAB at windup, use the MONSkill animation (ATK1 only when its binding is zero), and carry the actual skill into activation/impact FX. Monsters2004/2005 pass eight fine/coarse melee/ranged encounters and three Release GPU cases (`monster-ranged-render-final3`); native misses and subsequent positive hits are both checked at the TAB marker. Ranged follow1200065/impact1200067 render visibly and clear on death, generation/owner loss and scene teardown; equipment replacement retains incoming flights. Native HP/hit digits occur at the marker, with no second damage at visual arrival. The separate special-skill pattern scheduler, timed states and remaining families stay open.
   - [ ] Complete all available projectile/follow FX and remaining attached/area/monster state families. Four real GPU projectile cases render follow/impact geometry and hit digits. Missing authored assets are recorded and skipped per the user's instruction; retain the historical failed3162 full-FX result without treating that asset gap as an implementation blocker. Extend beyond3110 and3102 energy/per-hit coverage (3145 authority passes but its FX link is absent); unsupported native node/skill-service cases remain open.
   - [ ] Extend authoritative animation/impact/damage timing to every supported weapon/skill combination and remaining strike phases. The27 encounters and288 binding checks cover distinct bounded matrices.
3. **Stress-test navigation.**
   - [x] Exercise32 static Mandara cases: four real altar stair routes, the market and ruined-wall single-cell passages, and house/temple-column detours, each walking/running at .016/.2-second ticks. Record actual accepted movement steps and floor heights; check both native grids and actor clearance at .5-unit subdivisions.
   - [x] Exercise8 dynamic cases: monster corner chase and moving-player replanning, immediate ground-to-attack retarget and a second-monster retarget at both tick rates. Preserve native actor parameters; document private QA actor repositioning. Verify arrival, current target, facing during attack and native attack state.
   - [x] Verify actual SDL surface clicks, movement-animation phase retention and E/R attack preemption. The old clicked destination remains38.7861 units away when R replaces it; the selected target's native attack animation starts. Use isolated profiles and preserve default/seed/protected data.
4. **Persistence and transitions.**
   - [x] Verify Interface.sys, quick slots, equipped render attachments and independent music/effects settings over six fresh authenticated processes sharing one private profile: native SDL Restart request, same-character relogin, another character, village18, village19 and return to village1. Preserve native unknown fields and character isolation. Evidence: `persistence-runtime3`.
   - [x] Restore the saved vertical/horizontal quickbar flag and number/function-key mode on world entry. Preserve explicit client/runtime/profile/log roots in the production Restart command; verify Windows argument decoding, including quoting and trailing backslashes. Debug/Release option/menu/restart CPU checks pass.
   - [ ] Extend transitions when distinct client-art maps and in-game portal travel are implemented. Current server zones1/18/19 all bind clientMap40001; this matrix does not claim other maps or actual OS ShellExecute child spawning (the harness launches the exact emitted Restart command).
5. **Crowded scenes and loading.**
   - [x] Establish the pre-optimisation CPU/GPU baseline in native town, the densest collision-checked authored actor neighbourhood and real skill/combat scenes. Run two sequential fresh processes per scene,120 warmup frames and1,200 measured frames each; record raw frame/loading CSVs, hardware, executable/source/input hashes, retained actor/FX counts, pose/upload work and captures. Evidence: `world-profile-matrix1`.
   - [x] Separate simulation, UI/audio/equipment, actor requests, status/camera, FX/names/combat, pose deformation, animation/socket traversal, world/UI submission and frame-call wait. Preserve delayed bgfx timings as overlapping measurements; missing GPU timings remain empty rather than zero.
   - [x] Measure native loading calls, first playable frame, initial nearby actor/FX presentation and settled populated frame. Prioritise animation/pose work, unchanged UI work, then scene submission; use measured loading stalls to plan worker decode/upload budgets. Do not implement or claim optimisation gains before comparison against this baseline.

### Controlled profiling baseline (2026-10-26)

The original `world-profile-matrix1` predates the socket-animation correction.
Retain each cohort's executable/source hashes; correctness changes are separate
baselines, not isolated optimisation comparisons.

The current monster default-attack build has a separately accepted baseline:
`build/evidence/monster-ranged-profile1` (Release SHA256
`871a8eac3242c7334fe67a3f6dbfd1bd8a2c3392bf20e943c2d6a4bc5ca05788`).
Six sequential trials /7,200 measured frames pass, with all delayed GPU samples
valid and protected/default data unchanged. Settings and scenes retain the
existing i7-12650H/RTX4050,1024x768 HIGH,D3D11,2048-shadow,VSync-off baseline.

| Monster default-attack build | Frame median ms | Frame p95 ms | Frame p99 ms | GPU median ms | Settled populated load ms |
| --- | ---: | ---: | ---: | ---: | ---: |
| Town4 actors |6.55–6.68|7.60–7.88|8.34–8.71|1.53–1.54|1677–1727|
| Dense field43 actors |9.67–9.87|10.98–11.16|12.03–12.29|1.49–1.67|2084–2114|
| Skill/combat40 actors |9.14–9.25|13.01|18.20–18.59|1.20–1.33|2000–2029|

Worst intervals are11.99/18.31/73.02ms respectively. Dense pose work is4.10–4.16ms
inside5.29–5.42ms animation traversal; initial dense actor creation stalls370–380ms.
No builds or competing QA overlapped this run. OS file cache remains uncontrolled;
actor counts are retained population, not all in the camera frustum. Preserve raw
CSV/loading stages and timing-overlap caveats. No optimisation gain is inferred.

The earlier socket-animation correction also has its own accepted baseline:
`build/evidence/socket-animation-profile1` (Release SHA256
`43a9aeb41bf40781f2f76442e699736eaf7adc2d32363e90481bde37bffbdaaa`).
All six trials /7,200 measured frames pass with the same hardware, settings and
scene definitions. Native skill3124 runs through the body/socket animation API.

| Corrected animation build | Frame median ms | Frame p95 ms | Frame p99 ms | GPU median ms | Settled populated load ms |
| --- | ---: | ---: | ---: | ---: | ---: |
| Town4 actors |6.56–6.82|7.62–8.21|8.46–11.50|1.56–1.59|1748–1764|
| Dense field43 actors |10.07–10.28|11.37–13.70|12.34–15.57|1.68–1.69|2082–2207|
| Skill/combat40 actors |9.21–9.51|12.64–13.01|17.50–18.58|1.34–1.60|2017–2097|

Worst intervals are20.56/26.29/72.06ms respectively. Dense pose work is4.23–4.25ms
inside5.57ms animation traversal; initial dense actor creation stalls388–398ms.
These figures belong to the socket-animation executable; the newer monster
default-attack cohort above is current. The older table is historical evidence
of the earlier build; animation correctness changed and no
speedup or regression isolation is inferred from comparing those two cohorts.

`tools/profile-world.py --output build/evidence/NEW_DIRECTORY` uses two trials by
default, fresh disposable profiles and ordinary SDL selection/skill/attack keys.
Normal play leaves timing scopes disabled. The field fixture chooses a valid
cell with43 native actors within400 units from the actual1,718-actor population;
it clones no actors. Combat uses a separate native encounter with40 retained
actors, so its difference from the dense idle scene is not an isolated FX cost.

Release,1024x768, native HIGH settings,2048 shadow map, D3D11, VSync not requested;
Intel i7-12650H and RTX4050 Laptop GPU (actual selected vendor4318/device10401).
Ranges below are the two trial results, in milliseconds. Each trial records1,200
valid delayed GPU samples; asynchronous GPU values can repeat across frames.

| Scene | Retained actors | Frame median | Frame p95 | Frame p99 | Pose median | GPU median | Settled populated load |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Town idle |4|6.52–6.56|7.50–7.53|8.26–8.35|0.97–0.98|1.52–1.55|1659–1709|
| Dense field idle |43|9.68–9.73|10.83–10.92|11.68–11.97|4.12|1.45–1.64|2049–2081|
| Field skill/combat |40|9.05–9.20|12.50–12.56|18.78–18.90|3.25–3.28|1.22–1.25|1991–2024|

Worst measured frame intervals: town12.11ms, dense field18.74ms, combat69.32ms.
Each combat trial records a damaging3124 skill and six positive-damage impacts.
Dense pose work updates27,891 vertices /1,198KiB per frame; total animation/socket
traversal is5.32–5.35ms, containing4.12ms pose work. UI/audio/equipment is about
1.8ms, world submission1.14–1.15ms. These observations support prioritising CPU
pose/deformation work (with palette/normal/socket parity gates), then dirty UI
updates and traversal. GPU skinning benefit is an inference to test, not an
implemented optimisation or measured speedup. Static batching/immutable buffers
remain open; these results do not justify reducing native quality.

Full map decode stalls282–302ms, objects/environment/sky creation253–264ms,
authority initialisation requests238–246ms, population initialisation308–319ms,
and initial dense actor presentation365–370ms. Native control/render readiness
precedes that last population stall; both timestamps are recorded separately.
Budgeted resource creation is a loading priority. The separate terrain decode is
only about7–10ms here; do not attribute the entire full-map call to duplicate
terrain work without finer evidence.

Raw CSVs, summaries, captures, `HARDWARE.json`, `INPUTS.json` and integrity
results live under `build/evidence/world-profile-matrix1`. Trials did not overlap
builds or other QA started by the runner. OS file caches were uncontrolled and
fixture generation reads the same map, so these are fresh-process/profile loads,
not disk-cold measurements. Retained actors/FX are instantiated owners, not all
visible in the camera. Texture/object buffer figures are partial estimates, not
total VRAM. Wall intervals include the previous frame's QA/SDL overhead; current
application scopes are sampled before buffered CSV output. Pose work is nested
inside animation timing; application work contains the stage scopes, while bgfx
CPU/GPU timers overlap and refer to delayed frames. No online-crowd, every-map,
hardware-independent FPS target or full performance gate is accepted.

Navigation evidence: `build/evidence/navigation-ctest-Release` and
`navigation-ctest-Debug` each contain the32-case static result,8-case dynamic
result and actual movement traces. Native source anchors are altar309,
display1123, house353, temple column301 and ruined stair/wall6156. Stair ranges
are20.1..32.0635 native units; the current TCC floor remains quantized, with a
maximum observed6.86349-unit height step. The tests prove authoritative movement
and floor selection, not smooth visual interpolation or absent TBO geometry.
CPU checks pass in both configurations. `navigation-input-runtime1` proves the
ordinary SDL route/attack behavior and exits0. Planning microseconds are
diagnostic stress-run timings, not a controlled performance baseline.

The optional movement observer records accepted player/monster steps and is
unset in ordinary play. It changes no movement/damage arithmetic. Native source
references: `HTMainCharacterMove.cpp:42,65`, `HTMapSystem.cpp:765,1532`,
`HTMainCharacter.cpp:2172` and `zone/CMOB.CPP:8821`. The offline router remains a
bounded A* adapter over the client TCC plus the selected atomic server zone
dataset; this checkpoint does not claim the entire native AI scheduler or every
zone. Initial fixture-classification/assertion mistakes are retained under
`navigation-static1` / `navigation-dynamic1`; accepted evidence uses the final
CTest directories and SDL runtime result.

## Default hotkeys and chat commands (user addition,2026-10-26)

- [x] Inspect native key-down/continuous input, UI focus/Tab/Enter, camera,
  quick-slot and chat-command dispatch before implementing the missing controls.
  Sources: `HTInterfaceCheck.cpp:1034,1284,1320,1534,1589`,
  `HTInterface.cpp:8700`, `HTWindowManager.cpp:380`, `HTChatting.cpp`,
  `HTQuickSlot.cpp`, `HTCamera.cpp` and `HTMainCharacterMove.cpp`.
- [x] Complete menu keys L/I/U/K/Esc/C/G/J/H/B/N/Tab/M and Print Screen, using
  native windows/options, names and speech-bubble behavior.
- [x] Complete main-keyboard -/+ page cycling, Shift+1..5 page selection and
  slots1..0, retaining the source's saved number/function-key mode.
- [x] Complete W forward, A/D turning, Left/Right camera orbit, Z run/walk,
  X sit, F12 view mode, Insert/middle-wheel reset, F11 source camera preset
  behavior, numpad zoom, E enemy/T colleague selection, R attack, F pickup and
  held Alt item highlighting, with native focus/death/action restrictions.
- [x] Complete Enter chat focus, V reply and the requested /all,/s,/whisper,/w,
  /party,/ashram,/addfriend,/ashrampost and /trade command dispatch/validation.
  Keep offline authority distinct from any future online transport.
- [x] Verify every listed binding and alias through CPU input tests and actual
  SDL UI/gameplay/chat regressions, including typing without accidental actions,
  key release/focus loss, rejected targets and persistence where native.

Source distinctions: OEM0xBD/0xBB (main -/+) cycle quickbar pages; numpad
VK_SUBTRACT/VK_ADD control camera distance. A/D turn the character while the
arrow keys orbit the camera. The user's duplicate + zoom entries must not collapse
these distinct bindings. F11's supplied-source branch is guarded by
`g_bGoAttackCamera` and reads authored camera presets; retain that provenance
instead of inventing a meaning for its label. The user explicitly chose to
preserve this optional broadcast-camera behavior. Existing L/I/U/K/O/C and a subset
of quickbar/E/R/Z/Insert behavior do not close this complete hotkey addition.

Accepted hotkey evidence: `hotkeys-runtime4` passes63 actual-SDL assertions,
including native menu graphs, both cropped/full Mandara minimaps from the existing
TerrainTex HPK, Ctrl/edit-focus isolation, Alt+W, focus loss, F12, inactive default
F11 and native BMP capture on Print Screen release. Captures live in the external
profile's `ScreenShot` folder, preserving the clean client. `hotkeys-loot-runtime3`
earns actual native drops, shows readable white Alt labels, walks beyond pickup
range, routes back with F and persists100000→100011 Rupiah. It also verifies2
player and2 monster source-timed impacts,6 hit glyphs and10 sound requests.
`hotkeys-retarget-regression2` retains movement animation phase and preempts an
old ground goal38.7878 units away with actual E/R input.

Release/Debug CPU input/menu/keyboard gates pass, including the native keyboard
speed multiplier12 (15*.8), integer walking speed, per-update .1-radian turns,
route replacement, cell collision, release and authentication; optional native
broadcast preset loading/cycling has a separate CPU fixture. Final builds are
`hotkeys-final-release-build4.log` / `hotkeys-final-debug-build3.log`; Release is
staged in `hotkeys-stage4`. Failed earlier test attempts remain retained:
`hotkeys-loot-runtime1` issued movement before the native swing completed;
`hotkeys-retarget-regression1` used an occluded projected test destination beside
a statue. The corrected tests wait for the native action lock and select an
actual collision-checked surface ray; production collision/attack locks remain.

Offline scope: T has no other PC to select in the solo authority. Chat commands
dispatch to that authenticated authority and show missing-recipient/party/Ashram/
trade failures; no online peer, friend database or guild service is simulated.
V uses the last actually received whisper, empty until one exists. Native chat
window declarations and typing are implemented; additional chat-window styles,
network services and complete map-overlay markers remain separate parity work.

## Monster FX phase correction (2026-10-26)

User instruction: **record missing resources and move on**. Keep missing PC FX
1000386, skill3162 activation1000646/7/8 and monster skill41290 impact1200101 in
this existing plan. Skip absent resources, retain diagnostics, and continue the
available implementation. Do not search further or invent replacements for them.

- [x] Decode `HTResTableMONSkill` by named native fields. Activation is DWORD2
  and impact is DWORD4; the old dispatcher incorrectly used follow DWORD3 and
  persistent-state DWORD5. Keep those phases distinct for future ranged/state
  work. Ordinary monster impacts now bind at the event's authoritative position.
- [x] Preserve exact FX-name matches and add ASCII case-insensitive lookup,
  consistent with native `CHTString::HT_iStringCompare` (`_tcsicmp`). The supplied
  `dadati_Fire` binding now resolves to the existing `dadati_fire` graph without
  editing or extracting client assets.
- [x] Audit all36 Mandara monster skill rows,45 nonzero phase links and13 unique
  FX IDs in Release/Debug. After the name fix,44 phase links resolve. Keep the
  complete-family result false: skill41290 references missing binding1200101 in
  both the current and supplied Global reference client's Mandara tables.
- [x] Verify actual Vasabhum2001 / skill41004 impact1200007 on the player at a
  native damage event. `monster-impact-runtime2` presents40 vertices /60 indices
  with depth test on and depth write off, exits0 and preserves protected/default/
  seed files. The existing native impact/audio/Prana/trail/F-pickup gates pass.

Evidence: `monster-skill-bindings-Release` / `monster-skill-bindings-Debug`,
`monster-fx-case-cpu-release1.log`, `monster-fx-bindings-debug1.log`,
`monster-fx-reference-audit1.json`, `monster-impact-runtime2`,
`monster-fx-case-release-build1.log`, `monster-fx-final-debug-build1.log` and
`monster-fx-stage2`. This closes the phase/lookup bugs; it does not close all
monster skill selection, ranged/area/buff families or the earlier missing
PC-skill3162 activation1000646.

TPA evidence: `build/evidence/native-tpa-imports2/TPA_IMPORT_COMPARISON.json` and production-reader dump; Release/Debug build logs `native-tpa-*build*.log`; `native-tpa-roster1` and `native-tpa-skill1` runtime results; `native-tpa-package1`. The current plaintext TPA closes at895334 bytes:623 monsters,501 monster skills,1106 levelled PC-skill records,1664 items,291 NPCs,114 portals,520 quests and49 area indicators. Input TPA/import hashes remain unchanged. Encrypted/other undocumented TPA layouts are unsupported and fail explicitly.

Skill/trail evidence: `build/evidence/elemental-trails-render2` has actual vertex/texture/depth/cleanup results and held-pose pixel comparisons for the plain ribbon and four elements; `skill-state-render3` verifies native3110 costs/state,180-second visual/native-effect expiry, pre-commit cancellation, removal snapshots, death/owner/scene cleanup and2479 changed pixels when state is removed. `skill-state-final-render1` repeats the state lifecycle on the final production implementation; `skill-state-escape-skill1` verifies actual SDL key1/Escape cancellation and successful recast. INTRO/Mandara regressions are `skill-state-intro-regression1` and `skill-state-final-mandara1`; package closure is `skill-state-final-package1`. CPU Debug/Release logs are `skill-state-cpu-*`. Source references: `HTItemSystem.cpp:3424,3457,4118`, `HTEngineHandler.cpp:12518`, `HTFXResMgr.h:362` and `HTMainCharacter.cpp:2968`. Presentation intentionally corrects the old poison-to-fire getter typo using the engine's existing poison texture; gameplay/refinement arithmetic is unchanged. Ribbon endpoints still use the existing weapon-mesh extent adapter rather than claiming the closed engine's exact endpoint algorithm.

Projectile evidence: `build/evidence/projectile-reference-encounters-release1.log`
and `projectile-ctest/PROJECTILE_PIPELINE_RESULT.json` record the CPU encounter
matrix; `projectile-orientation-render1/PROJECTILE_PIPELINE_RESULT.json` records
27 simulation cases, five lifecycle checks and four GPU cases, with
`simulation_passed:true`, `unresolved_fx:1`, `passed:false`. The unresolved row
is1000646, not a waived check. `projectile-reference-render1` retains the earlier
arrow-orientation capture; final rigid-arrow/follow orientation follows
`HTAttackManager.cpp:535` U=flight, V=(Y cross U) cross U, N=Y cross U.
Native request/cost timing is grounded in `HTAttackManager.cpp:642` and
`zone/CMob3.cpp:1080,6244,6264`. Pure flight, atomic item-cost and level-variant
checks have separate CPU tests. Source pursuit starts at deterministic lift1
within the native randomized range; swept XZ collision avoids coarse-tick
tunnelling. These are bounded adapters, not full native combat/TFX parity.

Final Debug/Release build logs are `projectile-orientation-*build1.log`; five
focused CPU tests pass in both configurations, with the corrected orientation
probe repeated after rebuilding. Release is staged (`projectile-stage1`). Actual
SDL3124/Escape/recast, saved INTRO and Mandara FX/occlusion/UV regressions pass in
`projectile-skill-regression1`, `projectile-intro-regression1` and
`projectile-mandara-regression1`, preserving default/seed/protected profiles.
Package layout/dependency validation passes in `projectile-package1`.
The broader five-part goal, full FX acceptance and clean-machine release remain
open; no commit/push was performed at this checkpoint.

## INTRO selection ground circle (2026-10-26)

- [x] Inspect native INTRO_CHOOSE01 (1400016): billboard node2 is authored as upright mode1; nodes3/4 are separate particle emitters.
- [x] Present only node2 as a horizontal XZ circle, following the selected actor's root/yaw, with 0.3 native-unit clearance above the platform. Preserve texture UVs, colour/size curves and the two particle layers. Keep world depth testing and no depth writes.
- [x] Verify actual uploaded vertices have constant Y and remain horizontal after a 40-degree camera orbit. Use an isolated copy of the existing roster; original/default profiles and client resources remain unchanged.
- [x] Build Release/Debug, stage Release and validate the package. Evidence: `build/evidence/intro-selection-ground-runtime1/INTRO_SELECTION_GROUND_RESULT.json`, original/orbit captures, build logs and `intro-selection-ground-package`.

## Client-only layout cleanup (2026-10-26)

- [x] Audit the existing native resource categories, supplied `dev-docs/ClientTree.md`, and native UI save/load paths before cleanup.
- [x] Preserve 103 support/profile files outside the client. Both legacy and active SQLite logical states match their originals; backups and the migration ledger are in `.migration-local/`.
- [x] Keep the launcher, required Visual C++ DLLs and native client resources/configuration in `_client_bgfx`. Put shaders, English import, offline/server tables, dependency notices, manifests and logs in this project's `runtime/`; normal saves use this project's `userdata/zflauncher`.
- [x] Put `Start-Offline.cmd` in `_client_bgfx`, as requested. Repeated staging no longer creates support, profile or log folders inside the client.
- [x] Reuse `_client_bgfx/resource/UI/Interface.sys` for normal window/options persistence, including independent effects/music volume. Preserve unknown fields and extra window positions. Explicit QA uses isolated copies; native controls no longer require ClientOptions.ini.
- [x] Keep native `MainUISave.sys` (legacy v2004), `MainUIInfo.sys` and `Interface.sys` (active v2005). MainUISave has no active load/save call in the checked source.
- [x] Clear 2,507 archive-redundant loose payloads, including the user-removed bitmap alias verified by content hash, while preserving all 148 HPKs. Relocate 77 non-runtime extraction indexes/cache records. Retain the three SourceSafe metadata files listed in the default tree, per the user's default-file clarification.
- [x] Honor the final archive policy: do not extract/recreate files merely because a default tree lists a loose copy. ENVTEX payloads remain in ENVTEX.hpk; extraction CSVs are unnecessary.
- [x] Route TAB animation loading through NativeResourceIO, alongside meshes, textures, UI and samples. Post-cleanup Mandara FX/occlusion, roster, INTRO audio/FX, recovery/persistence and combat/trail/Prana checks pass with duplicate files absent.
- [x] Finish empty-folder removal after Sublime Text released its handle. The strict package check rejects remake support/profile/log directories and non-default extraction metadata inside the client.
- [x] Rebuild Debug/Release; pass five focused CPU checks, 14 Python checks, source/dependency preservation, profile rejection guards and the runtime checks above.

Evidence: `build/evidence/CLEAN_CLIENT_NATIVE_INTEGRITY.json` records 6,178 initially inventoried files, 2,507 redundant loose payloads cleared, 77 non-runtime metadata files relocated and 3,594 retained files (excluding ZFLauncher.exe). All retained bytes match the starting inventory; no native payload was lost and all 148 HPKs remain. `CLIENT_PROFILE_RELOCATION.json` proves both database states were preserved. `CLIENT_TREE_COMPARISON.json` records native/version differences against the supplied default tree; the tree does not override the user's instruction to read HPKs without extraction. Runtime evidence is under `build/evidence/clean-layout-*`, with final package closure under `default-client-tree-*`; the active executable hash is in `runtime/package-manifest.json`.

The existing `system/TantraParam.tpa` remains a native client file and is now read directly by the client resource catalog. The offline authority still reads imported parameter/stat tables outside the client; client/server data-version differences are reported separately above. ClientRes/HTMessage/FX TXLs remain direct native inputs.


## Active visual, options and native gameplay continuation (2026-10-26 11:43+)

User scope remains cumulative. Keep the accepted fire/torch appearance and
Env_Water01 falling-sheet orientation/flow. The newer15:48/15:49 references refine
the altar brightness and fountain foam, as recorded below.

- [x] Correct altar orientation/brightness against the supplied15:48 references: white core and bright horizontal streaks. Preserve world depth occlusion and native geometry/motion.
- [x] Refine Env_Water01 against the15:49 reference: retain its blue falling sheet and animated basin surfaces, with stronger white foam at impact. Keep native height/flow and fire/torch settings intact.
- [ ] Complete golden Chakra beam, green sparkles and violet base visual acceptance across the broader progression matrix; represented snapshots already have runtime evidence.
- [ ] Functional and persisted Options controls, especially independent live effects/music volume, using miniaudio.
- [ ] Separate player HP/TP/level and target name/HP/level HUD windows matching the supplied references.
- [ ] Cap creature shadow length at the reference scale for player, monsters and NPCs.
- [ ] Improve INTRO sky and interior ambient light; continue skipping missing INTRO TMBs.
- [ ] Pin, build and validate miniaudio for music, 2D samples and spatial samples, including mute/unmute.
- [ ] Source-verified character-select names, equipped/unarmed selection attack and return to idle; selection FX.
- [ ] Increase gameplay zoom-out distance, retain collision and disable VSync by default.
- [ ] Verify/complete native per-map CFG day/night timing and the normal runtime default.
- [ ] Source-authoritative HP/TP recovery cadence, state restrictions, clamps and saved/UI updates.
- [ ] Source-backed Prana reward presentation on monster defeat.
- [ ] Source-backed weapon trails, attachment endpoints, action windows and lifecycle.
- [ ] Build Debug/Release, run focused CPU and actual UI/GPU/audio regressions, restage Release and update these checkboxes with evidence.

Latest altar/fountain evidence (2026-10-26):
`build/evidence/altar-water-reference-runtime2` captures each close-up at the same
held state with previous intensity, adjusted intensity, FX off and restored.
The altar uses RGB gain3 for its core and2.2 for its streak models; the fountain
uses gain3 only on its existing foam emitter. Other field/skill layers keep gain1.
This uses the existing unlit floating-point tint, avoiding vertex-byte clamping;
it is a reference presentation adjustment, not a change to native assets or
gameplay. Exposure changes76004 altar pixels and2845 fountain pixels; restored
views match exactly. All three altar and four fountain visual layers retain
depth testing without depth writes. Real-wall occlusion still changes0 pixels.

The first run retained a shutdown access violation: `clear()` passed a map-key
reference into `stop()`, which compared it after erasing the key. Cache identities
are now captured before erasure. The corrected runtime exits0 and preserves
default/seed/protected data. Debug/Release build logs are
`altar-water-reference-*build2.log`; CPU native field bindings and cleanup pass.
The optional `native_world_fx_probe --inspect-water` audit measures basin water
at37 and rendered stone floor at33.6494, so no speculative height offset is
applied. Final staging/package checks are `altar-water-stage2` and
`altar-water-package1`; broader FX/goal acceptance remains open.
The separate `altar-water-skill-regression1` also passes actual skill3124,
Escape cancellation/recast and a second clean world shutdown.

## FX presentation corrections after the 10:10 screenshot review

- [x] Resolve the native >9999 position sentinel from the rendered target height;
  retain floating model chevrons and the distinct yellow selection/red attack
  graphs (1010011 /1010031). Actor death/deselection removes the indicator.
- [x] Conform ground-plane billboard layers without flattening the animated
  chevrons. Stop the ground marker when movement stops or attack/cast takes over.
  Root-attached progression/skill rings also fit the native terrain/TCC floor.
- [x] Apply the native attached-model parent-yaw correction, independent FX scale
  and transformed fixed-billboard axes. The accepted fountain side capture shows
  Env_Water01 falling into its basin; restore its authored V texture motion.
- [x] Animate model texture U/V independently of TAB skinning, including the
  portal's opposite +1/-1 U rates. Assign texture overrides by material slot;
  do not deduplicate slots by texture name or repeat the last override forever.
- [x] Composite alpha smoke before emissive flames/sparks. Preserve the separately
  verified particle blend path; use premultiplied alpha for model/billboard FX to
  avoid multiplying their premultiplied colour by alpha again.
- [x] Observe committed world snapshots for Chakra/level increases (1010003) and
  learned/upgraded skills (1010002). Initial loading and unchanged snapshots do
  not replay upgrades. Existing allocation validation and persistence remain in
  the authoritative offline channel.
- [x] Show native dropped-item targeting (1010021) on hovered loot and remove it
  after pickup/removal or pointer departure. Restrict picking to actual loot
  owners; correct the inherited OGRE-name comparison for bgfx object names.
- [x] Extend the real Mandara GPU scenario with separate arrow/ring height checks,
  native attack colour, item ring/chevrons, model UV deltas, progression dispatch,
  torch blend families and held-pose on/off pixel checks. Snapshot presentation
  fixtures do not award levels or modify the saved character.

Accepted evidence: `build/evidence/fx-parity-runtime3`. The four field views
restore exactly; portal animation changes174354 pixels. Target/ground, attack,
item, level-up, Chakra, skill-up and torch captures change7024,716,971,194049,
194035,81553 and49407 pixels respectively. Behind a real opaque house wall the
FX still changes0 pixels; the depth-off control changes7744 pixels. Portal U
rates advance +.125/-.125 and waterfall V advances -.125 over .125 seconds.

Debug and Release builds, four focused CPU and14 Python checks pass.
`fx-parity-intro-regression` accepts native INTRO fire/sound/music;
`fx-parity-skill-regression` accepts real skill3124 UI/key, two animation clips,
six FX geometry submissions and TP110 ->104. `fx-parity-combat-regression`
accepts a real monster attack marker, two player/two monster impacts, six damage
glyphs and ten sound requests. Package16-file closure and379 source/nine input/
six repair preservation checks pass. Release is staged in
`_client_bgfx/ZFLauncher.exe`, SHA256:
`7cc5fdede8d2b66970f8f34006b69fe8442ca26be13ac71ea3d518352a59615d`.

These checks cover the requested presentation corrections, not complete native
TFX/skill/FX-family parity. Wider open gates and canonical missing FX1000386
remain open. Original assets, OGRE source and default profiles are preserved;
missing INTRO TMBs continue to be skipped without searching or substitution.

### Active OGRE implementation migration

Current requested continuation (2026-10-26, all items require source and runtime
evidence; earlier graphics checks do not close these):

- [ ] Mandara portal, altar and every authored field-effect binding, including lifecycle, placement and required native FX node families.
- [ ] Native skill UI interactions, learned/active skills, cast/action/attack animation phases, impact timing and attached/projectile/area skill FX.
- [x] Terrain-conforming ground-click indicator, without terrain clipping.
- [x] Chakra allocation display/persistence verified against original status semantics and an independent reload.
- [x] Attack orders immediately replace an existing ground route; moving targets update the approach route.
- [ ] Explain and compare original player/monster navigation with offline routing; close represented collision/chase defects.
- [x] Selected-target arrow, Philippine English TantraParam monster names, attack facing and both actor/player attack audio.
- [x] Native per-map/per-area/day-night music and ambience selection; verify safety versus authored sound-space rules.
- [x] Sky appearance regression, normal Mandara integration, Debug/Release and preserved original assets/profiles.

The user requested all already-implemented OGRE foundations in bgfx, explicitly
including combat animation, movement routing, FX, UI, names and the damage hit
frame. This is implementation work, not a transfer of OGRE acceptance results.

- [x] Compare current `_remake/src` directly: 286 non-OGRE source files already
  match, no non-OGRE source files are absent, and 20 differ for documented bgfx
  fixes/adapters. Retain the bgfx repair, profile, authored-normal, facing and
  Philippine English changes rather than overwriting them with OGRE versions.
- [x] Complete the implemented renderer adapters: CFG material/fog behavior,
  source sky/horizon/clouds/stars/sun/moon/flares, bounded TFX sample support,
  animation loading and hidden/LOD visual-work suppression.
- [x] Accept combat animation selection and authoritative damage at the TAB
  `attack` marker, including repeat actions, death/cancellation and rendered
  impact feedback. Native `HTMainCharacter.cpp:731-747` and
  `HTMonster.cpp:207-214` consume the engine attack-animation event; no guessed
  midpoint is an acceptable replacement.
- [x] Verify routes, retargeting, collision and source movement/camera behavior
  through ordinary SDL input; retain the missing authored TBO limitation.
- [x] Verify inherited MainUI, inventory/services, status/quick slots and names;
  preserve native IDs/authority and the Philippine English display defaults.
- [x] Verify the selected implemented FX/audio families, native timing and
  cleanup; unsupported native families stay explicit in C09.
- [x] Build Debug/Release, stage only owned `_client_bgfx` files and run isolated
  bgfx acceptance with default/source profile and canonical input preservation.

### World FX occlusion correction after the 09:36 screenshot

- [x] Separate world-FX depth testing from terrain conformance. Every model,
  billboard and particle submitted by NativeWorldFx tests scene depth; blended
  effects retain depth writes off, native colour/blend and the FX draw pass.
- [x] Refresh texture, depth and blend state when a cached FX mesh is updated,
  rather than retaining its creation-time flags.
- [x] Keep the separately verified native INTRO particle preset and UI/sky paths
  unchanged; the bounded OGRE INTRO implementation was not a general Mandara
  world-occlusion reference.
- [x] Accept a held-pose GPU occlusion regression against the rendered native
  house `World/Object/327` / `r01_Stru_man_house1_01.tmb`. Behind the wall, FX
  changes0 pixels; disabling depth reproduces7744 leaking pixels. Re-enabling
  depth on the same cached buffers restores0 differences. In front, alpha and
  additive FX each change9604 pixels, and switching cached blend changes9604.

`build/evidence/world-fx-depth-runtime1` contains the wall, hidden, depth-off,
restored and front captures plus `FX_OCCLUSION_STATE.json` and
`FIELD_FX_PIXELS.json`. All four representative field views still show FX and
restore exactly: portal1400017=217736, altar1400023=7898, portal1400009=10105,
water1400011=11419 changed pixels. Earlier on/off/restored captures did not test
building occlusion and missed the depth-state defect; this check now runs as
part of the `mandara-fx` scenario acceptance.

Four focused CPU and14 Python checks pass. `world-fx-depth-intro-regression`
retains native INTRO fire/audio/music acceptance; `world-fx-depth-skill-regression`
retains real skill3124 UI/key/animation/FX/TP acceptance. Debug/Release build,
100-frame Debug smoke with three renderer reinitialisations, package16-file
closure and379 source/nine input/six repair preservation checks pass.
Release is restaged in `_client_bgfx`; SHA256:
`4ae0c26f76a316c497755443a455aa956becaf3d122f5d5d4154d2b8a4d1efb8`.
This fixes opaque-world FX occlusion; the wider FX/skill/visual-parity backlog
and canonical missing FX1000386 remain open.

### Mandara action, FX and audio continuation, 2026-10-26

The current bounded implementation now includes native field model/billboard/
particle/sample nodes, PC skill catalogue/action bindings, target indicators,
active-skill phases and map sound regions. This does **not** close complete FX,
skill, NPC idle-event, AI or visual-parity gates.

| Accepted scope | Direct evidence under `build/evidence` |
| --- | --- |
| Mandara field graphs | `native_world_fx_bindings` resolves all 55 TML day/night instances. `mandara-fx-verified` renders portal FX1400017/1400009, altar1400023, water1400011, ground1010009 and selection1010011. Held-pose on/off/restored views change 251568 / 23611 / 46129 / 51917 pixels respectively and restore exactly outside the FPS overlay. |
| Ground marker | Native graph geometry is subdivided and each vertex samples the same terrain/TCC object floor as movement, with .3 native-unit clearance and depth testing. CPU proof covers 768 fitted vertices and interpolated UVs. |
| Skills | `mandara-actions-cpu-final.log`: eight native tribes learn through source requirements, then cast an eligible skill with unchanged pre-impact HP/TP, one impact and guarded cooldown. `mandara-skill-verified`: native skill window, actual quick key1, skill3124, two PCAni clips, six FX geometry submissions and TP110 ->104. |
| Chakra | `mandara-chakra-relogin-ctest.log`: all four stats go through the authenticated channel, actual UPDATE_UI frames, saved SQLite bytes and a closed/reopened store plus fresh login/CHAR_INIT. Main stat increases; the adjacent plus field remains effective-minus-base, exactly as `HTInterface.cpp:4698-4706`. |
| Retarget/facing/audio | `offline_world_gameplay` starts a ground route then attacks and proves that route is cleared immediately. Native target approach is rebuilt when its actor moves; engaged monster yaw follows the current player during windup. `mandara-actions-final-combat` includes two PC/two monster impacts, six native glyphs and ten sound requests, with actual player/monster playback diagnostics. |
| Map audio/sky | `mandara-actions-final-combat` starts field30007 (`Mandara1stField2.mp3`); `mandara-actions-town-sky` starts safe30008 (`Mandara1stVillage2.mp3`) and passes ten atmosphere states. Twenty TMS regions select distinct day/night ambience in the CPU fixture. |

Final builds/package: `mandara-actions-builds-verified`, `mandara-actions-debug-shell`
(100 frames, resize/minimise/restore and three renderer reinitialisations),
`mandara-actions-package-verified` (16 owned files), and
`mandara-actions-source-preservation` (379 reused source files, nine canonical
inputs and six repair references unchanged). Six focused CPU checks plus14 Python
checks pass; the additional fresh-login Chakra regression also passes. Release
SHA256 is `7e57fc6b39d10bff56a1e1318dbbc5d4b26cddecfe6fb406b4638d66aa20c08f`.
The Release executable is staged back in `_client_bgfx` after the Debug smoke.

**Source semantics:** `HTMainCharacterMove.cpp:205-218` advances the local PC
along its current segment with source speed and terrain/object height sampling.
`HTMoveMonster.cpp:48+` receives network endpoints/speed and interpolates the
monster. Server `CMob3.cpp`, `GetAttackPos` and `PickFreeMobGrid` own combat
positioning/occupancy. The offline authority uses bounded A* over the native
10-unit grid, validates both server TCM and client TCC, checks actor footprints,
and smooths only swept-clear segments. Monsters now use that routing instead
of a straight chase ray, retry blocked routes and replan moving goals. This is
an offline adapter, not a claim of the original server's complete aggression,
leash, patrol or congestion algorithm.

`HTMapInfo.cpp:31-184` selects the actual map/safe/field BGM; the lower-level TMS
BGM playback in `HTMapSystem.cpp:2428` is commented out in the original. TMS
regions supply overlapping day/night ambience. Music fades at source .5 gain
per second; sample ownership stops departed loops and updates camera-relative
positions. Attack samples retain native per-family IDs and absent second-ID
fallback. Philippine TantraParam English names remain authoritative.

**Still open:** item-cost casts, specialised target/strike/start-action services,
complete projectile/follow and persistent skill-state FX, all apron/weapon
matrices, NPC idle-trigger effects, emitter mode3, trails/local lights/jitter,
complete billboard/UV/coordinate semantics and exhaustive original-client visual
comparison. Unsupported nodes/resources emit explicit diagnostics. The supplied
fxPC catalogue lacks referenced ID1000386 (observed during skill3124); its bytes
match `_client`, `_client_bgfx` and canonical TantraClient. Mandara also has two
unplaced dangling name bindings (1400027 /1400122). No guessed replacements are
introduced. The 55 actual field placements resolve; missing INTRO TMBs remain
skipped as instructed.

Original OGRE gaps (complete active skills/AI/quests/trade/online/ten-zone
acceptance, full native FX, GPU skinning and asynchronous loading) remain open;
their presence in an OGRE plan does not make them an implemented source feature.

User decision: skip any missing INTRO TMB and leave it absent. Do not search for
or substitute that model; a skipped placement does not block this migration.

Accepted migration evidence (local `build/evidence`, each run pins its executable):

| Scope | Direct bgfx evidence |
| --- | --- |
| Ordinary melee and native hit frame | `ogre-port-final-melee`: four PC and seven monster impacts, TAB key identity, unchanged HP before impact in the CPU fixture, rendered attack sample crossing within one simulation frame, 13 native damage/miss glyphs and 23 sound requests with actual playback diagnostics |
| Death and cancellation | `ogre-native-combat-death`: actual killing hit, pending-strike cancellation, held finite death pose, zero HP UI, ordinary resurrection confirmation and persisted 20% saved-cell revival |
| Routes and animation continuity | `ogre-native-retarget`: collision-checked SDL surface clicks, camera orbit/reset, inventory toggles and retarget without resetting the current walk/run clip or phase; `mandara_closure` also checks blocked/disconnected/detour routes and authored NPC approaches |
| UI and independent reload | `ogre-native-services`, `ogre-native-services-reload`: native skill window, quick-slot icon, camera and warehouse/save controls; item instances, money, revisions and complete character/cargo bytes verified after a separate login |
| Atmosphere | `ogre-native-environment-entry-gate`: ten authored phases, two cloud layers, 1,216 night stars, sun/moon and flare visibility/occlusion; 503,370 cloud pixels changed and 75,725 of 77,803 changed fog pixels matched the authored RGB blend |
| Selected FX/audio | `ogre-port-final-intro-fx-music`: two gate groups/four native fire/smoke emitters, GPU corner/UV/colour/blend/depth checks, looping past duration, release/recreate, actual two spatial gate voices and original streamed music/gain/loop requests |
| Bounded gallery adapter | `ogre-port-original-assets-fx`: original HPK mesh, metadata-bound original textured TFX sample and uncached TAB loading; this sample is not a general TFX interpreter |
| Build/package/source preservation | `ogre-port-final-builds`, `ogre-port-debug-shell` (three renderer restarts), `ogre-port-final-package` (16 owned files), `ogre-port-source-preservation` (379 source files, nine inputs, six repair references) |
| CPU/Python | `ogre-port-final-cpu.log` (13), `ogre-port-normals-cpu.log` (one), `ogre-port-fixtures-corrected-python.log` (14); all passed |

Production attacks select the native three-clip sequence and scale the authored
TAB duration to `max(500, attackSpeed) + 100` milliseconds for ordinary PC melee.
Monster attacks keep their authored duration. Damage/rewards, native digit/miss
textures, hit flash and impact sounds follow the marker, with native swing/voice
events at windup. Hurt revisions do not restart an ongoing monster attack.
Pending impacts cannot damage an already-dead actor. Up to 32 status notifications
drain in FIFO order per frame, avoiding the previous one-message HP-bar backlog.
Philippine English names/messages remain the default, with original IDs intact.

The first environment attempt was rejected by an inherited QA startup guard
that only permitted the character-creation scenario. The guard now also permits
the saved-entry environment scenario; the rejected output is retained. An initial
Python assertion assumed 50 fixture HP; the source-created fixture has 52 before
normal entry recalculation. The corrected test pins 52; gameplay values were not
changed to satisfy the test. These are development acceptance slices, not a full
skills/FX/AI, exact original star RNG, screenshot-parity or performance claim.

### Visual correction after the 07:22 screenshot, 2026-10-26

The preceding technical passes did not establish visual acceptance. The user's
screenshot exposed washed-out ground, dark scenery and weak character shadows.
Current accepted visuals supersede the earlier reference-preset appearance.

- [x] Compare the live `_remake` renderer and run `_client/HTLauncher.exe` in an
  isolated profile. `ogre-current-visual-reference` completed with the original
  executable/profile/protected files unchanged. Terrain HPK and Mandara CFG
  hashes match between `_client`, `_client_bgfx` and canonical TantraClient.
- [x] Match OGRE's map-global material override for textured scenery: do not
  multiply the TMB diffuse colour on top of albedo and OBJ_MATERIAL. Three
  source grass examples have diffuse RGB about 0.588. The old multiplication
  darkened foliage/rocks/buildings a second time; retain TMB colour for missing
  texture/untextured fallbacks. Evidence: `visual-material-source-evidence.json`.
- [x] Remove the washed-out terrain gamma2.2/tint preset. The explicit reference
  presentation now uses linear terrain gain2, gamma1, neutral tint and zero
  grass grading; map-lit textured foliage retains its original colour. Native
  ungraded presentation remains available. This is not a finished sRGB pipeline.
- [x] Render a separate camera-centred spherical sky backdrop, while preserving
  the original cloud geometry/masks. Mandara's cloud TMD tops out at about192
  source units and cannot cover the CFG's800-unit high-colour band. Prove all
  low/mid/high colours and full horizontal coverage with clouds/celestials
  disabled only for diagnostic captures; both remain enabled normally.
- [x] Tighten the 2048 PCF shadow projection from half-span1.8 to.45 and depth
  range.1–20 to.1–4; reduce depth/slope bias from.0001/.00025 to.00002/.00006.
  This increases useful local texel/depth precision for native-sized characters.

Accepted `build/evidence/visual-material-sky-verified` contains four noon/night
views, matched light/detail/shadow omission, exact restoration, and five
independent sky elevation captures. All authored sky colours match within0.402
RGB units; 1,170 horizon samples have no backdrop gap. Detail changes462,883
world pixels and shadows change2,004; all3,087 terrain border comparisons match.
The same empty foreground region has luma standard deviation9.77 versus5.84 in
the rejected earlier look, preserving more authored texture contrast. These are
specific render proofs and visually reviewed captures, not exact stock parity.

`visual-material-sky-environment` passes ten authored states, 578,916 changed
cloud pixels and77,830/82,177 changed fog pixels matching the authored blend.
Debug/Release builds, six CPU checks, 14 Python tests, three Debug renderer
restarts, the16-owned-file final Release package and protected-source checks
pass. See `visual-material-sky-{final-builds,final-package,source-preservation}`
and the corresponding CPU/Python/build logs. Release is staged in `_client_bgfx`;
default/source profiles and the OGRE installation remain unchanged.

The first new backdrop diagnostic correctly failed exact restoration: it saved
the getter's normalized camera target, changing the original view/shadow anchor.
The probe now restores the precise camera passed to the renderer. It also hides
celestial flares during colour-band measurement. The rejected output remains in
`visual-backdrop-contrast`; use the accepted output above for current results.
Full moving-camera shadow tuning, matching original camera/asset identity and
complete scene/skill/FX fidelity remain open.

### Mandara terrain, shadows and HIGH quality, 2026-10-26

Historical technical checkpoint; its appearance is superseded by the visual
correction above.

The normal profile already selects HIGH (`spec=3`, `rtshadow=true`, native far
clip 3500), matching `_remake/src/resources/ClientRenderProfile.cpp`. Original
CFG bytes and explicit private overrides remain intact. This pass corrects
renderer differences found by comparing the live OGRE implementation:

- [x] Clamp section base images at their edges; repeat the native `detail.dds`
  independently using absolute world X/Z times `1.25 * .035`. Keep the native
  multiplicative detail equation, original terrain topology/heights/normals and
  all 10 supplied detail mips. Enable 16x world anisotropic filtering, including
  after resize/reset; UI sampling remains separate.
- [x] Check the actual submitted section border positions, normals and detail
  coordinates: 3,087 shared-border comparisons, zero maximum difference.
- [x] Match OGRE's represented HIGH shadow scope: animated creatures and their
  attachments cast; opaque terrain/scenery receive. Terrain/scenery, UI and FX
  do not cast, and characters/alpha foliage do not receive this projection.
  Keep the 2048 depth map and PCF; use OGRE's 50 percent modulation after scene
  grading so fill lights do not erase the projected shadow.
- [x] Preserve premultiplied alpha through world grading and fog. The nonlinear
  grade first unpremultiplies, then restores alpha weighting; fog RGB is weighted
  by the same alpha. This avoids opaque-looking transparent grass/foliage edges.
- [x] Capture matched detail/shadow/grass isolation and exact restoration without
  resetting environment light state; retain ordinary runtime grass visibility.

Accepted GPU evidence: `build/evidence/terrain-high-first`. All 16 sections bind
the native 10-mip detail; disabling detail changes 460,571 world pixels.
Creature casters submit 30,812 triangles, terrain/scenery casters submit zero;
shadow omission changes 4,136 world pixels and only brightens them. Detail,
shadow and grass restoration reproduce the complete frame exactly; opaque UI
colours stay unchanged. See `TERRAIN_QUALITY_RESULT.json` and
`TERRAIN_QUALITY_PIXELS.json`. Captures include all four noon/night views.

`terrain-high-environment` passes ten authored atmosphere states, 505,747 changed
cloud pixels and 80,173 of 83,845 changed fog pixels matching the authored RGB
blend. Six terrain/profile/normal/light CTests and 14 Python tests pass. Debug
passes three renderer restarts; Debug/Release hashes, the final 16-file Release
package and protected-source checks are in `terrain-high-final-builds`,
`terrain-high-final-package` and `terrain-high-source-preservation`. Default and
source profiles remain unchanged.

The first extended CPU run found an inherited test looking for `HT3DHeaven.dll`
inside the dedicated client. Its explicit read-only engine reference now points
to canonical `TantraClient/HT3DHeaven.dll`; the DLL is not copied into the new
client. The first build's QA map-scope error was corrected before staging.
Earlier rejected logs remain separate from accepted results.

These checks establish the represented Mandara path. Full contact/bias/fade
tuning across moving cameras/all maps, complete original quality controls and
exact screenshot parity remain open in P09-09/P09-15 and the broader gates.

### Mandara1st lighting reference pass, 2026-10-26

Historical preset and captures; gamma2.2/warm tint/grass grading below are
superseded by the visual correction above.

Visual references are the user's screenshots `Screenshot 2026-10-25 183450.png`
and `Screenshot 2026-10-25 183704.png` in
`C:\Users\Ashesh\Pictures\Screenshots`. Their original bytes were preserved;
hashes and preset settings are recorded in `build/evidence/mandara-reference-inputs.json`.

- [x] Apply the authored SUBLIGHT rotation and six-interval ambient/diffuse colour
  interpolation, alongside the existing sun/moon lighting.
- [x] Apply the map's CHARACTERLIGHT ambient/diffuse spotlight: main-character
  position plus native `(0,50,-5)`, range100, full cone angles15/90 degrees,
  falloff1 and constant distance attenuation inside the native range.
- [x] Retain the authored TML grass flag in scene placements and per-instance
  rendering; shared model geometry is not changed by presentation grading.
- [x] Add the requested warm daylight presentation separately from native
  material/light equations. Reference preset: exposure1.1, gamma2.2, tint
  `(1,.94,.86)` for terrain; authored grass uses half the adjustment. Grading
  occurs before fog and excludes characters, buildings, sky, UI and FX.
- [x] Start offline Mandara at authored noon (`phase=.25`), then continue the
  native day/night rates. CHAR_INIT's authoritative timestamp and saves are
  unchanged. `--offline-world-time native` restores the timestamp-based start;
  a phase in `[0,1)` selects another visual start.
- [x] Retain `--world-look native` to bypass the reference grade. The reference
  preset is a deliberate presentation choice, not proof of native colour-space
  or pixel-perfect screenshot parity.
- [x] Verify four fixed views at noon/night, individual light omission and held
  pose native/reference restoration through an isolated offline runtime.

Accepted runtime: `build/evidence/mandara-lighting-verified`. Its pixel proof
records 146,397 pixels affected by the sublight, 1,576 by the character light,
202,418 ground pixels affected by the reference preset, and 2,729 unchanged
opaque HP/TP pixels. Stone/sky sample regions are unchanged by the grade. Both
light and presentation restoration reproduce the complete original frame
exactly. Camera, pose, time and textures are held fixed for those comparisons.
`tools/verify-mandara-lighting-pixels.py` performs the read-only pixel checks.
The controlled `mandara-lighting --fixture weapon-combat` runner invokes them
automatically. Earlier baseline/native-fill/terrain/grass tuning captures remain
in separate evidence folders, each with its own executable hash.

Final acceptance also includes the three CTests in
`mandara-lighting-regression-cpu.log`, 14 Python tests in
`mandara-lighting-final-python.log`, Debug/Release build hashes in
`mandara-lighting-final-builds`, and three Debug renderer restarts in
`mandara-lighting-debug-shell`. Release is staged; the 16-file package and
379-source/nine-input/six-reference preservation checks passed in
`mandara-lighting-final-package` and `mandara-lighting-source-preservation`.
Both isolated runtimes preserved the default/source profiles and protected files.

Mandara FX are **still partial**. `build/evidence/mandara-fx-inventory.json`
records 32 FXField catalog entries and 32 field-manager effects, plus native
monster effect/skill managers. These assets are present, but general field,
skill/aura, model/sprite/particle/sound TFX dispatch is not implemented merely
because the reader can inventory them. Basic hit flash/digits/sounds and the
existing environment presentation work; the screenshot's skill/aura effects
remain C09/P13 work. Complete specular/emissive lighting, all weapon/skill
animation variants, matched original-camera/asset parity and full scene/recovery
coverage also remain open.

### Verified implementation slices, 2026-10-26

Weapon continuation accepted: `nativePcCombatBindings` now supplies the same
PCAttackAni attack type to authority and presentation, including type916 for a
native off-hand dagger. Weapon stand/walk/run states use type20 fields49-51;
ordinary safe-cell movement uses generic PCStateAni states801-803. The displayed
weapon switches between its authored hand and source sheath socket without
recreating the body. Authored secondary claw models are also represented.

`weapon-sword-town` verifies sword4001 on `BWeapon01`, generic stand/run/walk,
ordinary SDL retarget and preserved movement phase. `weapon-sword-field` verifies
the same owned sword on `RightHand` with native states806/814/810. The separate
`weapon-sword-combat` encounter uses type901, two player/two monster marker-timed
impacts, native sword sounds, defeat/reward and persisted native state.
`weapon-stance-native-reload` independently restores the complete prior
character/cargo records without mutation. Every run preserves default and source
profiles. All evidence is under local `build/evidence`.

`weapon-bindings-final-cpu.log` checks 12 authored weapon types across eight
tribes: 288 attack-variant bindings, 129 distinct TAB files and 88 available
sheath-socket combinations. It separately checks dual type916 selection and
invalid item rejection. This is a resource/binding matrix, not proof that every
tribe may legally equip every weapon or that all weapon gameplay is complete.
Four source-requested sheath socket names are absent on some supplied bodies;
the native dagger requests also include unavailable `HWeapon01`/`LeftSSW`.
Presentation reports unavailable requested sockets once and retains the authored
Item socket when a requested stance socket is unavailable. No invented aliases
or replacement models are used. Full affected weapon/body parity stays open.

Debug/Release builds and the 16-file Release package passed
`weapon-stance-final-builds`, `weapon-stance-final-package` and
`weapon-stance-source-preservation`; original 379 source files, nine inputs and
six repair references remain unchanged. Ten rebuilt regression CTests passed in
`weapon-stance-regression-cpu.log`; 14 Python tests passed in
`weapon-stance-python.log`. The Debug shell also passed three renderer restarts.

Detailed continuation and failures are in [PROGRESS.md](PROGRESS.md). Evidence
paths below are relative to `build/evidence` and remain local/ignored. Each runtime
output records its executable hash; original OGRE results do not count as bgfx
acceptance.

| Checkpoint | Minimum gate | Implemented and directly verified | Evidence | Remaining gate scope |
| --- | --- | --- | --- | --- |
| C00 | [x] | 379 source/tool hashes, baseline commit/patch, nine input hashes, pinned dependencies | `c00-baseline-inputs/RESULT.json`; `docs/evidence/source-baseline.json` | Broad asynchronous handle/DTO architecture remains in parent tasks |
| C01 | [ ] | C++20 x64 Debug/Release, D3D11 shell, resize/minimize/restore; namespaced executable/shaders/notices staged | `c01-builds`; `c01-shell`; `_client_bgfx/system/zflauncher/package-manifest.json` | Focus/DPI, repeated recovery and clean-machine closure |
| C02 | [ ] | Native HPK model/textures, material alpha/detail, ordered UI, CPU reader/profile checks | `c02-assets`; `c02-resources` | Full asymmetric/clipping/resize matrix and normal/colour contracts |
| C03 | [x] | ashesh login; create/select/delete; all eight tribe previews with face/hair changes; full-roster and duplicate-name rejection, cancellation and corrected retry | `c03-roster-lifecycle-guarded`; `c03-eight-previews-complete`; `c03-roster-boundaries` | Complete appearance/equipment/LOD combinations and repeated transition cleanup |
| C04 | [ ] | Source CHAR_INIT to map40001, 524288 terrain triangles, 6503 placements, actors and essential native HUD | `c04-entry-actor-catalog`; `map-cpu-preflight.txt` | Async cancellation, complete seed-state checks and broader transition/reload matrix |
| C05 | [ ] | Real ground click/local movement, inventory toggle, right-drag orbit, Insert reset and conservative frustum tests | `c05-controls`; `c05-navigation-cpu`; `zf_frustum` CTest | Blocked/narrow town routes, zoom/obstruction, quick-slot/layout reload, tooltips |
| C06 | [x] | Monster2001 defeat/reward, actual player death and native revival; warehouse/save; buy/sell, paid repair, money/capacity rejection and prompt cancellation; paid-repair full-record reload | Earlier service/reload evidence; `c06-paid-repair`; `c06-paid-repair-reload`; `c06-no-money`; `c06-full-inventory`; `c06-death-presentation` | Full hit/miss/critical/block/FX, active skills, AI and loot remain open |
| C07 | [ ] | Authored deformed normals and inverse-transpose world normals; directional depth comparison, cutout caster shader, 3x3 filtering and texel-snapped projection | `zf_normal_transforms`; `c03-eight-previews-complete`; `c07-shadow-profile-options` | Broad foliage/bias/movement parity, sky/water/weather/TFX/audio and matched OGRE views |
| C08-C09 | [ ] | Frame/GPU measurements, sampled resource counters and reusable frame-stat quad; backlog retained | `c08-idle-frame-sample`; `proceed-cpu.log`; `proceed-python-verified.log` | GPU skinning, asynchronous loading, performance/recovery/release, full gameplay, online and ten zones |

The native actor yaw boundary now converts the native D3DX/OGRE convention into
bx's opposite Y-rotation sign. Cardinal/diagonal CPU checks and actual left/right
running captures verify facing; `c03-intro-native-facing` shows the gate tigers
facing inward. English text defaults to the `philippine_*` columns in the supplied
TantraParam/HTMessage XML exports, through generated `system/zflauncher/english.tsv`.
Native binary IDs, gameplay fields, message parameters and canonical files are
preserved. Player/monster names and yellow NPC names use source height anchors;
`c06-english-monster-target` verifies readable Vasabhum target/overhead text.

The renderer currently uses CPU skinning with authored deformed normals,
inverse-transpose normal transforms, ambient/sun/point lighting, native detail,
fog and one 2048-pixel directional shadow map. GPU skinning, broad shadow quality
acceptance, full sky/water/TFX, asynchronous loading and production performance
are open. No comparable-quality FPS claim is
made. Mandara's missing canonical cart texture is reported and uses its authored
untextured diffuse material, matching the selected OGRE fallback.

The explicit client-root change removed only confirmed copied OGRE runtime,
HTLauncher/plugins, obsolete staging records, the unused SDL3 DLL and historical
diagnostics from `_client_bgfx`. Cleanup evidence is
`build/evidence/client-bgfx-cleanup`; all resources/configuration/saves and the
original `_client` were hash-preserved. Visual C++ runtime DLLs remain because
ZFLauncher imports them. Earlier runtime evidence retains its historical `_client`
paths. Current presets, tools, shortcut and compiled defaults use `_client_bgfx`.
The dedicated client passed its own login/Mandara/movement/inventory/orbit/reset
run in `c05-controls-dedicated-client`, with both protected roots and the seed
unchanged. `c01-dedicated-builds` records the current Debug/Release artifacts;
`c08-dedicated-package` verifies owned files, x64 imports and retained CRT DLLs.
The initial 15 CPU tests passed against the new root. Current evidence is
`proceed-accepted-builds`, `proceed-accepted-package`, `proceed-cpu.log`
(17 selected CTests) and `proceed-python-verified.log` (11 safety tests).
These checks do not close
the full C08 clean-machine, performance and recovery gate.

### Checkbox reconciliation, 2026-10-26

Completed task toggles below were reconciled against the implementation and retained
acceptance files; no game, build or server was launched for this documentation update.

| Newly checked tasks | Closure evidence and scope |
| --- | --- |
| P00-08, P01-02, P20-02 | This plan names deferred C09 systems; `tools/verify-zflauncher.py` writes explicit fixture/check/process/persistence evidence. `CMakeLists.txt` and `cmake/NativeBaseline.cmake` build project-owned libraries with public interfaces. Retained CPU/shader/package and selected runtime results document the focused check workflow. |
| P02-07, P18-07 | Production argument parsing and `c03-profile-isolation-dedicated/RESULT.json`: offline/profile/output/capture arguments work; unsupported renderers and both legacy profile destinations are rejected. Runtime process/default-profile/source guards preserve the separate profiles. This is not a claim of unrestricted simultaneous clients sharing one database. |
| P06-05, P06-06, P06-07, BG-C03-GATE | `c03-roster-lifecycle-guarded`, `c03-eight-previews-complete`, `c03-roster-boundaries`, `c03-roster-backbuffer` and `c03-profile-pose`: source creation/appearance/Chakra, native camera transitions, deletion safeguards, duplicate/full-roster rejection and corrected retry; original character rows preserved. Full equipment/LOD combinations remain P07-08/BG-LOD-01. |
| P07-09a, P11-04, P11-05 | `c04-entry-actor-catalog`, `c06-saved-services-hud-picking`, service/merchant/paid-repair reloads and `c06-death-presentation`: source idle/equipment binding, restored native character/cargo/skill/quick-slot state, calculated status notifications and zero/revived HP/TP presentation. |
| P12-08a | `c06-basic-combat`: actual monster2001 defeat, Prana604 to704 and decoded SQLite HP/Prana/cell match the authority result. Full loot/pickup/penalties remain P12-08. |
| P19-01 | `proceed-accepted-package/RESULT.json` and package manifest: selected D3D11 x64 imports, four shaders, 14 owned files, retained CRT hashes and license closure verified. Clean-machine/relocation acceptance remains open. |

C00, C03 and C06 minimum gates are checked. Other checkpoint gates and broad parent
tasks retain their unchecked state where required coverage is partial. In particular,
eight previews do not close every equipment binding; three shell restarts do not
close focus/DPI/device-loss/leak testing; stationary timing does not close loading,
worst-stall or sustained same-quality performance acceptance.

## Project contracts and progress rules

- The requested local `_remake` is the primary extraction baseline. Capture its
  commit and selected uncommitted changes before copying; compare migrated code
  deliberately and record each module/generator/fixture's selected version.
- Use existing `_client_bgfx/resource` and `_client_bgfx/system` HPKs, loose companions,
  catalogs and offline tables. No second full client or bulk archive extraction.
- Offline login, roster, world state and gameplay use SQLite/local authority.
  No HTTP, dedicated server or guessed legacy network messages are required.
- Use one isolated offline process and one channel. Prefer group1 when present
  in the selected seed; otherwise record its first occupied group without moving
  characters between groups. Current copied Ashesh acceptance uses group0/Zone01.
  Login remains `ashesh / ashesh`; do not seed production credentials.
- `[x]` means this exact task has evidence; `[ ]` means missing, partial or
  unverified. OGRE reference availability is a separate column below.
- Implementation, CPU, build/shader, package and runtime checks are separate
  gates. Never transfer OGRE checkboxes or runtime passes to bgfx.
- Stable `Pxx-yy` IDs retain the earlier backlog's identity; their numbers no
  longer prescribe order. Checkpoints C00-C09 prescribe the execution order.
- Letter-suffixed child tasks define minimum slices. A child pass never closes
  the broader parent. Cross-cutting parent contracts apply to each slice; keep
  parents unchecked until their complete stated scope has evidence.
- Checkpoint gates require their explicitly named slice and tests, not every
  eventual parent requirement. Record deferred scope before closing a gate.
- Do not publish completion percentages from checkbox counts. Comparable offline
  progress is distinct from production completeness and complete native parity.

### Offline profile and save import

Default ZFLauncher profile: `_client_bgfx/userdata/zflauncher`. OGRE data remains under
`_client/userdata`; ZFLauncher never opens its live database for writing. Preserve
`--offline` and `--user-data-root`.

Provide an explicit one-time seed operation. Read stable source bytes, including
committed WAL, into a disposable private snapshot. Recover/checkpoint only that
snapshot, then use a read-only SQLite connection and its backup API into a new
destination. Never open the original database through SQLite recovery. Preserve accounts, character blobs,
inventory/equipment, cargo/money, skills, progression and current/saved zone/cells.
Copy persistent companions: saved ID, character quick-slot files, private
HTStartup/HTSpec overrides and UI layout. Exclude caches, logs, captures, transient
WAL/SHM/journal files and nested ZFLauncher profiles. Refuse an existing destination
or overlapping source/destination database or companion-file paths; do not merge,
reset or edit character values. Support the default destination below the source's
userdata directory by excluding that destination subtree from source enumeration.
Reject identical roots and a destination that contains the source root.
Use stable source data while importing; if another launcher is writing it, stop
preparation and report that the source must be closed before a consistent seed.
Verify SQLite integrity, companion bytes and source hashes.

Default seed source is the current OGRE profile. Acceptance can explicitly select
a recorded checkpoint. Derive expected character state from that chosen seed;
historical `MandaraNpc` cells/items are not universal defaults. Preserve the seed
and prepare fresh disposable profiles for destructive creation/deletion and
transaction tests. Hash OGRE source files excluding only the namespaced destination
before/after seed, staging and runtime; never include that destination recursively.

Stage `_client_bgfx/Start-Offline.cmd` for ZFLauncher. Preserve OGRE's existing
`_client/Start-Offline.cmd`, executable, support files and user additions. Namespace bgfx
shaders/logs/diagnostics; isolate incompatible DLLs with a verified Windows loader
strategy rather than relying on another launcher's DLL version.

## Current OGRE baseline and comparison matrix

References: [local progress](../_remake/PROGRESS.md),
[local phased plan](../_remake/docs/planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md),
[offline quickstart](../_remake/docs/guides/OFFLINE_QUICKSTART.md), and
[Mandara acceptance](../_remake/docs/planning/MANDARA_GOAL1_ACCEPTANCE.md).
Their historical results identify tested executables, not every current build.

The matrix checkboxes below require complete coverage of each broad group. A checked
minimum checkpoint (such as C03 or C06) does not complete that entire group;
verified slices and their remaining requirements are listed in the checkpoint table.

| OGRE group | Existing implementation/reference and remaining limits | First bgfx checkpoint | bgfx implementation | CPU/build evidence | bgfx runtime acceptance |
| --- | --- | --- | --- | --- | --- |
| 01 Application/configuration | SDL3/OGRE shell, diagnostics/build/staging; recovery/DPI gaps | C01 | [ ] | [ ] | [ ] |
| 02 Original resources | HPK/catalog/map/model/UI readers and alpha/detail; broader preflight gaps | C02 | [ ] | [ ] | [ ] |
| 03 INTRO/characters | SQLite login, three-slot create/select/delete and loading/CHAR_INIT; roster lifecycle, eight previews and retry accepted; full appearance/equipment/LOD and transition coverage open | C03-C04 | [ ] | [ ] | [ ] |
| 04 MainUI/status/slots | focus/drag/close panels, calculated status, Chakra/learning and item slots | C05 | [ ] | [ ] | [ ] |
| 05 Movement/actors/camera | bounded navigation/camera; usable obstruction/native collision acceptance open | C05 | [ ] | [ ] | [ ] |
| 06 Inventory/NPC services | ordinary shop/paid-repair/warehouse/save minimum accepted; full inventory/tooltip combinations open | C06 | [ ] | [ ] | [ ] |
| 07 Combat/progression | basic melee/progression; complete active skills/AI/FX/loot remain | C06, then C09 | [ ] | [ ] | [ ] |
| 08 Quests/refinement | advanced services and complete quests/refinement remain | C09 | [ ] | [ ] | [ ] |
| 09 Online transport | real C++ transport/replication remains | C09 | [ ] | [ ] | [ ] |
| 10 Travel/death/revival | complete transfers, penalties and recovery remain | C09 | [ ] | [ ] | [ ] |
| 11 Social/competitive | chat/party/trade/guild/PvP integration remains | C09 | [ ] | [ ] | [ ] |
| 12 Environment/FX/audio | represented sky/fog/time/shadows/selected FX/audio; complete fidelity remains | essential C04, represented C07, full C09 | [ ] | [ ] | [ ] |
| 13 Loading/release | staging/bounded caches; GPU/loading/performance/release gates remain | instrument C01, verify C08 | [ ] | [ ] | [ ] |
| 14 Zone01-Zone10 | catalog/profile alignment; individual gameplay acceptance remains | Zone01 C04, ten zones C09 | [ ] | [ ] | [ ] |

The first target includes ordinary offline functionality, not only rendered
geometry. Independently accept corrected Mandara camera, warehouse/save-point and
HPK-backed presentation. Keep OGRE's incomplete collision, visual and gameplay
coverage explicit; do not turn its open acceptance into bgfx completion.

## Reference roots and reuse ownership

| Purpose | Location / repository | Ownership |
| --- | --- | --- |
| Parent project | `C:\_GitHub\tantra-dev-main`, `https://github.com/Tantra-Development/tantra-dev-main` | Pins submodule commits and coordinates builds |
| Requested bgfx working folder | `C:\_GitHub\TantraSrc\_remake_bgfx` | ZFLauncher source, plan and project-owned tools |
| Parent bgfx module path | `_remake_bgfx`, `https://github.com/Tantra-Development/_remake_bgfx` | Register as a real gitlink, not copied nested source |
| Primary renderer reuse baseline | `C:\_GitHub\TantraSrc\_remake` | Requested local baseline; pin commit and selected working-tree changes |
| Migrated renderer comparison | `C:\_GitHub\tantra-dev-main\_remake` | Compare differences; do not mix versions implicitly |
| Final bgfx client | `C:\_GitHub\TantraSrc\_client_bgfx` | Dedicated runtime using the original asset layout and copied private profile |
| OGRE comparison client | `C:\_GitHub\TantraSrc\_client` | Preserved OGRE launcher, assets and normal saves; no bgfx staging |
| Migrated client module | `C:\_GitHub\tantra-dev-main\_client` | Package/staging reference; `_client` submodule |
| Local C++ server reference | `C:\_GitHub\TantraSrc\_server_cpp` | Current local protocol/authority reference; server goal stays paused |
| Migrated C++ server comparison | `C:\_GitHub\tantra-dev-main\_server` | Compare source/protocol versions explicitly before later integration |
| Source reference module | `C:\_GitHub\tantra-dev-main\_references\Tantra` | Read-only native source reference |
| Central documentation | `C:\_GitHub\tantra-dev-main\docs` | Cross-project status and accepted evidence |

The old `C:\_GitHub\TantraSrc` checkout and migrated parent are separate Git
working directories. Do not rewrite the old checkout's large dirty tree to make
the new module fit. Local analysis and builds use the requested bgfx folder now;
authentication and parent registration do not block them. Before registration,
document the canonical checkout and any requested-path linked worktree. Keep one
authoritative plan, with links rather than divergent copies after setup.
Linked worktrees share committed history, not uncommitted
edits; identify the edit/commit path and update the parent gitlink explicitly.
Do not manufacture a gitlink without a real fetched commit.

Proposed module structure (directories below are tasks, not existing code):

```text
_remake_bgfx/
  README.md  IMPLEMENTATION_PLAN.md  PROGRESS.md  .gitignore
  CMakeLists.txt  CMakePresets.json  dependencies.lock.json
  assets/                 launcher icon and project-owned presentation assets
  cmake/                  dependency/shader/build configuration
  docs/{architecture,parity,evidence,decisions}/
  src/
    app/                  ZFLauncher lifecycle and command line
    platform/             SDL3 window, input, Win32 cursor integration
    core/                 IDs, clocks, jobs, diagnostics and ownership
    resources/            native readers and virtual filesystem
    compatibility/        source-faithful simulation/math adapters
    client/               sessions, offline authority and UI state
    rendering/
      interface/          engine-independent commands and handles
      bgfx/               device, resources, submission and views
      world/              terrain, actors, materials and atmosphere
      ui/                 native UI rendering and text cache
      fx/                 TFX nodes, particles, ribbons and local lights
    audio/                native catalog playback and group gains
    networking/           C++ authority transport adapter
  shaders/{world,terrain,skin,shadow,sky,water,fx,ui}/
  tools/                  build, staging, source capture and CPU probes
  tests/{unit,parity,integration}/
  external/               ignored pinned dependency checkouts
  generated/              ignored generated source/shader artifacts
```

### Source of truth and reference manifest

| Reference root | Use and limit |
| --- | --- |
| `C:\_GitHub\tantra-dev-main\_references\Tantra` | Migrated native comparison snapshot; record its commit/hash |
| `C:\_GitHub\TantraSrc\Tantra` | Primary native source for local reuse; compare versions before mixing files |
| `B:\__TANTRA\TantraSrc\Tantra` | Additional server source, including supplied MSG/CHAT/ITEM references; audit each service version |
| `C:\_GitHub\TantraSrc\TantraClient` | Canonical original game assets; read-only, retain native relative paths |
| `C:\_GitHub\TantraSrc\_client_bgfx` | Current bgfx runtime HPKs/configuration; preserve user-added archives |
| `C:\_GitHub\TantraSrc\_client` | Original OGRE client and historical input-hash baseline; preserved |
| `B:\__TANTRA\TantraDataScripts` | Editable Excel/table reference; validate export correspondence with runtime TPA/TXL |
| `B:\__TANTRA\TantraDataScripts\K3` | Read-only K3 authored XML/XLS/XLSX reference for parameters, messages, FX and NPCs; compare IDs/layouts with the selected runtime version |
| `B:\__TANTRA\TantraDataScripts\Global` | Read-only Global authored tables, including `fxPC.xls`; retain language columns and version differences rather than replacing runtime tables wholesale |
| `B:\Tantra-Files\_TantraClients\TantraOnline-Global` | Read-only shipped Global client assets and binary tables; inspect both `system` and `resource\fx` catalogs because they differ; read HPKs in place without extraction |
| `E:\Global-server` | Deployment zone data; generation areas, collision/grid and NPC generation must come from one zone dataset |
| `A:\zEngineK2\server` | Server-manager UI reference only; server work stays in the server project |
| `A:\zEngineK2\client\resources\ZFLauncher.ico` | Previously requested client branding; prefer its already copied project-owned version |
| `C:\Program Files (x86)\Steam\steamapps\common\Kathana\KathanaGame.exe` | Visual reference, observed file/product version 4.0.1.7; no verified renderer/asset equivalence |

Reference audit (2026-10-26): `build/evidence/fx-reference-audit1/FX_REFERENCE_AUDIT.json`
records hashes and decoded rows from the current client, Global client's two
`fxPC.txl` files, K3 `fxPC.xml` and Global `fxPC.xls`. All five reference skill3162
through action1100017 and activation1000646, but none defines1000646/7/8 in
FXSkill. The current client follows1000451; the Global/K3 references follow1001073.
Global `system/fxPC.txl` and `resource/fx/fxPC.txl` also differ from each other.
Existing PAR28_CST/FLW/ATK graphs do not establish an activation replacement.
Keep the missing activation diagnostic and historical full-FX result; per the
user's later instruction, record the missing resource and move on. Do not invent
an alias or copy a different-version catalog into the client. The reproducible
read-only audit is `tools/audit-fx-references.py` (xlrd is audit tooling only).

Native files beneath the primary source root:

| Files / folders | Behavior to retain |
| --- | --- |
| `HTlauncher\HTApplication.cpp`, `HTIntroManager.cpp`, `HTGameManager.cpp` | Application/INTRO/world lifecycle and ordering |
| `HTlauncher\HTEngineHandler.cpp`, `HTCamera.cpp` | Asset sequence, world coordinates, camera, map time/environment and text |
| `HTlauncher\HTInterface.cpp`, `HTControlDef.h`, `HTSystem.cpp`, `HTInterfaceCheck.*` | Dialog/control IDs, focus, dragging, options, native cursors and shortcuts |
| `HTlauncher\HTMainCharacter*`, `HTOtherCharacter*`, `HTNPC*`, `HTMonster*` | Actors, action/weapon animation, names, targeting and presentation |
| `HTlauncher\HTItemSystem.cpp`, `HTObjectInfo.cpp`, `HTSkillSystem.cpp`, `HTMessageDef.h` | Tooltips, inventory actions, skill/effect messages and colours |
| `HTlauncher\HTClientParamMgr.h`, `HTResMgr*`, `HTObjResMgr*`, `HTFXResMgr*` | Versioned resource and parameter layouts; resolve actual paths before porting |
| `zone\CMob*`, `HTParamMgr*`, `SendFunc*`, `server*` | Authority rules and message behavior; keep arithmetic independent of rendering |
| `Engine`, `inc`, `Database`, `DBSRV`, `SQLDAEMON`, `Xml`, `Temp`, `Web` | Supporting source/schema/export references, not all required runtime dependencies |

Runtime references beneath the chosen client root:

- `system\ClientRes.txl`, `TantraParam.tpa`, `HTMessage.txl` and other catalog TXLs.
- `system\HTStartup.cfg`, `HTSpec.cfg`; `resource\UI\Interface.sys` and UI HPKs.
- `resource\map\MAP_*.cfg`, THM/TCC/TML/TMD, terrain HPKs and companion files.
- `resource\object\*ObjTmb.hpk`, `*ObjTex.hpk`, sibling Pop archives and PC/NPC/Monster/Item data.
- `resource\fx\*.txl`, `*.tfx`, model/animation/texture HPKs; `resource\sound` HPKs and map music.

- [ ] Export a machine-readable manifest with source commits, paths, sizes and hashes.
- [ ] Classify each reference as canonical input, deployment reference, derived output or visual target.
- [ ] Pin binary-inspection evidence to the exact original DLL hash; never execute an unknown engine DLL to parse assets.
- [ ] Track missing layouts/assets explicitly; retain unsupported record tails rather than guessing their meaning.

### Reuse audit

| Area in current `_remake` | Available baseline | bgfx work still required |
| --- | --- | --- |
| `src/resources` | HPK/VFS, TPA/TXL, native map/model/animation/UI readers | Extract dependencies, preserve fixtures and prove identical resolved bytes |
| `src/compatibility` | Timelines, bind skinning, clocks, source math, camera/control rules | Keep renderer-free; validate same inputs/outputs in the new build |
| `src/client` | Offline SQLite/session/progression, inventory/NPC/combat/skill state | Audit partial services and transport; adapt without introducing a second authority |
| `src/audio` | Music/sample services and live option gains | Reuse after SDL/platform lifecycle audit; verify actual playback separately |
| `src/rendering/HtRenderFacade` | INTRO, native UI and world presentation orchestration | Replace concrete OGRE coupling; preserve resource/state order |
| `src/rendering/OgreBackend` | Reference for resolved rendering behavior and known failures | Implement bgfx resources, shaders, draw lists, culling, picking and statistics |
| `tools`, `src/tools` | Source captures, CPU parity probes and package preservation tools | Port selected checks; no copied test should launch the game implicitly |
| `../_remake/PROGRESS.md` and `../_remake/docs/planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md` | Current implementation/acceptance boundaries | Recheck current evidence; do not inherit unchecked functionality as complete |

Known lessons to carry forward: camera handedness previously mirrored the world;
cloud-cap geometry did not reach the backdrop's sky-colour bands; animated vertices
kept stale normals; alpha cards need material-specific depth behavior; repeated
walking commands must not reset animation; native apron/socket failures must not
crash world entry. The current tooltip and vegetation fixes still need visual
acceptance. Current OGRE screenshots are not a performance target achieved by bgfx.

## Build and renderer contracts

Select D3D11 first. Pin bgfx/bx/bimg commits, SDL3, SQLite, shaderc, MSVC/Windows SDK
and any build wrapper. Use consistent CRT configurations for the new dependency
set; do not copy OGRE-specific release-ABI Debug workarounds by default. Bootstrap
may fetch pinned inputs; subsequent rebuilds must work offline.

| Boundary | Contract before broad implementation |
| --- | --- |
| Platform/device | SDL window initialization stays outside CPU state. One owner drives bgfx API/frame/reset/shutdown; workers queue decoded results by scene generation. |
| Resources | Typed generation-aware immutable mesh/texture/material handles retain native/archive/map identity, explicit layouts and lifetime. No Ogre objects in public interfaces. |
| Camera/picking | One source-unit conversion, documented matrix/depth/winding/texture origin, drawable pixel/DPI mapping and projection/picking round trips. |
| Actors | Source skeleton/bind/weights, shared pose/socket data, animation events and conservative bounds. Correct CPU fallback first; GPU palettes after parity checks. |
| Draw/UI | Explicit sky/world/transparent/FX/UI view order, painter-order UI, scissor and material-specific depth/alpha. Reserve shadow passes before advanced shadows. |
| Materials | Freeze linear/sRGB, UI colour, opaque/cutout/straight/premultiplied rules and normal transforms before broad assets. Keep modern PBR/HDR separate from native parity. |
| Authority | Local commands/notifications own rules and SQLite; rendering consumes state/events. Later online authority never runs a simultaneous offline writer. |
| Lifetime/limits | Define deferred upload-memory ownership, cancellation, retirement and shutdown; choose explicit texture/index/palette fallback or diagnostic rejection. |

Shader builds use pinned shaderc, backend profiles and varying layouts. Cache keys
include source/includes/defines, tool identity and target backend. Existing OGRE
HLSL/binaries are references, not bgfx programs. Follow the pinned versions of the
[API](https://bkaradzic.github.io/bgfx/bgfx.html),
[draw/thread internals](https://bkaradzic.github.io/bgfx/internals.html),
[shader tools](https://bkaradzic.github.io/bgfx/tools.html),
[examples](https://bkaradzic.github.io/bgfx/examples.html) and
[SDL3 window properties](https://wiki.libsdl.org/SDL3/SDL_GetWindowProperties).
Application scene organization, native resources, UI and gameplay stay project-owned.

## Test tooling to implement

Run commands from `_remake_bgfx`. Build/stage/bootstrap and the verified checks
and scenarios listed below are implemented. Other checkpoint names remain planned
and fail explicitly until implemented.
Build, CPU checks, seeding, preparation and staging never launch a game. Runtime
launch requires explicit `--run` under the current session's runtime authorization.
A documentation checkbox is not runtime authorization; an explicit authorized
implementation/test request may supply it without a redundant permission round.

```powershell
# Build only; implement noninteractive BAT wrappers with exit-code propagation.
.\tools\build-zflauncher.ps1 -Configuration Debug
.\tools\build-zflauncher.ps1 -Configuration Release

# CHECK is one of the named checkpoint checks below; RUN is a fresh output.
python .\tools\verify-zflauncher.py --check CHECK --output .\build\evidence\RUN

# One-time profile seed; no game launch or source mutation.
python .\tools\verify-zflauncher.py --seed-profile ..\_client\userdata --destination ..\_client_bgfx\userdata\zflauncher --output .\build\evidence\seed

# Stage only manifest-owned files into the existing final client.
.\tools\stage-zflauncher.ps1 -Configuration Release -ClientRoot ..\_client_bgfx

# Prepare a disposable test profile, then run exactly one attempt explicitly.
python .\tools\verify-zflauncher.py --scenario SCENARIO --prepare --seed-profile ..\_client_bgfx\userdata\zflauncher --output .\build\evidence\RUN
python .\tools\verify-zflauncher.py --scenario SCENARIO --run --output .\build\evidence\RUN
```

Use mutually exclusive `--check`, seed, `--prepare` and `--run` modes. Shell and
asset-scene preparation omit `--seed-profile` and create an empty disposable
profile. C03 onward explicitly select a seed. `RUN` names a fresh directory such
as `c04-mandara-YYYYMMDD-HHMMSS`. Check/scenario names below are exact runner
contracts. Implemented CPU/build checks: `baseline`, `shell-build`, `resources`,
`profile-pose`, `controls-navigation`, `offline-gameplay`, `profile-isolation`,
`package`. Implemented explicit
scenarios: `shell`, `asset-scene`, `intro-roster`, `roster-lifecycle`, `mandara-entry`,
`mandara-controls`, `basic-combat`, `saved-services`, `saved-services-reload`,
`merchant-services`. Split scenarios use separate outputs. Runtime
refuses another active launcher and stops only its own process if one appears,
retaining the interruption evidence.

Resolve and record executable/client/profile paths. Do not copy old runners'
hardcoded executable/build/log names or character values. Reuse assertions and
ordinary SDL input driving. Run mode refuses an output with an existing process
start record; retain failure logs/captures/SQLite and stop rather than retrying.
Use one process/channel per scenario; stop it before starting another scenario.

## Ordered implementation checkpoints

C00-C08 accept current offline foundation coverage. C09 retains full-client work
and repository administration. Build timing/resource counters and asset/profile
preservation start in C01. Minimum slices do not require every broad parent task;
record each deferred parent scope explicitly in the checkpoint evidence.

### C00 Pinned reuse and offline baseline

**Prerequisites:** None; local source/assets are available.

Capture source commits/selected patches/hashes, input profiles, generators and initial fixtures. Pin dependencies and interface contracts before extraction. Establish initial reader/rule/pose/profile baseline expectations; full combat/refinement coverage is not a prerequisite for the shell.

**Owned backlog tasks:**

- [x] **P00-01** Record remote URL, executable identity, requested path and scope.
- [x] **P00-05** Record the source OGRE commit plus a patch/hash inventory of reused uncommitted fixes.
- [x] **P00-06** Add dependency pins, license inventory, ownership rules and build prerequisites.
- [x] **P00-07** Adopt C++20, x64 and SDL3; select D3D11 as the first bgfx backend, others as later acceptance gates.
- [x] **P00-08** Establish phase evidence templates and an explicit list of deferred gameplay systems.
- [ ] **P01-01** Audit build/link dependencies before copying renderer-independent modules.
- [x] **P01-02** Move selected code into project-owned libraries with explicit public interfaces.
- [ ] **P01-03** Preserve original resource IDs, item-instance IDs, tribe mappings, units and rounding.
- [ ] **P01-04** Keep simulation clocks/RNG separate from render interpolation and frame rate.
- [ ] **P01-05** Preserve integer combat/refinement/skill/progression equations with golden vectors.
- [ ] **P01-06** Define structured diagnostics with resource identity, action/state, zone and profile context.
- [ ] **P01-07** Add versioned DTOs for actor state, inventory, UI, lights, audio and scene transitions.
- [ ] **P01-08** Give resources/actors generation-aware handles so stale asynchronous results cannot attach to a new scene.
- [ ] **P01-09** Separate application lifecycle from authority/session lifecycle and renderer lifecycle.
- [x] **P02-02** Pin compatible bgfx, bx and bimg revisions; pin SDL3 and SQLite separately.
- [x] **P02-03** Record how the dependency build is generated; audit any CMake wrapper as a separate dependency.
- [x] **P02-04** Provide repeatable dependency bootstrap and an offline rebuild path after bootstrap.
- [ ] **P04-05** Define render packets for static geometry, skinned actors, UI, FX, shadows and picking.
- [ ] **P12-10** Keep RNG/rounding deterministic in CPU parity tests and authoritative online.
- [ ] **P18-09** Keep crash dumps/logs out of source control and prevent credentials from entering diagnostics.
- [ ] **P20-01** Maintain a feature/parity matrix linking source, implementation, CPU evidence and runtime evidence.
- [x] **P20-10** Update progress with concrete gates and remaining limitations; keep unverified tasks unchecked.
- [x] **P20-12** Keep the OGRE fallback until the new client meets the agreed functional, visual and performance gates.

**Additional planning and minimum-slice tasks:**

- [x] **BG-DOC-01** Rewrite this plan into testable offline checkpoints with the same client/credentials and copied private profile.

**Headless check:** `--check baseline` with the runner command and a fresh output.
**Runtime scenario:** none; no game launch at this checkpoint.

- [x] **BG-C00-GATE** Manifest identifies source/dependency/input versions and initial fixture expectations. No window/network/audio is needed; C01 compiles the new targets.

### C01 Buildable shell and shared-client staging

**Prerequisites:** C00 minimum baseline and dependency pins.

Build Debug/Release shell and shaders, SDL3/bgfx D3D11, diagnostics, frame timing and resource counters. Safely stage the minimum dependency closure in the existing client; full distribution work remains C08.

**Owned backlog tasks:**

- [x] **P02-01** Add CMake targets/presets for Debug and Release x64 with MSVC and a pinned Windows SDK.
- [x] **P02-05** Produce `ZFLauncher.exe`, product metadata, the requested icon and `Tantra Online` window title.
- [ ] **P02-06** Implement SDL3 events, resize/minimize/focus, Unicode paths and clean error reporting.
- [x] **P02-07** Parse `--offline`, explicit profile/output/capture roots and renderer-selection arguments.
- [x] **P02-08** Add noninteractive build/stage BAT and PowerShell scripts with exit-code propagation.
- [x] **P02-09** Keep renderer smoke tests explicit; ordinary build commands must not launch a game.
- [x] **P04-01** Obtain SDL3's native Win32 window handle and initialize the selected bgfx backend.
- [ ] **P04-02** Define device initialization, reset, suspend/resume, failure and shutdown ownership.
- [ ] **P04-03** Add RAII wrappers and deferred destruction for textures, buffers, programs, uniforms and framebuffers.
- [ ] **P04-04** Separate worker decoding from GPU resource creation/submission ownership.
- [ ] **P04-10** Implement screenshots, resource-leak counters and recoverable renderer diagnostics.
- [ ] **P17-01** Establish named hardware, build, backend, resolution, camera, time and actor population for comparisons.
- [ ] **P17-03** Measure simulation, jobs, animation, UI, draw submission, GPU passes and present time.
- [ ] **P18-01** Retain failure context: action, actor/resource, character, zone, position/camera and backend.
- [ ] **P18-02** Handle missing/corrupt resource data, shader failures and upload exhaustion without undefined behavior.
- [x] **P19-01** Create an exact dependency closure for `ZFLauncher.exe` and its selected backend.
- [x] **P19-02** Stage shaders/runtime support under a namespaced directory such as `system/zflauncher/bgfx`.
- [x] **P19-03** Keep native `resource/` and `system/` asset paths unchanged; read HPKs in place.
- [x] **P19-04** Preserve HTLauncher, its OGRE support files and user-owned client additions.
- [x] **P19-05** Reuse a shared SDL3 DLL only when its version/ABI is intentionally compatible; otherwise isolate the launcher runtime.
- [ ] **P19-07** Build/overwrite only ZFLauncher-owned manifest entries; fail early when the destination executable is locked.
- [ ] **P19-08** Hash HPKs and existing saves before/after staging and verify relocation without hidden source-path dependency.
- [x] **P20-02** Run focused CPU/shader/package checks first; select runtime checks from changed dependencies.
- [x] **P20-03** Obtain current authorization before any game/renderer/server/audio-device launch.
- [x] **P20-08** Retain failure captures/logs and position/camera context; investigate on CPU before automatically launching again.

**Headless check:** `--check shell-build` with the runner command and a fresh output.
**Explicit runtime scenario:** `shell`; use separate prepare/run commands and separate outputs for each scenario.

- [ ] **BG-C01-GATE** Both builds produce ZFLauncher.exe and shaders. Explicit smoke reports backend/device, handles resize/minimize/focus and exits cleanly. Hash checks preserve HPKs, HTLauncher and OGRE saves.

### C02 Original assets and ordered rendering

**Prerequisites:** C01 shell build and smoke acceptance.

Port bounded HPK/catalog/asset readers and native path identity. Render one original mesh/texture; prove coordinates, normals, winding, material alpha/depth, UI painter order and DPI-aware picking before broad content.

**Owned backlog tasks:**

- [x] **P03-01** Port bounded HPK indexing and entry reads without bulk extraction.
- [x] **P03-02** Preserve the original `resource/` and `system/` folder/archive names.
- [ ] **P03-03** Resolve duplicate basenames using archive family, map and relative resource identity.
- [ ] **P03-04** Retain deterministic regular/Pop precedence; do not scan every archive on every lookup.
- [ ] **P03-05** Validate TPA/TXL profiles, section sizes, counts, IDs, opaque tails and string encodings.
- [x] **P03-06** Retain the shipped 276-byte item profile when validated; the available source declaration alone is 272 bytes.
- [ ] **P03-07** Port THM/TCC/TML/TMD/TMB/TAB readers and verify coordinates, normals, UVs and material groups.
- [ ] **P03-08** Support DDS/DXT1/2/3/4/5 and original TGA/BMP; preserve premultiplied-alpha identity and mip chains.
- [ ] **P03-09** Treat `_TGA` as useful provenance, with an explicit material policy for cutout versus actual translucency.
- [x] **P03-10** Preserve English item/NPC/monster strings from the correct parameter records.
- [x] **P03-11** Read private CFG overrides over original HTStartup/HTSpec values; default to the requested HIGH profile.
- [ ] **P03-12** Reject traversal, malformed offsets and ambiguous unqualified resource requests with useful diagnostics.
- [ ] **P04-06** Compile backend-specific shaders with shaderc and version the shader cache key.
- [ ] **P04-07** Specify vertex layouts/varyings and validate their linkage and buffer strides.
- [ ] **P04-08** Test source left-handed coordinates, winding, matrix layout, depth convention and texture origin once at the renderer boundary.
- [ ] **P04-09** Do not copy OGRE's clip-X reflection blindly; prove asymmetric left/right landmark and picking cases.
- [ ] **P05-01** Assign explicit passes for shadow, background sky, opaque/cutout world, water/translucency, FX and UI.
- [x] **P05-02** Keep UI painter ordering deterministic; define transparent sorting separately from opaque batching.
- [ ] **P05-03** Add per-widget clipping/scissor, pixel alignment, alpha blend and native texture dimensions.
- [ ] **P05-04** Port original UI SYS declarations, texture catalogs, control IDs and responsive panel anchoring.
- [ ] **P09-13** Define explicit linear/sRGB handling and a parity/modern presentation mode boundary.
- [x] **P09-14** Keep UI colour independent of scene exposure/tone mapping; prevent double gamma correction.

**Headless check:** `--check resources` with the runner command and a fresh output.
**Explicit runtime scenario:** `asset-scene`; use separate prepare/run commands and separate outputs for each scenario.

- [ ] **BG-C02-GATE** Sampled old/new bytes/IDs agree; malformed inputs fail diagnostically. Asymmetric landmarks, transparency/cutout overlap, clipped UI and projection/picking remain correct on resize. No account or Mandara world is required.

### C03 Offline account and first character preview

**Prerequisites:** C02 readers/UI primitives; selected SQLite/character modules.

Seed the private profile and connect native offline login/server/channel/roster authority. Preview one saved actor with appearance/equipment, CPU pose/sockets and source INTRO camera/sequence. Port required INTRO FX/music through minimum children; complete family coverage waits. Do not require Mandara entry here.

**Owned backlog tasks:**

- [ ] **P05-07** Cache text/glyph results by font, locale, content, colour and dimensions; avoid per-frame GDI uploads.
- [ ] **P06-01** Port boot/config/preload and source INTRO camera/map/FX/music sequence.
- [x] **P06-02** Rebuild original login, server and channel selection presentation.
- [x] **P06-03** Connect offline login/roster to the existing authority, not a renderer-only demo account.
- [ ] **P06-04** Port character selection and persisted progression/equipment preview.
- [x] **P06-05** Port creation: tribe, name, face, hair, Chakra allocation, validation and confirmation.
- [x] **P06-06** Keep the creation camera stable during face/hair/tribe changes and resource replacement.
- [x] **P06-07** Port deletion safeguards, roster refresh and failure/retry messages.
- [ ] **P06-09** Cancel or quarantine stale async uploads during selection changes or failed entry.
- [x] **P07-01** Port native skeleton names, hierarchy, bind matrices and timeline frame rules.
- [x] **P07-02** Match raw stored skin weights and native control-position behavior; no silent weight renormalization.
- [ ] **P07-03** Compute one evaluated pose per actor/frame and share it among body, face, hair and socket parts.
- [x] **P07-05** Handle variable influence counts and bone limits explicitly; never drop extra weights silently.
- [x] **P07-06** Transform normals correctly during deformation, including nonuniform transforms.
- [ ] **P07-11** Preserve authored sockets and apron animations; missing optional sockets produce bounded diagnostics.
- [x] **P07-11a** Bind native movement/attack/skill body, hair and apron clips together; verify all source attack rows/tribes/variants, selected live skill phases and head/equipment clock retention. Missing source records are logged without aliases; complete outfit/flag/visual coverage remains P07-11/P07-08.
- [ ] **P07-13** Calculate conservative animated/attachment bounds for rendering, picking and shadows.
- [x] **P11-01** Reuse SQLite character/session data through versioned adapters and schema migrations.
- [x] **P11-02** Default to `_client_bgfx/userdata/zflauncher`; explicitly seed it once from the current OGRE profile using a read-only SQLite backup and persistent companion-file copies; refuse an existing destination.
- [x] **P11-03** Keep `ashesh / ashesh` as the local test identity only; do not seed production credentials.
- [x] **P11-04** Restore level, Chakra, skills, quick slots, inventory/equipment, cargo, money and saved zone/cells.
- [ ] **P13-01** Port typed FX catalogs and authored TFX node lifetimes/attachments.
- [ ] **P13-03** Preserve native parent/socket transforms and the verified attached-model yaw correction once.
- [ ] **P18-04** Stop/cancel jobs before destroying scenes and reject late work by generation.
- [ ] **P18-06** Preserve SQLite transaction boundaries, integrity, schema backups and WAL handling.
- [x] **P18-07** Prevent simultaneous OGRE/bgfx writes to the same private database/profile.
- [x] **P19-06** Default to private `_remake_bgfx/userdata/zflauncher` outside the clean client; support `--user-data-root` and disposable acceptance profiles seeded from an explicitly identified saved roster.
- [x] **P19-09** Provide separate shortcuts identifying OGRE and bgfx builds clearly.
- [x] **P20-04** Use one offline process and one channel, `ashesh / ashesh`, with an isolated saved roster.

**Additional planning and minimum-slice tasks:**

- [x] **P07-04a** Implement and verify CPU skinning/normal fallback for first preview; full GPU parent stays open.
- [x] **P07-08a** Preview one tribe with seed face/hair/skin/equipment and sockets; all eight remain P07-08.
- [x] **P13-02a** Port represented INTRO FX node types required for login/preview with source timing; list unsupported families.
- [x] **P13-06a** Connect selected INTRO sound/music events and gains; verify actual playback separately.

**Headless check:** `--check profile-pose` with the runner command and a fresh output.
**Explicit runtime scenario:** `intro-roster`; use separate prepare/run commands and separate outputs for each scenario.

`roster-lifecycle` additionally exercises one unused slot in a copied roster,
including cancelled creation, unallocated-Chakra rejection, creation/selection,
cancelled deletion, empty-proof rejection and deletion. The runner compares
original SQLite character rows exactly after exit. The subsequent
`c03-roster-boundaries` accepts full-roster/duplicate rejection and corrected retry;
`c03-eight-previews-complete` accepts eight tribes with face/hair changes. Together
with saved-roster and pose evidence, these close the minimum C03 gate. Exhaustive
appearance/equipment combinations, LOD and return/reentry remain separate open tasks.

- [x] **BG-C03-GATE** ashesh / ashesh opens copied roster without HTTP/server. Preview matches seed appearance/equipment and pose fixtures. Fresh disposable profiles pass create/select/delete/validation/retry once in ZFLauncher. Original saves are unchanged.

### C04 Saved-roster Mandara entry

**Prerequisites:** C03 account/preview and C02 map readers/materials; movement/full HUD/NPC services are not prerequisites.

Load Mandara terrain/placements/regular+Pop objects and coherent Zone01 offline tables. Add initial source lighting/sky/fog, selected actors, loading/CHAR_INIT and essential HUD/status. CPU skinning is sufficient; advanced shadows/weather/full effects do not block entry.

**Owned backlog tasks:**

- [x] **P06-08** Preserve selection -> CHAR_INIT -> loading -> world initialization -> MainUI sequencing.
- [x] **P08-01** Load Mandara1st from its actual catalog/CFG binding, including regular and Pop object archives.
- [x] **P08-02** Preserve terrain topology, height/normal sampling, section textures and absolute detail UV phase.
- [x] **P08-03** Retain original `detail.dds` multiplication before any optional modern material treatment.
- [x] **P08-04** Submit original object placements/material groups and native transforms without a second coordinate conversion.
- [ ] **P08-05** Use immutable world buffers; share repeated meshes and compatible material state.
- [ ] **P08-06** Divide static batches spatially so culling does not force large unrelated regions to draw.
- [ ] **P08-07** Distinguish opaque, depth-writing vegetation cutout, straight-alpha and premultiplied-alpha materials.
- [ ] **P08-08** Preserve actual holes in tree/grass cards; validate depth behavior against buildings and other vegetation.
- [ ] **P08-09** Keep water/glass/fading FX translucent; no global `_TGA` override for every asset family.
- [ ] **P08-10** Add two-sided foliage rules only with verified normals/material expectations.
- [x] **P08-11** Keep map and material identity in the renderer cache; do not bind another map's duplicate texture basename.
- [ ] **P08-12** Add picking/broadphase support using the same geometry/pose as rendering.
- [ ] **P09-01** Reproduce map material overrides and original ambient/diffuse/emissive ordering first.
- [ ] **P09-02** Apply source sun, sublight and character-light configuration with correct units and directions.
- [x] **P09-04** Render a separate complete sky backdrop; do not derive gradient coverage from the low cloud mesh.
- [ ] **P09-06** Respect separate SKY fog and world fog flags; reproduce authored starts/ends/colours.
- [x] **P11-05** Connect calculated status/effects after CHAR_INIT and apply authoritative notifications.
- [x] **P20-05** Verify selection -> CHAR_INIT -> Mandara before movement/camera/NPC transactions.

**Additional planning and minimum-slice tasks:**

- [ ] **P15-02a** Load one coherent Zone01 NPCGener/GenerationArea/MapData dataset from selected staged offline data with provenance.
- [ ] **P15-03a** Preflight selected Mandara terrain/placements/population/collision companions and essential FX/audio/environment.
- [x] **P07-09a** Present selected world actor idle animation with its source equipment/weapon binding.

**Headless check:** `--check mandara-entry` with the runner command and a fresh output.
**Explicit runtime scenario:** `mandara-entry`; use separate prepare/run commands and separate outputs for each scenario.

- [ ] **BG-C04-GATE** Copied character reaches rendered Mandara at the seed zone/cells with expected stats/equipment and essential UI. Heights/placements/material identity and async cancellation pass; no duplicate actors/audio. Movement/services are not claimed yet.

### C05 Movement, camera and MainUI

**Prerequisites:** C04 initialized world; native height/navigation/collision and UI state.

Port click/keyboard run/walk, camera controls, blocked routes and action locks. Complete represented panels, status, Chakra/learning, item quick slots, focus/drag/close, cursors and saved layout. Retain the explicit missing-native-collision limitation.

**Owned backlog tasks:**

- [ ] **P05-05** Preserve source button states, shortcut dispatch, focus, close/Escape and panel dragging.
- [x] **P05-06** Persist normal positions/options in native client `resource/UI/Interface.sys`; isolate QA settings in private profiles and preserve unknown fields. Verify layout, quickbar orientation/key mode and character isolation across restart/relogin and supported village changes (`persistence-runtime3`).
- [ ] **P05-08** Apply original widget RGB and alpha, including orange NPC headings/options and white dialogue text.
- [ ] **P05-09** Add item/skill/control tooltips with topmost hit testing, native delay, wrapping and viewport clamping.
- [ ] **P05-10** Add source player/NPC/monster names with correct model-height anchors, colours and speech placement.

  Player, monster and NPC names now render at the native model-height+3,
  model-height+5 and NPC+25 anchors; NPC text is yellow. Speech placement and the
  remaining conditional player/faction/name policies keep this parent open.
- [ ] **P05-11** Port original CUR/ANI cursor files and source cursor-context priority.
- [ ] **P05-12** Recreate status, target, inventory, cargo, skill, quick-slot, minimap, chat and options panels.
- [ ] **P05-13** Track dirty widgets; unchanged inventories/names must not rerasterize or upload each frame.
- [x] **P07-10** Keep repeated movement destinations from restarting the same animation.
- [ ] **P10-01** Port source mouse/keyboard movement and run/walk/camera modes exactly.
- [ ] **P10-02** Keep click picking, pathfinding, height sampling and actor collision in native units.
- [ ] **P10-03** Reject blocked destinations; route around obstructions without teleporting through buildings.
- [ ] **P10-04** Handle narrow passages, corners, slopes, edges and moving actor obstruction.
- [ ] **P10-05** Preserve turn/facing behavior and action-locked movement requests.
- [ ] **P10-06** Implement source reset/orbit/zoom/follow and camera obstruction without abrupt clipping.
- [ ] **P10-07** Keep rendered interpolation separate from authoritative position and saved cells.
- [x] **P10-08** Record missing authored `.tbo` collision as a remaining parity limit; do not mark geometric fallback as native collision complete.
- [ ] **P10-09** Accept the ZFLauncher Mandara movement/camera route independently, then broaden route coverage; OGRE acceptance does not count as a bgfx pass.
- [ ] **P12-02** Preserve Chakra spending, skill learning and native quick-slot modes/shortcuts.

**Additional planning and minimum-slice tasks:**

- [x] **P07-09b** Accept source walk/run/sheath states and unchanged animation phase on retarget before combat.

P07-09b's represented equipment acceptance is sword4001 in separate safe/hostile
SDL runs, including walking and running. Other weapon/body socket compatibility,
full equipment/LOD matrices and ranged/skill semantics remain under P07-08/C07
and C09; this does not close BG-C05-GATE's zoom/layout/obstruction requirements.

**Headless check:** `--check controls-navigation` with the runner command and a fresh output.
**Explicit runtime scenario:** `mandara-controls`; use separate prepare/run commands and separate outputs for each scenario.

- [ ] **BG-C05-GATE** Real SDL input moves without teleporting, rejects blocked destinations and preserves animation phase on retarget. Reset/orbit/zoom and town-route framing are usable. UI hit order, copied quick slots and layout/state survive reload.

### C06 Ordinary services and basic offline combat

**Prerequisites:** C05 usable movement/targeting/panels and disposable seeded profile.

Port inventory/equipment/ordinary consumables, shops/repair/warehouse/save points and represented basic melee/progression. Use authoritative prices/counts/slots/revisions and source RNG/rounding. Derive routes from selected current NPC placement/map data.

**Owned backlog tasks:**

- [ ] **P07-12** Keep action animation locks, impact times, facing, blend completion and loop rules source-backed.
- [ ] **P11-06** Preserve native inventory/equipment placement, stacking, splitting, occupied-slot and consumable actions.
- [ ] **P11-07** Show actual item-instance state in tooltips: refinement, durability, effects, limits, count and service context.
- [x] **P11-08** Wire merchant dialogue and buy/sell confirmations with authoritative prices/counts/revisions.
- [x] **P11-09** Wire repair, warehouse item/Rupiah movement and save-point confirmation/persistence.
- [x] **P11-10** Handle stale requests, insufficient money/capacity and invalid selections without client-side optimistic divergence.
- [x] **P11-12** Verify database before/after state and normal-profile hashes after one isolated acceptance run.
- [ ] **P12-01** Port target selection/selection arrow, approach, attack range and facing.
- [ ] **P12-04** Maintain action locks without freezing simulation/input pumping.
- [x] **P20-06** Accept warehouse/save-point/persistence in ZFLauncher after its own initial creation/deletion checks; omit repeated matrices only when that ZFLauncher path already passed and its dependencies are unchanged.
- [x] **P20-09** Verify SQLite counts, money, revisions and saved cells after exit; compare normal-profile hashes.

**Additional planning and minimum-slice tasks:**

- [ ] **P12-05a** Accept represented basic melee hit/miss/critical/block and impact feedback under pinned source rules.
- [ ] **P12-06a** Port baseline encounter idle/move/chase/attack/hurt/death; retain complete AI/respawn gaps.
- [ ] **P12-07a** Accept baseline encounter routing/leash/facing with authoritative ranges; full native AI remains open.
- [x] **P12-08a** Apply represented basic rewards/progression/persistence; full loot/pickup/penalties remain P12-08.
- [x] **P13-06b** Wire selected basic attack/impact sound/FX; complete event/family coverage remains P13-06.
- [x] **P11-13a** Verify all four Chakra allocations through native UI frames, SQLite and fresh login/CHAR_INIT; retain source base/bonus semantics.
- [x] **P12-01b** Replace a ground route immediately on attack and replan the represented moving-target approach; keep full AI routing acceptance open.
- [x] **P12-03a** Cast represented learned active skills through quick slots, source phase/TAB timing, HP/TP costs and native damage equations; accept eight CPU tribe fixtures and one SDL skill/FX fixture.

**Headless check:** `--check offline-gameplay` with the runner command and a fresh output.
**Explicit runtime scenarios:** `saved-services` and `basic-combat`; use separate prepare/run commands and separate outputs for each scenario.

`basic-combat` now drives native E/R targeting, approach and attack until an actual
encounter outcome. The verified seed defeated monster2001 and persisted the HP,
Prana and cell reported by the authority. The separate `c06-death` run uses an
explicit controlled QA profile: source-created character, HP1 beside an actual
hostile, and a native town save cell. Real combat opens the source death dialog;
R/Space/Enter/Escape cannot bypass it. Mouse confirmation restores the saved cell
and native 20% HP/TP (10/6), persisted to SQLite. Imported/default saves are never
edited to force an outcome.
`c06-death-presentation` additionally waits for the source-selected death
animation to finish once and hold its final pose, verifies the zero HP label,
then accepts revival. The captured death pose/HUD were visually inspected.

`saved-services` now accepts the explicitly recorded
`_remake/build-ogre-sdl/gameplay-expansion-runtime-20261023/userdata` checkpoint via
a disposable seed. It does not edit the source/default profile. The native route
and NPC interaction moved the original item from inventory0 through cargo119 to
inventory20 with identical instance fields, deposited250/withdrew100 Rupiah, and
saved current cell [486,173]. Total money was conserved and cargo revision2 became6.
`saved-services-reload` then used that result as a new immutable seed, logged in
in a separate process and compared the complete authoritative character/cargo
payloads to SQLite bytes. Both protected clients and each source seed were unchanged.

The accepted C06 evidence is `c06-saved-services-hud-picking`,
`c06-services-reload` and `c06-services-cpu`. The first services attempt failed on
a HUD-covered NPC pick and is retained. Picking now obeys visible LOD/depth and
the input driver's HUD exclusions. Nine Python safety tests cover immutable
inspection, Unicode URI characters, pending WAL, legacy cargo absence and seeding.
Full combat feedback and gameplay remain open beyond the minimum C06 slice.

`merchant-services` now follows the native route to Vartan, rejects an ineligible
consumable repair and an unneeded full-durability weapon repair without charge,
buys native item4002 for225 Rupiah and sells it for37. Exact prices are independently
checked against the staged source `Item.tsv`; inventory instance fields, cargo
and the other character are preserved. The accepted result is
`c06-merchant-native-eligibility`, followed by the separate full-byte reload
`c06-merchant-reload`.

The earlier `c06-merchant-services` run is superseded, not current acceptance: it
exposed the omitted native client item-family repair filter. The authority now
uses source-generated family predicates and the exact native NPC/zone exceptions;
the source hashes are in `docs/evidence/repair-source.json`. CPU regression checks
exercise rejected consumables/refinement/collectibles, merchant-family mismatches,
native exceptions and actual paid repair. `c06-paid-repair` now verifies ordinary
Vartan input against a newly generated disposable profile: native starter weapon
durability0 becomes4500 for15 Rupiah. Buy225/sell37 produces money99797 from100000.
`c06-no-money` rejects repair/purchase without changing money or inventory;
`c06-full-inventory` rejects purchase and charges only the eligible repair.
All three verify quantity/confirmation cancellation and ineligible repair
rejection with complete native-record, cargo and other-character comparisons.
Controlled fixture values and generator hashes are recorded independently of
imported checkpoints. Normal/default saves were never edited to force a case.
`c06-paid-repair-reload` logs in through a separate process and restores the paid
repair result's complete native character and cargo bytes exactly.

Repair also follows the native displayed-durability check in
`HTItemSystem.cpp:3726-3748` before the server price formula:4410/4500 displays45/45
and requires no repair. This source file is included in the repair provenance
manifest and the rounded-full case is covered by the authority CPU checks.
`c06-merchant-final` verifies the staged build after this final rounding change.

- [x] **BG-C06-GATE** Buy/sell/repair and item/Rupiah deposit/withdraw conserve state; save-point and current/saved cells survive exit/reload. Basic encounter applies hit/death and represented rewards. Failure/stale/capacity paths and source hashes pass. Full active skills/AI/loot remain open.

### C07 Current OGRE foundation coverage

**Prerequisites:** C06 basic gameplay; broaden independently verified slices.

Complete represented tribes, equipment/weapon states, native model LOD, names/tooltips, environment/time/shadow baseline, selected TFX/audio and live options. Accept return/retry cleanup; record unsupported semantics. Retain full feature gaps in C09.

Facing/text correction evidence: `c05-facing-english-native-pick` accepts left/right
SDL ground movement, heading alignment, English target text and overhead names;
`c03-intro-native-facing` accepts the corrected intro roster/gate view;
`c06-english-monster-target` accepts actual Vasabhum combat targeting and native
death/revival with the English display table. An earlier facing test used the
hostile-only E shortcut in a town save with no nearby hostile; its failed output
is retained in `c05-facing-english-names`. The corrected test triangle-picks a
visible source actor instead. Every accepted run preserves source/default profiles.

`tools/generate-english-text.py` selects case-insensitive `philippine_szName`,
`philippine_szDescription`, `philippine_szText` and other Philippine text headers
by worksheet and ID, respecting sparse SpreadsheetML cells and first duplicate
identity. It preserves empty English cells and authored placeholders instead of
substituting another language. Defaults are `GenesisK3-XMLs/TantraParam.xml` and
`GenesisK3-XMLs/XMLS-XLS/HTMessage.xml`; CMake exposes their source paths explicitly.
Generated UTF-8 text and source hashes live in the namespaced owned package;
existing legacy byte strings keep their code pages. No original TPA/TXL/XML file
is rewritten. Names/messages consume the English fields by default; other text
fields, including item names/descriptions, retain their source identity in the
same display catalog.

`facing-english-verified-cpu.log` records six rebuilt focused checks, including
eight-direction native facing, English extraction/reading, native message and
resource readers, creation resources and normal transforms.
`facing-english-python.log` records 14 passing safety/import tests.
`facing-english-builds`, `facing-english-package`,
`facing-english-source-preservation` and `facing-english-source-inputs.json`
record current Debug/Release, 16 owned package files, unchanged pinned originals
and both unchanged English XML inputs. Earlier frame-time samples predate this
name layer and are historical; current same-quality performance remains open.

**Owned backlog tasks:**

- [ ] **P06-10** Reenter INTRO after disconnect without duplicate windows, sounds, actors or scene ownership.
- [ ] **P07-08** Port all eight playable tribes and source face/hair/skin/equipment bindings.
- [ ] **P07-09** Preserve weapon-type-specific idle, move, walk, attack, skill and sheath states.
- [x] **P09-03** Keep original source timing/interpolation for morning, noon, evening and night.
- [x] **P09-05** Port original cloud masks, scrolling, colour/alpha, stars, sun/moon and flare occlusion.
- [x] **P09-07** Keep horizon models and fog transitions consistent with the active map and time.
- [x] **P09-08** Implement depth-comparison directional shadows with alpha-aware casters and stable projection.
- [ ] **P09-09** Tune contact sharpness, filter radius, slope/normal bias and fade; guard against acne, detached shadows and swimming.
- [ ] **P09-15** Compare the Kathana screenshots at matching time, camera, aspect ratio and asset identity.
- [ ] **P13-02** Preserve model, animation, sprite, particle, ribbon/trail and local-light nodes.
- [ ] **P13-04** Match billboard modes, blend factors, UV animation, colour/size curves and depth rules.
- [ ] **P13-06** Support field day/night FX and actor impact/attack/skill audio events.
- [ ] **P13-07** Route map music and safe/hostile-area changes from original tables/source logic.
- [x] **P13-08** Apply live effects/music gains to existing and future voices and persist native option values. Independent miniaudio category gains and restored live playback pass options and six-process persistence checks.
- [ ] **P13-09** Handle audio device failure as recoverable; prevent duplicate music on transition/retry.
- [ ] **P13-10** Record unsupported FX node semantics instead of silently skipping visible content.
- [x] **P13-02b** Bind the 55 authored Mandara field FX placements and accept representative native portals, altar and water graphs independently in bgfx.
- [x] **P13-03b** Present native selected-target and terrain-conforming ground indicators with preserved UVs and sampled terrain/object-floor heights.
- [x] **P13-07a** Verify Mandara safe/field BGM playback and source day/night sound-region selection; full travel/options/device recovery remain open.
- [x] **P13-10a** Report missing authored FX IDs/resources explicitly, including canonical missing skill binding1000386; preserve absent INTRO TMB handling.
- [ ] **P20-07** Capture matched reference views for sky, fog, foliage, character material and shadow edges.

**Additional planning and minimum-slice tasks:**

- [ ] **BG-LOD-01** Port HtModelLod distance bands, _L1-_L4 selection, TooFar and missing-detail fallback; verify attachments/picking/shadows through transitions.

**Headless check:** `--check foundation-coverage` with the runner command and a fresh output.
**Explicit runtime scenario:** `foundation-views`; use separate prepare/run commands and separate outputs for each scenario.

Implemented narrower scenarios are `preview-matrix`, `roster-boundaries` and
`shadows`; the complete `foundation-views` matrix remains planned. All eight
previews rendered source face/hair replacements and cancellation preserved the
original character rows. The controlled full-roster profile rejected creation,
empty delete proof and a duplicate name, then accepted `ZfRetry` in slot 2 while
preserving slots 0/1. An initial eight-preview attempt timed out during the final
camera transition; the corrected bounded budget passed. Both outputs remain.

`zf_normal_transforms` checks inverse-transpose tangent orthogonality under
nonuniform scale, shear, reflection, rotation and native .001 scale, rejects
singular transforms, and checks every source Tiger/Asura submesh at four poses.
Deformation retains authored normals and raw skin weights. Singular deformation
retains the last valid normals with a bounded warning; singular world transforms
are unlit. GPU skinning remains open.

`c07-directional-shadows-final` captures player-casting on/off/restored at the
same game time. Disabling the player removes 1356 caster triangles and changes
2635 pixels; restoring it reproduces the original image exactly. The shader
retains cutout alpha tests and excludes blended FX; slope bias, edge fade and
texel snapping are implemented. Broad foliage/camera/motion comparisons and
bias tuning remain P09-09/P20-07. An earlier test incorrectly compared total
scene counts across moving-actor frames; its failed attempt is retained.
`c07-shadow-profile-options` also verifies the existing render-profile flag:
disabled submits no shadow depth geometry and enabled restores the caster count.
Its player on/off/restored images remain exactly reversible.

- [ ] **BG-C07-GATE** Matrix groups 01-06 and represented 07/12 portions have independent bgfx evidence. Cover eight previews, LOD/fallback transitions, matched environment/foliage/character/shadow views and actual selected audio. List broader native/OGRE gaps explicitly.

### C08 Performance, recovery and full package

**Prerequisites:** C07 foundation coverage; instrumentation/preservation already active since C01.

Refine immutable caches, upload budgets, GPU skinning and pooling against CPU parity. Verify repeated scene retirement, corrupt/missing inputs, renderer recovery, SQLite migration safety and relocatable dependency closure. Modern enhancements never substitute for parity.

**Owned backlog tasks:**

- [ ] **P07-04** Implement GPU skinning with a tested palette layout and a correct CPU fallback.
- [ ] **P07-07** Keep UV/index/bind data immutable; update only pose/instance data during ordinary animation.
- [ ] **P13-05** Pool emitters/buffers and bound spawns/uploads without changing authored effect timing.
- [ ] **P17-02** Measure cold/warm startup, INTRO, CHAR_INIT/Mandara readiness and transition stalls separately.
- [x] **P17-02a** Establish fresh-process native town/dense-field/skill CPU/GPU and destination-loading baselines with raw timings, two trials, hardware/input hashes and captures (`world-profile-matrix1`); disk-cold startup and other maps remain P17-02.
- [ ] **P17-04** Cache immutable archive indexes, decoded metadata, meshes, textures and bound animation resources.
- [ ] **P17-05** Use a derived cache keyed by payload hash, reader/schema version, shader version and target backend.
- [ ] **P17-06** Decode/read on workers and budget GPU uploads so SDL events/loading animation remain responsive.
- [ ] **P17-07** Prioritize player/ground/essential UI before distant actors or optional FX.
- [ ] **P17-08** Use spatial culling and material/mesh-compatible instancing; retain transparent sort boundaries.
- [ ] **P17-09** Skip invisible visual work conservatively while clocks, simulation, sockets and shadow requirements remain correct.
- [ ] **P17-10** Reuse per-frame memory; avoid heap-heavy map/string lookup and redundant constant updates per draw.
- [x] **P17-11** Cache or sample resource counters; do not rescan every texture/buffer manager per frame.
- [ ] **P17-12** Bound GPU/CPU/IO memory, queue depth and resource retirement across repeated transitions.
- [ ] **P17-13** Compare equal-quality builds; do not claim improvement from reduced shadows/visibility/animation/texture quality.
- [ ] **P17-14** Define provisional acceptance of sustained 60 FPS at the agreed test resolution on named hardware, then refine from measured baselines.
- [x] **P17-15** Report median/p95/p99 frame intervals and worst stalls alongside scoped CPU/GPU timings. The six measured native scene trials retain raw samples; no 500-1,000 FPS guarantee or broad performance acceptance is claimed.
- [ ] **P18-03** Exercise repeated resize/minimize/focus loss and renderer-reset paths explicitly.
- [ ] **P18-05** Retire GPU handles only after their use is complete; verify shutdown ordering and leaks.
- [ ] **P18-08** Check selection/retry/return paths for missing sockets, stale render state and duplicate actors/audio.
- [ ] **P19-10** Retain license notices and omit SDK source/build caches, secrets and unused canonical payloads from the client package.

**Headless check:** `--check performance-package` with the runner command and a fresh output.
**Explicit runtime scenario:** `lifecycle-performance`; use separate prepare/run commands and separate outputs for each scenario.

The implemented narrower `performance` scenario samples 240 stationary frames
after settling, including complete application-frame median/p95/p99, valid
delayed GPU timing, selected GPU PCI identity, draw calls and shadow quality.
`c08-idle-frame-sample` records 1024x768, median 9.4455ms, p95 10.6836ms,
p99 11.4916 ms and GPU median 2.22758ms on the selected NVIDIA GPU
(vendor4318/device10401, RTX4050 Laptop in the local hardware inventory).
The machine has an i7-12650H and about 32GB RAM. This short stationary sample is
not a sustained FPS, matched OGRE quality or loading/recovery acceptance.
The preceding `c08-frame-sample-final` process overlapped a Debug build and is
retained as instrumentation evidence, excluded from the idle baseline.
Frame-stat bitmap updates reuse the unchanged quad; sampled counters replace
per-frame resource-manager scans. GPU memory budgets and full lifetime accounting
remain open. Final Debug/Release and four-shader package checks are
`proceed-accepted-builds`/`proceed-accepted-package`; `proceed-accepted-source-preservation`
checks 379 original files, nine initial inputs and six repair-source inputs.
`c08-renderer-reinitialization` passes resize/minimize/restore and three
shutdown/reinitialize/resource-submission cycles in one process. Every uniform,
shader, depth and framebuffer handle is invalidated after shutdown; scene,
lighting and resource caches are cleared before reuse. Full world/device-loss,
focus/DPI and leak/recovery matrices remain open.

- [ ] **BG-C08-GATE** Named hardware/scene/quality has median/p95/p99, stalls, loading and memory evidence. Provisional sustained 60 FPS target uses recorded resolution; it is not a claimed result. Debug/Release, relocation and repeated lifecycle checks preserve assets/saves. C09 claims remain open.

### C09 Remaining systems and repository administration

**Prerequisites:** C00-C08 is the first offline milestone; independent preflight/admin work can happen earlier without blocking it.

Retain full skills/periodic combat/AI/loot, quests/refinement, travel/revival, online/social/competitive and ten-zone work as separate gates. Keep advanced cascades/water/weather distinct from represented environment. Repository registration preserves fetched history; commit/push only when requested.

**Owned backlog tasks:**

- [ ] **P00-02** Finish authenticated checkout of existing remote `main`; preserve its history.
- [ ] **P00-03** Register `_remake_bgfx` in the migrated parent's `.gitmodules` and index as a real submodule.
- [ ] **P00-04** Document the requested-path/canonical-checkout relationship and designated edit/commit path without moving unrelated dirty trees; linked worktrees do not share uncommitted changes.
- [ ] **P09-10** Add cascades only after the first shadow path is correct; validate seams and near/far coverage.
- [ ] **P09-11** Port authored water/Env_Water transforms, textures, animation and blend rules.
- [ ] **P09-12** Add weather and visibility/dynamic map loading only where configuration/resource evidence exists.
- [ ] **P11-11** Track remaining religion/class/transport/quest/refinement services separately from ordinary NPC dialogue.
- [ ] **P12-03** Use source skill ready/cast/apply timing, target/range/area and resource identifiers.
- [ ] **P12-05** Port melee, active skills, periodic effects, miss/critical/block and combat feedback.
- [ ] **P12-06** Implement source-backed monster idle/walk/chase/attack/hurt/death/respawn behavior.
- [ ] **P12-07** Preserve monster navigation, aggression/leash rules and owner-facing during attacks.
- [ ] **P12-08** Apply loot/rewards, pickup, Prana/experience/leveling and native penalties through authority.
- [ ] **P12-09** Preserve death UI and source resurrection services; no temporary R-key substitute.
- [ ] **P14-01** Audit `_server_cpp\include\tantra\wire.h` and current local C++ service implementations; compare the migrated `_server` version explicitly before reusing a protocol.
- [ ] **P14-02** Document supported messages versus placeholders; port existing working adapters, not empty callbacks.
- [ ] **P14-03** Keep localhost/127.0.0.1 defaults; do not import historical source IPs.
- [ ] **P14-04** Implement authentication/session/roster/world-entry transport with bounded frames and timeouts.
- [ ] **P14-05** Define movement/combat/inventory/NPC command/notification ownership and revision rules.
- [ ] **P14-06** Keep client prediction/interpolation distinct from authoritative calculations and persistence.
- [ ] **P14-07** Prevent the offline authority from mutating online sessions in parallel.
- [ ] **P14-08** Handle disconnect, cancellation, reconnect, stale notifications and failed handoff without duplication.
- [ ] **P14-09** Reuse the existing native Win32 server manager and per-zone processes/configuration; do not rewrite the manager inside ZFLauncher.
- [ ] **P14-10** Gate claims of multiplayer support on actual two-client/server transactions with evidence.
- [ ] **P15-01** Generate a versioned map/zone manifest from original catalogs and server profiles.
- [ ] **P15-02** For each zone, keep `NPCGener.txt`, `GenerationArea.idx` and `MapData.tcm` from one selected source dataset.
- [ ] **P15-03** Preflight regular/Pop meshes/textures, terrain, collision companions, FX, actors, audio and environment configuration.
- [ ] **P15-04** Report missing assets without silently borrowing another zone's payload.
- [ ] **P15-05** Match map origin, units, native spawn/save/portal cells and terrain height.
- [ ] **P15-06** Implement correct resource retirement and bounded preloading for map transitions.
- [ ] **P15-07** Match active server routing to the destination map and reject unsupported zones honestly.
- [ ] **P15-08** Remove Zone01-only authority restrictions only after the destination's server logic/data are ready.
- [ ] **P15-09** Use the same per-zone checks: entry, movement, NPCs, environment, audio, return and saved-zone persistence.
- [ ] **P15-10** Keep all ten acceptance toggles unchecked until their individual evidence exists.
- [ ] **P16-01** Audit native quest state, dialogue conditions, kill/item objectives and rewards.
- [ ] **P16-02** Implement advanced NPC callbacks, class/religion changes and refinement workflows.
- [ ] **P16-03** Preserve authoritative main/sub-refinement chances, costs, limits and result handling.
- [ ] **P16-04** Add portals/transport, return items and remaining resurrection paths/penalties.
- [ ] **P16-05** Implement chat channels/whispers, parties and authoritative membership state.
- [ ] **P16-06** Implement trade offer/confirm/cancel/disconnect behavior and atomic item/money persistence.
- [ ] **P16-07** Implement guild state, member names/marks and permissions before enabling dependent UI.
- [ ] **P16-08** Audit PvP, duels, events, siege/competitive modes and their native restrictions.
- [ ] **P16-09** Mark unsupported online commands visibly and avoid sending guessed legacy packets.
- [ ] **P16-10** Require explicit server implementation/evidence for each feature, not just client buttons.
- [ ] **P20-11** When separately requested, commit/push the module first and then update/push the parent's pinned gitlink.

**Additional planning and minimum-slice tasks:**

- [ ] **BG-ONLINE-01** Accept a real localhost client/server session before claiming transport support.
- [ ] **BG-MULTI-01** Accept actual two-client authoritative transactions before claiming multiplayer support.

**Headless check:** `--check full-client-preflight` with the runner command and a fresh output.
**Explicit runtime scenarios:** `online-session`, `two-client` and `zone-transition`, each implemented when its feature prerequisites are ready. Use separate prepare/run commands and outputs for each scenario.

- [ ] **BG-C09-GATE** Every claimed feature has source/authority/CPU/runtime evidence. Single-client transport differs from multiplayer acceptance. Each zone separately passes resources, authority and transition/persistence; profiles alone never pass.

## Remaining feature and zone acceptance

C09 is independent feature gates, not one unbounded test command. The headless
`full-client-preflight` check inventories source coverage/capabilities. Implement
runtime scenarios alongside each feature using isolated profiles/sessions. The
paused dedicated server goal is not resumed by this plan.

| Delivery | Prerequisites and completion |
| --- | --- |
| Complete combat/skills/AI | C06 basics; P12 parents accept direct/timed skills, periodic effects, targeting/locks, full AI lifecycle, loot/rewards and native death/revival. |
| Quests/advanced services/refinement | Inventory/authority; P16-01 through P16-03 accept success/failure/repeat/persistence and deterministic rules. |
| Travel and revival | Destination readiness; P16-04/P12-09 accept cancellation/handoff, return items, native penalties/recovery and persistence. |
| Local online | P14-01 through P14-09/BG-ONLINE-01 accept real transport, bounded frames, ownership/notifications/reconnect and persistence; offline authority is inactive online. |
| Multiplayer/social | Local online plus P14-10/BG-MULTI-01; P16-05 through P16-10 accept two-client chat/party/trade/guild/competitive workflows and atomic transactions. |
| Complete environment | C07 baseline; P09-10 through P09-12 and remaining P13 semantics accept source-backed cascades/water/weather/FX without changing parity mode. |
| Ten independent zones | P15 parents accept each actual dataset, resources, population, units, loading, authority/routing, return and persistence. |
| Repository handoff | P00-02 through P00-04 preserve remote history/document worktrees; P20-11 commits/pushes module then parent gitlink only when requested. |

Regenerate these reference bindings from chosen ClientRes.txl and local C++
profiles with source hashes. Use localhost defaults; initial ports 3001-3010 are
subject to actual TOML. Ten profiles do not establish ten world authorities. Keep
regular/Pop packs and each zone's coherent spawn/grid/collision data together.

| Zone | Client map ID | Native CFG | Original map folder | bgfx accepted |
| --- | --- | --- | --- | --- |
| Zone01 | 40001 | `MAP_Mandara1st.cfg` | `resource/map/Mandara1st` | [ ] |
| Zone02 | 40002 | `Map_Mandara2nd.cfg` | `resource/map/Mandara2nd` | [ ] |
| Zone03 | 40003 | `MAP_MandaraCave.cfg` | `resource/map/MandaraCave` | [ ] |
| Zone04 | 40004 | `MAP_MandaraCave2nd.cfg` | `resource/map/MandaraCave2nd` | [ ] |
| Zone05 | 40005 | `MAP_MandaraCave3rd.cfg` | `resource/map/MandaraCave3rd` | [ ] |
| Zone06 | 40006 | `MAP_MandaraCave4th.cfg` | `resource/map/MandaraCave4th` | [ ] |
| Zone07 | 40007 | `MAP_Jina1st.cfg` | `resource/map/Jina1st` | [ ] |
| Zone08 | 40008 | `MAP_Jina2nd.cfg` | `resource/map/Jina2nd` | [ ] |
| Zone09 | 40009 | `MAP_Jina3rd.cfg` | `resource/map/Jina3rd` | [ ] |
| Zone10 | 40010 | `MAP_NewKruma.cfg` | `resource/map/Jina4th` | [ ] |

Zone10's actual catalog binding is important: do not substitute `MAP_Jina4th.cfg`
for `MAP_NewKruma.cfg` merely because their folder names look related. Zones 18/19
are existing separate Mandara aliases and are not extra copies of this initial ten-zone scope.

Record three independent results per zone: client resources, server authority,
and transition/persistence. Check the combined acceptance only after all three
pass. Retain Zone01-only restrictions until destination logic/data are ready.

## Acceptance records and completion definitions

Record task ID, source commit/selected patch hashes, implementation commit or
working-tree hash, exact command, executable/shader/dependency hashes, client and
profile seed, artifact/log paths, observed result, remaining limits and date.
Screenshots belong to their executable/profile hashes. Keep bulky machine-local
captures outside Git and retain compact evidence manifests.

Compare source/OGRE profile hashes before/after seed, staging and runtime,
excluding only the explicitly owned nested ZFLauncher destination. Inspect SQLite
integrity, roster, counts, money, cargo revision and current/saved cells. Follow
the actual schema; do not invent a character revision column. Run initial
creation/deletion acceptance on this backend before narrowing later regressions
to unchanged, previously accepted ZFLauncher paths.

Current implementation status is **in progress**, with independently accepted
offline slices recorded above. Complete C00-C08 acceptance means comparable
scoped offline foundations, not complete client delivery.

- [ ] **BG-FOUNDATION-GATE** C00-C08 minimum gates pass: same assets/credentials,
  copied roster and independent INTRO/character/world/UI/movement/service/basic
  combat/presentation evidence; OGRE installation/profile is preserved.
- [ ] **BG-FULL-GATE** All claimed remaining features and ten zones pass their own
  authority/visual/persistence/stability/package gates; unchecked limits stay
  explicit and original assets/fallback are preserved.

### Original full-completion requirements retained

- [ ] All claimed native lifecycle/gameplay/UI features have source-backed behavior and evidence.
- [ ] All ten supported zones have correct independent datasets, resource bindings and persistence.
- [ ] Original assets remain canonical; HPKs and native folder structure are retained.
- [ ] Rendering has accepted coordinates, animation, alpha/depth, lighting, sky/fog, shadows and FX.
- [ ] Same-quality performance/stability meet the measured agreed hardware budget.
- [ ] Offline and supported online authority behavior agree with the pinned rules/protocol.
- [ ] Final ZFLauncher packaging preserves the other client executable and user data.
- [ ] Known deviations and unsupported features are explicit; no unchecked task is silently declared complete.

