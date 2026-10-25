# Native login sequence and SQLite offline backend

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
## Scope and current boundary

The OGRE x64/SDL3 application now implements the selected normal-start login
through server selection and Cancel return using the original HTLauncher order.
There are two explicit backends: a local HTTP fixture origin, and an embedded
SQLite offline store. Without either selection, login retains the documented
unfinished transport boundary.

**This is not a complete offline game.** Server selection is persisted, and
native character records/SQLite CRUD now have separate component coverage.
Zone authentication, INTRO character roster/create/select/delete integration,
map entry, authoritative simulation and gameplay saves remain unfinished. No mock
empty `LoginOk` or automatic `InWorld` progression is used by these paths.

The later dedicated server and GUI belong in
`C:\_GitHub\TantraSrc\_server`; see [that plan](../../../server/archive/rust/ROOT_IMPLEMENTATION_PLAN.md).

## Source contract

| Native source | Preserved behaviour |
| --- | --- |
| `Tantra/HTlauncher/HTIntroManager.cpp:1295-1306` | OK click, capture credentials, request login, then optional saved-ID write |
| `HTIntroManager.cpp:2147-2272` | Case-insensitive same-ID billing guard (`HTString.h:107-115`); country-specific password case handling; standard MD5 and `@` + first byte + `^` + remainder MD5Plus; selected main/test credential URL |
| `HTWebInfo.cpp:131-321` | Ten-byte credential response and native cause/enabled mappings |
| `HTIntroManager.cpp:2280-2392` | Accepted credentials -> message 1011 -> availability request; failure message IDs; accepted status invokes response handler |
| `HTWebInfo.cpp:351-457` | Status parse, world count, exactly 50 zones per world and native population arithmetic/RNG order |
| `HTIntroManager.cpp:2395-2414` | Hide message -> clear captured manager credentials -> gate 0 skill attack 3612 -> gate 1 ATK2 -> enable delay -> read start clock |
| `HTIntroManager.cpp:980-1000,1796` | Camera/message checks before animation; STOP-to-STD still runs during login delay; random gate selection is suppressed during that delay; queued windows are checked before the delay handler |
| `HTIntroManager.cpp:1241-1275` | Inclusive unsigned `now >= start + 1000`; request SERVER camera -> hide login -> queue server panel -> group 0/selection -1 -> clear delay |
| `HTCamera.cpp:460-499,577-619` | SERVER linear grade 0.01, snap at <=0.01; 100 stored-float updates in the selected profile |
| `HTIntroManager.cpp:1179-1224` | Show panel only after camera finishes; nominal 2500ms comparison is commented out |
| `HTIntroManager.cpp:1334-1392` | First row click selects; any repeated click on the same row enters, without a double-click timer; Cancel uses the logout/return path |
| `HTIntroManager.cpp:2422-2448` | Hide server, reload saved ID, gate 0/1 STD, clear captured credentials, LOGIN straight camera grade 0.98; 228 selected-profile updates |
| `HTIntroManager.cpp:2908-2951` | First-server request guard, click, billing/valid-group checks and normal source slot 6; no invented connection to slot 0 |

The current game-wire/character service stops at the final request boundary.
The native connection-request guard is retained. The UI remains within the
native intro lifecycle; server selection is not an automatic character/world
state transition.

## Exact resource and data routing

`NativeLoginUrls` reads Common messages 301/302/303. The original historic
origins are routing metadata only. `--auth-origin` accepts exclusively literal
`http://127.0.0.1:<port>`; its adapter replaces the origin and retains the native
path/query. It uses no ambient proxy, redirects, cookies or HTTP authentication.
The offline adapter performs no HTTP or socket calls.

`ClientServerList` reads the native text list preferentially, or decodes the
34624-byte binary list with the original 64-byte salt. It reads group-major
10 x 54 records; the network view stops at a zero first port and copies up to
50 consecutive nonzero zone entries per world. World names use Common 251+i
for main and 259+i for test. Native `HT_hrStringCopy(...,26)` retains 25 bytes
plus NUL (`Engine/HTUtilLib/HTString.h:77-85`). No binary cache is
rewritten. The supplied profile resolves five worlds: Manas, Diyana, Kriya,
Samadi and Warzone.

The server panel is created hidden before the logo frame. Selected textures
are preloaded before BGM. Native logical dimensions are 288 x 367 with integer
centering, including even/odd screen-height handling. The original 512 x 512
background retains its source spelling `UI_IN_Sever_01.tga` (IntroUI 27056).
Three large 256 x 32 button bitmaps use 27039/27040/27041. Small OK/Cancel
textures reuse 27045/27046/27047. All eight source row buttons remain present;
only existing-world labels and callbacks are active. The first world starts
yellow while the selected index starts at -1. Common 480 supplies the original
initial availability label; this is not an invented population display.

Normal UILabel shadows and selection colour use the existing GDI adapter.
Intro messages use a single yellow point-text pass at source Y=screenHeight-96
and centred X+20, with native 5000ms expiry. Pixel-level D3D8 font/raster parity,
half-pixel placement for odd glyph widths and full widget/IME behaviour remain
unproven. GPU readback verifies the actual uploaded labels and selected BMP
pixels against the adapter's output; it does not prove stock-client appearance.

## Response compatibility and bounds

The status parser preserves `strtok` delimiter **sets**. `"<br>"` means any
of `<`, `b`, `r`, `>`, rather than an HTML substring. The reported zone count is
discarded; 50 records are consumed per world. Nonnegative population levels use
`level * 300 + rand() / 300`, with integer division, in world/zone order. Level
-1 consumes no random value. Total population includes the -1 entries; the
native first-20 alive/population accessors remain distinct.

