import { SliderDirection } from "../SliderDirection";

export interface ISetCurrentValuePositionOptions{
    position: number;
    direction: SliderDirection;
    maxHandlePosition: number;
    lineSize: number;
    handleFromPosition: number; 
    handleToPosition?: number;
}