import { FileSystemService } from '../FileSystem/FileSystemService';
import { ProjectGenerationRequest } from '../Models/ProjectGenerationRequest';
import { ProjectGenerationResponse } from '../Models/ProjectGenerationResponse';
import { ConfigFileWriter } from '../Writers/ConfigFileWriter';
import { DataFileWriter } from '../Writers/DataFileWriter';
import { FixtureWriter } from '../Writers/FixtureWriter';
import { PageObjectWriter } from '../Writers/PageObjectWriter';
import { SpecFileWriter } from '../Writers/SpecFileWriter';


export class PlaywrightProjectGenerator {

    constructor(

        private readonly specFileWriter: SpecFileWriter,

        private readonly pageObjectWriter: PageObjectWriter,

        private readonly fixtureWriter: FixtureWriter,

        private readonly dataFileWriter: DataFileWriter,

        private readonly configFileWriter: ConfigFileWriter,

        private readonly fileSystemService: FileSystemService

    ) {}

    async generate(
        request: ProjectGenerationRequest
    ): Promise<ProjectGenerationResponse> {

        throw new Error("Not implemented");

    }

}