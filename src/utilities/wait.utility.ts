import { Page, Locator } from '@playwright/test';
import { TIMEOUTS } from '../constants/timeouts';
import { IWaitOptions } from '../types/page.types';

export class WaitUtility {
  constructor(private readonly page: Page) {}

  public async forElement(locator: Locator, options?: IWaitOptions): Promise<void> {
    await locator.waitFor({
      state: options?.state || 'visible',
      timeout: options?.timeout || TIMEOUTS.DEFAULT,
    });
  }

  public async forElementToBeHidden(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({
      state: 'hidden',
      timeout: timeout || TIMEOUTS.DEFAULT,
    });
  }

  public async forElementToBeDetached(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({
      state: 'detached',
      timeout: timeout || TIMEOUTS.DEFAULT,
    });
  }

  public async forNavigation(timeout?: number): Promise<void> {
    await this.page.waitForLoadState('networkidle', {
      timeout: timeout || TIMEOUTS.NAVIGATION,
    });
  }

  public async forDomContentLoaded(timeout?: number): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded', {
      timeout: timeout || TIMEOUTS.NAVIGATION,
    });
  }

  public async forNetworkIdle(timeout?: number): Promise<void> {
    await this.page.waitForLoadState('networkidle', {
      timeout: timeout || TIMEOUTS.NAVIGATION,
    });
  }

  public async forUrl(urlPattern: string | RegExp, timeout?: number): Promise<void> {
    await this.page.waitForURL(urlPattern, {
      timeout: timeout || TIMEOUTS.NAVIGATION,
    });
  }

  public async forResponse(
    urlPattern: string | RegExp,
    timeout?: number,
  ): Promise<void> {
    await this.page.waitForResponse(urlPattern, {
      timeout: timeout || TIMEOUTS.API,
    });
  }

  public async forRequest(
    urlPattern: string | RegExp,
    timeout?: number,
  ): Promise<void> {
    await this.page.waitForRequest(urlPattern, {
      timeout: timeout || TIMEOUTS.API,
    });
  }

  public async forCondition(
    conditionFn: () => Promise<boolean>,
    options?: { timeout?: number; interval?: number },
  ): Promise<void> {
    const timeout = options?.timeout || TIMEOUTS.DEFAULT;
    const interval = options?.interval || TIMEOUTS.POLL_INTERVAL;
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      if (await conditionFn()) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    throw new Error(`Condition not met within ${timeout}ms`);
  }

  public async forElementStable(locator: Locator, timeout?: number): Promise<void> {
    const maxTime = timeout || TIMEOUTS.DEFAULT;
    const startTime = Date.now();

    let previousBox = await locator.boundingBox();

    while (Date.now() - startTime < maxTime) {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.STABILITY_INTERVAL));
      const currentBox = await locator.boundingBox();

      if (
        previousBox &&
        currentBox &&
        previousBox.x === currentBox.x &&
        previousBox.y === currentBox.y &&
        previousBox.width === currentBox.width &&
        previousBox.height === currentBox.height
      ) {
        return;
      }

      previousBox = currentBox;
    }

    throw new Error(`Element did not stabilize within ${maxTime}ms`);
  }

  public async forDownload(timeout?: number): Promise<string> {
    const download = await this.page.waitForEvent('download', {
      timeout: timeout || TIMEOUTS.DOWNLOAD,
    });
    const filePath = await download.path();
    return filePath || '';
  }
}
