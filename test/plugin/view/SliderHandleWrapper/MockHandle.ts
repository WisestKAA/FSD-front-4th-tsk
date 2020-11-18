import { ISliderHandle } from '../../../../src/plugin/view/SliderHandle/SliderHandle.types';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import Observer from '../../../../src/plugin/Observer/Observer';
import { IObserver } from '../../../../src/plugin/Observer/Observer.types';

class MockHandle implements ISliderHandle {
  $elem: JQuery<HTMLElement>;

  position?: number;

  size: number = 10;

  protected onPositionChanged: Observer<SliderDirection>;

  public get positionChangedEvent(): IObserver<SliderDirection> {
    return this.onPositionChanged.expose();
  }

  constructor(isHorizontal?: boolean) {
    this.$elem = isHorizontal ? $('<div>').attr('class', StyleClasses.HANDLE)
      : $('<div>').attr('class', `${StyleClasses.HANDLE} ${StyleClasses.HANDLE_V}`);
    this.onPositionChanged = new Observer<SliderDirection>();
  }

  setNewPosition(position: number, direction: SliderDirection): void {
    this.position = position;
    this.onPositionChanged.trigger(direction);
  }

  getSliderHandleMaxPosition(): number {
    return 100 - this.size;
  }

  setCurrentPosition(position: number, directionMock: SliderDirection): void {
    this.position = position;
  }

  getHandleSize(): number {
    return this.size;
  }

  getPosition(): number {
    return this.position;
  }

  changeOrientation(
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void {}
}

export default MockHandle;
