import { ArtifactType } from "./ArtifactType";
export interface GeneratedArtifact {

    fileName: string;

    type: ArtifactType;

    content: string;

}