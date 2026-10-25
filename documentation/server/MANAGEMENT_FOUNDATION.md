# Native C++ management foundation

Verified 2026-10-24. The complete server plan remains unfinished.
This is the historical M1 checkpoint. The newer [SQLDMN persistence](SQLDMN_PERSISTENCE.md)
implements authoritative storage and operator tools beyond the boundary described below.

Three C++ Windows x64 executables build in Debug and Release. Packaged Release
binaries are in `bin/`, with third-party licenses. The non-interactive BAT build
route and PowerShell packaging script both run successfully.

The Common Controls v6 Win32 manager renders a central list of five shared-service
roles and ten zones. One GUI process was opened, captured and closed without
starting workers. The executable embeds the exact supplied ICO image and the
Per-Monitor V2/Common Controls manifest. Initial capture is at 96 DPI; mixed-DPI,
all keyboard workflows and interactive failure-path acceptance remain open.

Implemented controls include Start/Stop Server, selected process actions, Add Zone,
filtering, profile/native-settings tabs and bounded process logs. The background
controller has bounded commands/snapshots and at most four concurrent status
requests per poll batch. Only owned Windows process handles/Job Objects can be
stopped. Startup checks identity/admin readiness before proceeding; game readiness
is separate. Full zone/dependency failure and restart acceptance remains open.

The CPU suite imports twelve synthetic native profiles to establish that discovery
is not capped at ten. It checks duplicate/wildcard endpoint rejection, source hash
preservation, instance locks, stopped-only edits, unknown INI text, invalid native
datasets and atomic replacement. The real Zone01-Zone10 datasets also pass structural
IDX/TCM and identity validation. Fifty source/copy hashes are independently checked.
Zone08 retains its original WorldSettings with the recorded leading-character repair.

One isolated SQLDMN administration process per lifecycle check verifies wrong
world/token rejection, unowned shutdown rejection, graceful exit and clean operational
SQLite history. The final Release check also leaves an incomplete client request
pending during shutdown to cover asynchronous-session lifetime. No zone/game-client
process was started. A dataset CLI invocation imports/validates files and exits;
it does not start a zone listener.

**The operational SQLite stores process history only.** Authoritative account,
character, cargo and session persistence, native game networking, online OGRE
integration and gameplay remain to be implemented. DBSRV, MSGSRV, CHATSRV and
ITMSRV are explicitly unavailable. Current workers report `game_ready=false`.

Evidence: [foundation.json](evidence/foundation.json). GUI capture:
`build/ui-smoke/manager.bmp`; GUI metadata: `build/ui-smoke/manager-ui.json`.
Build/test logs are retained at the project root and under `build/Testing/`.
The evidence verifier inspects PE architecture/resources, source/copy/client hashes,
GUI metadata and successful test logs; it launches no processes.

Next implement M2's authoritative SQLDMN schema/credentials/ownership and DBSRV
transport, then connect the existing engine-independent C++ rules and OGRE frontend.
The full milestone checklist is [IMPLEMENTATION_PROGRESS.md](IMPLEMENTATION_PROGRESS.md).
