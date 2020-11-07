import ILiteEvent from '../../LiteEvent/ILiteEvent';
import IElement from '../AbstractElement/IElement';

interface IScaleWrapper extends IElement{
  scaleItemClickedEvent: ILiteEvent<number>;
  scaleItemMarkValues: number[];
  setScaleMarksPosition(positions: number[]): void
}

export default IScaleWrapper;
