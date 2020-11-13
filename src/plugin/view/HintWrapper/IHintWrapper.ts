import ILiteEvent from '../../LiteEvent/ILiteEvent';
import IElement from '../AbstractElement/IElement';
import SliderDirection from '../SliderDirection';
import ISetCurrentValuePositionOptions from './ISetHintPositionOptions';

interface IHintWrapper extends IElement{
  setCurrentValuePosition(setCurrentValuePositionOptions: ISetCurrentValuePositionOptions): void;
  setHintValue(currentValue: number[]): void;
  getHintValue(): number[];
  intersectionEndedEvent: ILiteEvent<SliderDirection>;
}

export default IHintWrapper;
