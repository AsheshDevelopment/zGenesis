# Source sequence is the specification

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).

The user requires the original HTLauncher sequence and behavior, not merely
similar visible assets. This trace covers normal startup (`g_byReStartCode=0`).
Restart values 1/2 and subsequent network/gameplay sequences need separate traces.

Intro initialization loads UI/sound resources and starts BGM before presenting
the logo (`HTLoading.cpp:45-60`). The remake now preserves catalog BGM 30015,
one RNG call, stream volume and two requested plays at this boundary. See
[intro music evidence and limits](../presentation/NATIVE_INTRO_MUSIC.md). Runtime diagnostics
require `CLIENT_RESOURCE_CATALOG -> INTRO_MUSIC_SELECTED -> INTRO_LOGO_PRESENTED`;
the dedicated audio verifier also requires successful playback before the logo.

Intro fire resource preparation now runs after the logo frame and before logo
hiding and initial object placement. It resolves the exact MonsterEtc manager,
effect, priority and two particle records. The selected looping simulation and
OGRE draw now run after model animation updates. Runtime
checks require `INTRO_LOGO_PRESENTED -> INTRO_FIRE_RESOURCE_LOADED -> INTRO_LOGO_HIDDEN`.
See [the fire resource graph](../presentation/INTRO_FIRE_RESOURCE_GRAPH.md) and
[native fire runtime evidence](../presentation/NATIVE_INTRO_FIRE_RUNTIME.md).

Current map-resource integration: [intro rigid materials](../assets/INTRO_MAP_MATERIALS.md)
documents the complete 56-group stone mesh submission and original texture
binding. This fixes the background's truncated geometry; complete scene,
material and engine behavior remain unfinished.

Current login prerequisite: [native login presentation](../presentation/NATIVE_LOGIN_PRESENTATION.md)
reads complete messages and the selected locale header, creates the background
and five source labels hidden before logo rendering, and reveals them after
camera completion. Runtime reads actual sprite GPU geometry and visibility.
Subsequent [native login controls](../presentation/NATIVE_LOGIN_CONTROLS.md) add source focus,
committed edits, buttons, saved-ID I/O, 2D click audio and deferred Cancel. UI
textures are now resident before BGM; saved ID loads before gate creation.
Authentication and subsequent native events remain unfinished.

| Order | Native evidence under Tantra/HTlauncher | Required behavior | Current remake evidence or gap |
| --- | --- | --- | --- |
| 1 | HTGameManager.cpp:475-490 | Ready-game control computes elapsed time and updates intro | SDL loop supplies elapsed time; complete native update ordering remains unfinished |
| 2 | HTIntroManager.cpp:949-953,203-215 | FIRST initializes UI, disables world rendering, enables UI | Initial UI created before scene submission |
| 3 | HTIntroManager.cpp:390-401,316-324 | Show centered startup logo; camera at INIT; logo-render guard false | HtIntroSequence starts at INIT camera, login hidden |
| 4 | HTIntroManager.cpp:1013-1028 | Render UI; only then set m_bForRenderLogo | Actual OGRE UI frame must succeed before logoRendered gate opens |
| 5 | HTIntroManager.cpp:954-960,711-723 | LOADINTROMAP returns until logo render, then loads intro resources, enables world, hides logo | Resource submission starts after logo frame; missing meshes remain diagnostics |
| 6 | HTIntroManager.cpp:728,733-765 | Queue login; load map objects, create/position/scale/animate two gate mobs and attach fire FX | Gate creation, texture replacement, sequential transforms, silent finite starts, null anchors and selected looping fire implemented; later finite motion sound is integrated; full scene remains unfinished |
| 7 | HTIntroManager.cpp:767-772 | Start look/eye LOGIN line moves; enter INTROPLAY | HtIntroSequence enters IntroPlay; logo hidden, login still hidden |
| 8 | HTCamera.cpp:667-671,460-473,577-619 | Look updates before eye; both linear weights subtract 0.02 per update and snap at <=0.01 | Camera profile uses the same decrement/snap; initial and login endpoint pairs retained |
| 9 | HTIntroManager.cpp:1179-1224 | Show queued login after g_bCameraMove becomes false; focus saved-ID password or empty ID | Login visibility and edit focus follow camera completion; stored ID focuses 4, empty ID focuses 3 |
| 10 | HTIntroManager.cpp:980-1000 | Camera, message timer, server connect/disconnect, animation, auto-login, show-window, login delay, login-time checks | Most handlers remain unfinished; no fabricated successful session events |
| 11 | HTIntroManager.cpp:1242-1275 | After successful-login delay, hide login, move camera toward server screen, queue server UI | Implemented through explicit loopback or SQLite offline backend; attacks, 1000ms delay, camera-gated original server panel and Cancel return are verified by dedicated probes; zone/roster progression remains unfinished |
| 12 | Native server/zone/roster handlers | Advance server selection, character selection and world only on corresponding events | Offline fixture explicitly requests character-selection state; no automatic application world entry |

