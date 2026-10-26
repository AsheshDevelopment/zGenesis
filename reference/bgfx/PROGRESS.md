# ZFLauncher bgfx progress and continuation

Updated: 2026-10-27. Status: **C05 offline checkpoint accepted and staged; full plan incomplete**.

## C05 movement, camera and MainUI (2026-10-27)

The user resumed this phase explicitly. New implementation covers:

- Native CUR/ANI assets and represented context priority using the Windows
  decoder, with missing files recorded rather than extracted or substituted.
- Item, skill and enabled control tooltips: source 200ms delay, topmost hit,
  wrapped 35-line bound and viewport clamp. Item text reads live instance
  durability/refinement/count. Skill name/description follows
  HTEngineHandler -> FXPCResMgr -> `resource/fx/fxPC.txl` type1; numeric TPA
  PCSkill records do not contain that text.
- Widget foreground/shadow RGB and alpha, including native orange NPC options.
  The source shadow colour is now retained in the captured UI graph.
- A process-local bounded 512-entry/16MiB raster payload cache, keyed by text,
  locale/font, dimensions, alignment, wrapping, alpha and colours. Identical
  UI bitmaps skip GPU replacement. Existing inventory/name dirty checks remain.
  No new FPS or profiling gain is claimed.
- Native karma/attacker/castle-clan name colours, invisible-name suppression,
  original name/speech anchors, five-second speech lifetime and DBCS-safe
 55-byte truncation at the source 60-byte threshold.
- Camera obstruction retracts immediately and recovers outward smoothly.
  Re-entry resets the source heading. Shared camera code defaults to native 150;
  ZFLauncher explicitly selects the requested 450-unit extended zoom maximum.
  F11 remains the source's optional broadcast-camera mode.

C05 is accepted: 20/20 tasks and its minimum gate. Evidence/hashes are in
`build/evidence/C05_ACCEPTANCE.json`. Debug/Release each pass ten focused checks;
final font-mode changes separately pass all three affected tests/configuration.
The UI probe passes 287 checks/configuration, including 14 native cursor assets
and 120 unchanged bitmap submissions with no upload. Actual SDL town blocked
click, field E/R retarget and63 hotkey checks pass. Six fresh-process
restart/relogin/character/village legs pass. Protected/default/seed data remain
unchanged. Final package closure passes 52 owned files. The staged Release is
`424366845a5b77eea75238e29c38cc8faa3365ca4728f875ead089c38879d9df`.

Visual review corrected a new font-shadow mismatch: normal labels always use
the source's black right/down passes; declared coloured shadows apply only to
the appropriate bold/outline/shadow modes. Window titles use native border mode.

Retain the explicit missing authored `.tbo` collision limitation; current routes
use the represented cell/TCC/geometric fallback. Presenters consume const native
positions/cells and interpolate meshes independently; online replication is C09.
No FPS gain, whole-game or exact native visual-parity completion is implied.

## Deferred strike-service work (2026-10-27)

The previous source changes remain in the worktree. Release CPU regression
passes five source-rule cases and eight encounters for 3026/3012/3109; full
3033/3107 still need target/combo services. New GPU attempt
`c05-strike-render1` records missing binding1000106 and fails acceptance on
`WorldSkillImpact/4: Unsupported TFX node type7`. That broader skill-FX work is
not accepted by C05 and is not expanded here. No asset alias or authored data
patch was added. Current Debug/Release skill-cast/ordinary-bonus CPU checks are
included in the focused regression, without a complete-skill claim.

The old staged ordinary-attack hash was
`c746e15bdd9876a9292c12a85186e0967fe879036ca9d0263e37a9ab49df7e7a`;
new C05 staging/acceptance is recorded above. Source remains
uncommitted. Broader skill/state/AI/map/visual/performance/release work and all
five continuation objectives remain open.

## Native ordinary attacks and first TAB attack annotation (2026-10-27)

- [x] Reproduce ordinary attacks bypassing the native damage calculation and leaving skill 3059's 40% next-attack bonus active (`attack-bonus-repro3.log`). Bind the equipped item's native skill type, combat phases and costs into the status adapter. Ordinary attacks now share the source cost/CalDamage/CastInstant1 transaction with active skills. Melee commits at the authored marker; released ordinary arrows commit on arrival, including after Escape. A same-frame earlier incoming hit updates the live mob before cost validation. No hit/critical deck or native damage/cost record is changed.
- [x] Verify exact damage payloads for all 12 supplied weapon types: the first attack adds the native physical percentage, leaves all other lanes intact and clears the bonus; the second cannot reuse it. Validation with an active bonus and rejected dead/missing-arrow requests preserve the bonus, output and resources. Twelve bare-hand/sword/bow encounters cover .001/.05-second ticks and Escape before melee impact/after arrow release; a separate authored elite encounter obtains a natural miss without replacing RNG/cards. The final attack suite has 15,474 checks per configuration (`attack-bonus-first-marker-cpu-release1.log`, `attack-bonus-first-marker-cpu-debug1.log`). No ordinary dart item (animation 910) exists in the supplied catalog; record it in `MISSING_WEAPONS.tsv` without an alias or resource search.
- [x] Correct the timing loader's rejection of Srbinda's two adjacent attack tags (`attack-bonus-release3.log`). The pinned original `HT3DHeaven.dll` loader at RVA2DDB1 stores the first attack/Attack substring before the final key; Start/ChangeAnimation cache one index, and the state query has a consumed flag. `native-first-attack-marker.json` records four verified disassembly blocks; the DLL is inspected, never executed or shipped. The loader now uses key18 at .805051 seconds and ignores key19 at .808081 seconds. The Tiger marker, 36 PC attack clips and rejection of a clip without a marker also pass in Release/Debug. This closes that duplicate-annotation rejection; native MultipleStrike services remain separate unfinished work.
- [x] Replace the world-gameplay regression's injected damage snapshot with the actual starter weapon and live native session. Check every target HP change against emitted impacts, native reward/drop, death and revival. The 13-test Release/Debug status/equipment/skill/effect/projectile/navigation matrices pass (`attack-bonus-cpu-release-final1.log`, `attack-bonus-cpu-debug-final1.log`), taking 49.14/694.22 seconds. Those matrices preceded the marker correction; the two affected marker/bonus gates pass separately afterwards. Unchanged navigation is not repeated for the annotation-only change.
- [x] Rebuild/stage the final Release and pass actual SDL combat/UI/audio/Prana/drop checks (`attack-bonus-sdl-combat2`): two player impacts, two monster impacts, six glyphs and ten sound requests. Exit0; protected, default-profile and seed snapshots remain unchanged. Clean client layout/external runtime closure passes with 52 owned files (`attack-bonus-package1`); clean-machine deployment remains open. Staging log: `attack-bonus-stage-first-marker2.log`.
- [x] Release projectile GPU regression (`attack-bonus-projectile-render-release1`): 27 positive encounters, five lifecycle cases and four rendered cases pass. Skill 3162's missing activation remains recorded/skipped; available unsupported-FX warnings are zero. Release monster GPU regression (`attack-bonus-monster-render-release1`) adds Srbinda to the default melee/ranged matrix: ten positive fine/coarse encounters, four GPU cases and nine lifecycle checks pass. Srbinda's misses and positive hits both occur at the first marker; the new checks verify actual selected animation and authored impact geometry/depth, without claiming full-map visual parity.

