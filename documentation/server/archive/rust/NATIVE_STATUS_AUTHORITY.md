# Rust-hosted native character status and Mandara FIRST entry

Implemented and verified on 2026-10-24. The overall server remains incomplete.
Zone01 can initialize an owned character, return normalized native CHAR_INIT and
status frames, process Chakra/skill learning, tick existing timed effects and
save resulting character changes. `game_ready` remains false: no actor world,
nearby actor simulation, native frontend connection or gameplay availability is claimed.
Owned cell movement and same-endpoint reconnect were subsequently verified;
see [movement authority](NATIVE_MOVEMENT_AUTHORITY.md).

## Implementation

- `C:\_GitHub\TantraSrc\_server\crates\native-rules`: Rust ownership and checked
  C ABI around the engine-free native equation component. The opaque session
  cannot be shared/mutated across Rust threads. Immutable tables can be shared.
  C++ exceptions are caught at the ABI; expected action rejections are distinct
  from failures, which close the connection.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\runtime\world_entry.rs`:
  Rust authorization, occupied-cell reservation, shared spawn/RNG state,
  native actor keys, FIRST entry, effect ticks and revision-checked persistence.
- `C:\_GitHub\TantraSrc\_server\crates\services\src\status_content.rs`: table
  staging and verification against both SHA-256 manifests and importer provenance.
- `C:\_GitHub\TantraSrc\_remake\src\compatibility\HtPcStatProjection.cpp`:
  existing source-equation adapter. It now accepts the authoritative actor handle,
  can adopt the world's RNG state and can produce an explicit fresh UPDATE_UI.
- `C:\_GitHub\TantraSrc\_remake\tools\generate-native-pc-stat-core.py` and
  `generate-native-probability.py`: source extraction with reviewed build flags
  and source hashes. Cargo invokes CMake/Python/MSVC to compile a static library;
  no OGRE/SDL renderer or legacy server executable is linked or launched.

Networking, service coordination and SQLite remain Rust. Stat/effect arithmetic
is compiled C++, reused through the ABI; this is not a pure Rust rule port.
The binaries do not need the original source tree at runtime. Building this
component currently requires Windows x64 MSVC, CMake, Python and the checked-out
reference source. The native table loader currently uses Windows profile APIs.

## Source sequence and data

Selected originals are read-only under `C:\_GitHub\TantraSrc\Tantra\zone`:
`server.cpp`, `CMob.cpp`, `CMob2.cpp`, `Basedef.h`, `HTParamMgr.cpp`,
`SendFunc.cpp`, `TNDeck100.cpp` and `TNRate.cpp`. Key call sites include:

- `server.cpp:11859`: zero-position repair and FIRST entry/spawn logic.
- `server.cpp:12320`: CHAR_INIT fields and following world-entry operations.
- `server.cpp:3799`: skill-learning request dispatch.
- `server.cpp:4721`: explicit UPDATE_UI request dispatch.
- `server.cpp:4765`: Chakra request dispatch. Executable enums use 1–4 despite
  the older packet comment describing 0–3.
- `CMob.cpp:4038`: native IncChakra; `CMob.cpp:5319`: native LearnSkill.
- `CMob::Init`, UpdateChakra, LoadSkills, equipment, caste, continuous effects
  and `CMob2.cpp` affection lifecycle: selected source-equation component.

The runtime verifies the session/character owner and current zone, chooses an
unoccupied cell from the selected IDX/TCM dataset, applies entry class/quest
repairs and initializes status. It commits the resulting native snapshot before
sending CHAR_INIT followed by the source component's ordered owner/grid status
frames. Party recipients and other world services remain pending. Source-derived
spawn and status operations adopt the same serialized world RNG stream rather
than reseeding per character/action.

The selected zone's own `Data/Settings.ini` and `Data/WorldSettings.ini` supply
status constants, locale/zone context and PK-protection duration. Current local
accounts have zero purchased-entitlement timestamps; no entitlement service is
invented. Unsupported entry/portal modes fail closed. Only Zone01 enables this
entry component; other configured zones retain their authentication boundary.

Authored input is retained separately from deployed encrypted tables:

- `B:\__TANTRA\TantraDataScripts\Global\HTSSetting-global.xml` produces
  `_remake/derived-assets/character-stats/{Coefficient,EffectTolerance,LevelUp}.tsv`.
- `B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml` produces
  `_remake/derived-assets/gameplay-parameters/{Item,PCSkill,MonsterSkill}.tsv`.
- Both importer `PROVENANCE.json` files accompany the staged tables in
  `C:\_GitHub\TantraSrc\_server\data\native-rules`. Only these eight files and
  a runtime manifest are staged. Their equality with encrypted deployed tables
  is not asserted. Existing importers retain the source paths and hashes.

The package script stages these tables after building. A manual equivalent is:

```powershell
./bin/tantra-service.exe stage-status-content --service ./data/native-rules --source ../_remake/derived-assets
```

Invalid/missing required tables prevent FIRST entry. Authentication-only fixture
trees without a status directory still work. An existing malformed status
directory prevents the zone from advertising even that entry component.

## Verification

`fixtures/native-status.json` was exported by
`crates/native-rules/native/reference.cpp`, a direct C++ caller independent of
the Rust ABI wrapper. Its 24 cases cover all eight tribes at new-character,
equipped level-50 and dead-entry states. The Rust test compares both native mob
snapshots, calculated values, RNG results and complete ordered event bytes,
including actor handles 7–30. It also compares Chakra, learning and expiry,
checks invalid requests, shared RNG adoption and fresh UI production.
This verifies the bridge against the source-derived component; it is not an
original shipped-binary, full CMob lifecycle or multiplayer combat parity claim.

```powershell
cargo test -p tantra-native-rules --test status --locked --offline
cargo test -p tantra-services --test status_content --locked --offline
cargo test -p tantra-services --lib ownership_tests --locked --offline -- --test-threads=1
```

The CMake build directory is Cargo's `OUT_DIR/native`. Its optional
`tantra-rules-reference` target exports the fixture with arguments
`<derived-assets> <Zone01> <output.json>`.

Packaged runtime evidence:
`test-output/native-zone-1792778612-25596/acceptance.json`.
One isolated Zone01 and one SQLDMN/DBSRV pair passed:

- Native roster-to-world authentication, duplicate-owner protection and fencing
  of the old roster socket before its delayed disconnect.
- Restored level-50 skill/equipment data, FIRST CHAR_INIT, valid Mandara spawn,
  and three initial native UI frames checked against the direct C++ fixture.
- Chakra request `0x3520`, learn request `0x3210` and UI refresh `0x3500`, with
  native UI/learn responses and changes durably saved by SQLDMN.
- SQLite reopen: revision 4, learned skill level 2, one spent Chakra point,
  unchanged equipment/inventory and matching current/save-point cells `(495,193)`.
- Protected shared-service dependencies, clean stop, one preserved character,
  zero sessions/zone leases and unchanged source dataset hashes.

Nine SQL ownership tests, the status/content CPU tests, formatting, warnings-denied
Clippy and the Windows x64 Debug build/package pass. The runtime check used the
exact packaged executable hashes recorded in its acceptance file. It launched
no HTLauncher and changed no normal client profile or executable.

## Remaining boundaries

Same-endpoint FIRST and disconnect/reconnect persistence subsequently passed the
packaged movement fixture documented above. The original status checkpoint here
retains its own binary hashes and revision-4 evidence.
Other native connection/resurrection/portal types, special-zone routing, full
item/entry validations, stronghold/castle/quest-history notifications, purchased
entitlements and associated failure UI are unfinished.

Existing self-contained timed effects tick here; periodic combat damage/healing,
caster/party/world recipients, monster actors, active casts, nearby movement delivery, rewards,
loot and NPC services are not established by this check. Native live-key lifetime
and occupied player cells are managed, but this is not an actor simulation.
Idle peers remain bounded by the existing transport deadline; native keepalive,
capacity/load tests, remote security, backup/restore and full travel recovery
remain open. The OGRE frontend still uses its offline authority. The earlier
failed Mandara client acceptance has not been automatically retried.
