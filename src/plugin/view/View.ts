import { StyleClasses } from "../StyleClasses";
import { SliderLine } from "./SliderLine";
import { SliderHandle } from "./SliderHandle";

export class View{
    slider: JQuery<HTMLElement>;
    line: SliderLine;
    handle: SliderHandle;

    constructor(elem: HTMLElement){
        this.init(elem);
    }

    init(elem: HTMLElement){
        let $mainDiv = $('<div>').addClass(StyleClasses.SLIDER);
        let $header = $('<div>').addClass(StyleClasses.HEADER);
        let $wrapper = $('<div>').addClass(StyleClasses.WRAPPER);
        this.line = new SliderLine();
        this.handle = new SliderHandle();
        $wrapper.append(this.line.getReadyElement(), this.handle.getReadyElement());
        $mainDiv.append($header, $wrapper);

        this.slider = $(elem).append($mainDiv);
    }

    getReadySlider(): JQuery<HTMLElement>{
        return this.slider;
    }
}