- [x] Final Debug monster GPU acceptance also passes ten encounters/four GPU cases/nine lifecycle checks (`attack-bonus-monster-render-debug1`). Both fine/coarse Srbinda cases retain the native first miss and subsequent positive hit at .805051 seconds. Debug's affected first-marker/bonus retest completes in90.60 seconds; no timed-out observation is treated as a failed process or restarted run.

The final Release executable
matches the staged client at SHA256
`c746e15bdd9876a9292c12a85186e0967fe879036ca9d0263e37a9ab49df7e7a`.
`attack-bonus-source-evidence.json` pins the source, native engine evidence,
canonical inputs, accepted results and current executable identity.
The earlier controlled performance baseline remains tied to the monster-ranged
build; no optimisation gain is claimed. Remaining critical/pierce/multiple-strike,
periodic/area/monster-state services, special patterns and broader map/game
acceptance remain open.

## Native shield energy and per-hit FX (2026-10-26)

- [x] Compile the four instant shield/break cases from `CMob2::OnTakeInstant2` and both native absorption functions into the existing status adapter. Skill3102 creates energy instead of an ordinary timed-effect slot;3145 derives enhanced energy from TP after its cast cost. Keep ordinary70% physical absorption, enhanced physical/elemental percentages, native nearest rounding, shared enhanced energy, pierce bypass and strict-less-than depletion flags. Exact exhaustion keeps the native flag while an overflow hit clears it.
- [x] Route incoming monster damage through the live defender session before combining physical/pierce/elemental lanes and updating HP. Misses consume no energy or TP. Native effect ticking and equipment updates retain the energy; a fresh native entry starts without invented saved shield state. No new fields are added to native character persistence or the client tree.
- [x] Match `HTMainCharacter::HT_vMainChar_SetActiveSkillEffect`: type24 has no continuous State graph; incoming melee hits/misses play level1 State once, and long attacks wait for visual arrival. Enhanced wins if both flags are present. The per-hit owner survives equipment replacement and is removed on death/scene clear. Skill3145 is present in Global authority data but lacks its canonical fxPC link; `MISSING_FX.tsv` records it and presentation is skipped, with no search or alias.
- [x] Reproduce a defensive cast consuming a one-shot attack bonus (`energy-shield-bonus-repro1`). Restore the native `CastSkill` DealDamage guard around CalDamage/CastInstant1. Real3059 retains its40% next-attack bonus through defensive3022; damaging3007 consumes it once. The first follow-up test chose passive3001 as its attack; the corrected test uses the actual active damage record.
- [x] Final Release/Debug renderer acceptance (`energy-shield-isolated-render-release1`, `energy-shield-isolated-render-debug1`): 2,555 checks each cover real3102 levels1..10, real3145 cast/absorption, rounding/depletion/break/invalid requests and the defensive-bonus regression. Two GPU cases cover levels1/10, melee/ranged shield reactions, native misses, actual HP/energy debit, level1 State selection, equipment, Escape and death cleanup. The explicit private level100 Rakshasa uses30 extra Nerve and230 extra Heart Chakra; native950 TP pays3145's850 TP cost, leaving100 TP and1,000 enhanced energy. Native costs, RNG, records and assets are unchanged. Matched captures hide only `WorldSkillShieldImpact` geometry while holding pose, clock, monster impact and all other FX unchanged: level1/10 show299/450 pixels differing by more than3 channel levels in both configurations. These isolate the shield itself, tightening the earlier global-FX on/off captures. No available-graph warnings occur.
- [x] Actual SDL shield3102 and ordinary buff3110 each pass88 cast/equip/unequip/Escape checks on the final staged Release (`energy-shield-sdl-final2`, `energy-shield-buff-final2`). Both exit0 and preserve their protected/default/seed snapshots. The earlier buff-regression preparation was held by the running normal launcher; the accepted run followed the user's explicit close response, without terminating their process.
- [x] Twelve status/equipment/parameter/skill/caste/effect/projectile/monster/navigation CPU gates pass in each configuration (`energy-shield-cpu-release1.log` plus `energy-shield-skill-release1.log`, and `energy-shield-cpu-debug1.log`). Debug's953.67-second matrix completed, including224.49-second projectiles and571.50-second navigation. The later DealDamage guard has separate affected cast/shield/projectile retests; unrelated navigation is not repeated merely to produce another green log.

