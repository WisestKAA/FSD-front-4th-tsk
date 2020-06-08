import { StyleClasses } from "./StyleClasses";
import { AbstractElement } from "./AbstractElement";

export class SliderLine extends AbstractElement{    
    $elem: JQuery<HTMLElement>;
        
    constructor(){
        super();
        this.init();
    }

    protected init() {
        this.$elem = $('<div>').addClass(StyleClasses.LINE);
    }

    getLineWidth(): number{
        return this.$elem.outerWidth();
    }
}