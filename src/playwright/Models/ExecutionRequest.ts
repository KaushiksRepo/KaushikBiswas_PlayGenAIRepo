export interface ExecutionRequest {

    projectRoot: string;

    testFilter?: string;

    browser?: string;

    headed?: boolean;

    workers?: number;

    retries?: number;

    timeout?: number;

}