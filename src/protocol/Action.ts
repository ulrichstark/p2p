import { IActionPing } from "./actions/IActionPing";
import { IActionPong } from "./actions/IActionPong";

export type Action = IActionPing | IActionPong;
