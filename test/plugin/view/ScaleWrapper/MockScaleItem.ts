import { IScaleItem } from '../../../../src/plugin/view/ScaleItem/ScaleItem.types';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import Observer from '../../../../src/plugin/Observer/Observer';
import { IObserver } from '../../../../src/plugin/Observer/Observer.types';

class MockScaleItem implements IScaleItem {
  $elem: JQuery<HTMLElement>;

  onScaleItemClicked: Observer<number>;

  value: number;

  constructor(value: number) {
    this.$elem = $('<div>').addClass(StyleClasses.SCALE_ITEM);
    this.onScaleItemClicked = new Observer<number>();
    this.value = value;
    this.scaleMarkValue = value;
    this.$elem.click(() => {
      this.onScaleItemClicked.trigger(this.value);
    });
  }

  scaleMarkValue: number;

  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void {}

  public get scaleItemClickedEvent(): IObserver<number> {
    return this.onScaleItemClicked.expose();
  }
}

export default MockScaleItem;
