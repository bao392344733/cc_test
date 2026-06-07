Attribute VB_Name = "bend_batch_dxf"
Option Explicit

'===========================================================================
' bend_batch_dxf.bas — SolidWorks 钣金批量展开 DXF 导出宏
' 用途   : 车间批量下料，按工艺规范自动配置折弯参数并导出展开图
' 兼容   : SolidWorks 2018 及以上
' 用法   : 在 SolidWorks 中运行 Sub main() 即可
'===========================================================================

'===========================================================================
' 1. 工艺参数常量区
'===========================================================================

' --- 直角折弯 (90°) 固定折弯扣除 BD 表 (mm) ---
' 板厚     1.0   1.2   1.5   2.0   2.5   3.0   5.0
' 扣除     1.7   2.0   2.5   3.3   4.3   5.0   8.5

' --- K 因子区间定义 (连续覆盖，无判定空白) ---
Private Const K_FACTOR_T1_MIN  As Double = 1#
Private Const K_FACTOR_T1_MAX  As Double = 1.5
Private Const K_FACTOR_VAL_1   As Double = 0.25

Private Const K_FACTOR_T2_MAX  As Double = 3#
Private Const K_FACTOR_VAL_2   As Double = 0.23

Private Const K_FACTOR_T3_MAX  As Double = 5#
Private Const K_FACTOR_VAL_3   As Double = 0.23   ' 同区间2

' --- 圆弧折弯 BA 公式: BA = 0.5 × π × (R_inner + 0.5T) ---
' --- 压死边 BA 公式  : BA = 1.5 × T ---

' --- 非法文件名字符 (Windows) ---
Private Const ILLEGAL_CHARS As String = "\/:*?""<>|"

'===========================================================================
' 2. API 声明 — 文件夹浏览对话框
'===========================================================================

#If VBA7 Then
    Private Declare PtrSafe Function SHGetPathFromIDList Lib "shell32.dll" Alias _
        "SHGetPathFromIDListA" (ByVal pidl As LongPtr, ByVal pszPath As String) As Boolean
    Private Declare PtrSafe Function SHBrowseForFolder Lib "shell32.dll" Alias _
        "SHBrowseForFolderA" (lpBrowseInfo As BROWSEINFO) As LongPtr
#Else
    Private Declare Function SHGetPathFromIDList Lib "shell32.dll" Alias _
        "SHGetPathFromIDListA" (ByVal pidl As Long, ByVal pszPath As String) As Boolean
    Private Declare Function SHBrowseForFolder Lib "shell32.dll" Alias _
        "SHBrowseForFolderA" (lpBrowseInfo As BROWSEINFO) As Long
#End If

#If VBA7 Then
    Private Type BROWSEINFO
        hOwner         As LongPtr
        pidlRoot       As LongPtr
        pszDisplayName As String
        lpszTitle      As String
        ulFlags        As Long
        lpfn           As LongPtr
        lParam         As LongPtr
        iImage         As Long
    End Type
#Else
    Private Type BROWSEINFO
        hOwner         As Long
        pidlRoot       As Long
        pszDisplayName As String
        lpszTitle      As String
        ulFlags        As Long
        lpfn           As Long
        lParam         As Long
        iImage         As Long
    End Type
#End If

'===========================================================================
' 3. SolidWorks API 枚举常量 (防止部分版本未自动引用类型库)
'===========================================================================

' Flat pattern export
Private Const swExportFlatPatternFaceOnly     As Long = 0
Private Const swExportFlatPatternView         As Long = 1
Private Const swExportToDWG_ExportSheetMetal  As Long = 2

' Feature suppression
Private Const swUnSuppressFeature             As Long = 2
Private Const swSuppressFeature               As Long = 0
Private Const swThisConfiguration             As Long = 1

' Bend allowance type
Private Const swBendAllowanceTypeBENDDEDUCTION As Long = 2
Private Const swBendAllowanceTypeKFACTOR       As Long = 1

' Save options
Private Const swSaveAsOptions_Silent          As Long = &H1
Private Const swSaveAsOptions_Copy            As Long = &H2

' Document types
Private Const swDocPART                       As Long = 1
Private Const swDocASSEMBLY                   As Long = 2

' Open options
Private Const swOpenDocOptions_Silent         As Long = &H1
Private Const swOpenDocOptions_ReadOnly       As Long = &H2

'===========================================================================
' 4. 全局状态变量
'===========================================================================

Private swApp          As Object  ' SldWorks.SldWorks
Private bSilentMode    As Boolean
Private SuccessCount   As Long
Private SkipCount      As Long
Private FailCount      As Long
Private StartTime      As Double

'===========================================================================
' 5. 主入口 — Sub main()
'===========================================================================

