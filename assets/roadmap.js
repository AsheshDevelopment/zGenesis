(() => {
  "use strict";
  const data = window.TANTRA_ROADMAP;
  const routes = ["tantra-o", "tantra-b", "about", "gameplay", "tasks", "changelogs"];
  const state = { project: "tantra-o" };
  function route(hash, fallback = "tantra-o") {
    const [rawName, query = ""] = String(hash || "").replace(/^#/, "").split("?");
    const name = rawName.toLowerCase();
    const params = new URLSearchParams(query);
    const project = ["tantra-o", "tantra-b"].includes(params.get("project")) ? params.get("project") : fallback;
    return { page: routes.includes(name) ? name : "tantra-o", project: name === "tantra-b" ? "tantra-b" : name === "tantra-o" ? "tantra-o" : project };
  }
  function filteredGroups(project, query = "", status = "all") {
    const search = query.trim().toLocaleLowerCase();
    return project.groups.map(group => ({ ...group, tasks: group.tasks.filter(task => {
      if (status === "done" && !task.done || status === "open" && task.done) return false;
      return !search || [group.id, group.title, task.id, task.text, ...task.children.map(child => child.text)].join(" ").toLocaleLowerCase().includes(search);
    }) })).filter(group => group.tasks.length);
  }
  // Pure view model is exposed for buildless checks; no browser persistence edits task status.
  window.TantraRoadmapModel = { route, filteredGroups };
  const el = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = String(value);
    return node;
  };
  const link = (label, href, className) => { const node = el("a", className, label); node.href = href; return node; };
  const projectById = id => data.projects.find(project => project.id === id) || data.projects[0];
  function bar(percent, label) {
    const node = el("div", "bar"); node.setAttribute("role", "progressbar");
    node.setAttribute("aria-valuemin", "0"); node.setAttribute("aria-valuemax", "100"); node.setAttribute("aria-valuenow", String(percent)); node.setAttribute("aria-label", label);
    const fill = el("span"); fill.style.setProperty("--progress", `${percent}%`); node.append(fill); return node;
  }
  function switcher(page, selected) {
    const node = el("div", "project-switch"); node.setAttribute("aria-label", "Roadmap project");
    data.projects.forEach(project => { const item = link(`${project.name} · ${project.id === "tantra-o" ? "OGRE" : "bgfx"}`, `#${page}?project=${project.id}`); item.setAttribute("aria-current", String(project.id === selected)); node.append(item); }); return node;
  }
  function heading(parent, kicker, title, copy) {
    const section = el("section", "page-heading wrap"); section.append(el("div", "eyebrow", kicker), el("h1", "", title), el("p", "", copy)); parent.append(section); return section;
  }
  function list(title, values) {
    const node = el("div"); node.append(el("h3", "", title)); const ul = el("ul"); values.forEach(value => ul.append(el("li", "", value))); node.append(ul); return node;
  }
  function projectPage(project) {
    const page = document.getElementById(`page-${project.id}`); page.replaceChildren();
    const hero = el("section", "hero"); const wrap = el("div", "wrap");
    const projects = el("nav", "project-navigation"); projects.setAttribute("aria-label", "Choose client roadmap");
    data.projects.forEach(entry => { const item = link("", `#${entry.id}`, "project-choice"); item.setAttribute("aria-current", entry.id === project.id ? "page" : "false");
      item.append(el("span", "project-choice-name", entry.name), el("span", "project-choice-engine", entry.id === "tantra-o" ? "OGRE · HTLauncher" : "bgfx · ZFLauncher"), el("span", "project-choice-progress", `${entry.done}/${entry.total} tasks · ${entry.percent}%`)); projects.append(item); }); wrap.append(projects);
    wrap.append(el("div", "eyebrow", "Tantra Online · Client development roadmap"), el("h1", "", project.name), el("div", "chapter", project.engine), el("p", "lead", project.lead), el("p", "hero-copy", project.description));
    const actions = el("div", "actions"); actions.append(link(`${project.name} tasks`, `#tasks?project=${project.id}`, "button-link"), link("Read implementation plan ↗", project.plan, "text-link")); wrap.append(actions);
    const meta = el("div", "meta"); [["Current stage", project.stage], ["Client", project.launcher], ["Review policy", "Evidence before acceptance"]].forEach(([name, value]) => { const cell = el("div"); cell.append(el("span", "", name), el("strong", "", value)); meta.append(cell); }); wrap.append(meta); hero.append(wrap); page.append(hero);
    const readiness = el("section", "readiness wrap"); readiness.append(el("div", "kicker", "Recorded implementation progress"));
    const overall = el("div", "overall"); const number = el("div", "overall-number", project.percent); number.append(el("small", "", "%"));
    const copy = el("div", "overall-copy"); copy.append(el("h2", "", "Checked plan tasks"), bar(project.percent, `${project.name} checked task coverage`));
    const scale = el("div", "scale"); scale.append(el("span", "", `${project.done} checked / ${project.total} named tasks`), el("span", "", "Source checklist")); copy.append(scale); overall.append(number, copy); readiness.append(overall);
    readiness.append(el("p", "note", "This percentage counts checked top-level tasks, not production readiness. Nested subtasks and acceptance gates remain separate. The two projects use different checklists."));
    const stats = el("div", "stats"); [[project.groups.length, project.id === "tantra-o" ? "Plan phases" : "Delivery checkpoints"], [`${project.accepted}/${project.groups.length}`, "Accepted gates"], ["10", "Target zones"], ["x64", "Windows client"]].forEach(([value, name]) => { const item = el("div", "stat"); item.append(el("strong", "", value), el("span", "", name)); stats.append(item); }); readiness.append(stats); page.append(readiness);
    const dashboard = el("section", "section wrap"); const head = el("div", "section-head"); const title = el("div"); title.append(el("div", "kicker", "Workstreams"), el("h2", "", "Roadmap")); head.append(title, el("p", "", "Select a workstream to see completed and remaining tasks. Every phase keeps its own acceptance gate. The Tasks page adds search and status filters.")); dashboard.append(head);
    project.groups.forEach(group => {
      const details = el("details", "workstream"); const summary = el("summary"); const body = el("div", "workstream-main");
      const row = el("div", "stream-row"); const label = el("span", "stream-title"); label.append(el("b", "symbol", "◆"), document.createTextNode(group.title));
      row.append(label, el("span", "stream-pct", `${group.percent}%`)); body.append(row, bar(group.percent, `${group.id} checked task coverage`));
      const meta = el("div", "stream-meta"); meta.append(el("span", "", `${group.done}/${group.total} tasks checked`), el("span", `gate${group.gate?.done ? " accepted" : ""}`, group.gate?.done ? "Minimum gate recorded as accepted" : "Acceptance remains open")); body.append(meta);
      summary.append(el("span", "stream-number", group.id), body, el("span", "expand-mark", "+")); details.append(summary);
      const content = el("div", "workstream-content"); group.tasks.forEach(task => content.append(taskNode(task)));
      if (group.gate) content.append(el("div", "gate-note", `${group.gate.done ? "☑" : "☐"} ${group.gate.id} · ${group.gate.text}`)); details.append(content); dashboard.append(details);
    }); dashboard.append(link("View all tasks →", `#tasks?project=${project.id}`, "button-link")); page.append(dashboard);
    const editorial = el("section", "editorial"); const columns = el("div", "wrap columns"); columns.append(list("Implemented foundations", project.foundations), list("Next acceptance and implementation", project.next)); editorial.append(columns); page.append(editorial);
  }
  function taskNode(task) {
    const row = el("article", `task${task.done ? " completed" : ""}`); const head = el("div", "task-heading");
    const check = document.createElement("input"); check.type = "checkbox"; check.checked = task.done; check.disabled = true; check.setAttribute("aria-label", `${task.id}: ${task.done ? "checked in source plan" : "open in source plan"}`);
    const text = el("div"); text.append(el("span", "task-id", task.id), el("p", "", task.text)); head.append(check, text); row.append(head);
    if (task.children.length) { const ul = el("ul", "task-children"); task.children.forEach(child => { const li = el("li"); li.append(el("span", "check", child.done ? "☑" : "☐"), el("span", "", child.text)); ul.append(li); }); row.append(ul); } return row;
  }
  function tasksPage(project) {
    const page = document.getElementById("page-tasks"); page.replaceChildren();
    const head = heading(page, `${project.name} · Implementation checklist`, "Tasks", "Expand a workstream to inspect implemented and remaining work. Check states come from the source plan; this page does not change project status."); head.append(switcher("tasks", project.id));
    const body = el("section", "wrap section"); const toolbar = el("div", "toolbar"); const search = document.createElement("input"); search.type = "search"; search.placeholder = "Search tasks, IDs or systems…"; search.setAttribute("aria-label", "Search roadmap tasks");
    const select = document.createElement("select"); select.setAttribute("aria-label", "Filter task status"); [["all", "All tasks"], ["open", "Remaining tasks"], ["done", "Checked tasks"]].forEach(([value, name]) => { const option = el("option", "", name); option.value = value; select.append(option); });
    const buttons = el("div", "toolbar-buttons"); const expand = el("button", "", "Expand all"), collapse = el("button", "", "Collapse all"); expand.type = collapse.type = "button"; buttons.append(expand, collapse); toolbar.append(search, select, buttons);
    const count = el("p"); count.id = "task-result-count"; count.setAttribute("role", "status"); const results = el("div"); results.id = "task-results"; body.append(toolbar, count, results, el("p", "note", "The status filter applies to named parent tasks. Nested subtask checks retain their own recorded status."), link("Read source plan ↗", project.plan, "text-link")); page.append(body);
    function render() {
      results.replaceChildren(); const groups = filteredGroups(project, search.value, select.value); const total = groups.reduce((sum, group) => sum + group.tasks.length, 0); count.textContent = `${total} of ${project.total} tasks · ${groups.length} workstreams · ${project.name}`;
      groups.forEach(group => {
        const details = el("details", "task-phase"); if (search.value.trim()) details.open = true;
        const summary = el("summary"); const middle = el("div"); const row = el("div", "stream-row"); row.append(el("span", "stream-title", group.title), el("span", "stream-pct", `${group.percent}%`)); middle.append(row, bar(group.percent, `${group.id} total task coverage`)); summary.append(el("span", "stream-number", group.id), middle, el("span", "expand-mark", "+")); details.append(summary);
        const content = el("div", "task-body"); group.tasks.forEach(task => content.append(taskNode(task))); if (group.gate) content.append(el("div", "gate-note", `${group.gate.done ? "☑" : "☐"} ${group.gate.id} · ${group.gate.text}`)); details.append(content); results.append(details);
      });
      if (!total) results.append(el("p", "empty", "No tasks match. Try another term or status filter."));
    }
    search.addEventListener("input", render); select.addEventListener("change", render); expand.addEventListener("click", () => results.querySelectorAll("details").forEach(node => node.open = true)); collapse.addEventListener("click", () => results.querySelectorAll("details").forEach(node => node.open = false)); render();
  }
  function changelogPage(project) {
    const page = document.getElementById("page-changelogs"); page.replaceChildren(); const head = heading(page, `${project.name} · Recorded checkpoints`, "Changelogs", "Implementation summaries retain their original verification scope. A rebuilt executable does not inherit an older runtime pass."); head.append(switcher("changelogs", project.id));
    const list = el("section", "wrap section"); project.changes.forEach(change => { const item = el("article", "log-entry"); const head = el("header"); const date = el("time", "", change.date); date.dateTime = change.date; head.append(el("h3", "", change.title), date); item.append(head, el("p", "", change.text)); list.append(item); }); list.append(link("Read full progress record ↗", project.progress, "button-link")); page.append(list);
  }
  function aboutPage() {
    const page = document.getElementById("page-about"); heading(page, "Two renderers · One original experience", "About", "Tantra Online is being rebuilt around its original resources, lifecycle and gameplay rules. The two clients have separate implementations and acceptance records.");
    const body = el("section", "wrap section prose"); body.append(el("h2", "", "Tantra-O and Tantra-B"), el("p", "", "Tantra-O is the OGRE/SDL3 HTLauncher remake. Tantra-B is the bgfx/SDL3 ZFLauncher remake. Both target Windows x64 and preserve original resource identities, native animation timing, UI behavior and offline SQLite persistence."), el("h2", "", "How progress is counted"), el("p", "", data.method), el("p", "", "A checked implementation task can still have bounded evidence or pending visual acceptance. The acceptance gate for each phase/checkpoint is tracked independently. These percentages are not an FPS benchmark or a guarantee of complete gameplay."), el("h2", "", "Source and review"), el("p", "", "The OGRE view is generated from the central client implementation plan. The bgfx view uses a dated copy of its own plan and progress record, retained here so the site stays portable. Refresh both alongside implementation changes."));
    const links = el("ul"); data.projects.forEach(project => { const li = el("li"); li.append(link(`${project.name} implementation plan`, project.plan), document.createTextNode(" · "), link("progress", project.progress)); links.append(li); }); body.append(links, link("Snapshot and source hashes", "snapshot.json"), el("h2", "", "Project boundaries"), el("p", "", "The native C++ server-manager effort has its own plan. Real game transport and multiplayer must be accepted with the server; offline client behavior is not online readiness."), link("Server progress ↗", "documentation/server/IMPLEMENTATION_PROGRESS.md")); page.append(body);
  }
  function gameplayPage() {
    const page = document.getElementById("page-gameplay"); heading(page, "Native systems · World acceptance", "Gameplay", "The first playable route is INTRO → character selection → CHAR_INIT → Mandara1st. System and zone acceptance remain separate from resource availability.");
    const body = el("section", "wrap section"); const columns = el("div", "columns editorial"); columns.append(list("Offline foundations", ["Original login, character creation, selection and deletion","Movement, camera, actors, inventory and equipment","Ordinary merchant, repair, warehouse and save-point services","Skills, native animation events, effects and progression work"]), list("Remaining full-game scope", ["Complete skills, monster AI, loot and combat progression","Quests, refinement and advanced NPC callbacks","Travel, remaining resurrection paths and ten-zone acceptance","Authoritative online chat, parties, trade, guilds and PvP/events"])); body.append(columns, el("h2", "", "Zone01–Zone10"), el("p", "note", "Catalog bindings and core preflight do not establish playable-zone acceptance. Zone10 uses MAP_NewKruma.cfg with the Jina4th asset folder."));
    const scroll = el("div", "table-wrap"); const table = el("table"); const thead = el("thead"), header = el("tr"); ["Zone", "Client map", "Native destination", "Full acceptance"].forEach(value => header.append(el("th", "", value))); thead.append(header); const tbody = el("tbody"); data.zones.forEach(zone => { const row = el("tr"); [zone.zone, zone.map, zone.name, "Open"].forEach(value => row.append(el("td", "", value))); tbody.append(row); }); table.append(thead, tbody); scroll.append(table); body.append(scroll, el("p", "note", "Individual Mandara service or entry checks remain credited in each project's task board. Every full-zone gate above stays open."), link("Native zone alignment and missing dependencies ↗", "documentation/client/planning/ZONE01_ZONE10_MAP_ALIGNMENT.md", "button-link")); page.append(body);
  }
  function showPage() {
    const current = route(location.hash, state.project); state.project = current.project;
    document.body.dataset.project = current.project;
    if (current.page === "tasks") tasksPage(projectById(current.project));
    if (current.page === "changelogs") changelogPage(projectById(current.project));
    document.querySelectorAll(".page").forEach(page => page.hidden = page.id !== `page-${current.page}`);
    document.querySelectorAll("[data-route]").forEach(item => {
      const name = item.dataset.route; if (name === current.page) item.setAttribute("aria-current", "page"); else item.removeAttribute("aria-current");
      if (name === "tasks" || name === "changelogs") item.href = `#${name}?project=${state.project}`;
    });
    document.title = `${current.page === "tantra-o" || current.page === "tantra-b" ? projectById(current.project).name : current.page[0].toUpperCase() + current.page.slice(1)} — Tantra Online Roadmap`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function start() {
    data.projects.forEach(projectPage); aboutPage(); gameplayPage();
    document.getElementById("review-date").textContent = `Source snapshot · ${data.reviewed}`;
    window.addEventListener("hashchange", showPage); showPage();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
