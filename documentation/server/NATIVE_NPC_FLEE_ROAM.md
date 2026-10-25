# Native NPC flee, roam and return

The first ProcessMonster loop now handles ordinary flee (mode 7) and roam
(mode 8), alongside the existing peace phase. It uses the same coalesced timer,
eight-slice visitation, actor occupancy, retained status owner and failure fence.
This completes these noncombat branches; it does not complete the Battle loop.

## Source behavior preserved

`generate-native-npc-escape.py` compiles the original `CMob::LetsFlee`,
`LetsRoam` and `CalDistance2`, with source hashes and checked host services.
It extracts the original direction, knockback and roam tables and audits the
selected timer branch order/constants in `server.cpp` at configure time.

- Flee checks handles and Terror immunity, dispatches Think/Flee before reading
  live target coordinates, and uses the authored run speed to build short-coordinate
  paths. Entry does not call UpdateSpeed. Partial writes, blocked zero points and
  untouched entries after an early boundary exit are retained.
- Roam starts at Last rather than Target, consumes one shared RNG draw and selects
  one of five patterns. The implicit fifth pattern is all zero. Mode/progress are
  assigned before the native UpdateSpeed call; the retained session receives the
  resulting RNG state.
- Each timed branch checks effects and calls InitStatus, without calling
  InitCondition. DontMove updates attacked time and stops before path progression.
- Flee publishes run actions (3), ends at a zero point or path exhaustion, enters
  peace and recomputes speed. Roam publishes walk actions (2), preserves the idle
  slice at progress 5, and dispatches Return before computing its return delay.
  Roam completion does not add an UpdateSpeed call absent from the source.
- Movement uses native PickFree ordering and updates the shared actor grid,
  appearance, Last/Target, threat coordinates and retained native motion state.
- Return uses native rounded Euclidean distance, the current segment's range,
  signed integer truncation, speed floor and unsigned clock wrap. Beyond 80 cells,
  the source Teleport sequence finds a free cell, checks blocking and publishes
  warp action 5. Last becomes the resulting Target; select-target time clears.
- AI React code 30 now invokes the actual flee path. Other unimplemented nonempty
  reactions, skills, lifecycle operations and events still require real resolvers.

Invalid native array indices, overflow and out-of-map reads fail at checked owner
boundaries. A timed failure fences further processing. These guards do not turn
undefined native memory reads into invented gameplay rules.

## Verification boundary

Three focused CPU scenarios cover path directions/rounding, immunity and early
exits, callback mutation, all five roam selections/RNG, source timing, authored
AI 92/event 6 -> Action 502 -> React 30, native run/walk packets, occupancy,
blocked roam, idle/return phases, stun/expiry, destination warp delivery and
invalid-path fencing. The CPU scene copies one atomic Zone01 dataset into a
temporary folder and records its deliberate one-generator variant. The timer
checks use a controlled grid; they do not establish Mandara collision acceptance.

Final build/test and preservation evidence is recorded in
[native-npc-flee-roam.json](evidence/native-npc-flee-roam.json).
All 51 Release CPU checks and 12 focused Debug CPU checks pass. Packaged Release
manager/service/zone hashes match the build output; source and canonical client
hash checks pass. The complete server plan remains unfinished.
No worker, HTLauncher or channel is launched for these checks. The corrected TCP
retry still awaits the earlier approval; full AI/combat/game readiness stays false.

Combat-driven transitions into roam, Battle/skill/damage/reward/death/respawn,
summon creation and a linked retainer's deletion remain unfinished. The source
SummonOld retarget branch is implemented, but its connected lifecycle acceptance
is pending. An existing linked retainer requires a lifecycle resolver before warp.

## Exact reference paths

- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`: LetsFlee, LetsRoam,
  CalDistance2, React, UpdateSpeed and KillMobSummoned.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: ProcessMonster flee/roam
  caller sequence and Teleport.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.cpp` and `Basedef.h`:
  direction/knockback/roam tables, path widths, constants and flags.
- `C:\_GitHub\TantraSrc\Tantra\zone\GetFunc.cpp`: PickFreeMobGrid/GetAction.
- `C:\_GitHub\TantraSrc\Tantra\zone\SendFunc.cpp`: GridMulticast updates
  Last/Target and visibility.
- Owned implementation: `_server_cpp\src\zone\npc_escape{,_motion}.cpp`,
  `npc_tick.cpp`, `npc_world_actions.cpp`, `include\tantra\npc_motion.h`.
- Owned comparisons: `_server_cpp\tests\npc_escape_tests.cpp`.
- Adapter provenance: `_server_cpp\src\rules\PROVENANCE.json`.
