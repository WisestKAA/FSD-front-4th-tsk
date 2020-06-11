import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "./StyleClasses";

export class SliderWrapper extends AbstractElement{
    $elem: JQuery<HTMLElement>;
    isHorizontal: boolean;

    constructor(isHorizontal: boolean){
        super();
        this.isHorizontal = isHorizontal;
        this.init();
    }

    protected init(): void {
        let $wrapper = this.isHorizontal ? $('<div>').addClass(StyleClasses.WRAPPER) : $('<div>').addClass([StyleClasses.WRAPPER, StyleClasses.WRAPPERV]);
        this.$elem = $wrapper;
    }
}