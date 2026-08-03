import { FailureCategory } from "./FailureCategory";

export class FailureClassifier {

    classify(
        error: string
    ): FailureCategory {

        const text = error.toLowerCase();

        // Playwright / Environment

        if (
            text.includes("executable doesn't exist") ||
            text.includes("browsertype.launch") ||
            text.includes("playwright install") ||
            text.includes("chrome-headless-shell")
        ) {
            return FailureCategory.ENVIRONMENT;
        }

        // Locator

        if (
            text.includes("locator") ||
            text.includes("waiting for locator")
        ) {
            return FailureCategory.LOCATOR;
        }

        // Assertion

        if (
            text.includes("expect") ||
            text.includes("tohavetitle") ||
            text.includes("tohaveurl")
        ) {
            return FailureCategory.ASSERTION;
        }

        // Timeout

        if (
            text.includes("timeout") ||
            text.includes("timed out")
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
            text.includes("navigation") ||
            text.includes("page.goto")
        ) {
            return FailureCategory.NAVIGATION;
        }

        return FailureCategory.UNKNOWN;

    }

}