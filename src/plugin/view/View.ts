import { StyleClasses } from "./StyleClasses";
import { IViewOptions } from "./IViewOptions";
import { SliderDirection } from "./SliderDirection";
import { ICurrentValueWrapper } from "./CurrentValueWrapper/ICurrentValueWrapper";
import { ISliderMainWrapper } from "./SliderMainWrapper/ISliderMainWrapper";
import { ISliderLine } from "./SliderLine/ISliderLine";
import { ISliderHandleWrapper } from "./SliderHandleWrapper/ISliderHandleWrapper";
import { IPresenter } from "../presenter/IPresenter";
import { IElementsFactory } from "./ElementsFactory";

export class View{
    protected presenter: IPresenter;
    public slider: JQuery<HTMLElement>;
    protected currentValueWrapper: ICurrentValueWrapper;
    protected mainWrapper: ISliderMainWrapper;
    protected options: IViewOptions;
    protected elem: HTMLElement;
    protected elementsFactory: IElementsFactory;

    constructor(viewOptions: {
        elem: HTMLElement, 
        presenter: IPresenter, 
        options: IViewOptions,
        elementsFactory: IElementsFactory
    }){
        const{elem, presenter, options, elementsFactory} = viewOptions;
        this.presenter = presenter;
        this.options = options;
        this.elem = elem;
        this.elementsFactory = elementsFactory;
        this.init();
        this.addEvents();
    }

    protected init(){
        this.currentValueWrapper = this.buildCurrentValueWrapper(this.options.isRange);
        this.mainWrapper = this.buildMainWrapper(
            this.options.isRangeLineEnabled,
            this.options.isRange 
        );        
        let $mainDiv = this.options.isHorizontal ? $('<div>').addClass(StyleClasses.SLIDER) :  $('<div>').addClass([StyleClasses.SLIDER, StyleClasses.SLIDERV]);
        $mainDiv.append([this.currentValueWrapper.$elem, this.mainWrapper.$elem]);
        this.slider = $(this.elem).append($mainDiv);
    }

    protected buildMainWrapper(isRangeLineEnabled: boolean, isRange: boolean): ISliderMainWrapper{
        let line: ISliderLine;
        if(isRangeLineEnabled){
            let range = this.elementsFactory.buildRange();
            line = this.elementsFactory.buildLine(range);
        } else {
            line = this.elementsFactory.buildLine();
        }
        
        let handleWrapper: ISliderHandleWrapper;
        let handleFrom = this.elementsFactory.buildHandle(line, true);
        if(isRange){
            let handleTo = this.elementsFactory.buildHandle(line, false);
            handleWrapper = this.elementsFactory.buildHandleWrapper(handleFrom, handleTo);
        } else {
            handleWrapper = this.elementsFactory.buildHandleWrapper(handleFrom);
        } 
        return this.elementsFactory.buildMainWrapper(line, handleWrapper);
    }    

    protected buildCurrentValueWrapper(isRange: boolean): ICurrentValueWrapper{
        let currentValueFrom = this.elementsFactory.buildCurrentValue(true);
        let currentValueWrapper: ICurrentValueWrapper;
        if(isRange){
            let currentValueTo = this.elementsFactory.buildCurrentValue(false);
            currentValueWrapper = this.elementsFactory.buildCurrentValueWrapper(currentValueFrom, currentValueTo);
        } else {
            currentValueWrapper = this.elementsFactory.buildCurrentValueWrapper(currentValueFrom);
        }
        if (!this.options.isVisibleCurrentValue){
            currentValueWrapper.$elem.attr("style", "display: none");
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