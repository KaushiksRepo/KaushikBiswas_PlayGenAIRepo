# Architecture

## Overview

PlayGenAI is an enterprise-grade BDD test automation framework built on **Playwright** and **Cucumber.js** with TypeScript. It follows a layered architecture pattern to separate concerns and promote maintainability.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Test Layer                          │
│  (Feature Files + Step Definitions + Test Data)     │
├─────────────────────────────────────────────────────┤
│                  Support Layer                       │
│  (World, Hooks, Page Factory)                       │
├─────────────────────────────────────────────────────┤
│                  Core Layer                          │
│  (Pages, Browser, API, Database, Logger)            │
├─────────────────────────────────────────────────────┤
│                  Utilities Layer                     │
│  (Locators, Assertions, Waits, Data, Files)         │
├─────────────────────────────────────────────────────┤
│                  Configuration Layer                 │
│  (Environment, Browser, Test Config)                │
├─────────────────────────────────────────────────────┤
│                  AI Layer                            │
│  (Analyzer, Generator, Healer, Planner)             │
└─────────────────────────────────────────────────────┘
```

## Design Patterns

| Pattern | Usage |
|---------|-------|
| **Page Object Model** | `BasePage` abstract class in `src/core/pages/` |
| **Factory Pattern** | `BrowserFactory`, `PageFactory`, `DbFactory` |
| **Singleton** | `EnvConfig`, `Logger`, `BrowserManager` |
| **Builder Pattern** | `ApiBuilder` for constructing HTTP requests |
| **Strategy Pattern** | Browser types, database adapters |
| **Observer Pattern** | Reporters (Allure, HTML, JSON) |

## Key Components

### Browser Management
- `BrowserFactory` — creates browser instances (Chromium, Firefox, WebKit, Mobile)
- `BrowserManager` — manages browser lifecycle
- `ContextManager` — handles browser contexts and storage state

### API Client
- `ApiBuilder` — fluent API for building requests
- `ApiClient` — executes HTTP requests
- `ApiInterceptor` — intercepts and modifies network traffic

### Reporting
- `ReportManager` — orchestrates report generation
- Supports Allure, HTML, and JSON formats

### AI Integration
- Interfaces for AI-powered test healing, generation, analysis, and planning
- Hooks for AI-driven self-healing locators

## Data Flow

```
Feature File → Step Definition → Page Object → Playwright API → Browser
                    ↓
              World (shared state)
                    ↓
              Hooks (setup/teardown)
```

## Environment Support

The framework supports multiple environments via `.env` files:
- `dev`, `qa`, `uat`, `stage`, `prod`

Environment is resolved from the `ENV` environment variable and loads the corresponding `.env.<environment>` file.
