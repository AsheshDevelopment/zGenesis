# Source-backed player hotkeys

Updated: 2026-10-25. The broader goal remains paused. This is the active player
keyboard path, excluding native developer/GM camera modes that are disabled by default.

| Key | Active source behavior |
| --- | --- |
| Hold W | Move forward, using collision and the current walk/run setting; native keyboard speed is elapsed × speed × 15 × 0.8. |
| Hold A / D | Turn left/right by the native .1-radian update step. |
| Z | Toggle walk/run. |
| X | Sit/stand; 1,100 ms debounce, authored 823/805/824 posture states and animation completion. |
| E | Select the nearest other targetable enemy; native integer cell distance below 100; blocked while blind/seated/action locked. |
| R | Attack the retained selected live target. |
| T | Select a nearby party associate when present. The current offline session has no remote party actors; it reports that condition. |
| F | Select the nearest ground item within the native 100-cell search; approach and request authoritative pickup. |
| I / L / U / K / O / C | Inventory / Status / Quest / Skills / Options / Commands. |
| G / J / H | Guild / Address book / Help. Help uses all four original tabs. |
| M | Cycle hidden → small minimap → large minimap → hidden. |
| N / B | Toggle world names / speech text visibility. |
| Tab | Toggle MainUI rendering; while editing chat, switch recipient/message focus instead. |
| Ctrl+U | Toggle interface rendering and the quest window, as the active source handler does. |
| Enter | Focus chat; while editing, submit the current input and leave edit focus. |
| V | Focus the localized whisper command addressed to the last incoming whisper sender. |
| Page Up / Page Down | Chat input history while editing. |
| Home / End / Left / Right / Backspace / Delete | Chat cursor/edit operations; gameplay shortcuts do not fire while editing. |
| Escape | Cancel chat editing, close the top dialog, or open Options if no dialog is open. Native death confirmation remains mouse-driven. |
| Main-row - / = | Previous/next quick-slot page, wrapping through five pages. |
| Keypad - / + | Continuous camera zoom at elapsed × 100; distinct from main-row page switching. |
| Left / Right arrows | Orbit the centered camera at elapsed × 2; edit cursor keys when chat has focus. |
| F12 | Switch centered orbit / character-heading-following back view. |
| Insert / middle mouse release | Reset the native camera defaults. |
| F11 | Native broadcast preset key; inert unless broadcast-camera mode is enabled. It does not unconditionally enter first person. |

The source's help messages mention S/backward movement, but the active ordinary
`Continue` handler contains W/A/D and no S branch. No extra S, Space-attack,
Shift-walk or R-resurrection binding is introduced.

## Both original quick-slot modes

- **Number actions** (default): 1–0 activate slots; F1–F5 or Shift+1–5 select pages.
  Shift+6–0 still activates those slots. F6–F10 do nothing in this mode.
- **Function actions**: F1–F10 activate slots; 1–5 select pages; 6–0 do nothing.
- The native held-F10 workaround repeats at 500 ms in function-action mode.
  Other discrete shortcuts ignore OS key-repeat; the held movement/camera path
  runs separately. The Options controls already select the quick-slot mode.
- SDL scancodes preserve main-row numbers/OEM keys under Shift; native virtual
  function keys remain distinct from lowercase ASCII.

## UI and resource implementation

The original creation bodies now supply the previously absent address, guild,
help, chat and minimap panels: **31 panels / 119 textures** in the native HUD
capture. Existing focus, dragging, close controls and saved positions are retained.
Tab hiding also hides quick-slot cooldowns, feedback, projected names and minimaps,
and hidden windows no longer consume ground clicks.

Mandara's original `Minimap_Mandara1st.dds` is read directly from
`resource/map/Mandara1st/TerrainTex.hpk`. The adapter decodes native DXT2,
uses the source 168/512 pixel views, cell/2 coordinates and six-pixel correction,
and updates the coordinate label and player marker. Full native NPC/party marker
art and all minimap overlays remain a visual parity task.

Ordinary offline chat input is visibly marked `Offline`; it does not imply
remote delivery. Guild/address window activation, T and V do not implement the
remaining multiplayer services. Last-sender reply information requires incoming
chat data. Exact native IME/text raster, speech-frame art and broadcast/developer
camera services remain separate work.

## Source paths and verification

Reference root: `C:\_GitHub\tantra-dev-main\_references\Tantra\HTlauncher`.

- `HTInterfaceCheck.cpp:1037` — discrete player bindings, death gates and both quick modes.
- `HTInterfaceCheck.cpp:1590` — held W/A/D, keypad zoom, arrow rotation and F10 workaround.
- `HTInterface.cpp:8703` — global Tab/Enter and edit focus precedence.
- `HTMainCharacter.cpp:2172`, `:2488` — forward input and native sit/stand requests.
- `HTMainCharacterMove.cpp:220`, `:410` — keyboard speed and turn steps.
- `HTCamera.cpp:131`, `:513` — F12 camera mode and back view.
- `HTQuickSlot.cpp:1026` — page wrapping.
- `HTItemSystem.cpp:3275`, `HTOtherObjectSystem.cpp:1051` — nearest-item/enemy search.
- `HTMiniMap.cpp:81`, `:164`, `:234` — panels, mode cycle and crop coordinates.
- `HTChatting.cpp:174`, `:1884`, `:3295` — native chat UI, edit history and reply command.
- `HTAddress.cpp:76`, `HTGuild.cpp:108`, `HTTutorialSystem.cpp:72` — original window declarations.

- [x] CPU hotkey/resource/SDL normalization checks: **424 checks**, both modes,
  edit/death gates, native panels, minimap DDS and camera switching.
- [x] Native UI interaction checks: **681 checks**, including existing dragging,
  focus, close, prompts and private saved-position roundtrip.
- [x] Gameplay fixture includes held movement/release, collision, posture states,
  native keyboard speed and animation-lock regression assertions.
- [ ] Visual/input/audio acceptance in an authorized offline game run.

No game, renderer or audio-device process was launched for these checks.

Release x64 rebuilt and staged to both client outputs. Both static package checks
pass for 1,709 files; all 148 HPKs per output and 44 existing userdata files
are unchanged. Launcher SHA256:
`5bf2220245eb77c1dd2e9bbfa8c435b9e7774e1caaebdb720ad509bbb74d3551`.
[Evidence](../evidence/native-hotkeys-20261025.json).
