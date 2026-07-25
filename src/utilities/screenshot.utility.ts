import { Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { IScreenshotOptions } from '../types/framework.types';
import { PATHS } from '../constants/paths';
import { Logger } from '../core/logger';

export class ScreenshotUtility {
  private static readonly logger = Logger.getInstance('screenshot');

  public static async capture(
    page: Page,
    name: string,
    options?: IScreenshotOptions,
  ): Promise<Buffer> {
    const screenshotPath = options?.path || this.generatePath(name, options?.type || 'png');
    this.ensureDir(path.dirname(screenshotPath));

    const buffer = await page.screenshot({
      path: screenshotPath,
      fullPage: options?.fullPage ?? false,
      type: options?.type || 'png',
      ...(options?.type === 'jpeg' && { quality: options?.quality || 80 }),
    });

    ScreenshotUtility.logger.info(`Screenshot captured: ${screenshotPath}`);
    return buffer;
  }

  public static async captureElement(
    page: Page,
    selector: string,
    name: string,
    options?: Omit<IScreenshotOptions, 'fullPage'>,
  ): Promise<Buffer> {
    const element = page.locator(selector);
    const screenshotPath = options?.path || this.generatePath(name, options?.type || 'png');
    this.ensureDir(path.dirname(screenshotPath));

    const buffer = await element.screenshot({
      path: screenshotPath,
      type: options?.type || 'png',
      ...(options?.type === 'jpeg' && { quality: options?.quality || 80 }),
    });

    ScreenshotUtility.logger.info(`Element screenshot captured: ${screenshotPath}`);
    return buffer;
  }

  public static async captureOnFailure(
    page: Page,
    testName: string,
  ): Promise<Buffer> {
    const sanitizedName = testName.replace(/[^a-zA-Z0-9-_]/g, '_');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const name = `FAILURE-${sanitizedName}-${timestamp}`;

    return this.capture(page, name, { fullPage: true });
  }

  private static generatePath(name: string, extension: string): string {
    const sanitizedName = name.replace(/[^a-zA-Z0-9-_]/g, '_');
    return path.join(PATHS.SCREENSHOTS, `${sanitizedName}.${extension}`);
  }

  private static ensureDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
}
