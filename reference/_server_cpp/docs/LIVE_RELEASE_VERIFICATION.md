# Live Release client verification — 6 November 2026

The current client passed the requested journey against the deployed C++ servers
at **172.16.90.12**, using the shared **tantra_bgfx** MariaDB database on
127.0.0.1:13306. Both clients ran on this Windows PC. This is LAN verification;
the address is not a public Internet endpoint.

The clients entered through **Tantra.exe → ZFLauncher.exe**, checked signed patch
release **1793897963**, and used connection format 2/version 16 from
**serverlist.bin + system/HTMessage.txl**. There was no legacy-local or offline
authority bypass. HTTPS status and all six configured roster/zone TLS endpoints
passed. Separate ConnectionProfile.json and ServerTLS.cer files remain absent.

| Requested flow | Observed result |
| --- | --- |
| Login | Both normal accounts authenticated, selected their character and entered Mandara1st. |
| Movement | 74/28 owner samples and 28/69 peer interpolation samples, including continuous two-axis movement. |
| Combat | Both clients observed an ordinary server-authored attack and monster death/rewards. |
| Automatic party loot | Leader enabled automatic mode. One normal pickup of a 13-Rupiah drop credited 6 to each member; native rounding remainder was 1. |
| Trade | Both players dragged their owned two-item stack with its cursor icon, reviewed and confirmed offers; exact serials exchanged. |
| Saved return | Both exited and completed a fresh TLS login. Positions, Rupiah, exact item serials/counts and existing save coordinates matched the authoritative database. |

Final saved state: both characters have **1,011 Rupiah**. The first is at native
cell **465,346**, holding serial **9101**; the second is at **466,351**, holding
serial **9102**. The final zone snapshot reports **zero operation, position
checkpoint and release failures**, with both QA clients disconnected cleanly.

Use the [JSON evidence](evidence/live-release-20261106.json) for hashes, per-client
results, SQL comparisons, TLS evidence and reviewed screenshots. Raw logs and
private setup are retained under `_server_cpp/build/evidence/live-release-20261106`.
The setup contains test credentials and must remain untracked.

## Fix found during the session

The native client ground route uses correction **15**; the original speed guard
measures correction **10**. The C++ bridge supplied the unconverted authoritative
speed, so a legitimate sustained axis route could accumulate speed-hack strikes
and disconnect. `src/zone/movement.cpp` now converts the server-owned speed at
that boundary. It retains the original guard arithmetic/tolerances and never
trusts the packet's speed. The focused Release movement check passes the 96
original guard vectors, a sustained normal axis route and double-speed rejection.

The corrected Release TantraZone is staged in `_server_cpp/bin` and
`_server_final/bin`; ZFLauncher is staged in `_client_bgfx`. Server Manager
performed the graceful stop/start needed to replace the executable. Services
remain running. Earlier attempts and the original rejection are retained privately.

## Repeat this check

Start the deployed services through Server Manager and wait for their listeners.
Build only the operator fixture if it is not already available:

```powershell
cmake --build C:\_GitHub\TantraSrc\_server_cpp\build --config Release --target TantraLiveReleaseFixture
$check = 'C:\_GitHub\TantraSrc\_server_cpp\build\evidence\live-release-NEW'
python C:\_GitHub\TantraSrc\_server_cpp\tools\verify-live-release.py --output $check
python C:\_GitHub\TantraSrc\_server_cpp\tools\verify-live-release.py --output $check --rejoin
```

Choose a new output folder per session. The helper provisions two unique ordinary
accounts through protected SQLDMN operations, prepares controlled native level-50
characters with owned trade items, then releases their setup leases. The GUI
clients perform normal TLS login and gameplay. Existing accounts are never reset.
On a multi-channel deployment, the harness uses the ordinary `/channel 1` command
to meet. It retains failed-run evidence and rejects stale success markers.

The SQL audit runs after the fresh-login leg. It reads the actual stored native
character records and compares them with the visible clients' results. Setup
and evidence stay outside the shipped client; no HPKs are extracted.

## Scope still open

This check covers ordinary attacks and currency distribution, not every weapon,
skill, equipment/random-loot case or zone. It uses controlled characters rather
than an unboosted fresh progression. Saved return means logout/relogin persistence;
save-point NPC interaction and resurrection were not accepted by this run.

The historical screenshots preserve reserved NPC-speech placeholders. These were
corrected in the [message/package follow-up](BETA_REFRESH_20261106.md); damage and
Prana templates already had English text. The party mode is visibly
Automatic after return, but full party recovery was not separately asserted.

Separate-PC installation, public connectivity, capacity, abuse resistance and
operations acceptance remain open. No replacement beta ZIP was produced and no
full-beta readiness percentage or named roadmap gate was changed.
