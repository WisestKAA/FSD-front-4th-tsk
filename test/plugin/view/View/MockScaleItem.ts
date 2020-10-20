import IScaleItem from '../../../../src/plugin/view/ScaleItem/IScaleItem';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import LiteEvent from '../../../../src/plugin/LiteEvent/LiteEvent';
import ILiteEvent from '../../../../src/plugin/LiteEvent/ILiteEvent';

class MockScaleItem implements IScaleItem {
  protected onScaleItemClicked: LiteEvent<number>;

  scaleItemClickedEvent: ILiteEvent<number>;

  $elem: JQuery<HTMLElement>;

  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void { }
}

export default MockScaleItem;
