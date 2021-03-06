import { IObserver } from '../Observer/Observer.types';

interface IModel{
  setCurrentValue(newVal: number[]): void;
  setNewOptions(options: ISliderSettings): void;
  getCorrectValWithStep(currentVal: number): number;
  getOptions(): ISliderSettings
  changeCurrentValueEvent: IObserver<number[]>;
  changeOptionsEvent: IObserver<void>;
}

interface IModelFactory {
  build(): IModel;
}

interface ISliderSettings {
  isHorizontal?: boolean;
  minVal?: number;
  maxVal?: number;
  currentVal?: number[];
  step?: number;
  precision?: number;
  isRange?: boolean;
  isRangeLineEnabled?: boolean;
  isVisibleHint?: boolean;
  isScaleEnabled?: boolean;
  numberOfScaleMarks?: number;
}

export { IModel, IModelFactory, ISliderSettings };
