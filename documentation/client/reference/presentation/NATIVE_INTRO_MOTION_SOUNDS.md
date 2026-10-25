# Native intro motion sound

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The normal intro now resolves and plays the original gate-monster motion
samples, preserving sound selection and request order. SDL3 decodes the original
IMA ADPCM WAVs; a Windows x64 DirectSound3D adapter receives the native spatial
parameters. The original 32-bit sound DLL is inspected read-only and is never
loaded into the remake.

## Source behavior

`Tantra/HTlauncher/HTEngineHandler.cpp:4121-4182` initializes the three motion
sound IDs to zero for `StartAnimation`. Its monster branch chooses animation
only. Consequently the two initial finite WLK/RUN starts are silent. Adding
footsteps at startup would differ from this source path.

Ordinary `ChangeAnimation` (`4253-4395`) resolves Monster.fx -> FXMon and calls
`HT_dwGetMonsterSoundID` (`13103` onward). WLK, RUN and IDL select their single
authored ID. ATK1/ATK2 choose between the two attack IDs when the second ID is
nonzero, consuming one `rand()%2` call. This decision is based on the second
ID, not the number of nonzero IDs. STD returns zero without consuming RNG.
The outer `HT_dwGetRandomSoundID` has at most one nonzero input in this monster
path and consumes no further random word.

`ChangeMonsterAttackAnimation` (`12022` onward) always consumes `rand()%2`, even
when both sound IDs are zero. Its existing skill-animation lookup and ATK1
fallback remain intact. The previous remake consumed this skill word but omitted
the ordinary ATK2 selection word; the shared launcher RNG now follows both paths.
Sound selection occurs inside the gate scheduling callback, before returning to
the controller's subsequent gate/frame processing.

The shipped engine's skinned `ChangeAnimation` changes the model clock first,
stops the owner's previous indefinite sound, and immediately plays a nonzero
replacement sound. It forwards finite loop counts unchanged. Sound does not wait
for blend promotion or an animation key. Previous finite voices continue
independently. The selected intro motions use one play, except RUN uses two.

## Original resource binding

Map 40100 selects `MONSound_K1.hpk` through the Map record's monster-sound
archive string at offset 684. Monster 2077 selects FXMon 61040. Its native
32-byte record contains the following eight DWORDs:

| Role | ID | MonSound filename |
| --- | --- | --- |
| Attack 1 | 32268 | tiger_att.wav |
| Attack 2 | 32269 | tiger_att2.wav |
| Hit 1 / Hit 2 | 32270 | tiger_hit.wav |
| Walk | 32014 | vas_walk_32014.wav |
| Run | 32015 | vas_Run_32015.wav |
| Idle | 32271 | tiger_idle.wav |
| Die | 32272 | tiger_die.wav |

The importer extracts these seven unique entries from the selected archive.
It uses the HPK body base plus each entry offset and validates RIFF/WAVE headers.
It does not switch to similarly named files in the K2 archive. The WAVs remain
unchanged derived copies of the canonical archive payloads.

CMake stages them into `derived-assets/sounds`, and packages contain `sounds/`.
Each derived payload has its source-container hash, entry name, importer identity
and ClientRes binding-catalog hash in provenance. `--sound-root` and
`TANTRA_SOUND_ROOT` can override the source-backed cache; a packaged executable
uses its adjacent `sounds` folder by default.

## Audio boundary

The native manager subtracts camera position and applies inverse camera rotation
before forwarding the sample position. The adapter retains source units and
source camera axes. At the final LOGIN camera, the two offsets are
`(-122,-45,366)` and `(122,-45,366)`. It does not substitute rendered mesh bounds,
multiply by monster scale or apply OGRE's world-unit conversion to audio.

Read-only HTSound inspection confirms minimum sample distance 20, per-resource
default maximum distance 200 and default sample volume 0.5. The new adapter
forwards those distances and converts the linear volume into the output API's
hundredths-of-decibels representation. Its listener is at the origin, with +Z
forward and +Y up, because requests already carry camera-relative positions.

SDL3 loads each selected WAV once into a PCM cache. The selected default SDL3
decoder ignores the WAV fact chunk; several supplied files contain fact counts
that differ from their complete IMA blocks. CPU fixtures verify the resulting
sample counts. This establishes the chosen decoder behavior, not a comparison
against Miles' decoded output.

Finite repetitions are concatenated in one output buffer. This lets the audio
device finish both requested plays even during a slow render frame. Indefinite
voices are tracked by owner and can be stopped on replacement without stopping
finite voices. Shutdown releases all voices, decoded data and device handles.
Missing samples or device failures emit diagnostics; they do not prevent normal
renderer startup. Explicit audio muting also mutes these samples.

DirectSound3D accepts mono sources and provides spatial parameter controls;
see Microsoft's [3D buffer documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ee416765(v=vs.85))
and [distance documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ee418662(v=vs.85)).
This replacement backend does not establish Miles rolloff, reverb, gain,
latency, channel mixing or acoustic bit parity. The general moving/infinite
sample culling and update paths also remain unfinished; current runtime
integration covers the static finite intro requests.

## Evidence and verification

`tools/inspect-native-motion-sounds.py` pins both original DLL hashes and checks
the relevant instructions without executing them. Its output is
[native-motion-sounds.txt](../../evidence/native-motion-sounds.txt).

| Native code | Evidence |
| --- | --- |
| HT3DHeaven 0x25C6B | StartAnimation's nonzero-sound immediate one-play branch |
| HT3DHeaven 0x23439 | Stop owner's previous indefinite sound |
| HT3DHeaven 0x23454 | Immediate finite loop-count forwarding and offset lookup |
| HT3DHeaven 0x2872 | Position subtraction followed by inverse camera rotation |
| HTSound 0x167B | Resource maximum distance 200 |
| HTSound 0x1584 | Minimum 20; volume, loops and position forwarding before start |
| HTSound 0x330A | Default sample and stream volume 0.5 |

The new CPU checks exercise the real catalog, missing-binding rejection,
distinct ordinary/skill RNG rules, source camera offsets and all seven original
WAV decodes. The standalone `sample_audio_probe <sounds> --backend` checks actual
output-buffer sizes, positions, distances, volume, two-play completion,
indefinite owner replacement and release.

`tools/verify-intro-motion-sounds.ps1 -PackageRoot <package>` runs the normal intro
for 240 deterministic updates with a controlled valid RNG stream selecting
ATK2. It requires two sound starts with ID 32269, plus actual buffer-parameter
readback immediately after each request. Finite audio may finish before the end
of the render fixture; completion is checked separately by the backend probe.
The production path continues using the shared launcher `std::rand` stream.

2026-10-22: Release and Debug x64 each pass 57/57 CTest checks. Both configurations
also pass the original-WAV hardware-buffer probe, package hash/provenance checks,
muted general runtime smoke and the integrated intro motion-sound test. The new
seven archive entries bring derived provenance to 89 rows. Logs are under
`build-ogre-sdl/motion-sound-{release,debug}-build.log`, matching `*-tests.log`,
`*-backend.log`, `*-package-verify.log`, `*-runtime.log` and `*-runtime-audio.log`.

The full implementation plan remains active. Interactive UI, later client states,
general effects/audio behavior and complete original-client fidelity still need
implementation and verification. No canonical source/assets/data were changed,
and no commit or push was requested or performed.
