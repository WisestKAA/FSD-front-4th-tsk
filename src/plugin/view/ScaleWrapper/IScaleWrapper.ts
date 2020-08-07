import IElement from '../AbstractElement/IElement';
import ILiteEvent from '../../LiteEvent/ILiteEvent';

interface IScaleWrapper extends IElement{
    scaleItemClickedEvent: ILiteEvent<number>;
}

export default IScaleWrapper;
