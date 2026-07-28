import { AIResponse } from "../../../ai-core/src/models/AIResponse";
import { GeneratorResponse } from "./GeneratorResponse";

export class GeneratorResponseMapper {

    map(response: AIResponse): GeneratorResponse {

        return {
            generatedCode: response.output
        };

    }

}