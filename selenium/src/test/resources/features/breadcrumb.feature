@xcelerate @breadcrumb
Feature:breadcrumb:Validate breadcrumb component

  @clearcookies
  Scenario: Navigate to Home page
    Given I navigate to '/qa/breadcrumb/breadcrumbonedown'

  Scenario: Validate elements visible on breadcrumb component
    Then 'Breadcrumb_component' is visible
    * 'qa' text is visible in 'second_part_of_breadcrumb'
    * 'breadcrumb' text is visible in 'third_part_of_breadcrumb'
    * 'breadcrumbonedown' text is visible in 'last_part_of_breadcrumb'

  Scenario: Validate functionality of breadcrumb
    Then 'second_part_of_breadcrumb' is clickable
    Then 'third_part_of_breadcrumb' is clickable

  Scenario: Validate typography of second_part_of_breadcrumb
    Then The 'second_part_of_breadcrumb' element has following CSS properties
      | font-size   | 14px                                      |
      | font-weight | 400                                       |
      | line-height | 21px                                      |
      | color       | rgb(102, 112, 133)                        |
      | font-family | __Roboto_372368, __Roboto_Fallback_372368 |


  Scenario: Validate typography of last_part_of_breadcrumb
    Then The 'last_part_of_breadcrumb' element has following CSS properties
      | font-size   | 14px                                      |
      | font-weight | 400                                       |
      | line-height | 21px                                      |
      | color       | rgb(25, 32, 46)                           |
      | font-family | __Roboto_372368, __Roboto_Fallback_372368 |

  Scenario: Validate the accessibility attributes
    Then The 'aria-current' attribute of 'current_page_text' element is 'true'
    Then The 'aria-label' attribute of 'Breadcrumb_component' element is 'Breadcrumb'