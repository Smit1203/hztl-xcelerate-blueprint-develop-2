@greystar @skip-nav
Feature:skip-nav: Validate Skip-nav component

  @clearcookies
  Scenario: Navigate to the page having section component configured
    When I navigate to '/testing/components-all'
    Then 'Skip_nav' is exists