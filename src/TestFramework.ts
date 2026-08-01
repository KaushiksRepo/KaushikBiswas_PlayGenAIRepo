import { PlaywrightExecutor } from "./playwright/Executor/PlaywrightExecutor";
import { ExecutionRequest } from "./playwright/Models/ExecutionRequest";

async function main() {

    const executor = new PlaywrightExecutor();

    const request: ExecutionRequest = {
        projectRoot: "V:\\PlayGenAI\\sample-playwright-project",
        browser: "chromium",
        headed: false,
        workers: 1,
        retries: 0,
        timeout: 30000
    };

    const result = await executor.execute(request);

    console.log("Framework execution completed.");
    console.log(result);

}

main().catch(console.error);