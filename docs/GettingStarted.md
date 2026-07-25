# Getting Started

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **VS Code** (recommended IDE)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd PlayGenAI

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Environment Setup

Create a `.env` file in the project root (or environment-specific files like `.env.dev`, `.env.qa`):

```env
BASE_URL=https://your-app-url.com
ENV=dev
BROWSER=chromium
HEADLESS=true
LOG_LEVEL=info
```

## Running Tests

### By Suite

```bash
# Run all tests
npm test

# Run smoke tests
npm run test:smoke

# Run regression tests
npm run test:regression

# Run sanity tests
npm run test:sanity
```

### By Environment

```bash
npm run test:dev
npm run test:qa
npm run test:uat
npm run test:stage
```

### By Browser

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:mobile
```

### Parallel Execution

```bash
npm run test:parallel
```

### Custom Execution

```bash
npm run run:custom
```

## Generating Reports

```bash
# Generate reports
npm run report:generate

# Generate and open in browser
npm run report:open
```

Reports are saved to:
- HTML: `reports/html/cucumber-report.html`
- JSON: `reports/json/cucumber-report.json`
- Allure: `reports/allure-results/`

## Creating Your First Test

### 1. Create a Feature File

Create `tests/features/smoke/login.feature`:

```gherkin
@smoke @login
Feature: User Login

  Scenario: Successful login
    Given I am on the login page
    When I enter username "admin" and password "secret"
    Then I should be redirected to the dashboard
```

### 2. Create a Page Object

Create `src/core/pages/login.page.ts`:

```typescript
import { Page, Locator, BrowserContext } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.usernameInput = this.locators.byTestId('username');
    this.passwordInput = this.locators.byTestId('password');
    this.loginButton = this.locators.byRole('button', { name: 'Login' });
  }

  public async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}
```

### 3. Create Step Definitions

Create `tests/steps/common/login.steps.ts`:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../../src/support/world';

Given('I am on the login page', async function (this: CustomWorld) {
  await this.loginPage.navigate('/login');
});

When('I enter username {string} and password {string}', async function (
  this: CustomWorld, username: string, password: string
) {
  await this.loginPage.login(username, password);
});

Then('I should be redirected to the dashboard', async function (this: CustomWorld) {
  // Add assertion logic
});
```

### 4. Run Your Test

```bash
npm run test:smoke
```

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format code with Prettier |
| `npm run clean` | Clean reports, logs, and auth files |
