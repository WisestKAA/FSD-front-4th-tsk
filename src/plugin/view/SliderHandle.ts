import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "./StyleClasses";
import { SliderLine } from "./SliderLine";

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

        this.$elem.on("mousedown", function (event){
            that.onMouseDown(this, event);
        });

        this.$elem.on("dragstart", false);
    }

    onMouseDown(elem: HTMLElement, event: JQuery.MouseDownEvent): void {
        let that = this;
        event.preventDefault();
        this.shiftX = event.clientX - elem.getBoundingClientRect().left;

        $(document).on("mousemove", function (event) {
            that.onMouseMove(event)
        });

        $(document).on("mouseup", function onMouseUp(){
            that.onMouseUp();
        });
    }

    onMouseMove( event: JQuery.MouseMoveEvent): void {
        let lineHTMLElement = this.line.$elem;

        let newLeft = this.getNewLeft(event.clientX, 
            lineHTMLElement.offset().left, 
            lineHTMLElement.outerWidth(), 
            this.$elem.outerWidth());
        
        // let newLeft = event.clientX - this.shiftX - lineHTMLElement.offset().left;
        // if (newLeft < 0) {
        //     newLeft = 0;
        // }

        // let rightEdge = lineHTMLElement.outerWidth() - this.$elem.outerWidth();
        // if (newLeft > rightEdge) {
        //     newLeft = rightEdge;
        // }

        this.$elem.attr("style", `left: ${newLeft}px`);
    }

    onMouseUp(): void{
        $(document).off("mousemove");
        $(document).off("mouseup");
    }

    getNewLeft(clientX: number, offsetLeft: number, lineWidth: number, handleWidth: number): number {
        let newLeft = clientX - this.shiftX - offsetLeft;
        if (newLeft < 0) {
            newLeft = 0;
        }

        let rightEdge = lineWidth - handleWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        return newLeft;
    }

    
}