# Resource loading and rendering optimization plan

Status: proposed, following read-only code review. No implementation, build or
runtime benchmark was performed for this plan. Keep OGRE x64, SDL3, original
Tantra resources and the native INTRO → loading → CHAR_INIT → world sequence.

The practical goal is a responsive loading screen, quick cached entry and no
visible stalls while travelling. A first cold load still requires IO, decoding,
allocation and GPU uploads; it cannot be promised to take zero time.

## Confirmed costs in the current implementation

- `src/resources/CharacterResourceCache.cpp`: `preload` inserts decoded meshes
  and animations, but ordinary `mesh`/`animation` misses load without retaining
  the result. Hits copy the decoded asset into the caller.
- `src/rendering/HtRenderFacade/WorldActorPresentation.h`: approaching an actor
  synchronously loads/binds models and animations; leaving the outer radius
  destroys its instance. Multiple instances can therefore repeat resource work.
- `NativeMapAssets.cpp` parses static TMBs for validation/collision; the OGRE
  backend reads them again to construct render geometry. The terrain-only and
  full loading stages also restart portions of map decoding.
- Visible character vertices are still skinned/uploaded on the CPU each frame.
  The hidden-LOD optimization removes wasted work but does not replace this path.
- The recorded Mandara map creates 5,742 static object batches. This is a created
  batch count, not a measurement of every frame's visible draw calls.

## Phase 1 — retained, shared asset cache

Make ordinary production cache misses populate a common asset store. Return
shared immutable mesh/animation data rather than deep copies. Keep transforms,
animation clocks, pose state and equipment choices per instance. Share source
bind data and compatible immutable GPU resources across actor instances.

Key entries by normalized full resource identity/source profile and a manifest
generation. Coalesce concurrent requests so one resource has one in-flight
load. Use source hashes and decoder/cache versions generated during preparation;
avoid hashing whole assets every frame. Give development hot reload explicit
invalidation so existing corruption/editing checks do not consume stale data.
Use memory budgets and pin current-map/player/UI essentials.

Acceptance: repeated requests for the same versioned asset cause one read and
parse; reuse preserves independent animation/equipment state and source output.

**This is the recommended first implementation slice.**

## Phase 2 — prepare runtime data during build/staging

Extend the existing asset preparation pipeline to validate all referenced
NPC/monster models, detail records, animations and textures before play. Produce
versioned derived data for map chunks, collision/query structures, immutable mesh
buffers, skeleton bindings and animation tracks. Retain decoded map models
between collision preparation and GPU creation instead of parsing them again.

Original client files remain authoritative and unchanged. Preserve the final
client's `resource`/`system` layout and stage only selected runtime dependencies.
Prepared data is project-owned derived output with provenance and deterministic
invalidation, not a replacement source of gameplay truth. Preserve native IDs,
paths, weights, alpha semantics and map transforms.

Acceptance: invalid data fails preparation with an exact path/record reason;
runtime consumes compatible prepared data without repeating full source scans.

## Phase 3 — asynchronous preparation and bounded GPU uploads

Use workers for file IO, decompression, parsing and CPU preparation. Keep OGRE
scene changes and GPU-resource creation on the renderer's owning thread.
Publish resources through explicit queued/reading/decoded/uploading/ready/failed
states, with cancellation and stale-generation protection.

Prefetch likely next resources while INTRO is active and around the travelling
player. Gate visible world entry and input on the native required dependencies:
spawn collision/floor, essential terrain, player and nearby actors/UI must be
ready. Stream distant content afterward. An actor's authoritative existence must
not produce invisible-hostile gameplay while its visuals are unavailable.

Start with a proposed upload-time budget around 1–2 ms per frame, then tune it
from measurements. Preparation readiness must not change authentication,
character-selection, cancellation or CHAR_INIT message ordering.

Acceptance: ordinary movement does not synchronously read/parse actor assets on
the game thread; cancellations/map changes cannot attach stale results.

## Phase 4 — spatial loading, visibility and geometry reuse

Use source-supported spatial visibility and distance/LOD rules. Load/unload map
chunks with hysteresis and bounded memory, and prefetch ahead of movement.
Instance compatible repeated meshes/materials instead of duplicating placement
geometry. Retain appropriate collision data beyond the visible camera region.
Preserve alpha sorting, cutouts, material differences and native object identity.

Acceptance: visible submissions and memory track the required area instead of
unnecessarily scaling with the entire world; movement/camera acceptance remains
correct. Do not obtain speed by silently discarding required scenery or HIGH
features.

## Phase 5 — GPU skeletal animation

Keep bind vertices/indices in immutable GPU buffers. Evaluate native bone poses,
upload a bone palette and skin positions/normals in shaders, including shadows.
Share animation data and compatible pose calculations where safe.

Preserve original bind inverses, matrix conventions, full authored weights,
sockets, animation transitions and equipment. Some supplied influence groups
exceed four bones; do not truncate them for a convenient vertex format. Keep a
correct supported fallback and compare against existing native CPU golden poses.

Acceptance: ordinary animated actors avoid full per-frame CPU vertex-buffer
rewrites while remaining within established source-parity tolerances.

## Phase 6 — packaging and remaining upload/startup costs

Once IO is measured, optionally add indexed, independently readable per-map
chunks/bundles and fast compression where it improves total load time. Preserve
direct GPU-friendly DDS data and mipmaps. A single compressed archive is not by
itself a steady-FPS optimization; do not copy Kathana's proprietary format.

Cache shader variants by renderer/driver/content version where supported, prepare
common materials, and keep expensive pixel/GPU-readback assertions in explicit
QA paths. Retain inexpensive format/state validation and actionable failures.
Continue UI batching/dirty-state work after profiling its remaining cost.

## Measurement and completion gates

Record first-use and retained-resource reuse separately; identify the OS cache
state rather than claiming a cold-disk benchmark without controlling it. Measure
IO bytes/read counts, parse/copy time, cache hits, allocations, GPU upload time,
visible submissions, memory and frame-time median/p95/p99. Loading latency and
steady FPS are separate metrics.

Candidate targets, subject to a measured baseline:

- One read/parse per unique asset version in a cache generation.
- No synchronous asset IO in the normal travelling-frame path.
- No buffer uploads for unchanged UI or immutable mesh data.
- A bounded upload budget and bounded memory with no unbounded cache growth.
- For a 60-FPS target, aim for p95 frame intervals near/below 16.7 ms, with hitch
  counts reported separately. A cached-entry goal below one second can be
  evaluated after profiling; it is not a current result or guarantee.

Use CPU/preparation checks first. For runtime acceptance, keep the user's limit
of one isolated offline session on one channel per requested testing slice;
collect reuse, travel and frame-time evidence within that session. Preserve
normal saves. Do not promise 1000 FPS from archive/cache changes.

Relevant background: [Kathana analysis](../reference/research/KATHANA_RESOURCE_RENDERING_ANALYSIS.md),
[performance evidence](../reference/research/PERFORMANCE.md), [native skinning](../reference/assets/AUTHORED_BIND_SKINNING.md),
[current priorities](../archive/plans/NEXT_RECOMMENDED_TASKS.md) and [full tracker](../PROGRESS.md).
