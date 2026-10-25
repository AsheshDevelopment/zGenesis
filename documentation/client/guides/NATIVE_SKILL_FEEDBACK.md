# Native skill feedback

Owned unit/area replies now reach the HUD after CHAR_INIT. Successful owned unit
replies update HP/TP; area replies update TP, following the source broadcast.
Preparation, foreign and rejected frames do not overwrite those values.

Skill-book deadlines drive cooldown blocking and the original square FX image
23661. The source uses sixteen shrink steps and a dark disabled-slot overlay.
Expiry removes the visual at the deadline; native quickslot use requires strictly
later time. The adapter uses the authority clock, bounds short frame durations
and handles 32-bit wrap. Duplicate bindings and page/orientation changes share
one skill deadline. [Ordinary item timers](NATIVE_ITEM_COOLDOWNS.md) now use
authority deadlines and the same FX; continuous/charged-item phases remain open.

Unit hit/critical and dodge history uses HTMessage.txl IDs 1108 and 1121;
cooldown rejection uses 1287. Message parameter metadata supplies names/damage.
Source colors, five system rows, 105 retained lines, 380-pixel wrapping and native
window-202 positions are retained. Full chat controls and D3D8 glyph parity remain
open; text uses the existing GDI locale/font adapter.

MainUI image loading now supports keyed BMP and true-colour TGA, including RLE,
origin flags and alpha. Original BMP_TIMER_0.TGA is 32x32 with alpha 199 on every
pixel. Its original HPK payload is used unchanged.

Reference root: C:\_GitHub\tantra-dev-main\_references\Tantra\HTlauncher.
Relevant files: HTMainCharacter.cpp, HTQuickSlot.cpp, HTInterface.cpp,
HTChatting.cpp/.h, HTInfoLoad.cpp, HTextern.cpp, HTMessageDef.h and
HTClientParamMgr.h. Asset reference:
C:\_GitHub\TantraSrc\TantraClient\resource\UI\MAINUI\BMP_TIMER_0.TGA.

[Evidence](../evidence/native-skill-feedback-20261025.json): 84 feedback/image
checks, 138 authority-route checks and 426 UI checks pass. Release x64 staging
and static checks pass; no game/renderer was launched. Rendered acceptance,
full error paths, floating damage, TFX/audio and the full client remain open.
