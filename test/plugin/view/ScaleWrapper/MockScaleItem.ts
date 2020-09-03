import IScaleItem from '../../../../src/plugin/view/ScaleItem/IScaleItem';
import LiteEvent from '../../../../src/plugin/LiteEvent/LiteEvent';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import ILiteEvent from '../../../../src/plugin/LiteEvent/ILiteEvent';

class MockScaleItem implements IScaleItem {
  $elem: JQuery<HTMLElement>;

  onScaleItemClicked: LiteEvent<number>;

  value: number;

  constructor(value: number) {
    this.$elem = $('<div>').addClass(StyleClasses.SCALEITEM);
    this.onScaleItemClicked = new LiteEvent<number>();
    this.value = value;
    this.$elem.click(() => {
      this.onScaleItemClicked.trigger(this.value);
    });
  }

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
