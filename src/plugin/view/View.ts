import { StyleClasses } from "./StyleClasses";
import { SliderLine } from "./SliderLine";
import { SliderHandle } from "./SliderHandle";
import { SliderWrapper } from "./SliderWrapper";
import { CurrentValue } from "./CurrentValue";
import { Presenter } from "../presenter/Presenter";

export class View{
    presenter: Presenter;
    slider: JQuery<HTMLElement>;
    line: SliderLine;
    handle: SliderHandle;
    wrapper: SliderWrapper;
    currentValue: CurrentValue;

    constructor(elem: HTMLElement, presenter: Presenter){
        this.currentValue = new CurrentValue();
        this.presenter = presenter;
        this.init(elem);
        this.addEvents();
    }

    protected init(elem: HTMLElement){
        let $mainDiv = $('<div>').addClass(StyleClasses.SLIDER);
        let $header = this.buildHeaderWithStaticCurrentValue();
        this.line = new SliderLine();
        this.wrapper = new SliderWrapper();
        this.handle = new SliderHandle(this.line);
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
        this.handle.positionLeftChangedEvent.on(() => {
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
    
    setNewSliderHandleLeftPosition(position: number): void {
        this.handle.setNewPositionLeft(position);
    }

    getMaxHandlePosition(): number{
        return this.handle.getSliderHandleMaxPosition();
    }

    getLineWidth(): number {
        return this.line.getLineWidth();
    }
}