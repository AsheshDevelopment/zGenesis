# English chat and administrator commands

All public command names are English ASCII. Existing English source spellings and case remain unchanged. Non-English names are mapped from their verified source handlers. Original bytes remain in build/generated/NativeAdminCommands.json as provenance; those spellings are not exposed in the runtime registry.

## Using administrator commands

Type `/erichgwapo` to open the administrator panel. It lists English command names, descriptions, examples and online/offline support, with a search field. The only administrator whisper recipient is the exact, case-sensitive `ASHESHDEV`; both native Help and Control command families use it. All previous administrator recipient codes are rejected.

The recipient is a routing label. Every operation requires an authenticated administrator account (`userLevel == 1`) in the executing authority, including offline mode. Normal characters cannot gain permission by typing the recipient or opening the panel. Help commands retain their five-argument limit; Control commands retain seven. Movie commands remain unavailable through this recipient.

Player handle `1` means your character offline. Online, replace it with your actual current server handle. Replace `Ashesh` with your exact character name and `ashesh` with your account. Online commands can target only your authenticated character. Coordinates are native map cells. State-changing commands are saved by the executing authority.

## Implemented commands and examples

| Recipient | Command / arguments | Example | Behavior | Online |
|---|---|---|---|---|
| `ASHESHDEV` | `/stat 1` | `/stat 1` | Inspect the authenticated player status (represented native fields). | Supported |
| `ASHESHDEV` | `/stat2 1` | `/stat2 1` | Inspect the authenticated player status (represented native fields). | Supported |
| `ASHESHDEV` | `/stat4 1` | `/stat4 1` | Inspect the authenticated player status (represented native fields). | Supported |
| `ASHESHDEV` | `/refresh 1` | `/refresh 1` | Rebuild native character status, equipment and passive skills. | Supported |
| `ASHESHDEV` | `/stat3 1` | `/stat3 1` | Recalculate native weapon damage and equipment points; preserve transient effects. | Supported |
| `ASHESHDEV` | `/where <character>` | `/where Ashesh` | Inspect the local character position or account. | Supported |
| `ASHESHDEV` | `/account 1` | `/account 1` | Inspect the local character position or account. | Supported |
| `ASHESHDEV` | `/whereid <account>` | `/whereid ashesh` | Inspect the local account character position. | Supported |
| `ASHESHDEV` | `/wheremob <handle>` | `/wheremob 1` | Inspect the player or map actor position. | Supported |
| `ASHESHDEV` | `/equip 1` | `/equip 1` | Inspect native equipped item IDs, refinement and durability. | Supported |
| `ASHESHDEV` | `/weapon 1` | `/weapon 1` | Inspect native equipped item IDs, refinement and durability. | Supported |
| `ASHESHDEV` | `/armor 1` | `/armor 1` | Inspect native equipped item IDs, refinement and durability. | Supported |
| `ASHESHDEV` | `/pants 1` | `/pants 1` | Inspect native equipped item IDs, refinement and durability. | Supported |
| `ASHESHDEV` | `/helmet 1` | `/helmet 1` | Inspect native equipped item IDs, refinement and durability. | Supported |
| `ASHESHDEV` | `/shield 1` | `/shield 1` | Inspect native equipped item IDs, refinement and durability. | Supported |
| `ASHESHDEV` | `/gloves 1` | `/gloves 1` | Inspect native equipped item IDs, refinement and durability. | Supported |
| `ASHESHDEV` | `/boots 1` | `/boots 1` | Inspect native equipped item IDs, refinement and durability. | Supported |
| `ASHESHDEV` | `/MoneyFors838 <positive amount>` | `/MoneyFors838 1000` | Add Rupiahs using IncGold saturation at INT_MAX; persisted. | Supported |
| `ASHESHDEV` | `/Prana <character> <positive amount>` | `/Prana Ashesh 100` | Award Pranas through native level thresholds; persisted. | Supported |
| `ASHESHDEV` | `/PreventWhisper ON\|OFF` | `/PreventWhisper ON` | Set or clear the native whisper-block status bit; persisted. | Supported |
| `ASHESHDEV` | `/ChangeKarma 1 <short value>` | `/ChangeKarma 1 100` | Change native Karma; persisted. | Supported |
| `ASHESHDEV` | `/ChangeHP 1 <HP>` | `/ChangeHP 1 30` | Set player HP from zero to the current maximum; persisted. | Supported |
| `ASHESHDEV` | `/mv <cell X> <cell Z>` | `/mv 493 188` | Warp within the current zone to a nearby unblocked cell; persisted. | Supported |
| `ASHESHDEV` | `/movepc <character> <cell X> <cell Z>` | `/movepc Ashesh 493 188` | Warp the local named character; other players are unavailable. | Supported |
| `ASHESHDEV` | `/SearchMonsterHandle <monster ID>` | `/SearchMonsterHandle 2001` | Report the first matching live local actor handle. | Supported |
| `ASHESHDEV` | `/DropItmFors838 <item ID>` | `/DropItmFors838 4001` | Create a ground item with durability10, enhancement+9 and count1 (native test command). | Unavailable |
| `ASHESHDEV` | `/DropItemFors838 <item ID>` | `/DropItemFors838 4001` | Create a ground item with indestructible durability25500 and count1. | Unavailable |
| `ASHESHDEV` | `/ChangeLevel 1 <level>` | `/ChangeLevel 1 10` | Set a level present in the native table and representable in the player byte; persisted. Source MAX_LEVEL355 is bounded to255 to prevent wrapping. | Supported |
| `ASHESHDEV` | `/ChangeTrimuriti 1 <0..3>` | `/ChangeTrimuriti 1 1` | Set player Trimurti and rebuild derived status; persisted. | Supported |
| `ASHESHDEV` | `/ChangeClass 1 <class> <subclass>` | `/ChangeClass 1 0 0` | Set a valid native tribe class profile and rebuild status; persisted. | Supported |
| `ASHESHDEV` | `/ResetStat 1` | `/ResetStat 1` | Restore the source tribe Chakra allocation and rebuild status; persisted. | Supported |
| `ASHESHDEV` | `/ResetSkill 1` | `/ResetSkill 1` | Clear learned skills and rebuild native skill points, cooldowns and passives; persisted. | Supported |

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

