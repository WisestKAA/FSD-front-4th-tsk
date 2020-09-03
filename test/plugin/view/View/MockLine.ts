import ISliderLine from '../../../../src/plugin/view/SliderLine/ISliderLine';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import ISetRangeOptions from '../../../../src/plugin/view/SliderLine/ISetRangeOptions';

class MockLine implements ISliderLine {
  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void {}

  public $elem: JQuery<HTMLElement> = $('<div>');

  getLineSize(): number {
    return 100;
  }

  setRange(setRangeOptionsMock: ISetRangeOptions): void {}
}

export default MockLine;
