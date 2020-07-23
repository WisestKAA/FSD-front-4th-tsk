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
        isScaleEnabled: false,
        numberOfScaleMarks: 2,
    }
    protected options: ISliderSettings;

    constructor(options?: ISliderSettings){
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
        this.checkNumberOfScaleMarks(options.numberOfScaleMarks)
        options.precision = this.getPrecision(options.step);

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
        const curVal: number[] = new Array(0,0);
        if(isRange){
            curVal[0] = currentVal[0] < minVal ? 
                minVal : currentVal[0] > maxVal ? 
                maxVal : currentVal[0];
            curVal[1] = currentVal[1] < minVal ? 
                minVal : currentVal[1] > maxVal ? 
                maxVal : currentVal[1];
            if(curVal[0]>curVal[1]){
                curVal[1] = curVal[0];
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

    protected checkNumberOfScaleMarks(numberOfScaleMarks: number): void{
        const mod = numberOfScaleMarks % 1;
        if(numberOfScaleMarks < 2 || mod != 0){
            throw new TypeError("Invalid input values. numberOfScaleMarks must be greater than or equal to two and be an integer");
        }
    }

    protected getPrecision(step: number): number{
        const dotIndex = step.toString().indexOf(".");
        if(dotIndex === -1){
            return 0;
        } else {
            return step.toString().substring(dotIndex).length - 1;
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
        this.options = this.checkOptions(this.options);
    }
}