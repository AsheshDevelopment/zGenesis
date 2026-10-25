/* Standalone export; refresh from dev-docs/_roadmap. */
window.TANTRA_ROADMAP = {
  "reviewed": "2026-10-26",
  "method": "Checked named top-level tasks / named top-level tasks. Nested subtasks and acceptance gates are displayed but excluded from the percentage. Different project checklists are not a cross-renderer comparison or release-readiness estimate.",
  "projects": [
    {
      "id": "tantra-o",
      "name": "Tantra-O",
      "engine": "OGRE 14.6.1 · Direct3D11 · SDL3",
      "launcher": "HTLauncher.exe",
      "stage": "Playable offline foundations",
      "lead": "Rebuilding Tantra Online with its original world, assets and gameplay rules.",
      "description": "The OGRE remake reaches Mandara with the native INTRO, MainUI, offline authority and ordinary services. Full gameplay, online integration and release acceptance remain open.",
      "plan": "documentation/client/planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md",
      "progress": "documentation/client/PROGRESS.md",
      "groups": [
        {
          "id": "P01",
          "title": "Application, HTLauncher lifecycle and configuration",
          "tasks": [
            {
              "id": "P01-T01",
              "done": true,
              "text": "x64 CMake builds, OGRE/D3D11 setup, SDL3 window/events/input, resize and shutdown.",
              "children": []
            },
            {
              "id": "P01-T02",
              "done": true,
              "text": "Tantra Online title/icon and HTLauncher.exe staging into _client.",
              "children": []
            },
            {
              "id": "P01-T03",
              "done": true,
              "text": "Original HTSpec.cfg/HTStartup.cfg inputs, supported private overrides, HIGH defaults, represented realtime shadows and fog.",
              "children": []
            },
            {
              "id": "P01-T04",
              "done": true,
              "text": "Upper-left native-format FPS/polygon/texture/VBIB/entity statistics.",
              "children": []
            },
            {
              "id": "P01-T05",
              "done": true,
              "text": "Caught-failure logs, operation-specific diagnostics and best-effort dumps.",
              "children": []
            },
            {
              "id": "P01-T06",
              "done": false,
              "text": "Inventory enabled native branches and every required lifecycle/engine call; record implemented, intentionally unsupported and unverified operations.",
              "children": []
            },
            {
              "id": "P01-T07",
              "done": false,
              "text": "Complete remaining graphics-option behavior, device loss/recovery, fullscreen/DPI/focus transitions and fault-path acceptance.",
              "children": []
            },
            {
              "id": "P01-T08",
              "done": false,
              "text": "Verify resource ownership through repeated entry/exit and map changes; retain native cleanup/render gates and avoid stale OGRE nodes/materials/listeners.",
              "children": []
            }
          ],
          "gate": {
            "id": "P01-GATE",
            "done": false,
            "text": "Complete the remaining tasks and the acceptance above for this phase.",
            "children": []
          },
          "done": 5,
          "total": 8,
          "percent": 63
        },
        {
          "id": "P02",
          "title": "Original assets, HPK loading and resource identity",
          "tasks": [
            {
              "id": "P02-T01",
              "done": true,
              "text": "Direct map/object/FX/UI/sound archive lookup with original family/path precedence.",
              "children": []
            },
            {
              "id": "P02-T02",
              "done": true,
              "text": "Bounded index/payload reads, cached indexes and read-only OGRE/SDL3 streams.",
              "children": []
            },
            {
              "id": "P02-T03",
              "done": true,
              "text": "Preserve existing packs during manifest-owned staging; retain needed loose companions.",
              "children": []
            },
            {
              "id": "P02-T04",
              "done": true,
              "text": "Required TMB/TMD/TAB, terrain/placement, BMP/TGA/DDS and source catalog readers.",
              "children": []
            },
            {
              "id": "P02-T05",
              "done": true,
              "text": "_TGA.dds cutouts/alpha, represented INTRO transparency and terrain detail.dds.",
              "children": []
            },
            {
              "id": "P02-T06",
              "done": false,
              "text": "Complete the resource-family/unknown-record inventory for every intended map.",
              "children": []
            },
            {
              "id": "P02-T07",
              "done": false,
              "text": "Resolve missing monster 2718 resources and remaining skill images; distinguish the current client catalog from Global-only NPC 1457 before adding/replacing assets.",
              "children": []
            },
            {
              "id": "P02-T08",
              "done": false,
              "text": "Preflight every referenced actor detail level, animation, attachment and texture with exact path/record diagnostics and consistent source-profile provenance.",
              "children": []
            },
            {
              "id": "P02-T09",
              "done": false,
              "text": "Verify all required HPK families through actual production rendering/audio.",
              "children": []
            }
          ],
          "gate": {
            "id": "P02-GATE",
            "done": false,
            "text": "Complete the remaining tasks and the acceptance above for this phase.",
            "children": []
          },
          "done": 5,
          "total": 9,
          "percent": 56
        },
        {
          "id": "P03",
          "title": "INTRO: login, characters, handoff and error recovery",
          "tasks": [
            {
              "id": "P03-T01",
              "done": true,
              "text": "Native login/server panels, input/focus, gate animations and camera-gated progression.",
              "children": []
            },
            {
              "id": "P03-T02",
              "done": true,
              "text": "Point-01 authentication, exactly three roster slots and empty-roster creation.",
              "children": []
            },
            {
              "id": "P03-T03",
              "done": true,
              "text": "Creation/name/Chakra/tribe/face/hair flow, info/selection, result-gated deletion and cancellation with offline SQLite persistence.",
              "children": []
            },
            {
              "id": "P03-T04",
              "done": true,
              "text": "Authored model-height face/hair zoom correction and eight-tribe/200-combination CPU coverage.",
              "children": []
            },
            {
              "id": "P03-T05",
              "done": true,
              "text": "Selected equipped previews/attachments and native village/route selection.",
              "children": []
            },
            {
              "id": "P03-T06",
              "done": true,
              "text": "Point-02 world authentication, final INTRO cleanup frame, staged loading, post-map CHAR_INIT and camera-gated world/HUD startup.",
              "children": []
            },
            {
              "id": "P03-T07",
              "done": true,
              "text": "First-world Mandara1st resolves client map 40001; represented offline routes 1/18/19 retain distinct zone datasets. Runtime config is C:\\_GitHub\\tantra-dev-main\\_client\\resource\\map\\MAP_Mandara1st.cfg.",
              "children": []
            },
            {
              "id": "P03-T08",
              "done": false,
              "text": "Finish occupied/full-roster, equipment/tribe variants and all retry, rejection, cancellation, timeout, disconnect and reconnect paths with targeted acceptance.",
              "children": []
            },
            {
              "id": "P03-T09",
              "done": false,
              "text": "Establish complete preview bounds, attachment, animation and camera visual parity.",
              "children": []
            },
            {
              "id": "P03-T10",
              "done": false,
              "text": "Investigate the historical selection-exit report if reproduced; later clean sessions and separate HUD/camera fixes do not prove its original cause.",
              "children": []
            }
          ],
          "gate": {
            "id": "P03-GATE",
            "done": false,
            "text": "Complete the remaining tasks and the acceptance above for this phase.",
            "children": []
          },
          "done": 7,
          "total": 10,
          "percent": 70
        },
        {
          "id": "P04",
          "title": "MainUI, controls, calculated status and quick slots",
          "tasks": [
            {
              "id": "P04-T01",
              "done": true,
              "text": "Main bar/button/shortcut toggles, dragging, focus, close/Escape and saved positions.",
              "children": []
            },
            {
              "id": "P04-T02",
              "done": true,
              "text": "Native Interface.sys position loading and private layout persistence.",
              "children": []
            },
            {
              "id": "P04-T03",
              "done": true,
              "text": "Calculated status/entry effects after CHAR_INIT, ordered notifications, supported expiry/heal/TP ticks and persisted changed native MOB data.",
              "children": []
            },
            {
              "id": "P04-T04",
              "done": true,
              "text": "Chakra spending and source skill learning through authenticated offline actions.",
              "children": [
                {
                  "done": true,
                  "text": "Verify native base/bonus semantics and persisted Chakra allocation with"
                }
              ]
            },
            {
              "id": "P04-T05",
              "done": true,
              "text": "Five-page 400-byte quick-slot files, item/learned-skill registration, native key modes, orientation and ordinary potion execution.",
              "children": []
            },
            {
              "id": "P04-T06",
              "done": false,
              "text": "Complete active-skill and command execution. Quick slots reach timed self buffs and direct unit/ground-area skills using native preparation, client timing/attack markers and authority costs/cooldown/damage. Source-generated approach/range hysteresis and free stopped-marker retry are connected. Full collision/cancellation, follow, other action/effect/command paths and rendered acceptance remain open. See the direct sequence.",
              "children": [
                {
                  "done": true,
                  "text": "Connect action/self animation stages, normal follow travel, stage/state FX,"
                },
                {
                  "done": true,
                  "text": "Preserve native command bindings/art and connect sit, walk/run, attack,"
                },
                {
                  "done": true,
                  "text": "Connect Provoke/Greet/Rush commands to native one-shot motions, weapon"
                },
                {
                  "done": false,
                  "text": "Finish specialized homing/piercing/arrow, remaining command and authority paths;"
                }
              ]
            },
            {
              "id": "P04-T07",
              "done": false,
              "text": "Complete cooldown presentation, skill prerequisites/arrows/tooltips, rejection/result messages, minimap/large-map markers and contextual commands. Authority skill timers, source square FX, localized cooldown rejection and unit hit/dodge system-history feedback are connected. Ordinary item timers now use authority deadlines; continuous/charged phases, remaining paths and rendered acceptance remain open; see feedback.",
              "children": [
                {
                  "done": true,
                  "text": "Add native skill icons/tree connectors, learned/max levels, upgrade"
                },
                {
                  "done": true,
                  "text": "Connect native localized current/next skill requirements, all five effect"
                },
                {
                  "done": true,
                  "text": "Connect ordinary item cooldowns, native square FX and silent quick-slot"
                },
                {
                  "done": false,
                  "text": "Complete continuous/charged-item timers and full item-result lifecycle;"
                },
                {
                  "done": false,
                  "text": "Resolve missing source FX records and accept tooltip wrapping/localization"
                }
              ]
            },
            {
              "id": "P04-T08",
              "done": false,
              "text": "Finish unconnected quest, guild, party, trade and advanced-service dialog content.",
              "children": []
            },
            {
              "id": "P04-T09",
              "done": false,
              "text": "Finish IME/text/localization, input capture and complete HUD service values; preserve source key bindings and native dialog/control IDs.",
              "children": []
            }
          ],
          "gate": {
            "id": "P04-GATE",
            "done": false,
            "text": "Complete the remaining tasks and the acceptance above for this phase.",
            "children": []
          },
          "done": 5,
          "total": 9,
          "percent": 56
        },
        {
          "id": "P05",
          "title": "Movement, world actors, collision and camera",
          "tasks": [
            {
              "id": "P05-T01",
              "done": true,
              "text": "Corrected world handedness/picking; Mandara terrain, objects and native spawn/floor placement.",
              "children": []
            },
            {
              "id": "P05-T02",
              "done": true,
              "text": "Native walk/run speeds, blocked-cell routing, swept movement, actor obstruction and persisted cells; follow/orbit/zoom/reset and terrain/static-triangle camera sweeps.",
              "children": []
            },
            {
              "id": "P05-T03",
              "done": true,
              "text": "Original nearby town NPC/monster resources and bounded animation/pursuit behavior.",
              "children": []
            },
            {
              "id": "P05-T04",
              "done": true,
              "text": "Actor 2008 multi-detail reader correction and targeted settled-world runtime evidence.",
              "children": []
            },
            {
              "id": "P05-T05",
              "done": false,
              "text": "Close building, narrow-passage, blocked-destination, actor-obstruction and camera-clipping acceptance along the remaining Mandara route.",
              "children": []
            },
            {
              "id": "P05-T06",
              "done": false,
              "text": "Obtain/verify absent authored Mandara .tbo collision inputs, or retain an explicit collision-fidelity limit; triangle/grid fallback is not native parity.",
              "children": []
            },
            {
              "id": "P05-T07",
              "done": false,
              "text": "Complete actor animation/control transitions, bounds, all attachments and other-player occupancy/appearance/movement from authoritative replication.",
              "children": []
            },
            {
              "id": "P05-T08",
              "done": false,
              "text": "Complete generator cadence/routes/formations, aggression/help/return/flee, monster skills and lifecycle with the authoritative simulation.",
              "children": []
            }
          ],
          "gate": {
            "id": "P05-GATE",
            "done": false,
            "text": "Complete the remaining tasks and the acceptance above for this phase.",
            "children": []
          },
          "done": 4,
          "total": 8,
          "percent": 50
        },
        {
          "id": "P06",
          "title": "Inventory, equipment, consumables and ordinary NPC services",
          "tasks": [
            {
              "id": "P06-T01",
              "done": true,
              "text": "Inventory/equipment transfers, occupied-slot swaps, stack merge/split, native slot/tribe rules, stat recalculation and represented equipment appearance.",
              "children": []
            },
            {
              "id": "P06-T02",
              "done": true,
              "text": "Ordinary instant HP/TP consumables and item-type cooldowns.",
              "children": []
            },
            {
              "id": "P06-T03",
              "done": true,
              "text": "Native dialogue, merchant buy/sell, repair, personal item/Rupiah warehouse and save-point code with authenticated transactional persistence.",
              "children": []
            },
            {
              "id": "P06-T04",
              "done": true,
              "text": "Earlier offline runtime evidence for repair, buying/selling and potion use.",
              "children": []
            },
            {
              "id": "P06-T05",
              "done": true,
              "text": "Runtime-accept warehouse item/Rupiah deposit/withdrawal and save confirmation with the corrected native NPC positions; inspect post-exit SQLite and hashes. The 2026-10-26 tested artifact completed these services and post-exit checks. Its FX diagnostic failure and camera/corrected-build acceptance remain separate open gates; see the scoped evidence.",
              "children": []
            },
            {
              "id": "P06-T06",
              "done": false,
              "text": "Complete charged/timed/continuous item phases, cancellation/consumption rules, manual drops, pickup merging, ownership and decay. Ordinary combat wear, native break recalculation, item-info messages and SQLite persistence are implemented; full dual-hit/skill wear and rendered acceptance remain open.",
              "children": [
                {
                  "done": true,
                  "text": "Connect manual item confirmation and offline drop requests, durable-save"
                },
                {
                  "done": false,
                  "text": "Accept rendered drop/pickup paths and finish ownership/release, decay,"
                }
              ]
            },
            {
              "id": "P06-T07",
              "done": false,
              "text": "Connect the same UI/request/result flow to C++ server authority and verify rejection/rollback on stale revisions, insufficient funds/capacity and disconnect.",
              "children": []
            }
          ],
          "gate": {
            "id": "P06-GATE",
            "done": false,
            "text": "Complete the remaining tasks and the acceptance above for this phase.",
            "children": []
          },
          "done": 5,
          "total": 7,
          "percent": 71
        },
        {
          "id": "P07",
          "title": "Active skills, complete combat, effects and progression",
          "tasks": [
            {
              "id": "P07-T01",
              "done": true,
              "text": "Basic offline melee target/range/cooldown, provoked chase, ordinary HP/death, respawn, solo Prana/level thresholds and selected direct rewards/pickup. Ordinary damage now uses compiled native equations and per-defender dodge state; ordinary wear is connected. Full skill/dual-hit wear, attribution, NPC and rendered acceptance remain separate open gates.",
              "children": []
            },
            {
              "id": "P07-T02",
              "done": true,
              "text": "Source status/passive/entry-effect foundations; these are narrower than full combat.",
              "children": []
            },
            {
              "id": "P07-T03",
              "done": false,
              "text": "Implement target/unit/area skill request, preparation/cost/cooldown, interruption, hit/critical/application phases and native ACK/result handling. Unit/area codecs, timed self buffs and final impact authority are implemented. Quickslots use canonical TPA/FX PC bindings, learned-level timing, native approach/range hysteresis, ground selection and once-per-swing markers. Ready, cast, activation/state, normal follow and impact FX are connected. Specialized projectile/authority families, full cancellation/ACK behavior and rendered acceptance remain open; see the skill checkpoint.",
              "children": []
            },
            {
              "id": "P07-T04",
              "done": false,
              "text": "Connect cast/attack motions, TFX/projectiles/sounds, target HP, damage and cooldown presentation to actual authority outcomes. Body/apron clips, native timing/markers, stage/state FX, normal follow travel, weapon carry, sound cleanup, cooldown FX and unit-result history are connected. Specialized projectile/combat paths, floating hit counts, remaining result/error UI and rendered acceptance remain open. See the field/skill FX checkpoint.",
              "children": [
                {
                  "done": true,
                  "text": "Defer rendered offline player/monster damage and dependent rewards/wear"
                },
                {
                  "done": false,
                  "text": "Accept player/monster hit timing in one authorized offline run."
                },
                {
                  "done": true,
                  "text": "Cancel the old ground route/click FX on accepted attack; verify immediate"
                }
              ]
            },
            {
              "id": "P07-T05",
              "done": false,
              "text": "Complete periodic damage/healing, caster/kill attribution, immunity, dispels/control, shields/absorption/links and effect cleanup on death/transition.",
              "children": []
            },
            {
              "id": "P07-T06",
              "done": false,
              "text": "Complete native AI/skill selection, reward groups/modifiers, party reward rights, loot ownership/decay, full XP/leveling and durable progression.",
              "children": []
            },
            {
              "id": "P07-T07",
              "done": false,
              "text": "Implement summons/companions with owner, allegiance, lifetime, follow/commands and source cleanup rules; normal NPC population does not provide these systems.",
              "children": []
            }
          ],
          "gate": {
            "id": "P07-GATE",
            "done": false,
            "text": "Complete the remaining tasks and the acceptance above for this phase.",
            "children": []
          },
          "done": 2,
          "total": 7,
          "percent": 29
        },
        {
          "id": "P08",
          "title": "Quests, advanced NPC services and refinement",
          "tasks": [
            {
              "id": "P08-T01",
              "done": true,
              "text": "Ordinary dialogue and a bounded condition/event subset exist.",
              "children": []
            },
            {
              "id": "P08-T02",
              "done": false,
              "text": "Implement quest accept/progress/failure/completion, prerequisites, choices, journal/history, event triggers and exactly-once durable rewards.",
              "children": []
            },
            {
              "id": "P08-T03",
              "done": false,
              "text": "Implement enabled religion/Trimuriti, class/job, contribution/rank and advanced NPC conditions/callbacks with native rejection/result messages.",
              "children": []
            },
            {
              "id": "P08-T04",
              "done": false,
              "text": "Implement refinement/dismantling/combination eligibility, materials/costs, slot locking, native probability/RNG, failure/destruction and result presentation.",
              "children": []
            },
            {
              "id": "P08-T05",
              "done": false,
              "text": "Audit selected tutorial/event/country branches and their required assets/data.",
              "children": []
            }
          ],
          "gate": {
            "id": "P08-GATE",
            "done": false,
            "text": "Complete the remaining tasks and the acceptance above for this phase.",
            "children": []
          },
          "done": 1,
          "total": 5,
          "percent": 20
        },
        {
          "id": "P09",
          "title": "Live C++ server transport and online/offline separation",
          "tasks": [
            {
              "id": "P09-T01",
              "done": true,
              "text": "Offline logical authentication/character/status codecs and session ownership.",
              "children": []
            },
            {
              "id": "P09-T02",
              "done": true,
              "text": "C++ SQLDMN/DBSRV and substantial world components exist separately; their checks do not establish an online OGRE client. Server game_ready remains false.",
              "children": []
            },
            {
              "id": "P09-T03",
              "done": false,
              "text": "Inventory client/server framing, version/profile, packet sizes/fields and authentication/roster/CHAR_INIT sequences against the same native declarations.",
              "children": []
            },
            {
              "id": "P09-T04",
              "done": false,
              "text": "Implement a bounded production network adapter and game-thread event dispatch, including fragmentation, ordering, backpressure, timeout and disconnect behavior.",
              "children": []
            },
            {
              "id": "P09-T05",
              "done": false,
              "text": "Connect login -> roster -> selection -> world authentication -> loading -> CHAR_INIT -> Mandara to the C++ authority on 127.0.0.1.",
              "children": []
            },
            {
              "id": "P09-T06",
              "done": false,
              "text": "Apply authoritative actors/status/movement/corrections/items/NPC/combat results; reconnect restores committed state and removes stale session/actor state.",
              "children": []
            },
            {
              "id": "P09-T07",
              "done": false,
              "text": "Keep server SQLite and normal offline saves separate; expose real readiness and native failures through the existing UI rather than successful placeholders.",
              "children": []
            },
            {
              "id": "P09-T08",
              "done": false,
              "text": "Prove any required protection/crypto/stock-client compatibility separately for the selected protocol; admin JSON is not gameplay transport.",
              "children": []
            }
          ],
          "gate": {
            "id": "P09-GATE",
            "done": false,
            "text": "Complete the remaining tasks and the acceptance above for this phase.",
            "children": []
          },
          "done": 2,
          "total": 8,
          "percent": 25
        },
        {
          "id": "P10",
          "title": "Travel, complete death and resurrection",
          "tasks": [
            {
              "id": "P10-T01",
              "done": true,
              "text": "Original ordinary-death message/confirmation and dead-input restrictions.",
              "children": []
            },
            {
              "id": "P10-T02",
              "done": true,
              "text": "Bounded same-zone save/town recovery and ordinary monster-death penalties.",
              "children": []
            },
            {
              "id": "P10-T03",
              "done": false,
              "text": "Add native portals, NPC transport and supported travel items; retain save/disconnect/unload/connect/load/re-entry sequencing and destination failure recovery.",
              "children": []
            },
            {
              "id": "P10-T04",
              "done": false,
              "text": "Add item/healer revival, cross-zone saved locations, enabled fortress/castle choices and complete penalty/effect/consumption rules.",
              "children": []
            },
            {
              "id": "P10-T05",
              "done": false,
              "text": "Replace current rejection of nonzero portal/position/target CHAR_INIT variants only after their corresponding authority/handoff path exists.",
              "children": []
            },
            {
              "id": "P10-T06",
              "done": false,
              "text": "Preflight and accept each additional playable map with its matching zone data.",
              "children": []
            }
          ],
          "gate": {
            "id": "P10-GATE",
            "done": false,
            "text": "Complete the remaining tasks and the acceptance above for this phase.",
            "children": []
          },
          "done": 2,
          "total": 6,
          "percent": 33
        },
        {
          "id": "P11",
          "title": "Chat, parties, trade, guilds and competitive systems",
          "tasks": [
            {
              "id": "P11-T01",
              "done": false,
              "text": "Implement local/whisper/party/guild chat, IME input, channels, filtering, recipient/range rules and disconnect/reconnect behavior.",
              "children": []
            },
            {
              "id": "P11-T02",
              "done": false,
              "text": "Implement party invitation/membership/leadership, displays, shared status and authoritative reward/pickup rights.",
              "children": []
            },
            {
              "id": "P11-T03",
              "done": false,
              "text": "Implement two-sided trade offer/lock/confirmation/cancel and durable transfer; handle stale offers, disconnect and duplicate requests without loss/duplication.",
              "children": []
            },
            {
              "id": "P11-T04",
              "done": false,
              "text": "Implement guild/Ashram membership/roles/emblems/shared storage and enabled rental-store economy with permissions and durable ownership.",
              "children": []
            },
            {
              "id": "P11-T05",
              "done": false,
              "text": "Implement enabled hostility/PK/duel, safe zones, arena/siege/events and their UI/state transitions. Decide enabled native branches before porting optional services.",
              "children": []
            }
          ],
          "gate": {
            "id": "P11-GATE",
            "done": false,
            "text": "Complete the remaining tasks and the acceptance above for this phase.",
            "children": []
          },
          "done": 0,
          "total": 5,
          "percent": 0
        },
        {
          "id": "P12",
          "title": "Environment, effects, audio and rendering fidelity",
          "tasks": [
            {
              "id": "P12-T01",
              "done": true,
              "text": "Map-CFG-driven sky/horizon, cloud masks/scrolling, fog/time colors, night stars, rotating sun/moon and represented flare chain/occlusion.",
              "children": []
            },
            {
              "id": "P12-T02",
              "done": true,
              "text": "Authored terrain detail multiplication, material alpha fixes, represented lighting/shadows, INTRO fire, selected BGM and sample sounds. Follow-up implementation adds particle modes 0-5/incremental rotation, billboards, type-1 local lights, camera jitter, quality visibility, character spotlight and material specular/emissive terms. Full parity remains unchecked: implementation and limits.",
              "children": []
            },
            {
              "id": "P12-T03",
              "done": true,
              "text": "Existing environment evidence includes parsing 19 supplied CFGs and one historical offline capture route; parsing does not make all maps playable.",
              "children": []
            },
            {
              "id": "P12-T04",
              "done": false,
              "text": "Complete exact star RNG/flicker, celestial sizing, flare attenuation/depth, alpha-aware/dynamic occlusion and native lighting/material parity.",
              "children": []
            },
            {
              "id": "P12-T05",
              "done": false,
              "text": "Complete rendered water/weather, vegetation/grass behavior, terrain/actor LOD, shadows and full map visibility/dynamic-loading fidelity.",
              "children": []
            },
            {
              "id": "P12-T06",
              "done": false,
              "text": "Complete TFX families, ambient/map/NPC/monster/skill/UI audio, looping, spatial/volume/cleanup behavior and locale-dependent resources.",
              "children": [
                {
                  "done": true,
                  "text": "Correct additional FX mesh (null) texture placeholders and validate all"
                },
                {
                  "done": false,
                  "text": "Accept the corrected FX model submission visually and clear runtime diagnostics."
                },
                {
                  "done": true,
                  "text": "Resolve all 55 Mandara field placements, including portals and altar,"
                },
                {
                  "done": false,
                  "text": "Accept their rendered placement/brightness/audio and resolve documented"
                }
              ]
            }
          ],
          "gate": {
            "id": "P12-GATE",
            "done": false,
            "text": "Complete the remaining tasks and the acceptance above for this phase.",
            "children": []
          },
          "done": 3,
          "total": 6,
          "percent": 50
        },
        {
          "id": "P13",
          "title": "Loading performance and release acceptance",
          "tasks": [
            {
              "id": "P13-T01",
              "done": true,
              "text": "GPU selection, unchanged-HUD caching, hidden-LOD CPU-skinning suppression, initial caches, direct HPK index/payload handling, cached name fallback/misses and indexed archive-list merging. Current-build loading/FPS acceptance stays open.",
              "children": []
            },
            {
              "id": "P13-T02",
              "done": true,
              "text": "Build script overwrites the built final launcher and preserves private userdata; manifest-owned staging retains the original resource/system structure.",
              "children": []
            },
            {
              "id": "P13-T03",
              "done": true,
              "text": "Ordinary misses retain shared immutable meshes/animations; actor loads, native LOD records and skeleton-specific track bindings reuse handles. Release build and four CPU regressions pass; current-build runtime acceptance remains separate.",
              "children": []
            },
            {
              "id": "P13-T04",
              "done": false,
              "text": "Reuse prepared map/model/collision data, coalesce in-flight loads and add versioned invalidation, memory budgets and source provenance. Character-resource invalidation/live-version safety is implemented; the complete task stays open.",
              "children": []
            },
            {
              "id": "P13-T05",
              "done": false,
              "text": "Add cancellable background IO/decode and bounded render-thread GPU uploads, spatial prefetch/hysteresis and appropriate batching/instancing. Nearby actor/loot creation now yields after at most two uploads or a soft 4 ms update budget; one upload remains synchronous and this full task stays open.",
              "children": []
            },
            {
              "id": "P13-T06",
              "done": false,
              "text": "Implement/profile GPU skinning and remaining visibility/LOD/upload costs.",
              "children": []
            },
            {
              "id": "P13-T07",
              "done": false,
              "text": "Measure cold/warm entry, frame-time percentiles, stalls, IO/decode/uploads, draw calls and memory on fixed routes/settings; historical FPS is not a current guarantee.",
              "children": []
            },
            {
              "id": "P13-T08",
              "done": false,
              "text": "Complete current-build startup/shutdown, longer play, map transitions, save migrations/rollback, packaging/relocation, dependencies and license review.",
              "children": []
            }
          ],
          "gate": {
            "id": "P13-GATE",
            "done": false,
            "text": "Complete the remaining tasks and the acceptance above for this phase.",
            "children": []
          },
          "done": 3,
          "total": 8,
          "percent": 38
        },
        {
          "id": "P14",
          "title": "Zone01-Zone10 map alignment",
          "tasks": [
            {
              "id": "P14-T01",
              "done": true,
              "text": "Resolve native map records 40001-40010 and inspect all ten imported profiles.",
              "children": []
            },
            {
              "id": "P14-T02",
              "done": true,
              "text": "Retain original map CFG names/resource folders and localhost endpoints.",
              "children": []
            },
            {
              "id": "P14-T03",
              "done": false,
              "text": "Preflight and stage all ten maps and their regular/pop HPKs, loose companions, collision/environment/FX/audio and actors without flattening original paths.",
              "children": []
            },
            {
              "id": "P14-T04",
              "done": false,
              "text": "Match native spawn, coordinates, heights/collision, NPCs/generators, portals, per-zone settings and versioned data hashes.",
              "children": []
            },
            {
              "id": "P14-T05",
              "done": false,
              "text": "Extend client staging/routing and the C++ authority's current Zone01-only gate, then implement source-faithful transitions/re-entry and failure recovery.",
              "children": []
            },
            {
              "id": "P14-T06",
              "done": false,
              "text": "Complete the per-zone implementation and acceptance checklists for all ten zones.",
              "children": []
            }
          ],
          "gate": {
            "id": "P14-GATE",
            "done": false,
            "text": "Complete the remaining tasks and the acceptance above for this phase.",
            "children": []
          },
          "done": 2,
          "total": 6,
          "percent": 33
        }
      ],
      "foundations": [
        "Windows x64 launcher, SDL3 input and original HPK resources",
        "Offline login, character lifecycle and Mandara CHAR_INIT",
        "MainUI, calculated status, Chakra, skill learning and quick slots",
        "Warehouse/save-point transactions and SQLite persistence checked",
        "Native command emotes, skill tooltips and animation-impact damage implemented"
      ],
      "next": [
        "Accept the corrected build and usable Mandara camera/collision framing",
        "Finish item phases, advanced skills, monster AI and combat progression",
        "Complete quests, travel and real C++ server multiplayer",
        "Accept environment fidelity, loading performance and every zone"
      ],
      "changes": [
        {
          "date": "2026-10-26",
          "title": "Ground items and pickup stacking",
          "text": "Manual drop confirmation and native partial pickup now save before ground-state changes. Focused CPU/SQLite rejection checks and both staged clients pass; rendered, ownership and decay acceptance remain open."
        },
        {
          "date": "2026-10-26",
          "title": "Ordinary item cooldowns",
          "text": "Accepted authority deadlines now drive native FX and silent blocking on both quick bars. Three focused CPU checks and both staged packages pass; in-game and continuous-item acceptance remain open."
        },
        {
          "date": "2026-10-26",
          "title": "Native skill tooltips",
          "text": "Localized requirements, five effect lanes and current/next-level descriptions. CPU checks cover 1,303 profiles; rendered acceptance remains open."
        },
        {
          "date": "2026-10-26",
          "title": "Commands and emotes",
          "text": "Original command bindings and icons, five common actions and three native emotes. Rebuilt clients are staged; in-game acceptance remains pending."
        },
        {
          "date": "2026-10-26",
          "title": "Mandara service acceptance",
          "text": "One offline attempt completed warehouse/save services and persistence checks. Its FX parsing failures were corrected; corrected-build diagnostics and camera acceptance remain open."
        }
      ],
      "done": 46,
      "total": 102,
      "percent": 45,
      "accepted": 0
    },
    {
      "id": "tantra-b",
      "name": "Tantra-B",
      "engine": "bgfx · Direct3D11 · SDL3",
      "launcher": "ZFLauncher.exe",
      "stage": "Offline migration in progress",
      "lead": "The same native Tantra foundation, rebuilt through the bgfx renderer.",
      "description": "The bgfx project has its own launcher, client folder and acceptance record. Its documented minimum gates cover the baseline, INTRO lifecycle and ordinary services; broader rendering and gameplay parity remain open.",
      "plan": "reference/bgfx/IMPLEMENTATION_PLAN.md",
      "progress": "reference/bgfx/PROGRESS.md",
      "groups": [
        {
          "id": "C00",
          "title": "Pinned reuse and offline baseline",
          "tasks": [
            {
              "id": "P00-01",
              "done": true,
              "text": "Record remote URL, executable identity, requested path and scope.",
              "children": []
            },
            {
              "id": "P00-05",
              "done": true,
              "text": "Record the source OGRE commit plus a patch/hash inventory of reused uncommitted fixes.",
              "children": []
            },
            {
              "id": "P00-06",
              "done": true,
              "text": "Add dependency pins, license inventory, ownership rules and build prerequisites.",
              "children": []
            },
            {
              "id": "P00-07",
              "done": true,
              "text": "Adopt C++20, x64 and SDL3; select D3D11 as the first bgfx backend, others as later acceptance gates.",
              "children": []
            },
            {
              "id": "P00-08",
              "done": true,
              "text": "Establish phase evidence templates and an explicit list of deferred gameplay systems.",
              "children": []
            },
            {
              "id": "P01-01",
              "done": false,
              "text": "Audit build/link dependencies before copying renderer-independent modules.",
              "children": []
            },
            {
              "id": "P01-02",
              "done": true,
              "text": "Move selected code into project-owned libraries with explicit public interfaces.",
              "children": []
            },
            {
              "id": "P01-03",
              "done": false,
              "text": "Preserve original resource IDs, item-instance IDs, tribe mappings, units and rounding.",
              "children": []
            },
            {
              "id": "P01-04",
              "done": false,
              "text": "Keep simulation clocks/RNG separate from render interpolation and frame rate.",
              "children": []
            },
            {
              "id": "P01-05",
              "done": false,
              "text": "Preserve integer combat/refinement/skill/progression equations with golden vectors.",
              "children": []
            },
            {
              "id": "P01-06",
              "done": false,
              "text": "Define structured diagnostics with resource identity, action/state, zone and profile context.",
              "children": []
            },
            {
              "id": "P01-07",
              "done": false,
              "text": "Add versioned DTOs for actor state, inventory, UI, lights, audio and scene transitions.",
              "children": []
            },
            {
              "id": "P01-08",
              "done": false,
              "text": "Give resources/actors generation-aware handles so stale asynchronous results cannot attach to a new scene.",
              "children": []
            },
            {
              "id": "P01-09",
              "done": false,
              "text": "Separate application lifecycle from authority/session lifecycle and renderer lifecycle.",
              "children": []
            },
            {
              "id": "P02-02",
              "done": true,
              "text": "Pin compatible bgfx, bx and bimg revisions; pin SDL3 and SQLite separately.",
              "children": []
            },
            {
              "id": "P02-03",
              "done": true,
              "text": "Record how the dependency build is generated; audit any CMake wrapper as a separate dependency.",
              "children": []
            },
            {
              "id": "P02-04",
              "done": true,
              "text": "Provide repeatable dependency bootstrap and an offline rebuild path after bootstrap.",
              "children": []
            },
            {
              "id": "P04-05",
              "done": false,
              "text": "Define render packets for static geometry, skinned actors, UI, FX, shadows and picking.",
              "children": []
            },
            {
              "id": "P12-10",
              "done": false,
              "text": "Keep RNG/rounding deterministic in CPU parity tests and authoritative online.",
              "children": []
            },
            {
              "id": "P18-09",
              "done": false,
              "text": "Keep crash dumps/logs out of source control and prevent credentials from entering diagnostics.",
              "children": []
            },
            {
              "id": "P20-01",
              "done": false,
              "text": "Maintain a feature/parity matrix linking source, implementation, CPU evidence and runtime evidence.",
              "children": []
            },
            {
              "id": "P20-10",
              "done": true,
              "text": "Update progress with concrete gates and remaining limitations; keep unverified tasks unchecked.",
              "children": []
            },
            {
              "id": "P20-12",
              "done": true,
              "text": "Keep the OGRE fallback until the new client meets the agreed functional, visual and performance gates.",
              "children": []
            },
            {
              "id": "BG-DOC-01",
              "done": true,
              "text": "Rewrite this plan into testable offline checkpoints with the same client/credentials and copied private profile.",
              "children": []
            }
          ],
          "gate": {
            "id": "BG-C00-GATE",
            "done": true,
            "text": "Manifest identifies source/dependency/input versions and initial fixture expectations. No window/network/audio is needed; C01 compiles the new targets.",
            "children": []
          },
          "done": 12,
          "total": 24,
          "percent": 50
        },
        {
          "id": "C01",
          "title": "Buildable shell and shared-client staging",
          "tasks": [
            {
              "id": "P02-01",
              "done": true,
              "text": "Add CMake targets/presets for Debug and Release x64 with MSVC and a pinned Windows SDK.",
              "children": []
            },
            {
              "id": "P02-05",
              "done": true,
              "text": "Produce ZFLauncher.exe, product metadata, the requested icon and Tantra Online window title.",
              "children": []
            },
            {
              "id": "P02-06",
              "done": false,
              "text": "Implement SDL3 events, resize/minimize/focus, Unicode paths and clean error reporting.",
              "children": []
            },
            {
              "id": "P02-07",
              "done": true,
              "text": "Parse --offline, explicit profile/output/capture roots and renderer-selection arguments.",
              "children": []
            },
            {
              "id": "P02-08",
              "done": true,
              "text": "Add noninteractive build/stage BAT and PowerShell scripts with exit-code propagation.",
              "children": []
            },
            {
              "id": "P02-09",
              "done": true,
              "text": "Keep renderer smoke tests explicit; ordinary build commands must not launch a game.",
              "children": []
            },
            {
              "id": "P04-01",
              "done": true,
              "text": "Obtain SDL3's native Win32 window handle and initialize the selected bgfx backend.",
              "children": []
            },
            {
              "id": "P04-02",
              "done": false,
              "text": "Define device initialization, reset, suspend/resume, failure and shutdown ownership.",
              "children": []
            },
            {
              "id": "P04-03",
              "done": false,
              "text": "Add RAII wrappers and deferred destruction for textures, buffers, programs, uniforms and framebuffers.",
              "children": []
            },
            {
              "id": "P04-04",
              "done": false,
              "text": "Separate worker decoding from GPU resource creation/submission ownership.",
              "children": []
            },
            {
              "id": "P04-10",
              "done": false,
              "text": "Implement screenshots, resource-leak counters and recoverable renderer diagnostics.",
              "children": []
            },
            {
              "id": "P17-01",
              "done": false,
              "text": "Establish named hardware, build, backend, resolution, camera, time and actor population for comparisons.",
              "children": []
            },
            {
              "id": "P17-03",
              "done": false,
              "text": "Measure simulation, jobs, animation, UI, draw submission, GPU passes and present time.",
              "children": []
            },
            {
              "id": "P18-01",
              "done": false,
              "text": "Retain failure context: action, actor/resource, character, zone, position/camera and backend.",
              "children": []
            },
            {
              "id": "P18-02",
              "done": false,
              "text": "Handle missing/corrupt resource data, shader failures and upload exhaustion without undefined behavior.",
              "children": []
            },
            {
              "id": "P19-01",
              "done": true,
              "text": "Create an exact dependency closure for ZFLauncher.exe and its selected backend.",
              "children": []
            },
            {
              "id": "P19-02",
              "done": true,
              "text": "Stage shaders/runtime support under a namespaced directory such as system/zflauncher/bgfx.",
              "children": []
            },
            {
              "id": "P19-03",
              "done": true,
              "text": "Keep native resource/ and system/ asset paths unchanged; read HPKs in place.",
              "children": []
            },
            {
              "id": "P19-04",
              "done": true,
              "text": "Preserve HTLauncher, its OGRE support files and user-owned client additions.",
              "children": []
            },
            {
              "id": "P19-05",
              "done": true,
              "text": "Reuse a shared SDL3 DLL only when its version/ABI is intentionally compatible; otherwise isolate the launcher runtime.",
              "children": []
            },
            {
              "id": "P19-07",
              "done": false,
              "text": "Build/overwrite only ZFLauncher-owned manifest entries; fail early when the destination executable is locked.",
              "children": []
            },
            {
              "id": "P19-08",
              "done": false,
              "text": "Hash HPKs and existing saves before/after staging and verify relocation without hidden source-path dependency.",
              "children": []
            },
            {
              "id": "P20-02",
              "done": true,
              "text": "Run focused CPU/shader/package checks first; select runtime checks from changed dependencies.",
              "children": []
            },
            {
              "id": "P20-03",
              "done": true,
              "text": "Obtain current authorization before any game/renderer/server/audio-device launch.",
              "children": []
            },
            {
              "id": "P20-08",
              "done": true,
              "text": "Retain failure captures/logs and position/camera context; investigate on CPU before automatically launching again.",
              "children": []
            }
          ],
          "gate": {
            "id": "BG-C01-GATE",
            "done": false,
            "text": "Both builds produce ZFLauncher.exe and shaders. Explicit smoke reports backend/device, handles resize/minimize/focus and exits cleanly. Hash checks preserve HPKs, HTLauncher and OGRE saves.",
            "children": []
          },
          "done": 14,
          "total": 25,
          "percent": 56
        },
        {
          "id": "C02",
          "title": "Original assets and ordered rendering",
          "tasks": [
            {
              "id": "P03-01",
              "done": true,
              "text": "Port bounded HPK indexing and entry reads without bulk extraction.",
              "children": []
            },
            {
              "id": "P03-02",
              "done": true,
              "text": "Preserve the original resource/ and system/ folder/archive names.",
              "children": []
            },
            {
              "id": "P03-03",
              "done": false,
              "text": "Resolve duplicate basenames using archive family, map and relative resource identity.",
              "children": []
            },
            {
              "id": "P03-04",
              "done": false,
              "text": "Retain deterministic regular/Pop precedence; do not scan every archive on every lookup.",
              "children": []
            },
            {
              "id": "P03-05",
              "done": false,
              "text": "Validate TPA/TXL profiles, section sizes, counts, IDs, opaque tails and string encodings.",
              "children": []
            },
            {
              "id": "P03-06",
              "done": true,
              "text": "Retain the shipped 276-byte item profile when validated; the available source declaration alone is 272 bytes.",
              "children": []
            },
            {
              "id": "P03-07",
              "done": false,
              "text": "Port THM/TCC/TML/TMD/TMB/TAB readers and verify coordinates, normals, UVs and material groups.",
              "children": []
            },
            {
              "id": "P03-08",
              "done": false,
              "text": "Support DDS/DXT1/2/3/4/5 and original TGA/BMP; preserve premultiplied-alpha identity and mip chains.",
              "children": []
            },
            {
              "id": "P03-09",
              "done": false,
              "text": "Treat _TGA as useful provenance, with an explicit material policy for cutout versus actual translucency.",
              "children": []
            },
            {
              "id": "P03-10",
              "done": true,
              "text": "Preserve English item/NPC/monster strings from the correct parameter records.",
              "children": []
            },
            {
              "id": "P03-11",
              "done": true,
              "text": "Read private CFG overrides over original HTStartup/HTSpec values; default to the requested HIGH profile.",
              "children": []
            },
            {
              "id": "P03-12",
              "done": false,
              "text": "Reject traversal, malformed offsets and ambiguous unqualified resource requests with useful diagnostics.",
              "children": []
            },
            {
              "id": "P04-06",
              "done": false,
              "text": "Compile backend-specific shaders with shaderc and version the shader cache key.",
              "children": []
            },
            {
              "id": "P04-07",
              "done": false,
              "text": "Specify vertex layouts/varyings and validate their linkage and buffer strides.",
              "children": []
            },
            {
              "id": "P04-08",
              "done": false,
              "text": "Test source left-handed coordinates, winding, matrix layout, depth convention and texture origin once at the renderer boundary.",
              "children": []
            },
            {
              "id": "P04-09",
              "done": false,
              "text": "Do not copy OGRE's clip-X reflection blindly; prove asymmetric left/right landmark and picking cases.",
              "children": []
            },
            {
              "id": "P05-01",
              "done": false,
              "text": "Assign explicit passes for shadow, background sky, opaque/cutout world, water/translucency, FX and UI.",
              "children": []
            },
            {
              "id": "P05-02",
              "done": true,
              "text": "Keep UI painter ordering deterministic; define transparent sorting separately from opaque batching.",
              "children": []
            },
            {
              "id": "P05-03",
              "done": false,
              "text": "Add per-widget clipping/scissor, pixel alignment, alpha blend and native texture dimensions.",
              "children": []
            },
            {
              "id": "P05-04",
              "done": false,
              "text": "Port original UI SYS declarations, texture catalogs, control IDs and responsive panel anchoring.",
              "children": []
            },
            {
              "id": "P09-13",
              "done": false,
              "text": "Define explicit linear/sRGB handling and a parity/modern presentation mode boundary.",
              "children": []
            },
            {
              "id": "P09-14",
              "done": false,
              "text": "Keep UI colour independent of scene exposure/tone mapping; prevent double gamma correction.",
              "children": []
            }
          ],
          "gate": {
            "id": "BG-C02-GATE",
            "done": false,
            "text": "Sampled old/new bytes/IDs agree; malformed inputs fail diagnostically. Asymmetric landmarks, transparency/cutout overlap, clipped UI and projection/picking remain correct on resize. No account or Mandara world is required.",
            "children": []
          },
          "done": 6,
          "total": 22,
          "percent": 27
        },
        {
          "id": "C03",
          "title": "Offline account and first character preview",
          "tasks": [
            {
              "id": "P05-07",
              "done": false,
              "text": "Cache text/glyph results by font, locale, content, colour and dimensions; avoid per-frame GDI uploads.",
              "children": []
            },
            {
              "id": "P06-01",
              "done": false,
              "text": "Port boot/config/preload and source INTRO camera/map/FX/music sequence.",
              "children": []
            },
            {
              "id": "P06-02",
              "done": true,
              "text": "Rebuild original login, server and channel selection presentation.",
              "children": []
            },
            {
              "id": "P06-03",
              "done": true,
              "text": "Connect offline login/roster to the existing authority, not a renderer-only demo account.",
              "children": []
            },
            {
              "id": "P06-04",
              "done": false,
              "text": "Port character selection and persisted progression/equipment preview.",
              "children": []
            },
            {
              "id": "P06-05",
              "done": true,
              "text": "Port creation: tribe, name, face, hair, Chakra allocation, validation and confirmation.",
              "children": []
            },
            {
              "id": "P06-06",
              "done": true,
              "text": "Keep the creation camera stable during face/hair/tribe changes and resource replacement.",
              "children": []
            },
            {
              "id": "P06-07",
              "done": true,
              "text": "Port deletion safeguards, roster refresh and failure/retry messages.",
              "children": []
            },
            {
              "id": "P06-09",
              "done": false,
              "text": "Cancel or quarantine stale async uploads during selection changes or failed entry.",
              "children": []
            },
            {
              "id": "P07-01",
              "done": true,
              "text": "Port native skeleton names, hierarchy, bind matrices and timeline frame rules.",
              "children": []
            },
            {
              "id": "P07-02",
              "done": true,
              "text": "Match raw stored skin weights and native control-position behavior; no silent weight renormalization.",
              "children": []
            },
            {
              "id": "P07-03",
              "done": false,
              "text": "Compute one evaluated pose per actor/frame and share it among body, face, hair and socket parts.",
              "children": []
            },
            {
              "id": "P07-05",
              "done": true,
              "text": "Handle variable influence counts and bone limits explicitly; never drop extra weights silently.",
              "children": []
            },
            {
              "id": "P07-06",
              "done": true,
              "text": "Transform normals correctly during deformation, including nonuniform transforms.",
              "children": []
            },
            {
              "id": "P07-11",
              "done": false,
              "text": "Preserve authored sockets and apron animations; missing optional sockets produce bounded diagnostics.",
              "children": []
            },
            {
              "id": "P07-13",
              "done": false,
              "text": "Calculate conservative animated/attachment bounds for rendering, picking and shadows.",
              "children": []
            },
            {
              "id": "P11-01",
              "done": true,
              "text": "Reuse SQLite character/session data through versioned adapters and schema migrations.",
              "children": []
            },
            {
              "id": "P11-02",
              "done": true,
              "text": "Default to _client_bgfx/userdata/zflauncher; explicitly seed it once from the current OGRE profile using a read-only SQLite backup and persistent companion-file copies; refuse an existing destination.",
              "children": []
            },
            {
              "id": "P11-03",
              "done": true,
              "text": "Keep ashesh / ashesh as the local test identity only; do not seed production credentials.",
              "children": []
            },
            {
              "id": "P11-04",
              "done": true,
              "text": "Restore level, Chakra, skills, quick slots, inventory/equipment, cargo, money and saved zone/cells.",
              "children": []
            },
            {
              "id": "P13-01",
              "done": false,
              "text": "Port typed FX catalogs and authored TFX node lifetimes/attachments.",
              "children": []
            },
            {
              "id": "P13-03",
              "done": false,
              "text": "Preserve native parent/socket transforms and the verified attached-model yaw correction once.",
              "children": []
            },
            {
              "id": "P18-04",
              "done": false,
              "text": "Stop/cancel jobs before destroying scenes and reject late work by generation.",
              "children": []
            },
            {
              "id": "P18-06",
              "done": false,
              "text": "Preserve SQLite transaction boundaries, integrity, schema backups and WAL handling.",
              "children": []
            },
            {
              "id": "P18-07",
              "done": true,
              "text": "Prevent simultaneous OGRE/bgfx writes to the same private database/profile.",
              "children": []
            },
            {
              "id": "P19-06",
              "done": true,
              "text": "Default to private _client_bgfx/userdata/zflauncher; support --user-data-root and disposable acceptance profiles seeded from an explicitly identified saved roster.",
              "children": []
            },
            {
              "id": "P19-09",
              "done": true,
              "text": "Provide separate shortcuts identifying OGRE and bgfx builds clearly.",
              "children": []
            },
            {
              "id": "P20-04",
              "done": true,
              "text": "Use one offline process and one channel, ashesh / ashesh, with an isolated saved roster.",
              "children": []
            },
            {
              "id": "P07-04a",
              "done": true,
              "text": "Implement and verify CPU skinning/normal fallback for first preview; full GPU parent stays open.",
              "children": []
            },
            {
              "id": "P07-08a",
              "done": true,
              "text": "Preview one tribe with seed face/hair/skin/equipment and sockets; all eight remain P07-08.",
              "children": []
            },
            {
              "id": "P13-02a",
              "done": false,
              "text": "Port represented INTRO FX node types required for login/preview with source timing; list unsupported families.",
              "children": []
            },
            {
              "id": "P13-06a",
              "done": true,
              "text": "Connect selected INTRO sound/music events and gains; verify actual playback separately.",
              "children": []
            }
          ],
          "gate": {
            "id": "BG-C03-GATE",
            "done": true,
            "text": "ashesh / ashesh opens copied roster without HTTP/server. Preview matches seed appearance/equipment and pose fixtures. Fresh disposable profiles pass create/select/delete/validation/retry once in ZFLauncher. Original saves are unchanged.",
            "children": []
          },
          "done": 20,
          "total": 32,
          "percent": 63
        },
        {
          "id": "C04",
          "title": "Saved-roster Mandara entry",
          "tasks": [
            {
              "id": "P06-08",
              "done": true,
              "text": "Preserve selection -> CHAR_INIT -> loading -> world initialization -> MainUI sequencing.",
              "children": []
            },
            {
              "id": "P08-01",
              "done": true,
              "text": "Load Mandara1st from its actual catalog/CFG binding, including regular and Pop object archives.",
              "children": []
            },
            {
              "id": "P08-02",
              "done": true,
              "text": "Preserve terrain topology, height/normal sampling, section textures and absolute detail UV phase.",
              "children": []
            },
            {
              "id": "P08-03",
              "done": true,
              "text": "Retain original detail.dds multiplication before any optional modern material treatment.",
              "children": []
            },
            {
              "id": "P08-04",
              "done": true,
              "text": "Submit original object placements/material groups and native transforms without a second coordinate conversion.",
              "children": []
            },
            {
              "id": "P08-05",
              "done": false,
              "text": "Use immutable world buffers; share repeated meshes and compatible material state.",
              "children": []
            },
            {
              "id": "P08-06",
              "done": false,
              "text": "Divide static batches spatially so culling does not force large unrelated regions to draw.",
              "children": []
            },
            {
              "id": "P08-07",
              "done": false,
              "text": "Distinguish opaque, depth-writing vegetation cutout, straight-alpha and premultiplied-alpha materials.",
              "children": []
            },
            {
              "id": "P08-08",
              "done": false,
              "text": "Preserve actual holes in tree/grass cards; validate depth behavior against buildings and other vegetation.",
              "children": []
            },
            {
              "id": "P08-09",
              "done": false,
              "text": "Keep water/glass/fading FX translucent; no global _TGA override for every asset family.",
              "children": []
            },
            {
              "id": "P08-10",
              "done": false,
              "text": "Add two-sided foliage rules only with verified normals/material expectations.",
              "children": []
            },
            {
              "id": "P08-11",
              "done": true,
              "text": "Keep map and material identity in the renderer cache; do not bind another map's duplicate texture basename.",
              "children": []
            },
            {
              "id": "P08-12",
              "done": false,
              "text": "Add picking/broadphase support using the same geometry/pose as rendering.",
              "children": []
            },
            {
              "id": "P09-01",
              "done": false,
              "text": "Reproduce map material overrides and original ambient/diffuse/emissive ordering first.",
              "children": []
            },
            {
              "id": "P09-02",
              "done": false,
              "text": "Apply source sun, sublight and character-light configuration with correct units and directions.",
              "children": []
            },
            {
              "id": "P09-04",
              "done": false,
              "text": "Render a separate complete sky backdrop; do not derive gradient coverage from the low cloud mesh.",
              "children": []
            },
            {
              "id": "P09-06",
              "done": false,
              "text": "Respect separate SKY fog and world fog flags; reproduce authored starts/ends/colours.",
              "children": []
            },
            {
              "id": "P11-05",
              "done": true,
              "text": "Connect calculated status/effects after CHAR_INIT and apply authoritative notifications.",
              "children": []
            },
            {
              "id": "P20-05",
              "done": true,
              "text": "Verify selection -> CHAR_INIT -> Mandara before movement/camera/NPC transactions.",
              "children": []
            },
            {
              "id": "P15-02a",
              "done": false,
              "text": "Load one coherent Zone01 NPCGener/GenerationArea/MapData dataset from selected staged offline data with provenance.",
              "children": []
            },
            {
              "id": "P15-03a",
              "done": false,
              "text": "Preflight selected Mandara terrain/placements/population/collision companions and essential FX/audio/environment.",
              "children": []
            },
            {
              "id": "P07-09a",
              "done": true,
              "text": "Present selected world actor idle animation with its source equipment/weapon binding.",
              "children": []
            }
          ],
          "gate": {
            "id": "BG-C04-GATE",
            "done": false,
            "text": "Copied character reaches rendered Mandara at the seed zone/cells with expected stats/equipment and essential UI. Heights/placements/material identity and async cancellation pass; no duplicate actors/audio. Movement/services are not claimed yet.",
            "children": []
          },
          "done": 9,
          "total": 22,
          "percent": 41
        },
        {
          "id": "C05",
          "title": "Movement, camera and MainUI",
          "tasks": [
            {
              "id": "P05-05",
              "done": false,
              "text": "Preserve source button states, shortcut dispatch, focus, close/Escape and panel dragging.",
              "children": []
            },
            {
              "id": "P05-06",
              "done": false,
              "text": "Persist positions/options in a private profile without truncating unknown Interface.sys data.",
              "children": []
            },
            {
              "id": "P05-08",
              "done": false,
              "text": "Apply original widget RGB and alpha, including orange NPC headings/options and white dialogue text.",
              "children": []
            },
            {
              "id": "P05-09",
              "done": false,
              "text": "Add item/skill/control tooltips with topmost hit testing, native delay, wrapping and viewport clamping.",
              "children": []
            },
            {
              "id": "P05-10",
              "done": false,
              "text": "Add source player/NPC/monster names with correct model-height anchors, colours and speech placement.",
              "children": []
            },
            {
              "id": "P05-11",
              "done": false,
              "text": "Port original CUR/ANI cursor files and source cursor-context priority.",
              "children": []
            },
            {
              "id": "P05-12",
              "done": false,
              "text": "Recreate status, target, inventory, cargo, skill, quick-slot, minimap, chat and options panels.",
              "children": []
            },
            {
              "id": "P05-13",
              "done": false,
              "text": "Track dirty widgets; unchanged inventories/names must not rerasterize or upload each frame.",
              "children": []
            },
            {
              "id": "P07-10",
              "done": false,
              "text": "Keep repeated movement destinations from restarting the same animation.",
              "children": []
            },
            {
              "id": "P10-01",
              "done": false,
              "text": "Port source mouse/keyboard movement and run/walk/camera modes exactly.",
              "children": []
            },
            {
              "id": "P10-02",
              "done": false,
              "text": "Keep click picking, pathfinding, height sampling and actor collision in native units.",
              "children": []
            },
            {
              "id": "P10-03",
              "done": false,
              "text": "Reject blocked destinations; route around obstructions without teleporting through buildings.",
              "children": []
            },
            {
              "id": "P10-04",
              "done": false,
              "text": "Handle narrow passages, corners, slopes, edges and moving actor obstruction.",
              "children": []
            },
            {
              "id": "P10-05",
              "done": false,
              "text": "Preserve turn/facing behavior and action-locked movement requests.",
              "children": []
            },
            {
              "id": "P10-06",
              "done": false,
              "text": "Implement source reset/orbit/zoom/follow and camera obstruction without abrupt clipping.",
              "children": []
            },
            {
              "id": "P10-07",
              "done": false,
              "text": "Keep rendered interpolation separate from authoritative position and saved cells.",
              "children": []
            },
            {
              "id": "P10-08",
              "done": true,
              "text": "Record missing authored .tbo collision as a remaining parity limit; do not mark geometric fallback as native collision complete.",
              "children": []
            },
            {
              "id": "P10-09",
              "done": false,
              "text": "Accept the ZFLauncher Mandara movement/camera route independently, then broaden route coverage; OGRE acceptance does not count as a bgfx pass.",
              "children": []
            },
            {
              "id": "P12-02",
              "done": false,
              "text": "Preserve Chakra spending, skill learning and native quick-slot modes/shortcuts.",
              "children": []
            },
            {
              "id": "P07-09b",
              "done": false,
              "text": "Accept source walk/run/sheath states and unchanged animation phase on retarget before combat.",
              "children": []
            }
          ],
          "gate": {
            "id": "BG-C05-GATE",
            "done": false,
            "text": "Real SDL input moves without teleporting, rejects blocked destinations and preserves animation phase on retarget. Reset/orbit/zoom and town-route framing are usable. UI hit order, copied quick slots and layout/state survive reload.",
            "children": []
          },
          "done": 1,
          "total": 20,
          "percent": 5
        },
        {
          "id": "C06",
          "title": "Ordinary services and basic offline combat",
          "tasks": [
            {
              "id": "P07-12",
              "done": false,
              "text": "Keep action animation locks, impact times, facing, blend completion and loop rules source-backed.",
              "children": []
            },
            {
              "id": "P11-06",
              "done": false,
              "text": "Preserve native inventory/equipment placement, stacking, splitting, occupied-slot and consumable actions.",
              "children": []
            },
            {
              "id": "P11-07",
              "done": false,
              "text": "Show actual item-instance state in tooltips: refinement, durability, effects, limits, count and service context.",
              "children": []
            },
            {
              "id": "P11-08",
              "done": true,
              "text": "Wire merchant dialogue and buy/sell confirmations with authoritative prices/counts/revisions.",
              "children": []
            },
            {
              "id": "P11-09",
              "done": true,
              "text": "Wire repair, warehouse item/Rupiah movement and save-point confirmation/persistence.",
              "children": []
            },
            {
              "id": "P11-10",
              "done": true,
              "text": "Handle stale requests, insufficient money/capacity and invalid selections without client-side optimistic divergence.",
              "children": []
            },
            {
              "id": "P11-12",
              "done": true,
              "text": "Verify database before/after state and normal-profile hashes after one isolated acceptance run.",
              "children": []
            },
            {
              "id": "P12-01",
              "done": false,
              "text": "Port target selection/selection arrow, approach, attack range and facing.",
              "children": []
            },
            {
              "id": "P12-04",
              "done": false,
              "text": "Maintain action locks without freezing simulation/input pumping.",
              "children": []
            },
            {
              "id": "P20-06",
              "done": true,
              "text": "Accept warehouse/save-point/persistence in ZFLauncher after its own initial creation/deletion checks; omit repeated matrices only when that ZFLauncher path already passed and its dependencies are unchanged.",
              "children": []
            },
            {
              "id": "P20-09",
              "done": true,
              "text": "Verify SQLite counts, money, revisions and saved cells after exit; compare normal-profile hashes.",
              "children": []
            },
            {
              "id": "P12-05a",
              "done": false,
              "text": "Accept represented basic melee hit/miss/critical/block and impact feedback under pinned source rules.",
              "children": []
            },
            {
              "id": "P12-06a",
              "done": false,
              "text": "Port baseline encounter idle/move/chase/attack/hurt/death; retain complete AI/respawn gaps.",
              "children": []
            },
            {
              "id": "P12-07a",
              "done": false,
              "text": "Accept baseline encounter routing/leash/facing with authoritative ranges; full native AI remains open.",
              "children": []
            },
            {
              "id": "P12-08a",
              "done": true,
              "text": "Apply represented basic rewards/progression/persistence; full loot/pickup/penalties remain P12-08.",
              "children": []
            },
            {
              "id": "P13-06b",
              "done": true,
              "text": "Wire selected basic attack/impact sound/FX; complete event/family coverage remains P13-06.",
              "children": []
            }
          ],
          "gate": {
            "id": "BG-C06-GATE",
            "done": true,
            "text": "Buy/sell/repair and item/Rupiah deposit/withdraw conserve state; save-point and current/saved cells survive exit/reload. Basic encounter applies hit/death and represented rewards. Failure/stale/capacity paths and source hashes pass. Full active skills/AI/loot remain open.",
            "children": []
          },
          "done": 8,
          "total": 16,
          "percent": 50
        },
        {
          "id": "C07",
          "title": "Current OGRE foundation coverage",
          "tasks": [
            {
              "id": "P06-10",
              "done": false,
              "text": "Reenter INTRO after disconnect without duplicate windows, sounds, actors or scene ownership.",
              "children": []
            },
            {
              "id": "P07-08",
              "done": false,
              "text": "Port all eight playable tribes and source face/hair/skin/equipment bindings.",
              "children": []
            },
            {
              "id": "P07-09",
              "done": false,
              "text": "Preserve weapon-type-specific idle, move, walk, attack, skill and sheath states.",
              "children": []
            },
            {
              "id": "P09-03",
              "done": true,
              "text": "Keep original source timing/interpolation for morning, noon, evening and night.",
              "children": []
            },
            {
              "id": "P09-05",
              "done": true,
              "text": "Port original cloud masks, scrolling, colour/alpha, stars, sun/moon and flare occlusion.",
              "children": []
            },
            {
              "id": "P09-07",
              "done": true,
              "text": "Keep horizon models and fog transitions consistent with the active map and time.",
              "children": []
            },
            {
              "id": "P09-08",
              "done": true,
              "text": "Implement depth-comparison directional shadows with alpha-aware casters and stable projection.",
              "children": []
            },
            {
              "id": "P09-09",
              "done": false,
              "text": "Tune contact sharpness, filter radius, slope/normal bias and fade; guard against acne, detached shadows and swimming.",
              "children": []
            },
            {
              "id": "P09-15",
              "done": false,
              "text": "Compare the Kathana screenshots at matching time, camera, aspect ratio and asset identity.",
              "children": []
            },
            {
              "id": "P13-02",
              "done": false,
              "text": "Preserve model, animation, sprite, particle, ribbon/trail and local-light nodes.",
              "children": []
            },
            {
              "id": "P13-04",
              "done": false,
              "text": "Match billboard modes, blend factors, UV animation, colour/size curves and depth rules.",
              "children": []
            },
            {
              "id": "P13-06",
              "done": false,
              "text": "Support field day/night FX and actor impact/attack/skill audio events.",
              "children": []
            },
            {
              "id": "P13-07",
              "done": false,
              "text": "Route map music and safe/hostile-area changes from original tables/source logic.",
              "children": []
            },
            {
              "id": "P13-08",
              "done": false,
              "text": "Apply live effects/music gains to existing and future voices and persist the native option values.",
              "children": []
            },
            {
              "id": "P13-09",
              "done": false,
              "text": "Handle audio device failure as recoverable; prevent duplicate music on transition/retry.",
              "children": []
            },
            {
              "id": "P13-10",
              "done": false,
              "text": "Record unsupported FX node semantics instead of silently skipping visible content.",
              "children": []
            },
            {
              "id": "P20-07",
              "done": false,
              "text": "Capture matched reference views for sky, fog, foliage, character material and shadow edges.",
              "children": []
            },
            {
              "id": "BG-LOD-01",
              "done": false,
              "text": "Port HtModelLod distance bands, _L1-_L4 selection, TooFar and missing-detail fallback; verify attachments/picking/shadows through transitions.",
              "children": []
            }
          ],
          "gate": {
            "id": "BG-C07-GATE",
            "done": false,
            "text": "Matrix groups 01-06 and represented 07/12 portions have independent bgfx evidence. Cover eight previews, LOD/fallback transitions, matched environment/foliage/character/shadow views and actual selected audio. List broader native/OGRE gaps explicitly.",
            "children": []
          },
          "done": 4,
          "total": 18,
          "percent": 22
        },
        {
          "id": "C08",
          "title": "Performance, recovery and full package",
          "tasks": [
            {
              "id": "P07-04",
              "done": false,
              "text": "Implement GPU skinning with a tested palette layout and a correct CPU fallback.",
              "children": []
            },
            {
              "id": "P07-07",
              "done": false,
              "text": "Keep UV/index/bind data immutable; update only pose/instance data during ordinary animation.",
              "children": []
            },
            {
              "id": "P13-05",
              "done": false,
              "text": "Pool emitters/buffers and bound spawns/uploads without changing authored effect timing.",
              "children": []
            },
            {
              "id": "P17-02",
              "done": false,
              "text": "Measure cold/warm startup, INTRO, CHAR_INIT/Mandara readiness and transition stalls separately.",
              "children": []
            },
            {
              "id": "P17-04",
              "done": false,
              "text": "Cache immutable archive indexes, decoded metadata, meshes, textures and bound animation resources.",
              "children": []
            },
            {
              "id": "P17-05",
              "done": false,
              "text": "Use a derived cache keyed by payload hash, reader/schema version, shader version and target backend.",
              "children": []
            },
            {
              "id": "P17-06",
              "done": false,
              "text": "Decode/read on workers and budget GPU uploads so SDL events/loading animation remain responsive.",
              "children": []
            },
            {
              "id": "P17-07",
              "done": false,
              "text": "Prioritize player/ground/essential UI before distant actors or optional FX.",
              "children": []
            },
            {
              "id": "P17-08",
              "done": false,
              "text": "Use spatial culling and material/mesh-compatible instancing; retain transparent sort boundaries.",
              "children": []
            },
            {
              "id": "P17-09",
              "done": false,
              "text": "Skip invisible visual work conservatively while clocks, simulation, sockets and shadow requirements remain correct.",
              "children": []
            },
            {
              "id": "P17-10",
              "done": false,
              "text": "Reuse per-frame memory; avoid heap-heavy map/string lookup and redundant constant updates per draw.",
              "children": []
            },
            {
              "id": "P17-11",
              "done": true,
              "text": "Cache or sample resource counters; do not rescan every texture/buffer manager per frame.",
              "children": []
            },
            {
              "id": "P17-12",
              "done": false,
              "text": "Bound GPU/CPU/IO memory, queue depth and resource retirement across repeated transitions.",
              "children": []
            },
            {
              "id": "P17-13",
              "done": false,
              "text": "Compare equal-quality builds; do not claim improvement from reduced shadows/visibility/animation/texture quality.",
              "children": []
            },
            {
              "id": "P17-14",
              "done": false,
              "text": "Define provisional acceptance of sustained 60 FPS at the agreed test resolution on named hardware, then refine from measured baselines.",
              "children": []
            },
            {
              "id": "P17-15",
              "done": false,
              "text": "Report median and p95/p99 frame times and worst stalls alongside FPS; no 500-1,000 FPS guarantee.",
              "children": []
            },
            {
              "id": "P18-03",
              "done": false,
              "text": "Exercise repeated resize/minimize/focus loss and renderer-reset paths explicitly.",
              "children": []
            },
            {
              "id": "P18-05",
              "done": false,
              "text": "Retire GPU handles only after their use is complete; verify shutdown ordering and leaks.",
              "children": []
            },
            {
              "id": "P18-08",
              "done": false,
              "text": "Check selection/retry/return paths for missing sockets, stale render state and duplicate actors/audio.",
              "children": []
            },
            {
              "id": "P19-10",
              "done": false,
              "text": "Retain license notices and omit SDK source/build caches, secrets and unused canonical payloads from the client package.",
              "children": []
            }
          ],
          "gate": {
            "id": "BG-C08-GATE",
            "done": false,
            "text": "Named hardware/scene/quality has median/p95/p99, stalls, loading and memory evidence. Provisional sustained 60 FPS target uses recorded resolution; it is not a claimed result. Debug/Release, relocation and repeated lifecycle checks preserve assets/saves. C09 claims remain open.",
            "children": []
          },
          "done": 1,
          "total": 20,
          "percent": 5
        },
        {
          "id": "C09",
          "title": "Remaining systems and repository administration",
          "tasks": [
            {
              "id": "P00-02",
              "done": false,
              "text": "Finish authenticated checkout of existing remote main; preserve its history.",
              "children": []
            },
            {
              "id": "P00-03",
              "done": false,
              "text": "Register _remake_bgfx in the migrated parent's .gitmodules and index as a real submodule.",
              "children": []
            },
            {
              "id": "P00-04",
              "done": false,
              "text": "Document the requested-path/canonical-checkout relationship and designated edit/commit path without moving unrelated dirty trees; linked worktrees do not share uncommitted changes.",
              "children": []
            },
            {
              "id": "P09-10",
              "done": false,
              "text": "Add cascades only after the first shadow path is correct; validate seams and near/far coverage.",
              "children": []
            },
            {
              "id": "P09-11",
              "done": false,
              "text": "Port authored water/Env_Water transforms, textures, animation and blend rules.",
              "children": []
            },
            {
              "id": "P09-12",
              "done": false,
              "text": "Add weather and visibility/dynamic map loading only where configuration/resource evidence exists.",
              "children": []
            },
            {
              "id": "P11-11",
              "done": false,
              "text": "Track remaining religion/class/transport/quest/refinement services separately from ordinary NPC dialogue.",
              "children": []
            },
            {
              "id": "P12-03",
              "done": false,
              "text": "Use source skill ready/cast/apply timing, target/range/area and resource identifiers.",
              "children": []
            },
            {
              "id": "P12-05",
              "done": false,
              "text": "Port melee, active skills, periodic effects, miss/critical/block and combat feedback.",
              "children": []
            },
            {
              "id": "P12-06",
              "done": false,
              "text": "Implement source-backed monster idle/walk/chase/attack/hurt/death/respawn behavior.",
              "children": []
            },
            {
              "id": "P12-07",
              "done": false,
              "text": "Preserve monster navigation, aggression/leash rules and owner-facing during attacks.",
              "children": []
            },
            {
              "id": "P12-08",
              "done": false,
              "text": "Apply loot/rewards, pickup, Prana/experience/leveling and native penalties through authority.",
              "children": []
            },
            {
              "id": "P12-09",
              "done": false,
              "text": "Preserve death UI and source resurrection services; no temporary R-key substitute.",
              "children": []
            },
            {
              "id": "P14-01",
              "done": false,
              "text": "Audit _server_cpp\\include\\tantra\\wire.h and current local C++ service implementations; compare the migrated _server version explicitly before reusing a protocol.",
              "children": []
            },
            {
              "id": "P14-02",
              "done": false,
              "text": "Document supported messages versus placeholders; port existing working adapters, not empty callbacks.",
              "children": []
            },
            {
              "id": "P14-03",
              "done": false,
              "text": "Keep localhost/127.0.0.1 defaults; do not import historical source IPs.",
              "children": []
            },
            {
              "id": "P14-04",
              "done": false,
              "text": "Implement authentication/session/roster/world-entry transport with bounded frames and timeouts.",
              "children": []
            },
            {
              "id": "P14-05",
              "done": false,
              "text": "Define movement/combat/inventory/NPC command/notification ownership and revision rules.",
              "children": []
            },
            {
              "id": "P14-06",
              "done": false,
              "text": "Keep client prediction/interpolation distinct from authoritative calculations and persistence.",
              "children": []
            },
            {
              "id": "P14-07",
              "done": false,
              "text": "Prevent the offline authority from mutating online sessions in parallel.",
              "children": []
            },
            {
              "id": "P14-08",
              "done": false,
              "text": "Handle disconnect, cancellation, reconnect, stale notifications and failed handoff without duplication.",
              "children": []
            },
            {
              "id": "P14-09",
              "done": false,
              "text": "Reuse the existing native Win32 server manager and per-zone processes/configuration; do not rewrite the manager inside ZFLauncher.",
              "children": []
            },
            {
              "id": "P14-10",
              "done": false,
              "text": "Gate claims of multiplayer support on actual two-client/server transactions with evidence.",
              "children": []
            },
            {
              "id": "P15-01",
              "done": false,
              "text": "Generate a versioned map/zone manifest from original catalogs and server profiles.",
              "children": []
            },
            {
              "id": "P15-02",
              "done": false,
              "text": "For each zone, keep NPCGener.txt, GenerationArea.idx and MapData.tcm from one selected source dataset.",
              "children": []
            },
            {
              "id": "P15-03",
              "done": false,
              "text": "Preflight regular/Pop meshes/textures, terrain, collision companions, FX, actors, audio and environment configuration.",
              "children": []
            },
            {
              "id": "P15-04",
              "done": false,
              "text": "Report missing assets without silently borrowing another zone's payload.",
              "children": []
            },
            {
              "id": "P15-05",
              "done": false,
              "text": "Match map origin, units, native spawn/save/portal cells and terrain height.",
              "children": []
            },
            {
              "id": "P15-06",
              "done": false,
              "text": "Implement correct resource retirement and bounded preloading for map transitions.",
              "children": []
            },
            {
              "id": "P15-07",
              "done": false,
              "text": "Match active server routing to the destination map and reject unsupported zones honestly.",
              "children": []
            },
            {
              "id": "P15-08",
              "done": false,
              "text": "Remove Zone01-only authority restrictions only after the destination's server logic/data are ready.",
              "children": []
            },
            {
              "id": "P15-09",
              "done": false,
              "text": "Use the same per-zone checks: entry, movement, NPCs, environment, audio, return and saved-zone persistence.",
              "children": []
            },
            {
              "id": "P15-10",
              "done": false,
              "text": "Keep all ten acceptance toggles unchecked until their individual evidence exists.",
              "children": []
            },
            {
              "id": "P16-01",
              "done": false,
              "text": "Audit native quest state, dialogue conditions, kill/item objectives and rewards.",
              "children": []
            },
            {
              "id": "P16-02",
              "done": false,
              "text": "Implement advanced NPC callbacks, class/religion changes and refinement workflows.",
              "children": []
            },
            {
              "id": "P16-03",
              "done": false,
              "text": "Preserve authoritative main/sub-refinement chances, costs, limits and result handling.",
              "children": []
            },
            {
              "id": "P16-04",
              "done": false,
              "text": "Add portals/transport, return items and remaining resurrection paths/penalties.",
              "children": []
            },
            {
              "id": "P16-05",
              "done": false,
              "text": "Implement chat channels/whispers, parties and authoritative membership state.",
              "children": []
            },
            {
              "id": "P16-06",
              "done": false,
              "text": "Implement trade offer/confirm/cancel/disconnect behavior and atomic item/money persistence.",
              "children": []
            },
            {
              "id": "P16-07",
              "done": false,
              "text": "Implement guild state, member names/marks and permissions before enabling dependent UI.",
              "children": []
            },
            {
              "id": "P16-08",
              "done": false,
              "text": "Audit PvP, duels, events, siege/competitive modes and their native restrictions.",
              "children": []
            },
            {
              "id": "P16-09",
              "done": false,
              "text": "Mark unsupported online commands visibly and avoid sending guessed legacy packets.",
              "children": []
            },
            {
              "id": "P16-10",
              "done": false,
              "text": "Require explicit server implementation/evidence for each feature, not just client buttons.",
              "children": []
            },
            {
              "id": "P20-11",
              "done": false,
              "text": "When separately requested, commit/push the module first and then update/push the parent's pinned gitlink.",
              "children": []
            },
            {
              "id": "BG-ONLINE-01",
              "done": false,
              "text": "Accept a real localhost client/server session before claiming transport support.",
              "children": []
            },
            {
              "id": "BG-MULTI-01",
              "done": false,
              "text": "Accept actual two-client authoritative transactions before claiming multiplayer support.",
              "children": []
            }
          ],
          "gate": {
            "id": "BG-C09-GATE",
            "done": false,
            "text": "Every claimed feature has source/authority/CPU/runtime evidence. Single-client transport differs from multiplayer acceptance. Each zone separately passes resources, authority and transition/persistence; profiles alone never pass.",
            "children": []
          },
          "done": 0,
          "total": 46,
          "percent": 0
        }
      ],
      "foundations": [
        "C++20 x64 Debug/Release, pinned bgfx dependencies and separate client output",
        "Original HPK resources, native UI, CPU skinning and sockets",
        "Offline login, eight tribe previews and saved-roster Mandara entry",
        "Documented minimum warehouse, save, merchant, repair and death/revival gates",
        "Directional shadow submission and authored-normal checks"
      ],
      "next": [
        "Broaden movement, narrow passages, camera obstruction and MainUI acceptance",
        "Finish inherited combat/animation/FX adapters with native TAB hit timing",
        "Complete sky, water, weather, foliage and matched rendering comparisons",
        "Add GPU skinning, asynchronous loading, lifecycle recovery and remaining gameplay"
      ],
      "changes": [
        {
          "date": "2026-10-26",
          "title": "Ordinary services and revival",
          "text": "The bgfx progress record closes its C06 minimum service gate, including paid repair/reload and native death/revival. Full combat/FX coverage remains open."
        },
        {
          "date": "2026-10-26",
          "title": "INTRO and renderer checks",
          "text": "Eight tribe previews, authored normals and directional-shadow checks are recorded. These focused checks do not establish full visual or performance parity."
        },
        {
          "date": "2026-10-26",
          "title": "Separate runtime and evidence",
          "text": "ZFLauncher uses its dedicated client/profile. OGRE runtime results are not transferred to bgfx acceptance."
        }
      ],
      "done": 75,
      "total": 245,
      "percent": 31,
      "accepted": 3
    }
  ],
  "zones": [
    {
      "zone": "Zone01",
      "map": 40001,
      "name": "Mandara1st",
      "accepted": false
    },
    {
      "zone": "Zone02",
      "map": 40002,
      "name": "Mandara2nd",
      "accepted": false
    },
    {
      "zone": "Zone03",
      "map": 40003,
      "name": "MandaraCave",
      "accepted": false
    },
    {
      "zone": "Zone04",
      "map": 40004,
      "name": "MandaraCave2nd",
      "accepted": false
    },
    {
      "zone": "Zone05",
      "map": 40005,
      "name": "MandaraCave3rd",
      "accepted": false
    },
    {
      "zone": "Zone06",
      "map": 40006,
      "name": "MandaraCave4th",
      "accepted": false
    },
    {
      "zone": "Zone07",
      "map": 40007,
      "name": "Jina1st",
      "accepted": false
    },
    {
      "zone": "Zone08",
      "map": 40008,
      "name": "Jina2nd",
      "accepted": false
    },
    {
      "zone": "Zone09",
      "map": 40009,
      "name": "Jina3rd",
      "accepted": false
    },
    {
      "zone": "Zone10",
      "map": 40010,
      "name": "NewKruma / Jina4th",
      "accepted": false
    }
  ],
  "sources": {
    "ogre_plan": {
      "path": "documentation/client/planning/HTLAUNCHER_CLIENT_IMPLEMENTATION_PLAN.md",
      "sha256": "7ede8731d23f53a1184014c9a32dc4c22307082d20b9abfd8d763278b6121695"
    },
    "ogre_progress": {
      "path": "documentation/client/PROGRESS.md",
      "sha256": "bbcb2a149f3e5eabbf9f26f733dda2438be3393acdbd9b42f390a2491cbc6fb9"
    },
    "bgfx_plan": {
      "path": "reference/bgfx/IMPLEMENTATION_PLAN.md",
      "sha256": "cbb6ee487dba47c750452abf5a77eb1f80c2afee0d03e78e76f68ace88238b9b"
    },
    "bgfx_progress": {
      "path": "reference/bgfx/PROGRESS.md",
      "sha256": "514c53bb4de03d669d4b8cca25471a290a0ff46343a4bc4f7bdb6c2c50acd2ce"
    }
  },
  "reference": {
    "repository": "https://github.com/AsheshDevelopment/zGenesis",
    "file_sha": "d72de49e3bf103e8ebceeb0d1ec2b2a537575364",
    "adapted": "Static hash navigation, dark editorial layout, progress bars, task accordions and changelog structure. No GENESIS product content or password digest is reused."
  }
};
