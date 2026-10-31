# English chat and offline administrator commands

All public command names are English ASCII. Existing English source spellings and case remain unchanged. Non-English names are mapped from their verified source handlers. Original bytes remain in build/generated/NativeAdminCommands.json as provenance; those spellings are not exposed in the runtime registry.

## Using administrator commands

Press Enter, click the small whisper recipient field, type `007Qkddkr`, press Tab, and type a Help command. Use `ExHelpGm` for Control commands. The recipient remains selected for subsequent commands. These codes work only in the authenticated offline session; they do not authorize commands on an online server.

Help recipient aliases: `!!@@##$$`, `HelpGm`, `52anwndWjq`. Player handle `1` means your character. Replace `Ashesh` with your exact character name and `ashesh` with your account. Coordinates are native map cells. State-changing commands apply immediately and are saved.

## Implemented commands and examples

| Recipient | Command / arguments | Example | Behavior |
|---|---|---|---|
| `007Qkddkr` | `/stat 1` | `/stat 1` | Inspect the authenticated player status (represented native fields). |
| `007Qkddkr` | `/stat2 1` | `/stat2 1` | Inspect the authenticated player status (represented native fields). |
| `007Qkddkr` | `/stat4 1` | `/stat4 1` | Inspect the authenticated player status (represented native fields). |
| `007Qkddkr` | `/refresh 1` | `/refresh 1` | Rebuild native character status, equipment and passive skills. |
| `007Qkddkr` | `/stat3 1` | `/stat3 1` | Recalculate native weapon damage and equipment points; preserve transient effects. |
| `007Qkddkr` | `/where <character>` | `/where Ashesh` | Inspect the local character position or account. |
| `007Qkddkr` | `/account 1` | `/account 1` | Inspect the local character position or account. |
| `007Qkddkr` | `/whereid <account>` | `/whereid ashesh` | Inspect the local account character position. |
| `007Qkddkr` | `/wheremob <handle>` | `/wheremob 1` | Inspect the player or map actor position. |
| `007Qkddkr` | `/equip 1` | `/equip 1` | Inspect native equipped item IDs, refinement and durability. |
| `007Qkddkr` | `/weapon 1` | `/weapon 1` | Inspect native equipped item IDs, refinement and durability. |
| `007Qkddkr` | `/armor 1` | `/armor 1` | Inspect native equipped item IDs, refinement and durability. |
| `007Qkddkr` | `/pants 1` | `/pants 1` | Inspect native equipped item IDs, refinement and durability. |
| `007Qkddkr` | `/helmet 1` | `/helmet 1` | Inspect native equipped item IDs, refinement and durability. |
| `007Qkddkr` | `/shield 1` | `/shield 1` | Inspect native equipped item IDs, refinement and durability. |
| `007Qkddkr` | `/gloves 1` | `/gloves 1` | Inspect native equipped item IDs, refinement and durability. |
| `007Qkddkr` | `/boots 1` | `/boots 1` | Inspect native equipped item IDs, refinement and durability. |
| `007Qkddkr` | `/MoneyFors838 <positive amount>` | `/MoneyFors838 1000` | Add Rupiahs using IncGold saturation at INT_MAX; persisted. |
| `007Qkddkr` | `/Prana <character> <positive amount>` | `/Prana Ashesh 100` | Award Pranas through native level thresholds; persisted. |
| `007Qkddkr` | `/PreventWhisper ON\|OFF` | `/PreventWhisper ON` | Set or clear the native whisper-block status bit; persisted. |
| `007Qkddkr` | `/ChangeKarma 1 <short value>` | `/ChangeKarma 1 100` | Change native Karma; persisted. |
| `007Qkddkr` | `/ChangeHP 1 <HP>` | `/ChangeHP 1 30` | Set player HP from zero to the current maximum; persisted. |
| `007Qkddkr` | `/mv <cell X> <cell Z>` | `/mv 493 188` | Warp within the current zone to a nearby unblocked cell; persisted. |
| `007Qkddkr` | `/movepc <character> <cell X> <cell Z>` | `/movepc Ashesh 493 188` | Warp the local named character; other players are unavailable. |
| `007Qkddkr` | `/SearchMonsterHandle <monster ID>` | `/SearchMonsterHandle 2001` | Report the first matching live local actor handle. |
| `007Qkddkr` | `/DropItmFors838 <item ID>` | `/DropItmFors838 4001` | Create a ground item with durability10, enhancement+9 and count1 (native test command). |
| `ExHelpGm` | `/DropItemFors838 <item ID>` | `/DropItemFors838 4001` | Create a ground item with indestructible durability25500 and count1. |
| `ExHelpGm` | `/ChangeLevel 1 <level>` | `/ChangeLevel 1 10` | Set a level present in the native table and representable in the player byte; persisted. Source MAX_LEVEL355 is bounded to255 to prevent wrapping. |
| `ExHelpGm` | `/ChangeTrimuriti 1 <0..3>` | `/ChangeTrimuriti 1 1` | Set player Trimurti and rebuild derived status; persisted. |
| `ExHelpGm` | `/ChangeClass 1 <class> <subclass>` | `/ChangeClass 1 0 0` | Set a valid native tribe class profile and rebuild status; persisted. |
| `ExHelpGm` | `/ResetStat 1` | `/ResetStat 1` | Restore the source tribe Chakra allocation and rebuild status; persisted. |
| `ExHelpGm` | `/ResetSkill 1` | `/ResetSkill 1` | Clear learned skills and rebuild native skill points, cooldowns and passives; persisted. |

