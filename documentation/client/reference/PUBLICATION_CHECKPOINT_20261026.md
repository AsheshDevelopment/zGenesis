# Publication checkpoint - 2026-10-26

The user requested documentation updates and committing/pushing all pending
workspace changes, including modules, to main after implementation.

## Repository scope

| Repository | Publication scope |
| --- | --- |
| `Tantra-Development/_remake` | Pending native client implementation, tools, CPU fixtures and source README |
| `Tantra-Development/_client` | Rebuilt launcher, manifest, newly required runtime assets and current build README |
| `Tantra-Development/docs` | Implementation guides, phased plan, progress and individual evidence files |
| `Tantra-Development/tantra-dev-main` | Workspace README and exact published submodule revisions |
| `Tantra-Development/_server` | Verify main; no source changes at this checkpoint |
| `Tantra-Development/_references` | Verify main; no original source changes at this checkpoint |
| `_remake/external/SDL3` | Preserve the existing upstream pin; no changes |

Workspace: `C:\_GitHub\tantra-dev-main`. The separate legacy checkout at
`C:\_GitHub\TantraSrc` is not rewritten. Its `_client` output received the
same rebuilt executable; its other source changes are outside this publication.
No bgfx submodule is currently registered in this workspace; this publication
preserves the existing five-module topology.

Pending changes include earlier native animation, combat/FX, map lighting/audio,
UI/tooltips/names/cursors/hotkeys, vegetation/material, loading/culling/batching,
telemetry and ground-decal work as well as the final Mandara/skill checkpoint.
Each guide/evidence file retains its own verification scope. This is not a new
full gameplay acceptance run or a claim that all native systems are complete.

## Verification retained

- [x] Release x64 HTLauncher rebuilt and installed in both client outputs.
- [x] Eight focused CPU checks passed across the final verification commands.
- [x] Both static client packages verified with runtime launch skipped.
- [x] Matching launcher SHA256:
  `bceb3abb96a35ea16bdb4bff5637cdd35822542f8e996fad564c046c9abdb651`.
- [x] Existing 148 HPKs in each client and 49 userdata files in the user's output
  retain their recorded before/after hashes.
- [ ] Rendered field/skill/HUD/vegetation and audio acceptance.
- [ ] Missing source assets and specialized skill/authority paths described in
  the [current checkpoint](../guides/MANDARA_FIELD_AND_SKILL_FX.md).

The broader goal remains paused. No game, renderer, server or audio device is
launched for this publication. Private saves, local logs, build/SDK caches and
credentials remain ignored. Push child commits first, then publish the parent
pins. Exact publication hashes are recorded by Git history and the final task
result; successful remote ref checks establish completion.

## Implementation revisions

These exact child commits are included in this publication. Remote publication
is confirmed separately after pushing; the parent records the final docs commit.

| Module | Commit |
| --- | --- |
| `_remake` | `46271f3821733b217a2a75f5b048e6020aaa2757` |
| `_client` | `205593526ddd2b8daf6ac4ba424dad6b7b8ebdc0` |
| `_server` | `b4a4ed607e726c3c59261cc5bae482689af8b906` |
| `_references` | `eb248ef50bd2d0f5ec1bf0a59d904d62eacd63dc` |
