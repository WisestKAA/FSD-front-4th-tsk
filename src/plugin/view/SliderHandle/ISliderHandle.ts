import ILiteEvent from '../../LiteEvent/ILiteEvent';
import IElement from '../AbstractElement/IElement';
import SliderDirection from '../SliderDirection';


interface ISliderHandle extends IElement{
  setNewPosition(position: number, direction: SliderDirection): void;
  getSliderHandleMaxPosition(): number;
  setCurrentPosition(position: number, direction: SliderDirection): void;
  getHandleSize(): number;
  getPosition(): number;
  positionChangedEvent: ILiteEvent<SliderDirection>;
}

export default ISliderHandle;
