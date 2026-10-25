# Colocated MainUI asset loading, 2026-10-23

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.
The normal offline launch could fail after village selection with
`Native HUD extraction cannot write into the canonical client`.

`MainHudPresentation::prepare` previously selected archive extraction whenever
`resource/UI/MAINUI.hpk` existed, even if the final client's complete loose HUD
images were already available. The normal cache is below `_client/userdata`,
inside the same asset root. The extraction guard correctly refused a write
inside that input root. Earlier QA profiles were outside `_client`, so they did
not reproduce the default-folder failure.

`resolveMainHudTextures` now selects the complete loose image set first. Only an
incomplete set falls back to archive extraction, whose source-folder protection
is unchanged. Existing archives, source assets and normal user saves are retained.

Implementation:

- `C:\_GitHub\TantraSrc\_remake\src\resources\NativeMainHud.{h,cpp}`:
  shared asset-root selection and the existing guarded extractor.
- `C:\_GitHub\TantraSrc\_remake\src\rendering\HtRenderFacade\MainHudPresentation.cpp`:
  uses the selected root for original MainUI bitmap loading.
- `C:\_GitHub\TantraSrc\_remake\src\tools\native_main_ui_probe.cpp`:
  regression fixture with loose files, an archive and an in-client cache; checks
  that complete loose assets cause no cache writes and incomplete assets retain
  extraction protection.
- `C:\_GitHub\TantraSrc\_remake\tools\verify-intro-characters.py`:
  `--user-data-parent` places the isolated QA profile under the final client's
  userdata directory so this normal folder layout can be tested.

Release x64 build and the focused MainUI regression passed. The final client was
staged and passed static manifest/import verification (4,176 owned files).
`C:\_GitHub\TantraSrc\_client\HTLauncher.exe` SHA256:
`D455267A293231F464015306819A1EB4C6F98F542ED0E7949AC2B22EA663E82D`.

Build/check logs: `_remake/build-ogre-sdl/hud-loose-priority-{build,check,stage,static}.log`.
The single offline route-1 runtime evidence is under
`_remake/build-ogre-sdl/hud-loose-priority-runtime-20261023/`.

That session and the Python validator passed: character selection, CHAR_INIT,
Mandara with HUD, movement, inventory transfer, equip/unequip, SQLite schema 4
and persisted character-slot checks. It used a temporary child profile under
`_client/userdata`, with existing HPK archives left in place. Normal
`userdata/offline/tantra.sqlite3` and `userdata/system/SaveID.bin` hashes were
unchanged. One client process ran on one channel and exited cleanly; no second
session was started. No NPC-service or exhaustive collision acceptance is
claimed by this targeted run. Summary: `docs/evidence/hud-asset-path-fix.json`.
