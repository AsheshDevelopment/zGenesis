# Unreleased

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
- **Tantra-B**: 91/253 named tasks checked (36%); 3/10 gates recorded. Latest: Persistence and controlled performance baseline. Six isolated restart/relogin/character/village legs pass. Saved quickbar orientation and key mode are fixed; equipment attachments and independent live audio restore. Six Release profile trials measure 7,200 frames: dense field43 actors median9.68 to9.73ms, CPU pose4.12ms, GPU1.45 to1.64ms. Dense actor creation stalls365 to370ms. No optimisation gain or broad game gate is claimed. Remaining native skill/FX and complete map/game acceptance stay open.

These are separate source checklists, not release-completion percentages.