The initial enhanced-shield fixture could not pay850 TP; the accepted fixture
uses native Heart-based mana rather than relaxing costs or adding fake TP.
Missing3145 presentation remains explicit. Final Release/Debug affected cast/
shield/projectile retests pass (`energy-shield-final-cpu-release2.log`,
`energy-shield-final-cpu-debug2.log`). Debug's623.89-second affected matrix,
including479.04-second projectiles, completed successfully. Clean client layout/external runtime closure passes
(`energy-shield-package-final2`); Release is staged (`energy-shield-stage-final2.log`).
Build and client executables match SHA256
`a90b975cc91dcbed7a8261c6c3d4b1fc4aec122cd5a0c4ec7d739e732a69e404`.
`energy-shield-source-evidence.json` pins this checkpoint's sources and results.

`energy-shield-pattern-audit.json` also verifies all23 nonzero template IDs
referenced by the supplied Zone01 generators: their authored Global skill
patterns are zero. The Global source has588 patterned templates outside that
set. This does not implement their special-skill scheduler, cast counts or
area/timed state services. Remaining native skill/weapon FX and broader game
gates stay open. The last controlled7,200-frame baseline remains tied to the
monster-ranged executable; no new shield performance result or optimisation
gain is claimed.

## Native monster default ranged attacks (2026-10-26)

- [x] Replace unconditional idSkill0/fixed20-unit monster attacks with `CMob::BattleProcessor`'s default melee/ranged branch. Use `GetFunc::CalDistance`'s rounded integer-cell distance and native body radius. Imported skill ranges already include `LoadSkillData`'s +2; retain that transformation once. Monsters with no ranged skill continue using their native melee fallback.
- [x] Lock the selected skill and its TAB timing at windup. Resolve MONSkill's animation through MonAni; use ATK1 only for a zero animation binding, matching `HTEngineHandler::HT_hrChangeMonsterAttackAnimation`. Display, damage and activation/impact presentation now share that actual skill identity. Monster events are excluded from the separate PC-skill FX decoder.
- [x] Implement native long-attack types3/4 with a depth-tested null carrier and authored follow/impact graphs. Use the existing225-unit/second straight-flight equations. Keep HP and hit digits on the source TAB marker (`HTMonster::HT_vMonster_AttackPointCheck`); visual arrival never applies damage a second time. Remove flights on caster/target death, missing render owner, generation replacement and scene clear; rebind their target during the same player's equipment display replacement.
- [x] `monster-ranged-render-final3`: eight positive encounters cover monsters2004/2005, melee41010/41011 and ranged41400/41401, at .001/.05-second ticks. Verify each native miss and positive hit against the .448485-second marker. Three GPU cases pass eight lifecycle/rebind checks. Matched held-pose on/off captures prove visible follow (45–46 pixels over three channel levels) and impact (1,068–1,102 pixels); zero unsupported/missing graph warnings. These isolated captures contain the real actors/FX, not a full map visual comparison.
- [x] Release build/staging and actual SDL combat regression pass (`monster-ranged-release-build5.log`, `monster-ranged-stage1`, `monster-ranged-sdl-combat1`). The launcher presents two player/two monster impacts, six glyphs, ten sound requests and60 earned Prana; protected/default/seed data stay unchanged. Release's existing projectile/marker/flight/navigation regressions pass in `monster-ranged-regression-release1.log`.
- [x] Debug build and the same eight encounters/three GPU cases/eight lifecycle checks pass (`monster-ranged-debug-build1.log`, `monster-ranged-final-probe-debug-build1.log`, `monster-ranged-render-debug-final1`). Debug's matched captures have the same visible-pixel counts. Five focused Debug CPU gates pass across `monster-ranged-regression-debug1.log` and `monster-ranged-debug-timing-retest1.log`; the initial marker gate was not run because its binary was unbuilt, then passed after that target was built. The195.05-second projectile and302.22-second navigation checks completed successfully; they were not restarted on an observation timeout.
- [x] Actual SDL buff3110/equip/unequip/Escape still passes88 checks (`monster-ranged-sdl-buff1`), with unchanged protected/default/seed data. Clean client layout/external runtime closure passes (`monster-ranged-package1`). The final Release monster CPU gate passes separately in `monster-ranged-cpu-release-final1.log`.
- [x] Rebaseline this exact staged Release (`monster-ranged-profile1`, SHA256 `871a8eac3242c7334fe67a3f6dbfd1bd8a2c3392bf20e943c2d6a4bc5ca05788`): six isolated trials /7,200 measured frames, all GPU samples valid, no concurrent builds/QA and unchanged protected/default/native inputs. Dense43-actor medians9.67–9.87ms include4.10–4.16ms pose work; GPU1.49–1.67ms. Initial dense actor creation takes370–380ms, settled population2084–2114ms. Combat40-actor medians9.14–9.25ms retain a73.02ms worst interval. Preserve raw timings and the older baseline's executable identity; no isolated optimisation gain is claimed.

The encounter fixture retains one real generated actor at its authored position
and uses a private in-memory level20 PC with30 extra Heart Chakra. Native RNG,
attack/dodge decks, damage parameters and resource bytes are unchanged. Initial
test attempts incorrectly required the first swing to hit; the source deck
dodged it. The accepted test checks those misses and the subsequent positive hit.
Another capture sampled after the short impact lifetime; the accepted matched
capture is taken while the authored effect is live. Failed attempts are retained.

