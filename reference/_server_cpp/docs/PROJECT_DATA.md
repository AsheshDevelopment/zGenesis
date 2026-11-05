# Project XLSX data releases

The standalone `bin/TantraDataTools.exe` uses only `bin/XLSXData` (the packaged
source is `_server_final/bin/XLSXData`). Server Manager has no Tools page. There is no data-family selector or
external XML picker. Global is the gameplay baseline. `ClientRes.xlsx` retains
K3 MainUI/IntroUI bindings and the current client's eight loading bindings;
Global-only UI entries and all other resource values remain available.

The Global-baseline TantraParam workbook has documented map compatibility
overrides: Mandara1st NPC placement matches the original K3 map, and portal 131 uses the original K3 Mandara arrival bounds. The original
Global rectangle has no valid landing cell on this client's terrain. All other
Portal fields and records remain Global. See [Cave evidence and source rules](PROJECTILE_CAVE_RECOVERY.md).

The eight converters generate client/server TantraParam, ClientRes, HTMessage,
NPC scripts, HTSSetting, FX-PC and scroll quests. The original sources remain
read-only. Server settings and FX-PC use captured original C++ writers.
The supplied source revision predates scroll quests: its exporter uses six
sequential layouts checked against both supplied deployed TXLs, rather than
claiming a recovered original writer.

| Scroll table | Record bytes including its ID |
| --- | ---: |
| QuestMain | 2064 |
| Contents | 76 |
| Pay | 96 |
| Performance | 72 |
| Script | 1084 |
| SelectText | 1008 |

Each table begins with a little-endian DWORD count. Text fields are 1000 bytes.
Both `E:\Global-server\Zone06\HTScrollQuestSystem.txl` and
`E:\TANTRA_SRV_3085\Server\Server\Zone1\HTScrollQuestSystem.txl` agree on
every table boundary and EOF. Philippine text is the generated English text.
Reserved numeric fields are retained; authoring-only Note/localization columns
are not serialized. This exporter does not add scroll-quest gameplay handlers.

Use **Generate paired data package** in Tantra Data Tools to generate a new
`state/data-releases` folder containing:

- `client`: native data and matching signed public connection files, ready to
  merge into a BGFX client. Existing HPKs remain packed and are never extracted.
- `server/data/rules`: the datasets consumed by the C++ server, regenerated from
  TantraParam and HTSSetting XLSX values. Native C++ formulas remain authoritative.
- `server`: native `TantraParam_sv.tpa`, HTSSetting and scroll-quest artifacts.
  Server apply installs that TPA as `data/TantraParam.tpa`, preserving its server
  layout and keeping paired C++ rule data in sync.
- `support/data`: matching UTF-8 display text and rule datasets for the remake's
  external runtime support folder. It belongs outside the client.
- `alternates`: the separate Kathana3 XLS variant; it never overwrites the
  default same-basename NPC file.
- `report.json`: input/output hashes, validation details and deployment state.

The existing installed runtime dataset headers define the consumed native schema.
They do not supply gameplay values. Character coefficients, levels/tolerance,
combat tables, AI/speech, items, skills, monsters, NPC services, portals, tasks,
refinement masks and event/reward tables are regenerated together. Saved XLSX
values use named headers and native integer conversion. Native destination
narrowing and the TaskQuest ID range are retained. Attack/skill hit timings and
projectile bindings are regenerated using the new catalogs and the existing TAB
assets, including packed files. Missing clips are recorded and skipped.
Generating data does not change C++ formulas.

Use **Apply server data (stopped)** to generate and apply a release.
All service/zone instance locks must be available. The previous complete rule
folder is retained under `state/rule-backups`; a failed folder switch restores
it together with the prior native server TPA. Start workers after applying. Client files are deployed separately from
the matching `client` overlay; keep its external support text in sync as well.

Validation records workbook/sheet/row/field locations for missing IDs, duplicate
keys, NPC/item/skill references, missing assets and source formula errors.
Asset checks use native virtual paths and HPK indices, with no basename search
or extraction. Existing missing content is recorded and left unchanged. Excel
errors in consumed fields reject generation; errors in unused authoring columns
remain visible diagnostics. In particular, Shambala's original 186 broken
formulas are preserved. Recalculate and save formulas before generating.

Individual native exports remain detached in `state/table-exports`; generating
only a server TPA does not apply runtime rules. Unknown native table extensions
are retained in the workbooks and are not claimed as implemented gameplay.

Command-line equivalents use the same project restrictions:

```powershell
bin\TantraServerManager.exe --root C:\_GitHub\TantraSrc\_server_cpp --compile-table server_settings
bin\TantraServerManager.exe --root C:\_GitHub\TantraSrc\_server_cpp --compile-table fxpc
bin\TantraServerManager.exe --root C:\_GitHub\TantraSrc\_server_cpp --compile-table scroll_quests
bin\TantraServerManager.exe --root C:\_GitHub\TantraSrc\_server_cpp --generate-project-data
bin\TantraServerManager.exe --root C:\_GitHub\TantraSrc\_server_cpp --apply-project-data
```

The Release server packager also generates a matching data release and installs
its generated authority datasets into the packaged server. Ordinary packages
exclude accounts and private connection identities. The specifically requested
local `_server_final` deployment uses `-RuntimeOnly -IncludeLocalState`: it
includes consistent snapshots of the current persistent databases, app-local
Visual C++ runtime DLLs, and the existing protected connection identity. Its TLS
password is bound to the current Windows account. Private identity stays on the
server; matching client/support outputs stay outside this runtime folder.

`-DataRelease <complete-release-folder>` reuses an already validated signed pair
after checking all workbook and output hashes. No repeated conversion is needed.
Runtime-only packaging excludes C++/Python/PowerShell/batch/build files. The
explicitly requested SQL schema and guarded maintenance queries are included
under `sql/`; see [database contract](../sql/README.md). SQLDMN schema 6 adds
`accounts.userLevel DEFAULT 0`; only the exact value 1 is an administrator.

The bounded Release check used an isolated workbook edit (item 4002 price
225 -> 226), generated paired data, and the actual BGFX native TCP channel for
login, archive-backed loading, combat damage timing and merchant buy/sell. The
server charged the edited price. It also rejected a consumed Excel formula error
and a workbook outside the owned folder. This is not a graphical parity claim.
The ordinary v5 project data pair was subsequently staged into `_client_bgfx`
and external remake runtime support, with originals retained outside the client.
Evidence: [completed data release](evidence/project-data-release-20261101.json).
