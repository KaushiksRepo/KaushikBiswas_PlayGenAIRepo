export class JiraADFParser {

    parse(
        document: any
    ): string {

        if (!document) {
            return "";
        }

        if (typeof document === "string") {
            return document;
        }

        if (!document.content) {
            return "";
        }

        const result: string[] = [];

        this.extractText(
            document.content,
            result
        );

        return result.join("\n").trim();

    }

    private extractText(
        nodes: any[],
        result: string[]
    ): void {

        for (const node of nodes) {

            if (node.type === "text") {

                result.push(node.text);

            }

            if (node.content) {

                this.extractText(
                    node.content,
                    result
                );

            }

            if (
                node.type === "paragraph" ||
                node.type === "heading"
            ) {

                result.push("\n");

            }

        }

    }

}