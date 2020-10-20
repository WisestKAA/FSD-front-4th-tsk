import ISliderSettings from '../ISliderSettings';
import ISliderOptions from './ISliderOptions';

class SliderOptions implements ISliderOptions {
  protected defaultOption: ISliderSettings = {
    isHorizontal: true,
    maxVal: 100,
    minVal: 0,
    currentVal: [0, 0],
    step: 1,
    precision: 0,
    isRange: false,
    isRangeLineEnabled: false,
    isVisibleCurrentValue: true,
    isScaleEnabled: false,
    numberOfScaleMarks: 2
  }

  protected options: ISliderSettings;

  constructor(options?: ISliderSettings) {
    this.options = $.extend(this.defaultOption, options);
    this.options = this.checkOptions(this.options);
  }

  protected checkOptions(options: ISliderSettings): ISliderSettings {
    const opt = options;
    this.checkMinMaxValue(opt.minVal, opt.maxVal);
    opt.currentVal = this.getCorrectCurrentValue({
      currentVal: opt.currentVal,
      isRange: opt.isRange,
      maxVal: opt.maxVal,
      minVal: opt.minVal
    });
    this.checkStep({ maxVal: opt.maxVal, minVal: opt.minVal, step: opt.step });
    this.checkNumberOfScaleMarks(opt.numberOfScaleMarks);
    opt.precision = this.getPrecision(opt.step);

    return opt;
  }

  protected checkMinMaxValue(minVal: number, maxVal: number): void{
    if (minVal >= maxVal) {
      throw new TypeError('Invalid input values. minVal must be less than maxVal');
    }
  }

  protected getCorrectCurrentValue(options: {
    isRange: boolean,
    currentVal: number[],
    minVal: number,
    maxVal: number
  }): number[] {
    const {
      isRange, currentVal, minVal, maxVal
    } = options;
    const curVal: number[] = [];
    if (isRange) {
      if (currentVal[0] < minVal) {
        curVal.push(minVal);
      } else if (currentVal[0] > maxVal) {
        curVal.push(maxVal);
      } else {
        curVal.push(currentVal[0]);
      }

      if (currentVal[1] < minVal) {
        curVal.push(minVal);
      } else if (currentVal[1] > maxVal) {
        curVal.push(maxVal);
      } else {
        curVal.push(currentVal[1]);
      }

      if (curVal[0] > curVal[1]) {
        curVal[1] = curVal[0];
      }
    } else {
      if (currentVal[0] < minVal) {
        curVal[0] = minVal;
      } else if (currentVal[0] > maxVal) {
        curVal[0] = maxVal;
      } else {
        curVal[0] = currentVal[0];
      }
      curVal[1] = 0;
    }
    return curVal;
  }

  protected checkStep(options: {
    minVal: number,
    maxVal: number,
    step: number
  }): void{
    const { minVal, maxVal, step } = options;
    if (step > (maxVal - minVal)) {
      throw new TypeError('Invalid input values. The step must be less than maxVal - minVal');
    }
  }

  protected checkNumberOfScaleMarks(numberOfScaleMarks: number): void{
    const mod = numberOfScaleMarks % 1;
    if (numberOfScaleMarks < 2 || mod !== 0) {
      throw new TypeError('Invalid input values.'
        + ' numberOfScaleMarks must be greater than or equal to two and be an integer');
    }
  }

  protected getPrecision(step: number): number {
    const dotIndex = step.toString().indexOf('.');
    if (dotIndex === -1) {
      return 0;
    }
    return step.toString().substring(dotIndex).length - 1;
  }

  public getOptions(): ISliderSettings {
    return this.options;
  }

  public setCurrentValue(currentVal: number[]): void{
    this.options.currentVal = currentVal;
  }

  public setNewOptions(options: ISliderSettings): void{
    this.options = $.extend(this.options, options);
    this.options = this.checkOptions(this.options);
  }
}

export default SliderOptions;
