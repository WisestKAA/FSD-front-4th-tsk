import { ISliderLine } from '../../../../src/plugin/view/SliderLine/SliderLine.types';
import { ISetRangeOptions } from '../../../../src/plugin/view/SliderLine/SliderLine.types';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import Observer from '../../../../src/plugin/Observer/Observer';
import { IObserver } from '../../../../src/plugin/Observer/Observer.types';

class MockSliderLine implements ISliderLine {
  private onLineClick: Observer<number>;

  $elem: JQuery<HTMLElement>;

  isHorizontal: boolean

  constructor(isHorizontal: boolean) {
    this.$elem = $('<div>');
    this.isHorizontal = isHorizontal;
    this.onLineClick = new Observer<number>();
  }

  public get lineClickEvent(): IObserver<number> {
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
}

export default MockSliderLine;
