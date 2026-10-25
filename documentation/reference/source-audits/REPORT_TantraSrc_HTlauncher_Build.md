# Tantra source and HTLauncher build report

## Scope and evidence

This report covers the checkout at `C:\_GitHub\TantraSrc`, with emphasis on `Tantra\HTlauncher`. It is based on the files present in the checkout and the project metadata. No compilation or runtime launch was performed during this analysis.

The checkout contains 534 files under `Tantra`, including 180 `.cpp`, 218 `.h`, four Visual Studio solutions, four `.vcproj` projects, static libraries, DLLs, web/database files, and one historical build log. The main native components are `HTlauncher`, `DBSRV`, `SQLDAEMON`, and `zone`.

## Visual Studio version and target

`Tantra\HTlauncher\HTLauncher.sln` is a Visual Studio solution format 8.00. `Tantra\HTlauncher\HTLauncher.vcproj` declares `Version="7.10"` (`HTLauncher.vcproj:4`). This is the Visual C++ 7.1 project format shipped with **Microsoft Visual Studio .NET 2003**. The same project format is used by the other native projects in this checkout.

The project is a native **Win32 x86** GUI executable:

- Platform: `Win32`; linker option `/MACHINE:I386` (`HTLauncher.vcproj:51`, `125`, `193`).
- Subsystem: Windows GUI (`SubSystem="2"`).
- MFC: disabled (`UseOfMFC="0"`).
- Character set: Unicode (`CharacterSet="2"`).
- Precompiled header: `stdafx.h`.
- Compiler style: legacy VC7.1 project tools (`VCCLCompilerTool`, `VCLinkerTool`, `VCResourceCompilerTool`).
- Project XML declares Korean encoding `ks_c_5601-1987`, so preserve the source encoding when opening or converting the project.

The source is an older Win32/DirectX client. `StdAfx.h` includes the missing engine ABI headers `HT.h`, `HTDLL.h`, and `HT3D.h` (`StdAfx.h:19-23`). `HTEngineHandler.cpp` loads `HT3DHeaven.dll` at runtime and resolves `HT_pCreate3DMgr` and `HT_hrDestory3DMgr` (`HTEngineHandler.cpp:307-317`). `HTLauncher.cpp` is the GUI entry point and initializes the network manager, locale, window manager, game loop, and finalization (`HTLauncher.cpp:37-176`).

## Configurations

`HTLauncher.sln` exposes three Win32 configurations:

- **Release**: optimized build, static release CRT (`RuntimeLibrary="0"`), output `..\..\Temp\Release\HTLauncher.exe`, libraries from `..\..\lib\release`.
- **Debug**: unoptimized build, debug CRT (`RuntimeLibrary="1"`), output under `..\..\Temp\Debug`, libraries from `..\..\lib\debug`.
- **Remote Debug**: debug CRT and extra network libraries; post-build commands copy files to `\\baccus\tenma`. This configuration depends on the historical network build tree and is unlikely to be usable without that environment.

The Release link inputs are `Ws2_32.lib`, `imm32.lib`, `D3DX8.lib`, `HTUtilLib.lib`, `winmm.lib`, `odbc32.lib`, `odbccp32.lib`, `vfw32.lib`, `strmiids.lib`, and `wininet.lib` (`HTLauncher.vcproj:52`). Debug uses the same family except `vfw32.lib`; Remote Debug additionally names `HSCommonD.lib` and `TNClientNetworkD.lib` (`HTLauncher.vcproj:126`, `194`).

The project has a post-build copy to `..\..\exe` for Release and Debug (`HTLauncher.vcproj:72-76`, `142-145`). The configured Release `OutputDirectory` is the historical absolute path `D:\game\realgf` (`HTLauncher.vcproj:18`), although the linker output is explicitly under `Temp\Release`.

## Why this checkout cannot compile directly

The project file itself is internally parseable and every path listed in its `<File>` entries exists. However, the source checkout is incomplete for the project’s include and link dependencies:

