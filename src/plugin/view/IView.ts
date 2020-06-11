import { SliderDirection } from "./SliderDirection";

export interface IView {
    getReadySlider(): JQuery<HTMLElement>;
    getSliderHandleLeftPosition(): number;
    getMaxHandlePosition(): number;
    setCurrentValue(currentValue: number): void;
    setNewSliderHandlePosition(position: number, direction: SliderDirection): void; 
}