import { IObserver } from '../../Observer/Observer.types';
import { IElement } from '../AbstractElement/AbstractElement.types';

interface IScaleItem extends IElement{
  scaleItemClickedEvent: IObserver<number>;
  scaleMarkValue: number;
}

export { IScaleItem };
