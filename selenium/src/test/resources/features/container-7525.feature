@greystar @container7525 @container
Feature:container-7525: Validate 75-25 container component

  @clearcookies
  Scenario: Navigate to the page having container 75-25 component configured
    When I navigate to '/QA/75-25Container'
    Then 'container_7525_component' is visible

  Scenario: Validate size of the sections on the component
    Then The 'Section1' element has a CSS 'width' property with value '943.5px'
    * The 'Section2' element has a CSS 'width' property with value '314.5px'