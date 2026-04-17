@xcelerate @social-links
Feature:social-links:Validate social links component

  @clearcookies
  Scenario: Navigate to Home page
    Given I view the home page

  Scenario: Validate elements visible on social links component
    Then 'social-icons_component' is visible
    * 'youtube_social_icon' is visible
    * 'facebook_social_icon' is visible
    * 'instagram_social_icon' is visible
    * 'tiktok_social_icon' is visible
    * The 'youtube_social_icon' element has a CSS 'color' property with value 'rgb(47, 45, 46)'

  Scenario: Verify the size and color attribute of the icon
    Then The 'youtube_social_icon' element has a CSS 'width' property with value '24px'
    Then The 'youtube_social_icon' element has a CSS 'height' property with value '24px'

  #Scenario: verify hover functionality on the social icons
   # When I hover mouse over 'youtube_social_icon'
    #Then 'color' attribute of 'youtube_social_icon' element is 'rgb(120, 119, 121)'

  Scenario: verify links on the social icons
    Then Links on 'social-icon' having response code 200 ok

