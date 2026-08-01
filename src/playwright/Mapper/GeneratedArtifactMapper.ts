import { GeneratedArtifact } from "../Models/GeneratedArtifact";
import { ArtifactType } from "../Models/ArtifactType";

export class GeneratedArtifactMapper {

    map(
        generatedCode: string
    ): GeneratedArtifact[] {

        return [

            {

                fileName: "generated.spec.ts",

                relativePath: "tests/generated.spec.ts",

                type: ArtifactType.SPEC,

                content: generatedCode

            }

        ];

    }

}