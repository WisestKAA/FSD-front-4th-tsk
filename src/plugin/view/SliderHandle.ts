import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "./StyleClasses";
import { SliderLine } from "./SliderLine";
import { LiteEvent } from "../LiteEvent/LiteEvent";
import { ILiteEvent } from "../LiteEvent/ILiteEvent";
import { SliderDirection } from "./SliderDirection";
import { ISliderHandleOptions } from "./ISliderHandleOptions";

export class SliderHandle extends AbstractElement{
    public $elem: JQuery<HTMLElement>;
    public shiftX: number;
    public shiftXR: number;
    public shiftY: number;
    public position: number;
    private line: SliderLine;
    public onPositionChanged: LiteEvent<SliderDirection>;
    public isHorizontal: boolean;
    public maxPosition: number;
    public isRange: boolean;
    public isFrom: boolean;

    constructor(sliderHandleOptions: ISliderHandleOptions){
        super();
        this.line = sliderHandleOptions.sliderLine;
        this.isHorizontal = sliderHandleOptions.isHorizontal;
        this.isRange = sliderHandleOptions.isRange;
        this.isFrom = sliderHandleOptions.isFrom;
        this.init();
        this.addEvents();
    }

    protected init(): void {
        this.$elem =  this.isHorizontal ? $('<div>').addClass(StyleClasses.HANDLE) : $('<div>').addClass([StyleClasses.HANDLE, StyleClasses.HANDLEV]);
        this.position = 0;
        this.onPositionChanged = new LiteEvent<SliderDirection>();
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
        this.shiftXR = event.clientX - elem.getBoundingClientRect().right;
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
        if(this.isFrom){
            let newLeft = this.getNewLeft(event.clientX, lineHTMLElement.offset().left, lineHTMLElement.outerWidth(), this.$elem.outerWidth()); 
            this.setNewPosition(newLeft, SliderDirection.LEFT);
        } else {
            let newRight = this.getNewRight(event.clientX, lineHTMLElement.offset().left, lineHTMLElement.outerWidth(), this.$elem.outerWidth()); 
            this.setNewPosition(newRight, SliderDirection.RIGHT);
        }        
    }

    onMouseMoveY(event: JQuery.MouseMoveEvent): void {
        let lineHTMLElement = this.line.$elem;
        if(this.isFrom){
            let newBot = this.getNewBot(event.clientY, lineHTMLElement.offset().top, lineHTMLElement.outerHeight(), this.$elem.outerHeight()); 
            this.setNewPosition(newBot, SliderDirection.BOTTOM);
        } else {
            let newTop = this.getNewTop(event.clientY, lineHTMLElement.offset().top, lineHTMLElement.outerHeight(), this.$elem.outerHeight()); 
            this.setNewPosition(newTop, SliderDirection.TOP);
        }
    }

    onMouseUp(): void{
        $(document).off("mousemove");
        $(document).off("mouseup");
    }

    getNewLeft(clientX: number, offsetLeft: number, lineWidth: number, handleWidth: number): number {
        let newLeft = clientX - this.shiftX - offsetLeft;
        let newLeftPosition = this.getCorrectPositionFrom(newLeft, lineWidth, handleWidth);
        return newLeftPosition;
    }

    getNewRight(clientX: number, offsetLeft: number, lineWidth: number, handleWidth: number): number {
        let newRight = clientX - this.shiftXR - offsetLeft;
        let newRightPosition = this.getCorrectPositionTo(newRight, lineWidth, handleWidth);        
        return 100 - newRightPosition;
    }

    getNewBot(clientY: number, offsetTop: number, lineHieght: number, handleHeight: number): number{
        let newBot = lineHieght - (clientY - offsetTop + this.shiftY);
        let newBotPosition = this.getCorrectPositionFrom(newBot, lineHieght, handleHeight);
        return newBotPosition;
    }

    getNewTop(clientY: number, offsetTop: number, lineHieght: number, handleHeight: number): number {
        return 100 - this.getNewBot(clientY, offsetTop, lineHieght, handleHeight);
    }

    getCorrectPositionFrom(newCoordinate: number, linesize: number, handleSize: number): number{
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

    getCorrectPositionTo(newCoordinate: number, linesize: number, handleSize: number): number{
        if(newCoordinate < handleSize){
            newCoordinate = handleSize; 
        }
        if(newCoordinate > linesize){
            newCoordinate = linesize;
        }
        let correctPosition = (100 * newCoordinate)/linesize;
        return correctPosition;
    }
    
    setNewPosition(position: number, direction: SliderDirection): void {
        this.setCurrentPosition(position, direction);
        this.onPositionChanged.trigger(direction);
    }

    getSliderHandleMaxPosition(): number {        
        let lineSize = this.isHorizontal ? this.line.$elem.outerWidth() : this.line.$elem.outerHeight();
        let handleSize = this.isHorizontal ? this.$elem.outerWidth() : this.$elem.outerHeight();
        let maxWidth = lineSize - handleSize;
        this.maxPosition = (100 * maxWidth)/lineSize;
        return this.maxPosition;        
    }

    setCurrentPosition(position: number, direction: SliderDirection): void{
        this.$elem.attr("style", `${direction}: ${position}%`);
        this.position = position;
    }

    public get positionChangedEvent(): ILiteEvent<SliderDirection> {return this.onPositionChanged.expose();}
}