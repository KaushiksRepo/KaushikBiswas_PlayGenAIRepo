import { AICore } from "../../ai-core/src/services/aicore";
import { PlannerAgent } from "../agents/planner/PlannerAgent";

async function main() {

    const planner = new PlannerAgent(new AICore());

    const response = await planner.plan({
        requirement: `
As a user,
I should be able to login using my email and password,
so that I can securely access my account.
`
    });

    console.log("\n========== TEST PLAN ==========\n");
    console.log(response.testPlan);

}

main().catch(console.error);