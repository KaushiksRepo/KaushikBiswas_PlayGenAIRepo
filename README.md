import { PlannerAgent } from "../agents/planner/PlannerAgent";
import { GeneratorAgent } from "../agents/generator/GeneratorAgent";
import { ReviewerAgent } from "../agents/reviewer/ReviewerAgent";
import { HealerAgent } from "../agents/healer/HealerAgent";

import { AIWorkflowRequest } from "./AIWorkflowRequest";
import { AIWorkflowResponse } from "./AIWorkflowResponse";
import { WorkflowContext } from "./WorkflowContext";

export class AIOrchestrator {

    constructor(

        private readonly planner: PlannerAgent,

        private readonly generator: GeneratorAgent,

        private readonly reviewer: ReviewerAgent,

        private readonly healer: HealerAgent

    ) {}

    async execute(
        request: AIWorkflowRequest
    ): Promise<AIWorkflowResponse> {

        const context: WorkflowContext = {
            requirement: request.requirement
        };

        // Step 1 - Planning

        const plannerResponse = await this.planner.plan({
            requirement: context.requirement
        });

        context.testPlan = plannerResponse.testPlan;

        // Step 2 - Code Generation

        const generatorResponse = await this.generator.generate({
            testPlan: context.testPlan
        });

        context.generatedCode = generatorResponse.generatedCode;

        // Step 3 - Review

        const reviewerResponse = await this.reviewer.review({
            generatedCode: context.generatedCode
        });

        context.reviewComments = reviewerResponse.reviewComments;

        // Step 4 - Healing

        const healerResponse = await this.healer.heal({

            generatedCode: context.generatedCode,

            reviewComments: context.reviewComments

        });

        context.healedCode = healerResponse.healedCode;

        return {

            finalCode: context.healedCode

        };

    }

}


export interface AIWorkflowRequest {

    requirement: string;

    execute?: boolean;

    review?: boolean;

    heal?: boolean;

}


import { ExecutionResult } from "../playwright/Models/ExecutionResult";
import { ReviewResult } from "../agents/reviewer/Reviewer_Models/ReviewResult";
import { HealResult } from "../agents/healer/Models/HealResult";

export interface WorkflowContext {

    requirement: string;

    testPlan?: string;

    generatedCode?: string;

    executionResult?: ExecutionResult;

    reviewResult?: ReviewResult;

    healResult?: HealResult;

}