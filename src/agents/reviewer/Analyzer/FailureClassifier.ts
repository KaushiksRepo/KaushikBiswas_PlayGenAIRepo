import { FailureCategory } from "./FailureCategory";

export class FailureClassifier {

    classify(
        error: string
    ): FailureCategory {

        const text = error.toLowerCase();

        if (text.includes("locator")) {
            return FailureCategory.LOCATOR;
        }

        if (text.includes("expect")) {
            return FailureCategory.ASSERTION;
        }

        if (text.includes("timeout")) {
            return FailureCategory.TIMEOUT;
        }

        if (text.includes("401")
            || text.includes("403")) {

            return FailureCategory.AUTHENTICATION;
        }

        if (text.includes("500")
            || text.includes("502")
            || text.includes("503")) {

            return FailureCategory.API;
        }

        if (text.includes("net::")) {
            return FailureCategory.NETWORK;
        }

        if (text.includes("navigation")) {
            return FailureCategory.NAVIGATION;
        }

        return FailureCategory.UNKNOWN;

    }

}