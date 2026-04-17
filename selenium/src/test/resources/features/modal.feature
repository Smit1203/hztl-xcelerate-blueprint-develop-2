@xcelerate @modal
Feature:modal:Validate Modal component

  @clearcookies
  Scenario: Navigate to Test page
    When I navigate to '/testing/components-all'

  Scenario: Validate Modal and its elements are visible
    Given 'Modal_trigger_link' is visible
    When I click on 'Modal_trigger_link'
    Then 'Modal_overlay' is visible
    * 'Modal_content' is visible
    * 'Modal_close_button' is visible
    

  Scenario: Validate the dimension of Modal component
    Then The 'Modal_overlay' element has following CSS properties
      | width       | 808.5px         |
      | height      | 119px           |

  Scenario: Validate typography of Model content
    Then 'Modal_content' is visible
    * The 'Modal_content' element has following CSS properties
      | font-size   | 18px                  |
      | font-weight | 700                   |
      | line-height | 27px                  |
      | color       | rgb(0, 0, 0)          |
      | font-family | Inter, sans-serif     |

 Scenario: Validate the functionality of close button of Modal component
    Given 'Modal_close_button' is visible
    When I click on 'Modal_close_button'
    Then 'Modal_overlay' is disappeared