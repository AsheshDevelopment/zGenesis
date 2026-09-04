---
id: roadmap
title: "GENESIS Roadmap"
sidebar_label: Roadmap
sidebar_position: 1
slug: /roadmap
displayed_sidebar: null
hide_table_of_contents: true
description: "The public development roadmap for GENESIS — Sanketa I : Kali Agamana."
toc_max_heading_level: 4
---

# GENESIS Roadmap

<section className="roadmap-hero">
  <div className="roadmap-hero__eyebrow">SANKETA I : KALI AGAMANA · PUBLIC DEVELOPMENT ROADMAP</div>
  <p className="roadmap-hero__lead">A source-led reconstruction of the classic experience, built into a new and maintainable engine.</p>
  <p className="roadmap-hero__identity"><strong>GENESIS</strong> is currently in active playable-development.</p>
  <p className="roadmap-hero__copy">Percentages reflect demonstrated project capability, remaining breadth and closed-beta risk. They are rounded planning indicators—not promised dates—and advance only when the relevant behaviour is implemented and verified.</p>
  <div className="roadmap-hero__rule" aria-hidden="true"></div>
  <div className="roadmap-hero__meta">
    <span><strong>Current stage</strong> Multi-system playable build</span>
    <span><strong>Release target</strong> Controlled closed beta</span>
    <span><strong>Update policy</strong> Evidence before completion</span>
  </div>
</section>

<section className="roadmap-overview" aria-label="Roadmap overview">
  <article className="roadmap-overall">
    <div className="roadmap-overall__top">
      <div><span className="roadmap-card__kicker">PROGRAMME READINESS</span><span className="roadmap-overall__label">Overall progress</span></div>
      <span className="roadmap-overall__value">58<span>%</span></span>
    </div>
    <progress className="roadmap-progress" value="58" max="100" aria-label="Overall closed-beta readiness: 58 percent">58%</progress>
    <div className="roadmap-scale" aria-hidden="true"><span>Development</span><span>Closed beta</span></div>
  </article>
  <div className="roadmap-facts">
    <article className="roadmap-fact"><span className="roadmap-fact__value">10</span><span className="roadmap-fact__label">Workstreams</span></article>
    <article className="roadmap-fact"><span className="roadmap-fact__value">03</span><span className="roadmap-fact__label">Core phases verified</span></article>
    <article className="roadmap-fact roadmap-fact--active"><span className="roadmap-fact__value">06</span><span className="roadmap-fact__label">Active workstreams</span></article>
    <article className="roadmap-fact"><span className="roadmap-fact__value">01</span><span className="roadmap-fact__label">Beta entry gate</span></article>
  </div>
</section>

<div className="roadmap-legend" aria-label="Status legend">
  <span className="roadmap-legend__title">STATUS</span>
  <span><i className="roadmap-dot roadmap-dot--complete"></i>Verified foundation</span>
  <span><i className="roadmap-dot roadmap-dot--active"></i>Active development</span>
  <span><i className="roadmap-dot roadmap-dot--planned"></i>Planned</span>
  <span><i className="roadmap-dot roadmap-dot--deferred"></i>Beyond first beta</span>
</div>

## Workstream dashboard

Select a workstream to reveal its source-aligned tasks, current evidence and
closed-beta completion requirements.

<div className="roadmap-dashboard">

