@xcelerate @feature
Feature:feature:Validate Feature component

  @clearcookies
  Scenario: Navigate to Test page
    When I view the home page

  Scenario: Validate elements Feature are visible
    Then 'Feature_component' is visible
    * 'Feature_image' is visible
    * 'Feature_eyebrow' is visible
    * 'Feature_icon' is visible
    * 'Feature_headline' is visible
    * 'Feature_subheadline' is visible
    * 'Feature_description' is visible
    * 'Feature_primary_cta' is visible
    * 'Feature_secondary_cta' is visible

  Scenario: Validate rendering size of Image
    Then The 'Feature_image' element has following CSS properties
      | width       | 1284.8px                     |
      | height      | 555.213px                    |

  Scenario: Validate typography of Eyebrow field of Feature Component
    Then The 'Feature_eyebrow' element has following CSS properties
      | font-size   | 18px                         |
      | font-weight | 700                          |
      | line-height | 27px                         |
      | color       | rgb(25, 32, 46)              |
      | font-family | Inter, sans-serif            |

  Scenario: Validate rendering size of Icon
    Then The 'Feature_icon' element has following CSS properties
      | width       | 125px                     |
      | height      | 39.2125px                 |

  Scenario: Validate typography of Headline field of Feature Component
    Then The 'Feature_headline' element has following CSS properties
      | font-size   | 48px                         |
      | font-weight | 700                          |
      | line-height | 48px                         |
      | color       | rgb(25, 32, 46)              |
      | font-family | Inter, sans-serif            |

  Scenario: Validate typography of Sub-Headline field of Feature Component
    Then The 'Feature_subheadline' element has following CSS properties
      | font-size   | 32px                         |
      | font-weight | 700                          |
      | line-height | 48px                         |
      | color       | rgb(102, 112, 133)           |
      | font-family | Inter, sans-serif            |

  Scenario: Validate typography of Description field of Feature Component
    Then The 'Feature_description' element has following CSS properties
      | font-size   | 18px                         |
      | font-weight | 400                          |
      | line-height | 27px                         |
      | color       | rgb(102, 112, 133)           |
      | font-family | Inter, sans-serif            |

  Scenario: Validate typography of Primary CTA of Feature Item
    Then The 'Feature_primary_cta' element has following CSS properties
      | font-size        | 18px                                         |
      | font-weight      | 600                                          |
      | line-height      | 18px                                         |
      | color            | rgb(255, 255, 255)                           |
      | font-family      | Inter, "Inter Fallback"                      |
      | background-color | rgb(52, 64, 84)                              |
      | width            | 180.45px                                     |
      | height           | 56px                                         |

  Scenario: Validate typography of Secondary CTA of Feature Item
    Then The 'Feature_secondary_cta' element has following CSS properties
      | font-size        | 18px                                       |
      | font-weight      | 600                                        |
      | line-height      | 18px                                       |
      | color            | rgb(25, 32, 46)                            |
      | font-family      | Inter, "Inter Fallback"                    |
      | background-color | rgba(25, 32, 46, 0.00)                     |
      | width            | 213.887px                                  |
      | height           | 56px                                       |


  Scenario: Validate the Hover functionality of Primary CTA of Feature Component
    When I hover mouse over 'Feature_primary_cta'
    * I wait for '1' seconds
    Then The 'Feature_primary_cta' element has following CSS properties
      | background-color | rgb(25, 32, 46)         |

  Scenario: Validate the Hover functionality of Secondary CTA of Feature Component
    When I hover mouse over 'Feature_secondary_cta'
    Then The 'Feature_secondary_cta' element has following CSS properties
      | background-color | rgba(0, 0, 0, 0.08)     |

  Scenario: Validate the click functionality of Primary CTA of Feature component
    Given 'Feature_primary_cta' is visible
    Then 'Feature_primary_cta' is clickable
    * Link on 'Feature_primary_cta' having response code 200 ok

  Scenario: Validate the click functionality of Secondary CTA of Feature component
    Given 'Feature_secondary_cta' is visible
    Then 'Feature_secondary_cta' is clickable
    * Link on 'Feature_secondary_cta' having response code 200 ok
