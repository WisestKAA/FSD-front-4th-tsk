import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "./StyleClasses";
import { SliderLine } from "./SliderLine";
import { LiteEvent } from "../LiteEvent/LiteEvent";
import { ILiteEvent } from "../LiteEvent/ILiteEvent";

export class SliderHandle extends AbstractElement{
    public $elem: JQuery<HTMLElement>;
    public shiftX: number;
    public position: number;
    private line: SliderLine;
    public onPositionLeftChanged: LiteEvent<void>;

    constructor(line: SliderLine){
        super();
        this.line = line;
        this.init();
        this.addEvents();
    }

    protected init(): void {
        let $handle: JQuery<HTMLElement> = $('<div>').addClass(StyleClasses.HANDLE);
        this.$elem = $handle;
        this.position = 0;
        this.onPositionLeftChanged = new LiteEvent<void>();
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
        let newLeft = this.getNewLeft(event.clientX, lineHTMLElement.offset().left, lineHTMLElement.outerWidth(), this.$elem.outerWidth()); 
        this.setNewPositionLeft(newLeft);
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

        let newLeftPercent = (100 * newLeft)/lineWidth;

        return newLeftPercent;
    }
    
    setNewPositionLeft(position: number): void {
        this.$elem.attr("style", `left: ${position}%`);
        this.position = position;
        this.onPositionLeftChanged.trigger();
    }

    getSliderHandleMaxPosition(): number {
        let lineWidth = this.line.$elem.outerWidth();
        let handleWidth = this.$elem.outerWidth();
        let maxWidth = lineWidth - handleWidth;
        let maxPosition = (100* maxWidth)/lineWidth;
        return maxPosition;
    }

    public get positionLeftChangedEvent(): ILiteEvent<void> {return this.onPositionLeftChanged.expose();}
}