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