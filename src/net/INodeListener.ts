import { Action } from "../protocol/Action";
import { RemoteNode } from "./RemoteNode";

export interface INodeListener {
    onNodeAction(remoteNode: RemoteNode, action: Action): void;
    onNodeDisconnect(remoteNode: RemoteNode): void;
}
