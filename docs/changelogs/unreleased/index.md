# Unreleased

## 1.0.14 - 2026-10-28 (Tantra-B only)

Changed: complete all 19 C06 tasks with native equipment placement, inventory
operations, direct warehouse/equipment movement and basic combat lifecycle fixes.
Use authored monster reactions and combat sight; retain original hit timing.
Verified: Debug/Release each pass 27 focused tests. The authority matrix covers
27 inventory and eight combat cases; nine actual SDL legs verify services,
combat, failures and fresh-process persistence. Protected/default/seed hashes,
SQLite and the clean 55-file package pass. Source/DOM export checks are rerun.
Failed/corrected: a stale camera fixture omitted explicit extended zoom; private
dagger/arrow fixtures were corrected from the selected source data. Missing
Global arrow 7091 is recorded; supplied 7092 is used only in the owned fixture.
Remaining: complete AI/roam, timed consumables, online services, full loot/
penalties and other maps remain C09. Tantra-B is 133/254 (52%), five gates.
Preserve Tantra-O data/docs; game source remains uncommitted.

## 1.0.13 - 2026-10-27 (Tantra-B only)

Changed: add source-native altar refinement and32 offline secret-whisper
commands; publish the full command inventory and check P16-03.
Verified: Debug/Release each pass17 focused tests;5,619 refinement assertions,
433 parser checks,145 command and59 altar SDL checks with SQLite/profile
preservation. Package closure contains55 owned files. Source/DOM export checks
are rerun; website layout is unchanged.
Failed/corrected: an initial command probe clicked the hidden chat field before
Enter; the UI inventory assertion expected31 rather than33 native windows.
Corrected fresh command/altar runs and final focused checks pass.
Remaining: missing6526, zero donation/GM refinement modifiers, and complete
advanced NPC/quest/social/online command dependencies. Tantra-B is126/254 (50%),
five gates. Preserve Tantra-O data/docs; game source remains uncommitted.

## 1.0.12 - 2026-10-27 (Tantra-B only)

Changed: add source-backed coloured item/skill hover details, original NPC
choice states and opening greetings, and player/monster birth lifecycle.
Fix legacy item-name bytes inside English sale confirmation; check P11-07.
Verified: Debug/Release each pass nine focused tests, including 3,759 tooltip,
337 UI and 190 FX/audio assertions. Pixel checks, actual SDL paid repair/buy/
sell/cancellation, SQLite/profile preservation and 53-file packaging pass.
Source/DOM export checks are rerun; website layout is unchanged.
Failed/corrected: retain early sale-name encoding failures and the corrected
HUD-resolution/unlearned-title test fixtures. Final focused checks pass.
Remaining: missing screenshot mount data, 45 unhandled formatter effect IDs and
wider game/FX/map/release work. Tantra-B is 125/254 (49%), five gates. Preserve
Tantra-O data/docs; game source remains uncommitted.

## 1.0.11 - 2026-10-27 (Tantra-B only)

Changed: match the supplied native Settings layout with Presets/Options sections,
compact arrow selectors, original gold button groups and selected highlights.
Add functional Low/Mid/High presets; retain current live display/quality settings.
Verified: Debug/Release builds and three focused MainUI/Interface tests each;
103 actual SDL settings checks, final hidden UI checks, visual review at two
sizes and clean 53-file packaging pass. Source/DOM export checks are rerun;
website browser layout is not rerun because website layout code is unchanged.
Failed: no new failure in the layout revision; previous skill-FX gaps remain.
Remaining: MSAA, model/FX/object-distance, circle-shadow and wider game/release
work. Counts remain 124/254 and five accepted gates; game source is uncommitted.

## 1.0.10 - 2026-10-27 (Tantra-B only)

Changed: accept C02 bounded original resources/ordered rendering and native live
Advance graphics options, including the requested resolution arrows. Preserve
Tantra-O and its bundled documentation. Colour depth displays the actual 32 bits.
Verified: Debug/Release each pass 22 focused tests and 84 renderer assertions;
94 actual SDL graphics checks, original-asset resize/minimise/restore, independent
miniaudio controls and 53-file package closure pass. Source/DOM export checks
are rerun; real browser layout acceptance is not rerun because layout is unchanged.
Failed: earlier DDS/PC path/test-fixture failures were corrected and retained;
the separate missing1000106/unsupported TFX node7 strike acceptance remains open.
Remaining: wider assets/visual/performance/DPI/recovery, skills/collision/maps and
release gates. Game source remains uncommitted; no new FPS gain is claimed.

## 1.0.9 - 2026-10-27 (Tantra-B only)

