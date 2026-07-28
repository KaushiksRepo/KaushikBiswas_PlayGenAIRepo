import { FileSystemService } from "../FileSystem/FileSystemService";

export class PageObjectWriter {

    constructor(
        private readonly fileSystemService: FileSystemService
    ) {}

    async write(): Promise<void> {
        throw new Error("Not implemented");
    }

}