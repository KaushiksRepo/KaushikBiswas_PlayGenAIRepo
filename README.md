PS V:\PlayGenAI> npx ts-node src/RunFramework.ts
npm notice run playgenai@1.0.0 npx
npm notice run ts-node src/RunFramework.ts
========== PLANNER ==========
Error: OPENAI_API_KEY is not configured.
    at AIConfig.getOpenAIApiKey (V:\PlayGenAI\ai-core\src\config\AIConfig.ts:12:19)
    at new OpenAIProvider (V:\PlayGenAI\ai-core\src\provider\OpenAIProvider.ts:14:30)
    at ProviderFactory.create (V:\PlayGenAI\ai-core\src\factories\ProviderFactory.ts:12:24)
    at AICore.execute (V:\PlayGenAI\ai-core\src\services\aicore.ts:19:42)
    at PlannerAgent.plan (V:\PlayGenAI\src\agents\planner\PlannerAgent.ts:22:46)
    at main (V:\PlayGenAI\src\RunFramework.ts:22:41)
    at Object.<anonymous> (V:\PlayGenAI\src\RunFramework.ts:42:1)
    at Module._compile (node:internal/modules/cjs/loader:1830:14)
    at Module.m._compile (V:\PlayGenAI\node_modules\ts-node\src\index.ts:1618:23)
    at node:internal/modules/cjs/loader:1961:10



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