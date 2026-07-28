import { AIResponse } from "../../../ai-core/src/models/AIResponse";
import { HealerResponse } from "./HealerResponse";

export class HealerResponseMapper {

    map(response: AIResponse): HealerResponse {

        return {
            healedCode: response.output
        };

    }

}