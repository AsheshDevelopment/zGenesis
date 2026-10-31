
## 31 October 2026: connected C++ MMO checkpoint

Two real Release BGFX clients now pass combat/projectile rendering, party HP,
SDL trade icons/review/commit and local-ledger cash delivery. Separate Zone01 and
Zone02 processes pass paid outward/free return travel, remote party presence/HP
and two-way party chat; stopped SQLite records confirm the one fare and claimed
handoffs. MSGSRV restart/rebind and automatic interrupted-cash recovery also pass.
Native altar cancellation/commit, tutorial turn-in, class-change event56/skill41347
and current/saved resurrection choices have targeted authority or graphical
checks. Reserved MOB slot70 preserves refundable death loss; recovery clears it
with consumption and HP. Yut quest lookup follows registered winnings while the
original disabled betting transport stays disabled. No Debug rebuild or broad
FX regression was performed for this checkpoint.

P14-01..10, P15-07/08/10, P16-05/06/09/10, BG-ONLINE-01 and BG-MULTI-01 now
have evidence. All ten per-map acceptance gates and the broader C09 gate remain
open. Competitive arena/castle recovery remains an active server task.
See ../_server_cpp/docs/evidence/online-six-part-20261031.json and the server
IMPLEMENTATION_PROGRESS.md. The wider roadmap percentage is distinct from this
six-requirement online batch.

# ZFLauncher bgfx progress and continuation

## C++ server connection (2026-10-29)

The existing ../_server_cpp C++/Win32 server and manager now have optional
MariaDB persistence, account registration, configurable private LAN listeners
and a BGFX Client action. The native two-client route through MariaDB passed
with shared PC/NPC visibility. Release artifacts are staged. Full online
combat and graphical acceptance remain on the server roadmap. See
../_server_cpp/docs/BGFX_MARIADB.md for scope and evidence.


Updated: 2026-10-29. Status: **C02, C05 and represented C06 checkpoints accepted and staged; full plan incomplete**.

## Five-part goal completed (2026-10-29)

Complete the requested direct TPA/FX/navigation/persistence/profiling deliverables
for the supplied offline client. Final friend support uses the source target
selector, relation tables and recovery cases; support events/FX own the actual
recipient, with actor-generation/death cleanup and no fake player damage.
Two authored support fixtures pass, and the final one-case D3D11 attachment
check passes. Wider existing FX, weapon timing, navigation, persistence and
CPU/GPU/loading evidence is reused. No Debug rebuild or broad suite repeated.

Staged Release SHA256: 54b0244fb51546eacd82a5c2a1519c0d664155c9e36763db14b2f653aec030aa.
Evidence: build/evidence/support-final-release3/SUPPORT_RESULT.json,
support-final-graphics1/IMPACT_SOCKET_RESULT.json, support-final-release-build1.log
and goal-final-stage.log; final_five_part_audit in the existing goal JSON.

The full remake roadmap remains open. Preserve its explicit broader gameplay,
missing-resource, every-map/native-TBO/visual-parity and full C08 limitations.
Percentage estimates are withdrawn. The baseline profile remains pinned to
ff977 and is not a current-executable performance/speedup claim. Changes are
uncommitted; no additional Git operation was requested for this closeout.

## Native monster skill patterns (2026-10-29)

Connect original CMob::SelectSkill and all 50 source ten-step patterns to live
NPC casts. Preserve the default-only path without pattern RNG, repeat counts,
synchronized echo/action locks, melee/ranged default substitution and shared
CRT state. NPC strikes now run native CalDamage/CastInstant1/CastInstant2 and
source success rolls, including the draw consumed by a 100-percent chance.

Route enemy/area hits through the correct victim range; EnemyFarFirst follows
the direct UseSkill path. Apply supported NPC self effects on the caster's
session, and attach self impact FX there. Suppress fake player damage text,
digits and shield impacts from self/support events. Match HTOtherObject's
activate FX/normal attack animation on monster echo; do not invent a separate
MON cast-graph phase. Missing MONSkill presentation records are noted/skipped.

The focused Release probe passes default monster2001, fixed monster2018 pattern
vectors, synchronized repeat-two/lock checks and three world cases: 2018's
41403/41404, 2072's synchronized41411 and an explicitly queued2242 self41234.
The fixture restores player HP between hits to finish the sequence; it does
not claim balance/recovery or automatic low-HP AI-condition coverage. Initial
failures were fixture exhaustion and a test-only skill ID offset error; retain
their logs. Final targeted result: 3 world cases, 7 echoes,
5 distinct skill hits. No Debug build, broad matrix or fresh
GPU/full-launcher runtime. The Release artifact is staged, SHA256 115f90d370297560aafed3dc1378602859fcbcdcfac4309520524f0f4027f865.

Evidence: build/evidence/monster-pattern-release4/MONSTER_PATTERN_RESULT.json,
MONSTER_PATTERN_TRACE.tsv, monster-pattern-release-build1.log through build4.log
and monster-pattern-stage1.log. Friend/party recipients, remaining instant/world
services, reflection and scripted AI conditions remain open. Full goal remains
active; about93% is an engineering estimate. Current details/hashes are in
native_monster_pattern_checkpoint in the existing goal evidence JSON.

## Five-part goal coverage review (2026-10-29)

Current source and matching input hashes retain the existing direct TPA,
navigation, fresh-process/SDL persistence and CPU/GPU/loading evidence. Update
the TPA summary to the expanded Monster comparison: 135800 matching and 1192
differing numeric cells across Item/PCSkill/MonsterSkill/Monster. Differences
remain version evidence rather than being forced into one dataset.

Full skill/weapon FX coverage remains open: native monster SelectSkill pattern
dispatch is not connected to the live world. 588 installed monster templates
have nonzero special-skill patterns; the current world still picks only default
melee/ranged attacks. Next implement pattern dispatch, synchronized cast phases
and enemy/self/area target handling through the existing FX pipeline. Keep other
world-service and missing-resource limits visible. Full goal remains active;
about 92% is an engineering estimate, not a measured completion score.

No new builds or runtime tests for this review. Existing evidence retains its
original scope/build hash; no fresh current-executable performance or all-map
parity claim. See the detailed five-part coverage review in the existing plan
and five_part_coverage_review_20261029 in the existing goal evidence JSON.

## Native dash skills (2026-10-29)

Implement StartAction/Dash for learned skills 3014 and 3114 using the source's
rounded cell distance, five truncated samples, nearest free attack cell and
radius-ten free-cell ordering. Preserve ties and shared random state. Retain
client TCC/TBO collision between samples so dashes stop at solid geometry.

Move with the native ACTION11 running behavior and speed 40; start movement
after the actual activation time. Ground/keyboard movement, sitting and another
cast cannot override an active dash. Escape/death/map reset clear it. Only
skill 3114 resumes attacking the original living target generation at landing.
No extra dash damage is invented, and TP is paid once at commit.

Skill 3014's fxPC presentation binding is missing. Record and skip it, use the
normal native run animation, and retain its server timing/movement. Skill 3114
uses the existing animation/FX event pipeline. No replacement FX was created.

Validation: five small destination vectors and two actual authored world casts
pass in one focused Release probe. The first run exposed the missing 3014
binding; one incremental Release fix/recheck passed. No Debug rebuild, broad
matrix or fresh GPU/full-launcher scenario. Existing unrelated evidence reused.
The staged Release SHA256 is 75fdc737c8e43ae08cd0e1a44b921b8bb4aabdbb92fe09d50fc0b20bd347a181.
Evidence: build/evidence/native-dash-release-build1.log,
native-dash-release-build2.log, native-dash-release2/DASH_RESULT.json and
native-dash-stage1.log. Full five-part objective remains open.

## Post-damage skill recovery (2026-10-29)

Compile the original CMob::CastInstant3 with OnHeal/OnRecoverTP. Skills 3142
and 3227 now cast through the existing native timing/FX pipeline and recover
HP/TP after a successful hit. Use HP actually removed, including killing hits,
so overkill does not inflate recovery. Preserve recovered vitals in the final
world snapshot; cancellation remains unpaid and does not heal.

The same original handler is connected to monster hits. Native IncTP retains
its NPC guard, preserving the monster template ID; timed steal entries remain
ignored by CastInstant3 as in the source. No fresh NPC-steal encounter or full
launcher runtime was run for this checkpoint.

Validation: one Release build and one focused probe, with two authored world
casts, native percentage/caps, cancellation, cost and killing-hit recovery.
No Debug rebuild or broad regression matrix. Release launcher staged to the
client, SHA256 45b0f49b8f7e24c57f0d712be78500fd57d915bb55365d442480d281b234a1e9.
Evidence: build/evidence/native-steal-release-build1.log,
native-steal-release1/STEAL_RESULT.json and native-steal-stage1.log.

## Directional and ordinary weapon impacts (2026-10-29)

Ordinary attacks now play their original impact graph via Item.dwItemType and
PCAttackAni.dwImpactFX. Preserve the attack-start item through projectile release,
Escape, replacement equipment and arrival. Empty hands retain the original
no-item behavior; equipped hand weapons still use their authored impact family.

Match HTEngineHandler's opponent overload for PC weapon/skill and incoming monster
melee/projectile impacts: no-socket effects attach to the opponent; directional
ones use its animated Front/Left/Right/Back_Din sockets. Preserve the source's
Front_Din baseline, Din default and strict tie comparisons. Missing authored
sockets are recorded and skipped without invented substitutes. Keep ordinary
hit callbacks' default level 1 impact separate from the phase FX level bands.

Before the user's reduced-testing instruction, Release/Debug each passed 4,445
focused source/data checks over 329 weapons, 12 types, five graph families and
2,050 skill-level variants. The renderer passed 8,178 checks over 512 character
pose/direction cases spanning all eight models, rotation, scale, idle/run and
CPU/GPU skinning. The native-world pipeline passed 30 encounters, 18 rendered
cases, 14 ordinary-impact cases and six lifecycle cases, including released-shot
equipment replacement, bare hands and dual wield. Record/skip the same three
previously missing skill resources; no replacement search or unsupported FX.

Build and stage Release SHA256:
d209d86e21f22f6d5577839ab91e2451a16d9277101134b3cf336bc482649ac6.
The additional incoming-impact player-parent assertion is built. A fresh launcher
scenario was not run after staging; the user requested fewer tests. Keep the
native world/renderer evidence distinct from a full-launcher acceptance claim.
Evidence:build/evidence/impact-sockets-Release, impact-sockets-Debug,
directional-impact-render1, directional-impact-projectiles1,
directional-impact-launcher-build1.log and directional-impact-stage1.log;
directional_weapon_impact_checkpoint in the existing goal JSON. The complete
five-part goal remains active.

## Centred live resolution changes (2026-10-29)

Applying a new resolution or aspect ratio now centres the resized window on its
current SDL monitor. Capture the display before leaving fullscreen or changing
size; synchronize the new size before requesting SDL's centred position on that
same display. Borderless/fullscreen transitions keep the selected monitor, and a
failed live Apply restores the prior window position with its previous settings.
The same path centres startup and a return from fullscreen to windowed mode.

The exact staged Release build passes 128 actual SDL/MainUI graphics checks:
4:3,16:9,16:10, typed 1320x825, borderless, exclusive fullscreen, windowed restoration,
live quality, persistence, invalid input and Cancel. The test starts with a
window deliberately displaced from centre and checks its real OS position after
Apply, within one logical pixel of the monitor centre, retaining the display ID.
Protected client files, fixture seeds and the normal profile remain unchanged.

Staged SHA256:ac2640c142bdef247b80f36f1ccc7caccfea7dff9b3aa602bb3eab6a84988da0.
Evidence:build/evidence/centered-display-runtime1/GRAPHICS_OPTIONS_RESULT.json,
PROCESS_RESULT.json, centered-display-release-build1.log and centered-display-stage1.log.
The existing goal JSON contains centered_display_checkpoint. The broader skill/
FX and full-goal audit continue separately.

## Native self-taunt casts and impact ownership (2026-10-29)

Supersede the earlier gated 57-check phase audit below. Skills 3023/3028 now run
through their actual 132=DealDamage+AffectSelf path. Compile MemorizeAttacker's
original self-owner early return, then execute native OnTakeAffections/AddEffect.
Apply the caster effect after each successful unit, including a killing hit;
retain 8-second ownership, the inner Taunt bit, shared CRT and 500ms scheduled
expiry. Do not put that timed effect on the monster or invent a threat bonus.
Another-recipient Taunt still requires its remaining world ledger.

Source HTMainCharacter explicitly sends 3028 as an area cast around the caster,
even with nonzero iRange. It needs no selection or approach. Emit its authored
one-shot state graph once on the caster, also for an empty enemy list, without
repeating weapon/hit audio or extending the portal action-lock timer. Keep 3023's
authored zero-animation phases and original marker timing.

Correct original no-socket impact categories 0/100/200 to attach to the opponent,
while activation/state graphs retain their own binding. Verify the actual parent
in the renderer. The source's other directional impact-socket selection remains
a separate parity gate; do not treat this as proof of every socket category.

Release passes 11,179 native checks across Naga/Kinnara, both skills and fine/coarse
frames: actual costs/markers, self versus target state, caster-centred membership,
Escape, equipment deadline preservation, scheduled expiry, precommit death,
killing-hit self application, revival Init and empty-area presentation. Four
D3D11 presentations pass 17,174 checks with authored clips/graphs, depth testing,
attachment assertions and scene/death cleanup, with no missing FX in these cases.
Debug also passes 11,179 checks across all eight cases; the independent native
hostile-affection Debug suite passes 10,512 checks.

The five Release combat suites pass. The fresh projectile regression passes 28
encounters across 12 weapon types, five rendered cases and five lifecycle cases.
Record and skip the same three missing resources: 3303 activation graph 1001086,
3301 follow Sound 2310028, and 3162 activation binding 1000646. No replacement search.

The exact staged executable is the ac2640c1 build verified by the centred-display
checkpoint above. Evidence:build/evidence/taunt-self-Release, taunt-self-render3,
taunt-self-release-ctest4.log, taunt-self-release-ctest5.log, taunt-self-projectile1
and taunt_self_affection_checkpoint in the existing goal JSON. The full five-part
goal remains active: remaining available skill/socket coverage, linked/world
services, portal/buff parity and the final completion audit are still open.

## Taunt phase admission audit (2026-10-29)

Verify the native enum before enabling the two taunt casts: AffectSelf is 128,
whereas instant Taunt is 256. All 10 installed Taunt skill rows are 3023/3028 with
phase 132=DealDamage 4 + AffectSelf 128. They do not use the disabled instant phase.
CMob2::CastSkill dispatches AffectSelf to OnTakeAffections, whose active Taunt
branch calls MemorizeAttacker then AddEffect. MemorizeAttacker's self-owner early
return does not remove that timed effect. Keep both authored casts gated until
the native self-affection and world target-selection behavior are covered.

Generate a checked source flag for the separate OnTakeInstant0 handler, which
returns immediately before its unreachable score loop. Skip those inert effects
only with the actual 256 phase and without either active affection bit. Debug
and Release each pass 57 admission checks: genuine learned 3023/3028 casts reject
without TP charge, queued movement or fabricated buff; mixed/unknown phases stay
gated. Synthetic inert-phase variants exercise the guard without replacing data.
This audit does not claim taunt/threat or authored skill rendering is complete.

Evidence:build/evidence/taunt-phase-Release, taunt-phase-Debug,
taunt-phase-release-ctest2.log, taunt-phase-debug-ctest1.log and the source hashes
in taunt_phase_admission_checkpoint of the existing goal JSON. The earlier
exploratory Release cast-admission test failed; the verified source phase audit
supersedes that assumption. Preserve the failure log as evidence.

Build and stage Release SHA256:
effb2a8bd6fb3efab94f319227993f32f175b41a783eed3087e203eeed71ad47.
The Release strike regression passes 19,041 checks across five native proc cases
and eight encounters. The exact staged executable passes isolated SDL combat:
two player/two monster impacts, source 41004 impact FX with world depth testing,
selected target/facing, default chat, loot/prana/trail and saved combat state.
Protected client files, immutable seeds and the normal profile remain unchanged.
The smoke result's death_pose_and_zero_hp_presented flag is false; retain that
limit instead of treating this run as independent corpse-pose proof. Dedicated
prior death probes remain separate evidence. Logs:taunt-phase-launcher-build1.log,
taunt-phase-strike-release1.log, taunt-phase-stage1.log and taunt-phase-runtime-combat1
under build/evidence. This is a partial checkpoint; the complete goal stays open.

## Refreshed CPU-skinning baseline (2026-10-29)

Profile the staged ff977c0e build in six sequential fresh processes, with no
concurrent build or QA. Keep 1024x768, Direct3D11, VSync off, native population,
120 warmup frames and 1,200 measured frames per scene/trial. All 7,200 GPU timing
samples are valid. Town retains 4 actors; field-idle retains 43; both field-combat
runs retain 38..44, passing the minimum-workload gate without town/revival collapse.

| Scene | Trial1 wall/GPU median ms | Trial2 wall/GPU median ms |
| --- | --- | --- |
| Town idle |11.636 /2.838|11.183 /2.594|
| Field idle |13.846 /2.984|13.779 /2.995|
| Field combat |13.586 /2.914|16.311 /3.692|

First playable loading is 5.145..5.740 seconds with cold per-scene derived caches
and 2.543..2.716 seconds with warm derived caches. Settled field population extends
the field runs to 7.101..7.383 seconds cold and 4.106..4.466 seconds warm. OS disk
cache is uncontrolled. Keep stage/loading CSVs and CPU scopes; pose deformation
is nested within animation traversal, and delayed GPU timers overlap CPU work.
Combat trial 2 is slower, so this is a measured baseline without a speedup claim.
The inspected field-combat 2 screenshot retains the real field, selected target,
chat, HP/TP, loot and native scene objects. Protected client files and the normal
profile remain unchanged.

Evidence:build/evidence/goal-profile-player-periodic1/WORLD_PROFILE_MATRIX.json,
per-run FRAME_PROFILE.csv/PROFILE_SUMMARY.json/loading captures and integrity
results; player_periodic_cpu_profile_checkpoint in the existing goal JSON.
This pins the player-periodic executable before the subsequent taunt admission
change. Final-current build verification and the complete goal audit stay open.

## Player periodic damage, clock and revival (2026-10-29)

Extend the source-compiled periodic reducer to the player, keeping defense and
resistance considerations, PC/self damage reduction, immunity, shield energy,
absorption and original party/status notifications. Resolve the original effect
owner from trusted native world data. Supported NPC affections now register on
the real player session at the hit marker; preserve native success-rate handling.
Keep later unpaid attacks/skills blocked by source DontAttack control.

Advance the player clock even when no effect is active and again before the
current gameplay marker frame. A buff cast after a long idle receives its full
native lifetime. Continue paid effects after Escape without another TP charge.
A lethal self tick uses OnKilled's self-kill exemption; a hostile tick uses the
existing once-only ordinary death penalty. Cancel pending actions and enter the
native death state. Source Regen calls Init: revival now resets transient status
rather than carrying a previous life's damage effect into the revived character.

Periodic HP updates produce status changes without cast/weapon/hit-count or
attack-chat replays. A fatal hostile tick emits the native death message once;
the existing dead-to-alive message remains separate. Damage updates uiDamaged,
whereas ordinary portal admission checks uiAttacked/uiActivate/uiMoved. Keep DoT
out of the portal activation lock. Verify an uncommitted 1,000-Rupiah Mandara
route quote while the self buff remains active after its real cast lock expires.

Debug and Release each pass1,450 checks:14 player-lane cases, native magic-shield
ordering, two fine/coarse self-cast cases3025, two native monster41233 hit cases,
clock/cancellation, once-only penalties, revival reset, authenticated poll/save/
relogin, fresh entry protection and the portal quote. Boss-hit isolation uses
explicit stress-test Muscle20000/Heart400 through the native formulas so the
large initial attack does not hide its DoT. Ordinary self/authenticated cases use
normal source-derived caster vitals. The four Release combat probes pass; the
prior four-probe Debug suite and final updated player Debug probe pass as well.
The chat/drag GPU regression passes33 checks including periodic death and revival.

Build and stage Release SHA256:
ff977c0e8ac620f37545cf1dbb8426dc524f93066f881793a16790529f41affb.
The exact staged build passes actual SDL basic combat and reward persistence,
skill3110 buff ownership across two equipment replacements, Escape/no recast cost,
and native HP/TP recovery with matching UI and saved values. Recovery observes
HP1->11 and TP1->4 at7.83333 seconds of the presentation probe. All three private
runs preserve protected client files, immutable seeds and the normal user profile.
Support data, profiles and logs remain outside the client; Start-Offline.cmd stays
inside the client.

Evidence:build/evidence/player-periodic-Release, player-periodic-Debug,
player-periodic-final-release-ctest3.log, player-periodic-final-debug-ctest5.log,
player-periodic-portal-release5.log, player-periodic-chat-final2,
player-periodic-runtime-combat1, player-periodic-runtime-buff1,
player-periodic-runtime-recovery1 and player-periodic-final-launcher-build4.log.
The player_periodic_damage_checkpoint in the existing goal JSON records hashes,
source functions, scope and per-run results. Earlier NPC/control probe pending
flags describe their own coverage; the separate player probe proves this subset.

Keep the complete five-part goal active. Taunt/threat, linked/realm/challenge
world services, remaining skill/weapon coverage, portal/posture/cross-zone buff
parity and refreshed CPU/GPU/loading measurements remain open. This checkpoint
does not accept every native combat service or the full C08 package.

## Native NPC periodic damage (2026-10-29)

Compile original CheckAffections, AffectAffection, ElapseAffectionTime, PlayDice
and DecHP with the NPC damage-lane segment of OnTakeDamage. Retain 500ms checks,
whole-second accumulation, expiry clipping, source short conversion and integer
rounding. Carry the shared world CRT stream through native dice, including the
source draw on a zero-second physical term. Resolve defense/resistance using the
original eCon_MaxGap consideration and preserve native immunity/shield/absorption
arithmetic. The selected authority is the authenticated local PC hitting an NPC;
player recipients and wider attacker/world services remain separate work.