`/PreventWhisper OFF` enables whispers again. HP must not exceed the current maximum. Class/subclass values must match the tribe; `/ChangeClass 1 0 0` is an example, not a universal class choice. Warp examples use Mandara and require a walkable cell. Level must exist in the table and fit the native player byte (at most255).

`/Money`, `/DropItm`, `/DropItem`, `/LearnSkill` and `/CastSkill` are not enabled aliases. Use the exact spellings above. `/IWantIt` requests event rankings; it does not grant items.

## Ordinary chat commands

| Command | Example | Requirement |
|---|---|---|
| `/all`, `/s` | `/s Hello everyone` | Local say works offline. |
| `/whisper`, `/w` | `/w FriendName Hello` | Requires a connected recipient. V replies to the last received whisper. |
| `/party`, `/g` | `/party Follow me` | Requires party membership and connected group-chat service. |
| `/ashram`, `/guild`, `/gc` | `/guild Hello Ashram` | Guild and Ashram name the same channel; requires membership/service. |
| `/alliance` | `/alliance Ready` | Requires an Ashram alliance and connected service. |
| `/ashrampost` | `/ashrampost Meeting at Mandara` | Requires the announcement service and appropriate authority. |
| `/addfriend` | `/addfriend FriendName` | Requires another available character/address service. |
| `/trade`, `/t` | `/trade` | Requires another selected, connected player. |
| `/broadcastcamera` | `/broadcastcamera` | Toggles optional broadcast camera; requires source preset configuration. |

All/Party/Ashram/Alliance buttons select the outgoing channel. Normal chat uses224 bytes; group chat uses48. Enter focuses chat; Escape leaves input; Up/Down recall ten sent messages. Chat and system histories retain105 entries each. The panel is visible by default without taking keyboard focus. Offline channels with no connected service return an explicit unavailable/non-member message.

## English replacements for source-only commands

These names resolve to source branches, but their server/event/siege/movie operations remain unavailable offline. A translation does not port the service. The examples below are source argument-order guides, not working offline commands. Early-whisper handler names use the local Help recipient to return an explicit unavailable result.

