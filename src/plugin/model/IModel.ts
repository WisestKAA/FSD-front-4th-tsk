import ISliderSettings from './ISliderSettings';
import ILiteEvent from '../LiteEvent/ILiteEvent';

interface IModel{
  setCurrentValue(newVal: number[]): void;
  setNewOptions(options: ISliderSettings): void;
  getCorrectValWithStep(currentVal: number): number;
  getOptions(): ISliderSettings
  changeCurrentValueEvent: ILiteEvent<number[]>;
  changeOptionsEvent: ILiteEvent<void>;
}

export default IModel;
