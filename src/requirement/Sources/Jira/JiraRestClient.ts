import { JiraConfiguration } from "./JiraConfiguration";

export class JiraRestClient {

    constructor(

        private readonly configuration: JiraConfiguration

    ) {}

    async getStory(
        jiraUrl: string
    ): Promise<any> {

        console.log("Reading Jira Story:", jiraUrl);

        console.log("Base URL:", this.configuration.baseUrl);

        return {

            fields: {

                summary: "Login Feature",

                description:
`As a user,
I want to login using valid credentials
so that I can access the dashboard.`,

                acceptanceCriteria:
`User enters username
User enters password
Dashboard is displayed.`

            }

        };

    }

}