import { ISliderOptions } from './ISliderOptions';
import { LiteEvent } from '../LiteEvent/LiteEvent';
import { ILiteEvent } from '../LiteEvent/ILiteEvent';

export class Model{    
    options: ISliderOptions;
    defaultOption: ISliderOptions;
    onCurrentValueChanged: LiteEvent<number[]>;
    onOptionsChanged: LiteEvent<void>;

    constructor(options?: ISliderOptions){
        this.init(options);    
    }

    init(options?: ISliderOptions): void{
        this.initOptions(options);
        this.initEvents();
    }

    initOptions(options?: ISliderOptions): void{
        this.defaultOption = {
            isHorizontal: true,
            maxVal: 100,
            minVal: 0,
            currentVal: new Array(0, 0),
            step: 1, // <maxval
            precision: 0, // >0
            isRange: false,
            isRangeLineEnabled: false,
            isVisibleCurrentValue: true,
        };        
        let currentOptions = $.extend(this.defaultOption, options);
        currentOptions.currentVal = this.checkCurrentVal(currentOptions);
        this.options = currentOptions;
    }

    initEvents(): void {
        this.onCurrentValueChanged = new LiteEvent<number[]>();
        this.onOptionsChanged = new LiteEvent<void>();
    }

    checkCurrentVal(options: ISliderOptions): number[] {
        let currentVal: number[] = new Array(0,0);
        if(options.isRange){
            currentVal[0] = options.currentVal[0] < options.minVal ? 
                options.minVal : options.currentVal[0] > options.maxVal ? 
                options.maxVal : options.currentVal[0];
            currentVal[1] = options.currentVal[1] < options.minVal ? 
                options.minVal : options.currentVal[1] > options.maxVal ? 
                options.maxVal : options.currentVal[1];
            if(currentVal[0]>currentVal[1]){
                throw new TypeError("Invalid input values. minVal must be less than maxVal");
            }
        } else {
            currentVal[0] = options.currentVal[0] < options.minVal ? 
                options.minVal : options.currentVal[0] > options.maxVal ? 
                options.maxVal : options.currentVal[0];
        }
        return currentVal;
    }
    
    setCurrentValue(newVal: number[]): void{
        let options: ISliderOptions = {currentVal: newVal};
        options = $.extend(this.options, options);
        this.options.currentVal = this.checkCurrentVal(options);
        this.onCurrentValueChanged.trigger(newVal);        
    }

    setNewOptions(options: ISliderOptions): void{
        this.initOptions(options);
        this.onOptionsChanged.trigger();
    } 
    
    getCorrectValWithStep(currentVal: number): number {
        let step = this.options.step;
        if(currentVal < this.options.minVal){
            return this.options.minVal;
        }
        if(currentVal > this.options.maxVal - this.options.maxVal % step){
            return this.options.maxVal;
        }

        let correctVal: number;
        let shift = step - currentVal % step;
        let middle = step / 2;
        if(shift > middle){            
            correctVal = currentVal - currentVal % step;
        } else {
            correctVal = currentVal + shift;
        }
        return correctVal;
    }

    public get changeCurrentValueEvent(): ILiteEvent<number[]> {return this.onCurrentValueChanged.expose();}

    public get changeOptionsEvent(): ILiteEvent<void> {return this.onOptionsChanged.expose();}
}