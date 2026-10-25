# Loading after character selection: resource-name lookup repair

Updated: 2026-10-25. This repair follows the reported loading-screen wait; the
broader client implementation goal remains paused.

## Evidence and limits

The latest observed process was PID 17848 at
`C:\_GitHub\TantraSrc\_client\HTLauncher.exe`. This folder had already received
launcher SHA256 `3ebc43ae3569b554f246cfe394451716edad592ab70ffb0e3d9adf5d26b5056d`.
This report therefore applies to the bounded-loading build, rather than the
older `2793be42...` executable in the earlier hang events.

The session journal progressed through nearby monster uploads at cell 482,334.
Repeated Vasabhum/Vasabhum Caura BEGIN/END entries were roughly two to three
seconds apart. The loading gate waits for that initial population; it exposed
the remaining creation cost instead of removing it. The process closed before
a non-invasive debugger attach completed (Win32 error 87), so there is no live
stack proving a deadlock or establishing the entire stall's cause.

## Changes

- `_remake/src/rendering/OgreBackend/OgreBackend.cpp` now uses
  `_remake/src/resources/ResourceNameLookup.h` for texture-name fallback.
  Exact OGRE resolution still wins. Case-insensitive fallback and misses reuse
  one catalog index for the registered root set. Adding a root or shutting down
  invalidates that index. Resource files are a session snapshot; live content
  replacement/versioned invalidation remains a separate unfinished task.
- `_remake/src/rendering/OgreBackend/NativeHpkArchive.h` replaces quadratic
  duplicate searches in name and metadata listings with indexed merging.
  It preserves original order, exact-string deduplication and packed metadata
  precedence. Direct HPK reads and original folder paths remain unchanged.
- `_remake/src/app/tantra_remake_main.cpp` adds `elapsed_ms` to flushed initial
  actor-upload END journal entries. The existing two-object/soft-four-ms queue
  and native camera sequence remain in place. A single upload is synchronous.

## Verification

A CPU fixture compares listings against the previous merge algorithm and checks
exact lookup priority, case-folded duplicates, cached misses and invalidation.
On the tested deployed root, the before/after catalog had exactly 12,394 entries
and the same ordered-name FNV64 value, `22220098663267164`.

One local listing sample changed from 99,837 to 6,713 microseconds; metadata
listing changed from 111,962 to 10,882 microseconds. These are isolated CPU
catalog observations, not cold/warm game-loading measurements or an FPS claim.
Fifty-one repeated misses perform one fallback enumeration in the new helper.

Targeted actor-loading/camera checks and the native HPK round-trip fixture also
pass. The latter checks all 148 packs, 293 sampled payloads, 323 Mandara models,
142 UI images, 40 alpha textures and 53 WAV decodes without graphics/audio devices.
Exact build/static results and deployment hashes are in
[the evidence](../evidence/resource-lookup-loading-20261025.json).

The incomplete item-feedback work is shelved separately under the ignored local
`.migration-local/item-feedback-wip-20261025` directory, with a restore patch and
byte-exact file copies. It is not part of this build. Its failing TPA check needs
serialization/layout investigation before that work can be resumed or deployed.

## Remaining acceptance

- [ ] Accept loading, movement and camera responsiveness in one offline process,
  first channel, ashesh / ashesh. No new client was launched for this repair.
- [ ] If another wait occurs, leave that process open for a stack capture and
  retain its upload-duration journal. Do not start another channel automatically.
- [ ] Complete the pending warehouse/save-point/SQLite route and measure real
  frame times, upload stalls and loading costs. The whole loading phase is open.
