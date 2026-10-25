# Source-driven monster texture replacement

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).

## Native sequence

`Tantra/HTlauncher/HTEngineHandler.cpp:2733-2748` implements the single-mesh
branch of `HT_iCreateMonster`: create the object using its base model, resolve
`arrdwTex[0]` through the resource manager, then call `HT_hrChangeTexture` on
that instance. The zero-mesh-ID branch hides all meshes instead; the multi-mesh
branch changes textures by mesh ID. Those branches are not implemented by this
new single-mesh bridge.

`HTIntroManager.cpp:736-755` requests monster 2077 twice. The deployed
`system/ClientRes.txl` maps its first texture to MonTex ID 13086,
`MON_White_Tiger.dds`. `HTEngineHandler.cpp:477` routes monster textures to
`resource/object/Monster/MonsterTex.hpk`. The TMB's embedded `Tiger_2.bmp`
does not replace this resource-table lookup.

## Implemented component

`import_intro_monster_texture` reads the complete catalog, validates the
single-mesh branch and the expected 2077/13086/filename binding, then extracts
the exact HPK entry. A changed table fails the explicit build profile instead
of writing another resource under the previous filename. CMake stages the
payload in `derived-assets/monster`; packages include the same bytes. Provenance
records hashes for the archive, extracted payload, and binding catalog.

`changeSkinnedObjectTexture(owner, texture)` resolves and decodes the registered
texture before replacing each owned detail record's texture unit. Each part
uses its instance material. Replacement keeps one texture unit and includes
hidden detail records. It preserves transform, animation binding, selected
detail and visibility. Missing owner/resource returns false; missing resource
leaves bindings unchanged. `getObjectTextureState` reads actual OGRE material
texture units for verification. Factory reuse clears old texture units so a
destroyed instance's replacement does not leak into a recreated instance.

## Verification and limits

The existing runtime lifetime fixture now resolves the texture ID from the
catalog, creates the model, then replaces its texture. It checks all four
detail bindings, repeated replacement, missing-resource rejection, hidden
selection, a second instance retaining its original bindings, destruction,
and recreation. `TMB_TEXTURE_LIFETIME_VERIFIED` is required by smoke verification.

This is component coverage in the diagnostic gallery. Normal startup does not
insert test monsters into the intro. Gate assembly in native order, native
bind-matrix skinning, animation STOP/STD transitions, FX, and full scene parity
remain unfinished. The bridge reproduces the inspected launcher-level
single-mesh call contract; it does not establish every internal behavior of
the proprietary engine's ChangeTexture implementation.

Verification on 2026-10-22: Debug and Release x64 builds pass; both configurations
pass 43/43 CTest checks and runtime smoke including the texture lifetime gate.
Both refreshed packages pass hash/provenance verification (29 derived entries).
Logs: `build-ogre-sdl/source-texture-*`. These results establish the component
checks above, not full client or visual parity.
