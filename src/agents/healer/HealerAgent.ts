import { AICore } from "../../../ai-core/src/services/aicore";

import { HealRequest } from "./Models/HealRequest";
import { HealResult } from "./Models/HealResult";

import { HealPromptBuilder } from "./Prompt/HealPromptBuilder";

import { HealerRequestMapper } from "./HealerRequestMapper";
import { HealerResponseMapper } from "./HealerResponseMapper";

export class HealerAgent {

    private readonly promptBuilder =
        new HealPromptBuilder();

    private readonly requestMapper =
        new HealerRequestMapper();

    private readonly responseMapper =
        new HealerResponseMapper();

    constructor(
        private readonly aiCore: AICore
    ) {}

    async heal(
        request: HealRequest
    ): Promise<HealResult> {

        const prompt =
            this.promptBuilder.build(request);

        const aiRequest =
            this.requestMapper.map(prompt);

        const aiResponse =
            await this.aiCore.execute(aiRequest);

        return this.responseMapper.map(
            aiResponse
        );

    }

}