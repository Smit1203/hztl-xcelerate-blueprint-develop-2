@xcelerate @tabs
Feature:tabs: Validate TAB Component

  @clearcookies
  Scenario: Navigate to the page having TAB Component configured
    When I navigate to '/testing/components-all'
    Then 'TAB_component' is visible

  Scenario: Validate elements on the component
    Then 'TAB-1-text' is visible
    And 'TAB-2-text' is visible

  Scenario: Validate typography of TAB-1 field
    Then The 'TAB-1-text' element has following CSS properties
      | font-size        | 16px              |
      | font-weight      | 600               |
      | line-height      | 20px              |
      | color            | #ffffff           |
      | background-color | #004eeb           |
      | font-family      | Inter, sans-serif |


  Scenario: Validate typography of TAB-2 field
    Then The 'TAB-2-text' element has following CSS properties
      | font-size        | 16px              |
      | font-weight      | 600               |
      | line-height      | 20px              |
      | color            | #667085           |
      | background-color | #FCFCFD           |
      | font-family      | Inter, sans-serif |

  Scenario: Validate functionality of TAB-1
    Then 'TAB-1-text' is clickable

  Scenario: Validate functionality of TAB-2
    Then 'TAB-2-text' is clickable
    
    Scenario: Validate the size of tab 1
      Then The 'Tab_1_area' element has a CSS 'width' property with value '124px'
      * The 'Tab_1_area' element has a CSS 'height' property with value '56px'