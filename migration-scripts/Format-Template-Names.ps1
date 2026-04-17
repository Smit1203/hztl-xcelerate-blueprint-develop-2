# To remove spaces and apply camelCase formatting to template field names.
# This script ensures that template field names follow a consistent naming convention.

$contentPath = "master:/sitecore/templates/bokf"
$templateID = "{455A3E98-A627-4B40-8035-E683A0331AC7}" # Template Field Template ID
$items = Get-ChildItem -Path $contentPath -Recurse | Where-Object { $_."TemplateID" -eq $templateID }
foreach ($item in $items) {
    $newItemNameArray = $item.Name.split(" ")
    $newItemNameArray[0] = $newItemNameArray[0].ToLower()
    $newItemName = $newItemNameArray -join ""
    $item.Editing.BeginEdit()
    $item.Name = $newItemName
    $item.Editing.EndEdit()
} 