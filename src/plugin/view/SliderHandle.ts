import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "./StyleClasses";
import { SliderLine } from "./SliderLine";
import { LiteEvent } from "../LiteEvent/LiteEvent";
import { ILiteEvent } from "../LiteEvent/ILiteEvent";
import { SliderDirection } from "./SliderDirection";

export class SliderHandle extends AbstractElement{
    public $elem: JQuery<HTMLElement>;
    public shiftX: number;
    public shiftY: number;
    public position: number;
    private line: SliderLine;
    public onPositionChanged: LiteEvent<void>;
    isHorizontal: boolean;
    maxPosition: number;

    constructor(line: SliderLine, isHorizontal: boolean){
        super();
        this.line = line;
        this.isHorizontal = isHorizontal;
        this.init();
        this.addEvents();
    }

    protected init(): void {        
        this.$elem =  this.isHorizontal ? $('<div>').addClass(StyleClasses.HANDLE) : $('<div>').addClass([StyleClasses.HANDLE, StyleClasses.HANDLEV]);
        this.position = 0;
        this.onPositionChanged = new LiteEvent<void>();
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
        this.shiftY = event.clientY - elem.getBoundingClientRect().top;

        $(document).on("mousemove", function (event) {
            if(that.isHorizontal){
                that.onMouseMoveX(event);
            }else{
                that.onMouseMoveY(event);
            }
        });

        $(document).on("mouseup", function onMouseUp(){
            that.onMouseUp();
        });
    }

    onMouseMoveX(event: JQuery.MouseMoveEvent): void {
        let lineHTMLElement = this.line.$elem;
        let newLeft = this.getNewLeft(event.clientX, lineHTMLElement.offset().left, lineHTMLElement.outerWidth(), this.$elem.outerWidth()); 
        this.setNewPosition(newLeft, SliderDirection.LEFT);
    }

    onMouseMoveY(event: JQuery.MouseMoveEvent): void {
        let lineHTMLElement = this.line.$elem;
        let newBot = this.getNewBot(event.clientY, lineHTMLElement.offset().top, lineHTMLElement.outerHeight(), this.$elem.outerHeight()); 
        this.setNewPosition(newBot, SliderDirection.BOTTOM);
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

    getNewBot(clientY: number, offsetTop: number, lineHieght: number, handleHeight: number): number{
        let newBot = lineHieght - (clientY - offsetTop + this.shiftY);
        let newBotPosition = this.getCorrectPosition(newBot, lineHieght, handleHeight);
        return newBotPosition;        
    }

    getCorrectPosition(newCoordinate: number, linesize: number, handleSize: number): number{
        if(newCoordinate < 0){
            return 0;
        }
        let edge = linesize - handleSize;
        if(newCoordinate > edge){
            newCoordinate = edge;
        }
        let correctPosition = (100 * newCoordinate)/linesize;
        return correctPosition;
    }
    
    setNewPosition(position: number, direction: SliderDirection): void {
        this.$elem.attr("style", `${direction}: ${position}%`);
        this.position = position;
        this.onPositionChanged.trigger();
    }

    getSliderHandleMaxPosition(): number {
        if(this.maxPosition === undefined){
            let lineSize = this.isHorizontal ? this.line.$elem.outerWidth() : this.line.$elem.outerHeight();
            let handleSize = this.isHorizontal ? this.$elem.outerWidth() : this.$elem.outerHeight();
            let maxWidth = lineSize - handleSize;
            this.maxPosition = (100 * maxWidth)/lineSize;
            return this.maxPosition;
        } else {
            return this.maxPosition;
        }
    }

    setInitPosition(position: number, direction: SliderDirection): void{
        this.$elem.attr("style", `${direction}: ${position}%`);
        this.position = position;
    }

    public get positionChangedEvent(): ILiteEvent<void> {return this.onPositionChanged.expose();}
}