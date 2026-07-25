import { chromium, firefox, webkit, Browser, LaunchOptions } from '@playwright/test';
import { BrowserType } from '../../types/config.types';
import { BrowserConfig } from '../../config/browser.config';
import { Logger } from '../logger';
import { MESSAGES } from '../../constants/messages';

export class BrowserFactory {
  private static readonly logger = Logger.getInstance('browser');

  public static async create(browserType?: BrowserType): Promise<Browser> {
    const browserConfig = new BrowserConfig();
    const browserName = browserConfig.getBrowserName(browserType);
    const { launchOptions } = browserConfig.getConfig(browserType);

    BrowserFactory.logger.info(`Launching browser: ${browserName}`, { browserType, launchOptions });

    const browser = await this.launchBrowser(browserName, launchOptions);

    BrowserFactory.logger.info(MESSAGES.info.BROWSER_LAUNCHED + browserName);
    return browser;
  }

  private static async launchBrowser(
    browserName: 'chromium' | 'firefox' | 'webkit',
    options: LaunchOptions,
  ): Promise<Browser> {
    switch (browserName) {
      case 'chromium':
        return chromium.launch(options);
      case 'firefox':
        return firefox.launch(options);
      case 'webkit':
        return webkit.launch(options);
      default:
        return chromium.launch(options);
    }
  }
}
