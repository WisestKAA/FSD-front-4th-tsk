import { StyleClasses } from "./StyleClasses";
import { SliderLine } from "./SliderLine/SliderLine";
import { SliderHandle } from "./SliderHandle/SliderHandle";
import { SliderWrapper } from "./SliderWrapper";
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
    presenter: Presenter;
    slider: JQuery<HTMLElement>;
    //line: SliderLine;
    //handleFrom: SliderHandle;
    //handleTo: SliderHandle;
    //mainWrapper: SliderWrapper;
    //handleWrapper: SliderWrapper;
    currentValueWrapper: ICurrentValueWrapper;
    mainWrapper: ISliderMainWrapper;
    options: IViewOptions;
    range: SliderRange;

    constructor(elem: HTMLElement, presenter: Presenter, options: IViewOptions){
        this.presenter = presenter;
        this.options = options;
        this.init(elem);
        this.addEvents();
    }

    protected init(elem: HTMLElement){
        this.currentValueWrapper = this.buildCurrentValueWrapper(this.options.isHorizontal, this.options.isRange);
        this.mainWrapper = this.buildMainWrapper(
            this.options.isHorizontal,
            this.options.isRangeLineEnabled,
            this.options.isRange 
        );
        
        let $mainDiv = this.options.isHorizontal ? $('<div>').addClass(StyleClasses.SLIDER) :  $('<div>').addClass([StyleClasses.SLIDER, StyleClasses.SLIDERV]);
        $mainDiv.append([this.currentValueWrapper.$elem, this.mainWrapper.$elem]);
        this.slider = $(elem).append($mainDiv);
    }

    buildMainWrapper(isHorizontal: boolean, isRangeLineEnabled: boolean, isRange: boolean): ISliderMainWrapper{
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

    buildCurrentValueWrapper(isHorizontal: boolean, isRange: boolean): ICurrentValueWrapper{
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

    addEvents(): void {
        this.mainWrapper.handlePositionChangedToCurrentValueEvent.on((options) =>{
            this.currentValueWrapper.setCurrentValuePosition(options);
        });
        this.mainWrapper.handlePositionChangedToPresenterEvent.on((direction) => {
            this.presenter.sliderHandleChangedPosition(direction);
        });
        
        // let that = this;
        // this.handleFrom.positionChangedEvent.on((data) => {
        //     that.sliderHandleChanged(data);
        //     that.setCurrentValuePosition(that.handleFrom.getPosition(), data);
        // });
        // if(this.options.isRange){
        //     this.handleTo.positionChangedEvent.on((data) => {
        //         that.sliderHandleChanged(data);
        //         that.setCurrentValuePosition(that.handleTo.getPosition(), data);
        //     });
        // }
    }

    // sliderHandleChanged(direction: SliderDirection): void {
    //     this.setRange(this.options.isRangeLineEnabled);
    //     if(this.options.isRange){
    //         this.checkHandleIntersection(this.handleFrom.getPosition(), this.handleTo.getPosition(), direction);
    //     }  
    //     this.presenter.sliderHandleChangedPosition(direction);
    // }

    getSliderHandlePosition(direction: SliderDirection): number{
        return this.mainWrapper.getSliderHandlePosition(direction);    
    }

    setCurrentValue(currentValue: number[]): void {
        this.currentValueWrapper.setCurrentValue(currentValue);
    }

    getCurrentValue(): number[] {
        return this.currentValueWrapper.getCurrentValue();
    }

    getMaxHandlePosition(): number{
        return this.mainWrapper.getMaxHandlePosition();
    }

    setHandlePosition(position: number, direction: SliderDirection): void {
        this.mainWrapper.setHandlePosition(position, direction);
        
        
        // if(direction === SliderDirection.LEFT || direction === SliderDirection.BOTTOM){
        //     this.handleFrom.setCurrentPosition(position, direction);
        // } else {
        //     this.handleTo.setCurrentPosition(position, direction);
        // }
        // this.setCurrentValuePosition(position, direction); // не убирать!!!!
        // this.setRange(this.options.isRangeLineEnabled);  // не убирать!!!!      
    }

    setCurrentValuePosition(position: number, direction: SliderDirection): void{
        this.currentValueWrapper.setCurrentValuePosition({
            position: position,
            direction: direction,
            handleFromPosition: this.mainWrapper.getHandleFromPosition(),
            handleToPosition: this.mainWrapper.getHandleToPosition(),
            lineSize: this.mainWrapper.getLineSize(),
            maxHandlePosition: this.getMaxHandlePosition()
        })
    }

    setOrientation(option: IViewOptions): void{
        // let mainDiv = this.slider.get(0).firstElementChild;
        // if(option.isHorizontal){
        //     mainDiv.classList.add(StyleClasses.SLIDER)
        // } else {
        //     mainDiv.classList.add(StyleClasses.SLIDER, StyleClasses.SLIDERV)
        // }        
        // this.line.changeOrientation(option.isHorizontal, StyleClasses.LINE, StyleClasses.LINEV);
        // this.mainWrapper.changeOrientation(option.isHorizontal, StyleClasses.WRAPPER, StyleClasses.WRAPPERV);
        // this.handleWrapper.changeOrientation(option.isHorizontal, StyleClasses.WRAPPER, StyleClasses.WRAPPERV);
        // this.handleFrom.changeOrientation(option.isHorizontal, StyleClasses.HANDLE, StyleClasses.HANDLEV);   
        // //this.handleFrom.isHorizontal = option.isHorizontal;
        // if(option.isRange){
        //     this.handleTo.changeOrientation(option.isRange, StyleClasses.HANDLE, StyleClasses.HANDLEV);
        //     //this.handleTo.isHorizontal = option.isHorizontal;
        // }
        // if(option.isRangeLineEnabled){
        //     this.range.changeOrientation(option.isHorizontal, StyleClasses.RANGE, StyleClasses.RANGEV);
        //     //this.range.isHorizontal = option.isHorizontal;
        // }
    }
}