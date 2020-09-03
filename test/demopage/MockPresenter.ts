import ISliderSettings from '../../src/plugin/model/ISliderSettings';

class MockPresenter {
  callBack: Function;

  sliderSettings: ISliderSettings;

  constructor(sliderSettings: ISliderSettings) {
    this.sliderSettings = sliderSettings;
  }

  setNewOptions(options: ISliderSettings): void{
    this.sliderSettings = options;
  }

  onCurrentValueChanged(func: Function) {
    this.callBack = func;
  }

  mockTriggerEvent(val: number[]) {
    this.callBack(val);
  }
}

export default MockPresenter;