Order scheduled NPC effect checks with spell/projectile and ordinary attack
markers. Set the native dead FSM when HP reaches zero, cancel its pending attack,
play the original corpse clip and deliver loot/prana once. A respawn creates a
new native status session. Escape retains a paid, committed target affection.
Keep each semantic hit's own resulting HP and target generation so simultaneous
nonlethal effects cannot request a second death sound. Translate DOTbyDice's
registered state to Damage when binding the target-owned visual lifetime.

HTMonsterSystem::HT_vMonsterSystem_SCPRespUpdateStatus only updates current HP.
Accordingly, periodic status events do not replay cast FX, weapon sounds, hit
numbers or attack-chat messages. The killing tick retains the ordinary death
sound and existing corpse-born homing Prana flow. NPC status notifications are
collected per check rather than retained as an ever-growing notification history.

The final native probe passes2,937 checks in Release:14 lane/lag cases over all
seven damage lanes and four fine/coarse native casts, cancellation, no additional
TP costs, once-only death/rewards and clean respawn. Debug verifies the same
assertions. Source skill3303 is a direct marker cast, not a projectile; keep that
binding distinction in its tests. Existing10,512-check affection and5,377-check
hostile-world regressions pass in Debug and Release.

Build and stage Release SHA256:
aa899410b4bccb6375931be5ac4e25968574ab44cf2ee9318f236e4841707c15.
The actual staged SDL basic-combat run passes with reward persistence, protected
client files, the immutable seed and the normal user profile unchanged.

The rendered matrix passes28 encounters over all12 supplied weapon types,
five rendered cases and five projectile lifecycle checks. Verify skill3303's
impact geometry at its authored marker, then follow six seconds after cancellation:
periodic ticks do not create extra skill graphs or hit-count feedback and the
target state effect expires. Inspect its actual impact capture. Three missing
resources are recorded/skipped:1001086 PDG102_ATV, sound2310028 and binding1000646.
No replacement search or extraction is performed. The original chat/drag GPU
regression passes30 checks. This is runtime coverage of the represented effects,
not a claim that every authored asset or skill family is complete.

Evidence:build/evidence/periodic-damage-Release, periodic-damage-Debug,
periodic-final-release-ctest2.log, periodic-final-release-ctest3.log,
periodic-final-debug-ctest2.log, periodic-final-release-build2.log,
periodic-final-stage1.log, periodic-final-combat1, periodic-projectile-final3,
periodic-chat-ui-final1 and periodic-final-debug-ctest3.log.

Keep the complete five-part goal active. Player-recipient periodic damage,
taunt, broader attacker attribution, remaining available skill/weapon coverage,
portal/buff edge cases and refreshed CPU/GPU/loading measurements remain open.

## Ordinary portal handoff and distinct-map recovery (2026-10-29)

Implement original portal window214 with source MainUI textures, five destination
rows, native Philippine names/fee formatting and actual portal-triangle picking.
Escape closes without spending. Authorize the selected route and prepare the
complete destination before charging. Keep existing UI/preferences and quickbar
bindings while retiring old actors, names, popups, map images, FX and ambience.

Commit the fare and arrival as one conditional native-MOB update. Reject stale
saved snapshots and duplicate charges. Bind a one-use grant to the owned account,
world group, slot, character, portal and destination. Reconnect with real point02
authentication and native CHAR_INIT connection2, consuming the grant after entry.
A first-entry recovery also invalidates an older grant. In-zone warp remains a
separate authority path; broader in-zone/posture/competitive coverage stays open.

Select the complete K3 server Portal table for this K3 client, without rewriting
Global. Global's portal101 return rectangle is509/937; K3 and the installed client
use100/66 beside the actual portal. Import all121 K3 records outside the client,
with provenance and regeneration in CMake. Compare113 common direct-TPA records:
2,259 values match and114 differ. Preserve those remaining version differences.
The selected101->121->101 route matches native geometry, costs1,000 once and has
a free return. Keep later competitive/clan/event routes explicitly unavailable.

Map40002 lacks MAP_Mandara2nd.tms. Record it and skip only its ambient regions;
map/safe-area BGM selection remains independent and continues. Read available
TMS files through the native virtual-resource reader, including HPKs. Malformed
existing files still fail validation. Retain the recorded missing Env_FireTorch2
graph without searching for or inventing a replacement.

Debug and Release each pass2,400 portal data/ticket checks: full profile comparison,
stale inventory snapshots, duplicate charge rejection, slot/zone/name binding,
reconnect, single-use entry and first-entry recovery. Fresh C05 UI and5,375-check
hostile-control regressions pass. The final staged client passes45 actual SDL
round-trip checks and basic combat/reward persistence. Inspect the original portal
menu and rendered Shambala destination captures. All private runs preserve the
normal profile, protected client files and immutable seed profiles.

Recover the committed Shambala destination from an interrupted earlier handoff
in a fresh process and native login. Compare complete SQLite native MOB and cargo
blobs byte-for-byte, plus Interface.sys and quickbar hashes. Retain3/7 independent
audio preferences, verify actual slider effects on live miniaudio voices/music,
and restore the original saved bytes. The final build renders map40002 with9,959
placements. This adds distinct-art restart proof to the earlier six-process
character/village persistence matrix.

Built/staged Release SHA256: `3493607e9cd016323681f21d0177d7ece62d967a89c0f5edb58062b86286c301`.
Evidence:build/evidence/portal-handoff-final-sdl1,
portal-handoff-final-combat1, portal-shambala-final-restart1, portal-ticket-Release,
portal-ticket-Debug, portal-handoff-release-ctest1.log and
portal-handoff-debug-ctest1.log; portal_handoff_checkpoint in
`docs/evidence/five-part-goal-20261028.json`.

Keep the complete five-part goal active. Remaining available skill/timing and
periodic/taunt work, current-state CPU/GPU/loading measurements and the final
requirement-by-requirement audit remain open. These checks do not accept broader
competitive travel, all-map parity, cross-zone buff parity or the full C08 gate.

## Distinct-map portal preparation and map FX bindings (2026-10-28)

Read the original HTPortalParam loader/lookups, HTPortal client selection,
server.cpp CSP_REQ_MOVE_PORTAL and GetRandom before implementing route quotes
and landing preparation. Import164 selected Global portal records outside the
client, retaining all existing TSV bytes. Read113 shared installed-client Portal
records directly from TantraParam.tpa:2,168 numeric values match and205 differ.
Preserve client/server content versions rather than merging their destinations,
prices or rectangles. Portal names remain client presentation data.

Verify the native101->121 route:1,000 Rupiah, level15 in the original client,
map40002 and the source's upper-exclusive landing rectangle. The source server
leaves dwLevel initialized to zero; keep its admission separate from the client
level check. Cover exact3,000/3,001ms action boundaries, future action locks,
32-bit tick wrap, dead/held characters, insufficient money, first-match fees and
exceptional server fares without inventing extra client menu destinations.
These are preparation rules; competitive/clan/event admission is still separate.

Stage one complete Zone02 trio (GenerationArea.idx, MapData.tcm, NPCGener.txt)
plus its two Data settings files from E:\Global-server\Zone02 under the external
runtime. Pin all source/copy hashes. Do not mix zone datasets, extract HPKs or
write resources into the client. Existing tables remain byte-identical.

Decode both native40001 and40002 maps, prepare33 real landing cases and build
1,295 native destination actors. Debug preparation passes2,462 checks. The
Release D3D11 case passes2,485, submits terrain and placed geometry, renders the
character on the destination surface and initializes that map's own field FX.
The final arrival capture is visually inspected. Record and skip missing graph
1400020 Env_FireTorch2; no replacement search is performed.

Fix two production Mandara-only bindings found during this work: NativeWorldMap
retains strFXFiles from ClientRes, NativeWorldFx initializes that library, and
monster attack timing reads the same destination library. Do not use Mandara's
monster/field definitions on another map. The fresh Mandara hostile regression
still passes5,375 checks; Debug Mandara village-map resolution also passes.

Evidence:build/evidence/portal-data1, portal-preparation-release2,
portal-preparation-Debug, portal-debug-ctest1.log and portal-mandara-regression1.log;
portal_preparation_checkpoint in docs/evidence/five-part-goal-20261028.json.
The root Release build/stage passes. Actual staged Mandara field-FX pixels and
building occlusion, combat/rewards and3110 buff/equipment/Escape regressions all
pass. Protected client files, seeds and the normal profile remain unchanged in
all three runs. Built/staged SHA256:
`0b6cb8855f7a52966cbb52f641d9fd3cc078c06f5740502f655c3f225f01994c`.

At this earlier preparation checkpoint, portal UI/transactions and distinct-map
restart proof were still pending. The newer ordinary handoff checkpoint above
closes the represented101/121 round trip and Shambala restart checks. Periodic/taunt services,
remaining skill/timing coverage and final CPU/GPU/loading measurements also stay
open under the complete five-part goal.

## Live native hostile control and impact ordering (2026-10-28)

Connect OfflineWorldGameplay to genuine native NPC status sessions, sharing the
world CRT stream with the real player caster. Supported control/stat-reduction
affections now reach actual cast impacts, native factors, movement/attack locks,
500ms effect checks and priority-selected monster state FX. Keep source stun
attack/dodge factors at one. Hold blocks movement while allowing in-range attacks.
Remove target-owned loops on expiry, death, generation change or scene teardown;
retain committed effects after Escape and independently of caster presentation.

Queue spell/projectile commits with ordinary player/monster animation markers,
then resolve them chronologically in a frame. An earlier lethal monster marker
cancels the unpaid later spell; an earlier lethal spell cancels the NPC strike.
Guard target generations so a late event cannot affect a respawned replacement.
Synchronize native NPC health after each damage result, including lethal hits.

Verify CMob2.cpp's range-zero/nonpositive hostile-area origin: use the caster,
without a selected unit or forced approach. Fix the range-zero movement failure
exposed by actual learned skill3043. Preserve existing target-selection radius;
exact client/server edge-selection parity remains a separate coverage limit.

Release and Debug each pass5,375 live integration checks across fine/coarse3021
stun, two coarse-frame lethal orderings and pure-control3043 hold. The D3D11 case
passes5,451 checks, submits the native monster loop with world depth testing and
captures visible state geometry. Missing3017 presentation binding is recorded
and skipped; no replacement search or client-resource changes are made.

Fresh Release regressions pass:32 static/eight dynamic navigation cases with
3,848 surface samples; five native strike-proc cases/eight encounters;474 sitting/
stacking checks; native Wing socket transforms; all27 positive weapon/projectile
encounters, five lifecycle and four GPU cases;1,481 Taras checks;3110 and3159
state expiry/rebind/cancellation/death. Debug effect ticking, entry cleanup and
skill/equipment initialization also pass. Evidence is retained under
`build/evidence/hostile-final-*`, `hostile-world-control4`, `hostile-world-Debug`,
`hostile-world-Release` and the live-world checkpoint in
`docs/evidence/five-part-goal-20261028.json`.

The root one-click Release build/stage passes. The staged executable passes
actual SDL3124 skill/cancel,3110 buff/equip/unequip, combat/rewards,130 default
hotkey/posture checks and55 inventory/held-icon checks. All five runs preserve
protected files, seeds and the normal profile. Built/staged SHA256:
`587b3e35a8831be21b7a59ee618c5bbb3fce85f4c42c5434bd14333f70a68a99`.

Periodic damage, attacker/death/reward and taunt services remain open. This
hostile-skill proof uses the live gameplay API plus actual rendering; actual SDL
hostile-skill casting and broader skill-family/timing coverage remain separate.
Distinct client-map/portal travel and refreshed final performance measurements
also remain open. The complete five-part objective and C08 gate stay open.

## Native hostile-affection recipient component (2026-10-28)

Add NativePcStatusSession::takeSkillAffections, executing the compiled original
CMob::OnTakeAffections with a real caster session and native NPC recipient.
The caster skill deck, target resistance deck, level-tolerance dice and deck
reshuffles share one explicit Windows CRT stream. Restore local RNG bindings
after the call. Keep the native PC/PC absolute-level Consider lookup even for
NPC targets. Reject missing context and unsupported taunt/reinitialization
services before consuming cards or changing effect slots.

Verify source immunity behavior, attribution, combined hold/slow splitting,
DOTbyDice-to-Damage registration, duration extension and scheduled expiry.
Stun sets native attack/dodge factors to one and movement to zero; do not
substitute zero combat factors. Debug and Release each pass 10,512 checks,
including 1,228 controlled probability vectors and actual imported skill3017
recipient dispatch. Existing Debug checks pass:108 effect ticking,533 entry
lifecycle,1,271 skill initialization and664,211 probability comparisons.

Compile the existing native Monster loader into the BGFX resource library.
Expand the selected Global import from49 to92 numeric columns for genuine NPC
initialization. All53,263 existing cells across1,087 rows and every other table
remain identical. The native loader creates964 in-range templates. Keep this
server authority outside the client. Make the CMake importer retain the full
schema on regeneration rather than relying on a manual data edit.

Refresh direct TPA comparison against the expanded import:135,800 identical
numeric values and1,192 differences. Monster now compares2,426 equal values
and66 differences;49 newly exposed differences are byteReserve7, alongside
11 byteClass and6 byteSize differences. Preserve the installed-client/Global
version boundary. Item, PCSkill and MonsterSkill comparison counts are unchanged.

The root Release build/stage passes. Actual staged buff-owner and basic-combat
runs preserve normal profiles, protected client files and seeds. Built/staged
SHA256:2c69f25755040c6943d5df4c36f46e33c52a570628dc6216eb2328c0982cd62f.
Evidence:the hostile_recipient_checkpoint in
`docs/evidence/five-part-goal-20261028.json`, `build/evidence/hostile-affection-release3`,
`hostile-affection-debug1`, `hostile-authority-data1`, `hostile-full-monster-tpa1`,
`hostile-foundation-staged-buff1` and `hostile-foundation-staged-combat1`.

At this earlier component checkpoint it was not yet called by live casts.
The newer live-world checkpoint above wires supported control/stat reductions
into casts, NPC control, expiry and FX. Periodic damage, death/rewards and taunt
world services remain open. Distinct-map/portal travel, remaining timing coverage and the
full five-part completion audit remain open. No full hostile-combat or C08
acceptance is claimed, and previous profiling cohorts retain their own hashes.

## Requested fixes: current build verification (2026-10-28)

Recheck the preceding chat, held-icon, English-command and Prana changes, then
the requested Wing attachment, one-click build, sit/stand and pickup fixes.
All six pinned original-source hashes still match. The Wing attachment is an
authored socket on WeaponSpine, not a separate Wing bone; retain its transform
and the native model rotation rather than adding another rotation offset.

The root Release build-and-stage command passes. Fresh focused checks pass:
474 sit/stack, 1,258 rendered Wing/posture, 30 chat/drag, 2,912 command-parser and
5,059 Prana checks, plus four keyboard movement cases. Inspect the turned-wing
capture. The staged executable passes actual SDL posture/hotkeys (130 checks),
inventory/held-icon transactions (55), secret-whisper commands (147), and a
monster kill with persisted rewards and default-visible damage/Prana chat.
All four staged runs preserve the normal profile, protected files and seeds.

Evidence: `build/evidence/requested-fixes-verified1` and the latest verification
in `docs/evidence/chat-upward-drag-source.json`. Built/staged Release SHA256:
`d8d127b98b3b1febc25e829ed5ed8c9117f3e60c0aae147d80bbfe40d3e7d618`.
These requested fixes pass; remaining five-part work and full C08 acceptance
remain open. Existing uncommitted changes are retained.

## Available FX rendering, sound diagnostics and status restoration (2026-10-28)

Extend the preparation-only audit to sampled native rendering. The753 referenced
binding IDs now split into637 with complete required resources, six with a
missing sound but usable visuals, and110 with absent bindings/graphs. Sound
ID2310028 is absent from the installed K3 catalog and referenced by the follow
FX for3301/3143/3321. Record it without finding or inventing a replacement.

Submit all visual nodes across the637 complete IDs, using real actor attachment
markers, native TFX/TMB/TAB textures/curves, D3D11 and muted miniaudio. Sample
node starts, middles and ends with fixed actor poses; verify depth checking,
non-writing depth state, explicit retirement, authored expiry and missing-parent
cleanup. The first matrix completes13,730 samples without runtime errors. The
six partial graphs still submit all four visual nodes each despite their sound
failure; do not suppress their graphics because audio is absent.

Compare captured RGB output with each sweep's fixed-actor baseline. Initial
single captures for30 IDs happen outside their visible flash windows. A targeted
765-image timeline recheck shows visible output for all30. Combined verification
shows643/643 available visual binding IDs change at least one pixel by more than
two RGB levels. Counts are binding IDs, not unique physical graph files or legal
cast combinations; this is sampled visibility, not original-client visual parity.
Inspect representative resampled output before accepting the image comparison.

Improve sound-node diagnostics: validate nonzero sound resources during node
initialization, cache the resolved path, report decode/play failures and skip
only that node. Deduplicate repeated missing-node resource messages per scene/
library instead of logging the same missing sound for every owner or frame.
A separate30-ID matrix checks actual GPU object removal and zero owned voices
after retirement; six partial graphs check the same cleanup plus exactly one
missing-sound diagnostic across explicit stop, expiry and orphan retirement.

Fix a persistent-status cache error. Original HTGameSystem.cpp:991 and damage
status handlers call the affection selector even for unchanged status masks.
Our mask-only shortcut can leave a weaker active buff suppressed indefinitely
after stun ends. Process subsequent offline presentation snapshots through the
source previous/current selector, retain the age of an unchanged selected graph,
skip repeated attempts for known missing bindings and keep effects removed when
their actor is absent. This restores still-active Taras wings on the next identical
status update after the source's previous-priority suppression. The new check
also verifies that later unchanged updates do not replay the graph.

Release Taras/posture/status restoration passes1,258 checks; the21 available
status-graph matrix passes2,692. The updated projectile pipeline passes27 positive
damage encounters across12 weapon types and three ranged skills, five lifecycle
cases and four GPU cases. Its two known missing resources remain recorded and
skipped; unsupported runtime cases are zero. The staged3124 UI cast verifies
pre-commit Escape, two animations,39 socket checks and14 FX geometries before the
final status-controller change. The final staged3110 UI cast/equip/unequip/Escape
passes88 checks after that change; protected/default/seed profiles are unchanged.

Evidence: `docs/evidence/fx-render-sweep-source.json`,
`build/evidence/fx-render-sweep1`, `fx-render-missing-sounds2`, `fx-pixel-recheck1`,
`fx-render-visual-aggregate1`, `fx-owner-cleanup2`, `fx-status-restore-taras1`,
`fx-status-restore-affection1`, `fx-sound-projectiles2`, `fx-sound-staged-skill1`
and `fx-final-staged-buff1`. Final staged Release SHA256:
`76e44e29ca111acb5c99e7003003ea554fdcf4176f4166fe6f174df5173e9cee`.

No HPK extraction or canonical client resource rewrite occurs. Preparation,
visibility, cleanup and actual cast tests remain distinct evidence scopes.
Remaining timed hostile/monster state dispatch, strike/skill timing combinations
and distinct client-map portal travel keep the full five-part goal active.
Previous performance cohorts retain their own hashes; no speedup is inferred.

## Skill FX audit and Sanuta socket correction (2026-10-28)

Continue the active five-part goal. Inventory every nonzero PC-skill link in the
installed FX catalog across level bands1/6/9, both animation sexes and14 weapon
states, plus Mandara MONSkill cast/activate/follow/impact/state references. The
17,220 lookups reference753 FX binding IDs. These are binding lookups, not a
claim that every combination is a legal cast; multiple IDs may share one graph.

Production resource preparation initially succeeds for640 IDs, records110 missing
authored bindings/graphs and rejects three Sanuta state IDs1001816..1001818.
All three use mTwiststar_2000337.tmb. Its FX socket on joint1 has quaternion
(0,0,0,.707107), squared norm about.5. The remake's unit-length validation rejects
this shipped data before its model can render.

Verify the original engine binary read-only: socket loader31178..3122B passes
raw quaternion words to MatrixTransformation. The scalar quaternion matrix path
40FFD..410DC uses 1-2*(yy+zz) and does not normalize. Correct RigidTmb's validation
to retain finite non-unit and zero quaternions verbatim. Continue rejecting
nonfinite/overflowing transforms, bad names/parents, duplicate sockets, truncated
tables and invalid counts. No asset or HPK is edited or extracted.

After the fix, all643 available referenced IDs prepare;110 missing authored
entries remain recorded and zero preparation failures remain. Preparation alone
does not verify material/sound playback, GPU submission, timing or full FX parity.
Do not close the whole skill-FX gate from this result.

Verify actual Sanuta3159 through the native learn/cast/effect authority with its
original starter dagger at level100. Run source body/hair/apron phase animations,
pre-commit cancellation without cost, paid application, the eight-second looping
state, effect removal/expiry, equipment rebuild without recast/reset, death,
scene clear and missing-owner cleanup. Repeated independent lifecycle fixtures
refill native max HP/TP before another paid cast; this does not bypass normal
production costs or claim a continuous-cast/cooldown test. Inspect rendered
state and removal captures. The existing3110 state regression still passes.

Debug/Release socket tests each verify31 socket transforms, three raw quaternion
cases (including an independent non-unit matrix oracle), six malformed cases,
the Deva header mismatch and conflicting Gandharva influence rejection. Socket
test input now uses NativeResourceIO, so canonical HPK-backed models are read in
memory. The final staged3110 SDL cast/equip/unequip/Escape run passes88 checks;
protected, default and seed profiles remain unchanged.

Evidence: `docs/evidence/sanuta-fx-source.json`,
`build/evidence/sanuta-native-socket2.txt`, `skill-fx-audit2`, `skill-fx-audit3`,
`sanuta-state-render4`, `sanuta-state-regression3110` and `sanuta-staged-buff1`.
Staged Release SHA256:
`f32cf57a2102ca273c59217d4327c9436567e51c69676b09bd7fa26dcd4d5040`.
The previous six-run performance cohort retains its own executable hash; no
optimization gain is inferred from this correctness change. Remaining available
GPU FX/hostile/monster state/timing coverage and distinct client-map/portal
transitions remain open. The full goal remains active.

