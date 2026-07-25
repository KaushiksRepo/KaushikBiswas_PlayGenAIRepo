import { IScenarioResult } from '../../reporters/report.manager';

/**
 * AI Analyzer Agent Interface
 *
 * Responsible for analyzing test results, identifying patterns,
 * and providing actionable insights.
 */
export interface IAiAnalyzer {
  /**
   * Analyze test execution results and generate insights.
   */
  analyzeResults(results: IScenarioResult[]): Promise<IAnalysisReport>;

  /**
   * Identify flaky tests based on historical data.
   */
  identifyFlakyTests(history: ITestHistory[]): Promise<IFlakyTestReport>;

  /**
   * Generate recommendations for test improvement.
   */
  getRecommendations(results: IScenarioResult[]): Promise<IRecommendation[]>;

  /**
   * Analyze test coverage gaps.
   */
  analyzeCoverageGaps(
    features: string[],
    existingTests: string[],
  ): Promise<ICoverageGapReport>;
}

export interface IAnalysisReport {
  summary: string;
  insights: IInsight[];
  trends: ITrend[];
  riskAreas: IRiskArea[];
  generatedAt: string;
}

export interface IInsight {
  type: 'pattern' | 'anomaly' | 'improvement' | 'risk';
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  actionable: boolean;
  suggestedAction?: string;
}

export interface ITrend {
  metric: string;
  direction: 'improving' | 'declining' | 'stable';
  currentValue: number;
  previousValue: number;
  period: string;
}

export interface IRiskArea {
  area: string;
  riskLevel: number;
  failureRate: number;
  lastFailure: string;
  suggestedAction: string;
}

export interface ITestHistory {
  testName: string;
  executions: {
    date: string;
    status: 'passed' | 'failed' | 'skipped';
    duration: number;
    error?: string;
  }[];
}

export interface IFlakyTestReport {
  flakyTests: {
    testName: string;
    flakinessScore: number;
    failurePattern: string;
    suggestedFix: string;
  }[];
  totalAnalyzed: number;
  flakyPercentage: number;
}

export interface IRecommendation {
  category: 'performance' | 'reliability' | 'coverage' | 'maintenance';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  priority: number;
}

export interface ICoverageGapReport {
  coveredAreas: string[];
  uncoveredAreas: string[];
  coveragePercentage: number;
  suggestedTests: {
    area: string;
    suggestedScenarios: string[];
    priority: number;
  }[];
}