<details className="roadmap-area roadmap-ui" open>
  <summary><div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">◆</span> UI</span><span className="roadmap-percent">74%</span></div><progress className="roadmap-progress" value="74" max="100" aria-label="UI progress: 74 percent">74%</progress></summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Intro, login and character flow</span><span className="roadmap-percent">94%</span></div><progress className="roadmap-progress" value="94" max="100">94%</progress><div className="roadmap-subtask__note">The complete startup-to-world path, three-character presentation and character creation are operational.</div></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Main HUD layout and live values</span><span className="roadmap-percent">80%</span></div><progress className="roadmap-progress" value="80" max="100">80%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Windows, controls and hotkeys</span><span className="roadmap-percent">72%</span></div><progress className="roadmap-progress" value="72" max="100">72%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Inventory, storage, merchant and quest windows</span><span className="roadmap-percent">78%</span></div><progress className="roadmap-progress" value="78" max="100">78%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Source text, fonts, colours and messages</span><span className="roadmap-percent">84%</span></div><progress className="roadmap-progress" value="84" max="100">84%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Resolution and usability review</span><span className="roadmap-percent">48%</span></div><progress className="roadmap-progress" value="48" max="100">48%</progress></div>
  </div>
  <div className="roadmap-workstream-detail">
    <section><h3>Current baseline</h3><ul><li>Startup, login, server selection, roster, character creation and loading use source-defined layouts and resources.</li><li>The gameplay HUD, quickbar, chat, target display and core windows are present and interactive.</li><li>Reviewed dialogs can be exported with their exact bitmap dependencies and missing-resource diagnostics.</li></ul></section>
    <section><h3>Remaining scope</h3><ul><li>Finish every required window, tab, slot, scrollbar and context action.</li><li>Replace remaining reconstructed labels with verified game messages.</li><li>Complete focus-safe text entry and every gameplay shortcut.</li><li>Perform full visual and interaction review at all supported display sizes.</li></ul></section>
    <section className="roadmap-gate"><h3>Completion gate</h3><ul><li>Every visible beta control performs its intended action.</li><li>Required dialogs pass bitmap, font, position, state and interaction review.</li><li>No critical missing resource or placeholder text remains.</li></ul></section>
  </div>
</details>

<details className="roadmap-area roadmap-gameplay">
  <summary><div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">✦</span> GAMEPLAY</span><span className="roadmap-percent">69%</span></div><progress className="roadmap-progress" value="69" max="100" aria-label="Gameplay progress: 69 percent">69%</progress></summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Movement, click routing and collision</span><span className="roadmap-percent">90%</span></div><progress className="roadmap-progress" value="90" max="100">90%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Targeting, player combat and recovery</span><span className="roadmap-percent">72%</span></div><progress className="roadmap-progress" value="72" max="100">72%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Inventory, equipment and currency</span><span className="roadmap-percent">76%</span></div><progress className="roadmap-progress" value="76" max="100">76%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">NPC dialogue and town services</span><span className="roadmap-percent">80%</span></div><progress className="roadmap-progress" value="80" max="100">80%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Mandara quest and reward slice</span><span className="roadmap-percent">82%</span></div><progress className="roadmap-progress" value="82" max="100">82%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Broader items, quests and progression</span><span className="roadmap-percent">35%</span></div><progress className="roadmap-progress" value="35" max="100">35%</progress></div>
  </div>
  <div className="roadmap-workstream-detail">
    <section><h3>Current baseline</h3><ul><li>Server-authoritative movement, collision, route finding and region transfer are verified.</li><li>Merchant, storage, repair and return-location services validate the active NPC and distance.</li><li>The first multi-step Mandara quest persists objectives and grants its item and Prana rewards exactly once.</li></ul></section>
    <section><h3>Remaining scope</h3><ul><li>Expand NPC roles and quest objective types beyond the first verified slice.</li><li>Complete item pickup, use, dropping, refinement, abrasion and appearance replication.</li><li>Finish level, chakra, caste, job and wider progression rules from source evidence.</li><li>Add safe-zone, player-conflict and group relationship rules.</li></ul></section>
    <section className="roadmap-gate"><h3>Completion gate</h3><ul><li>The bounded beta journey can be completed and restored after reconnect.</li><li>Invalid movement, combat, item, NPC and reward requests are rejected.</li><li>Interrupted actions cannot duplicate or destroy progress.</li></ul></section>
  </div>
</details>

