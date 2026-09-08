# GENESIS Roadmap

Standalone static website. No Docusaurus, React, Node.js, npm, or build step.

The site uses hash-based navigation for Main, About, Gameplay and Tasks. The
Tasks page presents the roadmap workstreams as progress bars with expandable
subtask progress, behind a client-side MD5 password gate. The plain-text
password is not stored in the page, but this gate is only a preview deterrent:
static website source and restricted content remain inspectable in a browser.
Use server-side authentication for private data.

Publish the repository root with GitHub Pages.
