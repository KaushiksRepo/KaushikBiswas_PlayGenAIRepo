import { Browser, BrowserContext, BrowserContextOptions, Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { BrowserConfig } from '../../config/browser.config';
import { BrowserType } from '../../types/config.types';
import { PATHS } from '../../constants/paths';
import { Logger } from '../logger';
import { MESSAGES } from '../../constants/messages';
import { VideoUtility } from '../../utilities/video.utility';
import { EnvConfig } from '../../config/env.config';

export class ContextManager {
  private readonly logger = Logger.getInstance('browser');
  private readonly envConfig = EnvConfig.getInstance();

  public async createContext(
    browser: Browser,
    browserType?: BrowserType,
    overrides?: Partial<BrowserContextOptions>,
  ): Promise<BrowserContext> {
    const browserConfig = new BrowserConfig();
    const { contextOptions } = browserConfig.getConfig(browserType);

    const options: BrowserContextOptions = {
      ...contextOptions,
      ...overrides,
    };

    if (this.envConfig.get('videoOnFailure')) {
      const videoConfig = VideoUtility.getRecordingConfig();
      options.recordVideo = videoConfig;
    }

    const context = await browser.newContext(options);
    context.setDefaultTimeout(this.envConfig.get('defaultTimeout'));
    context.setDefaultNavigationTimeout(this.envConfig.get('navigationTimeout'));

    this.logger.info(MESSAGES.info.CONTEXT_CREATED);
    return context;
  }

  public async createContextWithAuth(
    browser: Browser,
    storageStatePath: string,
    browserType?: BrowserType,
    overrides?: Partial<BrowserContextOptions>,
  ): Promise<BrowserContext> {
    if (!fs.existsSync(storageStatePath)) {
      this.logger.warn(`Storage state file not found: ${storageStatePath}. Creating fresh context.`);
      return this.createContext(browser, browserType, overrides);
    }

    const storageState = JSON.parse(fs.readFileSync(storageStatePath, 'utf-8'));

    return this.createContext(browser, browserType, {
      ...overrides,
      storageState,
    });
  }

  public async saveStorageState(context: BrowserContext, name: string): Promise<string> {
    const filePath = path.join(PATHS.AUTH, `${name}.json`);

    if (!fs.existsSync(PATHS.AUTH)) {
      fs.mkdirSync(PATHS.AUTH, { recursive: true });
    }

    await context.storageState({ path: filePath });
    this.logger.info(`Storage state saved: ${filePath}`);
    return filePath;
  }

  public async createPage(context: BrowserContext): Promise<Page> {
    const page = await context.newPage();
    this.logger.info(MESSAGES.info.PAGE_CREATED);
    return page;
  }

  public async closeContext(context: BrowserContext): Promise<void> {
    await context.close();
    this.logger.debug('Browser context closed');
  }

  public getStorageStatePath(name: string): string {
    return path.join(PATHS.AUTH, `${name}.json`);
  }

  public hasStorageState(name: string): boolean {
    return fs.existsSync(this.getStorageStatePath(name));
  }
}
