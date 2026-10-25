# Native login resources and text presentation

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
This documents the verified message/resource and static label prerequisite.
The remake reads the supplied native messages and locale header and renders the
login background plus five source labels in OGRE. SDL3 remains the window and
event provider. Subsequent [native login control work](NATIVE_LOGIN_CONTROLS.md)
adds edits, focus, buttons, saved IDs and deferred Cancel. Authentication remains
unfinished; neither component establishes the full client or pixel parity.

## Native contract

References below are relative to `C:\_GitHub\TantraSrc\Tantra\HTlauncher`.

- `HTMessageMgr.h:13-31,60-66` and `HTMessageMgr.cpp:35-69,238-254,372-385`:
  four consecutive tables, each a signed 32-bit count followed by records with
  a 32-bit ID, 500 XOR-FF message bytes and three signed 16-bit parameters.
  The serialized record stride is 510 bytes. Tables are Common, Character,
  Item and QuestMessage. First duplicate ID wins. Lookup routes 1..1000,
  1001..2000, 2001..10000 and 50001..60000 respectively. ID 0 can exist in a
  table but is not exposed by normal message lookup.
- `HTLauncher.cpp:56-71`, `Basedef.cpp:1735-1824`,
  `HTControlDef.h:517-523`: country metadata comes from `serverlist.txt` when
  present, otherwise the first 64 bytes of `serverlist.bin`, decoded by
  subtracting the reversed 64-byte source salt. This adapter reads only the
  header and never rewrites either file or uses the endpoints.
- `HTEngineHandler.cpp:3742-3823`: Philippines selects Arial height 14.
  Korea, China, Japan, Taiwan and fallback retain their authored face/height
  profiles. Full non-English text and IME parity are not established here.
- `HTIntroManager.cpp:404-434`: logical window is 304x208, positioned at
  `(screenWidth/2 - 150, screenHeight - 400)`. The background is 512x256 and
  extends beyond that logical hit region. Do not enlarge the hit region to
  the texture dimensions. Screen-width division is integer division.
- `HTInterface.cpp:9746-9766`: use the **intro** local texture registration,
  not the similarly numbered world UI registration.

| Element | Native IDs | Position within login | Draw size |
| --- | --- | --- | --- |
| Background | local 34 -> IntroUI 27054 | 0,0 | 512x256 |
| Cancel button | control 1; local 25/26/27 -> 27045/27046/27047 | 190,175 | 64x32 |
| OK button | control 2; same three textures; Enter enabled | 55,175 | 64x32 |
| ID edit | control 3, transparent body | 135,65 | 140x19 |
| Password edit | control 4, masked mode 1 | 135,100 | 140x19 |
| Saved-ID toggle | button 5, transparent body | 133,130 | 22x22 |
| Check overlay | texture control 6 -> 27062; initially hidden | 133,130 | source texture 32x32 |
| Edit caret | local 199 -> 27022 | edit-derived | registered 7x16; source texture 32x32 |

| Label control | Message ID | Supplied text | Local x,y,width,height | Alpha |
| --- | --- | --- | --- | --- |
| 1 | 412 | Cancel | 185,176,70,23 | 0.9 |
| 2 | 411 | OK | 50,176,70,23 | 0.9 |
| 3 | 450 | ID | 43,65,70,19 | 1.0 |
| 4 | 451 | Password | 43,99,70,19 | 1.0 |
| 0 | 483 | ID Stored | 43,133,70,19 | 1.0 |

`UILabelControl::SetTextArrangement` uses `(width - measuredTextWidth)/2`
and `(height - 13)/2`, both integer divisions. Font mode 0 draws opaque black
at offsets (1,0) and (0,1), then the foreground at (0,0), using a 15-pixel
line box. The supplied white `TextShadowColor` is not used by that branch.
The GDI adapter retains these layout and pass rules, uploads unassociated RGBA
to OGRE and draws without depth checking/writing. It uses the selected face
and reports the actual resolved face in runtime diagnostics. This is not proof
of the original font engine's glyph rasterization, metrics or pixel parity.

