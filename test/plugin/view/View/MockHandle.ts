import ISliderHandle from '../../../../src/plugin/view/SliderHandle/ISliderHandle';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import ILiteEvent from '../../../../src/plugin/LiteEvent/ILiteEvent';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';

class MockHandle implements ISliderHandle {
  setNewPosition(positionMock: number, directionMock: SliderDirection): void {}

  getSliderHandleMaxPosition(): number {
    return 0;
  }

  setCurrentPosition(positionMock: number, directionMock: SliderDirection): void {}

  getHandleSize(): number {
    return 10;
  }

  getPosition(): number {
    return 0;
  }

    positionChangedEvent: ILiteEvent<SliderDirection>;

    $elem: JQuery<HTMLElement> = $('<div>');

    changeOrientation(
      isHorizontalMock: boolean,
      horizontalClassMock: StyleClasses,
      verticalClassMock: StyleClasses
    ): void {}
}

export default MockHandle;
