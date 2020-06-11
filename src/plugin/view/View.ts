import { StyleClasses } from "./StyleClasses";
import { SliderLine } from "./SliderLine";
import { SliderHandle } from "./SliderHandle";
import { SliderWrapper } from "./SliderWrapper";
import { CurrentValue } from "./CurrentValue";
import { Presenter } from "../presenter/Presenter";
import { IViewOptions } from "./IViewOptions";
import { SliderDirection } from "./SliderDirection";

export class View{
    presenter: Presenter;
    slider: JQuery<HTMLElement>;
    line: SliderLine;
    handle: SliderHandle;
    wrapper: SliderWrapper;
    currentValue: CurrentValue;
    options: IViewOptions;

    constructor(elem: HTMLElement, presenter: Presenter, options: IViewOptions){
        this.presenter = presenter;
        this.options = options;
        this.init(elem);
        this.addEvents();
    }

    protected init(elem: HTMLElement){        
        this.currentValue = new CurrentValue();
        let $mainDiv = this.options.isHorizontal ? $('<div>').addClass(StyleClasses.SLIDER) :  $('<div>').addClass([StyleClasses.SLIDER, StyleClasses.SLIDERV]);
        let $header = this.buildHeaderWithStaticCurrentValue();
        this.line = new SliderLine(this.options.isHorizontal);
        this.wrapper = new SliderWrapper(this.options.isHorizontal);
        this.handle = new SliderHandle(this.line, this.options.isHorizontal);
        this.wrapper.$elem.append(this.line.$elem, this.handle.$elem);
        $mainDiv.append($header, this.wrapper.$elem);
        this.slider = $(elem).append($mainDiv);
    }

    buildHeaderWithStaticCurrentValue(): JQuery<HTMLElement>{
        let $header = $('<div>').addClass(StyleClasses.HEADER);
        $header.append(this.currentValue.$elem);
        return $header;
    }

    addEvents(): void {
        let that = this;
        this.handle.positionChangedEvent.on(() => {
            that.sliderHandleLeftChange();
        });
    }

    sliderHandleLeftChange(): void {        
        this.presenter.sliderHandleLeftChange();
    }

    getSliderHandleLeftPosition(): number{
        return this.handle.position;
    }

    setCurrentValue(currentValue: number): void {
        this.currentValue.setCurrentValue(currentValue);
    }

    getCurrentValue(): number {
        return this.currentValue.val;
    }
    
    setNewSliderHandlePosition(position: number, direction: SliderDirection): void {
        this.handle.setNewPosition(position, direction);
    }

    getMaxHandlePosition(): number{
        return this.handle.getSliderHandleMaxPosition();
    }

    getLineWidth(): number {
        return this.line.getLineWidth();
    }
}