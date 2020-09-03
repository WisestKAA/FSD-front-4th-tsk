import IScaleWrapper from '../../../../src/plugin/view/ScaleWrapper/IScaleWrapper';

class MockEvent {
  wrapper: IScaleWrapper;

  constructor(wrapper: IScaleWrapper) {
    this.wrapper = wrapper;
    this.wrapper.scaleItemClickedEvent.on((val) => {
      this.eventHandler(val);
    });
  }

  eventHandler(valMock: number):void{}
}

export default MockEvent;
