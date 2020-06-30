import { IElement } from "../AbstractElement/IElement";

export interface ISliderRange extends IElement{
    changeRangeLineTwo(positionFrom: number, positionTo: number): void;
    changeRangeLineOne(positionFrom: number, maxHandlePosition: number): void;
}