import { Application } from "./bootstrap/Application";
import { RequirementSource } from "./requirement/Models/RequirementSource";

function getArgument(name: string): string {

    const argument = process.argv.find(arg =>
        arg.startsWith(`--${name}=`)
    );

    if (!argument) {
        throw new Error(`Missing command line argument: --${name}`);
    }

    return argument.substring(argument.indexOf("=") + 1);

}

function getRequirementSource(value: string): RequirementSource {

    switch (value.toLowerCase()) {

        case "jira":
            return RequirementSource.JIRA;

        case "azure":
            return RequirementSource.AZURE_DEVOPS;

        case "text":
            return RequirementSource.TEXT_FILE;

        default:
            throw new Error(`Unsupported requirement source: ${value}`);

    }

}

async function main() {

    const orchestrator =
        Application.create();

    const result =
        await orchestrator.execute({

            requirementSource:
                getRequirementSource(
                    getArgument("source")
                ),

            requirementLocation:
                getArgument("location"),

            projectRoot:
                getArgument("project")

        });

    console.log("========== FINAL RESULT ==========");

    console.log(result);

}

main().catch(console.error);