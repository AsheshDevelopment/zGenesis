# Native NPC world actions and control ownership

The C++ population owner now connects Think/Speak, native group memory, retained
NPC status, PC control state, actor delivery and standing-step movement. These
are callable world actions with CPU integration evidence. The
[ordinary peace phase](NATIVE_NPC_PEACE_PHASE.md) now runs periodically after
generation. The complete ProcessMonster controller remains unfinished; monsters do not yet
run a complete live combat loop. `npc_ai_ready=false` and `game_ready=false` remain.

## Implemented connections

- `Population::think` uses the source-checked AiProfile dispatcher and the zone's
  shared RNG. It resolves nearby speech and native help/link group effects in
  order. PC names remain native byte text when formatting targeted speech.
- Speech uses matching original zone/client S_SCP_NOTIFY_CHAT records: type
  0x9502, a 236-byte payload including the original trailing alignment, text color 15, background zero,
  the native religion/location fields and 224-byte text storage. Delivery uses
  the original twenty-recipient point route and does not require a published
  sender. The extracted project settings and balanced header pack directives are
  checked; the record is 248 bytes with text at offset 22. Padding/unused fields
  are zeroed. Explicit source/client record checks are separate from proving stock
  transport/encryption compatibility.
- `Population::under_attack` connects immediate native Think callbacks,
  reciprocal memory and group propagation. Changed mode/FSM values reach retained
  NPC status and motion and the live PC status session through a checked owner
  callback. PC entry, movement, ordinary status publication, disconnect and zone
  shutdown now maintain the corresponding population ownership records.
- NPC AI charge, cast count, action lock and operation RNG are synchronized into
  the existing native session. They retain the initialized skills/decks; the
  bridge does not reinitialize the actor or manufacture skill damage.
- `Population::standing_step` connects native standing/segment rules to Start
  and Move/Rest Think callbacks, the actual extracted GetAction routine, its
  caller's walk override, appearance/visibility delivery and shared occupancy.
  Motion, AI position, threat coordinates and native target state advance together.
  Template MOB coordinates remain unchanged, matching the native representation.
- Reaction classification preserves the original React switch default and its
  empty case 70. [React 30 now invokes native flee](NATIVE_NPC_FLEE_ROAM.md).
  Other nonempty reaction/skill/event branches require an actual world
  resolver. Event callbacks receive the native target, event, position and caller
  immediately, before final AI scalar/RNG synchronization. Missing implementations
  fail explicitly instead of reporting gameplay readiness.

AI calls borrow one authoritative actor registry, clock and RNG stream for their
duration. Nested calls must use the same context, recursion is bounded, and the
borrow unwinds after failure. Threat operations track changed control fields
without allocation in their completion guard. Active native actors cannot be
erased during a callback; unrelated actors can be removed safely.

World control synchronization changes mode/FSM only. It preserves native stance,
MOB bytes, active status/effect state and retained tables. It clears already
delivered notifications instead of replaying the previous operation's frames.

## Verification

Five CPU integration scenarios cover:

- Native speech/action field layout, byte text and twenty-recipient delivery.
- Two hundred actual authored Start events compared with the source-checked
  dispatcher, including exact delivered speech frames and global RNG.
- Real two-pool group generation, reciprocal PC combat mode, retained sitting
  stance, unchanged durable PC MOB bytes and synchronized NPC status/motion.
- Eight actual Mandara NPCs moving after their authored waits at two-second
  standing intervals, with shared occupancy/appearance updates and unchanged
  template coordinates.
- An authored AI90 group/event action, immediate callback arguments, retained
  cast/lock/RNG state, and rejection when its required event resolver is absent.

All 508 supplied Mandara generators have Group=0. The group scenario therefore
copies one complete owned Zone01 dataset into an isolated temporary folder and
records an explicit NPCGener-only variant: one 2001 leader and two 2002 followers.
The normal dataset is unchanged. Variant metadata, copied/changed hashes and
the tested executable/source hashes are retained per build configuration. The
existing native attacker-memory comparisons also cover guard/help/link rules.

The current Release suite passes 43 CPU checks. Focused Debug evidence, source
and packaged binary hashes are recorded in
[native-npc-world-actions.json](evidence/native-npc-world-actions.json).
These checks start no service, zone, game client or channel.

## Remaining complete-controller work

The new APIs do not replace the whole native ProcessMonster sequence. Ordinary
recovery, forgetting, effects/status/conditions, activation, detection and phase
scheduling now run through the peace controller. Ordinary flee/roam and return
also run in its noncombat loop. Lifetime/master services, combat, active skills,
full event/reaction services, phase-out, death, rewards, loot and respawn remain open.
Live party service ownership and disconnect/reconnect combat recovery are also
required; preparation of a PC control record does not complete social systems.

An unresolved callback may fail after earlier source-ordered effects have already
run. Complete controller failure fencing must be established before enabling
that route. Native phase-out is rejected until KillMonster/DeleteMob ownership
and lifecycle operations have real implementations. The corrected isolated TCP
probe still awaits approval; these CPU checks are not that retry.

## Exact references and owned files

- `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`: Think, Speak, React,
  OnUnderAttack, MemorizeAttacker and standing/segment behavior.
- `C:\_GitHub\TantraSrc\Tantra\zone\GetFunc.cpp`: the actual GetAction body.
- `C:\_GitHub\TantraSrc\Tantra\zone\Basedef.h` and
  `C:\_GitHub\TantraSrc\Tantra\HTlauncher\Basedef.h`: matching action/chat
  records, flags and constants.
- `C:\_GitHub\TantraSrc\Tantra\zone\CPSock.h`: native normalized header.
- `C:\_GitHub\TantraSrc\Tantra\zone\ZONESRV.vcproj` and
  `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTLauncher.vcproj`: source alignment
  settings, checked alongside the headers' balanced pack directives.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`: ProcessMonster caller order,
  walk override and generation-before-processing order.
- `C:\_GitHub\TantraSrc\_server_cpp\tools\rules\generate-native-npc-actions.py`:
  checked extraction and source hashes for wire records/GetAction/reaction cases.
- `C:\_GitHub\TantraSrc\_server_cpp\src\zone\npc_actions.cpp` and
  `src\zone\npc_world_actions.cpp`: owned packet/owner integration.
- `C:\_GitHub\TantraSrc\_server_cpp\src\rules\PROVENANCE.json`: original and
  adapted status-core hashes, including the explicit control/AI state extension.
- `C:\_GitHub\TantraSrc\_server_cpp\tests\npc_world_actions_tests.cpp`:
  CPU integration checks and retained group-fixture provenance.

Original source, Rust implementation, OGRE client and the normal client database
remain unchanged by this work.
