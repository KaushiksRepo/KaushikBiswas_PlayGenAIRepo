import * as fs from "fs";
import * as path from "path";

export class PromptEngine {

    build(template: string, input: string): string {

        const templatePath = path.join(
            __dirname,
            "..",
            "templates",
            `${template}.md`
        );

        const prompt = fs.readFileSync(templatePath, "utf8");

        return prompt.replace("{{input}}", input);
    }

}