The separate ten-step special-skill patterns in `CMob::SelectSkill`, cast counts,
synchronised skills, area/timed monster states and the complete AI scheduler
remain open. This accepts the default melee/ranged branch in Mandara, not every
monster skill or another map's FX library. Full skill/weapon FX and whole-client
visual/performance/release gates remain open.

## Buff FX during equipment replacement (2026-10-26)

- [x] Reproduce a committed3110 buff disappearing after the same player's equipment rebuilds its renderer object (`buff-owner-repro1`). The original client keeps its logical main-character model during equip/unequip; our new object name left the visual pointing at a destroyed parent.
- [x] Rebind exact FX parent and Prana destination references after a successful production equipment replacement. Preserve graph age, lifetime, socket, geometry and existing particle/audio state. An invalid replacement fails without changing attachment state. Death, missing-owner and scene teardown still remove owned effects normally.
- [x] Release and Debug renderer regressions pass (`buff-owner-render1`, `buff-owner-render-debug1`): actual3110 transaction,180-second expiry, pre-commit cancellation, effect-removal snapshot, equipment replacement without a recast/TP charge, death, missing parent and scene cleanup. The held-pose before/after captures have identical pixels.
- [x] `buff-owner-sdl2` passes88 checks through ordinary SDL input: cast3110, open inventory, equip the native starter sword, unequip it and press Escape. Both display replacements retain the live buff and deadline; persisted inventory/equipment return to their entry records and skills match the captured in-world entry bytes. Exit0; protected client, default profile and seed hashes are unchanged.
- [x] Release/Debug builds and four focused CPU checks in each configuration pass (`buff-owner-release-build3.log`, `buff-owner-debug-build1.log`, `buff-owner-cpu-release1.log`, `buff-owner-cpu-debug1.log`). Release is staged (`buff-owner-stage2`); clean client layout/external runtime closure passes (`buff-owner-package1`).
- [x] Rebuild and run the existing rendered projectile regression against the current FX header (`buff-owner-projectile-build1.log`, `buff-owner-projectile-render1`):27 positive-damage encounters, five lifecycle cases and four GPU flight/impact cases pass. Accepted missing3162 activation remains recorded; unsupported-runtime warnings remain zero.

The first SDL runtime (`buff-owner-sdl1`) passed its live checks, but the
post-run verifier compared skills against the pre-login fixture. Native world
entry clears reserved skill slot30; the corrected verifier captures the actual
world-entry bytes and requires them unchanged through equipment replacement.
The failed attempt is retained. No canonical profile/resource was edited or
extracted. This closes the equipment ownership bug; wider buff services, monster
skill selection/ranged/state families and full skill timing remain open.

## Native body, hair and apron animation sets (2026-10-26)

- [x] Fix hair/apron attachments retaining their creation clips while the body moves, attacks or casts. Decode native state/attack/skill body/front/back triplets and Head/PCAni hair mapping. Apply independent clip rates to the same action duration, source cast looping, finite attack playback and key-zero starts. Production world and INTRO selection/idle paths use the new sets.
- [x] Preserve selected clips and clocks during head/equipment replacement. Keep valid zero-duration hair clips on key zero; log missing optional bindings/payloads without replacing them or searching other clients.
- [x] Correct the extra mesh/animation count restriction in the name-bound loader. The native engine's 2DE71/2EDDF path searches tracks by name and skips absent branches; its current reference hash/disassembly recheck passes in `socket-native-namebinding.txt`. Keep original mesh hierarchy, bind-matrix, weight bounds and required-track checks. Eight count-different supplied skill cases now render.
- [x] `socket-animation-render6`:7,024 binding sets,312 attack sets across13 source rows/eight tribes/three variants,6,376 skill-phase sets,889 decoded TABs and one valid static clip. Verify424 GPU playback sets,1,651 body/socket clock checks,424 key-zero starts,56 hair selections and8 head/8 equipment replacements. One unavailable PCAni31159 reference remains in `MISSING_ANIMATIONS.tsv`; it is skipped as requested.
- [x] Eight focused CPU gates pass in Release and Debug, including native bind/weight/singular-transform checks, normals, animation timestamps, weapon bindings, socket inventory and27 actual projectile/weapon encounters. Logs: `socket-animation-cpu-release1.log` and `socket-animation-cpu-debug1.log`. Debug's encounter matrix takes193.96s; it completes successfully.
- [x] Actual SDL skill3124/Escape/recast passes39 additional socket clip/loop/phase checks, two body clips, six FX submissions and TP110 to104 (`socket-animation-skill-runtime1`). INTRO roster/selection/idle regression passes (`socket-animation-intro-runtime1`). Protected/default/seed data stay unchanged.
- [x] `socket-animation-projectile-render2`:27 positive-damage encounters, five cleanup cases and four rendered flight/impact cases pass with the body/socket API. Missing3162 activation1000646 remains recorded; unsupported-runtime warnings are zero. The verifier now distinguishes the user's accepted missing assets from unsupported available effects instead of failing the whole run on an accepted asset gap.
- [x] `socket-animation-buff-runtime1` retains real3110 buff transaction/180-second expiry, Escape, effect-removal snapshot, death, owner removal and scene cleanup. `socket-animation-persistence1` repeats all six native restart/relogin/character/village legs successfully; protected/default data remain unchanged.
- [x] Rebaseline the corrected Release independently: `socket-animation-profile1` passes six trials /7,200 measured frames, all delayed GPU samples valid, and unchanged source/runtime/native inputs. Current43-actor field medians10.07–10.28ms include4.23–4.25ms pose work; GPU1.68–1.69ms. Keep the older matrix tied to its own executable; this correctness change is not a same-quality optimisation comparison. Final package check passes in `socket-animation-package1`; Release remains staged.

