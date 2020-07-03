import { ISliderOptions } from "./ISliderOptions";
import { ISliderSettings } from "../ISliderSettings";

export class SliderOptions implements ISliderOptions{
    protected defaultOption: ISliderSettings = {
        isHorizontal: true,
        maxVal: 100,
        minVal: 0,
        currentVal: new Array(0, 0),
        step: 1,
        precision: 0,
        isRange: false,
        isRangeLineEnabled: false,
        isVisibleCurrentValue: true,
    }
    protected options: ISliderSettings;

    constructor(options: ISliderSettings){
        this.options = $.extend(this.defaultOption, options);
        this.options = this.checkOptions(this.options);
    }

    protected checkOptions(options: ISliderSettings): ISliderSettings{
        this.checkMinMaxValue(options.minVal, options.maxVal);
        options.currentVal = this.getCorrectCurrentValue({
            currentVal: options.currentVal,
            isRange: options.isRange,
            maxVal: options.maxVal,
            minVal: options.minVal
        });
        this.checkStep({maxVal: options.maxVal, minVal: options.minVal, step: options.step});


        return options;
    }

    protected checkMinMaxValue(minVal: number, maxVal: number): void{
        if(minVal >= maxVal){
            throw new TypeError("Invalid input values. minVal must be less than maxVal");
        }
    }

    protected getCorrectCurrentValue(options: {
        isRange: boolean, 
        currentVal: number[], 
        minVal: number,
        maxVal: number
    }): number[]{
        const {isRange, currentVal, minVal, maxVal} = options;
        let curVal: number[] = new Array(0,0);
        if(isRange){
            curVal[0] = currentVal[0] < minVal ? 
                minVal : currentVal[0] > maxVal ? 
                maxVal : currentVal[0];
            curVal[1] = currentVal[1] < minVal ? 
                minVal : currentVal[1] > maxVal ? 
                maxVal : currentVal[1];
            if(curVal[0]>curVal[1]){
                throw new TypeError("Invalid input values. The first number in currentVal must be less than the second number in currentVal");
            }
        } else {
            curVal[0] = currentVal[0] < minVal ? 
                minVal : currentVal[0] > maxVal ? 
                maxVal : currentVal[0];
        }
        return curVal;
    }

    protected checkStep(options: {
        minVal: number, 
        maxVal: number, 
        step: number
    }): void{
        const {minVal, maxVal, step} = options;
        if(step > (maxVal - minVal)){
            throw new TypeError("Invalid input values. The step must be less than maxVal - minVal");
        }
    }

    protected checkPrecision(precision: number): void{
        let mod = precision % 1;
        if(precision < 0 || mod != 0){
            throw new TypeError("Invalid input values. Precision must be greater than or equal to zero and be an integer");
        }
    }

    public getOptions(): ISliderSettings{
        return this.options;
    }

    public setCurrentValue(currentVal: number[]): void{
        this.options.currentVal = currentVal;
    }

    public setNewOptions(options: ISliderSettings): void{
        this.options = $.extend(this.options, options);
        this.options = this.checkOptions(options);
    }
}