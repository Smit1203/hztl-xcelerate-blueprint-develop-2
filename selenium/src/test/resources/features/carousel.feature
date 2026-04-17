@xcelerate @carousel
Feature:carousel:Validate Carousel component

  @clearcookies
  Scenario: Navigate to Home page
    Given I view the home page

  Scenario: Validate elements visible on Carousel component
    When I navigate to '/testing/components-all'
    Then 'Carousel_component' is visible
    * 'Carousel_play_button' is visible
    * 'Carousel_navigation_dots' is visible
    * 'Carousel_previous_button' is visible
    * 'Carousel_next_button' is visible

  Scenario: Validate elements of Carousel Slide Item1 are visible
    Then 'Carousel_component' is visible
    * 'Carousel_slide1' is visible
    * 'Carousel_slide1_image' is visible
    * 'Carousel_slide1_title' is visible
    * 'Carousel_slide1_description' is visible
    * 'Carousel_slide1_primary_button' is visible
    * 'Carousel_slide1_secondary_button' is visible
    * 'Carousel_previous_button' field is disabled

  Scenario: Validate the functionality of next arrow
    Given 'Carousel_slide1' is visible
    When I click on 'Carousel_next_button'
    Then 'Carousel_slide2' is visible
    * 'Carousel_slide2_image' is visible
    * 'Carousel_slide2_title' is visible
    * 'Carousel_slide2_description' is visible
    * 'Carousel_slide2_primary_button' is visible
    * 'Carousel_slide2_secondary_button' is visible
    * 'Carousel_previous_button' is clickable

  Scenario: Validate the functionality of previous arrow
    Given 'Carousel_slide2' is visible
    When I click on 'Carousel_previous_button'
    Then 'Carousel_slide1' is visible
    * 'Carousel_slide1_image' is visible
    * 'Carousel_slide1_title' is visible
    * 'Carousel_slide1_description' is visible
    * 'Carousel_slide1_primary_button' is visible
    * 'Carousel_slide1_secondary_button' is visible
    * 'Carousel_previous_button' field is disabled

  Scenario: Validate the play button functionality
    When I refresh the current page
    Then 'Carousel_slide1' is visible
    * I click on 'Carousel_play_button'
    * I wait for '5' seconds
    * 'Carousel_slide2' is visible
    * 'Carousel_slide2_title' is visible
    * 'Carousel_pause_button' is visible
    * 'Carousel_play_button' is disappeared

  Scenario: Validate the pause button functionality
    When I refresh the current page
    Then 'Carousel_slide1' is visible
    * I click on 'Carousel_play_button'
    * I wait for '5' seconds
    * 'Carousel_slide2' is visible
    * 'Carousel_pause_button' is visible
    * I click on 'Carousel_pause_button'
    * I wait for '8' seconds
    * 'Carousel_slide2_title' is visible
    * 'Carousel_slide2' is visible

  Scenario: Validate that when user is on last slide, next arrow is disabled
    When I click on 'Carousel_navigation_last_dot'
    * I wait for '2' seconds
    Then 'Carousel_next_button' field is disabled
    * 'Carousel_previous_button' is clickable

  Scenario: Validate typography of Heading field of Carousel Item
    When I refresh the current page
    Then 'Carousel_slide1_title' is visible
    * The 'Carousel_slide1_title' element has following CSS properties
      | font-size   | 40px                     |
      | font-weight | 700                      |
      | line-height | 48px                     |
      | color       | rgb(25, 32, 46)          |
      | font-family | Inter, sans-serif        |

  Scenario: Validate typography of Description field of Carousel Item
    Given 'Carousel_slide1_description' is visible
    Then The 'Carousel_slide1_description' element has following CSS properties
      | font-size   | 18px                     |
      | font-weight | 400                      |
      | line-height | 27px                     |
      | color       | rgb(102, 112, 133)       |
      | font-family | Inter, sans-serif        |

  Scenario: Validate typography of Primary CTA of Carousel Item
    Given 'Carousel_slide1_primary_button' is visible
    Then The 'Carousel_slide1_primary_button' element has following CSS properties
      | font-size        | 18px                                         |
      | font-weight      | 600                                          |
      | line-height      | 18px                                         |
      | color            | rgb(255, 255, 255)                           |
      | font-family      | Inter, "Inter Fallback"                      |
      | background-color | rgb(52, 64, 84)                              |
      | width            | 149.975px                                    |
      | height           | 56px                                         |

  Scenario: Validate typography of Primary CTA of Carousel Item
    Given 'Carousel_slide1_secondary_button' is visible
    Then The 'Carousel_slide1_secondary_button' element has following CSS properties
      | font-size        | 18px                                       |
      | font-weight      | 600                                        |
      | line-height      | 18px                                       |
      | color            | rgb(25, 32, 46)                            |
      | font-family      | Inter, "Inter Fallback"                    |
      | background-color | rgba(25, 32, 46, 0.00)                     |
      | width            | 138.425px                                  |
      | height           | 56px                                       |

  Scenario: Validate the click functionality of Primary CTA of Carousel component
    Given 'Carousel_slide1_primary_button' is visible
    Then 'Carousel_slide1_primary_button' is clickable
    * Link on 'Carousel_slide1_primary_button' having response code 200 ok

  Scenario: Validate the click functionality of Secondary CTA of Carousel component
    Given 'Carousel_slide1_secondary_button' is visible
    Then 'Carousel_slide1_secondary_button' is clickable
    * Link on 'Carousel_slide1_secondary_button' having response code 200 ok