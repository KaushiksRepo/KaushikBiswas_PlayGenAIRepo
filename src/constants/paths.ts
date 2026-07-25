import * as path from 'path';

const ROOT_DIR = path.resolve(__dirname, '..', '..');

export const PATHS = {
  /** Project root directory */
  ROOT: ROOT_DIR,

  /** Source directory */
  SRC: path.join(ROOT_DIR, 'src'),

  /** Tests directory */
  TESTS: path.join(ROOT_DIR, 'tests'),

  /** Feature files directory */
  FEATURES: path.join(ROOT_DIR, 'tests', 'features'),

  /** Step definitions directory */
  STEPS: path.join(ROOT_DIR, 'tests', 'steps'),

  /** Test data directory */
  TEST_DATA: path.join(ROOT_DIR, 'tests', 'data'),

  /** Static test data */
  STATIC_DATA: path.join(ROOT_DIR, 'tests', 'data', 'static'),

  /** Dynamic test data */
  DYNAMIC_DATA: path.join(ROOT_DIR, 'tests', 'data', 'dynamic'),

  /** Reports output directory */
  REPORTS: path.join(ROOT_DIR, 'reports'),

  /** Allure results directory */
  ALLURE_RESULTS: path.join(ROOT_DIR, 'reports', 'allure-results'),

  /** Allure report directory */
  ALLURE_REPORT: path.join(ROOT_DIR, 'reports', 'allure-report'),

  /** HTML report directory */
  HTML_REPORT: path.join(ROOT_DIR, 'reports', 'html'),

  /** JSON report directory */
  JSON_REPORT: path.join(ROOT_DIR, 'reports', 'json'),

  /** Screenshots directory */
  SCREENSHOTS: path.join(ROOT_DIR, 'reports', 'screenshots'),

  /** Logs directory */
  LOGS: path.join(ROOT_DIR, 'logs'),

  /** Auth storage state directory */
  AUTH: path.join(ROOT_DIR, 'auth'),

  /** Environment files directory */
  ENV_DIR: ROOT_DIR,
} as const;
