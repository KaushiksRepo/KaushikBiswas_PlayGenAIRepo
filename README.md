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

        const jiraIssue =
            await this.jiraRestClient.getStory(source);

        return this.storyMapper.map(jiraIssue);

    }

}



import { Requirement } from "../../Models/Requirement";

export class JiraStoryMapper {

    map(
        jiraIssue: any
    ): Requirement {

        return {

            title:
                jiraIssue.fields.summary,

            description:
                jiraIssue.fields.description,

            acceptanceCriteria:
                jiraIssue.fields.acceptanceCriteria

        };

    }

}