import { IViewOptions } from "./IViewOptions";
import { SliderLine } from "./SliderLine";

export interface ISliderHandleOptions extends IViewOptions{
    isFrom?: boolean;
    sliderLine: SliderLine;
}