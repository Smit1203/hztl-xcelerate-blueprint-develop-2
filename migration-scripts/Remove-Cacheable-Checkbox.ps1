# This script is intended to remove the 'cacheable' checkbox from renderings.
# The actual script logic needs to be implemented.
# For example, it might look like this:
#
# $renderingPath = "master:/sitecore/layout/Renderings/your-project"
# $items = Get-ChildItem -Path $renderingPath -Recurse | Where-Object { $_.TemplateId -eq "{04646A89-996F-4EE7-878A-FFDBF1F0EF0D}" } # JSON Rendering
# foreach($item in $items) {
#     $item.Editing.BeginEdit()
#     $item.Cacheable = 0
#     $item.Editing.EndEdit()
# }

Write-Host "Script to remove the cacheable checkbox from renderings needs to be implemented." 