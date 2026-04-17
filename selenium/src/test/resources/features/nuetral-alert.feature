@xcelerate @alert @neutral-alert
Feature:neutral-alert:Validate Neutral Alert component

  @clearcookies
  Scenario: Validate Neutral Alert component is visible
    When I navigate to '/testing/components-all'
    Then 'Neutral_alert' is visible
    * The 'Neutral_alert' element has following CSS properties
      | background-color | rgb(31, 105, 255)   |

  Scenario: Validate elements of Neutral Alert are visible
    Given 'Neutral_alert' is visible
    Then 'Neutral_alert_icon' is visible
    * 'Neutral_alert_text' is visible
    * 'Neutral_alert_cta' is visible
    * 'Neutral_alert_cta_arrow' is disappeared
    * 'Neutral_alert_dismiss' is visible

  Scenario: Validate typography of Alert Text field of Neutral Alert component
    Given 'Neutral_alert_text' is visible
    Then The 'Neutral_alert_text' element has following CSS properties
      | font-size   | 16px                                       |
      | font-weight | 400                                        |
      | line-height | 24px                                       |
      | color       | rgb(255, 255, 255)                         |
      | font-family | Inter, sans-serif                          |

  Scenario: Validate typography of Alert CTA Link field of Neutral Alert component
    Given 'Neutral_alert_cta' is visible
    Then The 'Neutral_alert_cta' element has following CSS properties
      | font-size   | 16px                                       |
      | font-weight | 600                                        |
      | line-height | 24px                                       |
      | color       | rgb(255, 255, 255)                         |
      | font-family | Inter, sans-serif                          |

  Scenario: Validate hover functionality of Alert CTA Link field of Neutral Alert component
    When I hover mouse over 'Neutral_alert_cta'
    Then 'Neutral_alert_cta_arrow' is visible

  Scenario: Validate Click functionality of Alert CTA Link field of Neutral Alert component
    Given 'Neutral_alert_cta' is visible
    Then 'Neutral_alert_cta' is clickable
    * Link on 'Neutral_alert_cta' having response code 200 ok

  Scenario: Validate the visibility of Neutral Alert on any other page
    Given I view the home page
    Then 'Neutral_alert' is visible

  Scenario: Validate Dismiss functionality of Neutral Alert component
    Given 'Neutral_alert_dismiss' is visible
    When I click on 'Neutral_alert_dismiss'
    Then 'Neutral_alert' is disappeared

  Scenario: Validate that dismissed Neutral Alert is not visible on page after refresh
    When I refresh the current page
    Then 'Neutral_alert' is disappeared

  Scenario: Validate that dismissed Neutral Alert is not visible on any other page
    When I navigate to '/testing/components-all'
    Then 'Neutral_alert' is disappeared
