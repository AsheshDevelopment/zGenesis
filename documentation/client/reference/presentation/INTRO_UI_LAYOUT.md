# Intro UI layout correction

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).

Source evidence:

- `Tantra/HTlauncher/HTIntroManager.cpp:390-408`: logo window is centered
  (arrangement 5), sized 512x512 below 1024 viewport width or 1024x512 otherwise.
  The login window is positioned at `(screenWidth/2-150, screenHeight-400)`.
- `HTInterface.cpp:9757`: login texture registration is 512x256. The logical
  login window is 304x208; its texture includes transparent padding and is not
  scaled to those logical window bounds.
- `HTInterface.cpp:9767-9768`: logo texture registrations use the corresponding
  native pixel dimensions. `UITexture::Create` uses registered RealSizeX/Y
  when no control size override is supplied.

The application initially opens at 1024x768 and now loads the matching
1024x512 logo instead of stretching the smaller logo across the viewport.
It uses the original login anchor with a native 512x256 texture. A new pixel
sprite entry point preserves pixel sizes on resize. A dedicated clip-space vertex shader
keeps these sprites independent of camera movement, with depth checks/writes
disabled. The first pixel sprite is the background overlay; subsequent pixel
sprites use a foreground overlay group. Visual testing found that queue
priority alone did not reliably keep the login above the logo in this profile;
separate background/foreground groups corrected the captured ordering.

The six 32x32 picture textures are asset previews, not original login controls.
They remain available under `--asset-gallery` instead of appearing by default.
Both logo sizes remain staged with source provenance; initial 1024 selection
does not yet switch assets when resizing across the original 1024 threshold.

Remaining work includes text, edit controls, buttons, UI state visibility,
native BMP transparency policy, input focus/hit testing, and source-correct
scene/camera presentation. A nonblank frame is not a visual-parity gate.

The capture verifier now additionally requires gold login artwork samples in
the source-relative panel region. This catches a panel obscured by the logo;
it is a bounded visibility check, not complete pixel parity. Two successive
Release captures passed after moving pixel sprites to a dedicated clip-space
shader. Earlier identity-matrix submissions were visually unreliable despite
clean startup logs. Both configurations built and passed the 38 existing
CTest checks during this change. Verification logs and captures use
`build-ogre-sdl/pixel-ui-*`.
