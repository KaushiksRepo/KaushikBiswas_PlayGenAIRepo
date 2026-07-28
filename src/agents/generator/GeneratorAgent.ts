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