## Active five-part goal: status FX and refreshed verification (2026-10-28)

The user resumed the complete five-part goal. Earlier pause notes below remain
historical; this checkpoint resumes the requested measurements without accepting
the rejected C08 aggregate. **The complete goal remains active and incomplete.**

Read the installed TantraParam directly and recompare every identically named
numeric field shared with the current imports. Results remain 1,664 Item,
1,106 PCSkill, 501 MonsterSkill and 623 Monster client records. There are
134,603 matching values and 1,143 differing values (470/655/1/17 respectively).
Inputs are unchanged. Keep the client and server versions separate; do not
silently replace server authority or populate the client with server-only data.

Close an FX implementation gap: compile HT_dwGetAffectionFXID unchanged from
HTEngineHandler.cpp and use the native main-character priority-selected status
loop, including previous-affection priority and English WizardEyes suppression.
Cover stun, elemental/continuous-damage indicators, hold/sleep, speed, shields,
reflection, blessing, weakness and other source branches. Retain the authored
K3 Wing socket adjustment for PFX_MSP; cast/state/projectile/per-hit shield FX
remain separate owners. Missing enhanced-shield1010071 and ProtectAll1010090
bindings are recorded once and skipped, without replacement-resource searches.

Release status presentation passes 2,692 checks across 27 native selector rules,
21 available rendered graphs and two missing bindings. Check pairwise current
priority, previous-priority fallback, looping, depth, Escape retention, equipment
rebinding, death and removal. This controlled status fixture does not prove every
buff transaction. Actual Taras/posture regression passes 1,254 checks; the live
shield authority/render matrix passes 2,563 checks and both GPU cases.

Rebuilt navigation passes 32 static and eight dynamic cases, with 3,848 static
movement samples. It covers altar stairs, single-cell passages, building/column
corners, monster chase/replanning and immediate first/second attack retargeting.
TCC stair heights remain quantized; this is not smooth visual/TBO parity.

The staged build passes six fresh-process persistence legs: write/restart,
same-character relogin, another character, villages18/19 and return to village1.
Native Interface.sys fields, quick slots, equipment, independent audio settings,
character isolation and normal profile preservation pass. These server villages
share clientMap40001; distinct-map portal travel remains open. The harness
launches the exact emitted Restart command; it does not claim direct ShellExecute
child-process verification.

Current Release D3D11/HIGH, 1024x768, 2048 shadows, VSync off; local i7-12650H /
RTX4050 Laptop. Six sequential fresh processes, 120 warmup frames then 1,200
samples each. Median timings below are milliseconds; settled load is seconds.
GPU timers overlap CPU stages and must not be summed with them.

| Scene | Frame median ms | Application work median ms | GPU median ms | Settled load s |
| --- | ---: | ---: | ---: | ---: |
| town-idle | 9.70–10.13 | 9.62–10.06 | 2.38–2.49 | 2.92–5.91 |
| field-idle | 12.46–12.71 | 12.39–12.64 | 2.54–2.66 | 4.91–7.74 |
| field-combat | 13.21–13.22 | 13.09–13.10 | 2.59–2.65 | 4.27–7.64 |

All 7,200 delayed GPU samples are valid. Combat retains38–44 actors rather than
returning to town; dense idle retains43. Field CPU deformation remains4.30–4.39ms
for26,176 CPU-skinned vertices, alongside1,715 GPU-skinned vertices. The combined
UI/audio/equipment bucket is3.98–4.13ms; field world submission is1.31–1.35ms.
This supports investigating native CPU skinning fallback and unchanged UI work
before more batching; it does not isolate an optimization gain. Preserve native
influence/normal/socket parity when extending GPU coverage. Object/environment
upload has cold individual calls up to205ms; smaller render-thread upload jobs
need investigation alongside worker decoding. Warm and cold application-cache
loads differ substantially; OS disk cache is uncontrolled.

Add sampled workload validation before reducing a profile. On18 historical raw
trials it rejects the known44-to-four actor collapse and retains17 comparable
workloads. A passing workload check alone does not accept C08 quality/FPS gates.
No correctness tests/builds or other QA launched by the runner overlapped the
new measurements. Source, executable, native inputs and normal profiles remain
unchanged during each complete profile matrix.

Evidence: `docs/evidence/five-part-goal-20261028.json`,
`build/evidence/affection-release3`, `affection-shields-release1`,
`goal-tpa-current1`, `goal-navigation-current1`, `goal-persistence-current1`,
`goal-current-profile1` and `profile-workload-guard2`. Staged Release SHA256:
`b3c80fef3cc503d9dcdf936f56455a872b0345e172bc744ac7b7a43b6102e847`.

Remaining: available projectile/follow/area/monster state families, remaining
weapon/skill/strike timing combinations, distinct client-map/portal transitions
and the separate full quality-matched C08 acceptance. No complete-goal claim.

## English commands, Wing sockets, sit/stand and pickup stacking (2026-10-28)

Verified the four proposed fixes against original source and client assets.
The Wing finding needs a correction: all eight avatars expose a **Wing socket
on WeaponSpine**, rather than a bone named Wing. Cast and persistent Taras
models now follow that socket's animated transform and authored orientation.
The native model rotation remains in place. Rendered tests check actual socket
coordinates and wings behind a turned player, including removal and rebinding.

HTMainCharacter's sit-down (823) and stand-up (824) use a one-second playback
override. Use that override and the same scaled playback clock/strict STOP
boundary as rendering. Hold movement and E/R/skill actions during posture locks;
a seated ground click shows the existing ring, starts standing and queues the
route. Release movement after the final stand pose. Also correct animation
speed calculation to use the target clip, not the old clip during blending.
Release passes 1,254 rendered Taras/posture checks and 474 sit/stack authority
checks; all sixteen tribe-specific transition assets are present.

Server.cpp fills compatible existing stacks before empty inventory slots.
Pickup now reads byteMaxCount, handles full bags and partial pickup without
losing the ground remainder. Ordinary dragging of identical nonstackable items
or full stacks swaps records, including cargo; explicit overlap/split still
validates count and compatibility.

The generated registry exposes 201 English command entries. Source bytes and
line provenance remain in generated metadata; translated service names do not
claim unimplemented offline functionality. `docs/NATIVE_COMMANDS.md` lists all
32 working offline commands with examples, plus source-only translations and
ordinary chat commands. The parser passes 2,912 checks; actual SDL secret-whisper
input passes 147 checks and exercises all 32 offline commands.

Root `build-zflauncher.bat` calls the PowerShell build-and-stage flow. No arguments
build Release, stage the executable and pause; flags make it noninteractive.
`-NoStage` supports build-only use. SHA256 verification uses .NET directly so
it also works when Windows PowerShell cannot autoload Get-FileHash. No assets
are extracted, and project runtime data remains outside the client.

Evidence: `docs/evidence/chat-upward-drag-source.json`,
`build/evidence/wing-posture-render3`, `sit-stack-release3`,
`english-commands-parser1`, and `commands-english-final1`.
Final one-click build/stage passes (`build/oneclick-release2.log`). The final
staged executable passes actual SDL default-hotkeys/posture (130 checks),
held-icon/inventory transactions (55 checks), and real monster kill/chat/reward
persistence. Chat shows two outgoing and two incoming damage messages and one
Prana message without taking input focus. The keyboard movement regression also
passes. All isolated runtime checks preserve normal profiles and seed files.
Final staged Release SHA256:
`556e0a2672bceeef195576ff9655c7fd114433718576285ac5f014e3ac1d0757`.
The 147-check command run used the same source before the script-only hashing
fix and relink; its executable hash is retained in the evidence JSON.
C08 remains paused and full release/online service parity remains incomplete.

## Upward Prana, visible chat history and held item icons (2026-10-28)

Changed: make the requested Prana curl predominantly vertical. Keep the native
JKS homing equation and six-word randomness; scale initial horizontal velocity
by 0.35 and add 1.5 to initial vertical velocity. This is an explicit visual
adjustment requested after the source launch looked sideways. Emission remains
at the corpse and each original mote is absorbed on torso contact. Debug and
Release each pass 5,059 rendered checks, with all 16 motes absorbed and initial
lift reaching 20.105 native units.

Verified the chat flow against HTChatting.cpp/h, HTInfoLoad.cpp,
HTMainCharacter.cpp, HTMonster.cpp, HTGameSystem.cpp, HTMessageDef.h and
HTextern.cpp. Show the original ChattingBox on world entry without taking
keyboard focus. Keep separate 105-entry chat/system histories, original
five-row controls and scrollbar navigation, HTMessage parameter ordering and
category colours. Connect authoritative outgoing/incoming damage, dodges,
skill damage, Prana rewards, received items/Rupiah, learned skills and
death/revival messages. Preserve Philippine English text and monster names.
Deduplicate by event sequence and avoid item-receipt messages for transfers
between owned inventory, equipment and cargo.

The native All/Party/Ashram/Alliance buttons select outgoing channels; support
localized slash aliases, /g, /gc, /guild and /alliance, whisper From/To display,
V reply and ten-entry input recall. Enforce the source 224-byte normal and
48-byte group limits. Client receive presentation supports all these channels.
Offline sessions still have no connected party/guild/whisper service: preserve
honest unavailable/non-member responses instead of reporting remote delivery.
This does not implement a multiplayer chat server or party membership service.

Verified held item rendering against HTInterface.cpp:3144-3163. Move the
original slot image to mouse minus 16 pixels at the top UI layer after pointer
movement; leave the slot in place, suppress its count/tooltip while held and
restore it on release/cancellation. Inventory, equipment and cargo share this
path. Track SDL pointer events and reuse the existing HPK-backed icon; no
client resource is extracted or rewritten.

Validation: Debug/Release chat-and-icon components each pass 30 checks with
GPU readback/captures. The final staged executable passes the actual SDL held
icon/cancel/equip/swap/split/merge/potion scenario (55 checks), and a real kill
shows two outgoing and two incoming damage messages plus one Prana message
in the visible, unfocused chat panel. Hotkeys retain 63 checks and the secret
whisper command flow retains 145 checks/all 32 commands. Those two regression
runs preceded the final pointer-event optimization; final combat and inventory
runs use the staged hash below. Disposable profiles and normal saves are
verified unchanged.

Evidence: `docs/evidence/chat-upward-drag-source.json`,
`build/evidence/chat-ui-release2`, `chat-ui-debug1`, `prana-upward-release2`,
`prana-upward-debug1`, `chat-item-drag-sdl1`, `chat-upward-combat-final1`,
`chat-hotkeys1` and `chat-commands1`. Staged Release SHA256:
`6051d883da9580c68de27e6b393c0fbff822b507f391b2235f7df8a7fdb6b222`.
C08 remains paused; no wider release or multiplayer gate is closed.

## Prana native curved launch and absorption (2026-10-28)

Changed: restore the original outward/upward launch before homing. The prior
absorption fix used a reduced TFX particle velocity, which straightened the
path too quickly. Share HTAttack's six-CRT-word launch equation with the
existing source-derived flight adapter; retain the unnormalized world X/Z
components and upward Y. Each original death mote then uses the native
100-unit speed and correction factor five toward the moving torso. A separate
visual RNG leaves combat and authored emitter randomness independent.

The source controls the curved travel. The installed Mandara TXL resolves
death 1300005 to MON01_DIE01 and Follow 1300006 to MON02_DIE; their TFX nodes
provide the native visuals without a fixed helix path. Keep the requested
per-mote absorption presentation: emission stays at the corpse, the original
particles/births/materials are reused, and no extra Follow or recipient graph
is created. Swept contact consumes each mote on arrival.

Verified: Debug and Release each pass 5,115 rendered checks, including every
live mote's position and velocity against the source-derived launcher flight,
outward/upward flare, live target movement/rebuild, fixed emission, and all
16 emitted motes absorbed. Initial lift reaches 11.815 native units; the
maximum 60 Hz step is 3.916 units during the native launch impulse. Swept
contact, coarse-frame absorption and normal projectile rules pass in both
configurations. The staged Release passes the actual SDL kill/reward encounter
and native persistence checks; original, seed and normal profiles are preserved.

Evidence: `docs/evidence/taras-prana-source.json` curvature correction;
`build/evidence/prana-curvature-release2`, `prana-curvature-debug1` and
`prana-curvature-combat1`. Staged Release SHA256:
`d6fc924b02908979858c4647d978e46ac6837183176b0a93b9b06a061241b99a`.
This supersedes the launch velocity in the absorption checkpoint below.
C08 remains paused.

## Prana travels into the player and is absorbed (2026-10-28)

Changed: correct the previous moving-emitter approach, which could continue
emitting at the recipient. Keep the original death graph and emitter at the
corpse. Give each of its existing/newly emitted death motes an independent
world-space path toward the live torso, using 100-unit speed and correction
factor five. Preserve the original particle births/materials and initial
positions. Sweep contact against a 1.25-unit sphere in substeps no larger than
1/60 second, shrink/fade over the final approach and remove each mote on
contact. No recipient effect or replacement Follow graph is created. Drain
the original corpse emission interval, then retire the graph after its last
mote. A ten-second per-mote fallback bounds unreachable targets; normal
projectile/damage/reward rules are unchanged.

Verified: Release/Debug each pass 4,071 rendered particle checks. All16 test
motes originate at the corpse, travel continuously (maximum measured60Hz step
1.667 native units), follow a moving/rebuilt recipient and are absorbed.
The source emitter remains fixed; no motes remain around the player afterward.
The source/path/arrival captures and per-mote CSV trace verify actual visible
travel. Swept-contact/coarse-frame rules and existing projectile rules pass in
both configurations. Taras retains906 checks. The final staged launcher passes
the actual SDL kill/reward/trail/hit/audio scenario and 60-file package closure;
original, seed and default profiles remain unchanged. No outstanding failures
for this correction.

Evidence: `docs/evidence/taras-prana-source.json` absorption correction;
`build/evidence/prana-absorption-release1`, `prana-absorption-debug1`,
`prana-absorption-taras1`, `prana-absorption-combat1` and
`prana-absorption-package1` under `build/evidence`. Staged Release SHA256:
`62e7912ce47b7ad749499d5e3f54cd36f3547402c53c6ffd6c3dd4d159b99e57`.
This supersedes emitter-carried collection below. C08 remains paused.

## Taras back wings and existing death-cloud collection (2026-10-28)

Changed: verify Taras 3121 through fxPC.txl, the native skill-type definitions,
HTMainCharacter's active-skill/state-affection paths and
HTEngineHandler::HT_dwGetAffectionFXID. Taras is a type-22 one-shot active
state; its lasting wings come from the separate MoveSpeedPlus affection
(effect4440, flag0x00400000). Keep the original one-shot PYG11_STA01 and loop
the installed K3 PFX_MSP/1010053 while that affection remains live. The Global
reference adds PFX_MSP2/1010075; use the installed catalogue without importing
Global resources. Respect higher-priority affection suppression. Anchor both
original wing halves at the live upper back, compensating the baked exporter
height/root motion while keeping the original meshes, textures and TAB
deformation. Movement, turns and same-player equipment rebuilds retain wings;
buff removal, death and native expiry stop them.

The original monster/attack source starts ACTIVATE death FX and a separate
FOLLOW=DieActivate+1 graph. Per the user's correction, collection now carries
the already-visible death cloud itself: transfer its existing instance to a
moving null carrier and retain particle births, age, geometry, colour, source
height and orientation. Vasabhum uses MON01_DIE01/1300005. No extra Follow
visual starts. Resolve a fresh graph's authored socket before transfer, retain
the native homing equation/live player target and three-second flight, and
allow its existing particle tail to outlive the emitter interval. Preserve the
cloud after corpse removal and target display replacement. Reward maths and
authority remain unchanged. This supersedes the earlier separate-Follow
presentation checkpoint below.

Verified: Debug/Release each pass 906 Taras checks and 579 Prana checks.
Taras uses a real learned skill transaction; both cast and looping wing
geometry stay at the upper back, both halves draw, and the loop survives
beyond the original three-second graph. Removal, priority, turn/movement,
equipment rebind, death and native timed expiry pass. The cloud probe first
renders death particles, transfers that same graph, verifies unchanged birth
times/clock/geometry/colour/rotated pose, follows a moving/rebuilt recipient,
survives removal of the corpse display and retires on expiry/missing target.
Closest measured carrier-to-target distance is below .001 native units.

The final Release passes the actual SDL Vasabhum kill/reward/trail/hit/audio
scenario (Prana0 to60, one reward presentation), Mandara FX pixel/occlusion
checks, the 91-check field regression and its 5,792-pixel white altar centre
check. The real kill scenario does not assert the separate death-pose flag;
the isolated cloud probe supplies the detailed motion/continuity evidence.
Original/seed/default profiles remain unchanged and 60-file owned package
closure passes. No outstanding failures for these two requests.

Evidence: `docs/evidence/taras-prana-source.json`,
`build/evidence/taras-release-final2`, `taras-debug-final2`,
`prana-cloud-release-final2`, `prana-cloud-debug-final2`,
`taras-prana-field-final2`, `taras-prana-combat-final1`,
`taras-prana-mandara-final1` and `taras-prana-package-final1` under
`build/evidence`. Staged Release SHA256:
`db02ba338aa6ef73e8d136c2e3d5ada776ffc4ccf40bb3cfc8c184ef73219d09`.
C08 benchmarks remain paused; its 19/21 tasks and acceptance gate are unchanged.

## Altar solid white centre mesh (2026-10-28)

Changed: the close-camera follow-up exposed a missing part that the earlier
placement checks did not cover. The authored mALTER2_2010102.tmb contains
C1_T1 (82 vertices), C2_T1 (82) and P1_T2 (4). The additional-record reader
rejected the `(null)` texture placeholders, so the second ray section and
solid centre plane never reached rendering. Accept that native placeholder
as an unset texture, matching the first record's handling. Use native `_T%d`
mesh tags when binding TFX replacement textures: both rays use T1; the centre
uses T2, tNORM_2100429.tga. Pin the original engine tag-selection instructions
at RVAs 37674/389BE and the original HPK entry hashes. No source asset changes,
new fill geometry or depth bypass are used.

Verified: Debug/Release each pass 91 field checks, including all three decoded
model sections, influence mappings, actual white-plane texture binding,
furnace rim alignment, quest icons, ground conformance and world depth.
Three close-camera pixel tests cover 5,792 pixels inside the opening and
require all to be white; both configurations pass with every channel 255.
The same rectangles reproduce 377 nonwhite pixels in the diagnostic baseline,
so the pixel test detects the reported strip. Prana homing retains 570 checks
per configuration; Release light/jitter controls retain 192 checks. The final
staged launcher passes Mandara FX visibility/motion/occlusion, INTRO flat-ring
selection and 60-file owned package closure. Protected/default profiles remain
unchanged. No outstanding failures for this bounded correction.

Evidence: the `altar_core_followup` entry in
`docs/evidence/field-sprite-source.json`; `build/evidence/altar-core-release1`,
`altar-core-debug1`, `altar-core-native-instructions.txt`, `altar-core-sdl1`,
`altar-core-roster1`, `altar-core-package1`, `altar-core-prana-release1`,
`altar-core-prana-debug1` and `altar-core-controls-release1` under
`build/evidence`. Staged Release SHA256:
`b5c47deabf6c2cc6aa29bd2d190c8b234b8291d7e6ce908825c901b56a7d167a`.
C08 benchmarks remain paused and its acceptance gate remains open.

## Altar and furnace sprite alignment (2026-10-28)

Changed: verify the authored Mandara TFX records and the pinned original
HT3DHeaven.dll with read-only instruction inspection before correcting the
renderer. Type-2 sprite positions already use native world units; the shared
model/particle factor of .1 incorrectly lowered the altar core from +55 to
+5.5 and the furnace layers from +27/+26.5 to +2.7/+2.65. Use direct sprite
positions, preserving the native attached parent-height conversion. Mode 1
also carries an authored normal: furnace normal (0,1,0) produces a horizontal
XZ plane; quest normal (0,0,1) retains an upright icon. Preserve camera-facing
mode 0, the INTRO ring override, ground conformance, exposure and world depth.

Verified: Release/Debug each pass 58 field-sprite checks, using actual TML
placements, two orbit views and four full-map captures. Both furnace layers
stay flat at the rim; the altar sprite centre is +55 above its placement.
The upright quest icon and conforming ground-click ring pass. Prana homing
passes 570 checks per configuration; the Release FX control probe passes 192.
The staged launcher's Mandara FX scenario passes rendered on/off/restoration,
portal/water motion, progression/selection/item/torch visibility and building
occlusion. Its INTRO roster scenario retains the flat selection ring under
camera orbit. Original, seed and default profiles remain unchanged. The
60-file owned package closure passes. No outstanding failures for this fix.

Evidence: `docs/evidence/field-sprite-source.json`,
`build/evidence/field-sprite-native-instructions.txt`, `field-sprites-release2`,
`field-sprites-debug1`, `field-sprites-sdl1`, `field-sprites-roster1`,
`field-sprites-prana-release1`, `field-sprites-prana-debug1`,
`field-sprites-controls-release1` and `field-sprites-package1` under
`build/evidence`. Staged Release SHA256:
`5c458e2ea6e99561da0e591e15813dee344e84652e0c23a0f15324ef0243cf2a`.
This bounded fix does not resume C08 benchmarks or close broader FX parity.

## Native Prana follows the player (2026-10-28)

Changed: verify HTMonster.cpp:318-365, HTAttackManager.cpp:87-110,
299-330, 450-490 and 573-615, and HTEngineHandler.cpp:8460-8467 before
implementation. Monster death creates MAINCHAR_ATTACKTYPE_PRANA, targets the
recipient, selects JKS_HOMER and refreshes the live recipient position +12 each
frame. The native monster Follow graph is DieActivateFX+1. Replace the fading
procedural curve with that authored graph on a moving null carrier, native
100-unit speed, six-word CRT launch scatter, velocity correction factor five
and three-second lifetime. Corpse death FX remain at the monster; the separate
Follow FX travels to the player. Do not change reward maths or award Prana again.

