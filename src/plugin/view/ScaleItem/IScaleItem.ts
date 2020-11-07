import ILiteEvent from '../../LiteEvent/ILiteEvent';
import IElement from '../AbstractElement/IElement';

interface IScaleItem extends IElement{
  scaleItemClickedEvent: ILiteEvent<number>;
  scaleMarkValue: number;
}

export default IScaleItem;
