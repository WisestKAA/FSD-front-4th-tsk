import ISliderHandle from '../../../../src/plugin/view/SliderHandle/ISliderHandle';
import LiteEvent from '../../../../src/plugin/LiteEvent/LiteEvent';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import ILiteEvent from '../../../../src/plugin/LiteEvent/ILiteEvent';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';

class MockHandle implements ISliderHandle {
  $elem: JQuery<HTMLElement>;

  position?: number;

  size: number = 10;

  protected onPositionChanged: LiteEvent<SliderDirection>;

  public get positionChangedEvent(): ILiteEvent<SliderDirection> {
    return this.onPositionChanged.expose();
  }

  constructor(isHorizontal?: boolean) {
    this.$elem = isHorizontal ? $('<div>').attr('class', StyleClasses.HANDLE)
      : $('<div>').attr('class', `${StyleClasses.HANDLE} ${StyleClasses.HANDLEV}`);
    this.onPositionChanged = new LiteEvent<SliderDirection>();
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