Verified: Debug/Release each pass the flight-rule probe and a hidden SDL/D3D11
presentation probe with 570 assertions. Vasabhum uses native Follow FX 1300006;
path traces and three captures verify movement from the corpse into a moving
recipient, exact target refresh, preserved age/position through recipient model
replacement, duplicate-event suppression, zero-reward suppression, expiry and
missing-owner cleanup. The closest measured distance is below .003 native units.
The actual SDL kill/loot/weapon-trail scenario also passes: Vasabhum 2001 is
killed, one collection FX is presented and Prana increases from 0 to 60. Original,
seed and default profile preservation checks pass. The clean owned package
check passes after staging. Source pins are `docs/evidence/prana-source.json`.

Evidence: `build/prana-release-tests1.log`, `build/prana-debug-tests1.log`,
`build/evidence/prana-homing-Release`, `prana-homing-Debug`,
`prana-sdl-combat1` and `prana-owned-package1`. Staged Release SHA256:
`9eb9c21304218af4148054c97a26b73e4fd54c1957433eddc06b11da55e2dc72`.
No outstanding Prana test failures. Missing authored FX are recorded/skipped;
no replacement asset is invented. This bounded request does not resume C08
benchmark work. Its previously measured executable remains historical; final
C08 acceptance needs a matching matrix for the final selected build.

## C08 performance, recovery and full package (2026-10-28; paused, 19/21 tasks verified)

Changed: add a 128-bone GPU palette with native influence order/weights,
blended inverse-transpose normals, matching shadow deformation and an explicit
CPU fallback for oversized, invalid or singular blends. Bind vertices, indices
and UVs stay immutable on the GPU path; native pose clocks and socket/picking
math remain available on the CPU. Batch compatible opaque map instances while
retaining transparent/FX submission boundaries. Reuse frame scratch lists and
live FX/particle/trail GPU buffers as topology grows or shrinks.

Native TFX node5 actor lights and node7 camera jitter are also implemented and
independently source/pixel checked, with native visibility, owner and expiry
rules. This supersedes the historical unsupported-control notes below; it does
not accept the paused wider strike/skill matrix or missing authored bindings.

Add CPU-only read/decode workers, cancellation/join by scene generation,
priority resource requests and sliced terrain/object uploads (soft 3ms,
maximum 16 placements; actor creation maximum two per update). Present essential
ground, player and UI before distant actors. One individual decode/upload may
exceed the soft budget; loading frame intervals are recorded separately.

Bound decoded mesh/animation cache payloads at 256MiB/512 entries, archive
indexes at 64MiB/256 containers, queued decode jobs at 32, retained task records
at 128, texture and geometry payload budgets at 512MiB each, decoded audio at
64MiB and live voice PCM at 128MiB/256 voices. FX has a 512-instance bound and
65,536 particles per node. Payload counters are not total allocator/driver VRAM.
Derived texture artifacts use payload SHA256, reader schema, shader identity and
D3D11/SM5 keys, checksums, atomic replacement and a 512MiB owned disk budget.
Corrupt derived files become misses; original HPKs remain authoritative.

SQLite migrations use the SQLite online backup API before changing an owned
older schema, including committed WAL data. Invalid/foreign/future databases
remain rejected. Audio owner removal now stops finite sounds as well as loops.
Native failures record numeric phase/actor/resource/action/position/camera/backend
context in external logs and emit a minidump. Minidumps contain process memory
and need inspection before sharing.

Full distribution tooling retains original client-relative assets and HPKs,
seven shader binaries plus their cache key, offline tables, dependency notices
and four app-local MSVC CRT DLLs. Start-Offline.cmd stays inside the client;
support files live in sibling runtime, and profiles/logs remain external. The
portable startup guard rejects development fallback paths. Locked staging is
preflighted before any owned file is changed.

Verified so far: Debug/Release each pass 11 focused tests. Eight map retire/
rebuild generations and four renderer reinitializations pass 626 checks;
GPU handles return to the same drained baseline. Changing FX topology retains
its handle count. Thirty-two actual character CPU/GPU captures agree within
one colour value; compatible world instancing stays within the strict whole-
image edge-raster tolerance. Native light graphs visibly brighten the held
actor and expiry restores exact baseline pixels. Actual Mandara entry, combat
and merchant service regressions pass with protected/default profiles unchanged.
Final package relocation and fault injection also pass: 3,652 files, two
relocated Mandara entries/reloads, four app-local CRT imports, locked-stage
rejection without writes and a native dump with numeric context. Evidence is
`build/evidence/c08-relocation5/C08_PACKAGE_RESULT.json`; the full distribution
is `build/distributions/c08-full5`, about 1.06GB. This remains a same-machine
relocation test, with developer PATH entries removed and guarded package roots.

The additional name/selection fix follows HTMonsterSystem.cpp:603-639 and
HTNPCControl.cpp:2581-2646 / HTNPC.cpp:103: only the selected living monster
gets an overhead name. NPC names retain their normal town display. Closing an
NPC conversation/service clears that NPC's selection, target UI and owned FX;
a different target chosen in the meantime is preserved. Explicit close,
Escape, movement, range expiry and terminal script choices use the same cleanup.
The merchant SDL regression asserts the cleared selection after closing.

Failed/corrected during validation: GPU indices initially used float attributes
instead of the pinned bgfx unsigned input; instancing initially used obsolete
TEXCOORD semantics. Image checks rejected both and the corrected bindings pass.
Mandara exceeded a single decode request; split it into bounded batches. The
old 1,800-frame QA deadline expired early with uncapped rendering and sliced
loading; replace it with an elapsed-time deadline, preserving encounter checks.
A test link dependency and mistyped build targets were corrected. Retain failed
evidence directories; do not use them as accepted performance baselines.

Performance evidence: six CPU reference trials and five matching GPU trials
complete 60 measured seconds each at 1024x768 HIGH / 2048 shadows on the local
i7-12650H and RTX 4050 Laptop. The additional warm GPU combat run returned to
town after native revival: median actors fell from 44 to four. Retain that
run but exclude it from comparison. Its aggregate was invalidated as
`build/evidence/C08_ACCEPTANCE_REJECTED_WORKLOAD.json`, with the reason in
`C08_ACCEPTANCE_INVALIDATION.json`. There is no accepted C08 aggregate.
The replacement `c08-profile-gpu-warm-retry1` exited 8 because it was stopped
at the user's pause; this is an intentional interruption, not a new regression.

The frozen measured executable is SHA256
`27a4f1b423bbedc07f6f1cf058b39463a2d01b92a8eca9279760ebb2a4093b49`.
Raw matrices are `c08-profile-cpu2` and `c08-profile-gpu2`; preserve their build,
input hashes, loading/frame CSVs and captures. GPU town median intervals are
9.41-9.67ms, field idle 12.26-13.06ms and the matching cold combat trial 12.66ms.
These results do not establish an overall FPS gain. Native mesh constraints
leave substantial field geometry on the CPU fallback. Loading-frame telemetry
was corrected to use wall time; single synchronous operations still produce
loading stalls and the 3ms upload budget remains soft.

Remaining while C08 stays paused: obtain a matching warm field-combat leg,
add workload matching to the acceptance collection and recheck the final
provisional target. P17-13, P17-14 and BG-C08-GATE remain open; 19/21 C08 tasks
have individual evidence. OS disk-cold, fresh-VM deployment, physical GPU
removal, other maps, broad online stress and complete gameplay parity remain
outside this represented checkpoint. The newly requested Prana correction is
tracked separately and does not resume the broader benchmark work.

## C06 ordinary services and basic offline combat (2026-10-28)

Changed: close all 19 represented C06 tasks. Add native dual-dagger mastery/
tribe/main-hand checks, bow/arrow compatibility, safe final-slot validation and
direct warehouse/equipment transfers. Character and cargo changes commit in one
SQLite transaction; dead characters cannot move items. Preserve stack counts,
splitting/merging, original opaque item fields and cancellation. Restore the
source unpack fallback when ordinary potion use is cooling down.

Replace fixed monster HIT/DIE timers with original clip durations, restart
repeated finite reactions and hold completed death poses. Misses do not trigger
HIT. End chase at the source target-relative combat-sight distance, and choose
approach points within the active weapon/skill range. The SDL encounter now
also verifies original selection/attack graphs, bound actor ownership, facing
and finite basic attack animation.

Verified: final Debug/Release builds each pass 27 focused CTests.
The Debug matrix takes about 850 seconds; Release takes about 76 seconds.
These are verification durations; performance acceptance remains C08.
The authority matrix has 27 inventory and eight fine/coarse encounter cases,
with 11,031 assertions and exact 80/10/10 normal/critical/miss decks. Nine SDL
legs on one staged executable pass: 42 inventory checks; melee defeat, Pranas/
loot and both attack sounds; actual player death/finished pose/native revival;
warehouse/save-point and direct cargo/equipment round trips; paid repair/buy/
sell; insufficient money and full inventory; two fresh-process reloads.

SQLite retains complete item metadata, counts, money, saved cells, other
characters and cargo. Warehouse money is conserved; its revision advances six
steps, including equipment to/from cargo. Repair costs 15 (durability 0 to 4500),
buy costs 225 and sell returns 37. Package closure is 55 owned files. All protected,
normal/default and imported seed hashes stay unchanged; captures are reviewed.

Evidence: `build/evidence/C06_ACCEPTANCE.json` passes after both configuration
test logs, all nine runtime legs and protected SQLite/profile audits pass. Its input matrix is
`build/C06_ACCEPTANCE_MATRIX.json`; source pins and version/behaviour boundaries
are in `docs/evidence/c06-source.json`. Final runtime folders are
`c06-accepted-*`; failed and earlier outputs remain separate. Staged Release
SHA256: `2729f201264cf0c1c684f242748bab7e6f9e6956aa3a5b9d6ed864b1e8aeaaa8`.

Failed/corrected: the older world probe assumed extended zoom was the camera
default; configure its explicit 450 limit, as the live client already does.
The private dual-wield fixture initially used sword 4001 rather than a dagger;
use the real dagger row. The default arrow 7091 is absent from the Global export;
record it and use supplied 7092 in the owned fixture. The inventory camera fixture
now starts at the normal clear town cell. A mistyped build target was corrected.

Remaining: complete AI/roaming/special-skill patterns, timed and other advanced
consumables, online services, complete loot/penalties and other maps stay in C09.
P07-12, P11-06, P12-01, P12-04 and P12-05a/06a/07a now close; Tantra-B becomes
133/254 tasks (52%), still five accepted gates because the minimum C06 gate was
already checked. Game source remains local/uncommitted.

## Altar refinement and native whisper commands (2026-10-27)

Changed: implement native portal1000 triangle picking/range checks and the
original window236, animated orb, four inventory-reference slots, costs and
reconfirmation/result dialogs. Compile active Server.cpp RefiningItem,
item-family checks, exact tables and TFPercentMixer's persistent100-card
streams. Preserve main/sub refinement, all supplied additive protections,
Amala/Taru/Apad, consumption and native failure/reset/destruction outcomes.
Import refinable masks from the same pinned Global XML as offline authority;
keep the K3 client display data separate. Authenticate and revision-check offers,
reject stale item instances and commit accepted results through SQLite.

Verify the command route in the selected Server.cpp rather than the older
AdministrateGame.cpp: the secret whisper dispatch calls are commented in that
snapshot. Restore them deliberately for the authenticated offline authority.
Make both native chat edits usable with mouse focus, Tab, Enter and DBCS-aware
Backspace; retain the recipient across submissions and show System responses.
Support32 source commands, preserving exact Fors838 spellings, case, parser
family, source Chakra reset, native status/equipment/passive rebuilding, Prana
thresholds and ground-item fields. Validate values before changing state.

[Complete command inventory and usage](docs/NATIVE_COMMANDS.md) lists287 source
entries including aliases/Japan duplicates,32 implemented canonical commands,
ordinary chat aliases and additional custom whisper-handler tokens. Missing
party/siege/event/raw-table/movie/network services return explicit errors.
Source MAX_LEVEL355 exceeds the one-byte player field; reject wrapping values
and missing level-table rows. No command grants online privileges.

Verified: final Debug/Release builds each pass17 focused tests, including
5,619 refinement assertions /1,000 attempts and433 command parser assertions.
The final staged executable passes145 command checks exercising all32 commands,
59 altar checks and63 existing default-hotkey checks through actual SDL.
The altar charges source cost5 discounted to2, then attribute cost5, with no
cancellation charge. Earlier runs show attribute success; the final run also
accepts the native random attribute failure and consumes the source material.
SQLite money, level/Chakra/skills/Karma, original item metadata, refinement and
dropped-item pickups match authority. Protected assets/default profiles stay
unchanged. The clean client/external runtime package has55 owned files.

Evidence: `build/evidence/ALTAR_COMMANDS_ACCEPTANCE.json`,
`commands-final-runtime1`, `refinement-staged-runtime1`,
`commands-hotkeys-final1`, `altar-commands-package-final1` and the per-config
`commands-*` / `refinement-*` results. Captures are visually reviewed.
Final staged Release SHA256: `e6b2ac7419cc3262538404a9879eeca300ef5a91e707026fb7d57cfb6cd0e99f`.

Failed/corrected: the first command probe clicked the hidden chat field before
Enter; use the actual opening sequence. The existing UI inventory expected31
rather than33 windows; also assert that native236/485 start closed. Retain the
failed outputs; corrected fresh runs and all final focused checks pass.
Tantra-B becomes126/254 named tasks (50%), still five accepted gates.

Remaining: missing Global extra-additive6526 is recorded rather than fabricated;
zone donation/GM refinement modifiers remain zero baseline. Full advanced NPC,
quest, social and online command services remain open. Existing failures and
historical executable hashes below are retained.

## Native hover, NPC greetings and birth FX (2026-10-27)

Changed: verify the supplied nine May screenshots against HTObjectInfo,
HTInterface, HTItemSystem, HTSkillSystem, HTNPCSystem, HTMainCharacter and
HTMonster before implementation. Compile the native effect formatter, family
predicates, message IDs and refinement arrays with pinned source hashes.

- Render centred, coloured tooltip rows with original spacing, 200ms delay,
  wrapping/clamping and unchanged-document upload avoidance. Show actual
  refinement/sub-refinement, ceil durability units, quantity/time, effects,
  attack speed, limits, prices and merchant context. Skills include learned
  level, current effects/costs and next/request conditions/effects/costs.
- Preserve native NPC normal 0 / hover 9 / down 9 states. Play the NPC-specific click
  greeting once per accepted opening through HPK-backed miniaudio effects;
  page changes retain the voice, reopening starts again, and gain applies live.
- Show NEWBORN 1010001 for player entry/revival and native field birth graphs for
  monster appearance/life changes. Defer through loading; handle death, AOI
  departure/reentry, finite expiry, equipment rebind and clean scene resets.
- Use Philippine English item text inside sale confirmation. Legacy resource
  name bytes inside a UTF-8 message caused the real merchant flow to exit on sale.

Verified: final Debug/Release builds each pass nine focused CTests. Per config,
3,759 tooltip assertions cover 1,664 items / 203 represented skills and 179 available
NPC greeting payloads; 337 UI assertions include native timing/cache, the pictured
item/VEGA/BAIRABA hovers and sale text; 190 presentation/audio assertions cover
NPC open/page/reopen/gain and birth lifecycle/depth. Independent pixel checks
find 5,727 changed NPC hover pixels only inside its 315x19 row, identical pressed
pixels, and real red/yellow tooltip glyphs. Captures are visually reviewed.

The final actual-SDL paid-repair merchant workflow passes purchase/sale and both
cancellations, exact source prices, paid repair and invalid repair rejection.
NPC 1101 emits one native greeting; SQLite money/inventory/cargo and other
characters are checked. Protected/default/seed files stay unchanged. Final
package closure is 53 owned files. Evidence:
`build/evidence/HOVER_NPC_SPAWN_ACCEPTANCE.json`, `hover-npc-merchant-runtime3`,
`native-tooltips-{Debug,Release}`, `c05-ui-{Debug,Release}` and
`hover-spawn-{Debug,Release}`.

Final staged Release SHA256:
`5ff893ff101cbf3e05beceec4a118d4a215bdcf4a3bc651fb963e37b59e142f6`.

Failed/corrected: the existing HUD fixture depended on the source client's
1600x900 resolution; it now seeds 1024x768 only in memory. The unlearned skill
assertion mistook prerequisite Lvl1 text for a learned title. First two merchant
attempts ended on the sale-name encoding bug; their outputs are retained and
the corrected fresh third run passes. No final focused failure remains.

Remaining: the selected K3 client TPA contains no matching screenshot mount/
riding entries; do not mix in newer Global rows. The original formatter has no
text for 45 encountered effect IDs; their exact list is recorded in the tooltip
results. Mount-specific runtime checks, broader inventory combinations and all
other-map/skill/FX/visual/release gates remain open. P11-07 is now checked;
Tantra-B becomes 125/254 named tasks (49%), still 5/10 accepted gates. Game source
remains local/uncommitted; preceding executable hashes below are historical.

## Reference-style Settings layout (2026-10-27)

Changed: Advance now opens the requested compact Settings design: a native
330-pixel frame, Presets and Options section bars, original 64x19 gold buttons,
Low/Mid/High quality presets, plain values between arrows, and grouped selected
states. Custom size and brightness/draw-distance sliders remain available.
High retains the native 2048 shadow profile; Ultra selects 4096. Renderer and
language display the current DirectX 11 / English configuration. The main Options
resolution value also uses plain text between its original arrows.

Verified: Debug/Release builds and three focused MainUI/Interface tests per
configuration pass; the final hidden SDL/bgfx UI check is rerun after the label
revision. The actual SDL settings workflow passes 103 checks, including all three
presets reaching renderer/camera state, selected highlights, resolution/aspect/
custom sizes, window modes, quality choices, persistence and Apply/Cancel.
Captures at 1024x768 and 800x600 are visually reviewed. Package closure passes 53
owned files; protected/default/seed data remain unchanged. Evidence:
`build/evidence/GRAPHICS_REFERENCE_LAYOUT_ACCEPTANCE.json` and
`graphics-reference-layout-runtime2`.

Final staged Release SHA256:
`4566c934e9d8342393f599559c107eab080c143878e21588e3649139553bb45c`.

Failed: no new failure in this revision. Remaining: screenshot-only MSAA,
model/FX/object-distance and circle-shadow controls need separate renderer work.
All broader game/visual/recovery/release limits remain open. No additional C02
or other roadmap task/gate is closed by this layout refinement. Game source
remains uncommitted; the previous C02/C05 executable hashes below are historical.

## C02 original resources, ordered rendering and Advance settings (2026-10-27)

C02 is accepted for the bounded contract: 22/22 tasks and its minimum gate.
`build/evidence/C02_ACCEPTANCE.json` records source hashes, tests and final
staged executable. The complete game/roadmap remains unfinished.

Changed:

- Resolve textures by native family/relative identity. Missing qualified paths
  cannot alias a different family; ambiguous unqualified names fail. Regular
  textures precede paired Pop textures, and HPK indexes remain cached. PC body,
  equipment and INTRO preload requests now supply the appropriate family.
- Preserve original DDS/DXT1..5 mip counts, including partial chains and DXT2/4
  premultiplied identity. Keep actual-alpha cutout/blend policy and original
  TGA/BMP support. Reject bad archive bounds/traversal and root-prefix siblings.
- Version backend shader cache keys, validate vertex stride/linkage, apply
  per-widget GPU scissor and preserve equal-layer creation order. Test opaque,
  cutout and translucent overlap, top-left UVs and asymmetric render/pick sides.
- Replace Help with Advance, reusing existing native frame/button/arrow/slider
  images. The basic selector is `Resolution < 1024x768x32 >`; 32 is the actual
  DX11 BGRA8 colour depth. Arrows change the draft; basic OK or Advance Apply
  applies immediately. Advance opens alone and remains centred across resizing.
- Add 4:3, 16:9 and 16:10 presets; custom 800x600..7680x4320; windowed,
  borderless and supported exclusive fullscreen. Add authored-mip texture LOD,
  Off/1024/2048/4096 shadows, fog/detail, filtering, VSync, view distance,
  brightness and optional world Linear colour. Legacy remains default; UI is
  colour-independent. The modern path is gamma-2.2 sampled-albedo lighting,
  with encoded-target alpha composition, not an HDR/fully managed pipeline.
- Persist graphics atomically to the external profile's `system/Graphics.cfg`.
  Unsupported modes and failed saves report errors; Apply rollback retains the
  previous display/settings. No client support/resource duplicates were added.

Verified:

- Debug and Release builds pass. `c02-resources-debug-accepted` and
  `c02-resources-release-accepted` each pass 22 focused tests. Each renderer probe
  passes 84 assertions, including all five DXT formats, partial mips, qualified
  identity/Pop precedence, world/UI overlap, clipping, eight front/back resize
  cases, shader-cache rejection and clean reinitialisation.
- `c02-graphics-runtime5` passes 94 actual SDL checks: native arrows and labels,
  aspect ratios, typed 1320x825, all shadow qualities, live renderer state,
  fullscreen/borderless/windowed, saved values, rejection and Apply/Cancel.
  The native Options and Advance captures were visually reviewed; text overlap
  was corrected. `c02-audio-runtime1` independently verifies live/new voice mute,
  independent streamed music, persistence and restored miniaudio preferences.
- `c02-original-assets2` renders original HPK mesh/texture for 100 frames and
  passes resize/minimise/restore with zero renderer reinitialisations, without
  an account or Mandara entry. `c02-package-accepted` verifies 53 owned files.
- Runtime protected/default/seed data remain unchanged. Final staged Release
  SHA256: `d8d1db21745e4da9aceee18a6572f4b363dd64bf8fe72e214d91b3a152c699f2`.

Failed and corrected: the earlier partial-mip allocation, basename PC preload
and native skin path attempts are retained separately. The native HUD test's
fixed position assumptions were replaced with an in-memory fixture; original
Interface.sys is untouched. The separate strike attempt still records missing
1000106/unsupported TFX node7 and remains unaccepted.

