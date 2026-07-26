import { Provider } from "../models/Provider";
import { ExecutionContext } from "../pipeline/ExecutionContext";
import { PromptStep } from "../pipeline/PromptStep";
import { ProviderStep } from "../pipeline/ProviderStep";

async function main() {

    const context = new ExecutionContext({
        provider: Provider.OPENAI,
        model: "gpt-5.5",
        template: "planner",
        input: "Generate login test cases."
    });

    await new PromptStep().execute(context);

    await new ProviderStep().execute(context);

    console.log(context.response);
}

main().catch(console.error);