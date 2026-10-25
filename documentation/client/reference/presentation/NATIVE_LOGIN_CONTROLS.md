# Native login controls on SDL3 and OGRE

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The normal intro now has working login edits, masked password text, focus,
buttons, saved-ID persistence and deferred Cancel. Original control/message/
texture IDs and the implemented source event order are retained. Authentication
is still an unfinished boundary: OK captures credentials and emits
`INTRO_LOGIN_REQUEST_PENDING`; it retains Intro without claiming successful
authentication or contacting deployed services. This does not complete the
full remake or all UI/IME/pixel parity.

## Native evidence

Source references are under `C:\_GitHub\TantraSrc\Tantra\HTlauncher`.

| Contract | Source |
| --- | --- |
| Intro UI resource load precedes sound load/BGM; logical UI construction follows | HTLoading.cpp:45-60; HTIntroManager.cpp:203-206,390-434 |
| Login control IDs, positions, label messages, password mode and Enter button | HTIntroManager.cpp:404-434 |
| Body size 304x208; inclusive hit regions; button over/down/normal states | HTInterface.cpp:136-200,1025-1047,2380-2590,3081-3120 |
| Mouse-up dispatch needs only a button hit, not a previous down state | HTInterface.cpp:2546-2577,8652-8658 |
| Outside-body down clears edit/window focus; edit click focuses at end | HTInterface.cpp:2458-2492,8614-8648 |
| Tab cycles 3/4 forward, Escape clears edit focus, Enter dispatches button 2 even without edit focus | HTInterface.cpp:2816-2886,2944-2956 |
| Edit text padding +5, width 135, end-caret scroll limit 119, password stars per legacy byte | HTInterface.cpp:1106-1133,1294-1452 |
| Cursor 7x16 from the full 32x32 source image; 500/1000ms inclusive blink comparisons | HTInterface.cpp:1110-1120,1220-1234; intro texture registration |
| IME committed input appends and Backspace removes the final legacy character; arrow/delete editing is disabled | HTImeMgr.cpp:163-238; HTInterface.cpp:2890-2936,1492 |
| Toggle changes check state, then writes/deletes saved ID; OK plays click, captures credentials, requests login, then saves if enabled | HTIntroManager.cpp:1278-1329 |
| Saved ID uses 52 account bytes plus one, XOR-FF encoded text then zero padding | HTIntroManager.cpp:1677-1730; Basedef.h active account-length definition |
| Load saved ID after logo hiding and before map-object/gate creation; focus password if stored, otherwise ID | HTIntroManager.cpp:728-733,1196-1209 |
| Cancel plays click, clears manager credentials, sets exit flag; next update cleans up and returns 990; launcher deletes intro manager and exits outer loop | HTIntroManager.cpp:1283-1292,940-945; HTLauncher.cpp:153-157 |

The earlier presentation report's **exit-confirmation assumption was incorrect**.
This selected path has no confirmation dialog. Cancel queues the native
next-update exit boundary; the event callback does not directly destroy OGRE
or the SDL window. SDL window destruction follows renderer/audio/session cleanup.
Escape no longer globally closes the native intro.

`tools/inspect-native-ui.py` verifies a hash-pinned executable/DLL call chain
without executing them. Output is `docs/evidence/native-ui.txt`:

- HTLauncher requests UI sprite type 6; HT3DHeaven constructs its UI resource.
- UI texture loading supplies mode 2 and forwards it to HTDirect3D.
- Memory mode 2 at `HTDirect3D.dll` RVA `0xA347` supplies color key
  `0xFF0000F0`, one mip level and filter-4 requests. The file mode-2 branch
  supplies the same key and mip count.
- `HTSound.dll` RVA `0x1139` forwards a finite 2D sample play count and equal
  left/right volume to the supplied sample-pool handle, then starts it.

