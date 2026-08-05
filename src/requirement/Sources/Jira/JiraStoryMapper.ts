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