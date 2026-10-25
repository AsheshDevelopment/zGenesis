# Bounded native actor loading

Updated: 2026-10-25. This is a responsiveness correction, with CPU verification;
rendered performance and the old deployment's hang cause remain unconfirmed.

## What changed

`_remake/src/rendering/HtRenderFacade/WorldActorPresentation.h` previously created
every newly nearby NPC/monster synchronously during one update. It now shares a
creation budget with dropped-item models: at most two new objects per frame, and
no further creation after four milliseconds of that update. The first creation is
always allowed so the queue makes progress. A single read/decode/GPU upload is
indivisible and can exceed this soft budget. This is not background I/O.

Existing actors continue receiving visibility, movement and animation updates
while new actors wait. Native catalog resources, the 400-unit creation radius,
500-unit eviction radius, authored skeleton roots and explicit failure paths are
retained. There are no substitute models or extracted-HPK caches.

`src/app/tantra_remake_main.cpp` prepares the initial population during Starting,
with SDL events/rendering between batches. Simulation and gameplay input begin
after the population is ready and the native camera transition reaches gameplay.
`src/compatibility/HtMainGameStartup.h` initializes a valid first view while
waiting, then resumes the original camera calculations and update counts.

Source references are `_references/Tantra/HTlauncher/HTGameManager.cpp`
(`OneTimetUpdate`, `SetStartMainGamePlay`) and the native `HTCamera.cpp`
STARTGAMEPLAY/CENTERCHARACTER branches. Scheduling is a remake correction;
it is not a claim that the original used this budget.

During initial loading, `TantraRemakeSession.log` receives flushed
`WORLD_ACTOR_UPLOAD_BEGIN` and `WORLD_ACTOR_UPLOAD_END` entries with actor key,
resource ID and model. A missing END can identify the upload needing a stack
capture; it does not establish the cause by itself. The journal is capped at
2,048 entries per client process. The lifecycle report also records pending and
created counts when the queue changes.

## Verification and acceptance

The `world_actor_loading` CPU fixture reads actual Mandara/Zone01 data and models
through a renderer double. It verifies time/count limits, eventual creation,
existing-actor updates, preserved failures, relocation/eviction and equality of
the resumed camera sequence to uninterrupted native updates. It does not create
an OGRE window, perform GPU uploads or measure actual frame times.

The user reported that the previously staged updated build reaches Mandara.
Movement/camera responsiveness and remaining warehouse/save-point acceptance
are still open. The retained Windows hang events identify the older
`C:\_GitHub\TantraSrc\_client\HTLauncher.exe` deployment, not the current
`C:\_GitHub\tantra-dev-main\_client\HTLauncher.exe`. No stack was available.

Use the existing **Tantra Online - Updated Offline Test** desktop shortcut,
ashesh / ashesh, first channel, MandaraNpc, for an authorized manual test. Do not
launch another channel/process automatically after a failure; retain logs and
capture the existing frozen process if it remains open.

Exact CPU/build/static results and launcher hash are recorded in
[the evidence](../evidence/bounded-actor-loading-20261025.json).
