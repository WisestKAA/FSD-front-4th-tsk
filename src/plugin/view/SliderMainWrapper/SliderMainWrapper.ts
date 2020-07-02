import { AbstractElement } from "../AbstractElement/AbstractElement";
import { ISliderMainWrapper } from "./ISliderMainWrapper";
import { StyleClasses } from "../StyleClasses";
import { ISliderLine } from "../SliderLine/ISliderLine";
import { ISliderHandleWrapper } from "../SliderHandleWrapper/ISliderHandleWrapper";
import { LiteEvent } from "../../LiteEvent/LiteEvent";
import { ILiteEvent } from "../../LiteEvent/ILiteEvent";
import { ISetRangeOptions } from "../SliderLine/ISetRangeOptions";
import { ISetCurrentValuePositionOptions } from "../CurrentValueWrapper/ISetCurrentValuePositionOptions";
import { SliderDirection } from "../SliderDirection";

export class SliderMainWrapper extends AbstractElement implements ISliderMainWrapper{
    public $elem: JQuery<HTMLElement>;
    protected isHorizontal: boolean;
    protected sliderLine: ISliderLine;
    protected sliderHandleWrapper: ISliderHandleWrapper;
    protected onHandlePositionChangedToCurrentValue: LiteEvent<ISetCurrentValuePositionOptions>;
    protected onHandlePositionChangedToPresenter: LiteEvent<SliderDirection>;

    constructor(isHorizontal: boolean, sliderLine: ISliderLine, sliderHandleWrapper: ISliderHandleWrapper){
        super();
        this.isHorizontal = isHorizontal;
        this.sliderLine = sliderLine;
        this.sliderHandleWrapper = sliderHandleWrapper;
        this.init();
        this.addEvents();
    }

    protected init(): void {        
        this.$elem = $('<div>');
        this.changeOrientation(this.isHorizontal, StyleClasses.MAINWRAPPER, StyleClasses.MAINWRAPPERV);
        this.$elem.append([this.sliderLine.$elem, this.sliderHandleWrapper.$elem])
        this.onHandlePositionChangedToCurrentValue = new LiteEvent<ISetCurrentValuePositionOptions>();
        this.onHandlePositionChangedToPresenter = new LiteEvent<SliderDirection>();
    }

    protected addEvents(): void{
        this.sliderHandleWrapper.handlePositionChangedToRangeEvent.on((options) => {
            this.handlePositionChangedToRange(options);
        });
        this.sliderHandleWrapper.handlePositionChangedToCurrentValueEvent.on((options) => {
            options.lineSize = this.getLineSize();
            this.handlePositionChangedToCurrentValue(options);
        });
        this.sliderHandleWrapper.handlePositionChangedToPresenterEvent.on((direction) => {
            this.handlePositionChangedToPresenter(direction);
        });
    }

    protected handlePositionChangedToRange(options: ISetRangeOptions): void{
        this.sliderLine.setRange(options);
    }

    protected handlePositionChangedToCurrentValue(options: ISetCurrentValuePositionOptions): void{
        this.onHandlePositionChangedToCurrentValue.trigger(options);
    }

    protected handlePositionChangedToPresenter(direction: SliderDirection){
        this.onHandlePositionChangedToPresenter.trigger(direction);
    }

    public getSliderHandlePosition(direction: SliderDirection): number{
        return this.sliderHandleWrapper.getSliderHandlePosition(direction);
    }

    public getMaxHandlePosition(): number{
        return this.sliderHandleWrapper.getMaxHandlePosition();
    }

    public setHandlePosition(position: number, direction: SliderDirection): void{
        this.sliderHandleWrapper.setHandlePosition(position, direction);
    }

    public getHandleFromPosition(): number{
        return this.sliderHandleWrapper.getHandleFromPosition();
    }
    
    public getHandleToPosition(): number | null{
        return this.sliderHandleWrapper.getHandleToPosition();
    }

    public getLineSize(): number{
        return this.sliderLine.getLineSize();
    }
    
    public get handlePositionChangedToCurrentValueEvent(): ILiteEvent<ISetCurrentValuePositionOptions> {return this.onHandlePositionChangedToCurrentValue.expose();}

    public get handlePositionChangedToPresenterEvent(): ILiteEvent<SliderDirection> {return this.onHandlePositionChangedToPresenter.expose();}
}