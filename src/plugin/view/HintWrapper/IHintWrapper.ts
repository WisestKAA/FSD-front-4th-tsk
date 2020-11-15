import ILiteEvent from '../../LiteEvent/ILiteEvent';
import IElement from '../AbstractElement/IElement';
import SliderDirection from '../SliderDirection';
import ISetHintPositionOptions from './ISetHintPositionOptions';

interface IHintWrapper extends IElement{
  setHintPosition(setCurrentValuePositionOptions: ISetHintPositionOptions): void;
  setHintValue(currentValue: number[]): void;
  getHintValue(): number[];
  intersectionEndedEvent: ILiteEvent<SliderDirection>;
}

export default IHintWrapper;
