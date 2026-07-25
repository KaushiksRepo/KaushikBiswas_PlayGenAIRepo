import { Browser, BrowserContext, Page } from '@playwright/test';
import { ILogger } from './logger.types';
import { IApiClient } from './api.types';
import { IEnvironmentConfig } from './config.types';

export interface ICustomWorld {
  config: IEnvironmentConfig;
  logger: ILogger;
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  apiClient?: IApiClient;
  testName: string;
  scenarioTags: string[];
  attach: (data: Buffer | string, mediaType: string) => void;
}

export interface IHookContext {
  world: ICustomWorld;
  scenarioName: string;
  featureName: string;
  tags: string[];
}

export interface IScreenshotOptions {
  fullPage?: boolean;
  path?: string;
  type?: 'png' | 'jpeg';
  quality?: number;
}

export interface IRetryOptions {
  maxAttempts: number;
  delayMs: number;
  backoffMultiplier?: number;
  retryOn?: (error: Error) => boolean;
}

export interface IFileInfo {
  path: string;
  name: string;
  extension: string;
  size: number;
  createdAt: Date;
  modifiedAt: Date;
}
