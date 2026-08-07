import { Requirement } from "../../Models/Requirement";
import { JiraADFParser } from "./JiraADFParser";

export class JiraStoryMapper {

    private readonly adfParser =
        new JiraADFParser();

    map(
        jiraIssue: any
    ): Requirement {

        console.log("========== JIRA STORY MAPPER ==========");

        const requirement: Requirement = {

            title:
                jiraIssue.fields.summary ?? "",

            description:
                this.adfParser.parse(
                    jiraIssue.fields.description
                ),

            acceptanceCriteria:
                this.adfParser.parse(
                    jiraIssue.fields.acceptanceCriteria
                )

        };

        console.log(
            JSON.stringify(
                requirement,
                null,
                2
            )
        );

        return requirement;

    }

}