import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "../StyleClasses";

export class SliderWrapper extends AbstractElement{
    $elem: JQuery<HTMLElement>;

    constructor(){
        super();
        this.init();
    }

    protected init(): void {
        let $wrapper = $('<div>').addClass(StyleClasses.WRAPPER);
        this.$elem = $wrapper;
    }
}