import { GeneratedArtifact } from "./GeneratedArtifact";

export interface ProjectGenerationRequest {

    projectRoot: string;

    artifacts: GeneratedArtifact[];

}