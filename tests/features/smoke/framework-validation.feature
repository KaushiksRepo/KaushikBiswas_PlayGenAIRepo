@smoke @framework-validation
Feature: Framework Validation
  As a QA engineer
  I want to verify the framework is properly configured
  So that I can begin writing application-specific tests

  Scenario: Verify browser launches and navigates successfully
    Given the browser is launched
    When I navigate to the base URL
    Then the page should load successfully

  Scenario: Verify page title can be retrieved
    Given the browser is launched
    When I navigate to the base URL
    Then I should be able to retrieve the page title

  Scenario: Verify screenshot utility works
    Given the browser is launched
    When I navigate to the base URL
    Then I should be able to capture a screenshot
