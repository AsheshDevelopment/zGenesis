# Native NPC attacker memory and group response

The C++ zone library now compiles the original CMob functions for attacker
memory, combat acquisition and help/link propagation. Initial population
generation prepares the corresponding identity and group state for every NPC.
The [ordinary peace phase](NATIVE_NPC_PEACE_PHASE.md) also compiles InitStatus
and runs periodically. Full battle/special-mode/lifecycle processing is still unfinished.
This document does not establish connected combat or fresh TCP acceptance.

## Implemented behavior

`include/tantra/npc_threat.h` and `src/zone/npc_threat.cpp` own the checked,
zone-local actor registry. Native field names remain in the facade so the
generated functions can retain their actual control flow:

- `IsDead`: native FSM/empty-mode checks. The caller checks HP separately.
- `OnUnderAttack`: immediate UnderAttack1/UnderAttack2 dispatch, attacked time,
  reciprocal memory and leader/follower guard propagation in source order.
- `MemorizeAttacker`: sixteen slots, target acquisition before master/party
  attribution, score clamps, native timeout/replacement rules and PC/NPC credit.
- `ForgetAttacker`: strict timestamp expiry and the PC's fourth/additional NPC
  pursuers receiving the native trace increment. Expiry leaves CurrentTarget
  for the later combat controller.
- `ClearAttacker`, `SortAttackers` and `get_Attacker`: native rank handling,
  partial clearing, target reset and selection-sort tie behavior.
- `ClearAggressiveScore`: the source's strict sixty-second comparison.
- `CallOthers`: same-family help/link recruitment, source spiral ordering,
  flags, group limits and dead party-member removal callback.

New zero-damage memory expires after twenty seconds. Refreshing an existing
entry uses sixty seconds even when the new damage is zero. Full-slot replacement
uses the native strict thirty-second threshold and preserves its unclamped new
score. These are distinct source branches rather than a common timeout helper.

Help ignores terrain blockers and recruits six allies because the original
checks `5 < helper_count` after insertion. Link checks blockers and uses the
original seven-entry party-size table. The offset table starts beside the caller;
help does not recruit the caller's own cell. Under-attack party propagation is a
separate path and retains its guard/combat filters.

Callbacks run synchronously. The existing AiProfile dispatcher can call the
native group routine before React, so an ally's memory/mode changes are visible
to subsequent actions. Missing Think/removal resolvers fail explicitly. Native
operation/callback lifetimes prevent an active actor from being erased while
allowing removal of an unrelated actor. Recursion is bounded and unwinds on error.

`Population::advance` binds handle, native mode/FSM, HP, class, family, AI flags,
position, blocked-cell mask and generator group/leader. Later generated followers
update the same leader's party storage. Clearing the population removes these
identities. The existing compiled-source generation comparisons still match all
1,702 spawns, counts, inspection/deck bytes and global RNG in both startup modes.

## Defined-input guards

`tools/rules/generate-native-npc-threat.py` records original source hashes and
extracts the actual functions. It asserts constants, event indices, family
property order and the native party-link table before emitting the build include.
The owned adaptations are explicit:

- Fix the impossible `invalid_low && invalid_high` attacker guard to reject
  either out-of-range case before native registry access.
- Reject signed damage/score/trace overflow; the source's 19-billion comparison
  cannot protect its 32-bit fields. Valid 32-bit arithmetic remains unchanged.
- Preserve MSVC's unsigned-to-signed replacement-gap interpretation explicitly.
- Bound actor/grid access and reject native party-link indices seven/eight:
  the caller permits these counts but its actual table has only seven entries.
  No invented table value or clamp is substituted.
- Pass the already-resolved sGroup code from AiProfile and adapt pair-coordinate
  access to the checked map/occupancy facades.
- Guard native operation lifetimes and recursive callbacks.

The component retains the source's unsigned timer arithmetic and strict compares;
it does not silently substitute a different wraparound policy. Undefined-input
rejection is distinct from proving full recovery from a failed world operation.

## Verification and remaining integration

Five focused CPU scenarios exercise memory, expiry/clearing/sorting, reciprocal
under-attack transitions, group recruitment/removal, and immediate AiProfile
callback order. Additional checks reject overflow, invalid handles, undefined
link counts, missing resolvers, excessive recursion and active-owner deletion.
Population checks verify prepared native identities and final group links for
both recorded generation modes, including cleanup and unchanged RNG.

Current logs and hashes are recorded in
[native-npc-threat.json](evidence/native-npc-threat.json). The consolidated Release
CPU suite passes all 38 checks; eight focused Debug checks cover the same
component, generation, Think/Speak and the SQLite-backed world authority. These checks
launch no service, zone, game client or channel.

The [world-action bridge](NATIVE_NPC_WORLD_ACTIONS.md) now binds live PC mode/FSM
ownership and synchronizes NPC control with status/motion. It also tests a
recorded nonzero group variant, since all normal Mandara generator groups are zero.
Still required before the periodic world controller is enabled:

- Connect live party-service state and complete combat disconnect/reconnect
  recovery across the existing PC/NPC control ownership bridge.
- Connect source-order recovery, effect/status/condition updates and activation
  timing to detection, Think, OnUnderAttack and standing movement.
- Supply real world speech, reaction, skill, event and deletion handlers; wire
  flee/roam/combat branches, rewards, loot and death/respawn.
- Verify the complete source caller order and connected gameplay/persistence.

`npc_ai_ready=false` and `game_ready=false` remain authoritative. Preparation of
the registry does not enable monsters to attack or establish live AI readiness.

## Exact read-only references

- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`: the nine extracted functions,
  g_irgPartyVSParty, Think/Speak, React, LetsFlee and LetsRoam.
- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.h`: mode values, members and inline
  ClearCurrentTarget.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.h`: actor/party/memory limits,
  fields, enum/event/property order, flags and time constants.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.cpp`: spiral offsets and radii,
  already extracted and compared by the spatial component.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: ProcessMonster caller order;
  it remains the required integration target, not an implemented whole-loop claim.
- `C:\_GitHub\TantraSrc\_server_cpp\fixtures\native-initial-generation.json`
  and `native-initial-generation-propagated.json`: existing unchanged native
  comparisons, with original-copy paths/hashes in `fixtures/PROVENANCE.json`.

All implementation changes are owned by `_server_cpp`; the original source,
Rust server, OGRE client and normal offline database remain separate.