Historical failed attempts remain retained: the first inventory assumed every
clip had positive duration; later renderer coverage exposed the count-only
restriction. The first updated projectile probe treated a legitimate zero-clip
ready phase as a body-state ID; it now leaves that phase without an animation,
as production already does. No missing resource was substituted or extracted.
These checks cover binding/playback and the represented live transactions, not
every skill service, monster state family, outfit or original-client visual
comparison. The overall skill/weapon FX goal remains active.

## Crowded-scene and loading baseline (2026-10-26)

- [x] Add opt-in application/backend scopes and `tools/profile-world.py`. Ordinary play does not read profiling clocks. Record raw CSVs, hardware, native/runtime input and source/executable hashes, scene captures, actor/FX owners, deformed vertices/upload bytes and delayed bgfx CPU/GPU timings.
- [x] `world-profile-matrix1` passes two fresh sequential Release processes each for town, the densest collision-checked authored neighbourhood and a real skill/combat encounter:7,200 measured frames after120 warmup frames per trial. No population clones or reduced-quality overrides. Normal real elapsed world time replaces fixed QA intro time for these measured scenes.
- [x] On i7-12650H / RTX4050 Laptop,1024x768 HIGH/D3D11 with2048 shadows: town4 actors median6.52–6.56ms; dense field43 actors9.68–9.73ms; combat40 actors9.05–9.20ms. Dense CPU pose work4.12ms sits inside5.32–5.35ms total animation work; GPU median1.45–1.64ms. Each combat trial records native3124 damage and six positive-damage impacts. All7,200 delayed GPU samples are valid; repeated asynchronous values remain possible.
- [x] Separate native playable readiness from nearby-actor creation and settled populated readiness. Dense load totals2049–2081ms; individual initial actor creation stalls365–370ms. Full map decode282–302ms, world/sky creation253–264ms and authority stages238–319ms are measured separately. Frame p95/p99 and worst intervals are in the existing implementation plan and raw summaries; combat has a69.32ms worst interval.
- [x] Debug/Release builds pass (`world-profile-release-build3.log`, `world-profile-debug-build1.log`). Protected/default files and all recorded runtime/native inputs remain unchanged. First reducer known-value checks pass; accepted raw data also passes sample sequence, nested/disjoint CPU-scope and GPU-validity checks. The earlier smoke matrix is retained; it preceded the narrower pose and initial-population scopes.
- [x] With profiling disabled, actual SDL skill3124 cancellation/recast and Mandara portal/altar/water/ground/target/depth regressions pass on the final Release (`world-profile-skill-regression1`, `world-profile-fx-regression1`). Native geometry, brightness, UV motion, terrain conformance and zero pixels through the test building remain verified.

Priorities from this baseline: reduce CPU pose/deformation cost while retaining
native normals/sockets/timing; then dirty UI updates and scene traversal. Test
GPU skinning and batching against the same scenes before claiming gains. For
loading, budget decode/resource creation around the measured stalls. No such
optimisation is claimed implemented by this profiling checkpoint. Fresh process
loads have an uncontrolled, fixture-warmed OS cache; they are not disk-cold.
Retained FX/actors are owners, not visible-frustum counts. Other maps, online
crowds and the broad C08 performance/recovery gate remain open.

## Native persistence and restart matrix (2026-10-26)

- [x] Correct world entry to apply native Interface.sys quickbar orientation and number/function-key mode. Preserve the original chat-style field, extra window positions and unknown tail; do not invent persistence for options the original format does not store.
- [x] Preserve all four explicit roots in Restart. Validate the generated Windows command with CommandLineToArgvW, including empty/Unicode/quoted/trailing-backslash arguments. Debug/Release menu/options/restart CPU checks pass; final Debug build: `persistence-final-debug-build1.log`.
- [x] `persistence-runtime3` passes six fresh-process legs over one disposable profile: actual native SDL Restart request, same-character relogin, second character, villages18/19 and return to1. Check complete native character bytes across same-zone restart, equipment attachments on the renderer, character-specific five-page quick slots, alternate number-key handling, window positions and independent live miniaudio volumes. Only native zone/cell fields change during village transitions.
- [x] Keep protected client/default profile data unchanged. Historical `persistence-runtime1` failed because the QA assumed an absent options confirmation button; the corrected test uses the native O shortcut. Both later matrices pass; the final one includes stronger rendered-equipment and byte invariants.

The three supported village zones share Mandara client art40001. Distinct map
art and in-game portal handoffs remain open. The harness owns the fresh process
launched from the exact emitted Restart command; actual OS ShellExecute child
creation is not claimed as separately tested. Crowded/loading profiling and the
remaining available native skill/FX families remain active work.

## Monster activation/impact columns and FX names (2026-10-26)

- [x] Replace raw MONSkill offsets with named native fields; use activation/impact instead of follow/state for windup/hit events. Honor ASCII case differences in native FX graph lookup (`dadati_Fire` → existing `dadati_fire`), retaining exact-match precedence and unchanged client bytes.
- [x] Release/Debug audit:36 rows,45 nonzero links,13 unique IDs;44 links resolve after the name correction. Skill41290's impact1200101 is absent from both supplied Mandara tables; keep that gap explicit beside PC-skill3162's missing1000646.
- [x] `monster-impact-runtime2`: actual monster2001 skill41004 hit FX1200007 renders on the player with40 vertices/60 indices and correct depth state. Native hit/audio/Prana/trail/F-pickup checks and protected/default/seed hashes pass. Release is staged in `monster-fx-stage2`.
- [ ] Complete remaining native monster skill selection, ranged/area/state behavior and the broader skill/FX matrix. The phase decoder and this melee encounter do not imply completion of those families.

