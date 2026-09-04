---
id: roadmap
title: Development Roadmap to Closed Beta
sidebar_label: Roadmap
sidebar_position: 1
slug: /
description: Public roadmap for taking Kathana 2 from active development to a controlled closed beta test.
toc_max_heading_level: 4
---

# Development Roadmap to Closed Beta

This roadmap explains how Kathana 2 will progress from active development to a
controlled closed beta test. It covers player-facing features, content
readiness, quality standards, security, operations and tester support.

:::info Roadmap policy

This roadmap is ordered by dependency and readiness, not by promised dates.
Milestones advance only after their completion requirements are demonstrated.
Scope and ordering may change when original game behaviour is verified.

:::

## Guiding principles

- **Faithful experience:** Characters, controls, world behaviour, interfaces,
  combat and progression should remain recognisable to returning K2 players.
- **Authoritative game rules:** Important actions are validated consistently so
  that all players observe the same result.
- **Safe player progress:** Character, item, currency and quest progress must
  survive reconnects, maintenance and recoverable failures.
- **Careful content handling:** Original game assets are not published with this
  roadmap. Testers must use an authorised local installation.
- **Evidence before completion:** A visible feature is not complete until its
  full interaction and recovery paths have been tested.
- **Bounded beta scope:** Closed beta will validate a complete smaller
  experience before expanding to every historical zone and feature.

## Status legend

| Status | Meaning |
| --- | --- |
| Complete | The current development baseline provides the required foundation. |
| In progress | A usable portion exists, but the milestone requirements are incomplete. |
| Planned | Required before or during closed beta. |
| Deferred | Outside the first closed-beta scope. |

## Interactive progress dashboard

The percentages below summarise the verified planning tasks in each area. They
are rounded indicators of current progress, not release dates. Select any main
area to display its subtasks and individual progress.

<div className="roadmap-overall">
  <div className="roadmap-overall__top">
    <span className="roadmap-overall__label">Overall closed-beta readiness</span>
    <span className="roadmap-percent">45%</span>
  </div>
  <progress className="roadmap-progress" value="45" max="100" aria-label="Overall closed-beta readiness: 45 percent">45%</progress>
</div>

<div className="roadmap-dashboard">

<details className="roadmap-area roadmap-ui" open>
  <summary>
    <div className="roadmap-area__title">
      <span className="roadmap-area__name"><span className="roadmap-area__icon">◆</span> UI</span>
      <span className="roadmap-percent">62%</span>
    </div>
    <progress className="roadmap-progress" value="62" max="100" aria-label="UI progress: 62 percent">62%</progress>
  </summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Intro, login and character screens</span><span className="roadmap-percent">90%</span></div><progress className="roadmap-progress" value="90" max="100" aria-label="Intro, login and character screens: 90 percent">90%</progress><div className="roadmap-subtask__note">Core screens are working; final visual and message review remains.</div></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Main heads-up display</span><span className="roadmap-percent">70%</span></div><progress className="roadmap-progress" value="70" max="100" aria-label="Main heads-up display: 70 percent">70%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Buttons, windows and controls</span><span className="roadmap-percent">65%</span></div><progress className="roadmap-progress" value="65" max="100" aria-label="Buttons, windows and controls: 65 percent">65%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Screen-size compatibility</span><span className="roadmap-percent">50%</span></div><progress className="roadmap-progress" value="50" max="100" aria-label="Screen-size compatibility: 50 percent">50%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Accessibility and readability</span><span className="roadmap-percent">35%</span></div><progress className="roadmap-progress" value="35" max="100" aria-label="Accessibility and readability: 35 percent">35%</progress></div>
  </div>
</details>

