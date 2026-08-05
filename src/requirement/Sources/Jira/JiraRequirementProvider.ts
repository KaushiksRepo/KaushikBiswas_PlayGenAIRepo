import { Requirement } from "../../Models/Requirement";
import { IRequirementProvider } from "../../Provider/IRequirementProvider";

export class JiraRequirementProvider implements IRequirementProvider {

    async getRequirement(
        //source: string
    ): Promise<Requirement> {

        return {

            title: "Jira Login Story",

            description:
                "User should login using valid credentials.",

            acceptanceCriteria:
                "Dashboard should be displayed."

        };

    }

}