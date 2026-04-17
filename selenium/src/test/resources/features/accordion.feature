@greystar @accordion @faq
Feature:accordion: Validate accordion component

  @clearcookies
  Scenario: Navigate to the page having FAQ/Accordion component configured
    When I navigate to '/testing/components-all'
    Then 'Accordion_component' is visible


  Scenario: Validate elements on the component
    Then 'Accordion_heading' is visible
    * 'Expand_all_linktext' is visible
    * 'Collapse_all_linktext' is visible
    * 'Collapse_all_linktext' field is disabled

  Scenario: Validate typography of Accordion heading text
    Then The 'Accordion_heading' element has following CSS properties
      | font-size   | 18px              |
      | font-weight | 700               |
      | line-height | 27px              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |

  Scenario: Validate functionality of Accordion component
    Given The 'aria-expanded' attribute of 'Accordion_item' element is 'false'
    When I wait and click on 'Accordion_item'
    Then The 'aria-expanded' attribute of 'Accordion_item' element is 'true'
    * 'Expand_all_linktext' is clickable

  Scenario: Validate typography of Accordion content text
    Then The 'Accordion_content' element has following CSS properties
      | font-size   | 18px               |
      | font-weight | 400                |
      | line-height | 27px               |
      | color       | rgb(102, 112, 133) |
      | font-family | Inter, sans-serif  |

  Scenario: Validate functionality of expand/collapse all links
    Given The 'aria-expanded' attribute of 'Accordion_item' element is 'true'
    When I wait and click on 'Collapse_all_linktext'
    * I wait for '1' seconds
    Then The 'aria-expanded' attribute of 'Accordion_item' element is 'false'
    When I wait and click on 'Expand_all_linktext'
    * I wait for '1' seconds
    Then The 'aria-expanded' attribute of 'Accordion_item' element is 'true'