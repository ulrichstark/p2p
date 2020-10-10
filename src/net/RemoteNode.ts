import * as net from "net";
import { ActionType } from "../protocol/ActionType";
import { Action } from "../protocol/Action";
import { Logger } from "../utils/Logger";
import { INodeListener } from "./INodeListener";

const encoding: BufferEncoding = "utf8";
const seperator = "-";

export class RemoteNode {
    private id: string;
    private logger: Logger;
    private socket: net.Socket;
    private listener: INodeListener;

    private pingSentTime: number | null = null;

    public ping: number | null = null;

    constructor(socket: net.Socket, listener: INodeListener) {
        this.id = `${socket.remoteAddress}:${socket.remotePort}`;
        this.logger = new Logger(this.id);
        this.socket = socket;
        this.listener = listener;

        this.logger.log("Connected!");

        this.socket.on("data", (buffer) => this.handleData(buffer));
        this.socket.on("error", (error) => this.logger.logError(error));
        this.socket.on("close", () => this.handleClose());

        this.sendPing();
    }

    public sendPing() {
        if (this.pingSentTime === null) {
            this.pingSentTime = Date.now();
            this.send({ type: ActionType.PING });
        }
    }

    public send(action: Action) {
        const data = JSON.stringify(action);
        const packet = data.length.toString() + seperator + data;
        this.socket.write(packet, encoding);
    }

    private handleData(buffer: Buffer) {
        const bufferString = buffer.toString(encoding);
        let index = 0;

        while (true) {
            try {
                const seperatorIndex = bufferString.indexOf(seperator, index);

                if (seperatorIndex < 0) {
                    break;
                }

                const packetLength = Number.parseInt(bufferString.substring(index, seperatorIndex));

                if (!Number.isNaN(packetLength)) {
                    const packetDataIndex = seperatorIndex + seperator.length;
                    const packetData = bufferString.substr(packetDataIndex, packetLength);

                    this.handlePacket(packetData);

                    index = packetDataIndex + packetLength;
                }
            } catch (error) {
                this.logger.log(`cant handle action: ${error}`);
            }
        }
    }

    private handlePacket(packet: string) {
        const action = JSON.parse(packet) as Action;

        if (action && typeof action.type === "string") {
            this.handleAction(action);
        } else {
            this.logger.log("got malformed action");
        }
    }

    private handleAction(action: Action) {
        switch (action.type) {
            case ActionType.PING: {
                this.send({ type: ActionType.PONG });
                break;
            }
            case ActionType.PONG: {
                if (this.pingSentTime !== null) {
                    this.ping = Date.now() - this.pingSentTime;
                    this.pingSentTime = null;
                    this.logger.log(`Ping: ${this.ping}ms`);
                }
                break;
            }
            default: {
                this.listener.onNodeAction(this, action);
            }
        }
    }

    private handleClose() {
        this.logger.log("Disconnected!");
        this.listener.onNodeDisconnect(this);
    }
}
