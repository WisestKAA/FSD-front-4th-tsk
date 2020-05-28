import { StyleClasses } from "../StyleClasses";
import { AbstractElement } from "./AbstractElement";

export class SliderLine extends AbstractElement{    
    $elem: JQuery<HTMLElement>;
        
    constructor(){
        super();
        this.init();
    }

    protected init() {
        let $line: JQuery<HTMLElement> = $('<div>').addClass(StyleClasses.LINE);
        this.$elem = $line;
    }
}