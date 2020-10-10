import * as net from "net";
import { Logger } from "../utils/Logger";
import { INodeListener } from "./INodeListener";
import { RemoteNode } from "./RemoteNode";

export class LocalNode {
    private logger: Logger = new Logger("LocalNode");
    private server: net.Server;
    private connections: RemoteNode[] = [];

    private nodeListener: INodeListener = {
        onNodeAction: (remoteNode, action) => {},
        onNodeDisconnect: (remoteNode) => {
            const index = this.connections.indexOf(remoteNode);

            if (index >= 0) {
                this.connections.splice(index, 1);
            }
        },
    };

    constructor(port: number) {
        this.server = net.createServer((socket) => this.handleConnection(socket));
        this.server.on("error", (error) => this.logger.logError(error));
        this.server.listen(port);
    }

    private handleConnection(socket: net.Socket) {
        const remoteNode = new RemoteNode(socket, this.nodeListener);
        this.connections.push(remoteNode);
    }

    public connect(port: number) {
        this.logger.log(`Connecting to ${port}...`);
        const socket = new net.Socket();
        socket.on("error", (error) => this.logger.logError(error));
        socket.connect(port, () => this.handleConnection(socket));
    }
}