<details className="roadmap-area roadmap-gameplay">
  <summary>
    <div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">✦</span> GAMEPLAY</span><span className="roadmap-percent">43%</span></div>
    <progress className="roadmap-progress" value="43" max="100" aria-label="Gameplay progress: 43 percent">43%</progress>
  </summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Movement and collision</span><span className="roadmap-percent">75%</span></div><progress className="roadmap-progress" value="75" max="100" aria-label="Movement and collision: 75 percent">75%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Combat and targeting</span><span className="roadmap-percent">55%</span></div><progress className="roadmap-progress" value="55" max="100" aria-label="Combat and targeting: 55 percent">55%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Inventory and equipment</span><span className="roadmap-percent">45%</span></div><progress className="roadmap-progress" value="45" max="100" aria-label="Inventory and equipment: 45 percent">45%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">People and town services</span><span className="roadmap-percent">25%</span></div><progress className="roadmap-progress" value="25" max="100" aria-label="People and town services: 25 percent">25%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Quests and rewards</span><span className="roadmap-percent">15%</span></div><progress className="roadmap-progress" value="15" max="100" aria-label="Quests and rewards: 15 percent">15%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Character progression</span><span className="roadmap-percent">40%</span></div><progress className="roadmap-progress" value="40" max="100" aria-label="Character progression: 40 percent">40%</progress></div>
  </div>
</details>

<details className="roadmap-area roadmap-network">
  <summary>
    <div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">◎</span> NETWORK</span><span className="roadmap-percent">35%</span></div>
    <progress className="roadmap-progress" value="35" max="100" aria-label="Network progress: 35 percent">35%</progress>
  </summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Login and session stability</span><span className="roadmap-percent">75%</span></div><progress className="roadmap-progress" value="75" max="100" aria-label="Login and session stability: 75 percent">75%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Nearby-player and world synchronisation</span><span className="roadmap-percent">60%</span></div><progress className="roadmap-progress" value="60" max="100" aria-label="Nearby-player and world synchronisation: 60 percent">60%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Chat channels</span><span className="roadmap-percent">30%</span></div><progress className="roadmap-progress" value="30" max="100" aria-label="Chat channels: 30 percent">30%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Parties, friends and guild foundation</span><span className="roadmap-percent">15%</span></div><progress className="roadmap-progress" value="15" max="100" aria-label="Parties, friends and guild foundation: 15 percent">15%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Player trade</span><span className="roadmap-percent">10%</span></div><progress className="roadmap-progress" value="10" max="100" aria-label="Player trade: 10 percent">10%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Online security and abuse controls</span><span className="roadmap-percent">20%</span></div><progress className="roadmap-progress" value="20" max="100" aria-label="Online security and abuse controls: 20 percent">20%</progress></div>
  </div>
</details>

<details className="roadmap-area roadmap-skills">
  <summary>
    <div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">✧</span> SKILLS</span><span className="roadmap-percent">38%</span></div>
    <progress className="roadmap-progress" value="38" max="100" aria-label="Skills progress: 38 percent">38%</progress>
  </summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Starting skill catalogue</span><span className="roadmap-percent">70%</span></div><progress className="roadmap-progress" value="70" max="100" aria-label="Starting skill catalogue: 70 percent">70%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Learning and improvement</span><span className="roadmap-percent">40%</span></div><progress className="roadmap-progress" value="40" max="100" aria-label="Learning and improvement: 40 percent">40%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Costs and recovery times</span><span className="roadmap-percent">55%</span></div><progress className="roadmap-progress" value="55" max="100" aria-label="Costs and recovery times: 55 percent">55%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Target and distance rules</span><span className="roadmap-percent">30%</span></div><progress className="roadmap-progress" value="30" max="100" aria-label="Target and distance rules: 30 percent">30%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Temporary effects and conditions</span><span className="roadmap-percent">10%</span></div><progress className="roadmap-progress" value="10" max="100" aria-label="Temporary effects and conditions: 10 percent">10%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Skill windows and quickbar use</span><span className="roadmap-percent">25%</span></div><progress className="roadmap-progress" value="25" max="100" aria-label="Skill windows and quickbar use: 25 percent">25%</progress></div>
  </div>
</details>

