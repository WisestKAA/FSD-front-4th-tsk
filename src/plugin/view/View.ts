import { StyleClasses } from "./StyleClasses";
import { SliderLine } from "./SliderLine";
import { SliderHandle } from "./SliderHandle";
import { SliderWrapper } from "./SliderWrapper";
import { CurrentValue } from "./CurrentValue";
import { Presenter } from "../presenter/Presenter";
import { IViewOptions } from "./IViewOptions";
import { SliderDirection } from "./SliderDirection";
import { IView } from "./IView";
import { SliderRange } from "./SliderRange";

export class View{
    presenter: Presenter;
    slider: JQuery<HTMLElement>;
    line: SliderLine;
    handleFrom: SliderHandle;
    handleTo: SliderHandle;
    mainWrapper: SliderWrapper;
    handleWrapper: SliderWrapper;
    currentValue: CurrentValue;
    options: IViewOptions;
    range: SliderRange;

    constructor(elem: HTMLElement, presenter: Presenter, options: IViewOptions){
        this.presenter = presenter;
        this.options = options;
        this.init(elem);
        this.addEvents();
    }

    protected init(elem: HTMLElement){        
        this.currentValue = new CurrentValue(true, this.options.isHorizontal);
        this.buildLine(this.options.isHorizontal, this.options.isRangeLineEnabled);
        this.buildHandle(this.options.isHorizontal, this.options.isRange);
        
        this.mainWrapper = new SliderWrapper(this.options.isHorizontal);
        let $mainDiv = this.options.isHorizontal ? $('<div>').addClass(StyleClasses.SLIDER) :  $('<div>').addClass([StyleClasses.SLIDER, StyleClasses.SLIDERV]);
        this.mainWrapper.$elem.append(this.line.$elem, this.handleWrapper.$elem);
        let $header = this.buildHeaderWithStaticCurrentValue();
        $mainDiv.append($header, this.mainWrapper.$elem);
        this.slider = $(elem).append($mainDiv);
    }

    buildHeaderWithStaticCurrentValue(): JQuery<HTMLElement>{
        let $header = $('<div>').addClass(StyleClasses.HEADER);
        $header.append(this.currentValue.$elem);
        return $header;
    }

    buildLine(isHorizontal: boolean, isRangeLineEnabled: boolean): void{
        if(isRangeLineEnabled){
            this.line = new SliderLine(isHorizontal);
            this.range = new SliderRange(isHorizontal);
            this.line.$elem.append(this.range.$elem);
        } else {
            this.line = new SliderLine(isHorizontal);
        }
    }

    buildHandle(isHorizontal: boolean, isRange: boolean): void{
        this.handleWrapper = new SliderWrapper(isHorizontal);
        if(isRange){
            this.handleFrom = new SliderHandle({
                isHorizontal: isHorizontal,
                sliderLine: this.line,
                isRange: isRange,
                isFrom: true
            });
            this.handleTo = new SliderHandle({
                isHorizontal: isHorizontal,
                sliderLine: this.line,
                isRange: isRange,
                isFrom: false
            });
            this.handleWrapper.$elem.append(this.handleFrom.$elem, this.handleTo.$elem);
        } else {
            this.handleFrom = new SliderHandle({
                sliderLine: this.line, 
                isHorizontal: isHorizontal, 
                isRange: isRange,
                isFrom: true
            });
            this.handleWrapper.$elem.append(this.handleFrom.$elem);
        }
    }

    addEvents(): void {
        let that = this;
        this.handleFrom.positionChangedEvent.on((data) => {
            that.sliderHandleChanged(data);
        });
        if(this.options.isRange){
            this.handleTo.positionChangedEvent.on((data) => {
                that.sliderHandleChanged(data);
            });
        }
    }

    sliderHandleChanged(direction: SliderDirection): void {
        this.setRange(this.options.isRangeLineEnabled);
        if(this.options.isRange){
            this.checkHandleIntersection(this.handleFrom.position, this.handleTo.position, direction);
        }  
        this.presenter.sliderHandleChangedPosition(direction);
    }

    getSliderHandlePosition(direction: SliderDirection): number{
        if(direction === SliderDirection.LEFT || direction === SliderDirection.BOTTOM){
            return this.handleFrom.position;
        } else {
            return this.handleTo.position;
        }        
    }

    setCurrentValue(currentValue: number[]): void {
        this.currentValue.setCurrentValue(currentValue, this.options.isRange);
    }

    getCurrentValue(): number[] {
        return this.currentValue.val;
    }

    getMaxHandlePosition(): number{
        return this.handleFrom.getSliderHandleMaxPosition();
    }

    getLineWidth(): number {
        return this.line.getLineWidth();
    }

    getReadySlider(): JQuery<HTMLElement>{
        return this.slider;
    }

    setCurrentPosition(position: number, direction: SliderDirection): void {
        if(direction === SliderDirection.LEFT || direction === SliderDirection.BOTTOM){
            this.handleFrom.setCurrentPosition(position, direction);
        } else {
            this.handleTo.setCurrentPosition(position, direction);
        }
        this.setRange(this.options.isRangeLineEnabled);
    }

    setOrientation(option: IViewOptions): void{
        let mainDiv = this.slider.get(0).firstElementChild;
        if(option.isHorizontal){
            mainDiv.classList.add(StyleClasses.SLIDER)
        } else {
            mainDiv.classList.add(StyleClasses.SLIDER, StyleClasses.SLIDERV)
        }        
        this.line.changeOrientation(option.isHorizontal, StyleClasses.LINE, StyleClasses.LINEV);
        this.mainWrapper.changeOrientation(option.isHorizontal, StyleClasses.WRAPPER, StyleClasses.WRAPPERV);
        this.handleWrapper.changeOrientation(option.isHorizontal, StyleClasses.WRAPPER, StyleClasses.WRAPPERV);
        this.handleFrom.changeOrientation(option.isHorizontal, StyleClasses.HANDLE, StyleClasses.HANDLEV);   
        this.handleFrom.isHorizontal = option.isHorizontal;
        if(option.isRange){
            this.handleTo.changeOrientation(option.isRange, StyleClasses.HANDLE, StyleClasses.HANDLEV);
            this.handleTo.isHorizontal = option.isHorizontal;
        }
        if(option.isRangeLineEnabled){
            this.range.changeOrientation(option.isHorizontal, StyleClasses.RANGE, StyleClasses.RANGEV);
            this.range.isHorizontal = option.isHorizontal;
        }
    } 
    
    setRange(isRangeLineEnabled: boolean): void{
        if(isRangeLineEnabled){
            if(this.options.isRange){
                this.range.changeRangeLineTwo(this.handleFrom.position, this.handleTo.position);
            } else {
                let maxHandlePosition = this.getMaxHandlePosition();
                this.range.changeRangeLineOne(this.handleFrom.position, maxHandlePosition);
            }            
        } 
    }
    
    checkHandleIntersection(positionFrom: number, positionTo: number, direction: SliderDirection): boolean{
        let maxPos = this.getMaxHandlePosition();
        if(positionFrom > maxPos - positionTo){
            if(direction === SliderDirection.LEFT || direction === SliderDirection.BOTTOM){
                this.setCurrentPosition(maxPos - positionTo, direction);
            } else {
                this.setCurrentPosition(maxPos - positionFrom, direction);
            }
        } else {
            return false;
        }        
    }
}