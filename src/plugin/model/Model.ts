import { ISliderOptions } from './ISliderOptions';

export class Model{    
    options: ISliderOptions;

    constructor(options: ISliderOptions){
        this.options = this.init(options);
    }

    init(options?: ISliderOptions){
        let defaultOption : ISliderOptions = {
            isHorizontal: true,
            maxVal: 0,
            minVal: 100,
        };
        let currentOptions = $.extend(defaultOption, options);
        return currentOptions;
    }

    
}