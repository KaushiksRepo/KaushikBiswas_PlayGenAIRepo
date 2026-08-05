import { Application } from "./bootstrap/Application";
import { RequirementSource } from "./requirement/Models/RequirementSource";


async function main() {

    const orchestrator =
        Application.create();

    const result =
    await orchestrator.execute({

        requirementSource: RequirementSource.JIRA,

        requirementLocation:
            "https://kaushikbiswas.atlassian.net/browse/KAN-1",

        projectRoot:
            "C:\\Users\\TECHVITY\\Desktop\\myproject\\PlayGenAI_KaushiksRepo\\KaushikBiswas_PlayGenAIRepo\\sample-playwright-project"

    });

    console.log("========== FINAL RESULT ==========");

    console.log(result);

}

main().catch(console.error);