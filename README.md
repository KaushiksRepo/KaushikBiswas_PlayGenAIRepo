import { PlannerAgent } from "./agents/planner/PlannerAgent";
import { GeneratorAgent } from "./agents/generator/GeneratorAgent";

import { AICore } from "./../ai-core/src/services/aicore";

async function main() {

    const aiCore = new AICore();

    const planner = new PlannerAgent(aiCore);

    const generator = new GeneratorAgent(aiCore);

    const requirement = `
As a user,
I want to login using valid credentials
so that I can access the dashboard.
`;

    console.log("========== PLANNER ==========");

    const plannerResult = await planner.plan({

        requirement

    });

    console.log(plannerResult);

    console.log("========== GENERATOR ==========");

    const generatorResult = await generator.generate({

        testPlan: plannerResult.testPlan

    });

    console.log(generatorResult.generatedCode);

}

main().catch(console.error);