import { ISliderRange } from '../../../../src/plugin/view/SliderRange/SliderRange.types';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';

class MockRange implements ISliderRange {
  $elem: JQuery<HTMLElement> = $('<div>');

  changeRangeLineTwo(positionFromMock: number, positionToMock: number): void {}

  changeRangeLineOne(positionFromMock: number, maxHandlePositionMock: number): void {}

  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void {}
}

export default MockRange;
