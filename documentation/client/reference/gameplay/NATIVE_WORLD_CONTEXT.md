# Native world settings and entry class/quest preparation

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
Offline SQLite world initialization now performs the original server's entry
class/quest migrations inside its owned character transaction. A separate
NativeWorldSettings reader supplies source-backed settings for status inputs.
The calculated status session remains separate from the normal offline channel;
this does not complete authoritative world notifications or the full plan.

## Entry migration before Init

The generator copies the active `server.cpp:12254` class/quest statements before
SCP_RESP_CHAR_INIT. If both class bytes are zero, the tribe determines the native
starting subclass: Naga/Kinnara zero, Asura/Rakshasa one, Yaksa/Gandharva two,
Deva/Garuda three. Other class combinations are unchanged. GM/unknown tribes
receive no invented subclass. The original unknown-tribe debug log is omitted;
its branch does not change gameplay state.

The separate advanced-class migration sets quest bytes 31 through 35 to 255
only when class1 is exactly two and byte 31 is not already 255. An already-set
guard leaves the other bytes unchanged. This is distinct from CMob::Init's
later invalid-class repair and tribe-specific learned-skill migration.

OfflineCharacters invokes this preparation after resolving the native spawn and
before encoding/persisting the 1,688-byte MOB. The existing account/world/fixed-
slot transaction and ownership checks remain in effect. Subsequent roster reads
therefore see the repaired subclass. Calculation inputs can then select the
correct authored coefficient record rather than assuming subclass zero.

## Native profile reader

NativeWorldSettings reads only the selected zone directory's
`Data/WorldSettings.ini` and `Data/Settings.ini`. It does not combine alternate
server roots or change runtime network destinations.

The generator derives all **42 numeric world-setting reads** from the original
LoadWorldSettings body, including source section/key names, fallback strings,
destination indices, buffer sizes and order. The reader uses the Windows
GetPrivateProfileStringA behavior: missing files/keys use native defaults,
section/key lookup is case-insensitive, quotes/empty values are handled by the
native API and truncation retains the original buffer capacities. Defined atoi
prefix conversions are preserved; integer overflow, which has no portable
native result, fails without partially replacing loaded state.

The copied LoadZoneSettings prefix resolves country, zone ID and zone type.
Country uppercase conversion and unknown-country retention match the source.
The settings object retains untouched values across reloads. Its binding feeds
the six stat caps, native country and protection duration into the existing
status component without altering supplied clocks or entitlement timestamps.

The selected `Zone01` currently supplies a Philippines/zone-1/type-0 profile.
Its SpeedMin/HPRecvMax/TPRecvMax/ResistMax values are 300/700/600/135, differing
from the source missing-file defaults. The probe combines these actual INIs
with the explicitly authored Global item/skill/coefficient profile for all
eight player tribes. This does not assert deployed Settings.mdb equivalence.

This reader covers numeric world settings and the country/zone prefix. The rest
of LoadZoneSettings, version conversion and other server configuration are not
claimed implemented. The source's version sscanf uses int format destinations
with short storage; its x64 conversion needs a separate defined implementation.

## Transport order confirmed from source

The entry handler constructs and sends CHAR_INIT before calling CMob::Init.
Its payload therefore contains the earlier class/quest preparation and the
pre-Init learned-skill snapshot. Stronghold, castle and quest-history sends
precede rank resolution and Init/status calculation. Subsequent entry messages
and grid initialization remain part of the required world sequence.

CPSock::SendOneMessage (`CPSock.cpp:812`) calls AddMessage and then SendMessage;
it flushes the accumulated FIFO rather than overtaking previously queued data.
The offline implementation must preserve the handler and flush order when the
status session is connected. Three calculated UI frames alone do not reproduce
the whole entry protocol. Missing world services are not replaced with invented
successful packets.

## Verification and remaining work

The focused context probe passes **556 checks**: entry class/quest combinations,
the already-migrated quest guard, invalid/GM tribes, all native country names,
INI defaults/truncation/conversion/reload behavior, overflow atomicity and actual
Zone01 settings plus authored parameter binding through the native UI producer.
The existing offline character persistence probe now also verifies corrected
entry subclasses through a subsequent SQLite-backed roster read.

Release and Debug full builds pass, with **91/91 selected CTest checks passing
in each configuration** (HTTP runtime excluded). Both pass the 556-check context
probe and the extended offline character persistence probe. Evidence under
`build-ogre-sdl/native-world-context-*` includes successful build/suite logs and
`native-world-context-VERIFIED.json` with source, executable, profile and log
hashes.
This adds CPU/persistence checks; no new normal client runtime or final-client
restaging is claimed. The new INI files are not distributed in `_client` while
normal runtime status generation does not consume them.

Still required: the remaining entry inventory/world services, Init clan/rank/
siege/tolerance context, all entry notifications and native update scheduling,
calculated status persistence, frontend event handling and offline-channel
integration. Combat/death, NPCs, movement, remaining UI/visual fidelity and the
standalone server/GUI remain required by the complete implementation plan.

The subsequent [Init-world continuation](NATIVE_INIT_WORLD.md) implements clan,
siege-entry, movement and tolerance resolution over explicit inputs. Persistent
world/guild services and rank resolution remain unfinished.
