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

<section className="roadmap-hero">
  <div className="roadmap-hero__eyebrow">PUBLIC DEVELOPMENT ROADMAP · CLOSED BETA TRACK</div>
  <p className="roadmap-hero__lead">A disciplined, evidence-led path from active development to a stable and supportable Kathana 2 closed beta.</p>
  <p className="roadmap-hero__copy">Progress is organised by dependency and demonstrated readiness—not promised dates. Every percentage is a rounded planning indicator, and every workstream advances only after its completion requirements are verified.</p>
  <div className="roadmap-hero__rule" aria-hidden="true"></div>
  <div className="roadmap-hero__meta">
    <span><strong>Current stage</strong> Playable starting experience</span>
    <span><strong>Release target</strong> Controlled closed beta</span>
    <span><strong>Update policy</strong> Evidence before completion</span>
  </div>
</section>

<section className="roadmap-overview" aria-label="Roadmap overview">
  <article className="roadmap-overall">
    <div className="roadmap-overall__top">
      <div>
        <span className="roadmap-card__kicker">PROGRAMME READINESS</span>
        <span className="roadmap-overall__label">Overall progress</span>
      </div>
      <span className="roadmap-overall__value">45<span>%</span></span>
    </div>
    <progress className="roadmap-progress" value="45" max="100" aria-label="Overall closed-beta readiness: 45 percent">45%</progress>
    <div className="roadmap-scale" aria-hidden="true"><span>Development</span><span>Closed beta</span></div>
  </article>
  <div className="roadmap-facts">
    <article className="roadmap-fact"><span className="roadmap-fact__value">08</span><span className="roadmap-fact__label">Workstreams</span></article>
    <article className="roadmap-fact"><span className="roadmap-fact__value">01</span><span className="roadmap-fact__label">Foundation ready</span></article>
    <article className="roadmap-fact roadmap-fact--active"><span className="roadmap-fact__value">07</span><span className="roadmap-fact__label">Active workstreams</span></article>
    <article className="roadmap-fact"><span className="roadmap-fact__value">01</span><span className="roadmap-fact__label">Beta entry gate</span></article>
  </div>
</section>

<div className="roadmap-legend" aria-label="Status legend">
  <span className="roadmap-legend__title">STATUS</span>
  <span><i className="roadmap-dot roadmap-dot--complete"></i>Complete</span>
  <span><i className="roadmap-dot roadmap-dot--active"></i>In progress</span>
  <span><i className="roadmap-dot roadmap-dot--planned"></i>Planned</span>
  <span><i className="roadmap-dot roadmap-dot--deferred"></i>Deferred</span>
</div>

## Workstream dashboard

Select a workstream to reveal its detailed tasks. The ordered layout makes gaps,
dependencies and relative readiness easy to scan without implying a release date.

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

## Delivery principles

<div className="roadmap-principles">
  <article><span>01</span><div><strong>Faithful experience</strong><p>Characters, controls, world behaviour, interfaces, combat and progression remain recognisable to returning K2 players.</p></div></article>
  <article><span>02</span><div><strong>Authoritative rules</strong><p>Important actions are validated consistently so every player observes the same result.</p></div></article>
  <article><span>03</span><div><strong>Safe progress</strong><p>Character, item, currency and quest progress survives reconnects, maintenance and recoverable failures.</p></div></article>
  <article><span>04</span><div><strong>Careful content</strong><p>Original game assets are not published here. Testers must use an authorised local installation.</p></div></article>
  <article><span>05</span><div><strong>Evidence first</strong><p>A visible feature is not complete until its full interaction and recovery paths have been tested.</p></div></article>
  <article><span>06</span><div><strong>Bounded beta</strong><p>A complete smaller experience is validated before every historical zone and feature is expanded.</p></div></article>
</div>

## Detailed workstream plan

The complete delivery plan is grouped by responsibility. Each workstream keeps
its established baseline, remaining scope and release gate together.

<div className="roadmap-plan-grid">

<details className="roadmap-plan roadmap-ui" open>
  <summary><span><b>01</b><strong>UI</strong></span><em>62% · In progress</em></summary>
  <div className="roadmap-plan__body">
    <section><h4>Current baseline</h4><ul><li>Intro, login, server, channel and character flows are available.</li><li>The main display, chat area, quickbar and menu foundation are present.</li><li>Interface review records can identify missing or incorrect resources.</li></ul></section>
    <section><h4>Remaining scope</h4><ul><li>Connect every displayed character, currency and progression value.</li><li>Complete buttons, text entry, slots, tabs, scrollbars and window dragging.</li><li>Finish shortcuts without interfering with active text entry.</li><li>Verify every required window at 800×600, 1024×768 and 1920×1080.</li><li>Complete font, colour, position, control-state and readability review.</li></ul></section>
    <section><h4>Completion gate</h4><ul><li>Every visible closed-beta control is interactive.</li><li>Required windows pass review at all supported screen sizes.</li><li>Missing critical interface resources stop release preparation with a clear explanation.</li></ul></section>
  </div>
