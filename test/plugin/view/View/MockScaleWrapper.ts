import IScaleWrapper from '../../../../src/plugin/view/ScaleWrapper/IScaleWrapper';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import ILiteEvent from '../../../../src/plugin/LiteEvent/ILiteEvent';
import LiteEvent from '../../../../src/plugin/LiteEvent/LiteEvent';

class MockScaleWrapper implements IScaleWrapper {
  protected onScaleItemClicked: LiteEvent<number>;

  isHorizontal: boolean;

  $elem: JQuery<HTMLElement>;

  constructor(isHorizontal: boolean) {
    this.isHorizontal = isHorizontal;
    this.onScaleItemClicked = new LiteEvent<number>();
    this.$elem = this.isHorizontal
      ? $('<div>').addClass(StyleClasses.SCALEWRAPPER)
      : $('<div>').addClass([StyleClasses.SCALEWRAPPER, StyleClasses.SCALEWRAPPERV]);
    this.$elem.click(() => {
      this.onScaleItemClicked.trigger(0);
    });
  }

  public get scaleItemClickedEvent(): ILiteEvent<number> {
    return this.onScaleItemClicked.expose();
  }

  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void {}
}

export default MockScaleWrapper;
