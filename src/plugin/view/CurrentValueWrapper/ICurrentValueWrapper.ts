import LiteEvent from '../../LiteEvent/LiteEvent';
import IElement from '../AbstractElement/IElement';
import SliderDirection from '../SliderDirection';
import ISetCurrentValuePositionOptions from './ISetCurrentValuePositionOptions';

interface ICurrentValueWrapper extends IElement{
  setCurrentValuePosition(setCurrentValuePositionOptions: ISetCurrentValuePositionOptions): void;
  setCurrentValue(currentValue: number[]): void;
  getCurrentValue(): number[];
  intersectionEndedEvent: LiteEvent<SliderDirection>;
}

export default ICurrentValueWrapper;
