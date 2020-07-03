import { IElement } from "../AbstractElement/IElement";
import { SliderDirection } from "../SliderDirection";
import { ILiteEvent } from "../../LiteEvent/ILiteEvent";

export interface ISliderHandle extends IElement{
    setNewPosition(position: number, direction: SliderDirection): void;
    getSliderHandleMaxPosition(): number;
    setCurrentPosition(position: number, direction: SliderDirection): void;
    getHandleSize(): number;
    getPosition(): number;
    positionChangedEvent: ILiteEvent<SliderDirection>;
}