</details>

<details className="roadmap-plan roadmap-gameplay">
  <summary><span><b>02</b><strong>Gameplay</strong></span><em>43% · In progress</em></summary>
  <div className="roadmap-plan__body">
    <section><h4>Current baseline</h4><ul><li>Keyboard movement, click-to-move, camera control and collision are available.</li><li>Basic targeting, combat, defeat and recovery are available.</li><li>Character and position state can survive reconnecting.</li></ul></section>
    <section><h4>Remaining scope</h4><ul><li>Complete creature detection, chase, attack, return, defeat and respawn behaviour.</li><li>Finish item pickup, use, movement, equipment, purchasing, selling and repair.</li><li>Deliver town conversations, merchants, storage and return-location services.</li><li>Complete quest offer, acceptance, tracking, objectives, rewards and persistence.</li><li>Protect item, currency, reward and progression changes from repetition or interruption.</li></ul></section>
    <section><h4>Completion gate</h4><ul><li>A new character can finish a representative multi-step quest and retain its reward.</li><li>Invalid movement, combat, item and service requests are rejected.</li><li>Interrupted actions cannot duplicate or destroy progress.</li></ul></section>
  </div>
</details>

<details className="roadmap-plan roadmap-network">
  <summary><span><b>03</b><strong>Network</strong></span><em>35% · In progress</em></summary>
  <div className="roadmap-plan__body">
    <section><h4>Current baseline</h4><ul><li>Login, session restoration and nearby-world synchronisation have a working foundation.</li><li>Accepted movement and essential character state can be shared consistently.</li></ul></section>
    <section><h4>Remaining scope</h4><ul><li>Complete nearby, general, private, party and guild communication.</li><li>Add party invitations, membership, leadership and relationship rules.</li><li>Add friends, guild membership, roles and permissions.</li><li>Complete safe two-sided player trade and cancellation paths.</li><li>Protect account communication and add rate, size and abuse controls.</li></ul></section>
    <section><h4>Completion gate</h4><ul><li>Players receive only information intended for them.</li><li>Party and social state remains consistent through disconnects and region changes.</li><li>Repeated or interrupted trade cannot duplicate items or currency.</li></ul></section>
  </div>
</details>

<details className="roadmap-plan roadmap-skills">
  <summary><span><b>04</b><strong>Skills</strong></span><em>38% · In progress</em></summary>
  <div className="roadmap-plan__body">
    <section><h4>Current baseline</h4><ul><li>The starting skill catalogue and basic resource, target and recovery rules are partially available.</li><li>Character growth values have an evidence-led foundation.</li></ul></section>
    <section><h4>Remaining scope</h4><ul><li>Complete learning, improvement, selection and quickbar use.</li><li>Enforce target, distance, resource cost and recovery requirements.</li><li>Apply temporary effects, conditions, resistance and removal rules.</li><li>Complete level and chakra growth with verified boundary and rounding behaviour.</li><li>Present resulting health, resources and combat values accurately.</li></ul></section>
    <section><h4>Completion gate</h4><ul><li>The bounded closed-beta skill set behaves consistently for valid and invalid targets.</li><li>Resource, timing and growth calculations pass boundary-value review.</li><li>Skill state survives reconnecting without free or repeated actions.</li></ul></section>
  </div>
</details>

<details className="roadmap-plan roadmap-animations">
  <summary><span><b>05</b><strong>Animations</strong></span><em>61% · In progress</em></summary>
  <div className="roadmap-plan__body">
    <section><h4>Current baseline</h4><ul><li>Playable-group idle presentation and key attachment layers are available.</li><li>Movement, defeat, recovery and distance-detail transitions have partial coverage.</li></ul></section>
    <section><h4>Remaining scope</h4><ul><li>Verify hair, clothing, optional skirts and aprons for every playable group.</li><li>Complete locomotion and combat-state transitions.</li><li>Add hit reactions and synchronised defeat and recovery presentation.</li><li>Complete creature and town-character animation families.</li><li>Verify attachment, timing and distance-detail behaviour during gameplay.</li></ul></section>
    <section><h4>Completion gate</h4><ul><li>Every beta character and creature uses the correct state and attachment set.</li><li>Transitions remain stable during movement, combat, defeat and reconnect.</li><li>Representative animation families pass repeatable visual comparison.</li></ul></section>
  </div>