Credential HTTP-open failure returns -1 while retaining the source's cached
enabled flag. After earlier success, this can still lead to availability lookup
and acceptance. The probe captures this observed source quirk explicitly; the
current adapters are bounded local development/offline backends.

Malformed inputs do not reproduce source memory errors. Password preparation
is limited to the native safe 20-byte buffer profile, ID to 52 legacy bytes,
credential bodies to 10 bytes, status to 40960 bytes, worlds to 10 and population
levels to a safe integer range. Invalid Korean flag bodies, truncated records,
oversized URLs and embedded NULs are rejected where source behaviour would
be undefined. URL formatting does not reproduce the original format-string
vulnerability. These are explicit bounds, not claims of malformed-input parity.

The shipped executable's MD5 formatting uses lower-case two-digit hexadecimal
for all 16 digest bytes. A read-only hash-pinned inspector records the native
instructions and strings in [the evidence file](../../evidence/native-web-login.txt).
The original executable is never run. The remake uses Windows CNG for digest
calculation, with independent known vectors in the probe.

## SQLite offline mode

Run from the repository:

```powershell
.\_remake\tools\run-remake.ps1 -Offline
```

Or use the launcher beside the packaged executable with `-Offline`, or run
`tantra_remake.exe --offline`. Enter a nonempty ID and password in the original
login controls. The first login creates that **local offline** account; later
logins check its existing verifier. Wrong passwords do not replace it. This
provisioning rule belongs to the new local backend; it is not attributed to the
historic online account service.
Local account identities retain exact legacy bytes. Historic web/database
account collation is not established by the client-side case-insensitive billing
comparison and remains unverified.

The database defaults to:

```text
_remake/package/x64/Release/userdata/offline/tantra.sqlite3
```

`--user-data-root` or launcher `-UserDataRoot` changes the remake-owned root.
The application rejects canonical source/assets/data roots and checks resolved
offline database/directory/sidecar paths. SQLite uses a UTF-8 filename and its
no-follow open flag. Offline mode and HTTP-origin overrides are mutually
exclusive. The original saved-ID file remains a separate source-format file;
it is not replaced by the account database.

The [official SQLite amalgamation](https://www.sqlite.org/download.html) is
vendored as a static x64 library. Version, published archive SHA3-256 and
per-file SHA-256 are recorded in `external/sqlite/PROVENANCE.json` and staged
in packages under `third-party/sqlite`. Runtime database files are never seeded
into the distribution and user data stays outside the package manifest.

The original account schema (version 1) uses application ID `0x4854524d`.
Version 2 retains these tables and adds native character persistence through a
transactional migration; see [character backend evidence](NATIVE_CHARACTER_RECORDS_AND_SQLITE.md).

| Table | Stored data |
| --- | --- |
| `offline_profile` | Native country, server type and source world count; mismatched profiles are rejected |
| `accounts` | Binary legacy ID, random salt, PBKDF2-SHA256 verifier, iteration count, committed login count/time and selected native world/slot |
| `offline_worlds` | Native status index, source group and original legacy world name |
| `offline_zones` | Exactly 50 status slots per world and a bounded persistent population level |

The native credential digest is fed into a per-account salted 120000-iteration
PBKDF2 verifier. Plain passwords and reusable native digests are not stored.
Queries bind values, transactions roll back failed authentication/mutations,
foreign keys are enabled, WAL uses FULL synchronisation and busy waits are
bounded. Unrelated databases and unknown future schema versions are rejected.
Source seeding preserves already stored population overrides.

Main-server status includes the source's reserved test-world offset. The
supplied profile therefore emits six status worlds for five displayed worlds.
These bodies go through `NativeWebLogin` and its native RNG math, rather than
manufacturing success events. Selecting a world persists the normal source
slot 6. Character records and SQLite operations now have component coverage;
zone authentication and character-screen integration still remain at that
boundary.

## Verification record

Both x64 configurations built and passed the full 66/66 CTest baseline, then
5/5 focused checks after the final name-buffer/case-comparison corrections.
Both final packages pass the actual SQLite offline flow in two separate
processes, loopback HTTP rejection/retry, original click/gate audio, and manifest
verification with 99 original-asset provenance entries. Existing input/saved-ID/
Cancel and general runtime checks also pass. Release's packaged offline launcher
and the isolated private-SQLite packaging test pass.

Build/package and runtime logs are recorded in
`build-ogre-sdl/offline-sqlite-{release,debug}-*.log`. See the validation matrix
in `IMPLEMENTATION_PLAN.md`. Component coverage includes:

- Independent MD5/MD5Plus vectors, reply causes, Korean flags and body bounds.
- Native case-insensitive billing-ID comparison, the 25-byte world-name content
  boundary and SQLite access through a Unicode filename.
- Actual loopback HTTP request order, ten-byte credential and availability reads.
- Native source delimiter/RNG/population behaviour and cached-enabled quirk.
- Accepted-response callback order, inclusive delay, 100/228 camera updates and
  server row/Enter/Cancel semantics.
- SQLite account creation, wrong-password rollback, reopening, literal SQL-like
  IDs, random salts, selected group/slot and population persistence; unrelated
  and future databases rejected; no plain password/native digest in the file.
- Actual SDL3 events and OGRE GPU geometry/pixels for login/server/return.
- Offline GUI flow in two separate processes, retaining account verifier,
  login count and server selection. The fixture starts no HTTP listener.
- Original finite stereo click and gate-attack samples on the audio-enabled run.
- Existing saved-ID/input/Cancel, general runtime and package regression checks.

Runtime captures and safe diagnostic traces are
`build-ogre-sdl/native-{auth,offline}-{Release,Debug}-{server.png,diagnostics.tsv}`.
No dedicated server, roster, world gameplay or complete stock-client parity is
claimed by these results. No commit or push is performed for this work.
