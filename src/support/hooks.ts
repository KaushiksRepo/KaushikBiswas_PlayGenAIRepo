import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  BeforeStep,
  AfterStep,
  Status,
  ITestCaseHookParameter,
} from '@cucumber/cucumber';
import { CustomWorld } from './world';
import { BrowserManager } from '../core/browser/browser.manager';
import { ContextManager } from '../core/browser/context.manager';
import { Logger } from '../core/logger';
import { EnvConfig } from '../config/env.config';
import { ScreenshotUtility } from '../utilities/screenshot.utility';
import { MESSAGES } from '../constants/messages';
import { BrowserType } from '../types/config.types';

const logger = Logger.getInstance('hooks');
const contextManager = new ContextManager();

BeforeAll(async function () {
  const config = EnvConfig.getInstance();
  logger.info(MESSAGES.info.CONFIG_LOADED + (process.env.ENV || 'dev'));
  logger.info(`Browser: ${config.get('browser')}, Headless: ${config.get('headless')}`);

  const browserManager = BrowserManager.getInstance();
  await browserManager.launch(config.get('browser'));
});

AfterAll(async function () {
  const browserManager = BrowserManager.getInstance();
  await browserManager.close();
  Logger.resetAll();
});

Before(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  const pickle = scenario.pickle;
  this.testName = pickle.name;
  this.scenarioTags = pickle.tags.map((tag) => tag.name);
  this.startTime = Date.now();
  this.scenarioContext.clear();

  this.logger.info(`${MESSAGES.info.TEST_STARTED}${this.testName}`);
  this.logger.debug('Tags', { tags: this.scenarioTags });

  // Get browser and create context + page
  const browserManager = BrowserManager.getInstance();
  const browser = browserManager.getBrowser();

  const browserType = (process.env.BROWSER || this.config.browser) as BrowserType;
  this.context = await contextManager.createContext(browser, browserType);
  this.page = await contextManager.createPage(this.context);

  // Initialize page-dependent utilities
  this.initializePageUtilities();
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  const status = scenario.result?.status;
  const duration = this.getElapsedTime();

  // Capture screenshot on failure
  if (status === Status.FAILED && this.page && this.config.screenshotOnFailure) {
    try {
      const screenshot = await ScreenshotUtility.captureOnFailure(this.page, this.testName);
      this.attach(screenshot, 'image/png');
    } catch (error) {
      this.logger.error(
        `${MESSAGES.errors.SCREENSHOT_FAILED}${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  // Attach trace on failure
  if (status === Status.FAILED && this.config.traceOnFailure && this.context) {
    try {
      await this.context.tracing.stop({ path: undefined });
    } catch {
      // Tracing may not have been started
    }
  }

  // Dispose API client if initialized
  if (this.apiClient) {
    await this.apiClient.dispose();
  }

  // Close browser context (also closes page and saves video)
  if (this.context) {
    await contextManager.closeContext(this.context);
  }

  // Verify soft assertions
  const softFailures = this.assertUtil.getFailedSoftAssertions();
  if (softFailures.length > 0) {
    this.logger.warn(`Soft assertion failures: ${softFailures.length}`, {
      failures: softFailures.map((f) => f.message),
    });
  }

  const statusLabel = status === Status.PASSED ? 'PASSED' : status === Status.FAILED ? 'FAILED' : 'SKIPPED';
  this.logger.info(
    `${MESSAGES.info.TEST_COMPLETED}${this.testName} [${statusLabel}] (${duration}ms)`,
  );
});

BeforeStep(async function (this: CustomWorld) {
  // Extension point for AI hooks or step-level logging
  this.logger.debug('Step starting');
});

AfterStep(async function (this: CustomWorld) {
  // Extension point for AI hooks or step-level screenshots
  this.logger.debug('Step completed');
});
