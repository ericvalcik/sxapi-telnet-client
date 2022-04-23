export interface SxapiVar {
    class: string;
    isSetableVariable: number;
    inconsistent: number;
    type: string;
    dimension: number
}


export const execParams = {
    shellPrompt: '>',
    timeout: 10000,
    execTimeout: 10000,
    echoLines: 0
}
