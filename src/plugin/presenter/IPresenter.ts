import { SliderDirection } from "../view/SliderDirection";

export interface IPresenter{
    sliderHandleChangedPosition(direction: SliderDirection): void;
    scaleClicked(value: number): void;
}