<details className="roadmap-area roadmap-network">
  <summary><div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">◎</span> NETWORK &amp; SOCIAL</span><span className="roadmap-percent">50%</span></div><progress className="roadmap-progress" value="50" max="100" aria-label="Network and social progress: 50 percent">50%</progress></summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Login, sessions and reconnect</span><span className="roadmap-percent">80%</span></div><progress className="roadmap-progress" value="80" max="100">80%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Movement and nearby-world replication</span><span className="roadmap-percent">82%</span></div><progress className="roadmap-progress" value="82" max="100">82%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Authoritative gameplay transactions</span><span className="roadmap-percent">76%</span></div><progress className="roadmap-progress" value="76" max="100">76%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Chat channels and commands</span><span className="roadmap-percent">18%</span></div><progress className="roadmap-progress" value="18" max="100">18%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Party, friends and guilds</span><span className="roadmap-percent">12%</span></div><progress className="roadmap-progress" value="12" max="100">12%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Player trade</span><span className="roadmap-percent">10%</span></div><progress className="roadmap-progress" value="10" max="100">10%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Production security and operations</span><span className="roadmap-percent">22%</span></div><progress className="roadmap-progress" value="22" max="100">22%</progress></div>
  </div>
  <div className="roadmap-workstream-detail">
    <section><h3>Current baseline</h3><ul><li>Bounded sessions, character ownership, nearby-world updates and reconnect restoration are operational.</li><li>Movement, combat, inventory, NPC services and quest transactions are validated by server authority.</li><li>Region transfers replace the old nearby population and preserve the destination.</li></ul></section>
    <section><h3>Remaining scope</h3><ul><li>Implement general, local, private, party and Ashram communication.</li><li>Complete party, friend, Ashram and player-trade lifecycles.</li><li>Add rate limiting, secure transport, secret management and abuse controls.</li><li>Run realistic multi-client, disconnect and sustained-load tests.</li></ul></section>
    <section className="roadmap-gate"><h3>Completion gate</h3><ul><li>Players receive only information intended for them.</li><li>Social state remains consistent through disconnect and region changes.</li><li>Repeated or interrupted transactions cannot duplicate value.</li></ul></section>
  </div>
</details>

<details className="roadmap-area roadmap-skills">
  <summary><div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">✧</span> SKILLS &amp; COMBAT RULES</span><span className="roadmap-percent">59%</span></div><progress className="roadmap-progress" value="59" max="100" aria-label="Skills and combat rules progress: 59 percent">59%</progress></summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Source skill and item catalogues</span><span className="roadmap-percent">88%</span></div><progress className="roadmap-progress" value="88" max="100">88%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Costs, cooldowns and persistence</span><span className="roadmap-percent">80%</span></div><progress className="roadmap-progress" value="80" max="100">80%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Damage, defence and resistance formulae</span><span className="roadmap-percent">72%</span></div><progress className="roadmap-progress" value="72" max="100">72%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Player targeting and duel authority</span><span className="roadmap-percent">68%</span></div><progress className="roadmap-progress" value="68" max="100">68%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Monster combat and respawn</span><span className="roadmap-percent">58%</span></div><progress className="roadmap-progress" value="58" max="100">58%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Area, status and relationship targets</span><span className="roadmap-percent">24%</span></div><progress className="roadmap-progress" value="24" max="100">24%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Chakra-driven stat recalculation</span><span className="roadmap-percent">28%</span></div><progress className="roadmap-progress" value="28" max="100">28%</progress></div>
  </div>
  <div className="roadmap-workstream-detail">
    <section><h3>Current baseline</h3><ul><li>The full deployed player-skill catalogue and core item/monster data are readable.</li><li>Resource costs, cooldowns, direct damage channels, mitigation, lethal state and duel-authorised attacks are server-owned.</li><li>Skill, health and resource state persist across reconnects.</li></ul></section>
    <section><h3>Remaining scope</h3><ul><li>Complete learn, improve, select, projectile and activation behaviour.</li><li>Bind persisted chakras and external setting coefficients to all derived statistics.</li><li>Add area, friendly, hostile, corpse, gate, shield, immunity and status-effect rules.</li><li>Connect every authoritative combat event to its animation, sound, effect and floating result.</li></ul></section>
    <section className="roadmap-gate"><h3>Completion gate</h3><ul><li>The beta skill set behaves consistently for valid and invalid targets.</li><li>Formulae pass boundary, rounding and persistence tests.</li><li>Every accepted cast produces one authoritative result and matching presentation.</li></ul></section>
  </div>
