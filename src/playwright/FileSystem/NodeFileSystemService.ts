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