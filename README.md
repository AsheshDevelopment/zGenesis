# GENESIS Roadmap

Standalone static website. No Docusaurus, React, Node.js, npm, or build step.

The site uses hash-based navigation for Main, About, Gameplay, Tasks and
Changelogs. The public Roadmap shows only main workstreams and progress bars.
Tasks contains expandable subtask progress, while Changelogs contains
public-safe development summaries. Tasks and Changelogs share one client-side
MD5 password gate. The plain-text password is not stored in the page, but this
gate is only a preview deterrent: static source and restricted content remain
inspectable in a browser. Use server-side authentication for private data.

Deploy the repository root as the `/genesis/` section of the main website.
The site has no build step: copy the tracked files as-is and preserve the
`assets/` directory beside `index.html`. GitHub Pages is not the production
destination.

Roadmap percentages and task details mirror the authoritative project progress
record. Update both together and refresh the evidence-review date whenever a
verified implementation checkpoint changes the public status.
