import { IObserver } from '../../Observer/Observer.types';
import { IElement } from '../AbstractElement/AbstractElement.types';
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
  handlePositionChangedEvent: IObserver<SliderDirection>;
}

export { ISliderHandleWrapper };