- `Tantra\inc\HT.h`, `HTDLL.h`, and `HT3D.h` are absent.
- The canonical `Tantra\Engine\HTUtilLib` utility headers are now restored from the matching package interface set.
- `Tantra\HT3DHeaven\HTEngineObj\HTObjCamera.h` is absent.
- The source-local `Tantra\HTlauncher\HTUtilLib.lib` is present and recorded as the legacy VC7.0 ABI input.
- The checkout has no `Tantra\exe` directory for the post-build copy.
- The project expects DirectX 8 SDK headers/libraries, especially `D3DX8.lib`, which are not supplied here.

There are also 16 `.cpp` files physically present in `Tantra\HTlauncher` but not listed in `HTLauncher.vcproj`: `HT2DObject.cpp`, `HTBelt.cpp`, `HTCutScene.cpp`, `HTInformationWin.cpp`, `HTMainCharAttack.cpp`, `HTMonster.cpp`, `HTMonsterSystem.cpp`, `HTMoveMonster.cpp`, `HTNPCMonsterSystem.cpp`, `HTOtherCharacter.cpp`, `HTOtherCharacterMove.cpp`, `HTOtherCharacterSystem.cpp`, `HTParamMgr.cpp`, `HTSound.cpp`, and `TNNetworkQueue.cpp`. The original project may intentionally exclude some of these, but they should be reviewed before treating a successful project build as a complete source build.

The historical `Tantra\Temp\BuildLog.htm` records a failed Release build caused by a non-ANSI path and then `PRJ0003: Error spawning '/O1'`. This is evidence of an old VS build environment, not a current build result. Use an ASCII-only checkout path and a real VC7.1 installation when reproducing it.

## Required build environment

The source-faithful environment is:

1. Windows on x86-compatible tooling.
2. Microsoft Visual Studio .NET 2003 with Visual C++ installed, including the VC7.1 compiler, linker, resource compiler, and Win32 headers/libraries.
3. The matching DirectX 8 SDK (`D3DX8.lib` and headers).
4. The missing project-owned roots restored at the relative locations expected by the project: `inc`, `Engine`, `HT3DHeaven`, and `lib`.
5. The matching `HTUtilLib.lib`; for a runtime launch, the compatible `HT3DHeaven.dll` and its renderer dependencies, including the project’s `HTDirect3D.dll`/sound assets where applicable.
6. A code page/locale setup that can read the Korean-encoded project and source files. Keep the checkout at an ASCII path, for example `C:\TantraSrc`, to avoid the Unicode-to-ANSI project-manager failure seen in the historical log.

Newer Visual Studio versions do not natively guarantee compatibility with this `.vcproj` format or the old DirectX 8/VC7.1 ABI. Conversion is possible, but it becomes a porting effort and should be recorded separately from the original build procedure.

## Compilation procedure once dependencies are restored

From a **Visual Studio .NET 2003 Command Prompt**:

```bat
cd /d C:\TantraSrc\Tantra\HTlauncher
devenv.com HTLauncher.sln /rebuild "Release|Win32"
```

For a debug build:

```bat
devenv.com HTLauncher.sln /rebuild "Debug|Win32"
```

The expected primary artifacts are:

- Release: `build\HTLauncher\Release\HTLauncher.exe` and the corresponding object/PDB files under `build\HTLauncher\obj\Release`.
- Debug: `build\HTLauncher\Debug\HTLauncher.exe` and the corresponding object/PDB files under `build\HTLauncher\obj\Debug`.
- The post-build event copies the selected executable into `build\HTLauncher\Kathana2Runtime`.

If the IDE cannot open the solution, use the VC7.1 command-line tools directly only after restoring the exact include/library roots and project source list; the project’s response files and precompiled-header settings are generated by the old project system.

## Recommended restoration order

