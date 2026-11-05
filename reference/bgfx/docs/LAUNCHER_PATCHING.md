# Tantra-B launcher and patch publishing

Implemented 5 November 2026 for `_client_bgfx`. The normal launch chain is:

```text
Tantra.exe → ZFLauncher.exe
```

Open **Tantra.exe**. It contains both the launcher and patcher: it checks the
signed release, verifies client/runtime files, downloads changed files, displays
notices and enables **Start Game** after success. **File Check** fetches the latest
signed release and checks again. Direct `ZFLauncher.exe` launches are rejected.
The owned `_client_bgfx/Update.exe` is retired; it is no longer built, staged,
packaged or required by the patch feed.

The main window reuses the K2108 updater's original 600×332 background and
normal/pressed button bitmaps, read directly from its PE resources. The original
executable remains untouched. The notice area, five vertically arranged buttons,
status strip and two progress bars follow that skin. Drag the background to move
it; the window starts centered on the monitor under the pointer.

- **Start Game** opens the verified game client.
- **File Check** refreshes and checks the signed release.
- **Web** opens the configured patch site's home page.
- **Options** uses the original dialog's Presets / Graphics / Sound grouping with
  the BGFX game's real settings: Low/Medium/High presets, aspect ratio, resolution
  arrows and custom sizes, windowed/borderless/fullscreen, texture detail, shadows,
  filtering, fog, terrain detail, VSync, colour mode, draw distance, brightness,
  effects/music volume, effects and name visibility. Renderer is Direct3D 11.
  **Connection...** retains the patch address and offline launch controls.
- **Exit** closes the launcher. During patching, it cancels after the current file.

`Start-Offline.cmd` stays inside the client and enters through Tantra.exe. Offline
play does not need the patch server. Ordinary game restarts return to the verified
launcher, which owns the replacement game process. Server Manager also opens
Tantra.exe. The local diagnostic harness retains its explicit verification modes
through the same handoff chain.

## Shared settings and button rendering

The launcher loads and saves the same `GraphicsOptions` and `ClientOptions` types
used in-game. Graphics use the selected profile's `system/Graphics.cfg`; sound
and UI preferences use `client/resource/UI/Interface.sys`, matching the native
client contract. Explicit `--user-data-root` / environment profile selection and
portable-install defaults follow the game. Isolated verification modes retain
their private Interface.sys. No duplicate settings format is introduced.

**Apply** validates and saves for the next game launch. **Cancel** discards the
draft. The launcher is hidden while the game is running; the in-game menu still
applies its settings live. Borderless uses the monitor's desktop resolution;
exclusive fullscreen rejects unavailable modes. Display sizes use actual 32-bit
colour. In-game and launcher presets use the same existing quality values.

`Interface.sys` and `MainUISave.sys` are player preferences, supplied initially
with the client package. New patch feeds exclude them, and File Check preserves
existing copies even when reading an older feed that lists them.

The original button bitmaps already include their captions. Disabled buttons
now draw the bitmap once, without adding a second GDI caption. This fixes the
text overlap during initial checking and subsequent **File Check** operations.

## Original K2108 analysis

The supplied files were inspected statically, including PE imports/resources,
embedded strings and startup disassembly. They were not executed or modified.

| File | Size | Native version | Role |
| --- | ---: | --- | --- |
| `Tantra.exe` | 225,280 bytes | 1.0.0.1, x86 | Bootstrap which checks/downloads the patcher |
| `Update.exe` | 4,571,136 bytes | 1.0.0.1, x86 | Client patcher, notices, options and game start |
| `HTLauncher.exe` | 1,171,456 bytes | 2.1.0.8, x86 | Actual original game client |

The original bootstrap contains `patch.tantra.ph/mainupdate/Patcher.dat` and
`mainupdate/Update.exe`. The patcher contains `UpdateList.dat`, `NotifyMsg.dat`,
the game executable name and an options dialog which writes `HTUserSetting.sys`.
Most of Update.exe's size comes from its approximately 4.23 MB of bitmap resources.
These embedded addresses are historical evidence; no old patch endpoint was contacted.

The original warning comes from `Tantra/HTlauncher/HTLauncher.cpp:84–128`:
two startup tokens are parsed; the first must parse as a nonzero integer, and
the second must match the executable's file version. The exact warning and
conditional branch are present in the K2108 binary at VA `0x100382e6`; its
version-error branch is at `0x10038386`. This check does not inspect the parent
process's filename. The existing K2108 `start.bat` already supplies
`2.1.0.8 2.1.0.8`, explaining why double-clicking the EXE differs from that script.

