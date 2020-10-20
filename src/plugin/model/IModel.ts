import ILiteEvent from '../LiteEvent/ILiteEvent';
import ISliderSettings from './ISliderSettings';

interface IModel{
  setCurrentValue(newVal: number[]): void;
  setNewOptions(options: ISliderSettings): void;
  getCorrectValWithStep(currentVal: number): number;
  getOptions(): ISliderSettings
  changeCurrentValueEvent: ILiteEvent<number[]>;
  changeOptionsEvent: ILiteEvent<void>;
}

export default IModel;
