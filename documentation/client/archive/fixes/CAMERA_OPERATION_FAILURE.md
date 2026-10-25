# Camera obstruction operation failure, 2026-10-23

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.
The 16:15 user report was a controlled client exit, without a new native dump.
The client set its failure flag but recorded no error diagnostic, so its dialog
fell back to `Client could not complete the current operation` and appended
nothing useful to the failure log. The original exit therefore does not retain
a precise failing-frame trace.

A CPU replay using the actual Mandara assets and saved cells reproduced a
matching fatal path. At cell `(490,309)`, client tribe 2, frame 18, the camera
collision sweep returned its look target as the eye:

```
eye  = 4902.5, -0.618321, 7142.5
look = 4902.5, -0.618321, 7142.5
```

This has no viewing direction. `CameraView::valid` rejects it, and the normal
world camera branch previously exited without recording a reason. The affected
cell belongs to the report's selected world group 4. This is a directly
reproduced defect consistent with the popup, rather than a native crash or a
proven graphics-driver failure.

`HtMainGameStartup::eye` now limits a collapsed obstruction result to a small
minimum separation along the intended native viewing ray. It preserves the
source camera sequence, direction and ordinary clipping results. The guard uses
up to ten source units, below the normal character zoom limit. Overlapping
geometry can still force a close view; authored `.tbo` collision parity remains
incomplete and is not solved by this guard.

Silent fatal world paths now record specific time, simulation, life/target UI,
player transform/animation, camera and input failures. A final fallback always
writes a diagnostic with phase/frame context if an uninstrumented path fails,
so the failure log cannot remain empty for another controlled operation exit.

References:

- `C:\_GitHub\TantraSrc\_remake\src\compatibility\HtMainGameStartup.h`:
  source camera lifecycle and obstruction-result guard.
- `C:\_GitHub\TantraSrc\_remake\src\rendering\HtRenderFacade\CameraView.h`:
  finite/nonparallel camera validation.
- `C:\_GitHub\TantraSrc\_remake\src\resources\NativeMapAssets.cpp`:
  existing triangle/sphere camera sweep.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTCamera.cpp`:
  original camera interpolation, orbit, zoom and terrain checks.
- `C:\_GitHub\TantraSrc\_remake\src\app\tantra_remake_main.cpp`:
  camera application and explicit fatal-operation diagnostics.
- `C:\_GitHub\TantraSrc\_remake\src\tools\world_gameplay_probe.cpp`:
  three saved-cell replays across all eight tribes, 50 camera updates each.

The replay failed before the guard and passed all 24 cases afterward, alongside
the existing gameplay checks. This replay creates no client window and starts
no channel. Evidence: `build-ogre-sdl/operation-camera-{before,after}.log` and
`operation-fix-build.log`. Original user logs are archived under
`build-ogre-sdl/operation-error-20261023/before-*`.

## Final result

Staged `C:\_GitHub\TantraSrc\_client\HTLauncher.exe` SHA256:
`D42320F213D3C057634185D20E884996FF4C1ACAFE10AF9309A39E57338CF16F`.
Static verification passed: 4,188 owned files, 257,911,783 bytes, x64 and resolved
imports. One offline process used a read-only backup of the user's group 4
roster and a private userdata directory. It verified face/hair framing,
cancellation, selection, CHAR_INIT at the actual saved `(490,309)` cell, 30
settled Mandara frames and clean exit, with no error diagnostics. The original
offline database hash is unchanged. No other channel or second client process
was tested.

[Runtime evidence](../../evidence/camera-operation-runtime.json) and
`build-ogre-sdl/operation-camera-runtime-20261023/` contain the record and five
captures. This targeted acceptance does not establish exhaustive collision
parity or long-duration stability.
