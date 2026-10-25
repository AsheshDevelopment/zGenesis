# Mandara navigation, NPC services and INTRO hardening

> Archived reference — superseded snapshot/fix, not current status. Use [current progress](../../PROGRESS.md) and the [phased plan](../../planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md). Original evidence paths/hashes retain their historical scope.
Updated: 2026-10-23. Implementation: `C:\_GitHub\TantraSrc\_remake`.
Runtime: `C:\_GitHub\TantraSrc\_client\HTLauncher.exe`.

## Movement and camera

- [x] Route ground clicks through the selected zone's TCM and the client's TCC,
  retaining native units, inverted cell Z, run/walk mathematics and saved cells.
- [x] Sweep the player footprint along every route segment, prevent diagonal
  corner cutting, and smooth only through clear space. Spend elapsed movement
  across waypoints instead of stopping for a frame at every cell.
- [x] Replan if a living actor obstructs the route. Reject unreachable destinations
  without teleporting. Handle an actor obstructing two points in the same cell.
- [x] Prevent chasing monsters from stepping across blocked intermediate cells.
- [x] Find reachable NPC approach cells inside native interaction range, using
  actual collision data rather than a fixed offset beside an NPC.
- [x] Clip the settled camera against terrain and 372,625 transformed static
  triangles, with a spatial index and clearance samples. Exclude `_TGA` foliage
  from these structural camera tests; keep the native startup camera sequence.

The original main-character movement samples collision and stops at an obstacle.
Offline A* routing is a remake addition over those original cells, not a port of
an original A* algorithm. Static movement blocking remains authored TCC/TCM data.
The supplied Mandara directory has no `.tbo` primitive-collision file; the source
attempts to load it through `HT_hrLoadMapBound`. Camera triangle obstruction is
a project-owned fallback using the original geometry. It does not establish
exact equivalence to missing authored planes, boxes or cylinders.

## Functional NPC baseline

- [x] Read the shipped `system\Mandara_NPC.txl`: explicit Win32 record layouts,
  24 tables, bounded strings and counts; no host `sizeof` dependency.
- [x] Generate NPC ID/type bindings from the original `HTNPCControl.cpp` switch.
- [x] Present native questions and choices in the original NPC dialogue window.
  Resolve ordinary dialogue branches and native level-based affinity sections.
- [x] Enforce a living, authenticated owner and native six-cell interaction range.
  Close service context when leaving range, moving, disconnecting or closing UI.
- [x] Show the original 6-by-10 merchant window with the authored NPC item list.
  Click an item, enter quantity, reconfirm, then persist the purchase.
- [x] Sell by dragging an inventory item to the merchant and confirming the
  original sale message. Validate items, money overflow, inventory capacity,
  packed counts, quest-item restrictions and stale conversation revisions.
- [x] Confirm a save point through the original message layout; save the current
  authoritative zone/cell in SQLite before reporting success.
- [x] Keep NPC/merchant input consumed by UI, including modal confirmation keys.
- [x] Pack source layer/focus ordering within OGRE's 16-bit render priority;
  the 17-window overflow found in the runtime attempt is fixed.
- [ ] Repair, warehouse, religion/class changes, transport, quests, guild/event
  and other advanced service callbacks remain unavailable. Unsupported branches
  display a notice; no rewards or successful service replies are fabricated.

Numeric NPC selling lists and prices come from the supplied authored Global
`TantraParam.xml` profile. Dialogue comes from the shipped client TXL. Their
provenance remains separate; neither is assumed identical to encrypted deployed
server parameters. No generic healer action is invented for the priest.

## INTRO and stability

- [x] Ignore stale releases on hidden panels, outstanding requests, camera
  transitions and invalid selected slots. Preserve the original confirmation
  and cancellation controls.
- [x] Surface session-ownership loss as an explicit channel failure instead of
  silently waiting after disconnect.
