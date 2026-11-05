"""Refresh only Tantra-B from its authoritative workspace plan and progress."""
from pathlib import Path
import argparse, copy, hashlib, json, re, subprocess

ROOT = Path(__file__).resolve().parents[1]
VERSION = "1.0.28"


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
    benchmark = read_json(source / "docs/evidence/c08-benchmark-20261105.json")
    assert benchmark["passed"] and len(benchmark["profiles"]) == 6
    worst_p95 = max(row["gpu_wall_ms"]["p95"] for row in benchmark["profiles"])
    project["description"] = f"Source-based bgfx/SDL3/miniaudio client and native C++ shared MMO services. C08 package/recovery is accepted on the named Windows/D3D11 machine, including twelve matched Release CPU/GPU trials with worst GPU p95 {worst_p95:.3f} ms. Zone01-Zone05 pass bounded native resources, two-client travel, NPC/environment/audio and persisted saved-zone entry. Native guild roles/paid marks and selected quest/combat families pass focused Release checks. Wider C09, Zone06-Zone10 and public-beta release gates remain open; the earlier C08 benchmark applies to its frozen executable."
    project["foundations"] = [
        "C08: 128-bone/eight-influence native GPU palette, inverse-transpose normals/shadows, CPU fallback and 36 rendered CPU/GPU comparisons",
        "C08: bounded decode/cache/upload queues, compatible opaque instancing, pooled changing-topology FX and conservative hidden visual work",
        "C08: eight scene retirements, four renderer retries, audio-owner cleanup, WAL-safe migration backups and external native diagnostics",
        "C08: full 3,652-file native client/runtime distribution, four app-local CRT DLLs, locked-stage rejection and two guarded relocation entries",
        "Native Prana uses monster DieActivateFX+1, source homing movement, live recipient tracking and owner/expiry cleanup; 570 checks per configuration plus an actual rewarded kill",
        "Selected-only Philippine-English monster names and NPC target/UI/FX cancellation on conversation/service close",
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
        "Historical pre-C08 baseline: 7,200 measured native scene frames, CPU/GPU/loading timings and hardware/input hashes"
    ]
    project["next"] = [
        "Export a reachable public hostname and matching signed TLS profile; the verified download currently targets localhost",
        "Verify installation on a separate clean Windows player PC; isolated local installation and fresh two-client journey pass",
        "Set an initial public player cap from sustained mixed gameplay, persistence and restart measurements",
        "Finish public-entry abuse rejection, enrollment, monitoring, backup/rollback and tester support gates",
        "Continue additional native quest/combat families and Zone06 separately; do not invent missing source content"
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
    latest.insert(0, {"date":"2026-10-28", "title":"C08 implementation checkpoint; final benchmark paused", "text":"Check 19/21 C08 tasks individually while retaining P17-13/P17-14 and the phase gate open. Debug/Release each pass 11 focused tests, 32 rendered CPU/GPU character comparisons and 626 lifecycle checks. The full 3,652-file package passes two guarded relocated entries, four app-local CRT imports, locked staging and native fault reporting. Six CPU and five matching GPU 60-second trials are retained; reject the warm GPU combat comparison because native revival moved the player to town and reduced median actors from 44 to four. The aggregate is invalidated, its replacement was stopped at the user pause, and no overall speedup or full C08 acceptance is claimed. Selected-only monster names and NPC target cancellation are verified. The bounded native Prana-follow correction is tracked separately; other gameplay/visual/release gates remain open. Preserve Tantra-O; game source is uncommitted."})
    latest.insert(0, {"date":"2026-10-28", "title":"Native Prana homes to the live player", "text":"Verify original monster death, attack-manager homing and engine FX lookup before replacing the procedural fading curve. Use monster DieActivateFX+1 on a moving null carrier, native 100-unit speed, six-word launch scatter, live player position +12, correction factor five and three-second lifetime. Preserve the corpse death graph separately and leave reward maths unchanged. Debug/Release each pass the flight rules and 570 presentation checks with path traces/captures, moving-target and recipient-rebind tests, duplicate/zero-reward suppression and expiry/missing-owner cleanup. Actual SDL Vasabhum defeat presents the collection FX and awards 60 Prana; protected/default/seed data and owned packaging pass. The fix is built and staged locally. C08 remains paused at 19/21 verified tasks, with the rejected warm combat comparison and phase gate open; no overall speedup is claimed. Game source remains uncommitted."})
    latest.insert(0, {"date":"2026-10-31", "title":"Connected C++ MMO and cross-zone checkpoint", "text":"Check 19 C09 tasks from the source plan: bounded login/session/world transport, separate authority, revision-fenced commands, MSGSRV/CHATSRV parties/chat, atomic trade, cash delivery/recovery and live two-client acceptance. Two real D3D11 launchers verify combat/projectiles and SDL trade; separate Zone01/Zone02 authorities verify paid outward/free return, party HP/presence and bidirectional chat, with stopped SQL records. Native altar/tutorial/class-change services and both resurrection locations are checked. Slot70 preserves refundable death loss. Global event bindings dispatch reward skill41347; Yut quests read registered winnings while the original disabled betting packets remain disabled. Release only; no broad FX regression. Competitive arena/castle recovery, the C08 benchmark gate, full C09 and ten individual map acceptances remain open. Preserve Tantra-O and its documentation."})
    project["foundations"].insert(0,"Native C++ shared MMO: real two-client combat/projectiles/trade/cash, service restart recovery, source altar/quests/resurrection and a paid two-zone round trip with party HP/chat")
    latest.insert(0, {"date":"2026-10-31", "title":"Recovery policy audit and publication", "text":"The native C++ Release resurrection check passes ten source-policy cases plus refund, item consumption, reconnect and saved-zone ownership. Fix the low-level saved-book exception, local Mandara-family rules and final Kruma god-statue destination override. Arena 20,000-rupiah and castle portal220/228 choices are policy-only checks; Zone16/17 admission, original choice UI and event transactions remain open. Five of six online requirements are checked; this follow-up adds no phase/task checkmarks. The development server package has 175 verified files and no accounts/runtime state. No BGFX rebuild or new graphical/FX regression was run. Exclude the retracted legacy-launcher request. Preserve Tantra-O and its documentation."})

    latest.insert(0, {"date":"2026-10-31", "title":"Six-part online batch complete; native competitive recovery", "text":"All six integration requirements are checked, including source death/recovery. Native window224 preserves original images, English labels, zero-ID input and source requests0/2/3/4. Arena fees, poor fallback,20% recovery,fixed268,732, native funding/time gates and Global events66-73/150 connect entrants, notices, winner and prize. Release authority,1,274 MainUI checks and four GPU component captures pass. Two network-connected D3D11 HUDs verify actual SDL arena/castle choices; stopped SQL confirms money, HP and destinations. These HUD-only fixtures do not accept competitive scenes; a native Zone17 TMB material error and the unused fixture experience range are recorded. Correct early visual combat packets rejecting a status-only client and the private NPC test setup. Current launcher/server Release binaries are staged; the175-file server development package has verified hashes and no accounts/runtime state. No Debug build or broad FX regression. The wider roadmap stays168/254 (66%),5/10 gates; C08 benchmark, full C09 and all map gates remain open. Exclude the retracted launcher request; preserve Tantra-O."})
    project["foundations"].insert(0,"Native arena/castle recovery: original death HUD choices, persisted fees/HP/positions, Global arena funding/events, winner/prize; connected SDL HUD-only acceptance")

    latest.insert(0, {"date":"2026-11-01", "title":"Simulation checkpoints and deployed MariaDB", "text":"Complete the five follow-up tasks within the revised two-client scope: native subsystem timing, original-order occupied-bucket visibility, bounded position checkpoints, Manager live metrics/create/drain, and dedicated MariaDB 11.8.9 with preserved SQLite, verified native migration, backup/restore and pool outage recovery. Two BGFX network clients pass movement, normal/skill hits, death/loot, social chat, trade and cash. Matching visibility p95 falls110 to2us and tick p95 from16.742 to9.021ms. The combined MariaDB session records47 moves,4 checkpoints,zero checkpoint failures,max tick46.026ms. Missing INTRO fxMAPnewIntro.txl is recorded and skipped; no new rendered FX or 512/1000-player acceptance. Keep the old256-player221ms spike unaccepted at that population. No Debug build or broad regression. Preserve Tantra-O."})
    project["description"] += " The 1 November follow-up adds native timing, movement checkpoints, channel metrics/create/drain and preserved-data MariaDB deployment; the revised two-client network acceptance passes."
    latest.insert(0, {"date": "2026-11-02", "title": "Visible entry, native NPCs, Mandara2nd and automatic backups", "text": "Complete the five requested follow-up tasks within their documented scope. Missing optional INTRO fire is logged/skipped; two visible Release clients reach gameplay. Native priest selection, offering and god change, class publication, all sixteen second-class branches and later task bindings are connected with committed authority; correct source party rewards and a long-dialogue raster crash. Live priest/class results reopen exactly. Mandara2nd travel, all sixteen NPC positions, sky/cloud/fog, miniaudio BGM and saved fares/positions pass. Manager shows actual MariaDB/readiness and native automatic backups with guarded retention and isolated restore. Matching Release binaries are staged. The separate rendered projectile step remains incomplete; premium class reset lacks a completed source contract and region ambience TMS is missing. Broader C08/C09 and map gates remain open. No Debug rebuild or broad FX regression. Preserve Tantra-O."})
    project["description"] += " The 2 November checkpoint verifies visible entry, native priest/class services, Mandara2nd scene and persistence, and Manager automatic backups. Its separate rendered projectile step remains incomplete."
    project["reviewed"] = "2026-11-02"

    latest.insert(0, {"date":"2026-11-02", "title":"Projectiles, quest/guild UI, Cave, recovery and Release performance verified", "text":f"All five requested follow-up requirements pass. Two visible clients verify projectile direction/flight/impact, Cave native NPCs/fog/BGM, paid entry/free return and reopened state. Actual SDL quest/guild workflows preserve native history, rewards, permissions and membership. Real source/destination travel and cash socket interruptions retain one fare/debit/delivery; interrupted trade cancels. Fix smaller maps, static type-4 mineral indices/catalog DDS, original K3 portal arrival bounds, catalog idle startup and eight-weight GPU skinning without truncation. Remove repeated HUD rasterization and unchanged life/refining refresh. Twelve matched Release trials retain the same 1024x768 HIGH quality and actor workloads; six GPU trials meet mean/p95/p99 criteria, worst p95 13.610 ms. Retain failed baselines and raw evidence. Matching runtime/data are staged, preserving MariaDB identity/accounts. Full C08 package/configuration, C09, higher guild ranks/marks and individual map/quest gates remain open. Preserve Tantra-O."})
    latest.insert(0, {"date":"2026-11-03", "title":"Documentation and remaining workspace changes published", "text":"Refresh the source progress notes and preserve the completed 2 November Release checkpoint. Include current saved client UI defaults and IDE preferences; label the older Genesis Server Manager report as a historical review of its original layout. Task and gate completion remain unchanged at 171/254 (67%) and 5/10. Existing runtime evidence is retained; this documentation update adds no game rebuild or new runtime acceptance. Preserve Tantra-O."})
    latest.insert(0, {"date":"2026-11-05", "title":"C08 package/recovery and four native zones accepted", "text":f"Accept the current C08 Windows/D3D11 scope: eleven component checks in each configuration, rendered parity, eight scene generations/four renderer retries, six-process persistence, two guarded relocated entries, 3709 manifested payloads and twelve matched Release profile trials. Worst GPU p95 {worst_p95:.3f} ms. Another 128 native SDL graphics assertions and fresh 1280x800 configuration entry pass. Zone01-Zone04 complete native resource/actor audits, two-client movement/travel, exact fares, party/chat, environment/BGM, stopped storage and six fresh saved-zone logins. Preserve the Global level-85/free Cave2 route, original packs and accounts; record missing content. Full C09 combat/quest/guild and Zone05-Zone10 remain open. Preserve Tantra-O."})
    project["foundations"].insert(0,"C08 package/recovery accepted; Zone01-Zone04 native resources, two-client travel, environment/audio and saved-zone persistence accepted within documented scope")
    project["foundations"].insert(0,"Original HTMessage quest journal and connected quest/guild SDL workflows; Cave resources/NPCs/portals/environment/audio and exact reopened state; native TCP interruption recovery")
    latest.insert(0, {"date":"2026-11-05", "title":"Native guild ranks, selected progression and MandaraCave3rd", "text":"Complete the requested bounded continuation: native ranks10/9/8/7/0, promotion/demotion, server restrictions, paid packed-DDS marks, owner/peer guild names and master succession. Two real accounts pass SDL guild workflows; fresh MariaDB and the deployed schema8 migration preserve durable records with native backups. Audit original Tantra/Database account blobs, GameInfo summaries and billing exports without changing them. Selected story21 and material tasks10006/10013/10057 verify source dialogue, kill/item objectives, party rewards, replay and reopen. Dash3014/3114, multiple3012 and ordinary families901/911/915 in Zones02/03/04 pass bounded combat/death/reward/loot/respawn/resurrection. Zone05 passes native resources/actors, two-client paid entry/free return, party/chat, environment/BGM and two fresh saved-state logins. Record absent3905 and zero-position NPCs. Stage matching Release runtime files. P16-01/P16-07 close:173/254 (68%),6/10 gates. Earlier fixture failures remain recorded; no Debug or broad benchmark rerun. The previous C08 benchmark is historical for its frozen binary. Public beta remains unaccepted with explicit release gates. Preserve Tantra-O."})
    project["foundations"].insert(0,"Native guild ranks/permissions/paid marks, selected quest21/material tasks and Dash/multiple-strike authority; additive schema8 preserves deployed accounts")
    project["foundations"].insert(0,"Zone05 MandaraCave3rd: original resources, two-client600-Rupiah entry/free return, environment/audio and fresh-process saved state; missing3905 skipped")
    latest.insert(0, {"date": "2026-11-05", "title": "Frozen beta, operator account controls and beginner progression", "text": "Freeze Zone01-Zone05,210 enabled skill IDs,22 story flags and three task quests through shared compiled client/server policy; reject unlisted actions and unfinished quiz34. Server Manager adds timed block/unblock,password reset and all-world session/grant/ticket revocation through protected operator RPC. Schema9 preserves deployed MariaDB account and character data with pre/post backups. Restore first-entry tutorial message1051,native accept0/reject1 and ordinary tutorial confirmations. A fresh unboosted authority journey completes five tutorials,equipment,repair,first class,death/revival and saved return; two real network accounts verify SDL choices,equipment and reconnect. Focused Release checks pass and matching runtime files are staged. No Debug or broad FX/performance rerun. Combined fresh-account party/trade,clean-PC delivery,measured public cap,abuse checks and release operations remain open. Task coverage stays173/254 (68%),6/10 gates; public beta remains unaccepted. Preserve Tantra-O."})
    project["foundations"].insert(0,"Frozen five-zone beta policy, protected native account controls and schema9; fresh tutorial/first-class/equipment/death/saved-return progression verified")
    latest.insert(0, {"date": "2026-11-05", "title": "Local beta package, Mandara1st, standalone tools and native social UI", "text": "The extracted signed ZIP passes an unboosted two-client level-one journey: tutorial choices,equipment,party,native trade drag/review,merchant sale,warehouse item/currency round-trip,save and two fresh-process returns. Fix owner-specific equipment names,network collision-grid safety and authoritative occupied-cell echoes. Correct26 Mandara1st NPCs through38 numeric cells in the owned Dotum XLSX; matching native TPA and both online populations have zero position differences. Reject NewMandara. Separate fourteen data-tool actions into TantraDataTools and remove Tools from Server Manager; native server export is TantraParam_sv.tpa,installed as data/TantraParam.tpa with paired C++ rules and rollback. Restore1515 missing exact-path native resources from the approved Global client without overwriting files or extracting HPKs. Restore original party229/Ashram217,218 layouts with server TP and tribe/level/rank/status metadata; focused Release GPU component and MSGSRV presence checks pass. The earlier real-network journey and latest UI component evidence are distinct. The current download verifies native signature/tamper rejection and isolated hashes,while its profile remains localhost. Separate clean-PC,public endpoint/cap/abuse/operations gates remain open; automatic party loot distribution is unavailable. Named coverage remains173/254 (68%),6/10 gates. Historical C08 benchmark and Tantra-O remain unchanged."})
    project["foundations"].insert(0,"Isolated signed beta ZIP and fresh two-client party/trade/services/saved return; public endpoint and separate clean-PC acceptance remain open")
    project["foundations"].insert(0,"Owned XLSX Mandara1st placements,standalone Data Tools,server _sv export/native deployment and1515 qualified missing-asset restores")
    project["foundations"].insert(0,"Original party/Ashram information/member layouts with server TP,tribe/rank/status fields,native images,scrolling and widescreen resize")
    latest.insert(0, {"date":"2026-11-05", "title":"Native party controls, signed LAN deployment and new-character entry fix", "text":"Implement source-based automatic party loot with nearby living recipients,native currency rounding,stack/overflow behavior and random equipment fallback. SQL recipient commits are atomic and receipt/revision protected; MSGSRV persists leader-owned loot mode. Native sender/expiry invitations and party/Ashram leave/kick/disband prompts use original images. Focused Release SQL/social and GPU component checks pass. Export signed profile15 with matching172.16.90.12 TLS identity and game listeners; actual staged HTTPS status200 and six hostname-verified TLS endpoints pass. Enable executable-specific LocalSubnet firewall rules while SQL/RPC remain loopback. Development/final servers share preserved MariaDB13306/tantra_bgfx schema9; local phpMyAdmin separately selects it alongside XAMPP3306. Fix newly created character entry by synchronizing channel roster slots after create/delete ACKs; a focused native-channel regression preserves appearance and reconnect while rejecting foreign owner inventory. Stage the Release launcher and build a signed LAN ZIP with tamper rejection. Earlier two-client graphical journey evidence is separate; another PC,live graphical automatic loot,Internet/public-capacity/abuse/operations acceptance remain open. No Debug or broad FX/performance rerun. Coverage stays173/254 (68%),6/10 gates. Preserve Tantra-O."})
    project["foundations"].insert(0,"Native atomic automatic party loot,persisted leader mode,one-use invitations and original party/Ashram confirmations")
    project["foundations"].insert(0,"Signed172.16.90.12 LAN deployment,hostname-verified TLS,LocalSubnet firewall and preserved shared MariaDB; new-character owner-entry fix and LAN ZIP")
    latest.insert(0, {"date": "2026-11-05", "title": "Original-style Tantra launcher, signed patching and shared game settings", "text": "Combine the native C++ patcher and launcher in Tantra.exe; retire Update.exe and require its inherited one-use handoff before ZFLauncher starts. Preserve offline entry, game restart supervision, package tooling and Manager launches. Publish signed schema-2 Patcher.dat, immutable lists/notices and hashed payloads to the LAN XAMPP feed. Verify tamper rejection, interrupted-install recovery and preference-preserving checks. Reuse original K2108 PE bitmap resources and dialog grouping without modifying the originals. Remove duplicate disabled captions; launcher Options saves the same game Graphics.cfg/Interface.sys formats for resolution/aspect/custom size, window modes, actual graphics quality and separate sound volumes. One isolated launcher session verifies File Check, Apply/reload/Cancel, invalid resolution and borderless controls. Earlier focused Release checks also correct native owner speed, any-angle collision-swept routing and smooth monster/peer interpolation. Current beta ZIPs predate these fixes. No gameplay/FX benchmark rerun or separate-PC/public acceptance is claimed; 173/254 tasks (68%),6/10 gates remain unchanged. Preserve Tantra-O."})
    project["description"] = f"Source-based bgfx/SDL3/miniaudio client and native C++ shared MMO services. Named coverage remains {project['done']}/{project['total']} ({project['percent']}%) with {project['accepted']}/10 accepted gates. C08 and five zones retain their bounded original evidence; the C08 benchmark applies to its frozen executable. The current client uses an original-style combined Tantra.exe launcher, signed LAN patching, shared game settings and corrected continuous online movement. New public packaging, Internet connectivity, clean-PC acceptance and public cap/abuse/operations gates remain open."
    project["foundations"].insert(0,"Combined original-style Tantra.exe launcher, one-use game handoff and signed recoverable LAN patches; shared game display/quality/audio settings and preference-preserving File Check")
    project["foundations"].insert(0,"Native online speed/parity decoding, collision-swept continuous owner routing and frame-by-frame monster/peer interpolation; focused Release evidence")
    project["next"] = [
        "Deploy a public hostname/address with matching game TLS and HTTPS patch hosting; current 172.16.90.12 connectivity is LAN-only",
        "Build the final matching package with Tantra.exe/current movement fixes and public signed files; verify installation, patching and login on a separate clean Windows PC",
        "Run one final-build two-client beginner/social journey including graphical automatic party loot, trade/services and saved return",
        "Finish public-entry abuse checks and measure sustained mixed gameplay/save/reconnect behaviour to set the initial player cap",
        "Demonstrate backup/restore and package rollback, monitoring/crash collection, individual beta accounts and tester reporting before the release decision"
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
    command_doc = ROOT / "reference/bgfx/docs/NATIVE_COMMANDS.md"
    command_doc.parent.mkdir(parents=True, exist_ok=True)
    command_doc.write_bytes((source / "docs/NATIVE_COMMANDS.md").read_bytes())
    for relative in ("LAUNCHER_PATCHING.md", "evidence/launcher-patcher-20261105.json", "evidence/online-movement-20261105.json", "evidence/any-angle-movement-20261105.json", "PACKAGE_RECOVERY_ACCEPTANCE.md", "evidence/c08-acceptance-20261105.json", "evidence/c08-benchmark-20261105.json", "evidence/c08-graphics-persistence-20261105.json", "evidence/goal-completion-audit-20261105.json"):
        target = ROOT / "reference/bgfx/docs" / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes((source / "docs" / relative).read_bytes())
    for evidence in (source / "docs/evidence/launcher-patcher-20261105").glob("*.png"):
        target = ROOT / "reference/bgfx/docs/evidence/launcher-patcher-20261105" / evidence.name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(evidence.read_bytes())
    server_docs = source.parent / "_server_cpp/docs"
    server_reference = ROOT / "reference/_server_cpp/docs"
    for relative in ("PARTY_LOOT_LAN.md", "SECURE_CONNECTIONS.md", "evidence/party-lan-20261105.json", "BETA_LOCAL_PACKAGE.md", "PROJECT_DATA.md", "evidence/beta-local-package-20261105.json", "evidence/global-asset-fallback-20261105.json", "evidence/mandara1st-npc-reference-20261105.json", "BETA_CONTENT.md", "BETA_ACCOUNTS_BEGINNER.md", "evidence/beta-accounts-beginner-20261105.json", "GUILD_QUESTS_ZONE05.md", "evidence/guild-quests-zone05-20261105.json", "evidence/zone05-acceptance-20261105.json", "evidence/zone05-travel-persistence-20261105.json", "evidence/guild-quest-persistence-20261105.json", "evidence/original-sql-reference-20261105.json", "FOUR_ZONE_ACCEPTANCE.md", "evidence/four-zone-acceptance-20261105.json", "evidence/four-zone-native-inputs-20261105.json", "PROJECTILE_CAVE_RECOVERY.md", "evidence/projectile-cave-recovery-20261102.json", "evidence/c08-release-benchmark-20261102.json", "evidence/c08-release-raw-20261102.zip", "ADVANCED_NPC_SERVICES.md", "AUTOMATIC_BACKUPS.md", "MANDARA2ND.md", "evidence/npc-map-backups-20261102.json", "SIMULATION_CHECKPOINTS.md", "evidence/tick-profile-20261101.json", "evidence/checkpoints-20261101.json", "evidence/scaling-gui-20261101.json", "evidence/mariadb-deployment-20261101.json", "evidence/two-client-simulation-20261101.json"):
        target = server_reference / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes((server_docs / relative).read_bytes())

    for evidence in (server_docs / "evidence/beta-local-20261105").glob("*"):
        if evidence.is_file() and evidence.suffix in (".json", ".png"):
            target = server_reference / "evidence/beta-local-20261105" / evidence.name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(evidence.read_bytes())

    for evidence in (server_docs / "evidence/party-lan-20261105").glob("*"):
        if evidence.is_file() and evidence.suffix in (".json", ".png", ".log"):
            target = server_reference / "evidence/party-lan-20261105" / evidence.name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(evidence.read_bytes())

    server_sql = server_reference.parent / "sql"
    server_sql.mkdir(parents=True, exist_ok=True)
    sql_readme = (server_docs.parent / "sql/README.md").read_text(encoding="utf-8")
    sql_readme = sql_readme.replace("../../Tantra/Database", "https://github.com/AsheshPlays/Tantra-Src/tree/main/Tantra/Database")
    (server_sql / "README.md").write_text(sql_readme, encoding="utf-8", newline="\n")

    for source_image in (server_docs / "evidence/projectile-cave-recovery-20261102").iterdir():
        target = server_reference / source_image.relative_to(server_docs)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(source_image.read_bytes())

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
            content = re.sub(r"Reviewed: \d{4}-\d{2}-\d{2}\.", "Reviewed: 2026-11-05.", content)
        elif "## " + VERSION not in content:
            entry = """# Unreleased

## 1.0.28 - 2026-11-05 (Tantra-B only)

Changed: original-style combined Tantra.exe launcher, one-use game handoff,
signed recoverable patch feed, shared game graphics/audio settings and continuous
online owner/replica movement. Preserve player preferences during File Check.
Verified: focused Release launch/tamper/recovery/preferences checks and one
isolated UI/settings save/reload/cancel session. Original resources are unchanged.
Failed: overlapping disabled captions corrected. No remaining focused failure.
Remaining: rebuild the public package, Internet host/TLS/HTTPS, separate clean-PC
acceptance, final graphical party loot and public cap/abuse/operations gates.
Named coverage remains 173/254 (68%),6/10 gates. No broad game/FX benchmark rerun.
Tantra-O remains unchanged.


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
    for path in (ROOT / "reference/bgfx/docs").rglob("*"):
        if path.is_file(): manifest["files"][path.relative_to(ROOT).as_posix()] = sha(path.read_bytes())
    for path in server_reference.parent.rglob("*"):
        if path.is_file(): manifest["files"][path.relative_to(ROOT).as_posix()] = sha(path.read_bytes())
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
