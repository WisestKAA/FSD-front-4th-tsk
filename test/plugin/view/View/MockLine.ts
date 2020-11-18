import { ISetRangeOptions, ISliderLine } from '../../../../src/plugin/view/SliderLine/SliderLine.types';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import { ILiteEvent } from '../../../../src/plugin/LiteEvent/LiteEvent.types';
import LiteEvent from '../../../../src/plugin/LiteEvent/LiteEvent';

class MockLine implements ISliderLine {
  private onLineClick: LiteEvent<number>;

  constructor() {
    this.onLineClick = new LiteEvent<number>();
  }

  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void {}

  public $elem: JQuery<HTMLElement> = $('<div>');

  public get lineClickEvent(): ILiteEvent<number> {
    return this.onLineClick.expose();
  }

  getLineSize(): number {
    return 100;
  }

  setRange(setRangeOptionsMock: ISetRangeOptions): void {}
}

export default MockLine;
