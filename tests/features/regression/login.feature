```gherkin
@authentication @login
Feature: OrangeHRM Login

  As an authorized OrangeHRM user
  I want to authenticate myself
  So that I can securely access the application

  Background:
    Given the user navigates to the OrangeHRM login page

  @smoke @positive
  Scenario: Successful login with valid credentials
    When the user logs in with "validUser" credentials
    Then the Dashboard page should be displayed
    And the user should be successfully authenticated

  @regression @negative
  Scenario Outline: Login with invalid credentials
    When the user logs in with "<credentialType>" credentials
    Then an invalid credential error message should be displayed
    And the user should remain on the Login page

    Examples:
      | credentialType      |
      | invalidUsername     |
      | invalidPassword     |
      | invalidCredentials  |

  @regression @validation
  Scenario Outline: Login with missing mandatory fields
    When the user logs in with "<credentialType>" credentials
    Then the appropriate required field validation message should be displayed

    Examples:
      | credentialType     |
      | blankUsername      |
      | blankPassword      |
      | blankCredentials   |

  @regression @ui
  Scenario: Verify password field masks entered characters
    When the user enters a password
    Then the password should be masked

  @regression @security
  Scenario: Verify unauthenticated user cannot access the Dashboard directly
    When the user attempts to access the Dashboard URL without logging in
    Then the user should be redirected to the Login page
```
