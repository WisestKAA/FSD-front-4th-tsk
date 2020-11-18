import { ILiteEvent } from '../../LiteEvent/LiteEvent.types';
import { IElement } from '../AbstractElement/AbstractElement.types';

interface ISliderLine extends IElement{
  getLineSize(): number;
  setRange(setRangeOptions: ISetRangeOptions): void;
  lineClickEvent: ILiteEvent<number>;
}

interface ISetRangeOptions{
  isRange: boolean;
  handleFromPosition: number;
  maxHandlePosition?: number;
  handleToPosition?: number;
}

export { ISliderLine, ISetRangeOptions };
