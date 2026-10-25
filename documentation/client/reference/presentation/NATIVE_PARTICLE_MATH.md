# Native intro particle mathematics

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The source-backed CPU implementation now covers the mode-2 particle path used
by both `intro_MFire` emitters, together with scalar/color curves and vertex
color packing. The selected intro subset is now connected to the application's
FX lifecycle and OGRE drawing. See [runtime evidence and limits](NATIVE_INTRO_FIRE_RUNTIME.md).

## Confirmed native rules

Read-only inspection of the supported `HT3DHeaven.dll` identifies the following:

- Its private CRT random generator uses `state*214013+2531011`, returning the
  high 15 bits. It is separate from HTLauncher's CRT state.
- Startup builds 8192 signed lookup values with
  `(rand()%20000-10000)*0.0001`. A signed lookup later consumes one random word
  and selects `word & 0x1fff`. TFX loading reseeds the word generator using
  `time(NULL)`; it does not rebuild that table.
- Mode 2 builds 256 six-float templates. The first vector is zero; the second
  becomes velocity. The three random samples populate Z, Y, X in that order,
  reflecting legacy constructor-argument evaluation. Each sample is multiplied
  by motion scalar 0 (40 for both fire nodes). Motion scalar 1 (350/150) is not
  used by this mode's template branch.
- Spawning consumes three random words: template index, velocity variation,
  then birth-time variation. The last two calls occur even when variation is
  zero. Selected intro data uses zero variation.
- At default density 1, count 1 emits one particle when
  `now-lastEmission > interval`. Equality does not emit. It emits at most one burst per update and
  assigns `lastEmission=now`; there is no interval-debt catch-up.
- The previous-update value zero is a sentinel that skips integration and
  expiry for that update. New particles join the list before integration and
  receive the same whole update delta as existing particles.
- With an identity-rotation null parent, velocity receives scaled authored
  acceleration before position advances by the updated velocity. For the
  selected fire nodes, acceleration Y is 200/240. A nonzero motion scalar with
  a zero scaled direction instead multiplies velocity by that scalar on each
  update, without delta scaling.
- Particles expire at `age >= lifetime-0.1`, not at lifetime itself.

`HtNativeMode2Emitter` retains native particle units and insertion order. Its current
supported profile is mode 2, count 1, density 1, a stationary identity-rotation
null parent, zero Euler rotation and zero variation. Unsupported profiles fail
explicitly. It exposes an emission switch for the native draining boundary;
the selected looping scheduler and visibility gate live in `HtNativeIntroFire`.
This class isolates the local particle mathematics from the base FX activation
state. Native base activation can also initialize the previous-update timestamp
before reaching this mathematics; the runtime now calls `activate` there. The
zero-sentinel fixture exercises the isolated native branch, not a claim about
every first rendered application frame.

## Curves and color

The native scalar function takes the remainder of `(current-birth)` by lifetime,
then selects a left-inclusive, right-exclusive pair of authored keys whose times
are scaled by lifetime. Exact lifetime therefore wraps to the first key.
Duplicate-time pairs are skipped by that interval selection. Missing intervals
or insufficient keys fail without changing the caller's output.
The native caller supplies each particle's last integrated timestamp as
`current`; it does not substitute the global frame time. That timestamp begins
at zero and changes only when the particle integration pass runs.

The positive-span color path interpolates low serialized byte first, followed
by the next two bytes. It inverts the interpolated high-byte alpha. The emitter
then premultiplies all three returned color lanes by that alpha, rounds each
channel with `value*255+0.5` and packs the vertex color. Treating the stored keys
as ordinary straight ARGB would produce different results.

The CPU port uses float storage and double intermediate curve arithmetic.
Selected semantic cases are verified; x87 last-bit equivalence is unproven.
The initial scalar fallback and undefined/stale native color output on curve
failure are not reproduced as a drawing policy by this component.

## Evidence and verification

`tools/inspect-native-particles.py` pins the original engine SHA-256 and verifies
the expected instructions without executing it. The report at
`docs/evidence/native-particles.txt` records:

| Native RVA | Evidence |
| --- | --- |
| `0x5177D`, `0x3903`, `0x1265A` | Word RNG, signed table construction and lookup |
| `0xF220`, `0x51B42` | Time-based reseeding and Unix-second conversion |
| `0x13C2E`, `0x13CCE` | Mode-2 template values/order and 256-template loop |
| `0x13EAE`, `0x14113`, `0x143CE` | Emission threshold, three random calls, discarded residual |
| `0x14509`, `0x1452C`, `0x14669` | Zero sentinel, early expiry, velocity-before-position |
| `0x1455E` | Zero-direction velocity multiplier |
| `0xCA10`, `0xCA3F` | Scalar phase and interval selection |
| `0xD583`, `0xD6E3`, `0x12A46`, `0x12B4A` | Color lanes, inverted alpha, premultiplication and packing |

2026-10-22: Debug and Release x64 builds pass 54/54 CTest checks. The new
`native_intro_particle_math` fixture uses the two real fire parameter records
and authored curves, plus controlled random inputs for boundary checks. It
checks 768 template random calls, reversed component order, three calls per
emission, interval equality, single-burst stalls, same-update newborn integration,
draining/expiry, velocity multiplication and reversed/inverted/premultiplied
color. An eight-second 30 Hz fixture retains 120/66 emissions for the two
intervals under float timing, rather than smoothing them into a different rate.

Evidence logs: `build-ogre-sdl/particle-math-{release,debug}-build.log`, matching
`*-tests.log`, package logs and runtime smoke logs. The refreshed packages retain
the current intro resource, geometry, gate animation and source-order checks.
Those runtime checks do not establish particle drawing or native visual parity.

## Subsequent integration and remaining work

The [native intro runtime](NATIVE_INTRO_FIRE_RUNTIME.md) now supplies the selected
visibility, queued creation, first activation, looping, absolute clock,
particle/world unit conversion, billboard geometry and OGRE material bridge.
Parent world positions are multiplied by ten before the selected spawn path;
native drawing scales particles and texture extents by 0.1. The local-math
fixtures above intentionally test the emitter in its particle coordinate domain.
Stop/drain scheduling, whole-engine random initialization, other emitter modes,
nonzero variation, moving/rotated parents and full FX behavior remain unfinished.
The original source, assets and data scripts remain read-only.

Located entry points for the next native audit are `0xC2C4` (visibility gate),
`0xE8AD` (base FX update), `0x1277A` (particle presentation), `0x12D70`
(render-object creation), and `0x131E0-0x1353F` (geometry/render states).
Exploratory disassembly is retained under `build-ogre-sdl/particle-*.txt` and
`fx-base-update.txt`; these locations are investigation pointers, not completed
renderer parity evidence.