Remaining: all five continuation objectives and wider skills/AI, native collision,
other maps/portals, Windows DPI/recovery, matched visual/performance and release
acceptance. Texture LOD selection does not imply reduced GPU allocation or a
measured FPS gain. Game source is uncommitted. C02/C05 staged hashes record those checkpoints; the latest staged hash is in
the Settings layout revision above.

## C05 movement, camera and MainUI (2026-10-27)

The user resumed this phase explicitly. New implementation covers:

- Native CUR/ANI assets and represented context priority using the Windows
  decoder, with missing files recorded rather than extracted or substituted.
- Item, skill and enabled control tooltips: source 200ms delay, topmost hit,
  wrapped 35-line bound and viewport clamp. Item text reads live instance
  durability/refinement/count. Skill name/description follows
  HTEngineHandler -> FXPCResMgr -> `resource/fx/fxPC.txl` type1; numeric TPA
  PCSkill records do not contain that text.
- Widget foreground/shadow RGB and alpha, including native orange NPC options.
  The source shadow colour is now retained in the captured UI graph.
- A process-local bounded 512-entry/16MiB raster payload cache, keyed by text,
  locale/font, dimensions, alignment, wrapping, alpha and colours. Identical
  UI bitmaps skip GPU replacement. Existing inventory/name dirty checks remain.
  No new FPS or profiling gain is claimed.
- Native karma/attacker/castle-clan name colours, invisible-name suppression,
  original name/speech anchors, five-second speech lifetime and DBCS-safe
 55-byte truncation at the source 60-byte threshold.
- Camera obstruction retracts immediately and recovers outward smoothly.
  Re-entry resets the source heading. Shared camera code defaults to native 150;
  ZFLauncher explicitly selects the requested 450-unit extended zoom maximum.
  F11 remains the source's optional broadcast-camera mode.

C05 is accepted: 20/20 tasks and its minimum gate. Evidence/hashes are in
`build/evidence/C05_ACCEPTANCE.json`. Debug/Release each pass ten focused checks;
final font-mode changes separately pass all three affected tests/configuration.
The UI probe passes 287 checks/configuration, including 14 native cursor assets
and 120 unchanged bitmap submissions with no upload. Actual SDL town blocked
click, field E/R retarget and63 hotkey checks pass. Six fresh-process
restart/relogin/character/village legs pass. Protected/default/seed data remain
unchanged. Final package closure passes 52 owned files. The staged Release is
`424366845a5b77eea75238e29c38cc8faa3365ca4728f875ead089c38879d9df`.

Visual review corrected a new font-shadow mismatch: normal labels always use
the source's black right/down passes; declared coloured shadows apply only to
the appropriate bold/outline/shadow modes. Window titles use native border mode.

Retain the explicit missing authored `.tbo` collision limitation; current routes
use the represented cell/TCC/geometric fallback. Presenters consume const native
positions/cells and interpolate meshes independently; online replication is C09.
No FPS gain, whole-game or exact native visual-parity completion is implied.

## Deferred strike-service work (2026-10-27)

The previous source changes remain in the worktree. Release CPU regression
passes five source-rule cases and eight encounters for 3026/3012/3109; full
3033/3107 still need target/combo services. New GPU attempt
`c05-strike-render1` records missing binding1000106 and fails acceptance on
`WorldSkillImpact/4: Unsupported TFX node type7`. That broader skill-FX work is
not accepted by C05 and is not expanded here. No asset alias or authored data
patch was added. Current Debug/Release skill-cast/ordinary-bonus CPU checks are
included in the focused regression, without a complete-skill claim.

The old staged ordinary-attack hash was
`c746e15bdd9876a9292c12a85186e0967fe879036ca9d0263e37a9ab49df7e7a`;
new C05 staging/acceptance is recorded above. Source remains
uncommitted. Broader skill/state/AI/map/visual/performance/release work and all
five continuation objectives remain open.

## Native ordinary attacks and first TAB attack annotation (2026-10-27)

- [x] Reproduce ordinary attacks bypassing the native damage calculation and leaving skill 3059's 40% next-attack bonus active (`attack-bonus-repro3.log`). Bind the equipped item's native skill type, combat phases and costs into the status adapter. Ordinary attacks now share the source cost/CalDamage/CastInstant1 transaction with active skills. Melee commits at the authored marker; released ordinary arrows commit on arrival, including after Escape. A same-frame earlier incoming hit updates the live mob before cost validation. No hit/critical deck or native damage/cost record is changed.
- [x] Verify exact damage payloads for all 12 supplied weapon types: the first attack adds the native physical percentage, leaves all other lanes intact and clears the bonus; the second cannot reuse it. Validation with an active bonus and rejected dead/missing-arrow requests preserve the bonus, output and resources. Twelve bare-hand/sword/bow encounters cover .001/.05-second ticks and Escape before melee impact/after arrow release; a separate authored elite encounter obtains a natural miss without replacing RNG/cards. The final attack suite has 15,474 checks per configuration (`attack-bonus-first-marker-cpu-release1.log`, `attack-bonus-first-marker-cpu-debug1.log`). No ordinary dart item (animation 910) exists in the supplied catalog; record it in `MISSING_WEAPONS.tsv` without an alias or resource search.
- [x] Correct the timing loader's rejection of Srbinda's two adjacent attack tags (`attack-bonus-release3.log`). The pinned original `HT3DHeaven.dll` loader at RVA2DDB1 stores the first attack/Attack substring before the final key; Start/ChangeAnimation cache one index, and the state query has a consumed flag. `native-first-attack-marker.json` records four verified disassembly blocks; the DLL is inspected, never executed or shipped. The loader now uses key18 at .805051 seconds and ignores key19 at .808081 seconds. The Tiger marker, 36 PC attack clips and rejection of a clip without a marker also pass in Release/Debug. This closes that duplicate-annotation rejection; native MultipleStrike services remain separate unfinished work.
- [x] Replace the world-gameplay regression's injected damage snapshot with the actual starter weapon and live native session. Check every target HP change against emitted impacts, native reward/drop, death and revival. The 13-test Release/Debug status/equipment/skill/effect/projectile/navigation matrices pass (`attack-bonus-cpu-release-final1.log`, `attack-bonus-cpu-debug-final1.log`), taking 49.14/694.22 seconds. Those matrices preceded the marker correction; the two affected marker/bonus gates pass separately afterwards. Unchanged navigation is not repeated for the annotation-only change.
- [x] Rebuild/stage the final Release and pass actual SDL combat/UI/audio/Prana/drop checks (`attack-bonus-sdl-combat2`): two player impacts, two monster impacts, six glyphs and ten sound requests. Exit0; protected, default-profile and seed snapshots remain unchanged. Clean client layout/external runtime closure passes with 52 owned files (`attack-bonus-package1`); clean-machine deployment remains open. Staging log: `attack-bonus-stage-first-marker2.log`.
- [x] Release projectile GPU regression (`attack-bonus-projectile-render-release1`): 27 positive encounters, five lifecycle cases and four rendered cases pass. Skill 3162's missing activation remains recorded/skipped; available unsupported-FX warnings are zero. Release monster GPU regression (`attack-bonus-monster-render-release1`) adds Srbinda to the default melee/ranged matrix: ten positive fine/coarse encounters, four GPU cases and nine lifecycle checks pass. Srbinda's misses and positive hits both occur at the first marker; the new checks verify actual selected animation and authored impact geometry/depth, without claiming full-map visual parity.

- [x] Final Debug monster GPU acceptance also passes ten encounters/four GPU cases/nine lifecycle checks (`attack-bonus-monster-render-debug1`). Both fine/coarse Srbinda cases retain the native first miss and subsequent positive hit at .805051 seconds. Debug's affected first-marker/bonus retest completes in90.60 seconds; no timed-out observation is treated as a failed process or restarted run.

The final Release executable
matches the staged client at SHA256
`c746e15bdd9876a9292c12a85186e0967fe879036ca9d0263e37a9ab49df7e7a`.
`attack-bonus-source-evidence.json` pins the source, native engine evidence,
canonical inputs, accepted results and current executable identity.
The earlier controlled performance baseline remains tied to the monster-ranged
build; no optimisation gain is claimed. Remaining critical/pierce/multiple-strike,
periodic/area/monster-state services, special patterns and broader map/game
acceptance remain open.

## Native shield energy and per-hit FX (2026-10-26)

- [x] Compile the four instant shield/break cases from `CMob2::OnTakeInstant2` and both native absorption functions into the existing status adapter. Skill3102 creates energy instead of an ordinary timed-effect slot;3145 derives enhanced energy from TP after its cast cost. Keep ordinary70% physical absorption, enhanced physical/elemental percentages, native nearest rounding, shared enhanced energy, pierce bypass and strict-less-than depletion flags. Exact exhaustion keeps the native flag while an overflow hit clears it.
- [x] Route incoming monster damage through the live defender session before combining physical/pierce/elemental lanes and updating HP. Misses consume no energy or TP. Native effect ticking and equipment updates retain the energy; a fresh native entry starts without invented saved shield state. No new fields are added to native character persistence or the client tree.
- [x] Match `HTMainCharacter::HT_vMainChar_SetActiveSkillEffect`: type24 has no continuous State graph; incoming melee hits/misses play level1 State once, and long attacks wait for visual arrival. Enhanced wins if both flags are present. The per-hit owner survives equipment replacement and is removed on death/scene clear. Skill3145 is present in Global authority data but lacks its canonical fxPC link; `MISSING_FX.tsv` records it and presentation is skipped, with no search or alias.
- [x] Reproduce a defensive cast consuming a one-shot attack bonus (`energy-shield-bonus-repro1`). Restore the native `CastSkill` DealDamage guard around CalDamage/CastInstant1. Real3059 retains its40% next-attack bonus through defensive3022; damaging3007 consumes it once. The first follow-up test chose passive3001 as its attack; the corrected test uses the actual active damage record.
- [x] Final Release/Debug renderer acceptance (`energy-shield-isolated-render-release1`, `energy-shield-isolated-render-debug1`): 2,555 checks each cover real3102 levels1..10, real3145 cast/absorption, rounding/depletion/break/invalid requests and the defensive-bonus regression. Two GPU cases cover levels1/10, melee/ranged shield reactions, native misses, actual HP/energy debit, level1 State selection, equipment, Escape and death cleanup. The explicit private level100 Rakshasa uses30 extra Nerve and230 extra Heart Chakra; native950 TP pays3145's850 TP cost, leaving100 TP and1,000 enhanced energy. Native costs, RNG, records and assets are unchanged. Matched captures hide only `WorldSkillShieldImpact` geometry while holding pose, clock, monster impact and all other FX unchanged: level1/10 show299/450 pixels differing by more than3 channel levels in both configurations. These isolate the shield itself, tightening the earlier global-FX on/off captures. No available-graph warnings occur.
- [x] Actual SDL shield3102 and ordinary buff3110 each pass88 cast/equip/unequip/Escape checks on the final staged Release (`energy-shield-sdl-final2`, `energy-shield-buff-final2`). Both exit0 and preserve their protected/default/seed snapshots. The earlier buff-regression preparation was held by the running normal launcher; the accepted run followed the user's explicit close response, without terminating their process.
- [x] Twelve status/equipment/parameter/skill/caste/effect/projectile/monster/navigation CPU gates pass in each configuration (`energy-shield-cpu-release1.log` plus `energy-shield-skill-release1.log`, and `energy-shield-cpu-debug1.log`). Debug's953.67-second matrix completed, including224.49-second projectiles and571.50-second navigation. The later DealDamage guard has separate affected cast/shield/projectile retests; unrelated navigation is not repeated merely to produce another green log.

The initial enhanced-shield fixture could not pay850 TP; the accepted fixture
uses native Heart-based mana rather than relaxing costs or adding fake TP.
Missing3145 presentation remains explicit. Final Release/Debug affected cast/
shield/projectile retests pass (`energy-shield-final-cpu-release2.log`,
`energy-shield-final-cpu-debug2.log`). Debug's623.89-second affected matrix,
including479.04-second projectiles, completed successfully. Clean client layout/external runtime closure passes
(`energy-shield-package-final2`); Release is staged (`energy-shield-stage-final2.log`).
Build and client executables match SHA256
`a90b975cc91dcbed7a8261c6c3d4b1fc4aec122cd5a0c4ec7d739e732a69e404`.
`energy-shield-source-evidence.json` pins this checkpoint's sources and results.

`energy-shield-pattern-audit.json` also verifies all23 nonzero template IDs
referenced by the supplied Zone01 generators: their authored Global skill
patterns are zero. The Global source has588 patterned templates outside that
set. This does not implement their special-skill scheduler, cast counts or
area/timed state services. Remaining native skill/weapon FX and broader game
gates stay open. The last controlled7,200-frame baseline remains tied to the
monster-ranged executable; no new shield performance result or optimisation
gain is claimed.

## Native monster default ranged attacks (2026-10-26)

- [x] Replace unconditional idSkill0/fixed20-unit monster attacks with `CMob::BattleProcessor`'s default melee/ranged branch. Use `GetFunc::CalDistance`'s rounded integer-cell distance and native body radius. Imported skill ranges already include `LoadSkillData`'s +2; retain that transformation once. Monsters with no ranged skill continue using their native melee fallback.
- [x] Lock the selected skill and its TAB timing at windup. Resolve MONSkill's animation through MonAni; use ATK1 only for a zero animation binding, matching `HTEngineHandler::HT_hrChangeMonsterAttackAnimation`. Display, damage and activation/impact presentation now share that actual skill identity. Monster events are excluded from the separate PC-skill FX decoder.
- [x] Implement native long-attack types3/4 with a depth-tested null carrier and authored follow/impact graphs. Use the existing225-unit/second straight-flight equations. Keep HP and hit digits on the source TAB marker (`HTMonster::HT_vMonster_AttackPointCheck`); visual arrival never applies damage a second time. Remove flights on caster/target death, missing render owner, generation replacement and scene clear; rebind their target during the same player's equipment display replacement.
- [x] `monster-ranged-render-final3`: eight positive encounters cover monsters2004/2005, melee41010/41011 and ranged41400/41401, at .001/.05-second ticks. Verify each native miss and positive hit against the .448485-second marker. Three GPU cases pass eight lifecycle/rebind checks. Matched held-pose on/off captures prove visible follow (45â€“46 pixels over three channel levels) and impact (1,068â€“1,102 pixels); zero unsupported/missing graph warnings. These isolated captures contain the real actors/FX, not a full map visual comparison.
- [x] Release build/staging and actual SDL combat regression pass (`monster-ranged-release-build5.log`, `monster-ranged-stage1`, `monster-ranged-sdl-combat1`). The launcher presents two player/two monster impacts, six glyphs, ten sound requests and60 earned Prana; protected/default/seed data stay unchanged. Release's existing projectile/marker/flight/navigation regressions pass in `monster-ranged-regression-release1.log`.
- [x] Debug build and the same eight encounters/three GPU cases/eight lifecycle checks pass (`monster-ranged-debug-build1.log`, `monster-ranged-final-probe-debug-build1.log`, `monster-ranged-render-debug-final1`). Debug's matched captures have the same visible-pixel counts. Five focused Debug CPU gates pass across `monster-ranged-regression-debug1.log` and `monster-ranged-debug-timing-retest1.log`; the initial marker gate was not run because its binary was unbuilt, then passed after that target was built. The195.05-second projectile and302.22-second navigation checks completed successfully; they were not restarted on an observation timeout.
- [x] Actual SDL buff3110/equip/unequip/Escape still passes88 checks (`monster-ranged-sdl-buff1`), with unchanged protected/default/seed data. Clean client layout/external runtime closure passes (`monster-ranged-package1`). The final Release monster CPU gate passes separately in `monster-ranged-cpu-release-final1.log`.
- [x] Rebaseline this exact staged Release (`monster-ranged-profile1`, SHA256 `871a8eac3242c7334fe67a3f6dbfd1bd8a2c3392bf20e943c2d6a4bc5ca05788`): six isolated trials /7,200 measured frames, all GPU samples valid, no concurrent builds/QA and unchanged protected/default/native inputs. Dense43-actor medians9.67â€“9.87ms include4.10â€“4.16ms pose work; GPU1.49â€“1.67ms. Initial dense actor creation takes370â€“380ms, settled population2084â€“2114ms. Combat40-actor medians9.14â€“9.25ms retain a73.02ms worst interval. Preserve raw timings and the older baseline's executable identity; no isolated optimisation gain is claimed.

The encounter fixture retains one real generated actor at its authored position
and uses a private in-memory level20 PC with30 extra Heart Chakra. Native RNG,
attack/dodge decks, damage parameters and resource bytes are unchanged. Initial
test attempts incorrectly required the first swing to hit; the source deck
dodged it. The accepted test checks those misses and the subsequent positive hit.
Another capture sampled after the short impact lifetime; the accepted matched
capture is taken while the authored effect is live. Failed attempts are retained.

The separate ten-step special-skill patterns in `CMob::SelectSkill`, cast counts,
synchronised skills, area/timed monster states and the complete AI scheduler
remain open. This accepts the default melee/ranged branch in Mandara, not every
monster skill or another map's FX library. Full skill/weapon FX and whole-client
visual/performance/release gates remain open.

## Buff FX during equipment replacement (2026-10-26)

- [x] Reproduce a committed3110 buff disappearing after the same player's equipment rebuilds its renderer object (`buff-owner-repro1`). The original client keeps its logical main-character model during equip/unequip; our new object name left the visual pointing at a destroyed parent.
- [x] Rebind exact FX parent and Prana destination references after a successful production equipment replacement. Preserve graph age, lifetime, socket, geometry and existing particle/audio state. An invalid replacement fails without changing attachment state. Death, missing-owner and scene teardown still remove owned effects normally.
- [x] Release and Debug renderer regressions pass (`buff-owner-render1`, `buff-owner-render-debug1`): actual3110 transaction,180-second expiry, pre-commit cancellation, effect-removal snapshot, equipment replacement without a recast/TP charge, death, missing parent and scene cleanup. The held-pose before/after captures have identical pixels.
- [x] `buff-owner-sdl2` passes88 checks through ordinary SDL input: cast3110, open inventory, equip the native starter sword, unequip it and press Escape. Both display replacements retain the live buff and deadline; persisted inventory/equipment return to their entry records and skills match the captured in-world entry bytes. Exit0; protected client, default profile and seed hashes are unchanged.
- [x] Release/Debug builds and four focused CPU checks in each configuration pass (`buff-owner-release-build3.log`, `buff-owner-debug-build1.log`, `buff-owner-cpu-release1.log`, `buff-owner-cpu-debug1.log`). Release is staged (`buff-owner-stage2`); clean client layout/external runtime closure passes (`buff-owner-package1`).
- [x] Rebuild and run the existing rendered projectile regression against the current FX header (`buff-owner-projectile-build1.log`, `buff-owner-projectile-render1`):27 positive-damage encounters, five lifecycle cases and four GPU flight/impact cases pass. Accepted missing3162 activation remains recorded; unsupported-runtime warnings remain zero.

The first SDL runtime (`buff-owner-sdl1`) passed its live checks, but the
post-run verifier compared skills against the pre-login fixture. Native world
entry clears reserved skill slot30; the corrected verifier captures the actual
world-entry bytes and requires them unchanged through equipment replacement.
The failed attempt is retained. No canonical profile/resource was edited or
extracted. This closes the equipment ownership bug; wider buff services, monster
skill selection/ranged/state families and full skill timing remain open.

## Native body, hair and apron animation sets (2026-10-26)

- [x] Fix hair/apron attachments retaining their creation clips while the body moves, attacks or casts. Decode native state/attack/skill body/front/back triplets and Head/PCAni hair mapping. Apply independent clip rates to the same action duration, source cast looping, finite attack playback and key-zero starts. Production world and INTRO selection/idle paths use the new sets.
- [x] Preserve selected clips and clocks during head/equipment replacement. Keep valid zero-duration hair clips on key zero; log missing optional bindings/payloads without replacing them or searching other clients.
- [x] Correct the extra mesh/animation count restriction in the name-bound loader. The native engine's 2DE71/2EDDF path searches tracks by name and skips absent branches; its current reference hash/disassembly recheck passes in `socket-native-namebinding.txt`. Keep original mesh hierarchy, bind-matrix, weight bounds and required-track checks. Eight count-different supplied skill cases now render.
- [x] `socket-animation-render6`:7,024 binding sets,312 attack sets across13 source rows/eight tribes/three variants,6,376 skill-phase sets,889 decoded TABs and one valid static clip. Verify424 GPU playback sets,1,651 body/socket clock checks,424 key-zero starts,56 hair selections and8 head/8 equipment replacements. One unavailable PCAni31159 reference remains in `MISSING_ANIMATIONS.tsv`; it is skipped as requested.
- [x] Eight focused CPU gates pass in Release and Debug, including native bind/weight/singular-transform checks, normals, animation timestamps, weapon bindings, socket inventory and27 actual projectile/weapon encounters. Logs: `socket-animation-cpu-release1.log` and `socket-animation-cpu-debug1.log`. Debug's encounter matrix takes193.96s; it completes successfully.
- [x] Actual SDL skill3124/Escape/recast passes39 additional socket clip/loop/phase checks, two body clips, six FX submissions and TP110 to104 (`socket-animation-skill-runtime1`). INTRO roster/selection/idle regression passes (`socket-animation-intro-runtime1`). Protected/default/seed data stay unchanged.
- [x] `socket-animation-projectile-render2`:27 positive-damage encounters, five cleanup cases and four rendered flight/impact cases pass with the body/socket API. Missing3162 activation1000646 remains recorded; unsupported-runtime warnings are zero. The verifier now distinguishes the user's accepted missing assets from unsupported available effects instead of failing the whole run on an accepted asset gap.
- [x] `socket-animation-buff-runtime1` retains real3110 buff transaction/180-second expiry, Escape, effect-removal snapshot, death, owner removal and scene cleanup. `socket-animation-persistence1` repeats all six native restart/relogin/character/village legs successfully; protected/default data remain unchanged.
- [x] Rebaseline the corrected Release independently: `socket-animation-profile1` passes six trials /7,200 measured frames, all delayed GPU samples valid, and unchanged source/runtime/native inputs. Current43-actor field medians10.07â€“10.28ms include4.23â€“4.25ms pose work; GPU1.68â€“1.69ms. Keep the older matrix tied to its own executable; this correctness change is not a same-quality optimisation comparison. Final package check passes in `socket-animation-package1`; Release remains staged.

