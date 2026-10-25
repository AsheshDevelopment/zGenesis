# MainUI interaction and offline calculated status

Verified checkpoint: 2026-10-23. Later orientation/graphics/INTRO-alpha work
retains this behavior; [PROGRESS.md](../PROGRESS.md) records the currently staged
executable. The hash below identifies this earlier interaction checkpoint.
This completes the requested dialog interaction and offline
status integration slice. The broader remake remains paused and incomplete.

## MainUI behavior

The generator captures the original declarations from
`Tantra/HTlauncher/HTInterface.cpp`, `HTEquipInventory.cpp`, `HTSystem.cpp` and
`HTCommand.cpp`, together with the native main bar and window framework.
It produces 13 panels, 537 widgets and 97 referenced textures. Original IDs,
positions, native button images, window frames, close controls and drag regions
are retained. The active source constructs its 200-series dialogs in C++;
the older `_VERSION_1003` `MainUIInfo.sys` is not a substitute for those definitions.

| Main bar button | Dialog | Shortcut |
| --- | --- | --- |
| 1 | NPC/premium panel (238) | — |
| 2 | Status (239) | L |
| 3 | Inventory (204) | I |
| 4 | Quest (235) | U |
| 5 | Skill (237) | K |
| 6 | Options (213) | O |
| 7 | Command (212) | C |

Buttons and shortcuts toggle their dialogs. Opening or clicking a window raises
it; only the top window under the pointer receives the click. Title/native drag
regions move the complete window with the original pointer offset. SDL mouse
capture is released on button-up and focus loss; lost focus cancels a pending
drag or click. Native close controls close their window. Escape closes the top
framed dialog, or opens Options when none is open. Repeated keys and Ctrl/Alt
modified shortcuts do not toggle windows. Closing Inventory hides its extra bag.

The source skill-tab geometry and selected images, scroll controls, Options
window-alpha slider and paired button images are connected. Full/compact main
bar switching preserves the native 152-pixel offset. These controls do not imply
that every underlying game action is implemented.

## Saved positions

The canonical `resource/UI/Interface.sys` supplies defaults; the client's private
`userdata/resource/UI/Interface.sys` overrides them when version and resolution
match. Normal shutdown writes the private file through a same-directory
temporary and atomic replacement. Canonical assets are never overwritten.

The native format contains a 256-byte CHTString, version 2005 and width/height.
The 95 X/Y pairs begin at byte 268 and end at byte 1028. Known window positions
are updated while unknown records and trailing data are preserved. The source
stream is closed before Windows replacement, allowing an existing save to be
overwritten on successive runs.

## Offline authority after CHAR_INIT

`OfflineCharacterChannel` now owns an `OfflineWorldStatus` session. It supplies
the existing source-backed PC initialization and effect rules with explicit
authored coefficient, level, tolerance, item and skill tables, plus the selected
zone's `Data/WorldSettings.ini` and `Data/Settings.ini`.

The channel constructs the original CHAR_INIT snapshot first. It then calculates
status, entry protection and continuous effects, persists changed native MOB
state in the owned SQLite character row, and queues the produced native frames
in order. CHAR_INIT is delivered before those queued frames. Intermediate and
final UI notifications are retained. Playing-state polling performs scheduled
effect checks, persists changes and delivers their generated notifications.
Disconnect/session ownership changes discard the queued state.

The frontend applies full/minimal character status to the main-character state
and HUD. Status dialog scalar values include level, damage, accuracy, defense,
dodge, chakra, resistances and karma; inventory gold and skill points also use
the native update. Native zone-settings, learned-skill and skill-up-effect frames
are validated and consumed; their complete corresponding game systems remain
future work.

The eight generated table/provenance files are staged under
`system/offline/character-stats` and `system/offline/gameplay-parameters`.
They derive from the supplied authored Global profile. This does not establish
equality to the deployed encrypted zone tables. Local accounts currently have
no purchased entitlements or ranked-world service. The sole offline actor receives
its own represented owner/grid/party notifications.

## Verification and limits

The staged Release x64 executable SHA-256 is
`84d59c57dd544bf4c2a1a1af6ab3f7936502ddaa3e14257136a9e2aeddcdfc12`.

- MainUI CPU probe: **100 checks**, including all seven routes, six shortcuts,
  stacking, dragging/cancellation, four skill tabs, close/Escape and save
  round-trip with unknown trailing bytes retained.
- Focused Release CTest: **4/4 passed** (`native_effect_ticking`,
  `native_main_hud_source_layout`, `native_main_ui_interaction`,
  `offline_character_persistence`). The effect fixture has 108 checks.
- Offline authority probe compares every generated post-CHAR_INIT and expiry
  frame against a separately initialized source-backed status session, checks
  persisted calculated values, owner rejection and disconnect queue cleanup.
- OGRE/D3D11 HUD probe verifies the actual GPU sprites and six shortcut dialogs.
- Normal audio-enabled SDL offline **ashesh/ashesh**, create-to-Mandara route 1:
  real main-bar/shortcut input, dialog dragging, skill tab, close/Escape,
  compact/restore and private layout save all passed. The live Status capture
  shows calculated HP **50/50**, TP **30/30**, damage **8–11** and defense **2**.
  Sixteen captures are bound to the executable in
  `build-ogre-sdl/mainui-authority-runtime/VERIFIED.json`.
- Final-client inventory: **2,384 files**, x64, imports, original layout and
  exact icon payload verified. Normal SQLite and saved-ID files remain unchanged.

Evidence logs: `build-ogre-sdl/mainui-interaction.log`, `mainui-gpu.log`,
`mainui-authority-ctest.log`, `mainui-authority-final-build.log` and
`mainui-authority-runtime/`. This slice did not rerun the full suite, Debug,
relocation, other village routes or prolonged gameplay.

Remaining work includes real item/equipment actions, chakra spending, learned
skill/quest/command content, premium/NPC actions, full Options behavior, Status
identity strings, persistent rank/guild/castle services, additional world-entry
notifications, movement, NPC simulation and combat. Periodic damaging effects,
death/revival and full effect visuals are not completed by the scheduled
healing/TP/expiry integration. The current runtime's broad remaining-gameplay
warning also covers these unfinished actions and additional status callbacks.
