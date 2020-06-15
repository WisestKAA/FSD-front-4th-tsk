import { StyleClasses } from "./StyleClasses";
import { SliderLine } from "./SliderLine";
import { SliderHandle } from "./SliderHandle";
import { SliderWrapper } from "./SliderWrapper";
import { CurrentValue } from "./CurrentValue";
import { Presenter } from "../presenter/Presenter";
import { IViewOptions } from "./IViewOptions";
import { SliderDirection } from "./SliderDirection";
import { IView } from "./IView";

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
        this.presenter.sliderHandleChangedPosition();
    }

    getSliderHandlePosition(): number{
        return this.handle.position;
    }

    setCurrentValue(currentValue: number): void {
        this.currentValue.setCurrentValue(currentValue);
    }

    getCurrentValue(): number {
        return this.currentValue.val;
    }

    getMaxHandlePosition(): number{
        return this.handle.getSliderHandleMaxPosition();
    }

    getLineWidth(): number {
        return this.line.getLineWidth();
    }

    getReadySlider(): JQuery<HTMLElement>{
        return this.slider;
    }

    setCurrentPosition(position: number, direction: SliderDirection): void {
        this.handle.setCurrentPosition(position, direction);
    }

    setOrientation(isHorizontal: boolean): void{
        let mainDiv = this.slider.get(0).firstElementChild;
        if(isHorizontal){
            mainDiv.classList.add(StyleClasses.SLIDER)
        } else {
            mainDiv.classList.add(StyleClasses.SLIDER, StyleClasses.SLIDERV)
        }        
        this.line.changeOrientation(isHorizontal, StyleClasses.LINE, StyleClasses.LINEV);
        this.wrapper.changeOrientation(isHorizontal, StyleClasses.WRAPPER, StyleClasses.WRAPPERV);
        this.handle.changeOrientation(isHorizontal, StyleClasses.HANDLE, StyleClasses.HANDLEV);   
        this.handle.isHorizontal = isHorizontal;     
    }
}