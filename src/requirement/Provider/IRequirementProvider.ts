import { Requirement } from "../Models/Requirement";

export interface IRequirementProvider {

    getRequirement(
        source: string
    ): Promise<Requirement>;

}