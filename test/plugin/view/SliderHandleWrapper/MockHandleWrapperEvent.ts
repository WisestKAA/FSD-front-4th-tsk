import ISliderHandleWrapper from '../../../../src/plugin/view/SliderHandleWrapper/ISliderHandleWrapper';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';

class MockHandleWrapperEvent {
  public wrapper: ISliderHandleWrapper;

  direction: SliderDirection;

  constructor(wrapper: ISliderHandleWrapper) {
    this.wrapper = wrapper;
    this.wrapper.handlePositionChangedEvent.on((direction) => {
      this.eventHandler(direction);
    });
  }

  eventHandler(direction: SliderDirection): void{
    this.direction = direction;
  }
}

export default MockHandleWrapperEvent;
