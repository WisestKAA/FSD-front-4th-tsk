import { IObserver } from '../../Observer/Observer.types';
import { IElement } from '../AbstractElement/AbstractElement.types';
import { ISliderLine } from '../SliderLine/SliderLine.types';
import SliderDirection from '../SliderDirection';

interface ISliderHandle extends IElement{
  setNewPosition(position: number, direction: SliderDirection): void;
  getSliderHandleMaxPosition(): number;
  setCurrentPosition(position: number, direction: SliderDirection): void;
  getHandleSize(): number;
  getPosition(): number;
  positionChangedEvent: IObserver<SliderDirection>;
}

interface ISliderHandleOptions{
  isFrom?: boolean;
  sliderLine: ISliderLine;
  isHorizontal: boolean;
  isRange: boolean;
}

export { ISliderHandle, ISliderHandleOptions };
