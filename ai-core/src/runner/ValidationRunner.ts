import { Provider } from "../models/Provider";
import { ExecutionContext } from "../pipeline/ExecutionContext";
import { PromptStep } from "../pipeline/PromptStep";
import { ProviderStep } from "../pipeline/ProviderStep";
import { ValidationStep } from "../pipeline/ValidationStep";

async function main() {

    const context = new ExecutionContext({
        provider: Provider.OPENAI,
        model: "gpt-5.5",
        template: "planner",
        input: "Generate login test cases."
    });

    await new PromptStep().execute(context);

    await new ProviderStep().execute(context);

    await new ValidationStep().execute(context);

    console.log("Pipeline completed successfully.");
}

main().catch(console.error);