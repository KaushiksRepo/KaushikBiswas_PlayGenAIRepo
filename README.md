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




import { promises as fs } from "fs";
import * as path from "path";
import { FileSystemService } from "./FileSystemService";

export class NodeFileSystemService implements FileSystemService {

    async createDirectory(directoryPath: string): Promise<void> {
        await fs.mkdir(directoryPath, { recursive: true });
    }

    async writeFile(filePath: string, content: string): Promise<void> {

        await this.createDirectory(path.dirname(filePath));

        await fs.writeFile(filePath, content, "utf8");

    }

    async readFile(filePath: string): Promise<string> {
        return await fs.readFile(filePath, "utf8");
    }

    async updateFile(filePath: string, content: string): Promise<void> {
        await fs.writeFile(filePath, content, "utf8");
    }

    async deleteFile(filePath: string): Promise<void> {
        await fs.unlink(filePath);
    }

    async exists(filePath: string): Promise<boolean> {

        try {

            await fs.access(filePath);

            return true;

        } catch {

            return false;

        }

    }

}




import { ArtifactWriter } from "../Writers/ArtifactWriter";
import { ProjectGenerationRequest } from "../Models/ProjectGenerationRequest";
import { ProjectGenerationResponse } from "../Models/ProjectGenerationResponse";

export class PlaywrightProjectGenerator {

    constructor(
        private readonly writers: ArtifactWriter[]
    ) {}

    async generate(
        request: ProjectGenerationRequest
    ): Promise<ProjectGenerationResponse> {

        const generatedFiles: string[] = [];

        for (const artifact of request.artifacts) {

            const writer = this.writers.find(writer =>
                writer.supports(artifact.type)
            );

            if (!writer) {
                throw new Error(
                    `No writer found for artifact type ${artifact.type}`
                );
            }

            await writer.write(
                request.projectRoot,
                artifact
            );

            generatedFiles.push(artifact.relativePath);

        }

        return {
            success: true,
            projectLocation: request.projectRoot,
            generatedFiles
        };

    }

}