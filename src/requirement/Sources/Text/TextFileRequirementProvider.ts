import { Requirement } from "../../Models/Requirement";
import { IRequirementProvider } from "../../Provider/IRequirementProvider";

export class TextFileRequirementProvider implements IRequirementProvider {

    async getRequirement(
        //source: string
    ): Promise<Requirement> {

        return {

            title: "Text File Story",

            description:
                "User should login using valid credentials.",

            acceptanceCriteria:
                "Dashboard should be displayed."

        };

    }

}