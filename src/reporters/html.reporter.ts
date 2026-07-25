import * as fs from 'fs';
import * as path from 'path';
import { PATHS } from '../constants/paths';
import { FileUtility } from '../utilities/file.utility';
import { Logger } from '../core/logger';

export class HtmlReporter {
  private static readonly logger = Logger.getInstance('html-reporter');

  public static generateReport(
    results: { name: string; status: string; duration: number; error?: string }[],
    outputPath?: string,
  ): string {
    const filePath = outputPath || path.join(PATHS.HTML_REPORT, 'report.html');
    FileUtility.ensureDir(path.dirname(filePath));

    const passed = results.filter((r) => r.status === 'passed').length;
    const failed = results.filter((r) => r.status === 'failed').length;
    const skipped = results.filter((r) => r.status === 'skipped').length;
    const total = results.length;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PlayGenAI Test Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; padding: 2rem; }
    .header { background: #1a1a2e; color: white; padding: 2rem; border-radius: 8px; margin-bottom: 2rem; }
    .header h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .stat { background: white; padding: 1.5rem; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .stat .value { font-size: 2rem; font-weight: bold; }
    .stat .label { color: #666; font-size: 0.85rem; margin-top: 0.25rem; }
    .stat.passed .value { color: #22c55e; }
    .stat.failed .value { color: #ef4444; }
    .stat.skipped .value { color: #f59e0b; }
    .results { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .results table { width: 100%; border-collapse: collapse; }
    .results th { background: #f8f9fa; padding: 1rem; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb; }
    .results td { padding: 0.75rem 1rem; border-bottom: 1px solid #f0f0f0; }
    .badge { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .badge.passed { background: #dcfce7; color: #166534; }
    .badge.failed { background: #fee2e2; color: #991b1b; }
    .badge.skipped { background: #fef3c7; color: #92400e; }
    .error { color: #991b1b; font-size: 0.8rem; margin-top: 0.25rem; font-family: monospace; }
  </style>
</head>
<body>
  <div class="header">
    <h1>PlayGenAI Test Report</h1>
    <p>Generated: ${new Date().toISOString()}</p>
  </div>
  <div class="summary">
    <div class="stat"><div class="value">${total}</div><div class="label">Total</div></div>
    <div class="stat passed"><div class="value">${passed}</div><div class="label">Passed</div></div>
    <div class="stat failed"><div class="value">${failed}</div><div class="label">Failed</div></div>
    <div class="stat skipped"><div class="value">${skipped}</div><div class="label">Skipped</div></div>
    <div class="stat"><div class="value">${total > 0 ? ((passed / total) * 100).toFixed(1) : 0}%</div><div class="label">Pass Rate</div></div>
  </div>
  <div class="results">
    <table>
      <thead><tr><th>Scenario</th><th>Status</th><th>Duration</th><th>Error</th></tr></thead>
      <tbody>
        ${results
          .map(
            (r) => `<tr>
          <td>${HtmlReporter.escapeHtml(r.name)}</td>
          <td><span class="badge ${r.status}">${r.status.toUpperCase()}</span></td>
          <td>${(r.duration / 1000).toFixed(2)}s</td>
          <td>${r.error ? `<div class="error">${HtmlReporter.escapeHtml(r.error).substring(0, 200)}</div>` : '-'}</td>
        </tr>`,
          )
          .join('\n        ')}
      </tbody>
    </table>
  </div>
</body>
</html>`;

    fs.writeFileSync(filePath, html, 'utf-8');
    HtmlReporter.logger.info(`HTML report generated: ${filePath}`);
    return filePath;
  }

  private static escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
