# C++ native login and character service

Implemented in `_server_cpp/src/services/login_content.cpp` and `login_server.cpp`.
This is the selected Philippines logical protocol used by the remake. Legacy
socket encryption/compression and stock-client interoperability require separate
proof. The complete C++ server is unfinished; `game_ready=false` remains correct.

## Configuration and resources

DBSRV owns `services/DBSRV/service.toml`, `transport.toml`, `content/`, `state/`
and `logs/`. SQLDMN must use `cpp-sqldmn` with the same world ID. Defaults:

| Endpoint | Local address | Purpose |
| --- | --- | --- |
| SQLDMN | 127.0.0.1:21005 | Token-protected authoritative persistence |
| DBSRV | 127.0.0.1:21001 | Normalized native character TCP packets |
| DBSRV administration | 127.0.0.1:22001 | Independent authenticated process control |
| DBSRV web login | 127.0.0.1:21006 | Native credential/status HTTP responses |
| Roster destination | 127.0.0.1:18400 | Configured future zone route; no world listener implemented yet |

`transport.toml` requires four version words (default `[0,1,0,0]`), roster IP/port
and web port. Endpoint conflict checks include HTTP. Local addresses are enforced.
The manager starts SQLDMN before DBSRV and drains dependent services before SQLDMN.
Opening the manager starts neither service.

Stage data once, without overwriting existing content:

```powershell
python tools/stage-login-content.py --zone E:\Global-server\Zone01 --client C:\_GitHub\TantraSrc\TantraClient --service C:\_GitHub\TantraSrc\_server_cpp\services\DBSRV
.\bin\TantraService.exe --service .\services\DBSRV --enable-login
```

The tool copies only `NameFilter.txt`, `ChatFilter.txt` and `Language.txt`, preserves
their original bytes and records SHA-256 provenance. It reads `system/HTMessage.txl`
and `serverlist.txt`/`serverlist.bin` to derive the selected locale and message
301..303 URL paths. Original public hosts are discarded. The staged routes are:

- `/game/loginresult/loginresult.asp` for native availability.
- `/game/gamelogin/gamelogin.asp` and `/game/gamelogin/gamelogin1.asp` for credentials.

Credential queries contain `user_id` and native MD5-plus `user_pass`; numeric
results preserve the existing SQL credential codes. Invalid/duplicate fields and
invalid escapes are rejected. Requests and credential URLs are never logged.
GET requests are bounded to 8 KiB headers and 4 KiB targets, with no HTTP bodies,
chunked requests or pipelining. Credentials remain loopback-only in this milestone.

Availability uses the native test-world prefix and fifty zone entries per world.
Only a successful administration probe with both `game_ready` and
`game_listener_bound` can mark a zone available. Management-only processes stay
offline. Probes use batches of eight and a bounded scan deadline; unprobed zones
stay offline. The native format supports ten entries including the reserved test
world and fifty represented zones per world; folder discovery is independently dynamic.

## Selected packet contracts

The header is twelve bytes, little-endian, with type at offset 0, body length at
offset 4 and native tick at offset 8. No C++ object layout is serialized.

| Request | Body bytes | Reply |
| --- | ---: | --- |
| `0x1003` login | 128 | `0x9003`, signed 32-bit result |
| `0x1011` roster | 0 | `0x9011`, three 168-byte native entries |
| `0x1012` create | 32 | `0x9012`, byte result; filtered names use `0x0101` notice |
| `0x1013` remove | 28 | `0x9013`, byte result |

Version and empty character fields are required for selection login. World login
and `CHAR_INIT` belong to zone authority and are refused here. Native snapshots,
three slots, inventory/equipment order and roster fields use the unchanged owned
C++ character codec. Short names preserve the native no-reply behavior; original
name truncation, selected case checks, whole-name filtering, substring chat
filtering and final excluded filter entry are retained. Filter notices preserve
legacy bytes and the native 100-byte MessagePanel body.

Each connection owns one SQLDMN lease. Disconnect, failed writes and shutdown
release it; duplicate owners are rejected. Roster mutations are committed by
SQLDMN before the result is sent. The selected source has its deletion identity
number comparison commented out; authentication and character ownership remain
required. Deletions retain the SQLDMN recovery snapshot.

The network event loop is separate from administration. Four SQL work threads
serve at most 64 retained peers, with one pending operation per peer, a 4 KiB
packet body bound, 10-second partial-frame deadline, 120-second idle deadline and
15-second processing/write deadline. In-flight authentication is completed during
drain so its new lease can be released before SQLDMN stops.

## Evidence and limits

`login_cpu` checks selected filters, status offsets, query parsing, content hashes
and HTTP endpoint conflicts. `login_runtime` uses one isolated service pair,
ashesh/ashesh and no zone/game process: web credentials/availability, fragmented
native login, filter notice, creation/roster/removal, duplicate ownership,
disconnect/reconnect, live Database rendering, dependency drain and stopped
restore-helper invocation. The initial hidden-window visibility assertion failed;
its capture showed the control, and the corrected assertion passed. Failure output
is retained rather than counted as a successful acceptance.

Normal client executable/database and original reference sources remain unchanged.
The native world route, full GUI input acceptance, transport failure recovery,
multiplayer/social roles and full M3-M6 gameplay remain open. Current records:
[login-and-rules.json](evidence/login-and-rules.json) and
[implementation progress](IMPLEMENTATION_PROGRESS.md).

## Source references

- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: native filter loading, `NameFilter`,
  `ChatFilter`, selection state and character request handlers (selected lines
  around 1079 and 2895 onward); deletion identity comparison is commented out.
- `C:\_GitHub\TantraSrc\Tantra\DBSRV\CFileDB.cpp`: new-character defaults, storage
  and deletion behavior; `Tantra\zone\Basedef.h` and shared headers provide packet definitions.
- `C:\_GitHub\TantraSrc\_remake\src\client\NativeCharacterRecords.*` and
  `NativeCharacterCreation.*`: byte codecs and selected native creation checks.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\native.rs`, `content.rs`,
  `web.rs` and `runtime.rs`: existing logical contracts used for comparison.
- `E:\Global-server\Zone01`: matched filter/language source content.
- `C:\_GitHub\TantraSrc\TantraClient\system\HTMessage.txl` and its server list:
  native login URLs and selected locale, used read-only.
