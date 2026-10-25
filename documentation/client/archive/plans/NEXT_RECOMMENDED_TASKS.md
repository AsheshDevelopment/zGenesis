# Next recommended goals

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.
Implementation update: [SQLDMN/DBSRV evidence and six-area checklist](../../../server/archive/rust/ROOT_IMPLEMENTATION_PROGRESS.md).
The next server gate is selection-to-zone ownership transfer and Rust CHAR_INIT
for Mandara, followed by native client integration. World gameplay is not ready.

Current cross-project priorities and source anchors:
[live gameplay/service gap audit](CURRENT_SOURCE_GAPS_AND_IMPLEMENTATION_PLAN.md).
The Rust management foundation is implemented; shared services and game authority
are still open. The recommendations below retain the client acceptance gate.

Updated: 2026-10-23. Includes the single focused Goal 1 runtime attempt and the
subsequent CPU-only grass camera-filter and native NPC placement corrections.
No second client launch, commit or push was made.
[Runtime result](../../planning/MANDARA_GOAL1_ACCEPTANCE.md), [placement fix](../../guides/MANDARA_NPC_PLACEMENT_FIX.md).

## Current checkpoint

- [x] Native Chakra spending and skill learning connected to offline authority.
- [x] Original skill trees and basic persistent five-page quick slots implemented.
- [x] One offline run verified Mandara entry, progression, quick-slot potion use,
  repair, buying/selling and initial walking with private SQLite persistence.
- [x] Built/staged camera-test recovery, Asura title and vertical quick-bar corrections.
- [x] Runtime-check corrected Asura title, vertical bar and restored progression/slots.
- [x] Preserve all 46 normal-profile file hashes through the focused saved-roster attempt.
- [x] Fix the confirmed `.tga` grass-card obstruction filter; build/stage and pass CPU replay.
- [x] Correct the Global/client NPC placement mismatch using the client's binary table; verify native warehouse/save routes and service ranges with CPU checks.
- [ ] Usable camera obstruction and warehouse/save-point UI acceptance: the focused
  attempt stopped at warehouse NPC visibility near cell `(394,97)`.
- [ ] Runtime acceptance of the current native-placement executable; it has not run.
- [x] Rust manager/zone administration foundation, ten zone profiles, localhost
  defaults and top-level Start/Stop Server. This does not implement game services.

Current `_client/HTLauncher.exe` SHA256:
`43B4A011D0930DC98497375CAEB22684839F7310A642A6F6C28DC1B194720827`.

See [implementation status](../checkpoints/GAMEPLAY_EXPANSION_STATUS.md) for the distinction
between this artifact and the earlier runtime-tested hash. The remake is incomplete.

## Goal 1 — close the remaining Mandara acceptance gate

**Highest priority.** Verify the corrected build and finish the existing services.
The failed waypoint projection does not by itself establish a native client crash
or complete camera/collision parity.

- [x] Prepare a fresh isolated profile/output and a saved-roster route toward the
  unverified checks. Avoid repeating the full creation/deletion matrix and passed
  transactions unless changed dependencies warrant regression coverage.
- [x] Use one offline process on one channel, logging in as ashesh / ashesh.
  Confirm selection → CHAR_INIT → Mandara and restored progression/slot data.
- [ ] Check the corrected tribe title/bar orientation, native camera reset/orbit,
  movement and obstruction along the remaining route.
- [ ] Exercise warehouse item and Rupiah deposit/withdrawal, then save-point confirmation.
- [x] After exit, verify SQLite item/cargo counts, money, revisions and saved
  cells; compare the normal profile's recorded before/after hashes.
- [x] If the attempt fails, retain captures and camera/position context and
  investigate with CPU checks without automatically launching another client.

**Done when:** the remaining route finishes with a clean exit, persisted results
and unchanged normal saves. Authority fixtures alone do not close UI acceptance.

The one-process attempt returned QA exit 8 at warehouse NPC visibility. Reset and
orbit inputs worked, but close camera framing failed acceptance. CPU investigation
then established a misplaced NPC from a different parameter revision. The staged
client now follows the canonical client placements and has viable CPU camera
approaches. A fresh isolated saved-roster profile is prepared; a go-ahead for one
new runtime attempt was requested because the user forbids automatic relaunches.
Do not rerun the old output or claim CPU visibility proves rendered acceptance.

## Goal 2 — resolve original asset gaps

Investigate alongside Goal 1. Missing optional content need not block work on
available basic skills, but full population and affected UI acceptance remain open.

- [ ] Obtain matching assets/catalog records for monster 2718. Reconcile the
  Global-only NPC 1457 record separately: its model is absent, but it is not
  enumerated by the current canonical Mandara NPC profile. Global ClientRes.xml
  defines these references; the supplied loose client lacks W_Monster1.tmb,
  W_Monster1.dds and NPC_mandara_trader_R.tmb.
- [ ] Resolve the 16 missing skill images in the
  [source asset evidence](../../evidence/gameplay-source-asset-gaps.json).
- [ ] Handle each original rendering type correctly: monster 2718 is production
  ore with no authored animation IDs, rather than an ordinary animated monster.
- [ ] Extend focused multipart/LOD coverage beyond the current selected-Zone01
  check of 39 available base models / 227 animation bindings; retain provenance
  and stage only used original files.

**Done when:** required references resolve and their native presentation paths
work. Silently skipped actors or replacement art do not establish source parity.

## Goal 3 — make learned skills executable and finish quick slots

Chakra/learning exist; active skill bindings currently reject execution.

