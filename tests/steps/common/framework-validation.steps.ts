import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../../src/support/world';
import { ScreenshotUtility } from '../../../src/utilities/screenshot.utility';

Given('the browser is launched', async function (this: CustomWorld) {
  expect(this.page).toBeTruthy();
  this.logger.info('Browser launched and page is available');
});

When('I navigate to the base URL', async function (this: CustomWorld) {
  const baseUrl = this.config.baseUrl;
  await this.page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  this.logger.info(`Navigated to: ${baseUrl}`);
});

Then('the page should load successfully', async function (this: CustomWorld) {
  const url = this.page.url();
  expect(url).toBeTruthy();
  this.logger.info(`Page loaded successfully. Current URL: ${url}`);
});

Then('I should be able to retrieve the page title', async function (this: CustomWorld) {
  const title = await this.page.title();
  expect(title).toBeDefined();
  this.logger.info(`Page title retrieved: "${title}"`);
});

Then('I should be able to capture a screenshot', async function (this: CustomWorld) {
  const buffer = await ScreenshotUtility.capture(this.page, 'framework-validation');
  expect(buffer).toBeTruthy();
  expect(buffer.length).toBeGreaterThan(0);
  this.logger.info(`Screenshot captured: ${buffer.length} bytes`);
});
