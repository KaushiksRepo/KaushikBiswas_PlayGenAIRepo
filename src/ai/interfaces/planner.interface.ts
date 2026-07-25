import { IScenarioResult } from '../../reporters/report.manager';

/**
 * AI Planner Agent Interface
 *
 * Responsible for analyzing requirements and generating test plans.
 * Future integration: Jira MCP, GitHub MCP, requirement documents.
 */
export interface IAiPlanner {
  /**
   * Analyze a requirement and generate a test plan.
   */
  generateTestPlan(requirement: IRequirement): Promise<ITestPlan>;

  /**
   * Suggest test scenarios for a given feature.
   */
  suggestScenarios(feature: IFeatureDescription): Promise<ISuggestedScenario[]>;

  /**
   * Prioritize test cases based on risk analysis.
   */
  prioritize(scenarios: ISuggestedScenario[]): Promise<ISuggestedScenario[]>;
}

export interface IRequirement {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  source?: 'jira' | 'github' | 'manual';
  metadata?: Record<string, unknown>;
}

export interface ITestPlan {
  requirementId: string;
  scenarios: ISuggestedScenario[];
  coverage: ICoverageEstimate;
  generatedAt: string;
}

export interface ISuggestedScenario {
  name: string;
  description: string;
  steps: string[];
  tags: string[];
  priority: number;
  type: 'positive' | 'negative' | 'boundary' | 'edge-case';
  confidence: number;
}

export interface IFeatureDescription {
  name: string;
  description: string;
  userStory?: string;
  existingScenarios?: string[];
}

export interface ICoverageEstimate {
  functionalCoverage: number;
  edgeCaseCoverage: number;
  gaps: string[];
}

/**
 * Extension point for previous test results to inform planning.
 */
export interface IPlannerContext {
  previousResults?: IScenarioResult[];
  knownDefects?: string[];
  changedFiles?: string[];
}