Changed: accept the represented C05 offline movement, camera and MainUI checkpoint;
publish source-backed cursors/tooltips, widget colour/font modes, bounded text
caching, native names and camera recovery. Preserve Tantra-O and its documentation.
Verified: Debug/Release focused checks, 287 UI checks per configuration, original
cursor assets, 32 static/eight dynamic routes, real SDL controls/retarget/63 hotkeys,
six fresh-process persistence legs and clean package closure. Export source/DOM
checks are rerun; browser layout acceptance is not rerun.
Failed: the separate strike GPU attempt records missing1000106 and unsupported
TFX node7. That skill-FX acceptance remains open.
Remaining: authored .tbo collision, full skills/state/AI, distinct maps/portals,
visual/performance/recovery/release and other open phase gates. No measured FPS
gain is claimed; game implementation source remains uncommitted.

## 1.0.8 - 2026-10-27 (Tantra-B only)

Changed: publish the paused implementation snapshot and the user's request to
prioritise quicker independent fixes with batched focused validation. Preserve
Tantra-O, all five objectives and the full backlog.
Verified: retained Release CPU evidence for 19,041 checks, five target-independent
strike-rule cases and eight encounters for skills 3026/3012/3109. Source plan and
progress hashes match the export; website source/DOM checks are rerun.
Failed/pending: earlier probe API/weapon fixtures were corrected. New Debug, GPU,
actual launcher/UI/audio validation and staging have not been performed.
Skills 3033/3107 still need target/combo services. No new complete skill-family
or broad game gate is accepted from partial CPU evidence.
Remaining: finish the bounded strike acceptance on resumption, then prioritise
P05-07 text/glyph caching and small UI fixes. Those cache changes are not yet
implemented. Wider strike/state/AI/map/visual/performance/release work stays open.
The last staged ordinary-attack client and earlier performance baseline remain
unchanged; game implementation sources remain uncommitted.

## 1.0.7 - 2026-10-27 (Tantra-B only)

Changed: route ordinary attacks through native weapon cost/CalDamage/CastInstant1
transactions. Match the original engine's first TAB attack annotation; Srbinda's
adjacent duplicate tag is ignored. Refresh only Tantra-B and preserve Tantra-O.
Verified: 12 weapon damage payloads, 12 fine/coarse timing/cancellation encounters,
a natural native elite miss and 15,474 checks per configuration. Release/Debug
status/projectile/navigation gates, first-marker gates and ten monster encounters
with four GPU cases pass. Staged SDL combat/UI/audio, persistence guards and
clean packaging pass. The earlier performance baseline remains pinned.
Failed: reproduce/fix cached ordinary damage retaining 3059 and the timing
loader rejecting duplicate tags. Earlier QA fixture/build attempts remain
recorded; accepted final checks pass. Missing dart item and prior FX gaps are
recorded and skipped without aliases or resource hunting.
Remaining: critical/pierce/multiple-strike, periodic/area/monster-state services,
special patterns, other maps and broader visual/performance/release acceptance.
No full-game gate or optimisation gain is newly accepted.

## 1.0.6 - 2026-10-26 (Tantra-B only)

Changed: record native instant shield energy/absorption and per-hit State FX.
Restore source DealDamage gating so defensive casts retain one-shot bonuses.
Refresh only Tantra-B; preserve Tantra-O data and bundled documentation.
Verified: real3102 levels1–10 and3145 authority,2,555 Release/Debug checks and
two GPU cases, shield-only visible-pixel captures, ranged arrival, equipment/death
cleanup, two88-check SDL workflows, status/skill/projectile/navigation gates
and clean packaging. The earlier measured performance baseline stays pinned.
Failed: reproduce/fix defensive3022 consuming3059; test fixture funding and
passive-versus-active attack selection are corrected. Missing3145 FX remains
recorded and skipped without an alias. Accepted final checks pass.
Remaining: wider buff/strike, periodic/area/monster-state services, special
skill patterns, other maps and broader visual/performance/release acceptance.
No full-game gate or new performance gain is claimed.

## 1.0.5 - 2026-10-26 (Tantra-B only)

Changed: record native default monster melee/ranged selection, locked skill/TAB
timing and separately owned ranged follow/impact. Refresh only Tantra-B.
Verified: Debug/Release eight encounters/three GPU cases/eight lifecycle checks;
matched visible-pixel captures, projectile/navigation/marker CPU gates, native
SDL combat/audio/Prana and88 buff/equipment checks, clean packaging and six
isolated profile trials/7,200 measured frames. Tantra-O/docs stay unchanged.
Failed: initial tests assumed the first native swing would hit and sampled a
short impact after expiry; both are corrected without changing RNG/assets.
An initially unbuilt Debug marker probe was built and its gate passed on retest.
Remaining: special-skill patterns, monster area/timed states, wider buff/strike
services, other maps, online gameplay and rendering optimisations. No broad
game gate or isolated optimisation gain is newly accepted.

## 1.0.4 - 2026-10-26 (Tantra-B only)

