import { ILiteEvent } from '../../LiteEvent/LiteEvent.types';
import { IElement } from '../AbstractElement/AbstractElement.types';
import SliderDirection from '../SliderDirection';

interface IHintWrapper extends IElement{
  setHintPosition(setCurrentValuePositionOptions: ISetHintPositionOptions): void;
  setHintValue(currentValue: number[]): void;
  getHintValue(): number[];
  intersectionEndedEvent: ILiteEvent<SliderDirection>;
}

interface ISetHintPositionOptions{
  position: number;
  direction: SliderDirection;
  maxHandlePosition?: number;
  lineSize?: number;
  handleFromPosition?: number;
  handleToPosition?: number;
}

export { IHintWrapper, ISetHintPositionOptions };
