# TantraSrc project analysis

**Checkout:** C:\_GitHub\TantraSrc  
**Analysis date:** 2026-10-19  
**Method:** read-only inventory of the working tree, project metadata, source/configuration files, generated build logs, and staged runtime files. No source files were modified by this analysis. No new build or launch was performed.

## Executive assessment

This checkout is a mixed historical Tantra Online source archive, client deployment, setup archive, and generated HTLauncher build workspace. It is not a clean, reproducible repository yet.

The native source is organized into four Visual Studio .NET 2003 / Visual C++ 7.1 projects:

- Tantra\HTlauncher — Win32 client launcher/game client source.
- Tantra\DBSRV — database/user service.
- Tantra\SQLDAEMON — SQL/database daemon.
- Tantra\zone — zone/game server.

The checkout also contains Tantra\Database SQL scripts, Tantra\Xml data, Tantra\Web legacy web files, TantraClient deployed assets and binaries, 架设录象 setup/archive material, and build\HTLauncher generated objects, logs, binaries, and a staged runtime.

The repository currently has no commits and no .gitignore; Git reports every top-level tree as untracked. The existing files therefore represent a working archive rather than a reviewed baseline.

## Inventory

The complete working tree contains approximately 8,363 files. The main roots are:

| Root | Files | Approx. bytes | Role |
|---|---:|---:|---|
| Tantra | 553 | 55.7 MB | native source, projects, SQL/XML/web/data |
| TantraClient | 3,619 | 986.3 MB | client executable, DLLs, resource and map assets |
| build | 4,187 | 1.11 GB | generated build/staging workspace, duplicated client assets, logs |
| 架设录象 | 10 | 35.1 MB | historical setup archive, RAR/TAD/executable files |
| temp | present | not counted separately above | historical temporary material |

The largest client asset families are .tab (1,989), .tmb (1,072), .hpk (148), .TGA (69), .tfx (57), .txl (35), .tmd (32), and .BMP (24). These are deployed game resources rather than ordinary source files and should be treated as canonical runtime inputs until their provenance is established.

The native source component counts are:

| Component | Files | C++ | Headers | Other |
|---|---:|---:|---:|---:|
| HTlauncher | 242 | 102 | 123 | 17 |
| DBSRV | 47 | 13 | 21 | 13 |
| SQLDAEMON | 35 | 9 | 12 | 14 |
| zone | 140 | 58 | 62 | 20 |
| Engine | 7 | 0 | 7 | 0 |

## Project and toolchain findings

All four native solutions are Visual Studio solution format 8.00 and all four .vcproj files declare Version="7.10", identifying the VS .NET 2003 / VC7.1 project format. Every project targets Win32.

The project files retain historical environment assumptions:

- DBSRV.vcproj contains an absolute C:\Downloads\userserver\DBSRV\run output directory.
- SQLDAEMON.vcproj contains an absolute C:\Documents and Settings\Administrator\... output directory.
- ZONESRV.vcproj contains an absolute D:\MZSVR\2SVR\Zone16 output directory.
- HTLauncher.vcproj uses relative build paths under build\HTLauncher, but links against DirectX 8-era D3DX8.lib, HTUtilLib.lib, and legacy system libraries.
- The XML and much of the source use the Korean ks_c_5601-1987 encoding declaration. Editors and conversion tools must preserve the original byte encoding.

The project-owned headers and compatibility files that were previously absent from the source-facing layout are now present, including Tantra\inc\HT.h, HTDLL.h, HT3D.h, Tantra\Engine\HT3DHeaven\HTEngineObj\HTObjCamera.h, and Tantra\HTlauncher\HTUtilLib.lib. Tantra\exe is still absent.

The historical Tantra\Temp\BuildLog.htm records a failed old HTLauncher Release build caused by a non-ANSI path and PRJ0003: Error spawning '/O1'. This is historical evidence only and is not a current build result.

## Runtime and data layout

TantraClient is a deployed client tree containing:

- HTLauncher.exe, HT3DHeaven.dll, HTDirect3D.dll, HTSound.dll, mss32.dll, dbghelp.dll, and related runtime DLLs.
- system configuration and text/resource tables.
- resource\UI HPK packages and UI configuration.
- resource\map map configuration files.
- Large binary/object/texture families (.tab, .tmb, .tfx, .tmd, .tga, .hpk, and related formats).
- Version/update files such as Version.dat, UpdateList.dat, tempversion.dat, and Update.exe.

