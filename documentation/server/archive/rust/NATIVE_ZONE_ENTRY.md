# Native zone entry prerequisites

Implemented on 2026-10-24 in `crates/services/src/zone_data.rs` and `native.rs`.
The gateway now accepts owned Mandara FIRST CHAR_INIT and emits calculated status
when authored status tables are staged. See [status authority](NATIVE_STATUS_AUTHORITY.md).
Other entry services, world actors and connected client acceptance remain open;
`game_ready` stays false. No HTLauncher process was launched.

The earlier parser/codec packaged checkpoint is retained at
`test-output/native-zone-1792777707-41784/acceptance.json`. The newer FIRST/status
checkpoint is `test-output/native-zone-1792778612-25596/acceptance.json`. Zero
sessions/zone leases remained and original dataset hashes were unchanged.

## Source and behavior

- `C:\_GitHub\TantraSrc\Tantra\zone\GetFunc.cpp`: selected `GetRandom`,
  `GetTrimurityArea` and `GetEmptyMobGrid` definitions are extracted unchanged
  apart from comments for the independent MSVC fixture exporter.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp:1320`: packed generation-area
  loading; missing religion groups copy only the first common area.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp:11859`: zero-position repair,
  FIRST connection rules, first empty-grid check and six generation retries.
  Positive-HP new characters receive save points; zero-position repairs and
  exactly-on-boundary saved positions do not acquire that flag.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp:12320`: CHAR_INIT reply fields.
- `C:\_GitHub\TantraSrc\_remake\src\client\NativeCharacterRecords.cpp`:
  the remake's normalized logical CSP codec, independently compiled for byte
  comparison. The reply body is 3,604 bytes, the complete frame 3,616 bytes.
- `C:\_GitHub\TantraSrc\_remake\src\resources\ServerZoneData.cpp`: independent
  packed-reader comparison for all Zone01 property cells.
- `E:\Global-server\Zone01\GenerationArea.idx` and `MapData.tcm`: actual
  Mandara fixture data, loaded together from one directory. The existing zone
  dataset manifest additionally verifies NPCGener and the other staged files.

Spawn selection increments the shared native connection counter, then consumes
two MSVC CRT RNG draws (X then Z), with exclusive upper bounds. Empty-cell search
first accepts the actor's own cell, then an empty unblocked requested cell,
then squares of radius 1–5 in ascending Z/X order. The Rust API accepts an
occupancy lookup; it is not yet attached to a running actor world. A future world
must share and serialize its spawn counter/RNG rather than reset them per player.

The parser rejects truncation, duplicate cells, invalid coordinates/floor counts
and trailing TCM bytes. Missing cells default blocked. Dimensions are bounded;
selected native spawn parity currently covers the 1,024 × 1,024 Zone01 data.
Missing common spawn data fails explicitly rather than using uninitialized areas.
Other connection types, zone-specific spawn overrides and travel are pending.

## Reproduction

From `C:\_GitHub\TantraSrc\_server`:

```powershell
cmake --build test-output/native-codec-build --config Release --target native-entry-fixtures
./test-output/native-codec-build/Release/native-entry-fixtures.exe E:/Global-server/Zone01 fixtures/native-entry.json
cargo test -p tantra-services --lib zone_data --locked --offline
cargo test -p tantra-services --test entry_parity --locked --offline
```

`TANTRA_SERVER_TEST_SOURCE` can select an identical Zone01 dataset elsewhere.
The exporter uses MSVC `rand()` independently; the Rust test compares 16 draws,
25 entry cases across five clans, coordinates, new-character flags, connection
counters and the following RNG draw. The property FNV64 verifies every decoded
cell against the independent C++ reader. This is a consistency hash, not a
security claim; the zone dataset manifest uses SHA-256.

Fixture generation includes the selected GetFunc SHA-256 in the generated
`test-output/native-codec-build/native-entry-source.inc`. No original source or
deployment file is edited. The C++ wrapper stubs logging and suppresses a failure
diagnostic's out-of-bounds read; it does not change the selected search branches.

The CHAR_INIT golden includes nonzero cargo, skills, quests, guild, event flags,
timestamps, a signed bag index and a dead character. It proves packet layout,
not authorization, entitlement ownership, status correctness or live world entry.
