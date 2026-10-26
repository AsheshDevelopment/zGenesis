"""Refresh only Tantra-B from its authoritative workspace plan and progress."""
from pathlib import Path
import argparse, copy, hashlib, json, re, subprocess

ROOT = Path(__file__).resolve().parents[1]


def sha(body):
    return hashlib.sha256(body).hexdigest()


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")


def plain(value):
    value = re.sub(r"\[([^]]+)\]\([^)]+\)", r"\1", value)
    return re.sub(r"\s+", " ", value.replace("**", "").replace("`", "")).strip(" —-")


def groups(plan):
    result, group, task, seen, notes = [], None, None, set(), False
    for raw in plan.decode("utf-8").splitlines():
        line = raw.strip()
        heading = re.match(r"### (C\d\d) (.+)", line)
        if heading:
            group = {"id": heading[1], "title": plain(heading[2]), "tasks": [], "gate": None}
            result.append(group)
            task, notes = None, False
            continue
        if line.startswith("## "):
            group, task, notes = None, None, False
        if group is None:
            continue
        found = re.match(r"^- \[([xX ])\] \*\*([^*]+)\*\*\s*[—–-]?\s*(.*)", raw)
        if found:
            identifier = found[2]
            if identifier in seen:
                raise ValueError("Duplicate source task: " + identifier)
            seen.add(identifier)
            task = {"id": identifier, "done": found[1].lower() == "x", "text": plain(found[3]), "children": []}
            if identifier.endswith("GATE"):
                group["gate"] = task
            else:
                group["tasks"].append(task)
            notes = True
            continue
        child = re.match(r"^\s+- \[([xX ])\]\s*(.+)", raw)
        if child and task:
            task["children"].append({"done": child[1].lower() == "x", "text": plain(child[2])})
            notes = False
        elif not line:
            notes = False
        elif notes and task and raw.startswith(" ") and not line.startswith(("|", "<", "#", "- ")):
            task["text"] += " " + plain(line)
    if len(result) != 10:
        raise ValueError("Expected the ten native bgfx checkpoints")
    for group in result:
        group["done"] = sum(task["done"] for task in group["tasks"])
        group["total"] = len(group["tasks"])
        group["percent"] = (200 * group["done"] + group["total"]) // (2 * group["total"])
    return result


