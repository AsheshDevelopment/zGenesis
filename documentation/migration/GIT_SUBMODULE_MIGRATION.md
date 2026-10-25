# Git submodule migration

Prepared 2026-10-25 in C:/_GitHub/tantra-dev-main from the preserved
C:/_GitHub/TantraSrc workspace. No original history was rewritten.

- [x] Clone the parent and five child repositories without replacing remote history.
- [x] Back up original history, staged changes and working diffs outside the old checkout.
- [x] Import manifest-owned client runtime plus 148 supplied HPKs, excluding private state.
- [x] Import active C++ into _server and archive Rust source under legacy/rust.
- [x] Import HTLauncher source; preserve SDL3 commit 535d80badefc83c5c527ec5748f2a20d6a9310fe.
- [x] Retain the ten selected original source folders under _references/Tantra.
- [x] Centralize docs and provide six repository READMEs and tailored ignore rules.
- [x] Use exact-byte attributes and Git LFS for binary assets/datasets.
- [x] Validate Python/PowerShell syntax and fresh client/server CMake configuration.
- [x] Complete fresh Release client/server builds and all 69 server CPU checks.
- [x] Commit/push all five children, then the parent pointers.
- [x] Verify all six remote main heads and clean recursive submodule state.

See IMPORT_MANIFEST.json, ADAPTATIONS.json, VALIDATION.json and BUILD_AND_INPUTS.md.
Original source/reference/client runtime bytes are retained; historical evidence
remains scoped to its recorded artifact. The runtime client is the previous
built artifact, not newly certified by this migration. No game/zone/service is
launched and the full server gameplay goal remains paused.

Build/SDK/dependency caches, personal SQLite/userdata and logs are excluded.
Original client assets and B:/E: authoring/deployment inputs remain external.
Child histories import the current state; original history remains in the old
checkout and C:/_GitHub/tantra-migration-backup-20261025/original-history.bundle.

Validation: 89 Python tools and PowerShell tools parse; primary documentation links resolve.
No ordinary staged blob exceeds 100 MiB. Imported reference/client bytes and all
3,378 original source snapshot hashes match. Original Git HEAD/status and private save hashes are unchanged.

The first complete publication was verified at parent commit
`d1f02c8ec96ed2f59c1c0faed9815d4586c6bafd`; PUBLICATION.json records that
checkpoint. Later documentation updates change the docs and parent commits.
Use the parent Git tree for the latest exact submodule versions. Git LFS fsck
passed for _client, _server and _references. The backup bundle was verified as
a complete history. Continue development in C:/_GitHub/tantra-dev-main;
C:/_GitHub/TantraSrc remains the preserved original workspace.
