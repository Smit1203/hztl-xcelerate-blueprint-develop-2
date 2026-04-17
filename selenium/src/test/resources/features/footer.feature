@xcelerate @footer
Feature:footer:Validate Footer component

  @clearcookies
  Scenario: Navigate to Home page
    Given I view the home page

  Scenario: Validate elements visible on Footer component
    Then 'Footer_component' is visible
    * 'Footer_brand_logo' is visible
    * 'Supporting_text' is visible
    *  Below 'Section_labels' are visible
      | About      |
      | Resources  |
      | Support    |
      | Legal      |
      | Why BrandX |
    * 'Copyright_text' is visible

  Scenario: Validate all the links on the footer component
    Then Links on 'footer_links' having response code 200 ok

  Scenario: Validate typography of section label field
    Then The 'About_section_label' element has following CSS properties
      | font-size   | 14px                     |
      | font-weight | 600                      |
      | line-height | 21px                     |
      | color       | rgb(102,102,102)         |
      | font-family | "Modern Era", sans-serif |

  Scenario: Validate typography of link label field
    Then The 'footer_link' element has following CSS properties
      | font-size   | 16px                     |
      | font-weight | 600                      |
      | line-height | 20px                     |
      | color       | rgb(25, 32, 46)          |
      | font-family | "Modern Era", sans-serif |