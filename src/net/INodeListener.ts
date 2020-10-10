import { IAction } from "../protocol/IAction";
import { RemoteNode } from "./RemoteNode";

export interface INodeListener {
    onNodeAction(remoteNode: RemoteNode, action: IAction): void;
    onNodeDisconnect(remoteNode: RemoteNode): void;
}
