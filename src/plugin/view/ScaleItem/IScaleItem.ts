import { IElement } from "../AbstractElement/IElement";
import { ILiteEvent } from "../../LiteEvent/ILiteEvent";

export interface IScaleItem extends IElement{
    scaleItemClickedEvent: ILiteEvent<number>;
}