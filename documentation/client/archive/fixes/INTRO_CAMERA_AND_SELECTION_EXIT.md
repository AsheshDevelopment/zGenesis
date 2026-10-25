# INTRO camera and offline character-selection exit

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.
Updated: 2026-10-23. Final launcher: `C:\_GitHub\TantraSrc\_client\HTLauncher.exe`.

## Confirmed camera cause and correction

The remake treated the first TMB geometry section's bounds as the character's
height. Naga's first section is the head: its vertical span is only 2.99005
units. The original face-camera calculation subtracts `22 - modelHeight` from
both camera positions, so passing the head height moves the camera toward the
feet, producing the large legs shown in the reported screenshot.

The type-2 TMB footer stores a whole-model bounding box after the skeleton tree.
The loader now retains this box and exposes `RigidTmbMesh::objectHeight()`;
geometry bounds remain available separately. Files without this metadata use
the union of their decoded geometry sections. INTRO face/hair zoom and the
main-game camera startup now use this model height.

For the original Naga model the height is 18.398548, giving source camera
eye Y=71.398548 and look Y=76.398548. Face and hair changes retain the original
camera transition and only initiate the zoom once.

Reference files:

- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTIntroManager.cpp`: native face-camera
  table, new-character position, height lookup and face/hair handlers.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTEngineHandler.cpp`:
  `HT_fGetObjHeight`, including its transformed bounding-box fallback.
- `C:\_GitHub\TantraSrc\TantraClient\resource\object\PC\Mesh\PC_Naga_Basic.tmb`:
  original geometry and whole-model bounds.
- `_remake/src/resources/RigidTmb.{h,cpp}`,
  `_remake/src/rendering/HtRenderFacade/IntroCharacterFrontend.cpp` and
  `_remake/src/app/tantra_remake_main.cpp`: corrected height consumers.

## Exit investigation and failure reporting

The reported offline exit was not reproduced in the single saved-roster run
below. Logs from the reported launch had already been replaced by an earlier QA
run, and Windows had no newer recorded launcher crash. The historical cause is
therefore **unconfirmed**; this result does not prove every exit/crash is fixed.

A caught main-loop exception previously broke out without marking the session
as failed. It now adds an error diagnostic and produces a failing exit status.
World-loading errors and caught main-loop exceptions retain timestamped reasons
in `_client\TantraRemakeFailures.log`. Normal runs display an SDL error message
before closing. `_client\TantraRemakeSession.log` also appends INTRO state
transitions across launches. Native access violations still require Windows
crash evidence; these handlers do not intercept them.

## Verification

- [x] Release client, asset-closure target and focused height probe build.
- [x] Original Naga height and actual INTRO camera sequence pass the CPU probe.
- [x] Exactly one audio-enabled offline client process; world group 3, Mandara
  route 1; no retries or other channels.
- [x] Use a read-only SQLite backup of the existing `ashesh` roster and copied
  private settings. Change face, change hair, cancel creation, select the saved
  character and enter Mandara.
- [x] Visually inspect face/hair framing and the rendered world capture.
- [x] Render 30 settled world frames and exit normally with code 0.
- [x] Verify all 4,171 manifested runtime files, original paths, x64 imports and
  exact icon payload without starting another client process.
- [x] Normal SQLite and saved-ID hashes remain unchanged.
- [ ] Reproduce and identify the reported historical offline exit.

Tested and staged executable SHA-256:
`056717541de6833edc785137dabfbed0442bdc16dfb18d75340a51fcc2c913b0`.
Manifested runtime payload: 253,486,737 bytes. Full regression suite, Debug,
relocation, prolonged play and fault-injected failure-message behavior were not
tested in this slice.

Tracked proof: [saved-roster verification](../../evidence/saved-roster-camera-verification.json).
Local build evidence under `_remake/build-ogre-sdl`:

- `intro-exit-camera-build.log`, `intro-model-height-check.log`,
  `intro-exit-camera-package.log`, `intro-exit-camera-stage.log` and
  `intro-exit-camera-inventory.log`.
- `saved-roster-camera-runtime.log` and
  `saved-roster-camera/{VERIFIED.json,PROCESS_RESULT.json,diagnostics.tsv}`.
- `saved-roster-camera/saved-roster-face-camera.png`,
  `saved-roster-hair-camera.png`, `saved-roster-saved-character-info.png`,
  `saved-roster-native-loading.png` and `saved-roster-world.png`.

The focused reproducer is `_remake/tools/verify-saved-roster-camera.py`.
Running it explicitly starts one client session; it was run once for this fix.
