import { ISliderOptions } from "./ISliderOptions";

export class SliderOptions implements ISliderOptions{
    isHorizontal: boolean;
    maxVal: number;
    minVal: number;

    constructor(options: ISliderOptions){
        this.isHorizontal = options.isHorizontal;
        this.maxVal = options.maxVal;
        this.minVal = options.minVal;
    }
}