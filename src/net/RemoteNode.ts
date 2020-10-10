import * as net from "net";
import { Logger } from "../utils/Logger";

export class RemoteNode {
    private id: string;
    private logger: Logger;
    private socket: net.Socket;

    constructor(socket: net.Socket) {
        this.id = `${socket.remoteAddress}:${socket.remotePort}`;
        this.logger = new Logger(this.id);
        this.socket = socket;

        this.logger.log("Connected!");

        this.socket.on("error", (error) => this.logger.logError(error));
        this.socket.on("close", () => this.handleDisconnect());
    }

    private handleDisconnect() {
        this.logger.log("Disconnected!");
    }
}
