import { StyleClasses } from "../StyleClasses";
import { SliderLine } from "./SliderLine";
import { SliderHandle } from "./SliderHandle";
import { SliderWrapper } from "./SliderWrapper";

export class View{
    slider: JQuery<HTMLElement>;
    line: SliderLine;
    handle: SliderHandle;
    wrapper: SliderWrapper;

    constructor(elem: HTMLElement){
        this.init(elem);
    }

    protected init(elem: HTMLElement){
        let $mainDiv = $('<div>').addClass(StyleClasses.SLIDER);
        let $header = $('<div>').addClass(StyleClasses.HEADER);
        this.line = new SliderLine();
        this.wrapper = new SliderWrapper();
        this.handle = new SliderHandle(this.line);
        this.wrapper.$elem.append(this.line.$elem, this.handle.$elem);
        $mainDiv.append($header, this.wrapper.$elem);

        this.slider = $(elem).append($mainDiv);
    }
}