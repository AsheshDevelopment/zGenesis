# Native whisper commands

Verified against the compiled `Tantra/zone/Server.cpp`. `AdministrateGame.cpp` is an older reference and is not used to invent aliases. Commented command branches are excluded. Native tokens and argument case are preserved.

In the offline client, press Enter to open chat, click the small whisper recipient box, type `007Qkddkr`, then Tab into the message box and enter a command. Use `ExHelpGm` for ControlSystem commands. `!!@@##$$`, `HelpGm` and `52anwndWjq` are source HelpGameMaster recipient aliases. The selected source comments out these dispatch calls; this port deliberately restores them for the authenticated local offline session only. The source limits HelpGm/ExHelpGm to Korea, 52anwndWjq to Japan, and !!@@##$$ to test group0; the local offline operator adapter accepts these source aliases independently of region. It does not change the character into a GM or send anything to another server.

The local player handle is **1**. Native actor handles are reported by `/SearchMonsterHandle`. Numeric values are checked for malformed input and overflow. Unavailable operations return an explicit error without modifying data. Ordinary chat commands remain separate.

## Implemented offline commands

| Command / arguments | Behavior |
|---|---|
| `/stat 1` | 007Qkddkr: Inspect the authenticated player status (represented native fields). |
| `/stat2 1` | 007Qkddkr: Inspect the authenticated player status (represented native fields). |
| `/stat4 1` | 007Qkddkr: Inspect the authenticated player status (represented native fields). |
| `/refresh 1` | 007Qkddkr: Rebuild native character status, equipment and passive skills. |
| `/stat3 1` | 007Qkddkr: Recalculate native weapon damage and equipment points; preserve transient effects. |
| `/where <character>` | 007Qkddkr: Inspect the local character position or account. |
| `/account 1` | 007Qkddkr: Inspect the local character position or account. |
| `/whereid <account>` | 007Qkddkr: Inspect the local account character position. |
| `/wheremob <handle>` | 007Qkddkr: Inspect the player or map actor position. |
| `/equip 1` | 007Qkddkr: Inspect native equipped item IDs, refinement and durability. |
| `/weapon 1` | 007Qkddkr: Inspect native equipped item IDs, refinement and durability. |
| `/armor 1` | 007Qkddkr: Inspect native equipped item IDs, refinement and durability. |
| `/pants 1` | 007Qkddkr: Inspect native equipped item IDs, refinement and durability. |
| `/helmet 1` | 007Qkddkr: Inspect native equipped item IDs, refinement and durability. |
| `/shield 1` | 007Qkddkr: Inspect native equipped item IDs, refinement and durability. |
| `/gloves 1` | 007Qkddkr: Inspect native equipped item IDs, refinement and durability. |
| `/boots 1` | 007Qkddkr: Inspect native equipped item IDs, refinement and durability. |
| `/MoneyFors838 <positive amount>` | 007Qkddkr: Add Rupiahs using IncGold saturation at INT_MAX; persisted. |
| `/Prana <character> <positive amount>` | 007Qkddkr: Award Pranas through native level thresholds; persisted. |
| `/PreventWhisper ON\|OFF` | 007Qkddkr: Set or clear the native whisper-block status bit; persisted. |
| `/ChangeKarma 1 <short value>` | 007Qkddkr: Change native Karma; persisted. |
| `/ChangeHP 1 <HP>` | 007Qkddkr: Set player HP from zero to the current maximum; persisted. |
| `/mv <cell X> <cell Z>` | 007Qkddkr: Warp within the current zone to a nearby unblocked cell; persisted. |
| `/movepc <character> <cell X> <cell Z>` | 007Qkddkr: Warp the local named character; other players are unavailable. |
| `/SearchMonsterHandle <monster ID>` | 007Qkddkr: Report the first matching live local actor handle. |
| `/DropItmFors838 <item ID>` | 007Qkddkr: Create a ground item with durability10, enhancement+9 and count1 (native test command). |
| `/DropItemFors838 <item ID>` | ExHelpGm: Create a ground item with indestructible durability25500 and count1. |
| `/ChangeLevel 1 <level>` | ExHelpGm: Set a level present in the native table and representable in the player byte; persisted. Source MAX_LEVEL355 is bounded to255 to prevent wrapping. |
| `/ChangeTrimuriti 1 <0..3>` | ExHelpGm: Set player Trimurti and rebuild derived status; persisted. |
| `/ChangeClass 1 <class> <subclass>` | ExHelpGm: Set a valid native tribe class profile and rebuild status; persisted. |
| `/ResetStat 1` | ExHelpGm: Restore the source tribe Chakra allocation and rebuild status; persisted. |
| `/ResetSkill 1` | ExHelpGm: Clear learned skills and rebuild native skill points, cooldowns and passives; persisted. |