## Native default hotkeys, chat and map views (2026-10-26)

- [x] Verify and implement the requested source defaults: menu windows, name/bubble/UI toggles, screenshot release, both quick-key modes, main -/+ paging, W/A/D, arrow orbit, walk/sit, camera views/reset/zoom, E/R/T, F pickup, Alt labels and chat focus/commands. Preserve the user's explicit F11 choice: optional native broadcast camera, disabled by default; no invented first-person mode.
- [x] Capture the original guild/address/help/minimap/ChattingBox declarations, including Philippine English labels and help tabs. Read Mandara's existing minimap DDS from TerrainTex.hpk and the original ETC arrow; never extract resources. Keep typed chat and quantity prompts from activating world/menu keys.
- [x] `hotkeys-runtime4`:63 actual-SDL checks, native cropped/full map views, Alt+W, key release/focus loss, Ctrl isolation, camera controls and BMP screenshots in the external profile. `hotkeys-loot-runtime3`: native earned drops, readable white Alt names, actual F approach and persisted11-Rupiah pickup;2 player/2 monster marker-timed impacts,6 glyphs and10 sound requests.
- [x] `hotkeys-retarget-regression2`: actual ground-click/E/R preemption with the old destination38.7878 units away and existing movement-animation phase checks. Release/Debug menu/decoder/manual-movement CPU gates pass; optional broadcast presets are exercised separately. Builds: `hotkeys-final-release-build4.log`, `hotkeys-final-debug-build3.log`; staged Release: `hotkeys-stage4`.
- [x] Keep all default/seed/protected data unchanged. Retain failed fixture attempts and their corrections in the existing implementation plan. No client payloads were extracted or duplicated; runtime HUD texture resolution now fails explicitly when its native payloads are unavailable.

The solo authority has no other PC, party, Ashram or online trade service. These
commands use native eligibility/failure paths; the new UI does not fabricate
remote delivery or friend registration. Remaining skill/FX families, transition
persistence and controlled crowded/loading profiling stay open in the full plan.

## Real-map navigation stress and SDL attack retarget (2026-10-26)

- [x] Add `navigation_stress_probe` and `zf_navigation_stress`, using actual Mandara TCC/TML/THM, the atomic Zone01 dataset and native population/rules. Inventory and choose authored altar309, market display1123, house353, temple column301 and ruined stair/wall6156.
- [x] Pass32 static cases: real stairs up/down, two single-cell passages and building detours, each walking/running at .016/.2-second ticks. Record3,848 accepted player steps, validate native floor heights, independently sample both collision grids and actor clearance every .5 unit, and reject blocked clicks without dropping the current valid route.
- [x] Pass8 dynamic cases: corner chase, moving-player replan, immediate ground-route attack preemption and second-monster retarget at both tick rates. The moving chase changes route target five times and reaches its native attack. Real monster parameters remain; the explicit private QA positions are recorded as fixtures.
- [x] Verify actual SDL ground clicks, E selection and R preemption in `navigation-input-runtime1`. R replaces the ground destination while it is38.7861 units away, starts the native attack, and preserves earlier movement-retarget animation-phase checks. The run exits0 and preserves protected/default/seed data.
- [x] Debug/Release builds and CTest matrices pass (`navigation-release-build1.log`, `navigation-debug-build1.log`, `navigation-cpu-release1.log`, `navigation-cpu-debug1.log`). Final CPU evidence is in `navigation-ctest-Release` / `navigation-ctest-Debug`; accepted steps are in `MOVEMENT_TRACE.tsv`. Release is staged in `navigation-stage1`.

The optional accepted-step observer is unset in ordinary play and changes no
movement math. Source TCC stair heights are quantized: ranges20.1..32.0635 and a
maximum observed6.86349-unit step. These tests verify authority/routing, not
smooth visual stairs, every zone, missing authored TBO collision, or the entire
native monster AI scheduler. Stress-run `plan_us` values are diagnostic and do
not close crowded-scene/loading profiling. The first static case labelled a
two-cell flank as single-cell; the corrected fixture crosses the actual one-cell
gap. The first dynamic check assumed the final event must be the player's
windup; it now finds the current player's event even when the monster starts an
attack in the same tick. Failed attempts remain separate.

The user also added the complete default hotkey/chat list. It is now tracked in
the implementation plan. Native input verification has begun; full menu,
movement/camera, quickbar, pickup/highlight and chat-command acceptance remains
open, alongside the other uncompleted goal items.

## Altar and fountain reference refinement (2026-10-26)

- [x] Inspect the user screenshots15:48:54,15:49:10 and15:49:27, authored ALTER_FX/Env_Water01 nodes, and actual close-up bgfx captures. Preserve altar orientation, falling-water direction/UV motion, native basin height and accepted fire/torch settings.
- [x] Add a floating-point RGB intensity control for unlit FX, preserving alpha, depth and cached geometry. Apply gain3 to the altar core,2.2 to its ray models and3 only to fountain foam. Other FX retain gain1; native resources/HPKs remain unchanged. This is a visual reference adjustment rather than a claim of exact native material parity.
- [x] Verify all three altar and four fountain visual layers at a frozen state: old intensity, adjusted intensity, off and restored. Evidence: `build/evidence/altar-water-reference-runtime2`. Actual exposure differences are76004/2845 pixels; both restored images match exactly. The real-building occlusion test remains0 leaked pixels, and native portal/water UV checks pass.
- [x] Fix a shutdown use-after-free exposed by the first run: `stop()` compared a map-key reference after erasing its entry during `clear()`. Capture selector/item identities before erasure. Retain the failed first run/dump; the corrected runtime exits0. Debug/Release builds and native field-binding/cleanup checks pass; Release is staged and package layout validation passes.

