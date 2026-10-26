# Roadmap website progress

Version: 1.0.9. Reviewed: 2026-10-27.

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
- **Tantra-B**: 109/254 named tasks checked (43%); 4/10 gates recorded. Latest: C05 movement, camera and MainUI accepted. Implement original CUR/ANI contexts, 200ms item/skill/control tooltips, native widget colours/font modes, bounded label caching and unchanged bitmap upload avoidance, player name policies and camera obstruction recovery. Accept 32 static / 8 dynamic routes, isolated SDL town blocked-click, field E/R retarget and 63 hotkey checks, plus six restart/relogin/character/village persistence legs. Debug/Release checks and clean packaging pass. The native camera baseline remains 150; the client explicitly selects 450 maximum zoom. Missing authored .tbo collision and wider strike/FX services remain open. No FPS gain or production/native visual parity is claimed. Remaining native skill/FX and complete map/game acceptance stay open.

These are separate source checklists, not release-completion percentages.
