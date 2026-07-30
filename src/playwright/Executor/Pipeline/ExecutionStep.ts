import { ExecutionContext } from "./ExecutionContext";

export interface ExecutionStep {

    execute(
        context: ExecutionContext
    ): Promise<void>;

}