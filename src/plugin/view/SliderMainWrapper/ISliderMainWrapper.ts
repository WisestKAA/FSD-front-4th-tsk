import { IElement } from "../AbstractElement/IElement";
import { ILiteEvent } from "../../LiteEvent/ILiteEvent";
import { ISetCurrentValuePositionOptions } from "../CurrentValueWrapper/ISetCurrentValuePositionOptions";
import { SliderDirection } from "../SliderDirection";

export interface ISliderMainWrapper extends IElement{
    getSliderHandlePosition(direction: SliderDirection): number;
    getMaxHandlePosition(): number;
    setHandlePosition(position: number, direction: SliderDirection): void;
    getHandleFromPosition(): number;
    getHandleToPosition(): number | null;
    getLineSize(): number;
    handlePositionChangedToCurrentValueEvent: ILiteEvent<ISetCurrentValuePositionOptions>;
    handlePositionChangedToPresenterEvent: ILiteEvent<SliderDirection>;
}