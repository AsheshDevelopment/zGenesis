# Native HPK resource loading

Updated: 2026-10-24. The production client reads the supplied HPKs directly,
without extracting their payloads into the client or a user cache.

## Original distribution paths

Keep the files at their supplied locations under
`C:\_GitHub\TantraSrc\_client\resource`:

| Folder | Supplied packs | Mapping |
| --- | ---: | --- |
| `map\<map name>\TerrainTex.hpk` | 17 | Terrain section/detail DDS entries; companion THM/TCC/TML/config files stay loose. |
| `object` including `PC`, `NPC`, `Monster`, `Item` | 46 | Each archive stem identifies its model/texture family. |
| `fx` | 67 | Animation/model/sound/texture/environment packs keep separate families; TXL/TFX companions stay loose. |
| `UI` | 8 | Separate INTRO, MainUI and GuildMark families. |
| `sound` | 10 | Samples use their selected ETC/PC/item/monster/NPC/FX archive. |

These are **148 existing files**. No renaming, merging or repacking is required.
For example, `resource/object/Mandara1stObjTmb/example.tmb` is a virtual lookup
into `resource/object/Mandara1stObjTmb.hpk`; no extracted directory is required.
See [the preservation inventory](../evidence/native-hpk-runtime.json).

## Lookup and loading

- HPKs take precedence over stale loose copies. Missing entries in an existing
  family produce a missing-resource result instead of using stale loose data.
- Lookup is case-insensitive. Map objects retain regular-before-pop precedence.
  PC/NPC/monster textures search the primary pack, then `Tex2.hpk` if supplied.
- MainUI searches `MAINUI`, `MAIN_ITEM`, `MAIN_RESOURCE`, `MAIN_SKILL`, in order.
  INTRO searches `INTROUI`, then supplied `IntroUIetc` and `IntroUIChar`
  companions. The groups stay separate: 42 supplied filenames overlap.
- INTRO action/click samples use `ETCSound`; INTRO monster samples use the
  map-catalog-selected archive. NPC/monster sound profiles are not merged.
- Indexes are cached with file-size/mtime invalidation. Only selected payload
  spans are read on demand. OGRE receives read-only memory streams; SDL3 WAV
  decoding uses memory and needs no temporary sound files.
- Existing BMP color keys, DDS/TGA alpha, `_TGA` cutouts, mip data and terrain
  detail texture handling remain in their existing decoding/material paths.

The deployed version-1 layout is a 12-byte little-endian header
`version, entryCount, dataOffset`, followed by 264-byte entries:
`name[256], size, bodyRelativeOffset`. Headers, names and payload bounds are
validated. Empty archives are supported. The old source `HTPackFile.h` has a
different filename-size layout; using its `sizeof` would misread these packs.

## Build and staging

Run `C:\_GitHub\TantraSrc\build-htlauncher.bat` as before. Staging overwrites
the built `_client\HTLauncher.exe`, preserves existing HPKs at their exact
resource-relative paths and inventories them as `native-hpk` in
`_client\system\CLIENT_FILES.tsv`. Existing client HPKs take precedence over
reference copies in `TantraClient`.

Cleanup removes only unchanged obsolete loose files owned by the previous
manifest. Unknown/user-modified files and `userdata` survive. Required loose
companions, authority tables, system files and DLLs remain. Explicit extraction
tools still serve development imports; production packed resources do not
depend on those generated payloads.

## Verification and limits

The CPU probe indexes 148 packs with 12,379 entries (3,269,832 index bytes),
compares 293 first/last payload samples, loads 141 UI images and decodes 53 WAV
samples using the runtime SDL3 decoder. Mandara checks read 723 packed
references and 323 rigid models; 40 textures have alpha. Focused fixtures check
case folding, archive precedence, missing entries, malformed ranges, Tex2
fallback and OGRE streams. Map/MainUI extraction directories must remain absent.

No graphics/audio device, HTLauncher process or game window is started. These
checks do not establish visual acceptance, every payload's format correctness,
complete FX playback, all-map gameplay support or improved FPS. Broader
INTRO/collision/environment/loading acceptance remains open.

The final Release x64 launcher was built and staged successfully. All 148 HPK
paths and SHA-256 hashes match the pre-staging inventory. The 1,515-file
distribution passed original-layout, x64 import and embedded-icon checks; the
staged launcher hash matches the built executable. See the linked evidence.

Build/probe/staging outputs are retained in
`C:\_GitHub\TantraSrc\_remake\build-ogre-sdl\hpk-*.log`.
For CPU-only distribution verification, run:

```powershell
python .\_remake\tools\verify-final-client.py --client-root .\_client --skip-runtime
```

## Source and implementation references

- `C:\_GitHub\TantraSrc\Tantra\HTlauncher\HTEngineHandler.cpp`: native
  load/unload sequence, primary/Tex2 textures, regular/pop objects, selected
  sounds, `HT_hrLoadIntroUIData`, `HT_hrLoadMainUIData`, `HT_hrLoadSoundData`.
  The inspected old INTRO loader opens INTROUI; extra supplied INTRO packs are
  compatibility fallbacks, not a claim that this old function opens them.
- `C:\_GitHub\TantraSrc\Tantra\Engine\HTUtilLib\HTPackFile.h` and
  `C:\_GitHub\TantraSrc\Tantra\inc\HTPackFile.h`: original pack interface,
  case-insensitive lookup, and older header layout.
- `C:\_GitHub\TantraSrc\_client\system\ClientRes.txl`: IDs, filenames, map bindings.
- `C:\_GitHub\TantraSrc\_remake\src\resources\HpkArchive.cpp`: bounded reader.
- `C:\_GitHub\TantraSrc\_remake\src\resources\NativeResourceIO.cpp`: virtual lookup/cache.
- `C:\_GitHub\TantraSrc\_remake\src\rendering\OgreBackend\NativeHpkArchive.h`: OGRE adapter.
- `C:\_GitHub\TantraSrc\_remake\src\audio\HtSampleAudioService.cpp`: memory WAV decoding.
- `C:\_GitHub\TantraSrc\_remake\tools\stage-final-client.ps1`: path preservation/manifest.
- `C:\_GitHub\TantraSrc\_remake\src\tools\native_hpk_runtime_probe.cpp`: CPU checks.
