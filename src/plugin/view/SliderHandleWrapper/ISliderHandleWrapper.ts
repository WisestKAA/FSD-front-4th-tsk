import { IElement } from "../AbstractElement/IElement";
import { SliderDirection } from "../SliderDirection";
import { ILiteEvent } from "../../LiteEvent/ILiteEvent";

export interface ISliderHandleWrapper extends IElement{
    getMaxHandlePosition(): number;
    setHandlePosition(position: number, direction: SliderDirection): void;
    getSliderHandlePosition(direction: SliderDirection): number;
    getHandleFromPosition(): number;
    getHandleToPosition(): number | null;
    getIsRange(): boolean;
    handlePositionChangedEvent: ILiteEvent<SliderDirection>;
}