# Native intro fire runtime

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The default OGRE x64 / SDL3 intro now runs the two original looping fire groups.
This connects the existing native TFX reader and particle mathematics to the
application lifecycle and actual OGRE geometry. It completes this selected intro
component; it does not complete the HTLauncher remake or establish stock-client
pixel parity.

## Source sequence

`Tantra/HTlauncher/HTIntroManager.cpp:736-763` creates and transforms both gate
models, starts their finite animations, creates both null anchors, then requests
looping effect 1300143 on anchor 0 and anchor 1. The adapter retains that order.
The resource path is Map 40100 -> FXMonsterEtc -> `intro_MFire`, with priority
100, attachment 0, and the two authored nodes 0 and 4. Their textures come from
the common `fxPCTexture.hpk`; see [resource evidence](INTRO_FIRE_RESOURCE_GRAPH.md).

`HTEngineHandler.cpp:1206-1225` advances model animation before updating the FX
managers. The normal frame now invokes the fire update after the backend's model
animation pass and before OGRE renders. The intro's camera, gate checks, LOD and
login visibility retain their existing sequence.

The inspected engine manager first updates active leaves in each group, then
creates pending leaves whose start time has arrived. Therefore the first manager
update constructs the four emitters; their first particle update occurs on the
following manager update. Initialization consumes 768 signed-table lookups per
emitter, preserving gate 0/node 0, gate 0/node 4, gate 1/node 0, gate 1/node 4.
The private FX RNG remains separate from the launcher's animation/music RNG.

## Native lifecycle and clocks

- The manager ignores elapsed values <= 0 or > 30 seconds.
- Its particle clock is absolute `timeGetTime()` multiplied by the authored
  float constant 0.001, then stored as float. Conversion keeps the integer
  precision through multiplication; it does not first round milliseconds to
  float. The deterministic runtime verifier supplies a separate 30 Hz clock
  with a nonzero one-second origin.
- Visibility tests the null parent's displacement against the camera front
  plane first. A negative dot product hides the emitter. Priority 100 then
  bypasses distance; priority 20 doubles distance and priority 5 halves it.
  Ordinary distance comparisons include equality. Sprite-system distance comes
  from the selected original HTSpec.cfg section: 200/300/400 for low/medium/high.
- First visible activation primes the previous update time before spawning and
  integration. Newborns therefore receive a valid updated timestamp at dt zero.
  A hidden update preserves simulation time and RNG state. Returning to view
  uses the complete time gap, as the selected native branch does.
- The loop flag suppresses the leaf EndCheck. The group's three-second duration
  advances its group clock without recreating emitters or resetting particles.
  Particle lifetimes and curves continue on the unwrapped absolute clock.
- Emission, early expiry, velocity-before-position integration, scalar/color
  curves and packed premultiplied color use the existing
  [native mathematics](NATIVE_PARTICLE_MATH.md).

## Coordinate and renderer boundary

The selected nodes' authored coordinate byte is zero. Native initialization
inverts that byte, adds `parentWorld * 10` when spawning, and clears parent
translation in the draw matrix. Particle positions, authored offsets, velocity,
acceleration and texture extents consequently live in a separate particle
coordinate domain. The native draw applies 0.1 to the resulting corners.

For the stationary identity null parents used here, the final world center is
`0.1 * particlePosition`. A newborn fire particle is at parent Y + 2.3 world
units; a newborn smoke particle is at parent Y + 4.0. It is incorrect to add
unscaled world parent coordinates to particle coordinates or to interpret the
0.1 matrix as scaling around the camera. The first exploratory capture exposed
that mistake; the corrected adapter and regression fixture enforce this boundary.

Half extents are `textureDimension * scalarCurve * authoredSize`, in particle
units. There is no extra half-width factor. The textures are validated as the
selected single-frame 64x64 TGAs. Corners use the actual camera billboard basis
in native order `(-w,-h),(-w,+h),(+w,+h),(+w,-h)`, with UVs
`(0,1),(0,0),(1,0),(1,1)`. After native conversion, the renderer applies the
project's source-world-to-OGRE scale of 0.001 once.

