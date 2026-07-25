import { LaunchOptions, BrowserContextOptions, devices } from '@playwright/test';
import { IBrowserConfig, BrowserType } from '../types/config.types';
import { EnvConfig } from './env.config';

export class BrowserConfig {
  private readonly envConfig = EnvConfig.getInstance();

  public getConfig(browserType?: BrowserType): IBrowserConfig {
    const type = browserType || this.envConfig.get('browser');
    return {
      launchOptions: this.buildLaunchOptions(type),
      contextOptions: this.buildContextOptions(type),
    };
  }

  private buildLaunchOptions(browserType: BrowserType): LaunchOptions {
    const baseOptions: LaunchOptions = {
      headless: this.envConfig.get('headless'),
      slowMo: this.envConfig.get('slowMo'),
    };

    switch (browserType) {
      case 'chromium':
        return {
          ...baseOptions,
          args: [
            '--disable-blink-features=AutomationControlled',
            '--disable-infobars',
            '--no-sandbox',
            '--disable-dev-shm-usage',
          ],
        };

      case 'firefox':
        return {
          ...baseOptions,
          firefoxUserPrefs: {
            'media.navigator.streams.fake': true,
          },
        };

      case 'webkit':
        return { ...baseOptions };

      case 'mobile-chrome':
      case 'mobile-safari':
        return { ...baseOptions };

      default:
        return baseOptions;
    }
  }

  private buildContextOptions(browserType: BrowserType): BrowserContextOptions {
    const baseOptions: BrowserContextOptions = {
      viewport: {
        width: this.envConfig.get('viewportWidth'),
        height: this.envConfig.get('viewportHeight'),
      },
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
    };

    switch (browserType) {
      case 'mobile-chrome': {
        const pixel5 = devices['Pixel 5'];
        return { ...baseOptions, ...pixel5 };
      }

      case 'mobile-safari': {
        const iphone12 = devices['iPhone 12'];
        return { ...baseOptions, ...iphone12 };
      }

      default:
        return baseOptions;
    }
  }

  public getBrowserName(browserType?: BrowserType): 'chromium' | 'firefox' | 'webkit' {
    const type = browserType || this.envConfig.get('browser');
    switch (type) {
      case 'chromium':
      case 'mobile-chrome':
        return 'chromium';
      case 'firefox':
        return 'firefox';
      case 'webkit':
      case 'mobile-safari':
        return 'webkit';
      default:
        return 'chromium';
    }
  }
}
