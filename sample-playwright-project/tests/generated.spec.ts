import { test } from '@playwright/test';

test('Navigation Timeout', async ({ page }) => {

    page.setDefaultNavigationTimeout(1000);

    await page.goto('https://playwright.dev/');

});