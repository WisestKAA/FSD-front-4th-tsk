import ISliderHandleWrapper from '../../../../src/plugin/view/SliderHandleWrapper/ISliderHandleWrapper';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import ILiteEvent from '../../../../src/plugin/LiteEvent/ILiteEvent';
import LiteEvent from '../../../../src/plugin/LiteEvent/LiteEvent';

class MockHandleWrapper implements ISliderHandleWrapper {
  protected onHandlePositionChanged: LiteEvent<SliderDirection>;

  constructor() {
    this.onHandlePositionChanged = new LiteEvent<SliderDirection>();
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

  public get handlePositionChangedEvent(): ILiteEvent<SliderDirection> {
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
