import { StyleClasses } from "./StyleClasses";
import { SliderLine } from "./SliderLine/SliderLine";
import { SliderHandle } from "./SliderHandle/SliderHandle";
import { CurrentValue } from "./CurrentValue/CurrentValue";
import { Presenter } from "../presenter/Presenter";
import { IViewOptions } from "./IViewOptions";
import { SliderDirection } from "./SliderDirection";
import { SliderRange } from "./SliderRange/SliderRange";
import { CurrentValueWrapper } from "./CurrentValueWrapper/CurrentValueWrapper";
import { ICurrentValueWrapper } from "./CurrentValueWrapper/ICurrentValueWrapper";
import { ISliderMainWrapper } from "./SliderMainWrapper/ISliderMainWrapper";
import { ISliderLine } from "./SliderLine/ISliderLine";
import { ISliderHandleWrapper } from "./SliderHandleWrapper/ISliderHandleWrapper";
import { SliderHandleWrapper } from "./SliderHandleWrapper/SliderHandleWrapper";
import { SliderMainWrapper } from "./SliderMainWrapper/SliderMainWrapper";

export class View{
    protected presenter: Presenter;
    protected slider: JQuery<HTMLElement>;
    protected currentValueWrapper: ICurrentValueWrapper;
    protected mainWrapper: ISliderMainWrapper;
    protected options: IViewOptions;
    protected elem: HTMLElement;

    constructor(elem: HTMLElement, presenter: Presenter, options: IViewOptions){
        this.presenter = presenter;
        this.options = options;
        this.elem = elem;
        this.init();
        this.addEvents();
    }

    protected init(){
        this.currentValueWrapper = this.buildCurrentValueWrapper(this.options.isHorizontal, this.options.isRange);
        this.mainWrapper = this.buildMainWrapper(
            this.options.isHorizontal,
            this.options.isRangeLineEnabled,
            this.options.isRange 
        );        
        let $mainDiv = this.options.isHorizontal ? $('<div>').addClass(StyleClasses.SLIDER) :  $('<div>').addClass([StyleClasses.SLIDER, StyleClasses.SLIDERV]);
        $mainDiv.append([this.currentValueWrapper.$elem, this.mainWrapper.$elem]);
        this.slider = $(this.elem).append($mainDiv);
    }

    protected buildMainWrapper(isHorizontal: boolean, isRangeLineEnabled: boolean, isRange: boolean): ISliderMainWrapper{
        let line: ISliderLine;
        if(isRangeLineEnabled){
            let range = new SliderRange(isHorizontal);
            line = new SliderLine(isHorizontal, range);
        } else {
            line = new SliderLine(isHorizontal);
        }
        
        let handleWrapper: ISliderHandleWrapper;
        let handleFrom = new SliderHandle({
            isHorizontal: isHorizontal,
            isRange: isRange,
            sliderLine: line,
            isFrom: true
        });
        if(isRange){
            let handleTo = new SliderHandle({
                isHorizontal: isHorizontal,
                isRange: isRange,
                sliderLine: line,
                isFrom: false
            });
            handleWrapper = new SliderHandleWrapper(isHorizontal, handleFrom, handleTo);
        } else {
            handleWrapper = new SliderHandleWrapper(isHorizontal, handleFrom);
        } 

        return new SliderMainWrapper(isHorizontal, line, handleWrapper);
    }    

    protected buildCurrentValueWrapper(isHorizontal: boolean, isRange: boolean): ICurrentValueWrapper{
        let currentValueFrom = new CurrentValue(true, isHorizontal);
        let currentValueWrapper: ICurrentValueWrapper;
        if(isRange){
            let currentValueTo = new CurrentValue(false, isHorizontal);
            currentValueWrapper = new CurrentValueWrapper(isHorizontal, currentValueFrom, currentValueTo);
        } else {
            currentValueWrapper = new CurrentValueWrapper(isHorizontal, currentValueFrom);
        }
        return currentValueWrapper;
    }

    protected addEvents(): void {
        this.mainWrapper.handlePositionChangedEvent.on((direction) => {
            this.setCurrentValuePosition(direction);
            this.presenter.sliderHandleChangedPosition(direction);
        });
    }

    protected setCurrentValuePosition(direction: SliderDirection): void{
        let position = SliderDirection.isFrom(direction) ? 
            this.mainWrapper.getHandleFromPosition() : this.mainWrapper.getHandleToPosition();
        this.currentValueWrapper.setCurrentValuePosition({
            position: position,
            direction: direction,
            handleFromPosition: this.mainWrapper.getHandleFromPosition(),
            handleToPosition: this.mainWrapper.getHandleToPosition(),
            lineSize: this.mainWrapper.getLineSize(),
            maxHandlePosition: this.getMaxHandlePosition()
        });
    }

    public getSliderHandlePosition(direction: SliderDirection): number{
        return this.mainWrapper.getSliderHandlePosition(direction);    
    }

    public setCurrentValue(currentValue: number[]): void {
        this.currentValueWrapper.setCurrentValue(currentValue);
    }

    public getCurrentValue(): number[] {
        return this.currentValueWrapper.getCurrentValue();
    }

    public getMaxHandlePosition(): number{
        return this.mainWrapper.getMaxHandlePosition();
    }

    public setHandlePosition(position: number, direction: SliderDirection): void {
        this.mainWrapper.setHandlePosition(position, direction);    
    }

    public reinitialization(option: IViewOptions): void{
        this.slider.html("");
        this.options = option;
        this.init();
        this.addEvents();
    }
}