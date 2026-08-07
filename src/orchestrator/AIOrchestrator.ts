import { PlannerAgent } from "../agents/planner/PlannerAgent";
import { GeneratorAgent } from "../agents/generator/GeneratorAgent";
import { ReviewerAgent } from "../agents/reviewer/ReviewerAgent";

import { PlaywrightProjectGenerator } from "../playwright/Generator/PlaywrightProjectGenerator";
import { PlaywrightExecutor } from "../playwright/Executor/PlaywrightExecutor";
import { GeneratedArtifactMapper } from "../playwright/Mapper/GeneratedArtifactMapper";

import { ExecutionRequest } from "../playwright/Models/ExecutionRequest";

import { AIWorkflowRequest } from "./AIWorkflowRequest";
import { AIWorkflowResponse } from "./AIWorkflowResponse";
import { RequirementProviderFactory } from "../requirement/Factory/RequirementProviderFactory";

import { HealerAgent } from "../agents/healer/HealerAgent";

export class AIOrchestrator {

    private readonly artifactMapper = new GeneratedArtifactMapper();

   constructor(

    private readonly planner: PlannerAgent,

    private readonly generator: GeneratorAgent,

    private readonly projectGenerator: PlaywrightProjectGenerator,

    private readonly executor: PlaywrightExecutor,

    private readonly reviewer: ReviewerAgent,

        private readonly healer: HealerAgent


) {}

    async execute(
        request: AIWorkflowRequest
    ): Promise<AIWorkflowResponse> {

        // Step 1 - Planning

      const requirementProvider =
    RequirementProviderFactory.create(
        request.requirementSource
    );

const requirement =
    await requirementProvider.getRequirement(
        request.requirementLocation
    );

const plannerResponse =
    await this.planner.plan({

        requirement

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
let finalCode =
    generatorResponse.generatedCode;

let healResult;

let finalExecutionResult =
    executionResult;

let finalReviewResult =
    await this.reviewer.review(
        executionResult
    );

if (finalReviewResult.shouldHeal) {

    console.log("================================");
    console.log("AI Healing Started");
    console.log("================================");

    healResult =
        await this.healer.heal({

            executionResult:
                finalExecutionResult,

            failureAnalysis:
                finalReviewResult.failureAnalysis!,

            reviewResult:
                finalReviewResult,

            generatedCode:
                generatorResponse.generatedCode

        });

    finalCode =
        healResult.healedCode;

    console.log("================================");
    console.log("AI Healing Completed");
    console.log("================================");

}

        // Step 7 - Return workflow response
return {

    generatedCode:
        generatorResponse.generatedCode,

    finalCode,

    executionResult:
        finalExecutionResult,

    reviewResult:
        finalReviewResult,

    healResult

};

    }

}