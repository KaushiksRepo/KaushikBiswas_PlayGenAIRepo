import { GeneratorResponse } from "../../agents/generator/GeneratorResponse";

export interface ProjectGenerationRequest {

    generatorResponse: GeneratorResponse;

    projectRoot: string;

}