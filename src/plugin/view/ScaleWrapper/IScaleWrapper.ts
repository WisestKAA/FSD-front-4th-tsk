import ILiteEvent from '../../LiteEvent/ILiteEvent';
import IElement from '../AbstractElement/IElement';

interface IScaleWrapper extends IElement{
  scaleItemClickedEvent: ILiteEvent<number>;
}

export default IScaleWrapper;
