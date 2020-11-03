import ILiteEvent from '../../LiteEvent/ILiteEvent';
import IElement from '../AbstractElement/IElement';
import SliderDirection from '../SliderDirection';

interface ISliderMainWrapper extends IElement{
  getSliderHandlePosition(direction: SliderDirection): number;
  getMaxHandlePosition(): number;
  setHandlePosition(
    position: number,
    direction: SliderDirection,
    isNewPosition?: boolean
  ): void;
  getHandleFromPosition(): number;
  getHandleToPosition(): number | null;
  getLineSize(): number;
  handlePositionChangedEvent: ILiteEvent<SliderDirection>;
  lineClickEvent: ILiteEvent<number>;
}

export default ISliderMainWrapper;
