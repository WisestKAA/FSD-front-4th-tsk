import { ILiteEvent } from '../../LiteEvent/LiteEvent.types';
import { IElement } from '../AbstractElement/AbstractElement.types';

interface IScaleWrapper extends IElement{
  scaleItemClickedEvent: ILiteEvent<number>;
  scaleItemMarkValues: number[];
  setScaleMarksPosition(positions: number[]): void
}

export { IScaleWrapper };
