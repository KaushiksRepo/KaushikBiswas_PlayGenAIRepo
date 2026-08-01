export enum ArtifactType {
    SPEC = "SPEC",
    PAGE = "PAGE",
    FIXTURE = "FIXTURE",
    DATA = "DATA",
    CONFIG = "CONFIG"
}



import { GeneratedArtifact } from "./GeneratedArtifact";

export interface ProjectGenerationRequest {

    projectRoot: string;

    artifacts: GeneratedArtifact[];

}