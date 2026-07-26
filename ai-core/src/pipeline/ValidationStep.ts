import { ExecutionContext } from "./ExecutionContext";
import { ExecutionStep } from "./ExecutionStep";
import { ResponseValidator } from "../validation/ResponseValidator";

export class ValidationStep implements ExecutionStep {

    private readonly validator = new ResponseValidator();

    async execute(context: ExecutionContext): Promise<void> {

        if (!context.response) {
            throw new Error("Provider response is missing.");
        }

        const result = this.validator.validate(context.response);

        if (!result.valid) {
            throw new Error(result.message);
        }
    }
}