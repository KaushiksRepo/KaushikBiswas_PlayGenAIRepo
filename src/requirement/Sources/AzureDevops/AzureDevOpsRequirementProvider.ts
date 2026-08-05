import { Requirement } from "../../Models/Requirement";
import { IRequirementProvider } from "../../Provider/IRequirementProvider";

export class AzureDevOpsRequirementProvider implements IRequirementProvider {

    async getRequirement(
       // source: string
    ): Promise<Requirement> {

        return {

            title: "Azure DevOps Story",

            description:
                "User should login using valid credentials.",

            acceptanceCriteria:
                "Dashboard should be displayed."

        };

    }

}