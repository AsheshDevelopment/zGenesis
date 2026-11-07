# Guild roles, selected progression and MandaraCave3rd

The 5 November 2026 C++/BGFX Release checkpoint implements the requested guild,
selected quest/combat and Zone05 continuation. Matching runtime files are staged
in `_client_bgfx`, `_server_cpp/bin` and `_server_final`. Public beta has not been
accepted; use the release gates in the existing implementation plan.

## Original rules and persistence

Use `Tantra/zone/Basedef.h`, `Tantra/zone/Server.cpp`, `Tantra/DBSRV/CFileDB.cpp`
and the original launcher guild UI as rule references. Ranks are Maharaja10,
Raja9, Prubaja8, Dandeca7 and Tapasa0. Rank8 can invite and edit notices; rank9
can remove members. Only the master can assign subordinate ranks or change the
mark. A master leaving transfers leadership to highest rank, then level, then
stable roster order. Membership removal is blocked during stronghold battle.

Schema8 adds `guild_roles` and `guild_marks` without changing native MOB bytes.
Existing members default to0; master10 derives from the guild leader. Original
mark indices are emblem1..72, title1..84 and colour1..72. Items7054/7057 determine
initial/change fees (3,000,000 Rupiah in the selected data); stale mark requests
are rejected and unchanged marks are free. The existing guild window now exposes
rank and mark controls with confirmation and server permission feedback.
Native `GuildMark.hpk` DDS components are composed through the original catalog,
without extraction. Owner and nearby-peer nameplates show guild names/marks.
This does not accept guild alliances or the original 3D crest mesh renderer.

The production MariaDB11.8 schema7 upgrade also repairs the older untrimmed
pending-handoff generated key before additive DDL. Native backups bracket the
upgrade; existing account, character, warehouse and guild rows match exactly.
A separate MariaDB10.11 fresh schema/backup/restore check passes15 cases.

Original SQL exports in `Tantra/Database` are read-only references. `UserLogin.sql`
covers authentication/enrollment, `Tantra.sql` includes the 7124-byte account
container and GameInfo summaries, and `billcrux_phil.sql` covers billing records.
See [schema mapping](../sql/README.md) and [source hashes](evidence/original-sql-reference-20261105.json).
A SQL Server account import adapter and full website registration are unaccepted.
The additional phpMyAdmin administrative login was verified separately; runtime
keeps its existing dedicated database and protected credentials.

## Selected quests and combat

Reuse the compiled original quest callbacks. Story21 (Scenario2A, Amar1112)
checks accept/decline,30 Ulkamulka2011 and15 UlkamulkaKaura2012 kills,
20,000 Prana/30,000 Rupiah and progression to22, with no repeated reward.
Material tasks10006/10013/10057 consume the native cave materials and commit the
source rewards. The materials7138/7126 drop in Cave1/Cave2; hand-ins remain at
authored town NPCs1107/1111/1110. Do not invent cave NPC placement. Solo, leader
and member reward rules and reopened flags/items/rewards pass. These selected
rule checks do not claim every quest has graphical acceptance.

### Quest22–25 continuation — 7 November 2026, native authority accepted

This continuation enables only original story IDs22–25 in the shared beta
inventory and its generator. The compiled callbacks still come from
`Tantra/zone/Quest.cpp` (`eScenario2B`, `eScenario2B1`, `eScenario2C` and
`eScenario2D`); no replacement dialogue, drop table or objective rule is added.
Zone and skill allowlists retain their existing values.

| Quest | Original route/objective | Completion reward |
| --- | --- | --- |
| 22 | NPC1112 issues8017;1108 consumes it;1102 issues8018;1112 consumes the reply | 50,000 Rupiah,20,000 Prana,5503×1 |
| 23 | NPC1113 issues8020; Anjali1005 in Zone01 consumes it after its earlier dialogue priority; return to1113 | 30,000 Rupiah,20,000 Prana,6196×1 |
| 24 | Accept at1112, kill30 Heruka2014, return to1112 | 30,000 Rupiah,20,000 Prana,6502×1 |
| 25 | Kill20 Ananga2016 to earn8042;1109 issues8019;1101 consumes both proofs; return to1109 | 100,000 Rupiah,100,000 Prana,6502×1 and7009×20 |

The accepted `shambala-quest-journey` check continues a preserved quest21
checkpoint earned through45 native kills, without repeating that combat.
Its exact DB/MOB, accepted result/log and provenance are copied under
`D:\Tantra-Beta\Expansion-20261107\quest22-25-input`. The1688-byte MOB has SHA256
`390db35f055a92cc329a38eb726c59debe5cfeb1ea43ebbe23d4d5a376cff29c`.
The original database remains unchanged. The input retains its historical
seeded quest20 prerequisite and overallocated QA attributes; the separately
accepted11–20 journey is not the same character history. The duplicate uses an
explicit QA first-class prerequisite of1, preserving the source Abbas dialogue
priority. No new quest flags, kill counters, letters,8042 proof or rewards are
seeded.

The preserved runs pass original portals101/121 and116/117,30 actual Heruka
kills and20 actual Ananga kills, partial saved return, correlated native
notifications, exact source rewards across level-ups, proof consumption and
replay rejection. At that checkpoint completion left native flag26=1 while
quest26 remained outside admission.
The final focused run performs only32 remaining kills:12 Heruka plus20 Ananga,
retaining18 earned Heruka kills and completed22/23 from its exact checkpoint.
It earns8042 through the twentieth actual Ananga kill, consumes both original
quest25 proofs and reopens the final rewards exactly. Balance, live TCP,
graphics and the full expansion remain open. The matching batch record is
[skill/audio/Tomb/story](../../_remake_bgfx/docs/evidence/skill-audio-tomb-story-20261107.json).

