# To remove unknown renderings from presentation details (e.g., Header and Footer) 
# that used the Reference Rendering Template. This is useful for cleaning up presentation 
# details after a template change or migration.

$rootPath = "{D2449504-ACC8-46D1-8903-4E47581F2C28}" # Root item ID to start the search from
$pages = Get-ChildItem -Path $rootPath -Recurse
$uid = "{64EAF703-D965-46B7-8D0D-74EACF7E448F}" # MVC_Form rendering unique ID to be removed
$results = @()
$itemCount = 1
foreach ($item in $pages) {
    $renderings = Get-Rendering -Item $item
    $renderingCount = 0
    $count = 0
    if ($renderings -ne $null -and $renderings.length -ge 1) {
        foreach ($rendering in $renderings) {
            if ([string]::IsNullOrEmpty($rendering.Placeholder)) {
                try {
                    $renderingItem = Get-Item -Path $rendering.ItemID -ErrorAction Stop
                } catch {
                    Remove-Rendering -Item $item -UniqueId $rendering.UniqueId
                    $renderingCount++
                    $count++
                    Set-Variable -Name "UniqueId$count" -Value $rendering.UniqueId
                    Set-Variable -Name "renderingItemId$count" -Value $rendering.ItemId
                    continue
                }
            }
            if ($rendering.UniqueId -eq $uid) {
                Remove-Rendering -Item $item -UniqueId $rendering.UniqueId
                $renderingCount++
            }
        }
    }
    if ($renderingCount -gt 0) {
        Write-Host "$($itemCount) Item with ID $($item.ID) - $($item.DisplayName)"
        $result = @{
            DisplayName = $item.DisplayName
            ItemID = $item.ID
            RenderingsCount = $renderingCount
        }
        if ($count -gt 0) {
            for ($i = 1; $i -le $count; $i++) {
                $result["UniqueId$i"] = Get-Variable -Name "UniqueId$i" -ValueOnly
                $result["renderingItemId$i"] = Get-Variable -Name "renderingItemId$i" -ValueOnly
            }
        }
        $results += New-Object PSObject -Property $result
        $itemCount++
    }
} 