@xcelerate @articlelisting
Feature:article_listing:Validate article listing component

  @clearcookies
  Scenario: Navigate to article page
    When I navigate to '/articles'

  Scenario: Validate components on article pages
    Then 'Article_category_tabs_component' is visible
    * 'Article_listing_component' is visible
    * 'Popular_article_component' is visible

  Scenario: Validate elements on Article category tabs component
    Then 'All_article_tab' is visible
    * 'All_article_tab' is active
    * Below 'tabs' are visible
      | Banking      |
      | Credit Cards |
      | Loans        |
      | News         |

  Scenario: Validate typography of article tabs component
    Then The 'All_article_tab' element has following CSS properties
      | font-size        | 16px               |
      | font-weight      | 600                |
      | line-height      | 20px               |
      | color            | rgb(255, 255, 255) |
      | background-color | rgb(0, 78, 235)    |
      | font-family      | Inter, sans-serif  |
    * I hover mouse over 'All_article_tab'
    * The 'All_article_tab' element has following CSS properties
      | color            | rgb(0, 78, 235)    |
      | background-color | rgb(239, 244, 255) |

  Scenario: Validate popular article component
    Then 'Popular_article_component' is visible
    * 'Popular_article_title' is visible
    * 'Popular_article_card_list' is visible
    * 'Popular_article_card_title' is visible
    * 'Popular_article_card_image' is visible
    * 'Popular_article_card_category_tag' is visible
    * 'Popular_article_card_description' is visible
    * 'Popular_article_card_cta' is visible

  Scenario: Validate article listing component
    Given 'Article_listing_component' is visible
    Then 'Article_listing_title' is visible
    * 'Article_listing_card' is visible
    * 'Article_listing_card_title' is visible
    * 'Article_listing_card_description' is visible
    * 'Article_listing_card_date' is visible
    * 'Article_listing_card_image' is visible
    * 'Article_listing_card_category_tag' is visible
    * 'Article_listing_card_cta' is visible
    * 'Load_more_cta_button' is visible

  Scenario: Validate typography of elements on article listing component
    Then The 'Article_listing_title' element has following CSS properties
      | font-size   | 32px              |
      | font-weight | 700               |
      | line-height | 38.4px            |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |
    Then The 'Article_listing_card_title' element has following CSS properties
      | font-size   | 16px              |
      | font-weight | 700               |
      | line-height | 24px              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |
    * The 'Article_listing_card_description' element has following CSS properties
      | font-size   | 14px               |
      | font-weight | 400                |
      | line-height | 21px               |
      | color       | rgb(102, 112, 133) |
      | font-family | Inter, sans-serif  |
    * The 'Article_listing_card_cta' element has following CSS properties
      | font-size   | 16px              |
      | font-weight | 600               |
      | line-height | 20px              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |
    * The 'Article_listing_card_category_tag' element has following CSS properties
      | font-size   | 12px              |
      | font-weight | 600               |
      | line-height | 18px              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |
    * The 'Load_more_cta_text' element has following CSS properties
      | font-size   | 18px              |
      | font-weight | 600               |
      | line-height | 24px              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |
    * The 'Article_listing_card_image' element has following CSS properties
      | width  | 284.5px   |
      | height | 160.031px |
    * The 'Load_more_cta_button' element has following CSS properties
      | width  | 175.016px |
      | height | 60px      |

  Scenario: Validate functionality of Load more button
    Given Total count of 'Article_listing_card' is 12
    When I click on 'Load_more_cta_button'
    Then I wait for page load
    Then Total count of 'Article_listing_card' is 24

  Scenario: Validate functionality of Article category tabs
    When  'Banking_article_tab' is clickable
    * I click on 'Banking_article_tab'
    Then 'Banking_type_article' is visible