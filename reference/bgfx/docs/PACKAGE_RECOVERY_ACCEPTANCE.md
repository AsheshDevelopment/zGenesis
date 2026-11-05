# C08 package and recovery — 5 November 2026

The current Release passes package relocation, configuration persistence,
repeated scene/renderer recovery and the complete C08 acceptance collector.
Twelve matched 60-second CPU/GPU trials validate on the named i7-12650H / RTX
4050 Laptop. All six GPU trials meet mean/p95 <=16.667 ms and p99 <=33.334 ms;
worst GPU p95 is 16.430 ms and p99 is 29.834 ms. This accepts the documented
Windows x64/D3D11 scope and leaves the broader game roadmap open.

## Portable output

`C:\_GitHub\TantraSrc\_remake_bgfx\build\distributions\c08-final-20261105`

Keep `client` and its sibling `runtime` together. Open `client/ZFLauncher.exe`
for the signed online profile, or `client/Start-Offline.cmd` for offline play.
The package contains 3,709 manifested payload files (1,127,489,463 bytes), original
HPKs and loose native companions. Profiles and logs remain outside the client.

## Completed checks

- Eleven current component checks pass in each of Debug and Release. Independent
  rendered reducers accept native skinning, opaque instancing and local-light
  application/removal. Both builds have matching seven-shader/cache-key closure.
- The current lifecycle run passes 626 assertions: eight scene generations,
  four renderer retries, actual resize/minimize/restore/focus events, changing
  pooled FX topology, resource retirement, corrupt cache/shader rejection and
  finite audio-owner cleanup.
- Six fresh processes over one disposable profile retain native Interface.sys
  positions and unknown bytes, equipment, five-page quick slots, independent
  effects/music preferences, character isolation and village1/18/19 transitions.
  The native Restart button emits the exact roots used by the next process.
- Another 128 real SDL graphics assertions exercise presets, quality, dimensions,
  window modes, cancellation and native save/read. After that round trip, an
  explicitly edited private Graphics.cfg reloads 1280x800 in a fresh rendered
  Mandara process; the file remains unchanged. Its loading capture confirms the
  actual dimensions.
- The package is copied to a path containing spaces and enters Mandara twice,
  with developer PATH entries removed and development fallbacks disabled. Four
  imported MSVC runtime modules resolve inside the package. No OGRE or shared
  SDL DLL is loaded.
- Locked staging rejects before changing owned files. An isolated native fault
  produces its expected context and minidump. Package hashes, native client
  inputs and the existing default profile remain unchanged.
- Current-executable entry, combat and original merchant/repair captures are
  reused after executable/protected-input hash checks. The service fixture uses
  1600x900 so its ordinary mouse pick is outside the retained chat window; no UI
  hit testing or transaction assertions are bypassed.

The persistence verifiers derive world indices and native quick-slot filenames
from the current signed server list/fixture, preserving its locale status offset.
Cache checks retain all nine native models and available authored animations;
unavailable optional warmup clips are listed explicitly instead of assumed present.

## Evidence

- Current local run: `build/evidence/c08-final2-acceptance-20261105`
- [Collected acceptance](evidence/c08-acceptance-20261105.json)
- [Twelve-trial benchmark and raw-input hashes](evidence/c08-benchmark-20261105.json)
- [Additional graphics persistence](evidence/c08-graphics-persistence-20261105.json)
- [Final package, source and deployment audit](evidence/goal-completion-audit-20261105.json)
- Canonical local matrix: `build/C08_ACCEPTANCE_MATRIX.json`
- Canonical local acceptance: `build/evidence/C08_ACCEPTANCE.json`
- Scene runtime: `build/evidence/c08-final-acceptance-20261105/lifecycle`
- Reused current entry/combat: `build/evidence/c08-current-acceptance-20261105`
- Reused current merchant: `build/evidence/c08-merchant-current2-20261105`
- [Four-zone implementation and content limits](../../_server_cpp/docs/FOUR_ZONE_ACCEPTANCE.md)

To reproduce the complete gate from `_remake_bgfx` with a fresh output:

```powershell
python tools/accept-c08.py --output build/evidence/NEW_C08_RUN
```

The protocol measures twelve 60-second CPU/GPU trials at 1024x768 HIGH with
2048px shadows and VSync off. Application-cache cold/warm differs from OS disk
cache state. CPU trials are reference comparisons, with no blanket speedup claim.
Same-machine relocation and renderer reinitialization do not assert
fresh-OS deployment or forced physical GPU removal. Full original-game fidelity
and the remaining six zones retain separate acceptance gates.
