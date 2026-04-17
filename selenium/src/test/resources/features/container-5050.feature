@greystar @container5050 @container
Feature:container-5050: Validate 50-50 container component

  @clearcookies
  Scenario: Navigate to the page having container 50-50 component configured
    When I navigate to '/QA/50-50Container'
    Then 'container_5050_component' is visible

  Scenario: Validate size of the sections on the component
    Then The 'Section1' element has a CSS 'width' property with value '629px'
    * The 'Section2' element has a CSS 'width' property with value '629px'