import LiteEvent from '../LiteEvent/LiteEvent';
import ILiteEvent from '../LiteEvent/ILiteEvent';
import ISliderOptions from './SliderOptions/ISliderOptions';
import ISliderOptionsFactory from './SliderOptions/ISliderOptionsFactory';
import ISliderSettings from './ISliderSettings';
import IModel from './IModel';

class Model implements IModel {
  private sliderOptions: ISliderOptions;

  private onCurrentValueChanged: LiteEvent<number[]>;

  private onOptionsChanged: LiteEvent<void>;

  constructor(optionsFactory: ISliderOptionsFactory) {
    this.sliderOptions = optionsFactory.build();
    this.onCurrentValueChanged = new LiteEvent<number[]>();
    this.onOptionsChanged = new LiteEvent<void>();
  }

  public setCurrentValue(newVal: number[]): void{
    this.sliderOptions.setCurrentValue(newVal);
    this.onCurrentValueChanged.trigger(newVal);
  }

  public setNewOptions(options: ISliderSettings): void{
    this.sliderOptions.setNewOptions(options);
    this.onOptionsChanged.trigger();
  }

  public getCorrectValWithStep(currentVal: number): number {
    const options = this.getOptions();
    const { step } = options;
    if (currentVal < options.minVal) {
      return options.minVal;
    }
    if (currentVal > options.maxVal - (options.maxVal % step)) {
      return options.maxVal;
    }

    const shift = step - (currentVal % step);
    const middle = step / 2;
    let correctVal = shift > middle
      ? currentVal - (currentVal % step)
      : currentVal + shift;
    const precision = Math.pow(10, options.precision);
    correctVal = Math.round(correctVal * precision) / precision;
    return correctVal;
  }

  public getOptions(): ISliderSettings {
    return this.sliderOptions.getOptions();
  }

  public get changeCurrentValueEvent(): ILiteEvent<number[]> {
    return this.onCurrentValueChanged.expose();
  }

  public get changeOptionsEvent(): ILiteEvent<void> {
    return this.onOptionsChanged.expose();
  }
}

export default Model;
