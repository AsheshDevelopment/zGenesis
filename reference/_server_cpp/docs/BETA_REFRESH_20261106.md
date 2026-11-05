# Beta checkpoint and refreshed downloads — 6 November 2026

The current Release client and server update are packaged in
`D:\Tantra-Beta\2026-11-06`. They target the existing **172.16.90.12 LAN**
deployment. Public Internet hosting and separate-PC acceptance remain open.

| Artifact | Size | Purpose |
| --- | --- | --- |
| `Tantra-B-Client-20261106.zip` | 698,309,371 bytes | Complete client/runtime package; 5,225 hashed payloads. |
| `Tantra-B-Server-Update-20261106.zip` | 10,289,473 bytes | 77 immutable files for updating the existing configured server. |

Each ZIP has a `.sha256` sidecar. Exact hashes, executable identities and checks
are recorded in [release evidence](evidence/beta-refresh-20261106.json).
All archived payload hashes were verified against their manifests.

## Client installation

Extract the complete client ZIP to a writable folder. Keep `client` and `runtime`
beside one another and run **client\Tantra.exe**. The package contains current
ZFLauncher, corrected movement, native resources, app-local runtime dependencies,
the two-file connection format/version **16**, and signed root **Patcher.dat**.
The XAMPP signed patch feed is refreshed to release **1793900170**.

Native signature verification and rejection of an altered connection file pass
on the packaged files. Separate ConnectionProfile.json, ServerTLS.cer, Patcher.cfg
and Update.exe files are absent. No player profiles, test credentials, database
files, source code or private TLS/signing keys are included.

## Server update

Stop the workers through Server Manager, back up the database and deployment,
and extract the server update over the existing server root. Start Server again.
It includes current Release binaries, immutable native/rule data and SQL operator
files. It preserves the existing listener/database configuration and private TLS
identity by excluding those files. It is **not a fresh server installation** and
does not contain accounts, characters, sessions or editable XLSX files.

The same updated TantraZone is already staged in `_server_cpp/bin` and
`_server_final/bin`; matching ZFLauncher is staged in `_client_bgfx`. The managed
deployment was restarted gracefully. No existing account data was edited.

## English message correction

The combat screenshots' `Character 1030: (Reserved)` lines were **NPC AI speech**,
not missing damage/Prana translations. The original Global HTSSetting XML and the
generated authority table contain **348 SpeechComment.szPhilippine entries, all
`(Reserved)`**. Other language columns contain native dialogue, but no authored
Philippine-English speech exists in those entries.

Mark unavailable comments before target-name formatting, consume the same native
AI randomness/callback sequence, and omit unavailable utterances from broadcasts.
The client also filters bare placeholders from older servers. Real dialogue is
preserved and uses the speaker's Philippine-English Monster/NPC parameter name
instead of an invented `Character <handle>` label. Player chat is unaffected.
Missing speech is recorded here; translations are not fabricated.

Damage, Prana, death and resurrection messages continue using the original English
HTMessage templates. A focused native server speech check verifies filtering and
unchanged RNG/state over 200 dispatches. **35 client chat/UI checks** pass, including
English combat messages, channels and the native dragged item icon. The rendered
English chat capture is retained with the [client evidence](../../_remake_bgfx/docs/evidence/beta-refresh-20261106/chat-english.png).

The earlier [live two-client journey](LIVE_RELEASE_VERIFICATION.md) passed TLS
login, movement, combat, automatic party currency sharing, exact-instance trade
and SQL-verified saved return. Its executable hashes remain historical. This
message-only follow-up uses focused checks and package verification; it does not
claim another live journey or a new graphics benchmark.

Named roadmap coverage remains **173/254 (68%), 6/10 accepted gates**. Separate-PC
installation, public connectivity, capacity/abuse checks and release operations
are still required before a public-beta decision.
