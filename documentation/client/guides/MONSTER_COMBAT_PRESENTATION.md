# Monster animations, attack feedback and movement lock

2026-10-26: [Attack-marker authority fix](ATTACK_MARKER_AUTHORITY.md) supersedes
the earlier cosmetic-only timing limitation below. Rendered offline HP, wear,
death/rewards and impact feedback now wait for the actual animation marker.

Updated: 2026-10-25. This is a scoped continuation; the broader client goal
remains paused. Changes are local and uncommitted. Rendered acceptance is open.

## Source checked before implementation

Reference root: `C:\_GitHub\tantra-dev-main\_references\Tantra`.

| Reference relative to that root | Behavior |
| --- | --- |
| `HTlauncher\HTEngineHandler.cpp:12914` | Monster STD, WLK, RUN, IDL, ATK1, ATK2, HIT and DIE resource slots. |
| `HTlauncher\HTEngineHandler.cpp:12022` | Monster attack uses map TXL skill animation, falling back to ATK1; consumes a random word for its two attack sounds. |
| `HTlauncher\HTEngineHandler.cpp:13103` | Motion/hit/death sounds come from FXMon; ordinary two-sound selection draws only when the second ID exists. |
| `HTlauncher\HTOtherObject.cpp:837` | Missing IDL falls back to looping STD. |
| `HTlauncher\HTOtherObject.cpp:1030` | Completed one-shot actions return to STD. |
| `HTlauncher\HTOtherObject.cpp:1286`, `HTlauncher\HTControlDef.h:144` | Stand-to-idle delay is 15,000 ms; IDL plays once. |
| `HTlauncher\HTOtherObject.cpp:1399` | Hit FX/sounds are independent of hit-pose interruption. HIT only interrupts stand/idle/sit; it does not restart an existing attack/run. |
| `HTlauncher\HTEngineHandler.cpp:8498`, `:8562` | Item type selects PCAttackAni impact FX; native skill resources select skill impact FX and target sockets. |
| `HTlauncher\HTResMgr.h`, `HTlauncher\HTFXResMgr.h:410` | Attack sounds/impact IDs and PC FX record order: ID, category, name, attachment, priority. Map type-8 records have a different layout. |
| `HTlauncher\HTMainCharacter.cpp:1705`, `:1821`, `:2263` | Attack completion uses apply time and attack-point state; attack/skill states reject turn controls. |

The original source has some early-cast cancellation paths. The user's requested
full-animation movement lock is deliberately stricter: Ready, Casting and
Applying remain locked, and an authored apply clip must actually reach STOP.
Death, invalid owners and failed casts release the lock rather than hanging.

Engine implementation evidence: read-only inspection of
`C:\_GitHub\TantraSrc\TantraClient\HT3DHeaven.dll`, SHA256
`b818b89edbc9f8e49bb1b79200371740eaa157dabac23bbf1e2d52e40ff99941`.
`_remake\tools\inspect-native-particles.py` checks the native burst count,
age/velocity variation, random-word order, damping, integration and curve paths.
The original DLL is never executed by these checks.

## Implemented

- [x] Route all eight monster animation slots. IDL, both attacks, HIT and DIE
  are one-shot actions; STD/WLK/RUN loop. Apply map-specific skill clips.
- [x] Use `(revision, state)` identity instead of their sum, which could collide
  between different actions. Unchanged motion does not restart each frame.
- [x] Hold rendered attack/hit actions until actual STOP; avoid chasing through
  them or repeatedly replacing them. Idle has a native 15-second interval.
  The source's initial randomized idle staggering is not reproduced here.
- [x] Keep headless offline authority usable without renderer feedback. Visual
  animation observations are an optional in-process integration.
- [x] Reject movement/attack/skill replacement while the player action is locked.
  Hold normal attacks through their rendered completion and direct skills through
  their apply clip's STOP. Defer equipment presentation changes during the pose.
- [x] Correct PC FX type-4 decoding without changing map type-8 decoding.
- [x] Resolve weapon impact IDs, effect categories/documents and target sockets.
  Play supported native mode-2 hit particles at the player attack marker.
- [x] Extend the existing native emitter to authored burst counts and age/velocity
  variation. Reuse native scalar/color curves, texture dimensions and camera-facing
  particle geometry. World effects use depth testing and release their draws.
- [x] Connect player attack/weapon swing/hit/skill sounds and monster
  walk/run/idle/attack/hit/death sounds to their original catalogs and HPKs.
  Move monster voices with their actors and stop looping voices on removal.
- [x] Include the used FX catalogs/documents and sample/texture HPKs in packaging,
  retaining their original folder layout. No new extraction workflow is used.

Basic damage is still resolved by the existing offline authority tick; this change
times its visual hit feedback to the authored marker. It does not move authoritative
basic damage into the renderer or establish multiplayer hit sequencing.

## Verification and remaining work

- [x] Release x64 compilation and CPU fixtures for movement, skill completion,
  native particle mathematics, animation identity and eight-state dispatch.
- [x] Combat fixture: 4,283 checks, 905 nonempty PC FX bindings, 13 weapon
  profiles, 26 particle draws, 18,273 submitted sprites, 13 authored WAV requests
  decoded without an audio device, 24 distinct player attack samples decoded across
  all tribes, and eight actual monster-2008 clips sampled.
- [x] Actor fixture: 195 checks including ATK2 one-shot behavior, sum-key collision,
  STOP feedback, map-specific skill clips and missing-IDL fallback. Existing bounded uploads remain covered.
- [x] Wider population CPU audit samples 39 available models / 227 animation
  bindings. This audit remains a failing full-population gate because monster
  **2718** has no matching supplied client catalog row.
- [ ] Obtain matching monster-2718 catalog/assets; do not substitute another model.
- [ ] Complete native type-2 billboards, other particle modes/rotation, animated
  FX models, lights, jitter, per-FX sound range/gain and the remaining
  skill/projectile/attachment paths.
  Current normal weapon effects have their mode-2 particles and sounds; five
  effects also contain billboard layers that are explicitly reported as pending.
- [x] Connect ordinary authored segment routes and short roaming through the
  [safe-zone/impact/navigation continuation](SAFEZONE_WEAPONS_IMPACT_AND_MONSTER_ROUTES.md).
- [ ] Complete remaining server AI decisions, formation and scheduler parity.
- [ ] Accept visual scale, depth, socket placement, audio output and animation
  completion in one manually authorized offline process on one channel.

No new game, renderer or server process was launched. CPU resource decoding and
a renderer double do not prove GPU appearance, audible output, FPS or full native
FX parity. Packaging and executable hashes are recorded in
[the evidence file](../evidence/monster-combat-presentation-20261025.json).
