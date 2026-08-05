import { IRequirementProvider } from "../Provider/IRequirementProvider";
import { RequirementSource } from "../Models/RequirementSource";

import { JiraRequirementProvider } from "../Sources/Jira/JiraRequirementProvider";
import { JiraRestClient } from "../Sources/Jira/JiraRestClient";
import { JiraStoryMapper } from "../Sources/Jira/JiraStoryMapper";
import { JiraConfiguration } from "../Sources/Jira/JiraConfiguration";

import { AzureDevOpsRequirementProvider } from "../Sources/AzureDevops/AzureDevOpsRequirementProvider";
import { TextFileRequirementProvider } from "../Sources/Text/TextFileRequirementProvider";
import { JiraIssueKeyExtractor } from "../Sources/Jira/JiraIssueKeyExtractor";

export class RequirementProviderFactory {

    static create(
        source: RequirementSource
    ): IRequirementProvider {

        switch (source) {

            case RequirementSource.JIRA: {

                const configuration: JiraConfiguration = {

                    baseUrl:
                        process.env.JIRA_BASE_URL ?? "",

                    email:
                        process.env.JIRA_EMAIL ?? "",

                    apiToken:
                        process.env.JIRA_API_TOKEN ?? ""

                };

                const issueKeyExtractor =
                  new JiraIssueKeyExtractor();

                const client = new JiraRestClient(

                   configuration,

                    issueKeyExtractor

                  );

                const mapper =
                    new JiraStoryMapper();

                return new JiraRequirementProvider(

                    client,

                    mapper

                );

            }

            case RequirementSource.AZURE_DEVOPS:

                return new AzureDevOpsRequirementProvider();

            case RequirementSource.TEXT_FILE:

                return new TextFileRequirementProvider();

            default:

                throw new Error(
                    `Unsupported Requirement Source: ${source}`
                );

        }

    }

}