<details className="roadmap-area roadmap-animations">
  <summary>
    <div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">▶</span> ANIMATIONS</span><span className="roadmap-percent">61%</span></div>
    <progress className="roadmap-progress" value="61" max="100" aria-label="Animations progress: 61 percent">61%</progress>
  </summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Tribe animations</span><span className="roadmap-percent">85%</span></div><progress className="roadmap-progress" value="85" max="100" aria-label="Tribe animations: 85 percent">85%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Hair and clothing attachment</span><span className="roadmap-percent">75%</span></div><progress className="roadmap-progress" value="75" max="100" aria-label="Hair and clothing attachment: 75 percent">75%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Movement animations</span><span className="roadmap-percent">60%</span></div><progress className="roadmap-progress" value="60" max="100" aria-label="Movement animations: 60 percent">60%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Combat animations</span><span className="roadmap-percent">45%</span></div><progress className="roadmap-progress" value="45" max="100" aria-label="Combat animations: 45 percent">45%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Defeat and recovery animations</span><span className="roadmap-percent">80%</span></div><progress className="roadmap-progress" value="80" max="100" aria-label="Defeat and recovery animations: 80 percent">80%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Monster animations</span><span className="roadmap-percent">35%</span></div><progress className="roadmap-progress" value="35" max="100" aria-label="Monster animations: 35 percent">35%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Town character animations</span><span className="roadmap-percent">40%</span></div><progress className="roadmap-progress" value="40" max="100" aria-label="Town character animations: 40 percent">40%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Distance detail transitions</span><span className="roadmap-percent">70%</span></div><progress className="roadmap-progress" value="70" max="100" aria-label="Distance detail transitions: 70 percent">70%</progress></div>
  </div>
</details>

<details className="roadmap-area roadmap-world">
  <summary>
    <div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">⬡</span> WORLD &amp; MAPS</span><span className="roadmap-percent">53%</span></div>
    <progress className="roadmap-progress" value="53" max="100" aria-label="World and maps progress: 53 percent">53%</progress>
  </summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Starting-region terrain</span><span className="roadmap-percent">85%</span></div><progress className="roadmap-progress" value="85" max="100" aria-label="Starting-region terrain: 85 percent">85%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">World collision</span><span className="roadmap-percent">75%</span></div><progress className="roadmap-progress" value="75" max="100" aria-label="World collision: 75 percent">75%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Buildings and placed objects</span><span className="roadmap-percent">80%</span></div><progress className="roadmap-progress" value="80" max="100" aria-label="Buildings and placed objects: 80 percent">80%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Water, sky, fog and lighting</span><span className="roadmap-percent">45%</span></div><progress className="roadmap-progress" value="45" max="100" aria-label="Water, sky, fog and lighting: 45 percent">45%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Region portals</span><span className="roadmap-percent">15%</span></div><progress className="roadmap-progress" value="15" max="100" aria-label="Region portals: 15 percent">15%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Additional beta regions</span><span className="roadmap-percent">20%</span></div><progress className="roadmap-progress" value="20" max="100" aria-label="Additional beta regions: 20 percent">20%</progress></div>
  </div>
</details>

<details className="roadmap-area roadmap-audio">
  <summary>
    <div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">♪</span> AUDIO &amp; EFFECTS</span><span className="roadmap-percent">48%</span></div>
    <progress className="roadmap-progress" value="48" max="100" aria-label="Audio and effects progress: 48 percent">48%</progress>
  </summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Intro music and audio</span><span className="roadmap-percent">80%</span></div><progress className="roadmap-progress" value="80" max="100" aria-label="Intro music and audio: 80 percent">80%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Interface sounds</span><span className="roadmap-percent">65%</span></div><progress className="roadmap-progress" value="65" max="100" aria-label="Interface sounds: 65 percent">65%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Movement and targeting feedback</span><span className="roadmap-percent">60%</span></div><progress className="roadmap-progress" value="60" max="100" aria-label="Movement and targeting feedback: 60 percent">60%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Combat sounds and effects</span><span className="roadmap-percent">30%</span></div><progress className="roadmap-progress" value="30" max="100" aria-label="Combat sounds and effects: 30 percent">30%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Environmental audio</span><span className="roadmap-percent">35%</span></div><progress className="roadmap-progress" value="35" max="100" aria-label="Environmental audio: 35 percent">35%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Quest and advancement effects</span><span className="roadmap-percent">20%</span></div><progress className="roadmap-progress" value="20" max="100" aria-label="Quest and advancement effects: 20 percent">20%</progress></div>
  </div>
</details>

