import ILiteEvent from '../../LiteEvent/ILiteEvent';
import IElement from '../AbstractElement/IElement';
import ISetRangeOptions from './ISetRangeOptions';

interface ISliderLine extends IElement{
  getLineSize(): number;
  setRange(setRangeOptions: ISetRangeOptions): void;
  lineClickEvent: ILiteEvent<number>;
}

export default ISliderLine;
