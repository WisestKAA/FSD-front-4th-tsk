import { ISliderLine } from '../../../../src/plugin/view/SliderLine/SliderLine.types';
import { ISetRangeOptions } from '../../../../src/plugin/view/SliderLine/SliderLine.types';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import LiteEvent from '../../../../src/plugin/LiteEvent/LiteEvent';
import { ILiteEvent } from '../../../../src/plugin/LiteEvent/LiteEvent.types';

class MockLine implements ISliderLine {
  private onLineClick: LiteEvent<number>;

  $elem: JQuery<HTMLElement>;

  constructor() {
    this.onLineClick = new LiteEvent<number>();
  }

  public get lineClickEvent(): ILiteEvent<number> {
    return this.onLineClick.expose();
  }

  getLineSize(): number {
    return 100;
  }

  setRange(setRangeOptionsMock: ISetRangeOptions): void {}

  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void { }

  lineClickTrigger(): void {
    this.onLineClick.trigger(1);
  }
}

export default MockLine;
