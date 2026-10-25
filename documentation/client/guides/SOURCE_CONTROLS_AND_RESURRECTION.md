# Original controls and Mandara resurrection

Source audit updated: 2026-10-25. Implementation belongs to `_remake`; original `Tantra`
and `TantraClient` are read-only references.

| Input | Original behavior represented by the client |
|---|---|
| Left-click ground | Move using the current walk/run setting; default is run |
| Z | Toggle walk/run; `HTMainCharacter::HT_vMainChar_SetMoveType` |
| Click a new hostile actor | Select the target; first-click state returns before attacking |
| Click the selected hostile actor again | Advance the native click state and start attacking |
| R | Request an attack against the retained selected target |
| E | Select another nearest hostile target |
| Right drag in the world | Camera rotation; horizontal delta × .003, vertical delta × .0024 |
| Wheel | Zoom by elapsed time × 200 in the wheel direction |
| Middle release / Insert | Native camera reset: distance 100, angle 5.3, heading PI |
| I / L / U / K / O / C | Inventory / Status / Quest / Skill / Options / Command |
| Inventory left-button move | Transfer to the selected inventory/equipment slot |
| Inventory right-click | Original item-use callback; consumable/item services remain incomplete |

Temporary Shift-walk, Space-attack, R-revive and double-click auto-equipment
bindings have been removed. Native attack safety-cell checks are applied.
The complete active hotkey mapping and its verification/remaining service gates
are recorded in [Source-backed player hotkeys](SOURCE_HOTKEYS.md).

## Death UI and ordinary resurrection

`HTGameSystem::HT_vGameSystem_NetWorkDeath` sets HP to zero, starts the DIE
animation, clears client interaction state, and calls `OpenDeathWindow`.
Ordinary Mandara uses `_DIALOG_DEATHMSG` (223), the original
`eMsgCharacterRebirth` text from `system/HTMessage.txl`, and message-box mode 4.
The generated UI is the source 329×125 centered Message window, 291×59 text
region at (19,28), with Confirm at (218,92). Original texture registrations
159/160/161 and native window borders supply its appearance.

Mode 4 is `UI_MESSAGEBOX_CONFIRM_ENTER_NO`: Confirm is a mouse operation.
Enter, Escape, Space and R do not resurrect. The dialog consumes world clicks.
The close control dismisses it without performing resurrection, as the native
message-box callback does. Dead keyboard dispatch permits I (and M in the
original; the remake's minimap remains incomplete), while other world keys are
blocked. Camera mouse handling remains separate.

Clicking Confirm dispatches `HT_vGameSystem_CSP_INIT_REGEN_CHAR(0x01)` in the
original. The offline authority applies the corresponding ordinary operation,
validates the owned dead character, updates the native MOB, and persists it
before the client presents the result. The death dialog closes on the accepted
result; the actor and camera return to the resolved native floor.

`zone/CMob2.cpp::Regen` and `Resurrect` distinguish these cases:

- Saved zone equals the current zone: saved X/Z and 20% maximum HP/TP.
- No saved zone: Mandara generation area and 50% maximum HP/TP.
- Current and saved zones are different Mandara aliases (1/18/19): ordinary
  regeneration uses the town generation area and 50% maximum HP/TP.
- A different non-Mandara saved zone needs the original zone handoff. That
  service is incomplete; the authority does not substitute a local town revive.

Recovery uses the existing `htPercent` adapter of `Basedef.cpp::Percent`, including
round-half-away-from-zero behavior (for example, 20% of 53 is 11).

The two-option `_DIALOG_REVIVEWND` is **not** the ordinary death confirmation.
`HTItemControl.cpp` opens it for an appropriate resurrection item; its choices
send `MSG_ITEM_USE` with PRESENT or SAVE. Healer/Samudaba confirmation is another
separate skill exchange. Those services, fortress/castle choices, full death
penalties and resurrection effects remain incomplete and have no invented key
substitutes. Dead-character login recovery remains its separate native entry path.

## Exact references

- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTInterfaceCheck.cpp`: keyboard dispatch,
  dead-character restrictions, Pick_OtherChar and Pick_Map.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTMainCharacter.cpp`: SetAttackStatus,
  SetMoveType, default run state and death motion.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTCamera.cpp`, `HTWindowManager.cpp`:
  rotation, wheel and reset calculations.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTEquipInventory.cpp`, `HTItemControl.cpp`:
  slot movement, right-click item use and resurrection-item dialog.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTGameSystem.cpp`: OpenDeathWindow,
  InputCheckForDeathMsg, InputCheckRevive and regeneration response.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTInterface.cpp`, `HTInterface.h`,
  `HTUIIDDef.h`, `HTMessageDef.h`: native message-box geometry, mode and IDs.
- `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`, `CMob2.cpp`, `Basedef.h`:
  CSP_REQ_INIT_REGEN_CHAR, saved-zone recovery, free-cell placement and safety bit.
- `C:\_GitHub\TantraSrc\TantraClient\system\HTMessage.txl`,
  `ClientRes.txl`, `resource\UI\Interface.sys`, and the MainUI texture packs.

## Bounded verification

`tools/verify-native-controls.py` runs one isolated offline channel-1 process
using ashesh/ashesh. Its owned QA profile starts with one HP near an original
monster, retaining a real Mandara saved checkpoint. E selects, R attacks,
actual monster damage causes death, forbidden keys leave the original dialog
open, and a real SDL mouse click requests resurrection. The same process then
checks Z walking, MainUI interactions and item/equipment dragging. It has no
retry loop and does not touch normal saves. Other routes are not exercised.
`verify-intro-characters.py` now also defaults to one create scenario.

Runtime evidence is recorded only after that single process succeeds.
The completed runtime has 17 captures. Its harness encountered a SQLite cleanup
error after client success; connection closing was fixed and the evidence was
recovered without relaunching. A subsequent build reuses native percentage
rounding; that final executable was staged and inventory-verified without another
game run. Exact runtime/final hashes and these boundaries are in
[the verification record](../evidence/native-controls-verification.json).
