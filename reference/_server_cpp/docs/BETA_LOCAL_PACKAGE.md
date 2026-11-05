# Local beta journey, native UI and data tools — 5 November 2026

The two-client fresh-character journey and isolated local installation pass.
This is a downloadable local-server candidate, with public beta acceptance
still open. That earlier signed candidate used localhost. The later [party/LAN checkpoint](PARTY_LOOT_LAN.md)
adds a new172.16.90.12 candidate with matching TLS, shared MariaDB and an entry fix.
No second Windows installation or physical player PC was available.

## Latest launcher and public-beta priorities

The staged client now starts through `Tantra.exe -> ZFLauncher.exe`; the separate
Update.exe is retired. Signed native-resource patches, original launcher skin,
shared graphics/audio settings and preference-preserving File Check pass focused
Release checks. Owner speed, continuous routing and replica interpolation also
have focused source/component evidence. These changes are newer than the last
beta ZIP; that ZIP is not the final public download. See
[launcher implementation and evidence](../../_remake_bgfx/docs/LAUNCHER_PATCHING.md).

Next release gates, in order:

1. Provide an Internet-reachable host/domain, matching game TLS identity and
   HTTPS patch endpoint; export new signed client connection files. The current
   172.16.90.12 address and LocalSubnet firewall rules only serve the LAN.
2. Build one matching Release client/runtime package with the combined launcher,
   current movement fixes and public profile. Verify installation, signed patching,
   login and retained settings on a separate clean Windows player PC.
3. Run one short final-build two-client beginner/social journey, including live
   automatic party loot, trade/services and reconnect/saved return. The earlier
   successful beginner and packaged-social sessions retain their separate scopes.
4. Complete the public-entry rejection checks and measure sustained mixed
   gameplay/save/reconnect behaviour before choosing the initial player cap.
5. Demonstrate a matching backup/restore and package rollback, enable operator
   monitoring/crash collection, provision individual beta accounts, and publish
   supported content/known issues with a tester reporting path.

Full original-game parity and thousand-player capacity are separate milestones.
Public beta is still unaccepted; these launcher fixes do not close a release gate.

## What was verified

Two visible BGFX/D3D11 clients ran from an extracted ZIP, with a stripped PATH,
explicit package runtime roots and separate temporary profiles. Fresh level-one
characters used their native starter items and received no currency grants.
They completed tutorial choices, equipment, party invitation/acceptance, native
trade drag/review/confirmation and item conservation. The receiving character
sold the transferred sword for four Rupiah, deposited/withdrew an item and those
four Rupiah at Bhuvan, then both saved at the Memory Maiden. Stopped SQL and two
fresh client processes matched the saved native character fields and positions.
The earlier fuller beginner progression remains separate authority evidence.

The short journey found and fixed per-owner equipment naming collisions, an
offline collision-grid read in network replicas, and ignored owner movement
corrections. The authoritative occupied-cell result now updates both movement
prediction and the character coordinates used by saving.

The final social UI change has separate focused component evidence: original
party panel 229, Ashram information 217 and members 218, actual native UI textures,
HP/TP scale, owner exclusion, tribe/rank/status columns, scrolling, G routing and
widescreen resizing. The former generic lists remain supplemental management
controls. Roster TP and guild tribe/level/online metadata come from the server.
This component check is not another live guild/party network acceptance run.
Automatic party loot was unavailable in that earlier candidate; the later
[party/LAN checkpoint](PARTY_LOOT_LAN.md) implements the authority and controls.
Live graphical automatic-loot acceptance remains open. Alliance/fortress services retain their existing scope.

Evidence is in [beta-local-20261105](evidence/beta-local-20261105).
`PERSISTENCE_RESULT.json` retains the original harness's unused destination 2
label; its audited character records and fresh-login results correctly use
Zone01. The harness metadata is corrected for future beta runs.

## Mandara1st data correction

The packaged source is `_server_final/bin/XLSXData/TantraParam.xlsx`;
`_server_cpp/bin/XLSXData` is its identical development mirror. Global remains
the broader baseline, with K3 MainUI/IntroUI and matching Mandara1st map data.
NewMandara is rejected for this map binding.

Replace only 38 NPC numeric cells with the matching original K3 placement
reference: 26 Zone01 NPCs, including Bhuvan 1105 at (412,116), Vananta 1104 at (668,174)
and Memory Maiden 1120 at (491,176). Global-only NPC 1457 has no placement in this map
and is unplaced. Other cells, ZIP parts, styles and Dotum fonts are unchanged.
Both workbooks have SHA256
`f08be205b76736b08414ee9b919deb56d6b18dd4487cfd1d8a62703cb324436f`.
These values are exported from the workbook; there is no runtime coordinate
override. Native client TPA audit has zero placement differences, and both
online clients checked all 26 NPCs against the native reference.

## Standalone tools and native export names

Run `_server_final/bin/TantraDataTools.exe`. Its fourteen right-side buttons
contain eight converters, workbook access, server-list generation, signed
connection export and paired package generation/application. All converters
default to the project's XLSX files. Server Manager has no Tools page or menu;
its server/account/database operations remain in Manager. The focused GUI check
opened all eight converters and actually generated a server TPA.

- Client export: `client/system/TantraParam.tpa`.
- Detached server export: `server/TantraParam_sv.tpa`.
- Installed server basename: `data/TantraParam.tpa`, copied from that server
  export, never from the differently laid-out client TPA.
- C++ runtime rules: paired `data/rules`, regenerated from the same XLSX source.

Apply requires every server worker stopped. Native TPA and rule folders have
matching backups and rollback. Deploy the matching client overlay and external
runtime support data together. Original reference files remain read-only.

## Missing native assets and package boundary

The user-approved additional source is
`B:\Tantra-Files\_TantraClients\TantraOnline-Global`. Restore only missing exact
relative paths; preserve existing files and keep archives packed. This added
1,515 files (321,809,431 bytes), including
`resource/object/PC/Ani/PC_RAK_SKL_AHT_03.tab`. Missing INTRO TMBs and NewMandara
are skipped. See [asset manifest](evidence/global-asset-fallback-20261105.json).
Restoration does not enable additional skills or claim visual acceptance for
every restored animation/FX. The prior data-release warning count predates this
asset fill and is not the current missing-resource count.

`build-beta-package.py` emits a ZIP, manifest and SHA256 file, verifies the
profile with the actual native connection reader and rejects a modified signed
server list. It excludes project source, keys, workbooks and private saves.
Package `client` and sibling `runtime` must stay together. Current package
identity, installed hashes and verification scopes are recorded in
[the checkpoint](evidence/beta-local-package-20261105.json).

Remaining release gates include a reachable public signed endpoint, a clean
player OS/PC, a measured initial player cap, public-entry abuse checks and
operator monitoring/backup/rollback/support. The historical C08 benchmark
still describes its frozen executable; it was not rerun for this UI build.

The project social protocol keeps existing row offsets: party0xff27 accepts the
legacy400-byte record or464 bytes with appended TP/maxTP; guild0xff24 may append
12 metadata bytes per row (level,tribe,online), keeping a50-member frame at4088
bytes within the4096-byte bound. These are remake contracts, not a claim of
complete stock-client socket compatibility.
