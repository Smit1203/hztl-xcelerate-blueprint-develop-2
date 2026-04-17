@xcelerate @contact-us
Feature:contact-us:Validate the Contact us form

  @clearcookies
  Scenario: Navigate to contact us form
    Given I navigate to '/contact-us'
    Then 'Contact_us_form' is visible

  Scenario: Validate elements visible on the form
    Then Below 'field_labels' are visible
      | First Name |
      | Last Name  |
      | Email      |
      | Phone      |
      | Message    |
    * 'Submit_button' is visible

  Scenario: Validate the validation message for mandatory fields
    Given 'Submit_button' is visible
    When I click on 'Submit_button'
    Then 'First_Name_field_validation_message' is visible
    Then 'Last_Name_field_validation_message' is visible
    Then 'Email_field_validation_message' is visible

  Scenario: Validate typography of Field labels
    Given 'First_Name_label' is visible
    Then The 'First_Name_label' element has following CSS properties
      | font-size   | 14px              |
      | font-weight | 600               |
      | line-height | 21px              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |

  Scenario: Validate typography of help text labels
    Given 'First_Name_helptext' is visible
    Then The 'First_Name_helptext' element has following CSS properties
      | font-size   | 14px              |
      | font-weight | 400               |
      | line-height | 21px              |
      | color       | rgb(25, 32, 46)   |
      | font-family | Inter, sans-serif |

  Scenario: Validate typography of validation message
    Given 'First_Name_field_validation_message' is visible
    Then The 'First_Name_field_validation_message' element has following CSS properties
      | font-size   | 13px              |
      | font-weight | 400               |
      | line-height | 21px              |
      | color       | rgb(229, 28, 0)   |
      | font-family | Inter, sans-serif |

  Scenario: Validate size of submit button
    Given 'Submit_button' is visible
    Then The 'Submit_button' element has following CSS properties
      | height | 63px      |
      | width  | 157.234px |

  Scenario: Validate the functionality of the form by submitting the form
    When I enter 'test_first_name' into 'first_name_textbox' field
    * I enter 'test_last_name' into 'last_name_textbox' field
    * I enter 'test@automation.com' into 'email_textbox' field
    * I click on 'Submit_button'
    Then 'Success_message' is visible