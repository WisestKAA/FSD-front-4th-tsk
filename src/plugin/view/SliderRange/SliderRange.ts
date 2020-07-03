import { AbstractElement } from "../AbstractElement/AbstractElement";
import { StyleClasses } from "../StyleClasses";
import { ISliderRange } from "./ISliderRange";

export class SliderRange extends AbstractElement implements ISliderRange{
    public $elem: JQuery<HTMLElement>;
    protected isHorizontal: boolean;

    constructor(isHorizontal: boolean){
        super();
        this.isHorizontal = isHorizontal;
        this.init();
    }
    
    protected init(): void {
        this.$elem = this.isHorizontal ? $('<div>').addClass(StyleClasses.RANGE) : $('<div>').addClass([StyleClasses.RANGE, StyleClasses.RANGEV]);
    }

    public changeRangeLineTwo(positionFrom: number, positionTo: number): void{
        let rangePosition = positionFrom;
        let rangeSize = 100 - positionTo - positionFrom;
        let direction = this.isHorizontal ? "left" : "bottom";
        let wh = this.isHorizontal ? "width" : "height";
        this.$elem.attr("style", `${direction}: ${rangePosition}%; ${wh}: ${rangeSize}%`);
    }

    public changeRangeLineOne(positionFrom: number, maxHandlePosition: number): void{
        let size = (100 - maxHandlePosition) / 2 + positionFrom
        let direction = this.isHorizontal ? "left" : "bottom";
        let wh = this.isHorizontal ? "width" : "height";
        this.$elem.attr("style", `${direction}: 0%; ${wh}: ${size}%`);
    }
}