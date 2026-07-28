import { AICore } from "../../../ai-core/src/services/aicore";
import { PlannerRequest } from "./PlannerRequest";
import { PlannerResponse } from "./PlannerResponse";
import { PlannerRequestMapper } from "./PlannerRequestMapper";
import { PlannerResponseMapper } from "./PlannerResponseMapper";


export class PlannerAgent {

    private readonly requestMapper = new PlannerRequestMapper();

    private readonly responseMapper = new PlannerResponseMapper();

    constructor(
        private readonly aiCore: AICore
    ) {}

    async plan(request: PlannerRequest): Promise<PlannerResponse> {

        const aiRequest = this.requestMapper.toAIRequest(request);

        const aiResponse = await this.aiCore.execute(aiRequest);

        return this.responseMapper.map(aiResponse);
    }

}