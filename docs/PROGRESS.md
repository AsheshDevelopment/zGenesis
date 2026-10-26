# Roadmap website progress

Version: 1.0.12. Reviewed: 2026-10-27.

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
- **Tantra-B**: 125/254 named tasks checked (49%); 5/10 gates recorded. Latest: Native tooltips, NPC greetings and birth FX verified. Verify the supplied tooltip screenshots against native source; compile the original effect formatter, message IDs, family predicates and refinement arrays. Render centred coloured item/skill rows with live instance fields, requirements, prices/service context and current/next skill conditions/effects/costs. Restore original NPC hover/down image9 and play each NPC greeting once per opening through HPK-backed miniaudio effects gain. Defer player NEWBORN and monster birth until rendering is ready; verify first appearance, revive/life/AOI changes, equipment retention, expiry and cleanup. Fix sale confirmation mixing legacy item-name bytes into UTF-8 English text. Debug/Release each pass nine focused tests: 3,759 tooltip, 337 UI and 190 presentation/audio assertions. Pixel checks isolate 5,727 NPC hover pixels and verify coloured tooltip glyphs. Actual SDL paid-repair/buy/sell/cancellation workflow, SQLite preservation and 53-file packaging pass. Corrected early merchant attempts are retained. P11-07 closes; 125/254 tasks and five gates. The K3 table has no matching screenshot mount entry; 45 unhandled formatter effect IDs and wider game/FX work remain recorded and open. Remaining native skill/FX and complete map/game acceptance stay open.

These are separate source checklists, not release-completion percentages.
