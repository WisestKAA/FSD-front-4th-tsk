import { ISetRangeOptions, ISliderLine } from '../../../../src/plugin/view/SliderLine/SliderLine.types';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import { IObserver } from '../../../../src/plugin/Observer/Observer.types';
import Observer from '../../../../src/plugin/Observer/Observer';

class MockLine implements ISliderLine {
  private onLineClick: Observer<number>;

  constructor() {
    this.onLineClick = new Observer<number>();
  }

  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void {}

  public $elem: JQuery<HTMLElement> = $('<div>');

  public get lineClickEvent(): IObserver<number> {
    return this.onLineClick.expose();
  }

  getLineSize(): number {
    return 100;
  }

  setRange(setRangeOptionsMock: ISetRangeOptions): void {}
}

export default MockLine;
