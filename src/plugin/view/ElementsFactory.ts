import bind from 'bind-decorator';

import ISliderRange from './SliderRange/ISliderRange';
import SliderRange from './SliderRange/SliderRange';
import SliderLine from './SliderLine/SliderLine';
import ISliderLine from './SliderLine/ISliderLine';
import SliderHandle from './SliderHandle/SliderHandle';
import ISliderHandle from './SliderHandle/ISliderHandle';
import ISliderHandleWrapper from './SliderHandleWrapper/ISliderHandleWrapper';
import SliderHandleWrapper from './SliderHandleWrapper/SliderHandleWrapper';
import ISliderMainWrapper from './SliderMainWrapper/ISliderMainWrapper';
import SliderMainWrapper from './SliderMainWrapper/SliderMainWrapper';
import IHint from './Hint/IHint';
import Hint from './Hint/Hint';
import IHintWrapper from './HintWrapper/IHintWrapper';
import HintWrapper from './HintWrapper/HintWrapper';
import IScaleItem from './ScaleItem/IScaleItem';
import ScaleItem from './ScaleItem/ScaleItem';
import IScaleWrapper from './ScaleWrapper/IScaleWrapper';
import ScaleWrapper from './ScaleWrapper/ScaleWrapper';
import IElementsFactory from './IElementsFactory';

class ElementsFactory implements IElementsFactory {
  private isHorizontal: boolean;

  private isRange: boolean;

  constructor(isHorizontal: boolean, isRange: boolean) {
    this.setNewOptions(isHorizontal, isRange);
  }

  @bind
  public setNewOptions(isHorizontal: boolean, isRange: boolean): void{
    this.isHorizontal = isHorizontal;
    this.isRange = isRange;
  }

  @bind
  public buildRange(): ISliderRange {
    return new SliderRange(this.isHorizontal);
  }

  @bind
  public buildLine(range?: ISliderRange): ISliderLine {
    return new SliderLine(this.isHorizontal, range);
  }

  @bind
  public buildHandle(line: ISliderLine, isFrom: boolean): ISliderHandle {
    return new SliderHandle({
      isHorizontal: this.isHorizontal,
      isRange: this.isRange,
      sliderLine: line,
      isFrom
    });
  }

  @bind
  public buildHandleWrapper(
    handleFrom: ISliderHandle,
    handleTo?: ISliderHandle
  ): ISliderHandleWrapper {
    return new SliderHandleWrapper(this.isHorizontal, handleFrom, handleTo);
  }

  @bind
  public buildMainWrapper(
    sliderLine: ISliderLine,
    sliderHandleWrapper: ISliderHandleWrapper
  ): ISliderMainWrapper {
    return new SliderMainWrapper(this.isHorizontal, sliderLine, sliderHandleWrapper);
  }

  @bind
  public buildHint(isFrom: boolean): IHint {
    return new Hint(isFrom, this.isHorizontal);
  }

  @bind
  public buildHintWrapper(
    valueFrom: IHint,
    valueTo?: IHint
  ): IHintWrapper {
    return new HintWrapper(this.isHorizontal, valueFrom, valueTo);
  }

  @bind
  public buildScaleItem(value: number): IScaleItem {
    return new ScaleItem(this.isHorizontal, value);
  }

  @bind
  public buildScaleWrapper(scaleItems: IScaleItem[]): IScaleWrapper {
    return new ScaleWrapper(this.isHorizontal, scaleItems);
  }
}

export default ElementsFactory;