Unavailable commands require unported services and return an error. Movie commands have no administrator-whisper entry. Non-English aliases are deduplicated under English names; raw-byte provenance stays in the generated JSON.

| Source parser | English command | Source line | Offline status | Online status |
|---|---|---:|---|---|
| HelpGameMaster | `/SearchRentalStockItem` | 19595 | Unavailable | Unavailable |
| HelpGameMaster | `/Quiz` | 19629 | Unavailable | Unavailable |
| HelpGameMaster | `/RefreshQuiz` | 19640 | Unavailable | Unavailable |
| HelpGameMaster | `/stat` | 19647 | Implemented | Implemented |
| HelpGameMaster | `/ChangeCaste` | 19672 | Unavailable | Unavailable |
| HelpGameMaster | `/SetQuestEvent` | 19684 | Unavailable | Unavailable |
| HelpGameMaster | `/stat2` | 19697 | Implemented | Implemented |
| HelpGameMaster | `/stat3` | 19719 | Implemented | Implemented |
| HelpGameMaster | `/stat4` | 19739 | Implemented | Implemented |
| HelpGameMaster | `/refresh` | 19754 | Implemented | Implemented |
| HelpGameMaster | `/mv` | 19779 | Implemented | Implemented |
| HelpGameMaster | `/movepc` | 19806 | Implemented | Implemented |
| HelpGameMaster | `/moveother` | 19849 | Unavailable | Unavailable |
| HelpGameMaster | `/mvzone2` | 19896 | Unavailable | Unavailable |
| HelpGameMaster | `/mvzone` | 19911 | Unavailable | Unavailable |
| HelpGameMaster | `/hold` | 19959 | Unavailable | Unavailable |
| HelpGameMaster | `/follow` | 19988 | Unavailable | Unavailable |
| HelpGameMaster | `/buffer` | 20009 | Unavailable | Unavailable |
| HelpGameMaster | `/speed` | 20036 | Unavailable | Unavailable |
| HelpGameMaster | `/SiegeSymbols` | 20058 | Unavailable | Unavailable |
| HelpGameMaster | `/RobotDirection` | 20063 | Unavailable | Unavailable |
| HelpGameMaster | `/ArrangeRobotsHorizontal` | 20078 | Unavailable | Unavailable |
| HelpGameMaster | `/ArrangeRobotsVertical` | 20100 | Unavailable | Unavailable |
| HelpGameMaster | `/RobotFollow` | 20122 | Unavailable | Unavailable |
| HelpGameMaster | `/robot` | 20131 | Unavailable | Unavailable |
| HelpGameMaster | `/a` | 20214 | Unavailable | Unavailable |
| HelpGameMaster | `/f` | 20227 | Unavailable | Unavailable |
| HelpGameMaster | `/summon` | 20242 | Unavailable | Unavailable |
| HelpGameMaster | `/summontest` | 20264 | Unavailable | Unavailable |
| HelpGameMaster | `/summon2` | 20336 | Unavailable | Unavailable |
| HelpGameMaster | `/summon3` | 20406 | Unavailable | Unavailable |
| HelpGameMaster | `/summonpet` | 20422 | Unavailable | Unavailable |
| HelpGameMaster | `/summonInteractor` | 20435 | Unavailable | Unavailable |
| HelpGameMaster | `/height` | 20449 | Unavailable | Unavailable |
| HelpGameMaster | `/SetHeight` | 20465 | Unavailable | Unavailable |
| HelpGameMaster | `/army` | 20473 | Unavailable | Unavailable |
| HelpGameMaster | `/releaseArmy` | 20527 | Unavailable | Unavailable |
| HelpGameMaster | `/account` | 20542 | Implemented | Implemented |
| HelpGameMaster | `/atk` | 20553 | Unavailable | Unavailable |
| HelpGameMaster | `/truesight` | 20575 | Unavailable | Unavailable |
| HelpGameMaster | `/kickout` | 20588 | Unavailable | Unavailable |
| HelpGameMaster | `/where` | 20619 | Implemented | Implemented |
| HelpGameMaster | `/whereid` | 20634 | Implemented | Implemented |
| HelpGameMaster | `/wheremob` | 20649 | Implemented | Implemented |
| HelpGameMaster | `/equip` | 20663 | Implemented | Implemented |
| HelpGameMaster | `/weapon` | 20697 | Implemented | Implemented |
| HelpGameMaster | `/armor` | 20722 | Implemented | Implemented |
| HelpGameMaster | `/pants` | 20747 | Implemented | Implemented |
| HelpGameMaster | `/helmet` | 20772 | Implemented | Implemented |
| HelpGameMaster | `/shield` | 20797 | Implemented | Implemented |
| HelpGameMaster | `/gloves` | 20822 | Implemented | Implemented |
| HelpGameMaster | `/boots` | 20847 | Implemented | Implemented |
| HelpGameMaster | `/JudgeSurvival` | 20872 | Unavailable | Unavailable |
| HelpGameMaster | `/ChangeAttackArmorType` | 20887 | Unavailable | Unavailable |
| HelpGameMaster | `/Bless` | 20899 | Unavailable | Unavailable |
| HelpGameMaster | `/ChangeHP` | 20937 | Implemented | Implemented |
| HelpGameMaster | `/SearchMonsterHandle` | 20946 | Implemented | Implemented |
| HelpGameMaster | `/PrintMonsterStat` | 20965 | Unavailable | Unavailable |
| HelpGameMaster | `/PrintMonsterData` | 20983 | Unavailable | Unavailable |
| HelpGameMaster | `/RecordMonsterData` | 21001 | Unavailable | Unavailable |
| HelpGameMaster | `/PrintMonsterStatus` | 21045 | Unavailable | Unavailable |
| HelpGameMaster | `/PrintMonsterMode` | 21076 | Unavailable | Unavailable |
| HelpGameMaster | `/checkmonster` | 21083 | Unavailable | Unavailable |
| HelpGameMaster | `/printkalacoreinfo` | 21119 | Unavailable | Unavailable |
| HelpGameMaster | `/removekalacore` | 21127 | Unavailable | Unavailable |
| HelpGameMaster | `/dropkalacore` | 21140 | Unavailable | Unavailable |
| HelpGameMaster | `/KickOutAllPlayers` | 21171 | Unavailable | Unavailable |
| HelpGameMaster | `/CountMonster` | 21200 | Unavailable | Unavailable |
| HelpGameMaster | `/KillMonsterAll` | 21217 | Unavailable | Unavailable |
| HelpGameMaster | `/KillClanMonster` | 21229 | Unavailable | Unavailable |
| HelpGameMaster | `/sp` | 21309 | Unavailable | Unavailable |
| HelpGameMaster | `/TriggerEvent` | 21320 | Unavailable | Unavailable |
| HelpGameMaster | `/attack` | 21329 | Unavailable | Unavailable |
| HelpGameMaster | `/attack2` | 21342 | Unavailable | Unavailable |
| HelpGameMaster | `/ukillmonster` | 21369 | Unavailable | Unavailable |
| HelpGameMaster | `/CountPartyMember` | 21387 | Unavailable | Unavailable |
| HelpGameMaster | `/Log` | 21457 | Unavailable | Unavailable |
| HelpGameMaster | `/log` | 21457 | Unavailable | Unavailable |
| HelpGameMaster | `/ChangeIntervalHackCount` | 21484 | Unavailable | Unavailable |
| HelpGameMaster | `/ChangeHeightSetting` | 21490 | Unavailable | Unavailable |
| HelpGameMaster | `/logx` | 21497 | Unavailable | Unavailable |
| HelpGameMaster | `/logimmu` | 21530 | Unavailable | Unavailable |
| HelpGameMaster | `/SwitchOffEvent` | 21572 | Unavailable | Unavailable |
| HelpGameMaster | `/SwitchOnEvent` | 21584 | Unavailable | Unavailable |
| HelpGameMaster | `/eventlog` | 21596 | Unavailable | Unavailable |
| HelpGameMaster | `/contactnpclog` | 21605 | Unavailable | Unavailable |
| HelpGameMaster | `/recoverkalasystem` | 21629 | Unavailable | Unavailable |
| HelpGameMaster | `/DecPrana` | 21635 | Unavailable | Unavailable |
| HelpGameMaster | `/ChangeKarma` | 21671 | Implemented | Implemented |
| HelpGameMaster | `/PrintRwdCorrect` | 21686 | Unavailable | Unavailable |
| HelpGameMaster | `/ChangeRwdCorrect` | 21695 | Unavailable | Unavailable |
| HelpGameMaster | `/kickouto` | 21706 | Unavailable | Unavailable |
| HelpGameMaster | `/kickoutx` | 21711 | Unavailable | Unavailable |
| HelpGameMaster | `/RefiningRate` | 21716 | Unavailable | Unavailable |
| HelpGameMaster | `/MoneyFors838` | 21737 | Implemented | Implemented |
| HelpGameMaster | `/Prana` | 21742 | Implemented | Implemented |
| HelpGameMaster | `/PreventWhisper` | 21749 | Implemented | Implemented |
| HelpGameMaster | `/LogDump` | 21774 | Unavailable | Unavailable |
| HelpGameMaster | `/MSGLogDump` | 21779 | Unavailable | Unavailable |
| HelpGameMaster | `/Exchange` | 21788 | Unavailable | Unavailable |
| HelpGameMaster | `/DropItmFors838` | 21796 | Implemented | Unavailable |
| HelpGameMaster | `/Card` | 21819 | Unavailable | Unavailable |
| HelpGameMaster | `/Dress` | 21830 | Unavailable | Unavailable |
| HelpGameMaster | `/Connect` | 21838 | Unavailable | Unavailable |
| HelpGameMaster | `/View` | 21862 | Unavailable | Unavailable |
| HelpGameMaster | `/IWantIt` | 21875 | Unavailable | Unavailable |
| HelpGameMaster | `/Report` | 21891 | Unavailable | Unavailable |
| HelpGameMaster | `/yutbet` | 21911 | Unavailable | Unavailable |
| HelpGameMaster | `/yutmoney` | 21918 | Unavailable | Unavailable |
| HelpGameMaster | `/SiegeDateReservations` | 21923 | Unavailable | Unavailable |
| HelpGameMaster | `/SelectSiegeDate` | 21930 | Unavailable | Unavailable |
| HelpGameMaster | `/SiegeStatus` | 21938 | Unavailable | Unavailable |
| HelpGameMaster | `/DumpSiegeEntries` | 21942 | Unavailable | Unavailable |
| HelpGameMaster | `/ReloadSiegeEntries` | 21947 | Unavailable | Unavailable |
| HelpGameMaster | `/ChangeClanForSiege` | 21953 | Unavailable | Unavailable |
| HelpGameMaster | `/InsertToSiegeEntry` | 22013 | Unavailable | Unavailable |
| HelpGameMaster | `/RemoveSiegeEntry` | 22024 | Unavailable | Unavailable |
| HelpGameMaster | `/RefreshEntry` | 22033 | Unavailable | Unavailable |
| HelpGameMaster | `/ApplySiege` | 22038 | Unavailable | Unavailable |
| HelpGameMaster | `/CheckSiegeApplication` | 22096 | Unavailable | Unavailable |
| HelpGameMaster | `/CloseSiegeApplications` | 22112 | Unavailable | Unavailable |
| HelpGameMaster | `/SetSiegeStarted` | 22117 | Unavailable | Unavailable |
| HelpGameMaster | `/ChangeClan` | 22122 | Unavailable | Unavailable |
| HelpGameMaster | `/SiegeSymbolStatus` | 22142 | Unavailable | Unavailable |
| HelpGameMaster | `/SiegeEntries` | 22147 | Unavailable | Unavailable |
| HelpGameMaster | `/RunNpcEvent` | 22170 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/SearchRentalStockItem` | 22344 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/Quiz` | 22383 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/RefreshQuiz` | 22394 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/stat` | 22401 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/SetQuestEvent` | 22438 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/stat2` | 22451 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/stat3` | 22473 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/stat4` | 22493 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/refresh` | 22508 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/mv` | 22533 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/movepc` | 22560 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/moveother` | 22603 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/mvzone2` | 22650 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/mvzone` | 22665 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/hold` | 22713 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/follow` | 22742 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/speed` | 22790 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/summon` | 22811 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/summon2` | 22833 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/summon3` | 22903 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/summonpet` | 22919 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/summonInteractor` | 22932 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/army` | 22970 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/releaseArmy` | 23024 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/account` | 23039 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/atk` | 23050 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/truesight` | 23072 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/kickout` | 23085 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/where` | 23113 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/whereid` | 23128 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/wheremob` | 23143 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/equip` | 23157 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/weapon` | 23191 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/armor` | 23216 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/pants` | 23241 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/helmet` | 23266 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/shield` | 23291 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/gloves` | 23316 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/boots` | 23341 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/sp` | 23513 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/attack` | 23532 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/attack2` | 23545 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/killmonster` | 23572 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/CountPartyMember` | 23590 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/Log` | 23602 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/log` | 23602 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/logx` | 23629 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/logimmu` | 23662 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/PrintRwdCorrect` | 23758 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/kickouto` | 23778 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/kickoutx` | 23783 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/PreventWhisper` | 23821 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/LogDump` | 23846 | Unavailable | Unavailable |
| ExecuteGMCommand2nd | `/MSGLogDump` | 23851 | Unavailable | Unavailable |
| ControlSystem | `/loadfix` | 24322 | Unavailable | Unavailable |
| ControlSystem | `/ChangeRwdCorrect` | 24343 | Unavailable | Unavailable |
| ControlSystem | `/killmonster2` | 24348 | Unavailable | Unavailable |
| ControlSystem | `/cc` | 24366 | Unavailable | Unavailable |
| ControlSystem | `/DropItemFors838` | 24378 | Implemented | Unavailable |
| ControlSystem | `/ChangeImmunity` | 24400 | Unavailable | Unavailable |
| ControlSystem | `/ChangeTrimuriti` | 24408 | Implemented | Implemented |
| ControlSystem | `/ChangeLevel` | 24422 | Implemented | Implemented |
| ControlSystem | `/ChangeClass` | 24435 | Implemented | Implemented |
| ControlSystem | `/ResetStat` | 24445 | Implemented | Implemented |
| ControlSystem | `/ResetSkill` | 24452 | Implemented | Implemented |
| ControlSystem | `/SwitchOffEvent` | 24459 | Unavailable | Unavailable |
| ControlSystem | `/SwitchOnEvent` | 24471 | Unavailable | Unavailable |
| ControlSystem | `/ChangeEventSetting` | 24483 | Unavailable | Unavailable |
| ControlSystem | `/ChangeEventTask` | 24500 | Unavailable | Unavailable |
| ControlSystem | `/ChangeEventTask2` | 24519 | Unavailable | Unavailable |
| ControlSystem | `/ChangeTaskSetting` | 24535 | Unavailable | Unavailable |
| ControlSystem | `/ChangeTaskSetting2` | 24554 | Unavailable | Unavailable |
| ControlSystem | `/ChangeEvent` | 24571 | Unavailable | Unavailable |
| ControlSystem | `/InitEvent` | 24583 | Unavailable | Unavailable |
| ControlSystem | `/AddEventToScheduler` | 24597 | Unavailable | Unavailable |
| ControlSystem | `/RemoveEventAtScheduler` | 24612 | Unavailable | Unavailable |
| ControlSystem | `/ChangeMonsterHP` | 24621 | Unavailable | Unavailable |
| ControlSystem | `/ChangeMonsterImmunity` | 24636 | Unavailable | Unavailable |
| ControlSystem | `/ChangeMonsterARDG` | 24650 | Unavailable | Unavailable |
| ControlSystem | `/ChangeMonsterAC` | 24664 | Unavailable | Unavailable |
| ControlSystem | `/ChangeMonsterMR` | 24677 | Unavailable | Unavailable |
| ControlSystem | `/ChangeMonsterSkillEffect` | 24698 | Unavailable | Unavailable |
| ControlSystem | `/ChangeMonsterSkill` | 24774 | Unavailable | Unavailable |
| ControlSystem | `/ChangeMonsterSight` | 24796 | Unavailable | Unavailable |
| ControlSystem | `/ChangeMonsterPopDelay` | 24812 | Unavailable | Unavailable |
| ControlSystem | `/ChangeItemCP` | 24828 | Unavailable | Unavailable |
| ControlSystem | `/ChangeItemEffect` | 24841 | Unavailable | Unavailable |
| ControlSystem | `/ChangeSkillCP` | 24856 | Unavailable | Unavailable |
| ControlSystem | `/ChangeMonsterSkillCP` | 24873 | Unavailable | Unavailable |
| ControlSystem | `/offcsh` | 24888 | Unavailable | Unavailable |
| ControlSystem | `/ChangeSpeedFactor` | 24895 | Unavailable | Unavailable |
| ControlSystem | `/LoadSettingAll` | 24909 | Unavailable | Unavailable |
| ControlSystem | `/LoadSettingTxl` | 24916 | Unavailable | Unavailable |
| ControlSystem | `/LoadZoneSetting` | 24921 | Unavailable | Unavailable |
| ControlSystem | `/LoadWorldSetting` | 24926 | Unavailable | Unavailable |
| ControlSystem | `/ChangeWorldSetting` | 24931 | Unavailable | Unavailable |
| ControlSystem | `/printpos` | 24944 | Unavailable | Unavailable |
| ControlSystem | `/changepos` | 24962 | Unavailable | Unavailable |
| ControlSystem | `/ChangeHalfGrid` | 24985 | Unavailable | Unavailable |
| ControlSystem | `/ChangePopArea` | 24995 | Unavailable | Unavailable |
| AssistPlayMovie | `/nokillall` | 25053 | Unavailable | Unavailable |
| AssistPlayMovie | `/nokill` | 25066 | Unavailable | Unavailable |
| AssistPlayMovie | `/nokill2` | 25082 | Unavailable | Unavailable |
| AssistPlayMovie | `/nostun` | 25098 | Unavailable | Unavailable |
| AssistPlayMovie | `/holdall` | 25110 | Unavailable | Unavailable |
| AssistPlayMovie | `/mvspd` | 25134 | Unavailable | Unavailable |
| AssistPlayMovie | `/killpc` | 25149 | Unavailable | Unavailable |
| AssistPlayMovie | `/killmonsterall` | 25168 | Unavailable | Unavailable |
| AssistPlayMovie | `/hpup` | 25184 | Unavailable | Unavailable |
| AssistPlayMovie | `/loadscene` | 25204 | Unavailable | Unavailable |
| WhisperHandler | `/iwantsave` | 8109 | Unavailable | Unavailable |
| WhisperHandler | `/ChangeGod` | 8129 | Unavailable | Unavailable |
| WhisperHandler | `/blessme_ohyeah_990` | 8216 | Unavailable | Unavailable |
| WhisperHandler | `/blessmeoff_ohyeah_990` | 8228 | Unavailable | Unavailable |
| WhisperHandler | `/GraduationGift` | 8241 | Unavailable | Unavailable |
| WhisperHandler | `/ClaimCompensation` | 8296 | Unavailable | Unavailable |
| WhisperHandler | `/AdvancedArmorExchange` | 8316 | Unavailable | Unavailable |
| WhisperHandler | `/ChallengeExchange` | 8378 | Unavailable | Unavailable |
| WhisperHandler | `/StretchQuest` | 8452 | Unavailable | Unavailable |
| WhisperHandler | `/FaithExchange` | 8832 | Unavailable | Unavailable |
| WhisperHandler | `/Love106Exchange` | 8943 | Unavailable | Unavailable |
| WhisperHandler | `/NewWeaponExchange` | 9049 | Unavailable | Unavailable |
| WhisperHandler | `/ArmorExchange` | 9142 | Unavailable | Unavailable |
| WhisperHandler | `/WeaponExchange` | 9201 | Unavailable | Unavailable |
| WhisperHandler | `/SecondClass` | 9254 | Unavailable | Unavailable |
| WhisperHandler | `/SetMuscle` | 9313 | Unavailable | Unavailable |
| WhisperHandler | `/SetNerve` | 9337 | Unavailable | Unavailable |
| WhisperHandler | `/SetHeart` | 9361 | Unavailable | Unavailable |
| WhisperHandler | `/SetMind` | 9385 | Unavailable | Unavailable |

Source: Tantra/zone/Server.cpp; SHA256 `6639ca68a1e18c121e1e8a60fd2c7bbdd8f07b1d73540f645509e58ad9b6da7a`. Native parser inventory: 287 entries plus 19 early-whisper branches. Runtime registry: 201 deduplicated English entries.
