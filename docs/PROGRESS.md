# Roadmap website progress

Version: 1.0.11. Reviewed: 2026-10-27.

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
- **Tantra-B**: 124/254 named tasks checked (49%); 5/10 gates recorded. Latest: Native Settings layout matches supplied reference. Replace stretched value rows with a compact 330-pixel Settings frame, Presets/Options sections, native 64x19 gold button groups, selected highlights and plain values between arrows. Add working Low/Mid/High presets while retaining custom resolutions, all three aspect ratios, window modes and existing live quality/sliders. High retains native 2048 shadows; Ultra selects 4096. Debug/Release builds and three focused MainUI/Interface tests per configuration pass; final hidden SDL/bgfx UI checks are rerun after label refinement. Actual SDL passes 103 checks, including presets reaching renderer/camera state, persistence and Apply/Cancel. Review 1024x768 and 800x600 captures; 53-file packaging and protected/default/seed preservation pass. No new task or gate is closed. MSAA, model/FX/object-distance and circle-shadow controls from the reference remain separate renderer work. No new failures or FPS/visual-parity gain is claimed. Remaining native skill/FX and complete map/game acceptance stay open.

These are separate source checklists, not release-completion percentages.
