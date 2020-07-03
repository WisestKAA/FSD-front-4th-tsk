import { IElement } from "../AbstractElement/IElement";
import { ISetRangeOptions } from "./ISetRangeOptions";

export interface ISliderLine extends IElement{
    getLineSize(): number;
    setRange(setRangeOptions: ISetRangeOptions): void;
}