## Implemented sequence

1. Read the native locale metadata, complete ClientRes catalog and complete
   message catalog; bind all six selected source UI assets and five messages.
2. Preserve BGM-before-logo behavior. Create the login background and label
   textures hidden while constructing the intro UI, before the logo frame.
3. Verify their hidden state and GPU geometry, then present the logo frame.
4. Preserve the existing map/gate/fire setup and INIT-to-LOGIN camera motion.
5. Reveal the background and labels only when camera motion has completed;
   verify actual vertex positions, texture names/sizes, depth and visibility.

`HT_vUpdate_ShowWindow` at 1179-1224 has its elapsed-delay test **commented
out**. The active test is `g_bCameraMove == false`. The nominal 1000ms passed
when queuing login must not become an additional timer in the remake.

## Source behavior completed by the subsequent control component

- Native BMP conversion now follows the traced mode-2 color key FF0000F0.
  The five original button/check/caret BMPs are resident before BGM, share
  one-mip GPU textures and are submitted with verified source geometry.
- Edit creation uses +5 horizontal text padding and arrangement 4. Password
  masking counts legacy bytes, not Unicode code points. `HTImeMgr::OnChar`
  appends up to its 512-byte buffer and removes the final legacy character on
  Backspace. Native edit cursor movement is disabled; a generic modern edit
  widget would change behavior. The append/backspace model is implemented;
  full IME/composition remains open.
- Show login: saved ID retains ID, clears password and focuses control 4;
  otherwise clear both fields and focus control 3. Tab cycles 3 -> 4 -> 3;
  Escape clears edit focus; Enter dispatches button 2. The application's
  global Escape-to-close behavior has been removed for the native intro.
- Button hit tests include both endpoints. `OnLButtonUp` dispatches on an
  enabled button's hit region without requiring a previous down state. Mouse
  move/down/up states must follow `HTInterface.cpp:2380-2590,3081-3120`.
- Native OK: play sound 33523, copy edits, request login, then save ID if enabled.
  Cancel: play 33523, clear manager credentials and queue the next intro update
  to clean up and exit. The earlier confirmation-dialog assumption was incorrect.
  The saved-ID toggle
  changes the check overlay then writes/deletes `system/SaveID.bin`.
- Native saved-ID format is 53 bytes (active 52-byte account definition),
  XOR-FF until ID length, zero padding. Preserve the format with safe bounds;
  do not reproduce the native overflow for an oversized ID. Remake writes must
  stay in its own user-data directory, outside canonical inputs.
- Native login transport, successful-login delay and later
  server/character/world events remain unfinished. Never fabricate success
  or connect to deployed endpoints merely because the locale header was read.

## Validation

2026-10-22: both x64 configurations pass 60/60 CTest checks and their refreshed
packages pass provenance and runtime smoke verification. New probes check the
complete supplied message file (306/597/580/581 records), signed parameters,
duplicate routing, truncation/count/trailing/text errors, locale precedence,
source asset/message binding and actual label raster coverage/shadow pixels.
The package has 94 provenance rows, including five newly extracted UI BMPs.

Runtime smoke verifies the five catalog labels and this ordered trace:
`INTRO_LOGIN_RESOURCES_BOUND -> INTRO_LOGIN_HIDDEN_VERIFIED ->
INTRO_LOGO_PRESENTED -> INTRO_LOGIN_PRESENTATION_VERIFIED -> INTRO_LOGIN_SHOWN`.
The renderer reads back the actual four vertex positions for each sprite.
The capture `build-ogre-sdl/native-login-capture.png` shows the five labels
over the original login background. It does not establish interaction or parity.

Build/test/package/runtime logs use `build-ogre-sdl/native-login-{release,debug}-*`.
An initial capture attempt used only 100 frames with the existing gate verifier,
which requires its 240-frame animation/FX exercise; it failed that gate check.
The corrected 240-frame capture passed. No canonical input was written, and
no commit or push was performed. The complete implementation plan stays active.
