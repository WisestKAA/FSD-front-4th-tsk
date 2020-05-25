import { ISliderOptions } from './ISliderOptions';

export class Model{    
    public options = new Object({
        isHorizontal: true,
        minVal: 0,
        maxVal: 100,
    }); 

    constructor(options?: ISliderOptions){
        this.setOptions(new Map(Object.entries(options)));        
    }

    setOptions(options: Map<string, boolean | number>): void {
        options.forEach((value, key)=>{
            if(value){
                this.options[key] = value;
            }
        });
    }
}