@xcelerate @divider
Feature:divider:Validate divider component

  @clearcookies
  Scenario: Navigate to Test page
    Given I navigate to '/testing/components-all'

  Scenario: Validate elements visible on divider component
    Then 'Divider_component' is visible

  Scenario: Validate size of the divider component
    Then The 'Divider_component' element has a CSS 'width' property with value '1216px'
    * The 'Divider_component' element has a CSS 'height' property with value '1px'

  Scenario:Validate background color of divider component
    When The 'Divider_component' element has a CSS 'background-color' property with value '#eaecf0'