Historical attempts remain preserved. The first continuation passed22 and
earned8020, then selected adjacent native
AnuBoy1004 incorrectly. Source `Quest.cpp` assigns the hand-in to Anjali1005 in
Zone01;1004 has no objective. Preserve that failed result and resume its hashed
earned state from `quest22-25-input/resume-after22`, without repeating22. The
corrected route also earns the earlier11/12/13 acceptance dialogue so Anjali and
Bartan retain their original priority, without seeding completed flags or
repeating earlier combat. That resumed run completed23 and saved15 Heruka kills,
then reached18 before native death. Its unchanged dead MOB/DB is copied to
`quest22-25-input/resume-after23-partial24`; the MOB SHA256 is
`548d0aa5b71525eaa7aff1005b3c2bfb68553ce80e8f8b26c43d5158a650324b`.
The final duplicate explicitly raises QA Heart from400 to2000, using the
original source restriction threshold, without editing the configured cap,
equipment, death penalty, level49, progress or rewards. Native entry restores
half the derived HP/TP; no harness Stand action masks its recovery state.

This exposed a real dead-entry gap: restoring positive HP while retaining the
Dead FSM prevented combat. Server and client initialization now follow original
`Server.cpp:12093–12097`: assign living HP/TP1 before initialization, then restore
half vitals. The revived CHAR_INIT reply also uses the initialized living state.
The accepted32-kill continuation uses that production fix. Its report is
`tantra-quest22-25-6c04a94941b2d8a7d0a596210c3e4a9a1582bd3be9d6ca6f8c8a8ee05c7174b7/RESULT.json`
under the local temporary directory, with `quest24-25-resume.log` in the batch
evidence folder. This is selected quest authority coverage across preserved
runs, not a fresh-character11–25 balance or graphical journey.

Dash3014/3114 now uses native radius-ten landing samples, authoritative collision,
occupancy and line of sight, ACTION11 and one committed cost/position. Multiple
strike3012 executes independent source hit rolls per strike and pays once.
Off-hand dagger animation requires a primary weapon. The selected ordinary
families901/911/915 in Zones02/03/04 pass attacks, hit timing, death, Prana,
loot/pickup, duplicate rejection, generator respawn and saved resurrection.
Bow arrows must be equipped, as in the original. Unknown start-action services,
special effects and unmeasured individual families remain gated.

## Quest26 admission — 7 November 2026

The shared policy now admits original Scenario2E through the existing callbacks
and shipped NPC scripts: level35 Saranew1110 exchanges ten7119 for8021/8022,
Girika1102 exchanges those letters for8023/8045, and1110 consumes8023 for50,000
Rupiah/100,000 Prana plus the native tribe reward5275–5278. Matching Release
client/server files and metadata are installed. Quest27 stays unavailable even
when its native next flag is saved. The earned26 authority continuation now
passes ten actual2019 kills/7119 pickups, decline/retry, both native letter
exchanges, exact rewards/replay and partial/final saved reopening. It inherits
the preserved25 QA attributes and historical quest20 seed; no new objectives,
materials or rewards are injected. Its first failure identified native slot70
death metadata being rejected by pickup accounting; the production fix and
focused economic preservation checks pass. Full TCP/graphics and balance remain
open. See [the accepted26 evidence](../../_remake_bgfx/docs/evidence/native-events-quest26-20261107.json).

## Zone05 acceptance

MandaraCave3rd uses the coherent original `E:\Global-server\Zone05` dataset,
map40005 and `MAP_MandaraCave3rd.cfg`. Resource preflight reports257x257 terrain,
4 sections,43 placements,39 models,95 referenced payloads and no missing map
textures. Actor preflight verifies8 models/64 animations with finite poses.
Two real graphical clients verify native movement/portal UI,600-Rupiah outward
travel123->128 from Mandara2nd, free return, party/chat across maps, environment,
BGM and stopped saved state. Both characters reopen in fresh processes with
900 Rupiah and their exact saved zone/coordinates. Default profiles and client
resources remain unchanged.

NPC1269/1362..1366 have zero coordinates and remain unplaced. Generator3905
has no parameter and is recorded/skipped. Portal129's Zone06 destination remains
outside acceptance. No HPK extraction or borrowed cross-map assets are added.

## Verification and remaining work

[Compact batch evidence](evidence/guild-quests-zone05-20261105.json),
[Zone05 resources](evidence/zone05-acceptance-20261105.json) and
[travel/persistence](evidence/zone05-travel-persistence-20261105.json) retain the
scope and executable identities. The actual SDL guild check uses two network
accounts and HUD windows; Zone05 uses full graphical scenes. Earlier failed
fixture attempts remain under build/evidence. Corrections isolated unavailable
service retries, made the simulated clock monotonic, equipped native arrows,
used DDS mark catalog entries and compared the actual remaining travel fare.
Passing cases were retained; no Debug build or broad FX/benchmark rerun was needed.

C08's earlier accepted package/performance checkpoint remains historical evidence;
the new binary is not claimed to have a fresh full benchmark. Zones06..10,
individual quest/combat completeness, advanced competitive contracts, clean-PC
release, sustained player-cap measurement and public-beta operations remain open.
