import ILiteEvent from '../../LiteEvent/ILiteEvent';
import IElement from '../AbstractElement/IElement';
import SliderDirection from '../SliderDirection';

interface ISliderHandleWrapper extends IElement{
  getMaxHandlePosition(): number;
  setHandlePosition(
    position: number,
    direction: SliderDirection,
    isNewPosition?: boolean
  ): void;
  getSliderHandlePosition(direction: SliderDirection): number;
  getHandleFromPosition(): number;
  getHandleToPosition(): number | null;
  getIsRange(): boolean;
  handlePositionChangedEvent: ILiteEvent<SliderDirection>;
}

export default ISliderHandleWrapper;
