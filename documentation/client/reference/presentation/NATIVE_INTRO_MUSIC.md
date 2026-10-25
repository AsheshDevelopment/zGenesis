# Native intro music sequence

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
Normal startup now resolves BGM 30015 through the original `ClientRes.txl`
and starts its stream before presenting the logo. This deployed catalog maps
30015 to `resource/sound/Japan_Battle_Final.mp3`. The old hard-coded
`tantra_intro.mp3` path and later startup position were incorrect for the
provided source/catalog combination.

## Source contract

- `HTIntroManager.cpp:203-206`: initialization first requests intro UI resources.
- `HTLoading.cpp:45-60`: load intro UI, load sound data once, start the stream
  service, then call `HT_hrPlayIntroBGM`.
- `HTEngineHandler.cpp:11974-11996`: consume `rand()%2`; both branches select
  30015; resolve its filename, load a stream and call `PlaySound(id,2)`.
- `HTEngineHandler.cpp:199,9789-9793`: stream volume starts at 0.5 and is set
  when stream playback is enabled.
- `HTSound.dll` RVA `0x3441-0x3465`: the sound wrapper forwards the loop count
  unchanged to `AIL_set_stream_loop_count`, then supplies the stream volume to
  both channels. Read-only, hash-pinned inspection is reproducible with
  `tools/inspect-native-intro-audio.py`; its output is
  `docs/evidence/native-intro-audio.txt`. No original DLL is executed.

The otherwise redundant RNG call is retained even with an explicit mute
override, because it changes later random gate-animation choices. The selected
track is not inferred from its name or from the map configuration's BGM ID.

## Implementation

`HtIntroMusic` resolves the original catalog binding and retains one RNG call,
two plays and the constructor's stream volume. Normal application startup emits
`INTRO_MUSIC_SELECTED`, then starts playback before `INTRO_LOGO_PRESENTED`.
Playback is enabled by default for normal startup; `--audio 0` or
`TANTRA_ENABLE_AUDIO=0` explicitly mutes it. Gallery/diagnostic modes default to
disabled audio. A missing catalog track is a resource error. Backend open/play
failures are explicit warnings and remain failures in the audio runtime verifier.

`HtAudioService` continues using the modern Windows multimedia backend for MP3
decoding/playback; OGRE and SDL3 remain the renderer/window/event-loop stack.
Positive stream counts now finish after the requested number of passes;
zero repeats indefinitely. The update loop queries actual backend completion
and restarts a finite stream only while another pass remains. Stop, disable
and destruction close only the service's own unique stream alias. Previously,
every request repeated forever and all instances shared one global alias.

## Verification

2026-10-22: both x64 configurations build and pass 52/52 CTest checks. The new
`native_intro_music_binding` fixture verifies the deployed ID/filename, both
RNG branches, one consumed RNG call and missing-binding rejection. Existing
audio failure checks cover disabled/missing files and invalid loop/volume input.
Both packages pass provenance verification and general runtime smoke, including
the music-selection-before-logo trace while explicitly muted.

`tools/verify-intro-audio-runtime.ps1` separately exercises the real audio backend
for both configurations. It uses FFmpeg to derive a 0.2-second MP3 fixture from
the canonical track into the build directory, then verifies two actual backend
completions, stream isolation and disable/stop behavior. It also opens the
unmodified full original MP3, and launches the packaged normal intro with audio
enabled to require:

1. `INTRO_MUSIC_SELECTED`.
2. `INTRO_MUSIC_STARTED`.
3. `INTRO_LOGO_PRESENTED`.
4. `INTRO_MUSIC_RUNTIME_VERIFIED` after normal frame updates.

Run from `_remake`:

```powershell
./tools/verify-intro-audio-runtime.ps1 -BuildRoot ./build-ogre-sdl/Release -PackageRoot ./package/x64/Release
```

The dedicated verifier needs FFmpeg and a working Windows multimedia backend;
ordinary CTest does not require an audio output device. Evidence:
`build-ogre-sdl/intro-music-{release,debug}-build.log`, corresponding `*-tests.log`,
`intro-music-runtime-{release,debug}.log`, runtime smoke and package verification
logs, plus `TantraRemakeAudioDiagnostics.tsv` in each package.

## Remaining fidelity limits

This implements the normal-start BGM subset. Motion sounds, TAB sound cue timing,
3D attenuation, sample mixing, source master-volume handling, BGM fade/replacement,
later stop/restart events and audio settings UI remain incomplete. MCI polling
does not establish Miles gapless-loop, latency or acoustic parity. Runtime
checks prove backend state and completion; they do not measure audible output.
The full original 214.8-second track (measured with FFprobe) was opened and observed playing, rather
than waiting through two complete full-length passes. The original assets and
source files remain read-only.
