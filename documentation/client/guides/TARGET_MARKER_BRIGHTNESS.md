# Target marker brightness correction — 2026-10-25

Compared user captures `Screenshot 2026-10-25 220539.png` (faint yellow target)
and `220552.png` (dark red attack target) with the supplied Kathana `212909.png`.
All captures are in `C:\Users\Ashesh\Pictures\Screenshots`.

The target models were already unlit, with no world-lighting/fog shader applied.
Their fragment shader nevertheless multiplied the texture RGB by texture alpha,
then used source-over compositing. That reduced the target's light contribution
and obscured the bright glow shown in the reference.

Both original target FX (`1010011` and `1010031`, selected through
`HTFXIDDef.h` / `HTMonster.cpp`) use `TGR_2100111.tga` from the native FX resources.
Decoded texture measurements:

- RGB energy before texture-alpha multiplication: **354304**.
- RGB energy after the old multiplication: **204368** (42.3% less).
- 1728 lit pixels have alpha below 128; 384 pixels have black RGB.

This fix uses an unlit additive shader for the existing NPC, monster, attack and
loot target IDs only. It adds the authored texture RGB, tinted by the original
animated TFX color/opacity, using ONE/ONE blending. Black RGB contributes no
light. Depth testing stays enabled; target models do not write depth or cast
shadows. No brightness multiplier or world exposure change was added.

Other model FX retain their existing source-over shader. This targeted choice
addresses the supplied reference appearance; it is not a claim that every
native TFX blend variant has been reconstructed from engine code.

Implementation:

- `_remake/src/compatibility/NativeWorldFeedback.h`: target-only glow policy.
- `_remake/src/rendering/HtRenderFacade/WorldSceneFxPresentation.h`: apply the
  policy to the persistent target group's native binding ID.
- `_remake/src/rendering/OgreBackend/NativeFxModelShader.h`: separate target glow
  and ordinary model FX shaders.
- `_remake/src/rendering/OgreBackend/OgreBackend.cpp`: select shader and additive
  blend factors.
- `_remake/src/tools/world_scene_fidelity_probe.cpp`: check actual native texture
  pixels and yellow/red/loot target render policy.
- `_remake/src/tools/native_lighting_compile_probe.cpp`: compile both exact FX
  shader variants without a renderer or GPU device.

- [x] Inspect all three screenshots and original target assets.
- [x] Apply the scoped target glow correction.
- [x] Pass the resource-backed CPU fixture (9111 checks) and HLSL compile checks.
- [ ] Confirm brightness and edge appearance in a user-run offline client.

Build/package and protected-file results are in
[the evidence file](../evidence/target-marker-brightness-20261025.json).
No game/renderer/audio device is launched by these checks.
