import { IScaleWrapper } from '../../../../src/plugin/view/ScaleWrapper/ScaleWrapper.types';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import { IObserver } from '../../../../src/plugin/Observer/Observer.types';
import Observer from '../../../../src/plugin/Observer/Observer';

class MockScaleWrapper implements IScaleWrapper {
  protected onScaleItemClicked: Observer<number>;

  isHorizontal: boolean;

  $elem: JQuery<HTMLElement>;

  constructor(isHorizontal: boolean) {
    this.isHorizontal = isHorizontal;
    this.onScaleItemClicked = new Observer<number>();
    this.$elem = this.isHorizontal
      ? $('<div>').addClass(StyleClasses.SCALE_WRAPPER)
      : $('<div>').addClass([StyleClasses.SCALE_WRAPPER, StyleClasses.SCALE_WRAPPER_V]);
    this.$elem.click(() => {
      this.onScaleItemClicked.trigger(0);
    });
  }

  scaleItemMarkValues: number[];

  setScaleMarksPosition(positions: number[]): void {
    // throw new Error('Method not implemented.');
  }

  public get scaleItemClickedEvent(): IObserver<number> {
    return this.onScaleItemClicked.expose();
  }

  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void {}
}

export default MockScaleWrapper;
