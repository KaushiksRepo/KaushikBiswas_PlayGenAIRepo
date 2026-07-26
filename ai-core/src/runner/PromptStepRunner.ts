import { Provider } from "../models/Provider";
import { ExecutionContext } from "../pipeline/ExecutionContext";
import { PromptStep } from "../pipeline/PromptStep";

async function main() {

    const context = new ExecutionContext({
        provider: Provider.OPENAI,
        model: "gpt-5.5",
        template: "planner",
        input: "Generate login test cases."
    });

    const promptStep = new PromptStep();

    await promptStep.execute(context);

    console.log(context.prompt);
}

main().catch(console.error);