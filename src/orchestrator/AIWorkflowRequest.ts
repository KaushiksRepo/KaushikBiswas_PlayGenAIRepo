import { RequirementSource } from "../requirement/Models/RequirementSource";

export interface AIWorkflowRequest {

    requirementSource: RequirementSource;

    requirementLocation: string;

    projectRoot: string;

}