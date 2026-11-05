# Frozen beta, account controls and beginner progression

The connected C++/BGFX beta uses the versioned [content inventory](BETA_CONTENT.md).
Zone01 through Zone05 are enabled. The shared compiled policy is
`_shared_cpp/beta/BetaContent.h`; its readable `Content.json` lists every skill,
story/task quest and service. Original requirements still apply. Unknown and
explicitly unfinished actions are rejected before rewards or costs change.
Passive skills are identified from native unlimited duration as well as phase0;
they do not require an attack animation. Missing English skill text is recorded
by ID without inventing translations. Quiz34, premium reset, later maps,
competitive admission and live payment providers remain unavailable.

## Server Manager account controls

Start SQLDMN, open **Accounts**, and use the existing Create account button or
**Block account**, **Unblock account**, **Reset password**, **Revoke sessions**.
Enter the exact account name and an optional reason. Blocking accepts minutes;
0 means indefinite. A password reset requires matching1..20-byte native ASCII
passwords. Each operation has a confirmation and committed result feedback.

The original `Tantra/Database/UserLogin.sql` Account table supplies the block
semantics: Blocked, BlockedDate, BlockedEndDate and UnBlockedDate. Schema9's
additive `account_controls` stores those dates as UTC epoch seconds, plus the
last operator action/reason. Expired timed blocks stop denying admission while
retaining their history fields. Password reset retains block status and replaces
both native and web Argon2id verifiers. Existing `userLevel` is preserved; only
value1 is a game administrator. Manager's protected operator token is separate.

Block, reset and revoke retire every world session, login grant, entry ticket
and pending/claimed handoff for the account in one transaction. Existing world
connections are fenced on their next lease renewal, within five seconds; no
subsequent economic commit can use a retired session. Unblocking does not
restore old tokens. Other accounts and character/warehouse/guild data are retained.

The command is accepted only by SQLDMN's operator administration endpoint.
The game-service-token listener rejects it. Account FIFO ordering is shared
with admission and economic operations. The GUI never logs passwords/proofs.
Website registration and account import are separate; this beta uses existing
operator-provisioned accounts and the Manager's account creation.

## Beginner fixes

Original `HTInterface.cpp:7148` shows message1051 when quest flag0 is1.
The remake now opens that native OK/Cancel message box automatically on connected
entry, reusing its original images. Accept/decline commits original Quest.cpp
Dialog0 without requiring an NPC. Acceptance starts Tutorial A; declining starts
Scenario A. Saved choices do not reopen after reconnect. The modal supports
mouse, Enter and Escape and stays separate from offline development profiles.

Original Quest.cpp uses0 for accept and1 for reject. NPC conversation decisions
now send those values. Ordinary tutorial confirmations remain local, as in
HTNPCControl.cpp; they no longer accidentally invoke Dialog1's tutorial restart.
The remaining ordinary server-event acceptance request also sends native0.
The unfinished second-class quiz remains disabled rather than reporting success.

The authority journey starts with a canonical level1 character and its original
starter item. It equips through the native inventory packet, accepts the initial
question, earns tutorial materials and Prana through actual attack/pickup packets,
uses original NPC dialogue/repair, earns the first-class trial token and promotion,
uses quest/class equipment, saves a point, dies, revives and reopens stored state.
All five original tutorials complete. No quest progress, reward items, character
levels or combat stats are granted to the fresh journey.

Native first class requires level10. God selection retains its separate level30
rule; it is not an extra first-class requirement. Earlier owned fixture attempts
are retained, including incorrect route/stat setup, an unnecessary god request
and a full bag before equipping earned gear. Intermediate real earned checkpoints
were used while fixing the driver. The final fresh run starts from level1 and
passes without checkpoint restoration:92 earned kills,54 combat revivals, all
five tutorials, first class, repair, equipment and durable saved return. These
bot outcomes are retained as recorded, with game balance still a separate review.

A separate real-network SDL check uses two unboosted accounts. It verifies the
default question, accepted and declined outcomes, starter equipment, unavailable
skill feedback and reconnect, with stopped SQL matching the UI. Its window is
HUD-only; it does not claim a new full-scene graphics acceptance.

## Suggested original beginner route

1. Accept the initial question and equip the starter weapon from Inventory.
2. Bartan1101: gather three7101 materials from Vasabhum2001 and turn them in.
3. Abbas1108: complete the level-up tutorial. Bhuvan1105 then supplies the broken
   tutorial item; repair it through Girika1102 and return to Bhuvan.
4. Girika's next tutorial uses three7102 materials from Vasabhum Kaura2002;
   visit Vananta1104, then return to Girika. Abbas's final tutorial requires
   ten Mullecha2004 kills. Equip the earned gear and retain room for rewards.
5. At level10, accept Abbas's first-class quest. Vananta starts the seven
   three-kill objectives:2001,2002,2004,2003,2005,2132,2133. Return to Vananta
   for8107, then to Abbas for the native promotion and equipment rewards.
6. Use the original save-point conversation. Death/revival and reconnect retain
   the committed character, progression, equipment and saved zone.

## Evidence and remaining release gates

See [the compact checkpoint](evidence/beta-accounts-beginner-20261105.json) for
Release results, schema migration, runtime hashes and exact scope. Original SQL,
client packs and normal profiles remain unchanged. Existing account rows are
compared before and after the deployed MariaDB schema9 upgrade using native
backups. Raw failed attempts remain under `build/evidence/beta-20261105`.

This completes the three requested implementation areas. Clean-PC packaging,
sustained player-cap measurement, public-entry abuse checks, release operations
and the wider fresh-account party/trade journey remain public-beta gates.
