import { Browser } from '@playwright/test';
import { BrowserType } from '../../types/config.types';
import { BrowserFactory } from './browser.factory';
import { Logger } from '../logger';
import { MESSAGES } from '../../constants/messages';

export class BrowserManager {
  private static instance: BrowserManager;
  private browser: Browser | null = null;
  private readonly logger = Logger.getInstance('browser');

  private constructor() {}

  public static getInstance(): BrowserManager {
    if (!BrowserManager.instance) {
      BrowserManager.instance = new BrowserManager();
    }
    return BrowserManager.instance;
  }

  public static reset(): void {
    BrowserManager.instance = undefined as unknown as BrowserManager;
  }

  public async launch(browserType?: BrowserType): Promise<Browser> {
    if (this.browser && this.browser.isConnected()) {
      this.logger.debug('Reusing existing browser instance');
      return this.browser;
    }

    this.browser = await BrowserFactory.create(browserType);
    return this.browser;
  }

  public getBrowser(): Browser {
    if (!this.browser || !this.browser.isConnected()) {
      throw new Error(MESSAGES.errors.BROWSER_NOT_INITIALIZED);
    }
    return this.browser;
  }

  public isRunning(): boolean {
    return this.browser !== null && this.browser.isConnected();
  }

  public async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.logger.info(MESSAGES.info.BROWSER_CLOSED);
    }
  }

  public async restart(browserType?: BrowserType): Promise<Browser> {
    await this.close();
    return this.launch(browserType);
  }
}
