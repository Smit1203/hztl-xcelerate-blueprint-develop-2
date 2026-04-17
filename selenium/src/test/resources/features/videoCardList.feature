@xcelerate @videoCardList
Feature:videoCardList:Validate Video card list component

  @clearcookies
  Scenario: Navigate to Home page
    Given I navigate to '/qa/cardlist'

  Scenario: Validate elements visible on video card list component
    Then 'VideoCardList_component' is visible
    * 'VideoCard_item' is visible
    * 'Card_item_image' is visible
    * 'Card_item_play_image' is visible
    * 'Card_item_eyebrow' is visible
    * 'Card_item_heading' is visible
    * 'Card_item_subheading' is visible
    * 'Card_item_description' is visible
    * 'Card_item_cta_button' is visible
    * Total count of 'Card_item' is 6

  Scenario: Validate functionality of card list component
    Then 'Card_item_cta_button' is clickable

  Scenario: Validate typography of Card_item_eyebrow
    Then The 'Card_item_eyebrow' element has following CSS properties
      | font-size   | 14px               |
      | font-weight | 600                |
      | line-height | 21px               |
      | text-align  | left               |
      | color       | rgb(102, 112, 133) |
      | font-family | Inter, sans-serif  |

  Scenario: Validate typography of Card_item_heading
    Then The 'Card_item_heading' element has following CSS properties
      | font-size   | 18px              |
      | font-weight | 700               |
      | line-height | 27px              |
      | text-align  | left              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |

  Scenario: Validate typography of Card_item_subheading
    Then The 'Card_item_subheading' element has following CSS properties
      | font-size   | 16px              |
      | font-weight | 600               |
      | line-height | 24px              |
      | text-align  | left              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |

  Scenario: Validate typography of Card_item_description
    Then The 'Card_item_description' element has following CSS properties
      | font-size   | 16px               |
      | font-weight | 400                |
      | line-height | 24px               |
      | text-align  | left               |
      | color       | rgb(102, 112, 133) |
      | font-family | Inter, sans-serif  |

  Scenario: Validate typography of Card_item_cta_button
    Then The 'Card_item_cta_button' element has following CSS properties
      | font-size   | 18px              |
      | font-weight | 700               |
      | line-height | 27px              |
      | text-align  | center            |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |

  Scenario: Validate size of Card_item_image
    Then The 'Card_item_image' element has a CSS 'height' property with value '161.031px'
    * The 'Card_item_image' element has a CSS 'width' property with value '284.5px'

  Scenario: Validate video modal popup
    When I click on 'Card_item_cta_button'
    Then 'VideoModal' is visible

  Scenario: Validate video modal popup elements
    Then Below 'Video_modal_elements' are visible
      | close-video-modal |
      | modal-title       |
      | modal-sub-heading |
      | modal-description |
      | video-iframe      |