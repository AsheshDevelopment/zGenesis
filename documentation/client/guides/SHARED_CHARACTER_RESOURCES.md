# Shared character resources

Implemented 2026-10-25 in `_remake`. `CharacterResourceCache` now retains
ordinary TMB/TAB misses as well as the original nine explicit INTRO preloads.
The renderer and `HtCharacterInstance` hold `shared_ptr<const ...>` resources.
Repeated actors and animation changes reuse decoded geometry/timelines; native
LOD records are adapted once per resource version and reused across actors.
Pose matrices, transformed vertices, playback clocks and OGRE objects remain
instance state. Composing equipped PC skins still requires owned geometry to
apply the selected textures/parts; that operation must not modify cached input.

Native missing-track behavior is unchanged: a missing parent suppresses its
descendants. Previously each character copied and edited its TAB. Normalized
bindings are now immutable and cached by both mesh and animation identity, so
two skeletons cannot contaminate each other's tracks. The existing authored
bind, interpolation and blend mathematics remain in `HtCharacterInstance`.

The cache is a render-thread snapshot. `invalidate(path)` creates a new cached
version on the next load; `clear()` releases the cache's ownership. Live actors
retain their old immutable versions safely. Diagnostics without a supplied cache
still read source files afresh. The value-output overloads remain for tools and
appearance composition; normal actor/animation loading uses shared handles.

- [x] Ordinary misses retained; repeated requests share resource identity.
- [x] Failed misses leave no poisoned cache entry; a later valid source loads.
- [x] Skeleton-specific track overrides remain isolated and shared per binding.
- [x] Additional native geometry records reuse immutable prepared resources.
- [x] Invalidation/clear preserve live actor handles and allow new versions.
- [x] Release build and four focused CPU tests passed on the current sources.
- [ ] Runtime-accept this new build; it has not been launched.
- [ ] Add memory budgets/eviction, shared prepared maps/collision, background
  decode, in-flight load coalescing and bounded GPU uploads.
- [ ] Measure cold/warm loading, memory and frame-time effects. No FPS or
  instantaneous-loading improvement is claimed from the CPU checks.

From the workspace root:

```powershell
ctest --test-dir _remake/build-migration -C Release -R '^(native_character_retained_preloads|native_authored_bind_skinning|native_change_animation_blend|native_animation_slerp)$' --output-on-failure
```

The extended cache probe covers source deletion after load, two actors sharing
resources, LOD reuse, live poses after cache teardown, explicit version changes,
and missing-parent track suppression without modifying the original timeline.
The three existing math probes separately cover skinning, interpolation and
animation changes. These are CPU checks, not extra client/channel launches.
