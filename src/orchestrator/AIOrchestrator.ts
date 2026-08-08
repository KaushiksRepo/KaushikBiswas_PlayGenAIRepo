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

import { HealedProjectUpdater } from "../playwright/Updater/HealedProjectUpdater";

export class AIOrchestrator {

    private readonly artifactMapper = new GeneratedArtifactMapper();
    private readonly healedProjectUpdater =new HealedProjectUpdater();

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

            
             // Step 6 - Review + Healing Loop

const MAX_HEALING_ATTEMPTS = 3;

let finalCode =
    generatorResponse.generatedCode;

let finalExecutionResult =
    executionResult;

let finalReviewResult =
    await this.reviewer.review(
        finalExecutionResult
    );

    console.log("================================");
console.log("AI Review Result");
console.log("================================");

console.log("Failure Type  :", finalReviewResult.failureType);
console.log("Should Heal   :", finalReviewResult.shouldHeal);
console.log("Is Healable   :", finalReviewResult.isHealable);
console.log("Explanation   :", finalReviewResult.aiExplanation);

console.log("================================");

let healResult;

let healingAttempt = 0;

while (

    finalReviewResult.shouldHeal &&

    finalReviewResult.isHealable &&

    healingAttempt < MAX_HEALING_ATTEMPTS

)

{

    healingAttempt++;

    console.log("========================================");
    console.log(`AI Healing Attempt ${healingAttempt}`);
    console.log("========================================");

    healResult =
        await this.healer.heal({

            executionResult:
                finalExecutionResult,

            failureAnalysis:
                finalReviewResult.failureAnalysis!,

            reviewResult:
                finalReviewResult,

            generatedCode:
                finalCode

        });

    finalCode =
        healResult.healedCode;

    await this.healedProjectUpdater.update(

        request.projectRoot,

        finalCode

    );

    finalExecutionResult =
        await this.executor.execute(
            executionRequest
        );

    finalReviewResult =
        await this.reviewer.review(
            finalExecutionResult
        );

    if (!finalReviewResult.shouldHeal) {

        console.log("========================================");
        console.log("Healing Successful");
        console.log("========================================");

        break;

    }

}

if (

    finalReviewResult.shouldHeal &&

    !finalReviewResult.isHealable

) {

    console.log("================================");
    console.log("AI decided this failure cannot");
    console.log("be healed automatically.");
    console.log("================================");

}

if (

    finalReviewResult.shouldHeal &&

    healingAttempt == MAX_HEALING_ATTEMPTS

) {

    console.log("========================================");
    console.log("Maximum Healing Attempts Reached");
    console.log("========================================");

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