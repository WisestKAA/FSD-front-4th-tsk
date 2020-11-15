import IModel from '../../../src/plugin/model/IModel';
import ISliderSettings from '../../../src/plugin/model/ISliderSettings';
import LiteEvent from '../../../src/plugin/LiteEvent/LiteEvent';
import ILiteEvent from '../../../src/plugin/LiteEvent/ILiteEvent';

class MockModel implements IModel {
  private sliderOptions: ISliderSettings

  private onCurrentValueChanged: LiteEvent<number[]>;

  private onOptionsChanged: LiteEvent<void>;

  constructor(sliderOptions?: ISliderSettings) {
    this.onCurrentValueChanged = new LiteEvent<number[]>();
    this.onOptionsChanged = new LiteEvent<void>();
    this.sliderOptions = {
      isHorizontal: true,
      maxVal: 100,
      minVal: 0,
      currentVal: [0, 0],
      step: 1,
      precision: 0,
      isRange: false,
      isRangeLineEnabled: false,
      isVisibleHint: true,
      isScaleEnabled: false,
      numberOfScaleMarks: 2
    };
    this.sliderOptions = $.extend(this.sliderOptions, sliderOptions);
  }

  setCurrentValue(newVal: number[]): void {
    this.onCurrentValueChanged.trigger(newVal);
  }

  setNewOptions(options: ISliderSettings): void {
    this.sliderOptions = $.extend(this.sliderOptions, options);
    this.onOptionsChanged.trigger();
  }

  getCorrectValWithStep(currentVal: number): number {
    const options = this.getOptions();
    const { step } = options;
    if (currentVal < options.minVal) {
      return options.minVal;
    }
    if (currentVal > options.maxVal - (options.maxVal % step)) {
      return options.maxVal;
    }

    let correctVal: number;
    const shift = step - (currentVal % step);
    const middle = step / 2;
    if (shift > middle) {
      correctVal = currentVal - (currentVal % step);
    } else {
      correctVal = currentVal + shift;
    }
    const precision = Math.pow(10, options.precision);
    correctVal = Math.round(correctVal * precision) / precision;
    return correctVal;
  }

  getOptions(): ISliderSettings {
    return this.sliderOptions;
  }

  public get changeCurrentValueEvent(): ILiteEvent<number[]> {
    return this.onCurrentValueChanged.expose();
  }

  public get changeOptionsEvent(): ILiteEvent<void> {
    return this.onOptionsChanged.expose();
  }
}

export default MockModel;
