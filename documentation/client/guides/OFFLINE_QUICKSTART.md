# SQLite offline mode

The final **Tantra Online** client is in `C:\_GitHub\tantra-dev-main\_client`, with the
original-style `resource` and `system` layout. Double-click `Start-Offline.cmd`,
or run `.\_client\HTLauncher.exe --offline` from the repository root. This folder
uses its own staged resources. See [final client details](FINAL_CLIENT.md).

The default build output is `C:\_GitHub\tantra-dev-main\_client`. The earlier
`C:\_GitHub\TantraSrc\_client` output was also restaged for the 2026-10-25
loading repair, preserving its userdata. Future builds update the selected
`-ClientDirectory`; updating one folder does not automatically update the other.


From `C:\_GitHub\tantra-dev-main`:

```powershell
.\_remake\tools\run-remake.ps1 -Offline
```

Beside a packaged executable:

```powershell
.\run-remake.ps1 -Offline
```

For testing use
username **ashesh** and password **ashesh** in the original login screen. The first login creates a local
account; later logins check it. Password preparation follows the native locale
rules, with a safe maximum of 20 legacy bytes. The supplied country profile
lowercases passwords before generating the original compatibility digest.

SQLite data is stored under `userdata/offline/tantra.sqlite3` beside the
executable. Launcher `-UserDataRoot` or executable `--user-data-root` can select
another remake-owned directory. Saved ID uses its separate native-format file.
Repackaging preserves these private files and excludes them from the manifest.

Current working slice: login -> original gate attacks -> one-second delay ->
SERVER camera -> server selection -> character creation/selection/deletion ->
point-02 zone authentication -> native loading screen -> Mandara1st with the
initialized character. No HTTP or external server is required in offline mode;
runtime endpoint profiles use 127.0.0.1 and retain native ports.

The starting cell comes from the original `E:\Global-server\ZoneXX` data,
staged locally under `system/offline` in the final client. The original client
assets and server datasets are read-only. SQLite saves retain the owned slot,
character appearance and initialized native position across restarts.

**Full INTRO and world gameplay remain unfinished.** MainUI, movement,
bounded combat, equipment and ordinary NPC services now exist offline. Remaining
acceptance and feature gaps are listed in [current progress](../PROGRESS.md)
and the [phase plan](../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md).
Dedicated server integration targets _server and remains paused.
