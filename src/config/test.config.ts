import { ITestExecutionConfig, IReportConfig } from '../types/config.types';
import { PATHS } from '../constants/paths';
import { EnvConfig } from './env.config';

export class TestConfig {
  private readonly envConfig = EnvConfig.getInstance();

  public getExecutionConfig(overrides?: Partial<ITestExecutionConfig>): ITestExecutionConfig {
    const config: ITestExecutionConfig = {
      parallel: this.envConfig.get('workers') > 1,
      workers: this.envConfig.get('workers'),
      retries: this.envConfig.get('retries'),
      retryDelay: this.envConfig.get('retryDelay'),
      tags: [],
      timeout: this.envConfig.get('defaultTimeout'),
    };

    return { ...config, ...overrides };
  }

  public getReportConfig(): IReportConfig {
    return {
      outputDir: PATHS.REPORTS,
      screenshotDir: PATHS.SCREENSHOTS,
      videoDir: PATHS.REPORTS,
      traceDir: PATHS.REPORTS,
      allureResultsDir: PATHS.ALLURE_RESULTS,
      htmlReportDir: PATHS.HTML_REPORT,
      jsonReportDir: PATHS.JSON_REPORT,
      attachScreenshotOnFailure: this.envConfig.get('screenshotOnFailure'),
      attachVideoOnFailure: this.envConfig.get('videoOnFailure'),
      attachTraceOnFailure: this.envConfig.get('traceOnFailure'),
    };
  }

  public getTimeouts(): { default: number; navigation: number; expect: number } {
    return {
      default: this.envConfig.get('defaultTimeout'),
      navigation: this.envConfig.get('navigationTimeout'),
      expect: this.envConfig.get('expectTimeout'),
    };
  }
}
