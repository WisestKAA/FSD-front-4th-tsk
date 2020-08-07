import IElement from '../AbstractElement/IElement';
import ILiteEvent from '../../LiteEvent/ILiteEvent';

interface IScaleItem extends IElement{
    scaleItemClickedEvent: ILiteEvent<number>;
}

export default IScaleItem;
