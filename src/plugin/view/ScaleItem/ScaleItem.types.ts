import { ILiteEvent } from '../../LiteEvent/LiteEvent.types';
import { IElement } from '../AbstractElement/AbstractElement.types';

interface IScaleItem extends IElement{
  scaleItemClickedEvent: ILiteEvent<number>;
  scaleMarkValue: number;
}

export { IScaleItem };
