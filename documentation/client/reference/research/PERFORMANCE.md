# Performance correction, 2026-10-23

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The user's preceding runtime log selected Intel UHD Graphics although the laptop
also has an NVIDIA GeForce RTX 4050. Code inspection also found two avoidable
costs: UI setters performed linear searches across all sprites and rewrote
unchanged vertex buffers during repeated HUD refreshes; animated models skinned
and uploaded hidden detail levels as well as the selected level.

Changes:

- `src/rendering/OgreBackend/NativeRenderDevice.h` chooses a physical DXGI
  adapter with the most dedicated VRAM, excluding software adapters. The
  existing `TANTRA_RENDER_DEVICE` override takes precedence. If enumeration or
  matching fails, OGRE retains its default selection.
- `OgreBackend.cpp` indexes UI sprites by name and skips unchanged rectangle,
  order and visibility updates. Window resize still rebuilds pixel geometry.
  The index is cleared with the sprite collection and retained when UI survives
  scene cleanup.
- Hidden/unselected skin records advance their shared playback and finalize
  transitions, but skip CPU vertex skinning and buffer uploads. Socket pose
  sampling remains available; becoming visible uses the current animation time.

HIGH settings, native assets and world geometry are retained. The test scene
submitted 6,503 placements, 524,288 terrain triangles, 380,497 object triangles
and 5,742 object batches. Visibility/LOD/streaming work remains a separate
optimization opportunity; this change does not establish performance throughout
every map, camera angle or crowded scene.

## Verification

One offline process on group/channel/route 1, using an isolated temporary profile
under `_client/userdata`, passed create/select → CHAR_INIT → Mandara, MainUI
shortcuts/dragging/focus/close, movement and inventory/equip/unequip. The process
then measured 120 settled frames without per-frame QA geometry readbacks or
screen captures. Its actual driver log confirms RTX 4050 selection.

| Result | Measured value |
| --- | --- |
| Average throughput | 59.4473 FPS |
| Median frame interval | 16.2386 ms |
| 95th-percentile frame interval | 22.9177 ms |
| Unchanged HUD control geometry uploads during sampling | 0 |

These are short-run measurements for this scene and hardware, not an FPS
guarantee or a controlled percentage speedup: the preceding build was not
benchmarked in the same scene. Normal offline database and saved-login hashes
are unchanged. No second client session was started.

Staged `C:\_GitHub\TantraSrc\_client\HTLauncher.exe` SHA256:
`7A94F471CF826A9E57E42214858791828B568F3B23B6D7E0629F947CF862002E`.
Static manifest/import checks passed: 4,188 owned files, 257,906,151 bytes.

Evidence: [performance measurements](../../evidence/performance-runtime.json),
`build-ogre-sdl/performance-runtime-20261023/{VERIFIED.json,performance.json,create-diagnostics.tsv}`,
`performance-before-Ogre.log`, `performance-after-Ogre.log`,
`performance-final-build.log`, `performance-stage.log` and `performance-static.log`.
To repeat deliberately, use `tools/verify-intro-characters.py --performance`
with the standard package/executable/output arguments and only scenario `create`.