The native preset selects no culling, no depth test, and no depth writes.
The fire node's volume flag selects ONE/ONE blending; smoke selects
SRCALPHA/INVSRCALPHA, even though RGB has already been premultiplied by the native
color routine. A dedicated vertex-color shader modulates the original texture
with those packed colors. It retains the inspected low-byte-first color lanes
and inverted alpha; the resulting blue fire is not recolored for appearance.

Four dynamic ManualObjects preserve emitter order and particle insertion order.
An explicit OGRE queue places them after scene geometry and before the login UI.
The native manager's queued creation is distinct from drawing; no particle is
advanced early to make the first frame look populated.

## Evidence and validation

`tools/inspect-native-fire-runtime.py` checks the supported engine and Direct3D
DLL hashes and expected instructions without executing either original binary.
Its output is [native-fire-runtime.txt](../../evidence/native-fire-runtime.txt).

| Engine RVA | Confirmed boundary |
| --- | --- |
| 0xC32E | Front plane, priority handling and inclusive distance |
| 0xE8AD | First visible base activation clock |
| 0xF422, 0xF525, 0xF56F, 0xF61C, 0xF802 | Absolute clock, looping, active pass before creation |
| 0x135AF, 0x14040, 0x14256 | Coordinate-byte inversion and parent times ten |
| 0x12F8D, 0x1300F, 0x13260, 0x13375 | Texture extents, billboard corners, 0.1 scale, cleared translation |
| 0x134B4, 0x5879 | Blend override and preset 25 registration |
| HTDirect3D 0x4755, 0x4785 | No culling and depth disabled |

The `native_intro_fire_lifecycle` CTest uses the real graph plus fixed independent
expectations for delayed creation, activation, visibility boundaries, RNG call
counts, hidden time gaps, looping beyond duration, particle expiry, the integer
clock conversion and the particle-to-world coordinate boundary.

The packaged `--verify-intro-gates` run advances 240 deterministic frames. It
checks all four real OGRE batches against live simulation counts, reads packed
colors, positions and UVs back from their actual vertex buffers, and verifies
textures, both blend pairs, culling and depth state. It also destroys/recreates
an isolated renderer fixture twice without disturbing the live native groups.
Successful runs emit `INTRO_FIRE_RUNTIME_VERIFIED`; the smoke script requires
that marker and all four node-creation records.

Validation artifacts are `build-ogre-sdl/native-fire-{release,debug}-build.log`,
matching `*-tests.log`, package verification and runtime smoke logs. The actual
corrected intro capture is `build-ogre-sdl/native-fire-capture.png`; it shows blue
fire and smoke above both braziers beside the gate models and login panel.

2026-10-22: Release and Debug x64 each pass all 55 CTest checks. Both refreshed
packages pass hash/provenance validation (82 provenance rows; 103 Release and
102 Debug manifest files)
and runtime smoke. The 240-frame intro fixture retains 118 live submitted quads
across the four emitters at its final check. These counts describe the selected
deterministic clock fixture, not a fixed production frame rate or benchmark.

## Remaining work

This adapter deliberately accepts only the supplied looping intro profile:
mode 2, count 1, density 1, static identity null parents, zero Euler rotation and
variation, and the selected coordinate flag. Moving/rotated/socket parents,
other modes/node types, non-loop/stop/drain lifecycle and general FX playback
remain unfinished. So do full fixed-function material/fog/filtering equivalence,
whole-engine initial signed-table/RNG history, x87 last-bit equivalence and an
original-client visual comparison. Current deterministic checks establish the
selected rules and renderer wiring, not identical random particle frames.

The full implementation plan remains active: complete map/material/lighting,
missing scene resources, general sound behavior, interactive login, network progression
and later gameplay states still require implementation and verification.
Canonical source, client assets and external data-script roots remain read-only.
