# Tantra Online client

Windows x64 OGRE 14.6.1 / Direct3D11 / SDL3 remake of the original HTLauncher.
Original assets remain authoritative; SQLite supports the existing offline mode.

- [Current phase/task plan](planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md)
- [Current progress and next tasks](PROGRESS.md)
- [Documentation index](README.md)
- [Zone01-Zone10 map alignment](planning/ZONE01_ZONE10_MAP_ALIGNMENT.md)
- [Archived reports and previous plans](archive/README.md)

## Build

From C:\_GitHub\TantraSrc:

```powershell
.\build-htlauncher.bat
# Optional: .\build-htlauncher.bat -Configuration Debug -Parallel 4
```

This builds/stages _client/HTLauncher.exe, overwrites the built executable and
preserves userdata. Close a running client first. Required runtime files keep
the original resource/system structure; supplied HPKs retain their paths/bytes.

## Offline

See [offline quickstart](guides/OFFLINE_QUICKSTART.md).
Use ashesh / ashesh for authorized isolated offline acceptance.
Existing offline INTRO/characters, Mandara entry, MainUI, status, movement,
inventory, basic combat and ordinary NPC services have bounded implementations.
Warehouse/save-point/current HPK presentation and broader parity remain open.

## Configure

Use the build helper for the configured local OGRE/SDL3 profile. Manual CMake
configuration, SDK/debug-ABI details and older preparation options are retained
in the [archived setup reference](archive/checkpoints/README_2026-10-25.md).
Current graphics/HPK/staging behavior is in [guides](guides/README.md).
Canonical source/assets/data and dependency paths are listed in the phase plan
and [repository reference catalog](../reference/SOURCE_WORKSPACE_README.md#reference-files-and-paths).

## Documentation and project boundaries

- planning: current tasks, map alignment, acceptance and optimization plans.
- guides: current build/run/configuration and user-facing behavior.
- reference: source formats, lifecycle, rules and technical research.
- archive: superseded roadmaps, dated checkpoints and resolved-fix reports.
- evidence: existing machine-readable records kept at their original paths.

Current client code is under _remake/src; final runtime is _client.
Dedicated C++ server work is separate and remains
[paused](../server/PAUSED_GOAL_PROGRESS.md). This documentation work does
not resume it. No client/server launch or new gameplay implementation occurred.
