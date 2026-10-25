# Native web login and source filters

Implemented and verified on 2026-10-24 for the selected Philippines profile
(client country 3 / native server Philippines enum). This completes the login
HTTP phase. HTLauncher world networking remains unfinished. The Rust zone now
hosts bounded Mandara FIRST/status entry; see [status authority](NATIVE_STATUS_AUTHORITY.md).

## Running the services

Build with `tools/Build-Server.ps1 -Configuration Debug`, then use the manager's
Start Server control. SQLDMN starts before DBSRV. Default localhost endpoints:

| Interface | Address | Purpose |
| --- | --- | --- |
| DBSRV native TCP | `127.0.0.1:21001` | Native logical character packets |
| DBSRV HTTP | `127.0.0.1:21006` | Native credential and availability requests |
| SQLDMN | `127.0.0.1:21005` | Protected internal persistence RPC |

The HTTP port is configured in `services/DBSRV/transport.toml` and participates
in the manager's endpoint-conflict checks. Its readiness is reported separately
as `web_listener_bound`. Binding this listener does not advertise world gameplay.

The build stages three source tables from `E:\Global-server\Zone01` into
`services/DBSRV/content`. It extracts URL **paths** from the canonical client
HTMessage records 301, 302 and 303. Original public hosts are neither copied into
runtime routes nor contacted. Hashes and source paths accompany the generated
content. A missing/changed table prevents the configured service from starting.
The source server-list header supplies the selected server type and country;
its path/hash are recorded without copying historical endpoint addresses.
References are never edited. Generated service content is ignored by Git.

To choose different reference roots, pass `-SourceRoot` and `-ClientRoot` to the
build script. A code-only build can use `-SkipNativeLoginContent`; stage content
before starting the HTTP-enabled DBSRV:

```powershell
.\bin\tantra-service.exe stage-login-content --service .\services\DBSRV --source E:\Global-server\Zone01 --client-root C:\_GitHub\TantraSrc\TantraClient
```

Restart DBSRV after changing staged content. The currently running service holds
the validated tables it loaded at startup.

## Credentials and upgrading existing accounts

Native web authentication uses MD5 of `@first^rest` after the selected country's
password case conversion. The subsequent native socket login uses plain MD5 of
the converted password. SQLDMN stores a separately salted Argon2id verifier for
each proof, not the password or either reusable proof.

The provisioning command now creates both verifiers. For the explicitly chosen
local test account, after starting SQLDMN:

```powershell
'ashesh' | .\bin\tantra-service.exe provision --service .\services\SQLDMN --account ashesh --password-stdin
```

Provision remains insert-only. Existing schema 1/2 accounts keep their IDs,
characters, revisions, cargo and native verifier during schema 3 migration.
Their web verifier starts unset because it cannot be derived from the old hash.
The current database schema is 4; the additional ownership/session metadata
preserves the credential migration introduced in schema 3.
Enable web login using the existing password, without recreating the account:

```powershell
'ashesh' | .\bin\tantra-service.exe enable-web-login --service .\services\SQLDMN --account ashesh --password-stdin
```

The upgrade authenticates against the existing zone verifier first. Failed
authentication leaves the account unchanged. ASCII account aliases share one
identity, matching the original zone's uppercase account lookup; an alias cannot
create another account or bypass an existing account/world lease. Existing
case-colliding account rows cause migration to fail rather than being merged.

Numeric HTTP results use the existing C++ mapping: `0` success, `1` incorrect
password, `2` unknown ID, `3` unavailable/denied account. Web authentication
does not create a native session lease. Billing integration and other countries'
credential encodings are outside this selected-profile implementation.

## Status and filtering behavior

