import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "../StyleClasses";
import { SliderLine } from "./SliderLine";

export class SliderHandle extends AbstractElement{
    $elem: JQuery<HTMLElement>;
    shiftX: number;
    line: SliderLine;

    constructor(line: SliderLine){
        super();
        this.line = line;
        this.init();
        this.addEvents();
    }

    init(): void {
        let $handle: JQuery<HTMLElement> = $('<div>').addClass(StyleClasses.HANDLE);
        this.$elem = $handle;
    }

    getReadyElement(): JQuery<HTMLElement> {
        return this.$elem;
    }

    addEvents(): void {
        let that = this;
        this.$elem.mousedown(function(event){
            event.preventDefault();
            that.shiftX = event.clientX - this.getBoundingClientRect().left;
        });
        this.$elem.mousemove(function(event){
            let lineHTMLElement = that.line.getReadyElement();
            
            
            let newLeft = event.clientX - that.shiftX - lineHTMLElement.offset().left;
            if (newLeft < 0) {
                newLeft = 0;
            }            
            
            let rightEdge = lineHTMLElement.width()  - this.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }
            this.style.left = newLeft + 'px';
        });        
    }

    onMouseMove(): void{

    }

    onMouseUp(): void{

    }

}