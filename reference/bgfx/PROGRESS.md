# ZFLauncher bgfx progress and continuation

Updated: 2026-10-26. Status: **runnable offline development client; full plan incomplete**.

## Completed

- [x] Keep the phased [implementation plan](IMPLEMENTATION_PLAN.md) in place.
- [x] Capture 379 reused source/tool hashes, original commit/dirty patch and nine canonical input hashes.
- [x] Pin bgfx/bx/bimg/build wrapper/SDL3/SQLite and build C++20/x64 Debug and Release.
- [x] Implement the bgfx backend, shader pipeline, native resources/UI, CPU skinning, sockets and conservative culling.
- [x] Seed a separate profile without modifying source saves; committed WAL recovery occurs only in a private snapshot.
- [x] Switch the dedicated runtime to `_client_bgfx`; stage only bgfx-owned files and preserve the original `_client`.
- [x] Run original offline login/roster/INTRO, create/select/delete, CHAR_INIT/Mandara and minimum controls through real SDL input.
- [x] Accept the C06 minimum service/combat gate, including paid repair/reload, failure/cancellation cases and source death/revival.
- [x] Verify eight tribe previews, full-roster/duplicate rejection and corrected creation retry.
- [x] Preserve authored deformed normals and verify the directional shadow depth/pixel path independently.

## Evidence

Evidence below is local under ignored `build/evidence`; source, tools and the
dependency lock remain reviewable. Runtime evidence pins its executable hash;
newer source does not retroactively change the scope of an earlier pass.