| English name | Source lines | Source-only example | Source behavior |
|---|---|---|---|
| `/ChangeCaste` | 19672 | `/ChangeCaste 1 3` | Change the selected player caste and recalculate caste skill points. |
| `/SetQuestEvent` | 19684, 22438 | `/SetQuestEvent 1 1 0` | Set one of the selected player event flags and its parameter. |
| `/SiegeSymbols` | 20058 | `/SiegeSymbols 1 1` | Install siege symbols with 1, or destroy them with 0; movie build branch. |
| `/RobotDirection` | 20063 | `/RobotDirection 1 0` | Set the direction of the selected player robots; movie build branch. |
| `/ArrangeRobotsHorizontal` | 20078 | `/ArrangeRobotsHorizontal 1 476 367 8` | Arrange robots in horizontal rows from X/Z with the supplied length. |
| `/ArrangeRobotsVertical` | 20100 | `/ArrangeRobotsVertical 1 476 367 8` | Arrange robots in vertical columns from X/Z with the supplied length. |
| `/RobotFollow` | 20122 | `/RobotFollow 1 1` | Set or clear the robot follow-AI flag; movie build branch. |
| `/SiegeDateReservations` | 21923 | `/SiegeDateReservations 1` | Inspect the five siege-date reservation counters. |
| `/SelectSiegeDate` | 21930 | `/SelectSiegeDate 1 0` | Call the siege date-selection service. |
| `/SiegeStatus` | 21938 | `/SiegeStatus 1` | Reserved native siege-status branch; the source only formats a response. |
| `/DumpSiegeEntries` | 21942 | `/DumpSiegeEntries 1 siege.dat` | Save the siege entry data using the supplied filename. |
| `/ReloadSiegeEntries` | 21947 | `/ReloadSiegeEntries 1` | Reinitialize and reload siege data. |
| `/ApplySiege` | 22038 | `/ApplySiege 1 0` | Apply the selected player guild to a siege slot and validate the fee. |
| `/CheckSiegeApplication` | 22096 | `/CheckSiegeApplication 1 1` | Inspect the specified player guild siege entry. |
| `/CloseSiegeApplications` | 22112 | `/CloseSiegeApplications 1 1` | Set the siege application-expiry flag. |
| `/SetSiegeStarted` | 22117 | `/SetSiegeStarted 1 1` | Set the siege started flag. |
| `/ChangeClan` | 22122 | `/ChangeClan 1 1 1` | Change the specified player clan value and send its notification. |
| `/SiegeSymbolStatus` | 22142 | `/SiegeSymbolStatus 1` | Print siege symbol status through the siege service. |
| `/SiegeEntries` | 22147 | `/SiegeEntries 1 0 0` | Read eight siege entries from the specified clan slot and page. |
| `/RunNpcEvent` | 22170 | `/RunNpcEvent 1` | Invoke the source NPC1106 initialization event. |
| `/ChangeGod` | 8129 | `Unavailable offline; no runnable example` | Custom Trimurti selection/change service. |
| `/GraduationGift` | 8241 | `Unavailable offline; no runnable example` | Custom level140 graduation reward service. |
| `/ClaimCompensation` | 8296 | `Unavailable offline; no runnable example` | Custom level110/120 compensation reward service. |
| `/AdvancedArmorExchange` | 8316 | `Unavailable offline; no runnable example` | Custom armor exchange with currency, Brahman and inventory requirements. |
| `/ChallengeExchange` | 8378 | `Unavailable offline; no runnable example` | Custom equipment challenge exchange requiring Brahman points. |
| `/StretchQuest` | 8452 | `Unavailable offline; no runnable example` | Custom level80 quest93 inventory exchange. |
| `/FaithExchange` | 8832 | `Unavailable offline; no runnable example` | Custom faith exchange with Brahman and inventory requirements. |
| `/Love106Exchange` | 8943 | `Unavailable offline; no runnable example` | Custom zone1 inventory exchange. |
| `/NewWeaponExchange` | 9049 | `Unavailable offline; no runnable example` | Custom weapon exchange requiring Brahman and inventory requirements. |
| `/ArmorExchange` | 9142 | `Unavailable offline; no runnable example` | Custom armor exchange with a two-million Rupiah requirement. |
| `/WeaponExchange` | 9201 | `Unavailable offline; no runnable example` | Custom weapon exchange with a two-million Rupiah requirement. |
| `/SecondClass` | 9254 | `Unavailable offline; no runnable example` | Custom second-class selection; requires the original class-name argument and service. |
| `/SetMuscle` | 9313 | `Unavailable offline; no runnable example` | Custom Muscle allocation service with tribe-specific lower bounds. |
| `/SetNerve` | 9337 | `Unavailable offline; no runnable example` | Custom Nerve allocation service with tribe-specific lower bounds. |
| `/SetHeart` | 9361 | `Unavailable offline; no runnable example` | Custom Heart allocation service with tribe-specific lower bounds. |
| `/SetMind` | 9385 | `Unavailable offline; no runnable example` | Custom Mind allocation service with tribe-specific lower bounds. |

