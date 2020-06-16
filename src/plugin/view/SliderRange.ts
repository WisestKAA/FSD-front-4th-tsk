import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "./StyleClasses";

export class SliderRange extends AbstractElement {
    $elem: JQuery<HTMLElement>;
    isHorizontal: boolean;

    constructor(isHorizontal: boolean){
        super();
        this.isHorizontal = isHorizontal;
        this.init();
    }
    
    protected init(): void {
        this.$elem = this.isHorizontal ? $('<div>').addClass(StyleClasses.RANGE) : $('<div>').addClass([StyleClasses.RANGE, StyleClasses.RANGEV]);
    }

}