Tantra\Database contains Tantra.sql, UserLogin.sql, and billcrux_phil.sql. These scripts encode account, billing, and game database procedures and should be reviewed as deployment-sensitive material before publication or migration.

架设录象 contains archived executables, RAR/TAD files, a batch file, and a Chinese setup note. It appears to be historical installation/support material, not a source project.

The native code uses many working-directory-relative files for logs, event data, item lists, rank files, guild files, and generated binary tables. It also contains hard-coded historical drive roots such as K:\Rank%02d.txt and G:\... guild paths. These are portability blockers and indicate that server runtime directories were expected to be arranged exactly as on the original deployment machines.

## Build workspace evidence

build\HTLauncher contains a checked-in-compatible PowerShell build script, response files, compiler/linker logs, object files, PDB/map outputs, and a staged Kathana2Runtime.

The modern compatibility build artifacts are present:

- build\HTLauncher\Release\HTLauncher-modern.exe
- HTLauncher-modern.pdb
- HTLauncher-modern.map
- build\HTLauncher\Kathana2Runtime\HTLauncher.exe
- HTLauncher.client-original.exe preserved beside the staged executable

The latest compiler log shows successful code generation with warnings, including duplicate macro definitions and a TNNetworkManager.cpp sscanf format/argument mismatch warning. The linker response targets x86 and Windows GUI output. These files prove that a modern compatibility build was attempted and produced artifacts; they do not prove source-faithful VC7.1 parity or successful gameplay/runtime behavior.

The staged runtime contains Tantra_Crash.txt with repeated access-violation records in HT3DHeaven.dll during HT_hrDestory3DMgr. This is direct evidence of a crash recorded by the staged executable. The crash cause and whether the current source/build has since changed are unresolved because no fresh launch or debugger session was performed in this analysis.

## Source and maintenance risks

1. No repository baseline: there are no commits and no .gitignore. Generated binaries, duplicated assets, logs, and historical archives are all untracked.
2. Mixed evidence classes: source, deployment data, generated output, and historical setup material coexist at the same level.
3. Legacy toolchain: the native projects require VC7.1-era project handling and DirectX 8-era libraries. A modern compatibility build is a port/compatibility result, not automatically the original build.
4. Historical absolute paths: several server projects cannot use their configured output paths on a new machine without editing or overrides.
5. Runtime-directory coupling: server code assumes specific relative folders and even fixed drive letters for data/logs.
6. Encoding sensitivity: Korean-encoded project/source files can be damaged by UTF-8-only tooling.
7. Warnings and crash evidence: the modern launcher build has compiler warnings, and the staged runtime has an existing renderer teardown crash record.
8. Sensitive deployment material: SQL/account/billing scripts and setup archives should be access-controlled and excluded from public packaging until reviewed.

## Recommended next steps

1. Create a first Git baseline with a deliberate .gitignore that excludes generated objects, PDB/ILK/MAP files, duplicated staging trees, crash logs, and temporary IDE files while retaining canonical source and client data intentionally.
2. Record provenance for TantraClient, 架设录象, and build\HTLauncher\Kathana2Runtime; identify which files are canonical inputs and which are generated copies.
3. Preserve the original VC7.1 project files and create a separate modern-build manifest. Do not overwrite the legacy project to make the modern build pass.
4. Normalize server output/data roots through configuration or launch wrappers, starting with the fixed G:\, K:\, and absolute project output paths.
5. Triage the launcher warnings, especially the sscanf mismatch, before relying on the modern executable.
6. Reproduce the HT3DHeaven.dll crash under a debugger with the exact staged DLL set, then separately test initialization and teardown.
7. Keep database scripts and archived account/setup material out of public releases unless credentials, endpoints, and personal data have been reviewed.

## Verification boundary

Confirmed by static inspection: repository shape, file counts, project formats/configurations, source/runtime roots, historical build log content, current generated artifact presence, and the contents of the recorded crash log.

Not established here: a fresh VC7.1 build, a fresh modern build, server startup, client login, renderer stability, database execution, network compatibility, asset completeness, or gameplay correctness.
