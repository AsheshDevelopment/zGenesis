# Build inputs after migration

No old CMake cache/build tree was imported. Configure fresh build directories.
Initialize recursive submodules and Git LFS before building.

## Client

Run the parent build-htlauncher.bat. Supply -SourceClientDirectory or set
TANTRA_CLIENT_ROOT for original client assets. The migration workstation retains
C:/_GitHub/TantraSrc/TantraClient as that read-only external source.

Authoring data remains B:/__TANTRA/TantraDataScripts; original deployed zone
input remains E:/Global-server. Imported zones live in _server/zones.
Original native C++ source is now _references/Tantra.

OGRE remains external. Set OGRE_DIR for the supplied SDK/custom installation;
the previous SDK/build tree was not copied into Git. SDL3 source is pinned.

## Server

Run _server/tools/Build-Server.ps1. Its preset builds in _server/build and
acquires/verifies pinned source dependencies. Fetch LFS map payloads first.

The gameplay goal remains paused. Migration configure/build/CPU checks are
separate from the interrupted Debug acceptance and unapproved runtime retries.
No game/zone launch is implied by this migration.
