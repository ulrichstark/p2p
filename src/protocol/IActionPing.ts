import { ActionType } from "./ActionType";
import { IAction } from "./IAction";

export interface IActionPing extends IAction {
    type: ActionType.PING;
}