1. Recover the matching `inc`, `Engine`, `HT3DHeaven`, and `lib` trees from the same source release as this `HTlauncher` directory.
2. Confirm the ABI-compatible `HT3DHeaven.dll`, `HTDirect3D.dll`, and `HTUtilLib.lib` versions; the launcher loads the engine DLL dynamically, so a mismatched DLL can compile successfully and still fail during initialization.
3. Build the existing project as Release|Win32 from an ASCII path with VS .NET 2003.
4. The 16 previously unlisted launcher `.cpp` files are now included in the project because they are physical source files in this checkout; confirm their intended release membership during the VC7.1 build.
5. Treat runtime launch as a separate gate. The executable expects the deployed `system`, `resource`, map/object, UI, sound, and engine DLL files at runtime; this checkout does not contain a complete client deployment tree.

## Conclusion

The source identifies Visual Studio .NET 2003 / Visual C++ 7.1, Win32 x86, Unicode, and DirectX 8-era native dependencies. A faithful build requires reconstructing the missing engine headers/libraries/DLLs and using the original VC7.1 toolchain. The current checkout now has a restored source-side dependency layout and a staged client runtime, but compilation remains gated by the absent VC7.1 toolchain and legacy DirectX 8 SDK.

## Comparison with `B:\Tantra-Files\Kathana2\HTLauncher.exe`

The supplied executable was present and was inspected as a PE file. Its SHA-256 is `a82bf1b07c8f2834375dfc6429b90a3022a811cb134b2fe338c79d1884bc40d3`, and its size is 1,171,456 bytes. The file’s PE timestamp is `2004-12-02 02:00:00 UTC`; the filesystem creation date is 2026 because it appears to have been copied into the B: location, so the PE timestamp is the useful build-era clue.

### Binary facts

- Machine: `0x014c` (`IMAGE_FILE_MACHINE_I386`), confirming 32-bit x86.
- Subsystem: Windows GUI.
- Image base: `0x10000000`, matching the project’s configured linker base address.
- PE section layout: `.text`, `.rdata`, `.data`, `.data1`, `.rsrc`.
- PE linker version fields: `7.0`.
- No PE debug directory was present, so the executable does not carry an embedded CodeView/PDB pointer that can identify the exact compiler invocation.
- Version resource: file version **2.1.0.8**, product version **1.0.0.1**; company `Hanbitsoft corp.`; product `Tantra Client`; internal name `HTLaunch`; original filename `HTLaunch.exe`; Korean translation `0x0412/0x04B0`.
- Imported DLLs: `WS2_32.dll`, `IMM32.dll`, `WINMM.dll`, `WININET.dll`, `KERNEL32.dll`, `USER32.dll`, `GDI32.dll`, `ADVAPI32.dll`, `ole32.dll`, `OLEAUT32.dll`, `VERSION.dll`, and `BugslayerUtil.dll`.

### Comparison to the checked-in source

| Evidence | Checked-in HTLauncher project | Kathana2 executable | Assessment |
|---|---|---|---|
| Target | Win32 / `/MACHINE:I386` | I386 PE | Matches |
| GUI subsystem | `SubSystem="2"` | Windows GUI | Matches |
| Image base | `0x10000000` | `0x10000000` | Matches |
| Resource file version | `3.2.0.0` in `resource.rc:84`, `102` | `2.1.0.8` | Does not match this source revision |
| Product version | `1.0.0.1` | `1.0.0.1` | Matches |
| Internal/original name | `HTLaunch` / `HTLaunch.exe` | Same | Matches |
| Toolchain metadata | `.vcproj` `Version="7.10"`, VS .NET 2003 / VC7.1 | PE linker field `7.0` | Suggests an older VC7.0-era build, or a different build branch; not proof by itself |
| Runtime crash handler | `#pragma comment(lib, "UnhandledException/BugslayerUtil.lib")` and bundled DLL | Imports `BugslayerUtil.dll` | Strong match |
| Dynamic engine | Source loads `HT3DHeaven.dll` and resolves `HT_pCreate3DMgr` / `HT_hrDestory3DMgr` | Those strings are embedded in the executable | Strong match |
| Network/locale/version checks | Present in `HTLauncher.cpp` | Imports Winsock, WinInet, Version API and contains matching engine/client strings | Consistent with this code family |

