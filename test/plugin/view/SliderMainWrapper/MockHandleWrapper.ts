import ISliderHandleWrapper from '../../../../src/plugin/view/SliderHandleWrapper/ISliderHandleWrapper';
import LiteEvent from '../../../../src/plugin/LiteEvent/LiteEvent';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import ILiteEvent from '../../../../src/plugin/LiteEvent/ILiteEvent';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';

class MockHandleWrapper implements ISliderHandleWrapper {
  $elem: JQuery<HTMLElement>;

  isRange: boolean = true;

  formPosition: number = 10;

  toPosition: number = 10;

  protected onHandlePositionChanged: LiteEvent<SliderDirection>;

  public get handlePositionChangedEvent(): ILiteEvent<SliderDirection> {
    return this.onHandlePositionChanged.expose();
  }

  constructor(isHorizontal?: boolean) {
    this.onHandlePositionChanged = new LiteEvent<SliderDirection>();
    this.$elem = isHorizontal ? $('<div>').attr('class', `${StyleClasses.HANDLEWRAPPER}`)
      : $('<div>').attr('class', `${StyleClasses.HANDLEWRAPPER} ${StyleClasses.HANDLEWRAPPERV}`);
  }

  getMaxHandlePosition(): number {
    return 90;
  }

  setHandlePosition(positionMock: number, direction: SliderDirection): void {
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
