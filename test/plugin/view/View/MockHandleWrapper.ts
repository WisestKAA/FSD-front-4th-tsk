import { ISliderHandleWrapper } from '../../../../src/plugin/view/SliderHandleWrapper/SliderHandleWrapper.types';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import { IObserver } from '../../../../src/plugin/Observer/Observer.types';
import Observer from '../../../../src/plugin/Observer/Observer';

class MockHandleWrapper implements ISliderHandleWrapper {
  protected onHandlePositionChanged: Observer<SliderDirection>;

  constructor() {
    this.onHandlePositionChanged = new Observer<SliderDirection>();
  }

  getMaxHandlePosition(): number {
    return 90;
  }

  setHandlePosition(
    positionMock: number,
    directionMock: SliderDirection
  ): void {}

  getSliderHandlePosition(directionMock: SliderDirection): number {
    return 0;
  }

  getHandleFromPosition(): number {
    return 0;
  }

  getHandleToPosition(): number {
    return 0;
  }

  getIsRange(): boolean {
    return false;
  }

  public get handlePositionChangedEvent(): IObserver<SliderDirection> {
    return this.onHandlePositionChanged.expose();
  }

  $elem: JQuery<HTMLElement> = $('<div>');

  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void {}
}

export default MockHandleWrapper;
