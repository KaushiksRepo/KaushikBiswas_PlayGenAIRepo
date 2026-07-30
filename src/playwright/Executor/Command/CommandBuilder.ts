import { ExecutionRequest } from "../../Models/ExecutionRequest";

export class CommandBuilder {

    build(request: ExecutionRequest): string {

        const command: string[] = ["npx", "playwright", "test"];

        if (request.testFilter) {
            command.push(`--grep="${request.testFilter}"`);
        }

        if (request.browser) {
            command.push(`--project=${request.browser}`);
        }

        if (request.headed) {
            command.push("--headed");
        }

        if (request.workers !== undefined) {
            command.push(`--workers=${request.workers}`);
        }

        if (request.retries !== undefined) {
            command.push(`--retries=${request.retries}`);
        }

        if (request.timeout !== undefined) {
            command.push(`--timeout=${request.timeout}`);
        }

       command.push("--reporter=json");
       command.push("--output=playwright-results");

        return command.join(" ");
    }

}