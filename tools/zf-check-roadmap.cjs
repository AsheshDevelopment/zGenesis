/* Static/source and pure view-model checks. No browser or game launch. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const crypto = require("node:crypto");
const root = path.resolve(__dirname, "..");
const docs = root;
const context = { window: {}, document: { readyState: "loading", addEventListener() {} }, URLSearchParams };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, "assets/roadmap-data.js"), "utf8"), context);
vm.runInContext(fs.readFileSync(path.join(root, "assets/roadmap.js"), "utf8"), context);
const data = context.window.TANTRA_ROADMAP;
const model = context.window.TantraRoadmapModel;
assert.deepEqual(Array.from(data.projects, project => project.name), ["Tantra-O", "Tantra-B"]);
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const route of ["tantra-o", "tantra-b", "about", "gameplay", "tasks", "changelogs"]) {
  assert(html.includes(`id="page-${route}"`)); assert(html.includes(`data-route="${route}"`));
  assert.equal(model.route(`#${route}`).page, route);
}
assert.equal(model.route("").page, "tantra-o");
assert.equal(model.route("#main").page, "tantra-o");
assert.equal(model.route("#TANTRA-B").page, "tantra-b");
assert.equal(model.route("#tasks?project=tantra-b").project, "tantra-b");
assert.equal(model.route("#tasks", "tantra-b").project, "tantra-b");
assert.equal(model.route("#tasks?project=unknown").project, "tantra-o");
for (const project of data.projects) {
  const tasks = project.groups.flatMap(group => group.tasks);
  assert.equal(new Set(tasks.map(task => task.id)).size, tasks.length);
  assert.equal(project.total, tasks.length); assert.equal(project.done, tasks.filter(task => task.done).length);
  assert.equal(project.percent, Math.round(project.done / project.total * 100));
  assert.equal(project.accepted, project.groups.filter(group => group.gate?.done).length);
  for (const file of [project.plan, project.progress]) assert(fs.existsSync(path.resolve(root, file)), file);
  assert.equal(model.filteredGroups(project).reduce((sum, group) => sum + group.tasks.length, 0), tasks.length);
  for (const status of ["done", "open"]) {
    const visible = model.filteredGroups(project, "", status).flatMap(group => group.tasks);
    assert.equal(visible.length, tasks.filter(task => status === "done" ? task.done : !task.done).length);
  }
  const sample = tasks.find(task => !task.done);
  assert(model.filteredGroups(project, sample.id).some(group => group.tasks.some(task => task.id === sample.id)));
  assert.equal(model.filteredGroups(project, "no-match-xyz-49183").length, 0);
  for (const group of project.groups) assert.equal(group.percent, Math.round(100 * group.done / group.total));
}
for (const source of Object.values(data.sources)) {
  const body = fs.readFileSync(path.resolve(docs, source.path));
  assert.equal(crypto.createHash("sha256").update(body).digest("hex"), source.sha256, source.path);
}
for (const match of html.matchAll(/(?:src|href)="(assets\/[^"#]+)"/g)) assert(fs.existsSync(path.join(root, match[1].split("?")[0])), match[1]);
assert.equal(data.zones.length, 10); assert.equal(data.zones[9].map, 40010);
assert(data.zones.every(zone => !zone.accepted));
assert(!html.includes("GENESIS")); assert(!html.includes("password"));
const css=fs.readFileSync(path.join(root,"assets/roadmap.css"),"utf8");
for(const asset of css.matchAll(/url\("([^"#]+)"\)/g))assert(fs.existsSync(path.resolve(root,"assets",asset[1])));
assert(css.includes("--bg:#181818")&&css.includes("--accent:#ec7f60"));
assert(css.includes("[hidden] { display:none!important; }"));
const design=JSON.parse(fs.readFileSync(path.join(root,"design-reference.json"),"utf8"));
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(path.join(root,"assets/tantra-world.png"))).digest("hex"),design.background.sha256);
console.log(JSON.stringify({ result: "passed", projects: data.projects.map(project => ({ name: project.name, tasks: `${project.done}/${project.total}`, coverage: project.percent, accepted: project.accepted })), routes: 6, zones: 10, sourceHashes: "matched", navigationAndFilters: "passed", browserVisualAcceptance: "not_run", gameLaunches: 0 }));