`/Money`, `/DropItm` and `/DropItem` are older-source spellings, not aliases of the selected source. Use the exact `Fors838` spellings below. `/IWantIt` requests event rankings; it does not grant items. `/LearnSkill` and `/CastSkill` are commented out in the native GM parser.

## Complete source inventory

The lists include aliases and the Japan-only reduced parser. “Unavailable” means the corresponding shared server, event, siege, party, raw-table editing or movie service has not been ported; it is not a successful no-op. The movie parser has no secret-whisper entry in the selected handler. Korean tokens retain their original CP949 bytes in the generated C++ inventory and JSON provenance.

| Parser | Command | Source line | Offline status |
|---|---|---:|---|
| HelpGameMaster | `/SearchRentalStockItem` | 19595 | Unavailable |
| HelpGameMaster | `/Quiz` | 19629 | Unavailable |
| HelpGameMaster | `/RefreshQuiz` | 19640 | Unavailable |
| HelpGameMaster | `/stat` | 19647 | Implemented |
| HelpGameMaster | `/스탯` | 19647 | Implemented |
| HelpGameMaster | `/카스트` | 19672 | Unavailable |
| HelpGameMaster | `/이벤트발동` | 19684 | Unavailable |
| HelpGameMaster | `/stat2` | 19697 | Implemented |
| HelpGameMaster | `/stat3` | 19719 | Implemented |
| HelpGameMaster | `/stat4` | 19739 | Implemented |
| HelpGameMaster | `/refresh` | 19754 | Implemented |
| HelpGameMaster | `/재스탯` | 19754 | Implemented |
| HelpGameMaster | `/mv` | 19779 | Implemented |
| HelpGameMaster | `/이` | 19779 | Implemented |
| HelpGameMaster | `/movepc` | 19806 | Implemented |
| HelpGameMaster | `/소환` | 19806 | Implemented |
| HelpGameMaster | `/moveother` | 19849 | Unavailable |
| HelpGameMaster | `/mvzone2` | 19896 | Unavailable |
| HelpGameMaster | `/존이동2` | 19896 | Unavailable |
| HelpGameMaster | `/mvzone` | 19911 | Unavailable |
| HelpGameMaster | `/존이동` | 19911 | Unavailable |
| HelpGameMaster | `/hold` | 19959 | Unavailable |
| HelpGameMaster | `/정지` | 19959 | Unavailable |
| HelpGameMaster | `/follow` | 19988 | Unavailable |
| HelpGameMaster | `/buffer` | 20009 | Unavailable |
| HelpGameMaster | `/speed` | 20036 | Unavailable |
| HelpGameMaster | `/스피드` | 20036 | Unavailable |
| HelpGameMaster | `/공성상징물` | 20058 | Unavailable |
| HelpGameMaster | `/방향전환` | 20063 | Unavailable |
| HelpGameMaster | `/가로정렬` | 20078 | Unavailable |
| HelpGameMaster | `/세로정렬` | 20100 | Unavailable |
| HelpGameMaster | `/로봇이동` | 20122 | Unavailable |
| HelpGameMaster | `/robot` | 20131 | Unavailable |
| HelpGameMaster | `/a` | 20214 | Unavailable |
| HelpGameMaster | `/로봇공격` | 20214 | Unavailable |
| HelpGameMaster | `/f` | 20227 | Unavailable |
| HelpGameMaster | `/로봇멈춤` | 20227 | Unavailable |
| HelpGameMaster | `/summon` | 20242 | Unavailable |
| HelpGameMaster | `/summontest` | 20264 | Unavailable |
| HelpGameMaster | `/summon2` | 20336 | Unavailable |
| HelpGameMaster | `/서` | 20336 | Unavailable |
| HelpGameMaster | `/summon3` | 20406 | Unavailable |
| HelpGameMaster | `/summonpet` | 20422 | Unavailable |
| HelpGameMaster | `/summonInteractor` | 20435 | Unavailable |
| HelpGameMaster | `/height` | 20449 | Unavailable |
| HelpGameMaster | `/SetHeight` | 20465 | Unavailable |
| HelpGameMaster | `/army` | 20473 | Unavailable |
| HelpGameMaster | `/releaseArmy` | 20527 | Unavailable |
| HelpGameMaster | `/account` | 20542 | Implemented |
| HelpGameMaster | `/atk` | 20553 | Unavailable |
| HelpGameMaster | `/truesight` | 20575 | Unavailable |
| HelpGameMaster | `/투시` | 20575 | Unavailable |
| HelpGameMaster | `/강퇴` | 20588 | Unavailable |
| HelpGameMaster | `/kickout` | 20588 | Unavailable |
| HelpGameMaster | `/위치` | 20619 | Implemented |
| HelpGameMaster | `/where` | 20619 | Implemented |
| HelpGameMaster | `/whereid` | 20634 | Implemented |
| HelpGameMaster | `/wheremob` | 20649 | Implemented |
| HelpGameMaster | `/equip` | 20663 | Implemented |
| HelpGameMaster | `/장비` | 20663 | Implemented |
| HelpGameMaster | `/weapon` | 20697 | Implemented |
| HelpGameMaster | `/무기` | 20697 | Implemented |
| HelpGameMaster | `/armor` | 20722 | Implemented |
| HelpGameMaster | `/갑옷` | 20722 | Implemented |
| HelpGameMaster | `/pants` | 20747 | Implemented |
| HelpGameMaster | `/바지` | 20747 | Implemented |
| HelpGameMaster | `/helmet` | 20772 | Implemented |
| HelpGameMaster | `/투구` | 20772 | Implemented |
| HelpGameMaster | `/shield` | 20797 | Implemented |
| HelpGameMaster | `/방패` | 20797 | Implemented |
| HelpGameMaster | `/gloves` | 20822 | Implemented |
| HelpGameMaster | `/장갑` | 20822 | Implemented |
| HelpGameMaster | `/boots` | 20847 | Implemented |
| HelpGameMaster | `/신발` | 20847 | Implemented |
| HelpGameMaster | `/JudgeSurvival` | 20872 | Unavailable |
| HelpGameMaster | `/서바이벌판정` | 20872 | Unavailable |
| HelpGameMaster | `/ChangeAttackArmorType` | 20887 | Unavailable |
| HelpGameMaster | `/Bless` | 20899 | Unavailable |
| HelpGameMaster | `/ChangeHP` | 20937 | Implemented |
| HelpGameMaster | `/SearchMonsterHandle` | 20946 | Implemented |
| HelpGameMaster | `/PrintMonsterStat` | 20965 | Unavailable |
| HelpGameMaster | `/PrintMonsterData` | 20983 | Unavailable |
| HelpGameMaster | `/RecordMonsterData` | 21001 | Unavailable |
| HelpGameMaster | `/PrintMonsterStatus` | 21045 | Unavailable |
| HelpGameMaster | `/PrintMonsterMode` | 21076 | Unavailable |
| HelpGameMaster | `/checkmonster` | 21083 | Unavailable |
| HelpGameMaster | `/printkalacoreinfo` | 21119 | Unavailable |
| HelpGameMaster | `/removekalacore` | 21127 | Unavailable |
| HelpGameMaster | `/dropkalacore` | 21140 | Unavailable |
| HelpGameMaster | `/KickOutAllPlayers` | 21171 | Unavailable |
| HelpGameMaster | `/CountMonster` | 21200 | Unavailable |
| HelpGameMaster | `/KillMonsterAll` | 21217 | Unavailable |
| HelpGameMaster | `/KillClanMonster` | 21229 | Unavailable |
| HelpGameMaster | `/sp` | 21309 | Unavailable |
| HelpGameMaster | `/말` | 21309 | Unavailable |
| HelpGameMaster | `/TriggerEvent` | 21320 | Unavailable |
| HelpGameMaster | `/attack` | 21329 | Unavailable |
| HelpGameMaster | `/공격` | 21329 | Unavailable |
| HelpGameMaster | `/attack2` | 21342 | Unavailable |
| HelpGameMaster | `/공격2` | 21342 | Unavailable |
| HelpGameMaster | `/ukillmonster` | 21369 | Unavailable |
| HelpGameMaster | `/킬몬` | 21369 | Unavailable |
| HelpGameMaster | `/CountPartyMember` | 21387 | Unavailable |
| HelpGameMaster | `/Log` | 21457 | Unavailable |
| HelpGameMaster | `/log` | 21457 | Unavailable |
| HelpGameMaster | `/ChangeIntervalHackCount` | 21484 | Unavailable |
| HelpGameMaster | `/ChangeHeightSetting` | 21490 | Unavailable |
| HelpGameMaster | `/logx` | 21497 | Unavailable |
| HelpGameMaster | `/logimmu` | 21530 | Unavailable |
| HelpGameMaster | `/SwitchOffEvent` | 21572 | Unavailable |
| HelpGameMaster | `/SwitchOnEvent` | 21584 | Unavailable |
| HelpGameMaster | `/eventlog` | 21596 | Unavailable |
| HelpGameMaster | `/contactnpclog` | 21605 | Unavailable |
| HelpGameMaster | `/recoverkalasystem` | 21629 | Unavailable |
| HelpGameMaster | `/DecPrana` | 21635 | Unavailable |
| HelpGameMaster | `/ChangeKarma` | 21671 | Implemented |
| HelpGameMaster | `/PrintRwdCorrect` | 21686 | Unavailable |
| HelpGameMaster | `/ChangeRwdCorrect` | 21695 | Unavailable |
| HelpGameMaster | `/kickouto` | 21706 | Unavailable |
| HelpGameMaster | `/kickoutx` | 21711 | Unavailable |
| HelpGameMaster | `/RefiningRate` | 21716 | Unavailable |
| HelpGameMaster | `/MoneyFors838` | 21737 | Implemented |
| HelpGameMaster | `/Prana` | 21742 | Implemented |
| HelpGameMaster | `/PreventWhisper` | 21749 | Implemented |
| HelpGameMaster | `/LogDump` | 21774 | Unavailable |
| HelpGameMaster | `/MSGLogDump` | 21779 | Unavailable |
| HelpGameMaster | `/Exchange` | 21788 | Unavailable |
| HelpGameMaster | `/DropItmFors838` | 21796 | Implemented |
| HelpGameMaster | `/Card` | 21819 | Unavailable |
| HelpGameMaster | `/Dress` | 21830 | Unavailable |
| HelpGameMaster | `/Connect` | 21838 | Unavailable |
| HelpGameMaster | `/View` | 21862 | Unavailable |
| HelpGameMaster | `/IWantIt` | 21875 | Unavailable |
| HelpGameMaster | `/Report` | 21891 | Unavailable |
| HelpGameMaster | `/yutbet` | 21911 | Unavailable |
| HelpGameMaster | `/yutmoney` | 21918 | Unavailable |
| HelpGameMaster | `/공성날짜예약상황확인` | 21923 | Unavailable |
| HelpGameMaster | `/공성날짜결정` | 21930 | Unavailable |
| HelpGameMaster | `/공성상태` | 21938 | Unavailable |
| HelpGameMaster | `/dump공성엔트리` | 21942 | Unavailable |
| HelpGameMaster | `/reload공성엔트리` | 21947 | Unavailable |
| HelpGameMaster | `/ChangeClanForSiege` | 21953 | Unavailable |
| HelpGameMaster | `/InsertToSiegeEntry` | 22013 | Unavailable |
| HelpGameMaster | `/RemoveSiegeEntry` | 22024 | Unavailable |
| HelpGameMaster | `/RefreshEntry` | 22033 | Unavailable |
| HelpGameMaster | `/공성신청` | 22038 | Unavailable |
| HelpGameMaster | `/공성참가확인` | 22096 | Unavailable |
| HelpGameMaster | `/공성신청마감` | 22112 | Unavailable |
| HelpGameMaster | `/공성전설정` | 22117 | Unavailable |
| HelpGameMaster | `/클랜변경` | 22122 | Unavailable |
| HelpGameMaster | `/공성상징물상태` | 22142 | Unavailable |
| HelpGameMaster | `/공성엔트리확인` | 22147 | Unavailable |
| HelpGameMaster | `/이벤트` | 22170 | Unavailable |
| ExecuteGMCommand2nd | `/SearchRentalStockItem` | 22344 | Unavailable |
| ExecuteGMCommand2nd | `/Quiz` | 22383 | Unavailable |
| ExecuteGMCommand2nd | `/RefreshQuiz` | 22394 | Unavailable |
| ExecuteGMCommand2nd | `/stat` | 22401 | Unavailable |
| ExecuteGMCommand2nd | `/스탯` | 22401 | Unavailable |
| ExecuteGMCommand2nd | `/이벤트발동` | 22438 | Unavailable |
| ExecuteGMCommand2nd | `/stat2` | 22451 | Unavailable |
| ExecuteGMCommand2nd | `/stat3` | 22473 | Unavailable |
| ExecuteGMCommand2nd | `/stat4` | 22493 | Unavailable |
| ExecuteGMCommand2nd | `/refresh` | 22508 | Unavailable |
| ExecuteGMCommand2nd | `/재스탯` | 22508 | Unavailable |
| ExecuteGMCommand2nd | `/mv` | 22533 | Unavailable |
| ExecuteGMCommand2nd | `/이` | 22533 | Unavailable |
| ExecuteGMCommand2nd | `/movepc` | 22560 | Unavailable |
| ExecuteGMCommand2nd | `/소환` | 22560 | Unavailable |
| ExecuteGMCommand2nd | `/moveother` | 22603 | Unavailable |
| ExecuteGMCommand2nd | `/mvzone2` | 22650 | Unavailable |
| ExecuteGMCommand2nd | `/존이동2` | 22650 | Unavailable |
| ExecuteGMCommand2nd | `/mvzone` | 22665 | Unavailable |
| ExecuteGMCommand2nd | `/존이동` | 22665 | Unavailable |
| ExecuteGMCommand2nd | `/hold` | 22713 | Unavailable |
| ExecuteGMCommand2nd | `/정지` | 22713 | Unavailable |
| ExecuteGMCommand2nd | `/follow` | 22742 | Unavailable |
| ExecuteGMCommand2nd | `/speed` | 22790 | Unavailable |
| ExecuteGMCommand2nd | `/스피드` | 22790 | Unavailable |
| ExecuteGMCommand2nd | `/summon` | 22811 | Unavailable |
| ExecuteGMCommand2nd | `/summon2` | 22833 | Unavailable |
| ExecuteGMCommand2nd | `/서` | 22833 | Unavailable |
| ExecuteGMCommand2nd | `/summon3` | 22903 | Unavailable |
| ExecuteGMCommand2nd | `/summonpet` | 22919 | Unavailable |
| ExecuteGMCommand2nd | `/summonInteractor` | 22932 | Unavailable |
| ExecuteGMCommand2nd | `/army` | 22970 | Unavailable |
| ExecuteGMCommand2nd | `/releaseArmy` | 23024 | Unavailable |
| ExecuteGMCommand2nd | `/account` | 23039 | Unavailable |
| ExecuteGMCommand2nd | `/atk` | 23050 | Unavailable |
| ExecuteGMCommand2nd | `/truesight` | 23072 | Unavailable |
| ExecuteGMCommand2nd | `/투시` | 23072 | Unavailable |
| ExecuteGMCommand2nd | `/강퇴` | 23085 | Unavailable |
| ExecuteGMCommand2nd | `/kickout` | 23085 | Unavailable |
| ExecuteGMCommand2nd | `/위치` | 23113 | Unavailable |
| ExecuteGMCommand2nd | `/where` | 23113 | Unavailable |
| ExecuteGMCommand2nd | `/whereid` | 23128 | Unavailable |
| ExecuteGMCommand2nd | `/wheremob` | 23143 | Unavailable |
| ExecuteGMCommand2nd | `/equip` | 23157 | Unavailable |
| ExecuteGMCommand2nd | `/장비` | 23157 | Unavailable |
| ExecuteGMCommand2nd | `/weapon` | 23191 | Unavailable |
| ExecuteGMCommand2nd | `/무기` | 23191 | Unavailable |
| ExecuteGMCommand2nd | `/armor` | 23216 | Unavailable |
| ExecuteGMCommand2nd | `/갑옷` | 23216 | Unavailable |
| ExecuteGMCommand2nd | `/pants` | 23241 | Unavailable |
| ExecuteGMCommand2nd | `/바지` | 23241 | Unavailable |
| ExecuteGMCommand2nd | `/helmet` | 23266 | Unavailable |
| ExecuteGMCommand2nd | `/투구` | 23266 | Unavailable |
| ExecuteGMCommand2nd | `/shield` | 23291 | Unavailable |
| ExecuteGMCommand2nd | `/방패` | 23291 | Unavailable |
| ExecuteGMCommand2nd | `/gloves` | 23316 | Unavailable |
| ExecuteGMCommand2nd | `/장갑` | 23316 | Unavailable |
| ExecuteGMCommand2nd | `/boots` | 23341 | Unavailable |
| ExecuteGMCommand2nd | `/신발` | 23341 | Unavailable |
| ExecuteGMCommand2nd | `/sp` | 23513 | Unavailable |
| ExecuteGMCommand2nd | `/말` | 23513 | Unavailable |
| ExecuteGMCommand2nd | `/attack` | 23532 | Unavailable |
| ExecuteGMCommand2nd | `/공격` | 23532 | Unavailable |
| ExecuteGMCommand2nd | `/attack2` | 23545 | Unavailable |
| ExecuteGMCommand2nd | `/공격2` | 23545 | Unavailable |
| ExecuteGMCommand2nd | `/killmonster` | 23572 | Unavailable |
| ExecuteGMCommand2nd | `/킬몬` | 23572 | Unavailable |
| ExecuteGMCommand2nd | `/CountPartyMember` | 23590 | Unavailable |
| ExecuteGMCommand2nd | `/Log` | 23602 | Unavailable |
| ExecuteGMCommand2nd | `/log` | 23602 | Unavailable |
| ExecuteGMCommand2nd | `/logx` | 23629 | Unavailable |
| ExecuteGMCommand2nd | `/logimmu` | 23662 | Unavailable |
| ExecuteGMCommand2nd | `/PrintRwdCorrect` | 23758 | Unavailable |
| ExecuteGMCommand2nd | `/kickouto` | 23778 | Unavailable |
| ExecuteGMCommand2nd | `/kickoutx` | 23783 | Unavailable |
| ExecuteGMCommand2nd | `/PreventWhisper` | 23821 | Unavailable |
| ExecuteGMCommand2nd | `/LogDump` | 23846 | Unavailable |
| ExecuteGMCommand2nd | `/MSGLogDump` | 23851 | Unavailable |
| ControlSystem | `/loadfix` | 24322 | Unavailable |
| ControlSystem | `/ChangeRwdCorrect` | 24343 | Unavailable |
| ControlSystem | `/killmonster2` | 24348 | Unavailable |
| ControlSystem | `/cc` | 24366 | Unavailable |
| ControlSystem | `/DropItemFors838` | 24378 | Implemented |
| ControlSystem | `/ChangeImmunity` | 24400 | Unavailable |
| ControlSystem | `/ChangeTrimuriti` | 24408 | Implemented |
| ControlSystem | `/ChangeLevel` | 24422 | Implemented |
| ControlSystem | `/ChangeClass` | 24435 | Implemented |
| ControlSystem | `/ResetStat` | 24445 | Implemented |
| ControlSystem | `/ResetSkill` | 24452 | Implemented |
| ControlSystem | `/SwitchOffEvent` | 24459 | Unavailable |
| ControlSystem | `/SwitchOnEvent` | 24471 | Unavailable |
| ControlSystem | `/ChangeEventSetting` | 24483 | Unavailable |
| ControlSystem | `/ChangeEventTask` | 24500 | Unavailable |
| ControlSystem | `/ChangeEventTask2` | 24519 | Unavailable |
| ControlSystem | `/ChangeTaskSetting` | 24535 | Unavailable |
| ControlSystem | `/ChangeTaskSetting2` | 24554 | Unavailable |
| ControlSystem | `/ChangeEvent` | 24571 | Unavailable |
| ControlSystem | `/InitEvent` | 24583 | Unavailable |
| ControlSystem | `/AddEventToScheduler` | 24597 | Unavailable |
| ControlSystem | `/RemoveEventAtScheduler` | 24612 | Unavailable |
| ControlSystem | `/ChangeMonsterHP` | 24621 | Unavailable |
| ControlSystem | `/ChangeMonsterImmunity` | 24636 | Unavailable |
| ControlSystem | `/ChangeMonsterARDG` | 24650 | Unavailable |
| ControlSystem | `/ChangeMonsterAC` | 24664 | Unavailable |
| ControlSystem | `/ChangeMonsterMR` | 24677 | Unavailable |
| ControlSystem | `/ChangeMonsterSkillEffect` | 24698 | Unavailable |
| ControlSystem | `/ChangeMonsterSkill` | 24774 | Unavailable |
| ControlSystem | `/ChangeMonsterSight` | 24796 | Unavailable |
| ControlSystem | `/ChangeMonsterPopDelay` | 24812 | Unavailable |
| ControlSystem | `/ChangeItemCP` | 24828 | Unavailable |
| ControlSystem | `/ChangeItemEffect` | 24841 | Unavailable |
| ControlSystem | `/ChangeSkillCP` | 24856 | Unavailable |
| ControlSystem | `/ChangeMonsterSkillCP` | 24873 | Unavailable |
| ControlSystem | `/offcsh` | 24888 | Unavailable |
| ControlSystem | `/ChangeSpeedFactor` | 24895 | Unavailable |
| ControlSystem | `/LoadSettingAll` | 24909 | Unavailable |
| ControlSystem | `/LoadSettingTxl` | 24916 | Unavailable |
| ControlSystem | `/LoadZoneSetting` | 24921 | Unavailable |
| ControlSystem | `/LoadWorldSetting` | 24926 | Unavailable |
| ControlSystem | `/ChangeWorldSetting` | 24931 | Unavailable |
| ControlSystem | `/printpos` | 24944 | Unavailable |
| ControlSystem | `/changepos` | 24962 | Unavailable |
| ControlSystem | `/ChangeHalfGrid` | 24985 | Unavailable |
| ControlSystem | `/ChangePopArea` | 24995 | Unavailable |
| AssistPlayMovie | `/nokillall` | 25053 | Unavailable |
| AssistPlayMovie | `/nokill` | 25066 | Unavailable |
| AssistPlayMovie | `/nokill2` | 25082 | Unavailable |
| AssistPlayMovie | `/nostun` | 25098 | Unavailable |
| AssistPlayMovie | `/holdall` | 25110 | Unavailable |
| AssistPlayMovie | `/mvspd` | 25134 | Unavailable |
| AssistPlayMovie | `/killpc` | 25149 | Unavailable |
| AssistPlayMovie | `/killmonsterall` | 25168 | Unavailable |
| AssistPlayMovie | `/hpup` | 25184 | Unavailable |
| AssistPlayMovie | `/loadscene` | 25204 | Unavailable |

