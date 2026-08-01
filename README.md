import { ArtifactType } from "../Models/ArtifactType";
import { GeneratedArtifact } from "../Models/GeneratedArtifact";

export interface ArtifactWriter {

    supports(type: ArtifactType): boolean;

    write(
        projectRoot: string,
        artifact: GeneratedArtifact
    ): Promise<void>;

}