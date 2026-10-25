# Native ground-item and use-result feedback

Accepted offline pickup/drop operations now publish a normalised result after
SQLite save and status collection. MainUI consumes each result once. Failed saves
close the session and clear pending results, so they cannot create success text
or sound. These are offline reply semantics; this change does not add wire codecs
or multiplayer loot ownership.

Pickup uses the original item-name message (2013). A native partial pickup uses
the same acquisition message while retaining its remainder on the ground. Money
pickup uses message 1065 with the positive acquired Rupiah delta, not the resulting
wallet balance. Six rejection mappings retain their native IDs: inventory lack
2002, distance 2011, place 2003, owner 2001, release time 2012 and general failure
2020. Owner/release messages are formatted here; their multiplayer authority
semantics remain separate unfinished work.

All these lines use original item-history colour 8: RGBA (0.96, 0.58, 0.11, 1).
Translated messages remain locale bytes and use the existing native-font/history
adapter. Only supported metadata parameters and `%s`/`%%` are expanded; names
containing percent signs remain literal. Missing item names follow the source's
silent missing-name path. Malformed formats and records fail with a diagnostic.

A successful manual drop plays the item's original equip sound once. It follows
`HT_hrPlaySound(id, 1)` as centred UI feedback rather than an attenuated world
emitter. Pickup-result history does not invent a second equip sound. Existing
sample volume and device settings remain in use. Item sound resources are read
through the native `ItemSound.hpk` family; no new extracted sound copies or assets
are introduced.

## Original references

Root: `C:\_GitHub\tantra-dev-main\_references\Tantra\HTlauncher`.

- `HTItemControl.cpp`: `HT_vItemControl_Network_ReqGet_Result` and
  `HT_vItemControl_Network_ReqDrop_Result`, native success/error branches.
- `HTItemControl.cpp`: `HT_vItemControl_SetMessage` and
  `HT_vItemControl_SetParamTextForMessage`, item-name and spending-money values.
- `HTInfoLoad.cpp`: `HISTORY_MESSAGE_TYPE_ITEM` selects colour table entry 8.
- `HTextern.cpp`: original RGBA colour values.
- `HTMessageDef.h`: native IDs and parameter constants, compiled by the existing
  source-feedback generator with source hashes.
- `HTResMgr.h/.cpp`: `HT_ResTableType11` and `HT_bGetEquipSoundID`. The two known
  188/200-byte catalog layouts share the 40-byte name and sound field at byte 156.
- `HTEngineHandler.h/.cpp`: non-positioned `HT_hrPlaySound` overload and
  `HT_dwGetItemEquipSoundID` forwarding to the resource table.

Runtime reference: `C:\_GitHub\TantraSrc\TantraClient\system\HTMessage.txl`,
`ClientRes.txl` and `resource\sound\ItemSound.hpk`.

## Checks and remaining scope

- [x] Type accepted/partial/rejected/no-reply results without matching error text.
- [x] Queue results after durable acceptance; clear them on disconnect.
- [x] Present native item/Rupiah/rejection text with source colour and parameters.
- [x] Resolve original accepted-drop sound IDs and retain silent pickup handling.
- [x] Pass 145 feedback checks, including three native sound lookups and RIFF/WAVE payload checks,
  both known item record sizes, malformed input and percent-containing names.
- [x] Pass world-gameplay and isolated SQLite/character regressions, including
  partial counts, duplicate drains and no success reply after a rejected save.
- [x] Rebuild/stage both clients; both static packages pass, with 148 HPKs each
  and all 49 private profile files in the user client unchanged.
- [ ] Accept visible messages and audible clips/volume changes in-game.
- [x] Connect ordinary item quick-slot deletion/remapping; see the subsequent
  [lifecycle checkpoint](NATIVE_QUICK_SLOT_ITEM_LIFECYCLE.md) for scoped evidence.
- [ ] Finish other item lifecycle/result families, continuous/charged effects,
  money overflow, ownership, decay and online replies.
- [ ] Complete corrected FX/camera acceptance and all remaining client phase gates.

No game, renderer, server or audio device was launched during these CPU checks.
The release build initially caught a private HUD history call; presentation now
uses the public item-result API. Build/package evidence is recorded separately.

[Evidence](../evidence/native-ground-feedback-20261026.json) |
[Ground-item authority](NATIVE_GROUND_ITEMS.md) |
[Current progress](../PROGRESS.md).

## Accepted item-use feedback

The 2026-10-26 continuation connects the active native item-use cue **33010**,
resolved by ClientRes.txl to **use_drink_31289.wav**. The native
`HTItemControl.cpp::HT_vNetWork_SCP_RESP_Item_Use_Result` calls
`HT_hrPlaySound(33010, 1)`. It is centred UI feedback and shares the existing
effects-volume control with drop-result sounds; camera distance does not mute it.

The sound follows the accepted inventory-change queue after SQLite save and
status collection. Its source record must lose exactly one item, including the
last item being cleared. Ordinary potions, timed buffs and repeat uses share this
path. Moves, drops, stack operations, unchanged/replaced records, malformed keys,
rejected requests and failed saves cannot produce an accepted-use cue. Each queue
drain consumes the event once. A quick-slot UI-profile save warning does not undo
the accepted item transaction or suppress its result sound.

Source references under
`C:\_GitHub\tantra-dev-main\_references\Tantra\HTlauncher`:

- `HTItemControl.cpp`: active use-result sound and local stack handling.
- `HTNetWorkHandle.cpp`: ordinary/use-broadcast routing.
- `HTMainCharacter.cpp::HT_vMainChar_SCP_SetItemEffect` and
  `HTOtherObjectSystem.cpp::HT_vOtherObjectSystem_SetItemEffect`: the item-specific
  SFX calls are commented out in this supplied version. Their separate buff-state
  and skill presentation paths retain their own implementation/acceptance scope.

`_remake/tools/generate-native-skill-feedback.py` now extracts/hashes the cue ID
and checks the source model-FX callbacks. Generation stops for review if those
native SFX calls become enabled. It normalises the `HTvoid` spelling for method
parsing. CMake tracks the handler and both callbacks as generation dependencies.
`_remake/src/client/NativeSkillFeedback.cpp::nativeItemUseSound` validates accepted
consumption, and `src/app/tantra_remake_main.cpp` submits the shared UI sound.

- [x] Pass 164 feedback assertions, including accepted/final-stack/repeat use,
  rejected and malformed records, original sound lookup and RIFF/WAVE validation.
- [x] Verify accepted ordinary/timed/repeat cues and empty/rejected drains in the
  isolated character/SQLite fixture, including real failed-save teardown.
- [x] Read the 11,324-byte WAV directly from the final ItemSound.hpk for a CPU
  payload check. The temporary extracted sample stays in ignored test output;
  production uses the pack unchanged.
- [x] Build/stage both release clients and verify static packages plus protected
  native packs/private profiles.
- [ ] Accept actual playback, volume controls and current Mandara FX/camera in-game.
- [ ] Complete remaining item families, wire replies and full client phase gates.

[Use-sound evidence](../evidence/native-item-use-feedback-20261026.json).
No game, renderer, server or audio device was launched for these checks.
