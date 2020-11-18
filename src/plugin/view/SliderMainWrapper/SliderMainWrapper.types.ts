import { ILiteEvent } from '../../LiteEvent/LiteEvent.types';
import { IElement } from '../AbstractElement/AbstractElement.types';
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

export { ISliderMainWrapper };
