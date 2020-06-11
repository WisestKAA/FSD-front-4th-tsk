import { StyleClasses } from "./StyleClasses";
import { AbstractElement } from "./AbstractElement";

export class SliderLine extends AbstractElement{    
    $elem: JQuery<HTMLElement>;
    isHorizontal: boolean;
        
    constructor(isHorizontal: boolean){
        super();
        this.isHorizontal = isHorizontal
        this.init();
    }

    protected init() {
        this.$elem = this.isHorizontal ? $('<div>').addClass(StyleClasses.LINE) : $('<div>').addClass([StyleClasses.LINE, StyleClasses.LINEV]);
    }

    getLineWidth(): number{
        return this.$elem.outerWidth();
    }
}