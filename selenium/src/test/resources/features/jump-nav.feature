@xcelerate @jump-nav
Feature:jump-nav:Validate Jump Nav component

  @clearcookies
  Scenario: Navigate to Home page
    Given I view the home page

  Scenario: Validate Jump Nav component is visible
    When I navigate to '/testing/components-all'
    Then 'Jump_nav_section' is visible

  Scenario: Validate elements of Jump Nav list are visible
    When I navigate to '/testing/components-all'
    Then 'Jump_nav_section' is visible
    * 'Jump_link_main_content_section' is visible
    * 'Jump_nav_links_heading' is visible
    * 'Jump_link_1' is visible
    * 'Jump_link_2' is visible
    * 'Jump_link_3' is visible

  Scenario: Validate the functionality of Jump Nav links
    When I click on 'Jump_link_3'
    Then The 'Main_content_heading_3' is visible within view area
    * The 'Main_content_description_3' is visible within view area

  Scenario: Validate the functionality of Jump Nav links
    When I click on 'Jump_link_1'
    Then The 'Main_content_heading_1' is visible within view area
    * The 'Main_content_description_1' is visible within view area

  Scenario: Validate typography of Main Content Heading of Jump Nav Component
    Then 'Main_content_heading_1' is visible
    * The 'Main_content_heading_1' element has following CSS properties
      | font-size   | 40px                                       |
      | font-weight | 700                                        |
      | line-height | 60px                                       |
      | color       | rgb(25, 32, 46)                            |
      | font-family | Inter, sans-serif                          |

  Scenario: Validate typography of Main Content Description of Jump Nav Component
    Then 'Main_content_description_1' is visible
    * The 'Main_content_description_1' element has following CSS properties
      | font-size   | 16px                                       |
      | font-weight | 400                                        |
      | line-height | 24px                                       |
      | color       | rgb(0, 0, 0)                               |
      | font-family | __Inter_e8ce0c, __Inter_Fallback_e8ce0c    |

  Scenario: Validate typography of Jump Link Heading of Jump Nav Component
    Then 'Jump_nav_links_heading' is visible
    * The 'Jump_nav_links_heading' element has following CSS properties
      | font-size   | 16px                                       |
      | font-weight | 600                                        |
      | line-height | 24px                                       |
      | color       | rgb(52, 64, 84)                            |
      | font-family | Inter, sans-serif                          |

  Scenario: Validate typography of Jump link of Jump Nav Component
    Then 'Jump_link_1' is visible
    * The 'Jump_link_1' element has following CSS properties
      | font-size   | 14px                                       |
      | font-weight | 600                                        |
      | line-height | 21px                                       |
      | color       | rgb(25, 32, 46)                            |
      | font-family | Inter, sans-serif                          |

  Scenario: Validate typography of Jump link of Jump Nav Component
    When I hover mouse over 'Jump_link_1'
    * The 'Jump_link_1' element has following CSS properties
      | font-size   | 14px                                       |
      | font-weight | 600                                        |
      | line-height | 21px                                       |
      | color       | rgb(0, 78, 235)                            |
      | font-family | Inter, sans-serif                          |
