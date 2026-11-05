# Roadmap website progress

Version: 1.0.28. Reviewed: 2026-11-05.

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
- **Tantra-B**: 173/254 named tasks checked (68%); 6/10 gates recorded. Latest: Original-style Tantra launcher, signed patching and shared game settings. Combine the native C++ patcher and launcher in Tantra.exe; retire Update.exe and require its inherited one-use handoff before ZFLauncher starts. Preserve offline entry, game restart supervision, package tooling and Manager launches. Publish signed schema-2 Patcher.dat, immutable lists/notices and hashed payloads to the LAN XAMPP feed. Verify tamper rejection, interrupted-install recovery and preference-preserving checks. Reuse original K2108 PE bitmap resources and dialog grouping without modifying the originals. Remove duplicate disabled captions; launcher Options saves the same game Graphics.cfg/Interface.sys formats for resolution/aspect/custom size, window modes, actual graphics quality and separate sound volumes. One isolated launcher session verifies File Check, Apply/reload/Cancel, invalid resolution and borderless controls. Earlier focused Release checks also correct native owner speed, any-angle collision-swept routing and smooth monster/peer interpolation. Current beta ZIPs predate these fixes. No gameplay/FX benchmark rerun or separate-PC/public acceptance is claimed; 173/254 tasks (68%),6/10 gates remain unchanged. Preserve Tantra-O. Remaining native skill/FX and complete map/game acceptance stay open.

These are separate source checklists, not release-completion percentages.
