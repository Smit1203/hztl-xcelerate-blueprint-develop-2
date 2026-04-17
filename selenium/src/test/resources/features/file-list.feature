@xcelerate @file-list
Feature:file-list:Validate File List component

  @clearcookies
  Scenario: Navigate to Home page
    Given I view the home page

  Scenario: Validate File List component is visible
    When I navigate to '/testing/components-all'
    Then 'File_list_section' is visible

  Scenario: Validate elements of File List are visible
    Given 'File_list_section' is visible
    Then 'File_list_heading' is visible
    * 'File_list_description' is visible
    * 'File_list_cta' is visible
    * 'File1_link' is visible
    * 'File1_name' is visible
    * 'File2_link' is visible
    * 'File2_name' is visible
    * 'File2_size' is visible
    * 'File2_extension' is visible
    * 'File3_link' is visible
    * 'File3_name' is visible
    * 'File3_size' is visible
    * 'File3_extension' is visible
    * 'File4_link' is visible
    * 'File4_name' is visible
    * 'File4_size' is visible
    * 'File4_extension' is visible

  Scenario: Validate typography of Heading field of File List component
    Then 'File_list_heading' is visible
    * The 'File_list_heading' element has following CSS properties
      | font-size   | 48px                              |
      | font-weight | 700                               |
      | line-height | 60px                              |
      | color       | rgb(25, 32, 46)                   |
      | font-family | Inter, sans-serif                 |

  Scenario: Validate typography of Description field of File List component
    Then 'File_list_description' is visible
    * The 'File_list_description' element has following CSS properties
      | font-size   | 18px                              |
      | font-weight | 400                               |
      | line-height | 27px                              |
      | color       | rgb(25, 32, 46)                   |
      | font-family | Inter, sans-serif                 |

  Scenario: Validate typography of Primary CTA of File List Item
    Then The 'File_list_cta' element has following CSS properties
      | font-size        | 18px                         |
      | font-weight      | 600                          |
      | line-height      | 18px                         |
      | color            | rgb(255, 255, 255)           |
      | font-family      | Inter, "Inter Fallback"      |
      | background-color | rgb(52, 64, 84)              |
      | width            | 150.781px                    |
      | height           | 56px                         |

  Scenario: Validate the Hover functionality of Primary CTA of File List Component
    When I hover mouse over 'File_list_cta'
    * I wait for '1' seconds
    Then The 'File_list_cta' element has following CSS properties
      | background-color | rgb(25, 32, 46)              |

  Scenario: Validate typography of File name of File List component
    Given 'File2_name' is visible
    * The 'File2_name' element has following CSS properties
      | font-size   | 14px                              |
      | font-weight | 700                               |
      | line-height | 21px                              |
      | color       | rgb(31, 105, 255)                 |
      | font-family | Inter, "Inter Fallback"           |

  Scenario: Validate typography of File size text of File List component
    Given 'File2_size' is visible
    * The 'File2_size' element has following CSS properties
      | font-size   | 14px                              |
      | font-weight | 400                               |
      | line-height | 21px                              |
      | color       | rgb(102, 112, 133)                |
      | font-family | Inter, "Inter Fallback"           |

  Scenario: Validate typography of File size text of File List component
    Given 'File2_extension' is visible
    * The 'File2_extension' element has following CSS properties
      | font-size   | 14px                              |
      | font-weight | 400                               |
      | line-height | 21px                              |
      | color       | rgb(102, 112, 133)                |
      | font-family | Inter, "Inter Fallback"           |

  Scenario: Validate the click functionality of File2 Link of File List component
    Given 'File2_link' is visible
    Then 'File2_link' is clickable
    * Link on 'File2_link' having response code 200 ok

  Scenario: Validate the click functionality of Primary CTA of File List component
    When I navigate to '/testing/components-all'
    Then 'File_list_cta' is clickable
    * Link on 'File_list_cta' having response code 200 ok