import { FailureCategory } from "./FailureCategory";

export class FailureClassifier {

    classify(
        error: string
    ): FailureCategory {

        const text = error.toLowerCase();

        // ===== Environment =====

        if (
            text.includes("executable doesn't exist") ||
            text.includes("browsertype.launch") ||
            text.includes("chrome-headless-shell") ||
            text.includes("playwright install") ||
            text.includes("browser executable")
        ) {
            return FailureCategory.ENVIRONMENT;
        }

        // ===== Authentication =====

        if (
            text.includes("401") ||
            text.includes("403") ||
            text.includes("unauthorized") ||
            text.includes("forbidden")
        ) {
            return FailureCategory.AUTHENTICATION;
        }

        // ===== API =====

        if (
            text.includes("500") ||
            text.includes("502") ||
            text.includes("503") ||
            text.includes("internal server error")
        ) {
            return FailureCategory.API;
        }

        // ===== Network =====

        if (
            text.includes("net::") ||
            text.includes("err_name_not_resolved") ||
            text.includes("connection refused") ||
            text.includes("connection reset") ||
            text.includes("econnreset")
        ) {
            return FailureCategory.NETWORK;
        }

        // ===== Navigation =====

        if (
            text.includes("page.goto") ||
            text.includes("navigation") ||
            text.includes("navigation failed")
        ) {
            return FailureCategory.NAVIGATION;
        }

        // ===== Locator =====

        if (
            text.includes("locator") ||
            text.includes("waiting for locator") ||
            text.includes("strict mode violation")
        ) {
            return FailureCategory.LOCATOR;
        }

        // ===== Assertion =====
        // IMPORTANT:
        // Assertions often contain "Timed out", so this check MUST come
        // before the timeout check.

        if (
            text.includes("expect(") ||
            text.includes("tohavetitle") ||
            text.includes("tohaveurl") ||
            text.includes("tohavetext") ||
            text.includes("tohavevalue") ||
            text.includes("tobevisible") ||
            text.includes("expected") && text.includes("received")
        ) {
            return FailureCategory.ASSERTION;
        }

        // ===== Timeout =====

        if (
            text.includes("timeout") ||
            text.includes("timed out")
        ) {
            return FailureCategory.TIMEOUT;
        }

        return FailureCategory.UNKNOWN;

    }

}