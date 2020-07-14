import { IElement } from "../AbstractElement/IElement";
import { ILiteEvent } from "../../LiteEvent/ILiteEvent";

export interface IScaleWrapper extends IElement{
    scaleItemClickedEvent: ILiteEvent<number>;
}