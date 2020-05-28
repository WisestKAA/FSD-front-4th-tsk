import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "../StyleClasses";
import { SliderLine } from "./SliderLine";
import { SliderWrapper } from "./SliderWrapper";

export class SliderHandle extends AbstractElement{
    public $elem: JQuery<HTMLElement>;
    private shiftX: number;
    private line: SliderLine;

    constructor(line: SliderLine){
        super();
        this.line = line;
        this.init();
        this.addEvents();
    }

    protected init(): void {
        let $handle: JQuery<HTMLElement> = $('<div>').addClass(StyleClasses.HANDLE);
        this.$elem = $handle;
    }

    private addEvents(): void {
        let that = this;

        this.$elem.on("mousedown", function(event){
            event.preventDefault();
            that.shiftX = event.clientX - this.getBoundingClientRect().left; 
                       

            $(document).on("mousemove", function(event){
                let lineHTMLElement = that.line.$elem;

                let newLeft = event.clientX - that.shiftX - lineHTMLElement.offset().left;
                if (newLeft < 0) {
                    newLeft = 0;
                }

                let rightEdge = lineHTMLElement.outerWidth() - that.$elem.outerWidth();
                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }

                that.$elem.attr("style", `left: ${newLeft}px`);
            });

            $(document).on("mouseup", function(){
                $(document).off("mousemove");
                $(document).off("mouseup");
            });
        });

        this.$elem.on("dragstart", false);
    }
}