The binary therefore belongs to the same HTLauncher/Tantra client family and shares the project’s x86, GUI, image-base, version-resource schema, Bugslayer integration, and dynamic-engine boundary. The differing file version is decisive evidence that it was built from an older or different source revision than the checked-in `resource.rc`; the binary cannot be treated as a byte-for-byte output of this checkout.

The import table does not contain `D3DX8.dll`, `HT3DHeaven.dll`, or `HTUtilLib.dll`. This is not a contradiction: the project links some libraries statically, and the engine DLL is loaded with `LoadLibraryA`, so it is expected to be absent from the normal import table. Runtime dependency resolution still requires the matching `HT3DHeaven.dll` and its own dependencies beside the executable.

### Practical conclusion

`B:\Tantra-Files\Kathana2\HTLauncher.exe` is useful as a reference binary for the older Kathana2 client generation. It supports the source analysis and confirms the expected 32-bit Windows architecture and engine interface, but it does not prove that the present `HTLauncher.vcproj` can recreate it. To reproduce this exact binary, the matching older source/resource revision and its VC7.0-era dependency set would be needed. To build the checked-in project, use the VS .NET 2003 / VC7.1 procedure already documented above and expect the source’s `3.2.0.0` version resource unless the resource file is intentionally changed.

## Standalone launch of the Kathana2 executable

Yes. The launcher does not verify that its parent process is actually `Tantra.exe`. In `HTLauncher.cpp:82-95`, it parses two whitespace-separated command-line fields:

```text
<nonzero connection flag> <launcher file version>
```

It rejects a missing/zero first field with `You must the game with Tantra.exe.` and rejects a second field that does not exactly match the executable’s own file version. The source hard-sets `g_bDevelopingMode = HT_FALSE`, so the commented development switch does not bypass these checks in this binary family.

For the supplied Kathana2 executable, the embedded file version is `2.1.0.8`. Launch it with the Kathana2 directory as the current working directory:

```powershell
Start-Process `
  -FilePath 'B:\Tantra-Files\Kathana2\HTLauncher.exe' `
  -WorkingDirectory 'B:\Tantra-Files\Kathana2' `
  -ArgumentList @('1', '2.1.0.8')
```

Equivalent `cmd.exe` form:

```bat
cd /d B:\Tantra-Files\Kathana2
HTLauncher.exe 1 2.1.0.8
```

The first value is only tested with `atoi()` for nonzero in the launcher code; `1` is therefore sufficient for this gate. Supplying both arguments is important because the code uses fixed local buffers and does not safely handle a missing second field.

The working directory matters because the launcher uses relative paths for `HTLauncher.exe` version lookup, `system\HTStartup.cfg`, `resource\...`, and the dynamically loaded `HT3DHeaven.dll`. The Kathana2 folder currently contains `HT3DHeaven.dll`, `HTDirect3D.dll`, `HTSound.dll`, `BugslayerUtil.dll`, `resource\`, and `system\HTStartup.cfg`, which satisfies the first-level files observed by this static check. A direct launch may still stop later if the server list, client data, account/server services, or other runtime resources are unavailable.

## ReFS dialog observed during standalone launch

The reported dialog, `This version of Windows doesn't support the ReFS format on drive A:`, is a Windows filesystem/volume error rather than one of the launcher’s own message boxes. The inspected runtime path is `B:\Tantra-Files\Kathana2`; that directory is readable and contains the launcher, engine DLLs, resources, and `system\HTStartup.cfg`. Local volume inspection reports both `A:` and `B:` as ReFS, while the dialog names only `A:`.

