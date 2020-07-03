import { IElement } from "../AbstractElement/IElement";
import { ISetCurrentValuePositionOptions } from "./ISetCurrentValuePositionOptions";

export interface ICurrentValueWrapper extends IElement{
    setCurrentValuePosition(setCurrentValuePositionOptions: ISetCurrentValuePositionOptions): void;
    setCurrentValue(currentValue: number[]): void;
    getCurrentValue(): number[];
}