The selected BMP adapter supports their actual 24-bit BI_RGB layout, row padding
and either signed-height orientation. It changes only RGB `(0,0,240)` to
transparent black. Nearby blues and all other pixels remain opaque. Microsoft
also describes D3DX ColorKey as a transparent-black replacement in its
[D3DX texture documentation](https://learn.microsoft.com/en-us/windows/win32/direct3d9/d3dxcreatetexturefromfileinmemoryex).
That API description corroborates the key interpretation; it does not prove
the old D3DX8 raster/conversion/filter implementation is identical.

## Implementation

`HtLoginControls` owns source-level focus, edit strings, button states, captured
credentials and side-effect order. `SdlLoginInput` adapts SDL3 text/key/mouse
events to it, converts UTF-8 commits to the selected legacy code page and maps
logical mouse coordinates to render pixels before native inclusive hit tests.
It starts/stops SDL text input with native edit focus. Control-modified character
input is ignored as in the native IME path. No generic OS edit widget is used.

`IntroLoginPresentation::prepare` makes the six selected UI textures resident
before BGM. Keyed BMP textures are shared by logical instances; source UI assets
have one mip level. Later UI construction creates hidden controls, labels and
dynamic edit surfaces. `setVisible` reveals them after camera completion and
selects native focus. Each update changes only dirty edit pixels, caret geometry
and required sprite visibility. Password text is masked before rasterization.
The caret uses source authored size and measured/scrolled text width.

The supported committed-text model is append-at-end with Backspace, including
safe whole-character handling for configured legacy lead bytes. It retains the
512-byte IME cap. Full composition/candidate rendering and non-English locale
parity remain unimplemented. Unsupported code-page characters are rejected
explicitly instead of being silently replaced.

The GDI adapter uses the source font/layout rules. The source edit-creation
overload leaves `UIText.TextFormating` unassigned before copying the structure;
the adapter deterministically uses the known left arrangement and manual
vertical offset. This is a boundary for future original-runtime comparison,
not a claim of exact edit glyph/formatting parity. Native fixed-size buffer
overflows are not reproduced.

`NativeSavedId` writes only `userdata/system/SaveID.bin` adjacent to the executable
by default. `--user-data-root`, `TANTRA_USER_DATA_ROOT` or the launch script's
`-UserDataRoot` selects another remake-owned root. The application rejects paths
inside canonical client/source/data roots, including resolved saved-file paths.
Passwords are never persisted or included in diagnostics. Packaging excludes
default `userdata` entries from its manifest and preserves existing user files.

The saved-ID writer retains 53 bytes, exact XOR encoding and zero padding. Empty
ID is a no-op, leaving an existing file intact. Oversized IDs are reported and
leave the old file intact, rather than reproducing the native overflow. Loading
retains native zero-filled short reads, the 52-byte cap and ignored trailing
data; invalid decoded embedded NUL is rejected safely. Checkbox disable removes
the file. Startup loads this own-root file before gate creation.

Click sound 33523 resolves through `ClientRes.txl` ETCSound to
`resource/sound/ETCSound.hpk` entry `click_endGame.wav`. It is preloaded before
BGM when audio is enabled. SDL3 decodes the original stereo IMA WAV, preserving
130,624 complete-block frames, 44,100Hz S16LE stereo. The x64 adapter plays one
finite, non-spatial DirectSound buffer at source sample volume 0.5. Checkbox
toggle is silent. Actual buffer flags, channels, size and volume are verified;
Miles acoustic/master-volume/mixing parity and general pool behavior remain open.

## Verification

Both x64 configurations build and pass **62/62 CTest checks**. New checks cover
original BMP conversion, exact key versus neighboring colors, row orientation/
padding, invalid input, focus, source action ordering, native blink boundaries,
up-without-down dispatch, safe edit limits and the saved-ID format. Edit raster
checks cover scrolling and the equality of masked text to literal star glyphs.
The existing sample decoder test now includes the original stereo UI WAV.

`tools/verify-intro-login.ps1 -PackageRoot <package> [-WithAudio]` drives actual
SDL3 queued events through the production adapter. Its input and Cancel runs use
separate empty build-local fixtures. It verifies:

1. ID/password entry, masking, Backspace, Tab, Escape and ignored unfocused text.
2. Button hover/down/normal transitions against actual OGRE visibility/geometry.
3. Up-without-down checkbox activation and native callback order, including
   login-request-before-save and toggle deletion/recreation.
4. Actual GPU RGBA readback for every label/control/edit image; all sprite
   positions, mip counts, sizes, depth and visibility. This checks submitted
   data, not just values retained by the controller.
5. Saved-ID output is exactly 53 bytes and the typed ID reloads; the fixture is
   reused by a new process to verify restored ID, an empty password and password
   focus, then cleaned using only its known files/directories.
6. Cancel is queued, consumed at the intro update boundary, and exits cleanly.
7. With audio, actual stereo 2D click buffers start with source size/volume.

The verifier also confirms all three canonical reference roots are rejected as
writable user-data paths before a window is created. `tools/verify-userdata-package.py`
builds a fresh temporary package under the build workspace, proves its private
marker survives packaging and is excluded from the manifest, verifies provenance,
then removes only that owned temporary package after checking its resolved path.

General package/runtime smoke also checks
`INTRO_UI_RESOURCES_PREPARED -> INTRO_MUSIC_SELECTED ->
INTRO_LOGIN_CONTROLS_BOUND -> INTRO_LOGO_PRESENTED -> INTRO_LOGO_HIDDEN ->
INTRO_SAVED_ID_LOADED -> INTRO_GATES_CREATED` and the existing camera/login
visibility trace. Both refreshed packages have **95 provenance rows**.

Build/test/package/runtime logs use `build-ogre-sdl/native-login-controls-*`.
Input/exit diagnostics and populated, masked captures are there too, named by
configuration. Validation proves this selected login-input slice; authentication,
server/character/world progression, full native update/render parity and the
rest of the implementation plan remain unfinished. No commit or push was made.
