# Native PC creation previews

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The remake now has a rendered creation-appearance component for all eight
client tribes, five faces and five hairstyles: 200 combinations. It uses the
original models, native skin weights/bind hierarchy, catalog-selected clothing
textures and independently animated hair/apron attachments. The normal offline
INTRO now uses it for creation and empty-equipment roster previews. See
[the production integration, verification and pending fidelity work](../../archive/checkpoints/INTRO_CHARACTER_RUNTIME.md).

## Source and implementation

The reference is `Tantra/HTlauncher/HTEngineHandler.cpp`:

- `HT_iCreateCharacter`, starting at 2393: create the base model, hide its meshes,
  choose the head and equip defaults.
- Resource loading around 2908-2965: PC model plus table-ordered body, front
  apron, back apron and two hair animation requests, for tribes 1 through 9.
- `HT_hrChangeObject`, starting at 4794: separate skin parts from named socket
  attachments, use native display textures and per-tribe PCTMD scales.
- `HT_hrEquipDefault` and `HT_hrChangeHead`, starting at 5748 and 5771.
- `HTIntroManager.cpp:75-115,2081-2086`: new-character position/yaw, cameras and
  STD animation. The caller must still apply the original terrain-height rule
  when these previews are connected to the loaded INTRO world.

`resources/NativePcResources` reads the source-width PC, Head, UpWear, DownWear,
HandWear, Shoes, PCStateAni, PCTMD, PCTex and PCAni records. PCStateAni's tribe
column order differs from the client tribe IDs; the resolver maps it explicitly.
`assembleNativePcSkin` retains the basic model's authored bind skeleton and
socket table while replacing hidden geometry with the selected visible parts,
their LOD records and explicit display textures.

`rendering/HtRenderFacade/NativePcPresentation` owns one preview and its socket
models. Its input positions are source units, converted once by 0.001. Body
skinning uses the existing native non-control-position mode; hair/aprons use
their own native model/animation bindings. Missing resources fail creation and
clean up partial objects. Visibility, four detail levels, independent preview
instances and repeated recreation are supported.

Creation defers the body's animation while meshes and sockets are assembled,
then starts STD as `HT_iCreateCharacter` does at line 2488, and applies the
requested INTRO facing. The GPU probe checks that every attachment is created
before that body start. Intro's additional explicit animation restart, terrain
adjustment, height query and FX remain integration events for the caller.

## Socket and file-format evidence

