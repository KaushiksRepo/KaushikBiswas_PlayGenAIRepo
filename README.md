import { AICore } from "../../../ai-core/src/services/aicore";
import { GeneratorRequest } from "./GeneratorRequest";
import { GeneratorResponse } from "./GeneratorResponse";
import { GeneratorRequestMapper } from "./GeneratorRequestMapper";
import { GeneratorResponseMapper } from "./GeneratorResponseMapper";

export class GeneratorAgent {

    private readonly requestMapper = new GeneratorRequestMapper();

    private readonly responseMapper = new GeneratorResponseMapper();

    constructor(
        private readonly aiCore: AICore
    ) {}

    async generate(
        request: GeneratorRequest
    ): Promise<GeneratorResponse> {

        const aiRequest = this.requestMapper.map(request);

        const aiResponse = await this.aiCore.execute(aiRequest);

        return this.responseMapper.map(aiResponse);

    }

}



import { AICore } from "../../../ai-core/src/services/aicore";
import { HealerRequest } from "./HealerRequest";
import { HealerResponse } from "./HealerResponse";
import { HealerRequestMapper } from "./HealerRequestMapper";
import { HealerResponseMapper } from "./HealerResponseMapper";

export class HealerAgent {

    private readonly requestMapper = new HealerRequestMapper();

    private readonly responseMapper = new HealerResponseMapper();

    constructor(
        private readonly aiCore: AICore
    ) {}

    async heal(
        request: HealerRequest
    ): Promise<HealerResponse> {

        const aiRequest = this.requestMapper.map(request);

        const aiResponse = await this.aiCore.execute(aiRequest);

        return this.responseMapper.map(aiResponse);

    }

}





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




import { AICore } from "../../../ai-core/src/services/aicore";
import { ReviewerRequest } from "./ReviewerRequest";
import { ReviewerResponse } from "./ReviewerResponse";
import { ReviewerRequestMapper } from "./ReviewerRequestMapper";
import { ReviewerResponseMapper } from "./ReviewerResponseMapper";

export class ReviewerAgent {

    private readonly requestMapper = new ReviewerRequestMapper();

    private readonly responseMapper = new ReviewerResponseMapper();

    constructor(
        private readonly aiCore: AICore
    ) {}

    async review(
        request: ReviewerRequest
    ): Promise<ReviewerResponse> {

        const aiRequest = this.requestMapper.map(request);

        const aiResponse = await this.aiCore.execute(aiRequest);

        return this.responseMapper.map(aiResponse);

    }

}