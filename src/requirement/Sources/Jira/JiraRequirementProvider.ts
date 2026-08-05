import { IRequirementProvider } from "../../Provider/IRequirementProvider";
import { Requirement } from "../../Models/Requirement";
import { JiraRestClient } from "./JiraRestClient";
import { JiraStoryMapper } from "./JiraStoryMapper";

export class JiraRequirementProvider implements IRequirementProvider {

    constructor(

        private readonly jiraRestClient: JiraRestClient,

        private readonly storyMapper: JiraStoryMapper

    ) {}

    async getRequirement(
        source: string
    ): Promise<Requirement> {


            console.log("========== JIRA REQUIREMENT PROVIDER ==========");
    console.log("Source:", source);
    
        const jiraIssue =
            await this.jiraRestClient.getStory(source);

        return this.storyMapper.map(jiraIssue);

    }

}