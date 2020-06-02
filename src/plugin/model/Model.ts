import { ISliderOptions } from './ISliderOptions';

export class Model{    
    options: ISliderOptions;
    defaultOption: ISliderOptions = {
        isHorizontal: true,
        maxVal: 0,
        minVal: 100,
    };

    constructor(options?: ISliderOptions){
        this.init(options);
    }

    init(options?: ISliderOptions): void{        
        let currentOptions = $.extend(this.defaultOption, options);
        this.options = currentOptions;
    }
}