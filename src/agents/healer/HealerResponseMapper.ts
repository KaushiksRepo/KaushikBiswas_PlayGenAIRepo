import { AIResponse } from "../../../ai-core/src/models/AIResponse";
import { HealResult } from "./Models/HealResult";

export class HealerResponseMapper {

    map(response: AIResponse): HealResult {

        return {

            healedCode: response.output,

            success: true,

            summary: "Healing completed successfully."

        };

    }

}