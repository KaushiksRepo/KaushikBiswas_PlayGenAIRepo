import * as path from "path";
import { FileSystemService } from "../FileSystem/FileSystemService";
import { GeneratedArtifact } from "../Models/GeneratedArtifact";

export class DataFileWriter {

    constructor(
        private readonly fileSystemService: FileSystemService
    ) {}

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