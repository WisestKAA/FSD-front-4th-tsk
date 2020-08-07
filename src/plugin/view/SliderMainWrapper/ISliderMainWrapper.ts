import IElement from '../AbstractElement/IElement';
import ILiteEvent from '../../LiteEvent/ILiteEvent';
import SliderDirection from '../SliderDirection';

interface ISliderMainWrapper extends IElement{
    getSliderHandlePosition(direction: SliderDirection): number;
    getMaxHandlePosition(): number;
    setHandlePosition(position: number, direction: SliderDirection): void;
    getHandleFromPosition(): number;
    getHandleToPosition(): number | null;
    getLineSize(): number;
    handlePositionChangedEvent: ILiteEvent<SliderDirection>;
}

export default ISliderMainWrapper;
