import { IViewOptions } from "./IViewOptions";
import { ISliderRange } from "./SliderRange/ISliderRange";
import { SliderRange } from "./SliderRange/SliderRange";
import { SliderLine } from "./SliderLine/SliderLine";
import { ISliderLine } from "./SliderLine/ISliderLine";
import { SliderHandle } from "./SliderHandle/SliderHandle";
import { ISliderHandle } from "./SliderHandle/ISliderHandle";
import { ISliderHandleWrapper } from "./SliderHandleWrapper/ISliderHandleWrapper";
import { SliderHandleWrapper } from "./SliderHandleWrapper/SliderHandleWrapper";
import { ISliderMainWrapper } from "./SliderMainWrapper/ISliderMainWrapper";
import { SliderMainWrapper } from "./SliderMainWrapper/SliderMainWrapper";
import { ICurrentValue } from "./CurrentValue/ICurrentValue";
import { CurrentValue } from "./CurrentValue/CurrentValue";
import { ICurrentValueWrapper } from "./CurrentValueWrapper/ICurrentValueWrapper";
import { CurrentValueWrapper } from "./CurrentValueWrapper/CurrentValueWrapper";

export class ElementsFactory implements IElementsFactory{
    protected options: IViewOptions;
    
    constructor(options: IViewOptions){
        this.setNewOptions(options);
    }

    public setNewOptions(options: IViewOptions): void{
        this.options = options;
    }

    public buildRange(): ISliderRange{
        return new SliderRange(this.options.isHorizontal);
    }

    public buildLine(range?: ISliderRange): ISliderLine{
        return new SliderLine(this.options.isHorizontal, range);
    }

    public buildHandle(line: ISliderLine, isFrom: boolean): ISliderHandle{
        return new SliderHandle({
            isHorizontal: this.options.isHorizontal,
            isRange: this.options.isRange,
            sliderLine: line,
            isFrom: isFrom
        });
    }

    public buildHandleWrapper(handleFrom: ISliderHandle, handleTo?: ISliderHandle): ISliderHandleWrapper{
        return new SliderHandleWrapper(this.options.isHorizontal, handleFrom, handleTo);
    }

    public buildMainWrapper(sliderLine: ISliderLine, sliderHandleWrapper: ISliderHandleWrapper): ISliderMainWrapper{
        return new SliderMainWrapper(this.options.isHorizontal, sliderLine, sliderHandleWrapper);
    }

    public buildCurrentValue(isFrom: boolean): ICurrentValue{
        return new CurrentValue(isFrom, this.options.isHorizontal);
    }

    public buildCurrentValueWrapper(valueFrom: ICurrentValue, valueTo?: ICurrentValue): ICurrentValueWrapper{
        return new CurrentValueWrapper(this.options.isHorizontal, valueFrom, valueTo);
    }
}

export interface IElementsFactory{
    buildRange(): ISliderRange;
    buildLine(range?: ISliderRange): ISliderLine;
    buildHandle(line: ISliderLine, isFrom: boolean): ISliderHandle;
    buildHandleWrapper(handleFrom: ISliderHandle, handleTo?: ISliderHandle): ISliderHandleWrapper;
    buildMainWrapper(sliderLine: ISliderLine, sliderHandleWrapper: ISliderHandleWrapper): ISliderMainWrapper;
    buildCurrentValue(isFrom: boolean): ICurrentValue;
    buildCurrentValueWrapper(valueFrom: ICurrentValue, valueTo?: ICurrentValue): ICurrentValueWrapper;
    setNewOptions(options: IViewOptions): void;
}