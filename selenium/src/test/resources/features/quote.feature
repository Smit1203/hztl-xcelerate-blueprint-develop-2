@xcelerate @quote
Feature:quote:Validate Quote component

  @clearcookies
  Scenario: Navigate to Home page
    Given I view the home page

  Scenario: Validate Quote component is visible
    When I navigate to '/testing/components-all'
    Then 'Quote_section' is visible

  Scenario: Validate elements of Quote are visible
    Given 'Quote_section' is visible
    Then 'Quote' is visible
    Then 'Quote_image' is visible
    * 'Quote_name' is visible
    * 'Quote_title' is visible

  Scenario: Validate typography Quote field of Quote component
    Given 'Quote' is visible
    Then The 'Quote' element has following CSS properties
      | font-size   | 40px                                       |
      | font-weight | 700                                        |
      | line-height | 48px                                       |
      | color       | rgb(25, 32, 46)                            |
      | font-family | Inter, sans-serif                          |

  Scenario: Validate typography of Quote Name field of Quote component
    Given 'Quote_name' is visible
    Then The 'Quote_name' element has following CSS properties
      | font-size   | 18px                                       |
      | font-weight | 700                                        |
      | line-height | 27px                                       |
      | color       | rgb(25, 32, 46)                            |
      | font-family | Inter, sans-serif                          |

  Scenario: Validate typography of Quote Title of Quote Item
    Given 'Quote_title' is visible
    Then The 'Quote_title' element has following CSS properties
      | font-size   | 18px                                       |
      | font-weight | 400                                        |
      | line-height | 27px                                       |
      | color       | rgb(102, 112, 133)                         |
      | font-family | Inter, sans-serif                          |

  Scenario: Validate styling of Quote Image
    Given 'Quote_image' is visible
    Then The 'Quote_image' element has following CSS properties
      | width         | 64px                                     |
      | height        | 64px                                     |
      | border-radius | 200px                                    |