The native basin surface is37, above the measured stone floor33.6494. The
read-only `native_world_fx_probe --inspect-water` audit is recorded in
`build/evidence/altar-water-layer-audit1.txt`; no height adjustment or replacement
water geometry was added. Build, stage and package evidence uses the
`altar-water-reference-*build2`, `altar-water-stage2`, `altar-water-fx-debug1` and
`altar-water-package1` names. Default/seed/protected resources remain unchanged.
The separate SDL skill3124/Escape/recast regression also passes and exits0 in
`altar-water-skill-regression1`, providing a second clean world shutdown with
ordinary skill FX. The full five-part goal and missing3162 activation remain open.

## Projectile arrival, attack costs and weapon encounters (2026-10-26)

- [x] Separate native TAB release from projectile arrival. Supported bow/dart/action3/5/6 paths now have flight state, source normal/piercing/bow rates and pursuit updates. Ordinary melee retains its native marker. Damage and skill/ordinary attack HP/TP/item costs commit at the appropriate hit request, rather than charging a projectile at launch.
- [x] Apply native equipped-arrow and active-inventory costs atomically. Arrow7092 spends one equipped unit; other item costs inspect at most five active stacks. Missing/insufficient items reject without partial costs. UI/native inventory state is collected after the transaction.
- [x] Present native arrow7091, projectile-bound follow graphs, arrival impacts and hit digits. Use full U/V/N native flight orientation, level-banded FX IDs and depth testing; remove models/carriers/FX at flight completion or scene clear. Visual review caught and corrected an initial +Z-forward assumption: native arrows use local +X for flight.
- [x] Pass27 authoritative encounters:12 actual supplied weapon types at fine/coarse ticks, plus straight3301, pursuit3306 and bow pursuit3162. Every case produces positive damage; melee uses the native marker and projectiles preserve target HP and player TP/arrows until arrival. Five extra checks cover released Escape, caster death, target generation replacement, population reset and scene reinitialization.
- [x] Render four actual GPU projectile cases with live follow geometry, impact geometry, hit feedback and depth checks. The final component result is `build/evidence/projectile-orientation-render1/PROJECTILE_PIPELINE_RESULT.json`: simulation passes, but the full FX result remains **failed**, with exactly one missing authored binding1000646 for3162. Earlier captures/results remain as failed or superseded evidence.
- [ ] Resolve that activation content gap, complete remaining monster/attached/area/state FX and extend encounters to all skill/strike combinations. No complete FX or combat parity is claimed.

Release encounter/CPU evidence: `projectile-reference-encounters-release1.log`
and `projectile-reference-cpu-release1.log`. Native sources:
`HTAttackManager.cpp` (release/arrival, rates, U/V/N orientation, pursuit),
`CMob3.cpp` (cost validation and removal), `HTEngineHandler.cpp` (level FX bands).
Pursuit uses deterministic lift1 within the native randomized range; collision
uses swept XZ tests. The supplied12-type matrix excludes absent type910 darts and
synthesized dual916 encounters. It complements, rather than replaces, the288
animation-binding checks.

- [x] Build final Debug/Release executables; five focused CPU checks pass in both configurations (`projectile-reference-cpu-*`, `projectile-reference-encounters-release1.log`). Rebuild after the orientation correction and repeat the pure flight orientation check in both configurations (`projectile-orientation-*build1.log`, `projectile-orientation-debug-flight1.log`).
- [x] Stage Release and pass actual SDL skill3124/Escape/recast, saved INTRO names/selection/idle restoration, and Mandara FX/occlusion/UV/torch regressions using isolated profiles. Evidence: `projectile-stage1`, `projectile-skill-regression1`, `projectile-intro-regression1`, `projectile-mandara-regression1`. Package validation passes in `projectile-package1`; clean-machine deployment remains open. Original/default/seed profiles and protected resources remain unchanged.

The full five-part goal remains active: data-version alignment, remaining combat
and FX families, real navigation stress cases, persistence/transition matrices
and crowded-scene/loading profiles are not closed by this checkpoint. No commit
or push was performed.

## Additional K3 / Global references (2026-10-26)

- [x] Register the user-supplied `B:\__TANTRA\TantraDataScripts\K3`, `B:\__TANTRA\TantraDataScripts\Global` and `B:\Tantra-Files\_TantraClients\TantraOnline-Global` in the implementation plan's reference manifest. Treat them as read-only guides and preserve runtime version boundaries; no client extraction or catalog replacement is performed.
- [x] Read the actual K3 XML, Global XLS and both Global client FX TXLs, comparing their native IDs and recording SHA256 hashes alongside the current bgfx client table. Reproducible tool: `tools/audit-fx-references.py`; evidence: `build/evidence/fx-reference-audit1/FX_REFERENCE_AUDIT.json`.
- [x] Record and skip skill3162's missing activation1000646/7/8, per the user's instruction to note missing resources and move on. All five inspected inputs lack its FXSkill definition. Retain the diagnostic and historical failed full-FX evidence; do not invent a replacement or keep searching. Monster impact1200101 and PC FX1000386 follow the same recorded-missing policy. Available behavior and unimplemented FX families still require their own gates.

## Elemental weapon trails and persistent skill FX (2026-10-26)

