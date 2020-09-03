import IScaleItem from '../../../../src/plugin/view/ScaleItem/IScaleItem';

class MockEvent {
  scaleItem: IScaleItem;

  constructor(scaleItem: IScaleItem) {
    this.scaleItem = scaleItem;
    this.scaleItem.scaleItemClickedEvent.on((value) => {
      this.eventHandler(value);
    });
  }

  eventHandler(valMock: number): void{}
}

export default MockEvent;