</details>

<details className="roadmap-area roadmap-animations">
  <summary><div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">▶</span> ANIMATIONS</span><span className="roadmap-percent">68%</span></div><progress className="roadmap-progress" value="68" max="100" aria-label="Animations progress: 68 percent">68%</progress></summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Eight playable-tribe skeletons and idle states</span><span className="roadmap-percent">90%</span></div><progress className="roadmap-progress" value="90" max="100">90%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Body, face, hair, skirt and apron synchronisation</span><span className="roadmap-percent">84%</span></div><progress className="roadmap-progress" value="84" max="100">84%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Walk, run, sit and movement-state transitions</span><span className="roadmap-percent">58%</span></div><progress className="roadmap-progress" value="58" max="100">58%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Attack, skill-cast and hit-reaction states</span><span className="roadmap-percent">38%</span></div><progress className="roadmap-progress" value="38" max="100">38%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Source death state and recovery transition</span><span className="roadmap-percent">90%</span></div><progress className="roadmap-progress" value="90" max="100">90%</progress><div className="roadmap-subtask__note">The source-defined death state is resolved for all tribes, plays once and holds its final pose until recovery is accepted.</div></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Service-NPC standard animation states</span><span className="roadmap-percent">62%</span></div><progress className="roadmap-progress" value="62" max="100">62%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Monster idle, chase, attack, death and respawn states</span><span className="roadmap-percent">46%</span></div><progress className="roadmap-progress" value="46" max="100">46%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Character-part LOD state consistency</span><span className="roadmap-percent">80%</span></div><progress className="roadmap-progress" value="80" max="100">80%</progress></div>
  </div>
  <div className="roadmap-workstream-detail">
    <section><h3>Current baseline</h3><ul><li>All eight playable tribes use source skeleton, skin and idle-animation data.</li><li>Composite character parts share the same animation and distance-detail tier.</li><li>The source death state is verified across body, hair and apron parts for every tribe.</li></ul></section>
    <section><h3>Remaining scope</h3><ul><li>Complete source state selection for walking, running, sitting, attacks and skills.</li><li>Add hit reactions and reliable transition timing.</li><li>Finish service-NPC and monster state families used by beta content.</li><li>Verify optional skirt and apron behaviour for tribes that define those parts.</li></ul></section>
    <section className="roadmap-gate"><h3>Completion gate</h3><ul><li>Every beta actor selects the correct source animation state.</li><li>Composite parts remain synchronised through state and distance changes.</li><li>Movement, combat, death and recovery transitions pass repeatable visual review.</li></ul></section>
  </div>
</details>

<details className="roadmap-area roadmap-world">
  <summary><div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">⬡</span> WORLD &amp; MAPS</span><span className="roadmap-percent">73%</span></div><progress className="roadmap-progress" value="73" max="100" aria-label="World and maps progress: 73 percent">73%</progress></summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Mandara terrain and scenery</span><span className="roadmap-percent">92%</span></div><progress className="roadmap-progress" value="92" max="100">92%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Client and server collision authority</span><span className="roadmap-percent">90%</span></div><progress className="roadmap-progress" value="90" max="100">90%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Visibility streaming and object placement</span><span className="roadmap-percent">85%</span></div><progress className="roadmap-progress" value="85" max="100">85%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Portal-driven region transitions</span><span className="roadmap-percent">82%</span></div><progress className="roadmap-progress" value="82" max="100">82%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Terrain detail, sky, water, fog and lighting</span><span className="roadmap-percent">66%</span></div><progress className="roadmap-progress" value="66" max="100">66%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Verified multi-region activation</span><span className="roadmap-percent">45%</span></div><progress className="roadmap-progress" value="45" max="100">45%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Additional maps for GENESIS</span><span className="roadmap-percent">20%</span></div><progress className="roadmap-progress" value="20" max="100">20%</progress></div>
  </div>
  <div className="roadmap-workstream-detail">
    <section><h3>Current baseline</h3><ul><li>Mandara terrain, collision, thousands of placed objects, detail shading and nearby-object streaming are operational.</li><li>Client prediction and server authority share the same movement rules, including multi-floor selection.</li><li>A verified two-region transition replaces scene and nearby-world state and survives reconnect.</li></ul></section>
    <section><h3>Remaining scope</h3><ul><li>Activate and capture each approved region only after its complete data set passes validation.</li><li>Finish water, sky, minimap, environmental lighting and region audio fidelity.</li><li>Verify monster populations and navigation for each active region.</li><li>Create and test additional GENESIS maps after the classic beta route is stable.</li></ul></section>
    <section className="roadmap-gate"><h3>Completion gate</h3><ul><li>Every beta region passes terrain, object, collision, population and transition review.</li><li>Characters, monsters and cameras cannot cross invalid world boundaries.</li><li>Incomplete or mixed-region data cannot be activated.</li></ul></section>
  </div>
