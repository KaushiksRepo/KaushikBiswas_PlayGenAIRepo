/**
 * AI Generator Agent Interface
 *
 * Responsible for generating test code artifacts:
 * feature files, step definitions, page objects.
 */
export interface IAiGenerator {
  /**
   * Generate a Cucumber feature file from a scenario description.
   */
  generateFeatureFile(input: IGeneratorInput): Promise<IGeneratedArtifact>;

  /**
   * Generate step definitions for a feature file.
   */
  generateStepDefinitions(featureContent: string): Promise<IGeneratedArtifact>;

  /**
   * Generate a page object from page analysis.
   */
  generatePageObject(pageAnalysis: IPageAnalysis): Promise<IGeneratedArtifact>;

  /**
   * Generate test data for a scenario.
   */
  generateTestData(scenario: IDataRequirement): Promise<IGeneratedArtifact>;
}

export interface IGeneratorInput {
  description: string;
  tags?: string[];
  examples?: string[];
  constraints?: string[];
  templateStyle?: 'given-when-then' | 'scenario-outline';
}

export interface IGeneratedArtifact {
  type: 'feature' | 'step-definition' | 'page-object' | 'test-data';
  filename: string;
  content: string;
  language: 'gherkin' | 'typescript' | 'json';
  confidence: number;
  generatedAt: string;
  metadata?: Record<string, unknown>;
}

export interface IPageAnalysis {
  url: string;
  title: string;
  elements: IDetectedElement[];
  forms: IDetectedForm[];
  navigation: IDetectedNavigation[];
}

export interface IDetectedElement {
  selector: string;
  type: 'button' | 'input' | 'link' | 'text' | 'image' | 'dropdown' | 'checkbox' | 'radio' | 'other';
  label?: string;
  testId?: string;
  role?: string;
  isInteractive: boolean;
}

export interface IDetectedForm {
  name?: string;
  fields: IDetectedElement[];
  submitButton?: IDetectedElement;
  action?: string;
}

export interface IDetectedNavigation {
  text: string;
  href: string;
  type: 'link' | 'button' | 'menu-item';
}

export interface IDataRequirement {
  scenarioName: string;
  fields: { name: string; type: string; constraints?: string }[];
  count?: number;
}
