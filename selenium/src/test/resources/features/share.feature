@xcelerate @share
Feature:share:Validate share component

  @clearcookies
  Scenario: Navigate to Test page
    Given I navigate to '/qa/share'

  Scenario: Validate elements visible on Share component
    Then 'Share_component' is visible

  Scenario: Validate size of the share component
    Then The 'Share_component' element has a CSS 'height' property with value '40px'
    * The 'Share_component' element has a CSS 'width' property with value '40px'

  Scenario:Validate functionality of share component
    When 'Share_component' is clickable




