import ILiteEvent from '../../LiteEvent/ILiteEvent';
import IElement from '../AbstractElement/IElement';

interface IScaleItem extends IElement{
  scaleItemClickedEvent: ILiteEvent<number>;
}

export default IScaleItem;
