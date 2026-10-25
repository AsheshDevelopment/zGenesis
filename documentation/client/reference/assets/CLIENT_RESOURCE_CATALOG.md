# Native ClientRes resource ID resolution

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
`CHTResMgr::HT_hrLoad` (`HTResMgr.cpp:619-740`) reads a one-byte version (1),
a 32-bit sheet count, then 256-byte sheet names, one-byte class types, and
type-specific tables. Each table begins with a 32-bit record count; each
record contains a 32-bit ID followed by the serialized Win32 structure.
`HTResMgr.h` supplies the fixed record layouts. This is a different container
from the remake's FX catalog; do not select a parser by `.txl` extension alone.

The supplied `TantraClient/system/ClientRes.txl` has 46 sheets and 834319 bytes.
SHA-256: `AE7EDE33A5C1E0690FB0AB3FE1B79BA04A2BC3F98B06AD4AB795435BC68E9ABA`.

The current source Type11 Item body is 200 bytes. This deployed client uses
188 bytes, with its next sheet beginning at 361263. The reader supports two
explicit profiles and accepts a profile only when every declared sheet and
record fits and consumes the entire file. It never searches for a later sheet
name to recover alignment. Unknown types, truncation, ambiguous distinct
profiles, and trailing payload invalidate loading and clear output. Item bodies
remain opaque: the 12-byte difference does not prove which historical Item
fields changed, so the reader does not apply current field offsets to them.

The type-10 Monster body is 176 bytes in the source and this client. Its name
uses 50 bytes plus 2 alignment bytes, then mesh count, base model, five mesh IDs,
five texture IDs, four item IDs, eight animation IDs (STD/WLK/RUN/IDL/ATK1/ATK2/
HIT/DIE), material ID, FX ID, scale, and four float color components. Keep names
as source bytes; the client uses legacy text encoding. Resource IDs stay
unsigned 32-bit values independently of the 64-bit host. Duplicate IDs retain
the first record, matching native `std::map::insert` behavior.

`HTIntroManager.cpp:126,736-755` selects monster 2077, not a filename inferred
from the word Intro. `HT_iCreateMonster` resolves the Monster table and its
dependent model, texture, animations, FX, sound, items, scale, and color.

| Native lookup | ID | Supplied client result |
| --- | --- | --- |
| Monster base model via MonTMD | 12083 | MON_White_Tiger.tmb |
| Monster first texture via MonTex | 13086 | MON_White_Tiger.dds |
| WLK via MonAni | 52377 | MON_Tiger_WLK.tab |
| RUN via MonAni | 52375 | MON_Tiger_RUN.tab |

The Monster row has one mesh, scale 1, and no equipped items. The mesh and
animations are loose files under `resource/object/Monster`; the texture is in
`Monster/MonsterTex.hpk`. The TMB contains 50 bones and four named detail
records. All four records now decode complete geometry and influence mappings;
native monster LOD/skinning presentation is unfinished. The
application logs the binding at the native gate-loading point and emits
`INTRO_GATE_PRESENTATION_PENDING`; it does not substitute `Intro_Login_SET`
or draw every detail record simultaneously.

The catalog probe validates all 46 deployed sheets, exact gate IDs and filenames,
both complete profile fixtures, missing-ID output clearing, truncated/unknown
schema rejection with reused output, and native duplicate-ID behavior. Runtime
smoke requires the catalog and gate-binding events in the startup trace. This
completes the resource lookup foundation, not gate-monster rendering, native
animation transitions, attached FX, sounds, or full intro resource loading.

2026-10-22 verification: Debug and Release builds passed, with 39/39 CTest
checks passing in each configuration. Both refreshed packages passed the
extended source-sequence smoke and separate gallery/lifetime checks. Logs use
`build-ogre-sdl/client-catalog-*`. Runtime diagnostics preserve the pending
gate-presentation warning; a successful catalog lookup is not a rendered mob.
