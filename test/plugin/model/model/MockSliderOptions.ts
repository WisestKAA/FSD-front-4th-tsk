import ISliderOptions from '../../../../src/plugin/model/SliderOptions/ISliderOptions';
import ISliderSettings from '../../../../src/plugin/model/ISliderSettings';

class MockSliderOptions implements ISliderOptions {
  defaultOption: ISliderSettings = {
    isHorizontal: true,
    maxVal: 100,
    minVal: 0,
    currentVal: [0, 0],
    step: 1,
    precision: 0,
    isRange: false,
    isRangeLineEnabled: false,
    isVisibleCurrentValue: true
  }

  getOptions(): ISliderSettings {
    return this.defaultOption;
  }

  setCurrentValue(currentValMock: number[]): void {}

  setNewOptions(optionsMock: ISliderSettings): void {}
}

export default MockSliderOptions;
