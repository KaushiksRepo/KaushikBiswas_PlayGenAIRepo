# Authentication - Login Test Cases

**Module:** Authentication
**Feature:** Login
**Requirement ID:** AUTH-001

| TC ID        | Test Case Title                                                               | Priority | Type       | Automation |
| ------------ | ----------------------------------------------------------------------------- | -------- | ---------- | ---------- |
| TC-LOGIN-001 | Verify Login page loads successfully                                          | High     | Functional | Yes        |
| TC-LOGIN-002 | Verify Username field is visible                                              | High     | UI         | Yes        |
| TC-LOGIN-003 | Verify Password field is visible                                              | High     | UI         | Yes        |
| TC-LOGIN-004 | Verify Login button is visible and enabled                                    | High     | UI         | Yes        |
| TC-LOGIN-005 | Verify successful login using valid credentials                               | High     | Positive   | Yes        |
| TC-LOGIN-006 | Verify Dashboard is displayed after successful login                          | High     | Functional | Yes        |
| TC-LOGIN-007 | Verify authenticated user can access protected modules                        | High     | Security   | Yes        |
| TC-LOGIN-008 | Verify login fails with invalid username                                      | High     | Negative   | Yes        |
| TC-LOGIN-009 | Verify login fails with invalid password                                      | High     | Negative   | Yes        |
| TC-LOGIN-010 | Verify login fails with invalid username and invalid password                 | High     | Negative   | Yes        |
| TC-LOGIN-011 | Verify validation message when Username is left blank                         | High     | Validation | Yes        |
| TC-LOGIN-012 | Verify validation message when Password is left blank                         | High     | Validation | Yes        |
| TC-LOGIN-013 | Verify validation messages when both Username and Password are blank          | High     | Validation | Yes        |
| TC-LOGIN-014 | Verify Password field masks entered characters                                | Medium   | UI         | Yes        |
| TC-LOGIN-015 | Verify password can be entered successfully                                   | Medium   | Functional | Yes        |
| TC-LOGIN-016 | Verify user remains on Login page after failed authentication                 | High     | Functional | Yes        |
| TC-LOGIN-017 | Verify appropriate error message is displayed for invalid credentials         | High     | Validation | Yes        |
| TC-LOGIN-018 | Verify successful login redirects user to Dashboard URL                       | Medium   | Navigation | Yes        |
| TC-LOGIN-019 | Verify unauthenticated user cannot directly access Dashboard URL              | High     | Security   | Yes        |
| TC-LOGIN-020 | Verify browser refresh after successful login maintains authenticated session | Medium   | Session    | Yes        |
