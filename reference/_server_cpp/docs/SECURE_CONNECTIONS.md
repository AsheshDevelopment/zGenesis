# Native BGFX online connection profiles

Implemented with focused Release checks. The 5 November operator deployment uses
172.16.90.12:21001 for roster, HTTPS port21006 and native zone ports3001–3005.
The original 1 November evidence below used localhost. Start Server in the
manager before signing in. Current deployment and evidence:
[party controls and LAN setup](PARTY_LOOT_LAN.md).

`HTMessage.txl` remains the source of IDs 301 (status), 302/303 (test/main
authentication), and the selected locale's world names. `serverlist.bin` retains
the original 64-byte header and 10 x 54 encoded endpoint records as its prefix.
A bounded `TBCONN02` trailer now carries signed connection metadata and the
public TLS trust certificate. The client needs only `serverlist.bin` and
`system/HTMessage.txl`; separate `ConnectionProfile.json` and `ServerTLS.cer`
files are retired. This extension is for the remake; the native prefix is retained. In the BGFX
profile, slot0 is the roster endpoint and slots1–50 are positional endpoint/channel
slots. Their wire capacity is independent of the current native map ID scope01–34.
ASCII DNS names and IPv4 addresses fit the original 63-byte endpoint payload.
Online mode ignores an unsigned `serverlist.txt` shadow. Offline play continues
through `Start-Offline.cmd` and its separate SQLite profile.

## Administrator commands — 6 November 2026

Type `/erichgwapo` to open the searchable English command panel. Execution requires
the exact, case-sensitive whisper receiver `ASHESHDEV` and authenticated account
`userLevel == 1`. Online authority reads SQLDMN authorization on every request,
including cached replays; demotion denies further execution. Character/account
names, native GM clans, client flags and levels2–255 confer no administrator rights.
Native public chat/whisper packets reject slash execution, and the old secret
receivers are not accepted by the command parser.

The dedicated little-endian request is `0x7f42`, with a 240-byte body: operation(u32)
at 0, nonce(u32) at 4, expected character revision(u64) at 8, receiver[20] at 16 and
command[204] at 36. Operation 0 queries privilege and requires an empty command;
operation 1 executes. Nonce must be positive. Text is printable ASCII, NUL-terminated
with zero padding; commands are at most 200 bytes.

Reply `0xff42` has a 256-byte body: operation at 0, nonce at 4, result at 8,
authenticated userLevel at 12, committed revision(u64) at 16, privilege flags at 24
and NUL-terminated message[228] at 28. The other numeric fields are u32. Result 0 is
success, 1 denied, 2 invalid, 3 unsupported and 4 failed. Privilege bit 0 means the
authenticated account level equals 1; unavailable authorization reports
userLevel `UINT32_MAX`. Offsets exclude the 12-byte native frame header.

The implemented online subset covers self status/IDs/equipment inspection,
same-map warp, money/prana/level/HP/karma, whisper preference, class/Trimurti and
stat/skill resets. Targets use the actual current server handle; they cannot edit
other players. Mutations use native status calculation and owned, revision-checked
persistence; replay cannot repeat a committed command. Other source-registry
entries, including ground-item creation online, return explicit unsupported
feedback. The full inventory is not a claim that every source service is ported.
See [commands and examples](../../_remake_bgfx/docs/NATIVE_COMMANDS.md).

Offline SQLite schema 5 adds the integer `accounts.userLevel` field with default 0
and range 0–255. Its authority checks the authenticated local session and exact
value 1 for each command. Existing/new accounts remain ordinary unless explicitly
provisioned separately; migration never promotes them. This offline schema is
separate from the online server database schema. Focused server authorization and
persistence plus the isolated Release SDL panel component pass. Full live online
administration and quickbar drag/row-button integration remain open. See
[accepted component evidence](../../_remake_bgfx/docs/CLIENT_FEATURE_EXPANSION.md#administrator-authorization-and-independent-quickbars);
older connection test results below do not verify the full command journey.

Standalone **TantraDataTools > BGFX online connections / export** edits client
location, game listen IPv4, URLs, world name, endpoint host/port rows, identity paths and profile
lifetime. Export requires stopped workers, validates the operator key and TLS
identity, verifies every TLS hostname against the exported root before mutation,
backs up original files under server `state/connection-backups`, then
writes HTMessage.txl followed by the self-contained serverlist.bin. Its
embedded metadata uses ECDSA P-256 signatures, SHA-256 hashes and a distinct
version-2 signing domain. Export backs up and removes the two old sidecars. Unrelated message
records, duplicate behavior, parameters and the locale header are preserved.

The executable contains the public signing trust anchor in
`_shared_cpp/connection/TrustedKeys.h`. The embedded profile cannot introduce a
new trusted signing key. New readers also accept previously signed version-1
sidecars for migration; new exports contain only the two native-named files. The native prefix, message file and embedded certificate are all authenticated.
Metadata/certificate length bounds, unknown trailers and truncation are rejected.
Versions and expiry are checked; the user's highest
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

Latest two-file and root-configuration migration evidence: [focused checks](evidence/two-file-connections-20261105.json), completed 6 November 2026. Earlier evidence records the preceding four-file layout. The [live two-client journey](LIVE_RELEASE_VERIFICATION.md) now passes; the [refreshed packages](BETA_REFRESH_20261106.md) also pass HTTPS and all six TLS endpoint checks using the packaged profile.
