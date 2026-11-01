# Mandara2nd map checkpoint

The owned Global ClientRes Map 40002 is `MAP_Mandara2nd`; its town is Shambala.
It is served by Zone02 using the original `E:\Global-server\Zone02` dataset.
The zone provenance records the hashes of MapData, GenerationArea, NPCGener,
Settings and WorldSettings. Client assets remain in the existing client tree
and HPKs; no archives were extracted for this checkpoint.

Two visible Release clients verified the following on 2 November 2026:

- The original portal UI offers 101 -> 121 for 1,000 Rupiah. Cancel costs
  nothing. The destination renders Map 40002 terrain and placed objects.
- All 16 NPCs whose authored Zone02 positions resolve on the map arrive from
  server authority and match their native parameter coordinates.
- The map's sky, two cloud layers and fog are active. Source field BGM 30007
  plays through miniaudio. The existing source controller uses the same
  Mandara field BGM for Maps 40001 and 40002; a distinct filename was not invented.
- The first player returns without an extra fare. The second enters Mandara2nd
  and exits there. Both retain their native data and UI/audio preferences.
- Party presence and chat work across the two zone processes. After stopping
  workers, reopening authoritative storage returns the exact final maps,
  coordinates and fares observed in the clients, including the Map02 player.

The supplied client lacks `resource/map/Mandara2nd/MAP_Mandara2nd.tms`.
Its ambience regions are logged as missing and skipped. BGM still plays. This
is a recorded resource absence, not an assertion that all historical sounds or
every original quest/service on the map have achieved parity. Advanced NPC
service completion is tracked separately in the active plan.

See [current evidence](evidence/npc-map-backups-20261102.json).
