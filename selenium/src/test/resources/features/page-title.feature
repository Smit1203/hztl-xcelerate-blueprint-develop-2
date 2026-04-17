@xcelerate @page-title
Feature:page-title:Validate Page Title component

  @clearcookies
  Scenario: Navigate to Home page
    Given I view the home page

  Scenario: Validate Page Title component is visible
    When I navigate to '/testing/components-all'
    Then 'Page_title_section' is visible

  Scenario: Validate elements of Page Title are visible
    Given 'Page_title_section' is visible
    Then 'Page_title_heading' is visible
    * 'Page_title_description' is visible
    * 'Page_title_cta' is visible

  Scenario: Validate typography of Heading field of Page Title component
    Then 'Page_title_heading' is visible
    * The 'Page_title_heading' element has following CSS properties
      | font-size   | 48px                                       |
      | font-weight | 700                                        |
      | line-height | 72px                                       |
      | color       | rgb(25, 32, 46)                            |
      | font-family | Inter, sans-serif                          |

  Scenario: Validate typography of Description field of Page Title component
    Then 'Page_title_description' is visible
    * The 'Page_title_description' element has following CSS properties
      | font-size   | 18px                                       |
      | font-weight | 400                                        |
      | line-height | 27px                                       |
      | color       | rgb(102, 112, 133)                         |
      | font-family | Inter, sans-serif                          |

  Scenario: Validate typography of Primary CTA of Carousel Item
    Then The 'Page_title_cta' element has following CSS properties
      | font-size        | 18px                                         |
      | font-weight      | 600                                          |
      | line-height      | 18px                                         |
      | color            | rgb(255, 255, 255)                           |
      | font-family      | __Inter_e8ce0c, __Inter_Fallback_e8ce0c      |
      | background-color | rgb(52, 64, 84)                              |
      | width            | 150.781px                                    |
      | height           | 56px                                         |

  Scenario: Validate the Hover functionality of Primary CTA of Feature Component
    When I hover mouse over 'Page_title_cta'
    * I wait for '1' seconds
    Then The 'Page_title_cta' element has following CSS properties
      | background-color | rgb(25, 32, 46)         |

  Scenario: Validate the click functionality of Primary CTA of Carousel component
    Given 'Page_title_cta' is visible
    Then 'Page_title_cta' is clickable
    * Link on 'Page_title_cta' having response code 200 ok