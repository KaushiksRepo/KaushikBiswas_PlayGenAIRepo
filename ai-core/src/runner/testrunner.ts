import { AICore } from "../services/aicore";
import { AgentType } from "../models/AgentType";
import { Provider } from "../models/Provider";

async function main() {

    const aiCore = new AICore();

    const response = await aiCore.execute({
    provider: Provider.OPENAI,
    model: "gpt-5.5",
    template: "planner",
    input: "Generate login test cases.",
});

    console.log(response);
}

main().catch(console.error);