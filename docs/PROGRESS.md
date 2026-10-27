# Roadmap website progress

Version: 1.0.14. Reviewed: 2026-10-28.

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
- **Tantra-B**: 133/254 named tasks checked (52%); 5/10 gates recorded. Latest: C06 ordinary services and basic combat accepted. Close all 19 C06 tasks after implementing native off-hand and bow/arrow placement, atomic final-slot validation, direct warehouse/equipment transfers, consumable unpack fallback, authored monster HIT/DIE timing and finite restarts, combat-sight disengagement and range-aware approach. Debug/Release each pass 27 focused tests; the new authority matrix covers 27 inventory and eight fine/coarse combat cases with exact 80/10/10 normal/critical/miss decks. Nine actual SDL legs verify inventory, selection/attack FX and facing, defeat/reward/pickup, death/revival, warehouse/save point, paid repair/buy/sell and money/capacity failures, plus fresh-process reloads. SQLite and protected/default/seed preservation and 55-file packaging pass. Record missing Global arrow 7091 and use supplied 7092 only in the owned fixture. Correct stale headless zoom setup and private test fixtures. P07-12, P11-06, P12-01, P12-04 and P12-05a/06a/07a close:133/254 (52%), five gates. Full AI/roam, timed consumables, online services, complete loot/penalties and other maps remain C09. Remaining native skill/FX and complete map/game acceptance stay open.

These are separate source checklists, not release-completion percentages.
