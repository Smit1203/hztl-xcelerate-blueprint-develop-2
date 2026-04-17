# To convert from View/Controller rendering to JSON.
# Note: All rendering parameters will be empty after executing this script. 
# You will need to redo them manually and serialize them to ensure they populate correctly in higher environments.

$contentPath = "master:/sitecore/layout/Renderings/"
$templateID = "{2A3E91A0-7987-44B5-AB34-35C2D9DE83B9}" # View/Controller Rendering Template ID
$fieldName = "componentName"
$items = Get-ChildItem -Path $contentPath -Recurse | Where-Object { $_."TemplateID" -eq $templateID }
foreach ($item in $items) {
    $item.Editing.BeginEdit()
    $item.TemplateId = "{04646A89-996F-4EE7-878A-FFDBF1F0EF0D}" # JSON Rendering Template ID
    $item['componentName'] = $item.Name.Replace(" ", "")
    $item.Editing.EndEdit()
} 