| Scope | Evidence | Result |
| --- | --- | --- |
| Baseline | `c00-baseline-inputs/RESULT.json` | 379 original files and nine native/runtime inputs unchanged; dependency pins verified |
| Shell/build | `c01-shell`, `c01-builds` | D3D11 shell, resize/minimize/restore, clean shutdown; Debug/Release artifacts |
| Original asset | `c02-assets` | HPK model and native textures; overlapping UI; capture inspected |
| CPU readers/pose | `c02-resources`, `c03-profile-pose` | Catalog/material/profile/HPK and native bind/clock/creation/record tests passed |
| Saved preview | `c03-roster-backbuffer` | ashesh login, copied roster, triangle-picked actor; actual GPU capture inspected |
| Roster lifecycle | `c03-roster-lifecycle-guarded` | Cancel preview, reject unallocated Chakra, create/select, cancel deletion, reject empty proof, delete; SQLite original character rows identical |
| World entry | `c04-entry-actor-catalog` | Source CHAR_INIT, map 40001, 524288 terrain triangles and 6503 placements; native HUD and actors visible |
| Controls | `c05-controls` | Inventory I toggle, right-drag orbit, Insert reset; native ground click moved from [5162.5,6602.5] to [5202.45,6602.52] |
| CPU navigation/gameplay | `c05-navigation-cpu`, `c06-gameplay-schema4` | Camera/source controls, offline gameplay, deterministic probability and schema4 persistence passed |
| Actual basic encounter | `c06-basic-combat` | Real E/R input, approach, attack, monster2001 defeated; HP10 to6, Prana604 to704; decoded native SQLite record matches final HP/Prana/cell |
| Profile rejection | `c03-profile-isolation` | Normal profile and unsupported renderer rejected before a window/database write |
| Dedicated client cleanup | `client-bgfx-cleanup` | 18 copied runtime/diagnostic files removed, 12484910 bytes; all dedicated assets/saves and original `_client` unchanged |
| Dedicated builds/package | `c01-dedicated-builds`, `c08-dedicated-package` | Latest Debug/Release build hashes and shaders; staged imports/owned files verified; no OGRE/SDL3 DLL imports |
| Dedicated native client | `c05-controls-dedicated-client` | Login/Mandara, inventory, orbit/reset and movement passed with `_client_bgfx`; native before/after snapshots and protected hashes retained |
| Dedicated CPU/guards | `dedicated-client-cpu.log`, `c03-profile-isolation-dedicated`, `c00-dedicated-source-preservation` | 15 selected CTests; both legacy profile destinations rejected; 379 source/nine input hashes preserved |
| Culling/profile safety | `zf_frustum` CTest; `tests/test_profiles.py` | 16 conservative-frustum cases and five seed/WAL/refusal tests passed |
| Warehouse/save | `c06-saved-services-hud-picking` | Real native NPC clicks and ground routes; item0 to cargo119 to inventory20 without changing instance fields; deposit250/withdraw100; cargo revision2 to6; save/current cell [486,173] |
| Service reload | `c06-services-reload` | Separate login/process from the saved result; complete native character and cargo payloads restored byte-for-byte; decoded native state unchanged |
| Service CPU/safety | `c06-services-cpu`; `tests/test_native_inspection.py` | Four CTests including native NPC price/repair/stale/range/dead/capacity checks; nine Python safety cases including immutable Unicode inspection and legacy no-cargo schema |
| Merchant/native repair eligibility | `c06-merchant-native-eligibility` | Actual Vartan route and quantity/buy/sell confirmations; item4002 costs225 and sells37; money99647 to99459; ineligible potion and unneeded full-durability weapon repair both rejected without charge |
| Merchant reload | `c06-merchant-reload` | Separate login restores full character/cargo bytes; inventories, cargo and other character records preserve the verified result |
| Final C06 build/package/source | `c06-complete-builds`, `c06-complete-package`, `c06-complete-source-preservation` | Latest Debug/Release builds and staged imports verified; 379 original files, nine initial inputs and six repair-source inputs unchanged |
| Paid repair and failures | `c06-paid-repair`, `c06-no-money`, `c06-full-inventory` | Paid native starter repair 0 to 4500 for 15 Rupiah; money/capacity rejection, both prompt cancellations, ineligible repair and complete native inventory/cargo checks passed |
| Paid-repair reload | `c06-paid-repair-reload` | Separate process restored complete repaired character/cargo bytes and preserved the source/default profiles |
| Native player death/revival | `c06-death` | Actual hostile damage from HP1 opened death UI; keyboard bypasses rejected; mouse revival restored saved cell and native HP10/TP6; SQLite matched |
| Eight tribe previews | `c03-eight-previews-complete` | All eight source previews, face/hair changes and cancellation; saved character rows unchanged |
| Roster boundaries/retry | `c03-roster-boundaries` | Full roster, delete cancellation, empty proof and duplicate rejection; corrected retry filled slot 2 without changing slots 0/1 |
| Authored normals | `zf_normal_transforms`, `proceed-cpu.log` | Affine inverse-transpose tests and actual Tiger/Asura submeshes at four poses; eight previews rendered the authored normals |
| Directional shadows | `c07-directional-shadows-final` | 2048 depth map; player casting removed 1356 triangles and changed 2635 pixels; restoration reproduced original pixels exactly |
| Shadow profile options | `c07-shadow-profile-options` | Player casting/pixels remained reversible; disabled render profile submitted no depth geometry; enabling restored the original caster count |
| Renderer lifetime | `c08-renderer-reinitialization` | Resize/minimize/restore and three shutdown/reinitialize/submission cycles; empty scene/resource counters after each restart; repeated shutdown harmless |
| Settled death presentation | `c06-death-presentation` | Source-selected death animation completed once and held its final pose, native HP label reached zero, and revival HP/TP and saved cell persisted |
| Frame measurements | `c08-idle-frame-sample` | 240 frames at 1024x768: median 9.4455ms, p95 10.6836ms, p99 11.4916 ms; valid GPU median 2.22758ms; unchanged frame-stat quad had no geometry uploads |
| Current build/package/source | `proceed-accepted-builds`, `proceed-accepted-package`, `proceed-accepted-source-preservation` | Debug/Release, four shaders and 14 owned staged files verified; all pinned original inputs unchanged |
| Current CPU/safety | `proceed-cpu.log`, `proceed-python-verified.log` | 17 selected CTests and 11 Python tests passed |
| Native actor facing | `c05-facing-english-native-pick`; `zf_native_facing` | Real left/right ground movement and heading alignment; independent cardinal/diagonal matrix checks; corrected running captures inspected |
| Intro facing | `c03-intro-native-facing` | Copied-roster login; intro gate tigers face inward after the native-to-bx yaw conversion; capture inspected |
| English display/names | `c06-english-monster-target`; `zf_philippine_english` | Philippine columns supply 7651 name/description/message fields; readable Vasabhum target and overhead labels; native death/revival retained |
| Facing/text checks | `facing-english-verified-cpu.log`, `facing-english-python.log` | Six rebuilt focused CTests and 14 Python tests passed |
| Facing/text package | `facing-english-builds`, `facing-english-package`, `facing-english-source-preservation`, `facing-english-source-inputs.json` | Debug/Release and 16 owned staged files verified; original binary assets/saves and both source XML inputs unchanged |