This means the first troubleshooting target is a shortcut, current-directory setting, configuration, or another process that is touching `A:`. The launcher’s own relative paths should resolve under `B:\Tantra-Files\Kathana2` when launched with that working directory. Use an explicit `cmd.exe` launch from B: rather than a shortcut:

```bat
cmd /d /c "cd /d B:\Tantra-Files\Kathana2 && HTLauncher.exe 1 2.1.0.8"
```

If the same dialog still appears, inspect the shortcut’s **Start in** field and any launcher/update configuration for `A:` references. The executable and `HT3DHeaven.dll` do not expose a readable hard-coded `A:\...` path in the static scan, so the dialog alone does not establish that HTLauncher requested A:. The exact message is also seen when a Windows build cannot use a particular ReFS volume or ReFS volume version; Microsoft-related troubleshooting reports associate it with ReFS volumes becoming inaccessible on some Insider builds. Preserve the data on A: and do not reformat it while diagnosing the issue.

## Implementation status (2026-10-19)

The approved current-source plus client-DLL implementation is applied in this checkout. The launcher dependency layout is restored under Tantra/inc, Tantra/Engine/HTUtilLib, and Tantra/Engine/HT3DHeaven/HTEngineObj. The utility and compatibility headers use the complete interface set from HTLauncher_x64_buildable; HT.h remains based on the checked-in Tantra/zone header. The x64 renderer binaries were not used.

The original VC7.1 project keeps its 86 intended launcher translation units. The 15 detached legacy files remain outside the project because they are explicitly excluded by the matching package project and require incompatible missing UI/combat surfaces. The project writes Release and Debug output beneath build/HTLauncher and stages to build/HTLauncher/Kathana2Runtime.

build/HTLauncher/Kathana2Runtime contains 3,619 files copied from TantraClient. The original client runtime is unchanged; the original executable is preserved as HTLauncher.client-original.exe.

Validation completed: the .vcproj parses as valid XML; the 86 project source entries compile cleanly with the VS2019 x86 compiler; resource.rc compiles; HT3DHeaven.dll exports HT_pCreate3DMgr and HT_hrDestory3DMgr; and the selected staged DLL hash remains B818B89EDBC9F8E49BB1B79200371740EAA157DABAC23BBF1E2D52E40FF99941.

## Verified VS2019 Win32 compatibility build

Run build/HTLauncher/build-modern-x86.ps1 to reproduce the compatibility build. It compiles the 86 launcher translation units plus HT_x86_runtime.cpp, compiles resource.rc, and links successfully with VS2019 16.11 x86 tools. The resulting artifact is build/HTLauncher/Release/HTLauncher-modern.exe, and the staged executable is build/HTLauncher/Kathana2Runtime/HTLauncher.exe.

The rebuilt executable is PE32 x86 with image base 0x10000000, file version 3.2.0.0, and SHA-256 BCBAD4107EC9DFDB5415D7A17F2E391D3E56FD11348DF1E879FF77FD3A26DC70. It contains the HT3DHeaven.dll, HT_pCreate3DMgr, and HT_hrDestory3DMgr runtime contract strings.

The direct link attempt with the checked-in HTUtilLib.lib was retained as evidence and failed at the old STL/CRT ABI boundary. The compatibility executable therefore is not claimed as a byte-for-byte VC7.1 output; it preserves the source launcher and dynamic renderer DLL boundary while replacing the utility implementation layer with the recovered package runtime source.

The exact VC7.1 build remains unverified because Visual Studio .NET 2003 is not installed. The modern compatibility build is the verified runnable artifact for this checkout. A staged standalone smoke launch with arguments 1 3.2.0.0 started successfully and remained running for three seconds; it was then terminated by the test harness, so full login/server runtime behavior remains unverified.

The VS2019 legacy-solution probe remains recorded in build/HTLauncher/vs2019-probe.log; it exited before compilation because the old solution requires migration.