Historical failed attempts remain retained: the first inventory assumed every
clip had positive duration; later renderer coverage exposed the count-only
restriction. The first updated projectile probe treated a legitimate zero-clip
ready phase as a body-state ID; it now leaves that phase without an animation,
as production already does. No missing resource was substituted or extracted.
These checks cover binding/playback and the represented live transactions, not
every skill service, monster state family, outfit or original-client visual
comparison. The overall skill/weapon FX goal remains active.

## Crowded-scene and loading baseline (2026-10-26)

- [x] Add opt-in application/backend scopes and `tools/profile-world.py`. Ordinary play does not read profiling clocks. Record raw CSVs, hardware, native/runtime input and source/executable hashes, scene captures, actor/FX owners, deformed vertices/upload bytes and delayed bgfx CPU/GPU timings.
- [x] `world-profile-matrix1` passes two fresh sequential Release processes each for town, the densest collision-checked authored neighbourhood and a real skill/combat encounter:7,200 measured frames after120 warmup frames per trial. No population clones or reduced-quality overrides. Normal real elapsed world time replaces fixed QA intro time for these measured scenes.
- [x] On i7-12650H / RTX4050 Laptop,1024x768 HIGH/D3D11 with2048 shadows: town4 actors median6.52â€“6.56ms; dense field43 actors9.68â€“9.73ms; combat40 actors9.05â€“9.20ms. Dense CPU pose work4.12ms sits inside5.32â€“5.35ms total animation work; GPU median1.45â€“1.64ms. Each combat trial records native3124 damage and six positive-damage impacts. All7,200 delayed GPU samples are valid; repeated asynchronous values remain possible.
- [x] Separate native playable readiness from nearby-actor creation and settled populated readiness. Dense load totals2049â€“2081ms; individual initial actor creation stalls365â€“370ms. Full map decode282â€“302ms, world/sky creation253â€“264ms and authority stages238â€“319ms are measured separately. Frame p95/p99 and worst intervals are in the existing implementation plan and raw summaries; combat has a69.32ms worst interval.
- [x] Debug/Release builds pass (`world-profile-release-build3.log`, `world-profile-debug-build1.log`). Protected/default files and all recorded runtime/native inputs remain unchanged. First reducer known-value checks pass; accepted raw data also passes sample sequence, nested/disjoint CPU-scope and GPU-validity checks. The earlier smoke matrix is retained; it preceded the narrower pose and initial-population scopes.
- [x] With profiling disabled, actual SDL skill3124 cancellation/recast and Mandara portal/altar/water/ground/target/depth regressions pass on the final Release (`world-profile-skill-regression1`, `world-profile-fx-regression1`). Native geometry, brightness, UV motion, terrain conformance and zero pixels through the test building remain verified.

Priorities from this baseline: reduce CPU pose/deformation cost while retaining
native normals/sockets/timing; then dirty UI updates and scene traversal. Test
GPU skinning and batching against the same scenes before claiming gains. For
loading, budget decode/resource creation around the measured stalls. No such
optimisation is claimed implemented by this profiling checkpoint. Fresh process
loads have an uncontrolled, fixture-warmed OS cache; they are not disk-cold.
Retained FX/actors are owners, not visible-frustum counts. Other maps, online
crowds and the broad C08 performance/recovery gate remain open.

## Native persistence and restart matrix (2026-10-26)

- [x] Correct world entry to apply native Interface.sys quickbar orientation and number/function-key mode. Preserve the original chat-style field, extra window positions and unknown tail; do not invent persistence for options the original format does not store.
- [x] Preserve all four explicit roots in Restart. Validate the generated Windows command with CommandLineToArgvW, including empty/Unicode/quoted/trailing-backslash arguments. Debug/Release menu/options/restart CPU checks pass; final Debug build: `persistence-final-debug-build1.log`.
- [x] `persistence-runtime3` passes six fresh-process legs over one disposable profile: actual native SDL Restart request, same-character relogin, second character, villages18/19 and return to1. Check complete native character bytes across same-zone restart, equipment attachments on the renderer, character-specific five-page quick slots, alternate number-key handling, window positions and independent live miniaudio volumes. Only native zone/cell fields change during village transitions.
- [x] Keep protected client/default profile data unchanged. Historical `persistence-runtime1` failed because the QA assumed an absent options confirmation button; the corrected test uses the native O shortcut. Both later matrices pass; the final one includes stronger rendered-equipment and byte invariants.

The three supported village zones share Mandara client art40001. Distinct map
art and in-game portal handoffs remain open. The harness owns the fresh process
launched from the exact emitted Restart command; actual OS ShellExecute child
creation is not claimed as separately tested. Crowded/loading profiling and the
remaining available native skill/FX families remain active work.

## Monster activation/impact columns and FX names (2026-10-26)

- [x] Replace raw MONSkill offsets with named native fields; use activation/impact instead of follow/state for windup/hit events. Honor ASCII case differences in native FX graph lookup (`dadati_Fire` â†’ existing `dadati_fire`), retaining exact-match precedence and unchanged client bytes.
- [x] Release/Debug audit:36 rows,45 nonzero links,13 unique IDs;44 links resolve after the name correction. Skill41290's impact1200101 is absent from both supplied Mandara tables; keep that gap explicit beside PC-skill3162's missing1000646.
- [x] `monster-impact-runtime2`: actual monster2001 skill41004 hit FX1200007 renders on the player with40 vertices/60 indices and correct depth state. Native hit/audio/Prana/trail/F-pickup checks and protected/default/seed hashes pass. Release is staged in `monster-fx-stage2`.
- [ ] Complete remaining native monster skill selection, ranged/area/state behavior and the broader skill/FX matrix. The phase decoder and this melee encounter do not imply completion of those families.

## Native default hotkeys, chat and map views (2026-10-26)

- [x] Verify and implement the requested source defaults: menu windows, name/bubble/UI toggles, screenshot release, both quick-key modes, main -/+ paging, W/A/D, arrow orbit, walk/sit, camera views/reset/zoom, E/R/T, F pickup, Alt labels and chat focus/commands. Preserve the user's explicit F11 choice: optional native broadcast camera, disabled by default; no invented first-person mode.
- [x] Capture the original guild/address/help/minimap/ChattingBox declarations, including Philippine English labels and help tabs. Read Mandara's existing minimap DDS from TerrainTex.hpk and the original ETC arrow; never extract resources. Keep typed chat and quantity prompts from activating world/menu keys.
- [x] `hotkeys-runtime4`:63 actual-SDL checks, native cropped/full map views, Alt+W, key release/focus loss, Ctrl isolation, camera controls and BMP screenshots in the external profile. `hotkeys-loot-runtime3`: native earned drops, readable white Alt names, actual F approach and persisted11-Rupiah pickup;2 player/2 monster marker-timed impacts,6 glyphs and10 sound requests.
- [x] `hotkeys-retarget-regression2`: actual ground-click/E/R preemption with the old destination38.7878 units away and existing movement-animation phase checks. Release/Debug menu/decoder/manual-movement CPU gates pass; optional broadcast presets are exercised separately. Builds: `hotkeys-final-release-build4.log`, `hotkeys-final-debug-build3.log`; staged Release: `hotkeys-stage4`.
- [x] Keep all default/seed/protected data unchanged. Retain failed fixture attempts and their corrections in the existing implementation plan. No client payloads were extracted or duplicated; runtime HUD texture resolution now fails explicitly when its native payloads are unavailable.

The solo authority has no other PC, party, Ashram or online trade service. These
commands use native eligibility/failure paths; the new UI does not fabricate
remote delivery or friend registration. Remaining skill/FX families, transition
persistence and controlled crowded/loading profiling stay open in the full plan.

## Real-map navigation stress and SDL attack retarget (2026-10-26)

- [x] Add `navigation_stress_probe` and `zf_navigation_stress`, using actual Mandara TCC/TML/THM, the atomic Zone01 dataset and native population/rules. Inventory and choose authored altar309, market display1123, house353, temple column301 and ruined stair/wall6156.
- [x] Pass32 static cases: real stairs up/down, two single-cell passages and building detours, each walking/running at .016/.2-second ticks. Record3,848 accepted player steps, validate native floor heights, independently sample both collision grids and actor clearance every .5 unit, and reject blocked clicks without dropping the current valid route.
- [x] Pass8 dynamic cases: corner chase, moving-player replan, immediate ground-route attack preemption and second-monster retarget at both tick rates. The moving chase changes route target five times and reaches its native attack. Real monster parameters remain; the explicit private QA positions are recorded as fixtures.
- [x] Verify actual SDL ground clicks, E selection and R preemption in `navigation-input-runtime1`. R replaces the ground destination while it is38.7861 units away, starts the native attack, and preserves earlier movement-retarget animation-phase checks. The run exits0 and preserves protected/default/seed data.
- [x] Debug/Release builds and CTest matrices pass (`navigation-release-build1.log`, `navigation-debug-build1.log`, `navigation-cpu-release1.log`, `navigation-cpu-debug1.log`). Final CPU evidence is in `navigation-ctest-Release` / `navigation-ctest-Debug`; accepted steps are in `MOVEMENT_TRACE.tsv`. Release is staged in `navigation-stage1`.

The optional accepted-step observer is unset in ordinary play and changes no
movement math. Source TCC stair heights are quantized: ranges20.1..32.0635 and a
maximum observed6.86349-unit step. These tests verify authority/routing, not
smooth visual stairs, every zone, missing authored TBO collision, or the entire
native monster AI scheduler. Stress-run `plan_us` values are diagnostic and do
not close crowded-scene/loading profiling. The first static case labelled a
two-cell flank as single-cell; the corrected fixture crosses the actual one-cell
gap. The first dynamic check assumed the final event must be the player's
windup; it now finds the current player's event even when the monster starts an
attack in the same tick. Failed attempts remain separate.

The user also added the complete default hotkey/chat list. It is now tracked in
the implementation plan. Native input verification has begun; full menu,
movement/camera, quickbar, pickup/highlight and chat-command acceptance remains
open, alongside the other uncompleted goal items.

## Altar and fountain reference refinement (2026-10-26)

- [x] Inspect the user screenshots15:48:54,15:49:10 and15:49:27, authored ALTER_FX/Env_Water01 nodes, and actual close-up bgfx captures. Preserve altar orientation, falling-water direction/UV motion, native basin height and accepted fire/torch settings.
- [x] Add a floating-point RGB intensity control for unlit FX, preserving alpha, depth and cached geometry. Apply gain3 to the altar core,2.2 to its ray models and3 only to fountain foam. Other FX retain gain1; native resources/HPKs remain unchanged. This is a visual reference adjustment rather than a claim of exact native material parity.
- [x] Verify all three altar and four fountain visual layers at a frozen state: old intensity, adjusted intensity, off and restored. Evidence: `build/evidence/altar-water-reference-runtime2`. Actual exposure differences are76004/2845 pixels; both restored images match exactly. The real-building occlusion test remains0 leaked pixels, and native portal/water UV checks pass.
- [x] Fix a shutdown use-after-free exposed by the first run: `stop()` compared a map-key reference after erasing its entry during `clear()`. Capture selector/item identities before erasure. Retain the failed first run/dump; the corrected runtime exits0. Debug/Release builds and native field-binding/cleanup checks pass; Release is staged and package layout validation passes.

The native basin surface is37, above the measured stone floor33.6494. The
read-only `native_world_fx_probe --inspect-water` audit is recorded in
`build/evidence/altar-water-layer-audit1.txt`; no height adjustment or replacement
water geometry was added. Build, stage and package evidence uses the
`altar-water-reference-*build2`, `altar-water-stage2`, `altar-water-fx-debug1` and
`altar-water-package1` names. Default/seed/protected resources remain unchanged.
The separate SDL skill3124/Escape/recast regression also passes and exits0 in
`altar-water-skill-regression1`, providing a second clean world shutdown with
ordinary skill FX. The full five-part goal and missing3162 activation remain open.

## Projectile arrival, attack costs and weapon encounters (2026-10-26)

- [x] Separate native TAB release from projectile arrival. Supported bow/dart/action3/5/6 paths now have flight state, source normal/piercing/bow rates and pursuit updates. Ordinary melee retains its native marker. Damage and skill/ordinary attack HP/TP/item costs commit at the appropriate hit request, rather than charging a projectile at launch.
- [x] Apply native equipped-arrow and active-inventory costs atomically. Arrow7092 spends one equipped unit; other item costs inspect at most five active stacks. Missing/insufficient items reject without partial costs. UI/native inventory state is collected after the transaction.
- [x] Present native arrow7091, projectile-bound follow graphs, arrival impacts and hit digits. Use full U/V/N native flight orientation, level-banded FX IDs and depth testing; remove models/carriers/FX at flight completion or scene clear. Visual review caught and corrected an initial +Z-forward assumption: native arrows use local +X for flight.
- [x] Pass27 authoritative encounters:12 actual supplied weapon types at fine/coarse ticks, plus straight3301, pursuit3306 and bow pursuit3162. Every case produces positive damage; melee uses the native marker and projectiles preserve target HP and player TP/arrows until arrival. Five extra checks cover released Escape, caster death, target generation replacement, population reset and scene reinitialization.
- [x] Render four actual GPU projectile cases with live follow geometry, impact geometry, hit feedback and depth checks. The final component result is `build/evidence/projectile-orientation-render1/PROJECTILE_PIPELINE_RESULT.json`: simulation passes, but the full FX result remains **failed**, with exactly one missing authored binding1000646 for3162. Earlier captures/results remain as failed or superseded evidence.
- [ ] Resolve that activation content gap, complete remaining monster/attached/area/state FX and extend encounters to all skill/strike combinations. No complete FX or combat parity is claimed.

Release encounter/CPU evidence: `projectile-reference-encounters-release1.log`
and `projectile-reference-cpu-release1.log`. Native sources:
`HTAttackManager.cpp` (release/arrival, rates, U/V/N orientation, pursuit),
`CMob3.cpp` (cost validation and removal), `HTEngineHandler.cpp` (level FX bands).
Pursuit uses deterministic lift1 within the native randomized range; collision
uses swept XZ tests. The supplied12-type matrix excludes absent type910 darts and
synthesized dual916 encounters. It complements, rather than replaces, the288
animation-binding checks.

- [x] Build final Debug/Release executables; five focused CPU checks pass in both configurations (`projectile-reference-cpu-*`, `projectile-reference-encounters-release1.log`). Rebuild after the orientation correction and repeat the pure flight orientation check in both configurations (`projectile-orientation-*build1.log`, `projectile-orientation-debug-flight1.log`).
- [x] Stage Release and pass actual SDL skill3124/Escape/recast, saved INTRO names/selection/idle restoration, and Mandara FX/occlusion/UV/torch regressions using isolated profiles. Evidence: `projectile-stage1`, `projectile-skill-regression1`, `projectile-intro-regression1`, `projectile-mandara-regression1`. Package validation passes in `projectile-package1`; clean-machine deployment remains open. Original/default/seed profiles and protected resources remain unchanged.

The full five-part goal remains active: data-version alignment, remaining combat
and FX families, real navigation stress cases, persistence/transition matrices
and crowded-scene/loading profiles are not closed by this checkpoint. No commit
or push was performed.

## Additional K3 / Global references (2026-10-26)

- [x] Register the user-supplied `B:\__TANTRA\TantraDataScripts\K3`, `B:\__TANTRA\TantraDataScripts\Global` and `B:\Tantra-Files\_TantraClients\TantraOnline-Global` in the implementation plan's reference manifest. Treat them as read-only guides and preserve runtime version boundaries; no client extraction or catalog replacement is performed.
- [x] Read the actual K3 XML, Global XLS and both Global client FX TXLs, comparing their native IDs and recording SHA256 hashes alongside the current bgfx client table. Reproducible tool: `tools/audit-fx-references.py`; evidence: `build/evidence/fx-reference-audit1/FX_REFERENCE_AUDIT.json`.
- [x] Record and skip skill3162's missing activation1000646/7/8, per the user's instruction to note missing resources and move on. All five inspected inputs lack its FXSkill definition. Retain the diagnostic and historical failed full-FX evidence; do not invent a replacement or keep searching. Monster impact1200101 and PC FX1000386 follow the same recorded-missing policy. Available behavior and unimplemented FX families still require their own gates.

## Elemental weapon trails and persistent skill FX (2026-10-26)

- [x] Resolve equipped refinement materials directly from the native TPA. Preserve high/low nibble ordering, first elemental effect and source levels1..10 brightness .50..95; bind swFire/swIce/swLighting/swPoison.dds to the actual attached weapon ribbon. The legacy getter's poison->fire typo is corrected only in presentation, using the existing native poison texture.
- [x] Clear ribbon samples/buffers immediately when disabled/cancelled or sheathed, when the owner is hidden/stopped/removed and on destruction. Cached ribbon geometry updates its texture correctly. Existing lifetime/centre ratio and weapon-mesh extent endpoints remain; exact closed-engine endpoint parity is not claimed.
- [x] Pass88 native refinement cases and the existing12 weapon types/eight tribes/288 attack-animation combinations. Five real GPU cases (plain plus four elements) verify texture/brightness, nonzero geometry, depth testing, bounded age and cancel/sheathe/hide/destroy cleanup. Held-pose on/off changes1542,876,1232,1134,1261 pixels; all four elemental images differ. Evidence: `build/evidence/elemental-trails-render2`.
- [x] Correct active-skill State versus Impact decoding. Preserve native once/loop/energy exceptions, attach persistent state to the caster, and remove it at the committed duration or when its native effect slots disappear. Missing parent objects now release attached FX; actor distance-culling resets ownership so indicators/monster loops can restart.
- [x] Add authenticated Escape action cancellation. Pre-commit cancellation spends no HP/TP and deals no damage; cancellation generations prevent queued stale cast/activation events from replaying. Committed buffs survive ordinary action cancellation; death removes them.
- [x] Verify real SDL key1 -> ready FX -> Escape -> no TP/damage/cast FX, then key1 -> successful3124 cast with two animations, six FX geometry submissions and TP110->104. Evidence: `build/evidence/skill-state-escape-skill1`; protected/default/seed profiles remain unchanged.
- [x] Execute native self skill3110 through the actual offline transaction and FX renderer. Verify its180-second state, native timed-effect expiry, effect-removal snapshot, pre-commit cancellation, death, parent removal and scene clear, with no unsupported/missing node warning. Removing the state changes2479 held-pose pixels. Evidence: `build/evidence/skill-state-render3`.
- [x] Debug/Release builds and three focused CPU checks pass in each configuration; all eight tribe cast fixtures preserve pre-impact state, commit once and reject cooldown/cancelled hits. Final build/staging/package and INTRO/skill/Mandara regression evidence is under `build/evidence/skill-state-*`.
- [ ] Complete projectile/follow and remaining attached/area/monster-state FX. Extend live buff and damage-timing encounters across weapon/skill combinations. The binding matrix and3110/3124 checks do not close the full FX objective.

Navigation stress matrices, restart/transition persistence and crowded-scene/loading profiling remain open under the existing five-part goal. No goal completion or full skill/TFX parity is claimed.

## Native TantraParam reader and comparison (2026-10-26)

- [x] Read the native client TPA directly in memory with source-generated field layouts and full895334-byte stream validation. All eight families parse:623 monsters,501 monster skills,1106 levelled PC skills,1664 items,291 NPCs,114 portals,520 quests and49 area indicators.
- [x] Preserve native padding and the client's unknown four-byte item extension. Support item272/item276 layouts, Portal ID0 and native first-duplicate semantics. Reject corrupt counts, invalid IDs, truncation and extra bytes without changing a previously valid catalog.
- [x] Load TPA into the runtime resource catalog and require it for normal INTRO startup. Philippine English text remains first; TPA names/descriptions supply native fallbacks. No client payload extraction or temporary TFX file is used.
- [x] Compare shared numeric records with the existing offline imports, leaving input files and server authority unchanged. Evidence: `build/evidence/native-tpa-imports2/TPA_IMPORT_COMPARISON.json` and its production-reader dump.
- [x] Build Debug/Release and pass focused reader/catalog checks in both configurations plus the Release Philippine English check. Stage Release; actual `native-tpa-roster1` and `native-tpa-skill1` checks preserve protected/default profiles and verify the roster, flat selection circle, skill3124 animation/FX and TP110->104. Package closure: `native-tpa-package1`.
- [ ] Resolve data-version differences:470 Item,655 PCSkill,17 Monster and1 MonsterSkill shared numeric values differ. Additional imported IDs/levels are absent from the client. For example, skill3009 level1 cooldown is5000ms in the client versus59000ms in the import. Neither dataset was overwritten. The extra item bytes remain opaque; encrypted/undocumented layouts are unsupported.

Full skill/weapon FX, navigation stress coverage, restart/transition persistence and crowded-scene/loading measurements remain open. The current five-part order and exact gates are at the top of `IMPLEMENTATION_PLAN.md`.

## INTRO selection ground circle (2026-10-26)

- [x] Inspect native INTRO_CHOOSE01 (1400016): billboard node2 is authored as upright mode1; nodes3/4 are separate particle emitters.
- [x] Present only node2 as a horizontal XZ circle, following the selected actor's root/yaw, with 0.3 native-unit clearance above the platform. Preserve texture UVs, colour/size curves and the two particle layers. Keep world depth testing and no depth writes.
- [x] Verify actual uploaded vertices have constant Y and remain horizontal after a 40-degree camera orbit. Use an isolated copy of the existing roster; original/default profiles and client resources remain unchanged.
- [x] Build Release/Debug, stage Release and validate the package. Evidence: `build/evidence/intro-selection-ground-runtime1/INTRO_SELECTION_GROUND_RESULT.json`, original/orbit captures, build logs and `intro-selection-ground-package`.

## Client-only layout cleanup (2026-10-26)

