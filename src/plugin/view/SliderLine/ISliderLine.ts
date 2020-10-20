import IElement from '../AbstractElement/IElement';
import ISetRangeOptions from './ISetRangeOptions';

interface ISliderLine extends IElement{
  getLineSize(): number;
  setRange(setRangeOptions: ISetRangeOptions): void;
}

export default ISliderLine;
