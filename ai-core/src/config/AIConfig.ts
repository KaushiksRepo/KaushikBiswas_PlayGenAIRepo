import dotenv from "dotenv";

dotenv.config();

export class AIConfig {

    static getOpenAIApiKey(): string {

        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            throw new Error("OPENAI_API_KEY is not configured.");
        }

        return apiKey;
    }

}