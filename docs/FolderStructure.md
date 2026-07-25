# Folder Structure

```
PlayGenAI/
├── auth/                          # Authentication storage state files
├── docs/                          # Documentation
├── logs/                          # Runtime logs (Winston)
├── reports/                       # Test execution reports
│   ├── allure-results/            # Allure raw results
│   ├── html/                      # HTML reports
│   ├── json/                      # JSON reports
│   ├── screenshots/               # Failure screenshots
│   └── videos/                    # Test execution videos
├── scripts/                       # Utility scripts
│   ├── generate-report.ts         # Report generation script
│   └── run-tests.ts               # Custom test runner
├── src/                           # Framework source code
│   ├── ai/                        # AI integration layer
│   │   ├── hooks/                 # AI lifecycle hooks
│   │   └── interfaces/            # AI service contracts
│   ├── config/                    # Configuration management
│   │   ├── browser.config.ts      # Browser-specific settings
│   │   ├── env.config.ts          # Environment config (Singleton)
│   │   └── test.config.ts         # Test execution settings
│   ├── constants/                 # Framework constants
│   │   ├── messages.ts            # Log/error messages
│   │   ├── paths.ts               # File/directory paths
│   │   └── timeouts.ts            # Timeout values
│   ├── core/                      # Core framework components
│   │   ├── api/                   # API testing utilities
│   │   │   ├── api.builder.ts     # Fluent request builder
│   │   │   ├── api.client.ts      # HTTP client
│   │   │   └── api.interceptor.ts # Network interception
│   │   ├── browser/               # Browser management
│   │   │   ├── browser.factory.ts # Browser creation
│   │   │   ├── browser.manager.ts # Browser lifecycle
│   │   │   └── context.manager.ts # Context & state management
│   │   ├── database/              # Database connectivity
│   │   │   ├── db.factory.ts      # DB adapter factory
│   │   │   └── db.interface.ts    # DB contracts
│   │   ├── logger/                # Logging (Winston)
│   │   │   ├── logger.config.ts   # Logger configuration
│   │   │   └── logger.ts          # Logger implementation
│   │   └── pages/                 # Page Object base
│   │       └── base.page.ts       # Abstract BasePage class
│   ├── reporters/                 # Report generators
│   │   ├── allure.reporter.ts     # Allure integration
│   │   ├── html.reporter.ts       # HTML report
│   │   ├── json.reporter.ts       # JSON report
│   │   └── report.manager.ts      # Report orchestration
│   ├── support/                   # Cucumber support files
│   │   ├── hooks.ts               # Before/After hooks
│   │   ├── page.factory.ts        # Page Object instantiation
│   │   └── world.ts               # Cucumber World (shared state)
│   ├── types/                     # TypeScript type definitions
│   │   ├── api.types.ts           # API-related types
│   │   ├── config.types.ts        # Configuration types
│   │   ├── database.types.ts      # Database types
│   │   ├── framework.types.ts     # Framework-wide types
│   │   ├── logger.types.ts        # Logger types
│   │   ├── page.types.ts          # Page Object interfaces
│   │   └── test-data.types.ts     # Test data types
│   └── utilities/                 # Utility helpers
│       ├── assertion.utility.ts   # Custom assertions
│       ├── data.utility.ts        # Test data generation
│       ├── date.utility.ts        # Date helpers
│       ├── file.utility.ts        # File operations
│       ├── json.utility.ts        # JSON parsing
│       ├── locator.utility.ts     # Element locator strategies
│       ├── retry.utility.ts       # Retry logic
│       ├── screenshot.utility.ts  # Screenshot capture
│       ├── string.utility.ts      # String manipulation
│       ├── video.utility.ts       # Video recording
│       └── wait.utility.ts        # Wait/polling strategies
├── tests/                         # Test files
│   ├── data/                      # Test data
│   │   ├── dynamic/               # Runtime-generated data
│   │   └── static/                # Static fixtures/JSON
│   ├── features/                  # Gherkin feature files
│   │   ├── regression/            # Regression suite
│   │   ├── sanity/                # Sanity suite
│   │   └── smoke/                 # Smoke suite
│   └── steps/                     # Step definitions
│       └── common/                # Shared step definitions
├── cucumber.js                    # Cucumber profiles
├── package.json                   # Dependencies & scripts
├── playwright.config.ts           # Playwright settings
└── tsconfig.json                  # TypeScript configuration
```

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/core/pages/` | Place your Page Object classes here (extend `BasePage`) |
| `tests/features/` | Gherkin `.feature` files organized by suite type |
| `tests/steps/` | Step definition files matching feature files |
| `tests/data/static/` | Static test data (JSON, CSV, etc.) |
| `tests/data/dynamic/` | Runtime-generated test data |
| `reports/` | Auto-generated — do not commit to VCS |
| `logs/` | Auto-generated — do not commit to VCS |