<details className="roadmap-area roadmap-beta">
  <summary>
    <div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">★</span> CLOSED BETA READINESS</span><span className="roadmap-percent">23%</span></div>
    <progress className="roadmap-progress" value="23" max="100" aria-label="Closed beta readiness progress: 23 percent">23%</progress>
  </summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Repeatable release preparation</span><span className="roadmap-percent">65%</span></div><progress className="roadmap-progress" value="65" max="100" aria-label="Repeatable release preparation: 65 percent">65%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Account and service security</span><span className="roadmap-percent">25%</span></div><progress className="roadmap-progress" value="25" max="100" aria-label="Account and service security: 25 percent">25%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Backup and player recovery</span><span className="roadmap-percent">30%</span></div><progress className="roadmap-progress" value="30" max="100" aria-label="Backup and player recovery: 30 percent">30%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Extended stability testing</span><span className="roadmap-percent">10%</span></div><progress className="roadmap-progress" value="10" max="100" aria-label="Extended stability testing: 10 percent">10%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Tester guides and support</span><span className="roadmap-percent">10%</span></div><progress className="roadmap-progress" value="10" max="100" aria-label="Tester guides and support: 10 percent">10%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Invitation-wave operations</span><span className="roadmap-percent">0%</span></div><progress className="roadmap-progress" value="0" max="100" aria-label="Invitation-wave operations: 0 percent">0%</progress></div>
  </div>
</details>

</div>

## Roadmap summary

| Milestone | Status | Intended outcome |
| --- | --- | --- |
| 1. Development foundation | Complete | Stable foundation for the client, world service and content tools. |
| 2. Playable starting experience | In progress | Reliable journey from launch to a playable starting region. |
| 3. Core adventure loop | Planned | Explore, fight, earn rewards, use services and complete quests. |
| 4. Multiplayer community | Planned | Chat, parties, friends, guild foundation and safe player trade. |
| 5. Content readiness | Planned | Validated zones, encounters, interfaces, audio and effects. |
| 6. Pre-beta hardening | Planned | Secure, recoverable and supportable test service. |
| 7. Closed beta | Planned | Invite-only validation of the complete bounded experience. |

---

## Milestone 1 — Development foundation

**Status:** Complete

### Purpose

Establish the systems needed to present the game, preserve player state, load
original K2 content safely and support repeatable testing.

### Completed foundation

- [x] Separate game client, world service and content-tool responsibilities.
- [x] Window, display, input, audio and three-dimensional presentation basics.
- [x] Safe loading for the currently required character, world, interface,
  animation, audio and effect content.
- [x] Local account and character persistence for development testing.
- [x] Repeatable checks for content integrity and development builds.
- [x] Tools for inspecting maps, interfaces, effects and packaged content.
- [x] Original game assets kept outside public project history.

### Completion requirements

- The development build starts through a documented process.
- Invalid or incomplete content is rejected with a useful explanation.
- Client presentation, world rules and persistent data remain separate.
- Repeated builds produce identifiable and testable results.

---

## Milestone 2 — Playable starting experience

**Status:** In progress

### Purpose

Deliver a dependable path from launching the game through account and character
selection into a playable starting region.

### Available today

- [x] Introductory presentation and loading screens.
- [x] Login, server selection and expandable channel selection.
- [x] Character list, character creation, appearance choices and deletion flow.
- [x] Three visible character positions with mouse selection.
- [x] Starting-region terrain, buildings, characters and local population.
- [x] Keyboard movement, click-to-move and camera controls.
- [x] Ground and obstacle collision checks.
- [x] Basic target selection, combat, death and recovery.
- [x] Initial heads-up display, chat area, quickbar and menu interaction.
- [x] Character and position restoration after reconnecting.

### Remaining starting-experience work

#### World movement

- [ ] Apply every verified movement, combat and special-area rule consistently.
- [ ] Handle stacked or multi-level walkable areas correctly.
- [ ] Route characters and creatures around obstacles instead of stopping or
  jumping back to an earlier position.
- [ ] Complete safe transitions between approved regions.
- [ ] Prevent incomplete regions from becoming available accidentally.

#### Interface and controls

- [ ] Connect every displayed health, resource, currency and progression value
  to current character state.
- [ ] Finish buttons, text entry, slots, tabs, scrollbars, dragging and control
  feedback required by the starting experience.
- [ ] Complete keyboard shortcuts without interfering with text entry.
- [ ] Verify interface placement at 800×600, 1024×768 and 1920×1080.
- [ ] Complete interface, movement, targeting and environmental sound behaviour.

#### Visual quality

