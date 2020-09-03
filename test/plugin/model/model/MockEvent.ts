import IModel from '../../../../src/plugin/model/IModel';

class MockEvent {
  model: IModel;

  constructor(model: IModel) {
    this.model = model;
    this.model.changeCurrentValueEvent.on((currentVal) => {
      this.changeCurrentValue(currentVal);
    });
    this.model.changeOptionsEvent.on(() => {
      this.changeOptions();
    });
  }

  changeCurrentValue(currentValMock: number[]): void{}

  changeOptions(): void{}
}

export default MockEvent;
