# Documentation submodule folder rename

Date: 2026-10-26.

The active parent checkout is `C:\_GitHub\tantra-dev-main`. Its documentation
submodule now lives at `dev-docs`, alongside `_client`, `_server`, `_remake` and
`_references`. The logical submodule section is also named `dev-docs`.
The remote remains `https://github.com/Tantra-Development/dev-docs.git`.

The folder was moved with Git, preserving its worktree, history and all 271
existing documentation/roadmap files byte-for-byte at the move boundary. Git's
local metadata can retain `.git/modules/docs`; its worktree pointer is updated
and the registered checkout path is `dev-docs`.

The client packaging/sky-inspection scripts and 16 server evidence writers now
use `dev-docs/client` or `dev-docs/server`. This is a path migration; the paused
server implementation goal is unchanged. Existing dated import/evidence files
retain their historical paths.

The [static roadmap](../_roadmap/index.html) lives under `dev-docs/_roadmap`.
Its Tantra-O/Tantra-B snapshot and source hashes are portable within this
submodule. See [roadmap setup](../_roadmap/README.md).

Fresh checkouts continue to use `git clone --recurse-submodules` and the parent
`.gitmodules`; the subsequent remote repository rename is recorded in [repository rename](DEV_DOCS_REPOSITORY_RENAME.md).
