import { ISliderSettings } from '../Model.types';

interface ISliderOptions {
  getOptions(): ISliderSettings;
  setCurrentValue(currentVal: number[]): void;
  setNewOptions(options: ISliderSettings): void;
}

interface ISliderOptionsFactory {
  build(): ISliderOptions;
}

export { ISliderOptions, ISliderOptionsFactory };
