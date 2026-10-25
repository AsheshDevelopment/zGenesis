# Safe-zone weapons, missing impact particles and monster routes

Updated: 2026-10-25. Scoped fixes; the broader goal remains paused.

## Causes and changes

1. Safe cells selected neutral animations, while equipment stayed on its hand
   sockets. Weapons now rebind to the original carry sockets on entering safe
   cells, idle/emote poses and weapon-back skill stages. Leaving those states
   restores hand sockets. Rebinding preserves the body animation clock.
2. The user's diagnostics reported `Cannot create native combat particle draw`
   for `tPA_2100191.tga`. The interpreter passed an absolute disk path into
   OGRE's registered resource namespace. It now requests
   `resource/fx/fxPCTexture/tPA_2100191.tga`; archive IO still uses the full
   client path. The regression fixture validates the actual mounted HPK names.
3. Peaceful monsters had no route controller. Their walking animation existed,
   but only retaliation/chasing moved them. Nearby monsters now follow the
   authored generator segments, waits and native short roam offsets, with
   collision-checked paths. WLK/RUN stop on arrival and fixed routes stay fixed.

## Source and resource paths

Reference root: `C:\_GitHub\tantra-dev-main\_references\Tantra`.

| Relative source path | Reference behavior |
| --- | --- |
| `HTlauncher\HTMainCharacter.cpp:474` | Neutral/safe/idle/emote and weapon-back skill carry decisions. |
| `HTlauncher\HTEngineHandler.cpp:11064` | `HT_hrUnarmWeapon` socket selection. |
| `HTlauncher\HTEngineHandler.cpp:6110` | Armed second claw and off-hand dagger sockets. |
| `zone\CNPCGene.cpp:250` | Native generator fields and route normalization. |
| `zone\CMob.cpp:1008`, `:1740` | Standing-by processor, waits and segment progression. |
| `zone\CMob.cpp:3663` | Peaceful walk speed versus combat run speed. |
| `zone\CMob.cpp:8318`, `zone\Basedef.cpp:557` | Five-row, four-step native roam table; the last row is zero-initialized. |
| `zone\server.cpp:14465` | Peaceful movement dispatch and segment processing. |

Runtime inputs:

- `E:\Global-server\Zone01\NPCGener.txt`, `MapData.tcm`, `GenerationArea.idx`.
- `C:\_GitHub\TantraSrc\TantraClient\system\ClientRes.txl`.
- `C:\_GitHub\TantraSrc\TantraClient\resource\object\PC\Mesh\PC_*_Basic.tmb`.
- `C:\_GitHub\TantraSrc\TantraClient\resource\fx\fxPC.txl`, `fxPCEtc.tfx`,
  `fxPCTexture.hpk`, `fxPCSound.hpk`.
- `_client\system\offline\world-gameplay\Monster.tsv` and
  `_client\system\offline\gameplay-parameters\Item.tsv` in the final client.

The canonical client and zone references are read-only. Final client HPKs keep
their supplied names and locations.

## Native carry mapping

| Equipped part/type | Carry socket |
| --- | --- |
| Short sword, main/off hand | `HWeapon01` / `HWeapon02` |
| Ordinary one-hand weapon | `BWeapon01` |
| One-hand item authored on `RightClaw` | `BWeapon04_1` |
| Two-hand spear/axe/sword, staff, moon sword | `BWeapon05` |
| Bow | `BWeapon02` |
| Primary/secondary claw | `BWeapon04_2` / `BWeapon04_1` |
| Shield | `BWeapon03` |

The native switch's other weapon types use `BWeapon01`. Both claw models are
retained, and a second dagger uses the native armed `LeftSSW` socket.

Some supplied bodies lack sockets used by other tribes' weapon families.
The native code ignores unsuccessful attach calls after detaching the weapon.
Unavailable attachments are therefore hidden and reported once rather than
terminating the client or inventing a replacement socket. Valid hand sockets
are restored when leaving the carry state. The fixture records four missing
carry sockets among the inspected combinations; it does not count them as
successful socket bindings.

## Movement scope and bounds

- [x] Ordinary MoveNRoam(0), Patrol(2), Rotation(4) segment traversal, authored
  waits/ranges, and fixed route types 8/10.
- [x] Walk/run selection from authored monster parameters; stop on arrival,
  retry obstructed paths, resume after action completion and reset on respawn.
- [x] Native TCM blocked/no-monster-attack/safe cells, client TCC collision and
  nearby living-actor/player obstruction.
- [x] Sparse A* with at most 256 expanded nodes per new route, at most two
  route attempts per tick, and a soft 2.5 ms planning budget. An individual
  permitted attempt can exceed the soft time target.
- [x] Peaceful simulation is limited to the current 500-unit presentation
  interest radius. An actor index avoids scanning every actor at every path node.
- [x] Existing basic combat, inventory and revival CPU regression passes.
- [ ] Full native AI probability tables, formations/followers, aggression,
  phase-out callbacks and complete server-side movement/network parity.
- [ ] Native `.tbo` collision parity and visual navigation acceptance.

The offline adapter uses authored `SegmentNWait` values. The legacy loader has
a `Segment3Wait` assignment to slot 1; the adapter retains slot 3's own value.
Normal movement interpolation uses the existing client frame interval cap;
authored waits still receive elapsed simulation time. Native shared-global RNG
interleaving and every server scheduler callback are not established by this work.

## Verification

- [x] Carry fixture: 224 checks, eight tribes, 12 weapon types, 41 equipped
  parts and 78 successful authored socket matrices; four absent carry sockets
  are explicitly recorded.
- [x] Impact fixture: 4,284 checks and 13 weapon profiles, with registered HPK
  texture names required by the renderer double. WAV decoding remains covered.
- [x] Navigation fixture: 16,911 checks; 55 actors moved during the bounded
  simulation, with walking, collision, fixed-route and action-lock checks.
- [x] Release x64 compilation and targeted offline gameplay regression.
- [ ] Rendered/audible acceptance in one authorized offline process/channel.

No game, renderer or server was launched. CPU checks do not establish on-screen
appearance or measured game FPS. Other native FX node families remain tracked
in [monster combat presentation](MONSTER_COMBAT_PRESENTATION.md).

See [release evidence](../evidence/safezone-impact-navigation-20261025.json)
for staged executable hashes and preservation checks.
