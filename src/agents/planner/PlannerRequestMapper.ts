import { AIRequest } from "../../../ai-core/src/models/AIRequest";
import { Provider } from "../../../ai-core/src/models/Provider";
import { PlannerRequest } from "./PlannerRequest";

export class PlannerRequestMapper {

    toAIRequest(request: PlannerRequest): AIRequest {

        return {
            provider: Provider.OPENAI,
            model: "gpt-5.5",
            template: "planner",
            input: request.requirement
        };

    }

}