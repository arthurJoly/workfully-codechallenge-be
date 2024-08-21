import express, {Express, Request, Response} from "express";
import { Server, IncomingMessage, ServerResponse } from "http";
import { router as accountRouter } from "../account/AccountRouter";


export class App {
    public readonly express: Express = express();
    private readonly port: Number;
    private server: Server | undefined;

    constructor(port: number) {
        this.port = port;
    }

    start(): void {        
        this.express.use('/account', accountRouter)

        this.server = this.express.listen(this.port)
    }

    stop(): void {
        this.server?.close();
    }
}
