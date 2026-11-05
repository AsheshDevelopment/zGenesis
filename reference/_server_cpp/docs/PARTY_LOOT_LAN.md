# Party controls, LAN deployment and new-character entry — 5 November 2026

Automatic party loot, native invitations/confirmations and the signed LAN
deployment are implemented. The staged Release launcher also fixes the reported
`Owner inventory identity mismatch` when entering with a newly created character.
This checkpoint does not accept public Internet deployment or a larger player cap.

## Party and Ashram controls

Original rules come from `Tantra/zone/server.cpp` pickup/party handlers,
`Tantra/zone/Basedef.h` (`ROOTING_SHARE=1`, `ROOTING_PERSON=0`) and
`Tantra/HTlauncher/HTParty.cpp`. Automatic distribution happens when someone
requests a pickup. It does not collect unrequested drops.

- The party leader changes personal/automatic distribution. MSGSRV persists the
  mode and publishes it with the authoritative roster, including after recovery.
- Eligible members are alive, on the same map and within the original axis-aligned
  100-cell range of the picker. Pickup itself uses the original five-cell range.
- Rupiah is divided using native integer division. The native rounding remainder
  is discarded; amounts that do not fit a recipient remain on the ground.
- Stackables go to the picker, filling matching stacks before empty slots.
  Equipment uses native random selection with full-bag fallback. Kala cores
  8051–8053 stay with the picker. Partial leftovers remain available.
- SQLDMN commits all recipients through one revision-checked transaction and
  receipt. A replay cannot grant rewards again; conflicting revisions roll back
  the whole transfer. Drop/member task keys prevent overlapping pickup changes.
- Party/Ashram invitations identify their sender and carry a one-use token with
  a 30-second expiry. Native OK/Cancel prompts support Enter/Escape, expire safely
  and close after acceptance by another route. Leave/kick/disband confirmations
  use original message-box images and verify the captured membership context.

Implementation: `include/tantra/party_loot.h`,
`src/persistence/party_loot.inc`, `src/zone/world_combat.inc`, MSGSRV social
handlers and BGFX `MainHudNativeSocial.inc`.

## Active installation

The operator selected **172.16.90.12**, this PC's WiFi LAN address. Signed profile
version **15** uses it for HTTPS port **21006**, roster port **21001**, and
Zone01–Zone05 ports **3001–3005**. The configured second Mandara channel uses
**30000**. Management/RPC and the database remain on loopback.

Run the existing Server Manager with `_server_final` as its root, then launch
`_client_bgfx/ZFLauncher.exe`. Offline mode retains `Start-Offline.cmd`.
Use standalone **TantraDataTools**, **BGFX online connections / export** to change
the game listener, advertised hosts, URLs and identity. Stop workers before export.
Export validates the PFX private key, signed root and every endpoint hostname
before modifying files; rollback preserves the previous profile on failure.

The Windows firewall now has two enabled inbound rules scoped to the exact staged
Service/Zone executables, local address 172.16.90.12 and remote `LocalSubnet`.
Only game/HTTPS ports are allowed. No SQL or management port was opened.
The reusable administrator helper is `tools/Enable-LanGameAccess.ps1`.

The common database is **MariaDB / 127.0.0.1:13306 / tantra_bgfx**, schema **9**.
Both normal development and final server installations use it. Existing SQLite
data/configuration was backed up before switching the development profile.
The native MariaDB backup succeeded; no account or character was reset.
At the database visibility check it contained 15 tables, one account and one
character. Counts are a checkpoint, not fixed expected database contents.

XAMPP's phpMyAdmin originally showed its separate MySQL instance on **3306**.
Its local configuration now also offers **Tantra BGFX (13306)** using cookie
authentication and a schema-restricted SQL operator login. No database password
was stored in PHP configuration. The existing XAMPP server was preserved.
Open `http://127.0.0.1/phpmyadmin/index.php?server=2&db=tantra_bgfx` and choose the
game server. This local phpMyAdmin setup is not part of the player package.

## Character-entry correction

Original `HTIntroManager.cpp` creation/removal response handlers update fixed
roster slots after ACK without fetching the list again. BGFX's INTRO did this,
but its network channel retained the old roster. Creating a first character left
the channel's owner name empty, causing the first valid inventory snapshot to fail.

`CppServerChannel` now retains pending create/remove requests and updates its
cache only after successful ACKs. Failed operations leave slots unchanged, deletion
frees its actual slot, and creation reuses the first free slot. Initialization checks
the selected slot against the authenticated character. Owner inventory still
rejects a different character's snapshot. Appearance and native inventory survive
the creation-to-zone reconnect. User account/character data was preserved.

## Verification boundaries

- Release StoreTests `social` and `shared_transactions` pass native loot policy,
  atomic multi-recipient credit, replay/conflict handling, leader restrictions,
  persisted mode and one-use invitation behavior.
- The focused BGFX GPU component check passes original party/Ashram rendering,
  centered native confirmation/invitation images and Enter/Escape dispatch.
- Actual staged Service/Zone processes pass signed-profile verification, HTTPS
  status 200 and six hostname-checked TLS endpoints at the LAN address. This
  endpoint probe deliberately submits no login.
- `native_online_entry_probe` passes empty-roster creation, rejected creation,
  deletion/reuse, preserved appearance, reconnect and inventory acceptance through
  the real client channel with a loopback native-protocol peer. A foreign owner's
  inventory is still rejected. It does not alter the shared database.
- The new LAN ZIP passes native signature verification, modified-file rejection
  and packaging hashes. It includes the staged entry fix. Earlier two-client
  graphical journey evidence remains separate from these current checks.
- Windows firewall rules and SQL/phpMyAdmin login were checked directly.

The initial new probe target lacked the generated-header include path; linking
its resource dependency corrected that build-only issue. No Debug build or broad
FX/performance rerun was performed. Live graphical automatic loot, another PC's
LAN connection, public Internet access and public capacity/abuse/operations
acceptance remain open. Named roadmap coverage stays **173/254 (68%), 6/10 gates**.
Machine-readable evidence: [party/LAN checkpoint](evidence/party-lan-20261105.json).
