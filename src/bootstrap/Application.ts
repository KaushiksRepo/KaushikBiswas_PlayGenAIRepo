import { AICore } from "../../ai-core/src/services/aicore";

import { PlannerAgent } from "../agents/planner/PlannerAgent";
import { GeneratorAgent } from "../agents/generator/GeneratorAgent";
import { ReviewerAgent } from "../agents/reviewer/ReviewerAgent";

import { AIOrchestrator } from "../orchestrator/AIOrchestrator";

import { PlaywrightExecutor } from "../playwright/Executor/PlaywrightExecutor";
import { PlaywrightProjectGenerator } from "../playwright/Generator/PlaywrightProjectGenerator";

import { NodeFileSystemService } from "../playwright/FileSystem/NodeFileSystemService";
import { SpecFileWriter } from "../playwright/Writers/SpecFileWriter";


export class Application {

    static create(): AIOrchestrator {

        // ==========================
        // AI Core
        // ==========================

        const aiCore = new AICore();

        // ==========================
        // AI Agents
        // ==========================

        const planner =
            new PlannerAgent(aiCore);

        const generator =
            new GeneratorAgent(aiCore);

        const reviewer =
            new ReviewerAgent(aiCore);

        // ==========================
        // Playwright Components
        // ==========================

        const fileSystem =
            new NodeFileSystemService();

        const specWriter =
            new SpecFileWriter(fileSystem);

        const projectGenerator =
            new PlaywrightProjectGenerator([
                specWriter
            ]);

        const executor =
            new PlaywrightExecutor();

// Requirement Provider
// ==========================


        // ==========================
        // AI Orchestrator
        // ==========================

      return new AIOrchestrator(

    planner,

    generator,

    projectGenerator,

    executor,

    reviewer

);

    }

}