# Automatic MariaDB backups

Server Manager runs one background native dump at a time while it is open.
Gameplay may continue during a dump. Closing Manager stops scheduling; it waits
for a current dump before exit. The standalone `--backup-maintenance` command
runs one dump and retention pass for an external scheduler.

The Tools page and Tools menu provide **Automatic backup settings** and **Back up
now**. Settings apply immediately. `backup.toml` in the server root defaults to
60 minutes, 24 scheduled copies and 14 days. The dump executable defaults to the
bundled `database/bin/mariadb-dump.exe`. Native tools receive the configured
database credentials through the child environment; secrets are not displayed.

The Database page shows connection/backend/schema/version and independently
reports the identity-checked local MariaDB process. A stopped SQLDMN does not
mean that MariaDB is stopped. This page also shows the latest scheduled result,
error and next due time. State survives Manager restarts in
`state/backup-schedule.json`; failed attempts retry after five minutes.

Retention runs only after a successful checked dump. It considers only files
under this SQLDMN's `state/backups` whose ownership, backend, schema and SHA-256
manifest validate and whose purpose is explicitly `scheduled`. It always keeps
the newest two verified scheduled copies. Manual backups, recovery copies,
migration snapshots, corrupt manifests and foreign files are preserved.

Restore remains an explicit Database-page operation with stopped game workers.
Backup and restore share an operation lock. Before restoring, Manager validates
ownership and checksum and makes a recovery dump. Success reports the recovered
schema and recovery-copy path; SQLDMN stays stopped. Failure during restore
reports the recovery-copy path. Runtime login/session/zone ownership is expired
after a successful restore, so clients reconnect through normal admission.

On 2 November 2026 the focused Release check verified owned-only retention,
minimum two copies, failed-dump preservation, persisted retry delay and native
dump/restore against `tantra_bgfx_restore_check`. Native Win32 captures verified
the deployed MariaDB status and backup-settings dialog. The deployed game
database was backed up, but was not restored or wiped by these checks.
