# Native advanced NPC services - 2 November 2026

The requested quest, class and religion continuation is implemented in the C++ zone and the existing BGFX NPC dialogue. Original `Tantra/zone/Quest.cpp` event, dialogue and kill callbacks remain the quest authority. The native client script supplies choices; it cannot grant a class, god, item or reward directly.

| Service | Implemented source behavior |
| --- | --- |
| Initial god selection, 1003 | Level 30, no existing god, free choice of Brahma (1), Vishnu (2) or Shiva (4). |
| God change, 1004 | Existing god, a different valid choice, no guild, god weapon unequipped; costs 100,000,000 Rupiah and one Brahman point. Saved return coordinates use the old god's native spawn area; current position remains unchanged. |
| Offering, 1005 | Existing god, fewer than 100 Brahman points, 50,000 Rupiah and ten units of item 7116. Inventory stacks are consumed together; grant one point. |
| Class service, 1006 | Run the original NPC quest callback and require an actual permitted class transition. Native trial, token, tribe and quest-state conditions remain in force. |
| Second-class dialogue | Original automatic branches and tribe-specific tokens 8055-8062; all eight tribes and sixteen class branches are checked. |
| Later story chains | Connect all sixteen original NPC event bindings 4117-4132 to tasks 10553-10568. Preserve original event/dialogue/kill callbacks. |

`server.cpp:3270` and `server.cpp:3450` define the active religion rules. The population-price formula and historical scroll cost are commented out. No new positive Brahman balance requirement is added: the original change code deducts one point even from zero. NPC types come from the original `HTNPCControl.cpp` type table. Source `GetFunc.cpp` supplies god spawn-area semantics.

The zone validates NPC type, map, distance, life state, trade state, revision and nonce. Successful operations commit before acknowledgement or publication. Repeated requests cannot spend twice. Quest promotions publish native `0x1981` class updates to the owner and nearby players; subsequent guild queries read the committed character. Dialogue replies match both NPC and step before advancing.

The later BukduD party reward now follows `Quest.cpp`: the completing character gets 3,000,000 Prana, party members get 500,000, and the party leader is excluded from that additional member reward. A completing non-leader receives both shares. Long original NPC questions also render without the previous label-length crash.

Verification:

- Release `religion`: selection, split-stack offerings, change costs/save point, replay/stale/wrong-NPC rejection, guild/level/cap checks and reopened state.
- Release `second-class`: eight tribes and sixteen original trial/token branches, skill reset and completed quest state.
- Release `party-story` and `story-event`: original solo/leader/member rewards, promotion publication, replay and reopened native state.
- Packed-data `--npc-services` UI check: original automatic priest branches, god choices and actual change-cost notice.
- Two visible Release clients: real priest selection, offering and god change through SDL clicks; the other client receives its class promotion. Stopped storage reopens with exactly the observed results. Compact results are in [the evidence manifest](evidence/npc-map-backups-20261102.json).

Missing source contract: NPC event 1012, premium second-class reset, sets a confirmation code in the supplied client source but has no corresponding completed response/request path or zone handler. It is explicitly unavailable; no cash charge or packet is invented. This checkpoint does not accept every premium service, every quest's graphical presentation or full MMO parity.

## Native journal and connected workflow follow-up

The real CHTUIQuestWindow journal is in HTInterface.cpp, delegated to by
HTQuest.cpp. HTMessage QuestMessage parameters now populate window 235 from
committed MOB flags: progress, completion, selected details and scrolling.
The connected Vartan reward/journal and guild permissions/persistence workflows
pass; see [the follow-up checkpoint](PROJECTILE_CAVE_RECOVERY.md).
