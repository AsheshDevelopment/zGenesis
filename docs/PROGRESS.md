# Roadmap website progress

Version: 1.0.27. Reviewed: 2026-11-05.

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
- **Tantra-B**: 173/254 named tasks checked (68%); 6/10 gates recorded. Latest: Native party controls, signed LAN deployment and new-character entry fix. Implement source-based automatic party loot with nearby living recipients,native currency rounding,stack/overflow behavior and random equipment fallback. SQL recipient commits are atomic and receipt/revision protected; MSGSRV persists leader-owned loot mode. Native sender/expiry invitations and party/Ashram leave/kick/disband prompts use original images. Focused Release SQL/social and GPU component checks pass. Export signed profile15 with matching172.16.90.12 TLS identity and game listeners; actual staged HTTPS status200 and six hostname-verified TLS endpoints pass. Enable executable-specific LocalSubnet firewall rules while SQL/RPC remain loopback. Development/final servers share preserved MariaDB13306/tantra_bgfx schema9; local phpMyAdmin separately selects it alongside XAMPP3306. Fix newly created character entry by synchronizing channel roster slots after create/delete ACKs; a focused native-channel regression preserves appearance and reconnect while rejecting foreign owner inventory. Stage the Release launcher and build a signed LAN ZIP with tamper rejection. Earlier two-client graphical journey evidence is separate; another PC,live graphical automatic loot,Internet/public-capacity/abuse/operations acceptance remain open. No Debug or broad FX/performance rerun. Coverage stays173/254 (68%),6/10 gates. Preserve Tantra-O. Remaining native skill/FX and complete map/game acceptance stay open.

These are separate source checklists, not release-completion percentages.
