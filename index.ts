import { Telnet } from "telnet-client";
import { execParams, SxapiVar } from "./consts";


type nullableString = string | null;

export class Sxapi {
    #ip = '127.0.0.1';
    #port = 28945
    connection;
    params = {
        host: this.#ip,
        port: this.#port,
        shellPrompr: '>',
        timeout: 10000
    }
    constructor() {
        this.connection = new Telnet();
    }

    async init() {
        try {
            await this.connection.connect(this.params);
        } catch (e) {
            console.log(e);
            throw e;
        }

        setInterval(() => this.connection.exec("", execParams), 5000);

        return this;
    }

    async search() {
        const ret: string = await this.connection.exec('search', execParams);
        if (parseInt(ret) <= 0) {
            throw Error("No controllers found");
        }
    }

    // TODO has to be redone because right now the return JSON is not in good
    // format
    async node(address: number) {
        const ret = await this.connection.exec(`node - ${address}`, execParams);
        return JSON.parse(ret);
    }

    async var(nodeId: string, path: string): Promise<SxapiVar> {
        const ret = await this.connection.exec(`var ${nodeId} ${path}`, execParams);
        return JSON.parse(ret);
    }

    // TODO can be a little better if we check of variable type
    // and return it in that type :)
    async get(nodeId: string, path: string): Promise<string> {
        const ret = await this.connection.exec(`get ${nodeId} ${path}`, execParams);
        return ret;
    }

    async set(nodeId: string, path: string, val) {
        if (await this.connection.exec(`set ${nodeId} ${path} ${val}`, execParams)) {
            throw Error("Unexpected error with set");
        }
        return;
    }

    async exec(nodeId: string, commnand: string, args:nullableString = null) {
        let ret: any = '0';
        if (args) {
            ret = await this.connection.exec(`exec ${nodeId} /commands/${commnand} ${args}`);
        } else {
            ret = await this.connection.exec(`exec ${nodeId} /commands/${commnand}`);
        }
        if (commnand !== 'reboot' && ret !== '0') {
            throw Error("Unexpected error");
        }
        return ret;
    }

}

module.exports.Sxapi = Sxapi;
