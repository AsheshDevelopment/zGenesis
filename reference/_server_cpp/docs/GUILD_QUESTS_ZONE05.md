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

Dash3014/3114 now uses native radius-ten landing samples, authoritative collision,
occupancy and line of sight, ACTION11 and one committed cost/position. Multiple
strike3012 executes independent source hit rolls per strike and pays once.
Off-hand dagger animation requires a primary weapon. The selected ordinary
families901/911/915 in Zones02/03/04 pass attacks, hit timing, death, Prana,
loot/pickup, duplicate rejection, generator respawn and saved resurrection.
Bow arrows must be equipped, as in the original. Unknown start-action services,
special effects and unmeasured individual families remain gated.

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
