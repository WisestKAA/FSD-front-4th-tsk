import { IElement } from "../AbstractElement/IElement";
import { SliderDirection } from "../SliderDirection";
import { ILiteEvent } from "../../LiteEvent/ILiteEvent";
import { ISetRangeOptions } from "../SliderLine/ISetRangeOptions";
import { ISetCurrentValuePositionOptions } from "../CurrentValueWrapper/ISetCurrentValuePositionOptions";

export interface ISliderHandleWrapper extends IElement{
    getMaxHandlePosition(): number;
    setHandlePosition(position: number, direction: SliderDirection): void;
    getSliderHandlePosition(direction: SliderDirection): number;
    getHandleFromPosition(): number;
    getHandleToPosition(): number | null;
    handlePositionChangedToRangeEvent: ILiteEvent<ISetRangeOptions>;
    handlePositionChangedToCurrentValueEvent: ILiteEvent<ISetCurrentValuePositionOptions>;
    handlePositionChangedToPresenterEvent: ILiteEvent<SliderDirection>;
}