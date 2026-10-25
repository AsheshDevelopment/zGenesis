# Monster geometry and native LOD policy

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The White Tiger model selected by intro monster 2077 uses the same bounded
type-2 record geometry as the PC fixtures. Its names begin with `Tiger_2`,
which the prior PC/Type prefix filter excluded. Record discovery now validates
vertex count, material/header bounds, matching triangle counts, and all index
ranges instead of requiring those name prefixes. The existing full geometry
and explicit vertex influence mapping validation then applies.

| Model record | Render vertices | Indices | Influence groups |
| --- | --- | --- | --- |
| Tiger_2_L1 | 667 | 2958 | 493 |
| Tiger_2_L2 | 538 | 2280 | 382 |
| Tiger_2_L3 | 407 | 1674 | 281 |
| Tiger_2_L4 | 286 | 1092 | 184 |

All four records retain complete per-vertex mappings. The file has a validated
50-bone skeleton tree. The TMB probe now requires named complete geometry and
influence mappings for every expected additional record; metadata-only discovery
cannot pass the multipart fixture checks.

The active `HT_iComputeCharLOD` implementation is available in
`Tantra/HTlauncher/HTMapSystem.cpp:2206-2228`. `HtModelLod.h` ports that function's
inclusive boundaries exactly, including its negative closest-distance interval
and unused previous-level argument. Native values are Closest=0, Near=1,
Medium=2, Far=3, TooFar=4 in the shipped launcher. The earlier -1 claim copied
the local compatibility header; [binary inspection](NATIVE_MODEL_DISTANCE.md)
corrected it. No distance hysteresis is active in that branch.
The engine's `HT_fGetDistanceFromCamera` supplies the distance and
`HT_vSetLODLevel` applies the result (`HTMapSystem.cpp:1045-1063`). The manager
distance operation is now ported from inspected binary evidence. Explicit
[named-record detail selection](MODEL_DETAIL_SELECTION.md) is now available
in the renderer. Automatic world viewing-set integration and complete native
base-renderer behavior remain unfinished; all four records are not drawn together.

## Source render configuration

`ClientRenderProfile` reads `[OPTION] spec` and `[CAMERA] near/fov` from the
canonical `HTStartup.cfg`, then the corresponding LOW/MEDIUM/HIGH section of
`HTSpec.cfg`, matching `HT_hrLoadSpecValues` in `HTEngineHandler.cpp:9140+`.
The application now uses the selected resolution and camera near/far/FOV,
rather than hard-coded values. The source far clip is scaled by the renderer's
existing 0.001 world scale; the prior infinite far plane is no longer used by
normal startup. Camera FOV axis/handedness parity still needs engine evidence.

| Profile | CharLOD1 | CharLOD2 | CharLOD3 | LODFar | CamFar |
| --- | --- | --- | --- | --- | --- |
| LOW | 30 | 100 | 200 | 1600 | 1600 |
| MEDIUM | 100 | 200 | 400 | 2000 | 2000 |
| HIGH | 100 | 200 | 400 | 3200 | 3500 |

Normal startup also advances the client LoadConfig/LoadResources markers after
the corresponding profile/catalog work, rather than completing them before
any such files were read. Startup logo selection now follows the actual initial
viewport width: below 1024 selects the 512x512 asset; otherwise 1024x512.
Changing that selection when a live resize crosses 1024 remains unfinished.

## Verification and remaining work

Both x64 configurations build and pass 41/41 CTest checks. New coverage includes
all White Tiger records; LOW/MEDIUM/HIGH profile loading; every LOD boundary
and its next representable float; nonfinite distances; and invalid/nonfinite
configuration rejection with output clearing. Runtime source-sequence and
gallery/lifetime checks pass for both packages.

A generated 800x600 profile fixture under `build-ogre-sdl/render-profile-800-client`
uses copied configuration/catalog files and a junction to read-only canonical
resources. The canonical client was not modified. Its runtime capture measured
800x600 and the OGRE log confirmed `Intro_logo_800.bmp` loaded at 512x512. The
canonical profile was subsequently verified at 1024x768. Logs/captures use the
`build-ogre-sdl/monster-records-*` prefix. A one-second Release smoke launch
initially sampled before D3D11 startup completed; the three-second smoke passed.

Gate instance assembly, texture replacement by resource ID, native skinning,
distance calculation/detail application, source finite-loop animation changes,
attached effects and sounds remain incomplete. The application continues to
report pending gate presentation. The original engine source was requested as
additional evidence; other source-backed work can continue independently.
