# Native player damage reception and persistence

`World::damage_player` connects already-rolled damage to the live C++ player
owner, native mitigation/effects and SQLite character revisions. It runs on the
zone authority thread. This internal receive operation is not a client command
and does not complete skill casting or authorize arbitrary client damage.

## Source sequence and transaction boundary

The implementation follows `CMob::OnTakeDamage` in
`C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`:

1. Reject a dead/empty/fully immune defender and invalid attacker/gap inputs.
   Require actual retained attacker state; a missing owner cannot supply invented
   combat factors. Linked damage requires the remaining cross-actor service.
2. Remove Sleep using native RemoveEffect. Consume one-shot ManaShield and return
   without changing HP or damage time. Retain the resulting native events in order.
3. Use the original correction, defense, resistance, shield and immunity rules,
   with the zone's authored settings and each live actor's calculated caste/level.
4. A positive mitigated sum reaches the native tail. PC-to-PC damage scales by
   `(sum * 2) / 5` before actual-loss credit. A positive sum of one or two therefore
   becomes zero HP loss but still reaches the damage timestamp/party-status tail.
   A nonpositive pre-scaling sum does not reach that tail.
5. Record capped actual loss, perform source God-zone attacker credit when
   applicable, then execute the compiled source HP/party/dead-FSM tail in order:
   DecHP, damage time, party status, dead FSM, return HP.
6. Save a changed character snapshot with its expected SQLite revision before
   publishing the retained source events and the new actor snapshot. A failed save
   closes the affected connection and discards its tentative native state; the
   previous durable snapshot/revision remains intact.

Zero HP loss does not create a character revision when the encoded mob is unchanged.
The live native damage timestamp remains updated where the source requires it.
The party structure's padding is explicitly zero-initialized; field order and
source calculations are preserved. The existing party sender emits nothing for
a solo player. Actual shared-party membership/routing is still unfinished.

`generate-native-damage-receive.py` extracts the HP/party/dead-state tail directly,
records the original source SHA256 and checks its statement order. The NPC receive
component uses the same tail. The wider prefix remains composed through the owned
effect, mitigation and threat services, with checked undefined arithmetic.

## Verification

The three CPU scenarios cover:

- A native PC session's zero-loss timestamp, suppressed tail, capped last damage,
  lethal HP and dead FSM.
- An isolated SQLite/world route with native PC-to-PC scaling, revisions, status
  refresh, actual authored NPC generation/publication, NPC-to-PC damage without
  PvP scaling, durable lethal HP, dead-state rejection and reopened roster data.
- Injected persistence failure, connection removal and unchanged durable mob/revision.

The world fixture retains its character beside generator one's authored area,
which is scheduled on the first callback. It selects an actually published NPC
instead of assuming a reserved handle has already spawned. An earlier Debug
attempt timed out while processing 128 callbacks for an unrelated generator;
the focused fixture keeps the same receive/persistence assertions while leaving
full cadence comparisons to the existing population suite. These are CPU checks;
no game, worker, channel or client is launched.

Current evidence is recorded in
[native-player-damage.json](evidence/native-player-damage.json) and the consolidated
[native-world.json](evidence/native-world.json). The corrected TCP retry remains
unverified and awaits approval. The complete plan and game readiness remain open.
All 66 Release CPU checks and three focused Debug receive checks pass. The three
packaged executables match Release output; canonical client/reference preservation
checks pass. The earlier timed-out Debug log is retained separately in the evidence.

## Remaining integration

Full CastSkill/UseSkill execution, hit/critical decisions, target/range checks,
costs/cooldowns and native hit/cast packets must call this authority in source
order. DealDamage's PC equipment-wear operation and atomic persistence of that
wear remain unfinished. The raw receive API does not replace those callers.

OnKilled, death UI/penalties, rewards/loot/XP, resurrection and respawn remain
unfinished. HP zero and a native dead FSM prove only the receive-state change.
SpiritLink, real parties, duel/challenge state, God-zone multiplayer acceptance
and the full timed Battle loop also remain open. `game_ready=false` remains set.

## Owned implementation paths

- `C:\_GitHub\TantraSrc\_server_cpp\src\zone\world.cpp`: owner, transaction and publication.
- `C:\_GitHub\TantraSrc\_server_cpp\src\zone\npc_damage.cpp`: native credit/NPC receiver.
- `C:\_GitHub\TantraSrc\_server_cpp\src\rules\compatibility\HtPcStatProjection.cpp`:
  retained controls and source-tail adapter.
- `C:\_GitHub\TantraSrc\_server_cpp\tools\rules\generate-native-damage-receive.py`:
  source extraction and explicit padding adaptation.
- `C:\_GitHub\TantraSrc\_server_cpp\tests\player_damage_tests.cpp`: CPU authority checks.
