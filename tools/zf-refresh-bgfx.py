"""Refresh only Tantra-B from its authoritative workspace plan and progress."""
from pathlib import Path
import argparse, copy, hashlib, json, re, subprocess

ROOT = Path(__file__).resolve().parents[1]
VERSION = "1.0.14"


def sha(body):
    return hashlib.sha256(body).hexdigest()


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")


def plain(value):
    value = re.sub(r"\[([^]]+)\]\([^)]+\)", r"\1", value)
    return re.sub(r"\s+", " ", value.replace("**", "").replace("`", "")).strip(" â€”-")


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
        found = re.match(r"^- \[([xX ])\] \*\*([^*]+)\*\*\s*[â€”â€“-]?\s*(.*)", raw)
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
    project["description"] = "C06 now has all 19 represented tasks accepted: native inventory/equipment/consumables, merchant/repair/warehouse/save-point services and basic offline combat. Source-backed off-hand rules, authored reactions, combat-sight disengagement and direct warehouse equipment transfers are verified. Full AI, timed consumables, online and broader gameplay remain C09. Game source is uncommitted."
    project["foundations"] = [
        "C06: native dual-dagger/bow/arrow placement, atomic occupied swaps, split/merge/cancel and ordinary consumable recovery; direct warehouse/equipment transfers",
        "C06: authored HIT/DIE durations and finite restarts, native combat-sight disengagement, target indicators/facing, source hit markers and durable encounter outcomes",
        "Native portal1000 altar UI, exact main/sub refinement and additive rules, persistent100-card percentage decks, stale-instance rejection and SQLite outcomes",
        "Both original whisper/message fields,32 authenticated offline source commands, exact Fors838 spellings and a complete287-entry availability inventory",
        "Source-backed coloured item/skill hover documents, instance refinement/durability/requirements and merchant context; current/next skill effects and costs",
        "Native NPC choice hover/pressed images and HPK-backed greetings once per opening with live miniaudio effects gain",
        "Player NEWBORN and monster field birth graphs deferred through loading, with revive/life/AOI/equipment/expiry/reset handling",
        "C02: qualified HPK resource identity, original DDS mips/alpha, clipped ordered UI and asymmetric world render/picking across four sizes",
        "Native Advance settings: resolution arrows, 4:3/16:9/16:10/custom, windowed/borderless/fullscreen and live graphics quality; actual 32-bit D3D11 colour",
        "Ordinary attacks use native costs/CalDamage and consume next-attack bonuses at melee impact or projectile arrival; first TAB attack annotation matches the original engine",
        "C++20 x64 Debug/Release, bgfx/D3D11, SDL3 and miniaudio; clean dedicated client",
        "Direct TantraParam.tpa and HPK resources; Philippine English names; server-only data and saves outside the client",
        "Native INTRO, eight tribe previews, equipment/sockets, native UI and ordinary durable offline services",
        "Source hit markers, projectile arrival costs, elemental trails and represented persistent skill-state cleanup",
        "Native body/hair/apron action clips, cast looping and retained animation clocks during head/equipment replacement",
        "Committed buff FX retain their owner, age and expiry through actual SDL equip/unequip without recasting or charging TP",
        "Native default monster melee/ranged selection, locked skill/TAB timing and visible authored follow/impact with lifecycle cleanup",
        "Native instant shield energy, per-hit level1 State FX and defensive casts retaining one-shot attack bonuses",
        "32 static and 8 dynamic native navigation cases; actual SDL immediate attack retargeting",
        "Native menu/camera/quickbar/chat keys; source optional F11 broadcast camera",
        "Six fresh-process persistence legs: Interface.sys, equipment attachments, quick slots, independent audio and three Mandara village zones",
        "Two trials per town/dense-field/combat scene: 7,200 measured frames, raw CPU/GPU/loading timings and hardware/input hashes"
    ]
    project["next"] = [
        "Continue C04/C07 and remaining ordinary gameplay gates from their explicit open requirements",
        "Keep unfinished strike acceptance separate: record missing 1000106 and unsupported TFX type7; target/combo/periodic services remain open",
        "Retain explicit missing authored collision and client/import version differences; no HPK extraction or silent dataset replacement",
        "Broaden distinct-map/portal, visual/performance/recovery and release acceptance without inferring FPS gains from caching"
    ]
    latest = [
        {"date": "2026-10-27", "title": "Native tooltips, NPC greetings and birth FX verified", "text": "Verify the supplied tooltip screenshots against native source; compile the original effect formatter, message IDs, family predicates and refinement arrays. Render centred coloured item/skill rows with live instance fields, requirements, prices/service context and current/next skill conditions/effects/costs. Restore original NPC hover/down image9 and play each NPC greeting once per opening through HPK-backed miniaudio effects gain. Defer player NEWBORN and monster birth until rendering is ready; verify first appearance, revive/life/AOI changes, equipment retention, expiry and cleanup. Fix sale confirmation mixing legacy item-name bytes into UTF-8 English text. Debug/Release each pass nine focused tests: 3,759 tooltip, 337 UI and 190 presentation/audio assertions. Pixel checks isolate 5,727 NPC hover pixels and verify coloured tooltip glyphs. Actual SDL paid-repair/buy/sell/cancellation workflow, SQLite preservation and 53-file packaging pass. Corrected early merchant attempts are retained. P11-07 closes; 125/254 tasks and five gates. The K3 table has no matching screenshot mount entry; 45 unhandled formatter effect IDs and wider game/FX work remain recorded and open."},
        {"date": "2026-10-27", "title": "Native Settings layout matches supplied reference", "text": "Replace stretched value rows with a compact 330-pixel Settings frame, Presets/Options sections, native 64x19 gold button groups, selected highlights and plain values between arrows. Add working Low/Mid/High presets while retaining custom resolutions, all three aspect ratios, window modes and existing live quality/sliders. High retains native 2048 shadows; Ultra selects 4096. Debug/Release builds and three focused MainUI/Interface tests per configuration pass; final hidden SDL/bgfx UI checks are rerun after label refinement. Actual SDL passes 103 checks, including presets reaching renderer/camera state, persistence and Apply/Cancel. Review 1024x768 and 800x600 captures; 53-file packaging and protected/default/seed preservation pass. No new task or gate is closed. MSAA, model/FX/object-distance and circle-shadow controls from the reference remain separate renderer work. No new failures or FPS/visual-parity gain is claimed."},
        {"date": "2026-10-27", "title": "C02 original assets and live graphics options accepted", "text": "Accept 22/22 bounded resource/render tasks and the minimum gate. Preserve native family identity, deterministic Pop precedence, original DDS/DXT mip chains/premultiplied alpha and source UI images; reject ambiguous/traversal/bad inputs and stale shader keys. Verify world cutout/translucent depth, UVs, clipping and eight asymmetric front/back render/pick resize cases. Help becomes Advance with Resolution arrows showing actual 32-bit colour, three aspect ratios/custom sizes, windowed/borderless/fullscreen and live texture/shadow/fog/detail/filter/VSync/view-distance/brightness settings. Debug/Release each pass 22 focused tests and 84 renderer assertions; actual SDL passes 94 settings checks. Original assets pass 100 frames plus resize/minimise/restore; independent miniaudio regression and 53-file packaging pass. Protected/default/seed data are unchanged. Wider visual/performance, maps/skills, DPI/recovery and release remain open; no FPS gain or full visual parity is claimed."},
        {"date": "2026-10-27", "title": "C05 movement, camera and MainUI accepted", "text": "Implement original CUR/ANI contexts, 200ms item/skill/control tooltips, native widget colours/font modes, bounded label caching and unchanged bitmap upload avoidance, player name policies and camera obstruction recovery. Accept 32 static / 8 dynamic routes, isolated SDL town blocked-click, field E/R retarget and 63 hotkey checks, plus six restart/relogin/character/village persistence legs. Debug/Release checks and clean packaging pass. The native camera baseline remains 150; the client explicitly selects 450 maximum zoom. Missing authored .tbo collision and wider strike/FX services remain open. No FPS gain or production/native visual parity is claimed."},

        {"date": "2026-10-27", "title": "Implementation paused; quicker independent tasks prioritised", "text": "Record the paused worktree honestly. The new strike batch passes 19,041 Release CPU checks: five target-independent rule cases and eight encounters for skills 3026/3012/3109. Skills 3033/3107 have partial rule coverage only. Debug, GPU, actual launcher/UI/audio acceptance and staging remain pending; the earlier staged client is unchanged. Text/glyph caching and small UI fixes are next after bounded strike acceptance. No broad task/gate or optimisation gain is newly accepted."},
        {"date": "2026-10-27", "title": "Native ordinary attacks and first TAB attack marker", "text": "Fix ordinary attacks bypassing native CalDamage and retaining skill 3059's next-attack bonus. All 12 supplied weapon payloads and 12 timing/cancellation encounters pass, plus an unmodified native elite miss; 15,474 checks pass in each configuration. Match the original engine's first attack annotation, accepting Srbinda's duplicate-tag clip without extra damage. Release/Debug status/projectile/navigation gates and ten monster encounters/four GPU cases pass; staged SDL combat/UI/audio and clean packaging pass. Missing dart item and prior FX gaps remain recorded. Wider native strike/state services and full map/game acceptance stay open."},
        {"date": "2026-10-26", "title": "Native shield energy and per-hit FX", "text": "Implement source instant shield/break cases and physical/elemental absorption, preserving native rounding, energy and exhaustion flags. Real3102 levels1â€“10 and3145 authority pass2,555 checks in Release/Debug, including two GPU cases, shield-only visible-pixel comparisons, ranged arrival, equipment and death cleanup. Restore the DealDamage guard so defensive3022 retains3059's bonus until damaging3007. Shield and ordinary-buff SDL workflows each pass88 checks; status/skill/projectile/navigation regressions and packaging pass. Missing3145 FX is recorded and skipped. Wider skill/monster families remain open."},
        {"date": "2026-10-26", "title": "Native monster default ranged attacks", "text": "Replace fixed-range idSkill0 attacks with source default melee/ranged selection and locked MONSkill animation/TAB timing. Monsters2004/2005 pass eight fine/coarse encounters and three GPU cases in Debug/Release, including visible follow/impact and eight lifecycle/rebind checks. SDL combat/audio/Prana and88 buff/equipment checks pass. The current build has six isolated profile trials/7,200 measured frames; dense43-actor medians9.67â€“9.87ms include4.10â€“4.16ms CPU pose work. Special-skill patterns, timed monster states and wider skill services remain open."},
        {"date": "2026-10-26", "title": "Buff FX survive equipment replacement", "text": "Fix committed buff visuals losing their destroyed display parent during equip/unequip. Rebind exact owner references while retaining graph age, expiry, socket, geometry and particle/audio state. Real3110 Release/Debug renderer checks and88 actual SDL checks pass; held-pose captures are pixel-identical. Projectile/lifecycle regression and clean packaging pass. The earlier verifier's pre-login skill comparison is corrected to actual world-entry bytes. Wider native skill/monster FX families remain open."},
        {"date": "2026-10-26", "title": "Native hair and apron action phases", "text": "Fix attachments retaining idle clips while the body moves, attacks or casts. Audit7,024 binding sets and889 clips;424 renderer cases verify native attack/skill clips,1,651 clock checks,56 hair selections and model replacement. Actual SDL3124 adds39 socket checks. Debug/Release, projectile/buff cleanup and six persistence legs pass. The corrected build has a separate7,200-frame profile baseline; remaining native skill/monster FX families stay open."},
        {"date": "2026-10-26", "title": "Persistence and controlled performance baseline", "text": "Six isolated restart/relogin/character/village legs pass. Saved quickbar orientation and key mode are fixed; equipment attachments and independent live audio restore. Six Release profile trials measure 7,200 frames: dense field43 actors median9.68 to9.73ms, CPU pose4.12ms, GPU1.45 to1.64ms. Dense actor creation stalls365 to370ms. No optimisation gain or broad game gate is claimed."},
        {"date": "2026-10-26", "title": "Native data, projectiles and navigation stress", "text": "Direct TPA decoding/comparison preserves client/import version differences and external server data. Weapon/projectile tests cover27 encounters, refinement/animation bindings and represented buff/cancellation cleanup. Navigation passes32 static and8 dynamic cases. Missing authored FX are recorded and skipped as requested; remaining available families stay open."},
        {"date": "2026-10-26", "title": "Default hotkeys and monster impact correction", "text": "Native menu, movement, camera, quickbar and chat bindings pass63 actual SDL checks plus earned F-pickup and retarget regressions. F11 retains optional source broadcast behaviour. Monster activation/impact columns and case-insensitive graph lookup are corrected; actual monster2001 impact geometry/depth passes."}
    ]
    latest.insert(0, {"date": "2026-10-27", "title": "Altar refinement and native whisper commands", "text": "Implement original portal1000 picking, window236, animated orb, inventory offers, source costs and confirmation/result UI. Compile active Server.cpp main/sub refinement and native percentage decks with Global-version item masks. Verify5,619 refinement assertions/1,000 attempts,433 command parser checks,32 commands exercised through live authority,145 command runtime checks and59 altar SDL checks with SQLite/profile protection. Debug/Release each pass17 focused tests. Restore the source secret-whisper path deliberately offline;287 command inventory entries distinguish aliases and unavailable server systems. P16-03 closes:126/254 tasks (50%), five gates. Missing6526 and zero donation/GM refinement modifiers remain recorded; advanced NPC/quest/social/online work stays open."})
    latest.insert(0, {"date": "2026-10-28", "title": "C06 ordinary services and basic combat accepted", "text": "Close all 19 C06 tasks after implementing native off-hand and bow/arrow placement, atomic final-slot validation, direct warehouse/equipment transfers, consumable unpack fallback, authored monster HIT/DIE timing and finite restarts, combat-sight disengagement and range-aware approach. Debug/Release each pass 27 focused tests; the new authority matrix covers 27 inventory and eight fine/coarse combat cases with exact 80/10/10 normal/critical/miss decks. Nine actual SDL legs verify inventory, selection/attack FX and facing, defeat/reward/pickup, death/revival, warehouse/save point, paid repair/buy/sell and money/capacity failures, plus fresh-process reloads. SQLite and protected/default/seed preservation and 55-file packaging pass. Record missing Global arrow 7091 and use supplied 7092 only in the owned fixture. Correct stale headless zoom setup and private test fixtures. P07-12, P11-06, P12-01, P12-04 and P12-05a/06a/07a close:133/254 (52%), five gates. Full AI/roam, timed consumables, online services, complete loot/penalties and other maps remain C09."})
    titles = {change["title"] for change in latest}
    project["changes"] = latest + [change for change in project["changes"] if change["title"] not in titles]
    # OGRE data and all bundled OGRE documentation remain byte-identical.
    assert data["projects"][0] == original_ogre
    for key, body in (("bgfx_plan", plan), ("bgfx_progress", progress)):
        path = ROOT / data["sources"][key]["path"]
        path.write_bytes(body)
        data["sources"][key]["sha256"] = sha(body)
    (ROOT / "reference/bgfx/README.md").write_bytes((source / "README.md").read_bytes())
    command_doc = ROOT / "reference/bgfx/docs/NATIVE_COMMANDS.md"
    command_doc.parent.mkdir(parents=True, exist_ok=True)
    command_doc.write_bytes((source / "docs/NATIVE_COMMANDS.md").read_bytes())
    data["sources"]["bgfx_commands"] = {"path": command_doc.relative_to(ROOT).as_posix(), "sha256": sha(command_doc.read_bytes())}
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
            content = re.sub(r"Version: \d+\.\d+\.\d+", "Version: " + VERSION, content)
            content = content.replace("Version: " + VERSION + " Reviewed:", "Version: " + VERSION + ". Reviewed:")
            content = re.sub(r"Reviewed: \d{4}-\d{2}-\d{2}\.", "Reviewed: 2026-10-28.", content)
        elif "## " + VERSION not in content:
            entry = """# Unreleased

## 1.0.14 - 2026-10-28 (Tantra-B only)

Changed: complete all 19 C06 tasks with native equipment placement, inventory
operations, direct warehouse/equipment movement and basic combat lifecycle fixes.
Use authored monster reactions and combat sight; retain original hit timing.
Verified: Debug/Release each pass 27 focused tests. The authority matrix covers
27 inventory and eight combat cases; nine actual SDL legs verify services,
combat, failures and fresh-process persistence. Protected/default/seed hashes,
SQLite and the clean 55-file package pass. Source/DOM export checks are rerun.
Failed/corrected: a stale camera fixture omitted explicit extended zoom; private
dagger/arrow fixtures were corrected from the selected source data. Missing
Global arrow 7091 is recorded; supplied 7092 is used only in the owned fixture.
Remaining: complete AI/roam, timed consumables, online services, full loot/
penalties and other maps remain C09. Tantra-B is 133/254 (52%), five gates.
Preserve Tantra-O data/docs; game source remains uncommitted.
"""
            content = content.replace("# Unreleased\n", entry)

        path.write_text(content, encoding="utf-8", newline="\n")
    readme = ROOT / "README.md"
    content = re.sub(r"Version: \d+\.\d+\.\d+", "Version: " + VERSION, readme.read_text(encoding="utf-8"))
    if "zf-refresh-bgfx.py" not in content:
        content = content.replace("## Refresh from the documentation repository", "## Refresh Tantra-B only\n\nRun `python tools/zf-refresh-bgfx.py --bgfx-root C:\\_GitHub\\TantraSrc\\_remake_bgfx`.\nIt regenerates Tantra-B tasks from its source plan and preserves Tantra-O and\nall bundled OGRE documentation. Run the checks below before committing.\n\n## Refresh from the documentation repository")
    readme.write_text(content, encoding="utf-8", newline="\n")
    assert documentation == {path.relative_to(ROOT).as_posix(): sha(path.read_bytes()) for path in (ROOT / "documentation").rglob("*") if path.is_file()}
    checks = {}
    for name, command in [("syntax", ["node", "--check", "assets/roadmap.js"]), ("source_data", ["node", "tools/zf-check-roadmap.cjs"]), ("rendered_content", ["node", "tools/zf-check-rendered-content.cjs"])]:
        completed = subprocess.run(command, cwd=ROOT, capture_output=True, text=True, check=True)
        checks[name] = completed.stdout.strip() or "passed"
    manifest = read_json(ROOT / ".roadmap-files.json")
    manifest["files"][command_doc.relative_to(ROOT).as_posix()] = sha(command_doc.read_bytes())
    for name in manifest["files"]:
        manifest["files"][name] = sha((ROOT / name).read_bytes())
    manifest["files"]["tools/zf-refresh-bgfx.py"] = sha(Path(__file__).read_bytes())
    write_json(ROOT / ".roadmap-files.json", manifest)
    verification = read_json(ROOT / "EXPORT_VERIFICATION.json")
    verification["export_manifest_sha256"] = sha((ROOT / ".roadmap-files.json").read_bytes())
    verification["tantra_b_refresh"] = {"version": VERSION, "scope": "Tantra-B only", "tasks": f"{project['done']}/{project['total']}", "percent": project["percent"], "accepted_gates": project["accepted"], "tantra_o_data_unchanged": True, "tantra_o_documentation_files_unchanged": len(documentation), "source_hashes": "matched to current bgfx workspace", "website_checks": checks, "browser_visual_acceptance": "not rerun; layout code unchanged", "game_evidence": "See reference/bgfx/PROGRESS.md; game runtime evidence is separate from website acceptance"}
    write_json(ROOT / "EXPORT_VERIFICATION.json", verification)
    print(json.dumps(verification["tantra_b_refresh"], indent=2))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--bgfx-root", type=Path, required=True)
    refresh(parser.parse_args().bgfx_root)
