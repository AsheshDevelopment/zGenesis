# Roadmap website progress

Version: 1.0.5. Reviewed: 2026-10-26.

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
- **Tantra-B**: 92/254 named tasks checked (36%); 3/10 gates recorded. Latest: Native monster default ranged attacks. Replace fixed-range idSkill0 attacks with source default melee/ranged selection and locked MONSkill animation/TAB timing. Monsters2004/2005 pass eight fine/coarse encounters and three GPU cases in Debug/Release, including visible follow/impact and eight lifecycle/rebind checks. SDL combat/audio/Prana and88 buff/equipment checks pass. The current build has six isolated profile trials/7,200 measured frames; dense43-actor medians9.67–9.87ms include4.10–4.16ms CPU pose work. Special-skill patterns, timed monster states and wider skill services remain open. Remaining native skill/FX and complete map/game acceptance stay open.

These are separate source checklists, not release-completion percentages.
