@xcelerate @rte
Feature:rte:Validate RTE component

  @clearcookies
  Scenario: Validate Page Title component is visible
    When I navigate to '/testing/components-all'
    Then 'RTE_section' is visible

  Scenario: Validate elements of RTE are visible
    Then 'RTE_title' is visible
    * 'RTE_description' is visible

  Scenario: Validate typography of Title of RTE component
    Then 'RTE_title' is visible
    * The 'RTE_title' element has following CSS properties
      | font-size   | 40px                     |
      | font-weight | 700                      |
      | line-height | 50px                     |
      | color       | rgb(25, 32, 46)          |
      | font-family | Inter, sans-serif        |

  Scenario: Validate typography of Description of RTE component
    Then 'RTE_description' is visible
    * The 'RTE_description' element has following CSS properties
      | font-size   | 18px                     |
      | font-weight | 400                      |
      | line-height | 27px                     |
      | color       | rgb(102, 112, 133)       |
      | font-family | Inter, sans-serif        |