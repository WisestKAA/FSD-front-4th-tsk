import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "../StyleClasses";

export class SliderHandle extends AbstractElement{
    $elem: JQuery<HTMLElement>;

    constructor(){
        super();
        this.init();
    }

    init(): void {
        let $handle: JQuery<HTMLElement> = $('<div>').addClass(StyleClasses.HANDLE);
        this.$elem = $handle;
    }

    getReadyElement(): JQuery<HTMLElement> {
        return this.$elem;
    }

}