Public Sub main()

    ' --- 初始化 SolidWorks 应用对象 ---
    On Error Resume Next
    Set swApp = Application.SldWorks
    If swApp Is Nothing Then
        Set swApp = GetObject(, "SldWorks.Application")
    End If
    On Error GoTo 0

    If swApp Is Nothing Then
        MsgBox "无法连接到 SolidWorks，请确保 SolidWorks 已启动。", vbCritical, "错误"
        Exit Sub
    End If

    ' --- 选择运行模式 ---
    Dim mode As Long
    mode = ShowModeSelection()
    If mode = 0 Then Exit Sub  ' 用户取消

    ' --- 初始化计数器 ---
    SuccessCount = 0
    SkipCount = 0
    FailCount = 0
    StartTime = Timer

    ' --- 开启静默模式 ---
    EnableSilentMode

    ' --- 执行所选模式 ---
    Select Case mode
        Case 1
            ProcessCurrentDocument
        Case 2
            ProcessFolderMode
        Case 3
            ProcessAssemblyMode
    End Select

    ' --- 恢复 SolidWorks 默认设置 ---
    DisableSilentMode

    ' --- 汇总报告 ---
    ShowSummaryReport mode

End Sub

'===========================================================================
' 6. 模式选择对话框
'===========================================================================

Private Function ShowModeSelection() As Long
    Dim prompt As String
    prompt = "请选择批量下料处理模式:" & vbCrLf & vbCrLf & _
             "  [1]  当前文档 — 处理当前激活的钣金件" & vbCrLf & _
             "  [2]  文件夹批量 — 遍历指定文件夹中所有 .SLDPRT" & vbCrLf & _
             "  [3]  装配体批量 — 遍历当前装配体中所有钣金件" & vbCrLf & vbCrLf & _
             "输入 1 / 2 / 3 (按取消退出):"

    Dim result As String
    result = InputBox(prompt, "钣金批量下料 — 模式选择", "2")

    If StrPtr(result) = 0 Then
        ShowModeSelection = 0
        Exit Function
    End If

    Select Case Trim(result)
        Case "1": ShowModeSelection = 1
        Case "2": ShowModeSelection = 2
        Case "3": ShowModeSelection = 3
        Case Else
            MsgBox "输入无效，请输入 1、2 或 3。", vbExclamation, "提示"
            ShowModeSelection = ShowModeSelection()
    End Select
End Function

'===========================================================================
' 7. 文件夹浏览对话框
'===========================================================================

Private Function BrowseForFolder(Optional title As String = "请选择包含 .SLDPRT 文件的文件夹") As String
    Dim bi As BROWSEINFO

    #If VBA7 Then
        Dim nullPtr As LongPtr
        nullPtr = 0
        bi.hOwner = nullPtr
        bi.pidlRoot = nullPtr
    #Else
        bi.hOwner = 0
        bi.pidlRoot = 0
    #End If

    bi.lpszTitle = title
    bi.ulFlags = &H1  ' BIF_RETURNONLYFSDIRS

    #If VBA7 Then
        Dim pidl As LongPtr
        pidl = SHBrowseForFolder(bi)
    #Else
        Dim pidl As Long
        pidl = SHBrowseForFolder(bi)
    #End If

    If pidl = 0 Then
        BrowseForFolder = ""
        Exit Function
    End If

    Dim path As String
    path = String(260, vbNullChar)
    If SHGetPathFromIDList(pidl, path) Then
        Dim retPath As String
        retPath = Left(path, InStr(path, vbNullChar) - 1)
        If Right(retPath, 1) <> "\" Then retPath = retPath & "\"
        BrowseForFolder = retPath
    Else
        BrowseForFolder = ""
    End If
End Function

'===========================================================================
' 8. 静默模式 — 关闭 SolidWorks 所有弹窗
'===========================================================================

Private Sub EnableSilentMode()
    If bSilentMode Then Exit Sub
    bSilentMode = True

    On Error Resume Next

    ' 设置命令进行中状态 (禁用大部分弹窗)
    swApp.CommandInProgress = True

    ' 禁止"是否保存"等用户提示
    swApp.SetUserPreferenceToggle swUserPreferenceToggle_e, swDontPrompt, True

    ' 禁止自动保存提醒
    swApp.SetUserPreferenceToggle swUserPreferenceToggle_e, swBackupAutoRecoverDontPrompt, True

    On Error GoTo 0
End Sub

Private Sub DisableSilentMode()
    If Not bSilentMode Then Exit Sub
    bSilentMode = False

    On Error Resume Next

    swApp.CommandInProgress = False
    swApp.SetUserPreferenceToggle swUserPreferenceToggle_e, swDontPrompt, False

    On Error GoTo 0
End Sub

Private Const swUserPreferenceToggle_e As Long = 4

'===========================================================================
' 9. 批量处理 — 当前文档模式
'===========================================================================

