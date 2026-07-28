import { AIResponse } from "../../../ai-core/src/models/AIResponse";
import { PlannerResponse } from "./PlannerResponse";

export class PlannerResponseMapper {

    map(response: AIResponse): PlannerResponse {

        return {
            testPlan: response.output
        };

    }

}