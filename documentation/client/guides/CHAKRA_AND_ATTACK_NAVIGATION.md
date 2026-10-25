# Chakra display and native navigation

Checkpoint: 2026-10-26. The user chose to retain the original Chakra bonus display.

## Chakra: totals, bonuses and persistence

The circled status fields are bonuses, not a counter of spent points. Native
`CHTUIStatus::HT_vStatus_SetInfo` displays effective Chakra on the left and
effective minus base on the right. Labels 16/18/20/23 are the four bonus fields.
Allocated points increase the base and the effective total, so an unmodified
bonus can correctly remain zero. Equipment and effects can change that bonus.

`CMob::NotifyUpdateUIMsg` supplies base MOB values in `krgChakra[0]` and calculated
values in `krgChakra[1]`. The remake preserves this mapping. Chakra spending was
already persisted through `collectWorldStatus` and `saveWorldCharacter`; it was
not missing from the saved character merely because the bonus column was zero.

The extended isolated CPU fixture verifies the actual authenticated offline
spend operation, the resulting native UI frame, the base/total increase, points
left, unchanged bonus, SQLite MOB payload and reinitialized status from that
payload. No personal profile is edited by the test.

## Players in the original source

1. `HT_vMainChar_SetTargetMovePosition` converts the clicked cell to world
   coordinates. The native map cell size is 10 world units.
2. `CHTMainCharMove::HT_vMainCharMove_CheckTargetCell` replaces the destination,
   samples its terrain height, calculates direction and initializes movement.
3. `HT_hrMainCharMove_CanMove` probes ahead in seven-unit increments, up to 32
   iterations. `CanPos` checks map movement permission and nearby characters/NPCs
   with a four-unit collision check. Blocked movement is stopped/clamped by the
   calling path; this is not a global navmesh route search.
4. Walk/run speed and elapsed time advance the character; the client sends
   movement information and the server has movement validation/correction paths.
5. Attack input enters `HT_vMainChar_SetAttackStatus`: it updates the attack
   target/range, stops the old terrain-click effect and replaces the movement
   target with the monster's current position. Attack approach/range logic then
   decides whether to close in or attack. It does not finish the old ground route.

## Monsters in the original source

- The zone server owns movement decisions. `set_Segment`, `SetSegment` and
  `StandingByProcessor` use route method, segment coordinates, waits, ranges and
  direction. Routes include patrol, rotation, return/phase-out and fixed positions.
- `LetsRoam` uses predefined short roam patterns and rejects blocked/out-of-map
  cells. Combat uses enemy selection, sight/range and return-to-home logic.
- `GetNextPos` and `GetTargetPos` call `BASE_GetRoute`. That routine builds a
  bounded sequence of eight-direction cell steps, checking neighbouring heights
  against `MH` and the mob's blocked-cell mask. It prefers the target direction
  and tries fallback directions. This is local directional routing, not A*.
- The caller shortens candidate movement and checks `pMobGrid` occupancy; enemy
  approach can also use attack-position selection and conditional `MoveAside`.
  The separate `FindPath` helper exists, but is not evidence that ordinary chase
  calls use global A*.
- `server.cpp` emits `MSG_Action` movement updates. `CHTMoveMonSter` receives
  destination/speed, interpolates between start and target and samples terrain
  height. Client interpolation does not choose the monster's server AI route.

## Current remake and fix

The remake currently uses bounded eight-neighbour grid A* and segment smoothing
in `WorldNavigation.h`. The offline authority combines map/server collision data
and actor obstruction. Monsters use authored segment/roam data with a bounded
planning budget. These are implemented routing policies, not an exact port of
the original player probes and monster directional-routing algorithms.

The reported delay came from `OfflineWorldGameplay::attack` leaving an existing
ground path active; combat approach only planned a new route when movement ended.
Accepted attack input now clears that route immediately. The next simulation
tick approaches the selected target, and the obsolete ground-click FX is removed.
Selection alone leaves ground movement intact. Invalid targets and animation
movement locks retain their existing checks.

## Source paths

Root: `C:\_GitHub\tantra-dev-main\_references\Tantra`.

| File | Relevant code |
| --- | --- |
| `HTlauncher\HTInterface.cpp` | Status Chakra labels 15-23, increase requests |
| `zone\CMob.cpp` | `NotifyUpdateUIMsg`, `IncChakra`, segment/roam/chase functions |
| `HTlauncher\HTMainCharacter.cpp` | `SetTargetMovePosition`, `SetAttackStatus`, `AttackMove` |
| `HTlauncher\HTMainCharacterMove.cpp` | Click movement and collision probes |
| `HTlauncher\HTControlDef.h` | Native cell size |
| `zone\Basedef.cpp` | `BASE_GetRoute` |
| `zone\server.cpp` | Monster AI processing and movement broadcasts |
| `HTlauncher\HTMoveMonster.cpp` | Monster destination/speed interpolation |

## Acceptance

- [x] Verify Chakra base/total/bonus values and SQLite reload in an isolated profile.
- [x] Verify selection preserves a ground path, attack cancels it before the next
  tick, and the new route ends near the monster instead of the old destination.
- [x] Existing native progression and attack-marker gameplay CPU checks pass.
- [ ] Accept route replacement and displayed Chakra in one authorized offline run.

No game, renderer or audio device was launched. Build/package and protected-file
results are recorded in the [evidence](../evidence/chakra-attack-route-20261026.json).
