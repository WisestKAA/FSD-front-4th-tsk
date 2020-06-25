import { ISliderOptions } from "./ISliderOptions";

export class SliderOptions implements ISliderOptions{
    isHorizontal: boolean;
    maxVal: number;
    minVal: number;
    currentVal: number[];
    step: number;
    precision: number;
    isRange: boolean;
    isRangeLineEnabled: boolean;
    isVisibleCurrentValue: boolean;

    constructor(options: ISliderOptions){
        this.isHorizontal = options.isHorizontal;
        this.maxVal = options.maxVal;
        this.minVal = options.minVal;
        this.currentVal = options.currentVal;
        this.step = options.step;
        this.precision = options.precision;
        this.isRange = options.isRange;
        this.isRangeLineEnabled = options.isRangeLineEnabled;
        this.isVisibleCurrentValue = options.isVisibleCurrentValue;
    }
}