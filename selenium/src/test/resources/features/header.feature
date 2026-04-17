@xcelerate @header
Feature: Header: Validate Header component

  @clearcookies
  Scenario: Navigate to site with Header component configured
    Given I view the home page
    * I wait for page load
    Then 'Header' component exists on the page

  Scenario: Validate key visible elements in the header
    Then 'Header-logo' is visible
    * Below 'menu-items' are visible
      | Services  |
      | Work      |
      | About Us  |
      | Docs      |
      | Code Repo |
    * 'Language Selector' is visible
  #  * 'search' is visible

  Scenario: Validate typography of Service menu item
    Then The 'menu-item-Service' element has following CSS properties
      | font-size   | 16px              |
      | line-height | 24px              |
      | font-weight | 600               |
      | color       | #19202E           |
      | font-family | Inter, sans-serif |

  Scenario: Validate typography of mega menu title text
    When I hover mouse over 'menu-item-Service'
    Then 'mega-menu-category-title' is visible
    * 'mega-menu-item-Services' is visible
    * The 'mega-menu-category-title' element has following CSS properties
      | font-size   | 14px                   |
      | line-height | 20px                   |
      | font-weight | 600                    |
      | color       | rgba(102, 112, 133, 1) |
      | font-family | Inter, sans-serif      |
    * The 'mega-menu-item-Services' element has following CSS properties
      | font-size   | 16px              |
      | line-height | 24px              |
      | font-weight | 600               |
      | color       | #19202E           |
      | font-family | Inter, sans-serif |

  Scenario: Validate Learn more link and fallback title in feature section
    When I hover mouse over 'menu-item-Service'
    Then 'feature image' component exists on the page
    * 'Feature image title' is visible
    * 'Feature image description' is visible
    * 'Feature image cta' is visible
    * 'Feature image cta' is clickable

  Scenario: Validate Language Selector interaction
    When 'Language Selector' is clickable
    * I click on 'Language Selector'
    Then The 'aria-expanded' attribute of 'Language Selector' element is 'true'

  Scenario: Validate logo alt text and link
    Then The 'alt' attribute of 'Header-logo' element is 'Brand X logo'
    * The 'href' attribute of 'Header-logo-link' element is '/'

#  Scenario: Validate all primary and megamenu links return 200 OK
#    Then Links on 'primary navigation' having response code 200 ok
#    And Links on 'mega menu - Products' having response code 200 ok

  Scenario: Validate accessibility roles and aria attributes
    Then The 'role' attribute of 'header nav' element is 'menubar'
    * The 'role' attribute of 'menu-item-Service' element is 'menuitem'
    * The 'aria-haspopup' attribute of 'menu-item-Service' element is 'true'
