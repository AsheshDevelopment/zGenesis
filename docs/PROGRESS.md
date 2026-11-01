# Roadmap website progress

Version: 1.0.19. Reviewed: 2026-11-01.

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
- **Tantra-B**: 168/254 named tasks checked (66%); 5/10 gates recorded. Latest: Simulation checkpoints and deployed MariaDB. Complete the five follow-up tasks within the revised two-client scope: native subsystem timing, original-order occupied-bucket visibility, bounded position checkpoints, Manager live metrics/create/drain, and dedicated MariaDB 11.8.9 with preserved SQLite, verified native migration, backup/restore and pool outage recovery. Two BGFX network clients pass movement, normal/skill hits, death/loot, social chat, trade and cash. Matching visibility p95 falls110 to2us and tick p95 from16.742 to9.021ms. The combined MariaDB session records47 moves,4 checkpoints,zero checkpoint failures,max tick46.026ms. Missing INTRO fxMAPnewIntro.txl is recorded and skipped; no new rendered FX or 512/1000-player acceptance. Keep the old256-player221ms spike unaccepted at that population. No Debug build or broad regression. Preserve Tantra-O. Remaining native skill/FX and complete map/game acceptance stay open.

These are separate source checklists, not release-completion percentages.
