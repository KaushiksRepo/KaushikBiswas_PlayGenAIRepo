import { IRequirementProvider } from "../Provider/IRequirementProvider";
import { RequirementSource } from "../Models/RequirementSource";

import { JiraRequirementProvider } from "../Sources/Jira/JiraRequirementProvider";
import { AzureDevOpsRequirementProvider } from "../Sources/AzureDevops/AzureDevOpsRequirementProvider";
import { TextFileRequirementProvider } from "../Sources/Text/TextFileRequirementProvider";

export class RequirementProviderFactory {

    static create(
        source: RequirementSource
    ): IRequirementProvider {

        switch (source) {

            case RequirementSource.JIRA:
                return new JiraRequirementProvider();

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