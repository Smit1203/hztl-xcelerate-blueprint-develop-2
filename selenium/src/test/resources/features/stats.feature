@xcelerate @stats
Feature:stats:Validate Stats component

  @clearcookies
  Scenario: Navigate to Home page
    Given I view the home page

  Scenario: Validate elements visible on Stats component
    When I navigate to '/testing/components-all'
    Then 'Stats_component' is visible
    * 'Stat1_label' is visible
    * 'Stat1_interval' is visible
    * 'Stat1_quantifier' is visible
    * 'Stat1_description' is visible

  Scenario: Validate the typography of card1 of Stats Component
    Then The 'Stat1' element has following CSS properties
      | padding-left   | 16px                                       |
      | padding-right  | 16px                                       |
      | padding-top    | 16px                                       |
      | padding-bottom | 16px                                       |
      | text-align     | left                                       |

  Scenario: Validate typography of Label field of Stats Component
    Then 'Stat1_label' is visible
    * The 'Stat1_label' element has following CSS properties
      | font-size   | 16px                                       |
      | font-weight | 400                                        |
      | line-height | 24px                                       |
      | color       | rgb(102, 112, 133)                         |
      | font-family | Inter, "Inter Fallback"                    |
      | text-align  | left                                       |

  Scenario: Validate typography of Interval field of Stats Component
    Given 'Stat1_interval' is visible
    Then The 'Stat1_interval' element has following CSS properties
      | font-size   | 56px                                       |
      | font-weight | 700                                        |
      | line-height | 70px                                       |
      | color       | rgb(25, 32, 46)                            |
      | font-family | Inter, "Inter Fallback"                    |
      | text-align  | left                                       |

  Scenario: Validate typography of Quantifier field of Stats Component
    Given 'Stat1_quantifier' is visible
    Then The 'Stat1_quantifier' element has following CSS properties
      | font-size   | 56px                                       |
      | font-weight | 700                                        |
      | line-height | 70px                                       |
      | color       | rgb(25, 32, 46)                            |
      | font-family | Inter, "Inter Fallback"                    |
      | text-align  | left                                       |

  Scenario: Validate typography of Description field of Stats Component
    Then 'Stat1_description' is visible
    * The 'Stat1_description' element has following CSS properties
      | font-size   | 18px                                       |
      | font-weight | 400                                        |
      | line-height | 27px                                       |
      | color       | rgb(102, 112, 133)                         |
      | font-family | Inter, "Inter Fallback"                    |
      | text-align  | left                                       |