import { Logger } from '../core/logger';
import { PATHS } from '../constants/paths';
import { FileUtility } from '../utilities/file.utility';

export class AllureReporter {
  private static readonly logger = Logger.getInstance('allure-reporter');

  public static ensureResultsDir(): void {
    FileUtility.ensureDir(PATHS.ALLURE_RESULTS);
  }

  public static writeExecutorInfo(info?: Partial<IExecutorInfo>): void {
    const executor: IExecutorInfo = {
      name: info?.name || 'PlayGenAI Framework',
      type: info?.type || 'local',
      buildName: info?.buildName || `Build-${new Date().toISOString().split('T')[0]}`,
      buildUrl: info?.buildUrl || '',
      reportUrl: info?.reportUrl || '',
    };

    const filePath = `${PATHS.ALLURE_RESULTS}/executor.json`;
    FileUtility.writeJson(filePath, executor);
    AllureReporter.logger.info('Allure executor info written');
  }

  public static writeHistory(history: IAllureHistory[]): void {
    const dirPath = `${PATHS.ALLURE_RESULTS}/history`;
    FileUtility.ensureDir(dirPath);
    FileUtility.writeJson(`${dirPath}/history-trend.json`, history);
  }

  public static cleanResults(): void {
    FileUtility.cleanDir(PATHS.ALLURE_RESULTS);
    AllureReporter.logger.info('Allure results cleaned');
  }
}

export interface IExecutorInfo {
  name: string;
  type: string;
  buildName: string;
  buildUrl: string;
  reportUrl: string;
}

export interface IAllureHistory {
  buildOrder: number;
  reportUrl: string;
  passed: number;
  failed: number;
  skipped: number;
  total: number;
}
