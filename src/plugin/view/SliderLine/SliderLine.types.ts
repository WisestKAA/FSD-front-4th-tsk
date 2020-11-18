import { IObserver } from '../../Observer/Observer.types';
import { IElement } from '../AbstractElement/AbstractElement.types';

interface ISliderLine extends IElement{
  getLineSize(): number;
  setRange(setRangeOptions: ISetRangeOptions): void;
  lineClickEvent: IObserver<number>;
}

interface ISetRangeOptions{
  isRange: boolean;
  handleFromPosition: number;
  maxHandlePosition?: number;
  handleToPosition?: number;
}

export { ISliderLine, ISetRangeOptions };
