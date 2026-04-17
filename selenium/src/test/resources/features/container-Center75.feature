@greystar @containercenter75 @container
Feature:container-center75: Validate center 75 container component

  @clearcookies
  Scenario: Navigate to the page having center 75 container component configured
    When I navigate to '/QA/center75Container'
    Then 'container_center75_component' is visible

  Scenario: Validate size of the sections on the component
    Then 'Section' is visible
    * The 'Section' element has a CSS 'width' property with value '845px'