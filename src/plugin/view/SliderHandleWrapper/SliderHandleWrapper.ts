import { AbstractElement } from "../AbstractElement/AbstractElement";
import { ISliderHandleWrapper } from "./ISliderHandleWrapper";
import { StyleClasses } from "../StyleClasses";
import { ISliderHandle } from "../SliderHandle/ISliderHandle";
import { SliderDirection } from "../SliderDirection";
import { LiteEvent } from "../../LiteEvent/LiteEvent";
import { ILiteEvent } from "../../LiteEvent/ILiteEvent";
import { ISetRangeOptions } from "../SliderLine/ISetRangeOptions";
import { ISetCurrentValuePositionOptions } from "../CurrentValueWrapper/ISetCurrentValuePositionOptions";

export class SliderHandleWrapper extends AbstractElement implements ISliderHandleWrapper{
    public $elem: JQuery<HTMLElement>;
    protected isHorizontal: boolean;
    protected handleFrom: ISliderHandle;
    protected handleTo: ISliderHandle;
    protected isRange: boolean;
    protected onHandlePositionChangedToRange: LiteEvent<ISetRangeOptions>;
    protected onHandlePositionChangedToCurrentValue: LiteEvent<ISetCurrentValuePositionOptions>;
    protected onHandlePositionChangedToPresenter: LiteEvent<SliderDirection>;
    
    constructor(isHorizontal: boolean, handleFrom: ISliderHandle, handleTo?: ISliderHandle){
        super();
        this.isHorizontal = isHorizontal;
        this.handleFrom = handleFrom;
        if(handleTo){
            this.handleTo = handleTo;
            this.isRange = true;
        } else {
            this.isRange = false;
        }
        this.init();
        this.addEvents();
    }
    
    protected init(): void {
        this.$elem = $('<div>');
        this.changeOrientation(this.isHorizontal, StyleClasses.HANDLEWRAPPER, StyleClasses.HANDLEWRAPPERV);
        if(this.isRange){
            this.$elem.append([this.handleFrom.$elem, this.handleTo.$elem]);
        } else {
            this.$elem.append(this.handleFrom.$elem);
        }

        this.onHandlePositionChangedToRange = new LiteEvent<ISetRangeOptions>();
        this.onHandlePositionChangedToCurrentValue = new LiteEvent<ISetCurrentValuePositionOptions>();
        this.onHandlePositionChangedToPresenter = new LiteEvent<SliderDirection>();
    }

    protected addEvents(): void{
        this.handleFrom.positionChangedEvent.on((direction) => {
            this.sliderHandlePositionChanged(direction); 
            this.onHandlePositionChangedTriggerToCurrentValue(direction, this.handleFrom.getPosition()); 
        });
        if(this.isRange){
            this.handleTo.positionChangedEvent.on((direction) => {
                this.sliderHandlePositionChanged(direction);
                this.onHandlePositionChangedTriggerToCurrentValue(direction, this.handleTo.getPosition());
            });
        }
    }

    protected sliderHandlePositionChanged(direction: SliderDirection): void{
        if(this.isRange){
            this.checkHandleIntersection(this.handleFrom.getPosition(), this.handleTo.getPosition(), direction);
        }
        this.onHandlePositionChangedTriggerToRange();
        this.onHandlePositionChangedToPresenter.trigger(direction);
    }

    protected onHandlePositionChangedTriggerToRange(): void{        
        let options: ISetRangeOptions;
        if(this.isRange){
            options = {
                isRange: this.isRange, 
                handleFromPosition: this.handleFrom.getPosition(),
                handleToPosition: this.handleTo.getPosition() 
            }
        } else {
            options = {
                isRange: this.isRange, 
                handleFromPosition: this.handleFrom.getPosition(), 
                maxHandlePosition: this.getMaxHandlePosition()
            };
        }
        this.onHandlePositionChangedToRange.trigger(options);
    }

    protected onHandlePositionChangedTriggerToCurrentValue(direction: SliderDirection, position: number): void{  
        let options: ISetCurrentValuePositionOptions;
        options = {direction: direction, position: position};        
        if(SliderDirection.isFrom(direction)){
            options.maxHandlePosition = this.getMaxHandlePosition();            
        }
        if(this.isRange){
            options.handleFromPosition = this.handleFrom.getPosition();
            options.handleToPosition = this.handleTo.getPosition();
        }

        this.onHandlePositionChangedToCurrentValue.trigger(options);
    }

    protected checkHandleIntersection(positionFrom: number, positionTo: number, direction: SliderDirection): boolean{
        let maxPos = this.getMaxHandlePosition();
        if(positionFrom > maxPos - positionTo){
            if(direction === SliderDirection.LEFT || direction === SliderDirection.BOTTOM){
                this.setHandlePosition(maxPos - positionTo, direction);
            } else {
                this.setHandlePosition(maxPos - positionFrom, direction);
            }
        } else {
            return false;
        }        
    }

    public getMaxHandlePosition(): number{
        let maxHandlePosition: number;
        maxHandlePosition = this.handleFrom.getSliderHandleMaxPosition();
        if(this.isRange){
            let maxHandlePositionTo = this.handleTo.getSliderHandleMaxPosition();
            maxHandlePosition = Math.min(maxHandlePosition, maxHandlePositionTo);
        }
        return maxHandlePosition;
    }

    public setHandlePosition(position: number, direction: SliderDirection): void {
        if(direction === SliderDirection.LEFT || direction === SliderDirection.BOTTOM){
            this.handleFrom.setCurrentPosition(position, direction);
        } else {
            this.handleTo.setCurrentPosition(position, direction);
        }      
        this.onHandlePositionChangedTriggerToCurrentValue(direction, position);
        this.onHandlePositionChangedTriggerToRange();
    }

    public getSliderHandlePosition(direction: SliderDirection): number{
        if(SliderDirection.isFrom(direction)){
            return this.handleFrom.getPosition();
        } else {
            return this.handleTo.getPosition();
        }
    }

    public getHandleFromPosition(): number{
        return this.handleFrom.getPosition();
    }

    public getHandleToPosition(): number | null{
        return !this.isRange ? null : this.handleTo.getPosition();
    }

    public get handlePositionChangedToRangeEvent(): ILiteEvent<ISetRangeOptions> {return this.onHandlePositionChangedToRange.expose();}

    public get handlePositionChangedToCurrentValueEvent(): ILiteEvent<ISetCurrentValuePositionOptions> {return this.onHandlePositionChangedToCurrentValue.expose();}

    public get handlePositionChangedToPresenterEvent(): ILiteEvent<SliderDirection> {return this.onHandlePositionChangedToPresenter.expose()}
}