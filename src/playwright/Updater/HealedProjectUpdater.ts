import * as path from "path";

import { NodeFileSystemService } from "../FileSystem/NodeFileSystemService";

export class HealedProjectUpdater {

    private readonly fileSystem =
        new NodeFileSystemService();

    async update(
        projectRoot: string,
        healedCode: string
    ): Promise<void> {

        const filePath = path.join(

            projectRoot,

            "tests",

            "generated.spec.ts"

        );

        console.log("========================================");
        console.log("UPDATING HEALED PLAYWRIGHT TEST");
        console.log("File :", filePath);
        console.log("========================================");

        await this.fileSystem.updateFile(

            filePath,

            healedCode

        );

        console.log("========================================");
        console.log("HEALED TEST UPDATED SUCCESSFULLY");
        console.log("========================================");

    }

}