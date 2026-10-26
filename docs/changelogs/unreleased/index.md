# Unreleased

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
- **Tantra-B**: 92/254 named tasks checked (36%); 3/10 gates recorded. Latest: Native ordinary attacks and first TAB attack marker. Fix ordinary attacks bypassing native CalDamage and retaining skill 3059's next-attack bonus. All 12 supplied weapon payloads and 12 timing/cancellation encounters pass, plus an unmodified native elite miss; 15,474 checks pass in each configuration. Match the original engine's first attack annotation, accepting Srbinda's duplicate-tag clip without extra damage. Release/Debug status/projectile/navigation gates and ten monster encounters/four GPU cases pass; staged SDL combat/UI/audio and clean packaging pass. Missing dart item and prior FX gaps remain recorded. Wider native strike/state services and full map/game acceptance stay open. Remaining native skill/FX and complete map/game acceptance stay open.

These are separate source checklists, not release-completion percentages.