- [x] Audit the existing native resource categories, supplied `dev-docs/ClientTree.md`, and native UI save/load paths before cleanup.
- [x] Preserve 103 support/profile files outside the client. Both legacy and active SQLite logical states match their originals; backups and the migration ledger are in `.migration-local/`.
- [x] Keep the launcher, required Visual C++ DLLs and native client resources/configuration in `_client_bgfx`. Put shaders, English import, offline/server tables, dependency notices, manifests and logs in this project's `runtime/`; normal saves use this project's `userdata/zflauncher`.
- [x] Put `Start-Offline.cmd` in `_client_bgfx`, as requested. Repeated staging no longer creates support, profile or log folders inside the client.
- [x] Reuse `_client_bgfx/resource/UI/Interface.sys` for normal window/options persistence, including independent effects/music volume. Preserve unknown fields and extra window positions. Explicit QA uses isolated copies; native controls no longer require ClientOptions.ini.
- [x] Keep native `MainUISave.sys` (legacy v2004), `MainUIInfo.sys` and `Interface.sys` (active v2005). MainUISave has no active load/save call in the checked source.
- [x] Clear 2,507 archive-redundant loose payloads, including the user-removed bitmap alias verified by content hash, while preserving all 148 HPKs. Relocate 77 non-runtime extraction indexes/cache records. Retain the three SourceSafe metadata files listed in the default tree, per the user's default-file clarification.
- [x] Honor the final archive policy: do not extract/recreate files merely because a default tree lists a loose copy. ENVTEX payloads remain in ENVTEX.hpk; extraction CSVs are unnecessary.
- [x] Route TAB animation loading through NativeResourceIO, alongside meshes, textures, UI and samples. Post-cleanup Mandara FX/occlusion, roster, INTRO audio/FX, recovery/persistence and combat/trail/Prana checks pass with duplicate files absent.
- [x] Finish empty-folder removal after Sublime Text released its handle. The strict package check rejects remake support/profile/log directories and non-default extraction metadata inside the client.
- [x] Rebuild Debug/Release; pass five focused CPU checks, 14 Python checks, source/dependency preservation, profile rejection guards and the runtime checks above.

Evidence: `build/evidence/CLEAN_CLIENT_NATIVE_INTEGRITY.json` records 6,178 initially inventoried files, 2,507 redundant loose payloads cleared, 77 non-runtime metadata files relocated and 3,594 retained files (excluding ZFLauncher.exe). All retained bytes match the starting inventory; no native payload was lost and all 148 HPKs remain. `CLIENT_PROFILE_RELOCATION.json` proves both database states were preserved. `CLIENT_TREE_COMPARISON.json` records native/version differences against the supplied default tree; the tree does not override the user's instruction to read HPKs without extraction. Runtime evidence is under `build/evidence/clean-layout-*`, with final package closure under `default-client-tree-*`; the active executable hash is in `runtime/package-manifest.json`.

The existing `system/TantraParam.tpa` remains a native client file and is now read directly by the client resource catalog. The offline authority still reads imported parameter/stat tables outside the client; client/server data-version differences are reported separately above. ClientRes/HTMessage/FX TXLs remain direct native inputs.


## FX presentation corrections after the 10:10 screenshot review

- [x] Resolve the native >9999 position sentinel from the rendered target height;
  retain floating model chevrons and the distinct yellow selection/red attack
  graphs (1010011 /1010031). Actor death/deselection removes the indicator.
- [x] Conform ground-plane billboard layers without flattening the animated
  chevrons. Stop the ground marker when movement stops or attack/cast takes over.
  Root-attached progression/skill rings also fit the native terrain/TCC floor.
- [x] Apply the native attached-model parent-yaw correction, independent FX scale
  and transformed fixed-billboard axes. The accepted fountain side capture shows
  Env_Water01 falling into its basin; restore its authored V texture motion.
- [x] Animate model texture U/V independently of TAB skinning, including the
  portal's opposite +1/-1 U rates. Assign texture overrides by material slot;
  do not deduplicate slots by texture name or repeat the last override forever.
- [x] Composite alpha smoke before emissive flames/sparks. Preserve the separately
  verified particle blend path; use premultiplied alpha for model/billboard FX to
  avoid multiplying their premultiplied colour by alpha again.
- [x] Observe committed world snapshots for Chakra/level increases (1010003) and
  learned/upgraded skills (1010002). Initial loading and unchanged snapshots do
  not replay upgrades. Existing allocation validation and persistence remain in
  the authoritative offline channel.
- [x] Show native dropped-item targeting (1010021) on hovered loot and remove it
  after pickup/removal or pointer departure. Restrict picking to actual loot
  owners; correct the inherited OGRE-name comparison for bgfx object names.
- [x] Extend the real Mandara GPU scenario with separate arrow/ring height checks,
  native attack colour, item ring/chevrons, model UV deltas, progression dispatch,
  torch blend families and held-pose on/off pixel checks. Snapshot presentation
  fixtures do not award levels or modify the saved character.

Accepted evidence: `build/evidence/fx-parity-runtime3`. The four field views
restore exactly; portal animation changes174354 pixels. Target/ground, attack,
item, level-up, Chakra, skill-up and torch captures change7024,716,971,194049,
194035,81553 and49407 pixels respectively. Behind a real opaque house wall the
FX still changes0 pixels; the depth-off control changes7744 pixels. Portal U
rates advance +.125/-.125 and waterfall V advances -.125 over .125 seconds.

Debug and Release builds, four focused CPU and14 Python checks pass.
`fx-parity-intro-regression` accepts native INTRO fire/sound/music;
`fx-parity-skill-regression` accepts real skill3124 UI/key, two animation clips,
six FX geometry submissions and TP110 ->104. `fx-parity-combat-regression`
accepts a real monster attack marker, two player/two monster impacts, six damage
glyphs and ten sound requests. Package16-file closure and379 source/nine input/
six repair preservation checks pass. Release is staged in
`_client_bgfx/ZFLauncher.exe`, SHA256:
`7cc5fdede8d2b66970f8f34006b69fe8442ca26be13ac71ea3d518352a59615d`.

These checks cover the requested presentation corrections, not complete native
TFX/skill/FX-family parity. Wider open gates and canonical missing FX1000386
remain open. Original assets, OGRE source and default profiles are preserved;
missing INTRO TMBs continue to be skipped without searching or substitution.

## World FX occlusion correction after the 09:36 screenshot

- [x] Separate world-FX depth testing from terrain conformance. Every model,
  billboard and particle submitted by NativeWorldFx tests scene depth; blended
  effects retain depth writes off, native colour/blend and the FX draw pass.
- [x] Refresh texture, depth and blend state when a cached FX mesh is updated,
  rather than retaining its creation-time flags.
- [x] Keep the separately verified native INTRO particle preset and UI/sky paths
  unchanged; the bounded OGRE INTRO implementation was not a general Mandara
  world-occlusion reference.
- [x] Accept a held-pose GPU occlusion regression against the rendered native
  house `World/Object/327` / `r01_Stru_man_house1_01.tmb`. Behind the wall, FX
  changes0 pixels; disabling depth reproduces7744 leaking pixels. Re-enabling
  depth on the same cached buffers restores0 differences. In front, alpha and
  additive FX each change9604 pixels, and switching cached blend changes9604.

`build/evidence/world-fx-depth-runtime1` contains the wall, hidden, depth-off,
restored and front captures plus `FX_OCCLUSION_STATE.json` and
`FIELD_FX_PIXELS.json`. All four representative field views still show FX and
restore exactly: portal1400017=217736, altar1400023=7898, portal1400009=10105,
water1400011=11419 changed pixels. Earlier on/off/restored captures did not test
building occlusion and missed the depth-state defect; this check now runs as
part of the `mandara-fx` scenario acceptance.

Four focused CPU and14 Python checks pass. `world-fx-depth-intro-regression`
retains native INTRO fire/audio/music acceptance; `world-fx-depth-skill-regression`
retains real skill3124 UI/key/animation/FX/TP acceptance. Debug/Release build,
100-frame Debug smoke with three renderer reinitialisations, package16-file
closure and379 source/nine input/six repair preservation checks pass.
Release is restaged in `_client_bgfx`; SHA256:
`4ae0c26f76a316c497755443a455aa956becaf3d122f5d5d4154d2b8a4d1efb8`.
This fixes opaque-world FX occlusion; the wider FX/skill/visual-parity backlog
and canonical missing FX1000386 remain open.

## Latest Mandara actions, FX and audio checkpoint

Native Mandara TML now binds 55 day/night FX instances through model, billboard,
particle and sample nodes, with global fxPC resource fallbacks, graph/socket
attachment transforms and explicit missing-resource diagnostics. Portals, altar,
water and the original target indicators have independent on/off/restored captures
in `mandara-fx-verified`; all four views restore exactly. Their visible differences
are 251568,46129,23611,51917 pixels. Terrain markers retain UVs and sample every
subdivided vertex against the terrain/TCC floor rather than intersecting slopes.

The skill window and quick slots now cast supported learned active skills instead
of always returning unavailable. Native ready/cast/activate bindings, source TAB
impact, HP/TP costs, cooldown, damage equations and represented self effects are
connected. `mandara-skill-verified` uses real SDL key1 for skill3124: two native
animation clips, six FX geometry submissions, TP110 ->104 and a rendered impact.
Eight source tribe fixtures pass pre-impact/no-double-impact authority checks.

New attack commands replace old ground destinations immediately. Monsters use
collision-checked offline A* chase routes and face the live player while attacking.
`mandara-actions-final-combat` accepts two PC/two monster impacts, six glyphs and
ten sound requests; original player/monster WAV playback succeeds. Philippine
TantraParam English names remain the default. The original client interpolates
movement received from server authority; the offline pathfinder checks both the
server TCM and client TCC. Full original AI/leash/patrol behaviour remains open.

Chakra main/bonus fields already followed the original calculation. Added tests
now spend each of the four stats through the channel, decode actual UI frames,
inspect durable records, reopen the store and log in/CHAR_INIT again. All increases
survive. The plus field means effective minus base, not accumulated spent points.
The accepted Chakra button also starts the original upgrade FX1010003.

`HTMapInfo` selects Mandara field30007 versus safe30008. Both MP3 streams start in
separate runtime profiles (`mandara-actions-final-combat`, `mandara-actions-town-sky`).
The map's 20 TMS regions select overlapping day/night ambience; source fading and
owned loop cleanup are connected. The town run also accepts ten sky/cloud/fog/
celestial states without changing saved profiles.

Debug/Release builds pass. `mandara-actions-debug-shell` accepts100 frames,
resize/minimise/restore and three renderer restarts. Release is restaged with
16 owned files; `mandara-actions-package-verified` and
`mandara-actions-source-preservation` retain379 source/nine input/six repair hashes.
Release SHA256: `7e57fc6b39d10bff56a1e1318dbbc5d4b26cddecfe6fb406b4638d66aa20c08f`.

Six focused CPU checks and14 Python checks pass. A separate closed-store/fresh-login
Chakra check passes. Runtime captures were viewed. Full skill/FX and visual parity
remain incomplete: specialised/item-cost casts, projectile/follow/state lifecycles,
NPC idle FX, mode3/trails/lights/jitter, full UV/billboard and apron matrices remain
tracked. Skill3124 references absent canonical FX1000386; all three client copies
have identical fxPC bytes. Two unused Mandara catalogue names also lack matching
graphs. These gaps remain visible, with no replacement assets or INTRO TMB search.

## Completed

- [x] Keep the phased [implementation plan](IMPLEMENTATION_PLAN.md) in place.
- [x] Capture 379 reused source/tool hashes, original commit/dirty patch and nine canonical input hashes.
- [x] Pin bgfx/bx/bimg/build wrapper/SDL3/SQLite and build C++20/x64 Debug and Release.
- [x] Implement the bgfx backend, shader pipeline, native resources/UI, CPU skinning, sockets and conservative culling.
- [x] Seed a separate profile without modifying source saves; committed WAL recovery occurs only in a private snapshot.
- [x] Switch the dedicated runtime to `_client_bgfx`; stage only bgfx-owned files and preserve the original `_client`.
- [x] Run original offline login/roster/INTRO, create/select/delete, CHAR_INIT/Mandara and minimum controls through real SDL input.
- [x] Accept the C06 minimum service/combat gate, including paid repair/reload, failure/cancellation cases and source death/revival.
- [x] Verify eight tribe previews, full-roster/duplicate rejection and corrected creation retry.
- [x] Preserve authored deformed normals and verify the directional shadow depth/pixel path independently.
- [x] Port the implemented OGRE atmosphere/material/fog adapters and selected native intro FX/audio.
- [x] Apply ordinary melee damage at the authored TAB attack key, synchronize the rendered attack pose, and present native damage/miss digits, hit flash and sounds.
- [x] Accept SDL movement retarget without restarting the walk/run phase, and repeat the native services/full-record reload checks.
- [x] Connect native weapon-ready stand/walk/run states and safe-cell sheathing; accept sword movement and combat in disposable offline profiles.
- [x] Add Mandara's source sublight/character spotlight and a separate daylight reference preset; verify held-pose light/presentation pixels and unchanged opaque UI colours.
- [x] Correct terrain section addressing, retain native 10-mip detail with 16x world filtering, and match OGRE's creature-only modulative shadow scope.
- [x] Correct textured world material overrides, replace the washed-out reference curve, add a complete sky backdrop and improve local character shadow precision.

## Visual correction after the 07:22 screenshot, 2026-10-26

The earlier technical checks did not establish an acceptable visual match. The
current pass compares `_remake` directly and runs the existing OGRE client in a
disposable profile (`build/evidence/ogre-current-visual-reference`). Its executable,
normal saves and protected files remain unchanged. Terrain HPK/map CFG hashes
match both clients and canonical TantraClient.

BGFX was multiplying textured scenery by the TMB diffuse RGB as well as the map
material. Source grass examples use about0.588 for each channel. OGRE's textured
world shader uses the albedo/map material directly; BGFX now matches that override,
brightening foliage/rocks/buildings. Untextured fallback colours remain authored.
`visual-material-source-evidence.json` records source names/values/hashes.

The old terrain gamma2.2/warm tint is removed. Reference presentation now uses
linear gain2, gamma1, neutral tint and no separate grass grade. This retains more
ground contrast; native ungraded presentation is still available. A separate
camera-centred spherical backdrop reaches the source sky's high colour band,
while original clouds retain their geometry/masks and time/scroll rules.
The 2048 shadow map now uses a .45 half-span, .1â€“4 depth range and .00002/.00006
constant/slope bias, increasing useful local precision for creature silhouettes.

Accepted `visual-material-sky-verified` contains four day/night views and exact
restoration after detail, shadows, lights, grass and backdrop diagnostics.
Five sky elevation samples match authored RGB within0.402; 1,170 horizon samples
are covered. All16 sections bind10-mip detail; all3,087 shared borders match.
Detail changes462,883 world pixels; shadows change2,004 and only darken. The same
empty ground region's luma deviation rises from5.84 to9.77, with source/UI/profile
preservation checked independently. Captures were viewed; exact stock visual
parity remains open. The first backdrop probe failed camera restoration and is
retained separately; the accepted probe restores the exact original camera.

`visual-material-sky-environment` verifies ten authored states, 578,916 changed
cloud pixels and77,830/82,177 fog changes matching the authored RGB mix.
Six CPU checks and14 Python tests pass. Debug/Release builds and three Debug
renderer restarts pass. `visual-material-sky-final-builds`,
`visual-material-sky-final-package` and `visual-material-sky-source-preservation`
verify hashes,16 staged owned files and379 reused source/nine canonical/six repair
references. Final Release is staged in `_client_bgfx`; normal/source saves and
the original OGRE installation are preserved. Full animation/FX parity and
moving-camera shadow tuning remain unfinished.

## Terrain seams and HIGH quality, 2026-10-26

Historical technical checkpoint; the appearance and preset are superseded above.

HIGH was already active (`spec=3 rtshadow=1 far=3500`), with the same source
profile/LOD defaults and private CFG precedence as OGRE. The renderer now clamps
terrain section images while repeating native `detail.dds` separately. Original
height/normal/topology and detail scale/multiplication remain intact. All 10
detail mips are retained; world sampling uses 16x anisotropy on startup/reset.

BGFX previously included terrain/scenery in its depth pass and allowed character
self-projection. It now follows OGRE's represented creature shadow path:
creatures/attachments cast onto opaque world receivers, with a 2048 PCF depth map
and 50 percent modulation after grading. Terrain/scenery do not cast; characters,
alpha foliage, UI and FX do not receive that projection. Premultiplied world
textures also retain their correct alpha through reference grading and fog.

Accepted `build/evidence/terrain-high-first` checks the actual section meshes:
3,087 duplicate border samples have identical position/normal/detail coordinates.
All 16 sections bind 10-mip detail. Matched GPU comparisons show 460,571 world
pixels affected by detail and 4,136 by creature shadows; shadows only darken.
Detail/shadow/grass restoration is pixel-exact, including unchanged opaque UI.
The grass-hidden capture is diagnostic only; normal grass stays enabled.

`terrain-high-environment` verifies ten atmosphere phases, 505,747 changed cloud
pixels and 80,173/83,845 changed fog pixels matching authored RGB interpolation.
`terrain-high-cpu-corrected.log` passes six checks; `terrain-high-python.log`
passes 14. The initial CPU failure was a legacy test expecting a native DLL in
the new client; it now reads canonical `TantraClient/HT3DHeaven.dll` explicitly.
No native DLL was staged. The initial QA compile error was fixed before staging.

Both builds pass, with three Debug renderer restarts in `terrain-high-debug-shell`.
Release is staged in `_client_bgfx`; `terrain-high-final-builds`,
`terrain-high-final-package` and `terrain-high-source-preservation` record build,
16-owned-file package and 379-source/nine-input/six-reference preservation checks.
Default/source saves stayed unchanged. Full camera/motion shadow tuning, all
original quality controls and exact original screenshot parity remain open.

## Mandara reference lighting, 2026-10-26

Historical preset; the gamma/tint/grass settings below are superseded above.

The two user-provided Kathana screenshots now guide a separate reference
presentation preset. The native map supplies sun/moon, sublight rotation and
ambient/diffuse time colours, plus the character-following spotlight. The map's
grass-placement flag now survives the TML-to-scene adapter. A terrain/grass grade
then lifts the dark ground toward the reference look: exposure1.1, gamma2.2,
warm tint `(1,.94,.86)`, grass blend.5. Characters, buildings, sky, UI and FX do
not receive that grade; fog retains its authored RGB blend after grading.

Offline Mandara starts at noon and continues the native cycle. Native timestamp
start remains available with `--offline-world-time native`; native material
presentation remains available with `--world-look native`. These are display
settings; authority timestamps, assets and default saves were not rewritten.
The preset is an artistic reference match, not a completed linear/sRGB pipeline
or exact original-renderer parity claim.

`build/evidence/mandara-lighting-verified` contains four views at noon/night and
held-pose comparisons. Pixel checks passed: sublight146397, character-light1576,
ground-presentation202418 changed pixels; 2729 opaque HP/TP pixels and stone/sky
sample regions were unchanged by grading. Restoring lights/presentation exactly
restores every pixel. Original references are hashed in
`mandara-reference-inputs.json`. The initial baseline and subsequent tuning
captures remain separate, preserving their original process/build records.

`mandara-lighting-regression-cpu.log` passes the source light/clock conformance,
grass-flag/gameplay and Mandara route/service CTests. Python fixture/profile/text
checks remain separate from GPU evidence. Source sublight colours are checked
at seven phases; spotlight range/offset/angles/RGB and invalid phase rejection
are checked independently.

Final Debug and Release builds passed; `mandara-lighting-debug-shell` passed
resize/minimize/restore and three renderer reinitializations. The final Python
suite passed all 14 tests (`mandara-lighting-final-python.log`). Release is staged
in `_client_bgfx`; `mandara-lighting-final-package` verifies all 16 owned files,
and `mandara-lighting-source-preservation` verifies 379 reused source files,
nine canonical inputs and six repair references. Both isolated runtime results
confirm protected files and default/source profiles stayed unchanged. Build and
shader hashes are in `mandara-lighting-final-builds`.

Mandara FX remain incomplete: static inventory found 32 authored field effects
and native monster-effect/skill managers. Basic hit feedback and environmental
presentation run; the screenshot's active skill/aura effects and general native
TFX dispatch remain open. Full specular/emissive, original-camera/asset visual
parity and complete animation combinations remain open too. Missing INTRO TMBs
remain intentionally skipped without replacement searches.

## Weapon animation continuation, 2026-10-26

Authority and presentation now share typed native weapon attack selection.
Locomotion uses the weapon's PCAttackAni stand/walk/run states in hostile cells,
and generic states with the authored sheath socket in safe cells. Reattaching
the weapon preserves the body and animation clock. Secondary claw models and
native dual-dagger type916 selection are represented; complete weapon gameplay
and missing-socket parity remain open.

Accepted evidence under `build/evidence`:

- `weapon-sword-town`: sword4001 on `BWeapon01`, native generic stand/run/walk,
  collision-checked SDL movement and retarget without animation phase restart.
- `weapon-sword-field`: sword on `RightHand`, native weapon states806/814/810,
  ordinary SDL run/walk and retained phase on retarget.
- `weapon-sword-combat`: attack type901, two PC/two monster native hit markers,
  sword audio, native damage feedback, defeat/reward and persistence.
- `weapon-stance-native-reload`: full prior native character/cargo restoration,
  no mutation of those records, source seed or default saves.
- `weapon-bindings-final-cpu.log`: 12 weapon types/eight tribes, 288 attack
  variants, 129 distinct TAB files and 88 available sheath-socket combinations;
  separate dual type916 and invalid-item checks. The test reports source asset
  limitations rather than treating all weapon/body combinations as legal.
- `weapon-stance-regression-cpu.log`: ten rebuilt resource/socket/skin/blend/
  clock/navigation/gameplay/normal/combat checks passed. `weapon-stance-python.log`:
  14 Python tests passed, including both new controlled weapon fixtures.