def refresh(source):
    source = source.resolve()
    plan, progress = (source / "IMPLEMENTATION_PLAN.md").read_bytes(), (source / "PROGRESS.md").read_bytes()
    data_path = ROOT / "assets/roadmap-data.js"
    data = json.loads(data_path.read_text(encoding="utf-8").split("window.TANTRA_ROADMAP = ", 1)[1].rsplit(";", 1)[0])
    original_ogre = copy.deepcopy(data["projects"][0])
    documentation = {path.relative_to(ROOT).as_posix(): sha(path.read_bytes()) for path in (ROOT / "documentation").rglob("*") if path.is_file()}
    project = next(project for project in data["projects"] if project["id"] == "tantra-b")
    project["groups"] = groups(plan)
    project["done"] = sum(group["done"] for group in project["groups"])
    project["total"] = sum(group["total"] for group in project["groups"])
    project["percent"] = (200 * project["done"] + project["total"]) // (2 * project["total"])
    project["accepted"] = sum(bool(group["gate"] and group["gate"]["done"]) for group in project["groups"])
    project["description"] = "The bgfx/SDL3 client runs the native offline Tantra foundation with direct TPA reads, English names, tested navigation, weapon/skill FX, native hotkeys and restart persistence. Crowded-scene CPU/GPU and loading baselines are measured. Complete skills, AI, other maps and full visual/release acceptance remain open."
    project["foundations"] = [
        "C++20 x64 Debug/Release, bgfx/D3D11, SDL3 and miniaudio; clean dedicated client",
        "Direct TantraParam.tpa and HPK resources; Philippine English names; server-only data and saves outside the client",
        "Native INTRO, eight tribe previews, equipment/sockets, native UI and ordinary durable offline services",
        "Source hit markers, projectile arrival costs, elemental trails and represented persistent skill-state cleanup",
        "32 static and 8 dynamic native navigation cases; actual SDL immediate attack retargeting",
        "Native menu/camera/quickbar/chat keys; source optional F11 broadcast camera",
        "Six fresh-process persistence legs: Interface.sys, equipment attachments, quick slots, independent audio and three Mandara village zones",
        "Two trials per town/dense-field/combat scene: 7,200 measured frames, raw CPU/GPU/loading timings and hardware/input hashes"
    ]
    project["next"] = [
        "Complete remaining available attached/area/monster-state FX and weapon/skill timing combinations; record and skip missing assets",
        "Test CPU pose/deformation improvements and GPU skinning against the measured baseline while preserving native normals, sockets and timing",
        "Reduce unchanged UI/traversal work; budget resource creation around the measured loading stalls before claiming gains",
        "Complete other-map and in-game portal transitions, native AI/services, online gameplay and matched visual acceptance"
    ]
    latest = [
        {"date": "2026-10-26", "title": "Persistence and controlled performance baseline", "text": "Six isolated restart/relogin/character/village legs pass. Saved quickbar orientation and key mode are fixed; equipment attachments and independent live audio restore. Six Release profile trials measure 7,200 frames: dense field43 actors median9.68 to9.73ms, CPU pose4.12ms, GPU1.45 to1.64ms. Dense actor creation stalls365 to370ms. No optimisation gain or broad game gate is claimed."},
        {"date": "2026-10-26", "title": "Native data, projectiles and navigation stress", "text": "Direct TPA decoding/comparison preserves client/import version differences and external server data. Weapon/projectile tests cover27 encounters, refinement/animation bindings and represented buff/cancellation cleanup. Navigation passes32 static and8 dynamic cases. Missing authored FX are recorded and skipped as requested; remaining available families stay open."},
        {"date": "2026-10-26", "title": "Default hotkeys and monster impact correction", "text": "Native menu, movement, camera, quickbar and chat bindings pass63 actual SDL checks plus earned F-pickup and retarget regressions. F11 retains optional source broadcast behaviour. Monster activation/impact columns and case-insensitive graph lookup are corrected; actual monster2001 impact geometry/depth passes."}
    ]
    titles = {change["title"] for change in latest}
    project["changes"] = latest + [change for change in project["changes"] if change["title"] not in titles]
    # OGRE data and all bundled OGRE documentation remain byte-identical.
    assert data["projects"][0] == original_ogre
    for key, body in (("bgfx_plan", plan), ("bgfx_progress", progress)):
        path = ROOT / data["sources"][key]["path"]
        path.write_bytes(body)
        data["sources"][key]["sha256"] = sha(body)
    (ROOT / "reference/bgfx/README.md").write_bytes((source / "README.md").read_bytes())
    data_path.write_text("/* Generated from the authoritative plans; refresh Tantra-B with tools/zf-refresh-bgfx.py. */\nwindow.TANTRA_ROADMAP = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8", newline="\n")
    snapshot = read_json(ROOT / "snapshot.json")
    snapshot["sources"] = data["sources"]
    snapshot["projects"] = [{key: project[key] for key in ("id", "done", "total", "percent", "accepted")} for project in data["projects"]]
    write_json(ROOT / "snapshot.json", snapshot)
    summary = f"- **Tantra-B**: {project['done']}/{project['total']} named tasks checked ({project['percent']}%); {project['accepted']}/10 gates recorded. Latest: {latest[0]['title']}. {latest[0]['text']} Remaining native skill/FX and complete map/game acceptance stay open."
    for name in ("docs/PROGRESS.md", "docs/changelogs/unreleased/index.md"):
        path = ROOT / name
        content = path.read_text(encoding="utf-8")
        content = re.sub(r"^- \*\*Tantra-B\*\*:.*$", lambda _: summary, content, flags=re.M)
        if name == "docs/PROGRESS.md":
            content = re.sub(r"Version: [0-9.]+", "Version: 1.0.2", content)
        elif "## 1.0.2" not in content:
            content = content.replace("# Unreleased\n", "# Unreleased\n\n## 1.0.2 - 2026-10-26 (Tantra-B only)\n\nChanged: refresh only Tantra-B snapshots, checked tasks, native data/FX/hotkeys,\npersistence and measured performance priorities. Add a repeatable scoped refresh.\nVerified: six persistence legs, two trials of three measured scenes,7,200 raw\nframes, native skill/FX regressions and preserved OGRE data/documentation. Website\nchecks are recorded separately in EXPORT_VERIFICATION.json.\nFailed: no failure in the accepted final matrices; historical attempts and missing\nauthored FX are retained in the source plan. Missing assets are skipped as asked.\nRemaining: full skill/FX/AI, other maps, online gameplay, rendering optimisations\nand browser visual acceptance. No broad game gate is newly accepted.\n")
        path.write_text(content, encoding="utf-8", newline="\n")
    readme = ROOT / "README.md"
    content = readme.read_text(encoding="utf-8").replace("Version: 1.0.0.", "Version: 1.0.2.")
    if "zf-refresh-bgfx.py" not in content:
        content = content.replace("## Refresh from the documentation repository", "## Refresh Tantra-B only\n\nRun `python tools/zf-refresh-bgfx.py --bgfx-root C:\\_GitHub\\TantraSrc\\_remake_bgfx`.\nIt regenerates Tantra-B tasks from its source plan and preserves Tantra-O and\nall bundled OGRE documentation. Run the checks below before committing.\n\n## Refresh from the documentation repository")
    readme.write_text(content, encoding="utf-8", newline="\n")
    assert documentation == {path.relative_to(ROOT).as_posix(): sha(path.read_bytes()) for path in (ROOT / "documentation").rglob("*") if path.is_file()}
    checks = {}
    for name, command in [("syntax", ["node", "--check", "assets/roadmap.js"]), ("source_data", ["node", "tools/zf-check-roadmap.cjs"]), ("rendered_content", ["node", "tools/zf-check-rendered-content.cjs"])]:
        completed = subprocess.run(command, cwd=ROOT, capture_output=True, text=True, check=True)
        checks[name] = completed.stdout.strip() or "passed"
    manifest = read_json(ROOT / ".roadmap-files.json")
    for name in manifest["files"]:
        manifest["files"][name] = sha((ROOT / name).read_bytes())
    manifest["files"]["tools/zf-refresh-bgfx.py"] = sha(Path(__file__).read_bytes())
    write_json(ROOT / ".roadmap-files.json", manifest)
    verification = read_json(ROOT / "EXPORT_VERIFICATION.json")
    verification["export_manifest_sha256"] = sha((ROOT / ".roadmap-files.json").read_bytes())
    verification["tantra_b_refresh"] = {"version": "1.0.2", "scope": "Tantra-B only", "tasks": f"{project['done']}/{project['total']}", "percent": project["percent"], "accepted_gates": project["accepted"], "tantra_o_data_unchanged": True, "tantra_o_documentation_files_unchanged": len(documentation), "source_hashes": "matched to current bgfx workspace", "website_checks": checks, "browser_visual_acceptance": "not rerun; layout code unchanged", "game_evidence": "See reference/bgfx/PROGRESS.md; game runtime evidence is separate from website acceptance"}
    write_json(ROOT / "EXPORT_VERIFICATION.json", verification)
    print(json.dumps(verification["tantra_b_refresh"], indent=2))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--bgfx-root", type=Path, required=True)
    refresh(parser.parse_args().bgfx_root)
