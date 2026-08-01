import { PlannerAgent } from "../agents/planner/PlannerAgent";
import { GeneratorAgent } from "../agents/generator/GeneratorAgent";
import { ReviewerAgent } from "../agents/reviewer/ReviewerAgent";
import { HealerAgent } from "../agents/healer/HealerAgent";

import { AIWorkflowRequest } from "./AIWorkflowRequest";
import { AIWorkflowResponse } from "./AIWorkflowResponse";

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

    const plannerResponse =
        await this.planner.plan({
            requirement: request.requirement
        });

    const generatorResponse =
        await this.generator.generate({
            testPlan: plannerResponse.testPlan
        });

    return {

        generatedCode:
            generatorResponse.generatedCode,

        finalCode:
            generatorResponse.generatedCode

    };

}

}