- [x] Mark failed render frames as errors and stop after fatal input errors.
- [x] Retain caught-failure logs and append native-crash diagnostics. Install a
  best-effort timestamped Windows minidump and C++ termination handler beside
  the launcher.
- [x] Check original bounds and settled face cameras for all eight tribes and
  200 face/hair combinations in the focused CPU probe.
- [ ] Complete every equipped attachment, failure/retry variant and full native
  pixel/animation acceptance case. The historical reported exit is still not
  assigned a confirmed cause merely because a later session succeeds.

## Verification

The focused component probe covers synthetic detours/unreachable routes,
same-cell actor obstruction, the actual blacksmith-to-save-NPC route, transformed
camera intersection, dialogue, buy/sell/save, stale requests, death, range,
insufficient money and full inventory. The regular focused checks cover world
gameplay, INTRO controls/heights, MainUI and SQLite ownership/persistence.

Exactly one offline process ran, world group 1 / Mandara route 1, using a private
three-character fixture. All three rendered slots, full-roster create rejection,
delete cancellation/empty-proof rejection/success, face/hair framing, creation
cancellation, slot-1 information cancellation and village cancellation passed.
Point-02 authentication and the native Mandara map/sky/object upload completed.

The attempt then exited with code 8 during MainUI creation, before `CHAR_INIT`.
Adding merchant/service windows increased the count to 17: the previous formula
`1 + 4096 * windowRank + layer` produces a background priority of 65,537 at rank
16, beyond the backend's 65,535 limit. Its boolean rejection left a blank error.
The fix compresses distinct local layers while preserving their source order
and every window's focus order, and supplies a nonempty creation-failure reason.
The 303-check MainUI probe and world gameplay check pass after this correction.

The final corrected executable is rebuilt/staged and passes all 4,173 manifested
file hashes, x64 imports and original icon checks. **It was not launched again.**
Normal SQLite and saved-ID hashes remain unchanged. Final world rendering, NPC
UI transactions, walking and save-point runtime acceptance remain unverified;
their authority and navigation component checks pass.

Final executable SHA-256:
`47405e614992d5000b9113344b74ad7e01953061a7f48690b8e3bed2fc8be7b7`.
The single runtime used
`02fe519c88d92bfce34b73c61d711df44470e81ea09a02c4fb0c27e9f25e6260`.
Runtime payload: 4,173 files / 257,367,290 bytes. Tracked
[verification and capture hashes](../../evidence/mandara-closure-verification.json).
The no-retry harness is `_remake\tools\verify-mandara-closure.py`.

Build/test/runtime logs use `build-ogre-sdl/movement-npc-intro-*`,
`mandara-closure-component.log` and `mandara-closure-runtime`. Debug, other
channels, the full suite and prolonged gameplay are outside this verification.
Native crash-dump generation is compiled, not fault-injected into a second game
process.

## Original references

- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTMainCharacterMove.cpp`,
  `HTMapSystem.cpp`, `HTCamera.cpp`, `HTEngineHandler.cpp`.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTNPCSystem.cpp`,
  `HTNPCControl.cpp`, `HTNPCScriptMgr.{h,cpp}`, `HTNPCScriptDef.h`.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTInterface.cpp`:
  `CHTUINPCWindow`, `CHTUIMerchantWindow`, `CHTUIMessageBox`.
- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTIntroManager.cpp` and
  `C:\_GitHub\TantraSrc\Tantra\zone\server.cpp`:
  `CSP_REQ_ITEM_BUY`, `CSP_REQ_ITEM_SELL`, `CSP_REQ_SAVE_POSITION`.
- `C:\_GitHub\TantraSrc\TantraClient\system\Mandara_NPC.txl`, `ClientRes.txl`,
  `HTMessage.txl`; `resource\map\Mandara1st\MAP_Mandara1st.{tcc,tml,thm}`.
- `B:\__TANTRA\TantraDataScripts\Global\TantraParam.xml` and
  `E:\Global-server\Zone01\{MapData.tcm,GenerationArea.idx,NPCGener.txt}`.
