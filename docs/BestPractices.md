# Best Practices

## Locator Strategy

### Priority Order (most to least preferred)

1. **Test ID** — `this.locators.byTestId('submit-btn')` — Most stable, decoupled from UI
2. **Role** — `this.locators.byRole('button', { name: 'Submit' })` — Accessible & semantic
3. **Label** — `this.locators.byLabel('Email')` — Good for form fields
4. **Placeholder** — `this.locators.byPlaceholder('Enter email')` — Form inputs
5. **Text** — `this.locators.byText('Submit')` — Visible text content
6. **CSS** — `this.locators.byCss('.btn-primary')` — When above options unavailable
7. **XPath** — `this.locators.byXpath('//div[@class="container"]')` — Last resort

### Avoid

- Fragile locators tied to layout structure (e.g., `div > div > span:nth-child(3)`)
- Auto-generated IDs or class names (e.g., `css-1a2b3c`)
- Index-based locators unless explicitly testing a list

## Page Object Design

- **Single Responsibility** — One page object per page/component
- **No assertions in page objects** — Return data, assert in steps
- **Encapsulate locators** — Never expose raw locators publicly
- **Compose complex pages** — Use component objects for reusable sections (header, footer, modals)
- **Keep methods focused** — One action per method

```typescript
// Good: focused methods
async enterUsername(username: string): Promise<void> { ... }
async enterPassword(password: string): Promise<void> { ... }
async clickLogin(): Promise<void> { ... }

// Also good: composite method for common flows
async login(username: string, password: string): Promise<void> {
  await this.enterUsername(username);
  await this.enterPassword(password);
  await this.clickLogin();
}
```

## Test Data Management

- Use `tests/data/static/` for fixed test data (JSON files)
- Use `tests/data/dynamic/` for runtime-generated data
- Leverage `@faker-js/faker` via `DataUtility` for dynamic data
- Never hardcode sensitive data — use environment variables
- Keep test data independent between scenarios

## Wait Strategies

- **Prefer auto-waiting** — Playwright auto-waits for elements before actions
- Use `this.wait` utility only when explicit waits are needed
- Never use fixed `sleep` or `delay` calls
- Wait for specific conditions: element visible, network idle, navigation complete

```typescript
// Good: wait for specific state
await this.wait.forElement(locator, { state: 'visible' });

// Bad: arbitrary sleep
await page.waitForTimeout(3000);
```

## Feature File Writing

- Write scenarios from the user's perspective
- Use declarative steps (what), not imperative (how)
- Keep scenarios independent — no shared state between scenarios
- Use `Background` for common preconditions
- Limit scenarios to 5–8 steps

```gherkin
# Good: declarative
Scenario: User purchases an item
  Given I am logged in as a premium user
  When I add "Wireless Mouse" to my cart
  And I complete the checkout
  Then I should see an order confirmation

# Bad: imperative
Scenario: User purchases an item
  Given I open the browser
  And I navigate to the login page
  And I type "user@test.com" in the email field
  And I type "pass123" in the password field
  And I click the login button
  ...
```

## Error Handling & Debugging

- Use `this.logger` for meaningful debug logging
- Screenshots are auto-captured on failure (see `reports/screenshots/`)
- Videos can be enabled per test for debugging
- Use `RetryUtility` for flaky external dependencies (APIs, DBs)
- Never swallow errors silently

## CI/CD Considerations

- Run `npm run clean` before test execution
- Use `HEADLESS=true` in CI environments
- Use `npm run test:parallel` for faster CI runs
- Archive `reports/` directory as CI artifacts
- Use environment-specific configs (`npm run test:qa`, `npm run test:stage`)

## Performance

- Reuse browser contexts when possible (via `auth/` storage state)
- Run independent tests in parallel (`--parallel`)
- Avoid unnecessary page navigations — reuse page state
- Use API calls for test setup/teardown instead of UI interactions
- Minimize screenshot/video capture in parallel runs

## Maintenance

- Review and update locators when UI changes
- Keep page objects in sync with application changes
- Remove unused step definitions and page objects
- Run lint and format checks before committing: `npm run lint && npm run format:check`
- Tag tests appropriately for suite management
