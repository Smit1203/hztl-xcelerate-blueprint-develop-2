# Update Header and Footer datasource links. The link field was having the full URL 
# of the shared site. We need that link to be relative to the current site. 
# Execute the below script to adjust it accordingly.

$sharedSiteRoot = "/bokf/shared"
$bokSiteRoot = "/sitecore/content/bokf/BOT"
$bokSitePath = "/bokf/BOT"
$itemRootPath = "/sitecore/content/bokf/shared/Data/Global/GlobalSettingsAndData/Headers/BOT-Navigation"
$itemTemplateName = "NavigationLink"
$generalLinkFieldName = "Link"
$itemsToUpdate = Get-ChildItem -Path $itemRootPath -Recurse | Where-Object { $_.TemplateName -eq $itemTemplateName }
foreach ($item in $itemsToUpdate) {
    $generalLinkField = [Sitecore.Data.Fields.LinkField]$item.Fields[$generalLinkFieldName]
    $linkID = $generalLinkField.TargetID
    if ($linkID -ne "{00000000-0000-0000-0000-000000000000}") {
        $newitem = Get-Item -Path "master:" -ID $linkID
        $newitempath = $newitem.Paths.ContentPath
        if ($newitempath.StartsWith($sharedSiteRoot)) {
            $relativePath = $newitempath.Substring($sharedSiteRoot.Length)
            $bokLink = $bokSiteRoot + $relativePath
            $bokItem = Get-Item -Path $bokLink
            if ($bokItem) {
                $bokNewURL = $bokSitePath + $relativePath
                $item.Editing.BeginEdit()
                $generalLinkField.TargetID = $bokItem.ID
                $generalLinkField.Url = $bokNewURL
                $item.Editing.EndEdit()
                Write-Output "Updated General Link field for item: $($item.Paths.FullPath)"
            } else {
                Write-Output "BOT item not found for path: $bokLink"
            }
        }
    }
} 