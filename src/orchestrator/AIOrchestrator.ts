import { PlannerAgent } from "../agents/planner/PlannerAgent";
import { GeneratorAgent } from "../agents/generator/GeneratorAgent";
import { ReviewerAgent } from "../agents/reviewer/ReviewerAgent";

import { PlaywrightProjectGenerator } from "../playwright/Generator/PlaywrightProjectGenerator";
import { PlaywrightExecutor } from "../playwright/Executor/PlaywrightExecutor";
import { GeneratedArtifactMapper } from "../playwright/Mapper/GeneratedArtifactMapper";

import { ExecutionRequest } from "../playwright/Models/ExecutionRequest";

import { AIWorkflowRequest } from "./AIWorkflowRequest";
import { AIWorkflowResponse } from "./AIWorkflowResponse";

export class AIOrchestrator {

    private readonly artifactMapper = new GeneratedArtifactMapper();

    constructor(

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

        const plannerResponse =
            await this.planner.plan({

                requirement: request.requirement

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