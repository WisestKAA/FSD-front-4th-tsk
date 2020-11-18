import { ISliderHandle } from '../../../../src/plugin/view/SliderHandle/SliderHandle.types';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import { IObserver } from '../../../../src/plugin/Observer/Observer.types';

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

    positionChangedEvent: IObserver<SliderDirection>;

    $elem: JQuery<HTMLElement> = $('<div>');

    changeOrientation(
      isHorizontalMock: boolean,
      horizontalClassMock: StyleClasses,
      verticalClassMock: StyleClasses
    ): void {}
}

export default MockHandle;
