@greystar @container2575 @container
Feature:container-2575: Validate 25-75 container component

  @clearcookies
  Scenario: Navigate to the page having container 25-75 component configured
    When I navigate to '/QA/25-75Container'
    Then 'container_2575_component' is visible

  Scenario: Validate size of the sections on the component
    Then The 'Section1' element has a CSS 'width' property with value '314.5px'
    * The 'Section2' element has a CSS 'width' property with value '943.5px'