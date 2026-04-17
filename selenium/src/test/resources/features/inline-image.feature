@xcelerate @inline-image
Feature:inline-image:Validate Inline Image component

  @clearcookies
  Scenario: Navigate to Test page
    Given I navigate to '/testing/components-all'

  Scenario: Validate elements Inline Image are visible
    Then 'Inline_image_component' is visible
    * 'Inline_image' is visible
    * 'Caption_text' is visible

  Scenario: Validate rendering size of Image
    Then The 'Inline_image' element has following CSS properties
      | width       | 1280px                       |
      | height      | 720px                        |

  Scenario: Validate typography of Caption field of Inline Image Component
    Then The 'Caption_text' element has following CSS properties
      | font-size   | 16px                         |
      | font-weight | 400                          |
      | line-height | 24px                         |
      | color       | rgb(102, 112, 133)           |
      | font-family | Inter, sans-serif            |
      | font-style  | italic                       |

  Scenario: Validate the spacing between Inline Image and Caption
    Then The 'Caption_wrapper' element has following CSS properties
      | margin-top  | 8px                          |