</details>

<details className="roadmap-area roadmap-audio">
  <summary><div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">♪</span> AUDIO &amp; EFFECTS</span><span className="roadmap-percent">65%</span></div><progress className="roadmap-progress" value="65" max="100" aria-label="Audio and effects progress: 65 percent">65%</progress></summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Intro music and video audio</span><span className="roadmap-percent">92%</span></div><progress className="roadmap-progress" value="92" max="100">92%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">UI control sounds</span><span className="roadmap-percent">82%</span></div><progress className="roadmap-progress" value="82" max="100">82%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Ground and actor targeting feedback</span><span className="roadmap-percent">86%</span></div><progress className="roadmap-progress" value="86" max="100">86%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Intro fire and particle rendering</span><span className="roadmap-percent">78%</span></div><progress className="roadmap-progress" value="78" max="100">78%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Combat, skill and impact feedback</span><span className="roadmap-percent">38%</span></div><progress className="roadmap-progress" value="38" max="100">38%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Map and ambient audio</span><span className="roadmap-percent">35%</span></div><progress className="roadmap-progress" value="35" max="100">35%</progress></div>
  </div>
  <div className="roadmap-workstream-detail">
    <section><h3>Current baseline</h3><ul><li>Intro playback includes video, audio, skipping and looping background music.</li><li>Source UI clicks, ground targeting and actor targeting use distinct feedback.</li><li>Decoded flame and smoke emitters render at the source intro-world anchors.</li></ul></section>
    <section><h3>Remaining scope</h3><ul><li>Bind attacks, skills, impacts, criticals, recovery and quest events to verified feedback.</li><li>Complete map ambience and volume behaviour.</li><li>Share one semantic effect definition between editing and runtime playback.</li><li>Add missing-resource, socket and lifecycle diagnostics.</li></ul></section>
    <section className="roadmap-gate"><h3>Completion gate</h3><ul><li>Every required beta action has the correct audible and visual response.</li><li>Missing optional feedback degrades safely and is reported.</li><li>Representative effect families pass repeatable visual comparison.</li></ul></section>
  </div>
</details>

