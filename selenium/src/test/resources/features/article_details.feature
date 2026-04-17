@xcelerate @articledetail
Feature:article_details:Validate article detail component

  @clearcookies
  Scenario: Navigate to article detail page
    When I navigate to '/articles'
    And I click on 'Popular_article_card_cta'

  Scenario: Validate components on article detail  pages
    Then 'Article_category_content_component' is visible
    * 'Relates_articles_component' is visible

  Scenario: Validate elements on Article content component
    Given 'Article_category_content_component' is visible
    Then Below 'labels_on_article_content' are visible
      | author-name    |
      | published-date |
      | category       |
    And 'Article_description' is visible
    And 'Article_tags' is visible

  Scenario: Validate elements on related Articles component
    Given 'Relates_articles_component' is visible
    Then 'Related_article_title' is visible
    And 'Related_article_card' is visible
    * Below 'Related_article_card_elements' are visible
      | title                |
      | description          |
      | date                 |
      | cta                  |
      | category             |
      | article-tags-wrapper |
    And 'Related_article_card_image' is visible


  Scenario: Validate typography of article content component
    Then The 'Article_content_author_name_label' element has following CSS properties
      | font-size        | 14px              |
      | font-weight      | 600               |
      | line-height      | 21px              |
      | color            | rgb(52, 64, 84)   |
      | background-color | rgb(0, 0, 0)      |
      | font-family      | Inter, sans-serif |
    Then The 'Article_content_author_name_value' element has following CSS properties
      | font-size        | 18px              |
      | font-weight      | 400               |
      | line-height      | 27px              |
      | color            | rgb(25, 32, 46)   |
      | background-color | rgb(0, 0, 0)      |
      | font-family      | Inter, sans-serif |
    Then The 'Article_description' element has following CSS properties
      | font-size        | 16px              |
      | font-weight      | 400               |
      | line-height      | 24px              |
      | color            | rgb(0, 0, 0)      |
      | background-color | rgb(0, 0, 0)      |
      | font-family      | Inter, sans-serif |
    Then The 'Article_tags' element has following CSS properties
      | font-size        | 12px               |
      | font-weight      | 400                |
      | line-height      | 18px               |
      | color            | rgb(25, 32, 46)    |
      | background-color | rgb(236, 233, 254) |
      | font-family      | Inter, sans-serif  |


  Scenario: Validate typography of elements on article listing component
    Then The 'Related_article_title' element has following CSS properties
      | font-size   | 32px              |
      | font-weight | 700               |
      | line-height | 48px              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |
    Then The 'Related_article_listing_card_title' element has following CSS properties
      | font-size   | 16px              |
      | font-weight | 700               |
      | line-height | 24px              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |
    * The 'Related_article_listing_card_description' element has following CSS properties
      | font-size   | 14px               |
      | font-weight | 400                |
      | line-height | 21px               |
      | color       | rgb(102, 112, 133) |
      | font-family | Inter, sans-serif  |
    * The 'Related_article_listing_card_cta' element has following CSS properties
      | font-size   | 16px              |
      | font-weight | 600               |
      | line-height | 20px              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |
    * The 'Related_article_listing_card_category_tag' element has following CSS properties
      | font-size   | 12px              |
      | font-weight | 600               |
      | line-height | 18px              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |
    * The 'Related_article_card_image' element has following CSS properties
      | height | 355.219px |
      | width  | 631.5px   |