Runtime before/after hashes passed for the accepted runs. The first
`c03-roster-lifecycle` attempt passed UI assertions but failed preservation: normal
OGRE database/UI files and its diagnostic log changed concurrently. It is retained
as a failed acceptance attempt; no normal profile was restored or overwritten.
The runner now checks launchers before/during each attempt and terminates only its
own process on interference. The guarded run passed both preservation and exact
character-row restoration. The original module source hashes remain unchanged.

Historical runtime rows above used `_client` before the user's explicit change
to `_client_bgfx`. Their immutable evidence is retained with its original paths.
Current build/preset/staging/runtime defaults use `_client_bgfx`; its copied
`userdata/zflauncher` is preserved. Cleanup removed OGRE/HTLauncher/plugins,
the dynamic SDL3 DLL (ZFLauncher embeds SDL3), obsolete OGRE manifests and copied
logs/dumps. Required Visual C++ DLLs remain. Source-decoded native profile
inspection uses `bgfx_profile_probe` with read-only closed SQLite data, rejects
pending WAL and emits no credential verifiers.

The first `c06-saved-services` runtime stopped at the warehouse click: the original
probe chose an NPC triangle below the native bottom HUD. It performed no warehouse
transaction. The accepted run requires the closest intended actor, a HUD-free
point and bounded ordinary camera adjustments. Picking now excludes hidden,
unbound, inactive-LOD and depth-clipped geometry. Both attempts are retained.

Native inspection now uses SQLite `immutable=1` and URI-escaped Unicode paths:
ordinary `READONLY` can still change WAL shared memory. Database and companion
hashes/mtimes are verified in regression fixtures. Legacy profiles without cargo
are inspected without schema mutation; migration remains authority-owned.

`c06-merchant-services` exposed missing native repair eligibility: the old path
accepted the first occupied slot, a consumable. Its old assertions passed but
the run is superseded in `REVIEW.json` and is not current repair acceptance.
The offline authority now enforces the native NPC item-family restrictions and
documented zone exceptions from `HTNPCControl.cpp:5531-5563`, with source hashes in
`docs/evidence/repair-source.json`. The corrected run explicitly rejects the
consumable, preserves its durability/count and charges nothing for the already-full
weapon. Paid repair subsequently passed both runtime and separate full-record
reload as recorded above. No normal/default profile was used for transactions.

The same source audit added `HTItemSystem.cpp:3726-3748` displayed-durability
rounding. A recorded weapon at4410/4500 still displays45/45 and must be rejected
as unneeded repair. That case now has an authority regression check; the profile
was inspected from existing evidence, not edited to create a damaged-item test.
`c06-merchant-final` verifies the staged rounding build with the same successful
buy/sell and repair-rejection assertions. `c06-final-cpu.log` records16 passing
selected CTests; `c06-repair-rounding-cpu` retests the four affected gameplay cases
after the rounding fix, and `c06-python-safety.log` records nine passing safety tests.

The C06 minimum gate is now accepted. Controlled QA fixtures are explicitly
generated as new profiles under `build/evidence`, with source-created characters
and recorded money/durability/HP/position controls. They never edit an imported
checkpoint or default profile. Merchant scenarios compare complete native item
fields, account cargo and other characters, and verify native table prices.
Stale/range/dead/invalid requests remain covered by the authority CPU cases.
The broader skill/AI/combat feedback requirements remain open.

The first eight-preview attempt rendered all tribes but hit the original
single-character frame budget during the final camera transition. The corrected
budget passed; both attempts are retained. The first shadow assertion compared
total caster counts across moving-actor frames and failed. The accepted probe
redraws on/off/restored at dt=0 in one callback, with both geometry and reversible
pixel checks. Alpha-aware shadow shaders, 3x3 depth comparisons, slope bias,
edge fade and texel snapping are implemented; broad quality parity remains open.
The existing render-profile shadow switch now controls the pass. Shutdown
invalidates every uniform/shader/depth/framebuffer handle and clears scene,
lighting and resource caches before reuse. The three shell restart cycles do
not close full world/device-loss/focus/DPI recovery acceptance.

