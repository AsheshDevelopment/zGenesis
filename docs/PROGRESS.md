# Roadmap website progress

Version: 1.0.15. Reviewed: 2026-10-28.

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
- **Tantra-B**: 149/254 named tasks checked (59%); 5/10 gates recorded. Latest: Native Prana homes to the live player. Verify original monster death, attack-manager homing and engine FX lookup before replacing the procedural fading curve. Use monster DieActivateFX+1 on a moving null carrier, native 100-unit speed, six-word launch scatter, live player position +12, correction factor five and three-second lifetime. Preserve the corpse death graph separately and leave reward maths unchanged. Debug/Release each pass the flight rules and 570 presentation checks with path traces/captures, moving-target and recipient-rebind tests, duplicate/zero-reward suppression and expiry/missing-owner cleanup. Actual SDL Vasabhum defeat presents the collection FX and awards 60 Prana; protected/default/seed data and owned packaging pass. The fix is built and staged locally. C08 remains paused at 19/21 verified tasks, with the rejected warm combat comparison and phase gate open; no overall speedup is claimed. Game source remains uncommitted. Remaining native skill/FX and complete map/game acceptance stay open.

These are separate source checklists, not release-completion percentages.
