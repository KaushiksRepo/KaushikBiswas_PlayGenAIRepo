import * as fs from 'fs';
import * as path from 'path';
import { IFileInfo } from '../types/framework.types';

export class FileUtility {
  public static readJson<T = unknown>(filePath: string): T {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  }

  public static writeJson<T>(filePath: string, data: T, pretty: boolean = true): void {
    this.ensureDir(path.dirname(filePath));
    const content = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  public static readText(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8');
  }

  public static writeText(filePath: string, content: string): void {
    this.ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  public static exists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  public static delete(filePath: string): void {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  public static ensureDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  public static cleanDir(dirPath: string): void {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
    fs.mkdirSync(dirPath, { recursive: true });
  }

  public static listFiles(dirPath: string, extension?: string): string[] {
    if (!fs.existsSync(dirPath)) {
      return [];
    }

    const files = fs.readdirSync(dirPath, { recursive: true }) as string[];
    if (extension) {
      return files.filter((file) => file.endsWith(extension));
    }
    return files;
  }

  public static getFileInfo(filePath: string): IFileInfo {
    const stats = fs.statSync(filePath);
    return {
      path: filePath,
      name: path.basename(filePath),
      extension: path.extname(filePath),
      size: stats.size,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
    };
  }

  public static copyFile(source: string, destination: string): void {
    this.ensureDir(path.dirname(destination));
    fs.copyFileSync(source, destination);
  }

  public static appendText(filePath: string, content: string): void {
    this.ensureDir(path.dirname(filePath));
    fs.appendFileSync(filePath, content, 'utf-8');
  }
}
