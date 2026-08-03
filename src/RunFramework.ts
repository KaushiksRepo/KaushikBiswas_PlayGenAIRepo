import { AICore } from "../ai-core/src/services/aicore";

import { PlannerAgent } from "./agents/planner/PlannerAgent";
import { GeneratorAgent } from "./agents/generator/GeneratorAgent";
import { ReviewerAgent } from "./agents/reviewer/ReviewerAgent";

import { AIOrchestrator } from "./orchestrator/AIOrchestrator";

import { PlaywrightExecutor } from "./playwright/Executor/PlaywrightExecutor";
import { PlaywrightProjectGenerator } from "./playwright/Generator/PlaywrightProjectGenerator";

import { NodeFileSystemService } from "./playwright/FileSystem/NodeFileSystemService";
import { SpecFileWriter } from "./playwright/Writers/SpecFileWriter";

async function main() {

    // AI Core

    const aiCore = new AICore();

    // AI Agents

    const planner = new PlannerAgent(aiCore);

    const generator = new GeneratorAgent(aiCore);

    const reviewer = new ReviewerAgent(aiCore);

    // Playwright Components

    const fileSystem = new NodeFileSystemService();

    const specWriter = new SpecFileWriter(fileSystem);

    const projectGenerator =
        new PlaywrightProjectGenerator([
            specWriter
        ]);

    const executor =
        new PlaywrightExecutor();

    // AI Orchestrator

    const orchestrator =
        new AIOrchestrator(

            planner,

            generator,

            projectGenerator,

            executor,

            reviewer

        );

    // Execute Workflow

    const result =
        await orchestrator.execute({

            requirement:
                `As a user,
                 I want to login using valid credentials
                 so that I can access the dashboard.`,

          projectRoot:
"C:\\Users\\TECHVITY\\Desktop\\myproject\\PlayGenAI\\KaushikBiswas_PlayGenAI\\sample-playwright-project"

        });

    console.log("========== FINAL RESULT ==========");

    console.log(result);

}

main().catch(console.error);