Changed: record committed buff FX ownership across equipment display replacement.
Refresh only Tantra-B source tasks/data; preserve Tantra-O and its documentation.
Verified: real3110 Release/Debug renderer and expiry/cleanup checks;88 actual SDL
checks for cast/equip/unequip/Escape, pixel-identical held-pose captures, eight
focused CPU checks,27 projectile encounters/five lifecycle/four GPU cases and
clean client packaging. Release is staged; native profiles remain unchanged.
Failed: the first SDL post-verifier compared against pre-login skills; it now
requires exact world-entry skill bytes, preserving native entry migration.
Historical attempts/missing assets remain recorded; accepted final checks pass.
Remaining: wider native buff/strike/monster ranged/state families, other maps,
online gameplay and rendering optimisations; no new broad gate is accepted.

## 1.0.3 - 2026-10-26 (Tantra-B only)

Changed: record native body/hair/apron action phases and the corrected build's
independent CPU/GPU/loading baseline. Refresh only Tantra-B source tasks/data.
Verified:7,024 binding sets,424 GPU playback cases,39 actual SDL socket checks,
Debug/Release CPU gates, projectile/buff cleanup, six persistence legs and
7,200 measured frames. Tantra-O data and276 documentation files stay unchanged.
Failed: historical attempts and the absent PCAni31159/FX references remain
recorded in the source plan; no missing asset is substituted. Final checks pass.
Remaining: native skill/monster FX families, outfit/visual coverage, other maps,
online gameplay and rendering optimisations; no new broad gate is accepted.

## 1.0.2 - 2026-10-26 (Tantra-B only)

Changed: refresh only Tantra-B snapshots, checked tasks, native data/FX/hotkeys,
persistence and measured performance priorities. Add a repeatable scoped refresh.
Verified: six persistence legs, two trials of three measured scenes,7,200 raw
frames, native skill/FX regressions and preserved OGRE data/documentation. Website
checks are recorded separately in EXPORT_VERIFICATION.json.
Failed: no failure in the accepted final matrices; historical attempts and missing
authored FX are retained in the source plan. Missing assets are skipped as asked.
Remaining: full skill/FX/AI, other maps, online gameplay, rendering optimisations
and browser visual acceptance. No broad game gate is newly accepted.

## 1.0.1 - 2026-10-26 (Tantra-B only)

Changed: refresh the bgfx plan/progress snapshots, checked tasks, foundations,
next work and source hashes. Tantra-O data and documentation are preserved.
Verified: source/renderer evidence is recorded in the bgfx progress snapshot;
roadmap data and rendered-content checks are recorded in EXPORT_VERIFICATION.json.
Failed: supplied canonical skill FX binding1000386 is absent; it remains an
explicit source asset gap, with no replacement or full FX-completion claim.
Remaining: specialised skills/FX, NPC idle events, full AI and visual/performance
acceptance. This roadmap refresh does not accept another broad game gate.

## 1.0.0 - 2026-10-26

Changed: replace the previous website with both Tantra client roadmaps; retain
Tantra-O as the landing page, explicit renderer selectors and source checkboxes.
Add portable documentation/assets and repeatable export/verification tooling.
Keep .nojekyll so Jekyll does not parse legacy-encoded reference Markdown.

Verified: see EXPORT_VERIFICATION.json for the actual exported-file checks.
Failed: browser connection setup could not load its required module.
Verified: Pages run 40243215012 succeeded; seven live URLs match exported bytes.
See PAGES_DEPLOYMENT.json for the accepted commit and HTTP hashes.
Remaining: real browser layout acceptance.

## Latest source checkpoints

- **Tantra-O**: 46/102 named tasks checked; 0/14 gates recorded. Latest: Focused saved-roster route prepared. Saved-field SDL route, framing/movement traces and persisted-state auditor are implemented and CPU-checked. Both clients are rebuilt; the broader goal is paused and launch authorization remains unanswered. No new runtime acceptance is claimed.
- **Tantra-B**: 133/254 named tasks checked (52%); 5/10 gates recorded. Latest: C06 ordinary services and basic combat accepted. Close all 19 C06 tasks after implementing native off-hand and bow/arrow placement, atomic final-slot validation, direct warehouse/equipment transfers, consumable unpack fallback, authored monster HIT/DIE timing and finite restarts, combat-sight disengagement and range-aware approach. Debug/Release each pass 27 focused tests; the new authority matrix covers 27 inventory and eight fine/coarse combat cases with exact 80/10/10 normal/critical/miss decks. Nine actual SDL legs verify inventory, selection/attack FX and facing, defeat/reward/pickup, death/revival, warehouse/save point, paid repair/buy/sell and money/capacity failures, plus fresh-process reloads. SQLite and protected/default/seed preservation and 55-file packaging pass. Record missing Global arrow 7091 and use supplied 7092 only in the owned fixture. Correct stale headless zoom setup and private test fixtures. P07-12, P11-06, P12-01, P12-04 and P12-05a/06a/07a close:133/254 (52%), five gates. Full AI/roam, timed consumables, online services, complete loot/penalties and other maps remain C09. Remaining native skill/FX and complete map/game acceptance stay open.

These are separate source checklists, not release-completion percentages.