</details>

<details className="roadmap-plan roadmap-world">
  <summary><span><b>06</b><strong>World &amp; Maps</strong></span><em>53% · In progress</em></summary>
  <div className="roadmap-plan__body">
    <section><h4>Current baseline</h4><ul><li>The starting region includes terrain, buildings, placed objects and local population.</li><li>Ground and obstacle collision support the current playable path.</li><li>Approved region transitions have a controlled foundation.</li></ul></section>
    <section><h4>Remaining scope</h4><ul><li>Complete stacked and multi-level walkable-area handling.</li><li>Route players and creatures around verified obstacles.</li><li>Verify terrain detail, water, sky, weather, fog, lighting and environmental sound.</li><li>Validate entrances, exits, return points and every approved transition.</li><li>Keep each region's movement, population, identity and revision information together.</li></ul></section>
    <section><h4>Completion gate</h4><ul><li>Characters and creatures cannot cross blocked boundaries.</li><li>Every active region has a passing terrain, object, collision and transition review.</li><li>Incomplete or mixed-region data cannot become active.</li></ul></section>
  </div>
</details>

<details className="roadmap-plan roadmap-audio">
  <summary><span><b>07</b><strong>Audio &amp; Effects</strong></span><em>48% · In progress</em></summary>
  <div className="roadmap-plan__body">
    <section><h4>Current baseline</h4><ul><li>Intro, interface, movement and targeting feedback have partial coverage.</li><li>Representative effect presentation can be reviewed in context.</li></ul></section>
    <section><h4>Remaining scope</h4><ul><li>Verify interface, movement, targeting, combat and environmental sounds.</li><li>Complete targeting, impact, critical, recovery, advancement and quest effects.</li><li>Check effect placement on characters, creatures and world objects.</li><li>Prevent missing or invalid effects from disrupting gameplay.</li><li>Record repeatable comparisons for every required effect family.</li></ul></section>
    <section><h4>Completion gate</h4><ul><li>Required actions provide the correct audible and visual feedback.</li><li>Missing optional feedback degrades safely and is reported clearly.</li><li>Representative sound and effect families pass release review.</li></ul></section>
  </div>
</details>

<details className="roadmap-plan roadmap-beta">
  <summary><span><b>08</b><strong>Closed Beta Readiness</strong></span><em>23% · Planned</em></summary>
  <div className="roadmap-plan__body">
    <section><h4>Release preparation</h4><ul><li>Protect account communication, secrets and administrative boundaries.</li><li>Freeze and identify the beta player-data structure.</li><li>Test upgrades, rollback, backup, restoration and account recovery.</li><li>Produce identifiable packages with integrity verification and useful diagnostics.</li><li>Publish installation, controls, known-issue, privacy and tester-support guidance.</li></ul></section>
    <section><h4>Test sequence</h4><ul><li><strong>Team qualification:</strong> clean installation, account journeys and recovery drills.</li><li><strong>Small invitation wave:</strong> installation, login, crashes and progression blockers.</li><li><strong>Gameplay wave:</strong> shared play, communication, trade, quests and transitions.</li><li><strong>Stability confirmation:</strong> feature freeze, complete checks, upgrade and rollback.</li></ul></section>
    <section><h4>Entry gate</h4><ul><li>No known account bypass, duplication path or unrecoverable character-loss path.</li><li>Every active region and quest has passed release review.</li><li>Monitoring, backup, rollback and tester support are operational.</li><li>The release and its player-data revision are identifiable and recoverable.</li></ul></section>
  </div>
</details>

</div>

## Scope held beyond the first closed beta

The initial closed beta deliberately excludes the complete historical content
catalogue, unrestricted public registration, large-scale guild warfare,
premium billing, private player shops, the full mount and pet collection, and
production-scale public discovery. Keeping these outside the first test protects
the quality of the bounded player experience.


## Public roadmap updates

- Completed tasks require recorded test evidence.
- Failed requirements remain visible until corrected.
- New discoveries may change scope before implementation begins.
- Updates will not expose private infrastructure, account details, internal
  implementation names or original asset contents.
- Closed-beta dates will be announced only after the entry requirements are met.
