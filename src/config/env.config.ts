import * as dotenv from 'dotenv';
import * as path from 'path';
import {
  IEnvironmentConfig,
  Environment,
  BrowserType,
  LogLevel,
} from '../types/config.types';
import { PATHS } from '../constants/paths';

export class EnvConfig {
  private static instance: EnvConfig;
  private config: IEnvironmentConfig;

  private constructor() {
    const env = this.resolveEnvironment();
    this.loadEnvFile(env);
    this.config = this.parseConfig();
  }

  public static getInstance(): EnvConfig {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig();
    }
    return EnvConfig.instance;
  }

  public static reset(): void {
    EnvConfig.instance = undefined as unknown as EnvConfig;
  }

  public getConfig(): IEnvironmentConfig {
    return { ...this.config };
  }

  public get<K extends keyof IEnvironmentConfig>(key: K): IEnvironmentConfig[K] {
    return this.config[key];
  }

  private resolveEnvironment(): Environment {
    const env = (process.env.ENV || process.env.NODE_ENV || 'dev') as Environment;
    const validEnvs: Environment[] = ['dev', 'qa', 'uat', 'stage', 'prod'];

    if (!validEnvs.includes(env)) {
      throw new Error(`Invalid environment: "${env}". Valid: ${validEnvs.join(', ')}`);
    }

    return env;
  }

  private loadEnvFile(env: Environment): void {
    const envFilePath = path.join(PATHS.ENV_DIR, `.env.${env}`);
    const result = dotenv.config({ path: envFilePath });

    if (result.error) {
      throw new Error(`Failed to load environment file: ${envFilePath}. ${result.error.message}`);
    }
  }

  private parseConfig(): IEnvironmentConfig {
    return {
      baseUrl: this.getEnvVar('BASE_URL'),
      appName: this.getEnvVar('APP_NAME', 'PlayGenAI'),
      browser: this.getEnvVar('BROWSER', 'chromium') as BrowserType,
      headless: this.getEnvBool('HEADLESS', true),
      slowMo: this.getEnvNum('SLOW_MO', 0),
      viewportWidth: this.getEnvNum('VIEWPORT_WIDTH', 1920),
      viewportHeight: this.getEnvNum('VIEWPORT_HEIGHT', 1080),
      defaultTimeout: this.getEnvNum('DEFAULT_TIMEOUT', 30000),
      navigationTimeout: this.getEnvNum('NAVIGATION_TIMEOUT', 60000),
      expectTimeout: this.getEnvNum('EXPECT_TIMEOUT', 10000),
      workers: this.getEnvNum('WORKERS', 2),
      retries: this.getEnvNum('RETRIES', 1),
      retryDelay: this.getEnvNum('RETRY_DELAY', 1000),
      screenshotOnFailure: this.getEnvBool('SCREENSHOT_ON_FAILURE', true),
      videoOnFailure: this.getEnvBool('VIDEO_ON_FAILURE', true),
      traceOnFailure: this.getEnvBool('TRACE_ON_FAILURE', true),
      logLevel: this.getEnvVar('LOG_LEVEL', 'info') as LogLevel,
      logDir: this.getEnvVar('LOG_DIR', 'logs'),
      apiBaseUrl: this.getEnvVar('API_BASE_URL', ''),
      apiTimeout: this.getEnvNum('API_TIMEOUT', 30000),
    };
  }

  private getEnvVar(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (value === undefined || value === '') {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`Required environment variable "${key}" is not set.`);
    }
    return value;
  }

  private getEnvBool(key: string, defaultValue: boolean): boolean {
    const value = process.env[key];
    if (value === undefined || value === '') {
      return defaultValue;
    }
    return value.toLowerCase() === 'true';
  }

  private getEnvNum(key: string, defaultValue: number): number {
    const value = process.env[key];
    if (value === undefined || value === '') {
      return defaultValue;
    }
    const parsed = Number(value);
    if (isNaN(parsed)) {
      throw new Error(`Environment variable "${key}" must be a number. Got: "${value}"`);
    }
    return parsed;
  }
}
