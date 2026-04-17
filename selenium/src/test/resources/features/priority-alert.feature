@xcelerate @alert @priority-alert
Feature:priority-alert:Validate Priority Alert component

  @clearcookies
  Scenario: Validate Priority Alert component is visible
    When I navigate to '/testing/components-all'
    Then 'Priority_alert' is visible
    * The 'Priority_alert' element has following CSS properties
      | background-color | rgb(229, 28, 0) |

  Scenario: Validate elements of Priority Alert are visible
    Given 'Priority_alert' is visible
    Then 'Priority_alert_icon' is visible
    * 'Priority_alert_text' is visible
    * 'Priority_alert_cta' is visible
    * 'Priority_alert_cta_arrow' is disappeared
    * 'Priority_alert_dismiss' is visible

  Scenario: Validate typography of Alert Text field of Priority Alert component
    Given 'Priority_alert_text' is visible
    Then The 'Priority_alert_text' element has following CSS properties
      | font-size   | 16px                                       |
      | font-weight | 400                                        |
      | line-height | 24px                                       |
      | color       | rgb(255, 255, 255)                         |
      | font-family | Inter, sans-serif                          |

  Scenario: Validate typography of Alert CTA Link field of Priority Alert component
    Given 'Priority_alert_cta' is visible
    Then The 'Priority_alert_cta' element has following CSS properties
      | font-size   | 16px                                       |
      | font-weight | 600                                        |
      | line-height | 24px                                       |
      | color       | rgb(255, 255, 255)                         |
      | font-family | Inter, sans-serif                          |

  Scenario: Validate Hover functionality of Alert CTA Link field of Priority Alert component
    When I hover mouse over 'Priority_alert_cta'
    Then 'Priority_alert_cta_arrow' is visible

  Scenario: Validate Click functionality of Alert CTA Link field of Priority Alert component
    Given 'Priority_alert_cta' is visible
    Then 'Priority_alert_cta' is clickable
    * Link on 'Priority_alert_cta' having response code 200 ok

  Scenario: Validate the visibility of Priority Alert on any other page
    Given I view the home page
    Then 'Priority_alert' is visible

  Scenario: Validate Dismiss functionality of Priority Alert component
    Given 'Priority_alert_dismiss' is visible
    When I click on 'Priority_alert_dismiss'
    Then 'Priority_alert' is disappeared

  Scenario: Validate that dismissed Priority Alert is not visible on page after refresh
    When I refresh the current page
    Then 'Priority_alert' is disappeared

  Scenario: Validate that dismissed Priority Alert is not visible on any other page
    When I navigate to '/testing/components-all'
    Then 'Priority_alert' is disappeared
