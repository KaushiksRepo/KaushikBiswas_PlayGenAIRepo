import { FileSystemService } from "./FileSystemService";

export class NodeFileSystemService
implements FileSystemService {

    async createDirectory(path: string): Promise<void> {
        throw new Error("Not implemented");
    }

    async writeFile(path: string, content: string): Promise<void> {
        throw new Error("Not implemented");
    }

    async readFile(path: string): Promise<string> {
        throw new Error("Not implemented");
    }

    async updateFile(path: string, content: string): Promise<void> {
        throw new Error("Not implemented");
    }

    async deleteFile(path: string): Promise<void> {
        throw new Error("Not implemented");
    }

    async exists(path: string): Promise<boolean> {
        throw new Error("Not implemented");
    }

}