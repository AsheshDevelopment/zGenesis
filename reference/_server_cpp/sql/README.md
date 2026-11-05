# Tantra BGFX game databases

These definitions match the C++ server, not the historical SQL Server schema.
SQLDMN schema **9** supports SQLite (the packaged default) or MariaDB 10.11+.
ITMSRV cash and worker run history remain separate SQLite databases on either backend.

| Database | Packaged location / selection | Definition |
| --- | --- | --- |
| Accounts, characters, warehouse, guilds, sessions and handoffs | `services/SQLDMN/state/server.sqlite3`, or the database in `services/SQLDMN/storage.toml` | `sqlite/001_schema.sql` or `mariadb/001_schema.sql` |
| Cash balances and delivery journal | `services/ITMSRV/state/cash.sqlite3` | `sqlite/002_cash_schema.sql` |
| Worker start/stop history | Each `services/*/state/operations.sqlite3` and `zones/*/state/operations.sqlite3` | `sqlite/003_operations_schema.sql` |

The game database has 14 game tables (plus MariaDB's `storage_meta` identity table).
Characters use the original **1688-byte MOB snapshot**;
inventory, equipment, skills, quests, level, HP/TP, currency and guild membership are
inside that snapshot. Guild ranks below master and guild marks use the additive
`guild_roles` and `guild_marks` tables; rank 10 is derived from `guilds.leader`.
Existing members default to rank 0. Warehouse items use **1920 bytes (120 native item slots)**.
Do not add parallel SQL inventory/stat tables or edit these blobs from a website.
Static item/skill/NPC definitions come from the shipped data and editable XLSX files.
Presence and parties are live service state; they are not additional SQL tables.

## Original SQL reference

The original SQL Server exports are read-only references in
[`Tantra/Database`](https://github.com/AsheshPlays/Tantra-Src/tree/main/Tantra/Database):

| Original file / structure | BGFX C++ mapping |
| --- | --- |
| `UserLogin.sql`, `dbo.Account` | `accounts` authentication; the original has registration/activation/blocking and website profile fields. A complete website/enrollment/blocking port is still a beta release task. |
| `Tantra.sql`, `Account.Account binary(7124)` | The historical whole-account binary container. Our store separates account ownership, three 1688-byte native character snapshots and the 1920-byte shared warehouse. A SQL Server import adapter has not been accepted. |
| `Tantra.sql`, `GameInfo00` through `GameInfo05` | Character/world summary and ranking projections; these are not the original full inventory/skill/quest payloads. Future website projections must read authoritative data through the trusted backend. |
| `Tantra.sql`, `TantraItem` / `TempTantraItem` | Account/world item delivery records; current ITMSRV uses its local cash/delivery journal and SQLDMN receipt fence. |
| `billcrux_phil.sql`, user/service/balance/order tables | Country billing reference. Current General/Hanbit/Philippines adapters use the local ledger; live provider integration remains separate. |

The remake preserves native gameplay payloads and rules while using the C++
SQLite/MariaDB schema. Do not execute these SQL Server exports as MariaDB
migrations. Native original tables and registration procedures remain reference
material; copying historical website/payment tables does not implement their
server behavior. `userLevel DEFAULT 0` and the exact administrator test
`userLevel = 1` are explicit remake requirements.

## Account controls

Schema9 adds `account_controls` with original block/date semantics. Use Server
Manager Accounts for block/unblock, timed blocks, reset and all-world revocation.
Only the protected operator administration endpoint accepts these operations;
game-service RPC rejects them. Reset writes both Argon2id verifiers and retires
sessions, grants, tickets and handoffs without changing characters or `userLevel`.
See [account controls and beginner implementation](../docs/BETA_ACCOUNTS_BEGINNER.md).

## Opening or creating the database

Existing installations: replace the three server executables while stopped, then
start normally or use **Tools > Prepare database schema**. The server upgrades
owned older databases automatically; it preserves accounts, characters and balances.
All pre-v6 accounts receive `userLevel=0`. It does not promote any account.

For a new empty database, execute only the appropriate `001_schema.sql`.
Execute `002_cash_schema.sql` against a separate empty cash database and
`003_operations_schema.sql` against each separate empty operations database if
preparing those manually. The workers can also create these files themselves.
Do not run every `.sql` file together. Maintenance and registration files are examples
to run individually against their stated database, not migrations.

## Accounts and future website registration

`accounts.userLevel` is a non-null integer with default **0**. **Only `userLevel = 1`
is an administrator**; values 0 and 2..255 are not admins. No username is implicitly
an admin. SQLDMN returns this classification in authenticated account data and the
Accounts query. Private `account_authorization` checks the current database value
from a valid session, including after demotion. It is not a public HTTP endpoint.
Server Manager's local operator token is separate from a game account.
This account role does not enable unimplemented online GM commands.

Future registration must run on a trusted backend and use a parameterized INSERT:

```sql
INSERT INTO accounts(name, verifier, web_verifier, userLevel) VALUES (?, ?, ?, 0);
```

Never accept `userLevel`, an admin flag, or a precomputed password hash from a
registration request. Use `Store::provision_native` through a trusted backend,
or implement exactly the following compatibility contract before binding values:

1. Account: 1..51 ASCII bytes, no NUL; case-insensitive unique. A website may impose
   a stricter printable username policy. Use the same normalized name for cash.
2. Password: 1..20 ASCII bytes, no NUL. For this native protocol, fold ASCII A-Z to
   lowercase (passwords are consequently case-insensitive).
3. Zone proof: lowercase hexadecimal MD5 of that normalized password.
4. Web proof: lowercase hexadecimal MD5 of `@` + first normalized character + `^`
   + the remaining normalized characters. One-character passwords have an empty tail.
5. Independently hash each 32-byte proof string with Argon2id v19,
   memory=19456 KiB, iterations=2, parallelism=1, random 16-byte salt, 32-byte output.
   Store PHC encoded strings in `verifier` and `web_verifier`, respectively.
   The required prefix is `$argon2id$v=19$m=19456,t=2,p=1$`.

Never store plaintext or raw MD5 proofs in these columns. Never implement this
with SQL `MD5(password)` alone: the C++ verifier requires the Argon2id encoding.
Do not trim passwords or use Unicode case folding. The two Argon2id salts must be
independent. Rate limits, verification email, password reset and browser sessions
belong to the future website; those features are not implemented by this schema.

The optional `mariadb/010_website_access.sql` creates views that exclude password
hashes and documents column-limited registration grants. The example registration
queries use placeholders and are intended for a prepared statement API; they are
not executable sample accounts. Keep DB credentials and verifier queries server-side.
SQLite registration should go through the trusted server backend, not a database
file shared with public browser code. Check admin using `userLevel == 1` in every
future privileged handler, never `userLevel > 0` or truthiness.

## Maintenance and backups

`020_admin.sql`: inspect roles and explicitly promote/demote one account. Updates
do nothing until their confirmation and target placeholders are deliberately set.
`030_inspect.sql`: counts, accounts without exposing hashes, sessions and integrity.
`040_cleanup.sql`: stopped-server transient session/zone/grant/handoff cleanup,
guarded by an explicit confirmation. It leaves durable characters/cash intact.
`050_wipe_game.sql`: guarded full game-data wipe, including accounts and receipts.
`sqlite/051_wipe_cash.sql`: matching guarded cash reset. Neither is executed by
setup or by this delivery. Stop all services, take backups and run both resets as
one maintenance operation; if either fails, restore both before restarting.
There is no atomic transaction spanning MariaDB and the cash SQLite file.
Do not truncate only wallets/orders, or only receipt rows, while delivery is active.

`060_backup.sql` explains the correct backup operation for its backend. SQLite
`VACUUM INTO` creates a consistent copy of an open database at a new filename;
it must run outside a transaction. A complete server recovery set requires the
game DB, cash DB, configuration, data release and private connection identity from
the same stopped maintenance window. Worker history is optional for gameplay but
included in a full operational backup. Never copy a live `.sqlite3` file alone
and ignore its WAL. Server Manager also supplies checked SQLDMN backups.

MariaDB uses `mariadb-dump` for a restorable logical backup, not a made-up SQL
`BACKUP DATABASE` statement. In a terminal with MariaDB tools installed:

```text
mariadb-dump --host=127.0.0.1 --user=backup_user --password --single-transaction --quick --hex-blob --routines --events --triggers --result-file=C:/Backups/tantra_bgfx-YYYYMMDD.sql tantra_bgfx
```

Use a new real backup filename and your actual database/user. `--password` prompts;
no password is written in this command. Do not run schema changes during the dump.
Restore into a separate empty database first with the MariaDB client's `SOURCE`
command, validate it, then configure SQLDMN while stopped. SQLite restoration:
stop workers, retain a pre-restore snapshot, restore the game/cash pair, run
`PRAGMA integrity_check` and `PRAGMA foreign_key_check`, then restart. The managed
SQLDMN Restore action also fences stale sessions; raw restoration needs the
confirmed cleanup query before players reconnect.

Sources: [SQLite VACUUM INTO](https://www.sqlite.org/lang_vacuum.html),
[MariaDB mariadb-dump](https://mariadb.com/docs/server/clients-and-utilities/backup-restore-and-import-clients/mariadb-dump),
[MariaDB column privileges](https://mariadb.com/docs/server/reference/sql-statements/account-management-sql-statements/grant).