- [ ] Complete camera framing and ground-obstruction behaviour.
- [ ] Verify character hair, clothing layers, optional skirts or aprons and
  distance detail changes for all playable groups.
- [ ] Verify terrain detail, transparency, water, sky, fog and lighting.
- [ ] Record repeatable visual comparisons for Intro, character selection and
  the starting region.

### Milestone 2 completion requirements

- A new player can reach the world without manual repair or developer action.
- Reconnecting restores the exact saved character and valid world position.
- Characters and creatures cannot cross blocked world boundaries.
- Failed region loading returns safely without corrupting progress.
- Every visible control required by the starting experience is interactive.
- The same packaged build passes launch-to-world testing on supported displays.

---

## Milestone 3 — Core adventure loop

**Status:** Planned

### Purpose

Turn the starting region into a complete role-playing loop: explore, fight,
receive rewards, use town services, improve a character and complete a quest.

### Movement and world activity

- [ ] Add reliable routes around blocked terrain and placed obstacles.
- [ ] Recalculate routes when a target moves or the path changes.
- [ ] Keep nearby players, creatures, people and dropped items synchronised.
- [ ] Handle entry, departure, death, reconnect and region change cleanly.
- [ ] Reject impossible movement and position changes.

### Creatures and combat

- [ ] Complete idle, detection, chase, attack, return, death and respawn
  behaviour.
- [ ] Apply verified attack, defence, resistance and damage calculations.
- [ ] Support the attack and support types required by the first quest set.
- [ ] Award experience, currency and items consistently.
- [ ] Present hits, critical results, defeat and recovery with matching motion,
  sound and visual feedback.
- [ ] Prevent defeated or disconnected characters from continuing invalid actions.

### Inventory and equipment

- [ ] Pick up, use, drop, move, equip and remove items.
- [ ] Display current equipment on the character where appropriate.
- [ ] Support purchasing, selling, repair and durability for the first services.
- [ ] Protect item and currency changes from interruption or repetition.
- [ ] Restore the exact inventory and equipment after reconnecting.

### Skills and character growth

- [ ] Learn, improve, select and use the required starting skills.
- [ ] Enforce resource cost, distance, target and recovery-time requirements.
- [ ] Apply level and chakra growth from verified values.
- [ ] Display resulting health, resources and combat values correctly.
- [ ] Verify boundary values and rounding for every active calculation.

### People and town services

- [ ] Present conversations and player choices in the correct order.
- [ ] Make conversation availability depend on current character progress.
- [ ] Validate that the player is near the selected person.
- [ ] Deliver the required merchant, storage and return-location services.
- [ ] Close interactions safely when the player moves, disconnects or changes
  region.

### Quests

- [ ] Offer, accept, track, complete, fail and repeat quests where appropriate.
- [ ] Support conversation, defeat, collection and travel objectives required by
  the first quest chain.
- [ ] Show clear progress and completion messages.
- [ ] Award quest rewards exactly once.
- [ ] Preserve quest progress through reconnect and maintenance.

### Milestone 3 completion requirements

- A new character can complete a representative multi-step quest from first
  conversation to a permanently saved reward.
- Interrupting any quest, combat or item action cannot duplicate rewards.
- Creatures navigate around a known obstacle without teleporting.
- Invalid movement, combat, item and service requests are rejected.
- Character, inventory, skill and quest progress survives a service restart.

---

## Milestone 4 — Multiplayer community

**Status:** Planned

### Purpose

Support the player-to-player activity needed to evaluate Kathana 2 as a shared
online world.

### Communication

- [ ] Add nearby, general, private, party and guild conversations.
- [ ] Support familiar communication commands and private-message replies.
- [ ] Enforce membership, distance and message-length rules.
- [ ] Add sensible message-rate limits and ignore controls.
- [ ] Provide clear feedback when a message cannot be delivered.

### Parties

- [ ] Invite, accept, reject, leave and remove members.
- [ ] Transfer leadership safely.
- [ ] Display relevant member information.
- [ ] Apply party relationships to support actions and reward sharing.
- [ ] Preserve consistent membership through death, region change and disconnect.

### Friends and guild foundation

- [ ] Send, accept and remove friend relationships.
- [ ] Display available friend presence information.
- [ ] Create the membership, role and permission foundation needed by guilds.
- [ ] Display guild identity and provide guild conversation.
- [ ] Defer large guild battles until the core community features are stable.

