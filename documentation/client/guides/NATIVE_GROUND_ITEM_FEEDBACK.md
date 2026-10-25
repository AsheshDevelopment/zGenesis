# Native ground-item result feedback

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
- [ ] Finish other item lifecycle/result families, native quick-slot deletion,
  continuous/charged effects, money overflow, ownership, decay and online replies.
- [ ] Complete corrected FX/camera acceptance and all remaining client phase gates.

No game, renderer, server or audio device was launched during these CPU checks.
The release build initially caught a private HUD history call; presentation now
uses the public item-result API. Build/package evidence is recorded separately.

[Evidence](../evidence/native-ground-feedback-20261026.json) |
[Ground-item authority](NATIVE_GROUND_ITEMS.md) |
[Current progress](../PROGRESS.md).