<details className="roadmap-area roadmap-devkit">
  <summary><div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">◇</span> DEVELOPER KIT</span><span className="roadmap-percent">81%</span></div><progress className="roadmap-progress" value="81" max="100" aria-label="Developer kit progress: 81 percent">81%</progress></summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Zone terrain, collision and object authoring</span><span className="roadmap-percent">92%</span></div><progress className="roadmap-progress" value="92" max="100">92%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Water, environment and population authoring</span><span className="roadmap-percent">86%</span></div><progress className="roadmap-progress" value="86" max="100">86%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Particle preview and tuning</span><span className="roadmap-percent">84%</span></div><progress className="roadmap-progress" value="84" max="100">84%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">UI preview, review and approved-resource export</span><span className="roadmap-percent">88%</span></div><progress className="roadmap-progress" value="88" max="100">88%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Model, texture and package conversion</span><span className="roadmap-percent">78%</span></div><progress className="roadmap-progress" value="78" max="100">78%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Asset, map, package and shader validation</span><span className="roadmap-percent">90%</span></div><progress className="roadmap-progress" value="90" max="100">90%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Remaining map, effect and data document workflows</span><span className="roadmap-percent">48%</span></div><progress className="roadmap-progress" value="48" max="100">48%</progress></div>
  </div>
  <div className="roadmap-workstream-detail">
    <section><h3>Current baseline</h3><ul><li>The zone kit can edit terrain, collision, placed objects, water, environmental regions and monster generation data.</li><li>Dedicated UI and effect editors support preview, inspection, review and human-readable document work.</li><li>Conversion, packaging, inspection and validation tools cover the principal game-resource families.</li></ul></section>
    <section><h3>Remaining scope</h3><ul><li>Complete operational document workflows for every enabled map, effect and gameplay-data family.</li><li>Make editor and runtime effect definitions fully interchangeable.</li><li>Add safer transactional saving, recovery and end-to-end project packaging where still missing.</li><li>Finish integrated asset browsing and dependency repair flows.</li></ul></section>
    <section className="roadmap-gate"><h3>Completion gate</h3><ul><li>Every enabled writer round-trips verified source fixtures and retains a recoverable backup.</li><li>Editor output passes the same validators used by the game.</li><li>A clean developer-kit build can create, inspect, validate and package beta content.</li></ul></section>
  </div>
</details>

<details className="roadmap-area roadmap-extras">
  <summary><div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">＋</span> EXTRAS &amp; COMPATIBILITY</span><span className="roadmap-percent">51%</span></div><progress className="roadmap-progress" value="51" max="100" aria-label="Extras and compatibility progress: 51 percent">51%</progress></summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Single-player offline mode</span><span className="roadmap-percent">95%</span></div><progress className="roadmap-progress" value="95" max="100">95%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Localisation and country profiles</span><span className="roadmap-percent">82%</span></div><progress className="roadmap-progress" value="82" max="100">82%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Build, launcher and integrity checks</span><span className="roadmap-percent">86%</span></div><progress className="roadmap-progress" value="86" max="100">86%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Screenshots, controls and quality-of-life options</span><span className="roadmap-percent">55%</span></div><progress className="roadmap-progress" value="55" max="100">55%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Desktop platform qualification</span><span className="roadmap-percent">24%</span></div><progress className="roadmap-progress" value="24" max="100">24%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Mobile platform adaptation</span><span className="roadmap-percent">5%</span></div><progress className="roadmap-progress" value="5" max="100">5%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">New GENESIS maps and optional features</span><span className="roadmap-percent">12%</span></div><progress className="roadmap-progress" value="12" max="100">12%</progress></div>
  </div>
  <div className="roadmap-workstream-detail">
    <section><h3>Current baseline</h3><ul><li>A local offline profile can run the authoritative game service and retain character progress.</li><li>The launcher, default configuration, executable identity and copied resource integrity are automated.</li><li>Multiple source language profiles and validated message substitution are available.</li></ul></section>
    <section><h3>Remaining scope</h3><ul><li>Qualify the client and tools on the targeted desktop systems.</li><li>Design mobile input, layout, performance and distribution adaptations.</li><li>Complete convenience settings, screenshot handling and player-facing configuration.</li><li>Develop additional maps and optional features after the bounded classic route is stable.</li></ul></section>
    <section className="roadmap-gate"><h3>Completion gate</h3><ul><li>Every advertised beta platform passes installation, startup, input and gameplay checks.</li><li>Offline and online profiles remain isolated and recoverable.</li><li>Optional features cannot delay or destabilise the core beta route.</li></ul></section>
  </div>
</details>