- [x] Resolve equipped refinement materials directly from the native TPA. Preserve high/low nibble ordering, first elemental effect and source levels1..10 brightness .50..95; bind swFire/swIce/swLighting/swPoison.dds to the actual attached weapon ribbon. The legacy getter's poison->fire typo is corrected only in presentation, using the existing native poison texture.
- [x] Clear ribbon samples/buffers immediately when disabled/cancelled or sheathed, when the owner is hidden/stopped/removed and on destruction. Cached ribbon geometry updates its texture correctly. Existing lifetime/centre ratio and weapon-mesh extent endpoints remain; exact closed-engine endpoint parity is not claimed.
- [x] Pass88 native refinement cases and the existing12 weapon types/eight tribes/288 attack-animation combinations. Five real GPU cases (plain plus four elements) verify texture/brightness, nonzero geometry, depth testing, bounded age and cancel/sheathe/hide/destroy cleanup. Held-pose on/off changes1542,876,1232,1134,1261 pixels; all four elemental images differ. Evidence: `build/evidence/elemental-trails-render2`.
- [x] Correct active-skill State versus Impact decoding. Preserve native once/loop/energy exceptions, attach persistent state to the caster, and remove it at the committed duration or when its native effect slots disappear. Missing parent objects now release attached FX; actor distance-culling resets ownership so indicators/monster loops can restart.
- [x] Add authenticated Escape action cancellation. Pre-commit cancellation spends no HP/TP and deals no damage; cancellation generations prevent queued stale cast/activation events from replaying. Committed buffs survive ordinary action cancellation; death removes them.
- [x] Verify real SDL key1 -> ready FX -> Escape -> no TP/damage/cast FX, then key1 -> successful3124 cast with two animations, six FX geometry submissions and TP110->104. Evidence: `build/evidence/skill-state-escape-skill1`; protected/default/seed profiles remain unchanged.
- [x] Execute native self skill3110 through the actual offline transaction and FX renderer. Verify its180-second state, native timed-effect expiry, effect-removal snapshot, pre-commit cancellation, death, parent removal and scene clear, with no unsupported/missing node warning. Removing the state changes2479 held-pose pixels. Evidence: `build/evidence/skill-state-render3`.
- [x] Debug/Release builds and three focused CPU checks pass in each configuration; all eight tribe cast fixtures preserve pre-impact state, commit once and reject cooldown/cancelled hits. Final build/staging/package and INTRO/skill/Mandara regression evidence is under `build/evidence/skill-state-*`.
- [ ] Complete projectile/follow and remaining attached/area/monster-state FX. Extend live buff and damage-timing encounters across weapon/skill combinations. The binding matrix and3110/3124 checks do not close the full FX objective.

Navigation stress matrices, restart/transition persistence and crowded-scene/loading profiling remain open under the existing five-part goal. No goal completion or full skill/TFX parity is claimed.

## Native TantraParam reader and comparison (2026-10-26)

- [x] Read the native client TPA directly in memory with source-generated field layouts and full895334-byte stream validation. All eight families parse:623 monsters,501 monster skills,1106 levelled PC skills,1664 items,291 NPCs,114 portals,520 quests and49 area indicators.
- [x] Preserve native padding and the client's unknown four-byte item extension. Support item272/item276 layouts, Portal ID0 and native first-duplicate semantics. Reject corrupt counts, invalid IDs, truncation and extra bytes without changing a previously valid catalog.
- [x] Load TPA into the runtime resource catalog and require it for normal INTRO startup. Philippine English text remains first; TPA names/descriptions supply native fallbacks. No client payload extraction or temporary TFX file is used.
- [x] Compare shared numeric records with the existing offline imports, leaving input files and server authority unchanged. Evidence: `build/evidence/native-tpa-imports2/TPA_IMPORT_COMPARISON.json` and its production-reader dump.
- [x] Build Debug/Release and pass focused reader/catalog checks in both configurations plus the Release Philippine English check. Stage Release; actual `native-tpa-roster1` and `native-tpa-skill1` checks preserve protected/default profiles and verify the roster, flat selection circle, skill3124 animation/FX and TP110->104. Package closure: `native-tpa-package1`.
- [ ] Resolve data-version differences:470 Item,655 PCSkill,17 Monster and1 MonsterSkill shared numeric values differ. Additional imported IDs/levels are absent from the client. For example, skill3009 level1 cooldown is5000ms in the client versus59000ms in the import. Neither dataset was overwritten. The extra item bytes remain opaque; encrypted/undocumented layouts are unsupported.

Full skill/weapon FX, navigation stress coverage, restart/transition persistence and crowded-scene/loading measurements remain open. The current five-part order and exact gates are at the top of `IMPLEMENTATION_PLAN.md`.

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

## World FX occlusion correction after the 09:36 screenshot

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

1. Resolve the reported TPA/import version differences. Direct native reading and shared-field comparison now pass; keep client presentation parameters and server-only authority distinct.
2. Complete remaining available attached/area/monster-state FX and wider live-buff/strike coverage. Record and skip missing authored content as requested. The12-weapon/27-encounter projectile matrix, elemental ribbons, body/socket action phases and represented persistent-state/cancellation/equipment cleanup pass bounded checks. Native monster pattern selection, ranged attacks and wider skill services remain open.
3. Preserve the32 static/eight dynamic Mandara navigation cases and actual SDL immediate retarget regression. Smooth visual stairs, missing authored collision and other maps remain parity limits.
4. Preserve six fresh-process Interface.sys/quick-slot/equipment/audio/restart/relogin/character/village-zone checks. Distinct client map art and ordinary in-game portal handoffs remain open; the tested village zones share Mandara art40001.
5. Use the corrected-animation7,200-frame CPU/GPU/loading baseline to prioritise pose work, batching and asynchronous loading. No optimisation gain is claimed. Full performance/release gates remain open.

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
