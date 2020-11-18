import { IObserver } from '../../Observer/Observer.types';
import { IElement } from '../AbstractElement/AbstractElement.types';

interface IScaleWrapper extends IElement{
  scaleItemClickedEvent: IObserver<number>;
  scaleItemMarkValues: number[];
  setScaleMarksPosition(positions: number[]): void
}

export { IScaleWrapper };
