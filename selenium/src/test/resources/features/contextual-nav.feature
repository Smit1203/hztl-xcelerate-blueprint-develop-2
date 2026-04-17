@xcelerate @contextual-nav
Feature:contextual-nav:Validate Contextual Nav component

  @clearcookies
  Scenario: Navigate to Home page
    Given I view the home page

  Scenario: Validate Contextual Nav component is visible
    When I navigate to '/QATopLevel'
    Then 'Contextual_nav_section' is visible

  Scenario: Validate elements of Contextual Nav list are visible
    Given 'Contextual_nav_section' is visible
    * 'Contextual_main_nav' is visible
    * 'Contextual_nav_item1' is visible
    * 'Contextual_nav_item1_arrow' is visible
    * 'Contextual_nav_item1_arrow' is collapsed
    * 'Contextual_nav_item2' is visible
    * 'Contextual_nav_item2_arrow' is visible
    * 'Contextual_nav_item2_arrow' is collapsed
    * 'Contextual_nav_item3' is visible

  Scenario: Validate expand functionality of Contextual Nav Link1
    Given 'Contextual_nav_item1_arrow' is collapsed
    When I click on 'Contextual_nav_item1_arrow'
    Then 'Contextual_nav_item1_arrow' is expanded
    * 'Contextual_nav_item1_sub_nav1' is visible
    * 'Contextual_nav_item1_sub_nav1_arrow' is collapsed
    * 'Contextual_nav_item1_sub_nav2' is visible

  Scenario: Validate expand functionality of Sub link1 of Contextual Nav Link1
    Given 'Contextual_nav_item1_sub_nav1_arrow' is collapsed
    When I click on 'Contextual_nav_item1_sub_nav1_arrow'
    Then 'Contextual_nav_item1_sub_nav1_arrow' is expanded
    * 'Contextual_nav_item1_sub_nav1_sub_nav' is visible

  Scenario: Validate typography of Main Nav of Contextual Nav Component
    Given 'Contextual_main_nav' is visible
    * The 'Contextual_main_nav' element has following CSS properties
      | font-size           | 16px                         |
      | font-weight         | 600                          |
      | line-height         | 24px                         |
      | color               | rgb(255, 255, 255)           |
      | font-family         | Inter, sans-serif            |
      | text-decoration-line| underline                    |

  Scenario: Validate typography of Main Nav of Contextual Nav Component
    Given 'Contextual_nav_item1' is visible
    * The 'Contextual_nav_item1' element has following CSS properties
      | font-size           | 16px                         |
      | font-weight         | 600                          |
      | line-height         | 24px                         |
      | color               | rgb(25, 32, 46)              |
      | font-family         | Inter, sans-serif            |

  Scenario: Validate typography of Main Nav of Contextual Nav Component
    Given 'Contextual_nav_item1_sub_nav1' is visible
    * The 'Contextual_nav_item1_sub_nav1' element has following CSS properties
      | font-size           | 16px                         |
      | font-weight         | 600                          |
      | line-height         | 24px                         |
      | color               | rgb(25, 32, 46)              |
      | font-family         | Inter, sans-serif            |

  Scenario: Validate typography of Main Nav of Contextual Nav Component
    Given 'Contextual_nav_item1_sub_nav1_sub_nav' is visible
    * The 'Contextual_nav_item1_sub_nav1_sub_nav' element has following CSS properties
      | font-size           | 16px                         |
      | font-weight         | 600                          |
      | line-height         | 24px                         |
      | color               | rgb(25, 32, 46)              |
      | font-family         | Inter, sans-serif            |

  Scenario: Validate click functionality of Main Nav of Contextual Nav Component
    Given 'Contextual_main_nav' is visible
    Then  'Contextual_main_nav' is clickable
    * Link on 'Contextual_main_nav' having response code 200 ok

  Scenario: Validate typography of Main Nav of Contextual Nav Component
    Given 'Contextual_nav_item1' is visible
    Then  'Contextual_nav_item1' is clickable
    * Link on 'Contextual_nav_item1' having response code 200 ok

  Scenario: Validate typography of Main Nav of Contextual Nav Component
    Given 'Contextual_nav_item1_sub_nav1' is visible
    Then  'Contextual_nav_item1_sub_nav1' is clickable
    * Link on 'Contextual_nav_item1_sub_nav1' having response code 200 ok

  Scenario: Validate typography of Main Nav of Contextual Nav Component
    Given 'Contextual_nav_item1_sub_nav1_sub_nav' is visible
    Then  'Contextual_nav_item1_sub_nav1_sub_nav' is clickable
    * Link on 'Contextual_nav_item1_sub_nav1_sub_nav' having response code 200 ok