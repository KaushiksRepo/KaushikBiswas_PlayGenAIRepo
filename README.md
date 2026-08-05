import { IRequirementProvider } from "../Provider/IRequirementProvider";
import { RequirementSource } from "../Models/RequirementSource";

import { JiraRequirementProvider } from "../Sources/Jira/JiraRequirementProvider";
import { AzureDevOpsRequirementProvider } from "../Sources/AzureDevops/AzureDevOpsRequirementProvider";
import { TextFileRequirementProvider } from "../Sources/Text/TextFileRequirementProvider";

export class RequirementProviderFactory {

    static create(
        source: RequirementSource
    ): IRequirementProvider {

        switch (source) {

            case RequirementSource.JIRA:
                return new JiraRequirementProvider();

            case RequirementSource.AZURE_DEVOPS:
                return new AzureDevOpsRequirementProvider();

            case RequirementSource.TEXT_FILE:
                return new TextFileRequirementProvider();

            default:
                throw new Error(
                    `Unsupported Requirement Source: ${source}`
                );

        }

    }

}







import { AICore } from "../../ai-core/src/services/aicore";

import { PlannerAgent } from "../agents/planner/PlannerAgent";
import { GeneratorAgent } from "../agents/generator/GeneratorAgent";
import { ReviewerAgent } from "../agents/reviewer/ReviewerAgent";

import { AIOrchestrator } from "../orchestrator/AIOrchestrator";

import { PlaywrightExecutor } from "../playwright/Executor/PlaywrightExecutor";
import { PlaywrightProjectGenerator } from "../playwright/Generator/PlaywrightProjectGenerator";

import { NodeFileSystemService } from "../playwright/FileSystem/NodeFileSystemService";
import { SpecFileWriter } from "../playwright/Writers/SpecFileWriter";

import { JiraRequirementProvider } from "../requirement/Sources/Jira/JiraRequirementProvider";
import { JiraRestClient } from "../requirement/Sources/Jira/JiraRestClient";
import { JiraStoryMapper } from "../requirement/Sources/Jira/JiraStoryMapper";
import { JiraConfiguration } from "../requirement/Sources/Jira/JiraConfiguration";

export class Application {

    static create(): AIOrchestrator {

        // ==========================
        // AI Core
        // ==========================

        const aiCore = new AICore();

        // ==========================
        // AI Agents
        // ==========================

        const planner =
            new PlannerAgent(aiCore);

        const generator =
            new GeneratorAgent(aiCore);

        const reviewer =
            new ReviewerAgent(aiCore);

        // ==========================
        // Playwright Components
        // ==========================

        const fileSystem =
            new NodeFileSystemService();

        const specWriter =
            new SpecFileWriter(fileSystem);

        const projectGenerator =
            new PlaywrightProjectGenerator([
                specWriter
            ]);

        const executor =
            new PlaywrightExecutor();

        // ==========================
        // Jira Components
        // ==========================

        const jiraConfiguration: JiraConfiguration = {

            baseUrl:
                process.env.JIRA_BASE_URL ?? "",

            email:
                process.env.JIRA_EMAIL ?? "",

            apiToken:
                process.env.JIRA_API_TOKEN ?? ""

        };

        const jiraRestClient =
            new JiraRestClient(
                jiraConfiguration
            );

        const jiraStoryMapper =
            new JiraStoryMapper();

        const requirementProvider =
            new JiraRequirementProvider(

                jiraRestClient,

                jiraStoryMapper

            );

        // ==========================
        // AI Orchestrator
        // ==========================

        return new AIOrchestrator(

            requirementProvider,

            planner,

            generator,

            projectGenerator,

            executor,

            reviewer

        );

    }

}





import { PlannerAgent } from "../agents/planner/PlannerAgent";
import { GeneratorAgent } from "../agents/generator/GeneratorAgent";
import { ReviewerAgent } from "../agents/reviewer/ReviewerAgent";

import { PlaywrightProjectGenerator } from "../playwright/Generator/PlaywrightProjectGenerator";
import { PlaywrightExecutor } from "../playwright/Executor/PlaywrightExecutor";
import { GeneratedArtifactMapper } from "../playwright/Mapper/GeneratedArtifactMapper";

import { ExecutionRequest } from "../playwright/Models/ExecutionRequest";

import { AIWorkflowRequest } from "./AIWorkflowRequest";
import { AIWorkflowResponse } from "./AIWorkflowResponse";
import { IRequirementProvider } from "../requirement/Provider/IRequirementProvider";


export class AIOrchestrator {

    private readonly artifactMapper = new GeneratedArtifactMapper();

    constructor(

    private readonly requirementProvider: IRequirementProvider,

    private readonly planner: PlannerAgent,

    private readonly generator: GeneratorAgent,

    private readonly projectGenerator: PlaywrightProjectGenerator,

    private readonly executor: PlaywrightExecutor,

    private readonly reviewer: ReviewerAgent

) {}

    async execute(
        request: AIWorkflowRequest
    ): Promise<AIWorkflowResponse> {

        // Step 1 - Planning

       const requirement =
    await this.requirementProvider.getRequirement(
        request.requirementLocation
    );

const plannerResponse =
    await this.planner.plan({

        requirement:
`
             Title: ${requirement.title}
             Description: ${requirement.description}
             Acceptance Criteria: ${requirement.acceptanceCriteria}
`

    });

        // Step 2 - Code Generation

        const generatorResponse =
            await this.generator.generate({

                testPlan: plannerResponse.testPlan

            });

        // Step 3 - Convert generated code into Playwright artifacts

        const artifacts =
            this.artifactMapper.map(
                generatorResponse.generatedCode
            );

        // Step 4 - Generate Playwright project files

        await this.projectGenerator.generate({

            projectRoot: request.projectRoot,

            artifacts

        });

        // Step 5 - Execute Playwright

        const executionRequest: ExecutionRequest = {

            projectRoot: request.projectRoot,

            browser: "chromium",

            headed: true,

            workers: 1,

            retries: 0,

            timeout: 30000

        };

        const executionResult =
            await this.executor.execute(
                executionRequest
            );

        // Step 6 - AI Review

       const reviewerResponse =
    await this.reviewer.review(
        executionResult
    );

        // Step 7 - Return workflow response

        return {

            generatedCode:
                generatorResponse.generatedCode,

            finalCode:
                generatorResponse.generatedCode,

            executionResult,

            reviewResult:
                reviewerResponse

        };

    }

}