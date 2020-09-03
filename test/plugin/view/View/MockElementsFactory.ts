import IElementsFactory from '../../../../src/plugin/view/IElementsFactory';
import IScaleItem from '../../../../src/plugin/view/ScaleItem/IScaleItem';
import MockScaleItem from './MockScaleItem';
import IScaleWrapper from '../../../../src/plugin/view/ScaleWrapper/IScaleWrapper';
import MockScaleWrapper from './MockScaleWrapper';
import ISliderRange from '../../../../src/plugin/view/SliderRange/ISliderRange';
import MockRange from './MockRange';
import ISliderLine from '../../../../src/plugin/view/SliderLine/ISliderLine';
import MockLine from './MockLine';
import ISliderHandle from '../../../../src/plugin/view/SliderHandle/ISliderHandle';
import MockHandle from './MockHandle';
import ISliderHandleWrapper from '../../../../src/plugin/view/SliderHandleWrapper/ISliderHandleWrapper';
import MockHandleWrapper from './MockHandleWrapper';
import ISliderMainWrapper from '../../../../src/plugin/view/SliderMainWrapper/ISliderMainWrapper';
import MockMainWrapper from './MockMainWrapper';
import ICurrentValue from '../../../../src/plugin/view/CurrentValue/ICurrentValue';
import MockCurrentValue from './MockCurrentValue';
import ICurrentValueWrapper from '../../../../src/plugin/view/CurrentValueWrapper/ICurrentValueWrapper';
import MockCurrentValueWrapper from './MockCurrentValueWrapper';

class MockElementsFactory implements IElementsFactory {
  isHorizontal: boolean;

  isRange: boolean;

  constructor(isHorizontal: boolean, isRange: boolean) {
    this.setNewOptions(isHorizontal, isRange);
  }

  buildScaleItem(valueMock: number): IScaleItem {
    return new MockScaleItem();
  }

  buildScaleWrapper(scaleItemsMock: IScaleItem[]): IScaleWrapper {
    return new MockScaleWrapper(this.isHorizontal);
  }

  buildRange(): ISliderRange {
    return new MockRange();
  }

  buildLine(rangeMock?: ISliderRange): ISliderLine {
    return new MockLine();
  }

  buildHandle(lineMock: ISliderLine, isFromMock: boolean): ISliderHandle {
    return new MockHandle();
  }

  buildHandleWrapper(
    handleFromMock: ISliderHandle,
    handleToMock?: ISliderHandle
  ): ISliderHandleWrapper {
    return new MockHandleWrapper();
  }

  buildMainWrapper(
    sliderLineMock: ISliderLine,
    sliderHandleWrapperMock: ISliderHandleWrapper
  ): ISliderMainWrapper {
    return new MockMainWrapper(this.isHorizontal);
  }

  buildCurrentValue(isFromMock: boolean): ICurrentValue {
    return new MockCurrentValue();
  }

  buildCurrentValueWrapper(
    valueFromMock: ICurrentValue,
    valueToMock?: ICurrentValue
  ): ICurrentValueWrapper {
    return new MockCurrentValueWrapper(this.isHorizontal);
  }

  setNewOptions(isHorizontal: boolean, isRange: boolean): void {
    this.isHorizontal = isHorizontal;
    this.isRange = isRange;
  }
}

export default MockElementsFactory;
