import ISliderLine from '../../../../src/plugin/view/SliderLine/ISliderLine';
import ISetRangeOptions from '../../../../src/plugin/view/SliderLine/ISetRangeOptions';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';

class MockLine implements ISliderLine {
  $elem: JQuery<HTMLElement>;

  getLineSize(): number {
    return 100;
  }

  setRange(setRangeOptionsMock: ISetRangeOptions): void {}

  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void { }
}

export default MockLine;
