import { ArtifactType } from "./ArtifactType";
export interface GeneratedArtifact {

    fileName: string;

    relativePath: string;

    type: ArtifactType;

    content: string;

}