Private Sub ProcessCurrentDocument()
    Dim swModel As Object
    Set swModel = swApp.ActiveDoc

    If swModel Is Nothing Then
        MsgBox "没有打开的文档。", vbExclamation, "提示"
        Exit Sub
    End If

    If swModel.GetType <> swDocPART Then
        MsgBox "当前文档不是零件文件，请打开一个钣金零件。", vbExclamation, "提示"
        Exit Sub
    End If

    Dim swPart As Object
    Set swPart = swModel

    Dim docPath As String
    docPath = swPart.GetPathName

    If Len(docPath) = 0 Then
        MsgBox "当前零件尚未保存，请先保存文件。", vbExclamation, "提示"
        Exit Sub
    End If

    swApp.SetStatusBarText "正在处理: " & GetFileName(docPath)

    If ProcessSinglePart(swPart, docPath) Then
        SuccessCount = 1
    Else
        FailCount = 1
    End If

    swApp.SetStatusBarText "批量下料完成"
End Sub

'===========================================================================
' 10. 批量处理 — 文件夹模式
'===========================================================================

Private Sub ProcessFolderMode()
    Dim folderPath As String
    folderPath = BrowseForFolder("请选择包含钣金 .SLDPRT 文件的文件夹")

    If Len(folderPath) = 0 Then
        MsgBox "未选择文件夹，操作取消。", vbInformation, "取消"
        Exit Sub
    End If

    ' 收集所有 .SLDPRT 文件
    Dim fileName As String
    fileName = Dir(folderPath & "*.SLDPRT", vbNormal)

    If Len(fileName) = 0 Then
        MsgBox "在 """ & folderPath & """ 中未找到 .SLDPRT 文件。", vbExclamation, "无文件"
        Exit Sub
    End If

    Dim fileList As New Collection
    Do While Len(fileName) > 0
        fileList.Add folderPath & fileName
        fileName = Dir
    Loop

    MsgBox "找到 " & fileList.Count & " 个 .SLDPRT 文件，开始批量处理。" & vbCrLf & _
           "处理过程中请勿操作 SolidWorks。", vbInformation, "开始批量下料"

    ProcessFileList fileList
End Sub

'===========================================================================
' 11. 批量处理 — 装配体模式
'===========================================================================

Private Sub ProcessAssemblyMode()
    Dim swModel As Object
    Set swModel = swApp.ActiveDoc

    If swModel Is Nothing Then
        MsgBox "没有打开的文档。", vbExclamation, "提示"
        Exit Sub
    End If

    If swModel.GetType <> swDocASSEMBLY Then
        MsgBox "当前文档不是装配体，请打开一个装配体文件。", vbExclamation, "提示"
        Exit Sub
    End If

    MsgBox "开始遍历装配体中的所有钣金零件..." & vbCrLf & _
           "处理过程中请勿操作 SolidWorks。", vbInformation, "开始批量下料"

    Dim swAssy As Object
    Set swAssy = swModel

    ' 收集所有钣金零件路径 (递归遍历)
    Dim partPaths As New Collection
    Dim visited As New Collection  ' 去重用

    TraverseAssemblyComponents swAssy, partPaths, visited

    If partPaths.Count = 0 Then
        MsgBox "装配体中未找到任何钣金零件。", vbExclamation, "无钣金件"
        Exit Sub
    End If

    Dim response As Long
    response = MsgBox("找到 " & partPaths.Count & " 个钣金零件，开始批量处理？", _
                      vbYesNo + vbQuestion, "确认")
    If response <> vbYes Then
        MsgBox "操作已取消。", vbInformation, "取消"
        Exit Sub
    End If

    ProcessFileList partPaths
End Sub

'===========================================================================
' 12. 递归遍历装配体组件树
'     跳过: 虚拟件、压缩态/轻化态、非钣金件
'===========================================================================

Private Sub TraverseAssemblyComponents(ByRef swAssy As Object, _
                                        ByRef pathList As Collection, _
                                        ByRef visited As Collection)
    On Error GoTo ErrHandler

    Dim vComponents As Variant
    vComponents = swAssy.GetComponents(False)  ' False = 仅顶层

    If IsEmpty(vComponents) Then Exit Sub

    Dim i As Long
    For i = 0 To UBound(vComponents)
        Dim swComp As Object
        Set swComp = vComponents(i)

        If swComp Is Nothing Then GoTo NextComp

        ' --- 过滤 1: 跳过压缩态组件 ---
        If swComp.IsSuppressed Then GoTo NextComp

        ' --- 过滤 2: 跳过虚拟件 (无独立文件路径) ---
        Dim compPath As String
        compPath = swComp.GetPathName
        If Len(compPath) = 0 Then
            ' 虚拟装配体 → 尝试递归遍历
            ' 虚拟零件 → 跳过
            GoTo NextComp
        End If

        ' --- 获取组件文档以判断类型 ---
        Dim compModel As Object
        Set compModel = Nothing
        On Error Resume Next
        Set compModel = swComp.GetModelDoc2
        On Error GoTo ErrHandler

        Dim docType As Long
        If compModel Is Nothing Then
            docType = GuessDocType(compPath)
        Else
            docType = compModel.GetType
        End If

        ' --- 递归进入子装配体 ---
        If docType = swDocASSEMBLY Then
            Dim subAssy As Object
            If Not compModel Is Nothing Then
                Set subAssy = compModel
            Else
                On Error Resume Next
                Set subAssy = swApp.OpenDoc6(compPath, swDocASSEMBLY, _
                    swOpenDocOptions_Silent, "", 0, 0)
                On Error GoTo ErrHandler
            End If

            If Not subAssy Is Nothing Then
                TraverseAssemblyComponents subAssy, pathList, visited
            End If

        ' --- 钣金零件 → 加入列表 ---
        ElseIf docType = swDocPART Then
            Dim isSheetMetal As Boolean
            isSheetMetal = False

            If Not compModel Is Nothing Then
                isSheetMetal = IsSheetMetalPart(compModel)
            Else
                Dim tmpPart As Object
                On Error Resume Next
                Set tmpPart = swApp.OpenDoc6(compPath, swDocPART, _
                    swOpenDocOptions_Silent, "", 0, 0)
                On Error GoTo ErrHandler

                If Not tmpPart Is Nothing Then
                    isSheetMetal = IsSheetMetalPart(tmpPart)
                    On Error Resume Next
                    swApp.CloseDoc tmpPart.GetPathName
                    On Error GoTo ErrHandler
                End If
            End If

            ' --- 去重添加 ---
            If isSheetMetal Then
                Dim key As String
                key = UCase(compPath)
                On Error Resume Next
                visited.Add key, key
                If Err.Number = 0 Then
                    pathList.Add compPath
                End If
                On Error GoTo ErrHandler
            End If
        End If

NextComp:
    Next i

    Exit Sub

ErrHandler:
    Debug.Print "TraverseAssemblyComponents 错误: " & Err.Description & _
                " (组件索引: " & i & ")"
    Resume NextComp
End Sub

'===========================================================================
' 13. 批量处理文件列表
'===========================================================================

Private Sub ProcessFileList(ByRef fileList As Collection)
    Dim total As Long
    total = fileList.Count

    Dim i As Long
    Dim filePath As String
    Dim swPart As Object

    For i = 1 To total
        filePath = fileList(i)

        ' 更新状态栏
        swApp.SetStatusBarText "[" & i & "/" & total & "] 处理中: " & GetFileName(filePath)
        DoEvents

        ' 打开零件 (静默模式)
        On Error Resume Next
        Set swPart = swApp.OpenDoc6(filePath, swDocPART, swOpenDocOptions_Silent, "", 0, 0)
        On Error GoTo 0

        If swPart Is Nothing Then
            LogPrint "✗ 无法打开: " & GetFileName(filePath)
            FailCount = FailCount + 1
            GoTo NextFile
        End If

        ' 检查是否为钣金件
        If Not IsSheetMetalPart(swPart) Then
            LogPrint "⊘ 非钣金件,跳过: " & GetFileName(filePath)
            On Error Resume Next
            swApp.CloseDoc filePath
            On Error GoTo 0
            SkipCount = SkipCount + 1
            GoTo NextFile
        End If

        ' 处理并导出
        If ProcessSinglePart(swPart, filePath) Then
            SuccessCount = SuccessCount + 1
        Else
            FailCount = FailCount + 1
        End If

        ' 关闭零件 (不保存 — 折弯参数改动仅用于本次展开计算)
        On Error Resume Next
        swApp.CloseDoc filePath
        On Error GoTo 0

NextFile:
        Set swPart = Nothing
    Next i

End Sub

'===========================================================================
' 14. 核心处理 — 单个钣金零件: 配置折弯参数 + 导出 DXF
'===========================================================================

Private Function ProcessSinglePart(ByRef swPart As Object, _
                                    ByVal filePath As String) As Boolean
    On Error GoTo ErrHandler

    ProcessSinglePart = False

    ' --- Step 1: 读取板厚 ---
    Dim thickness As Double
    thickness = GetSheetMetalThickness(swPart)

    If thickness <= 0 Then
        LogPrint "✗ 无法读取板厚: " & GetFileName(filePath)
        Exit Function
    End If

    ' --- Step 2: 读取材料 ---
    Dim materialName As String
    materialName = GetMaterialName(swPart)

    ' --- Step 3: 查表获取直角折弯扣除 (BD) ---
    Dim bd As Double
    If Not GetBendDeduction(thickness, bd) Then
        LogPrint "✗ 未定义此板厚 (" & Format(thickness, "0.0") & "mm) 的折弯扣除: " & _
                 GetFileName(filePath)
        Exit Function
    End If

    ' --- Step 4: 自动写入折弯扣除到模型 ---
    If Not SetBendDeductionToPart(swPart, bd) Then
        LogPrint "⚠ 设置折弯扣除失败,继续导出: " & GetFileName(filePath)
        ' 不阻断流程 — 可能模型已有正确参数
    End If

    ' --- Step 5: 确保展开图存在并解除压缩 ---
    If Not EnsureFlatPattern(swPart) Then
        LogPrint "✗ 无法生成展开图: " & GetFileName(filePath)
        Exit Function
    End If

    ' --- Step 6: 重建模型 ---
    swPart.EditRebuild3

    ' --- Step 7: 生成 DXF 导出路径 ---
    Dim dxfPath As String
    dxfPath = BuildDxfFilePath(filePath, thickness, materialName)

    ' --- Step 8: 导出 DXF ---
    If Not ExportFlatPatternToDxf(swPart, dxfPath) Then
        LogPrint "✗ DXF 导出失败: " & GetFileName(filePath)
        Exit Function
    End If

    LogPrint "✓ " & GetFileName(filePath) & " → " & GetFileName(dxfPath) & _
             " (T=" & Format(thickness, "0.0") & " BD=" & Format(bd, "0.1") & ")"

    ProcessSinglePart = True
    Exit Function

ErrHandler:
    LogPrint "✗ 处理异常 (" & Err.Description & "): " & GetFileName(filePath)
    ProcessSinglePart = False
End Function

'===========================================================================
' 15. 读取钣金厚度
'===========================================================================

Private Function GetSheetMetalThickness(ByRef swPart As Object) As Double
    On Error Resume Next
    GetSheetMetalThickness = 0

    Dim swFeat As Object
    Set swFeat = FindSheetMetalFeature(swPart)

    If Not swFeat Is Nothing Then
        Dim swFeatData As Object  ' ISheetMetalFeatureData
        Set swFeatData = swFeat.GetDefinition

        GetSheetMetalThickness = swFeatData.Thickness * 1000#  ' m → mm
        If Err.Number <> 0 Then
            Err.Clear
            GetSheetMetalThickness = 0
        End If
    End If

    ' 备用: 从自定义属性读取
    If GetSheetMetalThickness <= 0 Then
        Dim val As String
        val = swPart.CustomInfo2("", "SheetMetalThickness")
        If Len(val) > 0 Then GetSheetMetalThickness = CDbl(val)
        If Err.Number <> 0 Then
            Err.Clear
            GetSheetMetalThickness = 0
        End If
    End If

    ' 最后备用: Thickness 属性
    If GetSheetMetalThickness <= 0 Then
        Dim val2 As String
        val2 = swPart.CustomInfo2("", "Thickness")
        If Len(val2) > 0 Then GetSheetMetalThickness = CDbl(val2)
        If Err.Number <> 0 Then
            Err.Clear
            GetSheetMetalThickness = 0
        End If
    End If
End Function

'===========================================================================
' 16. 查找钣金特征
'===========================================================================

Private Function FindSheetMetalFeature(ByRef swPart As Object) As Object
    On Error Resume Next

    ' 方法1: 按类型名遍历
    Dim swFeat As Object
    Set swFeat = swPart.FirstFeature

    Do While Not swFeat Is Nothing
        Dim typeName As String
        typeName = swFeat.GetTypeName2
        If typeName = "SheetMetal" Or typeName = "SMBaseFlange" Then
            Set FindSheetMetalFeature = swFeat
            Exit Function
        End If
        Set swFeat = swFeat.GetNextFeature
    Loop

    ' 方法2: 按名称查找
    Set FindSheetMetalFeature = swPart.FeatureByName("Sheet-Metal1")
    If Not FindSheetMetalFeature Is Nothing Then Exit Function

    Set FindSheetMetalFeature = swPart.FeatureByName("钣金1")
    If Not FindSheetMetalFeature Is Nothing Then Exit Function

    ' 未找到
    Set FindSheetMetalFeature = Nothing
End Function

'===========================================================================
' 17. 判断是否为钣金零件
'===========================================================================

Private Function IsSheetMetalPart(ByRef swPart As Object) As Boolean
    On Error Resume Next

    Dim swFeat As Object
    Set swFeat = FindSheetMetalFeature(swPart)
    If Not swFeat Is Nothing Then
        IsSheetMetalPart = True
        Exit Function
    End If

    ' 备用: 检查自定义属性
    Dim prop As String
    prop = swPart.CustomInfo2("", "SheetMetalThickness")
    If Len(prop) > 0 Then
        IsSheetMetalPart = True
        Exit Function
    End If

    IsSheetMetalPart = False
End Function

'===========================================================================
' 18. 查表获取直角折弯扣除 BD
'===========================================================================

Private Function GetBendDeduction(ByVal thickness As Double, ByRef outBD As Double) As Boolean
    GetBendDeduction = False

    Select Case thickness
        Case 1#:   outBD = 1.7
        Case 1.2:  outBD = 2#     ' 1.2mm → BD=2.0mm
        Case 1.5:  outBD = 2.5
        Case 2#:   outBD = 3.3
        Case 2.5:  outBD = 4.3
        Case 3#:   outBD = 5#
        Case 5#:   outBD = 8.5
        Case Else: Exit Function
    End Select

    GetBendDeduction = True
End Function

'===========================================================================
' 19. 获取 K 因子 (连续区间, 无判定空白)
'     1.0 ≤ T ≤ 1.5  → K = 0.25
'     1.5 < T ≤ 3.0  → K = 0.23
'     3.0 < T ≤ 5.0  → K = 0.23
'===========================================================================

Private Function GetKFactor(ByVal thickness As Double) As Double
    If thickness >= K_FACTOR_T1_MIN And thickness <= K_FACTOR_T1_MAX Then
        GetKFactor = K_FACTOR_VAL_1   ' 0.25
    ElseIf thickness > K_FACTOR_T1_MAX And thickness <= K_FACTOR_T2_MAX Then
        GetKFactor = K_FACTOR_VAL_2   ' 0.23
    ElseIf thickness > K_FACTOR_T2_MAX And thickness <= K_FACTOR_T3_MAX Then
        GetKFactor = K_FACTOR_VAL_3   ' 0.23
    Else
        ' 超出定义范围 (T < 1.0 或 T > 5.0), 默认 K = 0.25
        GetKFactor = K_FACTOR_VAL_1
        LogPrint "⚠ 板厚 " & Format(thickness, "0.0") & "mm 超出定义范围, 使用默认 K=" & _
                 Format(K_FACTOR_VAL_1, "0.00")
    End If
End Function

'===========================================================================
' 20. 将折弯扣除写入钣金特征
'===========================================================================

Private Function SetBendDeductionToPart(ByRef swPart As Object, _
                                         ByVal bdValue As Double) As Boolean
    On Error GoTo ErrHandler
    SetBendDeductionToPart = False

    Dim swFeat As Object
    Set swFeat = FindSheetMetalFeature(swPart)
    If swFeat Is Nothing Then Exit Function

    Dim swFeatData As Object  ' ISheetMetalFeatureData
    Set swFeatData = swFeat.GetDefinition
    swFeatData.AccessSelections swPart, Nothing

    ' 设置为折弯扣除模式
    swFeatData.BendAllowanceType = swBendAllowanceTypeBENDDEDUCTION

    ' 写入折弯扣除值 (SolidWorks API 内部使用米制单位, mm → m)
    swFeatData.BendAllowance = bdValue / 1000#

    ' 应用修改
    swFeat.ModifyDefinition swFeatData, swPart, Nothing

    SetBendDeductionToPart = True
    Exit Function

ErrHandler:
    Debug.Print "SetBendDeductionToPart 错误: " & Err.Description
    SetBendDeductionToPart = False
End Function

'===========================================================================
' 21. 将 K 因子写入钣金特征 (备用 — 非直角折弯场景)
'===========================================================================

Private Function SetKFactorToPart(ByRef swPart As Object, _
                                   ByVal kfactor As Double) As Boolean
    On Error GoTo ErrHandler
    SetKFactorToPart = False

    Dim swFeat As Object
    Set swFeat = FindSheetMetalFeature(swPart)
    If swFeat Is Nothing Then Exit Function

    Dim swFeatData As Object
    Set swFeatData = swFeat.GetDefinition
    swFeatData.AccessSelections swPart, Nothing

    swFeatData.BendAllowanceType = swBendAllowanceTypeKFACTOR
    swFeatData.BendAllowance = kfactor  ' K 因子是无量纲比值, 无需单位转换

    swFeat.ModifyDefinition swFeatData, swPart, Nothing

    SetKFactorToPart = True
    Exit Function

ErrHandler:
    Debug.Print "SetKFactorToPart 错误: " & Err.Description
    SetKFactorToPart = False
End Function

'===========================================================================
' 22. 确保展开图特征存在且未压缩
'===========================================================================

Private Function EnsureFlatPattern(ByRef swPart As Object) As Boolean
    On Error GoTo ErrHandler
    EnsureFlatPattern = False

    ' 按名称查找 Flat-Pattern 特征
    Dim swFeat As Object
    Set swFeat = swPart.FeatureByName("Flat-Pattern1")

    If swFeat Is Nothing Then
        Set swFeat = swPart.FeatureByName("平板型式1")
    End If

    ' 按类型遍历查找
    If swFeat Is Nothing Then
        Dim feat As Object
        Set feat = swPart.FirstFeature
        Do While Not feat Is Nothing
            If feat.GetTypeName2 = "FlatPattern" Then
                Set swFeat = feat
                Exit Do
            End If
            Set feat = feat.GetNextFeature
        Loop
    End If

    If swFeat Is Nothing Then
        LogPrint "⚠ 未找到展开图特征"
        Exit Function
    End If

    ' 解除压缩
    If swFeat.IsSuppressed Then
        On Error Resume Next
        swFeat.SetSuppression2 swUnSuppressFeature, swThisConfiguration, ""
        If Err.Number <> 0 Then
            Err.Clear
            ' 备用解压方式
            swPart.ClearSelection2 True
            swPart.SelectByID "Flat-Pattern1", "BODYFEATURE", 0, 0, 0
            swPart.EditUnsuppress2
        End If
        On Error GoTo ErrHandler

        swPart.EditRebuild3
    End If

    EnsureFlatPattern = True
    Exit Function

ErrHandler:
    Debug.Print "EnsureFlatPattern 错误: " & Err.Description
    EnsureFlatPattern = False
End Function

'===========================================================================
' 23. 导出展开图到 DXF 文件
'===========================================================================

Private Function ExportFlatPatternToDxf(ByRef swPart As Object, _
                                         ByVal dxfPath As String) As Boolean
    On Error GoTo ErrHandler
    ExportFlatPatternToDxf = False

    ' 删除同名旧文件
    If Len(Dir(dxfPath)) > 0 Then
        On Error Resume Next
        Kill dxfPath
        On Error GoTo ErrHandler
    End If

    ' 切换到展开图视图
    On Error Resume Next
    swPart.ShowNamedView2 "*Flat-Pattern", -1
    If Err.Number <> 0 Then
        Err.Clear
        swPart.ShowNamedView2 "*平板型式", -1
    End If
    On Error GoTo ErrHandler

    ' 提取零件名 (不含扩展名, 用于 DrawingName 参数)
    Dim partName As String
    partName = swPart.GetTitle
    If InStr(partName, ".") > 0 Then
        partName = Left(partName, InStrRev(partName, ".") - 1)
    End If

    ' ExportToDWG2 参数说明:
    '   1. FileName                 输出文件路径
    '   2. DrawingName              图纸名称
    '   3. ExportType               swExportFlatPatternView = 1
    '   4. IncludeHiddenBodies      包含隐藏实体
    '   5. BodyList                 实体列表 (Empty = 全部)
    '   6. IncludeOverrulingColors  包含覆盖颜色
    '   7. ExportAs                 swExportToDWG_ExportSheetMetal = 2
    '   8. IncludeBends             包含折弯
    '   9. IncludeSketches          包含草图
    '  10. SketchQuality            草图质量
    '  11. Version                  DXF 版本
    '  12. IncludeCosmeticThreads   包含装饰螺纹
    '  13. IncludeBendLines         包含折弯线 (True = 车间需要)
    '  14. IncludeBendNotes         包含折弯注释
    '  15. BomTableType             BOM 表类型

    Dim bRet As Boolean
    bRet = swPart.ExportToDWG2(dxfPath, partName, swExportFlatPatternView, _
                True, Empty, False, swExportToDWG_ExportSheetMetal, _
                False, False, 0, 0, _
                False, True, False, 0)

    If Not bRet Then
        Debug.Print "ExportToDWG2 返回 False: " & dxfPath
    End If

    ExportFlatPatternToDxf = bRet
    Exit Function

ErrHandler:
    Debug.Print "ExportFlatPatternToDxf 异常: " & Err.Description
    ExportFlatPatternToDxf = False
End Function

'===========================================================================
' 24. 生成 DXF 文件路径 (命名规则: {零件名}_{板厚}mm_{材料}.dxf)
'===========================================================================

Private Function BuildDxfFilePath(ByVal sourcePath As String, _
                                   ByVal thickness As Double, _
                                   ByVal materialName As String) As String
    Dim partName As String
    partName = GetFileNameWithoutExt(sourcePath)

    Dim safeMaterial As String
    safeMaterial = SanitizeFileName(materialName)

    Dim dxfName As String
    dxfName = partName & "_" & Format(thickness, "0.0") & "mm_" & safeMaterial & ".dxf"

    BuildDxfFilePath = GetDirectoryFromPath(sourcePath) & dxfName
End Function

'===========================================================================
' 25. 读取材料名称
'===========================================================================

Private Function GetMaterialName(ByRef swPart As Object) As String
    On Error Resume Next

    Dim matDb   As String
    Dim matName As String

    swPart.GetMaterialPropertyName2 "", matDb, matName

    If Len(matName) > 0 Then
        GetMaterialName = matName
    Else
        ' 尝试从自定义属性读取
        matName = swPart.CustomInfo2("", "Material")
        If Len(matName) > 0 Then
            GetMaterialName = matName
        Else
            GetMaterialName = "未指定"
        End If
    End If
End Function

'===========================================================================
' 26. 文件名安全化 — 过滤 Windows 非法字符
'===========================================================================

Private Function SanitizeFileName(ByVal rawName As String) As String
    If Len(rawName) = 0 Then
        SanitizeFileName = "未指定"
        Exit Function
    End If

    Dim result As String
    result = rawName

    ' 替换非法字符为下划线
    Dim i As Long
    For i = 1 To Len(ILLEGAL_CHARS)
        result = Replace(result, Mid(ILLEGAL_CHARS, i, 1), "_")
    Next i

    ' 去除首尾空格和点号 (Windows 不允许文件名以空格或点结尾)
    result = Trim(result)
    Do While Right(result, 1) = "."
        result = Left(result, Len(result) - 1)
    Loop

    ' 去除控制字符 (Asc < 32)
    Dim j As Long
    For j = 1 To Len(result)
        If AscW(Mid(result, j, 1)) < 32 Then
            Mid(result, j, 1) = "_"
        End If
    Next j

    ' 限制材料名长度 (避免路径过长)
    If Len(result) > 80 Then
        result = Left(result, 80)
    End If

    If Len(result) = 0 Then
        result = "未指定"
    End If

    SanitizeFileName = result
End Function

'===========================================================================
' 27. 路径工具函数
'===========================================================================

Private Function GetFileName(ByVal fullPath As String) As String
    Dim pos As Long
    pos = InStrRev(fullPath, "\")
    If pos > 0 Then
        GetFileName = Mid(fullPath, pos + 1)
    Else
        GetFileName = fullPath
    End If
End Function

Private Function GetFileNameWithoutExt(ByVal fullPath As String) As String
    Dim nameOnly As String
    nameOnly = GetFileName(fullPath)
    Dim pos As Long
    pos = InStrRev(nameOnly, ".")
    If pos > 0 Then
        GetFileNameWithoutExt = Left(nameOnly, pos - 1)
    Else
        GetFileNameWithoutExt = nameOnly
    End If
End Function

Private Function GetDirectoryFromPath(ByVal fullPath As String) As String
    Dim pos As Long
    pos = InStrRev(fullPath, "\")
    If pos > 0 Then
        GetDirectoryFromPath = Left(fullPath, pos)
    Else
        GetDirectoryFromPath = ""
    End If
End Function

'===========================================================================
' 28. 根据扩展名猜测文档类型
'===========================================================================

Private Function GuessDocType(ByVal filePath As String) As Long
    Dim ext As String
    ext = UCase(GetFileName(filePath))

    If InStr(ext, ".SLDPRT") > 0 Then
        GuessDocType = swDocPART
    ElseIf InStr(ext, ".SLDASM") > 0 Then
        GuessDocType = swDocASSEMBLY
    Else
        GuessDocType = swDocPART
    End If
End Function

'===========================================================================
' 29. 日志记录
'===========================================================================

Private Sub LogPrint(ByVal msg As String)
    Debug.Print "[" & Format(Now, "HH:MM:SS") & "] " & msg
End Sub

'===========================================================================
' 30. 汇总报告
'===========================================================================

Private Sub ShowSummaryReport(ByVal mode As Long)
    Dim elapsed As Double
    elapsed = Timer - StartTime

    Dim modeStr As String
    Select Case mode
        Case 1: modeStr = "当前文档"
        Case 2: modeStr = "文件夹批量"
        Case 3: modeStr = "装配体批量"
    End Select

    Dim total As Long
    total = SuccessCount + SkipCount + FailCount

    Dim summary As String
    summary = "══════════════════════════════════" & vbCrLf & _
              "  钣金批量下料 DXF 导出 — 完成报告" & vbCrLf & _
              "══════════════════════════════════" & vbCrLf & _
              "  处理模式 : " & modeStr & vbCrLf & _
              "  成功导出 : " & SuccessCount & " 件" & vbCrLf & _
              "  跳过 (非钣金件): " & SkipCount & " 件" & vbCrLf & _
              "  失败     : " & FailCount & " 件" & vbCrLf & _
              "  总计处理 : " & total & " 件" & vbCrLf & _
              "  耗时     : " & Format(elapsed, "0.0") & " 秒" & vbCrLf & _
              "══════════════════════════════════"

    MsgBox summary, vbInformation, "批量下料 — 处理完毕"
    Debug.Print summary
End Sub

'===========================================================================
' 结束
'===========================================================================
