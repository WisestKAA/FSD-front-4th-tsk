import ISliderRange from './SliderRange/ISliderRange';
import ISliderLine from './SliderLine/ISliderLine';
import ISliderHandle from './SliderHandle/ISliderHandle';
import ISliderHandleWrapper from './SliderHandleWrapper/ISliderHandleWrapper';
import ISliderMainWrapper from './SliderMainWrapper/ISliderMainWrapper';
import ICurrentValue from './Hint/IHint';
import ICurrentValueWrapper from './HintWrapper/IHintWrapper';
import IScaleItem from './ScaleItem/IScaleItem';
import IScaleWrapper from './ScaleWrapper/IScaleWrapper';

interface IElementsFactory {
  buildRange(): ISliderRange;
  buildLine(range?: ISliderRange): ISliderLine;
  buildHandle(line: ISliderLine, isFrom: boolean): ISliderHandle;
  buildHandleWrapper(handleFrom: ISliderHandle, handleTo?: ISliderHandle): ISliderHandleWrapper;
  buildMainWrapper(
    sliderLine: ISliderLine,
    sliderHandleWrapper: ISliderHandleWrapper
  ): ISliderMainWrapper;
  buildCurrentValue(isFrom: boolean): ICurrentValue;
  buildCurrentValueWrapper(valueFrom: ICurrentValue, valueTo?: ICurrentValue): ICurrentValueWrapper;
  buildScaleItem(value: number): IScaleItem;
  buildScaleWrapper(scaleItems: IScaleItem[]): IScaleWrapper;
  setNewOptions(isHorizontal: boolean, isRange: boolean): void;
}

export default IElementsFactory;
