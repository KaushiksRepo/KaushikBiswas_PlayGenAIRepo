# Coding Standards

## TypeScript Guidelines

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Classes | PascalCase | `LoginPage`, `ApiClient` |
| Interfaces | PascalCase with `I` prefix | `IBasePage`, `IPageActions` |
| Methods | camelCase | `navigateTo()`, `clickButton()` |
| Properties | camelCase | `pageTitle`, `isLoggedIn` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_TIMEOUT`, `BASE_URL` |
| Files | kebab-case with suffix | `login.page.ts`, `api.client.ts` |
| Enums | PascalCase | `Environment`, `BrowserType` |
| Types | PascalCase | `ApiResponse`, `TestConfig` |

### File Naming

Files follow the pattern: `<name>.<type>.ts`

- Page Objects: `login.page.ts`, `dashboard.page.ts`
- Step Definitions: `login.steps.ts`, `navigation.steps.ts`
- Utilities: `wait.utility.ts`, `data.utility.ts`
- Configs: `env.config.ts`, `browser.config.ts`
- Types: `api.types.ts`, `page.types.ts`
- Interfaces: `analyzer.interface.ts`

### Module Exports

Each directory has an `index.ts` barrel file for clean imports:

```typescript
// src/utilities/index.ts
export { WaitUtility } from './wait.utility';
export { LocatorUtility } from './locator.utility';
export { AssertionUtility } from './assertion.utility';
```

## Page Object Standards

### Structure

```typescript
import { Page, Locator, BrowserContext } from '@playwright/test';
import { BasePage } from '../../src/core/pages/base.page';

export class LoginPage extends BasePage {
  // --- Locators (private, readonly) ---
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.usernameInput = this.locators.byTestId('username');
    this.passwordInput = this.locators.byTestId('password');
    this.submitButton = this.locators.byRole('button', { name: 'Login' });
  }

  // --- Actions (public) ---
  public async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.submitButton);
  }
}
```

### Rules

1. Locators are declared as `private readonly` properties
2. Use `this.locators` helper methods (prefer `byTestId`, `byRole` over XPath)
3. Page methods should be `public async` and return `Promise<void>` or typed data
4. Use `this.logger` for logging actions
5. Use `this.wait` for explicit waits
6. Use `this.assert` for in-page assertions

## Step Definition Standards

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../src/support/world';

Given('I am on the login page', async function (this: CustomWorld) {
  await this.loginPage.navigate('/login');
});

When('I login with {string} and {string}', async function (
  this: CustomWorld, username: string, password: string
) {
  await this.loginPage.login(username, password);
});
```

## Feature File Standards

```gherkin
@smoke @login
Feature: User Login
  As a registered user
  I want to login to the application
  So that I can access my dashboard

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I login with "admin" and "password123"
    Then I should see the dashboard
```

### Tagging Strategy

| Tag | Purpose |
|-----|---------|
| `@smoke` | Critical path tests |
| `@sanity` | Basic functionality verification |
| `@regression` | Full regression suite |
| `@wip` | Work in progress (excluded from CI) |
| `@skip` | Temporarily skipped tests |

## General Rules

- Use `async/await` — never raw Promises or callbacks
- Prefer strict TypeScript (`strict: true` in tsconfig)
- All public APIs must have typed parameters and return types
- No `any` types — use `unknown` with type guards if needed
- Use `readonly` for properties that should not be reassigned
- Prefer composition over inheritance (except for `BasePage`)