- `weapon-stance-final-builds`, `weapon-stance-final-package`,
  `weapon-stance-source-preservation`, `weapon-stance-debug-shell`: Debug/Release,
  16 owned staged Release files, original reference hashes and three Debug
  renderer restarts passed. Runtime captures were visually inspected.

Initial matrix assertions incorrectly assumed every supplied body exposed every
legacy sheath socket. The observed exceptions remain explicit: four requested
sheath socket names are absent on some bodies; dagger handling also requests
`HWeapon01` and `LeftSSW`. A missing requested stance socket produces a bounded
diagnostic and retains the authored Item socket. No replacement model or socket
alias is invented. Runtime acceptance here covers sword4001; the matrix is CPU
binding/resource evidence, not full visual/legal-equipment acceptance.

## OGRE foundation migration accepted, 2026-10-26

The active migration checklist in `IMPLEMENTATION_PLAN.md` is checked. This
covers implemented OGRE foundations and the requested ordinary combat timing;
the complete plan and original OGRE feature gaps remain open.

The staged Release client uses three source PC attack variants and scales their
duration to the native ordinary attack period. Authority waits for the TAB
`attack` annotation before damage/reward mutation; the GPU pose crosses that
same key within one simulation frame. Repeated attacks restart, HP revisions do
not restart a monster's swing, and killing hits cancel pending corpse strikes.
Native ETC digit/miss/success textures, colour families, bounce/critical motion,
hit flashes and PC/monster sounds now accompany those events. Full skill TFX,
projectiles, block feedback and all weapon/skill combinations remain open.

New evidence under `build/evidence`:

- `ogre-port-final-melee`: four player/seven monster impacts, 13 native glyphs,
  23 sound requests with actual playback diagnostics, rewards and persistence.
- `ogre-native-combat-death`: native death pose/zero HP/dialog, cancellation,
  ordinary confirmation and persisted saved-cell revival.
- `ogre-native-retarget`: SDL ground clicks, collision checks, orbit/reset,
  inventory toggles and retained walk/run animation phase after retarget.
- `ogre-native-services`, `ogre-native-services-reload`: skill/quick-slot UI,
  warehouse/save controls, preserved item instances and money, separate full
  character/cargo reload with unchanged source/default profiles.
- `ogre-native-environment-entry-gate`: ten sky phases, two cloud layers,
  1,216 night stars, sun/moon, flare occlusion/offscreen rejection, horizon and
  fog transitions. Cloud scrolling changed 503,370 pixels; 75,725/77,803 changed
  fog pixels matched the authored fog RGB blend. Exact original star RNG remains
  unproven; the adapter preserves the existing OGRE seed/placement algorithm.
- `ogre-port-final-intro-fx-music`: four source fire/smoke emitters, native GPU
  corner/UV/colour/blend/depth data, loop/release/recreate checks, two spatial
  gate voices and original streamed music with native gain/loop requests.
- `ogre-port-original-assets-fx`: original HPK mesh, bounded metadata-bound TFX
  textured sample and uncached TAB loading. General TFX semantics remain open.
- `ogre-port-final-builds`, `ogre-port-debug-shell`, `ogre-port-final-package`,
  `ogre-port-source-preservation`: Debug/Release, three renderer restart cycles,
  final Release package of 16 owned files, and unchanged 379 original files,
  nine inputs and six repair source references.
- `ogre-port-final-cpu.log`, `ogre-port-normals-cpu.log`: 14 selected CTests;
  `ogre-port-fixtures-corrected-python.log`: 14 Python tests; all passed.

The first environment attempt was rejected before entering the scene by an
inherited QA guard. It now permits the saved-entry environment scenario; the
rejected output remains. The initial fixture test expected 50 HP, while the
source-created fixture has 52 before entry recalculation. Only its assertion
was corrected. Earlier attempts to run unbuilt playback probes were not test
passes; rebuilding the targets produced the successful CPU evidence above.

## Evidence

Evidence below is local under ignored `build/evidence`; source, tools and the
dependency lock remain reviewable. Runtime evidence pins its executable hash;
newer source does not retroactively change the scope of an earlier pass.

| Scope | Evidence | Result |
| --- | --- | --- |
| Baseline | `c00-baseline-inputs/RESULT.json` | 379 original files and nine native/runtime inputs unchanged; dependency pins verified |
| Shell/build | `c01-shell`, `c01-builds` | D3D11 shell, resize/minimize/restore, clean shutdown; Debug/Release artifacts |
| Original asset | `c02-assets` | HPK model and native textures; overlapping UI; capture inspected |
| CPU readers/pose | `c02-resources`, `c03-profile-pose` | Catalog/material/profile/HPK and native bind/clock/creation/record tests passed |
| Saved preview | `c03-roster-backbuffer` | ashesh login, copied roster, triangle-picked actor; actual GPU capture inspected |
| Roster lifecycle | `c03-roster-lifecycle-guarded` | Cancel preview, reject unallocated Chakra, create/select, cancel deletion, reject empty proof, delete; SQLite original character rows identical |
| World entry | `c04-entry-actor-catalog` | Source CHAR_INIT, map 40001, 524288 terrain triangles and 6503 placements; native HUD and actors visible |
| Controls | `c05-controls` | Inventory I toggle, right-drag orbit, Insert reset; native ground click moved from [5162.5,6602.5] to [5202.45,6602.52] |
| CPU navigation/gameplay | `c05-navigation-cpu`, `c06-gameplay-schema4` | Camera/source controls, offline gameplay, deterministic probability and schema4 persistence passed |
| Actual basic encounter | `c06-basic-combat` | Real E/R input, approach, attack, monster2001 defeated; HP10 to6, Prana604 to704; decoded native SQLite record matches final HP/Prana/cell |
| Profile rejection | `c03-profile-isolation` | Normal profile and unsupported renderer rejected before a window/database write |
| Dedicated client cleanup | `client-bgfx-cleanup` | 18 copied runtime/diagnostic files removed, 12484910 bytes; all dedicated assets/saves and original `_client` unchanged |
| Dedicated builds/package | `c01-dedicated-builds`, `c08-dedicated-package` | Latest Debug/Release build hashes and shaders; staged imports/owned files verified; no OGRE/SDL3 DLL imports |
| Dedicated native client | `c05-controls-dedicated-client` | Login/Mandara, inventory, orbit/reset and movement passed with `_client_bgfx`; native before/after snapshots and protected hashes retained |
| Dedicated CPU/guards | `dedicated-client-cpu.log`, `c03-profile-isolation-dedicated`, `c00-dedicated-source-preservation` | 15 selected CTests; both legacy profile destinations rejected; 379 source/nine input hashes preserved |
| Culling/profile safety | `zf_frustum` CTest; `tests/test_profiles.py` | 16 conservative-frustum cases and five seed/WAL/refusal tests passed |
| Warehouse/save | `c06-saved-services-hud-picking` | Real native NPC clicks and ground routes; item0 to cargo119 to inventory20 without changing instance fields; deposit250/withdraw100; cargo revision2 to6; save/current cell [486,173] |
| Service reload | `c06-services-reload` | Separate login/process from the saved result; complete native character and cargo payloads restored byte-for-byte; decoded native state unchanged |
| Service CPU/safety | `c06-services-cpu`; `tests/test_native_inspection.py` | Four CTests including native NPC price/repair/stale/range/dead/capacity checks; nine Python safety cases including immutable Unicode inspection and legacy no-cargo schema |
| Merchant/native repair eligibility | `c06-merchant-native-eligibility` | Actual Vartan route and quantity/buy/sell confirmations; item4002 costs225 and sells37; money99647 to99459; ineligible potion and unneeded full-durability weapon repair both rejected without charge |
| Merchant reload | `c06-merchant-reload` | Separate login restores full character/cargo bytes; inventories, cargo and other character records preserve the verified result |
| Final C06 build/package/source | `c06-complete-builds`, `c06-complete-package`, `c06-complete-source-preservation` | Latest Debug/Release builds and staged imports verified; 379 original files, nine initial inputs and six repair-source inputs unchanged |
| Paid repair and failures | `c06-paid-repair`, `c06-no-money`, `c06-full-inventory` | Paid native starter repair 0 to 4500 for 15 Rupiah; money/capacity rejection, both prompt cancellations, ineligible repair and complete native inventory/cargo checks passed |
| Paid-repair reload | `c06-paid-repair-reload` | Separate process restored complete repaired character/cargo bytes and preserved the source/default profiles |
| Native player death/revival | `c06-death` | Actual hostile damage from HP1 opened death UI; keyboard bypasses rejected; mouse revival restored saved cell and native HP10/TP6; SQLite matched |
| Eight tribe previews | `c03-eight-previews-complete` | All eight source previews, face/hair changes and cancellation; saved character rows unchanged |
| Roster boundaries/retry | `c03-roster-boundaries` | Full roster, delete cancellation, empty proof and duplicate rejection; corrected retry filled slot 2 without changing slots 0/1 |
| Authored normals | `zf_normal_transforms`, `proceed-cpu.log` | Affine inverse-transpose tests and actual Tiger/Asura submeshes at four poses; eight previews rendered the authored normals |
| Directional shadows | `c07-directional-shadows-final` | 2048 depth map; player casting removed 1356 triangles and changed 2635 pixels; restoration reproduced original pixels exactly |
| Shadow profile options | `c07-shadow-profile-options` | Player casting/pixels remained reversible; disabled render profile submitted no depth geometry; enabling restored the original caster count |
| Renderer lifetime | `c08-renderer-reinitialization` | Resize/minimize/restore and three shutdown/reinitialize/submission cycles; empty scene/resource counters after each restart; repeated shutdown harmless |
| Settled death presentation | `c06-death-presentation` | Source-selected death animation completed once and held its final pose, native HP label reached zero, and revival HP/TP and saved cell persisted |
| Frame measurements | `c08-idle-frame-sample` | 240 frames at 1024x768: median 9.4455ms, p95 10.6836ms, p99 11.4916 ms; valid GPU median 2.22758ms; unchanged frame-stat quad had no geometry uploads |
| Current build/package/source | `proceed-accepted-builds`, `proceed-accepted-package`, `proceed-accepted-source-preservation` | Debug/Release, four shaders and 14 owned staged files verified; all pinned original inputs unchanged |
| Current CPU/safety | `proceed-cpu.log`, `proceed-python-verified.log` | 17 selected CTests and 11 Python tests passed |
| Native actor facing | `c05-facing-english-native-pick`; `zf_native_facing` | Real left/right ground movement and heading alignment; independent cardinal/diagonal matrix checks; corrected running captures inspected |
| Intro facing | `c03-intro-native-facing` | Copied-roster login; intro gate tigers face inward after the native-to-bx yaw conversion; capture inspected |
| English display/names | `c06-english-monster-target`; `zf_philippine_english` | Philippine columns supply 7651 name/description/message fields; readable Vasabhum target and overhead labels; native death/revival retained |
| Facing/text checks | `facing-english-verified-cpu.log`, `facing-english-python.log` | Six rebuilt focused CTests and 14 Python tests passed |
| Facing/text package | `facing-english-builds`, `facing-english-package`, `facing-english-source-preservation`, `facing-english-source-inputs.json` | Debug/Release and 16 owned staged files verified; original binary assets/saves and both source XML inputs unchanged |

Runtime before/after hashes passed for the accepted runs. The first
`c03-roster-lifecycle` attempt passed UI assertions but failed preservation: normal
OGRE database/UI files and its diagnostic log changed concurrently. It is retained
as a failed acceptance attempt; no normal profile was restored or overwritten.
The runner now checks launchers before/during each attempt and terminates only its
own process on interference. The guarded run passed both preservation and exact
character-row restoration. The original module source hashes remain unchanged.

Historical runtime rows above used `_client` before the user's explicit change
to `_client_bgfx`. Their immutable evidence is retained with its original paths.
Current build/preset/staging/runtime defaults use `_client_bgfx`; its copied
`userdata/zflauncher` is preserved. Cleanup removed OGRE/HTLauncher/plugins,
the dynamic SDL3 DLL (ZFLauncher embeds SDL3), obsolete OGRE manifests and copied
logs/dumps. Required Visual C++ DLLs remain. Source-decoded native profile
inspection uses `bgfx_profile_probe` with read-only closed SQLite data, rejects
pending WAL and emits no credential verifiers.

The first `c06-saved-services` runtime stopped at the warehouse click: the original
probe chose an NPC triangle below the native bottom HUD. It performed no warehouse
transaction. The accepted run requires the closest intended actor, a HUD-free
point and bounded ordinary camera adjustments. Picking now excludes hidden,
unbound, inactive-LOD and depth-clipped geometry. Both attempts are retained.

Native inspection now uses SQLite `immutable=1` and URI-escaped Unicode paths:
ordinary `READONLY` can still change WAL shared memory. Database and companion
hashes/mtimes are verified in regression fixtures. Legacy profiles without cargo
are inspected without schema mutation; migration remains authority-owned.

`c06-merchant-services` exposed missing native repair eligibility: the old path
accepted the first occupied slot, a consumable. Its old assertions passed but
the run is superseded in `REVIEW.json` and is not current repair acceptance.
The offline authority now enforces the native NPC item-family restrictions and
documented zone exceptions from `HTNPCControl.cpp:5531-5563`, with source hashes in
`docs/evidence/repair-source.json`. The corrected run explicitly rejects the
consumable, preserves its durability/count and charges nothing for the already-full
weapon. Paid repair subsequently passed both runtime and separate full-record
reload as recorded above. No normal/default profile was used for transactions.

The same source audit added `HTItemSystem.cpp:3726-3748` displayed-durability
rounding. A recorded weapon at4410/4500 still displays45/45 and must be rejected
as unneeded repair. That case now has an authority regression check; the profile
was inspected from existing evidence, not edited to create a damaged-item test.
`c06-merchant-final` verifies the staged rounding build with the same successful
buy/sell and repair-rejection assertions. `c06-final-cpu.log` records16 passing
selected CTests; `c06-repair-rounding-cpu` retests the four affected gameplay cases
after the rounding fix, and `c06-python-safety.log` records nine passing safety tests.

The C06 minimum gate is now accepted. Controlled QA fixtures are explicitly
generated as new profiles under `build/evidence`, with source-created characters
and recorded money/durability/HP/position controls. They never edit an imported
checkpoint or default profile. Merchant scenarios compare complete native item
fields, account cargo and other characters, and verify native table prices.
Stale/range/dead/invalid requests remain covered by the authority CPU cases.
The broader skill/AI/combat feedback requirements remain open.

The first eight-preview attempt rendered all tribes but hit the original
single-character frame budget during the final camera transition. The corrected
budget passed; both attempts are retained. The first shadow assertion compared
total caster counts across moving-actor frames and failed. The accepted probe
redraws on/off/restored at dt=0 in one callback, with both geometry and reversible
pixel checks. Alpha-aware shadow shaders, 3x3 depth comparisons, slope bias,
edge fade and texel snapping are implemented; broad quality parity remains open.
The existing render-profile shadow switch now controls the pass. Shutdown
invalidates every uniform/shader/depth/framebuffer handle and clears scene,
lighting and resource caches before reuse. The three shell restart cycles do
not close full world/device-loss/focus/DPI recovery acceptance.

`c06-death` originally captured the dialog immediately after damage, before the
native pose and queued HUD notification settled. `c06-death-presentation` waits
for the source-selected finite death animation to finish, verifies the held pose
and zero HP label, then confirms revival through ordinary native UI. Its captures
were visually inspected. This does not accept the broader impact/audio/FX matrix.

Frame-stat textures now reuse their quad and resource counters are sampled once
per second or invalidated on ownership-count changes. Authored deformation and
world normals use inverse-transpose matrices. CPU skinning remains. The idle
sample used the NVIDIA GPU (PCI 4318/10401; RTX4050 Laptop), i7-12650H, about 32GB
RAM, native scene and 2048 shadow depth. The earlier instrumented sample overlapped
a Debug build and is excluded from the idle baseline. Short stationary samples
do not accept sustained 60 FPS, startup/stall budgets or matched OGRE quality.
The runner now separately hashes the default bgfx profile before/after isolated
runtime checks, including controlled fixtures.

## Still open

The facing fix changes the renderer boundary rather than gameplay directions:
native positive yaw sends authored +Z toward `(sin(yaw),0,cos(yaw))`, while bx's
SRT helper requires the opposite Y angle. Picking, sockets, normals and shadows
consume the corrected object matrix. World names use source height anchors and
yellow NPC/white basic player/monster text. Text bitmaps are cached/reused and
ordered behind MainUI; speech, conditional name colours and full occlusion remain
outside this accepted name slice. The old stationary timing evidence predates it.

English text is derived from `GenesisK3-XMLs/TantraParam.xml` and
`GenesisK3-XMLs/XMLS-XLS/HTMessage.xml`, defaulting to Philippine column headers.
The generated table preserves worksheet/ID/field identities, UTF-8, blank English
cells and authored placeholders. Native binary IDs/parameters and source files
remain untouched. The first facing probe captured both corrected run directions
but failed on its town seed's hostile-only E target selection; the accepted probe
uses normal triangle picking of a visible actor. The failed attempt is retained.

- [ ] Complete remaining appearance/equipment/LOD and repeated transition matrices; eight tribe previews and roster boundary/retry checks passed.
- [ ] Broaden inventory/service combinations beyond the accepted C06 minimum; paid repair/reload, money/capacity failures and prompt cancellations passed.
- [ ] Broaden encounter coverage to all weapon/skill/FX combinations; source-timed ordinary melee, native hit feedback and actual death/revival now have separate CPU/runtime evidence.
- [ ] Broaden blocked/narrow navigation, camera zoom/obstruction, quick-slot/layout reload and UI/tooltip acceptance.
- [ ] Tune shadows through foliage/camera/movement matrices; retain exact sky parity, other zones, water/weather and full TFX semantics beyond the accepted OGRE atmosphere/intro subset.
- [ ] Implement GPU skinning; authored deformed normals and nonuniform world transforms now have CPU/runtime evidence.
- [ ] Add generation-aware asynchronous loading/cancellation, immutable GPU world buffers, pooling and performance/recovery gates.
- [ ] Validate clean-machine/relocation/dependency closure, full DPI/focus/device-loss behavior and release packaging.
- [ ] Complete the plan's C09 systems; online/server work remains paused and unchanged.
- [ ] Finish authenticated remote checkout/submodule/worktree administration, and commit/push only when requested.

## Next continuation

1. Resolve the reported TPA/import version differences. Direct native reading and shared-field comparison now pass; keep client presentation parameters and server-only authority distinct.
2. Complete remaining available attached/area/monster-state FX and wider live-buff/strike coverage. Record and skip missing authored content as requested. The12-weapon/27-encounter projectile matrix, elemental ribbons, body/socket action phases and represented persistent-state/cancellation/equipment cleanup pass bounded checks. Native monster pattern selection, ranged attacks and wider skill services remain open.
3. Preserve the32 static/eight dynamic Mandara navigation cases and actual SDL immediate retarget regression. Smooth visual stairs, missing authored collision and other maps remain parity limits.
4. Preserve six fresh-process Interface.sys/quick-slot/equipment/audio/restart/relogin/character/village-zone checks. Distinct client map art and ordinary in-game portal handoffs remain open; the tested village zones share Mandara art40001.
5. Use the corrected-animation7,200-frame CPU/GPU/loading baseline to prioritise pose work, batching and asynchronous loading. No optimisation gain is claimed. Full performance/release gates remain open.

Known source gap: Mandara's `r01_common_cart01.bmp` is absent from the canonical
client. The renderer reports it and uses the same authored untextured material as
the OGRE baseline. Other unexpected missing materials fail. Missing authored `.tbo`
collision remains a parity limit; geometric navigation is a bounded fallback.
Current diagnostics also retain the two unstaged INTRO placements referencing
`in_Str_stone_main_01.tmb`, generator 447's occupied-cell placement rejection and
monster 2718's missing ClientRes entry. Those warnings are not completed content.
Per the user's instruction, missing INTRO TMBs are intentionally skipped. Leave
them absent; do not search for replacements or treat them as a repair task.

These are development slices, not visual/performance parity or production
completion. No 60 FPS or whole-repository test pass is claimed. No server process,
commit or push was performed.

### 2026-10-31 C++ connected combat/social continuation

The online BGFX channel now consumes server-authored attack/skill/death/prana/drop
messages and the eight-member party/HP roster. Party/guild chat, invitations,
trade offers with explicit version confirmation, guild management and ordinary
cash-item purchases/recovery use the authoritative C++ services. Cash NPC purchases
reuse the existing merchant interface. Client gameplay does not award online damage,
items or cash locally. See `_server_cpp/docs/SHARED_SERVICE_CONTRACTS.md` and
`_server_cpp/IMPLEMENTATION_PROGRESS.md` for command examples, test evidence and
remaining source-parity/graphical gates. No full gameplay completion percentage
is inferred from these connected slices.

### 2026-10-31 periodic skills, social windows and local billing

- [x] Consume authoritative periodic HP events and projectile lifecycle updates;
  reuse native FX rendering while the C++ server owns contacts, damage and rewards.
- [x] Six connected original-image windows: Players, Party, Guild, Trade, Rooms
  and Cash. J opens Players; G opens Guild; tabs reach the other windows. Paging,
  keyboard text editing, party/guild actions, version-confirmed trade, passworded
  rooms and cash catalog/buy/recover invoke the real C++ services.
- [x] Original General/Hanbit/Philippines adapters use the selected local ledger
  and native country price/bundle rules. No live payment provider is required.
- [x] Final Release two-client TCP check passes party/guild/room chat, memberships,
  trade, cash delivery and social view messages without opening offline databases.
- [x] Six D3D11 social-window captures use state saved from the TCP check. Native
  projectile rendering passes 30 damage cases, 18 renders and six lifecycle checks.
- [x] Stage Release ZFLauncher in ../_client_bgfx; support files remain project-owned.

Evidence: ../_server_cpp/docs/evidence/periodic-social-billing-20261031.json.
These checks cover native UI rendering and protocol integration separately; full
interactive network gameplay visual acceptance and full original social-window
parity remain open. Missing content is recorded and skipped: 17 skill bindings,
21 animation clips and three unresolved FX in the rendered projectile cases.
The complete MMO/client roadmap is not closed by this batch.
