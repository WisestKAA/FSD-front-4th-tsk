import { ISliderLine } from "../SliderLine/ISliderLine";

export interface ISliderHandleOptions{
    isFrom?: boolean;
    sliderLine: ISliderLine;
    isHorizontal: boolean;
    isRange: boolean;
}