import { IScaleItem } from '../../../../src/plugin/view/ScaleItem/ScaleItem.types';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import LiteEvent from '../../../../src/plugin/LiteEvent/LiteEvent';
import { ILiteEvent } from '../../../../src/plugin/LiteEvent/LiteEvent.types';

class MockScaleItem implements IScaleItem {
  $elem: JQuery<HTMLElement>;

  onScaleItemClicked: LiteEvent<number>;

  value: number;

  constructor(value: number) {
    this.$elem = $('<div>').addClass(StyleClasses.SCALE_ITEM);
    this.onScaleItemClicked = new LiteEvent<number>();
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

  public get scaleItemClickedEvent(): ILiteEvent<number> {
    return this.onScaleItemClicked.expose();
  }
}

export default MockScaleItem;
