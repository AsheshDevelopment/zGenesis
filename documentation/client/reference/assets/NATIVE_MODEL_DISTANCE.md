# Shipped engine model-distance evidence

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The original client DLLs provide additional evidence where the engine source
is absent. `tools/inspect-native-distance.py` reads their PE structures and
disassembles selected instructions using `pefile` and `capstone`. It never
loads or executes the binaries. Inspection is bound to explicit SHA-256 hashes;
an unknown binary profile is rejected instead of reusing these addresses.

The reproducible report is [native-model-distance.txt](../../evidence/native-model-distance.txt).
Run from `_remake` with:

    python tools/inspect-native-distance.py --client-root ../TantraClient --output docs/evidence/native-model-distance.txt

## Identification chain

| Evidence | Location in supplied binaries |
| --- | --- |
| Factory constructor installs manager vtable | HT3DHeaven.dll RVA A767; vtable RVA 63588 |
| Launcher LOD loop calls distance slot | HTLauncher.exe RVA 3B005; virtual slot 1C0 |
| Same loop branches on skinned model, calls character LOD, tests TooFar | RVA 3B01E compares type 16 hex; RVA 3B02B calls 367E2; RVA 3B037 compares result with 4 |
| Manager distance routine | HT3DHeaven.dll RVA 3CB0 |
| Three-component length helper | HT3DHeaven.dll RVA 210C |
| Helper calls square-root routine with FSQRT positive path | RVA 50954; FSQRT at 5097C |
| Manager set-LOD slot | 1B8 -> RVA 16F2; accepts levels 0 through 3 |

The LOD loop corresponds to the source `HTMapSystem.cpp` skinned-model branch.
The distance routine obtains the object position, obtains the camera object,
subtracts its three position components, and calls the vector-length helper.
Each coordinate difference is stored to float32 before length evaluation. The
helper squares all three components, sums them, passes a double to the square
root routine, and the launcher stores the returned distance to float32.
It is three-dimensional Euclidean distance, not planar or squared distance.

`HtModelLod.h::distanceFromCamera` implements that operation for explicit source
positions, independently of OGRE. The input is source units; renderer units
must not be compared directly to the source LOD thresholds. The camera
sequence now interpolates original source coordinates and converts them only
when constructing its renderer view, avoiding a scale-then-unscale step.

## Corrected enum evidence

The supplied compatibility `Tantra/inc/HT3D.h` declares TooFar=-1. The shipped
launcher instead returns 4 from the final branch of its character LOD function,
tests 4 in the caller, and forwards only levels 0..3 to the manager. The earlier
remake note incorrectly described the compatibility header's value as native.
The remake's `HtModelLod::TooFar` is now 4. Canonical source files were not
modified. Other compatibility-header ABI values cannot be assumed to match
these shipped binaries without verification.

## Validation scope

The C++ probe checks the 3-4-12 distance, a vertical-only distance that changes
LOD, zero/symmetric distances, source camera endpoints, and analytical float32
goldens for both gate positions. Initial distance is 338.8805236816406
(`43A970B5`); login distance is 388.4134521484375 (`43C234EC`). Those goldens
are calculated from the source positions and inspected formula, not captured
from a running original client. A large-coordinate case guards against
accidental float32 square-sum overflow in the port; it is not evidence about
all historical engine overflow cases.

Native x87 control state and precision effects across the complete running
engine have not been established. The port uses float32 differences and a
double square-sum/sqrt, and does not claim universal bit-for-bit native numeric
parity. Bone skinning and complete native world/detail integration remain
unfinished. Subsequent [named-record selection](MODEL_DETAIL_SELECTION.md)
work provides explicit renderer level selection with a bounded evidence scope.
This change supplies the distance operation and ABI
evidence; it does not claim that gate instances are already rendered.

2026-10-22 validation: Debug and Release builds pass 42/42 CTest checks each.
Both refreshed packages pass the ordered default startup and separate gallery
lifetime smoke. The read-only PE inspection tool also passes its hash and
instruction checks. Logs use `build-ogre-sdl/native-distance-*`; native runtime
floating-point parity remains unverified.