[`tools/inspect-native-pc-sockets.py`](https://github.com/Tantra-Development/_remake/blob/main/tools/inspect-native-pc-sockets.py)
checks the deployed `HT3DHeaven.dll` SHA-256 before reading instructions. It
never executes legacy code. The permanent output is
[`evidence/native-pc-sockets.txt`](../../evidence/native-pc-sockets.txt).

After the validated skeleton tree, the engine reads ten float words, a socket
count, then records containing two 256-byte names, three position floats and
four quaternion floats. Socket names and parent bone names are separate.
The native row-matrix calculation is socket local × transposed file bind ×
skin matrix. Combined with the verified skin calculation, its column-vector
equivalent is **animated parent world × socket local**.

`HtCharacterInstance::nativeSocketMatrix` implements that calculation. The
OGRE bridge retains the complete affine matrix in a vertex-shader constant;
converting it through a scene-node quaternion changed slightly non-orthogonal
authored transforms. Native per-attachment scale applies to geometry before
the socket transform, and the parent instance position/yaw/scale applies after
it. Runtime verification reads the actual shader constants for every LOD
record, as well as the scene hierarchy's transform.

Animated local bounds are rebuilt each frame. Attachment bounds receive the
same affine transform as the shader, so OGRE culling follows the drawn hair
instead of an untransformed box near the character origin. Seven isolated
hair captures at the source face-zoom camera verify visibility with the body
hidden; Naga's default first hairstyle is bald. This is a culling check, not
proof of the pending height-adjusted native face-zoom UI transition.

The decoder also handles two supplied-asset cases:

- Gandharva's face repeats vertex-group aliases with identical bone/weight
  pairs. Those aliases are retained; conflicting aliases cannot bind.
- `PC_DEV_Hair_03.tmb` declares 441 triangles but stores material groups totaling
  440. The original engine reads indices by material counts. The decoder retains
  the declaration and follows the actual groups, with bounds checks intact.

Malformed/truncated socket tables, excessive counts, invalid/duplicate names,
missing parents and invalid transforms are rejected.

## Texture data and packaging

The supplied PCTex catalog makes 793 filename requests, resolving to 789 unique
entries in the 792-entry `resource/object/PC/PCTex.hpk`. The three unreferenced
archive entries are excluded. `HTPackFile.h:23-35` uses `stricmp`; the importer
also resolves names without case sensitivity, including catalog `GAN` versus
archive `Gan` spellings, while retaining archive entry filenames and bytes.

`tools/import-native-pc.py` runs the native resource probe, verifies each selected
output byte-for-byte against its archive payload and writes
`derived-assets/native-pc/PROVENANCE.tsv`. The ledger includes entry names,
payload hashes, source archive hash and ClientRes hash. `PCTEX_REQUESTS.tsv`
retains the original catalog request sequence, including duplicate requests.
Only the supplied PCTex archive is implemented here; no PCTex2 archive exists
in this canonical client profile.

This dataset supports both the development preview probe and production offline
INTRO preloading/previews. Staging includes its used dependencies in `_client`,
preserving `resource/object/PC/{Mesh,Ani,PCTex}`. See the current runtime record
in [INTRO_CHARACTER_RUNTIME.md](../../archive/checkpoints/INTRO_CHARACTER_RUNTIME.md).

## Reproduction and acceptance evidence

From `C:\_GitHub\TantraSrc`, build the resource, socket and renderer probes in
the selected configuration, then run:

```powershell
python _remake/tools/inspect-native-pc-sockets.py --output _remake/docs/evidence/native-pc-sockets.txt
python _remake/tools/import-native-pc.py
python _remake/tools/verify-native-pc-render.py --configuration Release
python _remake/tools/verify-native-pc-render.py --configuration Debug
```

The runtime verifier needs the matching existing development package under
`package/x64/<configuration>` for its OGRE plugin configuration/runtime.
The probe build copies its matching OGRE/SDL3 loader DLLs beside the probe.
The source roots are read-only. No original executable or DLL is executed.

CPU checks cover all 200 appearance lookups, 454 distinct preload animations,
118 used skin files, 43 attachment files and 356 assembled/default LOD records
with bind-pose identity and finite animated deformation. A separate socket
check exercises 31 known Naga sockets under synthetic rotated/translating
parents, six malformed table cases, the Deva count mismatch and conflicting
Gandharva aliases.

The actual OGRE/SDL3 probe creates, animates and destroys all 200 combinations,
with 595 animated socket instances and no texture fallbacks. Default previews
also exercise all four LODs, hide/show, position/yaw/scale inheritance, duplicate
attachment/cycle rejection, recursive parent destruction and peer isolation.
Eight full-preview PNG captures must be distinct, nonblank, unclipped 1024×768
frames; seven additional hair close-ups must contain visible hair. Their
hashes and pixel bounds are saved in `pc-preview-<configuration>/VERIFIED.json`.

The current Release/Debug probes additionally verify eight tribes' head changes:
animation clock and renderer-space placement are retained, old display/socket
resources are released, posed-triangle picking finds the visible body, and
shared UI bitmap IDs accept identical pixels while rejecting conflicts.

At the earlier component checkpoint, both x64 configurations passed 72/72 CTest checks, the 200-appearance GPU/capture
probe, original runtime regression smoke and 115-file final-layout/relocation
verification. Both also passed audio-enabled SQLite login/server persistence
checks during this continuation. After the final renderer order/bounds corrections,
the GPU and regression/layout checks were rerun; the CPU-only test executables
were unchanged. Release's strengthened original-Gandharva/negative-alias fixture
and final development-package inventory additionally pass their targeted rerun.

The maximum observed effective socket-matrix element error in both GPU runs is
`1.19209e-07`, against a `2e-06` verification tolerance. Captures and JSON reports
are in `build-ogre-sdl/pc-preview-release` and `pc-preview-debug`; source evidence,
build, CTest, runtime and layout logs use `build-ogre-sdl/pc-*.log`.

Preview rendering is not a full native visual-parity
comparison: lighting/material/alpha behavior, normals/shadows, selection FX,
terrain-height placement, equipped roster items, general static attachments,
other animation states and full world entry remain unfinished. Native posed
triangle picking and the normal INTRO UI/zone/SQLite character response sequence
now have separate production runtime verification; those claims come from the
character-flow tests, not the 200-appearance component probe.
