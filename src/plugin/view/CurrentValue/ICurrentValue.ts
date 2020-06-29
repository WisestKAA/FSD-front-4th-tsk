import { IElement } from "../AbstractElement/IElement";

export interface ICurrentValue extends IElement{
    setCurrentValue(currentValue: number): void;
    getCurrentValue(): number;
    setPosition(position: number, handlePercent?: number, lineWidth?: number, isCorrect?: boolean): void;
    getCurrentValueSize(): number;
    getCurrentValuePosition(): number;
}