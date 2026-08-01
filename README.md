import { Provider } from "./Provider";
import { AIOptions } from "./AIOptions";

export interface AIRequest {
    provider: Provider;
    model: string;
    template: string;
    input: string;
    options?: AIOptions;
}