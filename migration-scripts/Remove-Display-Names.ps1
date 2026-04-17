# To remove the Display Name from renderings.
# This helps in maintaining clean data and consistency.

$contentPath = "master:/sitecore/layout/Renderings/"
$items = Get-ChildItem -Path $contentPath -Recurse
foreach ($item in $items) {
    $item.Editing.BeginEdit()
    $item["__Display Name"] = ""
    $item.Editing.EndEdit()
} 