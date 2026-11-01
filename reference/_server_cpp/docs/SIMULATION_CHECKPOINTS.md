# Simulation and MariaDB follow-up, 1 November 2026

All five tasks are implemented and checked within the user's revised **two-client** scope.

- Native NPC AI, pathfinding, visibility, packets, scheduler, combat, movement, recovery, persistence and waits have separate timing. Fiber scopes exclude suspended service time. Occupied buckets retain the exact native spiral recipient/order rules; the original fixtures pass.
- Pure coordinate changes use a one-second checkpoint. UI refresh and no-change recovery/effect polling retain it. HP/TP, inventory, money and other changes still commit immediately. Disconnect/shutdown flush the latest position; handoff transfers it, and external trade/cash/guild reloads flush first. Five moves become one save. Delayed-save checks preserve independent-player progress and commit-before-acknowledgement.
- Manager shows channel populations, tick p95/p99, queues, database mean/max and private memory. Real GUI creation, start and drain of channel 2 pass. Controls wrap in narrower windows.
- `_server_final` now uses dedicated MariaDB 11.8.9 at loopback port 13306. Its SQLite file and pre-migration backup are retained. Every available field of the preserved account was read back before activation. A populated native fixture verifies character/cargo/guild/deletion/receipt data, dump/restore, and recovery of an existing pool after an orderly database restart. The failed request returned in 203 ms without success acknowledgement. DPAPI credentials remain outside source and client files.
- Two clients using the actual BGFX networking code pass movement, normal attacks, skill hits observed by the peer, monster death, loot pickup, party/guild/room chat, trade and cash delivery against MariaDB. They open no offline databases and run no local combat authority.

| Short matching social workload | Before | After |
|---|---:|---:|
| Visibility p95 | 110 us | 2 us |
| Tick p95 | 16.742 ms | 9.021 ms |
| Recorded maximum tick | 28.006 ms | 19.068 ms |

The combined MariaDB combat session records 47 movement updates, four position checkpoints, zero checkpoint failures and a 46.026 ms maximum tick. These short two-client observations do not re-accept the former 256-player run or prove its 221 ms spikes are eliminated at that population. Physical multi-machine, thousand-player and thousand-transaction capacity remain unproven.

The graphical INTRO attempt stops at missing `resource/fx/fxMAPnewIntro.txl`. It is recorded and skipped as requested, with no extracted or guessed replacement assets. The network session establishes authoritative skill hits, not rendered projectile/FX acceptance. A projectile may start and finish between replica polls. No Debug build or broad FX regression was run.

## Configuration and operation

`[persistence] position_checkpoint_ms` in `scaling.toml` accepts 100..5000 ms, or 0 for immediate saves. The interval schedules a checkpoint; bounded queue and database service latency also applies. Abrupt process/machine loss can lose movement since the last completed checkpoint. Economic writes are not coalesced or blindly replayed after uncertain transport failures.

Use **Create Channel** for ordinary maps 1..10 and channels 2..999. Zero game/admin ports select unused listeners. The primary profile/data are retained, and the new channel's copied files are checked by hash. **Drain Selected** closes admission through the existing graceful deadline.

Manager starts the optional local MariaDB before SQLDMN and leaves it running when game workers stop. It verifies the configured port, owned database and provisioned executable; an occupied but unusable port does not start another database. This is a per-user process, not a Windows service. DPAPI CurrentUser credentials cannot simply be copied to another account/machine; restore native dumps into freshly provisioned credentials there. Remote MariaDB still requires TLS.

The stopped-worker Manager CLI supports `--database-backup`, `--database-restore <owned-backup.sql>` and `--migrate-sqlite <target.toml>`, together with `--root <server-root>`. Migration needs an empty dedicated target, upgrades a source copy, commits and verifies native fields, then activates the profile. Existing SQLite data is retained. Schema 0 reserves ownership during initial DDL; normal runtime requires completed schema 7. The pending-handoff key explicitly trims CHAR values for SQL-mode independence.

## Evidence

- [Before/after profile](evidence/tick-profile-20261101.json)
- [Checkpoint and delayed-economy check](evidence/checkpoints-20261101.json)
- [Manager controls and metrics](evidence/scaling-gui-20261101.json)
- [Migration, backup/restore and outage](evidence/mariadb-deployment-20261101.json)
- [Two-client MariaDB session](evidence/two-client-simulation-20261101.json)
