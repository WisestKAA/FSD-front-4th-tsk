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
        this.currentValue = new CurrentValue();
        this.buildLine(this.options.isHorizontal, this.options.isRange);
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

    buildLine(isHorizontal: boolean, isRange: boolean): void{
        if(isRange){
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
            that.sliderHandleChange(data);
        });
        if(this.options.isRange){
            this.handleTo.positionChangedEvent.on((data) => {
                that.sliderHandleChange(data);
            });
        }
    }

    sliderHandleChange(direction: SliderDirection): void {
        if(this.options.isRange){
            let maxPosition = this.handleFrom.getSliderHandleMaxPosition();
            this.range.changeRange(maxPosition, this.handleFrom.position, this.handleTo.position);
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
    }

    setOrientation(isHorizontal: boolean): void{
        let mainDiv = this.slider.get(0).firstElementChild;
        if(isHorizontal){
            mainDiv.classList.add(StyleClasses.SLIDER)
        } else {
            mainDiv.classList.add(StyleClasses.SLIDER, StyleClasses.SLIDERV)
        }        
        this.line.changeOrientation(isHorizontal, StyleClasses.LINE, StyleClasses.LINEV);
        this.mainWrapper.changeOrientation(isHorizontal, StyleClasses.WRAPPER, StyleClasses.WRAPPERV);
        this.handleWrapper.changeOrientation(isHorizontal, StyleClasses.WRAPPER, StyleClasses.WRAPPERV);
        this.handleFrom.changeOrientation(isHorizontal, StyleClasses.HANDLE, StyleClasses.HANDLEV);   
        this.handleFrom.isHorizontal = isHorizontal;     
    }   
}