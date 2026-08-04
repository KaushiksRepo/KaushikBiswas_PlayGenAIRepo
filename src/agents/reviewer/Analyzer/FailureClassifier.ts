import { FailureCategory } from "./FailureCategory";

export class FailureClassifier {

    classify(
        error: string
    ): FailureCategory {

        const text = error.toLowerCase();

        // Environment

        if (
            text.includes("browsertype.launch") ||
            text.includes("executable doesn't exist") ||
            text.includes("chrome-headless-shell") ||
            text.includes("playwright install")
        ) {
            return FailureCategory.ENVIRONMENT;
        }

        // Locator

        if (
            text.includes("locator") ||
            text.includes("strict mode violation")
        ) {
            return FailureCategory.LOCATOR;
        }

        // Assertion (before timeout)

        if (
            text.includes("expect(") ||
            text.includes("tohavetitle") ||
            text.includes("tohaveurl") ||
            text.includes("tohavetext") ||
            text.includes("expected pattern") ||
            text.includes("received string")
        ) {
            return FailureCategory.ASSERTION;
        }

        // Timeout

        if (
            text.includes("timed out") ||
            text.includes("timeout")
        ) {
            return FailureCategory.TIMEOUT;
        }

        // Authentication

        if (
            text.includes("401") ||
            text.includes("403")
        ) {
            return FailureCategory.AUTHENTICATION;
        }

        // API

        if (
            text.includes("500") ||
            text.includes("502") ||
            text.includes("503")
        ) {
            return FailureCategory.API;
        }

        // Network

        if (
            text.includes("net::") ||
            text.includes("err_name_not_resolved") ||
            text.includes("connection refused")
        ) {
            return FailureCategory.NETWORK;
        }

        // Navigation

        if (
            text.includes("page.goto") ||
            text.includes("navigation")
        ) {
            return FailureCategory.NAVIGATION;
        }

        return FailureCategory.UNKNOWN;

    }

}