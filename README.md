import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export interface CommandResult {

    stdout: string;

    stderr: string;

    exitCode: number;

}

export class CommandRunner {

    async run(
        command: string,
        workingDirectory: string
    ): Promise<CommandResult> {

        try {

            const { stdout, stderr } = await execAsync(command, {
                cwd: workingDirectory,
                maxBuffer: 20 * 1024 * 1024
            });

            return {
                stdout,
                stderr,
                exitCode: 0
            };

        } catch (error: any) {

            return {
                stdout: error.stdout ?? "",
                stderr: error.stderr ?? error.message,
                exitCode: error.code ?? -1
            };

        }

    }

}