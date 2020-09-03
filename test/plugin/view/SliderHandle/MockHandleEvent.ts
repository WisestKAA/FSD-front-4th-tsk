import ISliderHandle from '../../../../src/plugin/view/SliderHandle/ISliderHandle';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';

class MockHandleEvent {
  public handle: ISliderHandle;

  constructor(handle: ISliderHandle) {
    this.handle = handle;
    handle.positionChangedEvent.on((direction)=>{
      this.eventHandler(direction);
    });
  }

  public eventHandler(directionMock: SliderDirection): void{}
}

export default MockHandleEvent;
