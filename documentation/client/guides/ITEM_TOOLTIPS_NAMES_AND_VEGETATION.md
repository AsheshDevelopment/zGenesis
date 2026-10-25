# Item hover, native name labels and vegetation depth

Updated: 2026-10-25. CPU/build checks and visual acceptance are separate.

## Implemented

- [x] Add item hover information for occupied inventory, equipment, warehouse,
  merchant and item-bound quick slots. Resolve the actual item instance and
  original TPA metadata, rather than the icon or TXL resource name alone.
- [x] Capture native item-layout offsets from `HTClientParamMgr.h`, retain the
  validated shipped item stride, and read English name/description, five base
  effects, durability, stacking, requirements and buy/sell prices.
- [x] Generate rarity ID ranges, message IDs and simple effect-message routing
  from the native source. Retain native unique/rare/quest colours and safe
  translated template substitution. No translated text is executed as printf.
- [x] Use the original 200 ms hover delay, 14-pixel line spacing, 20-pixel
  pointer offset, 80% dark background and a maximum of 35 displayed rows.
  Wrap locale text, clamp content at the viewport edge and draw after dialogs.
- [x] Cache item information/raster output; unchanged hover frames only move
  the existing sprite. Hide on drag/click, empty/covered slot, modal prompt,
  hidden HUD, closed panel or focus cancellation.
- [x] Set player names at native model height +3 rather than fixed +34, and
  remove the old 32-pixel label canvas's additional visual lift. Normal names
  are white; the supported Karma condition uses native red. Speech is separated
  from the name row. Full guild/PvP/siege name styling remains separate work.
- [x] Use source NPC name height +25/yellow and monster model height +5/white.
  Preserve the two-raster-uploads-per-frame budget and hide stale labels when
  their content/colour cannot yet be refreshed.
- [x] Apply captured UI RGB to label pixels on creation, NPC text update and
  dimension rerasterization. NPC headings/choices now retain native orange;
  ordinary dialogue body stays white. Alpha/shadow coverage is preserved.
- [x] Apply a targeted static-world vegetation material policy: straight-alpha
  `_TGA` tree/grass/leaf textures containing holes use depth-writing cutout,
  even when interpolation creates fractional edge samples. The previous
  translucent, non-depth-writing cards depended on coarse batch sorting and
  could overlap other trees/buildings incorrectly.
- [x] Retain original texture bytes, actual alpha decoding, water/other true
  translucency, premultiplied textures and INTRO fractional blending. The
  vegetation policy is a renderer correction, not a claimed binary-verified
  native material flag. Its edge/coverage appearance still needs acceptance.
- [x] Pass focused item/locale/requirement/colour/clamping, alpha classification
  and existing MainUI interaction CPU checks. Build and staging evidence is
  recorded in the linked JSON.
- [ ] Accept hover display, name spacing/colours and foliage depth in-game.

## Source and implementation

Source root: `C:\_GitHub\tantra-dev-main\_references\Tantra`.

| Native reference | Behavior |
| --- | --- |
| `HTlauncher\HTObjectInfo.cpp:417` | Item tooltip row assembly |
| `HTlauncher\HTItemSystem.cpp:1749` | Instance name/refine, rarity, description and item information |
| `HTlauncher\HTItemSystem.cpp:2555` | Durability /100 with upward rounding |
| `HTlauncher\HTSkillSystem.cpp:1479`, `:2389` | Effect-to-message routing and parameter substitution |
| `HTlauncher\HTInterface.cpp:642` | Tooltip delay, layout, colour and clipping |
| `HTlauncher\HTMainCharacter.cpp:3772` | Model-height +3 name anchor and normal/Karma colours |
| `HTlauncher\HTNPCSystem.cpp:589` | NPC name +25 and yellow text |
| `HTlauncher\HTMonsterSystem.cpp:630` | Monster model-height +5 and white text |
| `HTlauncher\HTInterface.cpp:5027` | Orange NPC heading/choices and white conversation text |
| `HTlauncher\HTextern.cpp:421` | Native colour table |

Implementation root: `C:\_GitHub\tantra-dev-main\_remake`.

- `src\resources\NativeClientSkillResources.*`, `NativeItemTooltip.*`,
  `WorldTextureAlpha.h`.
- `tools\generate-native-client-skill.py`, `generate-native-item-tooltip.py`.
- `src\rendering\HtRenderFacade\MainHudTooltips.cpp`, `MainHudPresentation.*`,
  `MainHudHotkeys.cpp`, `NativeLabelRaster.h`, `NativePcPresentation.*`.
- `src\rendering\OgreBackend\OgreBackend.cpp`, `src\app\tantra_remake_main.cpp`.
- `src\tools\native_world_presentation_probe.cpp`, `world_texture_alpha_probe.cpp`.

Original runtime inputs: `C:\_GitHub\TantraSrc\TantraClient\system\TantraParam.tpa`,
`HTMessage.txl`, `ClientRes.txl`, native PC meshes, UI SYS/HPKs, and map object
texture HPKs. The screenshot clarification targets trees/buildings/foliage
depth overlap, not a request to prevent ordinary UI window overlap.

## Remaining limits

- Tooltip composition supports the core fields and direct/function-selected
  effect messages. Complete client-specific main/sub-refine effect adjustments,
  level-gap penalties, mastery/context-dependent effects, time-limited/premium
  overrides and every advanced service pricing variant remain unported.
  Displayed supported effect values currently come from the base TPA row;
  a `+N` instance title does not establish full refined-stat tooltip parity.
- Ground-item hover and complete skill/control tooltips are separate from the
  occupied item-slot path implemented here.
- No renderer/game/server/audio-device process was launched. CPU checks do not
  establish pixel correctness, foliage edge quality or FPS.
- No commit or push was requested. The broader goal remains paused.

[Build, package and preservation evidence](../evidence/item-hover-names-vegetation-20261025.json).