`c06-death` originally captured the dialog immediately after damage, before the
native pose and queued HUD notification settled. `c06-death-presentation` waits
for the source-selected finite death animation to finish, verifies the held pose
and zero HP label, then confirms revival through ordinary native UI. Its captures
were visually inspected. This does not accept the broader impact/audio/FX matrix.

Frame-stat textures now reuse their quad and resource counters are sampled once
per second or invalidated on ownership-count changes. Authored deformation and
world normals use inverse-transpose matrices. CPU skinning remains. The idle
sample used the NVIDIA GPU (PCI 4318/10401; RTX4050 Laptop), i7-12650H, about 32GB
RAM, native scene and 2048 shadow depth. The earlier instrumented sample overlapped
a Debug build and is excluded from the idle baseline. Short stationary samples
do not accept sustained 60 FPS, startup/stall budgets or matched OGRE quality.
The runner now separately hashes the default bgfx profile before/after isolated
runtime checks, including controlled fixtures.

## Still open

The facing fix changes the renderer boundary rather than gameplay directions:
native positive yaw sends authored +Z toward `(sin(yaw),0,cos(yaw))`, while bx's
SRT helper requires the opposite Y angle. Picking, sockets, normals and shadows
consume the corrected object matrix. World names use source height anchors and
yellow NPC/white basic player/monster text. Text bitmaps are cached/reused and
ordered behind MainUI; speech, conditional name colours and full occlusion remain
outside this accepted name slice. The old stationary timing evidence predates it.

English text is derived from `GenesisK3-XMLs/TantraParam.xml` and
`GenesisK3-XMLs/XMLS-XLS/HTMessage.xml`, defaulting to Philippine column headers.
The generated table preserves worksheet/ID/field identities, UTF-8, blank English
cells and authored placeholders. Native binary IDs/parameters and source files
remain untouched. The first facing probe captured both corrected run directions
but failed on its town seed's hostile-only E target selection; the accepted probe
uses normal triangle picking of a visible actor. The failed attempt is retained.

- [ ] Complete remaining appearance/equipment/LOD and repeated transition matrices; eight tribe previews and roster boundary/retry checks passed.
- [ ] Broaden inventory/service combinations beyond the accepted C06 minimum; paid repair/reload, money/capacity failures and prompt cancellations passed.
- [ ] Accept complete encounter hit/death/reward/audio/FX coverage; CPU fixtures are distinct from native runtime outcomes.
- [ ] Broaden blocked/narrow navigation, camera zoom/obstruction, quick-slot/layout reload and UI/tooltip acceptance.
- [ ] Tune and compare shadows through foliage/camera/movement matrices; complete sky/cloud/sun/water/weather and full TFX semantics.
- [ ] Implement GPU skinning; authored deformed normals and nonuniform world transforms now have CPU/runtime evidence.
- [ ] Add generation-aware asynchronous loading/cancellation, immutable GPU world buffers, pooling and performance/recovery gates.
- [ ] Validate clean-machine/relocation/dependency closure, full DPI/focus/device-loss behavior and release packaging.
- [ ] Complete the plan's C09 systems; online/server work remains paused and unchanged.
- [ ] Finish authenticated remote checkout/submodule/worktree administration, and commit/push only when requested.

## Next continuation

1. Broaden C05 blocked/narrow routes, zoom/obstruction, quick-slot/layout reload and tooltips, preserving the documented missing authored collision limit.
2. Continue C07 sky/cloud/sun/TFX/audio and matched shadow/foliage views; eight previews and directional shadow submission/pixel checks are accepted slices.
3. Use the recorded baseline to prioritize spatial batching, immutable buffers, GPU skinning and responsive loading; then perform repeated lifecycle/recovery and relocation checks. Full performance/release gates remain open.

Known source gap: Mandara's `r01_common_cart01.bmp` is absent from the canonical
client. The renderer reports it and uses the same authored untextured material as
the OGRE baseline. Other unexpected missing materials fail. Missing authored `.tbo`
collision remains a parity limit; geometric navigation is a bounded fallback.

These are development slices, not visual/performance parity or production
completion. No 60 FPS or whole-repository test pass is claimed. No server process,
commit or push was performed.
