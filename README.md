# Tantra Online roadmaps

Standalone website for **Tantra-O** (OGRE / HTLauncher) and **Tantra-B** (bgfx /
ZFLauncher). Tantra-O is the default page. Design follows the supplied local
zGenesis reference: charcoal/coral colours, large hero, progress bars and
expandable workstreams. Version: 1.0.10.

Open `index.html`, or serve this repository root with Python's HTTP server.
Use `#tantra-o` and `#tantra-b` for each roadmap. Tasks and Changelogs retain the
selected project and have explicit OGRE/bgfx selectors. No npm/build step,
external scripts or game binaries are required. Asset and documentation links
work both at a domain root and under a website subdirectory.

`documentation/` contains the source documentation snapshot; `reference/bgfx/`
contains the separate bgfx plan/progress snapshot. Checked task coverage is not
release readiness. Full phase acceptance remains visible and separate.

## Refresh Tantra-B only

Run `python tools/zf-refresh-bgfx.py --bgfx-root C:\_GitHub\TantraSrc\_remake_bgfx`.
It regenerates Tantra-B tasks from its source plan and preserves Tantra-O and
all bundled OGRE documentation. Run the checks below before committing.

## Refresh from the documentation repository

Run `dev-docs/_roadmap/tools/export-roadmap.py --output A:\zEngineK2\zGenesis`
from the documentation checkout. The exporter preserves Git metadata and unknown
files, backs up replaced files outside this repository and removes only old
site files or files recorded in the previous export manifest. Do not edit the
generated task data directly. Source hashes and export metadata are recorded.

## Verify

```powershell
node --check assets/roadmap.js
node tools/zf-check-roadmap.cjs
node tools/zf-check-rendered-content.cjs
```

These checks cover source hashes, both project lists, routes, search, filters
and expandable task content with a CPU DOM adapter. They do not establish visual
browser acceptance. The latest browser connection attempt failed before a tab
opened; no game, renderer or audio device was launched for website checks.

Publishing the Git repository does not itself prove deployment to the production
website. Preserve the destination website's deployment configuration.

## GitHub Pages

Publish branch `main`, folder `/ (root)`. Keep the generated `.nojekyll` file:
the HTML/CSS/JavaScript is ready to serve, and bundled reference Markdown must
retain its original bytes. Jekyll otherwise attempts to render these documents
and fails on legacy encodings. The repository project URL is case-sensitive:
https://asheshdevelopment.github.io/zGenesis/
