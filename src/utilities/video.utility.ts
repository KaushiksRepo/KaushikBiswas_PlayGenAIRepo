import { Browser, BrowserContext } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { PATHS } from '../constants/paths';
import { Logger } from '../core/logger';

export interface IVideoConfig {
  dir: string;
  size?: { width: number; height: number };
}

export class VideoUtility {
  private static readonly logger = Logger.getInstance('video');

  public static getRecordingConfig(testName?: string): IVideoConfig {
    const dir = testName
      ? path.join(PATHS.REPORTS, 'videos', testName.replace(/[^a-zA-Z0-9-_]/g, '_'))
      : path.join(PATHS.REPORTS, 'videos');

    return {
      dir,
      size: { width: 1920, height: 1080 },
    };
  }

  public static async saveVideo(
    context: BrowserContext,
    testName: string,
  ): Promise<string | undefined> {
    const pages = context.pages();
    if (pages.length === 0) {
      return undefined;
    }

    const page = pages[0];
    const video = page.video();
    if (!video) {
      return undefined;
    }

    try {
      const videoPath = await video.path();
      const sanitizedName = testName.replace(/[^a-zA-Z0-9-_]/g, '_');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const destDir = path.join(PATHS.REPORTS, 'videos');
      const destPath = path.join(destDir, `${sanitizedName}-${timestamp}.webm`);

      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      await page.close();
      fs.copyFileSync(videoPath, destPath);

      VideoUtility.logger.info(`Video saved: ${destPath}`);
      return destPath;
    } catch (error) {
      VideoUtility.logger.error(
        `Failed to save video: ${error instanceof Error ? error.message : String(error)}`,
      );
      return undefined;
    }
  }

  public static async saveVideoOnFailure(
    _browser: Browser,
    context: BrowserContext,
    testName: string,
    failed: boolean,
  ): Promise<string | undefined> {
    if (!failed) {
      return undefined;
    }
    return this.saveVideo(context, `FAILURE-${testName}`);
  }
}
