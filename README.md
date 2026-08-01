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


import { ArtifactType } from "../Models/ArtifactType";
import { GeneratedArtifact } from "../Models/GeneratedArtifact";

export interface ArtifactWriter {

    supports(type: ArtifactType): boolean;

    write(
        projectRoot: string,
        artifact: GeneratedArtifact
    ): Promise<void>;

}



import { ArtifactType } from "./ArtifactType";
export interface GeneratedArtifact {

    fileName: string;

    relativePath: string;

    type: ArtifactType;

    content: string;

}