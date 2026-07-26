import { AIRequest } from "../models/AIRequest";
import { AIResponse } from "../models/AIResponse";

export class ExecutionContext  {

    constructor(
        public request: AIRequest,
        public response?: AIResponse,
        public prompt?: string
    ) {}
}