# Create Sitecore package after a particular update date
$package = New-Package "Prod Content Sync";

# Set package metadata
$package.Sources.Clear();

$package.Metadata.Author = "Hztl";
$package.Metadata.Publisher = "Hztl";
$package.Metadata.Version = "1.0";
$package.Metadata.Readme = 'get all the contents updated after 8/20/2019'


$isoDate = [Sitecore.DateUtil]::ToIsoDate('5/1/2025')

Get-Item -Path "master:" -Query "/sitecore/content/Project/News//*[@__Updated>'$($isoDate)']"

$items = Get-Item -Path "master:" -Query "/sitecore/content/Project/News//*[@__Updated>'$($isoDate)']"

foreach ($item in $items) {
    Write-Host "$($item.ID) $($item.ItemPath)   $($item.Created)    $($item['__Created By'])    $($item.__Updated)  $($item['__Updated by'])";
    # Add contnet/home to the package
    #$source = Get-Item $item.ItemPath | New-ItemSource -Name '$item.ID' -InstallMode Merge
    $source = Get-Item $item.ItemPath | New-ExplicitItemSource -Name '$item.ID' -InstallMode Merge
    $package.Sources.Add($source);
}


# Save package
Export-Package -Project $package -Path "$($package.Name)-$($package.Metadata.Version).zip" -Zip

# Offer the user to download the package
Download-File "$SitecorePackageFolder\$($package.Name)-$($package.Metadata.Version).zip"
