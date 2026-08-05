import axios from "axios";

import { JiraConfiguration } from "./JiraConfiguration";
import { JiraIssueKeyExtractor } from "./JiraIssueKeyExtractor";

export class JiraRestClient {

    constructor(

        private readonly configuration: JiraConfiguration,

        private readonly issueKeyExtractor: JiraIssueKeyExtractor

    ) {}

    async getStory(
        jiraReference: string
    ): Promise<any> {

        const issueKey =
            this.issueKeyExtractor.extract(
                jiraReference
            );

        console.log("========== JIRA REST CLIENT ==========");
        console.log("Issue Key:", issueKey);

        const url =
            `${this.configuration.baseUrl}/rest/api/3/issue/${issueKey}`;

        const response =
            await axios.get(url, {

                auth: {

                    username: this.configuration.email,

                    password: this.configuration.apiToken

                },

                headers: {

                    Accept: "application/json"

                }

            });

        return response.data;

    }

}