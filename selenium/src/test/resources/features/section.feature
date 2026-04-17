@greystar @accordion @section
Feature:section: Validate section component

  @clearcookies
  Scenario: Navigate to the page having section component configured
    When I navigate to '/testing/components-all'
    Then 'Section_component' is visible

  Scenario: Validate elements on the component
    Then 'Section_Title' is visible

  Scenario: Validate typography of Section Title text
    Then The 'Section_Title' element has following CSS properties
      | font-size   | 40px              |
      | font-weight | 700               |
      | line-height | 50px              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |