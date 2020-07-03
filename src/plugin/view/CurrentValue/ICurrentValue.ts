import { IElement } from "../AbstractElement/IElement";

export interface ICurrentValue{    
    $elem: JQuery<HTMLElement>;
    setCurrentValue(currentValue: number): void;
    getCurrentValue(): number;
    setPosition(position: number, handlePercent?: number, lineWidth?: number, isCorrect?: boolean): void;
    getCurrentValueSize(): number;
    getCurrentValuePosition(): number;
}