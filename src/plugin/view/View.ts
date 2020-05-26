import { StyleClasses } from "../StyleClasses";

export class View{
    slider: JQuery<HTMLElement>;

    constructor(elem: HTMLElement){
        this.init(elem);
    }

    init(elem: HTMLElement){
        let $mainDiv = $('<div>').addClass(StyleClasses.SLIDER);
        this.slider = $(elem).append($mainDiv);
    }

    getReadySlider(): JQuery<HTMLElement>{
        return this.slider;
    }
}