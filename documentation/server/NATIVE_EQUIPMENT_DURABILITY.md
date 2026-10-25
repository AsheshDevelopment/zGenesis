# Native equipment wear and world damage composition

The C++ world now composes source DealDamage/PlayDice, live PC reception and
native UpdateEquipDur. HP and equipment durability changes are saved in one
character revision before source events are published. This internal authority
API does not complete skill casting, hit decisions or the timed Battle loop.

## Source behavior

`generate-native-equipment-durability.py` extracts `CMob::UpdateEquipDur` and
`get_ArmorType` from `C:\_GitHub\TantraSrc\Tantra\zone\CMob.cpp`. Generated code
pins that source and `Basedef.h` by SHA256. The item table's original byArmorType
is retained in live PC inputs; armor type comes from the actual equipped body item.

The complete source wear function preserves:

- The immediate non-PC return.
- Hardness equal to skill + passive + equipment contributions, with a minimum of 50.
- Type 1 weapon wear: subtract one, independent of HP loss, with no RNG draw.
- Type 2 offhand wear: subtract actual loss divided by hardness, with no RNG draw.
- Ordinary receiver armor wear: draw `rand() % 100` even for zero HP loss, choose
  one slot, and subtract actual loss divided by hardness from an equipped item.
- The different source sentinel checks: weapon/offhand use equality with 25500;
  random armor skips durability at least 25500.
- Recompute equipment points only after the narrowed durability becomes negative,
  then clamp it to zero. Reaching exactly zero does not enter that branch.
- Send source MSG_ITEM information after any resulting native status events.

| Dice interval | Selected slot | Probability |
| --- | --- | --- |
| 0-19 | Armor | 20% |
| 20-34 | Shield | 15% |
| 35-54 | Helmet | 20% |
| 55-64 | Gloves | 10% |
| 65-74 | Belt | 10% |
| 75-89 | Pants | 15% |
| 90-99 | Boots | 10% |

The original MSG_ITEM declaration is compared between the native client and zone
headers and compiled with explicit layout checks: 36 bytes, 12-byte header,
24-byte payload and a 16-byte item at offset 20. The frame is type 0xB100,
Info subtype 1, equipment place 2, with the selected slot and full original item.

## Explicit bounded adaptations

The source leaves the packet's slot/item fields uninitialized when its random
choice is an empty slot. The owned implementation retains the selection draw and
returns without that undefined notification. Packet padding/unused header fields
are zero-initialized. No arbitrary empty-slot item is sent.

Hardness addition and pre-narrowing subtraction reject overflowing signed-int
arithmetic. Signed-short assignment explicitly reproduces native MSVC low-16-bit
narrowing before the source negative test; it is not replaced by an earlier
saturating subtraction. Original source/assets remain unchanged.

## Authoritative composition

`World::deal_damage` routes owned NPC targets to the existing NPC pipeline and
owned PC targets through one transaction:

1. Use actual retained caster and defender facts, original dice/channel order,
   percentage/armor scaling and native level-gap clamping.
2. Run the native receive prefix and compiled HP/time/party/dead-state tail in
   tentative owner state. Buffer Sleep/ManaShield and other source notifications.
3. Compute actual before/after HP loss, then call target equipment wear with that
   loss, including zero-loss receives. The native caster-weapon wear call is
   commented out in DealDamage and stays disabled here.
4. Keep dice, effect operations and armor selection on the same world RNG stream;
   retain the NPC caster's resulting native AI/RNG state.
5. Commit the final HP/equipment snapshot once with the expected SQLite revision,
   then publish ordered native events and updated actor/status ownership.

Nonpositive rolled sums skip both receive and wear, preserving any preceding
dice draws. The raw `damage_player` receive API remains available separately;
receive alone does not invent DealDamage's later equipment-wear call.

A failed combined save removes the tentative player's connection and publishes
none of its pending events. Its previous durable HP/equipment/revision remain
intact. A later delivery failure is distinct from a failed database commit.

## Verification and remaining work

CPU checks cover all 14 probability boundaries, hardness effects, weapon/offhand
and sentinel behavior, exact-zero/broken gear, empty-slot handling, armor lookup
and native packet fields. Controlled slot records isolate selection; separate
inventory tests cover normal equip eligibility.

Isolated SQLite/world checks cover PC-to-PC damage and body wear in one revision,
native zero-percentage dice, actual NPC-to-PC rolls, shared dice-before-wear order,
published durability, reopened roster data and failure at the single combined save.
The fixture's level-50 character allocates Heart explicitly because native HP
depends on Heart, rather than directly on character level.

Current source/build/test/package evidence:
[native-equipment-durability.json](evidence/native-equipment-durability.json).
No worker, channel or client is launched by these checks. The approved-retry gate
for the earlier TCP probe remains open; game/combat readiness stays false.

Full CastSkill/UseSkill, target/hostility/range/hit/critical rules, costs/cooldowns,
native cast/hit packets, SpiritLink/shared-party routing and the timed Battle
caller remain unfinished. OnKilled, rewards/loot/XP, native death UI/penalties,
resurrection and respawn remain separate lifecycle gates. Exposing this owner-only
damage API does not enable arbitrary client-provided damage requests.

Owned paths: `src/zone/world.cpp`, `npc_damage.cpp`, `damage_roll.cpp`,
`src/rules/compatibility/HtPcStatProjection.*`,
`src/rules/resources/NativeGameplayParameters.cpp`,
`tools/rules/generate-native-equipment-durability.py`, and
`tests/player_damage_tests.cpp`, all under `C:\_GitHub\TantraSrc\_server_cpp`.
