import { IScaleItem } from '../../../../src/plugin/view/ScaleItem/ScaleItem.types';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import LiteEvent from '../../../../src/plugin/LiteEvent/LiteEvent';
import { ILiteEvent } from '../../../../src/plugin/LiteEvent/LiteEvent.types';

class MockScaleItem implements IScaleItem {
  scaleMarkValue: number;

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
