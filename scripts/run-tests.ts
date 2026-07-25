import { execSync } from 'child_process';
import * as path from 'path';

interface IRunOptions {
  profile?: string;
  tags?: string;
  browser?: string;
  env?: string;
  parallel?: number;
  retry?: number;
  features?: string;
  dryRun?: boolean;
}

function parseArgs(): IRunOptions {
  const args = process.argv.slice(2);
  const options: IRunOptions = {};

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--profile':
      case '-p':
        options.profile = args[++i];
        break;
      case '--tags':
      case '-t':
        options.tags = args[++i];
        break;
      case '--browser':
      case '-b':
        options.browser = args[++i];
        break;
      case '--env':
      case '-e':
        options.env = args[++i];
        break;
      case '--parallel':
        options.parallel = parseInt(args[++i], 10);
        break;
      case '--retry':
        options.retry = parseInt(args[++i], 10);
        break;
      case '--features':
      case '-f':
        options.features = args[++i];
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
    }
  }

  return options;
}

function buildCommand(options: IRunOptions): string {
  const parts: string[] = ['npx', 'cucumber-js'];

  // Profile
  if (options.profile) {
    parts.push('--profile', options.profile);
  }

  // Tags
  if (options.tags) {
    parts.push('--tags', `"${options.tags}"`);
  }

  // Parallel workers
  if (options.parallel && options.parallel > 1) {
    parts.push('--parallel', String(options.parallel));
  }

  // Retry
  if (options.retry) {
    parts.push('--retry', String(options.retry));
  }

  // Feature paths
  if (options.features) {
    parts.push(options.features);
  }

  // Dry run
  if (options.dryRun) {
    parts.push('--dry-run');
  }

  return parts.join(' ');
}

function buildEnvVars(options: IRunOptions): Record<string, string> {
  const env: Record<string, string> = {};

  if (options.env) {
    env['ENV'] = options.env;
  }

  if (options.browser) {
    env['BROWSER'] = options.browser;
  }

  return env;
}

function run(): void {
  const options = parseArgs();
  const command = buildCommand(options);
  const envVars = buildEnvVars(options);

  const envString = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join(' ');

  const fullCommand = envString ? `${envString} ${command}` : command;

  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║           PlayGenAI Test Execution                      ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  Environment : ${(options.env || 'dev').padEnd(40)}║`);
  console.log(`║  Browser     : ${(options.browser || 'chromium').padEnd(40)}║`);
  console.log(`║  Profile     : ${(options.profile || 'default').padEnd(40)}║`);
  console.log(`║  Tags        : ${(options.tags || 'all').padEnd(40)}║`);
  console.log(`║  Parallel    : ${String(options.parallel || 1).padEnd(40)}║`);
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`> ${fullCommand}`);
  console.log('');

  try {
    execSync(fullCommand, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
      env: { ...process.env, ...envVars },
      shell: process.platform === 'win32' ? 'cmd.exe' : '/bin/sh',
    });
    process.exit(0);
  } catch (error) {
    const exitCode = (error as { status?: number }).status || 1;
    process.exit(exitCode);
  }
}

run();
