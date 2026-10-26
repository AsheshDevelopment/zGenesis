# Roadmap website progress

Version: 1.0.2 Reviewed: 2026-10-26.

- [x] Replace the former site with Tantra-O and Tantra-B roadmaps.
- [x] Preserve actual OGRE and bgfx task/progress/acceptance records.
- [x] Match the supplied reference layout and retain Tantra branding.
- [x] Bundle local assets and documentation with portable links.
- [x] Provide source/data and rendered-content CPU verification tools.
- [x] Preserve .nojekyll for direct static GitHub Pages publication.
- [ ] Accept desktop/mobile layout in a real browser.
- [x] Verify production deployment fc506a7 / run 40243215012; see PAGES_DEPLOYMENT.json.

Verification results are recorded in EXPORT_VERIFICATION.json after checks.
No game feature is marked complete by exporting this website.

## Latest source checkpoints

- **Tantra-O**: 46/102 named tasks checked; 0/14 gates recorded. Latest: Focused saved-roster route prepared. Saved-field SDL route, framing/movement traces and persisted-state auditor are implemented and CPU-checked. Both clients are rebuilt; the broader goal is paused and launch authorization remains unanswered. No new runtime acceptance is claimed.
- **Tantra-B**: 91/253 named tasks checked (36%); 3/10 gates recorded. Latest: Persistence and controlled performance baseline. Six isolated restart/relogin/character/village legs pass. Saved quickbar orientation and key mode are fixed; equipment attachments and independent live audio restore. Six Release profile trials measure 7,200 frames: dense field43 actors median9.68 to9.73ms, CPU pose4.12ms, GPU1.45 to1.64ms. Dense actor creation stalls365 to370ms. No optimisation gain or broad game gate is claimed. Remaining native skill/FX and complete map/game acceptance stay open.

These are separate source checklists, not release-completion percentages.
