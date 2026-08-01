import { AIResponse } from "../models/AIResponse";
import { ValidationResult } from "./ValidationResult";

export class ResponseValidator {

    validate(response: AIResponse): ValidationResult {

        if (!response.success) {
            return {
                valid: false,
                message: response.error ?? "Unknown provider error."
            };
        }

        if (!response.output) {
            return {
                valid: false,
                message: "Provider returned an empty response."
            };
        }

        if (response.output.trim().length === 0) {
            return {
                valid: false,
                message: "Provider returned blank content."
            };
        }

        return {
            valid: true
        };
    }
}