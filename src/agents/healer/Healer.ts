import { AICore } from "../../../ai-core/src/services/aicore";

import { AIRequest } from "../../../ai-core/src/models/AIRequest";
import { Provider } from "../../../ai-core/src/models/Provider";

import { HealRequest } from "./Models/HealRequest";
import { HealResult } from "./Models/HealResult";

import { HealPromptBuilder } from "./Prompt/HealPromptBuilder";
import { HealResponseParser } from "./Parser/HealResponseParser";

export class HealerAgent {

    constructor(

        private readonly aiCore: AICore,

        private readonly promptBuilder: HealPromptBuilder,

        private readonly responseParser: HealResponseParser

    ) {}

    async heal(
        request: HealRequest
    ): Promise<HealResult> {

        const prompt =
            this.promptBuilder.build(request);

        const aiRequest: AIRequest = {

            provider: Provider.OPENAI,

            model: "gpt-5.5",

            template: "{{input}}",

            input: prompt

        };

        const response =
            await this.aiCore.execute(aiRequest);

        return this.responseParser.parse(
            response.output
        );

    }

}