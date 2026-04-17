@xcelerate @cardlist
Feature:cardlist:Validate card list component

  @clearcookies
  Scenario: Navigate to Home page
    Given I navigate to '/testing/components-all'

  Scenario: Validate elements visible on card list component
    Then 'cardList_component' is visible
    * 'Card_item' is visible
    * 'Card_item_image' is visible
    * 'Card_item_eyebrow' is visible
    * 'Card_item_heading' is visible
    * 'Card_item_subheading' is visible
    * 'Card_item_description' is visible
    * 'Card_item_primary_cta_button' is visible
    * 'Card_item_secondary_cta_link' is visible
    * Total count of 'Card_item' is 3

  Scenario: Validate functionality of card list component
    Then 'Card_item_primary_cta_button' is clickable
    * 'Card_item_secondary_cta_link' is clickable

  Scenario: Validate typography of Card_item_eyebrow
    Then The 'Card_item_eyebrow' element has following CSS properties
      | font-size   | 14px                                    |
      | font-weight | 600                                     |
      | line-height | 21px                                    |
      | text-align  | left                                    |
      | color       | rgb(102, 112, 133)                      |
      | font-family | __Inter_e8ce0c, __Inter_Fallback_e8ce0c |

  Scenario: Validate typography of Card_item_heading
    Then The 'Card_item_heading' element has following CSS properties
      | font-size   | 18px                                    |
      | font-weight | 700                                     |
      | line-height | 27px                                    |
      | text-align  | left                                    |
      | color       | rgb(25, 32, 46)                         |
      | font-family | __Inter_e8ce0c, __Inter_Fallback_e8ce0c |

  Scenario: Validate typography of Card_item_subheading
    Then The 'Card_item_subheading' element has following CSS properties
      | font-size   | 16px                                    |
      | font-weight | 600                                     |
      | line-height | 24px                                    |
      | text-align  | left                                    |
      | color       | rgb(25, 32, 46)                         |
      | font-family | __Inter_e8ce0c, __Inter_Fallback_e8ce0c |

  Scenario: Validate typography of Card_item_description
    Then The 'Card_item_description' element has following CSS properties
      | font-size   | 16px                                    |
      | font-weight | 400                                     |
      | line-height | 24px                                    |
      | text-align  | left                                    |
      | color       | rgb(102, 112, 133)                      |
      | font-family | __Inter_e8ce0c, __Inter_Fallback_e8ce0c |

  Scenario: Validate typography of Card_item_primary_cta_button
    Then The 'Card_item_primary_cta_button' element has following CSS properties
      | font-size        | 18px                                    |
      | font-weight      | 600                                     |
      | line-height      | 18px                                    |
      | text-align       | center                                  |
      | color            | rgb(255, 255, 255)                      |
      | background-color | rgb(52, 64, 84)                         |
      | font-family      | __Inter_e8ce0c, __Inter_Fallback_e8ce0c |

  Scenario: Validate typography of Card_item_secondary_cta_link
    Then The 'Card_item_secondary_cta_link' element has following CSS properties
      | font-size        | 18px                                    |
      | font-weight      | 600                                     |
      | line-height      | 18px                                    |
      | text-align       | center                                  |
      | color            | rgb(25, 32, 46)                         |
      | background-color | rgb(25, 32, 46)                         |
      | font-family      | __Inter_e8ce0c, __Inter_Fallback_e8ce0c |

  Scenario: Validate size of Card_item_image
    Then The 'Card_item_image' element has a CSS 'height' property with value '192.047px'
    * The 'Card_item_image' element has a CSS 'width' property with value '339.656px'

  Scenario: Validate size of Card_item_primary_cta_button
    Then The 'Card_item_primary_cta_button' element has a CSS 'height' property with value '56px'
    * The 'Card_item_primary_cta_button' element has a CSS 'width' property with value '151.172px'

  Scenario: Validate size of Card_item_secondary_cta_link
    Then The 'Card_item_secondary_cta_link' element has a CSS 'height' property with value '56px'
    * The 'Card_item_secondary_cta_link' element has a CSS 'width' property with value '139.234px'