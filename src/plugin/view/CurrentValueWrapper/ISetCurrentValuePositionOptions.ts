import SliderDirection from '../SliderDirection';

interface ISetCurrentValuePositionOptions{
  position: number;
  direction: SliderDirection;
  maxHandlePosition?: number;
  lineSize?: number;
  handleFromPosition?: number;
  handleToPosition?: number;
}

export default ISetCurrentValuePositionOptions;
