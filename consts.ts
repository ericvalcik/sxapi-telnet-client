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

export interface Node {
    // id, use this in get, set, var, exec
    handle: string;
    target: {
        state: number;
        inconsistent: number;
        disabled: number;
        address: string;
    }
    ident: {
        name: string;
        hwid: string;
        swid: string;
        sn: string;
        uuid: string;
        class: string;
    }
}