## Complete English source inventory

Unavailable commands require unported services and return an error. Movie commands have no secret-whisper entry in the selected source. Non-English aliases are deduplicated under English names; raw-byte provenance stays in the generated JSON.

| Source parser | English command | Source line | Offline status |
|---|---|---:|---|
| HelpGameMaster | `/SearchRentalStockItem` | 19595 | Unavailable |
| HelpGameMaster | `/Quiz` | 19629 | Unavailable |
| HelpGameMaster | `/RefreshQuiz` | 19640 | Unavailable |
| HelpGameMaster | `/stat` | 19647 | Implemented |
| HelpGameMaster | `/ChangeCaste` | 19672 | Unavailable |
| HelpGameMaster | `/SetQuestEvent` | 19684 | Unavailable |
| HelpGameMaster | `/stat2` | 19697 | Implemented |
| HelpGameMaster | `/stat3` | 19719 | Implemented |
| HelpGameMaster | `/stat4` | 19739 | Implemented |
| HelpGameMaster | `/refresh` | 19754 | Implemented |
| HelpGameMaster | `/mv` | 19779 | Implemented |
| HelpGameMaster | `/movepc` | 19806 | Implemented |
| HelpGameMaster | `/moveother` | 19849 | Unavailable |
| HelpGameMaster | `/mvzone2` | 19896 | Unavailable |
| HelpGameMaster | `/mvzone` | 19911 | Unavailable |
| HelpGameMaster | `/hold` | 19959 | Unavailable |
| HelpGameMaster | `/follow` | 19988 | Unavailable |
| HelpGameMaster | `/buffer` | 20009 | Unavailable |
| HelpGameMaster | `/speed` | 20036 | Unavailable |
| HelpGameMaster | `/SiegeSymbols` | 20058 | Unavailable |
| HelpGameMaster | `/RobotDirection` | 20063 | Unavailable |
| HelpGameMaster | `/ArrangeRobotsHorizontal` | 20078 | Unavailable |
| HelpGameMaster | `/ArrangeRobotsVertical` | 20100 | Unavailable |
| HelpGameMaster | `/RobotFollow` | 20122 | Unavailable |
| HelpGameMaster | `/robot` | 20131 | Unavailable |
| HelpGameMaster | `/a` | 20214 | Unavailable |
| HelpGameMaster | `/f` | 20227 | Unavailable |
| HelpGameMaster | `/summon` | 20242 | Unavailable |
| HelpGameMaster | `/summontest` | 20264 | Unavailable |
| HelpGameMaster | `/summon2` | 20336 | Unavailable |
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
| HelpGameMaster | `/kickout` | 20588 | Unavailable |
| HelpGameMaster | `/where` | 20619 | Implemented |
| HelpGameMaster | `/whereid` | 20634 | Implemented |
| HelpGameMaster | `/wheremob` | 20649 | Implemented |
| HelpGameMaster | `/equip` | 20663 | Implemented |
| HelpGameMaster | `/weapon` | 20697 | Implemented |
| HelpGameMaster | `/armor` | 20722 | Implemented |
| HelpGameMaster | `/pants` | 20747 | Implemented |
| HelpGameMaster | `/helmet` | 20772 | Implemented |
| HelpGameMaster | `/shield` | 20797 | Implemented |
| HelpGameMaster | `/gloves` | 20822 | Implemented |
| HelpGameMaster | `/boots` | 20847 | Implemented |
| HelpGameMaster | `/JudgeSurvival` | 20872 | Unavailable |
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
| HelpGameMaster | `/TriggerEvent` | 21320 | Unavailable |
| HelpGameMaster | `/attack` | 21329 | Unavailable |
| HelpGameMaster | `/attack2` | 21342 | Unavailable |
| HelpGameMaster | `/ukillmonster` | 21369 | Unavailable |
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
| HelpGameMaster | `/SiegeDateReservations` | 21923 | Unavailable |
| HelpGameMaster | `/SelectSiegeDate` | 21930 | Unavailable |
| HelpGameMaster | `/SiegeStatus` | 21938 | Unavailable |
| HelpGameMaster | `/DumpSiegeEntries` | 21942 | Unavailable |
| HelpGameMaster | `/ReloadSiegeEntries` | 21947 | Unavailable |
| HelpGameMaster | `/ChangeClanForSiege` | 21953 | Unavailable |
| HelpGameMaster | `/InsertToSiegeEntry` | 22013 | Unavailable |
| HelpGameMaster | `/RemoveSiegeEntry` | 22024 | Unavailable |
| HelpGameMaster | `/RefreshEntry` | 22033 | Unavailable |
| HelpGameMaster | `/ApplySiege` | 22038 | Unavailable |
| HelpGameMaster | `/CheckSiegeApplication` | 22096 | Unavailable |
| HelpGameMaster | `/CloseSiegeApplications` | 22112 | Unavailable |
| HelpGameMaster | `/SetSiegeStarted` | 22117 | Unavailable |
| HelpGameMaster | `/ChangeClan` | 22122 | Unavailable |
| HelpGameMaster | `/SiegeSymbolStatus` | 22142 | Unavailable |
| HelpGameMaster | `/SiegeEntries` | 22147 | Unavailable |
| HelpGameMaster | `/RunNpcEvent` | 22170 | Unavailable |
| ExecuteGMCommand2nd | `/SearchRentalStockItem` | 22344 | Unavailable |
| ExecuteGMCommand2nd | `/Quiz` | 22383 | Unavailable |
| ExecuteGMCommand2nd | `/RefreshQuiz` | 22394 | Unavailable |
| ExecuteGMCommand2nd | `/stat` | 22401 | Unavailable |
| ExecuteGMCommand2nd | `/SetQuestEvent` | 22438 | Unavailable |
| ExecuteGMCommand2nd | `/stat2` | 22451 | Unavailable |
| ExecuteGMCommand2nd | `/stat3` | 22473 | Unavailable |
| ExecuteGMCommand2nd | `/stat4` | 22493 | Unavailable |
| ExecuteGMCommand2nd | `/refresh` | 22508 | Unavailable |
| ExecuteGMCommand2nd | `/mv` | 22533 | Unavailable |
| ExecuteGMCommand2nd | `/movepc` | 22560 | Unavailable |
| ExecuteGMCommand2nd | `/moveother` | 22603 | Unavailable |
| ExecuteGMCommand2nd | `/mvzone2` | 22650 | Unavailable |
| ExecuteGMCommand2nd | `/mvzone` | 22665 | Unavailable |
| ExecuteGMCommand2nd | `/hold` | 22713 | Unavailable |
| ExecuteGMCommand2nd | `/follow` | 22742 | Unavailable |
| ExecuteGMCommand2nd | `/speed` | 22790 | Unavailable |
| ExecuteGMCommand2nd | `/summon` | 22811 | Unavailable |
| ExecuteGMCommand2nd | `/summon2` | 22833 | Unavailable |
| ExecuteGMCommand2nd | `/summon3` | 22903 | Unavailable |
| ExecuteGMCommand2nd | `/summonpet` | 22919 | Unavailable |
| ExecuteGMCommand2nd | `/summonInteractor` | 22932 | Unavailable |
| ExecuteGMCommand2nd | `/army` | 22970 | Unavailable |
| ExecuteGMCommand2nd | `/releaseArmy` | 23024 | Unavailable |
| ExecuteGMCommand2nd | `/account` | 23039 | Unavailable |
| ExecuteGMCommand2nd | `/atk` | 23050 | Unavailable |
| ExecuteGMCommand2nd | `/truesight` | 23072 | Unavailable |
| ExecuteGMCommand2nd | `/kickout` | 23085 | Unavailable |
| ExecuteGMCommand2nd | `/where` | 23113 | Unavailable |
| ExecuteGMCommand2nd | `/whereid` | 23128 | Unavailable |
| ExecuteGMCommand2nd | `/wheremob` | 23143 | Unavailable |
| ExecuteGMCommand2nd | `/equip` | 23157 | Unavailable |
| ExecuteGMCommand2nd | `/weapon` | 23191 | Unavailable |
| ExecuteGMCommand2nd | `/armor` | 23216 | Unavailable |
| ExecuteGMCommand2nd | `/pants` | 23241 | Unavailable |
| ExecuteGMCommand2nd | `/helmet` | 23266 | Unavailable |
| ExecuteGMCommand2nd | `/shield` | 23291 | Unavailable |
| ExecuteGMCommand2nd | `/gloves` | 23316 | Unavailable |
| ExecuteGMCommand2nd | `/boots` | 23341 | Unavailable |
| ExecuteGMCommand2nd | `/sp` | 23513 | Unavailable |
| ExecuteGMCommand2nd | `/attack` | 23532 | Unavailable |
| ExecuteGMCommand2nd | `/attack2` | 23545 | Unavailable |
| ExecuteGMCommand2nd | `/killmonster` | 23572 | Unavailable |
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
| WhisperHandler | `/iwantsave` | 8109 | Unavailable |
| WhisperHandler | `/ChangeGod` | 8129 | Unavailable |
| WhisperHandler | `/blessme_ohyeah_990` | 8216 | Unavailable |
| WhisperHandler | `/blessmeoff_ohyeah_990` | 8228 | Unavailable |
| WhisperHandler | `/GraduationGift` | 8241 | Unavailable |
| WhisperHandler | `/ClaimCompensation` | 8296 | Unavailable |
| WhisperHandler | `/AdvancedArmorExchange` | 8316 | Unavailable |
| WhisperHandler | `/ChallengeExchange` | 8378 | Unavailable |
| WhisperHandler | `/StretchQuest` | 8452 | Unavailable |
| WhisperHandler | `/FaithExchange` | 8832 | Unavailable |
| WhisperHandler | `/Love106Exchange` | 8943 | Unavailable |
| WhisperHandler | `/NewWeaponExchange` | 9049 | Unavailable |
| WhisperHandler | `/ArmorExchange` | 9142 | Unavailable |
| WhisperHandler | `/WeaponExchange` | 9201 | Unavailable |
| WhisperHandler | `/SecondClass` | 9254 | Unavailable |
| WhisperHandler | `/SetMuscle` | 9313 | Unavailable |
| WhisperHandler | `/SetNerve` | 9337 | Unavailable |
| WhisperHandler | `/SetHeart` | 9361 | Unavailable |
| WhisperHandler | `/SetMind` | 9385 | Unavailable |

Source: Tantra/zone/Server.cpp; SHA256 `6639ca68a1e18c121e1e8a60fd2c7bbdd8f07b1d73540f645509e58ad9b6da7a`. Native parser inventory: 287 entries plus 19 early-whisper branches. Runtime registry: 201 deduplicated English entries.