Availability uses the source `LOGIN_RESULT`, `WORLD_NUM` and `ZONE_NUM` format,
always emitting fifty rows per entry. Main-server profiles reserve entry zero
for the native test world. World 1 is therefore status entry 1, and native zone
18 is its population row 17. The C++ UI uses `group + serverType` and `zone - 1`;
the server preserves both offsets from the actual client header. Only an enabled zone reporting both
`game_ready` and `game_listener_bound` can become selectable. Current Rust zone
workers report neither, so their status is `-1`; a management heartbeat cannot
make the unimplemented game server appear playable. Population/capacity behavior
for populated Rust worlds must be verified when world authority is implemented.

The native filter tables retain their original bytes. For the Philippines branch,
name-table entries compare against the entire uppercase name; chat-table entries
match uppercase substrings. The exact `GM` and `gm` checks happen before that
conversion. The selected legacy loader excludes its last nonempty table entry
after EOF; the port preserves that behavior without copying its memory errors.

Filtered creates send `MSG_MessagePanel` (`0x0101`) with `Language.txt` record 13,
zero `nID`, a 96-byte source string field and the final two bytes cleared.
The authenticated socket stays open; a corrected name can be submitted normally.
No character is inserted for a filtered request.

## Verification

The initial `tantra-services` suite passed eleven tests. After source tracing
exposed the main/test offset, the additional index test passed, followed by an
updated C++ interoperability run against the packaged executable. This provides
twelve distinct passing checks; unchanged storage/codec tests were not rerun for
the index-only correction. The web check uses one isolated service
pair and a headless tool compiled from the existing C++ `NativeWebLogin`,
`LoopbackLoginHttp` and `ClientMessageCatalog` code. It launches no HTLauncher.

The native login fixture is
`test-output/native-login-1792774148-2036/acceptance.json`. It records the tested
service and C++ probe hashes, unchanged reference checks, content-corruption
rejection, source notices for three filtered names, successful corrected-name
retry, the source C++ village lookups, clean lease release and zero falsely selectable worlds.
The ready-village test is a CPU data fixture, not a running or verified game zone.
The first failed
probe fixture is retained separately; it failed while opening a Windows extended
path before HTTP. That probe path handling was corrected and verified.

```powershell
cmake -S tools/native-codec -B test-output/native-codec-build -A x64
cmake --build test-output/native-codec-build --config Release --target native-web-client-probe
cargo test -p tantra-services --locked --offline -- --test-threads=1
```

Native runtime checks use isolated credentials and databases. The normal offline
client profile is not opened or changed. See `validation.json` for the current
build and evidence references; see `IMPLEMENTATION_PROGRESS.md` for remaining work.

## Reference paths

- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: filter loading (770–819), `NameFilter`/`ChatFilter` (1079–1120), create filtering (2925), uppercase account forwarding (3046 onward).
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.cpp`: `BASE_InitializeMessage` / Language.txt parsing.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.h`: native message IDs and `MSG_MessagePanel` layout.
- `C:\_GitHub\TantraSrc\Tantra\zone\SendFunc.cpp`: `SendClientMessage` string termination and notice dispatch.
- `E:\Global-server\Zone01\NameFilter.txt`, `ChatFilter.txt`, `Language.txt`: runtime source tables; record 13 is the selected filtered-name notice.
- `C:\_GitHub\TantraSrc\TantraClient\system\HTMessage.txl`: selected client's login routes and localized credential-failure messages.
- `C:\_GitHub\TantraSrc\_remake\src\client\NativeWebLogin.cpp`, `LoopbackLoginHttp.cpp`: compatibility digests, reply decoding, status parsing and loopback transport.
- `C:\_GitHub\TantraSrc\_remake\src\resources\ClientMessageCatalog.cpp`: four native message tables and XOR text decoding.
- `C:\_GitHub\TantraSrc\TantraClient\serverlist.bin` (or `serverlist.txt` when present) and `C:\_GitHub\TantraSrc\_remake\src\resources\ClientLocale.cpp`: selected country/server type and binary header decoding.
- `C:\_GitHub\TantraSrc\_remake\src\compatibility\HtIntroWorldSelection.cpp`: native test/main status offset, village population indexing and world-route rules used by the independent C++ parity check.
