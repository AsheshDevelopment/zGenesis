# Projectile, quest/guild UI, MandaraCave and interruption checkpoint

2 November 2026. This checkpoint uses the BGFX client and existing C++ authority.
The focused runtime fixtures use isolated SQLite stores and two TCP accounts;
they do not modify the deployed MariaDB accounts or establish MMO capacity.
See the [evidence manifest](evidence/projectile-cave-recovery-20261102.json).

## Projectile flight

Two visible Release clients complete normal attacks, skill 3306 flight/impact,
party, SDL trade and cash delivery. The native forward axis is verified on the
rendered projectile carrier. Frozen visible/hidden captures isolate 4,164 pixels
on the attacker and 53 on the peer, both before damage arrives. Paired original
images are retained beside the manifest.

The original `HTAttackManager.cpp` and `HTOtherObjectSystem.cpp` allow a nearby
targetable actor to intercept the projectile. The previous verifier left its
melee opponent alive beside the caster, so the shot immediately hit that actor.
The verifier now finishes the melee opponent before measuring ranged flight.
The native interception rule remains intact.

Native header-only `CSP_CHAR_PING` (0x1831) runs every 60 seconds, ahead of the
120-second transport idle deadline. The original client sends that same packet.
The authenticated zone accepts it without changing durable character state.

## Quest journal and guild UI

`HTQuest.cpp` delegates journal work to `CHTUIQuestWindow` in
`Tantra/HTlauncher/HTInterface.cpp`. The journal uses QuestMessage parameters in
`HTMessage.txl`: quest flag index, history length and native step number. Titles
and details retain the generated Philippine English text. Flag 255 selects the
last history row; 254 is abandoned. Unmapped MOB bytes/counters are omitted.
Native remaining-kill counts replace the single `%d` placeholder safely.

Window 235 now displays live progress/completion lists, selectable descriptions
and all three scroll controls. The connected Vartan workflow advances the
original quest, consumes three required items and grants its exact reward once;
the completed journal entry displays the authored reward message.

The existing guild window supports creation, invitation/acceptance, roster and
master/member labels, announcements, leave, kick and empty-guild disband. Member
actions are rejected by both UI and authority. Leave/kick/disband need a second
explicit click. Invitations, empty-guild refresh and long feedback render in
the same window. Disconnect removes pending invitations owned by that session.

One actual SDL/D3D11 HUD window exercises both live accounts. Captures include
the invitation, completed quest and final roster. Reconnect retains membership
and announcement. After workers stop, storage reopens with both guild IDs, the
announcement, quest flags and the exact reward/creation fees. This is UI
workflow acceptance; higher native guild ranks, marks and alliances remain open.

## MandaraCave (Zone03 / 40003)

The original 512x512 TCM uses the native fixed 1024-cell actor/influence grid.
Allow smaller maps inside that grid and preserve the original fixed-border
projection; the original Zone01 spatial golden remains unchanged.

Client terrain is 257x257, with four sections, 43 placements and 32 models.
All 90 referenced payloads resolve without missing textures. Seven server NPC
records match their authored positions. The native cave has fog and no sky;
miniaudio plays its original map BGM 30011.

Static mineral 2718 has a mesh/texture and no animations in ClientRes. Handle
it as a static object. Its type-4 TMB stores material triangle counts and indices
as WORDs; other supported types retain DWORD indices. Catalog DDS overrides are
bound before the exporter BMP name is required. The exact Global model and DDS
are retained; the DDS ships in the supported secondary `MonsterTex2.hpk`.
Existing packs stay authoritative. No HPK is extracted.

Global portal 131's landing bounds (780,885)-(787,880) contain no valid cell on
the selected K3 Mandara terrain. The owned Global-baseline TantraParam workbook
therefore uses the original matching K3 bounds (206,818)-(232,846), with exact
reference/hash and old/new values in its provenance. Only Portal!K19:N19 changes;
all other workbook ZIP members, styles and Dotum font remain unchanged. Generate
client/server data together through the existing Manager Tools workflow.

