$redirectMap = Get-Item -path "/sitecore/content/nov/nov/Settings/Redirects/Redirect Map" -language "en-US"
$nameValues = [System.Web.HttpUtility]::ParseQueryString($redirectMap.UrlMapping)

Get-ChildItem -path "/sitecore/content/Redirects" -language "en-US" -Recurse |
    Where-Object { $_.TemplateID -eq "{E30B15B9-34CD-419C-8671-60FEAAAD5A46}" } |
    ForEach-Object {
        # Write-Host $_.Paths.FullPath
        $key = $_.Fields["Path"].Value
        $key = "/" + $key
        # Write-Host "Key is" $key

        [Sitecore.Data.Fields.LinkField]$field = $_.Fields["Target"]

        # Write-Host "Value is" $field.LinkType
        $newUrl = $field.Url
        if ($field.LinkType -eq "internal") {
            $newUrl = $field.InternalPath
            $url = [Sitecore.Links.LinkManager]::GetItemUrl($field.TargetItem)
            $url = $url.Replace("/en", "")
            $url = $url.Replace("/sitecore/shell", "")
            $url = $url.ToLower().Replace("/nov/nov/home", "")
            $newUrl = $url
            Write-Host $url
        }
        $nameValues[$key] = $newUrl
        # Write-Host $newUrl
    }

# Here you can add or remove name/value pairs

foreach ($key in $nameValues.AllKeys) {
    $nameValues[$key] = [Uri]::EscapeDataString($nameValues[$key])
}

$redirectMap.UrlMapping = [Sitecore.StringUtil]::NameValuesToString($nameValues, "&")

foreach ($key in $nameValues.AllKeys) {
    # (No operation in this loop)
}

