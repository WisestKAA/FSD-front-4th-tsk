import { IObserver } from '../../Observer/Observer.types';
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
  handlePositionChangedEvent: IObserver<SliderDirection>;
  lineClickEvent: IObserver<number>;
}

export { ISliderMainWrapper };
