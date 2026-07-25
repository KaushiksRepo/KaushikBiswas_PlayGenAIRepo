import * as path from 'path';
import { PATHS } from '../constants/paths';
import { FileUtility } from '../utilities/file.utility';
import { Logger } from '../core/logger';
import { IScenarioResult } from './report.manager';

export class JsonReporter {
  private static readonly logger = Logger.getInstance('json-reporter');

  public static writeResults(results: IScenarioResult[], filename?: string): string {
    const file = filename || `results-${new Date().toISOString().split('T')[0]}.json`;
    const filePath = path.join(PATHS.JSON_REPORT, file);
    FileUtility.writeJson(filePath, results);

    JsonReporter.logger.info(`JSON results written: ${filePath}`);
    return filePath;
  }

  public static appendResult(result: IScenarioResult, filename?: string): void {
    const file = filename || `results-${new Date().toISOString().split('T')[0]}.json`;
    const filePath = path.join(PATHS.JSON_REPORT, file);

    let existing: IScenarioResult[] = [];
    if (FileUtility.exists(filePath)) {
      existing = FileUtility.readJson<IScenarioResult[]>(filePath);
    }

    existing.push(result);
    FileUtility.writeJson(filePath, existing);
  }

  public static readResults(filename: string): IScenarioResult[] {
    const filePath = path.join(PATHS.JSON_REPORT, filename);
    if (!FileUtility.exists(filePath)) {
      return [];
    }
    return FileUtility.readJson<IScenarioResult[]>(filePath);
  }
}
