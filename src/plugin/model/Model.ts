import { ISliderOptions } from './ISliderOptions';
import { LiteEvent } from '../LiteEvent/LiteEvent';
import { ILiteEvent } from '../LiteEvent/ILiteEvent';

export class Model{    
    options: ISliderOptions;
    defaultOption: ISliderOptions;
    onCurrentValueChanged: LiteEvent<number>;

    constructor(options?: ISliderOptions){
        this.init(options);    
    }

    init(options?: ISliderOptions): void{
        this.defaultOption = {
            isHorizontal: true,
            maxVal: 100,
            minVal: 0,
            currentVal: 0
        };        
        let currentOptions = $.extend(this.defaultOption, options);
        currentOptions.currentVal = this.checkCurrentVal(currentOptions);
        this.options = currentOptions;
        this.onCurrentValueChanged = new LiteEvent<number>();
    }

    checkCurrentVal(options: ISliderOptions): number {
        let currentVal = options.currentVal < options.minVal ? options.minVal :
            options.currentVal > options.maxVal ? options.maxVal : options.currentVal;
        return currentVal;
    }
    
    setCurrentValue(newVal: number): void{
        let opt = Object.create(this.options) as ISliderOptions;
        opt.currentVal = newVal;
        this.options.currentVal = this.checkCurrentVal(opt);
        this.onCurrentValueChanged.trigger(newVal);        
    }

    getMaxValue(): number {
        return this.options.maxVal;
    }

    public get changeCurrentValueEvent(): ILiteEvent<number> {return this.onCurrentValueChanged.expose();}
}