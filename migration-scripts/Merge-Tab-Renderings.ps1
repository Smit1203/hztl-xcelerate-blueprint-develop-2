# The following script merges two tabs collections into one. 
# It deletes the TabsLeftAligned rendering and adds the left value in the 
# Rendering parameter, replacing it with one TabsCollection rendering.

$TabsLeftAlignedRenderingID = "{2B3DB683-2C33-47D3-840A-C717F6B1FD2C}"
$TabsLeftAligned = Get-Item $TabsLeftAlignedRenderingID
$TabsCollectionRenderingID = "{9F9EA918-3173-421F-821A-8D6C20C0E0E8}"
$TabsCollection = Get-Item $TabsCollectionRenderingID
$pageCount = 0
$pages = Get-ItemReferrer -Item $TabsLeftAligned
foreach ($Link in $pages) {
    $pageCount++
}
Write-Host "`nTabsLeftAligned Rendering Count: $($pageCount)" -Foreground Yellow -BackgroundColor Black
$parameters = [ordered]@{"Alignment"="{1A4EF848-091E-4AA2-8A52-4A5EF8A61D27}"} # Left Alignment ID
$count = 0
foreach ($item in $pages) {
    $renderings = Get-Rendering -Item $item -FinalLayout
    if ($renderings -ne $null -and $renderings.length -ge 1) {
        foreach ($rendering in $renderings) {
            if ($rendering.ItemID -eq $TabsLeftAlignedRenderingID) {
                $rendering | Set-RenderingParameter -Parameter $parameters | Set-Rendering -Item $item -FinalLayout
            }
        }
    }
} 