import ISliderMainWrapper from '../../../../src/plugin/view/SliderMainWrapper/ISliderMainWrapper';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';

class MockWrapperEvent {
  wrapper: ISliderMainWrapper;

  constructor(wrapper: ISliderMainWrapper) {
    this.wrapper = wrapper;
    this.wrapper.handlePositionChangedEvent.on((direction) => {
      this.eventHandler(direction);
    });
  }

  eventHandler(directionMock: SliderDirection) {}
}

export default MockWrapperEvent;
