import { existsSync } from "fs";
import * as path from "path";
import { ExecutionContext } from "./ExecutionContext";
import { ExecutionStep } from "./ExecutionStep";

export class ValidationStep implements ExecutionStep {

    async execute(
        context: ExecutionContext
    ): Promise<void> {

        const projectRoot = context.request.projectRoot;

        if (!existsSync(projectRoot)) {
            throw new Error(`Project not found: ${projectRoot}`);
        }

        if (!existsSync(path.join(projectRoot, "package.json"))) {
            throw new Error("package.json not found.");
        }

        if (!existsSync(path.join(projectRoot, "playwright.config.ts"))) {
            throw new Error("playwright.config.ts not found.");
        }

    }

}