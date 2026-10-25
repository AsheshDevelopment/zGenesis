# Native command window and quick slots

Date: 2026-10-26. Client goal active; full command/skill acceptance remains open.

## Implemented

- [x] Preserve the original five-page, ten-slot, 400-byte QuickSlot profile.
- [x] Load/save all 19 assigned native command IDs (1-20, excluding unused 13).
  Commands store the original bitmap ID and `command ID - 100`, not a skill or
  inventory slot. Old skill/item bindings retain their existing encoding.
- [x] Drag an authored command icon from C's command window into either quick bar;
  display its original MainUI bitmap and move/clear it through existing controls.
- [x] Route the adjacent command buttons, bound quick slots and native keyboard
  inputs through the same sit, walk/run, attack, target and pickup handlers.
- [x] Preserve authority, death, animation, blindness, selection and pickup-route
  checks. Pickup also respects the source's prohibition while attacking.
- [x] Keep icon releases as drag input; use the labelled command buttons to execute.
- [x] Reject malformed command values without applying a partial saved page.

## Native references

All source paths below are relative to `C:\_GitHub\tantra-dev-main`.

| Reference | Behavior |
| --- | --- |
| `_references/Tantra/HTlauncher/HTControlDef.h:1276` | Assigned command IDs; ID 13 is unused |
| `_references/Tantra/HTlauncher/HTCommand.cpp:43` | Original command window, labels, icon IDs and positions |
| `_references/Tantra/HTlauncher/HTCommand.cpp:245` | Labelled-button dispatch versus draggable icon input |
| `_references/Tantra/HTlauncher/HTCommand.cpp:320` | Sit/walk/attack/target/pickup behavior and guards |
| `_references/Tantra/HTlauncher/HTCommand.cpp:525` | Quick-slot command dispatch |
| `_references/Tantra/HTlauncher/HTQuickSlot.cpp:261` | Binary profile save/load |
| `_references/Tantra/HTlauncher/HTQuickSlot.cpp:628` | Bitmap plus negative command encoding |
| `_references/Tantra/HTlauncher/HTQuickSlot.cpp:727` | Command/skill/item execution split |

Owned changes: `_remake/src/client/NativeQuickSlots.h`,
`_remake/src/compatibility/NativeWorldHotkeys.h`,
`_remake/src/rendering/HtRenderFacade/MainHudPresentation.*` and
`_remake/src/app/tantra_remake_main.cpp`.

## Verification and remaining work

Focused CPU checks cover native skill/item profile regression, every assigned
command's binary round trip, command move/clear, malformed-file rejection, native
command artwork/buttons, hotkeys, UI interaction and skill cooldown feedback.
These checks initialize no game window, renderer or audio device.

- [ ] Accept command dragging/button use and restored commands in an authorized
  offline process. No additional client process was launched for this change.
- [ ] Connect remaining social, shop, assist, summon-direction and event commands to
  their complete original presentation/authority services. Their valid saved
  bindings are preserved, but execution explicitly reports unavailable.
- [ ] Finish the remaining active-skill, item, tooltip and multiplayer plan tasks.
- [ ] Accept the previously corrected FX diagnostics and usable camera framing.

This is implementation progress within P04-T06, not completion of that phase.
The server goal remains separate and paused.

## Installed checkpoint

Release x64 rebuilt and overwritten in both configured client folders. Each
static package check passes (1,731 owned files); all 148 HPKs per output and the
user's 49 private files retain their before/after hashes.

Launcher SHA256: `a702f7ad400d3d9cb62900fe19389cd8e9597e20dc76968e50378b98721e2fdd`.

[Structured evidence](../evidence/native-command-quickslots-20261026.json).
Build, test, stage and package logs are retained under
`.migration-local/command-quickslots-20261026` (the initial four-test output is
`.migration-local/command-quickslots-cpu.log`). No game, renderer or audio device
was launched in this checkpoint.

Provoke/Greet/Rush are implemented in the later [native emote checkpoint](NATIVE_COMMAND_EMOTES.md).
