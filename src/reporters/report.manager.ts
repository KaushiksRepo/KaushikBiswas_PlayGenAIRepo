import * as fs from 'fs';
import * as path from 'path';
import { PATHS } from '../constants/paths';
import { EnvConfig } from '../config/env.config';
import { Logger } from '../core/logger';
import { FileUtility } from '../utilities/file.utility';
import { DateUtility } from '../utilities/date.utility';

export interface IExecutionSummary {
  framework: string;
  environment: string;
  browser: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalScenarios: number;
  passed: number;
  failed: number;
  skipped: number;
  passRate: string;
  retries: number;
  tags: string[];
  workers: number;
}

export class ReportManager {
  private static readonly logger = Logger.getInstance('reporter');
  private startTime: Date = new Date();
  private results: IScenarioResult[] = [];

  public start(): void {
    this.startTime = new Date();
    this.results = [];
    this.ensureReportDirs();
    ReportManager.logger.info('Report collection started');
  }

  public addResult(result: IScenarioResult): void {
    this.results.push(result);
  }

  public generateSummary(): IExecutionSummary {
    const config = EnvConfig.getInstance();
    const endTime = new Date();
    const duration = DateUtility.differenceInSeconds(this.startTime, endTime);

    const passed = this.results.filter((r) => r.status === 'passed').length;
    const failed = this.results.filter((r) => r.status === 'failed').length;
    const skipped = this.results.filter((r) => r.status === 'skipped').length;
    const total = this.results.length;
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(2) : '0.00';

    const allTags = new Set<string>();
    for (const result of this.results) {
      for (const tag of result.tags) {
        allTags.add(tag);
      }
    }

    const summary: IExecutionSummary = {
      framework: 'PlayGenAI',
      environment: process.env.ENV || 'dev',
      browser: config.get('browser'),
      startTime: this.startTime.toISOString(),
      endTime: endTime.toISOString(),
      duration,
      totalScenarios: total,
      passed,
      failed,
      skipped,
      passRate: `${passRate}%`,
      retries: this.results.reduce((sum, r) => sum + r.retryCount, 0),
      tags: Array.from(allTags),
      workers: config.get('workers'),
    };

    return summary;
  }

  public writeJsonReport(): string {
    const summary = this.generateSummary();
    const report = {
      summary,
      results: this.results,
    };

    const filename = `report-${DateUtility.timestamp()}.json`;
    const filePath = path.join(PATHS.JSON_REPORT, filename);
    FileUtility.writeJson(filePath, report);

    ReportManager.logger.info(`JSON report written: ${filePath}`);
    return filePath;
  }

  public writeEnvironmentInfo(): void {
    const config = EnvConfig.getInstance().getConfig();

    // Allure environment.properties
    const allureEnvPath = path.join(PATHS.ALLURE_RESULTS, 'environment.properties');
    const envContent = [
      `Environment=${process.env.ENV || 'dev'}`,
      `Browser=${config.browser}`,
      `Headless=${config.headless}`,
      `BaseURL=${config.baseUrl}`,
      `Workers=${config.workers}`,
      `Retries=${config.retries}`,
      `Viewport=${config.viewportWidth}x${config.viewportHeight}`,
      `OS=${process.platform}`,
      `Node=${process.version}`,
      `Timestamp=${DateUtility.isoTimestamp()}`,
    ].join('\n');

    FileUtility.ensureDir(path.dirname(allureEnvPath));
    fs.writeFileSync(allureEnvPath, envContent, 'utf-8');

    ReportManager.logger.info('Environment info written for Allure');
  }

  public writeAllureCategories(): void {
    const categories = [
      {
        name: 'Product Defects',
        matchedStatuses: ['failed'],
        messageRegex: '.*AssertionError.*',
      },
      {
        name: 'Test Infrastructure',
        matchedStatuses: ['broken'],
        messageRegex: '.*TimeoutError.*|.*NavigationError.*',
      },
      {
        name: 'Skipped Tests',
        matchedStatuses: ['skipped'],
      },
    ];

    const filePath = path.join(PATHS.ALLURE_RESULTS, 'categories.json');
    FileUtility.ensureDir(path.dirname(filePath));
    FileUtility.writeJson(filePath, categories);

    ReportManager.logger.info('Allure categories written');
  }

  public finalize(): IExecutionSummary {
    this.writeEnvironmentInfo();
    this.writeAllureCategories();
    const reportPath = this.writeJsonReport();
    const summary = this.generateSummary();

    this.printConsoleSummary(summary);
    ReportManager.logger.info(`Reports finalized. JSON: ${reportPath}`);

    return summary;
  }

  private printConsoleSummary(summary: IExecutionSummary): void {
    const divider = '═'.repeat(60);
    const lines = [
      '',
      divider,
      '  EXECUTION SUMMARY',
      divider,
      `  Environment : ${summary.environment}`,
      `  Browser     : ${summary.browser}`,
      `  Duration    : ${summary.duration}s`,
      `  Workers     : ${summary.workers}`,
      divider,
      `  Total       : ${summary.totalScenarios}`,
      `  Passed      : ${summary.passed}`,
      `  Failed      : ${summary.failed}`,
      `  Skipped     : ${summary.skipped}`,
      `  Pass Rate   : ${summary.passRate}`,
      `  Retries     : ${summary.retries}`,
      divider,
      '',
    ];

    for (const line of lines) {
      ReportManager.logger.info(line);
    }
  }

  private ensureReportDirs(): void {
    FileUtility.ensureDir(PATHS.ALLURE_RESULTS);
    FileUtility.ensureDir(PATHS.HTML_REPORT);
    FileUtility.ensureDir(PATHS.JSON_REPORT);
    FileUtility.ensureDir(PATHS.SCREENSHOTS);
  }
}

export interface IScenarioResult {
  name: string;
  feature: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  tags: string[];
  retryCount: number;
  error?: string;
  screenshot?: string;
  video?: string;
}
