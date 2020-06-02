import { ISliderOptions } from './ISliderOptions';

export class Model{    
    options: ISliderOptions;

    constructor(options: ISliderOptions){
        this.init(options);
    }

    init(options?: ISliderOptions): void{
        let defaultOption : ISliderOptions = {
            isHorizontal: true,
            maxVal: 0,
            minVal: 100,
        };
        let currentOptions = $.extend(defaultOption, options);
        this.options = currentOptions;
    }
}