Our client uses a project-owned handoff rather than the old token format.
The game consumes an inherited, one-use pipe and verifies its actual parent
PID, creation time, expected executable path and role. Only the handoff/acknowledgement
handles are inherited. Launcher-owned jobs contain the client process lifetime.
This is the normal client startup policy; game authentication and server authority
remain separate.

## Current patch deployment

- Web directory: **`C:\xampp\htdocs\patch`**.
- Base URL: **`http://172.16.90.12/patch`**.
- Client configuration: **`_client_bgfx/system/Patcher.cfg`**.
- Apache must be running to check/download online patches.

The configuration contains a public endpoint, not a signing key:

```json
{"schema":1,"url":"http://172.16.90.12/patch"}
```

| Web file/directory | Purpose |
| --- | --- |
| `Patcher.dat` | ECDSA P-256 signed release descriptor, version, expiry and hashes |
| `UpdateList.dat` | Current client/runtime file list for operator inspection |
| `NotifyMsg.dat` | Current UTF-8 patch notices |
| `releases/<version>/` | Immutable list and notices referenced by the signed descriptor |
| `objects/<SHA-256>` | Immutable file payloads, including changed HPKs without extraction |

The `.dat` files use our signed JSON/UTF-8 formats under familiar original names.
The schema-2 descriptor is published last; it has no separate updater payload. The updater checks its compiled trust anchor,
signature, expiry and protected version history, then validates list/notice/payload
hashes. Public patch hosts require HTTPS with normal Windows certificate checks;
HTTP is allowed for localhost and canonical private IPv4 development addresses.
Redirects are refused. The current address is a LAN deployment.

Client/runtime paths are validated, reparse-point escapes and path traversal are
rejected, and downloads are staged before installation. A journal and backups
restore interrupted or failed installs. An installation lock serializes checking/writes and game startup. An unchanged
installation can serve multiple isolated profiles; changing files requires closing
its running games. Source files, SQL, credentials, private signing keys, logs and player saves
are not patch payloads. Native TFX, MP3, cursor and model resource families are
included. `shader-cache.key` is the existing public shader-cache fingerprint,
not a signing credential.

Launcher downloads, backups, rollback journal and the DPAPI version marker live at
`%LOCALAPPDATA%\TantraPatcher\<installation-id>`, outside the client. The patcher
does not write project code or caches into `resource` or `system`.

## Publish the next update

Build/stage the current Release client first, then run:

```powershell
& 'C:\_GitHub\TantraSrc\_remake_bgfx\tools\Publish-Patch.ps1' -Notice "Update notes go here."
```

Optional `-Url` and `-Output` select another endpoint/web directory. The default
publisher reads the staged ownership manifest, native resource tree and runtime
closure, checks hashes, copies missing content-addressed objects and signs a new
monotonic release. It preserves existing releases and local patch configuration
from downloaded game patches. The operator key remains under
`_server_final/private`, outside XAMPP and the client.

Tantra.exe is the combined installed launcher/patcher. It patches the game,
native resources and external runtime, and does not replace its own running EXE.
Launcher upgrades are supplied with a new client installation. No persistent
self-update helper is installed. The package builder includes Tantra.exe,
ZFLauncher.exe and the public patch configuration. Earlier beta ZIPs predate
this implementation and have not been regenerated for this checkpoint.

## Verification

The focused Release batch covers direct-game rejection, the Tantra-to-game
handoff, changed-descriptor rejection, interrupted-install recovery, altered-payload
rejection, valid file installation and idempotent rechecks. The installed-feed
GUI check verifies readiness, disabled original buttons during File Check,
settings Apply/reload/Cancel, resolution validation, aspect and borderless controls,
and native volume persistence in an isolated settings profile. It captures the
original-style launcher and settings dialog. Final
results and release identifiers are in the linked evidence record. No broad
combat/FX test, game login or separate-PC acceptance is part of this checkpoint.

Source: `src/patcher`, `cmake/Patcher.cmake`, `tools/publish-patches.py` and
`tools/verify-patcher*.py`. Evidence:
[launcher/patcher checkpoint](evidence/launcher-patcher-20261105.json).
