import ISliderRange from '../../../../src/plugin/view/SliderRange/ISliderRange';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';

class MockRange implements ISliderRange {
  $elem: JQuery<HTMLElement>;

  changeRangeLineTwo(
    positionFromMock: number,
    positionToMock: number
  ): void {}

  changeRangeLineOne(
    positionFromMock: number,
    maxHandlePositionMock: number
  ): void {}

  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void {}
}

export default MockRange;
