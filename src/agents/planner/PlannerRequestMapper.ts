import { AIRequest } from "../../../ai-core/src/models/AIRequest";
import { Provider } from "../../../ai-core/src/models/Provider";
import { PlannerRequest } from "./PlannerRequest";

export class PlannerRequestMapper {

    toAIRequest(
        request: PlannerRequest
    ): AIRequest {

        const prompt = `
You are a Senior QA Automation Architect.

Generate a comprehensive Playwright test plan.

Title:
${request.requirement.title}

Description:
${request.requirement.description}

Acceptance Criteria:
${request.requirement.acceptanceCriteria}
`;

        return {

            provider: Provider.MOCK,

            model: "gpt-5.5",

            template: "planner",

            input: prompt

        };

    }

}