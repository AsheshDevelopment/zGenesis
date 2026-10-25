/* Execute the real page renderer against a minimal DOM adapter. This checks
 * generated content and interaction state; it does not assert browser layout. */
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
class Node {
  constructor(tag="div"){this.tagName=tag;this.children=[];this.attrs={};this.dataset={};this.events={};this.style={setProperty(){}};this.hidden=false;this.value="";this._text="";this.className="";}
  append(...items){for(const item of items){this.children.push(typeof item==="string"?Object.assign(new Node("#text"),{_text:item}):item);if(this.tagName==="select"&&this.children.length===1)this.value=item.value;}}
  replaceChildren(...items){this.children=[];this._text="";this.append(...items);}
  set textContent(value){this.children=[];this._text=String(value);}
  get textContent(){return this._text+this.children.map(n=>n.textContent).join("");}
  setAttribute(key,value){this.attrs[key]=String(value);if(key.startsWith("data-"))this.dataset[key.slice(5)]=String(value);}
  removeAttribute(key){delete this.attrs[key];}
  addEventListener(name,fn){this.events[name]=fn;}
  fire(name){assert(this.events[name],name);this.events[name]();}
  all(){return this.children.flatMap(n=>[n,...n.all()]);}
  querySelectorAll(selector){return this.all().filter(n=>selector[0]==="."?n.className.split(" ").includes(selector.slice(1)):selector[0]==="["?selector.slice(1,-1) in n.attrs:n.tagName===selector);}
}
const body=new Node("body"),pages=["tantra-o","tantra-b","about","gameplay","tasks","changelogs"],nav=new Node("nav");body.append(nav);
for(const name of pages){const n=new Node("main");n.id="page-"+name;n.className="page";n.hidden=name!=="tantra-o";body.append(n);const a=new Node("a");a.setAttribute("data-route",name);nav.append(a);}
const date=new Node("span");date.id="review-date";body.append(date);
const document={body,readyState:"complete",createElement:tag=>new Node(tag),createTextNode:text=>Object.assign(new Node("#text"),{_text:text}),getElementById:id=>body.all().find(n=>n.id===id),querySelectorAll:s=>body.querySelectorAll(s)};
const handlers={},location={hash:""},window={addEventListener:(name,fn)=>{handlers[name]=fn;},scrollTo(){}};
const root=path.resolve(__dirname,"..");const context={document,window,location,URLSearchParams};vm.createContext(context);
for(const file of ["roadmap-data.js","roadmap.js"])vm.runInContext(fs.readFileSync(path.join(root,"assets",file),"utf8"),context);
const [ogre,bgfx]=window.TANTRA_ROADMAP.projects;
const page=id=>document.getElementById("page-"+id);
const visible=()=>document.querySelectorAll(".page").filter(n=>!n.hidden).map(n=>n.id);
const route=hash=>{location.hash=hash;handlers.hashchange();};
assert.deepEqual(visible(),["page-tantra-o"]);assert.equal(document.title,"Tantra-O — Tantra Online Roadmap");
assert.equal(page("tantra-o").querySelectorAll("details").length,14);assert.equal(page("tantra-b").querySelectorAll("details").length,10);
for(const id of ["tantra-o","tantra-b"]){const choices=page(id).querySelectorAll(".project-choice");assert.deepEqual(choices.map(n=>n.href),["#tantra-o","#tantra-b"]);assert(choices.some(n=>n.textContent.includes("OGRE")));assert(choices.some(n=>n.textContent.includes("bgfx")));}
route("#tasks?project=tantra-o");assert.deepEqual(visible(),["page-tasks"]);assert(document.getElementById("task-result-count").textContent.startsWith(`${ogre.total} of ${ogre.total}`));
let results=document.getElementById("task-results");assert.equal(results.querySelectorAll("input").length,ogre.total);assert.equal(results.querySelectorAll("input").filter(n=>n.checked).length,ogre.done);
const search=page("tasks").querySelectorAll("input").find(n=>n.type==="search");search.value="P06-T06";search.fire("input");assert.equal(results.querySelectorAll("input").length,1);
search.value="";search.fire("input");const status=page("tasks").querySelectorAll("select")[0];status.value="open";status.fire("change");assert.equal(results.querySelectorAll("input").length,ogre.total-ogre.done);
const buttons=page("tasks").querySelectorAll("button");buttons.find(n=>n.textContent==="Expand all").fire("click");assert(results.querySelectorAll("details").every(n=>n.open));buttons.find(n=>n.textContent==="Collapse all").fire("click");assert(results.querySelectorAll("details").every(n=>!n.open));
route("#tantra-b");assert.deepEqual(visible(),["page-tantra-b"]);assert.equal(document.title,"Tantra-B — Tantra Online Roadmap");route("#tasks");assert(document.getElementById("task-result-count").textContent.startsWith(`${bgfx.total} of ${bgfx.total}`));assert.equal(document.getElementById("task-results").querySelectorAll("input").filter(n=>n.checked).length,bgfx.done);
route("#tasks?project=tantra-o");assert.equal(document.getElementById("task-results").querySelectorAll("input").length,ogre.total);
route("");assert.deepEqual(visible(),["page-tantra-o"]);assert.equal(body.dataset.project,"tantra-o");
console.log(JSON.stringify({result:"passed",renderer:"actual roadmap.js with CPU DOM adapter",ogre:{phases:14,tasks:ogre.total,checked:ogre.done},bgfx:{checkpoints:10,tasks:bgfx.total,checked:bgfx.done},defaultPage:"Tantra-O",projectSwitching:"passed",searchStatusExpandCollapse:"passed",browserLayout:"not_run"}));