Two visible clients verify 600-Rupiah entry via 131->124, free return, remote
party HP/chat, destination scenery/environment/audio and final saved positions.
Stopped storage matches the observed coordinates and one paid fare per player.
This does not accept every Cave encounter or the complete Zone03 map gate.

## Interrupted operations

Two real C++ TCP accounts disconnect at the source after durable portal debit,
then at the destination after its claim but before CHAR_INIT. Reconnect twice:
the character retains the destination, original items/progression, one fare and
restored party presence. Stopped storage contains exactly one claimed handoff.

The separate trade/cash recovery session verifies cancellation of an uncommitted
trade when its peer disconnects, automatic admission reconciliation of a pending
cash debit and repeated reconnect without another debit or item delivery.

The final cash fixture uses the production CashService handler and a real native
purchase, rather than inserting a pending order. It closes the client socket
after the ledger commits the 1,500 debit and before SQL character delivery.
Two BGFX TCP accounts then verify recovery, exactly one item, balance 5,000,
repeated reconnect and interrupted trade cancellation. Only the isolated test
service route changes; production TLS requirements are preserved.

## Performance and remaining scope

The matched Release C08 benchmark is tracked separately in the manifest and
BGFX progress. It uses the same native fixtures and HIGH quality for both
skinning paths. Historical Debug/package checks do not become current evidence
merely because this checkpoint passes. Other maps, full quest/guild parity,
competitive systems and larger-population acceptance keep their own gates.

The first matched Release baseline failed the sustained 60 FPS threshold and
is not accepted. Investigation found that catalog texture deferral also deferred
idle animation startup, and that native five-weight Vasabhum meshes fell back
to CPU skinning. The renderer now starts catalog-bound actors immediately and
supports eight stored influences without truncation or normalization. Native
CPU position/normal, bounds, socket and picking checks pass; all 36 rendered
CPU/GPU action pairs differ by at most one color step. The earlier benchmark
must not be reused as proof for this corrected renderer.

The subsequent combat trial still failed p95 (18.691 ms). Its recorded slow
frames identified repeated HUD work: invisible refining and unchanged life
state refreshed the full HUD; padded bitmap dimensions were compared with
logical label dimensions; and status batches copied the HUD and rasterized
changed labels twice. Cache the logical dimensions, skip unchanged life/hidden
refining refreshes, let the normal refresh rasterize each changed status label
once, and apply the final ordered status batch before drawing the frame.
Inventory refresh semantics and original art/input/authority remain intact.
Native GPU HUD checks cover bars, labels, padded scaling and hit areas.

## Final Release benchmark accepted

The [benchmark record](evidence/c08-release-benchmark-20261102.json) and
[raw samples and captures](evidence/c08-release-raw-20261102.zip) retain all twelve
60-second trials on i7-12650H / RTX 4050 Laptop, D3D11, 1024x768 HIGH,
2048 shadows and VSync off. Both paths use the same frozen executable, source,
fixture and native quality. Initial/median actor counts match; all raw actor
histograms remain available. Existing assets and default saves are preserved.

| Scene | Trial | Actors (median) | CPU median ms | GPU median ms | GPU p95 ms | GPU p99 ms |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| field-combat | 1 | 44 | 11.188 | 9.954 | 13.608 | 25.356 |
| town-idle | 1 | 4 | 8.675 | 8.062 | 8.886 | 9.800 |
| field-idle | 1 | 43 | 10.806 | 9.496 | 10.438 | 11.122 |
| field-combat | 2 | 44 | 11.262 | 9.922 | 13.610 | 25.097 |
| town-idle | 2 | 4 | 8.679 | 8.007 | 8.734 | 9.481 |
| field-idle | 2 | 43 | 10.755 | 9.470 | 10.452 | 11.217 |

All six GPU trials meet mean/p95 <=16.667 ms and p99 <=33.334 ms. This closes
the requested Release performance benchmark. The full C08 configuration/package
gate, other map encounters, higher guild ranks/marks and broader quest/MMO
acceptance retain their separate requirements.
