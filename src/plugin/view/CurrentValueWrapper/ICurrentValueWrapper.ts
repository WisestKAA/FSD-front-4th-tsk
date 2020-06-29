import { IElement } from "../AbstractElement/IElement";
import { ISetCurrentValuePositionOptions } from "./ISetCurrentValuePositionOptions";

export interface ICurrentValueWrapper extends IElement{
    setCurrentValuePosition(setCurrentValuePositionOptions: ISetCurrentValuePositionOptions): void;
    checkCurrentValueIntersection(lineSize: number, handleFromPosition: number, handleToPosition: number): void;
}