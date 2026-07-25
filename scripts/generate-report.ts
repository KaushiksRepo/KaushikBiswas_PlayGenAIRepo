import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

const REPORTS_DIR = path.resolve(__dirname, '..', 'reports');
const ALLURE_RESULTS = path.join(REPORTS_DIR, 'allure-results');
const ALLURE_REPORT = path.join(REPORTS_DIR, 'allure-report');

function parseArgs(): { open: boolean; clean: boolean } {
  const args = process.argv.slice(2);
  return {
    open: args.includes('--open'),
    clean: args.includes('--clean'),
  };
}

function checkAllureInstalled(): boolean {
  try {
    execSync('allure --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function generateAllureReport(open: boolean, clean: boolean): void {
  if (!fs.existsSync(ALLURE_RESULTS)) {
    console.error(`Allure results not found at: ${ALLURE_RESULTS}`);
    console.error('Run tests first to generate results.');
    process.exit(1);
  }

  const resultFiles = fs.readdirSync(ALLURE_RESULTS).filter((f) => f.endsWith('.json'));
  if (resultFiles.length === 0) {
    console.error('No result files found in allure-results/');
    console.error('Run tests first to generate results.');
    process.exit(1);
  }

  console.log('Generating Allure report...');
  console.log(`  Results: ${ALLURE_RESULTS}`);
  console.log(`  Output:  ${ALLURE_REPORT}`);
  console.log('');

  const cleanFlag = clean ? ' --clean' : '';
  const generateCmd = `allure generate "${ALLURE_RESULTS}"${cleanFlag} -o "${ALLURE_REPORT}"`;

  try {
    execSync(generateCmd, { stdio: 'inherit' });
    console.log('');
    console.log('Allure report generated successfully.');

    if (open) {
      console.log('Opening report in browser...');
      execSync(`allure open "${ALLURE_REPORT}"`, { stdio: 'inherit' });
    }
  } catch (error) {
    console.error('Failed to generate Allure report:', error);
    process.exit(1);
  }
}

function run(): void {
  const options = parseArgs();

  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║           PlayGenAI Report Generator                    ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log('');

  if (!checkAllureInstalled()) {
    console.warn('WARNING: Allure CLI is not installed.');
    console.warn('Install it via: npm install -g allure-commandline');
    console.warn('Or via: brew install allure (macOS) / scoop install allure (Windows)');
    console.warn('');
    console.warn('Skipping Allure report generation.');
    console.warn('JSON and HTML reports are available at:');
    console.warn(`  ${path.join(REPORTS_DIR, 'json')}`);
    console.warn(`  ${path.join(REPORTS_DIR, 'html')}`);
    process.exit(0);
  }

  generateAllureReport(options.open, options.clean);
}

run();
