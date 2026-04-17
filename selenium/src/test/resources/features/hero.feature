@xcelerate @hero
Feature:hero: Validate Hero component

  @clearcookies
  Scenario: Navigate to Home page
    Given I view the home page

  Scenario: Navigate to test page where Hero component is configured
    When I navigate to '/testing/components-all'

  Scenario: Validate elements of Hero component is visible
    Then 'Hero_component' is visible
    * 'Hero_image' is visible
    * 'Hero_eyebrow' is visible
    * 'Hero_headline' is visible
    * 'Hero_subtitle' is visible
    * 'Hero_description' is visible
    * 'Hero_primary_cta' is visible
    * 'Hero_secondary_cta' is visible

  Scenario: Validate typography of Headline field of Hero component
    Given 'Hero_eyebrow' is visible
    * The 'Hero_eyebrow' element has following CSS properties
      | font-size      | 18px                     |
      | font-weight    | 700                      |
      | line-height    | 27px                     |
      | letter-spacing | 2.7px                    |
      | text-transform | uppercase                |
      | color          | rgb(25, 32, 46)          |
      | font-family    | Inter, sans-serif        |

  Scenario: Validate typography of Headline field of Hero component
    Given 'Hero_headline' is visible
    * The 'Hero_headline' element has following CSS properties
      | font-size   | 48px                     |
      | font-weight | 700                      |
      | line-height | 60px                     |
      | color       | rgb(25, 32, 46)          |
      | font-family | Inter, sans-serif        |

  Scenario: Validate typography of Headline field of Hero component
    Given 'Hero_subtitle' is visible
    * The 'Hero_subtitle' element has following CSS properties
      | font-size   | 32px                     |
      | font-weight | 700                      |
      | line-height | 48px                     |
      | color       | rgb(102, 112, 133)       |
      | font-family | Inter, sans-serif        |

  Scenario: Validate typography of Headline field of Hero component
    Given 'Hero_description' is visible
    * The 'Hero_description' element has following CSS properties
      | font-size   | 18px                     |
      | font-weight | 400                      |
      | line-height | 27px                     |
      | color       | rgb(102, 112, 133)       |
      | font-family | Inter, sans-serif        |

  Scenario: Validate typography of Primary CTA of Hero Item
    Given 'Hero_primary_cta' is visible
    Then The 'Hero_primary_cta' element has following CSS properties
      | font-size        | 18px                                         |
      | font-weight      | 600                                          |
      | line-height      | 18px                                         |
      | color            | rgb(255, 255, 255)                           |
      | font-family      | Inter, "Inter Fallback"                      |
      | background-color | rgb(52, 64, 84)                              |
      | width            | 173.975px                                    |
      | height           | 56px                                         |

  Scenario: Validate typography of Primary CTA of Hero Item
    Given 'Hero_secondary_cta' is visible
    Then The 'Hero_secondary_cta' element has following CSS properties
      | font-size        | 18px                                       |
      | font-weight      | 600                                        |
      | line-height      | 18px                                       |
      | color            | rgb(25, 32, 46)                            |
      | font-family      | Inter, "Inter Fallback"                    |
      | background-color | rgb(25, 32, 46)                            |
      | width            | 162.425px                                  |
      | height           | 56px                                       |

  Scenario: Validate the Hover functionality of Primary CTA of Hero Component
    When I hover mouse over 'Hero_primary_cta'
    * I wait for '1' seconds
    Then The 'Hero_primary_cta' element has following CSS properties
      | background-color | rgb(52, 64, 84)         |

  Scenario: Validate the Hover functionality of Secondary CTA of Hero Component
    When I hover mouse over 'Hero_secondary_cta'
    Then The 'Hero_secondary_cta' element has following CSS properties
      | background-color | rgb(25, 32, 46)        |

  Scenario: Validate the click functionality of Primary CTA of Hero component
    Given 'Hero_primary_cta' is visible
    Then 'Hero_primary_cta' is clickable
    * Link on 'Hero_primary_cta' having response code 200 ok

  Scenario: Validate the click functionality of Secondary CTA of Hero component
    Given 'Hero_secondary_cta' is visible
    Then 'Hero_secondary_cta' is clickable
    * Link on 'Hero_secondary_cta' having response code 200 ok