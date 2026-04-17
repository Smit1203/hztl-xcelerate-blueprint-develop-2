$startPath = "/sitecore/content/Project/News"

New-UsingBlock (New-Object Sitecore.Data.BulkUpdateContext) {
    foreach ($item in Get-ChildItem -Path $startPath -Recurse) {
        $target = $item["__Publishing groups"]
        
        if (-not [string]::IsNullOrEmpty($target)) {
            $item.Editing.BeginEdit()
            Write-Host "ID - [$($item.ID)]"
            Write-Host "Publishing Target before - [$($item[\"__Publishing groups\"])]"
            $item["__Publishing groups"] = ""
            $item.Editing.EndEdit() | Out-Null
            Write-Host "Publishing Target after - [$($item[\"__Publishing groups\"])]"
        }
    }
}