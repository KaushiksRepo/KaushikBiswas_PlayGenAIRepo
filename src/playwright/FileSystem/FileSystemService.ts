export interface FileSystemService {

    createDirectory(path: string): Promise<void>;

    writeFile(path: string, content: string): Promise<void>;

    readFile(path: string): Promise<string>;

    updateFile(path: string, content: string): Promise<void>;

    deleteFile(path: string): Promise<void>;

    exists(path: string): Promise<boolean>;

}