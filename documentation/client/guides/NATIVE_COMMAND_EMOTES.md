# Native command emotes

Date: 2026-10-26. Client implementation goal active and incomplete.

## Implemented behavior

- [x] Execute Provoke, Greet and Rush from original command buttons and saved
  command quick slots. Their original icons and negative slot encoding remain.
- [x] Use the native action effect and PCStateAni mapping:

| Command | Native command ID | MSG_Action effect | PCStateAni row |
| --- | --- | --- | --- |
| Provoke | 10 | 8 | 833 |
| Greet / bow | 11 | 9 | 831 |
| Rush / charge gesture | 12 | 10 | 832 |

- [x] Require a living authenticated offline character and a standing/idle pose;
  reject requests while moving, sitting, changing posture or preparing skills.
- [x] Play once at authored speed with the tribe's body, hair and apron bindings,
  native motion sounds and existing sheathed-weapon handling.
- [x] Hold the motion state until the renderer reports STOP, without estimating
  an animation length in the authority or resetting the animation each tick.
- [x] Allow the native event-enabled interruptions: accepted ground/keyboard
  movement, attack, skill preparation and sitting replace the motion.
- [x] Clear motion state on death, revival and fresh world initialization.

Rush is a gesture, not a new movement dash. These offline operations do not
establish live server replication or multiplayer emote acceptance.

## Source evidence

Reference root: `C:\_GitHub\tantra-dev-main\_references\Tantra`.

- `HTlauncher/HTCommand.cpp`, `HT_vCommand_Provoke/Greet/Rush` (410-442):
  STD/IDL eligibility and action effects 8/9/10 at the current cell.
- `HTlauncher/HTMainCharacter.cpp`, `HT_vNetWork_Send_MSGAction` (3988 onward):
  starts the local one-shot animation before sending the action request.
- `HTlauncher/HTIDDef.h` (544-547): bow/charge/provoke animation rows 831-833.
- `HTlauncher/HTMainCharacter.cpp`, `HT_vMainChar_SetChangeAni` (472 onward):
  weapon sheathing for these states; animation input events remain enabled.
- `HTlauncher/HTMainCharacter.cpp`, animation STOP handling (733 onward):
  returns ordinary one-shot motions to standing; ready/cast are exceptions.

Owned code: `_remake/src/compatibility/NativeWorldHotkeys.h`,
`_remake/src/client/OfflineWorldGameplay.*`, `OfflineCharacterChannel.h` and
`_remake/src/app/tantra_remake_main.cpp`.

## Verification and remaining work

- [x] CPU world gameplay fixture: all three action mappings, no timer-based
  expiry, stable position, repeat rejection, STOP completion, movement/skill/sit
  interruption, invalid destinations, locked/dead requests and initialization.
- [x] CPU equipped-animation fixture: all three emote bindings across eight
  tribes, including real native body/hair/apron animation loading and sampling.
- [x] Existing native hotkey fixture remains passing.
- [ ] Visually/audio-accept the motions, transitions and carry sockets in one
  future authorized offline process. No game/renderer/audio device was launched.
- [ ] Complete remaining social/shop/assist/summon/event command services.
- [ ] Complete the active-skill and remaining phased client plan tasks; corrected
  FX diagnostics and usable camera/collision framing are still unaccepted.

The common five commands plus these three emotes now execute. Other valid
command bindings remain preserved but unavailable. The C++ server goal stays
separate and paused.

## Installed output

Release x64 was rebuilt and overwritten in both configured client folders.
Both static package checks pass (1,731 manifest files each); 148 original HPKs
per folder and the user's 49 private profile files retain their hashes.

Launcher SHA256: `a1cb22af1188e68e083da1105dfabfb57efdf33ed958a2f2295a6016dbaa2c82`.

[Structured evidence](../evidence/native-command-emotes-20261026.json).
Build, CPU, package and protection logs are retained in
`.migration-local/native-emotes-20261026`. No additional game was launched.
