# Native BGFX online connection profiles

Implemented with focused Release checks. The 5 November operator deployment uses
172.16.90.12:21001 for roster, HTTPS port21006 and native zone ports3001–3005.
The original 1 November evidence below used localhost. Start Server in the
manager before signing in. Current deployment and evidence:
[party controls and LAN setup](PARTY_LOOT_LAN.md).

`HTMessage.txl` remains the source of IDs 301 (status), 302/303 (test/main
authentication), and the selected locale's world names. `serverlist.bin` retains
the original 64-byte header and 10 x 54 encoded endpoint records. In the BGFX
profile, slot 0 is the roster endpoint and slots 1-50 correspond to map owners.
ASCII DNS names and IPv4 addresses fit the original 63-byte endpoint payload.
Online mode ignores an unsigned `serverlist.txt` shadow. Offline play continues
through `Start-Offline.cmd` and its separate SQLite profile.

Standalone **TantraDataTools > BGFX online connections / export** edits client
location, game listen IPv4, URLs, world name, endpoint host/port rows, identity paths and profile
lifetime. Export requires stopped workers, validates the operator key and TLS
identity, verifies every TLS hostname against the exported root before mutation,
backs up original files under server `state/connection-backups`, then
writes the native files and public certificate. `ConnectionProfile.json` is
published last with ECDSA P-256 signatures and SHA-256 hashes. Unrelated message
records, duplicate behavior, parameters and the locale header are preserved.

The executable contains the public signing trust anchor in
`_shared_cpp/connection/TrustedKeys.h`. The adjacent profile cannot introduce a
new trusted signing key. Versions and expiry are checked; the user's highest
accepted version is saved outside the client. Altered, expired, untrusted or
rolled-back profiles fail closed. This does not prevent a user from modifying
their executable; server authority remains the security boundary for gameplay.

For a new deployment operator, generate a key **outside** the client and build
both executables after updating the public anchor:

```powershell
./_server_cpp/tools/New-ConnectionSigningKey.ps1 -PrivateKey C:/Private/Tantra/connection-signing.key -TrustHeader ./_shared_cpp/connection/TrustedKeys.h
./_server_cpp/tools/New-ConnectionIdentity.ps1 -IdentityDirectory C:/Private/Tantra/tls -Names localhost,127.0.0.1
```

These helpers require PowerShell 7 on Windows. Never commit or distribute private
keys, `server.pfx` or `password.dpapi`. Back up the operator key securely; losing
it requires a deliberate client trust-anchor release. Development identity
creation never installs a trusted root. Windows Schannel imports the server PFX
into the Windows user's protected key store; the password file uses DPAPI for
that user. Run workers under the same identity, or configure a password environment
variable using `services/DBSRV/security.toml`. Public Internet deployments should
import an appropriate certificate with DNS/IP SANs matching exported hosts and
the public trust chain in `root.cer`.

HTTPS accepts credential proofs in a POST body once per login. It returns a
five-minute random login grant; an authenticated POST exchanges that for a
60-second entry ticket bound to account, character, world, zone and destination
instance. SQL stores hashes of grants/tickets and atomically consumes tickets.
Roster and character entry use packet 0x10f0, with no reusable MD5 field. Existing
native reply records and gameplay packets remain unchanged inside TLS. Map
handoffs obtain a new ticket from the active authoritative session and include
it in the handoff reply. Clients use the signed destination address rather than
an untrusted or private address advertised in a gameplay packet.

TLS uses Windows Schannel with certificate chain and hostname checks, TLS 1.2/1.3,
and authenticated encryption. Configured secure listeners reject old credential
frames. They do not fall back to plaintext. Missing `security.toml` is supported
only for existing private protocol fixtures; the normal signed client always
requires TLS. `--legacy-local --server 127.0.0.1` explicitly selects the old local
diagnostic path. It is not an Internet deployment option.

SQLDMN RPC and management stay private. Export changes only native game/HTTPS
listener and advertised settings; firewall changes are a separate operator step.
`tools/Enable-LanGameAccess.ps1` adds executable-specific, LocalSubnet-only rules
for the configured LAN address. For external access, bind only game/HTTPS listeners to an
appropriate interface, configure NAT/firewall ports, and export the corresponding
DNS/IP endpoints. Account, inventory, combat and world ownership remain C++ server
decisions.

## Verification

- `build/secure-connection-core-test.log`: native layout/DNS, signature tamper,
  expiry/rollback/wrong key, hostname/trust, TLS fragmentation/tamper and an actual
  70,001-byte TCP/TLS round trip pass.
- `build/secure-auth-test.log`: schema 5, invalid credentials, account/character/
  world/owner binding, one-use/expiry, expired grants and handoff redemption pass.
- `build/secure-runtime-final-test.log`: Server Manager CLI uses the same exporter as
  the dialog; actual SQLDMN/DBSRV/Zone01 workers accept the real BGFX native channel
  over HTTPS/TLS, including roster and CHAR_INIT. A deliberately invalid reusable
  game proof is never used; entry is ticket-based. Credential GET and replay fail.
  Fixture: `tantra-secure-runtime-ff4131e45e31` under the Windows temporary folder.
- Native editor capture `tantra-connection-editor-4cd6454173fc425a831460ccf422b9f8`
  was inspected. All editable fields and Save/Cancel fit; cancel leaves export
  unchanged. This is a focused editor check, not a new full gameplay session.
- `tantra-startup-secure-nwxnnltp`: the staged executable exits cleanly in normal
  online mode (zero offline databases) and explicit offline mode (one private DB).
  The actual Start-Offline.cmd also passes in
  `tantra-offline-shortcut-19f821f763b44ed794ed0b5eaf968117`.

Binary hashes and final verification locations are recorded in
[evidence/secure-connections.json](evidence/secure-connections.json). Public Internet
hosting, firewall/NAT rules, live certificate renewal and multi-host deployment
remain operator deployment steps; no Internet-scale result is claimed.

The final launcher also passes no-argument startup from a different executable
folder, reading that folder's signed files and a sibling runtime. The focused
relocation fixture uses junctions for original assets/runtime and places logs and
version state outside the client; it is not a clean-machine/full-package claim.
The distribution builder includes the signed manifest and public certificate.
Database status/backup/restore checks now use schema 5; compatible schema-4
backups remain accepted and restored entry grants/tickets are invalidated.
