import * as path from "path";

import { FileSystemService } from "../FileSystem/FileSystemService";
import { ArtifactWriter } from "./ArtifactWriter";
import { ArtifactType } from "../Models/ArtifactType";
import { GeneratedArtifact } from "../Models/GeneratedArtifact";

export class SpecFileWriter implements ArtifactWriter {

    constructor(
        private readonly fileSystemService: FileSystemService
    ) {}

    supports(type: ArtifactType): boolean {

        return type === ArtifactType.SPEC;

    }

    async write(
        projectRoot: string,
        artifact: GeneratedArtifact
    ): Promise<void> {

        const filePath = path.join(
            projectRoot,
            artifact.relativePath
        );

        await this.fileSystemService.writeFile(
            filePath,
            artifact.content
        );

    }

}