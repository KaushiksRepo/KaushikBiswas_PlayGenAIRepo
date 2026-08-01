import { HealResult } from "../Models/HealResult";

export class HealResponseParser {

    parse(
        response: string
    ): HealResult {

        return {

            healedCode: response,

            success: true,

            summary: "Playwright code healed successfully."

        };

    }

}