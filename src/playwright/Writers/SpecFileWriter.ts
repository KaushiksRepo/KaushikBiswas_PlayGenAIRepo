import { FileSystemService } from "../FileSystem/FileSystemService";

export class SpecFileWriter {

    constructor(
        private readonly fileSystemService: FileSystemService
    ) {}

    async write(): Promise<void> {
        throw new Error("Not implemented");
    }

}