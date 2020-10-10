import { ActionType } from "./ActionType";
import { IAction } from "./IAction";

export interface IActionPong extends IAction {
    type: ActionType.PONG;
}
