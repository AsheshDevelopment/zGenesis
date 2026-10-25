# Native unit and area skill impact authority

Updated: 2026-10-25. Continuation of P07-T03; the full task remains open.
The offline authority now executes final native unit/area damage requests.
The later [direct action sequence](NATIVE_ACTION_SKILL_SEQUENCE.md) connects
quickslot preparation, ground selection and authored animation hit points for
direct unit/area casts. Follow/projectile and full rendered acceptance stay open.
Existing quickslot self buffs retain their separate native timing path.

## Implemented sequence

`OfflineCharacterChannel::send` accepts a final `0x3240` unit or `0x3250` area
request with `snRes == 0` after authenticated CHAR_INIT/gameplay initialization.
This is the original final-hit stage, distinct from the `snRes == -1` preparation
broadcast. It does not invent a ready-time timer for attack skills.

1. Check session ownership, caster, current status, learned skill, native weapon,
   posture, zone/cell restrictions, cooldown and resources. Expire effects before
   validating impact recipients and costs.
2. Resolve target IDs against live world actors. Ignore supplied damage, HP,
   skill level and caster vitals. Check the native clan relation tables, reject
   duplicate recipients and sanitize all unused slots.
3. Use the original rounded cell distance, body radii, range variations and PC
   distance correction. Unit paths run the compiled native `IsPathCleared`
   against TCM first-floor heights/properties. Area casts validate their centre;
   non-follow area recipients are filtered by the source AOE distance rule.
4. Debit native HP/TP costs once. Calculate `CalDamage` and optional
   `CastInstant1`, then resolve each target with native success/deck/defense,
   armor/resistance and HP arithmetic. Area splash secondary targets use the
   original 50 percent damage. First-slot successful hits reach main-hand wear.
5. Carry authoritative results/cooldown in the native frame and persist the
   resulting player state. Kills reach the existing offline solo reward/drop
   path; that path is not complete native reward ownership or party AI.

An ordinary unit cast outside range still pays its costs and reports a dodge,
as the selected source does. Native Zone10 instead rejects that path. A unit
path blocked by native terrain, an out-of-range area centre, unsupported phases
or an invalid target list fail before charging the skill. An area result retains
all sixteen slots/456 bytes when filtering leaves a single recipient; native
`BroadcastCastSkill` receives the original area count, not a compacted count.

The original parameter loader adds two to positive range and AOE values. For
example, 3307's authored range 15 loads as 17, then receives the PC correction of
6 for an impact range of 23. Skill 3324's authored area 4 loads as 6; its area
recipient tolerance includes the native correction. These are separate from the
renderer coordinate conversion and from movement collision.

The generated source now also supplies action-speed reductions and range
variations. Self-buff validation shares those common rules. Cooldown uses native
`now - dwFireHitGapTime + iActivateTime` and the original cooldown correction.
This does not establish projectile timing or the full source anti-speed history.

## Source references

All paths below are read-only original references under
`C:\_GitHub\tantra-dev-main\_references\Tantra`:

| Original file | Rules used |
| --- | --- |
| `zone\CMob2.cpp` | `CastSkill`, `CalDamage`, `CastInstant1`, `BroadcastCastSkill`, costs, action speed, range, target filtering, success, splash and cooldown order |
| `zone\GetFunc.cpp` | Rounded `CalDistance(HS2D_COORD&, ...)` and TCM `IsPathCleared` sample/height rules |
| `zone\Basedef.cpp` | Native enemy clan tables; `BASE_InitializeAttribute` uses `status[0].wHeight` / `wState` |
| `zone\CMOB.CPP` | Native PC body radius and monster `byteSize / 2`, status and durability producers |
| `zone\server.cpp` | Native settings used by height/character obstruction checks |
| `zone\Basedef.h`, `HTlauncher\Basedef.h` | Native skill wire records, target count, result/cell/type constants |
| `HTlauncher\HTMainCharacter.cpp` | `HT_vMainChar_RealAttackControl`, `HT_vMainChar_AttackAnmAttackPoint` and separate self-state path; remaining presentation integration reference |
| `HTlauncher\HTAttackManager.cpp` | Impact submission and projectile fire/hit gap; remaining presentation integration reference |
| `zone\HTParamMgr.cpp` | Skill field accessors, authored ready/casting/apply fields |

Authored tables come from `B:\__TANTRA\TantraDataScripts`, imported into
`C:\_GitHub\tantra-dev-main\_remake\derived-assets\gameplay-parameters`.
The selected atomic terrain/population dataset is `E:\Global-server\Zone01`.
No original source, table, TCM or HPK is modified by the fixture.

## CPU acceptance and remaining work

- [x] Compile the original geometry, range, action-speed, damage and wear rules.
- [x] Pass 97 new assertions. The fixture loads Mandara, learns the original Deva
  prerequisite chains, checks 3307 unit and 3324 single/two-recipient area hits,
  source range/height/attack-through rules, filtering, rejected forged fields,
  costs/cooldown, out-of-range misses, rewards/drop creation and SQLite state.
- [x] Use one isolated CPU profile on offline group 1/Zone01 as ashesh / ashesh.
  The saved level-80 fixture has 100 native Mental; it is not a normal-profile
  creation, progression benchmark or rendered game launch.
- [x] Pass the existing 115-case self-skill/SQLite authority check, 33-case combat
  rule check and CPU Mandara gameplay check within their recorded scopes.
- [ ] Submit targeted quickslot attacks from the original animation hit point,
  with source ready/casting/apply states, ground-area selection and cancellation.
- [ ] Integrate native follow/projectile travel, motions, TFX, sound and cooldown
  overlays. A follow descriptor/final packet is not a working projectile.
- [ ] Complete unit splash, piercing, multiple strikes, dual weapons, item/arrow
  costs, remaining instant/affection phases, linked/periodic effects and PvP.
- [ ] Port remaining cast history, native error/result mapping, AI callbacks,
  attacker ownership/party services and notification ordering in full.
- [ ] Accept the rendered path and performance in an explicitly authorized game
  run. No extra game process has followed the prior failed warehouse attempt.

Duplicate recipients are rejected as a defined input error. The original
anti-duplicate branch can access a slot beyond the sixteen-element array; the
adapter does not reproduce that undefined access. All ordinary accepted skill
arithmetic still comes from the selected source producers.

Build/hash, preservation and CPU-profile evidence are recorded in
[the checkpoint](../evidence/native-skill-impact-20261025.json).
All continuation changes remain local and uncommitted after the earlier push.