### Player trade

- [ ] Request, accept, reject, confirm and cancel a trade.
- [ ] Prevent offered items or currency from changing unexpectedly.
- [ ] Recheck both players before completing the exchange.
- [ ] Complete both sides together or cancel both sides safely.
- [ ] Cancel safely on excessive distance, death, region change or disconnect.

### Milestone 4 completion requirements

- Multiple players receive only the communication intended for them.
- Party state remains correct when a leader disconnects or changes region.
- Repeated or interrupted trade cannot duplicate or destroy items or currency.
- Unauthorised friendship, guild and trade actions do not change player state.

---

## Milestone 5 — Content readiness

**Status:** Planned

### Purpose

Prepare the maps, population, interfaces, audio and visual effects required by
the first closed-beta experience.

### Regions and environments

- [ ] Verify terrain, buildings, collision, water, sky, weather, lighting and
  environmental sound for every approved region.
- [ ] Verify entrances, exits, return points and region transitions.
- [ ] Check all visible objects for correct position, scale, texture and detail.
- [ ] Keep each region's movement and population information together during
  review and release.
- [ ] Record a content identity and revision for every released region.

### Population and encounters

- [ ] Verify every person and creature reference used by the beta regions.
- [ ] Check spawn boundaries, walkable ground and population limits.
- [ ] Review creature level, behaviour, rewards and respawn timing.
- [ ] Reject incomplete or mixed-region population data.
- [ ] Verify the complete first quest chain against the released population.

### Interfaces

- [ ] Review every interface required by the beta at supported screen sizes.
- [ ] Verify images, text, font appearance, colour, position and control states.
- [ ] Test text entry, links, scrollbars, buttons, tabs, slots and window dragging.
- [ ] Record pass/fail results and reasons for every reviewed window.
- [ ] Report missing interface resources clearly instead of displaying silent
  substitutes.

### Audio and visual effects

- [ ] Verify interface, movement, targeting, combat and environmental sounds.
- [ ] Verify targeting, impact, critical, recovery, advancement and quest effects.
- [ ] Check effect placement on characters, creatures and world objects.
- [ ] Prevent missing or invalid effects from disrupting gameplay.
- [ ] Record visual comparisons for representative effect families.

### Content readiness requirements

- Every closed-beta region has a passing content review.
- Required interfaces work at all supported screen sizes.
- Required quest people, creatures, items and locations resolve correctly.
- Missing critical content stops release preparation with a clear explanation.
- Public review summaries do not include or redistribute original asset data.

---

## Milestone 6 — Pre-beta hardening

**Status:** Planned

### Purpose

Prepare the bounded game experience for invited testers, where failures must be
recoverable and supportable without direct developer supervision.

### Account and communication security

- [ ] Protect account communication in transit.
- [ ] Limit repeated failed login attempts and obvious automated abuse.
- [ ] Keep account secrets out of logs and distributed files.
- [ ] Reject incompatible, oversized or malformed requests safely.
- [ ] Review account, movement, inventory, trade and administrative boundaries.

### Progress protection

- [ ] Freeze and identify the closed-beta player-data structure.
- [ ] Test upgrade, rollback, backup and restoration procedures.
- [ ] Check character, item, currency, skill, quest and social-data consistency.
- [ ] Recover test accounts and characters from a prepared backup.
- [ ] Document when beta progress may be reset and how testers will be notified.

### Stability and capacity

- [ ] Run extended tests covering world activity, population, combat, saving and
  reconnecting.
- [ ] Measure response time, world-update stability, memory use and data-saving
  time under representative load.
- [ ] Set practical limits for visible population and visual complexity.
- [ ] Test display changes, focus loss, interrupted communication and restart.
- [ ] Remove release-blocking warnings and unresolved critical errors.

### Distribution and recovery

- [ ] Produce identifiable, repeatable beta packages.
- [ ] Verify distributed file integrity before launch.
- [ ] Reject incompatible client and service versions clearly.
- [ ] Provide safe repair for project-owned files.
- [ ] Collect useful diagnostics without passwords or original asset contents.

### Tester support

