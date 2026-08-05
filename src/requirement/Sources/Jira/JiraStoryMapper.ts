import { Requirement } from "../../Models/Requirement";

export class JiraStoryMapper {

    map(
        jiraIssue: any
    ): Requirement {

        console.log("========== JIRA STORY MAPPER ==========");
        console.log("Raw Jira Issue:");
        console.log(JSON.stringify(jiraIssue, null, 2));

        const requirement: Requirement = {

            title:
                jiraIssue.fields.summary ?? "",

            description:
                jiraIssue.fields.description ?? "",

            acceptanceCriteria:
                jiraIssue.fields.acceptanceCriteria ?? ""

        };

        console.log("Mapped Requirement:");
        console.log(JSON.stringify(requirement, null, 2));
        console.log("=======================================");

        return requirement;

    }

}