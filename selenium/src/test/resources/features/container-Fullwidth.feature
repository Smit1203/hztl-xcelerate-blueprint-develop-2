@greystar @containerfullwidth @container
Feature:container-fullwidth: Validate Full width container component

  @clearcookies
  Scenario: Navigate to the page having container full width component configured
    When I navigate to '/QA/fullwidthContainer'
    Then 'container_fullwidth_component' is visible

  Scenario: Validate size of the sections on the component
    Then 'Section' is visible
    * The 'Section' element has a CSS 'width' property with value '1282px'