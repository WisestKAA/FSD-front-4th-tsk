import { StyleClasses } from "../StyleClasses";
import { AbstractElement } from "../AbstractElement/AbstractElement";
import { ISliderLine } from "./ISliderLine";
import { ISliderRange } from "../SliderRange/ISliderRange";
import { ISetRangeOptions } from "./ISetRangeOptions";

export class SliderLine extends AbstractElement implements ISliderLine{    
    public $elem: JQuery<HTMLElement>;
    protected isHorizontal: boolean;
    protected isRangeLineEnabled: boolean;
    protected range: ISliderRange;

    constructor(isHorizontal: boolean, range?: ISliderRange){
        super();
        this.isHorizontal = isHorizontal
        if(range) {
            this.range = range;
            this.isRangeLineEnabled = true;
        } else {
            this.isRangeLineEnabled = false;
        }
        this.init();
    }

    protected init(): void{
        this.$elem = this.isHorizontal ? $('<div>').addClass(StyleClasses.LINE) : $('<div>').addClass([StyleClasses.LINE, StyleClasses.LINEV]);
        if(this.isRangeLineEnabled){            
            this.$elem.append(this.range.$elem);
        }
    }

    public getLineSize(): number{
        return this.isHorizontal ? this.$elem.outerWidth() : this.$elem.outerHeight();
    }    

    public setRange(setRangeOptions: ISetRangeOptions): void{
        if(this.isRangeLineEnabled){
            if(setRangeOptions.isRange){
                this.range.changeRangeLineTwo(setRangeOptions.handleFromPosition, setRangeOptions.handleToPosition);
            } else {
                this.range.changeRangeLineOne(setRangeOptions.handleFromPosition, setRangeOptions.maxHandlePosition);
            }            
        } 
    }
}