# TMB skeleton tree evidence

> Source/component reference. Historical integration notes and runtime hashes are scoped to this report; current task status is in [PROGRESS.md](../../PROGRESS.md).
The reader validates the following layout against the supplied client fixtures.
Offsets and hashes refer to original files, which remain read-only.

| Fixture under `resource/object/PC/Mesh` | Tree offset | Records |
| --- | --- | --- |
| PC_Asura_Basic.tmb | `0x3A9B0` | 58 |
| PC_Asura_TypeA_Chest.tmb | `0x170E0` | 58 |

SHA-256:

- Basic: `7956B6D4AAF67F62CB0456209E94BB6246C9276F31C7D35579D4E5982E93B91D`
- Chest: `5A47AF17CC8AD753CA9F6F252E43ADF78541019703E565D14E7CEA7A958DA8B3`

Immediately before each tree is a little-endian 32-bit record count. Each
324-byte record contains a 256-byte name, sixteen float32 matrix elements,
and a uint32 child count. Names match the earlier mesh skeleton table in order.
Matrices are finite affine matrices with final row `(0, 0, 0, 1)` in these
fixtures. The Pelvis record includes translation Y approximately `11.1764`.

The records form a depth-first tree: consume one outstanding child slot from
the current parent and push the new record's child slots. Both fixtures close
exactly one root with 57 child edges. Require the whole block to validate;
searching for the printable `world` name alone is insufficient.

Edges that correct the previous name-based assumptions include:

- `L_Clavicle`, `R_Clavicle`, breast bones, and `WeaponSpine` belong to `Collar`.
- Thighs, `WeaponBack`, `WeaponLeft`, and `WeaponRight` belong to `PelvisTwist`.

`HtCharacterInstance` now uses this decoded parent list. It no longer fabricates
parents from bone names. The stored matrices appear to describe world poses;
their native bind/inverse-bind convention and application to weighted vertex
groups still require validation. The frame-zero animation preview remains an
approximation and is not proof of native skinning parity.

Probes validate both complete trees and reject a corrupted child-count tree in
a temporary file, including when reusing an output object containing a valid
tree. Original fixture files are never modified.
