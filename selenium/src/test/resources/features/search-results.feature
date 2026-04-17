@xcelerate @search
Feature: search-results: Validate Search Results page functionality

  @clearcookies
  Scenario: Navigate to Search textbox
    Given I view the home page
    When I wait and click on 'Search_icon'
    Then 'Search_textbox' is visible

  Scenario: Validate the search results page
    When I enter 'technology' into 'Search_textbox' field
    And I click on 'Go_button'
    Then Current URL contains '/search?q=technology'

  Scenario: Validate Search Results page components are visible
    Then 'search_results_page' component exists on the page
    * 'page_title' is visible
    * 'search_results_count' is visible
    * 'search_field_container' is visible
    * 'sort_container' is visible
    * 'filters_container' is visible
    * 'search_results_container' is visible

  Scenario: Validate search field functionality
    Then 'search_input' is visible
    * 'search_icon' is visible
    * 'search_clear_button' is visible
    * 'search_clear_button' is clickable

  Scenario: Validate sort dropdown functionality
    Then 'sort_label' is visible
    * 'sort_dropdown_button' is visible
    * 'sort_dropdown_button' is clickable
    When I wait and click on 'sort_dropdown_button'
    Then 'sort_dropdown_menu' is visible
    * Below 'sort_options' are visible
      | Recommended |
      | Title A-Z   |
      | Title Z-A   |

  Scenario: Validate sort dropdown selection
    When I click on 'sort_dropdown_button'
    * I wait and click on 'sort_title_a_z'
    Then 'sort_dropdown_button' is visible

  Scenario: Validate filters section visibility
    Then 'filters_label' is visible
    * 'content_types_filter' is visible
    * 'categories_filter' is visible
    When I click on 'content_types_filter'
    Then 'content_type_articles_checkbox' is visible
    * 'content_type_articles_label' is visible
    When I click on 'content_type_articles_checkbox'
    Then 'filters_clear_all' is visible
    * 'search_results_count' value is changed

  Scenario: Validate filter chips functionality
    Given 'filter_chips_container' is visible
    Then 'filter_chip' is visible
    * 'filter_chip_text' is visible
    * 'filter_chip_close' is visible
    * 'filter_chip_close' is clickable

  Scenario: Validate typography of search results count
    Then The 'search_results_count' element has following CSS properties
      | font-size   | 16px               |
      | font-weight | 700                |
      | line-height | 24px               |
      | color       | rgb(25, 32, 46) |
      | font-family | Inter, sans-serif  |

  Scenario: Validate typography of page title
    Then The 'page_title' element has following CSS properties
      | font-size   | 48px              |
      | font-weight | 700               |
      | line-height | 72px              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |

  Scenario: Validate typography of result headline
    Then The 'result_headline_link' element has following CSS properties
      | font-size   | 18px              |
      | font-weight | 700               |
      | line-height | 27px            |
      | color       | rgb(31, 105, 255) |
      | font-family | Inter, sans-serif |

  Scenario: Validate typography of result description
    Then The 'result_description_text' element has following CSS properties
      | font-size   | 16px               |
      | font-weight | 400                |
      | line-height | 24px               |
      | color       | rgb(102, 112, 133) |
      | font-family | Inter, sans-serif  |

  Scenario: Validate typography of filter labels
    When The 'content_type_articles_label' element has following CSS properties
      | font-size   | 16px              |
      | font-weight | 600               |
      | line-height | 24px              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |

  Scenario: Validate Clear All filters functionality
    When 'filters_clear_all' is clickable
    * I click on 'filters_clear_all'
    Then 'filter_chip' is disappeared

  Scenario: Validate search result cards are visible
    Then Total count of 'search_result_card' is 17
    * 'search_result_content' is visible
    * 'result_category_label' is visible
    * 'result_description_text' is visible
    * 'result_headline_link' is clickable
    * 'result_image' is visible
    * 'result_date_text' is visible

  Scenario: Validate pagination section visibility
    Then 'pagination_container' is visible
    * 'pagination_previous' is visible
    * 'pagination_next' is visible
    * 'pagination_numbers' is visible
    * The 'data-current' attribute of 'pagination_page_1' element is 'true'

  Scenario: Validate search result headline navigation
    When I click on 'result_headline_link'
    Then Current URL contains '/article'

#  Scenario: Validate pagination navigation arrows
#    Then 'pagination_previous' is clickable
#    * 'pagination_next' is clickable
#  Scenario: Validate pagination navigation functionality
#    When I click on 'pagination_next'
#    Then Current URL contains 'page=2'
#
#  Scenario: Validate pagination page number navigation
#    When I click on 'pagination_page_3'
#    Then Current URL contains 'page=3'
#    * 'pagination_page_3' is active

#  Scenario: Validate disabled previous arrow on first page
#    Given I navigate to '/search?q=test&page=1'
#    Then 'pagination_previous' field is disabled

  Scenario: Validate no results scenario
    Given I navigate to '/search?q=nonexistentterm123'
    * I wait for page load
    Then 'no_results_message' is visible