- [ ] Publish installation, account, controls and known-issues guides.
- [ ] Define issue severity and reporting templates.
- [ ] Prepare account reset, character recovery and service rollback procedures.
- [ ] Define tester conduct, moderation and escalation rules.
- [ ] Publish privacy and diagnostic-data notices.

### Pre-beta completion requirements

- No known release-blocking security or player-data integrity issue.
- All automated and packaged gameplay checks pass from a clean release candidate.
- Backup and restoration drills recover test accounts and characters.
- Extended multiplayer testing shows no unbounded resource growth or permanent
  world-state disagreement.
- Launch-to-world, reconnect, quest, party and trade journeys pass.
- Beta scope, limitations and tester support are publicly documented.

---

## Milestone 7 — Closed beta

**Status:** Planned

### Purpose

Validate the complete bounded Kathana 2 experience with invited players before
considering a larger test or broader content scope.

### Minimum closed-beta experience

- Launch, login, server/channel and character lifecycle.
- A validated starting region and only explicitly approved connected regions.
- Movement, camera, collision and safe region transitions.
- Representative town services and a complete multi-step quest chain.
- Creatures, combat, defeat, recovery, rewards and character growth.
- Inventory, equipment, a bounded skill set and quickbars.
- Communication, parties, friends, guild foundation and player trade.
- Reviewed interfaces, audio and representative visual effects.
- Persistent character, inventory, skill, quest and social progress.

### CBT-0 — Team qualification

- [ ] Test clean installation on supported Windows configurations.
- [ ] Test fresh accounts, new characters and returning characters.
- [ ] Exercise recovery procedures using test-only progress.
- [ ] Confirm monitoring and support readiness before external invitations.

### CBT-1 — Small invitation wave

- [ ] Invite a small controlled group.
- [ ] Prioritise installation, login, crashes, connection quality and progression
  blockers.
- [ ] Review reports during every active test window.
- [ ] Pause invitations immediately for security, duplication or character-loss
  defects.

### CBT-2 — Gameplay and concurrency wave

- [ ] Increase participation only after first-wave blockers are resolved.
- [ ] Focus on party play, communication, trade, shared quest progress,
  population behaviour and region transitions.
- [ ] Test announced maintenance, restart, backup and recovery.
- [ ] Compare actual activity with the prepared capacity limits.

### CBT-3 — Stability confirmation

- [ ] Freeze new features except approved blocker corrections.
- [ ] Repeat complete gameplay and content checks for every release candidate.
- [ ] Confirm upgrade and rollback from the previous beta release.
- [ ] Publish resolved issues, known limitations and the next-stage decision.

### Closed-beta entry requirements

- [ ] All pre-beta completion requirements are satisfied.
- [ ] No known item or currency duplication path.
- [ ] No known unrecoverable character-loss path.
- [ ] No known account-access or administrative bypass.
- [ ] Every active region and quest has passed release review.
- [ ] Incompatible versions are rejected with a clear explanation.
- [ ] Monitoring, backup, rollback and tester support are operational.
- [ ] Tester terms, privacy information and asset requirements are published.
- [ ] The beta release and its player-data revision are identifiable and
  recoverable.

### Closed-beta success criteria

The closed beta succeeds when evidence shows that:

- invited players can install, enter the world and retain progress reliably;
- the shared game world remains consistent across reconnects and maintenance;
- core multiplayer features work without duplication or information leakage;
- content and interface defects can be reproduced and corrected predictably;
- measured capacity supports the intended next test group;
- remaining defects are understood and prioritised without requiring the core
  project foundation to be replaced.

---

## Deferred beyond the first closed beta

Unless required by the approved beta experience, the first closed beta does not
need:

- every historical region, quest, creature, item or skill;
- unrestricted public account registration;
- large-scale guild battles and siege activities;
- premium billing or cash-store services;
- private player shops;
- the complete historical collection of mounts and pets;
- production-scale public server discovery.

Keeping these features outside the first test protects the quality of the core
experience and shortens the path to useful player feedback.

## Public roadmap updates

- Completed tasks require recorded test evidence.
- Failed requirements remain visible until corrected.
- New discoveries may change scope before implementation begins.
- Updates will not expose private infrastructure, account details, internal
  implementation names or original asset contents.
- Closed-beta dates will be announced only after the entry requirements are met.
