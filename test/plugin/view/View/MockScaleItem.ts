import { IScaleItem } from '../../../../src/plugin/view/ScaleItem/ScaleItem.types';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import Observer from '../../../../src/plugin/Observer/Observer';
import { IObserver } from '../../../../src/plugin/Observer/Observer.types';

class MockScaleItem implements IScaleItem {
  scaleMarkValue: number;

  protected onScaleItemClicked: Observer<number>;

  scaleItemClickedEvent: IObserver<number>;

  $elem: JQuery<HTMLElement>;

  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void { }
}

export default MockScaleItem;
