export class JiraIssueKeyExtractor {

    extract(
    jiraReference: string
): string {

    const value =
        jiraReference.trim();

    // Already an issue key
    if (/^[A-Z]+-\d+$/.test(value)) {
        return value;
    }

    const match =
        value.match(/([A-Z]+-\d+)/);

    if (match) {
        return match[1];
    }

    throw new Error(
        `Unable to extract Jira issue key from: ${jiraReference}`
    );

}

}