## Ordinary chat commands

`/all`, `/s`, `/whisper`, `/w`, `/party`, `/g`, `/ashram`, `/gc`, `/addfriend`, `/ashrampost`, `/trade`, `/t`, plus the corresponding HTMessage localized aliases. Say is local; multiplayer-only channels report their missing offline service. The native optional broadcast camera command remains unchanged.

## Additional whisper-handler commands

These custom commands occur before the GM dispatcher in the selected whisper handler. They are catalogued for completeness and remain unavailable unless explicitly listed as implemented above.

| Token | Exact source bytes (hex) | Source line |
|---|---|---:|
| `/iwantsave` | `2f6977616e7473617665` | 8109 |
| `/瘻��` | `2fd7aac9f1` | 8129 |
| `/blessme_ohyeah_990` | `2f626c6573736d655f6f68796561685f393930` | 8216 |
| `/blessmeoff_ohyeah_990` | `2f626c6573736d656f66665f6f68796561685f393930` | 8228 |
| `/귄撚쟉膠` | `2fb1cfd2b5c0f1ceef` | 8241 |
| `/껸낄寧苟` | `2fb2b9b3a5d2bbcfc2` | 8296 |
| `/乖狼뗑갠쏜陋구` | `2fced2d2aab6c4b0b5bdf0d7b0b1b8` | 8316 |
| `/鯨濫꼇옵콘` | `2fccf4d5bdb2bbbfc9c4dc` | 8378 |
| `/乖狼윗썰` | `2fced2d2aac0adbde4` | 8452 |
| `/솽땍돨斤嵐` | `2fbce1b6a8b5c4d0c5d1f6` | 8832 |
| `/乖갖106` | `2fced2b0ae313036` | 8943 |
| `/乖狼劤嶠포` | `2fced2d2aad0c2cee4c6f7` | 9049 |
| `/乖狼뗑陋구` | `2fced2d2aab6c4d7b0b1b8` | 9142 |
| `/乖狼뗑嶠포` | `2fced2d2aab6c4cee4c6f7` | 9201 |
| `/2瘻` | `2f32d7aa` | 9254 |
| `/샥흄` | `2fbca1c8e2` | 9313 |
| `/�湊�` | `2fc9f1bead` | 9337 |
| `/沂찧` | `2fd1aac2f6` | 9361 |
| `/雷쿡` | `2fd2e2c4ee` | 9385 |

Source SHA-256: `6639ca68a1e18c121e1e8a60fd2c7bbdd8f07b1d73540f645509e58ad9b6da7a`. Generated inventory: 287 entries including aliases and parser duplicates.
