import { IElementsFactory } from '../../../../src/plugin/view/View.types';
import { IScaleWrapper } from '../../../../src/plugin/view/ScaleWrapper/ScaleWrapper.types';
import { IScaleItem } from '../../../../src/plugin/view/ScaleItem/ScaleItem.types';
import { ISliderRange } from '../../../../src/plugin/view/SliderRange/SliderRange.types';
import { ISliderLine } from '../../../../src/plugin/view/SliderLine/SliderLine.types';
import { ISliderHandle } from '../../../../src/plugin/view/SliderHandle/SliderHandle.types';
import { ISliderHandleWrapper } from '../../../../src/plugin/view/SliderHandleWrapper/SliderHandleWrapper.types';
import { ISliderMainWrapper } from '../../../../src/plugin/view/SliderMainWrapper/SliderMainWrapper.types';
import { IHint } from '../../../../src/plugin/view/Hint/Hint.types';
import { IHintWrapper } from '../../../../src/plugin/view/HintWrapper/HintWrapper.types';
import MockHintWrapper from './MockHintWrapper';
import MockScaleItem from './MockScaleItem';
import MockHint from './MockHint';
import MockMainWrapper from './MockMainWrapper';
import MockHandle from './MockHandle';
import MockLine from './MockLine';
import MockRange from './MockRange';
import MockHandleWrapper from './MockHandleWrapper';
import MockScaleWrapper from './MockScaleWrapper';

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

  buildHint(isFromMock: boolean): IHint {
    return new MockHint();
  }

  buildHintWrapper(
    hintFromMock: IHint,
    hintToMock?: IHint
  ): IHintWrapper {
    return new MockHintWrapper(this.isHorizontal);
  }

  setNewOptions(isHorizontal: boolean, isRange: boolean): void {
    this.isHorizontal = isHorizontal;
    this.isRange = isRange;
  }
}

export default MockElementsFactory;
