@xcelerate @inline-video
Feature:inline-video:Validate Inline Video component

  @clearcookies
  Scenario: Navigate to Test page
    Given I navigate to '/qa/inlinevideo'

  Scenario: Validate elements Inline Video is visible
    Then 'Inline_video_component' is visible

  Scenario: Validate rendering size of Image
    Then The 'Inline_video_component' element has following CSS properties
      | width       | 888.875px                     |
      | height      | 500px                         |