- [ ] Implement one native damage skill and one timed buff through prerequisites,
  target/range checks, costs, casting phases, interruption and cooldown.
- [ ] Connect authoritative outcomes to native animation, impact TFX and status feedback.
- [ ] Connect periodic effects, recipients and death attribution to world authority,
  preserving live effects across equipment/status updates.
- [ ] Complete item/skill/command slot invocation, cooldown display, tooltips,
  tree arrows and prerequisite/max-level presentation.
- [ ] Check native rounding, rejection, cancellation, expiry and persistence.

**Done when:** learned skills work through original controls with source-correct
costs/results and visible feedback. Saving a binding is insufficient.

## Goal 4 — complete monster AI and reward/loot lifecycle

- [ ] Port native aggression, target/skill selection, pursuit/return and relevant
  help/flee transitions.
- [ ] Implement generator cadence, replenishment, route segments, formations and respawn.
- [ ] Complete remaining drop groups/modifiers, pickup merging, ownership,
  manual dropping and decay; define restart/zone-teardown behavior explicitly.
- [ ] Check encounter death, rewards and inventory changes together. Integrate
  party reward branches after party authority exists.

**Done when:** supported encounters spawn, fight, disengage, die, reward and
respawn according to source rules without duplicated/lost rewards.

## Goal 5 — implement quests and remaining NPC services

- [ ] Complete one authored Mandara quest: prerequisites, acceptance, progress,
  dialogue, completion/reward and persisted journal/history.
- [ ] Expand native tribe/job/Trimuriti/quest/request-result conditions and callbacks.
- [ ] Add religion/class advancement and other enabled town services.
- [ ] Implement refinement/dismantling with native materials, prices, probability
  decks, failure outcomes and original confirmation UI.
- [ ] Verify exactly-once rewards and rollback for insufficient resources,
  full inventory, expired conversations and repeated requests.

**Done when:** supported quests/services complete through native UI and survive
reload without value loss/duplication. Extend existing shop/repair/warehouse/save
services instead of treating them as missing implementations.

## Goal 6 — add travel and complete resurrection

- [ ] Implement one source-authored destination and portal/transport handoff.
  Keep each zone's generation areas, TCM, generators, parameters and map assets
  together as a matching dataset.
- [ ] Preserve native save, cleanup, destination loading and CHAR_INIT order;
  recover safely from rejected access or failed loading.
- [ ] Reuse handoff for cross-zone revival and supported travel items; implement
  native item/healer and required special-zone resurrection branches.
- [ ] Complete associated map markers/commands and original death prompts.

**Done when:** travel out/back, destination spawn, revival and failed-handoff
recovery work with persisted state and original controls.

## Goal 7 — extract dedicated authority and implement multiplayer

- [ ] Share proven rules/persistence between embedded offline mode and standalone
  x64 services under C:\_GitHub\TantraSrc\_server.
- [ ] Add localhost sessions, server-owned SQLite, validated requests, actor
  replication, reconnect/cleanup and concurrent transactions.
- [ ] Implement chat, party and trading, then guild/shared cargo and enabled
  rental/PvP/arena/siege systems in dependency order.
- [x] Build the Tantra Server Manager/zone-worker administration foundation from
  the [server plan](../../../server/archive/rust/ROOT_IMPLEMENTATION_PLAN.md).
- [ ] Implement SQLDMN shared persistence and DBSRV session/character ownership,
  then native game transport and the bounded Mandara authority in Rust.
- [ ] Implement MSGSRV/CHATSRV/ITMSRV after tracing their actual contracts, and
  complete dependency-aware shared-service lifecycle/GUI operations.
- [ ] Use headless multi-principal fixtures before multiplayer GUI acceptance;
  do not test every channel by default.

**Done when:** standalone services and their manager run with authoritative
outcomes and consistent state across concurrency/disconnects. The server folder
now has a working manager/administration worker; native gameplay listeners and
Rust world simulation remain disabled/unimplemented.

## Goal 8 — finish fidelity, loading and release coverage

- [ ] Profile moving/crowded scenes and implement measured caching, preparation,
  bounded loading and visibility/skinning work from the
  [resource optimization plan](../../planning/RESOURCE_LOADING_OPTIMIZATION_PLAN.md).
- [ ] Finish water/weather/grass, character lighting and exact star/celestial/
  flare/material behavior while retaining map CFGs, HIGH defaults, _TGA alpha
  and original terrain detail.dds handling.
- [ ] Close remaining INTRO/retry/disconnect and equipment/action coverage with
  targeted checks rather than repeating the same complete matrix.
- [ ] Verify final-client packaging, sustained stability and supported-map coverage;
  keep optional legacy/event exclusions explicit.

**Done when:** the supported scope has documented functional, visual, performance
and distribution evidence. Earlier stationary FPS samples do not establish
whole-game performance or instantaneous loading.

**Next client slice:** finish Goal 1 when another client attempt is authorized,
with Goal 2 investigated in parallel. Then finish Goal 3.
**Independent server slice:** SQLDMN/DBSRV contracts, shared SQLite and session
ownership, followed by one localhost character-to-Mandara path. See P1-P3 in the
current audit; process management is not a substitute for that gameplay path.

References: [progress tracker](../../PROGRESS.md),
[current implementation/evidence](../checkpoints/GAMEPLAY_EXPANSION_STATUS.md),
[current handler audit](CURRENT_SOURCE_GAPS_AND_IMPLEMENTATION_PLAN.md) and
[full implementation plan](../../IMPLEMENTATION_PLAN.md).
