import { ISliderHandleWrapper } from '../../../../src/plugin/view/SliderHandleWrapper/SliderHandleWrapper.types';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import Observer from '../../../../src/plugin/Observer/Observer';
import { IObserver } from '../../../../src/plugin/Observer/Observer.types';

class MockHandleWrapper implements ISliderHandleWrapper {
  $elem: JQuery<HTMLElement>;

  isRange: boolean = true;

  formPosition: number = 10;

  toPosition: number = 10;

  protected onHandlePositionChanged: Observer<SliderDirection>;

  public get handlePositionChangedEvent(): IObserver<SliderDirection> {
    return this.onHandlePositionChanged.expose();
  }

  constructor(isHorizontal?: boolean) {
    this.onHandlePositionChanged = new Observer<SliderDirection>();
    this.$elem = isHorizontal ? $('<div>').attr('class', `${StyleClasses.HANDLE_WRAPPER}`)
      : $('<div>').attr('class', `${StyleClasses.HANDLE_WRAPPER} ${StyleClasses.HANDLE_WRAPPER_V}`);
  }

  getMaxHandlePosition(): number {
    return 90;
  }

  setHandlePosition(
    positionMock: number,
    direction: SliderDirection,
    isNewPosition: boolean = true
  ): void {
    this.onHandlePositionChanged.trigger(direction);
  }

  getSliderHandlePosition(directionMock: SliderDirection): number {
    return 10;
  }

  getHandleFromPosition(): number {
    return this.formPosition;
  }

  getHandleToPosition(): number {
    return this.toPosition;
  }

  getIsRange(): boolean {
    return this.isRange;
  }

  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void {}
}

export default MockHandleWrapper;
