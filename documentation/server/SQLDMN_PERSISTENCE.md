# Native C++ SQLDMN persistence and ownership

Updated: 2026-10-24. SQLDMN now has an authoritative C++ SQLite store and protected
local RPC. DBSRV/native client transport, zone gameplay and the full implementation
plan remain unfinished. `game_ready` stays false. This is not stock-server binary
interoperability or connected OGRE gameplay acceptance.

## Implemented behavior

- Separate `services/SQLDMN/state/server.sqlite3` for authoritative saves;
  `operations.sqlite3` continues to hold process history only.
- Schema identity `0x54535256`, migrations through version 4, WAL, foreign keys,
  prepared statements, full commits and transactional rollback. Unrelated/future
  databases are refused before mutation.
- Case-insensitive account identity, salted Argon2id verifiers and the selected
  native password/web proofs. Credentials are insert-only; no implicit password reset.
- Three fixed character slots, world-wide case-insensitive character names,
  1,688-byte native snapshots, deletion backups and compare-and-swap revisions.
- Original C++ character creation/check/codec components reused directly. All eight
  native tribes and the source-accepted nonstandard tribe have checked byte fixtures.
- 120-slot cargo, atomic character/cargo revisions, item property/count and money
  conservation. Native stack identity excludes count/serial as in the existing
  source-backed rules; global item-serial authority remains an ITMSRV/gameplay task.
- A separate playing-owner `commit_service` transaction for one declared NPC
  sale or repair, with both character/cargo revisions. It validates the exact
  allowed item/money delta instead of bypassing movement-conservation checks.
  Native price/range/service rules remain the zone authority's responsibility.
- Account/world leases, zone-instance leases, stale-owner fencing, roster-to-world
  replacement, same-attempt retry, binding and renewal.
- Durable handoff reservation, idempotent claim/cancel, source disconnect protection,
  timeout/reopen recovery and destination ownership checks. These are persistence
  transactions; live map travel remains open.
- Consistent staged backups, no overwrite of an existing backup, and offline restore
  from the selected SQLDMN's own backup directory. Restore retains a pre-restore copy,
  validates schema/integrity, and clears restored runtime ownership.

Clock defaults: account sessions 180 seconds, zone owners 30 seconds and handoff
reservations 60 seconds. CPU tests inject a clock instead of sleeping through expiry.

## Process and protocol boundaries

Set SQLDMN's profile implementation to `cpp-sqldmn`. New initialization uses that
value; `--enable-storage` upgrades the earlier owned administration-only profile
while stopped. The older `cpp-administration` mode remains available for isolated
management tests. Other shared-service backends are still unavailable.

The default SQL RPC port is 21005 and administration port 22005, both on loopback.
They have separate tokens, listeners and connection capacity. SQL execution is
serialized through the store; administration health/shutdown does not depend on
an account operation finishing. This is bounded development infrastructure,
not a measured production capacity claim.

The data envelope preserves the existing logical persistence request shape:

```json
{"token":"<service-token>","command":{"command":"execute","operation":{"op":"roster","session":"<lease>"}}}
```

Frames are newline-delimited JSON with a 65,536-byte request bound. The data token
is `state/service-token`; version-1 management requests use `state/admin-token`.
The C++ client has a bounded response read/deadline. Native client packets do not
gain SQL tokens, JSON operations or direct snapshot-write privileges.

The persistence operation names follow the Rust reference contract. Additional
C++ operator commands provide storage summaries, bounded account pages and owned
backups. Account pages contain identity/counts, never verifiers. Page size is at
most 200. Unsupported/unknown commands and malformed fields fail explicitly.

## Win32 operator tools

After starting SQLDMN, Accounts refreshes its data through RPC and provides a
native password-confirmation dialog for creating credentials. Plain passwords
are not queued as RPC operations or saved in the manager state. Database displays
owner-provided counts and requests backups through SQLDMN.

The connected Accounts view is rendered and checked against one isolated SQLDMN.
The Database view and restore control also render with a live isolated service pair.
Restore picks an owned backup, asks for explicit confirmation and runs the stopped
SQLDMN tool on the background controller. The manager does not open SQLite itself.
Modal account input, backup-button and restore-picker/confirmation acceptance
remain open. Resource presence alone does not complete those workflows.

Stopped-service CLI tools:

```powershell
.\bin\TantraService.exe --service .\services\SQLDMN --enable-storage
# Supply the password over stdin; it is not a command-line argument.
.\bin\TantraService.exe --service .\services\SQLDMN --provision --account ashesh --password-stdin
.\bin\TantraService.exe --service .\services\SQLDMN --backup
.\bin\TantraService.exe --service .\services\SQLDMN --restore "<owned state\backups\file.sqlite3>"
```

Provision/backup/restore hold the same instance lock used by the worker. Restore
must not run against a live service or an unrelated database. No real profile is
restored during verification; CLI/restore checks use isolated outputs only.

## Verification and references

Seven CPU suites cover credential compatibility, nine codec cases, rejected
creation paths, revisions, cargo conservation, ownership, retry/fencing, transfer
recovery, migration, concurrent saves, backups and restored ownership invalidation.
Migration checks preserve nonempty cargo, money and character revisions.

One connected route per verification run uses an isolated SQLDMN, creates/authenticates
ashesh, stores a character, rejects unauthorized RPC, checks account/backup responses,
renders Accounts and exits the manager without stopping the externally owned worker.
SQLDMN then exits cleanly; the authoritative database reopens with the character and
zero sessions. No zone listener or game client is launched.

The fixed public credential fixture was generated independently with Rust
`argon2` 0.5.3 and Python native MD5. Tests and deployed binaries consume the checked
fixture; no Rust runtime or Cargo build is required by the C++ project.

- `_server_cpp/src/persistence`: C++ credentials, store, schema and ownership rules.
- `_server_cpp/src/common/admin.cpp`: separate administration/data listeners.
- `_server_cpp/src/native/PROVENANCE.json`: unchanged source-copy hashes for the
  selected `_remake/src/client/NativeCharacter*` components.
- `_server_cpp/fixtures/PROVENANCE.json`: native codec and independent credential inputs.
- `_server/crates/services/src/persistence.rs` and `persistence/ownership.rs`:
  selected migration, operation and ownership reference contracts; unchanged.
- Original `Tantra/DBSRV`, `Tantra/SQLDAEMON` and `Tantra/zone`: selected native
  sequence/creation/protocol references. Their full transport is not transplanted here.

Current evidence: [sql-persistence.json](evidence/sql-persistence.json). The earlier
[management foundation](MANAGEMENT_FOUNDATION.md) remains historical M1 evidence.