<details className="roadmap-area roadmap-beta">
  <summary><div className="roadmap-area__title"><span className="roadmap-area__name"><span className="roadmap-area__icon">★</span> CLOSED BETA READINESS</span><span className="roadmap-percent">31%</span></div><progress className="roadmap-progress" value="31" max="100" aria-label="Closed beta readiness progress: 31 percent">31%</progress></summary>
  <div className="roadmap-area__body">
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Repeatable builds and verification</span><span className="roadmap-percent">78%</span></div><progress className="roadmap-progress" value="78" max="100">78%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Account and service security</span><span className="roadmap-percent">25%</span></div><progress className="roadmap-progress" value="25" max="100">25%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Data migration, backup and recovery</span><span className="roadmap-percent">32%</span></div><progress className="roadmap-progress" value="32" max="100">32%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Extended stability and load testing</span><span className="roadmap-percent">18%</span></div><progress className="roadmap-progress" value="18" max="100">18%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Crash reporting and support diagnostics</span><span className="roadmap-percent">24%</span></div><progress className="roadmap-progress" value="24" max="100">24%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Tester guides and known-issue process</span><span className="roadmap-percent">12%</span></div><progress className="roadmap-progress" value="12" max="100">12%</progress></div>
    <div className="roadmap-subtask"><div className="roadmap-subtask__top"><span className="roadmap-subtask__label">Invitation-wave operations</span><span className="roadmap-percent">0%</span></div><progress className="roadmap-progress" value="0" max="100">0%</progress></div>
  </div>
  <div className="roadmap-workstream-detail">
    <section><h3>Release preparation</h3><ul><li>Protect account communication, secrets and administrative boundaries.</li><li>Freeze and identify the beta player-data structure.</li><li>Test upgrades, rollback, backup, restoration and account recovery.</li><li>Produce identifiable packages with integrity verification and useful diagnostics.</li><li>Publish installation, controls, known-issue, privacy and tester-support guidance.</li></ul></section>
    <section><h3>Test sequence</h3><ol><li><strong>Team qualification:</strong> clean installation, account journeys and recovery drills.</li><li><strong>Small invitation wave:</strong> installation, login, crashes and progression blockers.</li><li><strong>Gameplay wave:</strong> shared play, communication, services, quests and transitions.</li><li><strong>Stability confirmation:</strong> feature freeze, complete checks, upgrade and rollback.</li></ol></section>
    <section className="roadmap-gate"><h3>Entry gate</h3><ul><li>No known account bypass, duplication path or unrecoverable character-loss path.</li><li>Every active region and quest has passed release review.</li><li>Monitoring, backup, rollback and tester support are operational.</li><li>The release and its player-data revision are identifiable and recoverable.</li></ul></section>
  </div>
</details>

</div>

## Delivery principles

<div className="roadmap-principles">
  <article><span>01</span><div><strong>Source-faithful experience</strong><p>Characters, controls, world behaviour, interfaces, combat and progression are reconstructed from the available game evidence.</p></div></article>
  <article><span>02</span><div><strong>Authoritative rules</strong><p>Important actions are validated consistently so every player observes the same result.</p></div></article>
  <article><span>03</span><div><strong>Safe progress</strong><p>Character, item, currency and quest progress survives reconnects, maintenance and recoverable failures.</p></div></article>
  <article><span>04</span><div><strong>Careful content</strong><p>Original game assets are not published here. Testers must use an authorised local installation.</p></div></article>
  <article><span>05</span><div><strong>Evidence first</strong><p>A visible feature is not complete until its full interaction and recovery paths have been tested.</p></div></article>
  <article><span>06</span><div><strong>Bounded beta</strong><p>A complete smaller experience is validated before the historical catalogue and new GENESIS content expand.</p></div></article>
</div>

## Scope held beyond the first closed beta

The first closed beta deliberately excludes unrestricted public registration,
production-scale discovery, the complete historical map and quest catalogue,
large-scale Ashram warfare, premium billing, private shops, and the full mount
and pet catalogue. New GENESIS regions, mobile releases and optional systems
will expand only after the bounded beta route is stable.

## Public roadmap updates

- Completed tasks require recorded test evidence.
- Failed requirements remain visible until corrected.
- New source discoveries may change scope before implementation begins.
- Updates will not expose private infrastructure, account details, internal
  implementation names or original asset contents.
- Closed-beta dates will be announced only after the entry requirements are met.
