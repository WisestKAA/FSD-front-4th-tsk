import SliderDirection from '../SliderDirection';

interface ISetHintPositionOptions{
  position: number;
  direction: SliderDirection;
  maxHandlePosition?: number;
  lineSize?: number;
  handleFromPosition?: number;
  handleToPosition?: number;
}

export default ISetHintPositionOptions;
