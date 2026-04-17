# About Quick Automation Project

* This Quick Automation framework is created to automate any functionality quickly using predefined test cases.
* One need to create feature file and locator file only in order to create automation script.
* Custom test step definitions can be created under stepdefinitions folder
* Locator file name (without file extension) should be mentioned after scenario or feature keyword, and it should be
  followed by a colon (:).   
  e.g.

~~~bash
@test
Feature: ProductSelector: Validate Product Selector flow
  
  Scenario: login: Login into website
  Given ...
  When ...
  Then ...
~~~

* If locator name is not mentioned in the feature file then it will find element's locator from 'common.yml' locator
  file.

# How To execute Automation:

command to run the automation script:

~~~bash
mvn clean test -Denvironment=qa -Dbrowser=chrome -Dcucumber.filter.tags="@test"
~~~ 

* environment can be specified to test different environments (e.g. test, qa, stage, production)
* browser can be specified to test different browser (e.g. edge,firefox,chrome,chromeHeadless,firefoxHeadless)
* tag name of the scenario/feature to be executed
* intelliJ project  
  _@author_ - pshah@horizontal.com

# **List of Predefined Test Cases:**

    1. ‘element_name’ is visible  
    2. ‘checkbox_name’ is selected  
    3. ‘element_name’ is clickable  
    4. I click on ‘element_name’  
    5. I enter ‘testdata’ into ‘textbox_name’ field  
    6. I am on ‘/relativeUrl or absolute’ page  
    7. I navigate to ‘/relativeUrl or absolute’  
    8. I view the home page  
    9. I hover mouse over ‘element_name’  
    10. ‘element_name’ is disappeared  
    11. ‘CSSattribute’ attribute of ‘element_name’ is ‘CSSvalue’   
        * CSSvalue e.g. RGB(155, 155, 155), 15px  
        CSSattribute -> name of css attribute e.g. color, background-color  
    12. all links on 'component_name' having response code 200 ok  
    13. Total count of ‘component_name’ is n  
    14. ‘component_name’ component exists on the page  
    15. I upload 'filename.ext' file into 'Browse_Input_tag' field
        * Place testfile inside src/resources/testdata folder and pass only file name in method
    16. I select 'option_visible_text' option from 'DropdownName' dropdown field  
    17. I switch browser  
    18. 'result_count' value is changed  
    19. Open new tab with url 'http://google.com'  
    20. close current browser and switch  
    21. Below 'Comp_list' are visible  
        | comp name 1|  
        | comp name 2|  
    22. I switch to 'iFrame'
    23. I switch back to parent frame
    24. I click on Recaptcha checkbox within 'recaptcha_frame'
    25. I scroll to 'element'
    26. ‘element_name’ is exists
    27. ‘element_name’ is active
        *  It will validate element's class contains 'active' text or not
    28. I am on the home page
    29. I set browser's Geo location to 'us-minneapolis/us-california/india-vadodara'
	30. I wait for page load
	31. I accept alert
	32. I refresh the current page
	33. 'element' field is disabled
        * Wait till the element is not clickable
	34. 'element' is collapsed
        * Validate:  aria-expanded=false
	35. 'element' is expanded
        * Validate: aria-expanded=true
	36. I press 'Esc/Enter/Tab' key on 'element'
	37. Current URL contains 'partofURL'
    38. I wait for 'x' seconds
    39. "elementName" field is not empty
    40. "content" text is visible in "elementName" - remove "text"
    41. I close browser
    42. I click on 'element'
        * This method will click through Javascript without any wait time
    43. sitemap.xml is rendering in correct format
        * validating the DOM starting 'urlset' tag is of XML format
    44. Below urls having response code 200 ok
        | absolute/partialURL |

# This framework contains below features:

1. Testng + cucumber + Maven + Selenium + Selenide
2. Supported Browsers: IE, Edge, Chrome, FF
3. Locators to be defined in _.yml_ file
4. Reports generation using Cucumber-extent report listener
5. Generating report file name dynamically based on today's date
6. Send report file via email attachment
7. Email server configuration is in _email-smtp.config.json_ file
8. Environment specific urls, default language, email configuration mapping can be defined under _environmentconfig_
   folder
9. Logging feature using Log4J
10. Library for master test cases defined
11. Custom step definitions can be created under _stepdefinitions_ folder
