# Native skill tooltip formatting

Date: 2026-10-26. Client goal remains active and incomplete.

## Implemented

- [x] Read learning prerequisites, required weapon/item, consumed item/count,
  target class and all five effect records directly from TantraParam.tpa.
  Offsets come from the original 200-byte HTPCSkillParam declaration.
- [x] Show the original name/Lvl title, description sentinel, localized passive
  label, next-level learning conditions and prerequisite skill names/levels.
- [x] Use original requirement colors for character level, learned prerequisites,
  equipped weapon type and required inventory/off-hand item.
- [x] Format current effects and next-level comparisons, per-effect durations,
  targets and HP/TP/item costs through the shipped HTMessage.txl messages.
- [x] Compile the native effect/message switch and its integer/Chakra expressions
  through a project-owned adapter, rather than maintaining a shortened effect map.
- [x] Use calculated Mind/Nerve and maximum HP/TP after CHAR_INIT; invalidate the
  hover cache when those values, skills, inventory or hand equipment change.
- [x] Preserve original unlearned behavior: show learning conditions without
  inventing current-level effects/costs. Maximum-level skills have no next record.
- [x] Preserve original tooltip section order and separators. Expand the bitmap
  capacity and bound wrapping to the current viewport rather than 35 fixed rows.

The old generic English casting/cooldown/range rows were removed from this
hover view because the enabled native skill-info function does not add them.
The existing cooldown overlay remains a separate source-backed UI mechanism.

## Original references and owned files

All paths below are relative to `C:\_GitHub\tantra-dev-main`.

| Original reference | Purpose |
| --- | --- |
| `_references/Tantra/HTlauncher/HTClientParamMgr.h` | Packed client TPA declarations and five effect lanes |
| `_references/Tantra/HTlauncher/HTSkillSystem.cpp:576` | Current/next requirements, effects, durations and costs |
| `_references/Tantra/HTlauncher/HTSkillSystem.cpp:1406` | Deva/Garuda damage display calculation |
| `_references/Tantra/HTlauncher/HTSkillSystem.cpp:1481` | Complete enabled native effect text dispatch |
| `_references/Tantra/HTlauncher/HTSkillSystem.cpp:2389` | Message parameter expansion |
| `_references/Tantra/HTlauncher/HTObjectInfo.cpp:422` | Tooltip section order, separators and next-level block |
| `_references/Tantra/HTlauncher/HTControlDef.h` | Weapon masks, duration divisor and description sentinel |
| `_references/Tantra/HTlauncher/HTMessageDef.h` | Original localized message identities |
| `_references/Tantra/HTlauncher/HTextern.cpp` | Requirement/name/attribute palette |
| `_client/system/TantraParam.tpa` | Runtime parameter values |
| `_client/system/HTMessage.txl`, `_client/resource/fx/fxPC.txl` | Localized text, native skill names/descriptions |

Owned source: `_remake/tools/generate-native-skill-tooltip.py`,
`generate-native-client-skill.py`, `_remake/src/resources/NativeSkillTooltip.*`,
`NativeClientSkillResources.*` and `MainHudPresentation.*` / `MainHudTooltips.cpp`.
Generated source records its original file hashes and rejects new external
engine dependencies or unreviewed preprocessor branches.

Translated resource strings are never executed as printf format programs.
Malformed heal/recover-TP function-2 records with a zero divisor return no effect
line. The original message handlers for parameters 535/536 read an unassigned
member; the adapter supplies the current effect's function deterministically.
The native damage-display function's disabled weapon-damage terms stay disabled.
These are defined safety corrections, not changes to authoritative combat math.

## Verification and remaining acceptance

- [x] Check 1,303 skill-level profiles and 1,703 formatted effect rows using the
  supplied tables; no unresolved integer/string placeholders remain.
- [x] Check unlearned state, prerequisite red/yellow transitions, Chakra-scaled
  damage, max-HP/max-TP expressions, malformed divisors and unknown-effect handling.
- [x] Verify existing client skill sequences, authored markers and 984 visual
  profiles in the same CPU fixture. Maximum logical tooltip size is 32 rows.
- [ ] Visually accept wrapping, viewport edges, hover invalidation and localized
  current/next sections in one future authorized offline process.
- [ ] Resolve remaining original FX/icon resource gaps and incomplete skill,
  item, authority and later phased-plan paths.
- [ ] Accept corrected FX diagnostics and usable camera/collision framing.

No game, renderer or audio device was launched for this checkpoint. Unknown or
natively undisplayed effect types do not receive invented descriptions. The
C++ server goal remains separate and paused.

## Installed output

Release x64 rebuilt and overwritten in both configured client folders. Both
static package checks pass (1,731 files each); all 148 original HPKs per output
and the user's 49 private profile files retain their hashes.

Launcher SHA256: `dba90d427a0bc2c7dfc5a3af6ded4eecc4a5fe469291c35dc057295dc77bea6f`.

[Structured evidence](../evidence/native-skill-tooltips-20261026.json).
Build, CPU, stage, package and protection evidence is retained under
`.migration-local/native-skill-tooltips-20261026`. The focused client-skill
fixture passes 19,501 assertions; skill authority and item/world presentation
regressions also pass. No additional client process was launched.