The native show-window delay comparison is commented out. The active condition
is camera completion, even though HT_vIntro_SetShowWindow receives a nominal
1000/2500 ms argument. Do not replace that condition with an invented timer.
The camera LINEMOVE type values are both 108 in HTControlDef.h; the shared
camera mode therefore selects subtraction for both eye and look. Source camera
terrain checks, complete engine projection rules, and restart transitions are
still missing; the present profile is not complete camera parity.

Current login/server integration and SQLite offline limits are documented in
[native web login and offline mode](../protocol/NATIVE_WEB_LOGIN_AND_OFFLINE.md).
`--offline` uses persistent local response data through the same parser and
intro sequencing. It does not invoke the older empty mock-packet flow or
automatically enter the world. Later dedicated-server and GUI work belongs in
[`_server`](../../../server/archive/rust/ROOT_IMPLEMENTATION_PLAN.md).

`ClientSession::enterIntro` now retains Intro. `showCharacterSelection` is an
explicit event boundary used by fixture probes; it is not proof of a working
native network/roster handler. The application no longer calls selectCharacter,
enterMap, or enterWorld during startup.

Runtime diagnostics verify this implemented prefix in order:

1. CLIENT_RENDER_PROFILE
2. CLIENT_RESOURCE_CATALOG
3. INTRO_LOGO_PRESENTED
4. INTRO_LOGO_HIDDEN
5. INTRO_GATE_RESOURCE_BINDING
6. INTRO_GATES_CREATED
7. INTRO_MAP_PRESENTATION
8. CLIENT_STATE_INTRO
9. INTRO_LOGIN_SHOWN

The capture waits for login visibility rather than capturing an arbitrary
30th frame during camera motion. The source-sequence probe rejects loading
before logo rendering and rejects skipped/duplicate gates; it checks 49 camera
updates keep login hidden and the 50th exposes it. Runtime smoke observes the
ordered diagnostic trace and also runs the separate asset-gallery lifetime
checks. This verifies the implemented prefix, not the full original client.

2026-10-22 validation: both x64 configurations build and pass 38/38 CTest
checks each. Debug/Release runtime smoke both verify the ordered intro trace
and gallery lifetime behavior. Captures show login after the logo has hidden.
Logs and rendered evidence use `build-ogre-sdl/native-sequence-*`.

Subsequent catalog work adds a 39th CTest and the catalog/gate-binding trace
events. Its evidence is documented in [the ClientRes reader](../assets/CLIENT_RESOURCE_CATALOG.md).

The subsequent geometry/profile work raises coverage to 41 tests and adds
CLIENT_RENDER_PROFILE before catalog loading. Native profile values now drive
initial window size and camera clipping/FOV. See [the geometry/profile evidence](../assets/MONSTER_GEOMETRY_AND_LOD.md).

## Monster texture component

Current integration: [normal intro gates](../../archive/checkpoints/NORMAL_INTRO_GATES.md) supersedes the
historical component-only integration gaps below. The full scene, fire, sounds
and subsequent native events remain incomplete.

The single-mesh create -> texture-ID lookup -> instance texture replacement
contract is now implemented and exercised in the diagnostic lifetime fixture.
See [native call sites and limits](../assets/MONSTER_TEXTURE_REPLACEMENT.md). Normal intro
gate model assembly now uses this component. Selected fire is integrated; full scene coverage in row 6 remains pending.

## Animation timing prerequisite

Authored TAB timestamps now drive duration and key sampling. The binary evidence
and verified reader behavior are documented in [authored timing](../assets/AUTHORED_ANIMATION_TIMING.md).
Finite StartAnimation/STOP is now supported by the skinned backend; native
The zero-play-time ChangeAnimation component now blends local transforms;
normal intro transitions now use it. STOP -> STD must run before
the login-delay early return and random gate-animation checks (native lines
1796-1829); a generic infinite presentation loop does not satisfy that sequence.

## Finite model playback and gate ordering

The skinned backend now supports finite StartAnimation counting and STOP pose
retention. A separate gate scheduling component preserves fallback, login-delay,
clock and RNG call order. See [evidence and integration gaps](../assets/FINITE_ANIMATION_PLAYBACK.md).
The normal intro now integrates the blend and authored-bind components.
Selected finite [motion sounds](../presentation/NATIVE_INTRO_MOTION_SOUNDS.md) are now integrated.
General sound behavior and full event handling remain pending; sequence row 6
and the complete animation handler remain unfinished.

## ChangeAnimation component integration

The diagnostic STOP-to-STD fallback now executes through a distinct state-4
local blend using the original AniInterTime configuration. It verifies frozen
phase, interruption and native target promotion across all detail records.
See [implemented behavior and remaining normal-intro work](../assets/NATIVE_CHANGE_ANIMATION.md).
This component alone does not complete the gate-assembly row or full engine update sequence.

## Authored bind matrices

The skinned backend now uses the traced authored-bind CPU position path, including
the explicit character-position mode. See [evidence and visual limits](../assets/AUTHORED_BIND_SKINNING.md).
Normal gate model assembly now uses this component. Geometry/material/appearance
coverage remains open; this does not complete the normal intro sequence.
