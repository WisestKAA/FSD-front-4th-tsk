import { IViewOptions } from "./IViewOptions";
import { SliderLine } from "./SliderLine";

export interface ISliderHandleOptions{
    isFrom?: boolean;
    sliderLine: SliderLine;
    isHorizontal: boolean;
    isRange: boolean;
}