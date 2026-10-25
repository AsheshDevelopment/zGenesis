# Damage follows the authored attack marker

Checkpoint: 2026-10-26.

The rendered offline client previously calculated basic player and monster damage
when a swing began. Only the player's impact presentation waited for the TAB hit
marker. That made HP loss, death and rewards precede the visible strike.

## Fix

- [x] Queue a basic attack with its original target and swing/actor revision.
- [x] Report the actual body-animation marker through the existing playback
  clock; apply damage once in the next offline authority tick.
- [x] Use the same marker for HP, equipment wear, hit reaction, death, rewards,
  loot and impact feedback. Remove the cosmetic-only delayed player-hit queue.
- [x] Route monster ATK1/ATK2 marker and STOP feedback with the displayed actor
  revision, including native skill-specific clip selection.
- [x] Reject stale/duplicate reports; cancel STOP without a marker, skill
  interruption, invalid/dead actors and reset/respawn transitions. Recheck living
  targets, melee distance and relevant player state at impact.
- [x] Enable animation tracking before rendered gameplay starts. Retain movement
  locking through animation completion and the existing attack cooldowns.

The renderer reports a timing event; damage mathematics, random outcomes, wear,
rewards and persistence remain inside the offline authority. This callback is an
internal offline integration, not a new trusted multiplayer client packet.

## Native references

Reference root: `C:\_GitHub\tantra-dev-main\_references\Tantra\HTlauncher`.

- `HTMainCharacter.cpp`: `m_vMainChar_AnmPointCheck`,
  `HT_vMainChar_AttackAnmAttackPoint` create the attack on `HT_AS_ATTACK`.
- `HTMonster.cpp`: `HT_vMonster_AttackPointCheck` is invoked at `HT_AS_ATTACK`
  and updates the main-character HP/impact presentation there.
- Existing TAB marker scanning and the original playback clock remain in
  `AnimationTimeline.cpp` and `HtModelPlaybackClock.h`.

Existing action-skill marker/projectile handling is retained. The original native
skill exceptions for a missing attack animation or apply time <=200 ms remain;
this fix does not introduce a universal artificial delay or change table timings.
Non-rendered simulation fixtures retain their existing headless combat path.
Rendered gameplay always opts into marker-driven combat before accepting input.

## Verification

- [x] Focused CPU gameplay regression uses real player and monster TAB clips.
  The fixture observes player marker 26 after 92 frames at 120 Hz including its
  transition, and monster marker 11; these are fixture values, not fixed delays.
- [x] HP, wear, Prana and loot remain unchanged before impact. At the marker,
  the player hit produces one damage/death/reward event; duplicates do nothing.
- [x] Wrong revisions, STOP-before-marker and skill cancellation cannot create
  delayed hits. Monster HP loss reaches the victim only at its authored marker.
- [x] Actor presentation callback and existing skill-controller/impact CPU
  checks pass. Existing headless world gameplay regression remains passing.
- [ ] Accept player/monster hit timing visually in one authorized offline run.

No game, renderer or audio device was launched. Build/package hashes and protected
file checks are recorded in the [evidence](../evidence/attack-marker-authority-20261026.json).
